'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

interface AdminUser {
  id: string
  email: string
  name: string
  role: 'admin' | 'manager' | 'viewer'
}

export function useAdmin() {
  const router = useRouter()
  const [user, setUser] = useState<AdminUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  // S'assurer qu'on est côté client avant de faire des appels API
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const checkAuth = useCallback(async () => {
    if (!isMounted) return
    
    try {
      const response = await fetch('/api/admin/auth/me')
      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      } else {
        setUser(null)
        // Ne rediriger que si on est vraiment sur une page admin
        if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
          router.push('/admin/login')
        }
      }
    } catch {
      setUser(null)
      // Ne rediriger que si on est vraiment sur une page admin
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        router.push('/admin/login')
      }
    } finally {
      setIsLoading(false)
    }
  }, [router, isMounted])

  useEffect(() => {
    if (isMounted) {
      checkAuth()
    }
  }, [checkAuth, isMounted])

  const logout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' })
      setUser(null)
      router.push('/admin/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const hasPermission = (requiredRole: 'admin' | 'manager' | 'viewer'): boolean => {
    if (!user) return false
    const roleHierarchy = { admin: 3, manager: 2, viewer: 1 }
    return roleHierarchy[user.role] >= roleHierarchy[requiredRole]
  }

  return { user, isLoading, logout, hasPermission, checkAuth }
}

