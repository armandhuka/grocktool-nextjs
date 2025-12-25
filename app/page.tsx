import type { Metadata } from 'next'
import HeroSection from './components/home/HeroSection'
import FeaturedTools from './components/home/FeaturedTools'
import TrustedSection from './components/home/TrustedSection'
import HowItWorks from './components/home/HowItWorks'
import NewsletterSection from './components/home/NewsletterSection'
import CTASection from './components/home/CTASection'

export const metadata: Metadata = {
  title: '150+ Free Online Tools for Developers | GrockTool',
  description: 'GrockTool offers 150+ free online tools for developers & creators. Text utilities, image editors, code formatters, calculators & converters. No registration required.',
  keywords: 'free online tools, developer tools, text tools, image converter, code formatter, PDF tools, web utilities, calculator tools, GrockTool',
  authors: [{ name: 'GrockTool' }],
  creator: 'GrockTool',
  publisher: 'GrockTool',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.grocktool.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: '150+ Free Online Tools for Developers | GrockTool',
    description: 'GrockTool offers 150+ free online tools for developers & creators. Text utilities, image editors, code formatters, calculators & converters.',
    url: 'https://www.grocktool.com',
    siteName: 'GrockTool',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'GrockTool - Free Online Tools Collection',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '150+ Free Online Tools for Developers | GrockTool',
    description: 'Free online tools for developers, designers, and creators. No registration required.',
    images: ['/images/twitter-image.jpg'],
    creator: '@grocktool',
  },
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
}

export default function HomePage() {
  return (
    <>
      {/* Main Visible Content */}
      <main className="min-h-screen bg-toolnest-bg font-inter">
        <HeroSection />
        <FeaturedTools />
        <TrustedSection />
        <HowItWorks />
        <NewsletterSection />
        <CTASection />
      </main>

      {/* Structured Data for SEO - Consolidated */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": "https://www.grocktool.com/#website",
                "url": "https://www.grocktool.com",
                "name": "GrockTool",
                "description": "Free online tools for developers, designers, and creators",
                "potentialAction": [
                  {
                    "@type": "SearchAction",
                    "target": "https://www.grocktool.com/search?q={search_term_string}",
                    "query-input": "required name=search_term_string"
                  }
                ],
                "inLanguage": "en-US"
              },
              {
                "@type": "CollectionPage",
                "@id": "https://www.grocktool.com/#webpage",
                "url": "https://www.grocktool.com",
                "name": "Free Online Tools Collection - GrockTool",
                "description": "150+ free online tools for developers and creators",
                "isPartOf": {
                  "@id": "https://www.grocktool.com/#website"
                },
                "about": {
                  "@type": "ItemList",
                  "name": "Tool Categories",
                  "numberOfItems": 10,
                  "itemListElement": [
                    {
                      "@type": "ListItem",
                      "position": 1,
                      "item": {
                        "@type": "CreativeWork",
                        "name": "Text Tools",
                        "description": "Text manipulation and formatting tools"
                      }
                    },
                    {
                      "@type": "ListItem",
                      "position": 2,
                      "item": {
                        "@type": "CreativeWork",
                        "name": "Image Tools",
                        "description": "Image editing and conversion tools"
                      }
                    },
                    {
                      "@type": "ListItem",
                      "position": 3,
                      "item": {
                        "@type": "CreativeWork",
                        "name": "Developer Tools",
                        "description": "Tools for developers and programmers"
                      }
                    }
                  ]
                }
              }
            ]
          })
        }}
      />
    </>
  )
}