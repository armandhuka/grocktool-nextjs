import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Info, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const navigate = useNavigate();

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      'Unit Converter Tools': '📏',
      'Text Tools': '📝',
      'Date & Time Tools': '📅',
      'Number Tools': '🔢',
      'Math Tools': '🧮',
      'Health Tools': '💪'
    };
    return icons[category] || tool.icon;
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Unit Converter Tools': 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
      'Text Tools': 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
      'Date & Time Tools': 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
      'Number Tools': 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
      'Math Tools': 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
      'Health Tools': 'bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400'
    };
    return colors[category] || 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
  };

  const getToolRoute = (toolName: string, category: string) => {
    // Text Tools routes
    if (category === 'Text Tools') {
      const routeMap: { [key: string]: string } = {
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
      };
      return routeMap[toolName] || null;
    }

    // Unit Converter Tools routes - Fixed to match exact tool names
    if (category === 'Unit Converter Tools') {
      const routeMap: { [key: string]: string } = {
        'Length Converter': '/unit-tools/length-converter',
        'Weight Converter': '/unit-tools/weight-converter',
        'Temperature Converter': '/unit-tools/temperature-converter',
        'Time Converter': '/unit-tools/time-converter',
        'Speed Converter': '/unit-tools/speed-converter',
        'Area Converter': '/unit-tools/area-converter',
        'Volume Converter': '/unit-tools/volume-converter',
        'Data Size Converter': '/unit-tools/data-size-converter'
      };
      return routeMap[toolName] || null;
    }

    // Date & Time Tools routes - Fixed to match exact tool names
    if (category === 'Date & Time Tools') {
      const routeMap: { [key: string]: string } = {
        'Age Calculator': '/date-tools/age-calculator',
        'Date Difference': '/date-tools/date-difference',
        'Countdown Timer': '/date-tools/countdown',
        'Work Days Calculator': '/date-tools/workdays',
        'Next Birthday Countdown': '/date-tools/birthday-countdown',
        'Leap Year Checker': '/date-tools/leap-year',
        'Current Week Number Checker': '/date-tools/week-number'
      };
      return routeMap[toolName] || null;
    }

    // Number Tools routes - Added for Number Tools category
    if (category === 'Number Tools') {
      const routeMap: { [key: string]: string } = {
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
      };
      return routeMap[toolName] || null;
    }

    // Math Tools routes
    if (category === 'Math Tools') {
      const routeMap: { [key: string]: string } = {
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
      };
      return routeMap[toolName] || null;
    }

    // Health Tools routes
    if (category === 'Health Tools') {
      const routeMap: { [key: string]: string } = {
        'BMI Calculator': '/health-tools/bmi-calculator',
        'Calorie Calculator': '/health-tools/calorie-calculator',
        'Water Intake Calculator': '/health-tools/water-intake',
        'Body Fat Percentage': '/health-tools/body-fat',
        'Ideal Weight Calculator': '/health-tools/ideal-weight',
        'BMR Calculator': '/health-tools/bmr-calculator',
        'Macro Split Calculator': '/health-tools/macro-splitter'
      };
      return routeMap[toolName] || null;
    }

    return null;
  };

  const handleOpenTool = () => {
    const route = getToolRoute(tool.name, tool.category);
    if (route && tool.status === 'available') {
      // Save the current category for persistent filtering
      localStorage.setItem('selectedCategory', tool.category);
      navigate(route);
    }
  };

  const isImplementedCategory = tool.category === 'Text Tools' || 
                                tool.category === 'Unit Converter Tools' ||
                                tool.category === 'Date & Time Tools' ||
                                tool.category === 'Number Tools' ||
                                tool.category === 'Math Tools' ||
                                tool.category === 'Health Tools';
  const hasRoute = getToolRoute(tool.name, tool.category) !== null;

  return (
    <motion.div
      className="bg-white dark:bg-toolnest-accent rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 h-full flex flex-col"
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Header with Icon and Category */}
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${getCategoryColor(tool.category)} shadow-sm`}>
          {getCategoryIcon(tool.category)}
        </div>
        <div className="flex gap-2">
          <motion.button
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 flex items-center justify-center transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Info size={14} className="text-gray-600 dark:text-gray-300" />
          </motion.button>
          <motion.button
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-red-100 dark:bg-gray-700 dark:hover:bg-red-900/30 flex items-center justify-center transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart size={14} className="text-gray-600 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400" />
          </motion.button>
        </div>
      </div>

      {/* Tool Name */}
      <h3 className="text-xl font-bold text-toolnest-text mb-3 line-clamp-2">
        {tool.name}
      </h3>

      {/* Description */}
      <p className="text-toolnest-text/70 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
        {tool.description}
      </p>

      {/* Category Badge */}
      <div className="mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(tool.category)}`}>
          {tool.category}
        </span>
      </div>

      {/* Action Button */}
      <motion.button
        className={`w-full py-3 px-4 rounded-2xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
          (tool.status === 'available' && isImplementedCategory && hasRoute)
            ? 'bg-toolnest-text text-white hover:bg-toolnest-text/90 hover:shadow-lg cursor-pointer dark:bg-toolnest-text dark:text-toolnest-bg'
            : tool.status === 'available'
            ? 'bg-toolnest-accent/50 text-toolnest-text/70 cursor-not-allowed'
            : 'bg-toolnest-accent/50 text-toolnest-text/70 cursor-not-allowed'
        }`}
        whileHover={(tool.status === 'available' && isImplementedCategory && hasRoute) ? { scale: 1.02 } : {}}
        whileTap={(tool.status === 'available' && isImplementedCategory && hasRoute) ? { scale: 0.98 } : {}}
        onClick={handleOpenTool}
        disabled={!(tool.status === 'available' && isImplementedCategory && hasRoute)}
      >
        {(tool.status === 'available' && isImplementedCategory && hasRoute) ? (
          <>
            Open Tool
            <ExternalLink size={16} />
          </>
        ) : tool.status === 'available' ? (
          'Coming Soon'
        ) : (
          'Coming Soon'
        )}
      </motion.button>
    </motion.div>
  );
};

export default ToolCard;
