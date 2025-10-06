'use client';

import React from 'react';
import HeroSection from './components/home/HeroSection';
import FeaturedTools from './components/home/FeaturedTools';
import CategoriesSection from './components/home/CategoriesSection';
import UpcomingTools from './components/home/UpcomingTools';
import TrustedSection from './components/home/TrustedSection';
import HowItWorks from './components/home/HowItWorks';
import NewsletterSection from './components/home/NewsletterSection';
import CTASection from './components/home/CTASection';
import EmailModal from './components/shared/EmailModal';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-toolnest-bg font-inter">
      <EmailModal />
      <HeroSection />
      <FeaturedTools />
      <CategoriesSection />
      <UpcomingTools />
      <TrustedSection />
      <HowItWorks />
      <NewsletterSection />
      <CTASection />
    </div>
  );
}