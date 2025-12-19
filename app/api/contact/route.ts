import { NextRequest, NextResponse } from 'next/server'
import { createApiSupabaseClient, typedInsert } from '@/lib/supabase/server'
import { ContactRequestInsert } from '@/lib/supabase/types'

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

const RATE_LIMIT = {
  maxRequests: 5,
  windowMs: 15 * 60 * 1000, // 15 minutes
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT.windowMs })
    return true
  }

  if (record.count >= RATE_LIMIT.maxRequests) {
    return false
  }

  record.count++
  return true
}

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  
  if (forwarded) return forwarded.split(',')[0].trim()
  if (realIP) return realIP
  return 'unknown'
}

function sanitize(str: string): string {
  return str.replace(/[<>]/g, '').trim().substring(0, 2000)
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request)
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        { error: 'Trop de requêtes. Veuillez réessayer dans quelques minutes.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { name, email, phone, company, serviceType, message, source } = body

    // Validation
    if (!name || !email || !phone || !serviceType || !message) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être remplis.' },
        { status: 400 }
      )
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Format d\'email invalide.' },
        { status: 400 }
      )
    }

    // Validation téléphone
    const phoneRegex = /^(?:(?:\+|00)33|0)[1-9](?:[0-9]{8})$/
    const cleanPhone = phone.replace(/\s/g, '')
    if (!phoneRegex.test(cleanPhone)) {
      return NextResponse.json(
        { error: 'Format de téléphone invalide.' },
        { status: 400 }
      )
    }

    // Préparer les données pour Supabase
    const contactData: ContactRequestInsert = {
      name: sanitize(name),
      email: sanitize(email),
      phone: sanitize(phone),
      company: company ? sanitize(company) : null,
      service_type: sanitize(serviceType),
      message: sanitize(message),
      source: source || 'contact-form',
      ip_address: clientIP,
      user_agent: request.headers.get('user-agent') || null,
      status: 'new',
      priority: 'normal',
      is_read: false,
    }

    // Sauvegarder dans Supabase
    const supabase = createApiSupabaseClient()
    const { data, error } = await typedInsert(supabase, 'contact_requests', contactData)
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      // Fallback: log et retourner succès même si BDD échoue (pour ne pas bloquer le formulaire)
      console.log('Contact form submission (fallback):', contactData)
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.',
        id: data?.id,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer plus tard.' },
      { status: 500 }
    )
  }
}

// Nettoyage périodique
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const [ip, record] of rateLimitMap.entries()) {
      if (now > record.resetTime) {
        rateLimitMap.delete(ip)
      }
    }
  }, 60 * 60 * 1000)
}
