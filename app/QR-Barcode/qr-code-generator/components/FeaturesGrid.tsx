'use client';

import React from 'react';
import { Zap, Palette, Image as ImageIcon, Scan } from 'lucide-react';

const FeaturesGrid: React.FC = () => {
  const features = [
    {
      icon: Zap,
      title: '9+ Content Types',
      description: 'Text, URL, Email, SMS, WiFi, Image',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-900',
      descColor: 'text-blue-700',
      iconColor: 'text-blue-600'
    },
    {
      icon: Palette,
      title: 'Custom Design',
      description: 'Colors, Effects',
      bgColor: 'bg-green-50',
      textColor: 'text-green-900',
      descColor: 'text-green-700',
      iconColor: 'text-green-600'
    },
    {
      icon: ImageIcon,
      title: 'Logo Support',
      description: 'Embedded logos included',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-900',
      descColor: 'text-purple-700',
      iconColor: 'text-purple-600'
    },
    {
      icon: Scan,
      title: 'Error Correction',
      description: 'L, M, Q, H Levels',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-900',
      descColor: 'text-orange-700',
      iconColor: 'text-orange-600'
    },
  ];

  return (
    <div className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      {features.map((feature, index) => (
        <div key={index} className={`${feature.bgColor} rounded-lg md:rounded-xl p-3 md:p-4 text-center`}>
          <feature.icon className={`w-6 h-6 md:w-8 md:h-8 ${feature.iconColor} mx-auto mb-1 md:mb-2`} />
          <h4 className={`font-semibold ${feature.textColor} text-sm md:text-base`}>
            {feature.title}
          </h4>
          <p className={`${feature.descColor} text-xs md:text-sm`}>
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default FeaturesGrid;