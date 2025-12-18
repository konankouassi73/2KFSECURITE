import Script from 'next/script'

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://2kf-securite.fr/#organization",
    "name": "2KF SÉCURITÉ",
    "legalName": "2KF SÉCURITÉ",
    "image": "https://2kf-securite.fr/og-image.jpg",
    "url": "https://2kf-securite.fr",
    "telephone": "+33769930771",
    "email": "contact@2kf-securite.fr",
    "priceRange": "€€",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "229 Rue Saint-Honoré",
      "addressLocality": "Paris",
      "addressRegion": "Île-de-France",
      "postalCode": "75001",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "48.8656",
      "longitude": "2.3317"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59",
        "description": "Astreinte 24/7 pour nos clients"
      }
    ],
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "48.8566",
        "longitude": "2.3522"
      },
      "geoRadius": "50000"
    },
    "description": "2KF SÉCURITÉ est une entreprise de gardiennage et de sécurité privée basée à Paris, spécialisée dans le gardiennage, la sécurité incendie SSIAP, et la sécurité des ERP et IGH. Plus de 20 ans d'expérience terrain.",
    "slogan": "Votre sécurité, notre métier",
    "foundingDate": "2020",
    "knowsAbout": [
      "Gardiennage",
      "Sécurité incendie",
      "SSIAP",
      "ERP",
      "IGH",
      "Sécurité événementielle",
      "Rondes de surveillance"
    ]
  }

  return (
    <Script
      id="schema-local-business"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  )
}

export function ServicesSchema() {
  const services = [
    {
      "@type": "Service",
      "@id": "https://2kf-securite.fr/services#gardiennage",
      "name": "Gardiennage et Surveillance",
      "description": "Service de gardiennage 24h/24 avec agents qualifiés. Contrôle d'accès, surveillance de sites, ronde de sécurité pour entreprises, commerces et sites sensibles.",
      "provider": {
        "@id": "https://2kf-securite.fr/#organization"
      },
      "areaServed": "Paris et Île-de-France",
      "serviceType": "Gardiennage"
    },
    {
      "@type": "Service",
      "@id": "https://2kf-securite.fr/services#ssiap",
      "name": "Sécurité Incendie SSIAP",
      "description": "Agents SSIAP 1, 2 et 3 certifiés pour la sécurité incendie. Prévention incendie, assistance et évacuation des personnes dans les ERP et IGH.",
      "provider": {
        "@id": "https://2kf-securite.fr/#organization"
      },
      "areaServed": "Paris et Île-de-France",
      "serviceType": "Sécurité incendie"
    },
    {
      "@type": "Service",
      "@id": "https://2kf-securite.fr/services#erp",
      "name": "Sécurité ERP et IGH",
      "description": "Expertise en sécurité pour les Établissements Recevant du Public et les Immeubles de Grande Hauteur. Conformité réglementaire et gestion des risques.",
      "provider": {
        "@id": "https://2kf-securite.fr/#organization"
      },
      "areaServed": "Paris et Île-de-France",
      "serviceType": "Sécurité des établissements"
    },
    {
      "@type": "Service",
      "@id": "https://2kf-securite.fr/services#evenementiel",
      "name": "Sécurité Événementielle",
      "description": "Gestion de la sécurité pour événements professionnels, salons, manifestations. Contrôle d'accès et gestion des flux.",
      "provider": {
        "@id": "https://2kf-securite.fr/#organization"
      },
      "areaServed": "France",
      "serviceType": "Sécurité événementielle"
    },
    {
      "@type": "Service",
      "@id": "https://2kf-securite.fr/services#rondes",
      "name": "Rondes et Interventions",
      "description": "Patrouilles de surveillance régulières, rondes de nuit, interventions rapides sur alarme.",
      "provider": {
        "@id": "https://2kf-securite.fr/#organization"
      },
      "areaServed": "Paris et Île-de-France",
      "serviceType": "Rondes de surveillance"
    },
    {
      "@type": "Service",
      "@id": "https://2kf-securite.fr/services#video",
      "name": "Vidéosurveillance et Télésurveillance",
      "description": "Installation de systèmes de vidéosurveillance, télésurveillance 24/7, levée de doute vidéo.",
      "provider": {
        "@id": "https://2kf-securite.fr/#organization"
      },
      "areaServed": "Paris et Île-de-France",
      "serviceType": "Vidéosurveillance"
    }
  ]

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": services.map((service, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": service
    }))
  }

  return (
    <Script
      id="schema-services"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  )
}

export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }

  return (
    <Script
      id="schema-breadcrumb"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  )
}
