import type { Metadata } from 'next';
import BarcodeGenerator from './components/BarcodeGenerator';

export const metadata: Metadata = {
  title: 'Barcode Generator - Create Custom Barcodes Online | GrockTool',
  description: 'Free online Barcode Generator. Create custom barcodes in CODE128, EAN-13, UPC-A, CODE39 formats. Download high-quality barcode images instantly.',
  keywords: [
    'barcode generator',
    'free barcode maker',
    'barcode creator online',
    'code128 barcode',
    'ean-13 barcode',
    'upc-a barcode',
    'code39 barcode',
    'barcode download',
    'barcode png',
    'barcode design',
    'digital barcode',
    'business barcode',
    'inventory barcode',
    'product barcode'
  ].join(', '),
  authors: [{ name: 'GrockTool' }],
  creator: 'GrockTool',
  publisher: 'GrockTool',
  metadataBase: new URL('https://www.grocktool.com'),
  alternates: {
    canonical: '/QR-Barcode/barcode-generator'
  },
  openGraph: {
    title: 'Barcode Generator - Create Custom Barcodes Online | GrockTool',
    description: 'Free online Barcode Generator. Create custom barcodes in multiple formats instantly.',
    url: 'https://www.grocktool.com/QR-Barcode/barcode-generator',
    siteName: 'GrockTool',
    images: [
      {
        url: '/images/og/barcode-generator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Barcode Generator - Create Custom Barcodes Online'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Barcode Generator - Create Custom Barcodes Online | GrockTool',
    description: 'Free online Barcode Generator. Create custom barcodes instantly.',
    creator: '@grocktool',
    images: ['/images/og/barcode-generator-twitter.jpg'],
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
};

export default function BarcodeGeneratorPage() {
  return <BarcodeGenerator />;
}