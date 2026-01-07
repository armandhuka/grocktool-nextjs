import { Check, Zap, BookOpen, Search } from 'lucide-react';

export interface Feature {
  icon: any; // Lucide icon component
  title: string;
  description: string;
}

export const featuresData: Feature[] = [
  {
    icon: Check,
    title: 'All Free, No Sign-up',
    description: 'Access all tools without registration or hidden fees'
  },
  {
    icon: Zap,
    title: 'Instant Access',
    description: 'Get results immediately with lightning-fast performance'
  },
  {
    icon: BookOpen,
    title: 'Smartly Categorized',
    description: 'Organized by purpose for quick tool discovery'
  },
  {
    icon: Search,
    title: 'SEO-Optimized & Accurate',
    description: 'Built for performance with precise calculations'
  }
];