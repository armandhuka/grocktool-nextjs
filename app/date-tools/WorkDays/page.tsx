'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Copy, RotateCcw, ArrowLeft, Briefcase, CalendarDays, TrendingUp, BarChart, Sparkles, ChevronUp, ChevronDown, ChevronRight, Lock, Clock, Zap, Calculator } from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';

export default function WorkDays() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [result, setResult] = useState<{
    totalDays: number;
    workdays: number;
    weekends: number;
    percentage: number;
  } | null>(null);

  const [openSections, setOpenSections] = useState({
    workingDayRules: false,
    weekendLogic: false,
    officeUseCases: false,
    examples: false,
    limitations: false,
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
    { name: 'Age Calculator', path: '/date-tools/age-calculator' },
    { name: 'Countdown Timer', path: '/date-tools/countdown' },
    { name: 'Business Days Calculator', path: '/date-tools/business-days' },
    { name: 'Project Timeline Calculator', path: '/date-tools/project-timeline' }
  ];

  const faqData = [
    {
      question: "Why count Monday-Friday when some people work weekends?",
      answer: "We use Monday through Friday as the standard because that's what most businesses, governments, and organizations follow for official purposes. When we say 'work days,' we mean 'business days'—the days when offices are typically open and official business can be conducted. If you have a non-standard schedule, you'd need to adjust the results manually or use a custom work day calculator that lets you define your own work week."
    },
    {
      question: "What about public holidays—are they included?",
      answer: "No, this calculator doesn't automatically exclude public holidays. Here's why: holiday schedules vary dramatically by country, state, company, and even department. A bank holiday in the UK isn't a holiday in the US. Christmas might be a holiday for some businesses but not for hospitals. We give you the clean Monday-Friday count so you can subtract your specific holidays manually. It's more accurate than guessing which holidays to include."
    },
    {
      question: "Does 'including both dates' mean if I start and end on a Monday, that counts as one or two days?",
      answer: "It counts as one work day. When we say 'including both dates,' we mean if your range is Monday to Monday, we count that Monday once, not twice. Think of it like hotel nights: checking in Monday and checking out Monday means zero nights. Similarly, starting and ending on the same work day means one work day total. The calculator handles this correctly—you don't get double-counted days."
    },
    {
      question: "I need to calculate work days across multiple years. Does this handle leap years correctly?",
      answer: "Absolutely. The calculator works with actual calendar dates, not approximations. When you calculate from January 1, 2023 to January 1, 2024, it knows 2024 is a leap year and includes February 29 in the count if your range covers it. It tracks every single day's date and weekday, so leap years, varying month lengths, and year transitions are all handled precisely."
    },
    {
      question: "Can I use this for payroll calculations?",
      answer: "You can use it as a starting point, but check with your payroll department about their specific rules. Some companies pay for calendar days, some for work days, and some have special rules for months with holidays. This tool gives you the Monday-Friday count, which is often the basis for prorated salaries for new hires or departing employees. Just remember to subtract any company holidays from our result."
    },
    {
      question: "Why does the percentage sometimes show 71% instead of 70% or 72%?",
      answer: "Because 5 work days out of 7 calendar days is 5/7 = 71.42857%, which rounds to 71%. Over short periods, percentages can vary—a week that starts on Wednesday might have 3 work days out of 7 (43%), while one that starts on Monday has 5 out of 7 (71%). Over longer periods, it stabilizes around 71% because that's the true ratio of work days to total days in our Monday-Friday system."
    }
  ];

  const calculateWorkDays = () => {
    if (!startDate || !endDate) return;

    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start > end) return;

    let totalDays = 0;
    let workdays = 0;
    let weekends = 0;
    
    const currentDate = new Date(start);
    
    while (currentDate <= end) {
      totalDays++;
      const dayOfWeek = currentDate.getDay();
      
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        weekends++;
      } else {
        workdays++;
      }
      
      currentDate.setDate(currentDate.getDate() + 1);
    }

    const percentage = totalDays > 0 ? Math.round((workdays / totalDays) * 100) : 0;

    setResult({
      totalDays,
      workdays,
      weekends,
      percentage
    });
  };

  const clearFields = () => {
    setStartDate('');
    setEndDate('');
    setResult(null);
  };

  const copyResult = async () => {
    if (result) {
      const text = `Work Days Calculation:\nDate Range: ${new Date(startDate).toLocaleDateString()} - ${new Date(endDate).toLocaleDateString()}\nTotal Days: ${result.totalDays}\nWork Days: ${result.workdays}\nWeekend Days: ${result.weekends}\nWork Days Percentage: ${result.percentage}%`;
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
        <title>Work Days Calculator | Calculate Business Days Between Dates | GrockTool.com</title>
        <meta name="description" content="Calculate work days between two dates excluding weekends. Perfect for project planning, timeline estimation, and business scheduling. 100% free and accurate." />
        <meta name="keywords" content="work days calculator, business days calculator, working days, exclude weekends, project timeline, date calculator, work week calculator" />
        <meta property="og:title" content="Work Days Calculator | Calculate Business Days Between Dates" />
        <meta property="og:description" content="Calculate work days between two dates excluding weekends. Perfect for project planning, timeline estimation, and business scheduling." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Work Days Calculator - Exclude Weekends" />
        <meta name="twitter:description" content="Calculate business days between dates. Perfect for project planning and timeline estimation." />
        <link rel="canonical" href="https://grocktool.com/date-tools/work-days" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Work Days Calculator - Business Days Excluding Weekends",
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "Any",
            "description": "Calculate work days between two dates excluding weekends. Perfect for project planning, timeline estimation, and business scheduling. 100% free and accurate.",
            "url": "https://grocktool.com/date-tools/work-days",
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
              "Exclude Saturdays and Sundays",
              "Accurate day counting",
              "Percentage calculations",
              "No signup required",
              "Browser-based processing",
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
                  <span className="text-sm font-medium text-blue-600">Excludes Weekends • Project Planning • 100% Accurate</span>
                </div>
                
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                  Work Days Calculator
                  <span className="block text-lg sm:text-xl lg:text-2xl font-normal text-muted-foreground mt-2">
                    Calculate Business Days Between Dates • Exclude Saturdays & Sundays
                  </span>
                </h1>
                
                <div className="flex flex-wrap justify-center gap-4 mt-6 mb-8">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-lg">
                    <Briefcase size={14} className="text-green-600" />
                    <span className="text-xs sm:text-sm text-foreground">Monday-Friday Calculation</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 rounded-lg">
                    <CalendarDays size={14} className="text-blue-600" />
                    <span className="text-xs sm:text-sm text-foreground">Excludes Weekends</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 rounded-lg">
                    <BarChart size={14} className="text-purple-600" />
                    <span className="text-xs sm:text-sm text-foreground">Percentage Analysis</span>
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
                            Select Date Range for Work Days Calculation
                          </label>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-green-600">
                          <Calculator size={12} />
                          <span>Accurate calculation</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-muted-foreground" />
                            <label className="block text-sm text-muted-foreground">
                              Start Date
                            </label>
                          </div>
                          <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground"
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-muted-foreground" />
                            <label className="block text-sm text-muted-foreground">
                              End Date
                            </label>
                          </div>
                          <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={calculateWorkDays}
                        disabled={!startDate || !endDate}
                        className="flex items-center justify-center gap-2 flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                      >
                        <Calculator size={18} />
                        Calculate Work Days
                      </button>
                      <button
                        onClick={clearFields}
                        className="flex-1 sm:flex-none px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-sm font-medium"
                      >
                        <RotateCcw size={16} />
                        Clear All
                      </button>
                    </div>

                    {/* Quick Info */}
                    {startDate && endDate && (
                      <div className="bg-card rounded-xl border border-border p-4 shadow-sm">
                        <div className="grid grid-cols-2 gap-2 text-center">
                          <div className="p-2">
                            <div className="text-lg font-bold text-foreground">
                              {new Date(startDate).toLocaleDateString('en-US', { weekday: 'long' })}
                            </div>
                            <div className="text-xs text-muted-foreground">Start Day</div>
                          </div>
                          <div className="p-2">
                            <div className="text-lg font-bold text-foreground">
                              {new Date(endDate).toLocaleDateString('en-US', { weekday: 'long' })}
                            </div>
                            <div className="text-xs text-muted-foreground">End Day</div>
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
                    Why Use This Work Days Calculator?
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="bg-green-100 dark:bg-green-900/20 p-1.5 rounded-full mt-0.5">
                        <Briefcase size={12} className="text-green-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">Accurate Project Planning</div>
                        <div className="text-xs text-muted-foreground">Calculate exact work days for project timelines and deadlines.</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 dark:bg-blue-900/20 p-1.5 rounded-full mt-0.5">
                        <CalendarDays size={12} className="text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">Weekend Exclusion</div>
                        <div className="text-xs text-muted-foreground">Automatically excludes Saturdays and Sundays from calculations.</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-purple-100 dark:bg-purple-900/20 p-1.5 rounded-full mt-0.5">
                        <BarChart size={12} className="text-purple-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">Detailed Analysis</div>
                        <div className="text-xs text-muted-foreground">Get percentages and breakdowns for better resource planning.</div>
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
                        <h3 className="text-lg font-semibold text-foreground">Work Days Analysis</h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
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
                      {/* Main Work Days Display */}
                      <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                        <div className="text-2xl font-bold text-foreground text-center mb-2">
                          {result.workdays} Work Days
                        </div>
                        <div className="text-sm text-green-600 text-center flex items-center justify-center gap-2">
                          <Calculator size={14} />
                          <span>Excluding Saturdays & Sundays</span>
                        </div>
                      </div>

                      {/* Detailed Breakdown */}
                      <div className="space-y-4">
                        <h4 className="text-sm font-medium text-foreground">Detailed Breakdown</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 p-4 rounded-xl border border-blue-500/20 text-center">
                            <div className="text-2xl font-bold text-foreground">{result.totalDays}</div>
                            <div className="text-xs text-muted-foreground mt-1">Total Days</div>
                          </div>
                          <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 p-4 rounded-xl border border-green-500/20 text-center">
                            <div className="text-2xl font-bold text-foreground">{result.workdays}</div>
                            <div className="text-xs text-muted-foreground mt-1">Work Days</div>
                          </div>
                          <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 p-4 rounded-xl border border-orange-500/20 text-center">
                            <div className="text-2xl font-bold text-foreground">{result.weekends}</div>
                            <div className="text-xs text-muted-foreground mt-1">Weekend Days</div>
                          </div>
                          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 p-4 rounded-xl border border-purple-500/20 text-center">
                            <div className="text-2xl font-bold text-foreground">{result.percentage}%</div>
                            <div className="text-xs text-muted-foreground mt-1">Work Days %</div>
                          </div>
                        </div>
                      </div>

                      {/* Percentage Visualization */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Work Days: {result.workdays} days ({result.percentage}%)</span>
                          <span className="text-muted-foreground">Weekends: {result.weekends} days ({100 - result.percentage}%)</span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-green-500 to-green-600" 
                            style={{ width: `${result.percentage}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Date Range Info */}
                      <div className="bg-secondary/20 p-4 rounded-lg border border-border">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar size={16} className="text-accent" />
                          <span className="text-sm font-medium text-foreground">Date Range Details</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                          <div>
                            <div className="text-muted-foreground">Start Date</div>
                            <div className="font-medium text-foreground">{new Date(startDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">End Date</div>
                            <div className="font-medium text-foreground">{new Date(endDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
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
                      <Briefcase size={14} className="text-blue-600" />
                      <span className="text-foreground">Monday-Friday</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-green-500/10 rounded">
                      <CalendarDays size={14} className="text-green-600" />
                      <span className="text-foreground">Weekends Excluded</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-purple-500/10 rounded">
                      <BarChart size={14} className="text-purple-600" />
                      <span className="text-foreground">Percentage Analysis</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-orange-500/10 rounded">
                      <TrendingUp size={14} className="text-orange-600" />
                      <span className="text-foreground">Project Planning</span>
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
                        <Briefcase className="w-16 h-16 text-muted-foreground" />
                        <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-1">
                          <Calculator size={12} />
                        </div>
                      </div>
                      <p className="text-foreground font-medium mb-2">Select Date Range</p>
                      <p className="text-muted-foreground text-sm mb-4">
                        Choose start and end dates to calculate work days excluding weekends
                      </p>
                      <div className="text-xs text-green-600 flex items-center justify-center gap-1">
                        <Lock size={10} />
                        <span>Accurate calculations • No data storage • Instant results</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* SEO Content Section with Dropdowns */}
            <section className="space-y-4 mt-12">
              {/* Working Day Rules Section */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('workingDayRules')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-500/10 p-2 rounded-lg">
                      <Briefcase size={20} className="text-blue-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">What Counts as a "Work Day" in Our Calculation</h2>
                  </div>
                  {openSections.workingDayRules ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.workingDayRules && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      When we talk about "work days," we're specifically referring to Monday through Friday—the standard business week in most of the world. This isn't just arbitrary; it's based on how governments, banks, courts, and corporations actually operate. If you submit a document on Friday and need it processed in "5 business days," everyone understands that means Monday through Friday, excluding weekends.
                    </p>
                    
                    <div className="bg-secondary/20 p-4 rounded-lg mb-4">
                      <h3 className="font-semibold text-foreground mb-3">The Five Day Logic:</h3>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="bg-green-500/20 p-2 rounded-lg flex-shrink-0">
                            <CalendarDays size={16} className="text-green-600" />
                          </div>
                          <div>
                            <div className="font-medium text-foreground">Monday-Friday = Counted</div>
                            <div className="text-sm text-muted-foreground">These are your standard work days. If your date range includes a Thursday, that's one work day. If it includes five Mondays, that's five work days (assuming they fall within your range).</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-blue-500/20 p-2 rounded-lg flex-shrink-0">
                            <Briefcase size={16} className="text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium text-foreground">Both Dates Included</div>
                            <div className="text-sm text-muted-foreground">If you calculate from Monday to Wednesday, that's Monday, Tuesday, Wednesday = 3 work days. We include both the start and end dates, but don't double-count if they're the same day.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-purple-500/20 p-2 rounded-lg flex-shrink-0">
                            <Calculator size={16} className="text-purple-600" />
                          </div>
                          <div>
                            <div className="font-medium text-foreground">Calendar-Aware Counting</div>
                            <div className="text-sm text-muted-foreground">We don't just multiply weeks by 5. We actually check each day's date and weekday. This matters for partial weeks and ensures accuracy across month boundaries and leap years.</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Why This Standard Matters</h3>
                      <p className="text-muted-foreground">
                        You might work weekends or have a compressed schedule, but for official purposes—contracts, legal notices, project deadlines, government processing times—the Monday-Friday standard is what matters. When a contract says "30 business days," courts interpret that as 30 Mondays through Fridays. When your project timeline shows "10 work days," stakeholders expect 10 weekdays, not 10 calendar days. Using this standard ensures everyone's on the same page.
                      </p>
                      <p className="text-muted-foreground">
                        I learned this the hard way early in my career. I promised a client something in "5 days," thinking calendar days. They expected business days. That miscommunication cost us a week of goodwill. Now I always specify "business days" and use tools like this to be precise.
                      </p>
                    </div>
                  </div>
                )}
              </article>

              {/* Weekend & Holiday Logic Section */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('weekendLogic')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-green-500/10 p-2 rounded-lg">
                      <Calendar size={20} className="text-green-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">How We Handle Weekends (and Why We Don't Auto-Exclude Holidays)</h2>
                  </div>
                  {openSections.weekendLogic ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.weekendLogic && (
                  <div className="px-6 pb-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">The Weekend Exclusion Rule</h3>
                        <p className="text-muted-foreground mb-3">
                          Saturdays and Sundays are automatically excluded because they're non-working days almost everywhere. Even in countries where the weekend falls on different days (like Friday-Saturday in some Middle Eastern countries), the concept of "weekend days" as non-working days is universal. Our calculator assumes Saturday and Sunday as weekend days because that's the international business standard.
                        </p>
                        <div className="bg-blue-500/10 p-3 rounded border border-blue-500/20">
                          <div className="text-sm">
                            <div className="font-medium text-foreground">Technical detail:</div>
                            <div className="text-muted-foreground mt-1">In JavaScript (which powers this calculator), Sunday is day 0 and Saturday is day 6. So we exclude days where <code className="bg-secondary/50 px-1 rounded">getDay()</code> returns 0 or 6.</div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-2">The Holiday Dilemma</h3>
                        <p className="text-muted-foreground">
                          Here's where it gets interesting: we <em>don't</em> automatically exclude public holidays. Why? Because holiday schedules are incredibly local. Christmas might be a holiday in Christian-majority countries but not elsewhere. Banks have different holidays than schools. Some companies give the day after Thanksgiving off; others don't. Some countries have "bridge days" when a holiday falls on a Tuesday or Thursday.
                        </p>
                        <p className="text-muted-foreground mt-2">
                          If we tried to include holidays, we'd either have to ask you for your country, state, industry, and company—making the tool cumbersome—or we'd guess wrong. It's better to give you the clean Monday-Friday count and let you subtract your specific holidays manually. You know your schedule better than any calculator could.
                        </p>
                      </div>

                      <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                        <h3 className="font-semibold text-foreground mb-2">Practical Approach for Holidays</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-start gap-2">
                            <div className="bg-white/20 p-1 rounded mt-0.5">
                              <Calendar size={12} className="text-green-600" />
                            </div>
                            <div>
                              <div className="font-medium text-foreground">Step 1: Get our work day count</div>
                              <div className="text-muted-foreground">Use this calculator to get Monday-Friday days.</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="bg-white/20 p-1 rounded mt-0.5">
                              <Briefcase size={12} className="text-green-600" />
                            </div>
                            <div>
                              <div className="font-medium text-foreground">Step 2: List your holidays</div>
                              <div className="text-muted-foreground">Check your company calendar or government website.</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="bg-white/20 p-1 rounded mt-0.5">
                              <Calculator size={12} className="text-green-600" />
                            </div>
                            <div>
                              <div className="font-medium text-foreground">Step 3: Subtract holiday work days</div>
                              <div className="text-muted-foreground">If a holiday falls on a Monday-Friday, subtract it from our count.</div>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-3">
                          This manual approach might seem like extra work, but it's actually more accurate. I've seen projects derailed because someone used a calculator that included the wrong holidays.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </article>

              {/* Office Use Cases Section */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('officeUseCases')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-500/10 p-2 rounded-lg">
                      <TrendingUp size={20} className="text-orange-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Real Office Situations Where This Calculator Saves Time</h2>
                  </div>
                  {openSections.officeUseCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.officeUseCases && (
                  <div className="px-6 pb-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold text-foreground mb-3">📋 Project Management Reality Checks</h3>
                        <p className="text-muted-foreground mb-3">
                          I've managed enough projects to know the #1 mistake is assuming "30 days" means "30 work days." It doesn't. When a stakeholder says "I need this in a month," they often mean "by the end of next month," not "30 calendar days from now." But when you're building a timeline, you need the work day count.
                        </p>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span><strong>Resource allocation:</strong> If a task takes 40 hours of work, that's 5 work days (assuming 8-hour days). But if those 5 days span a weekend, the calendar duration is 7 days. This affects when you can assign the next task.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span><strong>Client expectations:</strong> "Two weeks" to a client might mean 10 work days. But if you start on Thursday, two calendar weeks later is 14 days later, which includes 2 weekends = only 8 work days. That mismatch causes problems.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span><strong>Dependency planning:</strong> Task B can't start until Task A finishes. If Task A ends Friday, Task B starts Monday (not Saturday). The calendar gap matters for critical path analysis.</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-3">💼 HR & Legal Compliance</h3>
                        <p className="text-muted-foreground mb-3">
                          In HR, precision matters. Get a calculation wrong, and you could underpay an employee or miss a legal deadline. I once helped an HR manager who was struggling to calculate prorated vacation for an employee leaving mid-month. They were trying to do it manually and kept getting different numbers.
                        </p>
                        <div className="bg-secondary/20 p-3 rounded">
                          <div className="text-foreground font-medium">The solution we found:</div>
                          <div className="text-muted-foreground mt-1">Calculate work days from the 1st to their last day, divide by total work days that month, multiply by their monthly vacation accrual. Our calculator gave them the work day count instantly, and the formula did the rest.</div>
                        </div>
                        <ul className="space-y-2 text-sm text-muted-foreground mt-3">
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span><strong>Notice periods:</strong> "Two weeks notice" typically means 10 work days, not 14 calendar days. If you resign on Tuesday, your last day is typically 10 work days later (which might be a Monday two weeks later).</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span><strong>Probation periods:</strong> "90-day probation" often means 90 work days, which is about 4.5 calendar months. That's a significant difference for performance review scheduling.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span><strong>Legal deadlines:</strong> Many regulations specify "business days" for responses. Missing by one day because you counted weekends can have real consequences.</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-3">📊 Reporting & Analysis</h3>
                        <p className="text-muted-foreground">
                          When I analyze team productivity, I don't look at calendar days—I look at work days. If Team A completed 20 tasks in January (23 work days) and Team B completed 20 tasks in February (20 work days), Team B was actually more productive per work day. The percentage breakdown our calculator provides helps with these comparisons. Seeing that 71% of days are work days helps set realistic expectations for what can be accomplished in any given period.
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
                      <Calculator size={20} className="text-purple-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Work Days Calculation Examples from Real Work</h2>
                  </div>
                  {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.examples && (
                  <div className="px-6 pb-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold text-foreground mb-3">Common Work Scenarios</h3>
                        <div className="overflow-x-auto">
                          <div className="min-w-full inline-block align-middle">
                            <div className="overflow-hidden border border-border rounded-lg">
                              <table className="min-w-full divide-y divide-border">
                                <thead className="bg-secondary/20">
                                  <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Situation</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Date Range</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Calendar Days</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Work Days</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">What People Often Get Wrong</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                  <tr>
                                    <td className="px-4 py-3 text-sm text-foreground">Q1 Planning Cycle</td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">Jan 1 - Mar 31</td>
                                    <td className="px-4 py-3 text-sm text-blue-600">90 days</td>
                                    <td className="px-4 py-3 text-sm text-green-600 font-medium">64 days</td>
                                    <td className="px-4 py-3 text-sm text-orange-600">Thinking "quarter = 90 days" when only ~64 are work days</td>
                                  </tr>
                                  <tr>
                                    <td className="px-4 py-3 text-sm text-foreground">New Hire Training</td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">Start Mon, 2 weeks</td>
                                    <td className="px-4 py-3 text-sm text-blue-600">14 days</td>
                                    <td className="px-4 py-3 text-sm text-green-600 font-medium">10 days</td>
                                    <td className="px-4 py-3 text-sm text-orange-600">Scheduling 14 days of training when only 10 are work days</td>
                                  </tr>
                                  <tr>
                                    <td className="px-4 py-3 text-sm text-foreground">Contract Review Period</td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">Given Fri, 5 business days</td>
                                    <td className="px-4 py-3 text-sm text-blue-600">7 days</td>
                                    <td className="px-4 py-3 text-sm text-green-600 font-medium">5 days</td>
                                    <td className="px-4 py-3 text-sm text-orange-600">Thinking deadline is Wednesday (5 days) when it's actually next Friday</td>
                                  </tr>
                                  <tr>
                                    <td className="px-4 py-3 text-sm text-foreground">Month-End Closing</td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">Last week of month</td>
                                    <td className="px-4 py-3 text-sm text-blue-600">7 days</td>
                                    <td className="px-4 py-3 text-sm text-green-600 font-medium">5 days</td>
                                    <td className="px-4 py-3 text-sm text-orange-600">Trying to complete month-end in 5 days but planning for 7</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">The "Starting on Thursday" Problem</h3>
                        <div className="bg-secondary/20 p-4 rounded-lg border border-border">
                          <div className="text-foreground font-medium mb-2">Scenario: You start a project on Thursday, November 1st</div>
                          <div className="text-muted-foreground mb-3">Client says: "Give me an update in 5 business days"</div>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <div className="bg-green-500/20 p-1 rounded">
                                <Calendar size={12} className="text-green-600" />
                              </div>
                              <span className="text-foreground"><strong>Incorrect thinking:</strong> "5 days from Thursday is Tuesday"</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="bg-blue-500/20 p-1 rounded">
                                <Calculator size={12} className="text-blue-600" />
                              </div>
                              <span className="text-foreground"><strong>Actual business days:</strong> Thu 1st (1), Fri 2nd (2), Mon 5th (3), Tue 6th (4), Wed 7th (5)</span>
                            </div>
                            <div className="text-muted-foreground mt-2">
                              The update is due Wednesday, November 7th—not Tuesday the 6th. That one-day difference matters when you're coordinating with teams and clients. Our calculator would show: Nov 1-7 = 7 calendar days, 5 work days. The visual breakdown makes the pattern clear.
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Year-End Calculation That Surprises People</h3>
                        <p className="text-muted-foreground">
                          Here's one that catches project managers off guard: Calculate work days from December 1 to December 31. Many assume "about 20 work days" because December has holidays. But our calculator shows 23 work days (in a typical year). The holidays are just a few days—most of December is regular work days. This realization helps with realistic year-end planning. You have almost as many work days in December as in October (typically 23 vs 23), just with different holiday interruptions.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </article>

              {/* Limitations Section */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('limitations')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-red-500/10 p-2 rounded-lg">
                      <Calendar size={20} className="text-red-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">What This Calculator Doesn't Do (And When to Use Something Else)</h2>
                  </div>
                  {openSections.limitations ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.limitations && (
                  <div className="px-6 pb-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Non-Standard Work Weeks</h3>
                        <p className="text-muted-foreground mb-3">
                          This tool assumes Monday-Friday. If you work Tuesday-Saturday, Sunday-Thursday, or any other pattern, you'll need to adjust the results manually. For example, if you work Tuesday through Saturday, you'd take our work day count, subtract Mondays (which we count as work days but you don't work), and add Saturdays (which we exclude but you work).
                        </p>
                        <div className="bg-secondary/20 p-3 rounded text-sm">
                          <div className="text-foreground">Alternative approach:</div>
                          <div className="text-muted-foreground mt-1">For complex schedules, consider using a spreadsheet where you can mark your specific work days and use formulas to count them. Some specialized project management tools also handle custom work weeks.</div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Half-Days and Partial Work Days</h3>
                        <p className="text-muted-foreground">
                          We count whole days. If your company has half-day Fridays or you're calculating for someone who works part-time, you'll need to adjust. A half-day Friday counts as 0.5 work days, not 1. Someone working 3 days a week might have those days spread across the week. Our calculator can't handle these fractional or partial patterns—it's designed for standard full-time schedules.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Time Zone Considerations for Global Teams</h3>
                        <p className="text-muted-foreground mb-3">
                          If you're working with teams across time zones, a "work day" might not align perfectly. When it's Friday in New York, it might already be Saturday in Sydney. For deadline calculations across time zones, you often need to use the most restrictive time zone (usually the earliest one) and then check what day it is there. Our calculator uses your local device time, which works for most situations but might need adjustment for global coordination.
                        </p>
                        <div className="bg-blue-500/10 p-3 rounded border border-blue-500/20">
                          <div className="text-sm text-muted-foreground">
                            <strong>Pro tip:</strong> When working with international teams, specify time zones in deadlines: "Close of business Friday EST" rather than just "Friday."
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Historical Date Quirks</h3>
                        <p className="text-muted-foreground">
                          For dates before the widespread adoption of the 5-day work week (which became standard in the early 20th century), our calculation might not reflect historical reality. If you're calculating work days for historical research—like how long it took to build something in the 1800s when 6-day work weeks were common—you'd need a different approach. This tool is designed for modern business contexts, not historical analysis.
                        </p>
                      </div>

                      <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                        <h3 className="font-semibold text-foreground mb-2">When This Calculator Is Perfect</h3>
                        <p className="text-muted-foreground">
                          Despite these limitations, this tool is exactly right for: project timelines in standard businesses, HR calculations for full-time employees, legal deadline estimations, contract duration planning, and any situation where you need to convert between calendar days and Monday-Friday business days. It does that one job very well.
                        </p>
                        <p className="text-muted-foreground mt-2">
                          I keep it bookmarked because it handles 90% of my work day calculation needs. For the other 10%, I use it as a starting point and adjust manually or with additional tools.
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
                  <h2 className="text-xl font-bold text-foreground">More Date & Business Tools</h2>
                  {openSections.relatedTools ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.relatedTools && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Work days are just one piece of business planning. These other tools might help with related calculations:
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
                                {tool.name.includes('Difference') && 'Calculate exact days between any dates'}
                                {tool.name.includes('Age') && 'Calculate precise ages for HR and documentation'}
                                {tool.name.includes('Countdown') && 'Track time remaining for deadlines and events'}
                                {tool.name.includes('Business Days') && 'More advanced business day calculations'}
                                {tool.name.includes('Project Timeline') && 'Plan complete project schedules'}
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
                      <Briefcase size={20} className="text-purple-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Common Questions About Work Day Calculations</h2>
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
                        <Calculator size={18} className="text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-foreground">Remember the 71% Rule</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            Over longer periods, about 71% of calendar days are work days (5 out of 7). This quick mental check helps validate our calculator's results. If you get 80% or 60%, double-check your date range—you might have included/excluded something incorrectly.
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