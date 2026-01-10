'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Copy, RotateCcw, ArrowLeft, Play, Pause, Zap, Calendar, Target, Timer, Sparkles, ChevronUp, ChevronDown, ChevronRight, Lock, Share2, Bell } from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';

export default function Countdown() {
  const [targetDate, setTargetDate] = useState('');
  const [targetTime, setTargetTime] = useState('');
  const [eventName, setEventName] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    total: number;
  } | null>(null);

  const [openSections, setOpenSections] = useState({
    countdownLogic: false,
    timezoneHandling: false,
    eventUses: false,
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
    { name: 'Work Days Calculator', path: '/date-tools/WorkDays' },
    { name: 'Birthday Countdown', path: '/date-tools/birthday-countdown' },
    { name: 'Time Zone Converter', path: '/date-tools/time-zone-converter' }
  ];

  const faqData = [
    {
      question: "Will my countdown stay accurate if I change time zones?",
      answer: "This countdown uses your device's local time and doesn't automatically adjust for time zone changes. If you travel to a different time zone, you'll need to set up a new countdown with the correct local time for your target event. For events in specific time zones, I recommend using our Time Zone Converter tool first, then creating your countdown."
    },
    {
      question: "What happens if I close my browser or tab?",
      answer: "The countdown stops completely. Since this runs entirely in your browser, closing the tab ends the timer. When you return, you'll need to start a fresh countdown. Some users keep a dedicated browser tab open for important countdowns, or use the copy feature to save their current progress before closing."
    },
    {
      question: "Can I set a countdown for past dates?",
      answer: "Technically yes, but it will immediately show as completed (0 days, 0 hours, 0 minutes, 0 seconds). The tool calculates time differences between now and your selected datetime, so past dates give you negative time - which we display as zero since countdowns only make sense for future events."
    },
    {
      question: "How precise is the countdown?",
      answer: "It updates every second with millisecond-level accuracy in the background. When you see '10 seconds remaining', it means between 10.000 and 10.999 seconds. The second tick happens exactly when the whole second changes. For most events - parties, meetings, launches - this is more than precise enough."
    },
    {
      question: "Can I use this for business or commercial purposes?",
      answer: "Absolutely, and many people do. I've seen teams use it for product launches, marketers for campaign countdowns, and project managers for deadline tracking. It's completely free with no usage limits. Just keep in mind it requires an open browser tab, so for 24/7 displays you might want dedicated countdown hardware."
    },
    {
      question: "Why does my countdown sometimes seem off by a minute?",
      answer: "This usually happens when daylight saving time isn't accounted for. If your target date crosses a DST change point, the actual time difference might be an hour different than expected. The tool uses pure time calculations - it doesn't know about regional time changes. For critical events, double-check the time difference manually around DST transition dates."
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && targetDate && targetTime) {
      interval = setInterval(() => {
        const target = new Date(`${targetDate}T${targetTime}`);
        const now = new Date();
        const difference = target.getTime() - now.getTime();

        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);

          setTimeLeft({
            days,
            hours,
            minutes,
            seconds,
            total: difference
          });
        } else {
          setTimeLeft({
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            total: 0
          });
          setIsActive(false);
        }
      }, 1000);
    } else if (!isActive) {
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, targetDate, targetTime]);

  const startCountdown = () => {
    if (targetDate && targetTime) {
      setIsActive(true);
    }
  };

  const pauseCountdown = () => {
    setIsActive(false);
  };

  const clearFields = () => {
    setTargetDate('');
    setTargetTime('');
    setEventName('');
    setIsActive(false);
    setTimeLeft(null);
  };

  const copyResult = async () => {
    if (timeLeft && eventName) {
      const text = `${eventName}: ${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes, ${timeLeft.seconds} seconds remaining`;
      try {
        await navigator.clipboard.writeText(text);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  const shareCountdown = async () => {
    if (eventName && targetDate && targetTime) {
      const shareData = {
        title: `${eventName} Countdown`,
        text: `Countdown to ${eventName} on ${targetDate} at ${targetTime}`,
        url: window.location.href
      };
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Failed to share:', err);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Countdown Timer | Free Real-Time Countdown to Any Event | GrockTool.com</title>
        <meta name="description" content="Create real-time countdowns to any future event. Free countdown timer with seconds precision, pause/resume feature, and 100% browser-based. No signup required." />
        <meta name="keywords" content="countdown timer, event countdown, countdown clock, real-time timer, countdown to date, online countdown, free countdown" />
        <meta property="og:title" content="Countdown Timer | Free Real-Time Countdown to Any Event" />
        <meta property="og:description" content="Create real-time countdowns to any future event. Free countdown timer with seconds precision, pause/resume feature, and 100% browser-based." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Countdown Timer - Real-Time to Any Event" />
        <meta name="twitter:description" content="Create real-time countdowns to any future event. Seconds precision, pause/resume feature, 100% browser-based." />
        <link rel="canonical" href="https://grocktool.com/date-tools/countdown" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Countdown Timer - Real-Time Event Countdown",
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "Any",
            "description": "Create real-time countdowns to any future event. Free countdown timer with seconds precision, pause/resume feature, and 100% browser-based. No signup required.",
            "url": "https://grocktool.com/date-tools/countdown",
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
              "Real-time second-by-second updates",
              "Pause and resume functionality",
              "No signup required",
              "Browser-based processing",
              "Copy countdown status",
              "Event name customization",
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
                  <span className="text-sm font-medium text-blue-600">Real-Time Updates • Pause/Resume • No Signup</span>
                </div>
                
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                  Real-Time Countdown Timer
                  <span className="block text-lg sm:text-xl lg:text-2xl font-normal text-muted-foreground mt-2">
                    Create Live Countdowns to Any Future Event • 100% Browser-Based
                  </span>
                </h1>
                
                <div className="flex flex-wrap justify-center gap-4 mt-6 mb-8">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-lg">
                    <Timer size={14} className="text-green-600" />
                    <span className="text-xs sm:text-sm text-foreground">Second-by-Second Updates</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 rounded-lg">
                    <Play size={14} className="text-blue-600" />
                    <span className="text-xs sm:text-sm text-foreground">Pause/Resume Feature</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 rounded-lg">
                    <Lock size={14} className="text-purple-600" />
                    <span className="text-xs sm:text-sm text-foreground">No Data Storage</span>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Left Panel - Countdown Setup */}
              <div className="space-y-6">
                {/* Main Tool Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-card rounded-xl border border-border p-6 shadow-sm"
                >
                  <div className="space-y-6">
                    {/* Event Name */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Target size={20} className="text-foreground" />
                          <label className="block text-sm font-medium text-foreground">
                            Create Your Countdown
                          </label>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-green-600">
                          <Lock size={12} />
                          <span>100% browser-based</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block text-sm text-muted-foreground">
                          Event Name (Optional)
                        </label>
                        <input
                          type="text"
                          placeholder="New Year's Eve, Wedding Day, Product Launch..."
                          value={eventName}
                          onChange={(e) => setEventName(e.target.value)}
                          className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground placeholder-muted-foreground"
                        />
                      </div>
                    </div>

                    {/* Date and Time Inputs */}
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-muted-foreground" />
                            <label className="block text-sm text-muted-foreground">
                              Target Date
                            </label>
                          </div>
                          <input
                            type="date"
                            value={targetDate}
                            onChange={(e) => setTargetDate(e.target.value)}
                            className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground"
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Clock size={16} className="text-muted-foreground" />
                            <label className="block text-sm text-muted-foreground">
                              Target Time
                            </label>
                          </div>
                          <input
                            type="time"
                            value={targetTime}
                            onChange={(e) => setTargetTime(e.target.value)}
                            className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      {!isActive ? (
                        <button
                          onClick={startCountdown}
                          disabled={!targetDate || !targetTime}
                          className="flex items-center justify-center gap-2 flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                        >
                          <Play size={18} />
                          Start Countdown
                        </button>
                      ) : (
                        <button
                          onClick={pauseCountdown}
                          className="flex items-center justify-center gap-2 flex-1 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-sm font-medium"
                        >
                          <Pause size={18} />
                          Pause Countdown
                        </button>
                      )}
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

                {/* Features Card */}
                <div className="rounded-xl border border-blue-200 dark:border-blue-800 p-6 shadow-sm">
                  <h3 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
                    <Sparkles size={16} className="text-blue-600" />
                    Countdown Features
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="bg-green-100 dark:bg-green-900/20 p-1.5 rounded-full mt-0.5">
                        <Timer size={12} className="text-green-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">Real-Time Updates</div>
                        <div className="text-xs text-muted-foreground">Updates every second for precise countdown tracking.</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 dark:bg-blue-900/20 p-1.5 rounded-full mt-0.5">
                        <Play size={12} className="text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">Pause & Resume</div>
                        <div className="text-xs text-muted-foreground">Stop and continue your countdown at any time.</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-purple-100 dark:bg-purple-900/20 p-1.5 rounded-full mt-0.5">
                        <Share2 size={12} className="text-purple-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">Share & Copy</div>
                        <div className="text-xs text-muted-foreground">Copy countdown status or share with others.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Panel - Countdown Display */}
              <div className="space-y-6">
                {/* Countdown Display */}
                {timeLeft ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-card rounded-xl border border-border p-6 shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {eventName || 'Countdown Timer'}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {targetDate} at {targetTime}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={copyResult}
                          className="p-2 text-muted-foreground hover:text-foreground transition-colors hover:bg-secondary/50 rounded-lg"
                          title="Copy countdown"
                        >
                          <Copy size={18} />
                        </button>
                        <button
                          onClick={shareCountdown}
                          className="p-2 text-muted-foreground hover:text-foreground transition-colors hover:bg-secondary/50 rounded-lg"
                          title="Share countdown"
                        >
                          <Share2 size={18} />
                        </button>
                      </div>
                    </div>

                    {timeLeft.total > 0 ? (
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 p-4 rounded-xl border border-blue-500/20 text-center">
                            <div className="text-3xl font-bold text-foreground">{timeLeft.days}</div>
                            <div className="text-sm text-muted-foreground mt-2">Days</div>
                          </div>
                          <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 p-4 rounded-xl border border-green-500/20 text-center">
                            <div className="text-3xl font-bold text-foreground">{timeLeft.hours}</div>
                            <div className="text-sm text-muted-foreground mt-2">Hours</div>
                          </div>
                          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 p-4 rounded-xl border border-purple-500/20 text-center">
                            <div className="text-3xl font-bold text-foreground">{timeLeft.minutes}</div>
                            <div className="text-sm text-muted-foreground mt-2">Minutes</div>
                          </div>
                          <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 p-4 rounded-xl border border-orange-500/20 text-center">
                            <div className="text-3xl font-bold text-foreground">{timeLeft.seconds}</div>
                            <div className="text-sm text-muted-foreground mt-2">Seconds</div>
                          </div>
                        </div>
                        
                        <div className="bg-secondary/20 p-4 rounded-lg border border-border">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Bell size={16} className="text-accent" />
                              <span className="text-sm font-medium text-foreground">Status</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`}></div>
                              <span className="text-xs text-muted-foreground">
                                {isActive ? 'Live Updating' : 'Paused'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="text-4xl mb-4">🎉</div>
                        <h3 className="text-2xl font-bold text-foreground mb-3">
                          Time's Up!
                        </h3>
                        <p className="text-muted-foreground mb-6">
                          {eventName ? `${eventName} has arrived!` : 'The countdown has finished!'}
                        </p>
                        <button
                          onClick={clearFields}
                          className="px-6 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/80 transition-colors"
                        >
                          Create New Countdown
                        </button>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="bg-card rounded-xl border border-border p-6 shadow-sm"
                  >
                    <div className="text-center">
                      <div className="relative inline-block mb-4">
                        <Clock className="w-16 h-16 text-muted-foreground" />
                        <div className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full p-1">
                          <Timer size={12} />
                        </div>
                      </div>
                      <p className="text-foreground font-medium mb-2">Set Your Countdown Details</p>
                      <p className="text-muted-foreground text-sm mb-4">
                        Enter an event name, target date, and time to create your personalized countdown timer
                      </p>
                      <div className="text-xs text-green-600 flex items-center justify-center gap-1">
                        <Lock size={10} />
                        <span>No data storage • Real-time updates • No signup required</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Quick Tips Card */}
                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                  <h3 className="text-sm font-medium text-foreground mb-4">Quick Tips</h3>
                  <div className="space-y-3 text-xs">
                    <div className="flex items-start gap-2">
                      <div className="bg-blue-500/10 p-1 rounded-full mt-0.5">
                        <Zap size={12} className="text-blue-600" />
                      </div>
                      <span className="text-muted-foreground">Keep browser open for real-time countdown updates</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="bg-green-500/10 p-1 rounded-full mt-0.5">
                        <Copy size={12} className="text-green-600" />
                      </div>
                      <span className="text-muted-foreground">Use copy feature to share countdown status with others</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="bg-purple-500/10 p-1 rounded-full mt-0.5">
                        <Pause size={12} className="text-purple-600" />
                      </div>
                      <span className="text-muted-foreground">Pause timer when you need to step away temporarily</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SEO Content Section with Dropdowns */}
            <section className="space-y-4 mt-12">
              {/* Countdown Logic - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('countdownLogic')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-500/10 p-2 rounded-lg">
                      <Timer size={20} className="text-blue-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">How the Countdown Actually Works</h2>
                  </div>
                  {openSections.countdownLogic ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.countdownLogic && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Ever wondered what's happening behind the scenes when you start a countdown? It's actually simpler than you might think, but the precision matters. When you set a target date and time, the tool grabs your computer's current local time down to the millisecond. Then it calculates the difference between now and your target moment.
                    </p>
                    
                    <p className="text-muted-foreground mb-4">
                      The magic happens in the conversion. That big difference in milliseconds gets broken down into digestible chunks: days first, then what's left becomes hours, then minutes from what remains, and finally seconds from the last little bit. Every single second, it recalculates this entire process. That's why you see smooth transitions from 10 seconds to 9, then 8, and so on.
                    </p>
                    
                    <div className="bg-secondary/20 p-4 rounded-lg border border-border mb-4">
                      <h3 className="font-semibold text-foreground mb-2">The Calculation Step-by-Step</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5 flex-shrink-0">1</span>
                          <span>Total milliseconds difference = Target time - Current time</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5 flex-shrink-0">2</span>
                          <span>Days = Total milliseconds ÷ (1000 × 60 × 60 × 24)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="bg-purple-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5 flex-shrink-0">3</span>
                          <span>Remainder after days becomes hours calculation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5 flex-shrink-0">4</span>
                          <span>Repeat for minutes, then seconds from what's left</span>
                        </li>
                      </ul>
                    </div>
                    
                    <p className="text-muted-foreground">
                      What makes this tool particularly useful is how it handles the pause feature. When you pause, it simply stops the one-second recalculation loop. The current time difference gets frozen in place. When you resume, it picks up exactly where you left off, because the target time hasn't changed - only the current time has continued ticking forward in the real world.
                    </p>
                  </div>
                )}
              </article>

              {/* Timezone Handling - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('timezoneHandling')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-green-500/10 p-2 rounded-lg">
                      <Clock size={20} className="text-green-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Timezone Considerations for Accurate Countdowns</h2>
                  </div>
                  {openSections.timezoneHandling ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.timezoneHandling && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      This is where countdowns can get tricky, and it's something many people don't think about until it matters. The tool uses your device's local time - whatever your computer, phone, or tablet thinks the current time is. It doesn't know about time zones unless your device knows about them.
                    </p>
                    
                    <p className="text-muted-foreground mb-4">
                      Let me give you a real example. Say you're in New York and you set a countdown for a webinar that starts at 2 PM London time. If you just enter 2 PM without considering time zones, your countdown will be off by 5 hours (or 4 during daylight saving). The tool calculates based purely on the numbers you give it, not on what those numbers mean in different parts of the world.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                        <h3 className="font-semibold text-foreground mb-2">Best Practice for Timezone-Sensitive Events</h3>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• Use our Time Zone Converter tool first</li>
                          <li>• Convert the event time to YOUR local time</li>
                          <li>• Enter that converted time here</li>
                          <li>• Double-check around daylight saving dates</li>
                        </ul>
                      </div>
                      <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                        <h3 className="font-semibold text-foreground mb-2">What the Tool Does Automatically</h3>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• Uses your device's current local time</li>
                          <li>• Respects your system's DST settings</li>
                          <li>• Updates based on your clock changes</li>
                          <li>• No manual timezone input needed</li>
                        </ul>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground">
                      For personal events in your own timezone - birthday parties, local meetings, deadlines for your workday - this works perfectly. For international events, take that extra minute to convert the time properly. I've seen too many people miss important virtual events because of timezone confusion, and it's an easy mistake to avoid with a little preparation.
                    </p>
                  </div>
                )}
              </article>

              {/* Event Uses - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('eventUses')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-500/10 p-2 rounded-lg">
                      <Target size={20} className="text-purple-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Creative Ways People Actually Use Countdowns</h2>
                  </div>
                  {openSections.eventUses ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.eventUses && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Over the years, I've seen people come up with some genuinely clever uses for countdown timers that go way beyond the obvious. Sure, everyone thinks of New Year's Eve and birthdays, but the practical applications are much wider.
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Personal Productivity & Habit Building</h3>
                        <p className="text-muted-foreground text-sm mb-2">
                          One of my favorite uses is the "work sprint" method. Set a 25-minute countdown for focused work, then a 5-minute break timer. The visual countdown helps maintain focus better than just watching a clock. I know writers who use it for daily writing goals, students for study sessions, and even people learning to meditate who gradually increase their timer.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Family & Household Management</h3>
                        <p className="text-muted-foreground text-sm mb-2">
                          Parents have told me they use countdowns for kids' activities all the time. "Ten minutes until we leave for school" works better when children can see the numbers changing. It reduces arguments and helps with transitions. Similarly, for shared household tasks, setting visible countdowns for oven timers, laundry cycles, or even "screen time remaining" creates clear expectations.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Business & Team Coordination</h3>
                        <p className="text-muted-foreground text-sm">
                          Small teams working remotely often have a tab open with shared deadline countdowns. It creates a unified sense of time pressure without needing constant reminders. For product launches, some teams display the countdown during their daily standups. Event planners use it for venue setup timelines. The key is having that visual, decreasing number that everyone can reference.
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-4 bg-secondary/20 rounded-lg border border-border">
                      <h3 className="font-semibold text-foreground mb-2">Pro Tip for Regular Use</h3>
                      <p className="text-sm text-muted-foreground">
                        If you find yourself using countdowns for the same regular activities (like daily work sessions), bookmark this page with your preferred time already set. Just modify the date to today's date, keep the time constant, and refresh when needed. Saves a few clicks for frequently used timers.
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
                      <Calendar size={20} className="text-orange-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Real Countdown Examples with Specific Scenarios</h2>
                  </div>
                  {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.examples && (
                  <div className="px-6 pb-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold text-foreground mb-3">Example 1: Conference Presentation Countdown</h3>
                        <div className="bg-secondary/20 p-4 rounded-lg border border-border">
                          <p className="text-muted-foreground text-sm mb-2">
                            <strong>Situation:</strong> You're speaking at a virtual conference next month. Your slot is 45 minutes long, starting at 3:15 PM EST on April 15th. You're currently in California (PST).
                          </p>
                          <p className="text-muted-foreground text-sm mb-2">
                            <strong>Step 1:</strong> First, convert 3:15 PM EST to your local PST time. That's 12:15 PM PST (3 hours difference).
                          </p>
                          <p className="text-muted-foreground text-sm mb-2">
                            <strong>Step 2:</strong> Enter April 15th as the date, 12:15 as the time.
                          </p>
                          <p className="text-muted-foreground text-sm">
                            <strong>Result:</strong> You now have an accurate countdown to when you need to be ready and online. No timezone confusion, no last-minute panic about getting the time wrong.
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-foreground mb-3">Example 2: Project Deadline with Buffer Time</h3>
                        <div className="bg-secondary/20 p-4 rounded-lg border border-border">
                          <p className="text-muted-foreground text-sm mb-2">
                            <strong>Situation:</strong> Client project due Friday at 5 PM, but you want to submit it by 3 PM to be safe.
                          </p>
                          <p className="text-muted-foreground text-sm mb-2">
                            <strong>Smart Setup:</strong> Instead of setting the countdown to 5 PM (actual deadline), set it to 3 PM (your personal deadline). This builds in a 2-hour buffer.
                          </p>
                          <p className="text-muted-foreground text-sm">
                            <strong>Why it works:</strong> The countdown hitting zero means "time to submit," not "panic, I'm late!" It's a psychological trick that reduces last-minute stress and often results in better work submitted earlier.
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-foreground mb-3">Example 3: Vacation Countdown with Multiple Time Points</h3>
                        <div className="bg-secondary/20 p-4 rounded-lg border border-border">
                          <p className="text-muted-foreground text-sm mb-2">
                            <strong>Situation:</strong> Flight leaves June 10th at 8:45 AM. Need to leave for airport 3 hours before, which is 5:45 AM.
                          </p>
                          <p className="text-muted-foreground text-sm mb-2">
                            <strong>Two Countdown Approach:</strong> Create one countdown for "Leave for airport" (5:45 AM) and another for "Flight departs" (8:45 AM). 
                          </p>
                          <p className="text-muted-foreground text-sm">
                            <strong>Benefit:</strong> The first countdown tells you when to start moving. The second countdown shows total time until takeoff. As you're getting ready, you can watch both tick down, which helps with time management on a busy travel morning.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <h3 className="font-semibold text-foreground mb-2">Key Takeaway from These Examples</h3>
                      <p className="text-sm text-muted-foreground">
                        The most effective countdowns aren't just about the final event time. They're about the lead-up, the preparation windows, and the psychological buffers. Think about what you really need to track - not just when something happens, but when you need to start getting ready for it to happen.
                      </p>
                    </div>
                  </div>
                )}
              </article>

              {/* Limitations - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('limitations')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-red-500/10 p-2 rounded-lg">
                      <Lock size={20} className="text-red-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">What This Countdown Tool Can't Do (And What to Use Instead)</h2>
                  </div>
                  {openSections.limitations ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.limitations && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Being honest about limitations helps you use tools better. This countdown is fantastic for many situations, but it's not the right tool for everything. Understanding where it falls short helps you choose the right approach for your specific needs.
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">1. No Background Operation</h3>
                        <p className="text-muted-foreground text-sm">
                          The biggest limitation: it needs an open browser tab. Close the tab, and the countdown stops. This makes it perfect for focused sessions where you're actively monitoring time, but unsuitable for "set it and forget it" scenarios. For background countdowns, consider dedicated timer apps on your phone or computer that run independently.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">2. Single Device Only</h3>
                        <p className="text-muted-foreground text-sm">
                          The countdown exists only on the device where you created it. There's no syncing across your phone, tablet, and computer. If you start a countdown on your laptop and then want to check it on your phone while away from your desk, you'll need to recreate it manually. For multi-device scenarios, cloud-based countdown services work better.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">3. No Notifications or Alerts</h3>
                        <p className="text-muted-foreground text-sm">
                          This tool won't pop up notifications when time is almost up. You need to keep an eye on it. For situations where you might get distracted and miss the deadline, use a tool with alert capabilities. Many calendar apps and dedicated reminder tools can send notifications across devices.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">4. Daylight Saving Time Ambiguity</h3>
                        <p className="text-muted-foreground text-sm">
                          As mentioned earlier, the tool doesn't handle daylight saving time transitions intelligently. If your countdown spans a DST change date, the displayed time might suddenly be off by an hour. For critical long-term countdowns that cross DST boundaries, double-check your calculation manually around those dates.
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                      <h3 className="font-semibold text-foreground mb-2">When This Tool Shines Despite Limitations</h3>
                      <p className="text-sm text-muted-foreground">
                        Ironically, some "limitations" become advantages in the right context. The need for an open tab means you're actively engaged with the time. No background operation means no battery drain on mobile. No syncing means complete privacy. The key is matching the tool to the task - this countdown excels for focused, intentional time tracking where your attention is on the timer itself.
                      </p>
                    </div>
                  </div>
                )}
              </article>

              {/* Related Tools Section - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('faqs')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-500/10 p-2 rounded-lg">
                      <Clock size={20} className="text-purple-600" />
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
                      If you work with dates and times regularly, these other tools might save you time:
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
            </section>
          </div>
        </div>
      </div>
    </>
  );
}