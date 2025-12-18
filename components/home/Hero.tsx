'use client'

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowRight, ShieldCheck, Building2, Flame, ChevronDown, Sparkles } from 'lucide-react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { analytics } from '@/lib/analytics'
import { useRef, useEffect, useState } from 'react'

// Lazy loading du composant 3D avec préférence pour la performance
const SecurityShield3D = dynamic(
  () => import('@/components/3d/SecurityShield3D').then(mod => ({ default: mod.SecurityShield3D })), 
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-gradient-to-br from-primary-dark/20 to-primary-accent/10" />
    )
  }
)

// Compteur animé optimisé
function AnimatedCounter({ value, suffix = '', duration = 2 }: { value: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) {
      setCount(value)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const end = value
          const totalFrames = duration * 30 // Réduit de 60 à 30 FPS
          const increment = end / totalFrames
          let current = 0
          let frame = 0
          
          const animate = () => {
            frame++
            current += increment
            if (frame >= totalFrames) {
              setCount(end)
            } else {
              setCount(Math.floor(current))
              requestAnimationFrame(animate)
            }
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value, duration, hasAnimated, prefersReducedMotion])

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-display font-bold text-white tabular-nums">
      {count}{suffix}
    </div>
  )
}

// Particules optimisées - client-side uniquement pour éviter l'hydration mismatch
function FloatingParticles() {
  const prefersReducedMotion = useReducedMotion()
  const [particles, setParticles] = useState<Array<{
    id: number
    left: string
    top: string
    size: number
    delay: string
    duration: string
  }>>([])

  // Génère les particules uniquement côté client
  useEffect(() => {
    if (prefersReducedMotion) return
    
    const newParticles = [...Array(8)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      delay: `${Math.random() * 5}s`,
      duration: `${Math.random() * 4 + 6}s`,
    }))
    setParticles(newParticles)
  }, [prefersReducedMotion])

  if (prefersReducedMotion || particles.length === 0) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-white/20 animate-float-up"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  )
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [show3D, setShow3D] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 100])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])

  // Afficher le 3D seulement après le premier rendu et si visible
  useEffect(() => {
    const timer = setTimeout(() => setShow3D(true), 500)
    return () => clearTimeout(timer)
  }, [])

  // Désactiver le 3D quand on scroll trop loin (performance)
  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      if (latest > 800 && show3D) {
        setShow3D(false)
      } else if (latest <= 800 && !show3D) {
        setShow3D(true)
      }
    })
    return () => unsubscribe()
  }, [scrollY, show3D])

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen w-full overflow-hidden bg-primary-dark text-white flex items-center"
    >
      {/* Background avec Parallax - simplifié */}
      <motion.div 
        style={{ y: prefersReducedMotion ? 0 : y }} 
        className="absolute inset-0 z-0 will-change-transform"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-dark via-primary-dark/95 to-primary-dark" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-transparent to-primary-dark/80" />
      </motion.div>

      {/* Effets de lumière simplifiés - sans animation continue */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary-accent/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      {!prefersReducedMotion && <FloatingParticles />}

      {/* Animation 3D - conditionnelle */}
      {show3D && !prefersReducedMotion && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="w-full h-full opacity-50">
            <SecurityShield3D />
          </div>
        </div>
      )}

      {/* Contenu principal */}
      <motion.div 
        style={{ opacity: prefersReducedMotion ? 1 : opacity }} 
        className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 will-change-opacity"
      >
        <div className="max-w-4xl">
          
          {/* Badge premium */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 sm:gap-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 px-4 sm:px-5 py-2 sm:py-2.5 mb-6 sm:mb-8"
          >
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-primary-accent" />
            <span className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-white/90">Plus de 20 ans d'expertise terrain</span>
          </motion.div>

          {/* Titre */}
          <div className="overflow-hidden mb-5 sm:mb-8">
            <motion.h1
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05]"
            >
              <span className="block">Votre sécurité,</span>
              <span className="block mt-1 sm:mt-2 font-accent italic text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/60">
                notre expertise.
              </span>
            </motion.h1>
          </div>

          {/* Sous-titre */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-xl text-base sm:text-lg md:text-xl text-white/60 leading-relaxed mb-8 sm:mb-10 font-light"
          >
            Spécialiste du gardiennage et de la sécurité incendie pour les ERP et IGH. 
            Une équipe de professionnels expérimentés au service de votre protection.
          </motion.p>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-12"
          >
            {[
              { icon: Building2, label: 'ERP & IGH' },
              { icon: Flame, label: 'SSIAP Certifié' },
              { icon: ShieldCheck, label: 'Agréé CNAPS' },
            ].map((tag) => (
              <div
                key={tag.label}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full active:scale-95 transition-transform"
              >
                <tag.icon className="h-3 w-3 sm:h-4 sm:w-4 text-primary-accent" />
                <span className="text-xs sm:text-sm font-medium text-white/80">{tag.label}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4"
          >
            <Link
              href="/contact"
              className="group relative flex h-12 sm:h-14 items-center justify-center sm:justify-start gap-2 sm:gap-3 overflow-hidden rounded-full bg-white px-6 sm:px-8 font-semibold text-primary-dark transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] active:scale-[0.98]"
              onClick={() => analytics.trackCTAClick('Demander un devis', 'Hero')}
            >
              <span className="relative z-10 text-sm sm:text-base">Demander un devis gratuit</span>
              <ArrowRight className="relative z-10 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            
            <Link
              href="/services"
              className="group flex h-12 sm:h-14 items-center justify-center gap-2 sm:gap-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm px-6 sm:px-8 font-semibold text-white transition-all duration-300 hover:bg-white/10 active:scale-[0.98] text-sm sm:text-base"
              onClick={() => analytics.trackCTAClick('Découvrir nos services', 'Hero')}
            >
              Découvrir nos services
            </Link>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-12 sm:mt-20 grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl"
        >
          {[
            { value: 20, suffix: '+', label: "Années d'expérience" },
            { value: 100, suffix: '%', label: 'Agents certifiés' },
            { value: 24, suffix: '/7', label: 'Disponibilité' },
          ].map((stat) => (
            <div key={stat.label} className="text-center sm:text-left">
              <div className="text-2xl sm:text-4xl md:text-5xl font-display font-bold text-white tabular-nums">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-[10px] sm:text-sm text-white/40 mt-0.5 sm:mt-1 font-light leading-tight">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="flex flex-col items-center gap-2 text-white/30 cursor-pointer animate-bounce-slow">
          <span className="text-label">Découvrir</span>
          <ChevronDown className="h-5 w-5" />
        </div>
      </motion.div>

      {/* Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-accent/30 to-transparent" />
    </section>
  )
}
