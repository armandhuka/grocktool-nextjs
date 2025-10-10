import type { Metadata, ResolvingMetadata } from 'next'
import { Suspense } from 'react';
import ToolContent from '../components/tool/ToolContent';
import LoadingSpinner from '../components/shared/LoadingSpinner';

// Define types for tool data
interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  keywords: string[];
  longDescription?: string;
}

// This function generates dynamic metadata based on the tool
export async function generateMetadata(
  { searchParams }: { searchParams: { [key: string]: string | string[] | undefined } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Get toolId from search parameters
  const toolId = searchParams.toolId as string;
  
  // If no toolId, return default metadata
  if (!toolId) {
    return {
      title: 'Online Tools - GrockTool',
      description: 'Explore 150+ free online tools for developers, designers, and creators on GrockTool.',
    }
  }

  // In a real app, you would fetch tool data from your database or API
  // For now, we'll create dynamic metadata based on toolId
  const toolData = await getToolData(toolId);
  
  // Get previous metadata from parent
  const previousImages = (await parent).openGraph?.images || [];
  
  return {
    title: `${toolData.name} - Free Online Tool | GrockTool`,
    description: toolData.description,
    keywords: toolData.keywords.join(', '),
    authors: [{ name: 'GrockTool' }],
    creator: 'GrockTool',
    publisher: 'GrockTool',
    metadataBase: new URL('https://www.grocktool.com'),
    alternates: {
      canonical: `/tool?toolId=${toolId}`,
    },
    openGraph: {
      title: `${toolData.name} - Free Online Tool`,
      description: toolData.description,
      url: `https://www.grocktool.com/tool?toolId=${toolId}`,
      siteName: 'GrockTool',
      images: [
        {
          url: `/images/tools/${toolId}-og.jpg`,
          width: 1200,
          height: 630,
          alt: `${toolData.name} - GrockTool Online Tool`,
        },
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
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

// Mock function to fetch tool data - replace with your actual data source
async function getToolData(toolId: string): Promise<Tool> {
  // This would typically come from your database or API
  const tools: { [key: string]: Tool } = {
    'text-case-converter': {
      id: 'text-case-converter',
      name: 'Text Case Converter',
      description: 'Convert text between different cases - uppercase, lowercase, title case, sentence case and more. Free online text case conversion tool.',
      category: 'Text Tools',
      keywords: ['text case converter', 'uppercase', 'lowercase', 'title case', 'sentence case', 'text formatting', 'online text tool'],
      longDescription: 'Free online text case converter tool that helps you convert text between different cases including uppercase, lowercase, title case, sentence case, camel case, and more. Perfect for formatting text for programming, writing, or social media.'
    },
    'percentage-calculator': {
      id: 'percentage-calculator',
      name: 'Percentage Calculator',
      description: 'Calculate percentages, percentage increase/decrease, and percentage of numbers online. Free percentage calculation tool.',
      category: 'Math Tools',
      keywords: ['percentage calculator', 'percent calculator', 'percentage increase', 'percentage decrease', 'math calculator', 'number tool'],
      longDescription: 'Free online percentage calculator that helps you calculate percentages, percentage increase or decrease, and find percentage of numbers. Essential math tool for students, professionals, and everyday calculations.'
    },
    'bmi-calculator': {
      id: 'bmi-calculator',
      name: 'BMI Calculator',
      description: 'Calculate your Body Mass Index (BMI) online. Free BMI calculator for health assessment and weight management.',
      category: 'Health Tools',
      keywords: ['bmi calculator', 'body mass index', 'health calculator', 'weight calculator', 'bmi tool', 'health assessment'],
      longDescription: 'Free online BMI (Body Mass Index) calculator that helps you assess your body weight relative to your height. Calculate your BMI instantly and understand your weight category for better health management.'
    },
    'length-converter': {
      id: 'length-converter',
      name: 'Length Converter',
      description: 'Convert length measurements between different units - meters, feet, inches, centimeters, kilometers, miles and more.',
      category: 'Converter Tools',
      keywords: ['length converter', 'unit converter', 'meters to feet', 'inches to cm', 'distance converter', 'measurement tool'],
      longDescription: 'Free online length converter tool that helps you convert between various length units including meters, feet, inches, centimeters, kilometers, miles, yards, and more. Accurate and easy-to-use conversion calculator.'
    },
  };

  return tools[toolId] || {
    id: toolId,
    name: 'Online Tool',
    description: 'Free online tool on GrockTool platform.',
    category: 'Tools',
    keywords: ['online tool', 'free tool', 'web utility'],
    longDescription: 'Free online tool available on GrockTool platform.'
  };
}

export default function ToolPage() {
  return (
    <>
      {/* Hidden SEO Content that will be populated dynamically */}
      <div className="sr-only" aria-hidden="true">
        {/* This content will be populated by the ToolContent component based on the specific tool */}
        <div id="seo-content"></div>
      </div>

      {/* Main Tool Content */}
      <Suspense fallback={<LoadingSpinner />}>
        <ToolContent />
      </Suspense>

      {/* Dynamic Structured Data will be added by ToolContent component */}
    </>
  );
}