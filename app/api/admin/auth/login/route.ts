import { NextRequest, NextResponse } from 'next/server'
import { createApiSupabaseClient } from '@/lib/supabase/server'
import { verifyPassword, generateToken, AdminPayload } from '@/lib/auth'
import { AdminUser } from '@/lib/supabase/types'

// Protection brute force : limite les tentatives de connexion par IP
const loginAttempts = new Map<string, { count: number; blockedUntil: number }>()
const MAX_ATTEMPTS = 5
const BLOCK_DURATION = 15 * 60 * 1000 // 15 minutes

function getClientIP(request: NextRequest): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0].trim() 
    || request.headers.get('x-real-ip') 
    || 'unknown'
}

function checkBruteForce(ip: string): { allowed: boolean; remainingTime?: number } {
  const now = Date.now()
  const record = loginAttempts.get(ip)

  if (!record) return { allowed: true }

  // Si bloqué, vérifier si le temps est écoulé
  if (record.blockedUntil > now) {
    return { 
      allowed: false, 
      remainingTime: Math.ceil((record.blockedUntil - now) / 1000 / 60) 
    }
  }

  // Réinitialiser si le blocage est terminé
  if (record.blockedUntil <= now && record.count >= MAX_ATTEMPTS) {
    loginAttempts.delete(ip)
    return { allowed: true }
  }

  return { allowed: true }
}

function recordFailedAttempt(ip: string) {
  const now = Date.now()
  const record = loginAttempts.get(ip) || { count: 0, blockedUntil: 0 }
  
  record.count++
  
  if (record.count >= MAX_ATTEMPTS) {
    record.blockedUntil = now + BLOCK_DURATION
    console.warn(`⚠️ IP ${ip} bloquée pour ${BLOCK_DURATION / 1000 / 60} minutes après ${MAX_ATTEMPTS} tentatives échouées`)
  }
  
  loginAttempts.set(ip, record)
}

function clearFailedAttempts(ip: string) {
  loginAttempts.delete(ip)
}

export async function POST(request: NextRequest) {
  try {
    const clientIP = getClientIP(request)
    
    // Vérifier le brute force
    const bruteCheck = checkBruteForce(clientIP)
    if (!bruteCheck.allowed) {
      return NextResponse.json(
        { error: `Trop de tentatives. Réessayez dans ${bruteCheck.remainingTime} minutes.` },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email et mot de passe requis.' },
        { status: 400 }
      )
    }

    const supabase = createApiSupabaseClient()

    // Récupérer l'utilisateur
    const { data: user, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', email.toLowerCase())
      .eq('is_active', true)
      .single()

    if (error || !user) {
      recordFailedAttempt(clientIP)
      return NextResponse.json(
        { error: 'Email ou mot de passe incorrect.' },
        { status: 401 }
      )
    }

    // Type assertion pour TypeScript
    const adminUser = user as AdminUser

    // Vérifier le mot de passe
    const isValid = await verifyPassword(password, adminUser.password_hash)
    if (!isValid) {
      recordFailedAttempt(clientIP)
      return NextResponse.json(
        { error: 'Email ou mot de passe incorrect.' },
        { status: 401 }
      )
    }

    // Connexion réussie : réinitialiser les tentatives
    clearFailedAttempts(clientIP)

    // Générer le token
    const payload: AdminPayload = {
      id: adminUser.id,
      email: adminUser.email,
      name: adminUser.name,
      role: adminUser.role as 'admin' | 'manager' | 'viewer',
    }
    const token = generateToken(payload)

    // Mettre à jour la dernière connexion
    await supabase
      .from('admin_users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', adminUser.id)

    // Logger l'action
    await supabase.from('activity_logs').insert({
      admin_id: adminUser.id,
      action: 'login',
      entity_type: 'admin_user',
      entity_id: adminUser.id,
      ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
    })

    // Créer la réponse avec le cookie
    const response = NextResponse.json({
      success: true,
      user: payload,
      token,
    })

    // Définir le cookie
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 heures
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la connexion.' },
      { status: 500 }
    )
  }
}

