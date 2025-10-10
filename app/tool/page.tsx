import type { Metadata, ResolvingMetadata } from 'next';
import { Suspense } from 'react';
import ToolContent from '../components/tool/ToolContent';
import LoadingSpinner from '../components/shared/LoadingSpinner';

interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  keywords: string[];
  longDescription?: string;
}

// ✅ Props type for Next.js App Router
interface ToolPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// ✅ generateMetadata
export async function generateMetadata(
  { searchParams }: ToolPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Await the searchParams promise
  const params = await searchParams;
  const toolId = params.toolId as string | undefined;

  if (!toolId) {
    return {
      title: 'Online Tools - GrockTool',
      description: 'Explore 150+ free online tools for developers, designers, and creators on GrockTool.',
    };
  }

  const toolData = await getToolData(toolId);
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${toolData.name} - Free Online Tool | GrockTool`,
    description: toolData.description,
    keywords: toolData.keywords.join(', '),
    authors: [{ name: 'GrockTool' }],
    creator: 'GrockTool',
    publisher: 'GrockTool',
    metadataBase: new URL('https://www.grocktool.com'),
    alternates: { canonical: `/tool?toolId=${toolId}` },
    openGraph: {
      title: `${toolData.name} - Free Online Tool`,
      description: toolData.description,
      url: `https://www.grocktool.com/tool?toolId=${toolId}`,
      siteName: 'GrockTool',
      images: [
        { url: `/images/tools/${toolId}-og.jpg`, width: 1200, height: 630, alt: `${toolData.name} - GrockTool Online Tool` },
        ...previousImages,
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${toolData.name} - Free Online Tool`,
      description: toolData.description,
      images: [`/images/tools/${toolId}-twitter.jpg`],
      creator: '@grocktool',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
  };
}

// ✅ Tool data
async function getToolData(toolId: string): Promise<Tool> {
  const tools: Record<string, Tool> = {
    'text-case-converter': {
      id: 'text-case-converter',
      name: 'Text Case Converter',
      description: 'Convert text between different cases - uppercase, lowercase, title case, sentence case and more. Free online text case conversion tool.',
      category: 'Text Tools',
      keywords: ['text case converter', 'uppercase', 'lowercase', 'title case', 'sentence case', 'text formatting', 'online text tool'],
      longDescription: 'Free online text case converter tool that helps you convert text between different cases including uppercase, lowercase, title case, sentence case, camel case, and more.',
    },
    'percentage-calculator': {
      id: 'percentage-calculator',
      name: 'Percentage Calculator',
      description: 'Calculate percentages, percentage increase/decrease, and percentage of numbers online. Free percentage calculation tool.',
      category: 'Math Tools',
      keywords: ['percentage calculator', 'percent calculator', 'percentage increase', 'percentage decrease', 'math calculator', 'number tool'],
      longDescription: 'Free online percentage calculator that helps you calculate percentages, percentage increase or decrease, and find percentage of numbers.',
    },
    'bmi-calculator': {
      id: 'bmi-calculator',
      name: 'BMI Calculator',
      description: 'Calculate your Body Mass Index (BMI) online. Free BMI calculator for health assessment and weight management.',
      category: 'Health Tools',
      keywords: ['bmi calculator', 'body mass index', 'health calculator', 'weight calculator', 'bmi tool', 'health assessment'],
      longDescription: 'Free online BMI (Body Mass Index) calculator that helps you assess your body weight relative to your height.',
    },
    'length-converter': {
      id: 'length-converter',
      name: 'Length Converter',
      description: 'Convert length measurements between different units - meters, feet, inches, centimeters, kilometers, miles and more.',
      category: 'Converter Tools',
      keywords: ['length converter', 'unit converter', 'meters to feet', 'inches to cm', 'distance converter', 'measurement tool'],
      longDescription: 'Free online length converter tool that helps you convert between various length units.',
    },
  };

  return tools[toolId] || {
    id: toolId,
    name: 'Online Tool',
    description: 'Free online tool on GrockTool platform.',
    category: 'Tools',
    keywords: ['online tool', 'free tool', 'web utility'],
    longDescription: 'Free online tool available on GrockTool platform.',
  };
}

// ✅ Scroll Restoration Component
function ScrollRestoration() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          if (typeof window !== 'undefined') {
            // Restore scroll position when returning to tools page
            const savedScrollPosition = sessionStorage.getItem('toolPageScrollPosition');
            if (savedScrollPosition) {
              setTimeout(() => {
                window.scrollTo(0, parseInt(savedScrollPosition));
                sessionStorage.removeItem('toolPageScrollPosition');
              }, 100);
            }
            
            // Disable automatic scroll restoration
            if ('scrollRestoration' in history) {
              history.scrollRestoration = 'manual';
            }
          }
        `,
      }}
    />
  );
}

// ✅ Main Page Component
export default async function ToolPage({ searchParams }: ToolPageProps) {
  const params = await searchParams;
  const toolId = params.toolId as string | undefined;
  const category = params.category as string | undefined;

  return (
    <>
      <ScrollRestoration />
      <Suspense fallback={<LoadingSpinner />}>
        <ToolContent toolId={toolId} />
      </Suspense>
      
      {/* SEO Content */}
      <div id="seo-content" className="hidden" aria-hidden="true">
        <h1>Online Tools Collection - GrockTool</h1>
        <p>Browse and discover 150+ free online tools for developers, designers, students, and creators. GrockTool offers a comprehensive collection of utilities for various needs.</p>
      </div>
    </>
  );
}