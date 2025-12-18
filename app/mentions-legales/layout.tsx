import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentions Légales',
  description: 'Mentions légales et politique de confidentialité de 2KF SÉCURITÉ. Conformité RGPD et protection des données personnelles.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function MentionsLegalesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}



