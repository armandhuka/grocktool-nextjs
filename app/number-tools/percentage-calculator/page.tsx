'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, TrendingDown, Copy, RotateCcw, ArrowLeft, Percent, BarChart, Target, Sparkles, ChevronUp, ChevronDown, ChevronRight, Lock, Zap, DollarSign, Hash, SortAsc, FileText, Maximize2, Globe, Shuffle } from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';

export default function PercentageCalculatorPage() {
  const [calculationType, setCalculationType] = useState<'basic' | 'increase' | 'decrease' | 'of'>('basic');
  const [values, setValues] = useState({
    value1: '',
    value2: '',
    percentage: '',
    result: ''
  });

  const [openSections, setOpenSections] = useState({
    whatItDoes: false,
    useCases: false,
    howToUse: false,
    examples: false,
    faqs: false,
    relatedTools: false
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Related tools for Number Tools category - using your provided list
  const relatedTools = [
    { name: 'Simple Interest Calculator', path: '/number-tools/simple-interest', icon: DollarSign },
    { name: 'Roman Number Converter', path: '/number-tools/roman-converter', icon: Hash },
    { name: 'LCM/HCF Calculator', path: '/number-tools/lcm-hcf-calculator', icon: SortAsc },
    { name: 'Number to Words', path: '/number-tools/number-to-words', icon: FileText },
    { name: 'Scientific Notation', path: '/number-tools/scientific-notation', icon: Maximize2 },
    { name: 'Base Converter', path: '/number-tools/number-base-converter', icon: Globe },
    { name: 'Number Rounding', path: '/number-tools/rounding', icon: TrendingUp },
    { name: 'Random Generator', path: '/number-tools/random-generator', icon: Shuffle }
  ];

  const faqData = [
    {
      question: "How accurate are the percentage calculations?",
      answer: "The calculations are 100% mathematically accurate. The tool uses precise floating-point arithmetic and rounds results to two decimal places for readability, maintaining calculation integrity for financial, academic, and professional applications."
    },
    {
      question: "Can I calculate percentage increases and decreases?",
      answer: "Yes, the calculator includes dedicated modes for both percentage increases and decreases. Simply select the 'Increase' or 'Decrease' calculation type, enter the original value and percentage, and get the adjusted result instantly."
    },
    {
      question: "What's the difference between 'Basic %' and '% Of' calculations?",
      answer: "'Basic %' calculates what percentage one number is of another (e.g., 25 is what % of 100?). '% Of' calculates a specific percentage of a given number (e.g., what is 25% of 100?). Both are common but different percentage calculations."
    },
    {
      question: "Can I use decimal numbers and negative values?",
      answer: "Yes, the calculator supports decimal numbers for precise calculations. However, negative values may produce unexpected results in some percentage calculations, as percentages typically apply to positive values in real-world scenarios."
    },
    {
      question: "Is this suitable for financial calculations?",
      answer: "Absolutely! This percentage calculator is perfect for financial calculations including discounts, tax calculations, investment returns, price increases, and financial analysis. The two-decimal precision is ideal for monetary calculations."
    }
  ];

  const calculatePercentage = () => {
    const val1 = parseFloat(values.value1);
    const val2 = parseFloat(values.value2);
    const percent = parseFloat(values.percentage);

    if (isNaN(val1) || isNaN(val2)) return;

    let result = 0;
    switch (calculationType) {
      case 'basic':
        result = (val1 / val2) * 100;
        break;
      case 'increase':
        result = val1 + (val1 * percent / 100);
        break;
      case 'decrease':
        result = val1 - (val1 * percent / 100);
        break;
      case 'of':
        result = (val1 * percent) / 100;
        break;
    }

    setValues(prev => ({ ...prev, result: result.toFixed(2) }));
  };

  const clearFields = () => {
    setValues({
      value1: '',
      value2: '',
      percentage: '',
      result: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setValues(prev => ({ ...prev, [field]: value }));
  };

  const copyResult = async () => {
    if (values.result) {
      const text = `Percentage Calculation Result: ${getCalculationExplanation()}`;
      try {
        await navigator.clipboard.writeText(text);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  const getCalculationExplanation = () => {
    const val1 = parseFloat(values.value1);
    const val2 = parseFloat(values.value2);
    const percent = parseFloat(values.percentage);

    switch (calculationType) {
      case 'basic':
        return `${val1} is ${values.result}% of ${val2}`;
      case 'increase':
        return `${val1} + ${percent}% = ${values.result}`;
      case 'decrease':
        return `${val1} - ${percent}% = ${values.result}`;
      case 'of':
        return `${percent}% of ${val1} = ${values.result}`;
      default:
        return '';
    }
  };

  const setExampleCalculation = (exampleType: string) => {
    switch (exampleType) {
      case 'discount':
        setCalculationType('decrease');
        setValues({ value1: '100', value2: '', percentage: '20', result: '' });
        break;
      case 'tax':
        setCalculationType('increase');
        setValues({ value1: '100', value2: '', percentage: '18', result: '' });
        break;
      case 'grade':
        setCalculationType('basic');
        setValues({ value1: '45', value2: '60', percentage: '', result: '' });
        break;
      case 'commission':
        setCalculationType('of');
        setValues({ value1: '5000', value2: '', percentage: '15', result: '' });
        break;
    }
  };

  return (
    <>
      <Head>
        <title>Percentage Calculator | Free Online Percentage Calculator for All Needs | GrockTool.com</title>
        <meta name="description" content="Calculate percentages instantly with our free online percentage calculator. Includes percentage increase, decrease, percentage of numbers, and basic percentage calculations. Perfect for finance, discounts, and math problems." />
        <meta name="keywords" content="percentage calculator, calculate percentage, percentage increase calculator, percentage decrease calculator, discount calculator, tax calculator, math calculator, online calculator" />
        <meta property="og:title" content="Percentage Calculator | Free Online Percentage Calculator for All Needs" />
        <meta property="og:description" content="Calculate percentages instantly with our free online percentage calculator. Includes percentage increase, decrease, percentage of numbers, and basic percentage calculations." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Percentage Calculator - Free & Accurate" />
        <meta name="twitter:description" content="Calculate percentages instantly. Includes increase, decrease, and percentage of calculations." />
        <link rel="canonical" href="https://grocktool.com/number-tools/percentage-calculator" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Percentage Calculator - All-in-One Percentage Tool",
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "Any",
            "description": "Calculate percentages instantly with our free online percentage calculator. Includes percentage increase, decrease, percentage of numbers, and basic percentage calculations. Perfect for finance, discounts, and math problems.",
            "url": "https://grocktool.com/number-tools/percentage-calculator",
            "author": {
              "@type": "Organization",
              "name": "GrockTool.com",
              "url": "https://grocktool.com"
            },
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "Multiple calculation types",
              "Percentage increase/decrease",
              "Basic percentage calculation",
              "Percentage of numbers",
              "No signup required",
              "Copy results functionality",
              "Responsive design"
            ]
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqData.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })}
        </script>
      </Head>

      <div className="min-h-screen bg-background font-inter">
        <div className="pt-20 pb-8 px-4 sm:pt-24 sm:pb-12 sm:px-6 lg:pt-28">
          <div className="max-w-6xl mx-auto">
            {/* Header - Improved Hero Section */}
            <div className="mb-8 sm:mb-12">
              <Link
                href="/tool"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors group text-sm sm:text-base"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Back to Tools
              </Link>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/10 to-blue-500/10 px-4 py-2 rounded-full mb-4 border border-green-500/20">
                  <Sparkles size={16} className="text-green-500" />
                  <span className="text-sm font-medium text-green-600">Multiple Calculation Types • Instant Results • 100% Free</span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                  All-in-One Percentage Calculator
                  <span className="block text-lg sm:text-xl lg:text-2xl font-normal text-muted-foreground mt-2">
                    Calculate Percentage Increase, Decrease, and Basic Percentages Instantly • Perfect for Finance & Math
                  </span>
                </h1>

                <div className="flex flex-wrap justify-center gap-4 mt-6 mb-8">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-lg">
                    <Percent size={14} className="text-green-600" />
                    <span className="text-xs sm:text-sm text-foreground">Basic Percentage</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 rounded-lg">
                    <TrendingUp size={14} className="text-blue-600" />
                    <span className="text-xs sm:text-sm text-foreground">Increase/Decrease</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 rounded-lg">
                    <DollarSign size={14} className="text-purple-600" />
                    <span className="text-xs sm:text-sm text-foreground">Financial Calculations</span>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Left Panel - Calculator */}
              <div className="space-y-6">
                {/* Calculation Type Selector */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-card rounded-xl border border-border p-6 shadow-sm"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Calculator size={20} className="text-foreground" />
                        <label className="block text-sm font-medium text-foreground">
                          Select Percentage Calculation Type
                        </label>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-green-600">
                        <Calculator size={12} />
                        <span>4 calculation modes</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setCalculationType('basic')}
                        className={`p-4 rounded-xl border transition-all ${calculationType === 'basic'
                            ? 'bg-gradient-to-r from-green-500 to-green-600 text-white border-green-600 shadow-md'
                            : 'bg-secondary text-secondary-foreground border-border hover:bg-secondary/80'
                          }`}
                      >
                        <div className="flex flex-col items-center gap-2 text-sm">
                          <Percent size={20} />
                          <span>Basic %</span>
                          <div className="text-xs opacity-80">What % is A of B?</div>
                        </div>
                      </button>
                      <button
                        onClick={() => setCalculationType('increase')}
                        className={`p-4 rounded-xl border transition-all ${calculationType === 'increase'
                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-600 shadow-md'
                            : 'bg-secondary text-secondary-foreground border-border hover:bg-secondary/80'
                          }`}
                      >
                        <div className="flex flex-col items-center gap-2 text-sm">
                          <TrendingUp size={20} />
                          <span>Increase</span>
                          <div className="text-xs opacity-80">Value + X%</div>
                        </div>
                      </button>
                      <button
                        onClick={() => setCalculationType('decrease')}
                        className={`p-4 rounded-xl border transition-all ${calculationType === 'decrease'
                            ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white border-orange-600 shadow-md'
                            : 'bg-secondary text-secondary-foreground border-border hover:bg-secondary/80'
                          }`}
                      >
                        <div className="flex flex-col items-center gap-2 text-sm">
                          <TrendingDown size={20} />
                          <span>Decrease</span>
                          <div className="text-xs opacity-80">Value - X%</div>
                        </div>
                      </button>
                      <button
                        onClick={() => setCalculationType('of')}
                        className={`p-4 rounded-xl border transition-all ${calculationType === 'of'
                            ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white border-purple-600 shadow-md'
                            : 'bg-secondary text-secondary-foreground border-border hover:bg-secondary/80'
                          }`}
                      >
                        <div className="flex flex-col items-center gap-2 text-sm">
                          <Target size={20} />
                          <span>% Of</span>
                          <div className="text-xs opacity-80">What is X% of Y?</div>
                        </div>
                      </button>
                    </div>
                  </div>
                </motion.div>

                {/* Input Fields Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-card rounded-xl border border-border p-6 shadow-sm"
                >
                  <div className="space-y-6">
                    {/* Quick Examples */}
                    <div className="space-y-2">
                      <div className="text-xs text-muted-foreground">Quick Examples:</div>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setExampleCalculation('discount')}
                          className="px-3 py-1.5 bg-green-500/10 text-green-600 rounded-lg hover:bg-green-500/20 transition-colors text-xs"
                        >
                          20% Discount on $100
                        </button>
                        <button
                          onClick={() => setExampleCalculation('tax')}
                          className="px-3 py-1.5 bg-blue-500/10 text-blue-600 rounded-lg hover:bg-blue-500/20 transition-colors text-xs"
                        >
                          18% Tax on $100
                        </button>
                        <button
                          onClick={() => setExampleCalculation('grade')}
                          className="px-3 py-1.5 bg-purple-500/10 text-purple-600 rounded-lg hover:bg-purple-500/20 transition-colors text-xs"
                        >
                          45 out of 60 Grade %
                        </button>
                      </div>
                    </div>

                    {/* Input Fields */}
                    <div className="space-y-4">
                      {calculationType === 'basic' && (
                        <>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-foreground">
                                Value 1 (Part)
                              </label>
                              <div className="relative">
                                <input
                                  type="number"
                                  value={values.value1}
                                  onChange={(e) => handleInputChange('value1', e.target.value)}
                                  placeholder="Enter first value"
                                  className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground"
                                />
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                  <div className="bg-green-500 text-white rounded-full p-1">
                                    <Percent size={10} />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-foreground">
                                Value 2 (Whole)
                              </label>
                              <div className="relative">
                                <input
                                  type="number"
                                  value={values.value2}
                                  onChange={(e) => handleInputChange('value2', e.target.value)}
                                  placeholder="Enter second value"
                                  className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground"
                                />
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                  <div className="bg-green-500 text-white rounded-full p-1">
                                    <Percent size={10} />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground text-center">
                            Calculates: What percentage is Value 1 of Value 2?
                          </p>
                        </>
                      )}

                      {(calculationType === 'increase' || calculationType === 'decrease') && (
                        <>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-foreground">
                                Original Value
                              </label>
                              <div className="relative">
                                <input
                                  type="number"
                                  value={values.value1}
                                  onChange={(e) => handleInputChange('value1', e.target.value)}
                                  placeholder="Enter original value"
                                  className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground"
                                />
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                  <div className="bg-blue-500 text-white rounded-full p-1">
                                    <DollarSign size={10} />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-foreground">
                                Percentage
                              </label>
                              <div className="relative">
                                <input
                                  type="number"
                                  value={values.percentage}
                                  onChange={(e) => handleInputChange('percentage', e.target.value)}
                                  placeholder="Enter percentage"
                                  className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground"
                                />
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                  <div className="bg-blue-500 text-white rounded-full p-1">
                                    <Percent size={10} />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground text-center">
                            {calculationType === 'increase'
                              ? 'Calculates: Original value + percentage increase'
                              : 'Calculates: Original value - percentage decrease'
                            }
                          </p>
                        </>
                      )}

                      {calculationType === 'of' && (
                        <>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-foreground">
                                Base Value
                              </label>
                              <div className="relative">
                                <input
                                  type="number"
                                  value={values.value1}
                                  onChange={(e) => handleInputChange('value1', e.target.value)}
                                  placeholder="Enter base value"
                                  className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground"
                                />
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                  <div className="bg-purple-500 text-white rounded-full p-1">
                                    <Target size={10} />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-foreground">
                                Percentage
                              </label>
                              <div className="relative">
                                <input
                                  type="number"
                                  value={values.percentage}
                                  onChange={(e) => handleInputChange('percentage', e.target.value)}
                                  placeholder="Enter percentage"
                                  className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground"
                                />
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                  <div className="bg-purple-500 text-white rounded-full p-1">
                                    <Percent size={10} />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground text-center">
                            Calculates: What is X% of the given value?
                          </p>
                        </>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={calculatePercentage}
                        disabled={
                          !values.value1 ||
                          (!values.value2 && calculationType === 'basic') ||
                          (!values.percentage && calculationType !== 'basic')
                        }
                        className="flex items-center justify-center gap-2 flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                      >
                        <Calculator size={18} />
                        Calculate Percentage
                      </button>
                      <button
                        onClick={clearFields}
                        className="flex-1 sm:flex-none px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-sm font-medium"
                      >
                        <RotateCcw size={16} />
                        Clear All
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Panel - Results */}
              <div className="space-y-6">
                {/* Results Card */}
                {values.result ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="bg-card rounded-xl border border-border p-6 shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">Percentage Calculation Result</h3>
                        <p className="text-sm text-muted-foreground">
                          {calculationType === 'basic' ? 'Basic Percentage Calculation' :
                            calculationType === 'increase' ? 'Percentage Increase' :
                              calculationType === 'decrease' ? 'Percentage Decrease' : 'Percentage Of'}
                        </p>
                      </div>
                      <button
                        onClick={copyResult}
                        className="p-2 text-muted-foreground hover:text-foreground transition-colors hover:bg-secondary/50 rounded-lg"
                        title="Copy result"
                      >
                        <Copy size={18} />
                      </button>
                    </div>

                    <div className="space-y-6">
                      {/* Main Result Display */}
                      <div className={`p-4 rounded-lg border ${calculationType === 'basic' ? 'bg-green-500/10 border-green-500/20' :
                          calculationType === 'increase' ? 'bg-blue-500/10 border-blue-500/20' :
                            calculationType === 'decrease' ? 'bg-orange-500/10 border-orange-500/20' :
                              'bg-purple-500/10 border-purple-500/20'
                        }`}>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-foreground mb-2">
                            {values.result}
                            {calculationType === 'basic' && '%'}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {getCalculationExplanation()}
                          </div>
                        </div>
                      </div>

                      {/* Detailed Breakdown */}
                      <div className="space-y-4">
                        <h4 className="text-sm font-medium text-foreground">Calculation Details</h4>
                        <div className="bg-secondary/20 p-4 rounded-lg border border-border">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <div className="text-muted-foreground">Calculation Type</div>
                              <div className="font-medium text-foreground capitalize">{calculationType}</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Input Values</div>
                              <div className="font-medium text-foreground">
                                {calculationType === 'basic' ? `${values.value1} and ${values.value2}` :
                                  calculationType === 'increase' || calculationType === 'decrease' ? `${values.value1} + ${values.percentage}%` :
                                    `${values.percentage}% of ${values.value1}`}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Visual Representation */}
                      {calculationType === 'basic' && parseFloat(values.value2) > 0 && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Percentage of Whole</span>
                            <span className="font-medium text-foreground">{values.result}%</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-green-500 to-green-600"
                              style={{ width: `${Math.min(100, parseFloat(values.result))}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="bg-card rounded-xl border border-border p-6 shadow-sm"
                  >
                    <div className="text-center">
                      <div className="relative inline-block mb-4">
                        <Percent className="w-16 h-16 text-muted-foreground" />
                        <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-1">
                          <Calculator size={12} />
                        </div>
                      </div>
                      <p className="text-foreground font-medium mb-2">Enter Values to Calculate</p>
                      <p className="text-muted-foreground text-sm mb-4">
                        Select calculation type and enter values to see percentage results
                      </p>
                      <div className="text-xs text-green-600 flex items-center justify-center gap-1">
                        <Lock size={10} />
                        <span>Instant calculations • No data storage • Multiple calculation types</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Common Uses Card */}
                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                  <h3 className="text-sm font-medium text-foreground mb-4">Common Percentage Uses</h3>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center gap-2 p-2 bg-green-500/10 rounded">
                      <Percent size={14} className="text-green-600" />
                      <span className="text-foreground">Discounts & Sales</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-blue-500/10 rounded">
                      <TrendingUp size={14} className="text-blue-600" />
                      <span className="text-foreground">Tax Calculations</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-purple-500/10 rounded">
                      <BarChart size={14} className="text-purple-600" />
                      <span className="text-foreground">Grade Scores</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-orange-500/10 rounded">
                      <DollarSign size={14} className="text-orange-600" />
                      <span className="text-foreground">Tip Calculations</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SEO Content Section with Dropdowns */}
            <section className="space-y-4 mt-12">
              {/* What This Tool Does - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('whatItDoes')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-green-500/10 p-2 rounded-lg">
                      <Calculator size={20} className="text-green-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">All-in-One Percentage Calculator - Features & Benefits</h2>
                  </div>
                  {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>

                {openSections.whatItDoes && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      This comprehensive percentage calculator handles all common percentage calculation scenarios with mathematical precision. It offers four distinct calculation modes: basic percentage (what percentage is A of B), percentage increase (add X% to a value), percentage decrease (subtract X% from a value), and percentage of (what is X% of Y). The tool provides instant, accurate results with two-decimal precision, making it suitable for financial calculations, academic work, business analysis, and everyday percentage problems. All calculations happen locally in your browser, ensuring complete privacy for your data.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Percent size={18} className="text-green-600" />
                          <h3 className="font-semibold text-foreground">4 Calculation Modes</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">Covers all common percentage scenarios: basic percentage, increase, decrease, and percentage of calculations with intuitive interface.</p>
                      </div>
                      <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign size={18} className="text-blue-600" />
                          <h3 className="font-semibold text-foreground">Financial Precision</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">Two-decimal precision with accurate mathematical calculations ideal for discounts, taxes, investments, and financial analysis.</p>
                      </div>
                      <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Zap size={18} className="text-purple-600" />
                          <h3 className="font-semibold text-foreground">Instant Results</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">Calculates percentages instantly with real-time feedback, perfect for quick calculations during shopping, studying, or business meetings.</p>
                      </div>
                    </div>
                  </div>
                )}
              </article>

              {/* Use Cases Section - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('useCases')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-500/10 p-2 rounded-lg">
                      <BarChart size={20} className="text-blue-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Practical Percentage Calculation Applications</h2>
                  </div>
                  {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>

                {openSections.useCases && (
                  <div className="px-6 pb-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">💰 Financial & Shopping Calculations</h3>
                        <ul className="space-y-1 text-muted-foreground text-sm">
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Calculate discounts and sale prices during shopping (e.g., 30% off $150 item)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Determine tax amounts and final prices including sales tax (e.g., 18% GST on $200)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Calculate tips and service charges (e.g., 15% tip on $85 restaurant bill)</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">📈 Business & Investment Analysis</h3>
                        <ul className="space-y-1 text-muted-foreground text-sm">
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Calculate profit margins, markups, and cost percentages for business pricing</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Determine investment returns, interest rates, and financial growth percentages</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Analyze sales performance, revenue growth, and market share percentages</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">📚 Academic & Educational Applications</h3>
                        <ul className="space-y-1 text-muted-foreground text-sm">
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Calculate test scores, grade percentages, and academic performance metrics</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Solve math problems involving percentages for homework and exam preparation</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Analyze statistical data, survey results, and research findings expressed as percentages</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </article>

              {/* How to Use - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('howToUse')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-500/10 p-2 rounded-lg">
                      <Zap size={20} className="text-orange-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">How to Calculate Percentages - Step by Step Guide</h2>
                  </div>
                  {openSections.howToUse ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>

                {openSections.howToUse && (
                  <div className="px-6 pb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h3 className="font-semibold text-foreground">4-Step Calculation Process</h3>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                            <div>
                              <div className="font-medium text-foreground">Select Calculation Type</div>
                              <div className="text-sm text-muted-foreground">Choose from Basic %, Increase, Decrease, or % Of based on your calculation needs.</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                            <div>
                              <div className="font-medium text-foreground">Enter Values</div>
                              <div className="text-sm text-muted-foreground">Input the required numbers based on selected calculation type. Use quick examples for common scenarios.</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                            <div>
                              <div className="font-medium text-foreground">Calculate</div>
                              <div className="text-sm text-muted-foreground">Click calculate to get instant, accurate percentage results with two-decimal precision.</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">4</div>
                            <div>
                              <div className="font-medium text-foreground">Review & Copy</div>
                              <div className="text-sm text-muted-foreground">Analyze results, view calculation details, and copy for documentation or sharing.</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h3 className="font-semibold text-foreground">Pro Tips for Accurate Calculations</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <div className="bg-accent/20 p-1 rounded mt-0.5">
                              <Percent size={12} className="text-accent" />
                            </div>
                            <span>For percentage increases/decreases, remember the result includes the original value</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-accent/20 p-1 rounded mt-0.5">
                              <Copy size={12} className="text-accent" />
                            </div>
                            <span>Use copy feature to save calculation results for receipts, invoices, or documentation</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-accent/20 p-1 rounded mt-0.5">
                              <Calculator size={12} className="text-accent" />
                            </div>
                            <span>Use quick example buttons to understand different calculation types before your own calculations</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-accent/20 p-1 rounded mt-0.5">
                              <DollarSign size={12} className="text-accent" />
                            </div>
                            <span>For financial calculations, always verify the decimal precision matches your currency requirements</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </article>

              {/* Example Input and Output Section */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('examples')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-500/10 p-2 rounded-lg">
                      <Calculator size={20} className="text-purple-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Percentage Calculation Examples & Formulas</h2>
                  </div>
                  {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>

                {openSections.examples && (
                  <div className="px-6 pb-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-3">Common Percentage Calculation Scenarios</h3>
                        <div className="overflow-x-auto">
                          <div className="min-w-full inline-block align-middle">
                            <div className="overflow-hidden border border-border rounded-lg">
                              <table className="min-w-full divide-y divide-border">
                                <thead className="bg-secondary/20">
                                  <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Calculation Type</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Input Values</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Formula</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Result</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Real-World Use</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                  <tr>
                                    <td className="px-4 py-3 text-sm text-foreground">Basic %</td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">45 of 60</td>
                                    <td className="px-4 py-3 text-sm text-blue-600">(45 ÷ 60) × 100</td>
                                    <td className="px-4 py-3 text-sm text-green-600 font-medium">75%</td>
                                    <td className="px-4 py-3 text-sm text-orange-600">Test score calculation</td>
                                  </tr>
                                  <tr>
                                    <td className="px-4 py-3 text-sm text-foreground">Increase</td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">200 + 15%</td>
                                    <td className="px-4 py-3 text-sm text-blue-600">200 + (200 × 0.15)</td>
                                    <td className="px-4 py-3 text-sm text-green-600 font-medium">230</td>
                                    <td className="px-4 py-3 text-sm text-orange-600">Price after tax</td>
                                  </tr>
                                  <tr>
                                    <td className="px-4 py-3 text-sm text-foreground">Decrease</td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">150 - 20%</td>
                                    <td className="px-4 py-3 text-sm text-blue-600">150 - (150 × 0.20)</td>
                                    <td className="px-4 py-3 text-sm text-green-600 font-medium">120</td>
                                    <td className="px-4 py-3 text-sm text-orange-600">Discounted price</td>
                                  </tr>
                                  <tr>
                                    <td className="px-4 py-3 text-sm text-foreground">% Of</td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">15% of 2000</td>
                                    <td className="px-4 py-3 text-sm text-blue-600">2000 × 0.15</td>
                                    <td className="px-4 py-3 text-sm text-green-600 font-medium">300</td>
                                    <td className="px-4 py-3 text-sm text-orange-600">Commission calculation</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Detailed Percentage Calculation Examples</h3>
                        <div className="bg-secondary/20 p-4 rounded-lg border border-border overflow-x-auto">
                          <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
                            {`Example 1: Basic Percentage Calculation
Scenario: Test score - 45 marks out of 60

Step 1: Identify values
Part (Value 1) = 45
Whole (Value 2) = 60

Step 2: Apply formula
Percentage = (Part ÷ Whole) × 100
Percentage = (45 ÷ 60) × 100
Percentage = 0.75 × 100
Percentage = 75%

Result: 45 is 75% of 60

Example 2: Percentage Increase Calculation
Scenario: $200 product with 15% tax

Step 1: Identify values
Original Value = $200
Percentage Increase = 15%

Step 2: Calculate increase amount
Increase Amount = Original Value × (Percentage ÷ 100)
Increase Amount = 200 × (15 ÷ 100)
Increase Amount = 200 × 0.15
Increase Amount = $30

Step 3: Calculate final value
Final Value = Original Value + Increase Amount
Final Value = 200 + 30
Final Value = $230

Result: $200 + 15% = $230

Example 3: Percentage Decrease Calculation
Scenario: $150 item with 20% discount

Step 1: Identify values
Original Value = $150
Percentage Decrease = 20%

Step 2: Calculate decrease amount
Decrease Amount = Original Value × (Percentage ÷ 100)
Decrease Amount = 150 × (20 ÷ 100)
Decrease Amount = 150 × 0.20
Decrease Amount = $30

Step 3: Calculate final value
Final Value = Original Value - Decrease Amount
Final Value = 150 - 30
Final Value = $120

Result: $150 - 20% = $120

Example 4: Percentage Of Calculation
Scenario: 15% commission on $2000 sale

Step 1: Identify values
Base Value = $2000
Percentage = 15%

Step 2: Apply formula
Result = Base Value × (Percentage ÷ 100)
Result = 2000 × (15 ÷ 100)
Result = 2000 × 0.15
Result = $300

Result: 15% of $2000 = $300

Key Calculation Formulas:
1. Basic Percentage: (A ÷ B) × 100
2. Percentage Increase: A + (A × P/100)
3. Percentage Decrease: A - (A × P/100)
4. Percentage Of: A × (P/100)

Where:
A = First value (Part/Original/Base)
B = Second value (Whole for basic %)
P = Percentage value

Calculator Features Demonstrated:
✓ All four percentage calculation types
✓ Step-by-step calculation breakdowns
✓ Real-world application examples
✓ Formula explanations for each type
✓ Accurate mathematical operations
✓ Clear result presentation`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </article>
              {/* Frequently Asked Questions - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('faqs')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-500/10 p-2 rounded-lg">
                      <Percent size={20} className="text-purple-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Frequently Asked Questions</h2>
                  </div>
                  {openSections.faqs ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>

                {openSections.faqs && (
                  <div className="px-6 pb-6">
                    <div className="space-y-6">
                      {faqData.map((faq, index) => (
                        <div key={index} className="pb-4 border-b border-border/50 last:border-0">
                          <h3 className="text-lg font-semibold text-foreground mb-2">{faq.question}</h3>
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </article>

              {/* Related Tools Section - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('relatedTools')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h2 className="text-xl font-bold text-foreground">More Number Tools</h2>
                  {openSections.relatedTools ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>

                {openSections.relatedTools && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Explore other useful number calculation tools from our Number Tools category:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {relatedTools.map((tool, index) => {
                        const Icon = tool.icon;
                        return (
                          <Link
                            key={index}
                            href={tool.path}
                            className="flex items-center gap-3 p-4 bg-secondary/30 rounded-lg border border-border hover:bg-secondary/50 transition-colors group"
                          >
                            <div className="bg-accent/10 p-2 rounded-lg group-hover:bg-accent/20 transition-colors">
                              <Icon size={18} className="text-accent" />
                            </div>
                            <div>
                              <div className="font-medium text-foreground group-hover:text-accent transition-colors">{tool.name}</div>
                              <div className="text-xs text-muted-foreground">Visit tool →</div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </article>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}