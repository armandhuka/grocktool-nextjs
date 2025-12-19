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
    { name: 'Age Calculator', path: '/date-tools/age-calculator' },
    { name: 'Work Days Calculator', path: '/date-tools/WorkDays' },
    { name: 'Birthday Countdown', path: '/date-tools/birthday-countdown' },
    { name: 'Time Zone Converter', path: '/date-tools/time-zone-converter' }
  ];

  const faqData = [
    {
      question: "How accurate is the countdown timer?",
      answer: "The countdown timer updates every second in real-time using your device's local time. It calculates the exact difference between current time and your target datetime with millisecond precision, ensuring accurate second-by-second updates."
    },
    {
      question: "Can I pause and resume the countdown?",
      answer: "Yes, you can pause the countdown at any time using the pause button. The timer will stop updating but retains all your settings. Click the start button to resume counting from where you left off."
    },
    {
      question: "Does the countdown work if I close my browser?",
      answer: "No, this is a browser-based countdown that requires the page to remain open. For persistent countdowns across sessions, consider bookmarking your countdown or using dedicated countdown apps."
    },
    {
      question: "Can I share my countdown with others?",
      answer: "Yes, you can copy the current countdown status using the copy icon in the results section. However, for real-time shared countdowns, all users need to set the same target datetime individually."
    },
    {
      question: "What happens when the countdown reaches zero?",
      answer: "The timer automatically stops and displays a celebration message indicating that your event time has arrived. You can then create a new countdown for another event."
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
              {/* What This Tool Does - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('whatItDoes')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-500/10 p-2 rounded-lg">
                      <Timer size={20} className="text-blue-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Real-Time Countdown Timer - Features & Benefits</h2>
                  </div>
                  {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.whatItDoes && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      This real-time countdown timer provides precise second-by-second tracking to any future event. Unlike static countdowns, it updates live every second, giving you accurate time remaining in days, hours, minutes, and seconds. The tool features pause/resume functionality, allowing you to temporarily stop the countdown and continue where you left off. Everything runs entirely in your browser—no data is stored on servers, ensuring complete privacy for your personal or professional events.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Timer size={18} className="text-blue-600" />
                          <h3 className="font-semibold text-foreground">Live Second Updates</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">Watches update precisely every second, providing real-time countdown accuracy for critical event timing.</p>
                      </div>
                      <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Play size={18} className="text-green-600" />
                          <h3 className="font-semibold text-foreground">Pause & Resume</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">Full control over your countdown with the ability to pause temporarily and resume exactly where you stopped.</p>
                      </div>
                      <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Lock size={18} className="text-purple-600" />
                          <h3 className="font-semibold text-foreground">100% Browser-Based</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">No server processing, no data storage. Your event details remain completely private on your device.</p>
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
                      <Target size={20} className="text-green-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Practical Countdown Applications</h2>
                  </div>
                  {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.useCases && (
                  <div className="px-6 pb-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">🎉 Personal Celebrations & Events</h3>
                        <ul className="space-y-1 text-muted-foreground text-sm">
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>New Year's Eve countdown with exact seconds to midnight celebrations</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Birthday and anniversary countdowns for personalized celebration planning</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Vacation and trip countdowns for travel excitement and preparation timelines</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">💼 Professional & Business Applications</h3>
                        <ul className="space-y-1 text-muted-foreground text-sm">
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Product launch countdowns for marketing campaigns and team coordination</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Project deadline tracking with precise time remaining for task management</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Meeting and webinar countdowns for participant coordination and preparation</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">📚 Educational & Special Occasions</h3>
                        <ul className="space-y-1 text-muted-foreground text-sm">
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Exam and test day countdowns for study planning and preparation timelines</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Holiday season countdowns for family events and festive preparations</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Sports event countdowns for game days, tournaments, and competition preparation</span>
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
                    <h2 className="text-xl font-bold text-foreground">How to Create Your Countdown</h2>
                  </div>
                  {openSections.howToUse ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.howToUse && (
                  <div className="px-6 pb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h3 className="font-semibold text-foreground">4-Step Countdown Setup</h3>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                            <div>
                              <div className="font-medium text-foreground">Name Your Event</div>
                              <div className="text-sm text-muted-foreground">Optionally enter an event name like "New Year's Party" or "Project Deadline" for personalization.</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                            <div>
                              <div className="font-medium text-foreground">Set Date & Time</div>
                              <div className="text-sm text-muted-foreground">Select your target date and precise time using the date picker and time selector.</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                            <div>
                              <div className="font-medium text-foreground">Start Countdown</div>
                              <div className="text-sm text-muted-foreground">Click "Start Countdown" to begin real-time tracking with second-by-second updates.</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">4</div>
                            <div>
                              <div className="font-medium text-foreground">Monitor & Control</div>
                              <div className="text-sm text-muted-foreground">Watch the live countdown, pause when needed, and copy results for sharing.</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h3 className="font-semibold text-foreground">Pro Tips for Best Results</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <div className="bg-accent/20 p-1 rounded mt-0.5">
                              <Timer size={12} className="text-accent" />
                            </div>
                            <span>Keep the browser tab open for uninterrupted real-time countdown updates</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-accent/20 p-1 rounded mt-0.5">
                              <Pause size={12} className="text-accent" />
                            </div>
                            <span>Use pause feature when stepping away to preserve accurate time tracking</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-accent/20 p-1 rounded mt-0.5">
                              <Copy size={12} className="text-accent" />
                            </div>
                            <span>Copy current countdown status regularly to share progress with team members</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-accent/20 p-1 rounded mt-0.5">
                              <Bell size={12} className="text-accent" />
                            </div>
                            <span>Set your device's time zone correctly for accurate countdown calculations</span>
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
                    <h2 className="text-xl font-bold text-foreground">Countdown Examples & Output</h2>
                  </div>
                  {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.examples && (
                  <div className="px-6 pb-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-3">Real-World Countdown Examples</h3>
                        <div className="overflow-x-auto">
                          <div className="min-w-full inline-block align-middle">
                            <div className="overflow-hidden border border-border rounded-lg">
                              <table className="min-w-full divide-y divide-border">
                                <thead className="bg-secondary/20">
                                  <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Event Name</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Target Date/Time</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Sample Output</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Use Case</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                  <tr>
                                    <td className="px-4 py-3 text-sm text-foreground">New Year 2025</td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">Jan 1, 2025 00:00</td>
                                    <td className="px-4 py-3 text-sm text-blue-600">15 days, 6 hours, 23 minutes, 45 seconds</td>
                                    <td className="px-4 py-3 text-sm text-green-600">Celebration Planning</td>
                                  </tr>
                                  <tr>
                                    <td className="px-4 py-3 text-sm text-foreground">Project Deadline</td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">Mar 15, 2025 17:00</td>
                                    <td className="px-4 py-3 text-sm text-blue-600">89 days, 8 hours, 15 minutes, 30 seconds</td>
                                    <td className="px-4 py-3 text-sm text-green-600">Work Management</td>
                                  </tr>
                                  <tr>
                                    <td className="px-4 py-3 text-sm text-foreground">Summer Vacation</td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">Jun 20, 2025 09:00</td>
                                    <td className="px-4 py-3 text-sm text-blue-600">186 days, 14 hours, 45 minutes, 12 seconds</td>
                                    <td className="px-4 py-3 text-sm text-green-600">Travel Planning</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Technical Countdown Calculation</h3>
                        <div className="bg-secondary/20 p-4 rounded-lg border border-border overflow-x-auto">
                          <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
{`Example: Countdown to December 31, 2024, 23:59:59 (Current: December 18, 2024, 14:30:00)

Step 1: Calculate Time Difference
Target DateTime: December 31, 2024, 23:59:59
Current DateTime: December 18, 2024, 14:30:00
Difference in milliseconds: 1,165,199,000 ms

Step 2: Convert to Days
Total Days: 1,165,199,000 ÷ (1000 × 60 × 60 × 24) = 13.48 days
Whole Days: 13 days

Step 3: Calculate Remaining Hours
Remaining after days: 1,165,199,000 - (13 × 24 × 60 × 60 × 1000) = 413,990,000 ms
Hours: 413,990,000 ÷ (1000 × 60 × 60) = 9.4 hours
Whole Hours: 9 hours

Step 4: Calculate Remaining Minutes
Remaining after hours: 413,990,000 - (9 × 60 × 60 × 1000) = 53,990,000 ms
Minutes: 53,990,000 ÷ (1000 × 60) = 53.3 minutes
Whole Minutes: 53 minutes

Step 5: Calculate Remaining Seconds
Remaining after minutes: 53,990,000 - (53 × 60 × 1000) = 590,000 ms
Seconds: 590,000 ÷ 1000 = 59 seconds

Final Countdown Display:
• Days: 13
• Hours: 9
• Minutes: 53
• Seconds: 59

Real-Time Updates:
• Every second, the seconds counter decreases by 1
• When seconds reach 0, minutes decrease by 1 and seconds reset to 59
• This continues through hours and days for precise countdown tracking

Countdown Features Demonstrated:
✓ Real-time second-by-second updates
✓ Accurate day/hour/minute/second calculation
✓ Browser-based processing (no server lag)
✓ Pause/resume functionality
✓ Copy/share capability`}
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
                      Explore other useful date and time calculation tools:
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
            </section>
          </div>
        </div>
      </div>
    </>
  );
}