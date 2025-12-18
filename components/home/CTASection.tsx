'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Phone, Shield, CheckCircle, Sparkles } from 'lucide-react'
import { analytics } from '@/lib/analytics'
import { useRef } from 'react'

export function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  return (
    <section 
      ref={containerRef} 
      className="py-16 sm:py-28 md:py-36 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-[#252645] to-primary-dark" />
      
      {/* Pattern subtil */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ 
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
      }} />

      {/* Effets de lumière statiques */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-primary-accent/10 rounded-full blur-[150px] -translate-x-1/2" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-blue-500/8 rounded-full blur-[120px] translate-x-1/2" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Badge */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mb-6 sm:mb-8"
          >
            <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-primary-accent" />
              <span className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-white/80">Prêt à sécuriser votre établissement ?</span>
            </div>
          </motion.div>

          {/* Titre */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 sm:mb-6"
          >
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Confiez-nous
              <span className="block mt-1 sm:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/60 font-accent italic">
                votre sécurité
              </span>
            </h2>
          </motion.div>

          {/* Sous-titre */}
          <motion.p
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-sm sm:text-base md:text-lg text-white/50 mb-8 sm:mb-12 max-w-2xl mx-auto font-light px-4 sm:px-0"
          >
            Devis gratuit sous 24h. Nos équipes expérimentées sont à votre écoute 
            pour définir la solution adaptée à vos besoins.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-10 sm:mb-16 px-4 sm:px-0"
          >
            <Link
              href="/contact"
              className="group relative inline-flex h-12 sm:h-14 items-center justify-center gap-2 sm:gap-3 overflow-hidden rounded-full bg-white px-6 sm:px-8 font-display font-semibold text-sm sm:text-base text-primary-dark transition-all duration-300 hover:shadow-[0_0_50px_rgba(255,255,255,0.4)] active:scale-[0.98]"
              onClick={() => analytics.trackCTAClick('Demander un devis gratuit', 'CTA Section')}
            >
              <span className="relative z-10">Demander un devis gratuit</span>
              <ArrowRight className="relative z-10 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            
            <Link
              href="tel:+33769930771"
              className="group flex h-12 sm:h-14 items-center justify-center gap-2 sm:gap-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm px-6 sm:px-8 font-semibold text-sm sm:text-base text-white transition-all duration-300 hover:bg-white/10 active:scale-[0.98]"
              onClick={() => analytics.trackPhoneClick('07 69 93 07 71')}
            >
              <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>07 69 93 07 71</span>
            </Link>
          </motion.div>

          {/* Points de réassurance */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-x-4 sm:gap-x-8 gap-y-3 sm:gap-y-4 px-4 sm:px-0"
          >
            {[
              'Devis sous 24h',
              'Agréé CNAPS',
              'Sans engagement',
              '+20 ans d\'expérience'
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-1.5 sm:gap-2 text-white/50"
              >
                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-primary-accent flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium">{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </section>
  )
}
