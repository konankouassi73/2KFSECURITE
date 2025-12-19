'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, AlertCircle } from 'lucide-react'
import { useCookieConsent } from '@/hooks/useCookieConsent'
import { analytics } from '@/lib/analytics'

export function Footer() {
  const { setIsOpen } = useCookieConsent()
  return (
    <footer className="bg-white border-t border-primary-gray/10 mt-12 sm:mt-20 safe-bottom">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {/* Logo & Description */}
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <Image
                src="/images/logo.png"
                alt="2KF Sécurité"
                width={50}
                height={50}
                className="object-contain"
              />
              <span className="text-primary-dark font-display font-bold text-lg sm:text-xl">2KF SÉCURITÉ</span>
            </div>
            <p className="text-primary-gray text-xs sm:text-sm mb-4 max-w-md leading-relaxed">
              La sécurité, notre priorité. Services professionnels de gardiennage, 
              sécurité événementielle et surveillance pour protéger vos biens et vos personnes.
            </p>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-primary-gray font-semibold mb-3 sm:mb-4 font-display text-sm sm:text-base">Liens rapides</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              <li>
                <Link href="/services" className="text-primary-gray hover:text-primary-accent active:text-primary-accent transition-colors text-xs sm:text-sm">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/entreprise" className="text-primary-gray hover:text-primary-accent active:text-primary-accent transition-colors text-xs sm:text-sm">
                  Entreprise
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-primary-gray hover:text-primary-accent active:text-primary-accent transition-colors text-xs sm:text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-primary-gray hover:text-primary-accent active:text-primary-accent transition-colors text-xs sm:text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales" className="text-primary-gray hover:text-primary-accent active:text-primary-accent transition-colors text-xs sm:text-sm">
                  Mentions légales
                </Link>
              </li>
              <li>
                <button
                  onClick={() => setIsOpen(true)}
                  className="text-primary-gray hover:text-primary-accent active:text-primary-accent transition-colors text-left text-xs sm:text-sm"
                >
                  Gérer les cookies
                </button>
              </li>
            </ul>
          </div>

          {/* Coordonnées */}
          <div>
            <h3 className="text-primary-gray font-semibold mb-3 sm:mb-4 font-display text-sm sm:text-base">Contact</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li className="flex items-start space-x-2 text-primary-gray">
                <Phone size={14} className="mt-0.5 sm:mt-1 text-primary-accent flex-shrink-0" />
                <a 
                  href="tel:+33769930771" 
                  className="hover:text-primary-accent active:text-primary-accent transition-colors text-xs sm:text-sm"
                  onClick={() => analytics.trackPhoneClick('07 69 93 07 71')}
                >
                  07 69 93 07 71
                </a>
              </li>
              <li className="flex items-start space-x-2 text-primary-gray">
                <Mail size={14} className="mt-0.5 sm:mt-1 text-primary-accent flex-shrink-0" />
                <a 
                  href="mailto:2kfsecurite@gmail.com"
                  className="hover:text-primary-accent active:text-primary-accent transition-colors text-xs sm:text-sm break-all"
                  onClick={() => analytics.trackEmailClick()}
                >
                  2kfsecurite@gmail.com
                </a>
              </li>
              <li className="flex items-start space-x-2 text-primary-gray">
                <MapPin size={14} className="mt-0.5 sm:mt-1 text-primary-accent flex-shrink-0" />
                <span className="text-xs sm:text-sm">229 Rue Saint-Honoré<br />75001 Paris</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Urgence Section */}
        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-primary-gray/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2 text-primary-accent">
              <AlertCircle size={16} className="sm:w-5 sm:h-5" />
              <span className="font-semibold text-sm sm:text-base">Besoin d'une intervention urgente ?</span>
            </div>
            <Link
              href="/contact?urgence=true"
              className="w-full sm:w-auto text-center px-5 sm:px-6 py-2.5 sm:py-3 bg-primary-dark hover:bg-primary-accent active:bg-primary-accent rounded-full transition-all duration-300 font-semibold text-white text-sm sm:text-base"
            >
              Intervention Urgente
            </Link>
          </div>
        </div>

        {/* Legal Info */}
        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-primary-gray/10 text-center text-primary-gray/60 text-[10px] sm:text-xs leading-relaxed px-2 sm:px-0">
           <p>
             2KF SÉCURITÉ - SASU au capital variable<br className="sm:hidden" />
             <span className="hidden sm:inline"> - </span>SIRET : 93426971300012 - SIREN : 934269713 - APE : 8010Z<br />
             Autorisation CNAPS : AUT-075-2124-01-30-20250968268<br />
             <span className="hidden sm:inline">L'autorisation d'exercice ne confère aucune prérogative de puissance publique à l'entreprise ou aux personnes qui en bénéficient.</span>
           </p>
        </div>

        {/* Copyright */}
        <div className="mt-3 sm:mt-4 text-center text-primary-gray/50 text-xs sm:text-sm">
          <p>&copy; {new Date().getFullYear()} 2KF SÉCURITÉ. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}

