'use client'

import { usePathname } from 'next/navigation'
import { Navigation } from './Navigation'
import { Footer } from './Footer'
import { CookieBanner } from './CookieBanner'

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdminRoute = pathname.startsWith('/admin')

  if (isAdminRoute) {
    return <>{children}</>
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
      <CookieBanner />
    </>
  )
}

