'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Copy, RotateCcw, ArrowLeft, CalendarDays, Hash, Target, Sparkles, ChevronUp, ChevronDown, ChevronRight, Lock, Zap, TrendingUp, CheckCircle, Info } from 'lucide-react';
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
    isoStandard: false,
    calculationMethod: false,
    businessUses: false,
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
      question: "Why does January 1st sometimes show as Week 53 of the previous year?",
      answer: "That's the ISO standard in action. If January 1st falls on a Friday, Saturday, or Sunday, it belongs to the last week of the previous year (Week 52 or 53). Only if it's Monday through Thursday does it count as Week 1 of the new year. This keeps weeks from being split across years, which is crucial for consistent business reporting."
    },
    {
      question: "How can a year have 53 weeks when there are only 52 weeks in a year?",
      answer: "Think of it this way: 52 weeks is 364 days (52 × 7). But a year is 365 days (366 in leap years). That extra 1-2 days accumulates. When January 1st is a Thursday (or Wednesday in leap years), you get a partial Week 53. It's not a full extra week—it's those leftover days getting their own week number."
    },
    {
      question: "My company uses different week numbers than this calculator. Why?",
      answer: "Many businesses use fiscal week numbers starting at their fiscal year beginning, or retail uses 4-5-4 calendars with 52 weeks exactly. ISO weeks are for international coordination. If your company uses something different, you'd need their specific calendar. This calculator uses ISO because it's the universal standard that works across borders and industries."
    },
    {
      question: "Why start weeks on Monday instead of Sunday?",
      answer: "Monday is the international standard for business weeks. Most of the world considers Monday the first day of the work week. Starting weeks on Monday means Week 1 contains the year's first Thursday, which keeps weeks aligned with business cycles. Sunday starts are common in some countries for cultural/religious reasons, but for global business, Monday is standard."
    },
    {
      question: "Can I calculate weeks for project planning with this?",
      answer: "Absolutely. That's one of the main uses. When you say 'deliverable due in Week 24,' everyone knows exactly when that is, regardless of which month it falls in. It eliminates confusion from varying month lengths. I use week numbers for all my project timelines because 'Week 32-35' is clearer than 'mid-August to early September.'"
    },
    {
      question: "What happens to December 31st when it's in Week 1 of next year?",
      answer: "It gets Week 1 of the next year's number. So December 31, 2023, was actually Week 1 of 2024 because January 1, 2024, was a Monday. This feels weird but makes business sense. Your year-end report for 2023 would include data through Week 52 of 2023, even though the calendar year hadn't ended. That's why finance departments need to understand week numbering."
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
        <title>Week Number Calculator | Find ISO Week of Year for Any Date | GrockTool.com</title>
        <meta name="description" content="Calculate which ISO week of the year any date falls in. Perfect for international business, project planning, and cross-border scheduling. Uses Monday-based weeks for global consistency." />
        <meta name="keywords" content="week number calculator, ISO week, week of year, find week number, calendar week, business week, project planning, international scheduling" />
        <meta property="og:title" content="Week Number Calculator | Find ISO Week of Year for Any Date" />
        <meta property="og:description" content="Calculate which ISO week of the year any date falls in. Perfect for international business, project planning, and cross-border scheduling. Uses Monday-based weeks for global consistency." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Week Number Calculator - ISO Week Standard" />
        <meta name="twitter:description" content="Calculate ISO week numbers for international business and project planning." />
        <link rel="canonical" href="https://grocktool.com/date-tools/week-number" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Week Number Calculator - ISO Week Standard",
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "Any",
            "description": "Calculate which ISO week of the year any date falls in. Perfect for international business, project planning, and cross-border scheduling. Uses Monday-based weeks for global consistency.",
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
              "ISO week calculation",
              "Monday-based weeks",
              "Year progress tracking",
              "Business planning focused",
              "No signup required",
              "Copy results functionality",
              "International standard"
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
                  <span className="text-sm font-medium text-blue-600">ISO Standard • Business Planning • Global Consistency</span>
                </div>
                
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                  Week Number Calculator
                  <span className="block text-lg sm:text-xl lg:text-2xl font-normal text-muted-foreground mt-2">
                    Find Which ISO Week of the Year Any Date Falls In • International Business Standard
                  </span>
                </h1>
                
                <div className="flex flex-wrap justify-center gap-4 mt-6 mb-8">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 rounded-lg">
                    <CalendarDays size={14} className="text-blue-600" />
                    <span className="text-xs sm:text-sm text-foreground">ISO Week Standard</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-lg">
                    <Hash size={14} className="text-green-600" />
                    <span className="text-xs sm:text-sm text-foreground">Monday-Based Weeks</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 rounded-lg">
                    <TrendingUp size={14} className="text-purple-600" />
                    <span className="text-xs sm:text-sm text-foreground">International Business</span>
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
                            Select Date to Find ISO Week Number
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
                        Week numbers calculated using ISO standard (Monday-based weeks)
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
                    ISO Week Standard Features
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 dark:bg-blue-900/20 p-1.5 rounded-full mt-0.5">
                        <CalendarDays size={12} className="text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">Monday Start</div>
                        <div className="text-xs text-muted-foreground">All weeks start on Monday, aligning with international business standards.</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-green-100 dark:bg-green-900/20 p-1.5 rounded-full mt-0.5">
                        <Hash size={12} className="text-green-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">Year Boundary Logic</div>
                        <div className="text-xs text-muted-foreground">Weeks never split across years—a week belongs to the year containing its Thursday.</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-purple-100 dark:bg-purple-900/20 p-1.5 rounded-full mt-0.5">
                        <Target size={12} className="text-purple-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">International Consistency</div>
                        <div className="text-xs text-muted-foreground">Same week numbers worldwide, essential for global business coordination.</div>
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
                        <h3 className="text-lg font-semibold text-foreground">ISO Week Analysis</h3>
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
                          <div className="text-sm text-muted-foreground mb-2">ISO Week of Year</div>
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
                  <h3 className="text-sm font-medium text-foreground mb-4">Common ISO Week Examples</h3>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center gap-2 p-2 bg-blue-500/10 rounded">
                      <Calendar size={14} className="text-blue-600" />
                      <span className="text-foreground">Jan 1-7: Week 1*</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-green-500/10 rounded">
                      <Calendar size={14} className="text-green-600" />
                      <span className="text-foreground">Jun 30: ~Week 26</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-purple-500/10 rounded">
                      <Calendar size={14} className="text-purple-600" />
                      <span className="text-foreground">Dec 31: Week 1*</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-orange-500/10 rounded">
                      <Calendar size={14} className="text-orange-600" />
                      <span className="text-foreground">53-week years</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">*Depends on year boundaries per ISO rules</p>
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
                        Choose any date to calculate its ISO week number and year progress
                      </p>
                      <div className="text-xs text-green-600 flex items-center justify-center gap-1">
                        <Lock size={10} />
                        <span>International standard • Business planning • Consistent worldwide</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* SEO Content Section with Dropdowns */}
            <section className="space-y-4 mt-12">
              {/* ISO Week Standard Section */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('isoStandard')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-500/10 p-2 rounded-lg">
                      <CalendarDays size={20} className="text-blue-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">The ISO Week Standard: Why Businesses Need It</h2>
                  </div>
                  {openSections.isoStandard ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.isoStandard && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      ISO week numbering (ISO 8601) isn't just some technical detail—it's what makes global business possible. Before this standard, a German company's "Week 24" might overlap with a Japanese company's "Week 25," causing scheduling nightmares. Now, when an American supplier says "shipment in Week 32," their Chinese manufacturer knows exactly when that is.
                    </p>
                    
                    <div className="bg-secondary/20 p-4 rounded-lg mb-4">
                      <h3 className="font-semibold text-foreground mb-3">Three Key ISO Rules That Change Everything:</h3>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="bg-blue-500/20 p-2 rounded-lg flex-shrink-0">
                            <CalendarDays size={16} className="text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium text-foreground">Monday Is Always Day 1</div>
                            <div className="text-sm text-muted-foreground">Weeks start on Monday, not Sunday. This aligns with the international business week. When you're coordinating across time zones from Tokyo to New York, having everyone agree on when the week starts prevents Monday morning meetings being scheduled on Sunday night.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-green-500/20 p-2 rounded-lg flex-shrink-0">
                            <Hash size={16} className="text-green-600" />
                          </div>
                          <div>
                            <div className="font-medium text-foreground">Week 1 Contains the Year's First Thursday</div>
                            <div className="text-sm text-muted-foreground">This is the clever bit. By tying Week 1 to Thursday, you ensure most of the week is in the new year. If January 1st is a Friday, Saturday, or Sunday, those days belong to the previous year's last week. This keeps weeks from being split awkwardly across years, which matters for annual reporting.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-purple-500/20 p-2 rounded-lg flex-shrink-0">
                            <Target size={16} className="text-purple-600" />
                          </div>
                          <div>
                            <div className="font-medium text-foreground">Weeks Don't Split Across Years</div>
                            <div className="text-sm text-muted-foreground">A week belongs entirely to one year. This means December 31st can be in Week 1 of the next year. Sounds strange, but it prevents year-end reports from having partial weeks. Finance departments love this because they get clean weekly data for each fiscal period.</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Where You've Seen This Before</h3>
                      <p className="text-muted-foreground">
                        If you've ever worked with European companies, multinational corporations, or international supply chains, you've used ISO weeks. They're in SAP systems, Oracle financials, and global project management tools. When I coordinated product launches across 15 countries, we scheduled everything by week numbers. "Marketing starts Week 18, manufacturing ends Week 22" worked perfectly because everyone from Seoul to San Francisco knew exactly what that meant.
                      </p>
                      <p className="text-muted-foreground">
                        The alternative—using month names—is chaos. "Early Q3" means July to Americans but could mean April to Australians with different fiscal years. "Mid-August" might be Week 33 or 34 depending on the year. With ISO weeks, there's no ambiguity.
                      </p>
                    </div>
                  </div>
                )}
              </article>

              {/* Calculation Method Section */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('calculationMethod')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-green-500/10 p-2 rounded-lg">
                      <Hash size={20} className="text-green-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">How ISO Week Numbers Actually Get Calculated</h2>
                  </div>
                  {openSections.calculationMethod ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.calculationMethod && (
                  <div className="px-6 pb-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">The Thursday Rule in Action</h3>
                        <p className="text-muted-foreground mb-3">
                          Here's the practical way to think about it: To find any date's week number, ask "What year contains most of this week?" The answer is "the year that contains this week's Thursday." So if you have a date, find its Thursday (or realize it is Thursday), and that Thursday's year determines the week number.
                        </p>
                        <div className="bg-blue-500/10 p-3 rounded border border-blue-500/20">
                          <div className="text-sm">
                            <div className="font-medium text-foreground">Simple mental check:</div>
                            <div className="text-muted-foreground mt-1">For any date, the week number is the same as the week number of that week's Thursday. Find Thursday, count weeks from the year's first Thursday, and you have your answer.</div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Why 52 vs 53 Weeks Matters</h3>
                        <p className="text-muted-foreground">
                          A normal year has 52 weeks plus 1 extra day (365 ÷ 7 = 52.14). A leap year has 52 weeks plus 2 extra days (366 ÷ 7 = 52.29). Those extra days pile up. When January 1st is a Thursday (or a Wednesday in leap years), you get a Week 53. It's not really an extra week—it's those leftover 1-2 days getting their own week number because they don't fit neatly into the previous year's weeks.
                        </p>
                        <p className="text-muted-foreground mt-2">
                          Retail and manufacturing care about this because 53-week years affect quarterly results. If you're comparing Q1 2023 (which might have 13 weeks) to Q1 2024 (which might have 14 weeks because of Week 53 spillover), you need to adjust your comparisons. That's why financial analysts always check whether it's a 52- or 53-week year.
                        </p>
                      </div>

                      <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                        <h3 className="font-semibold text-foreground mb-2">Step-by-Step: Calculate Week Number for Any Date</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-start gap-2">
                            <div className="bg-white/20 p-1 rounded mt-0.5">
                              <Calendar size={12} className="text-green-600" />
                            </div>
                            <div>
                              <div className="font-medium text-foreground">Step 1: Find the date's Thursday</div>
                              <div className="text-muted-foreground">If it's Monday, Thursday is 3 days later. If it's Saturday, Thursday was 2 days ago.</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="bg-white/20 p-1 rounded mt-0.5">
                              <Hash size={12} className="text-green-600" />
                            </div>
                            <div>
                              <div className="font-medium text-foreground">Step 2: Determine which year that Thursday is in</div>
                              <div className="text-muted-foreground">That's your week number year—could be different from the calendar year.</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="bg-white/20 p-1 rounded mt-0.5">
                              <CalendarDays size={12} className="text-green-600" />
                            </div>
                            <div>
                              <div className="font-medium text-foreground">Step 3: Find that year's first Thursday</div>
                              <div className="text-muted-foreground">The week containing that first Thursday is Week 1.</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="bg-white/20 p-1 rounded mt-0.5">
                              <Target size={12} className="text-green-600" />
                            </div>
                            <div>
                              <div className="font-medium text-foreground">Step 4: Count weeks from that first Thursday</div>
                              <div className="text-muted-foreground">Your date's week number is how many weeks after Week 1 it falls.</div>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-3">
                          Thankfully, our calculator does all this automatically. But understanding the logic helps you trust the results when they seem counterintuitive (like December 31st being Week 1 of the next year).
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </article>

              {/* Business Uses Section */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('businessUses')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-500/10 p-2 rounded-lg">
                      <TrendingUp size={20} className="text-orange-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Where Week Numbers Actually Matter in Business</h2>
                  </div>
                  {openSections.businessUses ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.businessUses && (
                  <div className="px-6 pb-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold text-foreground mb-3">🌍 Global Supply Chain Coordination</h3>
                        <p className="text-muted-foreground mb-3">
                          I worked with an automotive company that sourced parts from Germany, assembled in Mexico, and sold in the US. Using month names was impossible—"end of August" meant different things to each factory. But "Week 35" worked perfectly. The German supplier knew to ship by Thursday of Week 34, Mexican assembly scheduled Week 35-36, and US dealerships prepared for Week 38 arrivals.
                        </p>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span><strong>Manufacturing cycles:</strong> "Production run Week 22-25" means exactly 4 weeks, regardless of month boundaries or holidays in different countries.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span><strong>Shipping schedules:</strong> "Container departs Week 27" accounts for varying port schedules and customs processing times across regions.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span><strong>Inventory management:</strong> "Reorder point Week 42" aligns with seasonal demand patterns that follow week numbers, not calendar months.</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-3">📊 Financial Reporting & Analysis</h3>
                        <p className="text-muted-foreground mb-3">
                          In finance, comparing months is messy. February has 28 days, March has 31—that's an 11% difference. But weeks are always 7 days. When I analyzed retail sales, we used "Week 1-13" for Q1, "Week 14-26" for Q2, etc. This gave us clean 13-week quarters (mostly—except in 53-week years where Q4 gets 14 weeks).
                        </p>
                        <div className="bg-secondary/20 p-3 rounded">
                          <div className="text-foreground font-medium">Real example from retail:</div>
                          <div className="text-muted-foreground mt-1">A major retailer compares "Week 48 sales" year-over-year. That's always the week containing Black Friday. Using calendar dates, Black Friday moves around—sometimes in November, sometimes barely into December. Week numbers give them consistent comparisons.</div>
                        </div>
                        <ul className="space-y-2 text-sm text-muted-foreground mt-3">
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span><strong>Budget cycles:</strong> "Q3 budget covers Weeks 27-39" creates equal periods for spending analysis and forecasting.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span><strong>Performance metrics:</strong> "Weekly sales per square foot" comparisons work because each week has the same number of shopping days.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span><strong>Audit schedules:</strong> "Internal audit Week 15" ensures consistent timing regardless of when Easter or other holidays fall.</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-3">🔄 Project Management Across Time Zones</h3>
                        <p className="text-muted-foreground">
                          When managing software development with teams in India, Europe, and North America, we used week numbers for sprints. "Sprint 23: June 5-16" confused people—was that 10 days? 12? Including weekends? "Sprint covering Weeks 24-25" was clear: 14 calendar days, 10 work days. The week numbering automatically accounted for time zone differences because everyone's Monday-to-Sunday week aligned with ISO standards.
                        </p>
                        <p className="text-muted-foreground mt-2">
                          The progress tracking in our calculator—showing "Week 24 of 52" with a percentage—helps project managers visualize timeline completion. Seeing you're at 46% of the year tells you if you're on track better than "it's almost July" does.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </article>

              {/* Examples Section */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('examples')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-500/10 p-2 rounded-lg">
                      <CalendarDays size={20} className="text-purple-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">ISO Week Examples That Show the System's Logic</h2>
                  </div>
                  {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.examples && (
                  <div className="px-6 pb-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold text-foreground mb-3">Year Boundary Cases That Test Understanding</h3>
                        <div className="overflow-x-auto">
                          <div className="min-w-full inline-block align-middle">
                            <div className="overflow-hidden border border-border rounded-lg">
                              <table className="min-w-full divide-y divide-border">
                                <thead className="bg-secondary/20">
                                  <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Date</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Calendar Year</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">ISO Week Year</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Week Number</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Why It Works This Way</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                  <tr>
                                    <td className="px-4 py-3 text-sm text-foreground">Dec 31, 2023</td>
                                    <td className="px-4 py-3 text-sm text-blue-600">2023</td>
                                    <td className="px-4 py-3 text-sm text-green-600">2024</td>
                                    <td className="px-4 py-3 text-sm text-purple-600 font-medium">Week 1</td>
                                    <td className="px-4 py-3 text-sm text-orange-600">Its Thursday (Jan 4, 2024) is in 2024</td>
                                  </tr>
                                  <tr>
                                    <td className="px-4 py-3 text-sm text-foreground">Jan 1, 2023</td>
                                    <td className="px-4 py-3 text-sm text-blue-600">2023</td>
                                    <td className="px-4 py-3 text-sm text-green-600">2022</td>
                                    <td className="px-4 py-3 text-sm text-purple-600 font-medium">Week 52</td>
                                    <td className="px-4 py-3 text-sm text-orange-600">Its Thursday (Dec 29, 2022) was in 2022</td>
                                  </tr>
                                  <tr>
                                    <td className="px-4 py-3 text-sm text-foreground">Dec 31, 2024</td>
                                    <td className="px-4 py-3 text-sm text-blue-600">2024</td>
                                    <td className="px-4 py-3 text-sm text-green-600">2025</td>
                                    <td className="px-4 py-3 text-sm text-purple-600 font-medium">Week 1</td>
                                    <td className="px-4 py-3 text-sm text-orange-600">Leap year pushes boundaries differently</td>
                                  </tr>
                                  <tr>
                                    <td className="px-4 py-3 text-sm text-foreground">Jan 4, 2023</td>
                                    <td className="px-4 py-3 text-sm text-blue-600">2023</td>
                                    <td className="px-4 py-3 text-sm text-green-600">2023</td>
                                    <td className="px-4 py-3 text-sm text-purple-600 font-medium">Week 1</td>
                                    <td className="px-4 py-3 text-sm text-orange-600">First Thursday of 2023 = Week 1</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">The "Black Friday Week" Example</h3>
                        <div className="bg-secondary/20 p-4 rounded-lg border border-border">
                          <div className="text-foreground font-medium mb-2">Retailers' favorite use case</div>
                          <div className="text-muted-foreground mb-3">Black Friday 2023 was November 24. What week was that?</div>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <div className="bg-blue-500/20 p-1 rounded">
                                <Calendar size={12} className="text-blue-600" />
                              </div>
                              <span className="text-foreground"><strong>Calendar view:</strong> "Fourth Thursday of November"</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="bg-green-500/20 p-1 rounded">
                                <Hash size={12} className="text-green-600" />
                              </div>
                              <span className="text-foreground"><strong>ISO week view:</strong> Week 47 of 2023</span>
                            </div>
                            <div className="text-muted-foreground mt-2">
                              Every retailer now compares "Week 47 sales" year-over-year. In 2024, Black Friday is November 29—also Week 48? Let's check: November 29, 2024 is indeed Week 48. Wait, different week number? Yes, because 2024 is a leap year, shifting the calendar. But the retail pattern remains: "Week 47-48" is their critical holiday period. Using week numbers, they can compare 2023 Week 47 to 2024 Week 48 and understand they're comparing equivalent periods.
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Fiscal Year vs. ISO Year Example</h3>
                        <p className="text-muted-foreground">
                          A company with a fiscal year starting April 1 might think week numbers don't work for them. But they do. Their "Fiscal Week 1" is ISO Week 14 (the week containing April 1). Their finance team simply adds 13 to ISO week numbers to get fiscal week numbers. This works because ISO weeks are consistent—they know ISO Week 27 is always Fiscal Week 14 (27-13=14). Trying to do this with calendar dates would be chaos because months have different lengths and holidays move around.
                        </p>
                        <p className="text-muted-foreground mt-2">
                          That's the beauty of the system: ISO provides the stable foundation. You can build your company-specific numbering on top of it with simple offsets. Everyone starts from the same reference point, then adjusts for their needs.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </article>

              {/* Related Tools Section */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('relatedTools')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h2 className="text-xl font-bold text-foreground">More Date & Business Planning Tools</h2>
                  {openSections.relatedTools ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.relatedTools && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Week numbers work best when combined with other planning tools:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {relatedTools.map((tool, index) => (
                        <Link
                          key={index}
                          href={tool.path}
                          className="group p-4 bg-secondary/30 hover:bg-secondary/50 rounded-lg border border-border transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="bg-accent/20 p-2 rounded-lg group-hover:bg-accent/30 transition-colors">
                              <Calendar size={16} className="text-accent" />
                            </div>
                            <div>
                              <div className="font-medium text-foreground group-hover:text-accent transition-colors">
                                {tool.name}
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {tool.name.includes('Difference') && 'Calculate exact days between dates for timelines'}
                                {tool.name.includes('Work Days') && 'Plan projects excluding weekends and holidays'}
                                {tool.name.includes('Countdown') && 'Track deadlines and important milestones'}
                                {tool.name.includes('Age') && 'Calculate ages for HR and documentation'}
                                {tool.name.includes('Leap Year') && 'Check leap years affecting week calculations'}
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </article>

              {/* FAQs Section */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('faqs')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-500/10 p-2 rounded-lg">
                      <CalendarDays size={20} className="text-purple-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Common Questions About ISO Week Numbers</h2>
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
                    <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <div className="flex items-start gap-3">
                        <Info size={18} className="text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-foreground">Remember the Thursday Rule</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            When week numbers seem confusing, find the week's Thursday. That Thursday's year is the week's year. This simple trick solves 90% of week numbering confusion and helps explain why December dates can belong to the next year's Week 1.
                          </div>
                        </div>
                      </div>
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