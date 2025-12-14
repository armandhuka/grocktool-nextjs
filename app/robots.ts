import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',       // backend API
          '/admin/',     // admin routes
          '/private/',   // future private routes (safety)
          '/server/',    // next.js internal
          '/_next/',     // Next build files, already noindex but safe to add
        ],
      }
    ],
    sitemap: 'https://www.grocktool.com/sitemap.xml',
  }
}
