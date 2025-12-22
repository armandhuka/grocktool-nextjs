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
    whatItDoes: false,
    useCases: false,
    howToUse: false,
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
      question: "How do you calculate months and years in time conversion?",
      answer: "We use standardized time units: 1 month = 30.436875 days (average month length), 1 year = 365.25 days (accounting for leap years). For precise conversions: seconds = base unit, minutes = 60s, hours = 3600s, days = 86400s, weeks = 604800s, months = 2,629,746s, years = 31,556,952s. For exact calendar calculations, use specific dates, but for general time conversion, these averages work well."
    },
    {
      question: "What's the difference between calendar months and converted months?",
      answer: "Calendar months vary from 28 to 31 days, while converted months use an average of 30.44 days. Our converter uses the average for consistency. For specific date calculations, use calendar tools. For time duration conversions between units, the average provides accurate results for planning, scheduling, and general time measurements across different scales."
    },
    {
      question: "Can I convert between very small and very large time units?",
      answer: "Yes, the converter handles microseconds through millennia. For smaller units than seconds, enter decimal values (0.001s = 1ms). For larger units like centuries, convert years first. The tool maintains precision up to 8 decimal places, suitable for scientific calculations, project planning, and any application requiring time unit conversions across vastly different scales."
    },
    {
      question: "How accurate are leap year calculations in time conversion?",
      answer: "We use the average year length of 365.25 days (including leap years) for conversions. This provides accuracy for most applications. For exact date calculations or financial applications requiring precise day counts, use specialized date calculators. For general time duration conversions between units, the 365.25-day year gives reliable results that account for leap years over time."
    },
    {
      question: "What time units are best for different applications?",
      answer: "Use seconds for scientific measurements and precise timing. Use minutes and hours for everyday activities and meetings. Use days for project deadlines and travel planning. Use weeks for work schedules and pregnancy tracking. Use months for billing cycles and subscriptions. Use years for long-term planning and age calculations. Choose units appropriate for your specific time scale needs."
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
            {/* What This Tool Does - Dropdown */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('whatItDoes')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500/10 p-2 rounded-lg">
                    <Clock size={20} className="text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Time Converter - Features & Applications</h2>
                </div>
                {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.whatItDoes && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground mb-4">
                    This Time Converter provides instant, accurate conversions between all major time measurement units. The tool seamlessly converts between seconds, minutes, hours, days, weeks, months, and years using precise standardized conversion factors. Whether you're managing project timelines, calculating billing hours, planning schedules, or working with scientific data, this converter delivers reliable results with up to 8 decimal place accuracy. It automatically updates conversions in real-time as you type, includes common preset conversions for quick reference, and handles both small time intervals (like seconds for precise measurements) and large durations (like years for long-term planning). The intuitive interface makes it easy to switch between time units and copy results for documentation, reporting, or sharing with team members.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock size={18} className="text-blue-600" />
                        <h3 className="font-semibold text-foreground">Precise Time Calculations</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Convert between seconds, minutes, and hours with exact mathematical precision. Essential for scientific experiments, cooking timers, exercise routines, and any application requiring accurate time measurement conversions.</p>
                    </div>
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar size={18} className="text-green-600" />
                        <h3 className="font-semibold text-foreground">Calendar Time Conversions</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Accurately convert between days, weeks, months, and years using standardized calendar approximations. Perfect for project planning, event scheduling, subscription management, and long-term goal setting across different time scales.</p>
                    </div>
                    <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Timer size={18} className="text-purple-600" />
                        <h3 className="font-semibold text-foreground">Project Management</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Handle complex time conversions for work scheduling, deadline calculations, and resource allocation. Convert between work hours, business days, project weeks, and delivery timelines for efficient project planning and management.</p>
                    </div>
                    <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Watch size={18} className="text-amber-600" />
                        <h3 className="font-semibold text-foreground">Financial & Billing</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Convert time units for hourly billing, interest calculations, loan durations, and investment timelines. Calculate precise time conversions for financial planning, contract durations, and billing cycle management across different time periods.</p>
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
                    <Clock size={20} className="text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Time Conversion Applications</h2>
                </div>
                {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.useCases && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">📊 Project Management & Business</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Work Scheduling:</strong> Convert between work hours, business days, and project weeks for team scheduling, calculate delivery timelines across different time units, and allocate resources based on time estimates</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Billing & Invoicing:</strong> Convert hourly work to weekly or monthly billing periods, calculate project costs across different time scales, and create invoices with accurate time conversions for client reporting</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Deadline Management:</strong> Convert project deadlines between days, weeks, and months for milestone tracking, calculate time remaining in different units for progress reporting, and plan deliverables across multiple time scales</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">🎓 Education & Research</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Academic Scheduling:</strong> Convert class durations between minutes and hours for timetable planning, calculate semester lengths in weeks and months, and plan academic years across different time units</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Scientific Experiments:</strong> Convert experiment durations between seconds, minutes, and hours for protocol documentation, calculate reaction times in appropriate units, and standardize time measurements across research papers</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Study Planning:</strong> Convert study sessions between hours per day and hours per week for curriculum planning, calculate preparation time for exams in different time units, and track learning progress across time scales</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">💰 Finance & Personal Planning</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Investment Calculations:</strong> Convert between days, months, and years for compound interest calculations, calculate investment horizons across different time periods, and plan financial goals using various time units</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Loan & Mortgage Planning:</strong> Convert loan terms between months and years for repayment planning, calculate interest accrual across different time scales, and compare financial products using standardized time units</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Budget Management:</strong> Convert between daily, weekly, monthly, and yearly budgets for financial planning, calculate savings goals across different time periods, and track expenses using consistent time units</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">🏃 Health & Fitness</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Exercise Planning:</strong> Convert workout durations between minutes and hours for fitness routines, calculate training schedules across weeks and months, and track exercise time using different measurement units</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Medical Treatment:</strong> Convert medication schedules between hours, days, and weeks for treatment plans, calculate recovery timelines in different time units, and track health progress across various time scales</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Wellness Tracking:</strong> Convert between daily, weekly, and monthly habit tracking for wellness goals, calculate sleep cycles in hours and minutes, and monitor health metrics using consistent time measurements</span>
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
                  <div className="bg-amber-500/10 p-2 rounded-lg">
                    <Clock size={20} className="text-amber-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">How to Use Time Converter - Complete Guide</h2>
                </div>
                {openSections.howToUse ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.howToUse && (
                <div className="px-6 pb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Step-by-Step Instructions</h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                          <div>
                            <div className="font-medium text-foreground">Enter Your Time Value</div>
                            <div className="text-sm text-muted-foreground">Type the numerical time duration you want to convert in the "From" field. Enter whole numbers, decimals, or large values for extended time periods.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                          <div>
                            <div className="font-medium text-foreground">Select Source Unit</div>
                            <div className="text-sm text-muted-foreground">Choose the current time unit from the dropdown menu next to your input. Options include seconds, minutes, hours, days, weeks, months, and years for comprehensive conversion coverage.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                          <div>
                            <div className="font-medium text-foreground">Select Target Unit</div>
                            <div className="text-sm text-muted-foreground">Choose the time unit you want to convert to from the "To" dropdown menu. The converter will automatically calculate and display the result in real-time as you make selections.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">4</div>
                          <div>
                            <div className="font-medium text-foreground">Use Conversion Results</div>
                            <div className="text-sm text-muted-foreground">Copy the converted value using the copy button, or click any preset conversion for instant calculations of common time scenarios like work hours or project timelines.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Pro Conversion Tips</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <div className="bg-blue-500/20 p-1 rounded mt-0.5">
                            <Clock size={12} className="text-blue-500" />
                          </div>
                          <span><strong>Quick Estimates:</strong> For approximate conversions: 1 day ≈ 8.64×10⁴ seconds, 1 week = 7 days, 1 month ≈ 4.33 weeks, 1 year = 52 weeks + 1 day</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-green-500/20 p-1 rounded mt-0.5">
                            <Calendar size={12} className="text-green-500" />
                          </div>
                          <span><strong>Swap Function:</strong> Use the swap button between units to quickly reverse your conversion direction without re-entering time values - perfect for checking calculations</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-purple-500/20 p-1 rounded mt-0.5">
                            <Timer size={12} className="text-purple-500" />
                          </div>
                          <span><strong>Common Conversions:</strong> Save time by using the preset conversion buttons for frequently needed calculations like work hours to days or project weeks to months</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-amber-500/20 p-1 rounded mt-0.5">
                            <Watch size={12} className="text-amber-500" />
                          </div>
                          <span><strong>Precision Control:</strong> Results show up to 8 decimal places. For project planning, round to practical units; for scientific work, use full precision as needed</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-red-500/20 p-1 rounded mt-0.5">
                            <Copy size={12} className="text-red-500" />
                          </div>
                          <span><strong>Documentation Ready:</strong> Use the copy function to save conversion results for reports, schedules, financial documents, or project plans requiring accurate time measurements</span>
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
                    <Clock size={20} className="text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Time Conversion Examples</h2>
                </div>
                {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.examples && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">Common Time Conversion Examples</h3>
                      <div className="overflow-x-auto">
                        <div className="min-w-full inline-block align-middle">
                          <div className="overflow-hidden border border-border rounded-lg">
                            <table className="min-w-full divide-y divide-border">
                              <thead className="bg-secondary/20">
                                <tr>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">From Value</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">From Unit</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">To Unit</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Result</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Application</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-border">
                                <tr>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">90</td>
                                  <td className="px-4 py-3 text-sm text-foreground">Minutes (min)</td>
                                  <td className="px-4 py-3 text-sm text-foreground">Hours (h)</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">1.5</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Meeting duration</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">8</td>
                                  <td className="px-4 py-3 text-sm text-foreground">Hours (h)</td>
                                  <td className="px-4 py-3 text-sm text-foreground">Days (d)</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">0.3333</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Work day</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">30</td>
                                  <td className="px-4 py-3 text-sm text-foreground">Days (d)</td>
                                  <td className="px-4 py-3 text-sm text-foreground">Months (mo)</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">0.9863</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Billing cycle</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">52</td>
                                  <td className="px-4 py-3 text-sm text-foreground">Weeks (w)</td>
                                  <td className="px-4 py-3 text-sm text-foreground">Years (y)</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">0.9973</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Work year</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">2.5</td>
                                  <td className="px-4 py-3 text-sm text-foreground">Years (y)</td>
                                  <td className="px-4 py-3 text-sm text-foreground">Months (mo)</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">30.0</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Loan term</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">3600</td>
                                  <td className="px-4 py-3 text-sm text-foreground">Seconds (s)</td>
                                  <td className="px-4 py-3 text-sm text-foreground">Hours (h)</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">1.0</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Exact conversion</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Detailed Example: International Project Management</h3>
                      <div className="bg-secondary/20 p-4 rounded-lg border border-border overflow-x-auto">
                        <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
{`Example: Time conversions for a global software development project

Project: Multi-timezone software deployment with international teams
Duration: 6-month project with phased deliveries

Step 1: Project Timeline Planning
Overall project duration: 6 months
Convert to other units:
• 6 months to days: 6 × 30.44 = 182.64 days
• 6 months to weeks: 182.64 ÷ 7 = 26.09 weeks
• 6 months to hours: 182.64 × 24 = 4,383.36 hours
• 6 months to work hours (8h/day): 182.64 × 8 = 1,461.12 hours

Step 2: Phase 1 - Requirements & Design (Weeks 1-4)
Duration: 4 weeks
Convert to other units:
• 4 weeks to days: 4 × 7 = 28 days
• 4 weeks to hours: 28 × 24 = 672 hours
• 4 weeks to work hours: 28 × 8 = 224 hours
• 4 weeks to months: 28 ÷ 30.44 = 0.92 months

Team allocation: 3 developers × 8h/day × 5d/week
• Weekly capacity: 3 × 8 × 5 = 120 work-hours/week
• Phase capacity: 120 × 4 = 480 work-hours
• Utilization: 224 ÷ 480 = 46.67% of available capacity

Step 3: Phase 2 - Development (Weeks 5-16)
Duration: 12 weeks
Convert to other units:
• 12 weeks to days: 12 × 7 = 84 days
• 12 weeks to work days: 84 × (5/7) = 60 work days
• 12 weeks to months: 84 ÷ 30.44 = 2.76 months
• 12 weeks to hours: 84 × 24 = 2,016 hours

Development tasks:
• Feature A: Estimated 120 work-hours
  Convert to work days: 120 ÷ 8 = 15 days
  Convert to calendar days: 15 ÷ (5/7) = 21 calendar days
  Convert to weeks: 21 ÷ 7 = 3 weeks

• Feature B: Estimated 80 work-hours
  Convert to work days: 80 ÷ 8 = 10 days
  Convert to calendar days: 10 ÷ (5/7) = 14 calendar days
  Convert to weeks: 14 ÷ 7 = 2 weeks

• Feature C: Estimated 200 work-hours
  Convert to work days: 200 ÷ 8 = 25 days
  Convert to calendar days: 25 ÷ (5/7) = 35 calendar days
  Convert to weeks: 35 ÷ 7 = 5 weeks

Step 4: Phase 3 - Testing & Deployment (Weeks 17-24)
Duration: 8 weeks
Convert to other units:
• 8 weeks to days: 8 × 7 = 56 days
• 8 weeks to work days: 56 × (5/7) = 40 work days
• 8 weeks to months: 56 ÷ 30.44 = 1.84 months
• 8 weeks to hours: 56 × 24 = 1,344 hours

Testing schedule:
• Unit testing: 2 weeks = 14 calendar days
• Integration testing: 3 weeks = 21 calendar days
• User acceptance testing: 2 weeks = 14 calendar days
• Deployment preparation: 1 week = 7 calendar days

Step 5: International Team Coordination
Team locations:
• US team: 8h/day, 5d/week
• India team: 8h/day, 6d/week
• Germany team: 7.5h/day, 5d/week

Weekly capacity calculations:
• US team: 5 developers × 8h × 5d = 200 work-hours/week
• India team: 4 developers × 8h × 6d = 192 work-hours/week
• Germany team: 3 developers × 7.5h × 5d = 112.5 work-hours/week
• Total weekly capacity: 200 + 192 + 112.5 = 504.5 work-hours/week

Project total capacity:
• 24 weeks × 504.5 work-hours/week = 12,108 work-hours
• Convert to work days: 12,108 ÷ 8 = 1,513.5 work days
• Convert to calendar days: 1,513.5 ÷ (5/7) = 2,118.9 calendar days
• Convert to years: 2,118.9 ÷ 365.25 = 5.80 years (theoretical single-team time)

Step 6: Milestone Tracking
Milestone 1: Requirements complete
• Due: Week 4, Day 28
• Time from start: 28 days = 4 weeks = 0.92 months
• Work hours invested: 224 hours
• Percentage complete: (28 ÷ 182.64) × 100 = 15.33%

Milestone 2: Development complete
• Due: Week 16, Day 112
• Time from start: 112 days = 16 weeks = 3.68 months
• Work hours invested: 224 + 960 = 1,184 hours
• Percentage complete: (112 ÷ 182.64) × 100 = 61.33%

Milestone 3: Project complete
• Due: Week 24, Day 168
• Time from start: 168 days = 24 weeks = 5.52 months
• Total work hours: 1,184 + 672 = 1,856 hours
• Percentage complete: 100%

Step 7: Resource Allocation Over Time
Monthly resource planning:
• Month 1: 3 developers full-time
  Hours: 3 × 8 × 22 work days = 528 work-hours
  Convert to weeks: 528 ÷ (3 × 8 × 5) = 4.4 weeks of work

• Month 2: 5 developers full-time
  Hours: 5 × 8 × 20 work days = 800 work-hours
  Convert to weeks: 800 ÷ (5 × 8 × 5) = 4 weeks of work

• Month 3: 7 developers full-time
  Hours: 7 × 8 × 22 work days = 1,232 work-hours
  Convert to weeks: 1,232 ÷ (7 × 8 × 5) = 4.4 weeks of work

Step 8: Budget Calculations
Development cost: $75/hour
• Phase 1 cost: 224 hours × $75 = $16,800
  Convert to monthly: $16,800 ÷ 0.92 = $18,261/month

• Phase 2 cost: 960 hours × $75 = $72,000
  Convert to monthly: $72,000 ÷ 2.76 = $26,087/month

• Phase 3 cost: 672 hours × $75 = $50,400
  Convert to monthly: $50,400 ÷ 1.84 = $27,391/month

• Total cost: $139,200
  Convert to weekly cost: $139,200 ÷ 24 = $5,800/week
  Convert to daily cost: $139,200 ÷ 168 = $828.57/day

Step 9: Risk Management
Buffer time allocation:
• Development buffer: 2 weeks = 14 days
  Convert to hours: 14 × 24 = 336 hours
  Convert to work hours: 14 × 8 = 112 hours

• Testing buffer: 1 week = 7 days
  Convert to hours: 7 × 24 = 168 hours
  Convert to work hours: 7 × 8 = 56 hours

• Total buffer: 3 weeks = 21 days = 168 work-hours
  As percentage of project: (21 ÷ 168) × 100 = 12.5%

Step 10: Progress Reporting
Weekly status report conversions:
• This week: Completed 40 work-hours
  Convert to days: 40 ÷ 8 = 5 work days
  Convert to calendar days: 5 ÷ (5/7) = 7 calendar days

• Total to date: 800 work-hours completed
  Convert to weeks: 800 ÷ 504.5 = 1.59 weeks of team work
  Convert to months: (800 ÷ 504.5) × (7 ÷ 30.44) = 0.36 months

• Remaining: 1,056 work-hours
  Convert to weeks at current pace: 1,056 ÷ 504.5 = 2.09 weeks
  Convert to calendar days: 2.09 × 7 = 14.63 days
  Convert to months: 2.09 ÷ 4.33 = 0.48 months

Conclusion:
Using accurate time conversions ensures realistic project planning, proper resource allocation, effective international team coordination, and precise budget calculations. The time converter provides the flexibility needed for complex project management while maintaining simplicity for everyday time calculations across different units and scales.`}
                        </pre>
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