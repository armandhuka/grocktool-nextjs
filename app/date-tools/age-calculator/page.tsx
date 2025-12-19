'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Copy, RotateCcw, ArrowLeft, Lock, Clock, Shield, Sparkles, ChevronUp, ChevronDown, ChevronRight, Zap } from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState('');
  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
    totalWeeks: number;
    totalHours: number;
    totalMinutes: number;
    nextBirthdayDays: number;
    nextBirthdayDate: string;
    ageInMonths: number;
    ageInWeeks: number;
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
    { name: 'Countdown Timer', path: '/date-tools/countdown' },
    { name: 'Work Days Calculator', path: '/date-tools/WorkDays' },
    { name: 'Next Birthday Countdown', path: '/date-tools/birthday-countdown' },
    { name: 'Leap Year Checker', path: '/date-tools/leap-year' }
  ];

  const faqData = [
    {
      question: "How accurate is the age calculation?",
      answer: "100% accurate. The calculator accounts for leap years, different month lengths, and all calendar variations. It uses the exact number of days between dates for precise calculations down to the day, month, and year."
    },
    {
      question: "Does the calculator work for past and future dates?",
      answer: "For age calculation, you can only calculate from a past birth date to the current date. For future date calculations, use our Date Difference Calculator tool which handles any date range comparisons."
    },
    {
      question: "How does it handle leap years in calculations?",
      answer: "Leap years are automatically factored into all calculations. The tool correctly calculates February 29th birthdays and accounts for the extra day in leap years when determining total days and precise age."
    },
    {
      question: "Can I calculate age from a specific date in the past?",
      answer: "This calculator shows age from birth date to today. For calculating age at a specific past date, use our Date Difference Calculator with your birth date as the start and the target date as the end."
    },
    {
      question: "Is my birth date data stored anywhere?",
      answer: "No data storage. All calculations happen instantly in your browser. Your birth date never leaves your device—no server processing, no data collection, complete privacy."
    }
  ];

  const calculateAge = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const today = new Date();
    
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;
    const ageInMonths = years * 12 + months;
    const ageInWeeks = Math.floor(totalDays / 7);

    const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    const nextBirthdayDays = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const nextBirthdayDate = nextBirthday.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    setResult({
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalHours,
      totalMinutes,
      nextBirthdayDays,
      nextBirthdayDate,
      ageInMonths,
      ageInWeeks
    });
  };

  const clearFields = () => {
    setBirthDate('');
    setResult(null);
  };

  const copyResult = async () => {
    if (result) {
      const text = `Age: ${result.years} years, ${result.months} months, ${result.days} days\nTotal Days: ${result.totalDays.toLocaleString()}\nTotal Weeks: ${result.totalWeeks.toLocaleString()}\nTotal Hours: ${result.totalHours.toLocaleString()}\nTotal Minutes: ${result.totalMinutes.toLocaleString()}\nNext Birthday: ${result.nextBirthdayDate} (in ${result.nextBirthdayDays} days)`;
      try {
        await navigator.clipboard.writeText(text);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  const formatDateForInput = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  return (
    <>
      <Head>
        <title>Age Calculator | Calculate Exact Age Instantly - 100% Private & Free | GrockTool.com</title>
        <meta name="description" content="Calculate your exact age instantly. Get precise age in years, months, days, hours, minutes. 100% private - no data storage, no signup required. Includes next birthday countdown." />
        <meta name="keywords" content="age calculator, calculate age, birthday calculator, age in days, age in weeks, next birthday, age calculator online, exact age calculator" />
        <meta property="og:title" content="Age Calculator | Calculate Exact Age Instantly - 100% Private & Free" />
        <meta property="og:description" content="Calculate your exact age instantly with 100% privacy. Get precise age in years, months, days, hours, and minutes. No data storage, no signup required." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Age Calculator - 100% Private & Instant" />
        <meta name="twitter:description" content="Calculate exact age instantly. No data storage, completely private." />
        <link rel="canonical" href="https://grocktool.com/date-tools/age-calculator" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Age Calculator - Private & Instant",
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "Any",
            "description": "Calculate your exact age instantly with 100% privacy. Get precise age in years, months, days, hours, and minutes. No data storage, no signup required. Includes next birthday countdown.",
            "url": "https://grocktool.com/date-tools/age-calculator",
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
              "Next birthday countdown",
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
                  Calculate Your Exact Age Instantly
                  <span className="block text-lg sm:text-xl lg:text-2xl font-normal text-muted-foreground mt-2">
                    100% Private • Precise Calculations • No Signup Required
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
                    {/* Date Input */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar size={20} className="text-foreground" />
                          <label className="block text-sm font-medium text-foreground">
                            Enter Your Birth Date
                          </label>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-green-600">
                          <Lock size={12} />
                          <span>Processing in your browser</span>
                        </div>
                      </div>
                      <div className="relative">
                        <input
                          type="date"
                          value={birthDate}
                          onChange={(e) => setBirthDate(e.target.value)}
                          max={formatDateForInput(new Date())}
                          className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <div className="bg-green-500 text-white rounded-full p-1">
                            <Lock size={10} />
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground text-center">
                        Your birth date never leaves your device
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={calculateAge}
                        disabled={!birthDate}
                        className="flex items-center justify-center gap-2 flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                      >
                        <Zap size={18} />
                        Calculate Exact Age
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
                    {birthDate && (
                      <div className="bg-card rounded-xl border border-border p-4 shadow-sm">
                        <div className="grid grid-cols-2 gap-2 text-center">
                          <div className="p-2">
                            <div className="text-lg font-bold text-foreground">
                              {new Date(birthDate).toLocaleDateString('en-US', { weekday: 'long' })}
                            </div>
                            <div className="text-xs text-muted-foreground">Day of Week</div>
                          </div>
                          <div className="p-2">
                            <div className="text-lg font-bold text-foreground">
                              {new Date(birthDate).toLocaleDateString('en-US', { month: 'long' })}
                            </div>
                            <div className="text-xs text-muted-foreground">Birth Month</div>
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
                    Why Calculate With Us?
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="bg-green-100 dark:bg-green-900/20 p-1.5 rounded-full mt-0.5">
                        <Lock size={12} className="text-green-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">100% Private Processing</div>
                        <div className="text-xs text-muted-foreground">Your birth date never leaves your browser. No data storage.</div>
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
                        <div className="text-xs text-muted-foreground">Get age in multiple time units plus next birthday countdown.</div>
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
                      <h3 className="text-lg font-semibold text-foreground">Your Exact Age Results</h3>
                      <button
                        onClick={copyResult}
                        className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Copy size={16} />
                      </button>
                    </div>

                    <div className="space-y-6">
                      {/* Main Age Display */}
                      <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                        <div className="text-2xl font-bold text-foreground text-center">
                          {result.years} years, {result.months} months, {result.days} days
                        </div>
                        <div className="text-xs text-green-600 text-center mt-2 flex items-center justify-center gap-2">
                          <Lock size={10} />
                          <span>100% private calculation</span>
                        </div>
                      </div>

                      {/* Next Birthday */}
                      <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                        <div className="flex items-center gap-2 text-blue-600 mb-2">
                          <Calendar size={16} />
                          <span className="font-semibold">Next Birthday</span>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-foreground">
                            {result.nextBirthdayDays} days
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {result.nextBirthdayDate}
                          </div>
                        </div>
                      </div>

                      {/* Detailed Breakdown */}
                      <div>
                        <h4 className="text-sm font-medium text-foreground mb-3">Detailed Age Breakdown</h4>
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
                              <span className="text-sm text-muted-foreground">Age in Months</span>
                              <span className="font-semibold text-foreground">{result.ageInMonths.toLocaleString()}</span>
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
                              <span className="text-sm text-muted-foreground">Age in Weeks</span>
                              <span className="font-semibold text-foreground">{result.ageInWeeks.toLocaleString()}</span>
                            </div>
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
                      <Calendar size={14} className="text-blue-600" />
                      <span className="text-foreground">Exact Age</span>
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
                      <span className="text-foreground">Next Birthday</span>
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
                      <p className="text-foreground font-medium mb-2">Enter Your Birth Date</p>
                      <p className="text-muted-foreground text-sm mb-4">
                        Select your birth date to calculate exact age with 100% privacy
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
                    <h2 className="text-xl font-bold text-foreground">Precise Age Calculation - How It Works</h2>
                  </div>
                  {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.whatItDoes && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      This age calculator provides exact age calculations by computing the precise difference between your birth date and today. Unlike simple year subtraction, it accounts for varying month lengths, leap years, and exact day counts to deliver accurate results in years, months, and days. The tool also converts your age into multiple time units (weeks, days, hours, minutes) and calculates your next birthday countdown—all while keeping your data 100% private in your browser.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Lock size={18} className="text-blue-600" />
                          <h3 className="font-semibold text-foreground">Complete Privacy</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">Your birth date never leaves your browser. No data storage, no server processing, complete confidentiality.</p>
                      </div>
                      <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock size={18} className="text-green-600" />
                          <h3 className="font-semibold text-foreground">Precise Accuracy</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">Accounts for leap years, different month lengths, and exact day counts for mathematically perfect calculations.</p>
                      </div>
                      <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar size={18} className="text-purple-600" />
                          <h3 className="font-semibold text-foreground">Comprehensive Results</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">Get age in multiple time units plus next birthday countdown for complete age understanding.</p>
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
                    <h2 className="text-xl font-bold text-foreground">When to Use Age Calculator</h2>
                  </div>
                  {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.useCases && (
                  <div className="px-6 pb-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">📋 Personal & Family Documentation</h3>
                        <ul className="space-y-1 text-muted-foreground text-sm">
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Calculate exact age for passport applications, ID renewals, or official documentation</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Determine precise ages of children for school admissions, sports teams, or developmental milestones</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Calculate family member ages for medical records, insurance forms, or genealogy research</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">🎂 Birthday & Celebration Planning</h3>
                        <ul className="space-y-1 text-muted-foreground text-sm">
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Count down to next birthday with exact days remaining for party planning</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Calculate milestone ages (18, 21, 30, 50, 65) for special celebration planning</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Determine exact age for retirement planning, pension eligibility, or senior benefits</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">💼 Professional & Educational Use</h3>
                        <ul className="space-y-1 text-muted-foreground text-sm">
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Calculate candidate ages for job applications, internships, or age-restricted positions</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Determine student ages for educational placements, scholarship eligibility, or program requirements</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Calculate ages for statistical analysis, demographic studies, or research projects</span>
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
                              <div className="font-medium text-foreground">Enter Birth Date</div>
                              <div className="text-sm text-muted-foreground">Select your birth date using the secure date picker. Data stays on your device.</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                            <div>
                              <div className="font-medium text-foreground">Calculate Age</div>
                              <div className="text-sm text-muted-foreground">Click calculate to get precise age in years, months, and days instantly.</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                            <div>
                              <div className="font-medium text-foreground">View Results</div>
                              <div className="text-sm text-muted-foreground">Get comprehensive age breakdown and next birthday countdown.</div>
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
                            <span>Use the date picker for accurate date selection, especially for older dates</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-accent/20 p-1 rounded mt-0.5">
                              <Copy size={12} className="text-accent" />
                            </div>
                            <span>Copy results for sharing or saving by clicking the copy icon in the results section</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-accent/20 p-1 rounded mt-0.5">
                              <Shield size={12} className="text-accent" />
                            </div>
                            <span>For February 29th birthdays, calculations automatically handle leap years correctly</span>
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
                    <h2 className="text-xl font-bold text-foreground">Example: Age Calculation Results</h2>
                  </div>
                  {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.examples && (
                  <div className="px-6 pb-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-3">Sample Age Calculations</h3>
                        <div className="overflow-x-auto">
                          <div className="min-w-full inline-block align-middle">
                            <div className="overflow-hidden border border-border rounded-lg">
                              <table className="min-w-full divide-y divide-border">
                                <thead className="bg-secondary/20">
                                  <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Birth Date</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Today's Date</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Exact Age</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Key Features</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                  <tr>
                                    <td className="px-4 py-3 text-sm text-foreground">June 15, 1990</td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">December 18, 2024</td>
                                    <td className="px-4 py-3 text-sm text-blue-600">34 years, 6 months, 3 days</td>
                                    <td className="px-4 py-3 text-sm text-green-600">Mid-year birthday calculation</td>
                                  </tr>
                                  <tr>
                                    <td className="px-4 py-3 text-sm text-foreground">February 29, 2000 (Leap Day)</td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">December 18, 2024</td>
                                    <td className="px-4 py-3 text-sm text-blue-600">24 years, 9 months, 20 days</td>
                                    <td className="px-4 py-3 text-sm text-green-600">Leap year birthday handled correctly</td>
                                  </tr>
                                  <tr>
                                    <td className="px-4 py-3 text-sm text-foreground">December 25, 2015</td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">December 18, 2024</td>
                                    <td className="px-4 py-3 text-sm text-blue-600">8 years, 11 months, 24 days</td>
                                    <td className="px-4 py-3 text-sm text-green-600">Recent birthday calculation</td>
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
{`Example Calculation for Birth Date: March 15, 1995 (Today: December 18, 2024)

Step 1: Calculate Years
2024 - 1995 = 29 years

Step 2: Calculate Months
December (12) - March (3) = 9 months
Since December > March, no adjustment needed

Step 3: Calculate Days
18 - 15 = 3 days
Since 18 > 15, no adjustment needed

Initial Result: 29 years, 9 months, 3 days

Step 4: Calculate Total Days
Days from March 15, 1995 to December 18, 2024:
• Account for leap years between 1995-2024: 8 leap years
• Total days = (29 years × 365 days) + 8 leap days + days in partial year
• Exact calculation: 10,871 days

Step 5: Convert to Other Units
• Total Weeks: 10,871 ÷ 7 = 1,553 weeks
• Total Hours: 10,871 × 24 = 260,904 hours
• Total Minutes: 260,904 × 60 = 15,654,240 minutes

Step 6: Calculate Next Birthday
Next birthday: March 15, 2025
Days until next birthday: 87 days (from December 18, 2024)

Final Results:
• Exact Age: 29 years, 9 months, 3 days
• Total Days: 10,871 days
• Total Weeks: 1,553 weeks
• Total Hours: 260,904 hours
• Total Minutes: 15,654,240 minutes
• Next Birthday: March 15, 2025 (in 87 days)

Key Features Demonstrated:
✓ Accurate month/day calculation accounting for different month lengths
✓ Leap year handling (8 leap years between 1995-2024)
✓ Comprehensive unit conversions
✓ Next birthday countdown calculation
✓ All calculations performed locally in browser`}
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
};

export default AgeCalculator;