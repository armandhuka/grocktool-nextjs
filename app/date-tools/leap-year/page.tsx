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
    leapYearRules: false,
    gregorianCalendarLogic: false,
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
    { name: 'Age Calculator', path: '/date-tools/age-calculator' },
    { name: 'Date Difference Calculator', path: '/date-tools/date-difference' },
    { name: 'Birthday Countdown', path: '/date-tools/birthday-countdown' },
    { name: 'Work Days Calculator', path: '/date-tools/WorkDays' },
    { name: 'Countdown Timer', path: '/date-tools/countdown' }
  ];

  const faqData = [
    {
      question: "Why was 1900 not a leap year but 2000 was?",
      answer: "This trips up a lot of people. Here's the simple explanation: 1900 is divisible by 100 but not by 400, so it fails the century year exception rule. 2000 passes because it's divisible by both 100 and 400. The rule exists because a solar year is about 365.2422 days, not 365.25 - that tiny difference accumulates over centuries, so we skip three leap days every 400 years to stay accurate."
    },
    {
      question: "Do other calendar systems have leap years?",
      answer: "Yes, many do, but they handle them differently. The Hebrew calendar adds a whole month seven times in a 19-year cycle. The Islamic calendar doesn't have leap years in the traditional sense, which is why Ramadan moves through the seasons. The Chinese calendar adds a month about every three years. The Gregorian system we use is just one approach to the same astronomical problem."
    },
    {
      question: "What happens to software that doesn't account for leap years correctly?",
      answer: "It can cause serious problems. In 2012, Microsoft Azure had an outage because their leap year handling failed. Many accounting systems miscalculate daily rates. I've seen payroll software underpay employees by one day's worth. Old email systems used to crash. That's why thorough testing around February 29th is crucial for developers - and why tools like this exist to help verify the logic."
    },
    {
      question: "How far back and forward do leap year rules work accurately?",
      answer: "The Gregorian rules work well for centuries, but they're not perfect forever. By the year 4000, we'll be off by about a day. Some proposals suggest skipping the year 4000 as a leap year to correct this, but that decision won't be made for a long time. For practical purposes - planning events, calculating ages, business contracts - the current rules work fine for thousands of years in both directions."
    },
    {
      question: "Can I manually check if a year is a leap year without a calculator?",
      answer: "Absolutely, and it's good to know how. Take the last two digits of the year. If they're not divisible by 4, it's not a leap year. If they are divisible by 4, check if it's a century year (ends with 00). If it is, the full year must be divisible by 400. So 2024? 24 ÷ 4 = 6, not a century year, so yes. 1900? Ends with 00, 1900 ÷ 400 = 4.75, so no. It becomes second nature after a while."
    },
    {
      question: "What's the rarest birthday?",
      answer: "February 29th, obviously. About 1 in 1,461 people have this birthday. In non-leap years, they typically celebrate on February 28th or March 1st. Some countries have specific laws about which date to use for official purposes. There's even a club for 'leaplings' - people born on February 29th. The chances of being born on this day are about 0.068%, making it the statistically rarest birthday."
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
              {/* Leap Year Rules - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('leapYearRules')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-green-500/10 p-2 rounded-lg">
                      <Calculator size={20} className="text-green-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">The Three Simple Rules That Determine Leap Years</h2>
                  </div>
                  {openSections.leapYearRules ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.leapYearRules && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      People often think leap years are just "every four years," but it's slightly more nuanced. The Gregorian calendar uses three straightforward rules that work together. Once you understand them, you can figure out any year's leap status in your head.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                        <h3 className="font-semibold text-foreground mb-2">Rule 1: The Four-Year Check</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          If a year is divisible by 4, it's probably a leap year. This accounts for the 0.25 extra day each year (365.25 vs 365). So 2024, 2028, 2032 - all leap years. This rule alone would work if a solar year were exactly 365.25 days.
                        </p>
                        <div className="text-xs text-muted-foreground italic">
                          Example: 2024 ÷ 4 = 506 (exactly) → Probably leap
                        </div>
                      </div>
                      
                      <div className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/20">
                        <h3 className="font-semibold text-foreground mb-2">Rule 2: The Century Exception</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Here's where it gets interesting. If a year is divisible by 100, it's NOT a leap year (even if it passes rule 1). So 1900, 2100, 2200 - not leap years. Why? Because a solar year is actually 365.2422 days, not 365.25. That tiny difference adds up.
                        </p>
                        <div className="text-xs text-muted-foreground italic">
                          Example: 1900 ÷ 100 = 19 (exactly) → Overrides rule 1, probably not leap
                        </div>
                      </div>
                      
                      <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                        <h3 className="font-semibold text-foreground mb-2">Rule 3: The 400-Year Correction</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          The final tweak: if a year is divisible by 400, it IS a leap year (overriding rule 2). So 2000, 2400, 2800 are leap years. This brings us even closer to the actual solar year length. Think of it as "we skip three leap days every 400 years."
                        </p>
                        <div className="text-xs text-muted-foreground italic">
                          Example: 2000 ÷ 400 = 5 (exactly) → Overrides rule 2, definitely leap
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-secondary/20 rounded-lg border border-border">
                      <h3 className="font-semibold text-foreground mb-2">Quick Mental Check Method</h3>
                      <p className="text-sm text-muted-foreground">
                        Here's how I do it in my head: Look at the last two digits. Divisible by 4? Probably leap. Ends with 00? Check if divisible by 400. 1900? 19 not divisible by 4, so not leap. 2000? 20 divisible by 4, so leap. Takes 2 seconds once you're used to it.
                      </p>
                    </div>
                  </div>
                )}
              </article>

              {/* Gregorian Calendar Logic - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('gregorianCalendarLogic')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-500/10 p-2 rounded-lg">
                      <Calendar size={20} className="text-blue-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Why These Rules Exist - The Astronomical Math</h2>
                  </div>
                  {openSections.gregorianCalendarLogic ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.gregorianCalendarLogic && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      The leap year rules aren't arbitrary - they're a clever mathematical solution to a physical problem. Earth takes about 365.2422 days to orbit the sun. Our calendar has 365 days. That 0.2422 difference might seem small, but it adds up to nearly a full day every four years. Hence, leap years.
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">The Julian Calendar Problem</h3>
                        <p className="text-muted-foreground text-sm mb-2">
                          Before the Gregorian reform in 1582, Europe used the Julian calendar which had a leap year every 4 years, period. This assumed a year was 365.25 days. But since it's actually 365.2422, the Julian calendar gained about 3 days every 400 years. By 1582, they were 10 days off.
                        </p>
                        <p className="text-muted-foreground text-sm">
                          Pope Gregory XIII introduced the new system to fix this drift. They skipped 10 days (October 4, 1582 was followed by October 15, 1582) and implemented the new rules. Protestant countries resisted initially - Britain didn't adopt it until 1752, by which time they had to skip 11 days.
                        </p>
                      </div>
                      
                      <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                        <h3 className="font-semibold text-foreground mb-2">The Math Behind the Rules</h3>
                        <div className="text-sm text-muted-foreground space-y-2">
                          <p><strong>Solar year:</strong> 365.2422 days</p>
                          <p><strong>Julian assumption:</strong> 365.25 days (off by 0.0078 days/year)</p>
                          <p><strong>Error accumulation:</strong> 0.0078 × 400 = 3.12 days every 400 years</p>
                          <p><strong>Gregorian fix:</strong> Skip 3 leap days every 400 years (400 ÷ 100 - 1 = 3)</p>
                          <p><strong>Result:</strong> 97 leap years per 400 years instead of 100</p>
                          <p><strong>Average year length:</strong> 365 + 97/400 = 365.2425 days (error: 0.0003 days/year)</p>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Why This Still Isn't Perfect</h3>
                        <p className="text-muted-foreground text-sm">
                          Even the Gregorian calendar drifts - about 1 day every 3,236 years. That's why some astronomers propose skipping the year 4000 as a leap year. But honestly, that's someone else's problem centuries from now. For all practical purposes - your birthday, your mortgage, your vacation planning - the current system works beautifully.
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                      <h3 className="font-semibold text-foreground mb-2">Real-World Impact</h3>
                      <p className="text-sm text-muted-foreground">
                        I once worked with a payroll system that didn't account for leap years correctly. An employee on annual salary was underpaid by 1/365th of their pay every leap year. Took months to notice. That's why this stuff matters - not just as trivia, but for accurate calculations in finance, contracts, and software systems.
                      </p>
                    </div>
                  </div>
                )}
              </article>

              {/* Examples - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('examples')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-500/10 p-2 rounded-lg">
                      <Zap size={20} className="text-orange-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Real Examples - Testing the Rules with Actual Years</h2>
                  </div>
                  {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.examples && (
                  <div className="px-6 pb-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold text-foreground mb-3">The Classic Test Cases Everyone Should Know</h3>
                        
                        <div className="space-y-4">
                          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                            <div className="flex items-center gap-2 mb-2">
                              <CheckCircle size={16} className="text-green-600" />
                              <h4 className="font-semibold text-foreground">Year 2000 - The Recent Century Leap Year</h4>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              Many people remember the Y2K scare, but 2000 was also special because it was the first century leap year since 1600. Divisible by 400? 2000 ÷ 400 = 5 exactly. That means it overrides the "century years aren't leap years" rule. Lots of software was tested specifically for this case.
                            </p>
                            <div className="text-xs text-muted-foreground">
                              <strong>Rule path:</strong> Divisible by 4 ✓ → Divisible by 100 ✓ → Divisible by 400 ✓ → Leap year
                            </div>
                          </div>
                          
                          <div className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/20">
                            <div className="flex items-center gap-2 mb-2">
                              <XCircle size={16} className="text-orange-600" />
                              <h4 className="font-semibold text-foreground">Year 1900 - The Common Century Mistake</h4>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              This is the one that confuses most people. 1900 looks like it should be leap (divisible by 4), but it fails the century exception. 1900 ÷ 400 = 4.75, not whole. So it's not leap. If you're doing historical research or genealogy, getting this right matters for accurate date calculations.
                            </p>
                            <div className="text-xs text-muted-foreground">
                              <strong>Rule path:</strong> Divisible by 4 ✓ → Divisible by 100 ✓ → Divisible by 400 ✗ → Not leap year
                            </div>
                          </div>
                          
                          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                            <div className="flex items-center gap-2 mb-2">
                              <CheckCircle size={16} className="text-blue-600" />
                              <h4 className="font-semibold text-foreground">Year 2024 - A Regular Modern Leap Year</h4>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              Standard case: not a century year, divisible by 4. 2024 ÷ 4 = 506 exactly. Simple. The next one after this is 2028, then 2032. This pattern holds unless interrupted by a century year. Most leap years you'll encounter in daily life follow this straightforward rule.
                            </p>
                            <div className="text-xs text-muted-foreground">
                              <strong>Rule path:</strong> Divisible by 4 ✓ → Not century year → Leap year
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-foreground mb-3">Practice These Yourself</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-secondary/20 p-4 rounded-lg border border-border">
                            <p className="text-sm font-medium text-foreground mb-2">Try: Year 2100</p>
                            <div className="text-xs text-muted-foreground space-y-1">
                              <p>• Divisible by 4? 2100 ÷ 4 = 525 ✓</p>
                              <p>• Divisible by 100? 2100 ÷ 100 = 21 ✓</p>
                              <p>• Divisible by 400? 2100 ÷ 400 = 5.25 ✗</p>
                              <p className="text-orange-600 font-medium">Result: Not a leap year</p>
                            </div>
                          </div>
                          
                          <div className="bg-secondary/20 p-4 rounded-lg border border-border">
                            <p className="text-sm font-medium text-foreground mb-2">Try: Year 2400</p>
                            <div className="text-xs text-muted-foreground space-y-1">
                              <p>• Divisible by 4? 2400 ÷ 4 = 600 ✓</p>
                              <p>• Divisible by 100? 2400 ÷ 100 = 24 ✓</p>
                              <p>• Divisible by 400? 2400 ÷ 400 = 6 ✓</p>
                              <p className="text-green-600 font-medium">Result: Leap year</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                      <h3 className="font-semibold text-foreground mb-2">Why Testing Matters</h3>
                      <p className="text-sm text-muted-foreground">
                        When I develop date-related software, I always test these specific years: 1900 (not leap), 2000 (leap), 2024 (leap), 2100 (not leap). If a system handles all four correctly, it probably handles everything correctly. These are the corner cases that reveal logic errors in calendar calculations.
                      </p>
                    </div>
                  </div>
                )}
              </article>

              {/* Edge Cases - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('edgeCases')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-500/10 p-2 rounded-lg">
                      <Info size={20} className="text-purple-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Interesting Edge Cases & Leap Year Oddities</h2>
                  </div>
                  {openSections.edgeCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.edgeCases && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Beyond the basic rules, leap years have some fascinating quirks that affect everything from birthdays to legal contracts. These aren't just trivia - they're practical considerations that come up in real situations.
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">The "Leapling" Birthday Problem</h3>
                        <p className="text-muted-foreground text-sm mb-2">
                          People born on February 29th face unique situations. Legally, are they a year older on February 28th or March 1st in non-leap years? Different countries handle this differently. Some laws specify March 1st, others February 28th. For driver's licenses, voting age, alcohol purchases - it matters.
                        </p>
                        <p className="text-muted-foreground text-sm">
                          I know someone born on February 29th who celebrates on March 1st because "it feels like moving forward, not backward." Others do February 28th. There's no universal standard, which can cause administrative headaches.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Contract and Payment Calculations</h3>
                        <p className="text-muted-foreground text-sm mb-2">
                          Annual salary divided by 365 gives a different daily rate than divided by 366. For leap years, that's an extra day's worth of pay spread across the year. Most payroll systems handle this automatically now, but I've seen old systems that didn't.
                        </p>
                        <p className="text-muted-foreground text-sm">
                          Similarly, daily rates for annual contracts, leases, or subscriptions should account for leap years. A one-year lease starting March 1, 2023 ends February 29, 2024 (366 days later), not February 28. Not all systems get this right.
                        </p>
                      </div>
                      
                      <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                        <h3 className="font-semibold text-foreground mb-2">Historical Transition Dates</h3>
                        <p className="text-sm text-muted-foreground">
                          When countries adopted the Gregorian calendar, they had to skip days. Great Britain skipped September 3-13, 1752. People rioted, thinking they'd lost 11 days of life. Russia didn't adopt it until 1918, which is why the "October Revolution" actually occurred in November by our calendar. These transitions affect historical research - you need to know which calendar was in use when.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Software and System Failures</h3>
                        <p className="text-muted-foreground text-sm">
                          Every leap year, some software fails. In 2012, Microsoft Azure had issues. In 2016, various point-of-sale systems crashed. The problem is often developers testing with "normal" years and forgetting February 29th exists. That's why good date libraries and thorough testing with tools like this one are essential.
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                      <h3 className="font-semibold text-foreground mb-2">Practical Advice for Handling Leap Years</h3>
                      <p className="text-sm text-muted-foreground">
                        If you're working with dates in any professional capacity: always use established date libraries (they handle leap years correctly), test with known edge cases (1900, 2000), and for long-term calculations, consider whether the Gregorian rules will still apply (they will for centuries). And when in doubt, use this tool to verify - it's saved me from several embarrassing mistakes over the years.
                      </p>
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
                      If you work with dates regularly, these other tools might save you time:
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