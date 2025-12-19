import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Notre Entreprise - +20 ans d\'Expérience',
  description: 'Fondée par des professionnels de terrain avec plus de 20 ans d\'expérience en gardiennage et sécurité incendie. Agrément CNAPS, agents certifiés SSIAP.',
  openGraph: {
    title: 'Qui Sommes-Nous | 2KF SÉCURITÉ',
    description: 'Une équipe de professionnels expérimentés au service de votre sécurité. Gardiennage et sécurité incendie.',
    images: [
      {
        url: 'https://2kfsecurite.fr/og-entreprise.jpg',
        width: 1200,
        height: 630,
        alt: 'À Propos de 2KF SÉCURITÉ',
      },
    ],
  },
}

export default function EntrepriseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

