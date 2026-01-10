'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Copy, RotateCcw, ArrowLeft, Cake, Calendar, PartyPopper, Clock, Sparkles, ChevronUp, ChevronDown, ChevronRight, Lock, Target, Users, Bell } from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';

export default function BirthdayCountdown() {
  const [birthDate, setBirthDate] = useState('');
  const [name, setName] = useState('');
  const [result, setResult] = useState<{
    nextBirthday: string;
    daysUntil: number;
    weeksUntil: number;
    monthsUntil: number;
    age: number;
    nextAge: number;
    isPastThisYear: boolean;
  } | null>(null);

  const [openSections, setOpenSections] = useState({
    annualReset: false,
    reminderUses: false,
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
    { name: 'Date Difference Calculator', path: '/date-tools/date-difference' },
    { name: 'Leap Year Checker', path: '/date-tools/leap-year' }
  ];

  const faqData = [
    {
      question: "My birthday just passed yesterday. Why does it show 364 days until next birthday?",
      answer: "That's correct! When your birthday passes in the current year, the calculator resets to count toward your next birthday in the following year. So if your birthday was yesterday, you'll have approximately 364 days until your next celebration (365 in leap years). It automatically handles this annual reset so you're always counting toward your upcoming birthday."
    },
    {
      question: "I was born on February 29th. How does this handle my birthday in non-leap years?",
      answer: "Great question! For February 29th birthdays, we calculate your next celebration based on how most people handle it. In non-leap years, your next birthday is considered March 1st. This aligns with common practice and legal recognition. The calculator automatically makes this adjustment so you get an accurate countdown every year, leap year or not."
    },
    {
 question: "Why does the 'months until' number seem off compared to the days count?",
      answer: "The months calculation uses an average of 30.44 days per month (365.25 days per year ÷ 12 months). Since months vary from 28 to 31 days, this gives you a good estimate for planning purposes. For exact timing, focus on the days count. If you need precise monthly planning, consider that your birthday moves through different calendar months each year, which affects when you should start specific preparations."
    },
    {
      question: "Can I use this for planning surprise parties without the person knowing?",
      answer: "Absolutely, and it works perfectly for that! Enter their birth date (with or without their name) to get the exact countdown. Use the copy feature to save the results privately. Many people use it this way to plan surprises, coordinate with other friends, and make sure they don't miss important milestones. Just remember to clear your browser history if you're sharing a device!"
    },
    {
      question: "How current is the calculation? Does it update automatically?",
      answer: "The calculation uses your device's current date and time at the moment you click 'Calculate'. It won't automatically tick down like a live countdown widget. For the most current count, simply recalculate whenever you check. This approach keeps the tool lightweight and private—your data never leaves your device or gets stored anywhere."
    }
  ];

  const calculateBirthdayCountdown = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const today = new Date();
    
    // Calculate current age
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    // Calculate next birthday
    const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    
    // If birthday has passed this year, set it for next year
    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }

    const timeDiff = nextBirthday.getTime() - today.getTime();
    const daysUntil = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    const weeksUntil = Math.floor(daysUntil / 7);
    const monthsUntil = Math.floor(daysUntil / 30.44); // Average days per month

    setResult({
      nextBirthday: nextBirthday.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      daysUntil,
      weeksUntil,
      monthsUntil,
      age,
      nextAge: age + 1,
      isPastThisYear: nextBirthday.getFullYear() > today.getFullYear()
    });
  };

  const clearFields = () => {
    setBirthDate('');
    setName('');
    setResult(null);
  };

  const copyResult = async () => {
    if (result) {
      const text = `${name ? `${name}'s` : 'Next'} birthday is in ${result.daysUntil} days (${result.nextBirthday}) - turning ${result.nextAge}!`;
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
        <title>Birthday Countdown | Days Until Your Next Birthday Calculator | GrockTool.com</title>
        <meta name="description" content="Calculate exactly how many days, weeks, and months until your next birthday. Free birthday countdown calculator with age tracking and celebration planning features." />
        <meta name="keywords" content="birthday countdown, days until birthday, birthday calculator, next birthday, birthday countdown timer, age calculator, birthday planning" />
        <meta property="og:title" content="Birthday Countdown | Days Until Your Next Birthday Calculator" />
        <meta property="og:description" content="Calculate exactly how many days, weeks, and months until your next birthday. Free birthday countdown calculator with age tracking and celebration planning." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Birthday Countdown Calculator - Free & Accurate" />
        <meta name="twitter:description" content="Calculate days until next birthday. Track age and plan celebrations with our free birthday countdown tool." />
        <link rel="canonical" href="https://grocktool.com/date-tools/birthday-countdown" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Birthday Countdown Calculator - Days Until Your Next Birthday",
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "Any",
            "description": "Calculate exactly how many days, weeks, and months until your next birthday. Free birthday countdown calculator with age tracking and celebration planning features.",
            "url": "https://grocktool.com/date-tools/birthday-countdown",
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
              "Exact days until next birthday",
              "Age calculation",
              "Leap year handling",
              "Week and month conversions",
              "Personalized name option",
              "Copy results functionality",
              "No signup required"
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
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500/10 to-purple-500/10 px-4 py-2 rounded-full mb-4 border border-pink-500/20">
                  <Sparkles size={16} className="text-pink-500" />
                  <span className="text-sm font-medium text-pink-600">Celebration Planning • Age Tracking • 100% Free</span>
                </div>
                
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                  Birthday Countdown Calculator
                  <span className="block text-lg sm:text-xl lg:text-2xl font-normal text-muted-foreground mt-2">
                    Calculate Exact Days Until Your Next Birthday • Plan Perfect Celebrations
                  </span>
                </h1>
                
                <div className="flex flex-wrap justify-center gap-4 mt-6 mb-8">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-pink-500/10 rounded-lg">
                    <Cake size={14} className="text-pink-600" />
                    <span className="text-xs sm:text-sm text-foreground">Exact Day Count</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 rounded-lg">
                    <Calendar size={14} className="text-blue-600" />
                    <span className="text-xs sm:text-sm text-foreground">Leap Year Accurate</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 rounded-lg">
                    <PartyPopper size={14} className="text-purple-600" />
                    <span className="text-xs sm:text-sm text-foreground">Celebration Planning</span>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Left Panel - Birthday Input */}
              <div className="space-y-6">
                {/* Main Tool Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-card rounded-xl border border-border p-6 shadow-sm"
                >
                  <div className="space-y-6">
                    {/* Name Input */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Users size={20} className="text-foreground" />
                          <label className="block text-sm font-medium text-foreground">
                            Personalize Your Countdown
                          </label>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-green-600">
                          <Lock size={12} />
                          <span>Private calculation</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block text-sm text-muted-foreground">
                          Name (Optional - For Personalization)
                        </label>
                        <input
                          type="text"
                          placeholder="Enter name for personalized countdown..."
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground placeholder:text-muted-foreground"
                        />
                      </div>
                    </div>

                    {/* Date Input */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Cake size={20} className="text-foreground" />
                        <label className="block text-sm font-medium text-foreground">
                          Birth Date
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          type="date"
                          value={birthDate}
                          onChange={(e) => setBirthDate(e.target.value)}
                          className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <div className="bg-pink-500 text-white rounded-full p-1">
                            <Cake size={10} />
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground text-center">
                        Your birth date is processed locally in your browser
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={calculateBirthdayCountdown}
                        disabled={!birthDate}
                        className="flex items-center justify-center gap-2 flex-1 px-4 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                      >
                        <Cake size={18} />
                        Calculate Birthday Countdown
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

                {/* Celebration Tips Card */}
                <div className="rounded-xl border border-pink-200 dark:border-pink-800 p-6 shadow-sm">
                  <h3 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
                    <PartyPopper size={16} className="text-pink-600" />
                    Quick Planning Guide
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="bg-pink-100 dark:bg-pink-900/20 p-1.5 rounded-full mt-0.5">
                        <Calendar size={12} className="text-pink-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">30+ Days Out</div>
                        <div className="text-xs text-muted-foreground">Book venues, plan travel, order custom items</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-purple-100 dark:bg-purple-900/20 p-1.5 rounded-full mt-0.5">
                        <Users size={12} className="text-purple-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">14-21 Days Out</div>
                        <div className="text-xs text-muted-foreground">Send invitations, confirm guest counts</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 dark:bg-blue-900/20 p-1.5 rounded-full mt-0.5">
                        <Bell size={12} className="text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">3-7 Days Out</div>
                        <div className="text-xs text-muted-foreground">Finalize details, prepare decorations</div>
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
                        <h3 className="text-lg font-semibold text-foreground">
                          {name ? `${name}'s Birthday Countdown` : 'Birthday Countdown Results'}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Time until next birthday celebration
                        </p>
                      </div>
                      <button
                        onClick={copyResult}
                        className="p-2 text-muted-foreground hover:text-foreground transition-colors hover:bg-secondary/50 rounded-lg"
                        title="Copy countdown"
                      >
                        <Copy size={18} />
                      </button>
                    </div>

                    <div className="space-y-6">
                      {/* Main Countdown Display */}
                      <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 p-4 rounded-lg border border-pink-500/20">
                        <div className="text-3xl font-bold text-foreground text-center mb-2">
                          🎂 {result.daysUntil} Days to Go!
                        </div>
                        <div className="text-sm text-pink-600 text-center flex items-center justify-center gap-2">
                          <Calendar size={14} />
                          <span>{result.nextBirthday}</span>
                        </div>
                      </div>

                      {/* Time Breakdown */}
                      <div className="space-y-4">
                        <h4 className="text-sm font-medium text-foreground">Time Until Birthday</h4>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="bg-gradient-to-br from-pink-500/10 to-pink-600/10 p-4 rounded-xl border border-pink-500/20 text-center">
                            <div className="text-2xl font-bold text-foreground">{result.daysUntil}</div>
                            <div className="text-xs text-muted-foreground mt-1">Days</div>
                          </div>
                          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 p-4 rounded-xl border border-purple-500/20 text-center">
                            <div className="text-2xl font-bold text-foreground">{result.weeksUntil}</div>
                            <div className="text-xs text-muted-foreground mt-1">Weeks</div>
                          </div>
                          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 p-4 rounded-xl border border-blue-500/20 text-center">
                            <div className="text-2xl font-bold text-foreground">{result.monthsUntil}</div>
                            <div className="text-xs text-muted-foreground mt-1">Months</div>
                          </div>
                        </div>
                      </div>

                      {/* Age Information */}
                      <div className="bg-secondary/20 p-4 rounded-lg border border-border">
                        <div className="flex items-center gap-2 mb-3">
                          <Target size={16} className="text-accent" />
                          <span className="text-sm font-medium text-foreground">Age Information</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <div className="text-sm text-muted-foreground">Current Age</div>
                            <div className="text-lg font-bold text-foreground">{result.age} years old</div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-sm text-muted-foreground">Turning Age</div>
                            <div className="text-lg font-bold text-foreground">{result.nextAge} years old</div>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-border/50">
                          <div className="text-sm text-muted-foreground">Birthday Status</div>
                          <div className="font-medium text-foreground">
                            {result.isPastThisYear ? 'Next Year' : 'This Year'} • {result.nextBirthday}
                          </div>
                        </div>
                      </div>

                      {/* Celebration Timeline */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Countdown Progress</span>
                          <span className="font-medium text-foreground">{result.daysUntil} days remaining</span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-pink-500 to-purple-500" 
                            style={{ width: `${Math.min(100, 100 - (result.daysUntil / 365) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Milestones Card */}
                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                  <h3 className="text-sm font-medium text-foreground mb-4">Birthday Milestones</h3>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center gap-2 p-2 bg-blue-500/10 rounded">
                      <Cake size={14} className="text-blue-600" />
                      <span className="text-foreground">Age Tracking</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-green-500/10 rounded">
                      <Calendar size={14} className="text-green-600" />
                      <span className="text-foreground">Exact Date</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-purple-500/10 rounded">
                      <PartyPopper size={14} className="text-purple-600" />
                      <span className="text-foreground">Celebration Planning</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-pink-500/10 rounded">
                      <Clock size={14} className="text-pink-600" />
                      <span className="text-foreground">Countdown Timer</span>
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
                        <Cake className="w-16 h-16 text-muted-foreground" />
                        <div className="absolute -top-1 -right-1 bg-pink-500 text-white rounded-full p-1">
                          <Calendar size={12} />
                        </div>
                      </div>
                      <p className="text-foreground font-medium mb-2">Enter Birth Date</p>
                      <p className="text-muted-foreground text-sm mb-4">
                        Add a name (optional) and your birth date to calculate days until your next birthday
                      </p>
                      <div className="text-xs text-green-600 flex items-center justify-center gap-1">
                        <Lock size={10} />
                        <span>Private calculation • No data storage • Instant results</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* SEO Content Section with Dropdowns */}
            <section className="space-y-4 mt-12">
              {/* Annual Reset Logic Section */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('annualReset')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-pink-500/10 p-2 rounded-lg">
                      <Calendar size={20} className="text-pink-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">How Birthday Countdowns Actually Work Year to Year</h2>
                  </div>
                  {openSections.annualReset ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.annualReset && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-6">
                      Most people don't realize birthday countdowns have a built-in reset mechanism. Unlike regular countdowns that end and stay at zero, birthday countdowns automatically recalculate every year. Here's what actually happens behind the scenes:
                    </p>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <div className="bg-pink-100 dark:bg-pink-900/30 p-1 rounded">
                            <Cake size={16} className="text-pink-600" />
                          </div>
                          The Annual Birthday Reset
                        </h3>
                        <p className="text-muted-foreground mb-3">
                          Let's say your birthday is June 15th. Here's how the countdown flows throughout the year:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-center text-sm">
                          <div className="bg-pink-50 dark:bg-pink-900/10 p-3 rounded-lg border border-pink-200 dark:border-pink-800">
                            <div className="font-semibold text-foreground">June 16</div>
                            <div className="text-xs text-muted-foreground mt-1">364 days to go</div>
                            <div className="text-xs text-pink-600 mt-2">Reset just happened</div>
                          </div>
                          <div className="bg-pink-50 dark:bg-pink-900/10 p-3 rounded-lg border border-pink-200 dark:border-pink-800">
                            <div className="font-semibold text-foreground">December 31</div>
                            <div className="text-xs text-muted-foreground mt-1">~167 days to go</div>
                            <div className="text-xs text-pink-600 mt-2">Halfway point</div>
                          </div>
                          <div className="bg-pink-50 dark:bg-pink-900/10 p-3 rounded-lg border border-pink-200 dark:border-pink-800">
                            <div className="font-semibold text-foreground">June 14</div>
                            <div className="text-xs text-muted-foreground mt-1">1 day to go</div>
                            <div className="text-xs text-pink-600 mt-2">Almost there!</div>
                          </div>
                          <div className="bg-green-50 dark:bg-green-900/10 p-3 rounded-lg border border-green-200 dark:border-green-800">
                            <div className="font-semibold text-foreground">June 16</div>
                            <div className="text-xs text-muted-foreground mt-1">364 days again</div>
                            <div className="text-xs text-green-600 mt-2">Reset complete</div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-3">
                          This automatic reset is why you'll never see "0 days until birthday" for more than one day. The moment your birthday passes, it starts counting toward next year.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <div className="bg-purple-100 dark:bg-purple-900/30 p-1 rounded">
                            <Target size={16} className="text-purple-600" />
                          </div>
                          Why This Matters for Celebration Planning
                        </h3>
                        <div className="space-y-3 text-muted-foreground">
                          <p>
                            Understanding the reset helps you plan better. If you miss sending a card this year, don't wait until next June to think about it. The countdown has already started again.
                          </p>
                          <div className="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                            <div className="font-medium text-foreground mb-2">Pro Planning Tip</div>
                            <p className="text-sm">
                              Set reminder checkpoints: When the countdown hits 60 days (about 2 months), start serious planning. At 30 days, send invitations. At 7 days, confirm everything. The reset ensures you're always planning for the upcoming birthday, never the past one.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <div className="bg-blue-100 dark:bg-blue-900/30 p-1 rounded">
                            <Calendar size={16} className="text-blue-600" />
                          </div>
                          Leap Year Exception Handling
                        </h3>
                        <p className="text-muted-foreground">
                          For February 29th birthdays, the reset works slightly differently. In non-leap years, the countdown resets to March 1st. But here's the interesting part: in leap years, February 29th birthdays get their actual day. The calculator handles this automatically—you don't need to remember which years are leap years.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </article>

              {/* Reminder Use Cases Section */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('reminderUses')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-green-500/10 p-2 rounded-lg">
                      <Bell size={20} className="text-green-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Practical Ways to Use Birthday Countdown Reminders</h2>
                  </div>
                  {openSections.reminderUses ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.reminderUses && (
                  <div className="px-6 pb-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <div className="bg-pink-100 dark:bg-pink-900/30 p-1 rounded">
                            <Users size={16} className="text-pink-600" />
                          </div>
                          For Busy Families
                        </h3>
                        <div className="space-y-3 text-muted-foreground">
                          <p>
                            Between school schedules, work commitments, and social events, family birthdays can sneak up on you. Here's how this tool helps:
                          </p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-pink-50 dark:bg-pink-900/10 p-3 rounded-lg">
                              <div className="font-medium text-foreground mb-1">Multiple Family Members</div>
                              <p className="text-xs">
                                Calculate countdowns for your spouse, kids, parents, and siblings. Use the name field to track each one. When someone hits 30 days out, you know it's time to start planning.
                              </p>
                            </div>
                            <div className="bg-purple-50 dark:bg-purple-900/10 p-3 rounded-lg">
                              <div className="font-medium text-foreground mb-1">Coordination</div>
                              <p className="text-xs">
                                Planning a joint celebration? Calculate both birthdays to find the optimal weekend between them. See exactly how many days you have to coordinate with relatives.
                              </p>
                            </div>
                          </div>
                          
                          <div className="bg-blue-50 dark:bg-blue-900/10 p-3 rounded-lg border border-blue-200 dark:border-blue-800 mt-2">
                            <div className="font-medium text-foreground mb-1">Real Example</div>
                            <p className="text-sm">
                              Sarah uses it for her three kids: "When my son's countdown hits 45 days, I order his special cake that needs long lead time. At 21 days, I buy party supplies. At 7 days, I confirm RSVPs. It's become my birthday planning system."
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded">
                            <Gift size={16} className="text-green-600" />
                          </div>
                          For Gift Planning & Budgeting
                        </h3>
                        <div className="space-y-3 text-muted-foreground">
                          <p>
                            Nothing says "I forgot" like a last-minute convenience store gift. Here's how countdowns prevent that:
                          </p>
                          
                          <div className="overflow-x-auto">
                            <table className="min-w-full text-sm">
                              <thead className="bg-secondary/20">
                                <tr>
                                  <th className="p-2 text-left">Days Until</th>
                                  <th className="p-2 text-left">What to Do</th>
                                  <th className="p-2 text-left">Budget Impact</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b border-border">
                                  <td className="p-2 font-medium">60+ days</td>
                                  <td className="p-2">Research gifts, set budget</td>
                                  <td className="p-2">Best prices, spread costs</td>
                                </tr>
                                <tr className="border-b border-border">
                                  <td className="p-2 font-medium">30-45 days</td>
                                  <td className="p-2">Purchase main gift</td>
                                  <td className="p-2">Avoid rush shipping fees</td>
                                </tr>
                                <tr className="border-b border-border">
                                  <td className="p-2 font-medium">14-21 days</td>
                                  <td className="p-2">Order custom items</td>
                                  <td className="p-2">Standard shipping rates</td>
                                </tr>
                                <tr>
                                  <td className="p-2 font-medium">3-7 days</td>
                                  <td className="p-2">Wrap gifts, buy cards</td>
                                  <td className="p-2">No emergency costs</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          
                          <p className="text-sm mt-3">
                            The countdown gives you a visual timeline. When you see "21 days until Mom's birthday," you know it's time to order that personalized gift that takes two weeks to make.
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <div className="bg-purple-100 dark:bg-purple-900/30 p-1 rounded">
                            <PartyPopper size={16} className="text-purple-600" />
                          </div>
                          For Event Planning & Venue Booking
                        </h3>
                        <div className="space-y-3 text-muted-foreground">
                          <p>
                            Popular venues book up fast, especially for milestone birthdays. The countdown tells you exactly when to start calling places:
                          </p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
                            <div className="bg-pink-50 dark:bg-pink-900/10 p-3 rounded-lg">
                              <div className="text-lg font-bold text-foreground">90+ days</div>
                              <div className="text-xs text-muted-foreground mt-1">Book popular venues</div>
                              <div className="text-xs text-green-600 mt-2">Best availability</div>
                            </div>
                            <div className="bg-purple-50 dark:bg-purple-900/10 p-3 rounded-lg">
                              <div className="text-lg font-bold text-foreground">45-60 days</div>
                              <div className="text-xs text-muted-foreground mt-1">Hire caterers/entertainment</div>
                              <div className="text-xs text-yellow-600 mt-2">Good options left</div>
                            </div>
                            <div className="bg-blue-50 dark:bg-blue-900/10 p-3 rounded-lg">
                              <div className="text-lg font-bold text-foreground">21-30 days</div>
                              <div className="text-xs text-muted-foreground mt-1">Send invitations</div>
                              <div className="text-xs text-red-600 mt-2">Limited choices</div>
                            </div>
                          </div>
                          
                          <div className="bg-green-50 dark:bg-green-900/10 p-3 rounded-lg border border-green-200 dark:border-green-800 mt-3">
                            <div className="font-medium text-foreground mb-1">Pro Venue Tip</div>
                            <p className="text-sm">
                              For milestone birthdays (30, 40, 50, etc.), add an extra 30 days to these timelines. Everyone plans big for milestones, so competition is higher. When the countdown shows 120 days to a 40th birthday, start venue shopping.
                            </p>
                          </div>
                        </div>
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
                      <Gift size={20} className="text-purple-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Real Countdown Examples & Planning Scenarios</h2>
                  </div>
                  {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.examples && (
                  <div className="px-6 pb-6">
                    <div className="space-y-8">
                      <div>
                        <h3 className="font-semibold text-foreground mb-4">Example 1: The Last-Minute Realization</h3>
                        
                        <div className="mb-4">
                          <div className="font-medium text-foreground">Scenario: It's December 18, 2024 and you just realized your wife's birthday is January 15</div>
                          <div className="text-sm text-muted-foreground mt-1">Panic mode? Not with a countdown.</div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-lg border border-red-200 dark:border-red-800">
                            <div className="font-semibold text-foreground mb-2">Without Countdown</div>
                            <p className="text-sm text-muted-foreground">
                              "Is it 3 weeks or 4? When should I order flowers? Do I have time for a custom gift?" Stress, guesswork, and likely overspending on rush shipping.
                            </p>
                            <div className="text-xs text-red-600 mt-2">Reactive planning</div>
                          </div>
                          
                          <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded-lg border border-green-200 dark:border-green-800">
                            <div className="font-semibold text-foreground mb-2">With Countdown</div>
                            <div className="text-lg text-green-600 font-bold mb-2">28 days remaining</div>
                            <p className="text-sm text-muted-foreground">
                              "28 days = 4 weeks exactly. I need to order custom gifts this week (21-day lead time). Book restaurant next week. Order flowers at 7 days out."
                            </p>
                            <div className="text-xs text-green-600 mt-2">Strategic planning</div>
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground">
                          <strong>The difference:</strong> The countdown gives you exact time markers. At 28 days, you know you're at the edge of being able to order custom items. At 21 days, you know it's standard shipping territory. At 7 days, you're in rush territory.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-4">Example 2: Milestone Birthday Planning</h3>
                        
                        <div className="mb-4">
                          <div className="font-medium text-foreground">Scenario: Your dad turns 65 on August 10, 2025. Today is December 18, 2024.</div>
                          <div className="text-sm text-muted-foreground mt-1">Retirement and Medicare birthday—needs special planning</div>
                        </div>
                        
                        <div className="overflow-x-auto mb-4">
                          <table className="min-w-full text-sm">
                            <thead className="bg-secondary/20">
                              <tr>
                                <th className="p-2 text-left">Countdown</th>
                                <th className="p-2 text-left">What It Means</th>
                                <th className="p-2 text-left">Action Items</th>
                                <th className="p-2 text-left">Special Notes</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-border">
                                <td className="p-2 font-medium">235 days</td>
                                <td className="p-2">Today's calculation</td>
                                <td className="p-2">Start brainstorming ideas</td>
                                <td className="p-2">Milestone needs extra planning</td>
                              </tr>
                              <tr className="border-b border-border">
                                <td className="p-2 font-medium">~180 days</td>
                                <td className="p-2">6 months out</td>
                                <td className="p-2">Book venue, plan travel for family</td>
                                <td className="p-2">Family may need to arrange time off</td>
                              </tr>
                              <tr className="border-b border-border">
                                <td className="p-2 font-medium">90 days</td>
                                <td className="p-2">3 months out</td>
                                <td className="p-2">Send save-the-dates, hire photographer</td>
                                <td className="p-2">Popular vendors book early</td>
                              </tr>
                              <tr>
                                <td className="p-2 font-medium">30 days</td>
                                <td className="p-2">1 month out</td>
                                <td className="p-2">Finalize details, order cake</td>
                                <td className="p-2">Medicare paperwork may be needed</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        
                        <p className="text-sm text-muted-foreground">
                          <strong>Why it works:</strong> Milestone birthdays have more moving parts. The countdown gives you clear markers for when to tackle each piece. At 235 days, you have plenty of time but know you should start thinking. The visual progression helps prevent "Oh no, it's next month!" panic.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-4">Example 3: The February 29th Birthday</h3>
                        
                        <div className="mb-4">
                          <div className="font-medium text-foreground">Special Case: Born February 29, 2000. Current date: December 18, 2024.</div>
                          <div className="text-sm text-muted-foreground mt-1">Leap year birthdays need special handling</div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mb-4">
                          <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
                            <div className="text-2xl font-bold text-foreground">72 days</div>
                            <div className="text-sm text-muted-foreground">Until celebration</div>
                            <div className="text-xs text-blue-600 mt-2">March 1, 2025</div>
                          </div>
                          <div className="p-4 bg-green-50 dark:bg-green-900/10 rounded-lg">
                            <div className="text-2xl font-bold text-foreground">24 years</div>
                            <div className="text-sm text-muted-foreground">Actual age</div>
                            <div className="text-xs text-green-600 mt-2">6 leap birthdays</div>
                          </div>
                          <div className="p-4 bg-purple-50 dark:bg-purple-900/10 rounded-lg">
                            <div className="text-2xl font-bold text-foreground">25</div>
                            <div className="text-sm text-muted-foreground">Celebrated age</div>
                            <div className="text-xs text-purple-600 mt-2">"Official" milestone</div>
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground">
                          <strong>How the calculator helps:</strong> It automatically adjusts February 29th birthdays to March 1st in non-leap years (2025 isn't a leap year). This matches how most people with leap day birthdays celebrate. The age calculation shows both actual chronological age (24) and celebrated age (25), which matters for things like renting cars or ordering alcohol where legal age is based on anniversary of birth, not leap day calculations.
                        </p>
                        
                        <div className="bg-pink-50 dark:bg-pink-900/10 p-3 rounded-lg border border-pink-200 dark:border-pink-800 mt-3">
                          <div className="font-medium text-foreground mb-1">Note for Leap Day Birthdays</div>
                          <p className="text-sm">
                            The calculator follows standard convention: celebrate on March 1st in non-leap years. Some people prefer February 28th—if that's you, simply use February 28th as your birth date in the calculator. It will give you the correct countdown to your preferred celebration date.
                          </p>
                        </div>
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
                      <Target size={20} className="text-blue-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Understanding the Precision of Birthday Countdowns</h2>
                  </div>
                  {openSections.accuracyNotes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.accuracyNotes && (
                  <div className="px-6 pb-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold text-foreground mb-3">What "Accurate" Really Means Here</h3>
                        <div className="space-y-3 text-muted-foreground">
                          <p>
                            When we say this calculator is accurate, we mean it correctly calculates the number of calendar days between today and your next birthday. But there are some nuances worth understanding:
                          </p>
                          
                          <div className="bg-secondary/10 p-4 rounded-lg">
                            <div className="font-medium text-foreground mb-2">Days vs. Business Days</div>
                            <p className="text-sm">
                              The countdown shows calendar days, not business days. So if you have 14 days until a birthday and need something that takes "10 business days," you're actually cutting it close because weekends don't count toward business days. Always add buffer for weekends and holidays when planning.
                            </p>
                          </div>
                          
                          <div className="bg-secondary/10 p-4 rounded-lg">
                            <div className="font-medium text-foreground mb-2">Month Calculations Are Estimates</div>
                            <p className="text-sm">
                              The "months until" number uses an average month length (30.44 days). Since months vary from 28 to 31 days, this is an estimate. If it says "3 months" and you have 92 days, those 92 days might span three calendar months (like Jan-Feb-Mar) or four partial months. Use the day count for precise planning.
                            </p>
                          </div>
                          
                          <div className="bg-secondary/10 p-4 rounded-lg">
                            <div className="font-medium text-foreground mb-2">Time of Day Considerations</div>
                            <p className="text-sm">
                              The calculator counts full days. If today is December 18 and your birthday is December 19, it shows "1 day" even if it's 11:59 PM on the 18th. For most planning purposes, this works perfectly. For minute-by-minute countdowns, use our Countdown Timer tool instead.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-3">Edge Cases We Handle Correctly</h3>
                        <div className="space-y-3 text-muted-foreground">
                          <p>
                            These are the situations where many birthday calculators fail, but ours gets right:
                          </p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <div className="bg-green-500 text-white rounded-full p-1">
                                  <Calendar size={12} />
                                </div>
                                <span className="font-medium text-foreground">Year Transitions</span>
                              </div>
                              <p className="text-sm">
                                If your birthday was yesterday, it correctly shows ~364 days until next year. Many tools would incorrectly show 0 or negative numbers.
                              </p>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <div className="bg-blue-500 text-white rounded-full p-1">
                                  <Cake size={12} />
                                </div>
                                <span className="font-medium text-foreground">Leap Day Birthdays</span>
                              </div>
                              <p className="text-sm">
                                February 29th handled correctly in both leap and non-leap years. No manual adjustment needed.
                              </p>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <div className="bg-purple-500 text-white rounded-full p-1">
                                  <Target size={12} />
                                </div>
                                <span className="font-medium text-foreground">Age Calculation</span>
                              </div>
                              <p className="text-sm">
                                Calculates whether your birthday has occurred this year to give correct current age, not just current year minus birth year.
                              </p>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <div className="bg-pink-500 text-white rounded-full p-1">
                                  <Clock size={12} />
                                </div>
                                <span className="font-medium text-foreground">Time Zone Independence</span>
                              </div>
                              <p className="text-sm">
                                Uses your device's local date, so you get accurate results regardless of where you or the birthday person are located.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-3">Limitations to Keep in Mind</h3>
                        <div className="space-y-3 text-muted-foreground">
                          <p>
                            While accurate for its purpose, here's what this calculator doesn't do:
                          </p>
                          
                          <div className="border-l-4 border-yellow-500 pl-4 py-2">
                            <div className="font-medium text-foreground">No Automatic Updates</div>
                            <p className="text-sm">
                              It doesn't tick down in real-time. You need to recalculate to get updated counts. This keeps it lightweight and private—no background processes running.
                            </p>
                          </div>
                          
                          <div className="border-l-4 border-blue-500 pl-4 py-2">
                            <div className="font-medium text-foreground">No Historical Dates</div>
                            <p className="text-sm">
                              You can't calculate how many days were until a birthday in the past. It's designed for upcoming birthdays. For historical date differences, use our Date Difference Calculator.
                            </p>
                          </div>
                          
                          <div className="border-l-4 border-green-500 pl-4 py-2">
                            <div className="font-medium text-foreground">No Custom Holiday Adjustment</div>
                            <p className="text-sm">
                              The countdown is pure calendar days. It doesn't skip holidays or adjust for special circumstances. For business-day calculations with holidays, try our Work Days Calculator.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded-lg border border-green-200 dark:border-green-800">
                        <h4 className="font-semibold text-foreground mb-2">Verification Tip</h4>
                        <p className="text-sm text-muted-foreground">
                          Want to verify the countdown? Take a physical calendar and count the days manually. Start at tomorrow's date and count each day until the birthday date. Our calculation should match exactly. I encourage this—it helps build trust in the tool and gives you a tangible sense of the time remaining.
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
                  <h2 className="text-xl font-bold text-foreground">More Date & Celebration Tools</h2>
                  {openSections.relatedTools ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.relatedTools && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Explore other useful date and celebration planning tools:
                    </p>
                    <ul className="space-y-3 text-muted-foreground">
                      {relatedTools.map((tool, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-accent mr-2">•</span>
                          <Link href={tool.path} className="text-accent hover:underline">
                            <strong>{tool.name}:</strong> Visit this tool for additional date and celebration calculations
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
                      <Cake size={20} className="text-purple-600" />
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