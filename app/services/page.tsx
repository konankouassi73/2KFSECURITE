'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Shield, Users, Calendar, Building, Camera, Flame, Check, ArrowRight, Clock, Sparkles } from 'lucide-react'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'

const services = [
  {
    id: 'gardiennage',
    icon: Shield,
    title: 'Gardiennage',
    description: 'Surveillance et contrôle d\'accès de vos locaux par des agents professionnels formés et certifiés CNAPS.',
    features: [
      'Agents qualifiés avec carte professionnelle CNAPS',
      'Présence 24h/24 ou selon horaires définis',
      'Contrôle d\'accès et filtrage des entrées',
      'Main courante et rapports détaillés',
      'Gestion des clés et des alarmes',
    ],
    image: "/images/Gardiennage.png",
    color: 'from-blue-500 to-indigo-600',
  },
  {
    id: 'rondes',
    icon: Clock,
    title: 'Rondes & Interventions',
    description: 'Patrouilles de surveillance régulières et interventions rapides sur alarme pour sécuriser vos sites.',
    features: [
      'Rondes de surveillance à horaires fixes ou aléatoires',
      'Vérification des accès et points sensibles',
      'Intervention rapide sur déclenchement d\'alarme',
      'Rapport de passage horodaté et géolocalisé',
      'Couverture multi-sites économique',
    ],
    image: "/images/rondes-interventions.png",
    color: 'from-purple-500 to-pink-600',
  },
  {
    id: 'evenementiel',
    icon: Calendar,
    title: 'Sécurité Événementielle',
    description: 'Sécurisation de vos événements professionnels, salons, manifestations et rassemblements.',
    features: [
      'Gestion des flux et contrôle des accès',
      'Agents en uniforme ou tenue adaptée',
      'Coordination avec les services de secours',
      'Plan de prévention et d\'évacuation',
      'Gestion des situations conflictuelles',
    ],
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop",
    color: 'from-orange-500 to-red-500',
  },
  {
    id: 'erp',
    icon: Building,
    title: 'Sécurité ERP & IGH',
    description: 'Expertise spécifique pour les Établissements Recevant du Public et Immeubles de Grande Hauteur.',
    features: [
      'Connaissance des réglementations ERP et IGH',
      'Agents formés aux spécificités de ces établissements',
      'Coordination avec les services de sécurité internes',
      'Respect des consignes de sécurité propres au site',
      'Gestion des situations d\'urgence',
    ],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    color: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'video',
    icon: Camera,
    title: 'Vidéosurveillance',
    description: 'Installation de systèmes de vidéosurveillance et services de télésurveillance 24h/24.',
    features: [
      'Étude et installation de systèmes adaptés',
      'Télésurveillance 24/7 par notre centrale',
      'Levée de doute vidéo en cas d\'alerte',
      'Maintenance et SAV des équipements',
      'Conformité RGPD et CNIL',
    ],
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=2070&auto=format&fit=crop",
    color: 'from-cyan-500 to-blue-600',
  },
  {
    id: 'ssiap',
    icon: Flame,
    title: 'Sécurité Incendie SSIAP',
    description: 'Agents SSIAP certifiés pour la prévention incendie et l\'assistance aux personnes dans vos établissements.',
    features: [
      'Agents SSIAP 1, 2 et 3 certifiés et recyclés',
      'Rondes de prévention et vérification des équipements',
      'Gestion du PC de sécurité et des alarmes SSI',
      'Assistance à l\'évacuation des personnes',
      'Tenue du registre de sécurité',
    ],
    image: "/images/ssiap-incendie.png",
    color: 'from-red-500 to-orange-500',
  },
]

function ServiceDetail({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const prefersReducedMotion = useReducedMotion()
  const Icon = service.icon

  return (
    <motion.section
      ref={ref}
      id={service.id}
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="py-16 sm:py-24 scroll-mt-20 overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className={index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}>
            <motion.div
              className="relative p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-gray-100 bg-white shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-500"
              whileHover={prefersReducedMotion ? {} : { y: -5 }}
            >
              {/* Background icon */}
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] transform translate-x-10 -translate-y-10">
                <Icon size={200} />
              </div>

              <div className="relative z-10">
                <div className={`inline-flex p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br ${service.color} mb-6 sm:mb-8 shadow-lg text-white`}>
                  <Icon size={24} className="sm:w-8 sm:h-8" />
                </div>
                
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-primary-dark">
                  {service.title}
                </h2>
                <p className="text-primary-gray/70 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 leading-relaxed font-light">
                  {service.description}
                </p>
                
                <ul className="space-y-3 sm:space-y-4">
                  {service.features.map((feature, idx) => (
                    <motion.li
                      key={idx}
                      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.2 + idx * 0.1 }}
                      className="flex items-start gap-3 group/item"
                    >
                      <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary-accent/10 flex items-center justify-center mt-0.5">
                        <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary-accent" />
                      </div>
                      <span className="text-primary-gray text-sm sm:text-base">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          <div className={index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}>
            <motion.div
              className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl group"
              whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
              transition={{ duration: 0.5 }}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('${service.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-transparent to-transparent opacity-60" />
              
              {/* Badge sur l'image */}
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                <div className="flex items-center gap-2 text-white/90">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="font-display font-semibold text-sm sm:text-base">{service.title}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default function ServicesPage() {
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
            <span className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-white/80">Nos Services</span>
          </div>
          
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 text-white leading-tight">
            Des solutions{' '}
            <span className="font-accent italic text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/60">
              sur mesure
            </span>
          </h1>
          
          <p className="text-white/60 text-sm sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light px-4">
            Gardiennage, sécurité incendie, rondes de surveillance : découvrez nos prestations adaptées à vos besoins.
          </p>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-8 sm:mt-12">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`#${service.id}`}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all text-xs sm:text-sm active:scale-95"
              >
                <service.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">{service.title}</span>
                <span className="sm:hidden">{service.title.split(' ')[0]}</span>
              </Link>
            ))}
          </div>
        </motion.div>
        
        {/* Divider */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </section>

      {/* Services */}
      <div className="divide-y divide-gray-100">
        {services.map((service, index) => (
          <ServiceDetail key={service.id} service={service} index={index} />
        ))}
      </div>
      
      {/* Call to Action Premium */}
      <section className="py-16 sm:py-24 bg-primary-dark relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-primary-accent/10 rounded-full blur-[150px] -translate-x-1/2" />
          <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[120px] translate-x-1/2" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
              Besoin d'un devis{' '}
              <span className="font-accent italic text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
                personnalisé ?
              </span>
            </h2>
            <p className="text-white/50 text-sm sm:text-lg mb-8 sm:mb-10 max-w-2xl mx-auto font-light px-4">
              Nous nous déplaçons gratuitement pour évaluer vos besoins et vous proposer une solution adaptée à votre budget.
            </p>
            
            <Link 
              href="/contact" 
              className="group inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white text-primary-dark rounded-full font-display font-semibold text-sm sm:text-lg transition-all duration-300 hover:shadow-[0_0_50px_rgba(255,255,255,0.3)] active:scale-[0.98]"
            >
              Demander un devis gratuit
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
        
        {/* Divider */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </section>
    </div>
  )
}
