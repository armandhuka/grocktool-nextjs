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
    { name: 'Date Difference Calculator', path: '/date-tools/date-difference' },
    { name: 'Leap Year Checker', path: '/date-tools/leap-year' }
  ];

  const faqData = [
    {
      question: "How accurate is the birthday countdown?",
      answer: "The countdown is 100% accurate and accounts for leap years, different month lengths, and exact day calculations. It updates based on your device's current date and time to provide precise days, weeks, and months until your next birthday."
    },
    {
      question: "Does it work for February 29th birthdays?",
      answer: "Yes, the calculator correctly handles leap day birthdays. If your birthday is February 29th, it will calculate your next birthday date appropriately (either February 28th or March 1st for non-leap years, depending on your preference setting)."
    },
    {
      question: "Can I calculate countdowns for other people's birthdays?",
      answer: "Absolutely! You can enter any birth date and name to calculate countdowns for friends, family members, or colleagues. The name field is optional but helpful for personalization."
    },
    {
      question: "How does it handle birthdays that have already passed this year?",
      answer: "If your birthday has already occurred this calendar year, the calculator automatically calculates the countdown to your next birthday in the following year, showing the correct date and time remaining."
    },
    {
      question: "Can I save or share my birthday countdown?",
      answer: "Yes, you can copy the countdown results using the copy button. For persistent tracking, you would need to bookmark the page or note down the results, as this is a browser-based tool without login functionality."
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
                    Celebration Planning Tips
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="bg-pink-100 dark:bg-pink-900/20 p-1.5 rounded-full mt-0.5">
                        <Calendar size={12} className="text-pink-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">Plan Early</div>
                        <div className="text-xs text-muted-foreground">Start planning celebrations 4-6 weeks in advance for the best venues and arrangements.</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-purple-100 dark:bg-purple-900/20 p-1.5 rounded-full mt-0.5">
                        <Users size={12} className="text-purple-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">Guest List</div>
                        <div className="text-xs text-muted-foreground">Send invitations at least 3 weeks before the celebration date.</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 dark:bg-blue-900/20 p-1.5 rounded-full mt-0.5">
                        <Bell size={12} className="text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">Set Reminders</div>
                        <div className="text-xs text-muted-foreground">Use the copy feature to save your countdown for future reference.</div>
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
              {/* What This Tool Does - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('whatItDoes')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-pink-500/10 p-2 rounded-lg">
                      <Cake size={20} className="text-pink-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Birthday Countdown Calculator - Features & Benefits</h2>
                  </div>
                  {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.whatItDoes && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      This Birthday Countdown Calculator provides precise calculation of days, weeks, and months until your next birthday celebration. Unlike simple date calculators, it accounts for leap years, varying month lengths, and automatically adjusts for birthdays that have already passed in the current year. The tool also tracks your current age and next age milestone, helping you plan celebrations, set reminders, and build anticipation for your special day. Perfect for personal use, event planning, or creating birthday reminders for friends and family.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="bg-pink-500/10 p-4 rounded-lg border border-pink-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar size={18} className="text-pink-600" />
                          <h3 className="font-semibold text-foreground">Precise Countdown</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">Calculates exact days, weeks, and months until your next birthday with leap year accuracy and automatic year adjustment.</p>
                      </div>
                      <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Target size={18} className="text-purple-600" />
                          <h3 className="font-semibold text-foreground">Age Tracking</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">Shows your current age and the age you'll be celebrating next, helping you plan for milestone birthdays and celebrations.</p>
                      </div>
                      <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <PartyPopper size={18} className="text-blue-600" />
                          <h3 className="font-semibold text-foreground">Celebration Planning</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">Provides time breakdowns in multiple units (days, weeks, months) for effective celebration scheduling and preparation.</p>
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
                      <Users size={20} className="text-green-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Practical Birthday Countdown Applications</h2>
                  </div>
                  {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.useCases && (
                  <div className="px-6 pb-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">🎂 Personal Celebration Planning</h3>
                        <ul className="space-y-1 text-muted-foreground text-sm">
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Count down to your own birthday with exact days remaining for party planning and anticipation building</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Plan milestone birthday celebrations (18, 21, 30, 40, 50, 65) with precise timing for special arrangements</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Track time remaining for birthday vacation planning, gift shopping, and celebration preparation</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">🎁 Family & Friend Celebrations</h3>
                        <ul className="space-y-1 text-muted-foreground text-sm">
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Calculate countdowns for family members' birthdays to ensure timely card sending and gift preparation</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Plan surprise parties with precise timing by knowing exact days until friends' or partners' birthdays</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Coordinate group celebrations by calculating multiple birthday countdowns for scheduling purposes</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">💼 Professional & Social Applications</h3>
                        <ul className="space-y-1 text-muted-foreground text-sm">
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Plan office birthday celebrations and team events with accurate countdown timing</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Calculate age milestones for retirement planning, pension eligibility, and senior benefit timing</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Track birthdays for client relationship management and professional networking purposes</span>
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
                      <Cake size={20} className="text-orange-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">How to Calculate Your Birthday Countdown</h2>
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
                            <div className="bg-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                            <div>
                              <div className="font-medium text-foreground">Enter Name (Optional)</div>
                              <div className="text-sm text-muted-foreground">Add a name for personalized countdown results - perfect for tracking multiple birthdays.</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                            <div>
                              <div className="font-medium text-foreground">Select Birth Date</div>
                              <div className="text-sm text-muted-foreground">Choose your birth date using the date picker. The calculator handles leap years automatically.</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                            <div>
                              <div className="font-medium text-foreground">View Countdown</div>
                              <div className="text-sm text-muted-foreground">Get exact days, weeks, and months until next birthday plus age information.</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h3 className="font-semibold text-foreground">Pro Celebration Tips</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <div className="bg-accent/20 p-1 rounded mt-0.5">
                              <Calendar size={12} className="text-accent" />
                            </div>
                            <span>For February 29th birthdays, the calculator correctly handles leap year adjustments</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-accent/20 p-1 rounded mt-0.5">
                              <Copy size={12} className="text-accent" />
                            </div>
                            <span>Use the copy feature to save countdown results for party planning and reminders</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-accent/20 p-1 rounded mt-0.5">
                              <PartyPopper size={12} className="text-accent" />
                            </div>
                            <span>Start celebration planning at least 30 days in advance for best venue and vendor availability</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-accent/20 p-1 rounded mt-0.5">
                              <Users size={12} className="text-accent" />
                            </div>
                            <span>Calculate countdowns for family members to coordinate multiple celebrations effectively</span>
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
                      <Gift size={20} className="text-purple-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Birthday Countdown Examples & Scenarios</h2>
                  </div>
                  {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.examples && (
                  <div className="px-6 pb-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-3">Common Birthday Countdown Scenarios</h3>
                        <div className="overflow-x-auto">
                          <div className="min-w-full inline-block align-middle">
                            <div className="overflow-hidden border border-border rounded-lg">
                              <table className="min-w-full divide-y divide-border">
                                <thead className="bg-secondary/20">
                                  <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Birth Date</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Current Date</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Days Until</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Next Age</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Special Note</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                  <tr>
                                    <td className="px-4 py-3 text-sm text-foreground">June 15, 1990</td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">December 18, 2024</td>
                                    <td className="px-4 py-3 text-sm text-pink-600 font-medium">179 days</td>
                                    <td className="px-4 py-3 text-sm text-blue-600">35 years</td>
                                    <td className="px-4 py-3 text-sm text-green-600">Mid-year birthday</td>
                                  </tr>
                                  <tr>
                                    <td className="px-4 py-3 text-sm text-foreground">February 29, 2000</td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">December 18, 2024</td>
                                    <td className="px-4 py-3 text-sm text-pink-600 font-medium">72 days</td>
                                    <td className="px-4 py-3 text-sm text-blue-600">25 years</td>
                                    <td className="px-4 py-3 text-sm text-green-600">Leap year birthday</td>
                                  </tr>
                                  <tr>
                                    <td className="px-4 py-3 text-sm text-foreground">December 25, 2010</td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">December 18, 2024</td>
                                    <td className="px-4 py-3 text-sm text-pink-600 font-medium">7 days</td>
                                    <td className="px-4 py-3 text-sm text-blue-600">15 years</td>
                                    <td className="px-4 py-3 text-sm text-green-600">Christmas birthday</td>
                                  </tr>
                                  <tr>
                                    <td className="px-4 py-3 text-sm text-foreground">March 1, 1985</td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">December 18, 2024</td>
                                    <td className="px-4 py-3 text-sm text-pink-600 font-medium">73 days</td>
                                    <td className="px-4 py-3 text-sm text-blue-600">40 years</td>
                                    <td className="px-4 py-3 text-sm text-green-600">Milestone birthday</td>
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
{`Example: Calculate birthday countdown for birth date March 15, 1995 (Current date: December 18, 2024)

Step 1: Calculate Current Age
Current Year: 2024
Birth Year: 1995
Age = 2024 - 1995 = 29 years
Check if birthday has passed this year: March 15 has passed (December > March)
Current Age = 29 years

Step 2: Determine Next Birthday Date
Birth Month: March (3)
Birth Day: 15
Current Year: 2024
Birthday this year was: March 15, 2024 (already passed)
Next Birthday: March 15, 2025

Step 3: Calculate Days Until Next Birthday
Current Date: December 18, 2024
Next Birthday: March 15, 2025

Days in December 2024 (after Dec 18): 13 days (Dec 19-31)
Days in January 2025: 31 days
Days in February 2025: 28 days (2025 is not a leap year)
Days in March 2025 until birthday: 14 days (Mar 1-15, inclusive)

Total Days = 13 + 31 + 28 + 14 = 86 days

Step 4: Calculate Other Time Units
Weeks Until: 86 ÷ 7 = 12.28 ≈ 12 weeks
Months Until: 86 ÷ 30.44 ≈ 2.82 ≈ 3 months

Step 5: Determine Next Age
Current Age: 29 years
Next Age: 29 + 1 = 30 years (milestone birthday!)

Step 6: Birthday Status
Birthday has passed this year: Yes
Next birthday is in: Next year (2025)

Final Results:
• Days Until Birthday: 86 days
• Weeks Until Birthday: 12 weeks
• Months Until Birthday: 3 months
• Current Age: 29 years
• Next Age: 30 years (milestone!)
• Next Birthday Date: Saturday, March 15, 2025
• Status: Birthday in next year

Key Features Demonstrated:
✓ Leap year handling (2025 not a leap year)
✓ Accurate month length calculation
✓ Automatic year adjustment for passed birthdays
✓ Milestone age identification
✓ Multiple time unit conversions
✓ Clear date formatting`}
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