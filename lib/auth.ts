import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

const JWT_SECRET = process.env.JWT_SECRET

// Vérification de sécurité : bloquer si pas de secret en production
if (!JWT_SECRET && process.env.NODE_ENV === 'production') {
  throw new Error('FATAL: JWT_SECRET environment variable is required in production!')
}

// En développement, utiliser un secret temporaire avec avertissement
const EFFECTIVE_JWT_SECRET = JWT_SECRET || (() => {
  console.warn('⚠️ WARNING: Using default JWT secret. Set JWT_SECRET in .env.local for production!')
  return 'dev-only-secret-do-not-use-in-production-' + Date.now()
})()
const TOKEN_EXPIRY = '24h'
const COOKIE_NAME = 'admin_token'

export interface AdminPayload {
  id: string
  email: string
  name: string
  role: 'admin' | 'manager' | 'viewer'
}

// Hash un mot de passe
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

// Vérifie un mot de passe
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

// Génère un token JWT
export function generateToken(payload: AdminPayload): string {
  return jwt.sign(payload, EFFECTIVE_JWT_SECRET, { expiresIn: TOKEN_EXPIRY })
}

// Vérifie et décode un token JWT
export function verifyToken(token: string): AdminPayload | null {
  try {
    return jwt.verify(token, EFFECTIVE_JWT_SECRET) as AdminPayload
  } catch {
    return null
  }
}

// Définit le cookie d'authentification
export function setAuthCookie(token: string) {
  const cookieStore = cookies()
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24 heures
    path: '/',
  })
}

// Supprime le cookie d'authentification
export function removeAuthCookie() {
  const cookieStore = cookies()
  cookieStore.delete(COOKIE_NAME)
}

// Récupère l'utilisateur connecté depuis les cookies
export function getAuthUser(): AdminPayload | null {
  const cookieStore = cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return null
  return verifyToken(token)
}

// Récupère le token depuis une requête (API routes)
export function getTokenFromRequest(request: NextRequest): string | null {
  // Essayer d'abord le header Authorization
  const authHeader = request.headers.get('authorization')
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.substring(7)
  }
  
  // Sinon, essayer le cookie
  const token = request.cookies.get(COOKIE_NAME)?.value
  return token || null
}

// Vérifie l'authentification pour une API route
export function getAuthUserFromRequest(request: NextRequest): AdminPayload | null {
  const token = getTokenFromRequest(request)
  if (!token) return null
  return verifyToken(token)
}

// Vérifie si l'utilisateur a les permissions requises
export function hasPermission(user: AdminPayload | null, requiredRole: 'admin' | 'manager' | 'viewer'): boolean {
  if (!user) return false
  
  const roleHierarchy = {
    admin: 3,
    manager: 2,
    viewer: 1,
  }
  
  return roleHierarchy[user.role] >= roleHierarchy[requiredRole]
}

