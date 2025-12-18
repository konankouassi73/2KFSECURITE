import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ - Questions Fréquentes',
  description: 'Toutes les réponses sur nos services de sécurité : temps d\'intervention, certifications CNAPS, zones couvertes, tarifs, contrats. Experts disponibles 24/7.',
  openGraph: {
    title: 'FAQ | 2KF SÉCURITÉ',
    description: 'Les réponses à vos questions sur nos services, nos certifications et nos protocoles de sécurité.',
    images: [
      {
        url: 'https://2kf-securite.fr/og-faq.jpg',
        width: 1200,
        height: 630,
        alt: 'FAQ 2KF SÉCURITÉ',
      },
    ],
  },
}

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}



