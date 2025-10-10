import type { Metadata } from 'next'
import AboutHeader from '../components/about/AboutHeader'
import IntroductionSection from '../components/about/IntroductionSection'
import FeaturesSection from '../components/about/FeaturesSection'
import VisionSection from '../components/about/VisionSection'

export const metadata: Metadata = {
  title: 'About GrockTool - Free Online Tools Platform for Developers & Creators',
  description: 'Learn about GrockTool - a comprehensive platform offering 150+ free online tools for developers, designers, and creators. Our mission, features, and vision for empowering productivity.',
  keywords: 'about GrockTool, online tools platform, free tools mission, developer tools, creator tools, productivity tools, tool features, company vision',
  authors: [{ name: 'GrockTool' }],
  creator: 'GrockTool',
  publisher: 'GrockTool',
  metadataBase: new URL('https://www.grocktool.com'),
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About GrockTool - Free Online Tools Platform',
    description: 'Learn about GrockTool mission to provide 150+ free online tools for developers, designers, and creators worldwide.',
    url: 'https://www.grocktool.com/about',
    siteName: 'GrockTool',
    images: [
      {
        url: '/images/about-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'About GrockTool - Free Online Tools Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About GrockTool - Free Online Tools Platform',
    description: 'Learn about our mission to provide 150+ free online tools for developers and creators.',
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
      {/* Hidden SEO Content for Search Engines */}
      <div className="sr-only" aria-hidden="true">
        <h1>About GrockTool - Free Online Tools Platform</h1>
        
        <h2>Our Mission and Vision</h2>
        <p>
          GrockTool is a comprehensive platform dedicated to providing free, high-quality online tools 
          for developers, designers, students, and creators worldwide. Our mission is to empower 
          productivity by offering instant access to essential tools without any cost or registration barriers.
        </p>

        <h3>What is GrockTool?</h3>
        <p>
          GrockTool is a free online tools platform featuring 150+ essential utilities for various needs. 
          From text manipulation and image editing to code formatting and unit conversion, we provide 
          comprehensive toolset that helps users accomplish tasks efficiently without downloading software 
          or creating accounts.
        </p>

        <h3>Our Story</h3>
        <p>
          Founded with the vision of making productivity tools accessible to everyone, GrockTool emerged 
          from the frustration of encountering limited free tools or expensive subscriptions. We believe 
          that essential utilities should be available to all users regardless of their technical expertise 
          or financial capacity.
        </p>

        <h3>Core Values</h3>
        <ul>
          <li><strong>Accessibility:</strong> Free tools available to everyone worldwide</li>
          <li><strong>Simplicity:</strong> Intuitive interfaces that require no learning curve</li>
          <li><strong>Privacy:</strong> No data collection or user tracking</li>
          <li><strong>Innovation:</strong> Continuous improvement and new tool additions</li>
          <li><strong>Reliability:</strong> 99.9% uptime and consistent performance</li>
        </ul>

        <h3>Platform Features</h3>
        <ul>
          <li><strong>150+ Online Tools:</strong> Comprehensive collection covering all essential categories</li>
          <li><strong>No Registration Required:</strong> Instant access without sign-up forms</li>
          <li><strong>Completely Free:</strong> Zero costs, no hidden fees, no subscriptions</li>
          <li><strong>Browser-Based:</strong> All processing happens locally in your browser</li>
          <li><strong>Mobile Optimized:</strong> Perfect experience on all devices and screen sizes</li>
          <li><strong>Regular Updates:</strong> New tools and features added frequently</li>
          <li><strong>Privacy Focused:</strong> No data storage or user tracking</li>
        </ul>

        <h3>Tool Categories Available</h3>
        <ul>
          <li><strong>Text Tools:</strong> Case converters, word counters, text formatters, duplicate removers</li>
          <li><strong>Image Tools:</strong> Converters, compressors, resizers, editors, color pickers</li>
          <li><strong>Developer Tools:</strong> Code formatters, validators, encoders, decoders, generators</li>
          <li><strong>Calculator Tools:</strong> Scientific calculators, unit converters, financial calculators</li>
          <li><strong>Converter Tools:</strong> Length, weight, temperature, time, data size converters</li>
          <li><strong>PDF Tools:</strong> PDF to Word converters, mergers, splitters, compressors</li>
          <li><strong>Color Tools:</strong> Color pickers, palette generators, contrast checkers</li>
          <li><strong>SEO Tools:</strong> Meta tag generators, sitemap generators, analysis tools</li>
          <li><strong>Security Tools:</strong> Password generators, strength checkers, encryption tools</li>
        </ul>

        <h3>Why Choose GrockTool?</h3>
        <ul>
          <li><strong>100% Free Forever:</strong> No hidden costs, no premium tiers, completely free</li>
          <li><strong>Instant Access:</strong> No registration forms, no email verification, just tools</li>
          <li><strong>Privacy First:</strong> Your data never leaves your browser, no tracking</li>
          <li><strong>User-Friendly:</strong> Simple interfaces designed for everyone</li>
          <li><strong>Regular Updates:</strong> New tools and improvements added weekly</li>
          <li><strong>Community Driven:</strong> Tools developed based on user feedback and needs</li>
          <li><strong>Cross-Platform:</strong> Works on desktop, tablet, and mobile devices</li>
          <li><strong>Fast Performance:</strong> Optimized tools that work instantly</li>
        </ul>

        <h3>Our Vision for the Future</h3>
        <p>
          We envision a world where everyone has access to the tools they need to be productive and creative. 
          Our roadmap includes expanding our tool collection to 500+ utilities, adding AI-powered features, 
          and creating collaborative tools that enable teams to work together seamlessly.
        </p>

        <h3>Technology Stack</h3>
        <p>
          GrockTool is built using modern web technologies including Next.js, React, TypeScript, and Tailwind CSS. 
          Our infrastructure ensures fast loading times, reliable performance, and excellent user experience 
          across all devices and browsers.
        </p>

        <h3>User Statistics</h3>
        <ul>
          <li>150+ Free Online Tools Available</li>
          <li>50,000+ Monthly Active Users</li>
          <li>99.9% Platform Uptime</li>
          <li>10+ Tool Categories</li>
          <li>24/7 Access Available</li>
          <li>Global User Base</li>
        </ul>

        <h3>Community Impact</h3>
        <p>
          GrockTool serves a diverse community including developers, designers, students, teachers, 
          small business owners, and creative professionals. Our tools help users save time, increase 
          productivity, and accomplish tasks that would otherwise require expensive software or technical expertise.
        </p>

        <h3>Get Involved</h3>
        <p>
          We welcome feedback, tool suggestions, and feature requests from our community. Your input 
          helps us improve and expand our platform to better serve your needs. Contact us to share 
          your ideas or report any issues.
        </p>

        <p>
          <strong>Join thousands of satisfied users who trust GrockTool for their daily tool needs. 
          Experience the convenience of having all essential utilities in one place, completely free 
          and accessible anytime, anywhere.</strong>
        </p>
      </div>

      {/* Main Visible Content */}
      <div className="min-h-screen bg-toolnest-bg font-inter">
        <AboutHeader />
        <IntroductionSection />
        <FeaturesSection />
        <VisionSection />
      </div>

      {/* Structured Data for About Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About GrockTool",
            "description": "Learn about GrockTool - a free online tools platform offering 150+ utilities for developers, designers, and creators.",
            "url": "https://www.grocktool.com/about",
            "mainEntity": {
              "@type": "Organization",
              "name": "GrockTool",
              "description": "Free online tools platform providing 150+ utilities for developers, designers, and creators",
              "url": "https://www.grocktool.com",
              "foundingDate": "2024",
              "founder": {
                "@type": "Person",
                "name": "Arman Dhuka"
              },
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN"
              },
              "email": "support@grocktool.com",
              "numberOfEmployees": "5",
              "slogan": "Smart Tools, Simplified",
              "knowsAbout": [
                "Web Development",
                "Online Tools", 
                "Productivity Software",
                "Developer Tools",
                "Design Tools",
                "Calculator Tools",
                "Converter Tools"
              ],
              "makesOffer": [
                {
                  "@type": "Offer",
                  "name": "Free Online Tools",
                  "description": "150+ free online tools for various needs",
                  "price": "0",
                  "priceCurrency": "USD"
                }
              ]
            },
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
            }
          })
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "GrockTool",
            "alternateName": "GrockTool Online Tools",
            "url": "https://www.grocktool.com",
            "logo": "https://www.grocktool.com/logo.png",
            "description": "Free online tools platform providing 150+ utilities for developers, designers, and creators worldwide",
            "foundingDate": "2024",
            "founders": [
              {
                "@type": "Person",
                "name": "Arman Dhuka"
              }
            ],
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "IN"
            },
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
            "knowsAbout": [
              "Web Development Tools",
              "Text Processing Utilities", 
              "Image Editing Tools",
              "Code Formatting",
              "Unit Conversion",
              "Calculator Tools",
              "PDF Processing",
              "Color Tools",
              "SEO Utilities"
            ],
            "makesOffer": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Free Online Tools",
                  "description": "150+ free online tools for various productivity needs"
                },
                "price": "0",
                "priceCurrency": "USD"
              }
            ]
          })
        }}
      />
    </>
  )
}