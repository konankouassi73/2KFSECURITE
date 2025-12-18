'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Shield, Users, Award, Clock, Heart, CheckCircle, Building2, Flame, Sparkles, ArrowRight, GraduationCap, Briefcase, Star, BadgeCheck } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const values = [
  {
    icon: Shield,
    title: 'Professionnalisme',
    description: 'Agents formés et certifiés CNAPS. Chaque membre de notre équipe respecte un strict code de déontologie.',
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    icon: Users,
    title: 'Expérience Terrain',
    description: 'Une équipe de professionnels avec plus de 20 ans d\'expérience dans le gardiennage et la sécurité incendie.',
    gradient: 'from-purple-500 to-pink-600',
  },
  {
    icon: Award,
    title: 'Certifications',
    description: 'Agrément CNAPS, agents SSIAP 1, 2 et 3 certifiés. Formations continues et recyclages réguliers.',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    icon: Building2,
    title: 'Expertise ERP & IGH',
    description: 'Connaissance approfondie des réglementations spécifiques aux Établissements Recevant du Public et IGH.',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    icon: Clock,
    title: 'Disponibilité 24/7',
    description: 'Une astreinte permanente pour répondre à vos besoins. Intervention rapide en cas d\'urgence.',
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    icon: Heart,
    title: 'Relation Client',
    description: 'Un interlocuteur dédié, des rapports réguliers et une communication transparente avec nos clients.',
    gradient: 'from-rose-500 to-pink-600',
  },
]

const founderCertifications = [
  { year: '2024', title: 'D2SP', description: 'Dirigeant de société de sécurité privée' },
  { year: '2024', title: 'SSIAP 2', description: 'Chef d\'équipe de sécurité incendie' },
  { year: '2023', title: 'HOB-BO-BS', description: 'Habilitation électrique' },
  { year: '2022', title: 'Formateur SST', description: 'Sauveteur Secouriste du Travail' },
]

const founderExperience = [
  { period: '2020 - 2024', role: 'Agent SSIAP 1', company: 'S3M Sécurité', location: 'Hôpital intercommunal de Créteil' },
  { period: '2012 - 2020', role: 'Agent SSIAP 1', company: 'CEJIP Sécurité', location: 'Hôpital intercommunal de Créteil' },
  { period: '2007 - 2012', role: 'Agent SSIAP 1', company: 'SPP Sécurité', location: 'Hôpital intercommunal de Créteil' },
  { period: '2006 - 2007', role: 'Agent SSIAP 1', company: 'ASER Sécurité', location: 'Centre commercial Ivry Grand Ciel' },
  { period: '2003 - 2006', role: 'Agent SSIAP 1', company: 'GPS / Base Sécurité', location: 'Magasin Truffaut Ivry-sur-Seine' },
]

export default function EntreprisePage() {
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
            <span className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-white/80">Qui sommes-nous</span>
          </div>
          
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 text-white leading-tight">
            L'expertise au service{' '}
            <span className="block sm:inline font-accent italic text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/60">
              de votre sécurité
            </span>
          </h1>
          
          <p className="text-white/60 text-sm sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-light px-4">
            Fondée par des professionnels de terrain cumulant plus de 20 ans d'expérience, 2KF SÉCURITÉ met son savoir-faire au service de la protection de vos établissements.
          </p>
        </motion.div>
        
        {/* Divider */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </section>

      {/* Présentation */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            <motion.div 
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:w-1/2 relative w-full"
            >
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] group">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop')" }}
                />
                <div className="absolute inset-0 bg-primary-dark/20" />
              </div>
              
              {/* Badge Flottant */}
              <motion.div 
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-8 bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 max-w-[200px] sm:max-w-xs"
              >
                <div className="flex items-center gap-3 sm:gap-4 mb-2">
                  <div className="p-2 sm:p-3 bg-green-100 rounded-full text-green-600">
                    <CheckCircle size={20} className="sm:w-6 sm:h-6" />
                  </div>
                  <div className="font-display font-bold text-primary-dark text-sm sm:text-lg">Agréé CNAPS</div>
                </div>
                <p className="text-[10px] sm:text-sm text-gray-500">Autorisation d'exercice CNAPS</p>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:w-1/2 mt-8 lg:mt-0"
            >
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-primary-dark">
                Des professionnels passionnés par leur métier
              </h2>
              <div className="space-y-4 sm:space-y-6 text-sm sm:text-base md:text-lg text-primary-gray/70 leading-relaxed font-light">
                <p>
                  <strong className="text-primary-dark font-medium">2KF SÉCURITÉ</strong> est née de la volonté de professionnels expérimentés de proposer des services de gardiennage et de sécurité incendie de qualité.
                </p>
                <p>
                  Nos fondateurs cumulent plus de 20 ans d'expérience sur le terrain, en tant qu'agents puis chefs d'équipe. Cette expertise nous permet de comprendre parfaitement les enjeux de sécurité de nos clients.
                </p>
                <p>
                  Spécialisés dans la sécurité des ERP et IGH, nous mettons un point d'honneur à recruter, former et fidéliser des agents compétents et impliqués.
                </p>
              </div>
              
              {/* Badges de spécialisation */}
              <div className="flex flex-wrap gap-2 sm:gap-3 mt-6 sm:mt-8">
                {[
                  { icon: Building2, label: 'ERP & IGH' },
                  { icon: Flame, label: 'SSIAP Certifié' },
                  { icon: Shield, label: '+20 ans d\'expérience' },
                ].map((badge) => (
                  <div key={badge.label} className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-primary-dark/5 rounded-full text-xs sm:text-sm font-medium text-primary-dark">
                    <badge.icon className="h-3 w-3 sm:h-4 sm:w-4 text-primary-accent" />
                    <span>{badge.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="py-16 sm:py-24 bg-gray-50/50 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary-accent/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary-dark/5 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <span className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-primary-accent mb-3 sm:mb-4 block">Nos valeurs</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-primary-dark">
              Nos{' '}
              <span className="font-accent italic text-transparent bg-clip-text bg-gradient-to-r from-primary-dark to-primary-gray">
                Engagements
              </span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-primary-gray/70 max-w-2xl mx-auto font-light">
              Les valeurs qui guident notre travail au quotidien.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-primary-accent/20 transition-all duration-300 group"
                >
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br ${value.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                  </div>
                  <h3 className="font-display text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-primary-dark group-hover:text-primary-accent transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-primary-gray/70 text-sm sm:text-base leading-relaxed font-light">
                    {value.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Fondateur */}
      <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
        {/* Background subtle */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-primary-accent/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <span className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-primary-accent mb-3 sm:mb-4 block">Le Fondateur</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-dark">
              Une vision née de{' '}
              <span className="font-accent italic text-transparent bg-clip-text bg-gradient-to-r from-primary-dark to-primary-gray">
                l'expérience
              </span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Photo et présentation */}
            <motion.div 
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl aspect-[3/4] max-w-md mx-auto lg:mx-0">
                <Image 
                  src="/images/fondateur.jpg" 
                  alt="M. KOUASSI Konan-François - Fondateur de 2KF SÉCURITÉ"
                  fill
                  className="object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-transparent to-transparent" />
                
                {/* Infos sur la photo */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-1">
                    M. KOUASSI Konan-François
                  </h3>
                  <p className="text-white/80 text-sm sm:text-base font-light">
                    Fondateur & Dirigeant
                  </p>
                </div>
              </div>
              
              {/* Badge flottant */}
              <motion.div 
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:right-4 lg:-right-8 bg-white p-4 sm:p-5 rounded-xl sm:rounded-2xl shadow-xl border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 sm:p-3 bg-primary-accent/10 rounded-full">
                    <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-primary-accent" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-2xl sm:text-3xl text-primary-dark">21+</div>
                    <div className="text-xs sm:text-sm text-primary-gray/70">ans d'expérience</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Storytelling */}
            <motion.div 
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Storytelling principal */}
              <div className="space-y-4 text-sm sm:text-base md:text-lg text-primary-gray/70 leading-relaxed font-light">
                <p className="text-primary-dark font-medium text-base sm:text-lg md:text-xl">
                  Derrière 2KF SÉCURITÉ, il y a avant tout un homme de terrain, forgé par plus de deux décennies d'expérience dans les couloirs des établissements de santé.
                </p>
                <p>
                  <strong className="text-primary-dark font-medium">M. KOUASSI Konan-François</strong>, titulaire d'un Master en Droit, a fait le choix atypique de mettre son expertise juridique au service de la sécurité des personnes. Depuis 2003, il arpente quotidiennement les établissements recevant du public, particulièrement l'Hôpital intercommunal de Créteil où il a exercé pendant près de 17 ans.
                </p>
                <p>
                  Cette immersion totale dans le milieu hospitalier lui a permis de maîtriser chaque aspect de la sécurité incendie : gestion des situations d'urgence, coordination avec les équipes médicales, protection des patients les plus vulnérables, et anticipation des risques.
                </p>
                <p>
                  En <strong className="text-primary-accent">octobre 2024</strong>, fort de cette expertise terrain inégalée et de sa formation de <strong className="text-primary-dark font-medium">Dirigeant de société de sécurité privée (D2SP)</strong>, il fonde 2KF SÉCURITÉ avec une vision claire : apporter à chaque client la rigueur et le professionnalisme qu'il a cultivés pendant plus de 20 ans.
                </p>
              </div>

              {/* Certifications */}
              <div className="mt-8">
                <h4 className="font-display text-lg sm:text-xl font-bold text-primary-dark mb-4 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-primary-accent" />
                  Formations & Certifications
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {founderCertifications.map((cert, index) => (
                    <motion.div 
                      key={cert.title}
                      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 p-3 sm:p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-primary-accent/20 transition-colors"
                    >
                      <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-primary-accent/10 rounded-lg flex items-center justify-center">
                        <BadgeCheck className="w-4 h-4 sm:w-5 sm:h-5 text-primary-accent" />
                      </div>
                      <div>
                        <div className="font-display font-semibold text-sm sm:text-base text-primary-dark">{cert.title}</div>
                        <div className="text-xs sm:text-sm text-primary-gray/60">{cert.description}</div>
                        <div className="text-[10px] sm:text-xs text-primary-accent mt-1">{cert.year}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Qualifications supplémentaires */}
              <div className="flex flex-wrap gap-2 mt-6">
                {[
                  { icon: GraduationCap, label: 'Master en Droit' },
                  { icon: Flame, label: 'SSIAP 2' },
                  { icon: Shield, label: 'Formateur SST' },
                  { icon: Star, label: 'D2SP Certifié' },
                ].map((badge) => (
                  <div key={badge.label} className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-primary-dark/5 rounded-full text-xs sm:text-sm font-medium text-primary-dark">
                    <badge.icon className="h-3 w-3 sm:h-4 sm:w-4 text-primary-accent" />
                    <span>{badge.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Parcours professionnel */}
          <motion.div 
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 sm:mt-24"
          >
            <h4 className="font-display text-xl sm:text-2xl font-bold text-primary-dark mb-8 text-center flex items-center justify-center gap-3">
              <Briefcase className="w-6 h-6 text-primary-accent" />
              21 ans d'expérience terrain
            </h4>
            
            <div className="relative max-w-4xl mx-auto">
              {/* Ligne verticale */}
              <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary-accent via-primary-accent/50 to-transparent sm:-translate-x-1/2" />
              
              {founderExperience.map((exp, index) => (
                <motion.div 
                  key={exp.period}
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex items-center gap-4 sm:gap-8 mb-6 sm:mb-8 ${
                    index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  }`}
                >
                  {/* Point sur la ligne */}
                  <div className="absolute left-4 sm:left-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-white border-4 border-primary-accent rounded-full sm:-translate-x-1/2 z-10" />
                  
                  {/* Carte */}
                  <div className={`ml-10 sm:ml-0 sm:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'sm:pr-8' : 'sm:pl-8'}`}>
                    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-primary-accent/20 transition-all duration-300">
                      <div className="text-xs sm:text-sm font-semibold text-primary-accent mb-2">{exp.period}</div>
                      <h5 className="font-display font-bold text-base sm:text-lg text-primary-dark mb-1">{exp.role}</h5>
                      <p className="text-sm text-primary-gray/70 font-medium">{exp.company}</p>
                      <p className="text-xs sm:text-sm text-primary-gray/50 mt-1">{exp.location}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Message de conclusion */}
          <motion.div 
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 sm:mt-20 text-center max-w-3xl mx-auto"
          >
            <blockquote className="text-lg sm:text-xl md:text-2xl font-accent italic text-primary-dark/80 leading-relaxed">
              « La sécurité n'est pas qu'un métier pour moi, c'est une vocation. Chaque jour passé sur le terrain m'a appris que protéger les autres, c'est avant tout être présent, vigilant et humain. »
            </blockquote>
            <p className="mt-4 text-sm sm:text-base text-primary-gray/60 font-medium">
              — M. KOUASSI Konan-François, Fondateur de 2KF SÉCURITÉ
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 bg-primary-dark relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-primary-accent/10 rounded-full blur-[150px] -translate-x-1/2" />
          <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[120px] translate-x-1/2" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
              Prêt à nous faire{' '}
              <span className="font-accent italic text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
                confiance ?
              </span>
            </h2>
            <p className="text-white/50 text-sm sm:text-lg mb-8 sm:mb-10 max-w-2xl mx-auto font-light">
              Contactez-nous pour discuter de vos besoins en sécurité.
            </p>
            
            <Link 
              href="/contact" 
              className="group inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white text-primary-dark rounded-full font-display font-semibold text-sm sm:text-lg transition-all duration-300 hover:shadow-[0_0_50px_rgba(255,255,255,0.3)] active:scale-[0.98]"
            >
              Nous contacter
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
