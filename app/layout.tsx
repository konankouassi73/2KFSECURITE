import type { Metadata } from 'next'
import { DM_Sans, Space_Grotesk, Playfair_Display } from 'next/font/google'
import './globals.css'
import { LayoutWrapper } from '@/components/layout/LayoutWrapper'
import { LocalBusinessSchema, ServicesSchema } from '@/components/seo/StructuredData'
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics'
import { normalizeUrl } from '@/lib/utils/url'

// Polices Ultra Premium

// Police principale pour le corps du texte - DM Sans : moderne et lisible
const dmSans = DM_Sans({ 
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
})

// Police pour les titres - Space Grotesk : distinctive et géométrique
const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
})

// Police d'accent pour éléments spéciaux - Playfair Display : élégante et premium
const playfair = Playfair_Display({ 
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-playfair',
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  metadataBase: new URL(normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL)),
  title: {
    default: '2KF SÉCURITÉ - Gardiennage & Sécurité Professionnelle',
    template: '%s | 2KF SÉCURITÉ',
  },
  description: 'Entreprise de gardiennage et sécurité incendie à Paris. Agents certifiés CNAPS et SSIAP pour ERP, IGH et événements. Devis gratuit, +20 ans d\'expérience terrain.',
  keywords: [
    'gardiennage',
    'sécurité privée',
    'surveillance',
    'rondes',
    'sécurité événementielle',
    'SSIAP',
    'protection',
    'télésurveillance',
    'vidéosurveillance',
    'agent de sécurité',
    'Paris',
    'Île-de-France',
  ],
  authors: [{ name: '2KF SÉCURITÉ' }],
  creator: '2KF SÉCURITÉ',
  publisher: '2KF SÉCURITÉ',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://2kf-securite.fr',
    title: '2KF SÉCURITÉ - Gardiennage & Sécurité Incendie Paris',
    description: 'Entreprise de gardiennage et sécurité incendie. Agents certifiés CNAPS et SSIAP. Spécialiste ERP et IGH. +20 ans d\'expérience.',
    siteName: '2KF SÉCURITÉ',
    images: [
      {
        url: 'https://2kf-securite.fr/og-image-placeholder.svg',
        width: 1200,
        height: 630,
        alt: '2KF SÉCURITÉ - Sécurité Privée d\'Élite Paris',
        type: 'image/svg+xml',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '2KF SÉCURITÉ - Gardiennage & Sécurité Professionnelle',
    description: 'Services professionnels de gardiennage, sécurité événementielle, rondes et interventions.',
  },
  alternates: {
    canonical: 'https://2kf-securite.fr',
  },
  verification: {
    // À ajouter si vous utilisez Google Search Console
    // google: 'votre-code-verification',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${dmSans.variable} ${spaceGrotesk.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
      </head>
      <body className={dmSans.className}>
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
        <LocalBusinessSchema />
        <ServicesSchema />
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  )
}

