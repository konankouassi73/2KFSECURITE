import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contactez 2KF SÉCURITÉ pour vos besoins de sécurité. Demandez un devis gratuit ou une intervention urgente. Téléphone : 07 69 93 07 71.',
  openGraph: {
    title: 'Contact | 2KF SÉCURITÉ',
    description: 'Contactez-nous pour vos besoins de sécurité. Devis gratuit et intervention 24/7.',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}



