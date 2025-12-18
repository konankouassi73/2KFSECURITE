'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Sparkles, FileText, Shield, Cookie, Scale } from 'lucide-react'
import Link from 'next/link'

const sections = [
  { id: 'editeur', title: 'Éditeur du site', icon: FileText },
  { id: 'directeur', title: 'Directeur de publication', icon: FileText },
  { id: 'hebergement', title: 'Hébergement', icon: FileText },
  { id: 'propriete', title: 'Propriété intellectuelle', icon: Scale },
  { id: 'rgpd', title: 'Protection des données (RGPD)', icon: Shield },
  { id: 'cookies', title: 'Politique de cookies', icon: Cookie },
]

export default function MentionsLegalesPage() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="pt-20 sm:pt-24 bg-white">
      {/* Hero Section Premium */}
      <section className="relative py-12 sm:py-20 overflow-hidden bg-primary-dark">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-accent/10 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2" />
        </div>
        
        {/* Grain texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ 
          backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noise\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noise)\"%3E%3C/rect%3E%3C/svg%3E')" 
        }} />

        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary-accent" />
            <span className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-white/80">Informations légales</span>
          </div>
          
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-white leading-tight">
            Mentions{' '}
            <span className="font-accent italic text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/60">
              Légales
            </span>
          </h1>
        </motion.div>
        
        {/* Divider */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </section>

      {/* Content */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Quick Links */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-8 sm:mb-12"
          >
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full bg-gray-100 text-primary-gray hover:bg-primary-dark hover:text-white transition-all text-xs sm:text-sm active:scale-95"
              >
                <section.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">{section.title}</span>
                <span className="sm:hidden">{section.title.split(' ')[0]}</span>
              </a>
            ))}
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-xl p-5 sm:p-8 md:p-10 space-y-10 sm:space-y-12"
          >
            {/* Éditeur du site */}
            <section id="editeur" className="scroll-mt-24">
              <h2 className="font-display text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-primary-dark flex items-center gap-3">
                <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary-dark/5 flex items-center justify-center text-primary-accent">1</span>
                Éditeur du site
              </h2>
              <div className="text-primary-gray/80 space-y-3 text-sm sm:text-base leading-relaxed font-light">
                <p>Le site <strong className="text-primary-dark font-medium">2kf-securite.fr</strong> est édité par :</p>
                <div className="bg-gray-50 p-4 sm:p-6 rounded-lg sm:rounded-xl space-y-2 border-l-4 border-primary-accent">
                  <p><strong className="text-primary-dark font-semibold">2KF SÉCURITÉ</strong></p>
                  <p>Forme juridique : SASU au capital variable</p>
                  <p>Adresse : 229 Rue Saint-Honoré, 75001 Paris, France</p>
                  <p>SIRET : 934 269 713 00012</p>
                  <p>SIREN : 934 269 713</p>
                  <p>Code APE : 8010Z (Activités de sécurité privée)</p>
                  <p>Autorisation CNAPS : <strong className="text-primary-dark">AUT-075-2124-01-30-20250968268</strong></p>
                  <p className="text-xs italic mt-3 text-primary-gray/60">
                    « L'autorisation d'exercice ne confère aucune prérogative de puissance publique à l'entreprise ou aux personnes qui en bénéficient. »
                  </p>
                  <div className="pt-3 mt-3 border-t border-gray-200">
                    <p>Téléphone : 07 69 93 07 71</p>
                    <p>Email : contact@2kf-securite.fr</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Directeur de publication */}
            <section id="directeur" className="scroll-mt-24">
              <h2 className="font-display text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-primary-dark flex items-center gap-3">
                <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary-dark/5 flex items-center justify-center text-primary-accent">2</span>
                Directeur de publication
              </h2>
              <p className="text-primary-gray/80 text-sm sm:text-base leading-relaxed font-light">
                Le directeur de publication est le représentant légal de 2KF SÉCURITÉ.
              </p>
            </section>

            {/* Hébergement */}
            <section id="hebergement" className="scroll-mt-24">
              <h2 className="font-display text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-primary-dark flex items-center gap-3">
                <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary-dark/5 flex items-center justify-center text-primary-accent">3</span>
                Hébergement
              </h2>
              <p className="text-primary-gray/80 text-sm sm:text-base leading-relaxed font-light">
                Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.
              </p>
            </section>

            {/* Propriété intellectuelle */}
            <section id="propriete" className="scroll-mt-24">
              <h2 className="font-display text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-primary-dark flex items-center gap-3">
                <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary-dark/5 flex items-center justify-center text-primary-accent">4</span>
                Propriété intellectuelle
              </h2>
              <div className="text-primary-gray/80 space-y-3 text-sm sm:text-base leading-relaxed font-light">
                <p>L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle.</p>
                <p>Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.</p>
                <p>La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.</p>
              </div>
            </section>

            {/* RGPD */}
            <section id="rgpd" className="scroll-mt-24">
              <h2 className="font-display text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-primary-dark flex items-center gap-3">
                <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary-dark/5 flex items-center justify-center text-primary-accent">5</span>
                Protection des données (RGPD)
              </h2>
              <div className="text-primary-gray/80 space-y-6 text-sm sm:text-base leading-relaxed font-light">
                <div>
                  <h3 className="font-display text-base sm:text-lg font-semibold text-primary-dark mb-2">5.1. Données collectées</h3>
                  <p className="mb-2">Dans le cadre de l'utilisation du site, 2KF SÉCURITÉ peut être amenée à collecter :</p>
                  <ul className="list-disc list-inside pl-4 space-y-1 text-primary-gray/70">
                    <li>Nom et prénom</li>
                    <li>Adresse email</li>
                    <li>Numéro de téléphone</li>
                    <li>Nom de l'entreprise</li>
                    <li>Messages et fichiers joints via le formulaire de contact</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-display text-base sm:text-lg font-semibold text-primary-dark mb-2">5.2. Finalité du traitement</h3>
                  <p className="mb-2">Ces données sont collectées pour :</p>
                  <ul className="list-disc list-inside pl-4 space-y-1 text-primary-gray/70">
                    <li>Répondre à vos demandes de contact et de devis</li>
                    <li>Vous fournir des informations sur nos services</li>
                    <li>Améliorer nos services et votre expérience utilisateur</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-display text-base sm:text-lg font-semibold text-primary-dark mb-2">5.3. Vos droits</h3>
                  <p className="mb-2">Conformément au RGPD, vous disposez des droits suivants :</p>
                  <ul className="list-disc list-inside pl-4 space-y-1 text-primary-gray/70">
                    <li>Droit d'accès à vos données personnelles</li>
                    <li>Droit de rectification</li>
                    <li>Droit à l'effacement (« droit à l'oubli »)</li>
                    <li>Droit à la limitation du traitement</li>
                    <li>Droit à la portabilité</li>
                    <li>Droit d'opposition</li>
                  </ul>
                  <p className="mt-3">Pour exercer ces droits : <a href="mailto:contact@2kf-securite.fr" className="text-primary-accent hover:underline">contact@2kf-securite.fr</a></p>
                </div>
              </div>
            </section>

            {/* Cookies */}
            <section id="cookies" className="scroll-mt-24">
              <h2 className="font-display text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-primary-dark flex items-center gap-3">
                <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary-dark/5 flex items-center justify-center text-primary-accent">6</span>
                Politique de cookies
              </h2>
              <div className="text-primary-gray/80 space-y-4 text-sm sm:text-base leading-relaxed font-light">
                <p>Le site utilise des cookies pour améliorer votre expérience. Les types de cookies utilisés sont :</p>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                    <h4 className="font-semibold text-green-800 mb-2">Cookies essentiels</h4>
                    <p className="text-green-700 text-sm">Nécessaires au fonctionnement du site (préférences de consentement).</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <h4 className="font-semibold text-blue-800 mb-2">Cookies analytiques</h4>
                    <p className="text-blue-700 text-sm">Google Analytics pour comprendre l'utilisation du site (si consentement).</p>
                  </div>
                </div>

                <p>Vous pouvez modifier vos préférences à tout moment via le bouton "Gérer les cookies" en bas de page.</p>
              </div>
            </section>
          </motion.div>

          {/* Back to home */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 sm:mt-12 text-center"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-primary-gray hover:text-primary-accent transition-colors text-sm sm:text-base"
            >
              ← Retour à l'accueil
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
