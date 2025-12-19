'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Copy, RotateCcw, ArrowLeft, CheckCircle, XCircle, Info, Calculator, Sparkles, ChevronUp, ChevronDown, ChevronRight, Lock, Zap, History, Clock } from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';

export default function LeapYear() {
  const [year, setYear] = useState('');
  const [result, setResult] = useState<{
    year: number;
    isLeap: boolean;
    days: number;
    nextLeapYear: number;
    previousLeapYear: number;
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
    { name: 'Date Difference Calculator', path: '/date-tools/date-difference' },
    { name: 'Birthday Countdown', path: '/date-tools/birthday-countdown' },
    { name: 'Work Days Calculator', path: '/date-tools/WorkDays' },
    { name: 'Countdown Timer', path: '/date-tools/countdown' }
  ];

  const faqData = [
    {
      question: "What exactly is a leap year?",
      answer: "A leap year is a calendar year containing one additional day (February 29th) to synchronize the calendar year with the astronomical year. Regular years have 365 days, but leap years have 366 days to account for the fact that Earth's orbit around the Sun takes approximately 365.2422 days."
    },
    {
      question: "Why do we have leap years?",
      answer: "Leap years correct the calendar drift that would otherwise occur because a solar year is about 365.2422 days long, not exactly 365 days. Without leap years, our calendar would gradually drift out of sync with the seasons by about one day every four years."
    },
    {
      question: "What are the rules for determining leap years?",
      answer: "Three rules determine leap years: 1) Year divisible by 4 → Usually a leap year, 2) Year divisible by 100 → NOT a leap year (exception to rule 1), 3) Year divisible by 400 → IS a leap year (exception to rule 2). Example: 2000 was a leap year, but 1900 was not."
    },
    {
      question: "How often do leap years occur?",
      answer: "Leap years occur every 4 years on average, but not exactly every 4 years due to the century rules. The pattern repeats every 400 years. There are 97 leap years in each 400-year cycle, averaging one leap year approximately every 4.1237 years."
    },
    {
      question: "What happens if someone is born on February 29th?",
      answer: "People born on February 29th (leap day) celebrate their birthdays on February 28th or March 1st during non-leap years. Legally, their birth date is recognized, but for annual celebrations, they typically choose one of these adjacent dates for non-leap years."
    }
  ];

  const isLeapYear = (year: number): boolean => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  };

  const findNextLeapYear = (startYear: number): number => {
    let nextYear = startYear + 1;
    while (!isLeapYear(nextYear)) {
      nextYear++;
    }
    return nextYear;
  };

  const findPreviousLeapYear = (startYear: number): number => {
    let prevYear = startYear - 1;
    while (!isLeapYear(prevYear)) {
      prevYear--;
    }
    return prevYear;
  };

  const checkLeapYear = () => {
    if (!year) return;

    const yearNum = parseInt(year);
    if (isNaN(yearNum) || yearNum < 1) return;

    const leap = isLeapYear(yearNum);
    const daysInYear = leap ? 366 : 365;
    const nextLeap = findNextLeapYear(yearNum);
    const prevLeap = findPreviousLeapYear(yearNum);

    setResult({
      year: yearNum,
      isLeap: leap,
      days: daysInYear,
      nextLeapYear: nextLeap,
      previousLeapYear: prevLeap
    });
  };

  const clearFields = () => {
    setYear('');
    setResult(null);
  };

  const copyResult = async () => {
    if (result) {
      const text = `${result.year} is ${result.isLeap ? '' : 'not '}a leap year (${result.days} days). Next leap year: ${result.nextLeapYear}, Previous leap year: ${result.previousLeapYear}`;
      try {
        await navigator.clipboard.writeText(text);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  const checkCurrentYear = () => {
    const currentYear = new Date().getFullYear();
    setYear(currentYear.toString());
  };

  const checkHistoricalYear = (historicalYear: number) => {
    setYear(historicalYear.toString());
  };

  return (
    <>
      <Head>
        <title>Leap Year Checker | Verify Leap Years with 366 Days | GrockTool.com</title>
        <meta name="description" content="Check if any year is a leap year with our accurate leap year calculator. Understand leap year rules, find next/previous leap years, and learn about February 29th. 100% free tool." />
        <meta name="keywords" content="leap year checker, leap year calculator, is it a leap year, leap year rules, February 29, 366 days, leap year finder, calendar calculator" />
        <meta property="og:title" content="Leap Year Checker | Verify Leap Years with 366 Days" />
        <meta property="og:description" content="Check if any year is a leap year with our accurate leap year calculator. Understand leap year rules, find next/previous leap years, and learn about February 29th." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Leap Year Checker - Accurate & Free Tool" />
        <meta name="twitter:description" content="Check any year for leap year status. Understand rules and find adjacent leap years instantly." />
        <link rel="canonical" href="https://grocktool.com/date-tools/leap-year" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Leap Year Checker - Accurate Year Verification",
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "Any",
            "description": "Check if any year is a leap year with our accurate leap year calculator. Understand leap year rules, find next/previous leap years, and learn about February 29th. 100% free tool.",
            "url": "https://grocktool.com/date-tools/leap-year",
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
              "Accurate leap year calculation",
              "Next and previous leap year finder",
              "Leap year rules explanation",
              "No signup required",
              "Historical year checking",
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
                  <span className="text-sm font-medium text-green-600">Gregorian Calendar Rules • Historical Years • 100% Accurate</span>
                </div>
                
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                  Leap Year Checker
                  <span className="block text-lg sm:text-xl lg:text-2xl font-normal text-muted-foreground mt-2">
                    Verify Any Year for Leap Year Status • Understand Calendar Rules • Find Adjacent Leap Years
                  </span>
                </h1>
                
                <div className="flex flex-wrap justify-center gap-4 mt-6 mb-8">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-lg">
                    <CheckCircle size={14} className="text-green-600" />
                    <span className="text-xs sm:text-sm text-foreground">366 Days Detection</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 rounded-lg">
                    <Calculator size={14} className="text-blue-600" />
                    <span className="text-xs sm:text-sm text-foreground">Gregorian Rules</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 rounded-lg">
                    <History size={14} className="text-purple-600" />
                    <span className="text-xs sm:text-sm text-foreground">Historical Years</span>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Left Panel - Leap Year Checker */}
              <div className="space-y-6">
                {/* Main Tool Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-card rounded-xl border border-border p-6 shadow-sm"
                >
                  <div className="space-y-6">
                    {/* Year Input */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar size={20} className="text-foreground" />
                          <label className="block text-sm font-medium text-foreground">
                            Enter Year to Check for Leap Year Status
                          </label>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-green-600">
                          <Calculator size={12} />
                          <span>Accurate calculation</span>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <input
                          type="number"
                          placeholder="e.g., 2024, 1900, 2000..."
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                          min="1"
                          max="9999"
                          className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground placeholder:text-muted-foreground"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <div className="bg-green-500 text-white rounded-full p-1">
                            <CheckCircle size={10} />
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground text-center">
                        Works for any year from 1 to 9999
                      </p>
                    </div>

                    {/* Quick Year Buttons */}
                    <div className="space-y-2">
                      <div className="text-xs text-muted-foreground">Quick Check Common Years:</div>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={checkCurrentYear}
                          className="px-3 py-1.5 bg-blue-500/10 text-blue-600 rounded-lg hover:bg-blue-500/20 transition-colors text-xs"
                        >
                          Current Year ({new Date().getFullYear()})
                        </button>
                        <button
                          onClick={() => checkHistoricalYear(2000)}
                          className="px-3 py-1.5 bg-green-500/10 text-green-600 rounded-lg hover:bg-green-500/20 transition-colors text-xs"
                        >
                          2000 (Leap Year)
                        </button>
                        <button
                          onClick={() => checkHistoricalYear(1900)}
                          className="px-3 py-1.5 bg-orange-500/10 text-orange-600 rounded-lg hover:bg-orange-500/20 transition-colors text-xs"
                        >
                          1900 (Not Leap)
                        </button>
                        <button
                          onClick={() => checkHistoricalYear(2024)}
                          className="px-3 py-1.5 bg-purple-500/10 text-purple-600 rounded-lg hover:bg-purple-500/20 transition-colors text-xs"
                        >
                          2024 (Leap Year)
                        </button>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={checkLeapYear}
                        disabled={!year}
                        className="flex items-center justify-center gap-2 flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                      >
                        <Calculator size={18} />
                        Check Leap Year Status
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

                {/* Leap Year Rules Card */}
                <div className="rounded-xl border border-blue-200 dark:border-blue-800 p-6 shadow-sm">
                  <h3 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
                    <Info size={16} className="text-blue-600" />
                    Leap Year Rules (Gregorian Calendar)
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="bg-green-100 dark:bg-green-900/20 p-1.5 rounded-full mt-0.5">
                        <div className="text-xs font-bold text-green-600">1</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">Divisible by 4</div>
                        <div className="text-xs text-muted-foreground">Year divisible by 4 → Usually a leap year</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-orange-100 dark:bg-orange-900/20 p-1.5 rounded-full mt-0.5">
                        <div className="text-xs font-bold text-orange-600">2</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">Divisible by 100</div>
                        <div className="text-xs text-muted-foreground">Year divisible by 100 → NOT a leap year (exception to rule 1)</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 dark:bg-blue-900/20 p-1.5 rounded-full mt-0.5">
                        <div className="text-xs font-bold text-blue-600">3</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">Divisible by 400</div>
                        <div className="text-xs text-muted-foreground">Year divisible by 400 → IS a leap year (exception to rule 2)</div>
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
                        <h3 className="text-lg font-semibold text-foreground">Leap Year Analysis</h3>
                        <p className="text-sm text-muted-foreground">
                          Year {result.year} - Gregorian Calendar Rules
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
                      {/* Main Result Display */}
                      <div className={`p-4 rounded-lg border ${result.isLeap ? 'bg-green-500/10 border-green-500/20' : 'bg-orange-500/10 border-orange-500/20'}`}>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-foreground mb-2">{result.year}</div>
                          <div className="flex items-center justify-center gap-2 mb-3">
                            {result.isLeap ? (
                              <>
                                <CheckCircle size={24} className="text-green-600" />
                                <div className="text-xl font-bold text-green-600">IS A LEAP YEAR</div>
                              </>
                            ) : (
                              <>
                                <XCircle size={24} className="text-orange-600" />
                                <div className="text-xl font-bold text-orange-600">NOT A LEAP YEAR</div>
                              </>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {result.days} days in {result.year}
                          </div>
                        </div>
                      </div>

                      {/* Days and Calendar Information */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 p-4 rounded-xl border border-blue-500/20 text-center">
                          <div className="text-2xl font-bold text-foreground">{result.days}</div>
                          <div className="text-xs text-muted-foreground mt-1">Days in Year</div>
                          {result.isLeap && (
                            <div className="text-xs text-green-600 mt-1">(Includes February 29)</div>
                          )}
                        </div>
                        <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 p-4 rounded-xl border border-purple-500/20 text-center">
                          <div className="text-2xl font-bold text-foreground">{result.isLeap ? 29 : 28}</div>
                          <div className="text-xs text-muted-foreground mt-1">Days in February</div>
                        </div>
                      </div>

                      {/* Adjacent Leap Years */}
                      <div className="space-y-4">
                        <h4 className="text-sm font-medium text-foreground">Adjacent Leap Years</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-secondary/20 p-4 rounded-lg border border-border">
                            <div className="flex items-center gap-2 mb-1">
                              <ArrowLeft size={14} className="text-muted-foreground" />
                              <div className="text-xs text-muted-foreground">Previous Leap Year</div>
                            </div>
                            <div className="text-lg font-bold text-foreground">{result.previousLeapYear}</div>
                            <div className="text-xs text-muted-foreground">
                              {result.year - result.previousLeapYear} years before
                            </div>
                          </div>
                          <div className="bg-secondary/20 p-4 rounded-lg border border-border">
                            <div className="flex items-center gap-2 mb-1">
                              <ArrowLeft size={14} className="text-muted-foreground rotate-180" />
                              <div className="text-xs text-muted-foreground">Next Leap Year</div>
                            </div>
                            <div className="text-lg font-bold text-foreground">{result.nextLeapYear}</div>
                            <div className="text-xs text-muted-foreground">
                              {result.nextLeapYear - result.year} years after
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Century Analysis */}
                      {(result.year % 100 === 0 || result.year % 400 === 0) && (
                        <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                          <div className="flex items-center gap-2 mb-2">
                            <Info size={16} className="text-blue-600" />
                            <span className="text-sm font-medium text-foreground">Century Year Analysis</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {result.year % 400 === 0 ? (
                              <>Year {result.year} is divisible by 400, making it a leap year despite being a century year.</>
                            ) : result.year % 100 === 0 ? (
                              <>Year {result.year} is divisible by 100 but not by 400, making it NOT a leap year.</>
                            ) : null}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Examples Card */}
                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                  <h3 className="text-sm font-medium text-foreground mb-4">Common Leap Year Examples</h3>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center gap-2 p-2 bg-green-500/10 rounded">
                      <CheckCircle size={14} className="text-green-600" />
                      <span className="text-foreground">2024 (Leap)</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-green-500/10 rounded">
                      <CheckCircle size={14} className="text-green-600" />
                      <span className="text-foreground">2000 (Leap)</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-orange-500/10 rounded">
                      <XCircle size={14} className="text-orange-600" />
                      <span className="text-foreground">1900 (Not)</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-orange-500/10 rounded">
                      <XCircle size={14} className="text-orange-600" />
                      <span className="text-foreground">2100 (Not)</span>
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
                        <Calendar className="w-16 h-16 text-muted-foreground" />
                        <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-1">
                          <CheckCircle size={12} />
                        </div>
                      </div>
                      <p className="text-foreground font-medium mb-2">Enter a Year to Check</p>
                      <p className="text-muted-foreground text-sm mb-4">
                        Type any year or use quick buttons to check for leap year status
                      </p>
                      <div className="text-xs text-green-600 flex items-center justify-center gap-1">
                        <Lock size={10} />
                        <span>Accurate calculations • Gregorian rules • Instant results</span>
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
                    <div className="bg-green-500/10 p-2 rounded-lg">
                      <Calculator size={20} className="text-green-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Leap Year Checker - Features & Calendar Science</h2>
                  </div>
                  {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.whatItDoes && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      This Leap Year Checker provides accurate verification of whether any given year is a leap year according to Gregorian calendar rules. It applies the complete set of leap year determination rules: years divisible by 4 are leap years, except century years (divisible by 100), which are not leap years unless they're also divisible by 400. The tool not only verifies leap year status but also calculates days in the year, identifies adjacent leap years, and explains the specific rules applied to each year checked.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle size={18} className="text-green-600" />
                          <h3 className="font-semibold text-foreground">Rule-Based Calculation</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">Applies complete Gregorian calendar rules including century year exceptions for 100% accurate leap year determination.</p>
                      </div>
                      <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <History size={18} className="text-blue-600" />
                          <h3 className="font-semibold text-foreground">Historical Range</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">Works for any year from 1 to 9999, allowing verification of historical, current, and future years with equal accuracy.</p>
                      </div>
                      <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Info size={18} className="text-purple-600" />
                          <h3 className="font-semibold text-foreground">Comprehensive Analysis</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">Provides adjacent leap years, day counts, and detailed rule explanations for complete leap year understanding.</p>
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
                      <Calendar size={20} className="text-blue-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Practical Leap Year Applications</h2>
                  </div>
                  {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.useCases && (
                  <div className="px-6 pb-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">📅 Calendar & Scheduling Applications</h3>
                        <ul className="space-y-1 text-muted-foreground text-sm">
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Verify leap years for accurate calendar creation, event planning, and long-term scheduling</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Calculate correct number of days in years for project timelines, financial calculations, and contract durations</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Plan for February 29th birthdays, anniversaries, and special events occurring on leap days</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">💼 Business & Financial Planning</h3>
                        <ul className="space-y-1 text-muted-foreground text-sm">
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Calculate accurate daily rates for annual contracts, leases, and service agreements spanning leap years</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Determine correct payroll calculations for employees with annual salaries, especially for leap year adjustments</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Verify fiscal year calculations and financial reporting periods that cross leap year boundaries</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">📚 Educational & Historical Research</h3>
                        <ul className="space-y-1 text-muted-foreground text-sm">
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Verify historical dates and events for academic research, genealogy studies, and historical analysis</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Teach calendar mathematics and astronomical principles in educational settings</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Research calendar systems and timekeeping methods across different cultures and historical periods</span>
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
                    <h2 className="text-xl font-bold text-foreground">How to Check Leap Years - Complete Guide</h2>
                  </div>
                  {openSections.howToUse ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.howToUse && (
                  <div className="px-6 pb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h3 className="font-semibold text-foreground">3-Step Verification Process</h3>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                            <div>
                              <div className="font-medium text-foreground">Enter Year</div>
                              <div className="text-sm text-muted-foreground">Type any year from 1 to 9999 or use quick buttons for common years like current year or 2000.</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                            <div>
                              <div className="font-medium text-foreground">Check Status</div>
                              <div className="text-sm text-muted-foreground">Click "Check Leap Year Status" to apply Gregorian calendar rules and determine leap year classification.</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                            <div>
                              <div className="font-medium text-foreground">Analyze Results</div>
                              <div className="text-sm text-muted-foreground">Review leap year status, adjacent leap years, day count, and detailed rule explanations.</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h3 className="font-semibold text-foreground">Pro Tips & Best Practices</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <div className="bg-accent/20 p-1 rounded mt-0.5">
                              <Info size={12} className="text-accent" />
                            </div>
                            <span>Remember the century rule: 1900 was NOT a leap year, but 2000 WAS a leap year</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-accent/20 p-1 rounded mt-0.5">
                              <Copy size={12} className="text-accent" />
                            </div>
                            <span>Use the copy feature to save results for documentation, research, or educational purposes</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-accent/20 p-1 rounded mt-0.5">
                              <History size={12} className="text-accent" />
                            </div>
                            <span>Check adjacent leap years to understand the 4-year pattern and century exceptions</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-accent/20 p-1 rounded mt-0.5">
                              <Calendar size={12} className="text-accent" />
                            </div>
                            <span>For February 29th birthdays, check leap year status to determine actual celebration dates</span>
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
                    <h2 className="text-xl font-bold text-foreground">Leap Year Calculation Examples & Rules</h2>
                  </div>
                  {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.examples && (
                  <div className="px-6 pb-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-3">Common Leap Year Verification Examples</h3>
                        <div className="overflow-x-auto">
                          <div className="min-w-full inline-block align-middle">
                            <div className="overflow-hidden border border-border rounded-lg">
                              <table className="min-w-full divide-y divide-border">
                                <thead className="bg-secondary/20">
                                  <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Year</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Divisible by 4</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Divisible by 100</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Divisible by 400</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Leap Year?</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Days</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                  <tr>
                                    <td className="px-4 py-3 text-sm text-foreground">2024</td>
                                    <td className="px-4 py-3 text-sm text-green-600">Yes</td>
                                    <td className="px-4 py-3 text-sm text-orange-600">No</td>
                                    <td className="px-4 py-3 text-sm text-orange-600">No</td>
                                    <td className="px-4 py-3 text-sm text-green-600 font-medium">YES</td>
                                    <td className="px-4 py-3 text-sm text-blue-600">366</td>
                                  </tr>
                                  <tr>
                                    <td className="px-4 py-3 text-sm text-foreground">2000</td>
                                    <td className="px-4 py-3 text-sm text-green-600">Yes</td>
                                    <td className="px-4 py-3 text-sm text-green-600">Yes</td>
                                    <td className="px-4 py-3 text-sm text-green-600">Yes</td>
                                    <td className="px-4 py-3 text-sm text-green-600 font-medium">YES</td>
                                    <td className="px-4 py-3 text-sm text-blue-600">366</td>
                                  </tr>
                                  <tr>
                                    <td className="px-4 py-3 text-sm text-foreground">1900</td>
                                    <td className="px-4 py-3 text-sm text-green-600">Yes</td>
                                    <td className="px-4 py-3 text-sm text-green-600">Yes</td>
                                    <td className="px-4 py-3 text-sm text-orange-600">No</td>
                                    <td className="px-4 py-3 text-sm text-orange-600 font-medium">NO</td>
                                    <td className="px-4 py-3 text-sm text-blue-600">365</td>
                                  </tr>
                                  <tr>
                                    <td className="px-4 py-3 text-sm text-foreground">2023</td>
                                    <td className="px-4 py-3 text-sm text-orange-600">No</td>
                                    <td className="px-4 py-3 text-sm text-orange-600">No</td>
                                    <td className="px-4 py-3 text-sm text-orange-600">No</td>
                                    <td className="px-4 py-3 text-sm text-orange-600 font-medium">NO</td>
                                    <td className="px-4 py-3 text-sm text-blue-600">365</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Detailed Leap Year Rule Application</h3>
                        <div className="bg-secondary/20 p-4 rounded-lg border border-border overflow-x-auto">
                          <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
{`Example 1: Checking Year 2024 (Common Leap Year)

Step 1: Check divisibility by 4
2024 ÷ 4 = 506 (remainder 0)
Result: Divisible by 4 → Proceed to next check

Step 2: Check divisibility by 100
2024 ÷ 100 = 20.24 (remainder 24)
Result: NOT divisible by 100 → LEAP YEAR CONFIRMED

Final Determination: 2024 IS a leap year
Days in year: 366
February has: 29 days

Example 2: Checking Year 1900 (Century Year - Not Leap)

Step 1: Check divisibility by 4
1900 ÷ 4 = 475 (remainder 0)
Result: Divisible by 4 → Proceed to next check

Step 2: Check divisibility by 100
1900 ÷ 100 = 19 (remainder 0)
Result: Divisible by 100 → Proceed to exception check

Step 3: Check divisibility by 400
1900 ÷ 400 = 4.75 (remainder 300)
Result: NOT divisible by 400 → NOT a leap year

Final Determination: 1900 is NOT a leap year
Days in year: 365
February has: 28 days

Example 3: Checking Year 2000 (Century Year - Leap)

Step 1: Check divisibility by 4
2000 ÷ 4 = 500 (remainder 0)
Result: Divisible by 4 → Proceed to next check

Step 2: Check divisibility by 100
2000 ÷ 100 = 20 (remainder 0)
Result: Divisible by 100 → Proceed to exception check

Step 3: Check divisibility by 400
2000 ÷ 400 = 5 (remainder 0)
Result: Divisible by 400 → LEAP YEAR CONFIRMED

Final Determination: 2000 IS a leap year
Days in year: 366
February has: 29 days

Leap Year Pattern Analysis:
• Regular leap years: 2020, 2024, 2028, 2032...
• Century exceptions: 1700, 1800, 1900 NOT leap; 2000, 2400 ARE leap
• Average leap years per century: 24 (not 25 due to century rules)
• Pattern repeats every 400 years

Key Features Demonstrated:
✓ Complete Gregorian calendar rule application
✓ Century year exception handling
✓ Clear step-by-step determination process
✓ Adjacent leap year calculation
✓ Historical and future year verification
✓ Educational rule explanations`}
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
                  <h2 className="text-xl font-bold text-foreground">More Date & Calendar Tools</h2>
                  {openSections.relatedTools ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.relatedTools && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Explore other useful date and calendar calculation tools:
                    </p>
                    <ul className="space-y-3 text-muted-foreground">
                      {relatedTools.map((tool, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-accent mr-2">•</span>
                          <Link href={tool.path} className="text-accent hover:underline">
                            <strong>{tool.name}:</strong> Visit this tool for additional date and calendar calculations
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
                      <Info size={20} className="text-purple-600" />
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