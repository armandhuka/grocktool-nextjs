import type { Metadata } from 'next'
import AboutHeader from '../components/about/AboutHeader'
import IntroductionSection from '../components/about/IntroductionSection'
import FeaturesSection from '../components/about/FeaturesSection'
import VisionSection from '../components/about/VisionSection'
import TrustSection from '../components/about/TrustSection' // NEW

export const metadata: Metadata = {
  title: 'About GrockTool - 150+ Free Tools for Developers',
  description: 'GrockTool offers 150+ free online tools for developers & creators. Text, image, code, PDF tools with no registration. Learn about our mission and features.',
  keywords: 'about GrockTool, free online tools, developer tools, text tools, image editor, code formatter, PDF converter, no registration, productivity tools',
  authors: [{ name: 'GrockTool' }],
  creator: 'GrockTool',
  publisher: 'GrockTool',
  metadataBase: new URL('https://www.grocktool.com'),
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About GrockTool - 150+ Free Tools for Developers',
    description: 'Learn about GrockTool mission to provide 150+ free online tools for developers, designers, and creators worldwide.',
    url: 'https://www.grocktool.com/about',
    siteName: 'GrockTool',
    images: [
      {
        url: '/images/about-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'About GrockTool - 150+ Free Tools for Developers',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About GrockTool - 150+ Free Tools for Developers',
    description: 'Learn about our mission to provide 150+ free online tools.',
    images: ['/images/about-twitter-image.jpg'],
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

export default function About() {
  return (
    <>
      {/* Main Content - No hidden SEO spam */}
      <main className="min-h-screen bg-toolnest-bg font-inter" id="main-content">
        <AboutHeader />
        <IntroductionSection />
        <FeaturesSection />
        <TrustSection />
        <VisionSection />
      </main>

      {/* Consolidated Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "AboutPage",
                "@id": "https://www.grocktool.com/about#aboutpage",
                "name": "About GrockTool - Free Online Tools Platform",
                "description": "Learn about GrockTool's mission to provide 150+ free online tools for developers and creators",
                "url": "https://www.grocktool.com/about",
                "breadcrumb": {
                  "@type": "BreadcrumbList",
                  "itemListElement": [
                    {
                      "@type": "ListItem",
                      "position": 1,
                      "name": "Home",
                      "item": "https://www.grocktool.com"
                    },
                    {
                      "@type": "ListItem",
                      "position": 2,
                      "name": "About",
                      "item": "https://www.grocktool.com/about"
                    }
                  ]
                },
                "mainEntity": {
                  "@id": "https://www.grocktool.com/#organization"
                }
              },
              {
                "@type": "Organization",
                "@id": "https://www.grocktool.com/#organization",
                "name": "GrockTool",
                "alternateName": "GrockTool Online Tools",
                "url": "https://www.grocktool.com",
                "logo": "https://www.grocktool.com/logo.png",
                "description": "Free online tools platform providing 150+ utilities for developers, designers, and creators",
                "foundingDate": "2024",
                "founder": {
                  "@type": "Person",
                  "name": "Arman Dhuka"
                },
                "email": "support@grocktool.com",
                "contactPoint": {
                  "@type": "ContactPoint",
                  "contactType": "customer support",
                  "email": "support@grocktool.com",
                  "availableLanguage": "English"
                },
                "sameAs": [
                  "https://twitter.com/grocktool",
                  "https://github.com/grocktool"
                ],
                "makesOffer": [
                  {
                    "@type": "Offer",
                    "name": "Free Online Tools Access",
                    "description": "Access to 150+ free online tools for developers and creators",
                    "price": "0",
                    "priceCurrency": "USD"
                  }
                ]
              },
              {
                "@type": "WebSite",
                "@id": "https://www.grocktool.com/#website",
                "url": "https://www.grocktool.com",
                "name": "GrockTool - Free Online Tools",
                "description": "150+ free online tools for developers and creators",
                "publisher": {
                  "@id": "https://www.grocktool.com/#organization"
                }
              }
            ]
          })
        }}
      />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Is GrockTool completely free?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, GrockTool is 100% free with no hidden costs, no premium tiers, and no registration required. All 150+ tools are available for free forever."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to create an account?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration is required. All tools work instantly without any sign-up forms or email verification."
                }
              },
              {
                "@type": "Question",
                "name": "How does GrockTool make money?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "GrockTool is supported through ethical ads that don't interfere with the user experience. We never sell user data or implement paywalls."
                }
              },
              {
                "@type": "Question",
                "name": "What types of tools are available?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We offer 150+ tools across categories including text utilities, image editors, code formatters, calculators, converters, PDF tools, and color utilities."
                }
              }
            ]
          })
        }}
      />
    </>
  )
}