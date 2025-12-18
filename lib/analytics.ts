// Déclaration TypeScript pour gtag
declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'js',
      targetId: string,
      config?: Record<string, any>
    ) => void
    dataLayer?: Array<any>
  }
}

// Tracking des événements
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Événements spécifiques
export const analytics = {
  // Conversion lead (formulaire de contact)
  trackLead: (serviceType: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'generate_lead', {
        currency: 'EUR',
        value: 5000, // Valeur estimée d'un lead
        service_type: serviceType,
      })
    }
  },

  // Clic téléphone
  trackPhoneClick: (phoneNumber: string) => {
    trackEvent('phone_click', 'contact', phoneNumber)
  },

  // Clic email
  trackEmailClick: () => {
    trackEvent('email_click', 'contact', 'contact@2kf-securite.fr')
  },

  // Téléchargement de fichier (si ajouté plus tard)
  trackDownload: (fileName: string) => {
    trackEvent('file_download', 'engagement', fileName)
  },

  // Navigation vers service
  trackServiceView: (serviceName: string) => {
    trackEvent('service_view', 'engagement', serviceName)
  },

  // Scroll depth (engagement)
  trackScrollDepth: (depth: number) => {
    trackEvent('scroll', 'engagement', `${depth}%`, depth)
  },

  // Temps passé sur la page
  trackTimeOnPage: (seconds: number) => {
    trackEvent('time_on_page', 'engagement', undefined, seconds)
  },

  // CTA cliqué
  trackCTAClick: (ctaName: string, location: string) => {
    trackEvent('cta_click', 'conversion', `${ctaName} - ${location}`)
  },
}



