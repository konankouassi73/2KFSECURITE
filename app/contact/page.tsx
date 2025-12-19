'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Mail, Phone, MapPin, MessageSquare, Clock, Sparkles, CheckCircle } from 'lucide-react'
import { ContactForm } from '@/components/contact/ContactForm'
import { MapSection } from '@/components/contact/MapSection'

const contactInfo = [
  {
    icon: Phone,
    label: 'Téléphone',
    values: ['07 69 93 07 71', '06 51 64 02 65'],
    href: ['tel:+33769930771', 'tel:+33651640265'],
  },
  {
    icon: Mail,
    label: 'Email',
    values: ['2kfsecurite@gmail.com'],
    href: ['mailto:2kfsecurite@gmail.com'],
  },
  {
    icon: MapPin,
    label: 'Siège Social',
    values: ['229 Rue Saint-Honoré', '75001 Paris'],
    href: [],
  },
]

const hours = [
  { day: 'Lundi - Vendredi', time: '9h00 - 18h00', highlight: false },
  { day: 'Samedi', time: 'Sur rendez-vous', highlight: false },
  { day: 'Dimanche', time: 'Astreinte 24/7', highlight: true },
]

export default function ContactPage() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="pt-20 sm:pt-24 bg-white">
      {/* Hero Section Premium */}
      <section className="relative py-16 sm:py-24 overflow-hidden bg-primary-dark">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-primary-accent/10 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-blue-500/10 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2" />
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
          <div className="inline-flex items-center gap-2 mb-6 sm:mb-8 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary-accent" />
            <span className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-white/80">Contact</span>
          </div>
          
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 text-white leading-tight">
            Une question ?{' '}
            <span className="block sm:inline font-accent italic text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/60">
              Parlons-en.
            </span>
          </h1>
          
          <p className="text-white/60 text-sm sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light px-4">
            Audit sécuritaire offert. Déploiement en 24h. Nos experts analysent vos besoins et conçoivent une solution sur-mesure.
          </p>

          {/* Quick CTA */}
          <div className="flex flex-wrap justify-center gap-3 mt-8 sm:mt-12">
            <a
              href="tel:+33769930771"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white text-primary-dark font-display font-semibold text-sm sm:text-base transition-all hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] active:scale-[0.98]"
            >
              <Phone className="w-4 h-4" />
              <span>07 69 93 07 71</span>
            </a>
            <a
              href="mailto:2kfsecurite@gmail.com"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white/5 border border-white/20 text-white font-display font-semibold text-sm sm:text-base transition-all hover:bg-white/10 active:scale-[0.98]"
            >
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">2kfsecurite@gmail.com</span>
              <span className="sm:hidden">Email</span>
            </a>
          </div>
        </motion.div>
        
        {/* Divider */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </section>

      {/* Contact Info & Form */}
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Contact Info - Side Panel */}
            <div className="lg:col-span-4 space-y-6 sm:space-y-8">
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-primary-dark text-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl relative overflow-hidden"
              >
                {/* Decoration */}
                <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-primary-accent rounded-full blur-3xl opacity-20 -mr-12 sm:-mr-16 -mt-12 sm:-mt-16" />
                <div className="absolute bottom-0 left-0 w-24 sm:w-32 h-24 sm:h-32 bg-blue-500 rounded-full blur-3xl opacity-20 -ml-12 sm:-ml-16 -mb-12 sm:-mb-16" />
                
                <h2 className="font-display text-xl sm:text-2xl font-bold mb-6 sm:mb-8 relative z-10">
                  Nos Coordonnées
                </h2>
                
                <div className="space-y-6 sm:space-y-8 relative z-10">
                  {contactInfo.map((info) => (
                    <div key={info.label} className="flex items-start gap-3 sm:gap-4">
                      <div className="p-2.5 sm:p-3 bg-white/10 rounded-lg sm:rounded-xl backdrop-blur-sm flex-shrink-0">
                        <info.icon className="text-primary-accent w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <div>
                        <div className="text-gray-300 text-xs sm:text-sm font-semibold mb-1">{info.label}</div>
                        {info.values.map((value, idx) => (
                          info.href[idx] ? (
                            <a 
                              key={value} 
                              href={info.href[idx]} 
                              className="text-sm sm:text-lg font-bold hover:text-primary-accent active:text-primary-accent transition-colors block break-all"
                            >
                              {value}
                            </a>
                          ) : (
                            <span key={value} className="text-sm sm:text-lg font-bold block">{value}</span>
                          )
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10">
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <Clock size={16} className="text-primary-accent sm:w-5 sm:h-5" />
                    <h3 className="font-display font-bold text-sm sm:text-base">Horaires d'ouverture</h3>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
                    {hours.map((hour) => (
                      <li key={hour.day} className="flex justify-between">
                        <span>{hour.day}</span>
                        <span className={hour.highlight ? 'text-primary-accent font-medium' : 'text-white font-medium'}>
                          {hour.time}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Guarantees */}
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-gray-50 p-5 sm:p-6 rounded-xl sm:rounded-2xl"
              >
                <h3 className="font-display font-bold text-primary-dark mb-4 text-sm sm:text-base">Nos garanties</h3>
                <ul className="space-y-3">
                  {['Réponse sous 24h', 'Devis gratuit et sans engagement', 'Audit de sécurité offert'].map((item) => (
                    <li key={item} className="flex items-center gap-2 sm:gap-3 text-primary-gray text-xs sm:text-sm">
                      <CheckCircle className="w-4 h-4 text-primary-accent flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Form */}
            <div className="lg:col-span-8">
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-6 sm:mb-8">
                  <div className="p-2.5 sm:p-3 bg-primary-accent/10 rounded-full">
                    <MessageSquare className="text-primary-accent w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-primary-dark">
                    Envoyez-nous un message
                  </h2>
                </div>
                
                <ContactForm />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <MapSection />
    </div>
  )
}
