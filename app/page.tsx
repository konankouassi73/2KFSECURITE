import { Hero } from '@/components/home/Hero'
import { ServicesPreview } from '@/components/home/ServicesPreview'
import { Certifications } from '@/components/home/Certifications'
import { CTASection } from '@/components/home/CTASection'

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <Certifications />
      <CTASection />
    </>
  )
}

