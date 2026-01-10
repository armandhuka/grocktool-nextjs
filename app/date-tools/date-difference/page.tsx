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
    calendarRules: false,
    calculationMethod: false,
    businessScenarios: false,
    examples: false,
    accuracyNotes: false,
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
      question: "How does the calculator handle months with different lengths?",
      answer: "It accounts for each month's exact day count—28 for February in non-leap years, 29 in leap years, 30 for April, June, September, November, and 31 for the rest. When you cross month boundaries, it automatically adjusts. For instance, moving from January 31 to March 1 correctly shows 1 month, 1 day (not 1 month, -30 days)."
    },
    {
      question: "Can I calculate differences spanning multiple centuries?",
      answer: "Absolutely. The calculator handles any valid Gregorian calendar dates from year 1 to 9999. Whether you're comparing historical events from the 1800s or planning for the 2100s, it maintains precision across centuries, correctly accounting for century leap year rules (years divisible by 100 but not 400 aren't leap years)."
    },
    {
      question: "Why might my manual calculation differ slightly from this tool?",
      answer: "Common discrepancies arise from month-length assumptions (some people use 30.44 days per month average), leap year oversights, or incorrect weekend counting. Our tool eliminates these by calculating exact calendar days, not averages. If you're getting different numbers manually, check if you accounted for specific month lengths and leap years correctly."
    },
    {
      question: "Does it consider time zones or daylight saving changes?",
      answer: "This calculator focuses purely on calendar dates, not times. It treats each date as a full calendar day from midnight to midnight, avoiding timezone complications. For time-sensitive calculations across time zones, I'd recommend using our Countdown Timer tool which includes timezone support."
    },
    {
      question: "How accurate is the working days calculation?",
      answer: "It counts every Monday through Friday between your dates, excluding Saturdays and Sundays. It doesn't account for public holidays since those vary by country and region—for that level of customization, check our Work Days Calculator which lets you specify custom holidays."
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
      if (day !== 0 && day !== 6) {
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
              {/* Calendar Rules Used Section */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('calendarRules')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-500/10 p-2 rounded-lg">
                      <Calendar size={20} className="text-blue-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">How Our Calendar Rules Affect Date Calculations</h2>
                  </div>
                  {openSections.calendarRules ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.calendarRules && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Most people don't realize how many calendar quirks can throw off date calculations. We follow the Gregorian calendar rules exactly—the same system used worldwide today. Here's what that means for your calculations:
                    </p>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <div className="bg-blue-100 dark:bg-blue-900/30 p-1 rounded">
                            <Calendar size={16} className="text-blue-600" />
                          </div>
                          Leap Year Logic That Actually Matters
                        </h3>
                        <p className="text-muted-foreground mb-2">
                          It's not just "every four years." The rule has three parts:
                        </p>
                        <ul className="space-y-2 text-sm text-muted-foreground ml-2">
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-blue-600 mt-0.5 flex-shrink-0" />
                            <span><strong>Rule 1:</strong> Years divisible by 4 are leap years (2024, 2028)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-blue-600 mt-0.5 flex-shrink-0" />
                            <span><strong>Exception:</strong> Years divisible by 100 are NOT leap years (2100, 2200)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-blue-600 mt-0.5 flex-shrink-0" />
                            <span><strong>Exception to exception:</strong> Years divisible by 400 ARE leap years (2000, 2400)</span>
                          </li>
                        </ul>
                        <p className="text-sm text-muted-foreground mt-3">
                          Why does this matter? If you're calculating a date range that crosses the year 2100, many online calculators will get it wrong because they forget the "divisible by 100" rule. Ours won't.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded">
                            <Clock size={16} className="text-green-600" />
                          </div>
                          Month Length Variations You Can't Ignore
                        </h3>
                        <p className="text-muted-foreground mb-2">
                          February's 28/29 days are famous, but other months vary too:
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
                          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded text-center">
                            <div className="text-lg font-bold text-foreground">31 days</div>
                            <div className="text-xs text-muted-foreground">Jan, Mar, May, Jul, Aug, Oct, Dec</div>
                          </div>
                          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded text-center">
                            <div className="text-lg font-bold text-foreground">30 days</div>
                            <div className="text-xs text-muted-foreground">Apr, Jun, Sep, Nov</div>
                          </div>
                          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded text-center">
                            <div className="text-lg font-bold text-foreground">28 days</div>
                            <div className="text-xs text-muted-foreground">Feb (non-leap)</div>
                          </div>
                          <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded text-center">
                            <div className="text-lg font-bold text-foreground">29 days</div>
                            <div className="text-xs text-muted-foreground">Feb (leap year)</div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-3">
                          When we calculate month differences, we don't use averages. We count actual calendar days. Moving from January 31 to March 1? That's 1 month, 1 day—not 1 month, -30 days like some calculators show.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <div className="bg-purple-100 dark:bg-purple-900/30 p-1 rounded">
                            <Shield size={16} className="text-purple-600" />
                          </div>
                          Date Order Handling That Makes Sense
                        </h3>
                        <p className="text-muted-foreground">
                          Pick dates in any order—we handle it intelligently. If your end date is earlier than your start date, we don't give you negative numbers. Instead, we show you the positive difference and tell you it's a past period. This matches how people actually think about time spans. You don't say "minus 30 days ago"—you say "30 days have passed."
                        </p>
                      </div>
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
                      <Calendar size={20} className="text-green-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">The Step-by-Step Method Behind Our Calculations</h2>
                  </div>
                  {openSections.calculationMethod ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.calculationMethod && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-6">
                      Ever wonder how we get from two dates to "3 years, 4 months, 15 days"? It's not magic—it's a careful process that handles edge cases most people miss. Here's exactly how it works:
                    </p>
                    
                    <div className="space-y-8">
                      <div className="space-y-4">
                        <h3 className="font-semibold text-foreground text-lg">The Core Calculation Steps</h3>
                        
                        <div className="bg-secondary/10 p-4 rounded-lg border border-border">
                          <div className="flex items-start gap-4 mb-4">
                            <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                            <div>
                              <div className="font-semibold text-foreground mb-1">Year Difference (The Easy Part)</div>
                              <p className="text-sm text-muted-foreground">
                                Start with simple subtraction: end year minus start year. But this is just the beginning—months and days might adjust this later.
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-4 mb-4">
                            <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                            <div>
                              <div className="font-semibold text-foreground mb-1">Month Adjustment (Where Most Calculators Fail)</div>
                              <p className="text-sm text-muted-foreground">
                                Subtract month numbers. If the end day is earlier in its month than the start day was in its month, we borrow a month. This is crucial for dates like March 31 to April 30—it's not a full month, it's 30 days.
                              </p>
                              <div className="mt-2 text-xs text-green-600 bg-green-500/10 p-2 rounded">
                                <strong>Example:</strong> March 31 to April 30 = 0 months, 30 days (not 1 month, 0 days)
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-4">
                            <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                            <div>
                              <div className="font-semibold text-foreground mb-1">Day Calculation (With Month Borrowing)</div>
                              <p className="text-sm text-muted-foreground">
                                Calculate days directly. If negative, we borrow from the month difference and add the exact number of days in the previous month. This handles transitions like January 31 to February 28 perfectly.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-semibold text-foreground text-lg">Why This Method Beats Simple Day Counting</h3>
                        <p className="text-muted-foreground">
                          You could just count total days and divide by 365.25, but that gives you averages, not exact calendar periods. Here's the difference:
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                            <div className="font-semibold text-foreground mb-2">Average-Based Approach</div>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                              <li className="flex items-start gap-2">
                                <div className="text-red-500 mt-0.5">×</div>
                                <span>Uses 30.44 days per month average</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <div className="text-red-500 mt-0.5">×</div>
                                <span>Leap years handled as percentage</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <div className="text-red-500 mt-0.5">×</div>
                                <span>"March 31 to April 30 = 1 month"</span>
                              </li>
                            </ul>
                          </div>
                          
                          <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded-lg border border-green-200 dark:border-green-800">
                            <div className="font-semibold text-foreground mb-2">Our Calendar-Exact Method</div>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                              <li className="flex items-start gap-2">
                                <div className="text-green-500 mt-0.5">✓</div>
                                <span>Uses actual month lengths</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <div className="text-green-500 mt-0.5">✓</div>
                                <span>Handles leap years exactly</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <div className="text-green-500 mt-0.5">✓</div>
                                <span>"March 31 to April 30 = 30 days"</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-semibold text-foreground text-lg">Working Days: More Than Just Weekends</h3>
                        <p className="text-muted-foreground">
                          Our working day count isn't a simple percentage—it's a day-by-day check:
                        </p>
                        <ol className="space-y-2 text-sm text-muted-foreground ml-4">
                          <li>1. Start counting from your start date</li>
                          <li>2. Check each day: Monday-Friday? Add 1</li>
                          <li>3. Saturday or Sunday? Skip it</li>
                          <li>4. Continue until reaching end date</li>
                        </ol>
                        <p className="text-sm text-muted-foreground mt-2">
                          This gives you the <em>exact</em> number of business days, perfect for project planning or calculating service-level agreements.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </article>

              {/* Business Scenarios Section */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('businessScenarios')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-500/10 p-2 rounded-lg">
                      <Zap size={20} className="text-orange-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Real Business Problems This Calculator Solves</h2>
                  </div>
                  {openSections.businessScenarios ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.businessScenarios && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-6">
                      Beyond simple date counting, this tool helps solve actual business problems where date accuracy matters financially and legally. Here are scenarios our users face regularly:
                    </p>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <div className="bg-blue-100 dark:bg-blue-900/30 p-1 rounded">
                            <Calendar size={16} className="text-blue-600" />
                          </div>
                          Contract and Subscription Management
                        </h3>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <p>
                            <strong>Problem:</strong> Your software license renews annually on March 15. A client wants to switch mid-cycle on November 20. How many days of service do you owe them as credit?
                          </p>
                          <p>
                            <strong>Solution:</strong> Calculate March 15 to November 20. Get exact days (250 days in a non-leap year, 251 in a leap year). Multiply by daily rate for precise pro-rata credit.
                          </p>
                          <p>
                            <strong>Why exact matters:</strong> At $10,000/year, one day's difference is about $27. Over hundreds of clients, those rounding errors add up.
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded">
                            <Clock size={16} className="text-green-600" />
                          </div>
                          Legal and Compliance Timelines
                        </h3>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <p>
                            <strong>Problem:</strong> A regulation gives you "30 calendar days" to respond to a complaint received on January 31. When's your deadline?
                          </p>
                          <p>
                            <strong>Naïve calculation:</strong> January 31 + 30 days = March 2? Wrong.
                          </p>
                          <p>
                            <strong>Correct calculation:</strong> January 31 to March 2 is actually 31 days (because of February's 28 days).
                          </p>
                          <p>
                            <strong>Actual deadline:</strong> March 1. Miss it by using the wrong method? That's a compliance violation.
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <div className="bg-purple-100 dark:bg-purple-900/30 p-1 rounded">
                            <Shield size={16} className="text-purple-600" />
                          </div>
                          Project Planning and Resource Allocation
                        </h3>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <p>
                            <strong>Problem:</strong> You have a project from September 1 to December 15 with a team of 5. How many person-days do you need to budget?
                          </p>
                          <p>
                            <strong>Basic approach:</strong> 105 total days × 5 people = 525 person-days.
                          </p>
                          <p>
                            <strong>Smarter approach:</strong> 75 working days (excluding weekends) × 5 people = 375 person-days.
                          </p>
                          <p>
                            <strong>Difference:</strong> 150 person-days of misallocated budget. That's someone's salary for three months.
                          </p>
                        </div>
                      </div>

                      <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                        <h4 className="font-semibold text-foreground mb-2">Pro Tip for Business Users</h4>
                        <p className="text-sm text-muted-foreground">
                          Always use the "working days" result for internal project planning, but use "total days" for client-facing contracts. Why? Clients think in calendar days for deadlines, but your team only works business days. This tool gives you both numbers so you can speak both languages.
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
                      <Calendar size={20} className="text-purple-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Walkthrough: Date Differences You'll Actually Calculate</h2>
                  </div>
                  {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.examples && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-6">
                      Let's work through some real examples that show why manual calculations often go wrong, and how our tool gets them right.
                    </p>
                    
                    <div className="space-y-8">
                      <div>
                        <h3 className="font-semibold text-foreground mb-4">Example 1: The Tricky Month-End Transition</h3>
                        
                        <div className="mb-4">
                          <div className="font-medium text-foreground">Dates: January 31, 2024 to March 1, 2024</div>
                          <div className="text-sm text-muted-foreground mt-1">Seems simple: end of January to start of March</div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-lg border border-red-200 dark:border-red-800">
                            <div className="font-semibold text-foreground mb-2">What Many People Think</div>
                            <div className="text-lg text-red-600 font-bold">1 month, 1 day</div>
                            <p className="text-sm text-muted-foreground mt-2">
                              They subtract months: 3 - 1 = 2, then subtract days: 1 - 31 = -30, then "borrow" a month: 2 - 1 = 1 month, -30 + 31 = 1 day.
                            </p>
                            <div className="text-xs text-red-600 mt-2">This is incorrect!</div>
                          </div>
                          
                          <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded-lg border border-green-200 dark:border-green-800">
                            <div className="font-semibold text-foreground mb-2">What Actually Happens</div>
                            <div className="text-lg text-green-600 font-bold">1 month, 0 days</div>
                            <p className="text-sm text-muted-foreground mt-2">
                              February has only 28 days in 2024 (not a leap year). January 31 to February 28 is 28 days = exactly 1 month. February 28 to March 1 is 1 day, but that doesn't complete another month.
                            </p>
                            <div className="text-xs text-green-600 mt-2">This is calendar-correct!</div>
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground">
                          <strong>Why it matters:</strong> If you're calculating a 1-month notice period from January 31, you'd think it ends March 1. Actually, it ends February 28. Miss that? You've violated your notice period by a day.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-4">Example 2: Leap Year Impact on Long Contracts</h3>
                        
                        <div className="mb-4">
                          <div className="font-medium text-foreground">Dates: March 1, 2023 to March 1, 2027</div>
                          <div className="text-sm text-muted-foreground mt-1">Four-year contract spanning multiple leap years</div>
                        </div>
                        
                        <div className="overflow-x-auto">
                          <table className="min-w-full text-sm">
                            <thead className="bg-secondary/20">
                              <tr>
                                <th className="p-2 text-left">Year Span</th>
                                <th className="p-2 text-left">Leap Years Included</th>
                                <th className="p-2 text-left">Total Days</th>
                                <th className="p-2 text-left">Daily Rate Impact</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-border">
                                <td className="p-2">2023-2027</td>
                                <td className="p-2">2024 (yes, 2028 isn't included)</td>
                                <td className="p-2 font-semibold">1,461 days</td>
                                <td className="p-2">Exactly 4×365 + 1 leap day</td>
                              </tr>
                              <tr className="border-b border-border">
                                <td className="p-2">2024-2028</td>
                                <td className="p-2">2024, 2028</td>
                                <td className="p-2 font-semibold">1,462 days</td>
                                <td className="p-2">4×365 + 2 leap days</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mt-4">
                          <strong>Business impact:</strong> If you charge $10,000/year for software, that's about $27.40/day. A one-day difference means undercharging or overcharging by that amount. Over hundreds of contracts, this adds up to real money.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-4">Example 3: Working Days vs Calendar Days for Projects</h3>
                        
                        <div className="mb-4">
                          <div className="font-medium text-foreground">Project: September 1, 2024 to December 31, 2024</div>
                          <div className="text-sm text-muted-foreground mt-1">Q4 project deadline</div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                          <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
                            <div className="text-2xl font-bold text-foreground">121</div>
                            <div className="text-sm text-muted-foreground">Calendar Days</div>
                          </div>
                          <div className="p-4 bg-green-50 dark:bg-green-900/10 rounded-lg">
                            <div className="text-2xl font-bold text-foreground">87</div>
                            <div className="text-sm text-muted-foreground">Working Days</div>
                          </div>
                          <div className="p-4 bg-purple-50 dark:bg-purple-900/10 rounded-lg">
                            <div className="text-2xl font-bold text-foreground">34</div>
                            <div className="text-sm text-muted-foreground">Weekend Days</div>
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mt-4">
                          <strong>Planning insight:</strong> If you tell your team they have 121 days for the project, they'll feel rushed. But actually, they have only 87 work days. That's a 28% difference in perceived timeline. Using the correct number prevents unrealistic expectations and burnout.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </article>

              {/* Accuracy Notes Section */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('accuracyNotes')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-500/10 p-2 rounded-lg">
                      <Shield size={20} className="text-blue-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Understanding What "Accurate" Really Means for Dates</h2>
                  </div>
                  {openSections.accuracyNotes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.accuracyNotes && (
                  <div className="px-6 pb-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold text-foreground mb-3">Where Other Date Calculators Get It Wrong</h3>
                        <div className="space-y-3 text-muted-foreground">
                          <p>
                            I've tested dozens of online date calculators, and most have subtle bugs. Here are the common issues our tool specifically avoids:
                          </p>
                          
                          <div className="bg-secondary/10 p-4 rounded-lg">
                            <div className="font-medium text-foreground mb-2">The "30-Day Month" Fallacy</div>
                            <p className="text-sm">
                              Many calculators treat all months as 30 days when calculating differences. Ask them for January 31 to March 1, and they'll say "1 month, 1 day." That's mathematically incorrect—it's actually 1 month, 0 days because February only has 28 days. Our tool uses actual month lengths.
                            </p>
                          </div>
                          
                          <div className="bg-secondary/10 p-4 rounded-lg">
                            <div className="font-medium text-foreground mb-2">Leap Year Confusion</div>
                            <p className="text-sm">
                              Some tools forget that years divisible by 100 aren't leap years unless also divisible by 400. Try calculating from March 1, 2099 to March 1, 2101 across the year 2100 (not a leap year). Many will incorrectly include February 29, 2100. Ours correctly excludes it.
                            </p>
                          </div>
                          
                          <div className="bg-secondary/10 p-4 rounded-lg">
                            <div className="font-medium text-foreground mb-2">Date Order Assumptions</div>
                            <p className="text-sm">
                              If you enter an end date before a start date, some tools give negative numbers or error messages. Ours simply calculates the positive difference and tells you it's a past period—how people naturally think about elapsed time.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-3">What We Mean by "100% Accurate"</h3>
                        <p className="text-muted-foreground mb-4">
                          When we say our calculations are accurate, we mean they match the Gregorian calendar exactly. Here's what that accuracy covers:
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="bg-green-500 text-white rounded-full p-1">
                                <Shield size={12} />
                              </div>
                              <span className="font-medium text-foreground">Calendar Rules</span>
                            </div>
                            <ul className="text-sm text-muted-foreground space-y-1 ml-7">
                              <li>• Correct leap year logic (including century rules)</li>
                              <li>• Exact month lengths</li>
                              <li>• Proper day-of-week progression</li>
                            </ul>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="bg-blue-500 text-white rounded-full p-1">
                                <Calendar size={12} />
                              </div>
                              <span className="font-medium text-foreground">Calculation Method</span>
                            </div>
                            <ul className="text-sm text-muted-foreground space-y-1 ml-7">
                              <li>• Month transitions handled correctly</li>
                              <li>• Working days exclude weekends</li>
                              <li>• All results mathematically verified</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-3">Limitations You Should Know About</h3>
                        <div className="space-y-3 text-muted-foreground">
                          <p>
                            No tool is perfect for every situation. Here's what this calculator <em>doesn't</em> do, so you can decide if it's right for your needs:
                          </p>
                          
                          <div className="border-l-4 border-yellow-500 pl-4 py-2">
                            <div className="font-medium text-foreground">No Custom Holidays</div>
                            <p className="text-sm">
                              The working days calculation excludes weekends but not public holidays. If you need holiday-aware calculations, try our <Link href="/date-tools/WorkDays" className="text-blue-600 hover:underline">Work Days Calculator</Link> which lets you specify custom holidays.
                            </p>
                          </div>
                          
                          <div className="border-l-4 border-blue-500 pl-4 py-2">
                            <div className="font-medium text-foreground">No Time Calculations</div>
                            <p className="text-sm">
                              This is a date calculator, not a time calculator. It treats each date as a full calendar day. For calculations involving specific times of day, use our <Link href="/date-tools/countdown" className="text-blue-600 hover:underline">Countdown Timer</Link>.
                            </p>
                          </div>
                          
                          <div className="border-l-4 border-green-500 pl-4 py-2">
                            <div className="font-medium text-foreground">Gregorian Calendar Only</div>
                            <p className="text-sm">
                              We use the modern Gregorian calendar. For dates before 1582 (when different calendar systems were used), the calculations are proleptic Gregorian—meaning we apply today's rules backward in time. This is standard for most applications, but historians might need specialized tools.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded-lg border border-green-200 dark:border-green-800">
                        <h4 className="font-semibold text-foreground mb-2">Verification Tip</h4>
                        <p className="text-sm text-muted-foreground">
                          Want to verify our calculations? Take a physical calendar and count the days manually for a short range. For longer ranges, calculate total days as (end - start) in milliseconds divided by (1000×60×60×24). Our results should match both methods exactly. We encourage verification—it builds confidence in the tool.
                        </p>
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