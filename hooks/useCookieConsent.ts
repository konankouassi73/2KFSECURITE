'use client'

import { useState, useEffect } from 'react'

export type CookieConsent = {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  timestamp: number
}

const COOKIE_CONSENT_KEY = '2kf-cookie-consent'
const COOKIE_CONSENT_EXPIRY_DAYS = 365

export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Vérifier si le consentement existe déjà
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(COOKIE_CONSENT_KEY)
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          // Vérifier si le consentement est encore valide (moins de 365 jours)
          const daysSinceConsent = (Date.now() - parsed.timestamp) / (1000 * 60 * 60 * 24)
          if (daysSinceConsent < COOKIE_CONSENT_EXPIRY_DAYS) {
            setConsent(parsed)
            setIsOpen(false)
            return
          }
        } catch (e) {
          // Si erreur de parsing, on affiche le banner
        }
      }
      // Si pas de consentement valide, afficher le banner
      setIsOpen(true)
    }
  }, [])

  const acceptAll = () => {
    const newConsent: CookieConsent = {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: Date.now(),
    }
    saveConsent(newConsent)
    setConsent(newConsent)
    setIsOpen(false)
  }

  const acceptNecessary = () => {
    const newConsent: CookieConsent = {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: Date.now(),
    }
    saveConsent(newConsent)
    setConsent(newConsent)
    setIsOpen(false)
  }

  const acceptCustom = (customConsent: Partial<CookieConsent>) => {
    const newConsent: CookieConsent = {
      necessary: true, // Toujours nécessaire
      analytics: customConsent.analytics ?? false,
      marketing: customConsent.marketing ?? false,
      timestamp: Date.now(),
    }
    saveConsent(newConsent)
    setConsent(newConsent)
    setIsOpen(false)
  }

  const saveConsent = (consentData: CookieConsent) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consentData))
      
      // Définir un cookie pour le serveur si nécessaire
      const expiryDate = new Date()
      expiryDate.setTime(expiryDate.getTime() + COOKIE_CONSENT_EXPIRY_DAYS * 24 * 60 * 60 * 1000)
      document.cookie = `${COOKIE_CONSENT_KEY}=${JSON.stringify(consentData)}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`
    }
  }

  const revokeConsent = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(COOKIE_CONSENT_KEY)
      document.cookie = `${COOKIE_CONSENT_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
      setConsent(null)
      setIsOpen(true)
    }
  }

  return {
    consent,
    isOpen,
    setIsOpen,
    acceptAll,
    acceptNecessary,
    acceptCustom,
    revokeConsent,
  }
}



