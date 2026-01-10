'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowLeftRight, Copy, RotateCcw, ChevronDown, ChevronUp, Clock, Calendar, Timer, Watch, Sunrise, Sunset, History, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '../../hooks/use-toast';
import Link from 'next/link';

const TimeConverter = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState('seconds');
  const [toUnit, setToUnit] = useState('minutes');
  const [result, setResult] = useState<string>('');
  const [openSections, setOpenSections] = useState({
    timeUnitsExplained: false,
    conversionMethod: false,
    productivityScenarios: false,
    formattingPrecision: false,
    examples: false,
    faqs: false,
    relatedTools: false
  });
  const { toast } = useToast();

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Related tools for Unit Converter Tools category
  const relatedTools = [
    { name: 'Length Converter', path: '/unit-tools/length-converter', icon: Clock },
    { name: 'Weight Converter', path: '/unit-tools/weight-converter', icon: Calendar },
    { name: 'Temperature Converter', path: '/unit-tools/temperature-converter', icon: Timer },
    { name: 'Speed Converter', path: '/unit-tools/speed-converter', icon: Watch },
    { name: 'Area Converter', path: '/unit-tools/area-converter', icon: Sunrise },
    { name: 'Volume Converter', path: '/unit-tools/volume-converter', icon: Sunset },
    { name: 'Data Size Converter', path: '/unit-tools/data-size-converter', icon: History }
  ];

  // FAQ Data
  const faqData = [
    {
      question: "Why do months have different lengths in your converter?",
      answer: "We use an average of 30.44 days per month because actual calendar months vary from 28 to 31 days. This average gives consistent results for planning and calculations. If you're working with specific calendar months, you'd need to know the exact start and end dates, but for most project planning or general time estimation, the average works perfectly well."
    },
    {
      question: "How accurate should I be with time conversions for work projects?",
      answer: "It depends on what you're tracking. For billing clients, round to the nearest 6-minute increment (0.1 hours) - it's standard in many industries. For internal project tracking, 15-minute blocks work well. Only scientific research needs second-by-second precision. Most business applications are fine with rounding to quarter-hours or half-hours."
    },
    {
      question: "What's the difference between calendar days and business days?",
      answer: "Calendar days include weekends and holidays - every day counts. Business days typically mean Monday through Friday, excluding public holidays. Our converter shows calendar time. For business days, you'd multiply by 5/7 (about 0.714) to convert calendar days to business days. So 10 calendar days equals roughly 7 business days."
    },
    {
      question: "How do leap years affect long-term conversions?",
      answer: "We build leap years into our year calculation automatically. One year equals 365.25 days on average, which accounts for that extra quarter-day each year. Over a decade, that adds up to about 2.5 extra days. For most personal or business planning, this level of accuracy is sufficient. Only astronomical calculations need more precision."
    },
    {
      question: "Can I convert really small time units like milliseconds?",
      answer: "Absolutely. Just use decimal values. One millisecond is 0.001 seconds, so enter 0.001 in the seconds field. For microseconds, that's 0.000001 seconds. The converter handles these tiny values without issue. If you work with scientific or computing time measurements frequently, you might want to stick to seconds and use decimals for fractions."
    }
  ];

  const timeUnits = {
    seconds: { name: 'Seconds', abbreviation: 's', factor: 1 },
    minutes: { name: 'Minutes', abbreviation: 'min', factor: 60 },
    hours: { name: 'Hours', abbreviation: 'h', factor: 3600 },
    days: { name: 'Days', abbreviation: 'd', factor: 86400 },
    weeks: { name: 'Weeks', abbreviation: 'w', factor: 604800 },
    months: { name: 'Months', abbreviation: 'mo', factor: 2629746 },
    years: { name: 'Years', abbreviation: 'y', factor: 31556952 }
  };

  const convertTime = () => {
    if (!inputValue || isNaN(Number(inputValue))) {
      setResult('');
      return;
    }

    const value = Number(inputValue);
    const fromFactor = timeUnits[fromUnit as keyof typeof timeUnits].factor;
    const toFactor = timeUnits[toUnit as keyof typeof timeUnits].factor;
    
    const seconds = value * fromFactor;
    const converted = seconds / toFactor;
    
    setResult(converted.toFixed(8).replace(/\.?0+$/, ''));
  };

  useEffect(() => {
    convertTime();
  }, [inputValue, fromUnit, toUnit]);

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const clearAll = () => {
    setInputValue('');
    setResult('');
  };

  const copyResult = async () => {
    if (result) {
      await navigator.clipboard.writeText(result);
      toast({
        title: "Copied!",
        description: "Result copied to clipboard",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background font-inter">
      <title>Time Converter | Seconds to Minutes, Hours, Days, Weeks, Months, Years | GrockTool.com</title>
      <meta name="description" content="Free online time converter tool. Convert between seconds, minutes, hours, days, weeks, months, and years instantly. Accurate time calculations for scheduling, project planning, and time management." />
      <meta name="keywords" content="time converter, seconds to minutes, minutes to hours, hours to days, days to weeks, weeks to months, months to years, time calculator, duration converter, time management tool" />
      <meta property="og:title" content="Time Converter | Seconds to Minutes, Hours, Days, Weeks, Months, Years" />
      <meta property="og:description" content="Free online time converter tool. Convert between seconds, minutes, hours, days, weeks, months, and years instantly." />
      <link rel="canonical" href="https://grocktool.com/unit-tools/time-converter" />
      
      <div className="pt-20 pb-8 px-4 sm:pt-24 sm:pb-12 sm:px-6 lg:pt-28">
        <div className="max-w-lg mx-auto lg:max-w-6xl">
          {/* Enhanced Header */}
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
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 px-4 py-2 rounded-full mb-4 border border-blue-500/20">
                <Clock size={16} className="text-blue-600" />
                <span className="text-sm font-medium text-blue-600">Time Calculation • Scheduling • Project Planning • Duration</span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                Time Converter
                <span className="block text-lg sm:text-xl lg:text-2xl font-normal text-muted-foreground mt-2">
                  Convert Seconds • Minutes • Hours • Days • Weeks • Months • Years • Time Units
                </span>
              </h1>
              
              <div className="flex flex-wrap justify-center gap-4 mt-6 mb-8">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 rounded-lg">
                  <Clock size={14} className="text-blue-600" />
                  <span className="text-xs sm:text-sm text-foreground">7 Time Units</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-lg">
                  <Calendar size={14} className="text-green-600" />
                  <span className="text-xs sm:text-sm text-foreground">Real-time Conversion</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 rounded-lg">
                  <Timer size={14} className="text-purple-600" />
                  <span className="text-xs sm:text-sm text-foreground">Project Planning</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 rounded-lg">
                  <Watch size={14} className="text-amber-600" />
                  <span className="text-xs sm:text-sm text-foreground">Scheduling Ready</span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Converter & Quick Conversions */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Examples Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <div className="space-y-3">
                  <div className="text-xs text-muted-foreground">Common Time Conversions:</div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      onClick={() => {
                        setFromUnit('minutes');
                        setToUnit('seconds');
                        setInputValue('1');
                      }}
                      className="px-3 py-2 bg-blue-500/10 text-blue-600 rounded-lg hover:bg-blue-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Clock size={12} />
                      1 min to s
                    </button>
                    <button
                      onClick={() => {
                        setFromUnit('hours');
                        setToUnit('minutes');
                        setInputValue('1');
                      }}
                      className="px-3 py-2 bg-green-500/10 text-green-600 rounded-lg hover:bg-green-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Calendar size={12} />
                      1 h to min
                    </button>
                    <button
                      onClick={() => {
                        setFromUnit('days');
                        setToUnit('hours');
                        setInputValue('1');
                      }}
                      className="px-3 py-2 bg-purple-500/10 text-purple-600 rounded-lg hover:bg-purple-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Timer size={12} />
                      1 d to h
                    </button>
                    <button
                      onClick={() => {
                        setFromUnit('weeks');
                        setToUnit('days');
                        setInputValue('1');
                      }}
                      className="px-3 py-2 bg-amber-500/10 text-amber-600 rounded-lg hover:bg-amber-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Watch size={12} />
                      1 w to d
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Main Converter Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Clock size={20} className="text-foreground" />
                      <label className="block text-sm font-medium text-foreground">
                        Time Converter
                      </label>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-blue-600">
                      <Clock size={12} />
                      <span>Real-time conversion</span>
                    </div>
                  </div>

                  {/* Input Section */}
                  <div className="space-y-4 sm:space-y-6">
                    {/* From Unit */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">From</label>
                      <div className="flex gap-2 sm:gap-3">
                        <input
                          type="number"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          placeholder="Enter time value"
                          className="flex-1 p-3 sm:p-4 text-base bg-input border border-border rounded-lg sm:rounded-xl focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-ring focus:ring-opacity-50"
                        />
                        <select
                          value={fromUnit}
                          onChange={(e) => setFromUnit(e.target.value)}
                          className="w-24 sm:w-28 p-3 sm:p-4 bg-input border border-border rounded-lg sm:rounded-xl focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-ring focus:ring-opacity-50 text-sm sm:text-base"
                        >
                          {Object.entries(timeUnits).map(([key, unit]) => (
                            <option key={key} value={key}>{unit.name} ({unit.abbreviation})</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Swap Button */}
                    <div className="flex justify-center">
                      <button
                        onClick={swapUnits}
                        className="p-2 sm:p-3 bg-accent text-accent-foreground rounded-lg sm:rounded-xl hover:bg-accent/80 transition-all duration-200 transform hover:scale-105"
                        aria-label="Swap units"
                      >
                        <ArrowLeftRight size={18} className="sm:w-5 sm:h-5" />
                      </button>
                    </div>

                    {/* To Unit */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">To</label>
                      <div className="flex gap-2 sm:gap-3">
                        <div className="flex-1 relative">
                          <input
                            type="text"
                            value={result}
                            readOnly
                            placeholder="Converted time"
                            className="w-full p-3 sm:p-4 text-base bg-muted border border-border rounded-lg sm:rounded-xl focus:outline-none"
                          />
                          {result && (
                            <button
                              onClick={copyResult}
                              className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 p-1 sm:p-2 hover:bg-secondary rounded transition-colors"
                              aria-label="Copy result"
                            >
                              <Copy size={16} className="sm:w-4 sm:h-4 text-muted-foreground" />
                            </button>
                          )}
                        </div>
                        <select
                          value={toUnit}
                          onChange={(e) => setToUnit(e.target.value)}
                          className="w-24 sm:w-28 p-3 sm:p-4 bg-input border border-border rounded-lg sm:rounded-xl focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-ring focus:ring-opacity-50 text-sm sm:text-base"
                        >
                          {Object.entries(timeUnits).map(([key, unit]) => (
                            <option key={key} value={key}>{unit.name} ({unit.abbreviation})</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Time Reference */}
                  <div className="p-3 bg-gradient-to-r from-secondary/20 to-secondary/10 rounded-lg border border-border">
                    <div className="text-xs font-medium text-foreground mb-1">Time Unit Relationships:</div>
                    <div className="text-xs text-muted-foreground">
                      {inputValue && result ? (
                        <div>
                          {inputValue} {timeUnits[fromUnit as keyof typeof timeUnits].abbreviation} = {result} {timeUnits[toUnit as keyof typeof timeUnits].abbreviation}
                          <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                            <div>1 min = 60 s</div>
                            <div>1 h = 60 min</div>
                            <div>1 d = 24 h</div>
                            <div>1 w = 7 d</div>
                          </div>
                        </div>
                      ) : (
                        "Enter a time value to see conversion details"
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={convertTime}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all text-sm sm:text-base font-medium shadow-md hover:shadow-lg"
                    >
                      <Clock size={16} className="sm:w-4 sm:h-4" />
                      Convert Time
                    </button>
                    <button
                      onClick={clearAll}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg sm:rounded-xl hover:bg-secondary/80 transition-colors text-sm sm:text-base font-medium"
                    >
                      <RotateCcw size={16} className="sm:w-4 sm:h-4" />
                      Clear All
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Quick Conversions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">Common Time Conversions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {[
                    { from: 'minutes', to: 'seconds', value: 1, label: '1 minute to seconds' },
                    { from: 'hours', to: 'minutes', value: 1, label: '1 hour to minutes' },
                    { from: 'days', to: 'hours', value: 1, label: '1 day to hours' },
                    { from: 'weeks', to: 'days', value: 1, label: '1 week to days' },
                    { from: 'months', to: 'days', value: 1, label: '1 month to days' },
                    { from: 'years', to: 'days', value: 1, label: '1 year to days' },
                    { from: 'years', to: 'months', value: 1, label: '1 year to months' },
                    { from: 'days', to: 'weeks', value: 14, label: '2 weeks to days' }
                  ].map((conversion, index) => {
                    const fromUnitData = timeUnits[conversion.from as keyof typeof timeUnits];
                    const toUnitData = timeUnits[conversion.to as keyof typeof timeUnits];
                    const fromFactor = fromUnitData.factor;
                    const toFactor = toUnitData.factor;
                    const seconds = conversion.value * fromFactor;
                    const result = (seconds / toFactor).toFixed(4);
                    
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          setFromUnit(conversion.from);
                          setToUnit(conversion.to);
                          setInputValue(conversion.value.toString());
                        }}
                        className="p-3 bg-secondary text-left rounded-lg hover:bg-secondary/80 transition-colors text-sm"
                      >
                        <div className="text-foreground font-medium mb-1">{conversion.label}</div>
                        <div className="text-xs text-muted-foreground">
                          {conversion.value} {fromUnitData.abbreviation} = {result} {toUnitData.abbreviation}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Right Column - Info Section */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">Time Unit Reference</h3>
                <div className="space-y-2 text-muted-foreground text-sm">
                  <p>
                    Time conversion between different units uses standardized factors based on seconds as the fundamental unit.
                  </p>
                  <div className="text-xs sm:text-sm space-y-1 pt-2">
                    <div className="font-medium text-foreground">Standard Time Relationships:</div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span><strong>1 minute</strong> = 60 seconds</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span><strong>1 hour</strong> = 60 minutes = 3,600 seconds</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span><strong>1 day</strong> = 24 hours = 1,440 minutes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span><strong>1 week</strong> = 7 days = 168 hours</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm space-y-1 pt-3">
                    <div className="font-medium text-foreground">Calendar Time Approximations:</div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span><strong>1 month</strong> ≈ 30.44 days (average month length)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span><strong>1 year</strong> ≈ 365.25 days (including leap years)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span><strong>1 decade</strong> = 10 years</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span><strong>1 century</strong> = 100 years</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm space-y-1 pt-3">
                    <div className="font-medium text-foreground">Precise Conversions (in seconds):</div>
                    <div className="flex justify-between">
                      <span>1 minute =</span>
                      <span>60 s</span>
                    </div>
                    <div className="flex justify-between">
                      <span>1 hour =</span>
                      <span>3,600 s</span>
                    </div>
                    <div className="flex justify-between">
                      <span>1 day =</span>
                      <span>86,400 s</span>
                    </div>
                    <div className="flex justify-between">
                      <span>1 week =</span>
                      <span>604,800 s</span>
                    </div>
                    <div className="flex justify-between">
                      <span>1 month ≈</span>
                      <span>2,629,746 s</span>
                    </div>
                    <div className="flex justify-between">
                      <span>1 year ≈</span>
                      <span>31,556,952 s</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm space-y-1 pt-3">
                    <div className="font-medium text-foreground">Common Applications:</div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                      <span><strong>Project Management:</strong> Convert between hours, days, and weeks for scheduling</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                      <span><strong>Scientific Research:</strong> Use seconds and minutes for precise timing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                      <span><strong>Financial Planning:</strong> Convert between months and years for investments</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* SEO Content Section with Dropdowns */}
          <section className="space-y-4 mt-12">
            {/* Time Units Explained */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('timeUnitsExplained')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500/10 p-2 rounded-lg">
                    <Clock size={20} className="text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Time Units Explained - From Seconds to Years</h2>
                </div>
                {openSections.timeUnitsExplained ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.timeUnitsExplained && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-muted-foreground mb-4">
                        Understanding time units goes beyond just memorizing conversion factors. Each unit has its own practical purpose and context where it makes the most sense to use. Let's break down what each time measurement really represents in everyday life.
                      </p>
                      
                      <div className="space-y-4">
                        <div className="bg-blue-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">Seconds & Minutes - The Human-Scale Units</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            Seconds are our most precise everyday time unit. A second is about the time it takes to take one breath at rest, or to blink twice. We use seconds for cooking times (boil eggs for 45 seconds), exercise intervals (hold for 30 seconds), and anything requiring precise timing.
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Minutes work perfectly for human attention spans. Most meetings, phone calls, and quick tasks fit into minute increments. What's interesting is that 5 minutes feels like "just a moment" while 10 minutes starts feeling like actual time has passed. That's why TV commercials are often exactly 30 seconds or 60 seconds - they fit neatly into our psychological time perception.
                          </p>
                        </div>
                        
                        <div className="bg-green-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">Hours & Days - The Work & Life Units</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            Hours match our natural energy cycles. Most people can focus for about 50-90 minutes before needing a break. The 8-hour workday came from industrial revolution factories, but it stuck because it roughly matches how long humans can be productive in a day.
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Days are our biological rhythm unit. Our bodies run on circadian cycles that reset every 24 hours. That's why jet lag happens when we cross time zones - our internal clock gets confused. Days work well for planning because they're tangible: "I'll finish this tomorrow" makes immediate sense, while "I'll finish this in 86,400 seconds" doesn't.
                          </p>
                        </div>
                        
                        <div className="bg-purple-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">Weeks & Months - The Planning Units</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            Weeks come from ancient agricultural cycles and religious observances. The 7-day week doesn't have astronomical basis like days (Earth's rotation) or years (Earth's orbit), but it's deeply embedded in human culture. Weeks work perfectly for project planning because they're long enough to make progress but short enough to stay focused.
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Months originally tracked lunar cycles (about 29.5 days), but our calendar months now vary from 28 to 31 days. That inconsistency makes monthly conversions tricky - hence we use 30.44 days as an average. Months are great for billing cycles, subscriptions, and anything that repeats regularly but needs more time than a week.
                          </p>
                        </div>
                        
                        <div className="bg-amber-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">Years & Beyond - The Long-Term Units</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            Years measure Earth's journey around the sun. That 365.25-day cycle affects everything from seasons to agriculture to human aging. The quarter-day leftover is why we have leap years every four years (except century years not divisible by 400 - 1900 wasn't a leap year, but 2000 was).
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Beyond years, we have decades (10 years), centuries (100 years), and millennia (1000 years). These large units help us think about historical periods, long-term investments, and generational changes. A decade feels like a natural unit for reflecting on personal growth or technological change.
                          </p>
                        </div>
                        
                        <div className="bg-secondary/20 p-4 rounded-lg">
                          <h4 className="font-medium text-foreground mb-2">When to Use Which Unit</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                            <div>
                              <div className="font-medium text-foreground">Use seconds for:</div>
                              <ul className="space-y-1 text-muted-foreground mt-1">
                                <li>• Cooking & baking times</li>
                                <li>• Exercise intervals</li>
                                <li>• Scientific measurements</li>
                                <li>• Computer operations</li>
                              </ul>
                            </div>
                            <div>
                              <div className="font-medium text-foreground">Use months for:</div>
                              <ul className="space-y-1 text-muted-foreground mt-1">
                                <li>• Rent & mortgage payments</li>
                                <li>• Subscription renewals</li>
                                <li>• Project phases</li>
                                <li>• Pregnancy tracking</li>
                              </ul>
                            </div>
                            <div>
                              <div className="font-medium text-foreground">Use hours for:</div>
                              <ul className="space-y-1 text-muted-foreground mt-1">
                                <li>• Work shifts</li>
                                <li>• Movie lengths</li>
                                <li>• Travel times</li>
                                <li>• Meeting durations</li>
                              </ul>
                            </div>
                            <div>
                              <div className="font-medium text-foreground">Use years for:</div>
                              <ul className="space-y-1 text-muted-foreground mt-1">
                                <li>• Age calculations</li>
                                <li>• Long-term investments</li>
                                <li>• Education programs</li>
                                <li>• Career planning</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </article>

            {/* Conversion Method */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('conversionMethod')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-green-500/10 p-2 rounded-lg">
                    <Calendar size={20} className="text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">How Time Conversion Actually Works</h2>
                </div>
                {openSections.conversionMethod ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.conversionMethod && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-muted-foreground mb-4">
                        Time conversion might seem straightforward, but there are nuances that matter depending on what you're calculating. The method changes slightly when you're dealing with exact scientific time versus calendar time for planning purposes.
                      </p>
                      
                      <div className="space-y-4">
                        <div className="bg-blue-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">The Two-Step Process Our Converter Uses</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            Every conversion goes through seconds as the common ground. Here's exactly what happens when you convert, say, 3 days to hours:
                          </p>
                          <div className="bg-secondary/30 p-3 rounded mb-3">
                            <div className="text-sm font-mono mb-1">Step 1: Convert source to seconds</div>
                            <div className="text-sm">3 days × 86,400 seconds/day = 259,200 seconds</div>
                            <div className="text-sm font-mono mt-2 mb-1">Step 2: Convert seconds to target</div>
                            <div className="text-sm">259,200 seconds ÷ 3,600 seconds/hour = 72 hours</div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            This two-step method ensures accuracy because every conversion factor is defined precisely in terms of seconds. It prevents rounding errors that can creep in when you use approximate shortcuts.
                          </p>
                        </div>
                        
                        <div className="bg-green-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">Calendar Time vs Exact Time</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            This is where things get interesting. When we say "1 month = 30.44 days," we're using an average. But actual months vary:
                          </p>
                          <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
                            <div className="text-center p-2 bg-blue-500/10 rounded">
                              <div className="font-medium">February</div>
                              <div>28 days</div>
                              <div className="text-muted-foreground">(29 in leap years)</div>
                            </div>
                            <div className="text-center p-2 bg-green-500/10 rounded">
                              <div className="font-medium">April, June</div>
                              <div>30 days</div>
                              <div className="text-muted-foreground">September, November</div>
                            </div>
                            <div className="text-center p-2 bg-purple-500/10 rounded">
                              <div className="font-medium">January, March</div>
                              <div>31 days</div>
                              <div className="text-muted-foreground">May, July, etc.</div>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            For project planning, the average works fine. But if you're calculating rent from March 15 to April 15, you need to count actual days (31 in March). Our converter gives you the average - for specific date calculations, you'd need a calendar.
                          </p>
                        </div>
                        
                        <div className="bg-purple-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">Leap Seconds & Other Quirks</h3>
                          <p className="text-sm text-muted-foreground">
                            Occasionally, scientists add a "leap second" to keep atomic clocks synchronized with Earth's slowing rotation. We don't account for these in everyday conversions - they're only critical for astronomical or precise scientific work. For 99.9% of applications, our conversions are accurate enough.
                          </p>
                          <div className="mt-3 text-xs bg-secondary/30 p-3 rounded">
                            <div className="font-medium">Quick Reference: Common Conversion Factors</div>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                              <div>1 minute = 60 seconds</div>
                              <div>1 hour = 3,600 seconds</div>
                              <div>1 day = 86,400 seconds</div>
                              <div>1 week = 604,800 seconds</div>
                              <div>1 month ≈ 2,629,746 seconds</div>
                              <div>1 year ≈ 31,556,952 seconds</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-amber-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">Mental Math Shortcuts That Actually Work</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            While our converter does exact math, here are some quick approximations you can do in your head:
                          </p>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-start gap-2">
                              <div className="w-4 h-4 bg-blue-500/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                              </div>
                              <span><strong>Days to hours:</strong> Multiply by 24, or easier - multiply by 25 then subtract one day's worth (the original number)</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-4 h-4 bg-green-500/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                              </div>
                              <span><strong>Weeks to days:</strong> Multiply by 7 obviously, but remember 4 weeks is about 28 days, not quite a month</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-4 h-4 bg-purple-500/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                              </div>
                              <span><strong>Months to weeks:</strong> Multiply by 4.35 (or just 4.3 for quick estimates). 3 months ≈ 13 weeks</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-4 h-4 bg-amber-500/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                              </div>
                              <span><strong>Years to days:</strong> Multiply by 365, then add a quarter of the years for leap days. 4 years = 1,461 days</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </article>

            {/* Productivity Scenarios */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('productivityScenarios')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-purple-500/10 p-2 rounded-lg">
                    <Timer size={20} className="text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Time Conversion for Productivity & Planning</h2>
                </div>
                {openSections.productivityScenarios ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.productivityScenarios && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-muted-foreground mb-4">
                        Time conversion isn't just math - it's a practical skill for getting things done. Whether you're planning a project, tracking work hours, or trying to be more productive, choosing the right time units makes all the difference.
                      </p>
                      
                      <div className="space-y-4">
                        <div className="bg-blue-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">Work Hour Conversions That Make Sense</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            If you bill by the hour or track work time, these conversions will save you headaches:
                          </p>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between border-b border-border/50 pb-2">
                              <div className="text-sm">Billable time tracking</div>
                              <div className="text-xs font-mono bg-blue-500/10 px-2 py-1 rounded">15 min = 0.25 hours</div>
                            </div>
                            <div className="flex items-center justify-between border-b border-border/50 pb-2">
                              <div className="text-sm">Weekly capacity calculation</div>
                              <div className="text-xs font-mono bg-green-500/10 px-2 py-1 rounded">40 hours = 1 work week</div>
                            </div>
                            <div className="flex items-center justify-between border-b border-border/50 pb-2">
                              <div className="text-sm">Project estimation</div>
                              <div className="text-xs font-mono bg-purple-500/10 px-2 py-1 rounded">1 month ≈ 160 work hours</div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="text-sm">Overtime calculation</div>
                              <div className="text-xs font-mono bg-amber-500/10 px-2 py-1 rounded">10 hours overtime = 1.25 days</div>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-3">
                            Remember: A "work month" isn't the same as a calendar month. With weekends, a typical work month has about 20-22 working days, which equals 160-176 work hours at 8 hours per day.
                          </p>
                        </div>
                        
                        <div className="bg-green-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">Project Planning Across Time Scales</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            Different project phases need different time units. Here's how to think about it:
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                            <div>
                              <div className="font-medium text-foreground mb-1">Daily Standups</div>
                              <div className="text-muted-foreground">Think in minutes: 15-minute meetings, 2-hour focused work blocks, 30-minute breaks</div>
                            </div>
                            <div>
                              <div className="font-medium text-foreground mb-1">Weekly Sprints</div>
                              <div className="text-muted-foreground">Think in hours: 40-hour work weeks, 20-hour tasks, 8-hour days</div>
                            </div>
                            <div>
                              <div className="font-medium text-foreground mb-1">Monthly Milestones</div>
                              <div className="text-muted-foreground">Think in days: 30-day challenges, 21-day habits, 14-day deliveries</div>
                            </div>
                            <div>
                              <div className="font-medium text-foreground mb-1">Quarterly Goals</div>
                              <div className="text-muted-foreground">Think in weeks: 13-week quarters, 6-week sprints, 4-week iterations</div>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-3">
                            Pro tip: When estimating project time, always convert to hours first, then to your reporting unit. If a task takes 3 days, that's 24 work hours. Much easier to track than "0.6 weeks" or "0.1 months."
                          </p>
                        </div>
                        
                        <div className="bg-purple-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">Personal Productivity Hacks</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            Time conversion can help you be more productive in surprising ways:
                          </p>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-start gap-2">
                              <div className="w-4 h-4 bg-blue-500/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Clock size={10} className="text-blue-500" />
                              </div>
                              <span><strong>The 15-Minute Rule:</strong> Instead of "I'll work on this later," say "I'll spend 15 minutes now." 15 minutes = 0.25 hours = 900 seconds. Small enough to start, big enough to make progress.</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-4 h-4 bg-green-500/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Calendar size={10} className="text-green-500" />
                              </div>
                              <span><strong>Annual Perspective:</strong> 1% improvement daily = 37.78 times better in a year (1.01³⁶⁵). Viewing time annually makes small daily efforts feel more meaningful.</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-4 h-4 bg-purple-500/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Timer size={10} className="text-purple-500" />
                              </div>
                              <span><strong>Meeting Math:</strong> A 1-hour meeting with 5 people costs 5 work hours. Could the same be accomplished with a 15-minute call (1.25 work hours total)?</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-4 h-4 bg-amber-500/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Watch size={10} className="text-amber-500" />
                              </div>
                              <span><strong>Commuting Conversion:</strong> 30 minutes each way = 5 hours weekly = 260 hours annually = 10.8 days per year just commuting. That perspective might motivate remote work requests.</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-amber-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">Real Business Scenarios</h3>
                          <div className="space-y-3 text-sm">
                            <div className="border-l-4 border-blue-500 pl-3 py-1">
                              <div className="font-medium text-foreground">Freelancer Billing</div>
                              <div className="text-muted-foreground">Client wants project estimate in weeks, but you track hours. 3-week project = 15 work days = 120 hours at $75/hour = $9,000. Much clearer than "about 3 weeks."</div>
                            </div>
                            <div className="border-l-4 border-green-500 pl-3 py-1">
                              <div className="font-medium text-foreground">Team Capacity Planning</div>
                              <div className="text-muted-foreground">5 developers × 40 hours/week = 200 hours weekly capacity. 1,000-hour project ÷ 200 = 5 weeks. Add 20% buffer = 6 weeks total.</div>
                            </div>
                            <div className="border-l-4 border-purple-500 pl-3 py-1">
                              <div className="font-medium text-foreground">Annual Budget Breakdown</div>
                              <div className="text-muted-foreground">$120,000 annual salary ÷ 2,080 work hours/year = $57.69/hour cost to company. Now you can accurately price projects based on actual time.</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </article>

            {/* Formatting & Precision */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('formattingPrecision')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-red-500/10 p-2 rounded-lg">
                    <Clock size={20} className="text-red-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Formatting & Precision - Getting Time Right</h2>
                </div>
                {openSections.formattingPrecision ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.formattingPrecision && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-muted-foreground mb-4">
                        How you present time matters almost as much as the calculation itself. Different fields have different conventions, and using the wrong format can confuse clients, colleagues, or even yourself when you look back at notes.
                      </p>
                      
                      <div className="space-y-4">
                        <div className="bg-blue-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">Time Notation Standards</h3>
                          <div className="overflow-x-auto">
                            <div className="min-w-full inline-block align-middle">
                              <div className="overflow-hidden border border-border rounded-lg">
                                <table className="min-w-full divide-y divide-border">
                                  <thead className="bg-secondary/20">
                                    <tr>
                                      <th className="px-4 py-2 text-left text-xs font-medium text-foreground">Field</th>
                                      <th className="px-4 py-2 text-left text-xs font-medium text-foreground">Standard Format</th>
                                      <th className="px-4 py-2 text-left text-xs font-medium text-foreground">Example</th>
                                      <th className="px-4 py-2 text-left text-xs font-medium text-foreground">When to Use</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-border">
                                    <tr>
                                      <td className="px-4 py-2 text-xs font-medium text-foreground">Business/General</td>
                                      <td className="px-4 py-2 text-xs">Decimal hours</td>
                                      <td className="px-4 py-2 text-xs font-mono">3.5 hours</td>
                                      <td className="px-4 py-2 text-xs">Timesheets, billing, meetings</td>
                                    </tr>
                                    <tr>
                                      <td className="px-4 py-2 text-xs font-medium text-foreground">Scientific</td>
                                      <td className="px-4 py-2 text-xs">Seconds with decimals</td>
                                      <td className="px-4 py-2 text-xs font-mono">125.67 s</td>
                                      <td className="px-4 py-2 text-xs">Experiments, research papers</td>
                                    </tr>
                                    <tr>
                                      <td className="px-4 py-2 text-xs font-medium text-foreground">Project Management</td>
                                      <td className="px-4 py-2 text-xs">Days with fractions</td>
                                      <td className="px-4 py-2 text-xs font-mono">2.5 days</td>
                                      <td className="px-4 py-2 text-xs">Gantt charts, schedules</td>
                                    </tr>
                                    <tr>
                                      <td className="px-4 py-2 text-xs font-medium text-foreground">Construction</td>
                                      <td className="px-4 py-2 text-xs">Hours & minutes</td>
                                      <td className="px-4 py-2 text-xs font-mono">3h 45m</td>
                                      <td className="px-4 py-2 text-xs">Labor tracking, site work</td>
                                    </tr>
                                    <tr>
                                      <td className="px-4 py-2 text-xs font-medium text-foreground">Legal</td>
                                      <td className="px-4 py-2 text-xs">Exact calendar days</td>
                                      <td className="px-4 py-2 text-xs font-mono">30 calendar days</td>
                                      <td className="px-4 py-2 text-xs">Contracts, deadlines</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-green-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">How Many Decimal Places Do You Really Need?</h3>
                          <div className="space-y-3 text-sm">
                            <div className="flex items-start gap-2">
                              <div className="w-4 h-4 bg-red-500/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                                <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                              </div>
                              <span><strong>Over-precision:</strong> Reporting 3.14159265 hours for a meeting is absurd when you scheduled it for "about 3 hours." You measured with a clock showing minutes, not nanoseconds.</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-4 h-4 bg-yellow-500/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                              </div>
                              <span><strong>Under-precision:</strong> Saying "a couple weeks" when you mean "14 calendar days" can cause project delays. Two people might interpret "a couple" differently.</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-4 h-4 bg-green-500/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                              </div>
                              <span><strong>Just right:</strong> "The task took 3.5 hours" uses appropriate precision. You worked about 3 hours and 30 minutes, not 3 hours 27 minutes 14 seconds.</span>
                            </div>
                          </div>
                          <div className="mt-3 p-3 bg-secondary/30 rounded">
                            <div className="font-medium text-foreground text-sm mb-1">Practical Precision Guidelines:</div>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div>• Billing clients: 0.25 hours (15 min)</div>
                              <div>• Project estimates: 0.5 days</div>
                              <div>• Scientific work: 0.01 seconds</div>
                              <div>• Cooking: 1 minute</div>
                              <div>• Exercise: 5 seconds</div>
                              <div>• Travel planning: 1 hour</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-purple-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">Common Formatting Mistakes to Avoid</h3>
                          <div className="space-y-3 text-sm">
                            <div className="border-l-4 border-red-500 pl-3 py-1">
                              <div className="font-medium text-foreground">Mixing Units Unnecessarily</div>
                              <div className="text-muted-foreground">"The project will take 2 weeks, 3 days, and 5 hours" - convert to one unit: "About 2.5 weeks" or "17.2 days"</div>
                            </div>
                            <div className="border-l-4 border-yellow-500 pl-3 py-1">
                              <div className="font-medium text-foreground">Using 24-hour Time Incorrectly</div>
                              <div className="text-muted-foreground">14:00 means 2 PM, not "14 o'clock." And 14.5 hours means 14 hours 30 minutes, not 2:30 PM.</div>
                            </div>
                            <div className="border-l-4 border-blue-500 pl-3 py-1">
                              <div className="font-medium text-foreground">Confusing Business & Calendar Days</div>
                              <div className="text-muted-foreground">"5 days" in a contract usually means 5 calendar days, not 5 business days. Be explicit.</div>
                            </div>
                            <div className="border-l-4 border-green-500 pl-3 py-1">
                              <div className="font-medium text-foreground">Inconsistent Rounding</div>
                              <div className="text-muted-foreground">Rounding 2.4 hours to 2 hours in one place but 2.6 hours to 3 hours in another looks sloppy. Pick a rule and stick to it.</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-amber-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">Time Format Conversion Examples</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between">
                              <div>Duration: 90 minutes</div>
                              <div className="font-mono text-xs bg-blue-500/10 px-2 py-1 rounded">= 1.5 hours</div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div>Work week: 40 hours</div>
                              <div className="font-mono text-xs bg-green-500/10 px-2 py-1 rounded">= 1.0 work weeks</div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div>Project: 3 months</div>
                              <div className="font-mono text-xs bg-purple-500/10 px-2 py-1 rounded">≈ 13.04 weeks</div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div>Billing: 0.75 hours</div>
                              <div className="font-mono text-xs bg-amber-500/10 px-2 py-1 rounded">= 45 minutes</div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div>Yearly: 365.25 days</div>
                              <div className="font-mono text-xs bg-red-500/10 px-2 py-1 rounded">= 8,766 hours</div>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-3">
                            Pro tip: When presenting time to others, use the unit that makes the most sense for your audience. Engineers might want seconds, managers prefer days, executives think in quarters.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </article>

            {/* Examples */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('examples')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-purple-500/10 p-2 rounded-lg">
                    <Clock size={20} className="text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Real-World Time Conversion Examples</h2>
                </div>
                {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.examples && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-muted-foreground mb-4">
                        Let's walk through some actual situations where time conversion matters. These examples show how choosing the right units and doing the math correctly can prevent problems and save time.
                      </p>
                      
                      <div className="space-y-4">
                        <div className="bg-blue-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">Example 1: Freelance Web Design Project</h3>
                          <div className="space-y-3 text-sm">
                            <p><strong>Situation:</strong> You're quoting a website redesign. Client asks for timeline in weeks, but you estimate in hours.</p>
                            
                            <div className="pl-4 border-l-2 border-blue-500">
                              <div className="font-medium text-foreground">Your hour estimates:</div>
                              <ul className="space-y-1 mt-1 text-muted-foreground">
                                <li>• Discovery & planning: 16 hours</li>
                                <li>• Design mockups: 24 hours</li>
                                <li>• Development: 40 hours</li>
                                <li>• Testing & revisions: 20 hours</li>
                                <li>• Total: 100 hours</li>
                              </ul>
                            </div>
                            
                            <div className="pl-4 border-l-2 border-green-500">
                              <div className="font-medium text-foreground">Conversion to weeks:</div>
                              <p className="mt-1 text-muted-foreground">100 hours ÷ 40 hours/week = 2.5 weeks of full-time work</p>
                              <p className="mt-1 text-muted-foreground">But you have other clients, so you can dedicate 20 hours/week to this project:</p>
                              <p className="font-mono mt-1">100 hours ÷ 20 hours/week = 5 calendar weeks</p>
                            </div>
                            
                            <div className="pl-4 border-l-2 border-purple-500">
                              <div className="font-medium text-foreground">What you tell the client:</div>
                              <p className="mt-1 text-muted-foreground">"The project requires about 100 hours of work. At my available capacity, that will take approximately 5 weeks to complete."</p>
                              <p className="mt-1 text-muted-foreground"><strong>Why this works:</strong> You've given them the total effort (hours) and the calendar time (weeks) separately. They understand both the cost (if you bill hourly) and the wait time.</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-green-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">Example 2: Marathon Training Plan</h3>
                          <div className="space-y-3 text-sm">
                            <p><strong>Situation:</strong> 16-week training plan with daily time commitments.</p>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <div className="font-medium text-foreground mb-1">Weekly breakdown:</div>
                                <ul className="space-y-1 text-muted-foreground">
                                  <li>• Monday: 45 min run</li>
                                  <li>• Tuesday: 60 min cross-train</li>
                                  <li>• Wednesday: 30 min run</li>
                                  <li>• Thursday: 45 min strength</li>
                                  <li>• Friday: Rest</li>
                                  <li>• Saturday: Long run (starts 60 min)</li>
                                  <li>• Sunday: 30 min recovery</li>
                                </ul>
                              </div>
                              <div>
                                <div className="font-medium text-foreground mb-1">Time conversions:</div>
                                <div className="space-y-1 text-muted-foreground">
                                  <div>Week 1 total: 4.5 hours</div>
                                  <div>Over 16 weeks: 72 hours</div>
                                  <div>Convert to days: 72 ÷ 24 = 3 full days</div>
                                  <div>Monthly average: 72 ÷ 3.7 = 19.5 hours/month</div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="bg-secondary/30 p-3 rounded">
                              <div className="font-medium text-foreground">The insight:</div>
                              <div className="text-xs mt-1 text-muted-foreground">When you realize training for a marathon takes the equivalent of 3 full 24-hour days spread over 4 months, it puts the commitment in perspective. That's 0.75 days per month, or about 4.5 hours per week on average.</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-purple-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">Example 3: Software Subscription Cost Analysis</h3>
                          <div className="space-y-3 text-sm">
                            <p><strong>Situation:</strong> Comparing monthly vs annual billing for a $15/month tool.</p>
                            
                            <div className="overflow-x-auto">
                              <div className="min-w-full inline-block align-middle">
                                <div className="overflow-hidden border border-border rounded-lg">
                                  <table className="min-w-full divide-y divide-border">
                                    <thead className="bg-secondary/20">
                                      <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-foreground">Time Period</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-foreground">Monthly Cost</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-foreground">Annual Cost</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-foreground">Daily Equivalent</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-foreground">Hourly Equivalent</th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                      <tr>
                                        <td className="px-4 py-2 text-xs">1 month</td>
                                        <td className="px-4 py-2 text-xs font-mono">$15.00</td>
                                        <td className="px-4 py-2 text-xs font-mono">$180.00</td>
                                        <td className="px-4 py-2 text-xs font-mono">$0.50/day</td>
                                        <td className="px-4 py-2 text-xs font-mono">$0.021/hour</td>
                                      </tr>
                                      <tr>
                                        <td className="px-4 py-2 text-xs">3 months</td>
                                        <td className="px-4 py-2 text-xs font-mono">$45.00</td>
                                        <td className="px-4 py-2 text-xs font-mono">$180.00</td>
                                        <td className="px-4 py-2 text-xs font-mono">$0.50/day</td>
                                        <td className="px-4 py-2 text-xs font-mono">$0.021/hour</td>
                                      </tr>
                                      <tr>
                                        <td className="px-4 py-2 text-xs">Annual (save 20%)</td>
                                        <td className="px-4 py-2 text-xs font-mono">$12.00/mo</td>
                                        <td className="px-4 py-2 text-xs font-mono">$144.00</td>
                                        <td className="px-4 py-2 text-xs font-mono">$0.39/day</td>
                                        <td className="px-4 py-2 text-xs font-mono">$0.016/hour</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                            
                            <p className="text-sm text-muted-foreground">
                              <strong>The decision:</strong> When you see the annual plan costs less than 2 cents per hour of use ($0.016), and you use the tool 2 hours daily, that's about 3.2 cents per day of use. Suddenly the "expensive" $144 annual fee feels reasonable compared to the value.
                            </p>
                          </div>
                        </div>
                        
                        <div className="bg-amber-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">Example 4: Time Zone Meeting Coordination</h3>
                          <div className="space-y-3 text-sm">
                            <p><strong>Situation:</strong> Scheduling between New York (EST), London (GMT), and Tokyo (JST).</p>
                            
                            <div className="grid grid-cols-3 gap-2 text-center mb-3">
                              <div className="p-2 bg-blue-500/10 rounded">
                                <div className="font-medium">New York</div>
                                <div className="text-xs">EST (UTC-5)</div>
                              </div>
                              <div className="p-2 bg-green-500/10 rounded">
                                <div className="font-medium">London</div>
                                <div className="text-xs">GMT (UTC+0)</div>
                              </div>
                              <div className="p-2 bg-purple-500/10 rounded">
                                <div className="font-medium">Tokyo</div>
                                <div className="text-xs">JST (UTC+9)</div>
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div>When it's 9:00 AM in New York:</div>
                                <div className="font-mono text-xs bg-blue-500/10 px-2 py-1 rounded">14:00 in London (5 hours ahead)</div>
                              </div>
                              <div className="flex items-center justify-between">
                                <div>When it's 9:00 AM in New York:</div>
                                <div className="font-mono text-xs bg-purple-500/10 px-2 py-1 rounded">23:00 in Tokyo (14 hours ahead)</div>
                              </div>
                              <div className="flex items-center justify-between">
                                <div>Finding overlap for 1-hour meeting:</div>
                                <div className="font-mono text-xs bg-green-500/10 px-2 py-1 rounded">NY 8-9 AM = London 1-2 PM = Tokyo 10-11 PM</div>
                              </div>
                            </div>
                            
                            <p className="text-sm text-muted-foreground">
                              <strong>The solution:</strong> The only reasonable overlap for all three is early morning in New York (8-9 AM), afternoon in London (1-2 PM), and late evening in Tokyo (10-11 PM). Tokyo team sacrifices evening time, but it's the only slot that works.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 p-4 bg-secondary/20 rounded-lg">
                        <h4 className="font-medium text-foreground mb-2">Key Takeaways from These Examples</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span>Always convert to the most relevant unit for your audience (hours for freelancers, weeks for clients, days for training plans)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span>Break large time periods into smaller units to make them understandable (3 days of training sounds more manageable than 72 hours)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-1 h-1 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span>Use time conversion to compare apples to apples (monthly vs annual costs converted to daily rates)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span>Consider human factors in time calculations (time zone differences, work hours, attention spans)</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </article>

            {/* Frequently Asked Questions (FAQs) */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('faqs')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500/10 p-2 rounded-lg">
                    <Clock size={20} className="text-blue-600" />
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
                    
                    <div className="pt-4">
                      <h3 className="text-lg font-semibold text-foreground mb-2">How do I convert work hours to calendar time for project planning?</h3>
                      <p className="text-muted-foreground mb-3">
                        Divide work hours by daily capacity. If a task takes 40 work hours and you can dedicate 4 hours daily to it, that's 10 calendar days. But remember weekends - 10 calendar days might be 14 actual days if you don't work weekends. The formula is: Calendar days = Work hours ÷ Daily capacity × (7 ÷ Work days per week).
                      </p>
                      
                      <h3 className="text-lg font-semibold text-foreground mb-2">What's the most common time conversion mistake people make?</h3>
                      <p className="text-muted-foreground">
                        Assuming months have 4 weeks. They don't - they average 4.35 weeks. That small difference adds up: a "3-month project" isn't 12 weeks, it's about 13 weeks. Over a year, assuming 4-week months gives you 48 weeks instead of 52. That's a whole month of error! Always use 4.35 weeks per month for accurate planning.
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
                <h2 className="text-xl font-bold text-foreground">More Unit Conversion Tools</h2>
                {openSections.relatedTools ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.relatedTools && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground mb-4">
                    Explore other essential unit conversion tools from our Unit Converter category:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {relatedTools.map((tool, index) => {
                      const Icon = tool.icon;
                      return (
                        <Link
                          key={index}
                          href={tool.path}
                          className="flex items-center gap-3 p-4 bg-secondary/30 rounded-lg border border-border hover:bg-secondary/50 transition-colors group"
                        >
                          <div className="bg-accent/10 p-2 rounded-lg group-hover:bg-accent/20 transition-colors">
                            <Icon size={18} className="text-accent" />
                          </div>
                          <div>
                            <div className="font-medium text-foreground group-hover:text-accent transition-colors">{tool.name}</div>
                            <div className="text-xs text-muted-foreground">Visit tool →</div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </article>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TimeConverter;