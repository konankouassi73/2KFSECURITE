import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin - 2KF SÉCURITÉ',
  description: 'Tableau de bord administrateur',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  )
}

