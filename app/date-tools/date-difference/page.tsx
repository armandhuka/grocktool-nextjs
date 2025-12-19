'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Copy, RotateCcw, ArrowLeft, Lock, Clock, Shield, Sparkles, ChevronUp, ChevronDown, ChevronRight, Zap } from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';

export default function DateDifference() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
    totalWeeks: number;
    totalHours: number;
    totalMinutes: number;
    workingDays: number;
    isFuture: boolean;
    dateOrder: 'normal' | 'reversed' | 'same';
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
    { name: 'Age Calculator', path: '/date-tools/age-calculator' },
    { name: 'Countdown Timer', path: '/date-tools/countdown' },
    { name: 'Work Days Calculator', path: '/date-tools/WorkDays' },
    { name: 'Next Birthday Countdown', path: '/date-tools/birthday-countdown' },
    { name: 'Current Week Number Checker', path: '/date-tools/week-number' }
  ];

  const faqData = [
    {
      question: "How accurate is the date difference calculation?",
      answer: "100% accurate. The calculator accounts for leap years, different month lengths, and exact day counts. It provides mathematically precise results for any date range, from single days to multiple decades."
    },
    {
      question: "Can I calculate differences between dates in the past and future?",
      answer: "Yes! The tool handles any date combination—past to past, past to future, future to future. It automatically detects date order and provides appropriate results regardless of which date comes first."
    },
    {
      question: "How are leap years handled in calculations?",
      answer: "Leap years are automatically factored into all calculations. The tool correctly accounts for February 29th and adjusts calculations for the extra day in leap years, ensuring accurate day counts for any date range."
    },
    {
      question: "What's the maximum date range I can calculate?",
      answer: "There's no practical limit. You can calculate differences between any valid dates from year 1 to year 9999. The tool handles century-spanning calculations with the same precision as short ranges."
    },
    {
      question: "Does the calculator account for different time zones?",
      answer: "The calculator uses pure date calculations without time zones, making it perfect for calendar-based planning. For time-sensitive calculations involving specific hours, consider using our Countdown Timer tool."
    }
  ];

  const calculateDifference = () => {
    if (!startDate || !endDate) return;

    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const isFuture = end > start;
    const dateOrder = start.getTime() === end.getTime() ? 'same' : isFuture ? 'normal' : 'reversed';
    
    const [earlierDate, laterDate] = isFuture ? [start, end] : [end, start];

    let years = laterDate.getFullYear() - earlierDate.getFullYear();
    let months = laterDate.getMonth() - earlierDate.getMonth();
    let days = laterDate.getDate() - earlierDate.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(laterDate.getFullYear(), laterDate.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((laterDate.getTime() - earlierDate.getTime()) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;

    const workingDays = calculateWorkingDays(earlierDate, laterDate);

    setResult({
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalHours,
      totalMinutes,
      workingDays,
      isFuture,
      dateOrder
    });
  };

  const calculateWorkingDays = (start: Date, end: Date): number => {
    let count = 0;
    const current = new Date(start);
    
    while (current <= end) {
      const day = current.getDay();
      if (day !== 0 && day !== 6) { // Skip Sunday (0) and Saturday (6)
        count++;
      }
      current.setDate(current.getDate() + 1);
    }
    
    return count;
  };

  const clearFields = () => {
    setStartDate('');
    setEndDate('');
    setResult(null);
  };

  const copyResult = async () => {
    if (result) {
      const orderText = result.dateOrder === 'same' ? 'Same dates' : 
                       result.isFuture ? 'Future period' : 'Past period';
      const text = `Date Difference: ${result.years} years, ${result.months} months, ${result.days} days
Total Days: ${result.totalDays.toLocaleString()}
Total Weeks: ${result.totalWeeks.toLocaleString()}
Total Hours: ${result.totalHours.toLocaleString()}
Total Minutes: ${result.totalMinutes.toLocaleString()}
Working Days: ${result.workingDays.toLocaleString()}
Period: ${orderText}`;
      try {
        await navigator.clipboard.writeText(text);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  const formatDateForDisplay = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <>
      <Head>
        <title>Date Difference Calculator | Calculate Time Between Dates - 100% Private & Free | GrockTool.com</title>
        <meta name="description" content="Calculate exact time difference between any two dates. Get precise results in years, months, days, hours, minutes. 100% private - no data storage, no signup required." />
        <meta name="keywords" content="date difference calculator, time between dates, date calculator, day counter, date range calculator, calculate days between dates, date interval calculator" />
        <meta property="og:title" content="Date Difference Calculator | Calculate Time Between Dates - 100% Private & Free" />
        <meta property="og:description" content="Calculate exact time difference between any two dates instantly. Get precise results in years, months, days, hours, and minutes. No data storage, no signup required." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Date Difference Calculator - 100% Private & Instant" />
        <meta name="twitter:description" content="Calculate time between dates instantly. No data storage, completely private." />
        <link rel="canonical" href="https://grocktool.com/date-tools/date-difference" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Date Difference Calculator - Private & Instant",
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "Any",
            "description": "Calculate exact time difference between any two dates instantly. Get precise results in years, months, days, hours, and minutes. 100% private - no data storage, no signup required.",
            "url": "https://grocktool.com/date-tools/date-difference",
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
              "100% browser-based processing",
              "No data storage",
              "Complete privacy",
              "No signup required",
              "Multiple time unit calculations",
              "Working days calculation",
              "Leap year accurate"
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
                  <span className="text-sm font-medium text-blue-600">100% Browser-Based • No Data Storage</span>
                </div>
                
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                  Calculate Exact Date Differences Instantly
                  <span className="block text-lg sm:text-xl lg:text-2xl font-normal text-muted-foreground mt-2">
                    100% Private • Any Date Range • No Signup Required
                  </span>
                </h1>
                
                <div className="flex flex-wrap justify-center gap-4 mt-6 mb-8">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-lg">
                    <Lock size={14} className="text-green-600" />
                    <span className="text-xs sm:text-sm text-foreground">Data Stays on Your Device</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 rounded-lg">
                    <Clock size={14} className="text-blue-600" />
                    <span className="text-xs sm:text-sm text-foreground">Instant Calculations</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 rounded-lg">
                    <Shield size={14} className="text-purple-600" />
                    <span className="text-xs sm:text-sm text-foreground">Leap Year Accurate</span>
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
                            Select Date Range
                          </label>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-green-600">
                          <Lock size={12} />
                          <span>Processing in your browser</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="block text-sm text-muted-foreground">
                            Start Date
                          </label>
                          <div className="relative">
                            <input
                              type="date"
                              value={startDate}
                              onChange={(e) => setStartDate(e.target.value)}
                              className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground"
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                              <div className="bg-green-500 text-white rounded-full p-1">
                                <Lock size={10} />
                              </div>
                            </div>
                          </div>
                          {startDate && (
                            <div className="text-xs text-muted-foreground">
                              {formatDateForDisplay(startDate)}
                            </div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm text-muted-foreground">
                            End Date
                          </label>
                          <div className="relative">
                            <input
                              type="date"
                              value={endDate}
                              onChange={(e) => setEndDate(e.target.value)}
                              className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground"
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                              <div className="bg-green-500 text-white rounded-full p-1">
                                <Lock size={10} />
                              </div>
                            </div>
                          </div>
                          {endDate && (
                            <div className="text-xs text-muted-foreground">
                              {formatDateForDisplay(endDate)}
                            </div>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground text-center">
                        Dates never leave your device • Works with any date combination
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={calculateDifference}
                        disabled={!startDate || !endDate}
                        className="flex items-center justify-center gap-2 flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                      >
                        <Zap size={18} />
                        Calculate Exact Difference
                      </button>
                      <button
                        onClick={clearFields}
                        className="flex-1 sm:flex-none px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-sm font-medium"
                      >
                        <RotateCcw size={16} />
                        Clear All
                      </button>
                    </div>

                    {/* Quick Stats */}
                    {(startDate || endDate) && (
                      <div className="bg-card rounded-xl border border-border p-4 shadow-sm">
                        <div className="grid grid-cols-2 gap-2 text-center">
                          {startDate && (
                            <div className="p-2">
                              <div className="text-lg font-bold text-foreground">
                                {new Date(startDate).toLocaleDateString('en-US', { weekday: 'short' })}
                              </div>
                              <div className="text-xs text-muted-foreground">Start Day</div>
                            </div>
                          )}
                          {endDate && (
                            <div className="p-2">
                              <div className="text-lg font-bold text-foreground">
                                {new Date(endDate).toLocaleDateString('en-US', { weekday: 'short' })}
                              </div>
                              <div className="text-xs text-muted-foreground">End Day</div>
                            </div>
                          )}
                          {startDate && (
                            <div className="p-2">
                              <div className="text-lg font-bold text-foreground">
                                {new Date(startDate).getFullYear()}
                              </div>
                              <div className="text-xs text-muted-foreground">Start Year</div>
                            </div>
                          )}
                          {endDate && (
                            <div className="p-2">
                              <div className="text-lg font-bold text-foreground">
                                {new Date(endDate).getFullYear()}
                              </div>
                              <div className="text-xs text-muted-foreground">End Year</div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Benefits Card */}
                <div className="rounded-xl border border-blue-200 dark:border-blue-800 p-6 shadow-sm">
                  <h3 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
                    <Sparkles size={16} className="text-blue-600" />
                    Why Calculate With Us?
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="bg-green-100 dark:bg-green-900/20 p-1.5 rounded-full mt-0.5">
                        <Lock size={12} className="text-green-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">100% Private Processing</div>
                        <div className="text-xs text-muted-foreground">Your dates never leave your browser. No data storage.</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 dark:bg-blue-900/20 p-1.5 rounded-full mt-0.5">
                        <Clock size={12} className="text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">Precise Calculations</div>
                        <div className="text-xs text-muted-foreground">Accounts for leap years and exact month lengths.</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-purple-100 dark:bg-purple-900/20 p-1.5 rounded-full mt-0.5">
                        <Shield size={12} className="text-purple-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">Comprehensive Results</div>
                        <div className="text-xs text-muted-foreground">Get results in multiple time units plus working days.</div>
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
                      <h3 className="text-lg font-semibold text-foreground">Date Difference Results</h3>
                      <button
                        onClick={copyResult}
                        className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Copy size={16} />
                      </button>
                    </div>

                    <div className="space-y-6">
                      {/* Period Info */}
                      <div className={`p-4 rounded-lg border ${
                        result.dateOrder === 'same' 
                          ? 'bg-yellow-500/10 border-yellow-500/20' 
                          : result.isFuture 
                            ? 'bg-green-500/10 border-green-500/20' 
                            : 'bg-blue-500/10 border-blue-500/20'
                      }`}>
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar size={16} className={
                            result.dateOrder === 'same' 
                              ? 'text-yellow-600' 
                              : result.isFuture 
                                ? 'text-green-600' 
                                : 'text-blue-600'
                          } />
                          <span className="font-semibold text-foreground">
                            {result.dateOrder === 'same' 
                              ? 'Same Dates Selected' 
                              : result.isFuture 
                                ? 'Future Period' 
                                : 'Past Period'
                            }
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {result.dateOrder === 'same' 
                            ? 'Both dates are identical'
                            : `From ${formatDateForDisplay(startDate)} to ${formatDateForDisplay(endDate)}`
                          }
                        </div>
                      </div>

                      {/* Main Difference Display */}
                      {result.dateOrder !== 'same' && (
                        <>
                          <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
                            <div className="text-2xl font-bold text-foreground text-center">
                              {result.years} years, {result.months} months, {result.days} days
                            </div>
                            <div className="text-xs text-green-600 text-center mt-2 flex items-center justify-center gap-2">
                              <Lock size={10} />
                              <span>100% private calculation</span>
                            </div>
                          </div>

                          {/* Detailed Breakdown */}
                          <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Detailed Time Breakdown</h4>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-3">
                                <div className="flex justify-between items-center p-2 bg-secondary/20 rounded">
                                  <span className="text-sm text-muted-foreground">Total Days</span>
                                  <span className="font-semibold text-foreground">{result.totalDays.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-secondary/20 rounded">
                                  <span className="text-sm text-muted-foreground">Total Weeks</span>
                                  <span className="font-semibold text-foreground">{result.totalWeeks.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-secondary/20 rounded">
                                  <span className="text-sm text-muted-foreground">Working Days</span>
                                  <span className="font-semibold text-foreground">{result.workingDays.toLocaleString()}</span>
                                </div>
                              </div>
                              <div className="space-y-3">
                                <div className="flex justify-between items-center p-2 bg-secondary/20 rounded">
                                  <span className="text-sm text-muted-foreground">Total Hours</span>
                                  <span className="font-semibold text-foreground">{result.totalHours.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-secondary/20 rounded">
                                  <span className="text-sm text-muted-foreground">Total Minutes</span>
                                  <span className="font-semibold text-foreground">{result.totalMinutes.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-secondary/20 rounded">
                                  <span className="text-sm text-muted-foreground">Total Months</span>
                                  <span className="font-semibold text-foreground">
                                    {(result.years * 12 + result.months).toLocaleString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Features Card */}
                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                  <h3 className="text-sm font-medium text-foreground mb-4">Calculation Features</h3>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center gap-2 p-2 bg-blue-500/10 rounded">
                      <Calendar size={14} className="text-blue-600" />
                      <span className="text-foreground">Any Date Range</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-green-500/10 rounded">
                      <Clock size={14} className="text-green-600" />
                      <span className="text-foreground">Multiple Units</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-purple-500/10 rounded">
                      <Shield size={14} className="text-purple-600" />
                      <span className="text-foreground">Leap Year Accurate</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-orange-500/10 rounded">
                      <Sparkles size={14} className="text-orange-600" />
                      <span className="text-foreground">Working Days</span>
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
                        <Calendar className="w-12 h-12 text-muted-foreground" />
                        <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-1">
                          <Lock size={10} />
                        </div>
                      </div>
                      <p className="text-foreground font-medium mb-2">Select Your Dates</p>
                      <p className="text-muted-foreground text-sm mb-4">
                        Choose start and end dates to calculate exact difference with 100% privacy
                      </p>
                      <div className="text-xs text-green-600 flex items-center justify-center gap-1">
                        <Shield size={10} />
                        <span>No data storage • Instant calculations • No signup</span>
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
                      <Calendar size={20} className="text-blue-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Precise Date Difference Calculation - How It Works</h2>
                  </div>
                  {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.whatItDoes && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      This date difference calculator computes exact time intervals between any two dates with mathematical precision. It accounts for all calendar complexities including leap years, varying month lengths, and exact day counts to deliver accurate results in multiple time units. Whether calculating project timelines, age differences, or historical intervals, the tool handles any date combination—past, present, or future—while keeping your data 100% private in your browser.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Lock size={18} className="text-blue-600" />
                          <h3 className="font-semibold text-foreground">Complete Privacy</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">Your dates never leave your browser. No data storage, no server processing, complete confidentiality.</p>
                      </div>
                      <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock size={18} className="text-green-600" />
                          <h3 className="font-semibold text-foreground">Mathematical Precision</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">Accounts for leap years, different month lengths, and exact day counts for perfect calculations.</p>
                      </div>
                      <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar size={18} className="text-purple-600" />
                          <h3 className="font-semibold text-foreground">Flexible Date Handling</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">Works with any date combination—past to past, past to future, future to future, or identical dates.</p>
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
                      <Calendar size={20} className="text-green-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">When to Use Date Difference Calculator</h2>
                  </div>
                  {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.useCases && (
                  <div className="px-6 pb-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">📅 Project & Event Planning</h3>
                        <ul className="space-y-1 text-muted-foreground text-sm">
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Calculate exact project durations from start date to deadline for timeline management</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Plan event timelines by calculating days between preparation start and event date</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Determine vacation durations for travel planning and itinerary scheduling</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">💼 Business & Financial Applications</h3>
                        <ul className="space-y-1 text-muted-foreground text-sm">
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Calculate rental periods, subscription lengths, or contract durations for billing</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Determine warranty periods, guarantee durations, or service contract timelines</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Calculate payment terms, invoice due dates, or financial obligation periods</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">📚 Academic & Personal Use</h3>
                        <ul className="space-y-1 text-muted-foreground text-sm">
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Calculate age differences between family members or historical figures</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Determine study periods for exam preparation or course completion timelines</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Calculate time between historical events for research or educational purposes</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </article>

              {/* How to Use - Condensed Version */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('howToUse')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-500/10 p-2 rounded-lg">
                      <Zap size={20} className="text-orange-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Quick Start Guide</h2>
                  </div>
                  {openSections.howToUse ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.howToUse && (
                  <div className="px-6 pb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h3 className="font-semibold text-foreground">3-Step Process</h3>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                            <div>
                              <div className="font-medium text-foreground">Select Dates</div>
                              <div className="text-sm text-muted-foreground">Choose start and end dates using the secure date pickers. Data stays on your device.</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                            <div>
                              <div className="font-medium text-foreground">Calculate Difference</div>
                              <div className="text-sm text-muted-foreground">Click calculate to get precise time difference in multiple units instantly.</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                            <div>
                              <div className="font-medium text-foreground">View Results</div>
                              <div className="text-sm text-muted-foreground">Get comprehensive breakdown including working days and period classification.</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h3 className="font-semibold text-foreground">Pro Tips</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <div className="bg-accent/20 p-1 rounded mt-0.5">
                              <Calendar size={12} className="text-accent" />
                            </div>
                            <span>Use date pickers for accurate selection, especially for historical or future dates</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-accent/20 p-1 rounded mt-0.5">
                              <Copy size={12} className="text-accent" />
                            </div>
                            <span>Copy comprehensive results including working days by clicking the copy icon</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-accent/20 p-1 rounded mt-0.5">
                              <Shield size={12} className="text-accent" />
                            </div>
                            <span>Tool automatically handles date order—works correctly regardless of which date comes first</span>
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
                      <Calendar size={20} className="text-purple-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Example: Date Difference Calculations</h2>
                  </div>
                  {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.examples && (
                  <div className="px-6 pb-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-3">Common Date Difference Scenarios</h3>
                        <div className="overflow-x-auto">
                          <div className="min-w-full inline-block align-middle">
                            <div className="overflow-hidden border border-border rounded-lg">
                              <table className="min-w-full divide-y divide-border">
                                <thead className="bg-secondary/20">
                                  <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Start Date</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">End Date</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Exact Difference</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Use Case</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                  <tr>
                                    <td className="px-4 py-3 text-sm text-foreground">January 1, 2023</td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">December 31, 2023</td>
                                    <td className="px-4 py-3 text-sm text-blue-600">364 days (11 months, 30 days)</td>
                                    <td className="px-4 py-3 text-sm text-green-600">Full year calculation excluding leap year</td>
                                  </tr>
                                  <tr>
                                    <td className="px-4 py-3 text-sm text-foreground">March 1, 2020</td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">March 1, 2024</td>
                                    <td className="px-4 py-3 text-sm text-blue-600">4 years, 0 months, 0 days (1,461 days)</td>
                                    <td className="px-4 py-3 text-sm text-green-600">Leap year period calculation (includes 2020 leap year)</td>
                                  </tr>
                                  <tr>
                                    <td className="px-4 py-3 text-sm text-foreground">June 15, 2024</td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">August 15, 2024</td>
                                    <td className="px-4 py-3 text-sm text-blue-600">0 years, 2 months, 0 days (61 days)</td>
                                    <td className="px-4 py-3 text-sm text-green-600">Short-term project duration calculation</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Technical Calculation Example</h3>
                        <div className="bg-secondary/20 p-4 rounded-lg border border-border overflow-x-auto">
                          <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
{`Example Calculation for Date Range: March 15, 2023 to December 18, 2024

Step 1: Calculate Years
2024 - 2023 = 1 year

Step 2: Calculate Months
December (12) - March (3) = 9 months
Since December > March, no adjustment needed

Step 3: Calculate Days
18 - 15 = 3 days
Since 18 > 15, no adjustment needed

Initial Result: 1 year, 9 months, 3 days

Step 4: Calculate Total Days
Days from March 15, 2023 to December 18, 2024:
• 2023: March 15 to December 31 = 291 days
• 2024: January 1 to December 18 = 352 days (2024 is leap year)
• Total days = 291 + 352 = 643 days

Step 5: Calculate Working Days (Monday-Friday)
Total days: 643
Weekends: Approximately 183 days (643 ÷ 7 × 2)
Working days: 643 - 183 = 460 days

Step 6: Convert to Other Units
• Total Weeks: 643 ÷ 7 = 91.86 ≈ 91 weeks (643 days)
• Total Hours: 643 × 24 = 15,432 hours
• Total Minutes: 15,432 × 60 = 925,920 minutes

Step 7: Determine Date Order
End date (Dec 18, 2024) is after start date (Mar 15, 2023)
Result: Future period calculation

Final Results:
• Exact Difference: 1 year, 9 months, 3 days
• Total Days: 643 days
• Working Days: 460 days
• Total Weeks: 91 weeks
• Total Hours: 15,432 hours
• Total Minutes: 925,920 minutes
• Period Type: Future period (643 days forward)

Key Features Demonstrated:
✓ Accurate month/day calculation accounting for different month lengths
✓ Leap year handling (2024 is a leap year)
✓ Working days calculation excluding weekends
✓ Comprehensive unit conversions
✓ Automatic date order detection
✓ All calculations performed locally in browser

Common Applications:
• Project timeline planning (1 year, 9 month project)
• Rental period calculation
• Subscription duration tracking
• Event planning timeline
• Historical period analysis`}
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
                  <h2 className="text-xl font-bold text-foreground">More Date & Time Tools</h2>
                  {openSections.relatedTools ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.relatedTools && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Need other date and time calculations? Try these tools:
                    </p>
                    <ul className="space-y-3 text-muted-foreground">
                      {relatedTools.map((tool, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-accent mr-2">•</span>
                          <Link href={tool.path} className="text-accent hover:underline">
                            <strong>{tool.name}:</strong> Visit this tool for additional date and time calculations
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
                      <Calendar size={20} className="text-purple-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Common Questions</h2>
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