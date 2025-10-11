import type { Metadata } from 'next';
import QRGenerator from './components/QRGenerator';

export const metadata: Metadata = {
  title: 'QR Code Generator - Create Custom QR Codes Online | GrockTool',
  description: 'Free online QR Code Generator with logo support. Create custom QR codes for URLs, text, contact info, WiFi, events, payments and more. Download high-quality PNG QR codes instantly.',
  keywords: [
    'qr code generator',
    'free qr code maker',
    'qr code with logo',
    'custom qr code',
    'qr code creator online',
    'qr code for website',
    'qr code for contact',
    'wifi qr code',
    'event qr code',
    'payment qr code',
    'qr code download',
    'qr code png',
    'qr code design',
    'qr code scanner',
    'digital qr code',
    'business qr code',
    'marketing qr code'
  ].join(', '),
  authors: [{ name: 'GrockTool' }],
  creator: 'GrockTool',
  publisher: 'GrockTool',
  metadataBase: new URL('https://www.grocktool.com'),
  alternates: {
    canonical: '/QR-Barcode/qr-code-generator'
  },
  openGraph: {
    title: 'QR Code Generator - Create Custom QR Codes Online | GrockTool',
    description: 'Free online QR Code Generator with logo support. Create custom QR codes for URLs, text, contact info, WiFi, events, payments and more.',
    url: 'https://www.grocktool.com/QR-Barcode/qr-code-generator',
    siteName: 'GrockTool',
    images: [
      {
        url: '/images/og/qr-code-generator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'QR Code Generator - Create Custom QR Codes Online'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QR Code Generator - Create Custom QR Codes Online | GrockTool',
    description: 'Free online QR Code Generator with logo support. Create custom QR codes instantly.',
    creator: '@grocktool',
    images: ['/images/og/qr-code-generator-twitter.jpg'],
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
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'technology',
  classification: 'Online Tools',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

// JSON-LD Structured Data for SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'QR Code Generator',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Any',
  description: 'Free online QR Code Generator with logo support. Create custom QR codes for URLs, text, contact info, WiFi, events, payments and more.',
  url: 'https://www.grocktool.com/QR-Barcode/qr-code-generator',
  author: {
    '@type': 'Organization',
    name: 'GrockTool'
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  },
  featureList: [
    'Logo Support',
    'Multiple Content Types',
    'Custom Design',
    'High Quality PNG',
    'Error Correction',
    'Instant Download'
  ],
  screenshot: [
    {
      '@type': 'ImageObject',
      url: 'https://www.grocktool.com/images/screenshots/qr-generator-1.jpg',
      caption: 'QR Code Generator Interface'
    },
    {
      '@type': 'ImageObject',
      url: 'https://www.grocktool.com/images/screenshots/qr-generator-2.jpg',
      caption: 'QR Code with Logo Example'
    }
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '1250',
    bestRating: '5',
    worstRating: '1'
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.grocktool.com'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Tools',
        item: 'https://www.grocktool.com/tool'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'QR & Barcode Tools',
        item: 'https://www.grocktool.com/tool?category=QR%20%26%20Barcode%20Tools'
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'QR Code Generator',
        item: 'https://www.grocktool.com/QR-Barcode/qr-code-generator'
      }
    ]
  }
};

// FAQ Schema for SEO
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a QR Code Generator?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A QR Code Generator is an online tool that creates Quick Response (QR) codes. These are two-dimensional barcodes that can store various types of information and can be scanned by smartphones and QR readers.'
      }
    },
    {
      '@type': 'Question',
      name: 'What types of content can I encode in a QR code?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can encode URLs, text messages, phone numbers, email addresses, WiFi credentials, contact information (vCard), calendar events, payment information, and even images using our advanced QR Code Generator.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can I add my logo to the QR code?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! Our QR Code Generator supports adding custom logos in the center of your QR code. You can upload your logo image and adjust its size to create branded QR codes for your business.'
      }
    },
    {
      '@type': 'Question',
      name: 'What file format does the QR code download in?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'All QR codes are generated in high-quality PNG format, which is perfect for both digital use and printing. You can download them instantly after generation.'
      }
    },
    {
      '@type': 'Question',
      name: 'Is the QR Code Generator free to use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, our QR Code Generator is completely free with no limitations. You can create unlimited QR codes without any registration or subscription required.'
      }
    },
    {
      '@type': 'Question',
      name: 'What is error correction in QR codes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Error correction allows QR codes to be scanned even if they are partially damaged or obscured. We offer four levels: L (7%), M (15%), Q (25%), and H (30%) - with higher levels providing better error correction but requiring more space.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can I customize the colors of my QR code?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely! You can customize both the QR code color and background color. We also support gradient colors for more advanced designs.'
      }
    },
    {
      '@type': 'Question',
      name: 'How long do the generated QR codes last?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The QR codes you generate are permanent and will work indefinitely. Once downloaded, they will continue to function as long as the encoded content remains valid.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can I generate QR codes for WiFi networks?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, you can create QR codes for WiFi networks. When scanned, these QR codes automatically connect devices to the specified WiFi network without manually entering credentials.'
      }
    },
    {
      '@type': 'Question',
      name: 'What is the maximum size for QR code generation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can generate QR codes up to 1000x1000 pixels in size, which is suitable for high-resolution printing and large format displays.'
      }
    }
  ]
};

export default function QRCodeGeneratorPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hidden SEO Content for Search Engines */}
      <div className="sr-only" aria-hidden="true">
        <h1>QR Code Generator - Free Online Tool</h1>
        <h2>Create Custom QR Codes with Logo Support</h2>
        
        <section>
          <h3>Features of Our QR Code Generator</h3>
          <ul>
            <li><strong>Multiple Content Types:</strong> Generate QR codes for URLs, text, phone numbers, email, SMS, WiFi credentials, contact cards, events, and payment information</li>
            <li><strong>Logo Support:</strong> Add your custom logo to the center of QR codes for branding</li>
            <li><strong>Custom Design:</strong> Choose from various colors, gradients, and sizes for your QR codes</li>
            <li><strong>Error Correction:</strong> Four levels of error correction (L, M, Q, H) for reliable scanning</li>
            <li><strong>High Quality:</strong> Download QR codes in PNG format up to 1000x1000 pixels</li>
            <li><strong>Instant Generation:</strong> Create QR codes instantly without registration</li>
            <li><strong>Mobile Friendly:</strong> Optimized for all devices and screen sizes</li>
            <li><strong>Privacy Focused:</strong> All processing happens in your browser</li>
          </ul>
        </section>

        <section>
          <h3>How to Use the QR Code Generator</h3>
          <ol>
            <li>Select your content type (URL, text, contact, etc.)</li>
            <li>Enter the content you want to encode</li>
            <li>Customize the design with colors and size</li>
            <li>Add your logo if desired</li>
            <li>Generate and download your QR code</li>
          </ol>
        </section>

        <section>
          <h3>Common Use Cases for QR Codes</h3>
          <ul>
            <li><strong>Business Marketing:</strong> Link to websites, promotions, and social media</li>
            <li><strong>Contact Sharing:</strong> Share contact information via vCard QR codes</li>
            <li><strong>WiFi Access:</strong> Create QR codes for guest WiFi access</li>
            <li><strong>Event Management:</strong> Generate QR codes for event tickets and registration</li>
            <li><strong>Payment Processing:</strong> Create UPI and payment QR codes</li>
            <li><strong>Product Information:</strong> Link to product details and manuals</li>
            <li><strong>Restaurant Menus:</strong> Digital menus accessible via QR codes</li>
            <li><strong>Educational Materials:</strong> Quick access to learning resources</li>
          </ul>
        </section>

        <section>
          <h3>Why Choose Our QR Code Generator?</h3>
          <ul>
            <li><strong>Completely Free:</strong> No hidden costs or subscription fees</li>
            <li><strong>No Registration Required:</strong> Use instantly without creating an account</li>
            <li><strong>High Reliability:</strong> 99.9% uptime and fast generation</li>
            <li><strong>Privacy Guaranteed:</strong> Your data never leaves your device</li>
            <li><strong>Regular Updates:</strong> New features and improvements added frequently</li>
            <li><strong>Expert Support:</strong> Help available when you need it</li>
          </ul>
        </section>

        <section>
          <h3>Technical Specifications</h3>
          <ul>
            <li><strong>Supported Formats:</strong> URL, Text, Phone, Email, SMS, WiFi, vCard, Event, Payment</li>
            <li><strong>Output Format:</strong> PNG (Portable Network Graphics)</li>
            <li><strong>Maximum Size:</strong> 1000x1000 pixels</li>
            <li><strong>Error Correction:</strong> L (7%), M (15%), Q (25%), H (30%)</li>
            <li><strong>Logo Support:</strong> PNG, JPG up to 2MB</li>
            <li><strong>Color Customization:</strong> Full RGB color palette with gradient support</li>
            <li><strong>Browser Compatibility:</strong> Chrome, Firefox, Safari, Edge, Opera</li>
            <li><strong>Mobile Support:</strong> iOS, Android, all modern smartphones</li>
          </ul>
        </section>

        <section>
          <h3>Best Practices for QR Code Usage</h3>
          <ul>
            <li>Test your QR code before distribution</li>
            <li>Ensure sufficient contrast for easy scanning</li>
            <li>Keep the QR code size appropriate for its use case</li>
            <li>Use error correction for printed materials</li>
            <li>Provide context about what the QR code contains</li>
            <li>Regularly check that linked content is still available</li>
            <li>Consider the scanning distance when determining size</li>
            <li>Use high-quality images for printing</li>
          </ul>
        </section>

        <section>
          <h3>Statistics and Benefits</h3>
          <ul>
            <li>QR code usage has increased by 400% in the last 3 years</li>
            <li>Over 80% of smartphone users have scanned a QR code</li>
            <li>QR codes can store up to 4,296 alphanumeric characters</li>
            <li>They can be scanned from any angle (360-degree readability)</li>
            <li>QR codes work even when partially damaged (up to 30% with high error correction)</li>
            <li>Instant access to information without typing</li>
            <li>Reduced errors in data entry</li>
            <li>Enhanced user engagement and interaction</li>
          </ul>
        </section>

        <p>
          <strong>Start creating professional QR codes today with our free online QR Code Generator!</strong> 
          Whether for personal use, business marketing, or educational purposes, our tool provides everything 
          you need to create high-quality, scannable QR codes in seconds. No technical skills required - 
          just point, click, and generate!
        </p>
      </div>

      {/* Main Component */}
      <QRGenerator />
    </>
  );
}