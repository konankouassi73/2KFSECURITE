'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ChevronDown, Sparkles, ArrowRight, MessageCircle } from 'lucide-react'
import { useState } from 'react'
import Script from 'next/script'
import Link from 'next/link'

const faqs = [
  {
    question: "Quels types de services proposez-vous ?",
    answer: "2KF SÉCURITÉ propose des services de gardiennage, de sécurité incendie (agents SSIAP 1, 2 et 3), de rondes de surveillance, de sécurité événementielle et de vidéosurveillance. Nous intervenons principalement dans les ERP (Établissements Recevant du Public) et les IGH (Immeubles de Grande Hauteur)."
  },
  {
    question: "Vos agents sont-ils certifiés ?",
    answer: "Oui, 100% de nos agents possèdent la carte professionnelle délivrée par le CNAPS (Conseil National des Activités Privées de Sécurité). Pour la sécurité incendie, nos agents sont certifiés SSIAP 1, 2 ou 3 selon les missions, avec des recyclages réguliers conformément à la réglementation."
  },
  {
    question: "Dans quelles zones intervenez-vous ?",
    answer: "Nous intervenons principalement à Paris et en Île-de-France. Notre siège est situé au 229 rue Saint-Honoré, 75001 Paris. Pour des missions spécifiques en province, nous pouvons étudier votre demande au cas par cas."
  },
  {
    question: "Comment obtenir un devis ?",
    answer: "Vous pouvez nous contacter par téléphone au 07 69 93 07 71 ou via notre formulaire de contact. Nous vous répondons sous 24h et nous nous déplaçons gratuitement pour évaluer vos besoins et vous proposer une solution adaptée."
  },
  {
    question: "Quelle est la différence entre gardiennage et rondes de surveillance ?",
    answer: "Le gardiennage implique une présence continue d'un ou plusieurs agents sur votre site. Les rondes de surveillance consistent en des passages réguliers à des horaires définis ou aléatoires. Les rondes sont une solution plus économique adaptée aux sites ne nécessitant pas une présence permanente."
  },
  {
    question: "Qu'est-ce qu'un agent SSIAP ?",
    answer: "SSIAP signifie Service de Sécurité Incendie et d'Assistance à Personnes. Les agents SSIAP sont formés pour prévenir les risques d'incendie, sensibiliser le personnel, assurer l'évacuation des personnes et intervenir en première instance en cas de sinistre. Il existe trois niveaux : SSIAP 1 (agent), SSIAP 2 (chef d'équipe), SSIAP 3 (chef de service)."
  },
  {
    question: "Êtes-vous assurés ?",
    answer: "Oui, 2KF SÉCURITÉ dispose d'une assurance responsabilité civile professionnelle couvrant l'ensemble de nos activités. Les attestations d'assurance sont fournies systématiquement à nos clients."
  },
  {
    question: "Quelle est la durée minimale d'un contrat ?",
    answer: "Pour les prestations ponctuelles (événements, remplacement), aucune durée minimale n'est requise. Pour les contrats de gardiennage récurrent, nous proposons généralement des engagements de 3 à 12 mois avec possibilité de résiliation avec un préavis de 30 jours."
  },
  {
    question: "Vos agents portent-ils un uniforme ?",
    answer: "Oui, nos agents portent un uniforme professionnel identifiable. Selon vos préférences et le type de mission, nous pouvons adapter la tenue (uniforme classique, costume, tenue discrète)."
  },
  {
    question: "Comment se passe la mise en place d'une prestation ?",
    answer: "Après votre prise de contact, nous organisons une visite sur site pour évaluer vos besoins. Nous vous remettons ensuite un devis détaillé. Une fois validé, nous sélectionnons les agents adaptés à votre mission et organisons une passation complète avant le démarrage de la prestation."
  }
]

// Schema.org FAQPage pour le SEO
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
}

function FAQItem({ faq, index }: { faq: typeof faqs[0], index: number }) {
  const [isOpen, setIsOpen] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="border-b border-gray-100 last:border-0"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 sm:py-6 flex items-start justify-between text-left group"
      >
        <span className="font-display text-sm sm:text-base md:text-lg font-semibold text-primary-dark pr-6 sm:pr-8 group-hover:text-primary-accent transition-colors">
          {faq.question}
        </span>
        <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary-dark/5 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-accent/10 transition-all duration-300 ${isOpen ? 'bg-primary-accent/10' : ''}`}>
          <ChevronDown 
            className={`w-4 h-4 text-primary-accent transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>
      </button>
      
      <motion.div
        initial={false}
        animate={{ 
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="pb-5 sm:pb-6 text-primary-gray/70 text-sm sm:text-base leading-relaxed font-light pr-8 sm:pr-12">
          {faq.answer}
        </p>
      </motion.div>
    </motion.div>
  )
}

export default function FAQPage() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="pt-20 sm:pt-24 bg-white">
      {/* Schema.org */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        strategy="afterInteractive"
      />

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
            <span className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-white/80">FAQ</span>
          </div>
          
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8 text-white leading-tight">
            Questions{' '}
            <span className="font-accent italic text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/60">
              fréquentes
            </span>
          </h1>
          
          <p className="text-white/60 text-sm sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light px-4">
            Les réponses à vos questions sur nos services de gardiennage et de sécurité incendie.
          </p>
        </motion.div>
        
        {/* Divider */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </section>

      {/* FAQ Content */}
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* FAQ List */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-xl p-5 sm:p-8"
          >
            {faqs.map((faq, index) => (
              <FAQItem key={index} faq={faq} index={index} />
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 sm:mt-16 text-center"
          >
            <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-primary-accent" />
              </div>
              <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-primary-dark mb-3 sm:mb-4">
                Vous ne trouvez pas la réponse ?
              </h2>
              <p className="text-primary-gray/70 text-sm sm:text-base mb-6 sm:mb-8 max-w-md mx-auto font-light">
                Notre équipe est disponible pour répondre à toutes vos questions.
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-primary-dark text-white rounded-full font-display font-semibold text-sm sm:text-base transition-all duration-300 hover:bg-primary-accent active:scale-[0.98]"
              >
                Contactez-nous
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
