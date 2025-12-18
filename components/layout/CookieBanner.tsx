'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Cookie, Settings, Check, X as XIcon } from 'lucide-react'
import { useCookieConsent } from '@/hooks/useCookieConsent'
import Link from 'next/link'

export function CookieBanner() {
  const { consent, isOpen, setIsOpen, acceptAll, acceptNecessary, acceptCustom } = useCookieConsent()
  const [showSettings, setShowSettings] = useState(false)
  const [customSettings, setCustomSettings] = useState({
    analytics: false,
    marketing: false,
  })

  const handleAcceptCustom = () => {
    acceptCustom(customSettings)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 100, y: 100 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 100, y: 100 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed bottom-6 right-6 z-50 max-w-sm w-full sm:w-96"
        >
          <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
                {!showSettings ? (
                  // Vue principale - Compacte
                  <div className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-primary-dark rounded-full flex items-center justify-center">
                          <Cookie className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="text-lg font-bold text-primary-gray">
                            Cookies
                          </h3>
                          <button
                            onClick={() => setIsOpen(false)}
                            className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                            aria-label="Fermer"
                          >
                            <X className="w-4 h-4 text-primary-gray" />
                          </button>
                        </div>
                        <p className="text-sm text-primary-gray leading-relaxed mb-3">
                          Nous utilisons des cookies pour améliorer votre expérience.{' '}
                          <Link 
                            href="/mentions-legales#cookies" 
                            className="text-primary-accent hover:underline text-xs"
                          >
                            En savoir plus
                          </Link>
                        </p>
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={acceptAll}
                            className="px-4 py-2 bg-primary-dark hover:bg-primary-accent text-white rounded-lg text-sm font-semibold transition-all duration-300"
                          >
                            Tout accepter
                          </button>
                          <div className="flex gap-2">
                            <button
                              onClick={acceptNecessary}
                              className="flex-1 px-3 py-2 bg-gray-200 hover:bg-gray-300 text-primary-gray rounded-lg text-xs font-semibold transition-all duration-300"
                            >
                              Refuser
                            </button>
                            <button
                              onClick={() => setShowSettings(true)}
                              className="flex-1 px-3 py-2 border border-primary-dark text-primary-dark hover:bg-primary-dark hover:text-white rounded-lg text-xs font-semibold transition-all duration-300 flex items-center justify-center gap-1"
                            >
                              <Settings className="w-3 h-3" />
                              Options
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Vue paramètres détaillés - Compacte
                  <div className="p-4 max-h-[80vh] overflow-y-auto">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-primary-gray flex items-center gap-2">
                        <Settings className="w-4 h-4" />
                        Paramètres
                      </h3>
                      <button
                        onClick={() => setShowSettings(false)}
                        className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                        aria-label="Retour"
                      >
                        <XIcon className="w-4 h-4 text-primary-gray" />
                      </button>
                    </div>

                    <div className="space-y-3 mb-4">
                      {/* Cookies nécessaires */}
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm text-primary-gray">Nécessaires</h4>
                            <p className="text-xs text-primary-gray/70 mt-0.5">
                              Essentiels au fonctionnement
                            </p>
                          </div>
                          <div className="flex-shrink-0 ml-2">
                            <div className="w-8 h-4 bg-primary-dark rounded-full flex items-center justify-center">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Cookies analytiques */}
                      <div className="p-3 bg-white rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm text-primary-gray">Analytiques</h4>
                            <p className="text-xs text-primary-gray/70 mt-0.5">
                              Analyse d'utilisation
                            </p>
                          </div>
                          <button
                            onClick={() => setCustomSettings(prev => ({ ...prev, analytics: !prev.analytics }))}
                            className={`flex-shrink-0 ml-2 w-10 h-5 rounded-full transition-colors duration-300 ${
                              customSettings.analytics ? 'bg-primary-dark' : 'bg-gray-300'
                            }`}
                          >
                            <div
                              className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                                customSettings.analytics ? 'translate-x-5' : 'translate-x-0.5'
                              }`}
                            />
                          </button>
                        </div>
                      </div>

                      {/* Cookies marketing */}
                      <div className="p-3 bg-white rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm text-primary-gray">Marketing</h4>
                            <p className="text-xs text-primary-gray/70 mt-0.5">
                              Publicités personnalisées
                            </p>
                          </div>
                          <button
                            onClick={() => setCustomSettings(prev => ({ ...prev, marketing: !prev.marketing }))}
                            className={`flex-shrink-0 ml-2 w-10 h-5 rounded-full transition-colors duration-300 ${
                              customSettings.marketing ? 'bg-primary-dark' : 'bg-gray-300'
                            }`}
                          >
                            <div
                              className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                                customSettings.marketing ? 'translate-x-5' : 'translate-x-0.5'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <button
                        onClick={handleAcceptCustom}
                        className="px-4 py-2 bg-primary-dark hover:bg-primary-accent text-white rounded-lg text-sm font-semibold transition-all duration-300"
                      >
                        Enregistrer
                      </button>
                      <Link
                        href="/mentions-legales#cookies"
                        className="px-4 py-2 text-center border border-primary-dark text-primary-dark hover:bg-primary-dark hover:text-white rounded-lg text-xs font-semibold transition-all duration-300"
                      >
                        En savoir plus
                      </Link>
                    </div>
                  </div>
                )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

