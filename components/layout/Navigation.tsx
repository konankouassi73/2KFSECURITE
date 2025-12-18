'use client'
// Navigation avec style adaptatif selon la page

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useReducedMotion } from 'framer-motion'
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { name: 'Accueil', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Entreprise', href: '/entreprise' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Contact', href: '/contact' },
]

export function Navigation() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const { scrollY } = useScroll()
  
  // La page d'accueil a un hero sombre, donc on peut avoir un fond transparent
  const isHomePage = pathname === '/' || pathname === ''
  
  // Déterminer si on doit utiliser le style clair (texte sombre sur fond blanc)
  const useLightStyle = isScrolled || !isHomePage

  // Optimisé avec throttling implicite de Framer Motion
  useMotionValueEvent(scrollY, "change", useCallback((latest: number) => {
    const previous = scrollY.getPrevious() || 0
    if (latest > previous && latest > 150) {
      setHidden(true)
    } else {
      setHidden(false)
    }
    setIsScrolled(latest > 50)
  }, [scrollY]))

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  return (
    <>
    <motion.nav
      initial={{ y: -100 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled ? 'py-3' : 'py-5'
        )}
      >
        {/* Backdrop avec glass premium */}
        <motion.div 
          className={cn(
            "absolute inset-0 transition-all duration-500",
            useLightStyle
              ? "bg-white/90 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.08)] border-b border-gray-100"
              : "bg-transparent" // Page d'accueil sans scroll : fond transparent pour continuité avec le hero
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
        
        {/* Ligne de progression subtile */}
        {isScrolled && (
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary-accent via-primary-dark to-primary-accent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5 }}
            style={{ transformOrigin: 'left' }}
          />
        )}

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between">
            {/* Logo Premium */}
            <Link href="/" className="flex items-center gap-2 group">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="relative"
              >
                <Image
                  src="/images/logo.png"
                  alt="2KF Sécurité"
                  width={45}
                  height={45}
                  className="object-contain"
                  priority
                />
              </motion.div>
              <div className="flex flex-col">
                <span className={cn(
                  "text-lg font-display font-bold tracking-tight transition-colors duration-300",
                  useLightStyle ? "text-primary-dark" : "text-white"
                )}>
                  2KF SÉCURITÉ
                </span>
              </div>
          </Link>

            {/* Desktop Menu Premium */}
            <div className="hidden md:flex items-center gap-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "relative px-5 py-2.5 text-sm font-medium transition-colors duration-200 rounded-full",
                        useLightStyle 
                          ? isActive 
                            ? "text-primary-dark" 
                            : "text-primary-gray/70 hover:text-primary-dark hover:bg-primary-dark/5"
                          : isActive
                            ? "text-white"
                            : "text-white/70 hover:text-white hover:bg-white/10"
                      )}
                    >
                      {item.name}
                      
                      {/* Active indicator - sans animation */}
                      {isActive && (
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary-accent" />
                      )}
                    </Link>
                  )
                })}
              
              {/* CTA Button Premium */}
            <Link
              href="/contact"
                className={cn(
                  "relative ml-6 px-7 py-3 rounded-full font-display font-semibold text-sm overflow-hidden group transition-all duration-500",
                  useLightStyle
                    ? "bg-primary-dark text-white hover:shadow-[0_10px_40px_-10px_rgba(50,51,88,0.5)]"
                    : "bg-white text-primary-dark hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.5)]"
                )}
              >
                {/* Gradient border animation */}
                <motion.div
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(199,68,73,0.3), transparent)',
                    backgroundSize: '200% 100%',
                  }}
                  animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                
                <span className="relative z-10 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              Devis Gratuit
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
                
                {/* Shine effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </Link>
          </div>

            {/* Mobile Menu Button Premium */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "md:hidden relative p-3 rounded-full transition-all duration-300 overflow-hidden group",
                useLightStyle 
                  ? "text-primary-dark hover:bg-primary-dark/5" 
                  : "text-white hover:bg-white/10"
              )}
            aria-label="Toggle menu"
          >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </motion.div>
          </button>
        </div>
      </div>
      </motion.nav>

      {/* Mobile Menu Fullscreen Premium */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop avec grain */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-primary-dark/98 backdrop-blur-2xl"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {/* Grain texture */}
              <div className="absolute inset-0 opacity-[0.03]" style={{ 
                backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noise\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noise)\"%3E%3C/rect%3E%3C/svg%3E')" 
              }} />
              
              {/* Effets de lumière */}
              <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary-accent/10 rounded-full blur-[150px]" />
              <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px]" />
            </motion.div>

            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="relative h-full flex flex-col items-center justify-center px-8"
            >
              <div className="w-full max-w-sm space-y-1">
                {navItems.map((item, index) => {
                  const isActive = pathname === item.href
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ delay: 0.15 + index * 0.07 }}
                    >
                <Link
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "group flex items-center justify-between text-4xl font-display font-bold py-4 transition-all duration-300",
                          isActive 
                            ? "text-white" 
                            : "text-white/40 hover:text-white hover:translate-x-2"
                        )}
                      >
                        <span>{item.name}</span>
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 rounded-full bg-primary-accent"
                          />
                        )}
                      </Link>
                      
                      {/* Separator line */}
                      {index < navItems.length - 1 && (
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ delay: 0.2 + index * 0.07 }}
                          className="h-px bg-gradient-to-r from-white/10 to-transparent"
                          style={{ transformOrigin: 'left' }}
                        />
                      )}
                    </motion.div>
                  )
                })}
                
                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ delay: 0.5 }}
                  className="pt-10"
                >
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                    className="group flex items-center justify-center gap-3 w-full py-5 bg-white text-primary-dark rounded-full font-display font-bold text-lg hover:bg-primary-accent hover:text-white transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(199,68,73,0.5)]"
              >
                    <Sparkles className="w-5 h-5" />
                Devis Gratuit
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
                </motion.div>

                {/* Contact info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="pt-10 text-center space-y-3"
                >
                  <a 
                    href="tel:+33769930771" 
                    className="block text-2xl font-display font-light text-white/60 hover:text-white transition-colors"
                  >
                    07 69 93 07 71
                  </a>
                  <p className="text-xs text-white/30 tracking-wider">
                    DISPONIBLE 24H/24 • 7J/7
                  </p>
                </motion.div>
            </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
