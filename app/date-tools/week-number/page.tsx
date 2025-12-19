'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Copy, RotateCcw, ArrowLeft, CalendarDays, Hash, Target, Sparkles, ChevronUp, ChevronDown, ChevronRight, Lock, Zap, TrendingUp, CheckCircle,Info } from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';

export default function WeekNumber() {
  const [selectedDate, setSelectedDate] = useState('');
  const [result, setResult] = useState<{
    date: string;
    weekNumber: number;
    year: number;
    dayOfWeek: string;
    dayOfYear: number;
    isCurrentWeek: boolean;
    totalWeeksInYear: number;
    remainingWeeks: number;
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
    { name: 'Work Days Calculator', path: '/date-tools/WorkDays' },
    { name: 'Countdown Timer', path: '/date-tools/countdown' },
    { name: 'Age Calculator', path: '/date-tools/age-calculator' },
    { name: 'Leap Year Checker', path: '/date-tools/leap-year' }
  ];

  const faqData = [
    {
      question: "How is week number calculated?",
      answer: "Week numbers are calculated starting from January 1st as Week 1. Each 7-day period constitutes one week. The calculation accounts for the exact day of year and divides by 7 to determine the week number, with results rounded up to the nearest whole number."
    },
    {
      question: "Do week numbers follow ISO standards?",
      answer: "This calculator uses simple week numbering starting from January 1st. For ISO week numbers (which can start in previous year), you would need a specialized ISO week calculator. This tool is designed for general week numbering purposes."
    },
    {
      question: "Can weeks extend into the next year?",
      answer: "No, this calculator resets week numbers at the start of each calendar year. Week 1 always begins on January 1st, and the final week number depends on whether the year has 52 or 53 weeks based on leap years and day distribution."
    },
    {
      question: "Why are there 52 or 53 weeks in a year?",
      answer: "A standard year has 52 weeks and 1 day (365 ÷ 7 = 52.14). Leap years have 52 weeks and 2 days (366 ÷ 7 = 52.29). The 'extra' days accumulate, and approximately every 5-6 years, an extra week is needed to account for this accumulation."
    },
    {
      question: "Is this useful for business planning?",
      answer: "Absolutely! Week numbers are essential for business planning, project management, and reporting. They provide a standardized way to reference time periods across departments and organizations, especially for weekly reporting cycles."
    }
  ];

  const getWeekNumber = (date: Date): number => {
    const startDate = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000));
    return Math.ceil((days + 1) / 7); // +1 because January 1 is day 1
  };

  const getDayOfYear = (date: Date): number => {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - start.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  const getTotalWeeksInYear = (year: number): number => {
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    const daysInYear = isLeapYear ? 366 : 365;
    return Math.ceil(daysInYear / 7);
  };

  const checkWeekNumber = () => {
    if (!selectedDate) return;

    const date = new Date(selectedDate);
    const weekNumber = getWeekNumber(date);
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
    const dayOfYear = getDayOfYear(date);
    const totalWeeks = getTotalWeeksInYear(date.getFullYear());
    
    const today = new Date();
    const currentWeek = getWeekNumber(today);
    const isCurrentWeek = weekNumber === currentWeek && date.getFullYear() === today.getFullYear();

    setResult({
      date: date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      weekNumber,
      year: date.getFullYear(),
      dayOfWeek,
      dayOfYear,
      isCurrentWeek,
      totalWeeksInYear: totalWeeks,
      remainingWeeks: totalWeeks - weekNumber
    });
  };

  const clearFields = () => {
    setSelectedDate('');
    setResult(null);
  };

  const copyResult = async () => {
    if (result) {
      const text = `${result.date} is in Week ${result.weekNumber} of ${result.year} (Week ${result.weekNumber} of ${result.totalWeeksInYear})`;
      try {
        await navigator.clipboard.writeText(text);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  const setToday = () => {
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    setSelectedDate(todayString);
  };

  const setExampleDate = (exampleType: string) => {
    const today = new Date();
    let exampleDate = new Date();
    
    switch(exampleType) {
      case 'startOfYear':
        exampleDate = new Date(today.getFullYear(), 0, 1);
        break;
      case 'midYear':
        exampleDate = new Date(today.getFullYear(), 6, 15);
        break;
      case 'endOfYear':
        exampleDate = new Date(today.getFullYear(), 11, 31);
        break;
      case 'leapYear':
        exampleDate = new Date(2024, 1, 29); // February 29, 2024 (leap year)
        break;
    }
    
    setSelectedDate(exampleDate.toISOString().split('T')[0]);
  };

  // Auto-calculate when date changes
  useEffect(() => {
    if (selectedDate) {
      checkWeekNumber();
    }
  }, [selectedDate]);

  return (
    <>
      <Head>
        <title>Week Number Calculator | Find Week of Year for Any Date | GrockTool.com</title>
        <meta name="description" content="Calculate which week of the year any date falls in. Find week numbers for project planning, business reporting, and scheduling. Includes day of year and total weeks calculation." />
        <meta name="keywords" content="week number calculator, week of year, find week number, calendar week, business week, project planning, week calculator, date to week" />
        <meta property="og:title" content="Week Number Calculator | Find Week of Year for Any Date" />
        <meta property="og:description" content="Calculate which week of the year any date falls in. Find week numbers for project planning, business reporting, and scheduling. Includes day of year and total weeks calculation." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Week Number Calculator - Find Week of Year" />
        <meta name="twitter:description" content="Calculate week numbers for any date. Perfect for business planning and project scheduling." />
        <link rel="canonical" href="https://grocktool.com/date-tools/week-number" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Week Number Calculator - Find Week of Year",
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "Any",
            "description": "Calculate which week of the year any date falls in. Find week numbers for project planning, business reporting, and scheduling. Includes day of year and total weeks calculation.",
            "url": "https://grocktool.com/date-tools/week-number",
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
              "Week number calculation",
              "Day of year tracking",
              "Total weeks in year",
              "Remaining weeks calculation",
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
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-4 py-2 rounded-full mb-4 border border-blue-500/20">
                  <Sparkles size={16} className="text-blue-500" />
                  <span className="text-sm font-medium text-blue-600">Business Planning • Project Scheduling • 100% Accurate</span>
                </div>
                
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                  Week Number Calculator
                  <span className="block text-lg sm:text-xl lg:text-2xl font-normal text-muted-foreground mt-2">
                    Find Which Week of the Year Any Date Falls In • Perfect for Business & Project Planning
                  </span>
                </h1>
                
                <div className="flex flex-wrap justify-center gap-4 mt-6 mb-8">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 rounded-lg">
                    <CalendarDays size={14} className="text-blue-600" />
                    <span className="text-xs sm:text-sm text-foreground">Week of Year</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-lg">
                    <Hash size={14} className="text-green-600" />
                    <span className="text-xs sm:text-sm text-foreground">Day of Year</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 rounded-lg">
                    <TrendingUp size={14} className="text-purple-600" />
                    <span className="text-xs sm:text-sm text-foreground">Business Planning</span>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Left Panel - Week Calculator */}
              <div className="space-y-6">
                {/* Main Tool Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-card rounded-xl border border-border p-6 shadow-sm"
                >
                  <div className="space-y-6">
                    {/* Date Input */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar size={20} className="text-foreground" />
                          <label className="block text-sm font-medium text-foreground">
                            Select Date to Find Week Number
                          </label>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-green-600">
                          <CalendarDays size={12} />
                          <span>Automatic calculation</span>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <input
                          type="date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <div className="bg-blue-500 text-white rounded-full p-1">
                            <Calendar size={10} />
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground text-center">
                        Week numbers calculated automatically as you select dates
                      </p>
                    </div>

                    {/* Quick Example Buttons */}
                    <div className="space-y-2">
                      <div className="text-xs text-muted-foreground">Quick Example Dates:</div>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={setToday}
                          className="px-3 py-1.5 bg-blue-500/10 text-blue-600 rounded-lg hover:bg-blue-500/20 transition-colors text-xs"
                        >
                          Today's Date
                        </button>
                        <button
                          onClick={() => setExampleDate('startOfYear')}
                          className="px-3 py-1.5 bg-green-500/10 text-green-600 rounded-lg hover:bg-green-500/20 transition-colors text-xs"
                        >
                          Start of Year
                        </button>
                        <button
                          onClick={() => setExampleDate('midYear')}
                          className="px-3 py-1.5 bg-purple-500/10 text-purple-600 rounded-lg hover:bg-purple-500/20 transition-colors text-xs"
                        >
                          Mid-Year
                        </button>
                        <button
                          onClick={() => setExampleDate('leapYear')}
                          className="px-3 py-1.5 bg-orange-500/10 text-orange-600 rounded-lg hover:bg-orange-500/20 transition-colors text-xs"
                        >
                          Leap Day 2024
                        </button>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={setToday}
                        className="flex items-center justify-center gap-2 flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all text-sm font-medium shadow-md hover:shadow-lg"
                      >
                        <Calendar size={18} />
                        Check Today's Week
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

                {/* Week Calculation Info */}
                <div className="rounded-xl border border-blue-200 dark:border-blue-800 p-6 shadow-sm">
                  <h3 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
                    <Info size={16} className="text-blue-600" />
                    Week Number Calculation Method
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 dark:bg-blue-900/20 p-1.5 rounded-full mt-0.5">
                        <Hash size={12} className="text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">Simple Week Numbering</div>
                        <div className="text-xs text-muted-foreground">Week 1 starts on January 1st, with each 7-day period counting as one week.</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-green-100 dark:bg-green-900/20 p-1.5 rounded-full mt-0.5">
                        <CalendarDays size={12} className="text-green-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">Day of Year Calculation</div>
                        <div className="text-xs text-muted-foreground">Calculates exact day number within the year (1 to 365/366).</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-purple-100 dark:bg-purple-900/20 p-1.5 rounded-full mt-0.5">
                        <Target size={12} className="text-purple-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">Year Analysis</div>
                        <div className="text-xs text-muted-foreground">Determines total weeks in year and remaining weeks.</div>
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
                        <h3 className="text-lg font-semibold text-foreground">Week Number Analysis</h3>
                        <p className="text-sm text-muted-foreground">
                          {result.date}
                        </p>
                      </div>
                      <button
                        onClick={copyResult}
                        className="p-2 text-muted-foreground hover:text-foreground transition-colors hover:bg-secondary/50 rounded-lg"
                        title="Copy week number"
                      >
                        <Copy size={18} />
                      </button>
                    </div>

                    <div className="space-y-6">
                      {/* Main Week Display */}
                      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-4 rounded-lg border border-blue-500/20">
                        <div className="text-center">
                          <div className="text-sm text-muted-foreground mb-2">Week of Year</div>
                          <div className="text-3xl font-bold text-foreground mb-2">
                            Week {result.weekNumber}
                          </div>
                          {result.isCurrentWeek && (
                            <div className="text-green-600 font-semibold flex items-center justify-center gap-2">
                              <CheckCircle size={16} />
                              <span>This is the current week!</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Week Statistics */}
                      <div className="space-y-4">
                        <h4 className="text-sm font-medium text-foreground">Week Statistics</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 p-4 rounded-xl border border-blue-500/20 text-center">
                            <div className="text-2xl font-bold text-foreground">{result.weekNumber}</div>
                            <div className="text-xs text-muted-foreground mt-1">Current Week</div>
                          </div>
                          <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 p-4 rounded-xl border border-green-500/20 text-center">
                            <div className="text-2xl font-bold text-foreground">{result.totalWeeksInYear}</div>
                            <div className="text-xs text-muted-foreground mt-1">Total Weeks in {result.year}</div>
                          </div>
                          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 p-4 rounded-xl border border-purple-500/20 text-center">
                            <div className="text-2xl font-bold text-foreground">{result.dayOfYear}</div>
                            <div className="text-xs text-muted-foreground mt-1">Day of Year</div>
                          </div>
                          <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 p-4 rounded-xl border border-orange-500/20 text-center">
                            <div className="text-2xl font-bold text-foreground">{result.remainingWeeks}</div>
                            <div className="text-xs text-muted-foreground mt-1">Weeks Remaining</div>
                          </div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Year Progress</span>
                          <span className="font-medium text-foreground">
                            Week {result.weekNumber} of {result.totalWeeksInYear}
                          </span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500" 
                            style={{ width: `${(result.weekNumber / result.totalWeeksInYear) * 100}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Date Details */}
                      <div className="bg-secondary/20 p-4 rounded-lg border border-border">
                        <div className="flex items-center gap-2 mb-3">
                          <Calendar size={16} className="text-accent" />
                          <span className="text-sm font-medium text-foreground">Date Details</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-muted-foreground">Day of Week</div>
                            <div className="font-medium text-foreground">{result.dayOfWeek}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Calendar Year</div>
                            <div className="font-medium text-foreground">{result.year}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Usage Examples Card */}
                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                  <h3 className="text-sm font-medium text-foreground mb-4">Common Week Examples</h3>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center gap-2 p-2 bg-blue-500/10 rounded">
                      <Calendar size={14} className="text-blue-600" />
                      <span className="text-foreground">Jan 1: Week 1</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-green-500/10 rounded">
                      <Calendar size={14} className="text-green-600" />
                      <span className="text-foreground">Jun 30: ~Week 26</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-purple-500/10 rounded">
                      <Calendar size={14} className="text-purple-600" />
                      <span className="text-foreground">Dec 31: Week 52/53</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-orange-500/10 rounded">
                      <Calendar size={14} className="text-orange-600" />
                      <span className="text-foreground">Leap Years: 53 weeks</span>
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
                        <CalendarDays className="w-16 h-16 text-muted-foreground" />
                        <div className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full p-1">
                          <Hash size={12} />
                        </div>
                      </div>
                      <p className="text-foreground font-medium mb-2">Select a Date</p>
                      <p className="text-muted-foreground text-sm mb-4">
                        Choose any date to calculate its week number, day of year, and year progress
                      </p>
                      <div className="text-xs text-green-600 flex items-center justify-center gap-1">
                        <Lock size={10} />
                        <span>Instant calculation • No data storage • Business-friendly</span>
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
                      <CalendarDays size={20} className="text-blue-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Week Number Calculator - Features & Business Applications</h2>
                  </div>
                  {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.whatItDoes && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      This Week Number Calculator determines which week of the year any given date falls in, using a straightforward calculation method starting from January 1st as Week 1. Beyond simple week numbering, it provides comprehensive date analysis including day of year calculation, total weeks in the year, remaining weeks, and year progress percentage. The tool is particularly valuable for business planning, project management, and organizational scheduling where week-based timelines are essential for coordination and reporting.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Hash size={18} className="text-blue-600" />
                          <h3 className="font-semibold text-foreground">Week Number Determination</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">Calculates exact week number for any date, accounting for year length and leap years in the calculation.</p>
                      </div>
                      <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp size={18} className="text-green-600" />
                          <h3 className="font-semibold text-foreground">Year Progress Tracking</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">Shows year progress percentage, remaining weeks, and total weeks for strategic planning and timeline management.</p>
                      </div>
                      <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Target size={18} className="text-purple-600" />
                          <h3 className="font-semibold text-foreground">Business Planning</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">Essential for project scheduling, quarterly planning, and organizational coordination using week-based timelines.</p>
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
                      <TrendingUp size={20} className="text-green-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Practical Week Number Applications</h2>
                  </div>
                  {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.useCases && (
                  <div className="px-6 pb-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">💼 Business & Project Management</h3>
                        <ul className="space-y-1 text-muted-foreground text-sm">
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Schedule projects using week numbers for clear milestone tracking and deadline management across teams</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Coordinate quarterly business reviews, financial reporting, and performance evaluations using standardized week references</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Plan marketing campaigns, product launches, and business initiatives with precise week-based timelines</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">📅 Academic & Educational Planning</h3>
                        <ul className="space-y-1 text-muted-foreground text-sm">
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Schedule academic terms, exam periods, and school activities using week numbers for consistency across academic years</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Plan curriculum delivery, lesson schedules, and educational programs with week-based progress tracking</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Coordinate research timelines, grant reporting periods, and academic publication schedules</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">📊 Personal & Organizational Planning</h3>
                        <ul className="space-y-1 text-muted-foreground text-sm">
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Create personal goal timelines, fitness programs, and habit tracking using week numbers for measurable progress</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Plan family events, vacations, and personal milestones with clear week-based scheduling</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Organize community events, club activities, and volunteer schedules using standardized week references</span>
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
                    <h2 className="text-xl font-bold text-foreground">How to Calculate Week Numbers - Complete Guide</h2>
                  </div>
                  {openSections.howToUse ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.howToUse && (
                  <div className="px-6 pb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h3 className="font-semibold text-foreground">Simple 3-Step Process</h3>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                            <div>
                              <div className="font-medium text-foreground">Select Date</div>
                              <div className="text-sm text-muted-foreground">Choose any date using the date picker or use quick buttons for common dates like today or start of year.</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                            <div>
                              <div className="font-medium text-foreground">Automatic Calculation</div>
                              <div className="text-sm text-muted-foreground">The calculator automatically determines week number, day of year, and other statistics as you select dates.</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                            <div>
                              <div className="font-medium text-foreground">Review Results</div>
                              <div className="text-sm text-muted-foreground">Analyze comprehensive results including week number, year progress, and remaining weeks.</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h3 className="font-semibold text-foreground">Pro Tips for Effective Use</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <div className="bg-accent/20 p-1 rounded mt-0.5">
                              <Calendar size={12} className="text-accent" />
                            </div>
                            <span>Use the quick example buttons to understand how week numbers work at different times of year</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-accent/20 p-1 rounded mt-0.5">
                              <Copy size={12} className="text-accent" />
                            </div>
                            <span>Copy results for project documentation, meeting notes, or schedule planning</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-accent/20 p-1 rounded mt-0.5">
                              <TrendingUp size={12} className="text-accent" />
                            </div>
                            <span>Track year progress percentage for goal setting and quarterly planning purposes</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-accent/20 p-1 rounded mt-0.5">
                              <Target size={12} className="text-accent" />
                            </div>
                            <span>Compare week numbers across different years for historical analysis and trend identification</span>
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
                      <CalendarDays size={20} className="text-purple-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Week Number Calculation Examples</h2>
                  </div>
                  {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.examples && (
                  <div className="px-6 pb-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-3">Common Week Number Scenarios</h3>
                        <div className="overflow-x-auto">
                          <div className="min-w-full inline-block align-middle">
                            <div className="overflow-hidden border border-border rounded-lg">
                              <table className="min-w-full divide-y divide-border">
                                <thead className="bg-secondary/20">
                                  <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Date</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Day of Year</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Week Number</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Total Weeks</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Progress</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                  <tr>
                                    <td className="px-4 py-3 text-sm text-foreground">January 1, 2024</td>
                                    <td className="px-4 py-3 text-sm text-blue-600">1</td>
                                    <td className="px-4 py-3 text-sm text-green-600 font-medium">Week 1</td>
                                    <td className="px-4 py-3 text-sm text-purple-600">53</td>
                                    <td className="px-4 py-3 text-sm text-orange-600">1.9%</td>
                                  </tr>
                                  <tr>
                                    <td className="px-4 py-3 text-sm text-foreground">June 30, 2024</td>
                                    <td className="px-4 py-3 text-sm text-blue-600">182</td>
                                    <td className="px-4 py-3 text-sm text-green-600 font-medium">Week 26</td>
                                    <td className="px-4 py-3 text-sm text-purple-600">53</td>
                                    <td className="px-4 py-3 text-sm text-orange-600">49.1%</td>
                                  </tr>
                                  <tr>
                                    <td className="px-4 py-3 text-sm text-foreground">December 31, 2024</td>
                                    <td className="px-4 py-3 text-sm text-blue-600">366</td>
                                    <td className="px-4 py-3 text-sm text-green-600 font-medium">Week 53</td>
                                    <td className="px-4 py-3 text-sm text-purple-600">53</td>
                                    <td className="px-4 py-3 text-sm text-orange-600">100%</td>
                                  </tr>
                                  <tr>
                                    <td className="px-4 py-3 text-sm text-foreground">February 29, 2024</td>
                                    <td className="px-4 py-3 text-sm text-blue-600">60</td>
                                    <td className="px-4 py-3 text-sm text-green-600 font-medium">Week 9</td>
                                    <td className="px-4 py-3 text-sm text-purple-600">53</td>
                                    <td className="px-4 py-3 text-sm text-orange-600">17.0%</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Detailed Week Calculation Example</h3>
                        <div className="bg-secondary/20 p-4 rounded-lg border border-border overflow-x-auto">
                          <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
{`Example: Calculate week number for June 15, 2024

Step 1: Determine Day of Year
January: 31 days
February: 29 days (2024 is a leap year)
March: 31 days
April: 30 days
May: 31 days
June 1-15: 15 days

Total days before June 15:
31 (Jan) + 29 (Feb) + 31 (Mar) + 30 (Apr) + 31 (May) = 152 days
Add June days: 152 + 15 = 167 days

Day of Year for June 15, 2024 = 167

Step 2: Calculate Week Number
Week number formula: Week = CEILING(Day of Year / 7)
Calculation: 167 ÷ 7 = 23.857
Ceiling value: 24

Week Number for June 15, 2024 = Week 24

Step 3: Determine Total Weeks in 2024
2024 is a leap year: 366 days
Total weeks: 366 ÷ 7 = 52.2857
Ceiling value: 53 weeks

Total Weeks in 2024 = 53 weeks

Step 4: Calculate Year Progress
Current week: 24
Total weeks: 53
Progress percentage: (24 ÷ 53) × 100 = 45.28%

Step 5: Calculate Remaining Weeks
Remaining weeks: 53 - 24 = 29 weeks

Step 6: Additional Information
Date: June 15, 2024
Day of Week: Saturday (calculated from date)
Year: 2024
Leap Year: Yes (affects total weeks)

Final Results:
• Week Number: 24
• Day of Year: 167
• Total Weeks in 2024: 53
• Remaining Weeks: 29
• Year Progress: 45.3%
• Date: Saturday, June 15, 2024
• Leap Year Status: Yes

Key Calculation Features:
✓ Accurate day of year calculation accounting for leap years
✓ Correct week number determination using ceiling function
✓ Total weeks calculation based on year length (52 or 53)
✓ Year progress percentage for planning and tracking
✓ Remaining weeks calculation for forward planning
✓ Complete date information including day of week
✓ Business-friendly format for project management`}
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
                  <h2 className="text-xl font-bold text-foreground">More Date & Planning Tools</h2>
                  {openSections.relatedTools ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.relatedTools && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Explore other useful date and planning calculation tools:
                    </p>
                    <ul className="space-y-3 text-muted-foreground">
                      {relatedTools.map((tool, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-accent mr-2">•</span>
                          <Link href={tool.path} className="text-accent hover:underline">
                            <strong>{tool.name}:</strong> Visit this tool for additional date and planning calculations
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
                      <CalendarDays size={20} className="text-purple-600" />
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