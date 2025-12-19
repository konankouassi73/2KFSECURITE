import { MetadataRoute } from 'next'
import { normalizeUrl } from '@/lib/utils/url'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL)

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

