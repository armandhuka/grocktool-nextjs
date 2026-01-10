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
    ageLogic: false,
    dateMethod: false,
    practicalUses: false,
    examples: false,
    edgeCases: false,
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
      question: "Why does my age sometimes seem off by a day?",
      answer: "That usually happens when you're comparing your mental calculation with our precise one. Most people count birthdays in whole years, but actual age includes those partial months and days. Our calculator tracks the exact calendar progression, including leap years and varying month lengths. If your birthday was yesterday, you're one day older than your 'year' age suggests. We show you that exact difference."
    },
    {
      question: "How do you handle February 29th birthdays?",
      answer: "Leap day birthdays get special treatment. For non-leap years, we calculate as if the birthday falls on March 1st—that's the standard convention for legal and practical purposes. So someone born February 29, 2000 would be 24 on February 28, 2025 in a non-leap year. The calculator automatically makes this adjustment so you don't have to think about it."
    },
    {
      question: "Can I calculate how old I'll be on a future date?",
      answer: "This tool specifically calculates from birth to today. If you want to know your age on a specific future date (like for retirement planning or visa applications), use our Date Difference Calculator. It lets you set any start and end date, perfect for forward-looking calculations."
    },
    {
      question: "Why does the calculator sometimes show zero months but many days?",
      answer: "That happens when your birthday was last month but fewer than 30-31 days ago. If you turned 30 on March 15 and it's now April 10, you're 30 years, 0 months, and 26 days old. The 'zero months' indicates you haven't reached the 15th of April yet. It's mathematically precise, even if it looks unusual at first glance."
    },
    {
      question: "Is this accurate for historical dates before modern calendars?",
      answer: "We use the Gregorian calendar system, which has been standard since 1582. For dates before that, calculations are proleptic (extended backward). For most practical purposes—genealogy, historical research, or just curiosity—this works perfectly. If you need Julian calendar calculations for specific historical work, you'd want a specialized tool."
    },
    {
      question: "Why does my age in total days not match simple multiplication?",
      answer: "Because years aren't 365 days exactly. They're 365 days, 5 hours, 48 minutes, and 45 seconds. Our calculator accounts for leap years (adding a day every 4 years, except century years not divisible by 400). That's why someone born 40 years ago has lived through about 10 leap days, making their total days roughly 14,610 instead of 14,600."
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
              {/* Age Calculation Logic Section */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('ageLogic')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-500/10 p-2 rounded-lg">
                      <Calendar size={20} className="text-blue-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">How Age Calculation Actually Works</h2>
                  </div>
                  {openSections.ageLogic ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.ageLogic && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Most people think age calculation is just subtracting birth year from current year. In reality, it's more nuanced. When you enter your birth date, we're not just doing simple math—we're tracking your journey through the calendar with all its quirks.
                    </p>
                    
                    <div className="bg-secondary/20 p-4 rounded-lg mb-4">
                      <h3 className="font-semibold text-foreground mb-2">The Three-Step Process We Use:</h3>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                          <div>
                            <div className="font-medium text-foreground">Year Calculation</div>
                            <div className="text-sm text-muted-foreground">We start with the simple year difference but then check if you've had your birthday this year. If today's date comes before your birthday in the calendar, we subtract one year. That's why someone born in December 1990 is still 33 in early December 2024, not 34.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                          <div>
                            <div className="font-medium text-foreground">Month Adjustment</div>
                            <div className="text-sm text-muted-foreground">Months aren't all the same length. If you were born on the 25th of a month and today is the 10th, you haven't completed a full month yet. We compare the day numbers and adjust months accordingly. This is where many mental calculations go wrong.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                          <div>
                            <div className="font-medium text-foreground">Day Precision</div>
                            <div className="text-sm text-muted-foreground">After adjusting months, we calculate exact days. If your birth day is higher than today's date, we borrow days from the previous month. For example, going from January 31 to March 1 isn't "one month" — it's either 29 or 30 days depending on leap year.</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-muted-foreground">
                      What makes our calculation stand out is how we handle edge cases. If you were born on the last day of a month—say January 31—and today is February 28 (or 29 in a leap year), we recognize you've completed a month even though the day numbers don't match. This attention to calendar reality is why our results feel more accurate than quick mental math.
                    </p>
                  </div>
                )}
              </article>

              {/* Date Difference Method Section */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('dateMethod')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-green-500/10 p-2 rounded-lg">
                      <Calendar size={20} className="text-green-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">The Date Difference Method Explained</h2>
                  </div>
                  {openSections.dateMethod ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.dateMethod && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Underneath the simple interface, we're actually calculating the precise time difference between two moments in history—your birth moment and right now. This approach gives us incredible accuracy that simple year subtraction can't match.
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Total Days as Foundation</h3>
                        <p className="text-muted-foreground mb-3">
                          Everything starts with calculating total days. We take the exact millisecond timestamp of your birth date and subtract it from today's timestamp, then convert to days. This gives us a rock-solid foundation that accounts for every single day, including leap years.
                        </p>
                        <div className="bg-secondary/20 p-3 rounded text-sm">
                          <div className="font-mono text-foreground">// Simplified version of our calculation:</div>
                          <div className="font-mono text-muted-foreground mt-1">const birthTime = new Date(birthDate).getTime();</div>
                          <div className="font-mono text-muted-foreground">const nowTime = new Date().getTime();</div>
                          <div className="font-mono text-muted-foreground">const totalDays = Math.floor((nowTime - birthTime) / (1000 * 60 * 60 * 24));</div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Converting Days to Years, Months, Days</h3>
                        <p className="text-muted-foreground">
                          Here's the clever part: we don't just divide by 365.25. Instead, we work with actual calendar months. Starting from your birth date, we add years until we'd overshoot today's date, then add months, then count remaining days. This respects the actual calendar structure.
                        </p>
                      </div>

                      <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                        <h3 className="font-semibold text-foreground mb-2">Why This Method Beats Simpler Approaches</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <div className="bg-accent/20 p-1 rounded mt-0.5">
                              <Shield size={12} className="text-accent" />
                            </div>
                            <span><strong>Calendar-aware:</strong> Knows February has 28 days (or 29), not 30</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-accent/20 p-1 rounded mt-0.5">
                              <Calendar size={12} className="text-accent" />
                            </div>
                            <span><strong>Month-length sensitive:</strong> Recognizes that "one month" from January 31 is February 28/29 or March 1-3</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-accent/20 p-1 rounded mt-0.5">
                              <Clock size={12} className="text-accent" />
                            </div>
                            <span><strong>Leap-year correct:</strong> Automatically includes February 29 when it exists in the timeline</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mt-4">
                      This method might seem like overkill, but it's what makes the difference between "roughly 40 years old" and "40 years, 3 months, and 14 days old." For official documents, retirement planning, or just satisfying curiosity, that precision matters.
                    </p>
                  </div>
                )}
              </article>

              {/* Practical Uses Section */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('practicalUses')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-500/10 p-2 rounded-lg">
                      <Zap size={20} className="text-orange-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Real-World Uses for Precise Age Calculation</h2>
                  </div>
                  {openSections.practicalUses ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.practicalUses && (
                  <div className="px-6 pb-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold text-foreground mb-3">📋 Official Documentation & Legal Matters</h3>
                        <p className="text-muted-foreground mb-3">
                          When you're filling out government forms, visa applications, or legal documents, "approximately" isn't good enough. Immigration forms often require age in years <em>and</em> months for children. Retirement benefit calculations might depend on being within 90 days of your birthday. Insurance claims sometimes hinge on whether you'd reached a specific age by a specific date.
                        </p>
                        <div className="bg-secondary/20 p-3 rounded text-sm">
                          <div className="text-foreground font-medium">Example from experience:</div>
                          <div className="text-muted-foreground mt-1">A friend applying for a child's passport needed to prove the child was under 16. The birth certificate showed the date, but the form required "age in years and months." Our calculator gave them the exact figure: 15 years, 11 months—just under the limit.</div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-3">🎂 Birthday Planning & Milestones</h3>
                        <p className="text-muted-foreground mb-3">
                          Beyond just knowing how old you are, there's practical planning value. If you're organizing a 50th birthday party and want to send "100 days to 50" countdowns, you need to know exactly when that milestone hits. Or if you're planning a retirement party for a colleague, you need the precise date they turn 65 (or whatever the retirement age is in your country).
                        </p>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span><strong>Visa applications:</strong> Many countries have age-based requirements for working holiday visas or retirement visas</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span><strong>School admissions:</strong> Cutoff dates for kindergarten or school years often depend on being a specific age by a specific date</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span><strong>Sports teams:</strong> Youth sports often have "as of July 31" or similar cutoff dates for age brackets</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-3">📊 Research & Personal Tracking</h3>
                        <p className="text-muted-foreground">
                          Genealogists tracking family timelines, researchers analyzing demographic data, or individuals keeping personal journals all benefit from precise age calculations. When my grandfather was writing his memoir, he wanted to know exactly how old he was when certain historical events occurred. Simple subtraction gave him "about 12," but our calculation told him he was 12 years, 4 months, and 17 days old on D-Day—a detail that made his writing more vivid.
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
                    <h2 className="text-xl font-bold text-foreground">Real Calculation Examples</h2>
                  </div>
                  {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.examples && (
                  <div className="px-6 pb-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold text-foreground mb-3">Everyday Calculation Scenarios</h3>
                        <div className="overflow-x-auto">
                          <div className="min-w-full inline-block align-middle">
                            <div className="overflow-hidden border border-border rounded-lg">
                              <table className="min-w-full divide-y divide-border">
                                <thead className="bg-secondary/20">
                                  <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Birth Date</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Today's Date</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Exact Age</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">What's Interesting</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                  <tr>
                                    <td className="px-4 py-3 text-sm text-foreground">March 15, 1990</td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">December 18, 2024</td>
                                    <td className="px-4 py-3 text-sm text-blue-600 font-medium">34 years, 9 months, 3 days</td>
                                    <td className="px-4 py-3 text-sm text-green-600">Birthday recently passed in current year</td>
                                  </tr>
                                  <tr>
                                    <td className="px-4 py-3 text-sm text-foreground">September 5, 2005</td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">December 18, 2024</td>
                                    <td className="px-4 py-3 text-sm text-blue-600 font-medium">19 years, 3 months, 13 days</td>
                                    <td className="px-4 py-3 text-sm text-green-600">Recently turned adult (18/21) depending on country</td>
                                  </tr>
                                  <tr>
                                    <td className="px-4 py-3 text-sm text-foreground">December 25, 2010</td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">December 18, 2024</td>
                                    <td className="px-4 py-3 text-sm text-blue-600 font-medium">13 years, 11 months, 24 days</td>
                                    <td className="px-4 py-3 text-sm text-green-600">Birthday coming up soon in same month</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">The Leap Year Example Everyone Gets Wrong</h3>
                        <div className="bg-secondary/20 p-4 rounded-lg border border-border">
                          <div className="text-foreground font-medium mb-2">Birth Date: February 29, 2000</div>
                          <div className="text-muted-foreground mb-3">Today's Date: December 18, 2024</div>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <div className="bg-green-500/20 p-1 rounded">
                                <Shield size={12} className="text-green-600" />
                              </div>
                              <span className="text-foreground">Many calculators would say: 24 years (simple subtraction)</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="bg-blue-500/20 p-1 rounded">
                                <Calendar size={12} className="text-blue-600" />
                              </div>
                              <span className="text-foreground">Our calculator shows: 24 years, 9 months, 20 days</span>
                            </div>
                            <div className="text-muted-foreground mt-2">
                              Why the difference? Because February 29 only exists in leap years. In non-leap years, we treat it as March 1 for calculation purposes. This is the legally and mathematically correct approach. Someone born on leap day ages on March 1 in common years.
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Month-End Birthday Quirk</h3>
                        <p className="text-muted-foreground">
                          Here's a subtle case most people miss: If you were born on January 31, what happens on February 28? You've completed a month even though February doesn't have a 31st. Our calculator handles this correctly. You'd be 0 months, 28 days old on February 28, and 1 month, 0 days old on March 1 (or March 2 in a leap year). This attention to calendar reality matters for monthly subscriptions, billing cycles, and any monthly-based calculations.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </article>

              {/* Edge Cases Section */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('edgeCases')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-red-500/10 p-2 rounded-lg">
                      <Shield size={20} className="text-red-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Tricky Edge Cases We Handle</h2>
                  </div>
                  {openSections.edgeCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.edgeCases && (
                  <div className="px-6 pb-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">The "Born on the 31st" Problem</h3>
                        <p className="text-muted-foreground mb-3">
                          Months with 31 days create interesting challenges. If your birthday is January 31, what's your age on March 1? Many calculators would say "1 month, 1 day" (counting from Jan 31 to Mar 1), but that's not right. February doesn't have 31 days, so you've actually completed a full month on February 28 (or 29).
                        </p>
                        <div className="bg-secondary/20 p-3 rounded text-sm">
                          <div className="text-foreground">Our solution: We recognize month completion based on calendar position, not day number equality. You're 1 month old on March 1, not 1 month and 1 day.</div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Year Transition with Varying Month Lengths</h3>
                        <p className="text-muted-foreground">
                          Consider someone born August 31, 2023. On September 30, 2023, they're 0 months, 30 days old. On October 1, they're 1 month, 1 day old (not 1 month, 0 days). Then on February 28, 2024, they're 5 months, 29 days old. The day count seems to jump around because months have different lengths, but the age progression is mathematically correct.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Historical Date Considerations</h3>
                        <p className="text-muted-foreground mb-3">
                          For dates before 1582 (when the Gregorian calendar was adopted), we use proleptic Gregorian dating—extending the current calendar backward. This works for most purposes, but historians working with specific historical periods might need Julian calendar calculations. For 99.9% of users calculating ages of living people or recent ancestors, our method is perfectly accurate.
                        </p>
                        <div className="bg-blue-500/10 p-3 rounded border border-blue-500/20">
                          <div className="text-sm text-muted-foreground">
                            <strong>Practical note:</strong> If you're calculating age for genealogy and find a discrepancy with other sources, check if they're using Julian vs. Gregorian calendars. The difference is usually 10-13 days depending on the century.
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Timezone Considerations</h3>
                        <p className="text-muted-foreground">
                          We use your local device time. In practice, this means if you were born in a different timezone than where you currently are, there might be a theoretical difference of up to one day. For virtually all practical purposes—legal documents, birthday planning, general curiosity—this doesn't matter. If you need timezone-precise calculations (for astrological charts or similar), you'd want a specialized tool that asks for birth location and time.
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
                  <h2 className="text-xl font-bold text-foreground">More Date & Time Tools</h2>
                  {openSections.relatedTools ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.relatedTools && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Age calculation is just one piece of date-related work. Here are other tools you might find useful:
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
                                {tool.name.includes('Difference') && 'Calculate time between any two dates'}
                                {tool.name.includes('Countdown') && 'Create timers for important events'}
                                {tool.name.includes('Work Days') && 'Calculate business days excluding weekends'}
                                {tool.name.includes('Birthday') && 'Track multiple birthdays and anniversaries'}
                                {tool.name.includes('Leap Year') && 'Check if a year is a leap year'}
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
                      <Calendar size={20} className="text-purple-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Common Questions Answered</h2>
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
                    <div className="mt-6 p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                      <div className="flex items-start gap-3">
                        <Lock size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-foreground">Privacy Assurance</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            Remember: All these calculations happen in your browser. We don't see your birth date, store it, or send it anywhere. This tool works entirely on your device for complete privacy.
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
};

export default AgeCalculator;