'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Send, Loader2, CheckCircle } from 'lucide-react'
import { analytics } from '@/lib/analytics'

// Schéma de validation déplacé ici pour éviter les dépendances circulaires
// FileList n'est pas disponible côté serveur, on utilise any pour le fichier
const contactSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  company: z.string().optional(),
  email: z.string().email('Email invalide'),
  phone: z.string().min(10, 'Le numéro de téléphone est requis'),
  serviceType: z.string().min(1, 'Veuillez sélectionner un type de service'),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
  file: z.any().optional(),
})

export type ContactFormData = z.infer<typeof contactSchema>

const serviceTypes = [
  'Gardiennage fixe',
  'Rondes & Interventions',
  'Sécurité événementielle',
  'Protection des biens & des personnes',
  'Vidéosurveillance & Télésurveillance',
  'SSIAP Incendie',
  'Autre',
]

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setIsSuccess(false)

    try {
      // Préparer les données pour l'API
      const formData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company || '',
        serviceType: data.serviceType,
        message: data.message,
        source: 'contact-form',
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Une erreur est survenue')
      }

      setIsSuccess(true)
      reset()
      
      // Tracking de la conversion
      analytics.trackLead(data.serviceType)
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
      const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue. Veuillez réessayer ou nous contacter directement.'
      alert(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {isSuccess && (
        <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg flex items-center space-x-2 text-green-700">
          <CheckCircle size={20} />
          <span className="font-semibold">✓ Demande reçue ! Un expert vous contacte sous 2h ouvrées.</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-primary-gray mb-2">
            Nom complet <span className="text-red-500">*</span>
          </label>
          <input
            {...register('name')}
            type="text"
            id="name"
            className="w-full px-4 py-3 bg-white border border-primary-gray/20 rounded-lg text-primary-gray placeholder-primary-gray/60 focus:outline-none focus:border-primary-accent transition-colors"
            placeholder="Votre nom"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium text-primary-gray mb-2">
            Entreprise
          </label>
          <input
            {...register('company')}
            type="text"
            id="company"
            className="w-full px-4 py-3 bg-white border border-primary-gray/20 rounded-lg text-primary-gray placeholder-primary-gray/60 focus:outline-none focus:border-primary-accent transition-colors"
            placeholder="Nom de votre entreprise"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-primary-gray mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            {...register('email')}
            type="email"
            id="email"
            className="w-full px-4 py-3 bg-white border border-primary-gray/20 rounded-lg text-primary-gray placeholder-primary-gray/60 focus:outline-none focus:border-primary-accent transition-colors"
            placeholder="votre@email.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-primary-gray mb-2">
            Téléphone <span className="text-red-500">*</span>
          </label>
          <input
            {...register('phone')}
            type="tel"
            id="phone"
            className="w-full px-4 py-3 bg-white border border-primary-gray/20 rounded-lg text-primary-gray placeholder-primary-gray/60 focus:outline-none focus:border-primary-accent transition-colors"
            placeholder="06 12 34 56 78"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-400">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="serviceType" className="block text-sm font-medium text-primary-gray mb-2">
          Type de service <span className="text-red-500">*</span>
        </label>
        <select
          {...register('serviceType')}
          id="serviceType"
          className="w-full px-4 py-3 bg-white border border-primary-gray/20 rounded-lg text-primary-gray focus:outline-none focus:border-primary-accent transition-colors"
        >
          <option value="">Sélectionnez un service</option>
          {serviceTypes.map((type) => (
            <option key={type} value={type} className="bg-white">
              {type}
            </option>
          ))}
        </select>
        {errors.serviceType && (
          <p className="mt-1 text-sm text-red-400">{errors.serviceType.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-primary-gray mb-2">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register('message')}
          id="message"
          rows={6}
          className="w-full px-4 py-3 bg-white border border-primary-gray/20 rounded-lg text-primary-gray placeholder-primary-gray/60 focus:outline-none focus:border-primary-accent transition-colors resize-none"
          placeholder="Décrivez votre besoin..."
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="file" className="block text-sm font-medium text-primary-gray mb-2">
          Fichier joint (optionnel)
        </label>
        <input
          {...register('file')}
          type="file"
          id="file"
          className="w-full px-4 py-3 bg-white border border-primary-gray/20 rounded-lg text-primary-gray focus:outline-none focus:border-primary-accent transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-accent file:text-white hover:file:bg-primary-accent/90"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-8 py-4 bg-primary-dark hover:bg-primary-accent disabled:bg-primary-dark/50 disabled:cursor-not-allowed rounded-lg transition-all duration-300 font-semibold text-lg text-white shadow-lg hover:shadow-primary-accent/50 flex items-center justify-center space-x-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            <span>Transmission sécurisée...</span>
          </>
        ) : (
          <>
            <Send size={20} />
            <span>Obtenir mon audit gratuit</span>
          </>
        )}
      </button>

      <p className="text-xs text-primary-gray/70 text-center">
        🔒 Vos données sont chiffrées et protégées. Réponse garantie sous 2h ouvrées.
        <br />
        <a href="/mentions-legales" className="text-primary-accent hover:underline font-medium">
          Politique de confidentialité
        </a>
      </p>
    </form>
  )
}

