'use client'

import { motion } from 'framer-motion'
import { Shield, Award, Users, Clock, Lock, CheckCircle } from 'lucide-react'

const certifications = [
  { icon: Shield, label: 'Agrément CNAPS', sublabel: 'Activité réglementée' },
  { icon: Award, label: 'Certification SSIAP', sublabel: 'Niveaux 1, 2 et 3' },
  { icon: Lock, label: 'Assurance RC Pro', sublabel: 'Couverture complète' },
  { icon: Users, label: 'Agents Qualifiés', sublabel: 'Formation continue' },
  { icon: CheckCircle, label: 'Conformité RGPD', sublabel: 'Données protégées' },
  { icon: Clock, label: 'Service 24/7', sublabel: 'Astreinte permanente' },
]

export function Certifications() {
  return (
    <section className="py-20 md:py-24 bg-white relative overflow-hidden">
      {/* Ligne décorative supérieure */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-dark/10 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-label text-primary-accent">Nos garanties</span>
          <h3 className="font-display text-display-md font-bold text-primary-dark mt-2">Une qualité <span className="font-accent italic">certifiée</span></h3>
        </motion.div>

        {/* Grille de certifications premium */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {certifications.map((cert, index) => {
            const Icon = cert.icon
            return (
              <motion.div
                key={cert.label}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative p-6 bg-gradient-to-b from-gray-50 to-white rounded-2xl border border-gray-100 hover:border-primary-accent/30 hover:shadow-xl hover:shadow-primary-accent/5 transition-all duration-300"
              >
                {/* Glow effect au survol */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="mb-4 p-3 rounded-xl bg-primary-dark/5 group-hover:bg-primary-accent/10 transition-colors duration-300">
                    <Icon className="h-6 w-6 text-primary-dark group-hover:text-primary-accent transition-colors duration-300" />
                  </div>
                  <h4 className="font-semibold text-primary-dark text-sm md:text-base mb-1">{cert.label}</h4>
                  <p className="text-xs text-primary-gray/60">{cert.sublabel}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Ligne décorative inférieure */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-dark/10 to-transparent" />
    </section>
  )
}
