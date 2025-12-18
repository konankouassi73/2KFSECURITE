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

  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/auth/me')
      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      } else {
        setUser(null)
        router.push('/admin/login')
      }
    } catch {
      setUser(null)
      router.push('/admin/login')
    } finally {
      setIsLoading(false)
    }
  }, [router])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

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

