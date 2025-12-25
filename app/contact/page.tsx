import type { Metadata } from 'next'
import ContactHero from '../components/contact/ContactHero'
import ContactForm from '../components/contact/ContactForm'
import ContactInfo from '../components/contact/ContactInfo'
import ToolSuggestions from '../components/contact/ToolSuggestions'
import FAQSection from '../components/contact/FAQSection'

export const metadata: Metadata = {
  title: 'Contact GrockTool - Support & Tool Suggestions',
  description: 'Contact GrockTool support team for help with 150+ free online tools. Submit feedback, bug reports, or tool suggestions. We reply within 24 hours.',
  keywords: 'contact GrockTool, online tools support, tool suggestions, bug reports, developer tools help, feedback form, customer service',
  authors: [{ name: 'GrockTool' }],
  creator: 'GrockTool',
  publisher: 'GrockTool',
  metadataBase: new URL('https://www.grocktool.com'),
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact GrockTool - Support & Tool Suggestions',
    description: 'Get help with our 150+ free online tools or suggest new features. We respond within 24 hours.',
    url: 'https://www.grocktool.com/contact',
    siteName: 'GrockTool',
    images: [
      {
        url: '/images/contact-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact GrockTool Support Team',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact GrockTool - Support & Tool Suggestions',
    description: 'Reach out for help with our 150+ free tools or to suggest new features.',
    images: ['/images/contact-twitter-image.jpg'],
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

export default function ContactPage() {
  return (
    <>
      {/* Main Content - No hidden SEO spam */}
      <main className="min-h-screen bg-toolnest-bg font-inter" id="main-content">
        <ContactHero />
        
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Contact Form - Takes 2/3 width on large screens */}
              <div className="lg:col-span-2">
                <ContactForm />
              </div>

              {/* Sidebar */}
              <div className="space-y-6 lg:space-y-8">
                <ContactInfo />
                <ToolSuggestions />
              </div>
            </div>
          </div>
        </section>
        
        <FAQSection />
      </main>

      {/* Consolidated Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "ContactPage",
                "@id": "https://www.grocktool.com/contact#contactpage",
                "name": "Contact GrockTool Support",
                "description": "Contact form and support information for GrockTool's 150+ free online tools platform",
                "url": "https://www.grocktool.com/contact",
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
                      "name": "Contact",
                      "item": "https://www.grocktool.com/contact"
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
                "url": "https://www.grocktool.com",
                "logo": "https://www.grocktool.com/logo.png",
                "contactPoint": [
                  {
                    "@type": "ContactPoint",
                    "contactType": "customer support",
                    "email": "support@grocktool.com",
                    "availableLanguage": "English",
                    "hoursAvailable": {
                      "@type": "OpeningHoursSpecification",
                      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                      "opens": "09:00",
                      "closes": "18:00",
                      "timeZone": "Asia/Kolkata"
                    }
                  },
                  {
                    "@type": "ContactPoint",
                    "contactType": "technical support",
                    "email": "bugs@grocktool.com"
                  },
                  {
                    "@type": "ContactPoint",
                    "contactType": "suggestions",
                    "email": "ideas@grocktool.com"
                  }
                ],
                "sameAs": [
                  "https://twitter.com/grocktool",
                  "https://github.com/grocktool"
                ]
              },
              {
                "@type": "FAQPage",
                "@id": "https://www.grocktool.com/contact#faqpage",
                "name": "GrockTool Contact FAQ",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "How long does it take to get a response from GrockTool support?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "We respond to all inquiries within 24 hours. For urgent technical issues, we typically reply within 4-6 hours during business hours (IST)."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Is there a cost for using GrockTool support services?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "No, all GrockTool support is completely free, just like our 150+ online tools. We provide technical assistance, bug fixes, and handle suggestions at no cost to users."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What information should I include when reporting a bug?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Include: specific tool name, browser/device information, exact steps to reproduce the issue, screenshots if possible, and any error messages. Detailed reports help us fix issues faster."
                    }
                  }
                ]
              }
            ]
          })
        }}
      />
    </>
  )
}