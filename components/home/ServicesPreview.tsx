'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { Shield, Users, Building, Camera, Flame, ArrowRight, Clock, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { memo } from 'react'

const services = [
  {
    title: "Gardiennage",
    description: "Surveillance et contrôle d'accès 24h/24. Agents qualifiés pour sécuriser vos locaux professionnels.",
    icon: Shield,
    className: "md:col-span-2 md:row-span-2",
    href: "/services#gardiennage",
    image: "/images/Gardiennage.png",
    accent: "from-blue-500 to-indigo-600",
    stats: { value: "24/7", label: "Surveillance" }
  },
  {
    title: "Sécurité Événementielle",
    description: "Gestion des flux et contrôle d'accès pour vos événements professionnels.",
    icon: Users,
    className: "md:col-span-1 md:row-span-1",
    href: "/services#evenementiel",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop",
    accent: "from-orange-500 to-red-500",
    stats: { value: "100%", label: "Réussite" }
  },
  {
    title: "Rondes & Interventions",
    description: "Patrouilles régulières et interventions rapides sur alarme.",
    icon: Clock,
    className: "md:col-span-1 md:row-span-1",
    href: "/services#rondes",
    image: "/images/rondes-interventions.png",
    accent: "from-purple-500 to-pink-500",
    stats: { value: "< 30", label: "min" }
  },
  {
    title: "Vidéosurveillance",
    description: "Installation et télésurveillance 24/7 avec levée de doute vidéo.",
    icon: Camera,
    className: "md:col-span-1 md:row-span-2",
    href: "/services#video",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=2070&auto=format&fit=crop",
    accent: "from-cyan-500 to-blue-500",
    stats: { value: "HD", label: "Qualité" }
  },
  {
    title: "SSIAP Incendie",
    description: "Agents SSIAP certifiés pour vos ERP et IGH.",
    icon: Flame,
    className: "md:col-span-1 md:row-span-1",
    href: "/services#ssiap",
    image: "/images/ssiap-incendie.png",
    accent: "from-red-500 to-orange-500",
    stats: { value: "SSIAP", label: "Certifié" }
  },
  {
    title: "ERP & IGH",
    description: "Expertise dédiée aux Établissements Recevant du Public.",
    icon: Building,
    className: "md:col-span-1 md:row-span-1",
    href: "/services#erp",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    accent: "from-emerald-500 to-teal-500",
    stats: { value: "Pro", label: "Expertise" }
  },
]

// Carte optimisée - sans effets 3D coûteux
const ServiceCard = memo(function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const prefersReducedMotion = useReducedMotion()
  const Icon = service.icon

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl cursor-pointer",
        service.className
      )}
    >
      {/* Lien accessible */}
      <Link
        href={service.href}
        className="absolute inset-0 z-30"
        aria-label={`Voir ${service.title}`}
      >
        <span className="sr-only">Voir {service.title}</span>
      </Link>

      {/* Image de fond avec lazy loading */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
        style={{ backgroundImage: `url(${service.image})` }}
      />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 transition-opacity duration-300 group-hover:from-black/95" />

      {/* Contenu */}
      <div className="relative z-20 h-full min-h-[220px] sm:min-h-[280px] p-4 sm:p-6 flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className={cn(
            "w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 group-active:scale-95",
            service.accent
          )}>
            <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>
          
          {/* Stats badge */}
          <div className="text-right">
            <div className="text-xl sm:text-2xl font-display font-bold text-white">{service.stats.value}</div>
            <div className="text-[10px] sm:text-xs text-white/60 uppercase tracking-wider">{service.stats.label}</div>
          </div>
        </div>

        {/* Footer */}
        <div>
          <h4 className="text-lg sm:text-xl font-display font-bold text-white mb-1.5 sm:mb-2 group-hover:text-primary-accent transition-colors">
            {service.title}
          </h4>
          <p className="text-xs sm:text-sm text-white/70 leading-relaxed line-clamp-2 mb-3 sm:mb-4">
            {service.description}
          </p>
          
          {/* CTA */}
          <div className="flex items-center gap-2 text-white/60 group-hover:text-white group-active:text-primary-accent transition-colors">
            <span className="text-xs sm:text-sm font-medium">Découvrir</span>
            <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </div>
        </div>
      </div>

      {/* Border glow on hover */}
      <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-white/20 transition-colors duration-300 pointer-events-none" />
    </motion.div>
  )
})

export function ServicesPreview() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="py-16 sm:py-24 md:py-32 bg-gradient-to-b from-white to-gray-50/50 relative overflow-hidden">
      {/* Background décoratif simplifié */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary-accent/5 rounded-full blur-[80px] sm:blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary-dark/5 rounded-full blur-[80px] sm:blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 sm:gap-8 mb-10 sm:mb-16">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-primary-accent mb-3 sm:mb-4 block">Nos Services</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-dark leading-tight">
              Des solutions
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-dark to-primary-gray/70 font-accent italic">
                sur mesure
              </span>
            </h2>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-primary-gray/70 max-w-lg font-light">
              Chaque établissement est unique. Nous concevons des dispositifs de sécurité adaptés à vos contraintes et vos exigences.
            </p>
          </motion.div>
          
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 md:mt-0"
          >
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-primary-dark text-white rounded-full font-semibold text-sm sm:text-base transition-all duration-300 hover:bg-primary-accent hover:shadow-lg active:scale-95"
            >
              Tous nos services
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Grille de services */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
