import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services de Gardiennage et Sécurité Incendie',
  description: 'Gardiennage, rondes de surveillance, sécurité incendie SSIAP, vidéosurveillance. Solutions adaptées pour ERP, IGH et événements. Devis gratuit.',
  openGraph: {
    title: 'Nos Services | 2KF SÉCURITÉ',
    description: 'Gardiennage, rondes, sécurité incendie SSIAP, vidéosurveillance. Solutions sur mesure pour vos établissements.',
    images: [
      {
        url: 'https://2kf-securite.fr/og-services.jpg',
        width: 1200,
        height: 630,
        alt: 'Services de Sécurité 2KF - Paris',
      },
    ],
  },
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

