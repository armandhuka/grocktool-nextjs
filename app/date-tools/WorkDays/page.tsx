'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Copy, RotateCcw, ArrowLeft, Briefcase, CalendarDays, TrendingUp, BarChart, Sparkles, ChevronUp, ChevronDown, ChevronRight, Lock, Clock, Zap, Calculator } from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';

export default function WorkDays() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [result, setResult] = useState<{
    totalDays: number;
    workdays: number;
    weekends: number;
    percentage: number;
  } | null>(null);

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

  const relatedTools = [
    { name: 'Date Difference Calculator', path: '/date-tools/date-difference' },
    { name: 'Age Calculator', path: '/date-tools/age-calculator' },
    { name: 'Countdown Timer', path: '/date-tools/countdown' },
    { name: 'Business Days Calculator', path: '/date-tools/business-days' },
    { name: 'Project Timeline Calculator', path: '/date-tools/project-timeline' }
  ];

  const faqData = [
    {
      question: "What days are considered work days?",
      answer: "This calculator counts Monday through Friday as work days, excluding Saturdays and Sundays as weekends. This follows the standard 5-day work week used by most businesses and organizations."
    },
    {
      question: "Are public holidays included in work days?",
      answer: "No, this calculator only excludes Saturdays and Sundays. Public holidays are not automatically excluded since holiday schedules vary by country, region, and organization. You would need to subtract holidays manually from the work days result."
    },
    {
      question: "Does the calculation include both start and end dates?",
      answer: "Yes, the calculation includes both the start date and end date in the total count. If your start and end dates are the same weekday, it counts as one work day."
    },
    {
      question: "Can I calculate work days for multiple months or years?",
      answer: "Yes, the calculator works for any date range from single days to multiple years. It accurately counts work days across month boundaries and leap years."
    },
    {
      question: "Is this suitable for project timeline planning?",
      answer: "Absolutely. This tool is specifically designed for project planning, helping you estimate work days for project timelines, deadlines, and resource allocation excluding weekends."
    }
  ];

  const calculateWorkDays = () => {
    if (!startDate || !endDate) return;

    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start > end) return;

    let totalDays = 0;
    let workdays = 0;
    let weekends = 0;
    
    const currentDate = new Date(start);
    
    while (currentDate <= end) {
      totalDays++;
      const dayOfWeek = currentDate.getDay();
      
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        weekends++;
      } else {
        workdays++;
      }
      
      currentDate.setDate(currentDate.getDate() + 1);
    }

    const percentage = totalDays > 0 ? Math.round((workdays / totalDays) * 100) : 0;

    setResult({
      totalDays,
      workdays,
      weekends,
      percentage
    });
  };

  const clearFields = () => {
    setStartDate('');
    setEndDate('');
    setResult(null);
  };

  const copyResult = async () => {
    if (result) {
      const text = `Work Days Calculation:\nDate Range: ${new Date(startDate).toLocaleDateString()} - ${new Date(endDate).toLocaleDateString()}\nTotal Days: ${result.totalDays}\nWork Days: ${result.workdays}\nWeekend Days: ${result.weekends}\nWork Days Percentage: ${result.percentage}%`;
      try {
        await navigator.clipboard.writeText(text);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Work Days Calculator | Calculate Business Days Between Dates | GrockTool.com</title>
        <meta name="description" content="Calculate work days between two dates excluding weekends. Perfect for project planning, timeline estimation, and business scheduling. 100% free and accurate." />
        <meta name="keywords" content="work days calculator, business days calculator, working days, exclude weekends, project timeline, date calculator, work week calculator" />
        <meta property="og:title" content="Work Days Calculator | Calculate Business Days Between Dates" />
        <meta property="og:description" content="Calculate work days between two dates excluding weekends. Perfect for project planning, timeline estimation, and business scheduling." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Work Days Calculator - Exclude Weekends" />
        <meta name="twitter:description" content="Calculate business days between dates. Perfect for project planning and timeline estimation." />
        <link rel="canonical" href="https://grocktool.com/date-tools/work-days" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Work Days Calculator - Business Days Excluding Weekends",
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "Any",
            "description": "Calculate work days between two dates excluding weekends. Perfect for project planning, timeline estimation, and business scheduling. 100% free and accurate.",
            "url": "https://grocktool.com/date-tools/work-days",
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
              "Exclude Saturdays and Sundays",
              "Accurate day counting",
              "Percentage calculations",
              "No signup required",
              "Browser-based processing",
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
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-4 py-2 rounded-full mb-4 border border-blue-500/20">
                  <Sparkles size={16} className="text-blue-500" />
                  <span className="text-sm font-medium text-blue-600">Excludes Weekends • Project Planning • 100% Accurate</span>
                </div>
                
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                  Work Days Calculator
                  <span className="block text-lg sm:text-xl lg:text-2xl font-normal text-muted-foreground mt-2">
                    Calculate Business Days Between Dates • Exclude Saturdays & Sundays
                  </span>
                </h1>
                
                <div className="flex flex-wrap justify-center gap-4 mt-6 mb-8">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-lg">
                    <Briefcase size={14} className="text-green-600" />
                    <span className="text-xs sm:text-sm text-foreground">Monday-Friday Calculation</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 rounded-lg">
                    <CalendarDays size={14} className="text-blue-600" />
                    <span className="text-xs sm:text-sm text-foreground">Excludes Weekends</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 rounded-lg">
                    <BarChart size={14} className="text-purple-600" />
                    <span className="text-xs sm:text-sm text-foreground">Percentage Analysis</span>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Left Panel - Calculator */}
              <div className="space-y-6">
                {/* Main Tool Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-card rounded-xl border border-border p-6 shadow-sm"
                >
                  <div className="space-y-6">
                    {/* Date Inputs */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar size={20} className="text-foreground" />
                          <label className="block text-sm font-medium text-foreground">
                            Select Date Range for Work Days Calculation
                          </label>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-green-600">
                          <Calculator size={12} />
                          <span>Accurate calculation</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-muted-foreground" />
                            <label className="block text-sm text-muted-foreground">
                              Start Date
                            </label>
                          </div>
                          <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground"
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-muted-foreground" />
                            <label className="block text-sm text-muted-foreground">
                              End Date
                            </label>
                          </div>
                          <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={calculateWorkDays}
                        disabled={!startDate || !endDate}
                        className="flex items-center justify-center gap-2 flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                      >
                        <Calculator size={18} />
                        Calculate Work Days
                      </button>
                      <button
                        onClick={clearFields}
                        className="flex-1 sm:flex-none px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-sm font-medium"
                      >
                        <RotateCcw size={16} />
                        Clear All
                      </button>
                    </div>

                    {/* Quick Info */}
                    {startDate && endDate && (
                      <div className="bg-card rounded-xl border border-border p-4 shadow-sm">
                        <div className="grid grid-cols-2 gap-2 text-center">
                          <div className="p-2">
                            <div className="text-lg font-bold text-foreground">
                              {new Date(startDate).toLocaleDateString('en-US', { weekday: 'long' })}
                            </div>
                            <div className="text-xs text-muted-foreground">Start Day</div>
                          </div>
                          <div className="p-2">
                            <div className="text-lg font-bold text-foreground">
                              {new Date(endDate).toLocaleDateString('en-US', { weekday: 'long' })}
                            </div>
                            <div className="text-xs text-muted-foreground">End Day</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Benefits Card */}
                <div className="rounded-xl border border-blue-200 dark:border-blue-800 p-6 shadow-sm">
                  <h3 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
                    <Sparkles size={16} className="text-blue-600" />
                    Why Use This Work Days Calculator?
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="bg-green-100 dark:bg-green-900/20 p-1.5 rounded-full mt-0.5">
                        <Briefcase size={12} className="text-green-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">Accurate Project Planning</div>
                        <div className="text-xs text-muted-foreground">Calculate exact work days for project timelines and deadlines.</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 dark:bg-blue-900/20 p-1.5 rounded-full mt-0.5">
                        <CalendarDays size={12} className="text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">Weekend Exclusion</div>
                        <div className="text-xs text-muted-foreground">Automatically excludes Saturdays and Sundays from calculations.</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-purple-100 dark:bg-purple-900/20 p-1.5 rounded-full mt-0.5">
                        <BarChart size={12} className="text-purple-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">Detailed Analysis</div>
                        <div className="text-xs text-muted-foreground">Get percentages and breakdowns for better resource planning.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Panel - Results */}
              <div className="space-y-6">
                {/* Results Card */}
                {result && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-card rounded-xl border border-border p-6 shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">Work Days Analysis</h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        onClick={copyResult}
                        className="p-2 text-muted-foreground hover:text-foreground transition-colors hover:bg-secondary/50 rounded-lg"
                        title="Copy results"
                      >
                        <Copy size={18} />
                      </button>
                    </div>

                    <div className="space-y-6">
                      {/* Main Work Days Display */}
                      <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                        <div className="text-2xl font-bold text-foreground text-center mb-2">
                          {result.workdays} Work Days
                        </div>
                        <div className="text-sm text-green-600 text-center flex items-center justify-center gap-2">
                          <Calculator size={14} />
                          <span>Excluding Saturdays & Sundays</span>
                        </div>
                      </div>

                      {/* Detailed Breakdown */}
                      <div className="space-y-4">
                        <h4 className="text-sm font-medium text-foreground">Detailed Breakdown</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 p-4 rounded-xl border border-blue-500/20 text-center">
                            <div className="text-2xl font-bold text-foreground">{result.totalDays}</div>
                            <div className="text-xs text-muted-foreground mt-1">Total Days</div>
                          </div>
                          <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 p-4 rounded-xl border border-green-500/20 text-center">
                            <div className="text-2xl font-bold text-foreground">{result.workdays}</div>
                            <div className="text-xs text-muted-foreground mt-1">Work Days</div>
                          </div>
                          <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 p-4 rounded-xl border border-orange-500/20 text-center">
                            <div className="text-2xl font-bold text-foreground">{result.weekends}</div>
                            <div className="text-xs text-muted-foreground mt-1">Weekend Days</div>
                          </div>
                          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 p-4 rounded-xl border border-purple-500/20 text-center">
                            <div className="text-2xl font-bold text-foreground">{result.percentage}%</div>
                            <div className="text-xs text-muted-foreground mt-1">Work Days %</div>
                          </div>
                        </div>
                      </div>

                      {/* Percentage Visualization */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Work Days: {result.workdays} days ({result.percentage}%)</span>
                          <span className="text-muted-foreground">Weekends: {result.weekends} days ({100 - result.percentage}%)</span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-green-500 to-green-600" 
                            style={{ width: `${result.percentage}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Date Range Info */}
                      <div className="bg-secondary/20 p-4 rounded-lg border border-border">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar size={16} className="text-accent" />
                          <span className="text-sm font-medium text-foreground">Date Range Details</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                          <div>
                            <div className="text-muted-foreground">Start Date</div>
                            <div className="font-medium text-foreground">{new Date(startDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">End Date</div>
                            <div className="font-medium text-foreground">{new Date(endDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Features Card */}
                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                  <h3 className="text-sm font-medium text-foreground mb-4">Calculation Features</h3>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center gap-2 p-2 bg-blue-500/10 rounded">
                      <Briefcase size={14} className="text-blue-600" />
                      <span className="text-foreground">Monday-Friday</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-green-500/10 rounded">
                      <CalendarDays size={14} className="text-green-600" />
                      <span className="text-foreground">Weekends Excluded</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-purple-500/10 rounded">
                      <BarChart size={14} className="text-purple-600" />
                      <span className="text-foreground">Percentage Analysis</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-orange-500/10 rounded">
                      <TrendingUp size={14} className="text-orange-600" />
                      <span className="text-foreground">Project Planning</span>
                    </div>
                  </div>
                </div>

                {/* Info Section */}
                {!result && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="bg-card rounded-xl border border-border p-6 shadow-sm"
                  >
                    <div className="text-center">
                      <div className="relative inline-block mb-4">
                        <Briefcase className="w-16 h-16 text-muted-foreground" />
                        <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-1">
                          <Calculator size={12} />
                        </div>
                      </div>
                      <p className="text-foreground font-medium mb-2">Select Date Range</p>
                      <p className="text-muted-foreground text-sm mb-4">
                        Choose start and end dates to calculate work days excluding weekends
                      </p>
                      <div className="text-xs text-green-600 flex items-center justify-center gap-1">
                        <Lock size={10} />
                        <span>Accurate calculations • No data storage • Instant results</span>
                      </div>
                    </div>
                  </motion.div>
                )}
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
                    <div className="bg-blue-500/10 p-2 rounded-lg">
                      <Briefcase size={20} className="text-blue-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Work Days Calculator - Accurate Business Day Calculation</h2>
                  </div>
                  {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.whatItDoes && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      This Work Days Calculator accurately determines the number of business days between any two dates, automatically excluding Saturdays and Sundays. Unlike simple date difference calculators, it provides detailed analysis including total days, work days, weekend days, and percentages. Perfect for project managers, HR professionals, and business planners who need to calculate realistic timelines, estimate project durations, or plan resource allocation based on actual working days rather than calendar days.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <CalendarDays size={18} className="text-blue-600" />
                          <h3 className="font-semibold text-foreground">Weekend Exclusion</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">Automatically excludes Saturdays and Sundays to provide accurate business day counts for project planning and scheduling.</p>
                      </div>
                      <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <BarChart size={18} className="text-green-600" />
                          <h3 className="font-semibold text-foreground">Detailed Analysis</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">Provides percentages and breakdowns showing work days versus weekend days for comprehensive project analysis.</p>
                      </div>
                      <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp size={18} className="text-purple-600" />
                          <h3 className="font-semibold text-foreground">Project Planning</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">Essential for accurate project timeline estimation, deadline calculation, and resource allocation in business environments.</p>
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
                    <div className="bg-green-500/10 p-2 rounded-lg">
                      <Briefcase size={20} className="text-green-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Practical Applications of Work Days Calculation</h2>
                  </div>
                  {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.useCases && (
                  <div className="px-6 pb-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">💼 Project Management & Business Planning</h3>
                        <ul className="space-y-1 text-muted-foreground text-sm">
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Calculate realistic project timelines excluding weekends for accurate delivery date estimation</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Estimate work days for resource allocation, team scheduling, and workload distribution</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Determine business day counts for contract durations, service level agreements, and delivery commitments</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">📊 HR & Payroll Calculations</h3>
                        <ul className="space-y-1 text-muted-foreground text-sm">
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Calculate actual work days for payroll processing, especially for new hires or departing employees</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Determine probation period durations in business days for performance evaluation scheduling</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Calculate notice period requirements in working days for employment contract compliance</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">📅 Legal & Compliance Requirements</h3>
                        <ul className="space-y-1 text-muted-foreground text-sm">
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Calculate statutory response times and compliance deadlines in business days</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Determine legal notice periods and contractual obligations excluding weekends and holidays</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Calculate business day requirements for regulatory filings, submissions, and documentation</span>
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
                    <h2 className="text-xl font-bold text-foreground">How to Calculate Work Days - Step by Step</h2>
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
                            <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                            <div>
                              <div className="font-medium text-foreground">Select Start Date</div>
                              <div className="text-sm text-muted-foreground">Choose your project or period start date using the date picker or manual entry.</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                            <div>
                              <div className="font-medium text-foreground">Select End Date</div>
                              <div className="text-sm text-muted-foreground">Choose your project or period end date. The calculation includes both dates.</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                            <div>
                              <div className="font-medium text-foreground">Calculate Work Days</div>
                              <div className="text-sm text-muted-foreground">Click calculate to instantly get work days excluding Saturdays and Sundays.</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">4</div>
                            <div>
                              <div className="font-medium text-foreground">Analyze Results</div>
                              <div className="text-sm text-muted-foreground">Review detailed breakdown including percentages and copy results for reporting.</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h3 className="font-semibold text-foreground">Pro Tips for Accurate Calculations</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <div className="bg-accent/20 p-1 rounded mt-0.5">
                              <Calendar size={12} className="text-accent" />
                            </div>
                            <span>Remember that both start and end dates are included in the calculation</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-accent/20 p-1 rounded mt-0.5">
                              <Briefcase size={12} className="text-accent" />
                            </div>
                            <span>For project planning, add buffer days for holidays and unexpected delays</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-accent/20 p-1 rounded mt-0.5">
                              <Copy size={12} className="text-accent" />
                            </div>
                            <span>Use the copy feature to save results for project documentation and reporting</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-accent/20 p-1 rounded mt-0.5">
                              <BarChart size={12} className="text-accent" />
                            </div>
                            <span>Analyze the percentage breakdown for resource planning and timeline optimization</span>
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
                    <h2 className="text-xl font-bold text-foreground">Work Days Calculation Examples</h2>
                  </div>
                  {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.examples && (
                  <div className="px-6 pb-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-3">Common Work Days Calculation Scenarios</h3>
                        <div className="overflow-x-auto">
                          <div className="min-w-full inline-block align-middle">
                            <div className="overflow-hidden border border-border rounded-lg">
                              <table className="min-w-full divide-y divide-border">
                                <thead className="bg-secondary/20">
                                  <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Scenario</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Date Range</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Work Days</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Weekends</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Work %</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                  <tr>
                                    <td className="px-4 py-3 text-sm text-foreground">Two-Week Project</td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">Jan 1 - Jan 14</td>
                                    <td className="px-4 py-3 text-sm text-green-600 font-medium">10 days</td>
                                    <td className="px-4 py-3 text-sm text-orange-600">4 days</td>
                                    <td className="px-4 py-3 text-sm text-blue-600">71%</td>
                                  </tr>
                                  <tr>
                                    <td className="px-4 py-3 text-sm text-foreground">Month-Long Initiative</td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">Feb 1 - Feb 28</td>
                                    <td className="px-4 py-3 text-sm text-green-600 font-medium">20 days</td>
                                    <td className="px-4 py-3 text-sm text-orange-600">8 days</td>
                                    <td className="px-4 py-3 text-sm text-blue-600">71%</td>
                                  </tr>
                                  <tr>
                                    <td className="px-4 py-3 text-sm text-foreground">Quarter Planning</td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">Apr 1 - Jun 30</td>
                                    <td className="px-4 py-3 text-sm text-green-600 font-medium">65 days</td>
                                    <td className="px-4 py-3 text-sm text-orange-600">26 days</td>
                                    <td className="px-4 py-3 text-sm text-blue-600">71%</td>
                                  </tr>
                                  <tr>
                                    <td className="px-4 py-3 text-sm text-foreground">Week Start to End</td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">Mon - Fri (5 days)</td>
                                    <td className="px-4 py-3 text-sm text-green-600 font-medium">5 days</td>
                                    <td className="px-4 py-3 text-sm text-orange-600">0 days</td>
                                    <td className="px-4 py-3 text-sm text-blue-600">100%</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Detailed Calculation Example</h3>
                        <div className="bg-secondary/20 p-4 rounded-lg border border-border overflow-x-auto">
                          <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
{`Example: Calculate work days from January 1, 2024 to January 31, 2024

Step 1: List All Dates in Range
January 2024:
1 (Mon) - 2 (Tue) - 3 (Wed) - 4 (Thu) - 5 (Fri) - 6 (Sat) - 7 (Sun)
8 (Mon) - 9 (Tue) - 10 (Wed) - 11 (Thu) - 12 (Fri) - 13 (Sat) - 14 (Sun)
15 (Mon) - 16 (Tue) - 17 (Wed) - 18 (Thu) - 19 (Fri) - 20 (Sat) - 21 (Sun)
22 (Mon) - 23 (Tue) - 24 (Wed) - 25 (Thu) - 26 (Fri) - 27 (Sat) - 28 (Sun)
29 (Mon) - 30 (Tue) - 31 (Wed)

Step 2: Identify Work Days (Monday-Friday)
Work Days: January 1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 15, 16, 17, 18, 19, 
22, 23, 24, 25, 26, 29, 30, 31

Step 3: Identify Weekend Days (Saturday-Sunday)
Weekend Days: January 6, 7, 13, 14, 20, 21, 27, 28

Step 4: Calculate Totals
Total Days in January 2024: 31 days
Total Work Days: 23 days
Total Weekend Days: 8 days

Step 5: Calculate Percentages
Work Days Percentage: (23 ÷ 31) × 100 = 74.19% ≈ 74%
Weekend Days Percentage: (8 ÷ 31) × 100 = 25.81% ≈ 26%

Final Results:
• Total Days: 31
• Work Days: 23 (Monday-Friday)
• Weekend Days: 8 (Saturday-Sunday)
• Work Days Percentage: 74%
• Weekend Days Percentage: 26%

Key Calculation Features:
✓ Automatically excludes Saturdays and Sundays
✓ Includes both start and end dates in calculation
✓ Handles varying month lengths correctly
✓ Accounts for leap years in date ranges
✓ Provides percentage breakdowns
✓ Suitable for any date range from days to years`}
                          </pre>
                        </div>
                      </div>
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
                  <h2 className="text-xl font-bold text-foreground">More Date & Business Tools</h2>
                  {openSections.relatedTools ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.relatedTools && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Explore other useful date and business calculation tools:
                    </p>
                    <ul className="space-y-3 text-muted-foreground">
                      {relatedTools.map((tool, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-accent mr-2">•</span>
                          <Link href={tool.path} className="text-accent hover:underline">
                            <strong>{tool.name}:</strong> Visit this tool for additional date and business calculations
                          </Link>
                        </li>
                      ))}
                    </ul>
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
                      <Briefcase size={20} className="text-purple-600" />
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
            </section>
          </div>
        </div>
      </div>
    </>
  );
}