'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Star, RefreshCw, ArrowDown, Mail, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toolsData } from '../app/data/toolsData';
// import '../app/globals.css';

const page = () => {
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    setEmail('');
  };

  const handleExploreTools = () => {
    router.push('/tools');
  };

  const featuredTools = toolsData
    .filter(tool => tool.status === 'available')
    .slice(0, 8);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, duration: 0.6 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const scrollContainer = (id: string, direction: 'left' | 'right') => {
    const container = document.getElementById(id);
    if (container) {
      const scrollAmount = 300;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      'Unit Converter Tools': '📏',
      'Text Tools': '📝',
      'Date & Time Tools': '📅',
      'Number Tools': '🔢',
      'Math Tools': '🧮',
      'Health Tools': '💪'
    };
    return icons[category] || '🔧';
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Unit Converter Tools': 'bg-blue-100 text-blue-600',
      'Text Tools': 'bg-green-100 text-green-600',
      'Date & Time Tools': 'bg-purple-100 text-purple-600',
      'Number Tools': 'bg-yellow-100 text-yellow-600',
      'Math Tools': 'bg-red-100 text-red-600',
      'Health Tools': 'bg-cyan-100 text-cyan-600'
    };
    return colors[category] || 'bg-gray-100 text-gray-600';
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

  const handleToolClick = (tool: typeof toolsData[0]) => {
    const route = getToolRoute(tool.name, tool.category);
    if (route) {
      localStorage.setItem('selectedCategory', tool.category);
      router.push(route);
    }
  };

  const handleCategoryClick = (categoryName: string) => {
    localStorage.setItem('selectedCategory', categoryName);
    router.push('/tools');
  };

  const categoriesData = [
    { name: 'Text Tools', icon: '📝', description: '20+ tools', color: 'bg-green-100 text-green-600' },
    { name: 'Number Tools', icon: '🔢', description: '15+ tools', color: 'bg-yellow-100 text-yellow-600' },
    { name: 'Date & Time Tools', icon: '📅', description: '10+ tools', color: 'bg-purple-100 text-purple-600' },
    { name: 'Unit Converter Tools', icon: '📏', description: '12+ tools', color: 'bg-blue-100 text-blue-600' },
    { name: 'Math Tools', icon: '🧮', description: '18+ tools', color: 'bg-red-100 text-red-600' },
    { name: 'Health Tools', icon: '💪', description: '8+ tools', color: 'bg-cyan-100 text-cyan-600' },
    { name: 'Resume Tools', icon: '📄', description: 'Smart utilities', color: 'bg-orange-100 text-orange-600' },
    { name: 'Developer Tools', icon: '⚡', description: 'Smart utilities', color: 'bg-indigo-100 text-indigo-600' }
  ];

  const upcomingTools = [
    { name: 'QR Code Generator', description: 'Generate custom QR codes instantly.', category: 'Developer Tool', color: 'bg-indigo-100 text-indigo-600' },
    { name: 'Resume Builder', description: 'Create professional resumes in minutes.', category: 'Resume Tool', color: 'bg-orange-100 text-orange-600' },
    { name: 'CSS Box Shadow Generator', description: 'Design shadows visually.', category: 'Developer Tool', color: 'bg-indigo-100 text-indigo-600' },
    { name: 'Username Generator', description: 'Smart and catchy usernames.', category: 'Text Tool', color: 'bg-green-100 text-green-600' },
    { name: 'Invoice Maker', description: 'Create quick downloadable invoices.', category: 'Business Tool', color: 'bg-pink-100 text-pink-600' },
    { name: 'JSON Formatter', description: 'Prettify and validate JSON code.', category: 'Developer Tool', color: 'bg-indigo-100 text-indigo-600' }
  ];

  return (
    <div className="min-h-screen bg-toolnest-bg font-inter">
      {/* Popup Modal */}
      {showModal && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-white rounded-2xl p-8 max-w-md mx-auto relative shadow-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-toolnest-text mb-4">🔥 GrockTool is Live!</h3>
              <p className="text-toolnest-text/80 mb-6">
                Discover 150+ tools designed to simplify your digital life.
              </p>
              <button
                onClick={() => setShowModal(false)}
                className="bg-toolnest-text text-white px-6 py-3 rounded-full font-semibold hover:bg-toolnest-text/90 transition-colors"
              >
                Explore Now
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 opacity-5">
          <div className="animate-float absolute top-20 left-10">
            <Search size={40} className="text-toolnest-text" />
          </div>
          <div className="animate-float absolute top-40 right-20" style={{ animationDelay: '1s' }}>
            <Star size={35} className="text-toolnest-text" />
          </div>
          <div className="animate-float absolute bottom-40 left-20" style={{ animationDelay: '2s' }}>
            <RefreshCw size={30} className="text-toolnest-text" />
          </div>
        </div>

        <motion.div
          className="text-center max-w-4xl mx-auto px-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-toolnest-text mb-6"
            variants={itemVariants}
          >
            All Your Favorite Tools{' '}
            <span className="bg-gradient-to-r from-toolnest-text to-toolnest-accent bg-clip-text text-transparent">
              in One Place
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-toolnest-text/80 mb-8"
            variants={itemVariants}
          >
            150+ tools across categories like text, numbers, dates, and more — free and fast.
          </motion.p>

          <motion.button
            className="bg-toolnest-accent text-toolnest-text px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
            variants={itemVariants}
            whileHover={{ scale: 1.05, backgroundColor: '#9a99a3' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleExploreTools}
          >
            Explore Tools
          </motion.button>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="text-toolnest-text/60" size={24} />
        </motion.div>
      </section>

      {/* Featured Tools */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-toolnest-text mb-4">
              Featured Tools
            </h2>
            <p className="text-toolnest-text/80 text-lg">
              Popular tools used by thousands of users
            </p>
          </motion.div>

          <div className="relative">
            <button
              onClick={() => scrollContainer('featured-tools-container', 'left')}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft size={20} className="text-toolnest-text" />
            </button>
            <button
              onClick={() => scrollContainer('featured-tools-container', 'right')}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
            >
              <ChevronRight size={20} className="text-toolnest-text" />
            </button>

            <div
              id="featured-tools-container"
              className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 px-12"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {featuredTools.map((tool, index) => (
                <motion.div
                  key={tool.id}
                  className="flex-shrink-0 w-80 bg-toolnest-accent p-6 rounded-2xl hover:bg-white transition-all duration-300 cursor-pointer hover:shadow-lg group"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  onClick={() => handleToolClick(tool)}
                >
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${getCategoryColor(tool.category)} shadow-sm mr-4`}>
                      {getCategoryIcon(tool.category)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-toolnest-text mb-1">
                        {tool.name}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(tool.category)}`}>
                        {tool.category}
                      </span>
                    </div>
                  </div>
                  <p className="text-toolnest-text/70 text-sm mb-4 line-clamp-2">
                    {tool.description}
                  </p>
                  <button className="w-full bg-toolnest-text text-white py-2 px-4 rounded-xl font-medium group-hover:bg-toolnest-text/90 transition-colors">
                    Try Now
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 px-6 bg-toolnest-accent/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-toolnest-text mb-4">
              Explore Categories
            </h2>
            <p className="text-toolnest-text/80 text-lg">
              Find tools organized by category for quick access
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoriesData.map((category, index) => (
              <motion.div
                key={category.name}
                className="bg-toolnest-accent p-6 rounded-xl transition-all duration-300 hover:shadow-lg cursor-pointer flex flex-col items-center text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                onClick={() => handleCategoryClick(category.name)}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl ${category.color} shadow-sm mb-4`}>
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold text-toolnest-text mb-2">{category.name}</h3>
                <p className="text-toolnest-text/70 text-sm">{category.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Tools */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-toolnest-text mb-4">
              Upcoming Tools
            </h2>
            <p className="text-toolnest-text/80 text-lg">
              Sneak peek of tools coming soon
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingTools.map((tool, index) => (
              <motion.div
                key={tool.name}
                className="bg-toolnest-accent p-6 rounded-xl hover:bg-white transition-all duration-300 hover:shadow-lg cursor-pointer flex flex-col justify-between"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${tool.color} shadow-sm mb-4`}>
                    {tool.name[0]}
                  </div>
                  <h3 className="text-lg font-semibold text-toolnest-text mb-2">{tool.name}</h3>
                  <p className="text-toolnest-text/70 text-sm">{tool.description}</p>
                </div>
                <span className="text-xs text-toolnest-text/50 mt-4">{tool.category}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted Section */}
      <section className="py-20 px-6 bg-toolnest-accent/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-toolnest-text mb-4">
              Trusted by Thousands of Developers
            </h2>
            <p className="text-toolnest-text/80 text-lg mb-8">
              Join our community of users who rely on GrockTool for their daily workflow
            </p>
            <div className="flex justify-center items-center gap-8 flex-wrap">
              <div className="text-center">
                <div className="text-3xl font-bold text-toolnest-text">10K+</div>
                <div className="text-toolnest-text/70">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-toolnest-text">150+</div>
                <div className="text-toolnest-text/70">Tools Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-toolnest-text">99.9%</div>
                <div className="text-toolnest-text/70">Uptime</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-toolnest-text mb-4">
              How It Works
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: '1', title: 'Browse Tools', description: 'Explore our curated collection of tools' },
              { step: '2', title: 'Choose Category', description: 'Find tools by specific use case or industry' },
              { step: '3', title: 'Start Using', description: 'Click through to start using your chosen tool' }
            ].map((step, index) => (
              <motion.div
                key={step.step}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-toolnest-text text-toolnest-bg rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {step.step}
                </div>
                <h3 className="text-2xl font-semibold text-toolnest-text mb-3">
                  {step.title}
                </h3>
                <p className="text-toolnest-text/80">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-toolnest-accent p-12 rounded-3xl"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-toolnest-text mb-4">
              Get Updates When New Tools Are Added
            </h2>
            <p className="text-toolnest-text/80 mb-8">
              Be the first to discover the latest tools in our collection
            </p>
            
            <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-3 rounded-full border-2 border-toolnest-text/20 focus:border-toolnest-text outline-none bg-toolnest-bg text-toolnest-text"
                required
              />
              <motion.button
                type="submit"
                className="bg-toolnest-text text-toolnest-bg px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail size={20} />
                Subscribe
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-6 bg-toolnest-accent/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-toolnest-text mb-6">
              Want to explore all 150+ tools?
            </h2>
            <motion.button
              className="bg-toolnest-text text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleExploreTools}
            >
              Explore All Tools
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default page;
