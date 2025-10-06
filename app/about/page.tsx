'use client';

import React from 'react';
import AboutHeader from '../components/about/AboutHeader';
import IntroductionSection from '../components/about/IntroductionSection';
import FeaturesSection from '../components/about/FeaturesSection';
import VisionSection from '../components/about/VisionSection';

const About = () => {
  return (
    <div className="min-h-screen bg-toolnest-bg font-inter">
      <AboutHeader />
      <IntroductionSection />
      <FeaturesSection />
      <VisionSection />
    </div>
  );
};

export default About;