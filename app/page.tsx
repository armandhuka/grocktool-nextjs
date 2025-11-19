import type { Metadata } from 'next'
import HeroSection from './components/home/HeroSection'
import FeaturedTools from './components/home/FeaturedTools'
// import CategoriesSection from './components/home/CategoriesSection'
// import UpcomingTools from './components/home/UpcomingTools'
import CategoriesAndUpcoming from './components/home/CategoriesAndUpcoming'
import TrustedSection from './components/home/TrustedSection'
import HowItWorks from './components/home/HowItWorks'
import NewsletterSection from './components/home/NewsletterSection'
import CTASection from './components/home/CTASection'
import EmailModal from './components/shared/EmailModal'

export const metadata: Metadata = {
  title: 'GrockTool - 150+ Free Online Tools for Developers & Creators',
  description: 'Free online tools for developers, designers, and creators. 150+ tools including text utilities, image editors, code formatters, calculators, and converters. No registration required.',
  keywords: 'online tools, free tools, developer tools, text tools, image tools, calculator, converter, code formatter, PDF tools, web utilities, GrockTool',
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
    title: 'GrockTool - 150+ Free Online Tools for Developers & Creators',
    description: 'Free online tools for developers, designers, and creators. 150+ tools including text utilities, image editors, code formatters, calculators, and converters.',
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
    title: 'GrockTool - 150+ Free Online Tools',
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
      {/* Hidden SEO Content for Search Engines */}
      <div className="sr-only" aria-hidden="true">
        <h1>GrockTool - Free Online Tools Collection</h1>
        <h2>150+ Tools for Developers, Designers and Creators</h2>
        <p>
          Free online tools including text utilities, image editors, code formatters, calculators, 
          converters, and web development tools. No registration required, completely free to use.
          GrockTool offers the most comprehensive collection of online tools for all your needs.
        </p>
        
        <h3>Popular Tool Categories:</h3>
        <ul>
          <li><strong>Text Tools</strong> - Text case converter, word counter, character counter, text formatter, duplicate line remover</li>
          <li><strong>Image Tools</strong> - Image converter, compressor, resizer, editor, color picker</li>
          <li><strong>Developer Tools</strong> - JSON formatter, code beautifier, validator, base64 encoder, URL encoder</li>
          <li><strong>Calculator Tools</strong> - Scientific calculator, unit converter, percentage calculator, BMI calculator</li>
          <li><strong>Converter Tools</strong> - Length converter, weight converter, temperature converter, time converter, data size converter</li>
          <li><strong>PDF Tools</strong> - PDF to Word converter, PDF merger, PDF splitter, PDF compressor</li>
          <li><strong>Color Tools</strong> - Color picker, palette generator, color converter, contrast checker</li>
        </ul>

        <h3>Featured Popular Tools:</h3>
        <ul>
          <li>Text Case Converter - Convert text between uppercase, lowercase, title case, sentence case</li>
          <li>Image Format Converter - Convert between JPG, PNG, WebP, SVG formats</li>
          <li>JSON Formatter - Format, validate and beautify JSON data</li>
          <li>PDF to Word Converter - Convert PDF documents to editable Word format</li>
          <li>Color Picker - Pick colors from images and get HEX, RGB, HSL values</li>
          <li>Unit Converter - Convert length, weight, temperature, time, speed units</li>
          <li>Code Beautifier - Format and beautify HTML, CSS, JavaScript code</li>
          <li>Password Generator - Create strong and secure passwords</li>
          <li>QR Code Generator - Generate QR codes for URLs, text, contact information</li>
          <li>BMI Calculator - Calculate Body Mass Index for health assessment</li>
        </ul>

        <h3>Why Choose GrockTool?</h3>
        <ul>
          <li>🚀 100% Free - No hidden costs, no subscriptions, completely free</li>
          <li>🔒 No Registration Required - Use tools instantly without signing up</li>
          <li>⚡ Fast & Secure - All processing happens in your browser, no data stored</li>
          <li>📱 Mobile Friendly - Works perfectly on all devices and screen sizes</li>
          <li>🔄 Regular Updates - New tools and features added frequently</li>
          <li>🌐 No Limits - Unlimited usage without any restrictions</li>
          <li>🎯 User Friendly - Simple, intuitive interface for everyone</li>
        </ul>

        <h3>Tool Statistics:</h3>
        <ul>
          <li>150+ Online Tools Available</li>
          <li>10+ Tool Categories</li>
          <li>50,000+ Monthly Users</li>
          <li>99.9% Uptime Guarantee</li>
          <li>24/7 Access Available</li>
        </ul>

        <h3>Latest Tool Additions:</h3>
        <ul>
          <li>All-in-One Converter - Multiple conversion tools in one place</li>
          <li>AI Text Summarizer - Summarize long texts automatically</li>
          <li>Code Minifier - Minify CSS, JavaScript, and HTML code</li>
          <li>Image Background Remover - Remove backgrounds from images</li>
          <li>Currency Converter - Real-time currency exchange rates</li>
        </ul>

        <h3>Supported Formats:</h3>
        <ul>
          <li><strong>Text Formats:</strong> TXT, JSON, XML, HTML, CSS, JavaScript, CSV</li>
          <li><strong>Image Formats:</strong> JPG, PNG, GIF, WebP, SVG, ICO, BMP</li>
          <li><strong>Document Formats:</strong> PDF, DOC, DOCX, XLS, XLSX</li>
          <li><strong>Audio Formats:</strong> MP3, WAV, OGG, M4A</li>
          <li><strong>Video Formats:</strong> MP4, AVI, MOV, WMV</li>
        </ul>

        <p>
          GrockTool is trusted by thousands of developers, designers, students, and professionals 
          worldwide. Our tools are designed to save you time and increase productivity. Whether you 
          need to format code, convert files, calculate values, or manipulate text, GrockTool has 
          the right tool for your needs.
        </p>

        <p>
          <strong>Start using GrockTool today and experience the convenience of having all your 
          essential tools in one place. No downloads, no installations, no registrations - just 
          pure productivity!</strong>
        </p>
      </div>

      {/* Main Visible Content */}
      <div className="min-h-screen bg-toolnest-bg font-inter">
        <EmailModal />
        <HeroSection />
        <FeaturedTools />
        {/* <CategoriesSection /> */}
        {/* <UpcomingTools /> */}
        {/* <CategoriesAndUpcoming /> */}
        <TrustedSection />
        <HowItWorks />
        <NewsletterSection />
        <CTASection />
      </div>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "GrockTool",
            "description": "Free online tools for developers, designers, and creators. 150+ tools including text utilities, image editors, code formatters, calculators, and converters.",
            "url": "https://www.grocktool.com",
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "Any",
            "permissions": "browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "author": {
              "@type": "Organization",
              "name": "GrockTool",
              "url": "https://www.grocktool.com"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "ratingCount": "1250",
              "bestRating": "5"
            },
            "featureList": [
              "Text Tools",
              "Image Tools", 
              "Developer Tools",
              "Calculator Tools",
              "Converter Tools",
              "PDF Tools",
              "Color Tools",
              "SEO Tools"
            ],
            "screenshot": {
              "@type": "ImageObject",
              "url": "https://www.grocktool.com/images/screenshot.jpg",
              "caption": "GrockTool Interface"
            }
          })
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "GrockTool Categories",
            "description": "Tool categories available on GrockTool",
            "url": "https://www.grocktool.com/tools",
            "numberOfItems": 10,
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "item": {
                  "@type": "WebApplication",
                  "name": "Text Tools",
                  "description": "Text manipulation and formatting tools",
                  "url": "https://www.grocktool.com/tools/text",
                  "applicationCategory": "UtilityApplication"
                }
              },
              {
                "@type": "ListItem",
                "position": 2,
                "item": {
                  "@type": "WebApplication",
                  "name": "number Tools",
                  "description": "Image editing and conversion tools",
                  "url": "https://www.grocktool.com/tools/image",
                  "applicationCategory": "MultimediaApplication"
                }
              },
              {
                "@type": "ListItem",
                "position": 3,
                "item": {
                  "@type": "WebApplication",
                  "name": "math Tools",
                  "description": "Tools for developers and programmers",
                  "url": "https://www.grocktool.com/tools/developer",
                  "applicationCategory": "DeveloperApplication"
                }
              },
              {
                "@type": "ListItem",
                "position": 4,
                "item": {
                  "@type": "WebApplication",
                  "name": "Converter Tools",
                  "description": "Unit conversion and calculation tools",
                  "url": "https://www.grocktool.com/tools/converter",
                  "applicationCategory": "UtilityApplication"
                }
              }
            ]
          })
        }}
      />
    </>
  )
}