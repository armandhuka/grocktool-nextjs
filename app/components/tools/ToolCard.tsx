'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Info, ExternalLink } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Tool {
  id: number;
  name: string;
  description: string;
  category: string;
  iconColor: string;
  icon: string;
  status: 'available' | 'coming-soon';
}

interface ToolCardProps {
  tool: Tool;
  onFavorite?: (toolId: number) => void;
  isFavorite?: boolean;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, onFavorite, isFavorite = false }) => {
  const router = useRouter();

  const handleToolClick = () => {
    if (tool.status === 'available') {
      // Navigate to the tool page based on category and name
      const route = getToolRoute(tool.name, tool.category);
      if (route) {
        // Save the selected category to localStorage for persistence
        if (typeof window !== 'undefined') {
          localStorage.setItem('selectedCategory', tool.category);
        }
        router.push(route);
      }
    }
  };

  const getToolRoute = (toolName: string, category: string) => {
    const routes: Record<string, Record<string, string>> = {
      'Text Tools': {
        'Word Counter': '/text-tools/word-counter',
        'Remove Duplicates': '/text-tools/remove-duplicates',
        'Case Converter': '/text-tools/case-converter',
        'Text Sorter': '/text-tools/text-sorter',
        'Text Reverser': '/text-tools/text-reverser',
        'Slug Generator': '/text-tools/slug-generator',
        'Find & Replace': '/text-tools/find-replace',
        'Palindrome Checker': '/text-tools/palindrome-checker',
        'Remove Special Characters': '/text-tools/remove-special-chars',
        'Text Limiter': '/text-tools/text-limiter'
      },
      'Unit Converter Tools': {
        'Length Converter': '/unit-tools/length-converter',
        'Weight Converter': '/unit-tools/weight-converter',
        'Temperature Converter': '/unit-tools/temperature-converter',
        'Time Converter': '/unit-tools/time-converter',
        'Speed Converter': '/unit-tools/speed-converter',
        'Area Converter': '/unit-tools/area-converter',
        'Volume Converter': '/unit-tools/volume-converter',
        'Data Size Converter': '/unit-tools/data-size-converter'
      },
      'Date & Time Tools': {
        'Age Calculator': '/date-tools/age-calculator',
        'Date Difference': '/date-tools/date-difference',
        'Countdown Timer': '/date-tools/countdown',
        'Work Days Calculator': '/date-tools/workdays',
        'Next Birthday Countdown': '/date-tools/birthday-countdown',
        'Leap Year Checker': '/date-tools/leap-year',
        'Current Week Number Checker': '/date-tools/week-number'
      },
      'Number Tools': {
        'Percentage Calculator': '/number-tools/percentage-calculator',
        'Interest Calculator': '/number-tools/simple-interest',
        'EMI Calculator': '/number-tools/emi',
        'Roman Number Converter': '/number-tools/roman-converter',
        'LCM/HCF Calculator': '/number-tools/lcm-hcf',
        'Number to Words': '/number-tools/number-to-words',
        'Scientific Notation': '/number-tools/scientific-notation',
        'Base Converter': '/number-tools/number-base-converter',
        'Number Rounding': '/number-tools/rounding',
        'Random Generator': '/number-tools/random-generator'
      },
      'Math Tools': {
        'Advanced Calculator': '/math-tools/basic-calculator',
        'Prime Number Checker': '/math-tools/prime-checker',
        'Factorial Calculator': '/math-tools/factorial',
        'Multiplication Tables': '/math-tools/multiplication-table',
        'Quadratic Equation Solver': '/math-tools/quadratic-solver',
        'Percentage Increase/Decrease Calculator': '/math-tools/percentage-change',
        'Triangle Area Calculator': '/math-tools/triangle-area',
        'Circle Area Calculator': '/math-tools/circle-calculator',
        'Logarithm Calculator': '/math-tools/exponent-log',
        'Statistics Calculator': '/math-tools/statistics-calculator'
      },
      'Health Tools': {
        'BMI Calculator': '/health-tools/bmi-calculator',
        'Calorie Calculator': '/health-tools/calorie-calculator',
        'Water Intake Calculator': '/health-tools/water-intake',
        'Body Fat Percentage': '/health-tools/body-fat',
        'Ideal Weight Calculator': '/health-tools/ideal-weight',
        'BMR Calculator': '/health-tools/bmr-calculator',
        'Macro Split Calculator': '/health-tools/macro-splitter'
      }
    };
    return routes[category]?.[toolName] || null;
  };

  return (
    <motion.div
      className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${
        tool.status === 'coming-soon' ? 'opacity-60' : 'hover:scale-105'
      }`}
      whileHover={{ y: -5 }}
      onClick={handleToolClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div 
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
            style={{ backgroundColor: tool.iconColor + '20', color: tool.iconColor }}
          >
            {tool.icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{tool.name}</h3>
            <span className="text-sm text-gray-500">{tool.category}</span>
          </div>
        </div>
        
        {onFavorite && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onFavorite(tool.id);
            }}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <Heart 
              size={20} 
              className={isFavorite ? 'fill-red-500 text-red-500' : ''} 
            />
          </button>
        )}
      </div>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {tool.description}
      </p>
      
      <div className="flex items-center justify-between">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          tool.status === 'available' 
            ? 'bg-green-100 text-green-600' 
            : 'bg-yellow-100 text-yellow-600'
        }`}>
          {tool.status === 'available' ? 'Available' : 'Coming Soon'}
        </span>
        
        {tool.status === 'available' && (
          <div className="flex space-x-2">
            <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
              <Info size={16} />
            </button>
            <button className="p-2 text-gray-400 hover:text-green-500 transition-colors">
              <ExternalLink size={16} />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ToolCard;
