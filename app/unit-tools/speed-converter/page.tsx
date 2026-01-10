'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowLeftRight, Copy, RotateCcw, ChevronDown, ChevronUp, Zap, Gauge, Car, Plane, Rocket, Wind, Ship, } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '../../hooks/use-toast';
import Link from 'next/link';

const SpeedConverter = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState('kmh');
  const [toUnit, setToUnit] = useState('mph');
  const [result, setResult] = useState<string>('');
  const [openSections, setOpenSections] = useState({
    speedUnitsOverview: false,
    transportEngineering: false,
    conversionFormula: false,
    precisionRules: false,
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
    { name: 'Length Converter', path: '/unit-tools/length-converter', icon: Zap },
    { name: 'Weight Converter', path: '/unit-tools/weight-converter', icon: Gauge },
    { name: 'Temperature Converter', path: '/unit-tools/temperature-converter', icon: Car },
    { name: 'Time Converter', path: '/unit-tools/time-converter', icon: Plane },
    { name: 'Area Converter', path: '/unit-tools/area-converter', icon: Rocket },
    { name: 'Volume Converter', path: '/unit-tools/volume-converter', icon: Wind },
    { name: 'Data Size Converter', path: '/unit-tools/data-size-converter', icon: Ship }
  ];

  // FAQ Data
  const faqData = [
    {
      question: "Why does Europe use km/h while America uses mph?",
      answer: "It's all about historical choices. The US kept the British imperial system after independence, while France created the metric system during their revolution. Most of Europe adopted metric for its simplicity. There's no technical reason - just tradition. The practical difference matters when you're driving: 100 km/h feels slower than 62 mph, but they're actually the same speed. Your brain just processes the numbers differently."
    },
    {
      question: "How do pilots and sailors use knots instead of km/h or mph?",
      answer: "Knots make navigation math easier. One knot equals one nautical mile per hour, and a nautical mile is one minute of latitude. So if you sail at 10 knots north or south, you cover 10 minutes of latitude in an hour. On charts, this simplifies distance calculations dramatically. Pilots use knots for the same reason - it connects speed directly to navigation. The system feels clunky until you're actually plotting a course, then it becomes brilliantly simple."
    },
    {
      question: "When I see 'Mach 2' on a jet, what does that actually mean?",
      answer: "Mach numbers tell you how fast something is moving compared to the speed of sound in that particular air. Mach 1 equals the speed of sound, which varies with temperature and altitude. At sea level on a standard day, that's about 1225 km/h (761 mph). At 35,000 feet where jets cruise, it's around 1062 km/h (660 mph) because the air is colder. So Mach 2 at altitude isn't the same ground speed as Mach 2 at sea level - it's relative to local conditions."
    },
    {
      question: "How accurate do my speed conversions need to be for everyday use?",
      answer: "For driving, ±1-2% is fine. If a sign says 100 km/h, converting to 62 mph (instead of 62.137) won't get you a ticket. For aviation, precision matters more - a few knots can affect fuel calculations on long flights. For scientific work, use full precision. Most importantly: be consistent. If you round 100 km/h to 62 mph, round all your conversions the same way. Mixing precise and rounded conversions causes confusion."
    },
    {
      question: "Why do weather reports use different speed units for wind?",
      answer: "Different countries and applications prefer different units. Meteorologists often use knots because it connects to nautical miles and marine/aviation users. TV weather in the US shows mph, in Europe shows km/h. Scientists use m/s for calculations. The rule of thumb: use what your audience understands. If you're telling a friend about storm winds, use the units they know. If filing a flight plan, use knots. Context determines the appropriate unit."
    }
  ];

  const speedUnits = {
    kmh: { name: 'Kilometers per hour', abbreviation: 'km/h', factor: 1 },
    mph: { name: 'Miles per hour', abbreviation: 'mph', factor: 0.621371 },
    ms: { name: 'Meters per second', abbreviation: 'm/s', factor: 0.277778 },
    fts: { name: 'Feet per second', abbreviation: 'ft/s', factor: 0.911344 },
    knots: { name: 'Knots', abbreviation: 'kn', factor: 0.539957 },
    mach: { name: 'Mach', abbreviation: 'Ma', factor: 0.000817661 }
  };

  const convertSpeed = () => {
    if (!inputValue || isNaN(Number(inputValue))) {
      setResult('');
      return;
    }

    const value = Number(inputValue);
    const fromFactor = speedUnits[fromUnit as keyof typeof speedUnits].factor;
    const toFactor = speedUnits[toUnit as keyof typeof speedUnits].factor;
    
    const kmh = value / fromFactor;
    const converted = kmh * toFactor;
    
    setResult(converted.toFixed(6).replace(/\.?0+$/, ''));
  };

  useEffect(() => {
    convertSpeed();
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
      <title>Speed Converter | km/h to mph, m/s, Knots, Mach, ft/s | GrockTool.com</title>
      <meta name="description" content="Free online speed converter tool. Convert between kilometers per hour, miles per hour, meters per second, knots, Mach, and feet per second instantly. Accurate speed calculations for driving, aviation, sports, and science." />
      <meta name="keywords" content="speed converter, km/h to mph, mph to km/h, knots to km/h, m/s to km/h, mach converter, speed calculator, velocity converter, driving speed converter, aviation speed converter" />
      <meta property="og:title" content="Speed Converter | km/h to mph, m/s, Knots, Mach, ft/s" />
      <meta property="og:description" content="Free online speed converter tool. Convert between kilometers per hour, miles per hour, meters per second, knots, Mach, and feet per second instantly." />
      <link rel="canonical" href="https://grocktool.com/unit-tools/speed-converter" />
      
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
                <Zap size={16} className="text-blue-600" />
                <span className="text-sm font-medium text-blue-600">Velocity Conversion • Driving • Aviation • Sports • Science</span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                Speed Converter
                <span className="block text-lg sm:text-xl lg:text-2xl font-normal text-muted-foreground mt-2">
                  Convert km/h • mph • m/s • Knots • Mach • ft/s • Driving • Aviation • Sports
                </span>
              </h1>
              
              <div className="flex flex-wrap justify-center gap-4 mt-6 mb-8">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 rounded-lg">
                  <Zap size={14} className="text-blue-600" />
                  <span className="text-xs sm:text-sm text-foreground">6 Speed Units</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-lg">
                  <Gauge size={14} className="text-green-600" />
                  <span className="text-xs sm:text-sm text-foreground">Real-time Conversion</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 rounded-lg">
                  <Car size={14} className="text-purple-600" />
                  <span className="text-xs sm:text-sm text-foreground">Driving & Aviation</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 rounded-lg">
                  <Plane size={14} className="text-amber-600" />
                  <span className="text-xs sm:text-sm text-foreground">Scientific Accuracy</span>
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
                  <div className="text-xs text-muted-foreground">Common Speed Conversions:</div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      onClick={() => {
                        setFromUnit('kmh');
                        setToUnit('mph');
                        setInputValue('100');
                      }}
                      className="px-3 py-2 bg-blue-500/10 text-blue-600 rounded-lg hover:bg-blue-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Zap size={12} />
                      100 km/h to mph
                    </button>
                    <button
                      onClick={() => {
                        setFromUnit('mph');
                        setToUnit('kmh');
                        setInputValue('60');
                      }}
                      className="px-3 py-2 bg-green-500/10 text-green-600 rounded-lg hover:bg-green-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Gauge size={12} />
                      60 mph to km/h
                    </button>
                    <button
                      onClick={() => {
                        setFromUnit('ms');
                        setToUnit('kmh');
                        setInputValue('10');
                      }}
                      className="px-3 py-2 bg-purple-500/10 text-purple-600 rounded-lg hover:bg-purple-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Car size={12} />
                      10 m/s to km/h
                    </button>
                    <button
                      onClick={() => {
                        setFromUnit('knots');
                        setToUnit('kmh');
                        setInputValue('1');
                      }}
                      className="px-3 py-2 bg-amber-500/10 text-amber-600 rounded-lg hover:bg-amber-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Plane size={12} />
                      1 knot to km/h
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
                      <Zap size={20} className="text-foreground" />
                      <label className="block text-sm font-medium text-foreground">
                        Speed Converter
                      </label>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-blue-600">
                      <Zap size={12} />
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
                          placeholder="Enter speed value"
                          className="flex-1 p-3 sm:p-4 text-base bg-input border border-border rounded-lg sm:rounded-xl focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-ring focus:ring-opacity-50"
                        />
                        <select
                          value={fromUnit}
                          onChange={(e) => setFromUnit(e.target.value)}
                          className="w-24 sm:w-28 p-3 sm:p-4 bg-input border border-border rounded-lg sm:rounded-xl focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-ring focus:ring-opacity-50 text-sm sm:text-base"
                        >
                          {Object.entries(speedUnits).map(([key, unit]) => (
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
                            placeholder="Converted speed"
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
                          {Object.entries(speedUnits).map(([key, unit]) => (
                            <option key={key} value={key}>{unit.name} ({unit.abbreviation})</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Speed Reference */}
                  <div className="p-3 bg-gradient-to-r from-secondary/20 to-secondary/10 rounded-lg border border-border">
                    <div className="text-xs font-medium text-foreground mb-1">Speed Reference Points:</div>
                    <div className="text-xs text-muted-foreground">
                      {inputValue && result ? (
                        <div>
                          {inputValue} {speedUnits[fromUnit as keyof typeof speedUnits].abbreviation} = {result} {speedUnits[toUnit as keyof typeof speedUnits].abbreviation}
                          <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                            <div>Walking: 5 km/h</div>
                            <div>Highway: 100 km/h</div>
                            <div>Sound: 1,235 km/h</div>
                            <div>Commercial jet: 900 km/h</div>
                          </div>
                        </div>
                      ) : (
                        "Enter a speed value to see conversion details"
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={convertSpeed}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all text-sm sm:text-base font-medium shadow-md hover:shadow-lg"
                    >
                      <Zap size={16} className="sm:w-4 sm:h-4" />
                      Convert Speed
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
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">Common Speed Conversions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {[
                    { from: 'kmh', to: 'mph', value: 100, label: 'Highway speed limit' },
                    { from: 'mph', to: 'kmh', value: 60, label: 'Typical urban speed' },
                    { from: 'ms', to: 'kmh', value: 10, label: 'Fast running speed' },
                    { from: 'knots', to: 'kmh', value: 1, label: 'Standard nautical speed' },
                    { from: 'kmh', to: 'ms', value: 36, label: 'Urban driving speed' },
                    { from: 'mph', to: 'fts', value: 60, label: 'Road speed to ft/s' },
                    { from: 'mach', to: 'kmh', value: 1, label: 'Speed of sound' },
                    { from: 'kmh', to: 'knots', value: 100, label: 'Driving to nautical' }
                  ].map((conversion, index) => {
                    const fromUnitData = speedUnits[conversion.from as keyof typeof speedUnits];
                    const toUnitData = speedUnits[conversion.to as keyof typeof speedUnits];
                    const fromFactor = fromUnitData.factor;
                    const toFactor = toUnitData.factor;
                    const kmh = conversion.value / fromFactor;
                    const result = (kmh * toFactor).toFixed(2);
                    
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
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">Speed Unit Reference</h3>
                <div className="space-y-2 text-muted-foreground text-sm">
                  <p>
                    Converting between speed systems means understanding what each unit represents in real-world terms, not just memorizing numbers.
                  </p>
                  <div className="text-xs sm:text-sm space-y-1 pt-2">
                    <div className="font-medium text-foreground">What These Units Feel Like:</div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span><strong>5 km/h</strong> = Brisk walking pace</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span><strong>20 km/h</strong> = Fast cycling, slow car in traffic</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span><strong>50 km/h</strong> = Typical city driving speed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span><strong>100 km/h</strong> = Highway cruising, feels fast but controlled</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm space-y-1 pt-3">
                    <div className="font-medium text-foreground">High-Speed Context:</div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span><strong>300 km/h</strong> = High-speed train, exhilarating on open road</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span><strong>900 km/h</strong> = Jet airliner at cruising altitude</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span><strong>1,235 km/h</strong> = Sound barrier at sea level (loud!)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span><strong>28,000 km/h</strong> = Space station orbital speed (mind-blowing)</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm space-y-1 pt-3">
                    <div className="font-medium text-foreground">Quick Mental Conversions:</div>
                    <div className="flex justify-between">
                      <span>km/h to mph:</span>
                      <span>Multiply by 0.6 (close enough)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>mph to km/h:</span>
                      <span>Multiply by 1.6 (easy estimate)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>m/s to km/h:</span>
                      <span>Multiply by 3.6 (exact)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>knots to km/h:</span>
                      <span>Multiply by 1.85 (almost double)</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm space-y-1 pt-3">
                    <div className="font-medium text-foreground">When You'll Use Each:</div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                      <span><strong>km/h/mph:</strong> Driving anywhere, vehicle specs, speed limits</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                      <span><strong>knots:</strong> Boating, flying, weather reports (wind)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                      <span><strong>m/s:</strong> Science class, physics problems, precise measurements</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                      <span><strong>Mach:</strong> Jet fighters, supersonic travel, aerospace engineering</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* SEO Content Section with Dropdowns */}
          <section className="space-y-4 mt-12">
            {/* Speed Units Overview */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('speedUnitsOverview')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500/10 p-2 rounded-lg">
                    <Zap size={20} className="text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Making Sense of Different Speed Measurements</h2>
                </div>
                {openSections.speedUnitsOverview ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.speedUnitsOverview && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground mb-4">
                    Speed units aren't just random numbers - each one tells a story about why it was created and what it's good for. Understanding this context makes conversion more intuitive.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">km/h and mph: The Road Warriors</h3>
                      <p className="text-sm text-muted-foreground">
                        Kilometers per hour and miles per hour are what most people think about when they hear "speed." They're road-focused units. km/h dominates globally because it's metric - simple decimal math. 100 km/h is easy: 1/10 of that is 10 km/h, double is 200 km/h. The system makes sense.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        mph persists in the US and UK largely because changing highway signs and speedometers nationwide is expensive and confusing. Ever notice how 60 mph feels like a nice round number? That's because imperial units evolved from human-scale measurements. A mile was originally 1,000 paces. These units feel intuitive because they were born from walking and horse travel.
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Knots and Mach: Specialists' Tools</h3>
                      <p className="text-sm text-muted-foreground">
                        Knots come from sailors throwing a log overboard with a rope tied to it. The rope had knots at regular intervals. They'd count how many knots passed through their hands in 30 seconds to calculate speed. Today, 1 knot = 1 nautical mile per hour, and a nautical mile is 1 minute of latitude. This makes navigation math clean.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Mach numbers are different - they're ratios, not fixed speeds. Mach 1 means "traveling at the speed of sound in this particular air." At sea level, that's about 1225 km/h. At 35,000 feet where air is thinner and colder, it's about 1062 km/h. Pilots use Mach because aircraft performance relates to the speed of sound, not ground speed.
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">m/s and ft/s: The Precision Instruments</h3>
                      <p className="text-sm text-muted-foreground">
                        Meters per second is the scientist's choice. It's the SI unit for velocity. When physicists calculate forces or energies, they work in m/s because the math stays clean. 10 m/s is a nice number to work with in equations. 36 km/h is messier. Scientists prefer elegance in their calculations.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Feet per second hangs on in American engineering. If you're designing machinery in the US, blueprints might show speeds in ft/s. It connects to other imperial measurements like pounds-force and horsepower. The system is coherent within itself, even if converting to metric feels awkward.
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Why So Many Systems?</h3>
                      <p className="text-sm text-muted-foreground">
                        Different fields developed their own tools for measuring speed because they had different needs. Sailors needed navigation-friendly units. Pilots needed altitude-aware measurements. Drivers needed practical road speeds. Scientists needed mathematically pure units. Engineers needed compatibility with existing systems.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        The result is today's messy but functional collection of speed units. Rather than fighting it, learn which unit to reach for in each situation. Our converter bridges these worlds so you don't have to memorize everything.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <h4 className="font-semibold text-foreground mb-2">Quick Recognition Guide</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <div>
                        <div className="font-medium text-foreground mb-1">If you see:</div>
                        <ul className="text-muted-foreground space-y-1">
                          <li>• Numbers like 60, 100, 120 → Probably km/h or mph</li>
                          <li>• Numbers like 200, 300, 500 → Probably knots (aviation/nautical)</li>
                          <li>• Numbers like 0.8, 1.2, 2.0 → Definitely Mach (supersonic)</li>
                          <li>• Numbers like 10, 20, 30 → Could be m/s (science)</li>
                        </ul>
                      </div>
                      <div>
                        <div className="font-medium text-foreground mb-1">Context clues:</div>
                        <ul className="text-muted-foreground space-y-1">
                          <li>• Road sign → km/h (most places) or mph (US/UK)</li>
                          <li>• Weather report → knots (professional) or km/h/mph (public)</li>
                          <li>• Aircraft display → knots (speed) or Mach (high altitude)</li>
                          <li>• Physics textbook → m/s (always)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </article>

            {/* Transport & Engineering Uses */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('transportEngineering')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-green-500/10 p-2 rounded-lg">
                    <Zap size={20} className="text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Where Different Speed Units Actually Get Used</h2>
                </div>
                {openSections.transportEngineering ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.transportEngineering && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground mb-4">
                    You don't choose speed units randomly - each industry has its preferred measurements for good reasons. Here's where you'll encounter each unit in the real world.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">On the Roads and Rails</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Driving is the most common place people encounter speed conversions. If you rent a car in Europe as an American, you'll see km/h on the speedometer but think in mph. The mental conversion becomes automatic after a few days. Most modern cars can switch displays, but rental agencies don't always enable this feature.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        For trucking companies operating internationally, speed conversion affects logistics. European trucks governed to 90 km/h (56 mph) would feel painfully slow on US highways with 70 mph (113 km/h) limits. The difference isn't just numbers - it changes trip planning, delivery schedules, and driver fatigue calculations.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">In the Air and at Sea</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Aviation is strictly knots and Mach. I've worked with pilots who can instantly convert between systems, but they think in knots. Air traffic controllers in different countries might use different units, but the pilots' instruments show knots. The standardization prevents errors - imagine the disaster if one pilot thought "250" meant km/h while another thought mph during approach.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Maritime navigation still uses knots for the same reason aviation does: it connects directly to chart measurements. A ship traveling at 20 knots covers 20 nautical miles per hour, and since charts are marked in nautical miles, course plotting becomes simple arithmetic. Converting to km/h would add an unnecessary calculation step.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Engineering and Manufacturing</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        In factories, conveyor belts might run at speeds measured in feet per minute in the US, or meters per minute elsewhere. Machine tools spin at RPM (revolutions per minute), which converts to surface speed in m/s or ft/s depending on tool diameter. Get this conversion wrong, and you wreck expensive cutting tools or produce defective parts.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Civil engineers designing roads use different units in different countries, but the physics remains the same. A curve safe at 100 km/h is also safe at 62 mph - it's the same speed with different labels. The challenge comes when importing vehicle designs or safety standards between markets.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Sports and Recreation</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Cyclists and runners face constant conversion challenges. European races list paces in minutes per kilometer, Americans in minutes per mile. Serious athletes learn both. I've seen marathoners from different countries comparing finish times, mentally converting between systems while catching their breath.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        In motorsports, teams might develop a car in Europe (km/h) but race it in the US (mph). The telemetry data needs consistent units for analysis. I've watched engineers spend hours converting datasets because someone forgot to specify units in a shared spreadsheet. Small conversion errors can lead to wrong setup decisions.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                      <h4 className="font-semibold text-foreground mb-2">The Conversion Reality Check</h4>
                      <p className="text-sm text-muted-foreground">
                        In practice, most professionals develop intuition for their field's conversions. Pilots know 250 knots is about 460 km/h. Truckers know 100 km/h is about 62 mph. Cyclists know a 20 mph average is roughly 32 km/h. The exact numbers matter less than recognizing ballpark figures. Our converter handles the precision when you need it, but developing that intuition makes you faster in daily work.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </article>

            {/* Conversion Formula */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('conversionFormula')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-purple-500/10 p-2 rounded-lg">
                    <Zap size={20} className="text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">The Math Behind Speed Conversion</h2>
                </div>
                {openSections.conversionFormula ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.conversionFormula && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground mb-4">
                    Converting speed isn't just multiplying by a magic number - there's logic behind each factor. Understanding where these numbers come from makes them easier to remember and use correctly.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Why 1.609344 and 0.621371?</h3>
                      <p className="text-sm text-muted-foreground">
                        The exact conversion between miles and kilometers is 1 mile = 1.609344 kilometers. That .000344 matters for precision work but not for mental math. This number comes from the international agreement defining the mile as exactly 1609.344 meters. The reciprocal gives us 0.621371192 for converting km to miles.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        For quick estimates, 1.6 and 0.6 work fine. I use these approximations when driving internationally: 100 km/h × 0.6 = 60 mph (actual: 62.1). Close enough to avoid tickets. Going the other way: 60 mph × 1.6 = 96 km/h (actual: 96.56). The error is about 0.5%, which at highway speeds means less than 1 km/h difference.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">The 3.6 Factor for m/s to km/h</h3>
                      <p className="text-sm text-muted-foreground">
                        This one's beautifully simple: 1 meter per second = 3.6 kilometers per hour. Why? Because there are 1000 meters in a kilometer and 3600 seconds in an hour. 1000/3600 = 1/3.6, or looking at it the other way: 1 m/s × 3600 seconds/hour ÷ 1000 m/km = 3.6 km/h.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        This exact relationship makes m/s and km/h friendly for mental conversion. 10 m/s = 36 km/h (10 × 3.6). 25 m/s = 90 km/h. The pattern is easy to remember once you see it. Compare this to the messy mph conversions, and you understand why scientists prefer metric.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Knots: The Nautical Connection</h3>
                      <p className="text-sm text-muted-foreground">
                        One knot = 1.852 km/h exactly. This comes from the nautical mile being 1852 meters (by international agreement since 1929). Before that, different countries had slightly different nautical miles, which must have been confusing for international shipping.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        The practical approximation: knots are about 15% more than mph (1 knot = 1.15078 mph) or about 85% more than km/h (actually 85.2%). For quick mental conversion from knots to km/h, I use "almost double" - 100 knots ≈ 185 km/h. The reverse: km/h to knots, divide by 1.85 or multiply by 0.54.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                      <h4 className="font-semibold text-foreground mb-2">Hands-On Conversion Example</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Let's convert 70 mph to various units step by step:
                      </p>
                      <div className="text-sm font-mono bg-background p-3 rounded border border-border space-y-1">
                        <div>To km/h: 70 × 1.609344 = 112.65408 km/h</div>
                        <div>To m/s: First get km/h (112.654), then ÷ 3.6 = 31.2928 m/s</div>
                        <div>Or directly: 70 × 0.44704 = 31.2928 m/s (0.44704 = 1.609344 ÷ 3.6)</div>
                        <div>To knots: 70 ÷ 1.15078 = 60.827 knots</div>
                        <div>To ft/s: 70 × 1.46667 = 102.667 ft/s (1 mph = 1.46667 ft/s)</div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Notice how each conversion uses factors derived from fundamental relationships. Our converter handles these steps automatically, but knowing the relationships helps spot when a conversion looks wrong.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Mach's Variable Nature</h3>
                      <p className="text-sm text-muted-foreground">
                        Mach conversion is trickiest because the speed of sound changes with air temperature. At sea level standard conditions (15°C), it's 340.3 m/s = 1225 km/h = 761 mph. But at -50°C (common at cruising altitude), it's 300 m/s = 1080 km/h = 671 mph.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Our converter uses the sea level standard for simplicity. For aviation applications, pilots use flight computers that calculate true Mach based on actual temperature. That's why you'll see "Mach 0.85" on airliner displays but different ground speeds at different altitudes.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </article>

            {/* Precision Rules */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('precisionRules')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-amber-500/10 p-2 rounded-lg">
                    <Zap size={20} className="text-amber-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">How Precise Should Your Conversions Be?</h2>
                </div>
                {openSections.precisionRules ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.precisionRules && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground mb-4">
                    More decimal places aren't always better. Knowing when to round and when to be exact separates practical conversions from mathematical exercises. Here's how professionals handle precision in different fields.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Everyday Driving: Keep It Simple</h3>
                      <p className="text-sm text-muted-foreground">
                        When converting speed limits for travel, round to the nearest 5 or 10. European speed limits are typically multiples of 10 km/h (50, 80, 100, 120, 130). US limits are multiples of 5 mph (25, 35, 45, 55, 65, 70, 75).
                      </p>
                      <p className="text-sm text-muted-foreground">
                        So 100 km/h converts to 62.137 mph, but you'll think "about 60 mph" while driving. The 2 mph difference won't get you pulled over. Police radar guns have tolerance margins anyway. What matters is understanding the speed relative to road conditions, not the exact number.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Aviation: Precision Matters</h3>
                      <p className="text-sm text-muted-foreground">
                        In aviation, a few knots can affect fuel calculations on long flights. Air traffic control might specify "maintain 250 knots" not "about 250." Fuel flow calculations use precise speeds because errors compound over hours.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        However, even pilots round in their heads. They know 250 knots is about 460 km/h or 288 mph. The exact numbers are in the flight computer, but mental approximations help with quick decisions. The key is knowing when approximation is safe (casual planning) versus when it's not (fuel calculations).
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Science and Engineering: Follow the Data</h3>
                      <p className="text-sm text-muted-foreground">
                        In scientific work, maintain the precision of your original measurement. If you measured 10.25 m/s with an instrument accurate to 0.01 m/s, convert to km/h as 36.90 km/h (10.25 × 3.6 = 36.90), not 37 km/h.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        The rule: don't add false precision. If your car speedometer shows 60 mph (probably accurate to ±1 mph), converting to 96.56064 km/h implies precision that doesn't exist. 97 km/h is more honest. This matters in technical reports where readers might assume precision from decimal places.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
                      <h4 className="font-semibold text-foreground mb-2">Practical Precision Guidelines</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div>
                          <div className="font-medium text-foreground mb-1">Round to whole numbers:</div>
                          <ul className="text-muted-foreground space-y-1">
                            <li>• Speed limit conversions</li>
                            <li>• Travel planning estimates</li>
                            <li>• Casual conversations about speed</li>
                            <li>• Vehicle brochure comparisons</li>
                          </ul>
                        </div>
                        <div>
                          <div className="font-medium text-foreground mb-1">Keep 1 decimal:</div>
                          <ul className="text-muted-foreground space-y-1">
                            <li>• Running/cycling pace calculations</li>
                            <li>• Basic flight planning</li>
                            <li>• Weather reporting (public)</li>
                            <li>• Sports performance analysis</li>
                          </ul>
                        </div>
                        <div>
                          <div className="font-medium text-foreground mb-1">Use full precision:</div>
                          <ul className="text-muted-foreground space-y-1">
                            <li>• Scientific research data</li>
                            <li>• Aviation fuel calculations</li>
                            <li>• Engineering design specifications</li>
                            <li>• Calibration work</li>
                          </ul>
                        </div>
                        <div>
                          <div className="font-medium text-foreground mb-1">Know your tool's accuracy:</div>
                          <ul className="text-muted-foreground space-y-1">
                            <li>• Car speedometer: ±2-3% typically</li>
                            <li>• GPS speed: ±0.1 km/h good conditions</li>
                            <li>• Radar gun: ±1 mph typically</li>
                            <li>• Laboratory equipment: read the specs</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">The Consistency Principle</h3>
                      <p className="text-sm text-muted-foreground">
                        Whatever precision level you choose, be consistent within a project. If you round 100 km/h to 62 mph, round all km/h to mph conversions similarly. Mixing precise and rounded conversions in the same document or calculation causes confusion and errors.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        I've reviewed engineering reports where some speeds were rounded and others weren't, making comparisons difficult. Establish a precision standard at the start of any project involving speed conversions. Document it so others understand your choices.
                      </p>
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
                  <div className="bg-indigo-500/10 p-2 rounded-lg">
                    <Zap size={20} className="text-indigo-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Real-World Speed Conversion Scenarios</h2>
                </div>
                {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.examples && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">Common Speed Situations You'll Encounter</h3>
                      <div className="overflow-x-auto">
                        <div className="min-w-full inline-block align-middle">
                          <div className="overflow-hidden border border-border rounded-lg">
                            <table className="min-w-full divide-y divide-border">
                              <thead className="bg-secondary/20">
                                <tr>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Scenario</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Typical Speed</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Conversion You'll Need</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-border">
                                <tr>
                                  <td className="px-4 py-3 text-sm text-foreground">German autobahn driving</td>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">130 km/h recommended</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">→ 81 mph (for American visitors)</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-foreground">Urban cycling commute</td>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">20 km/h average</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">→ 12.4 mph (comparing to US cyclists)</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-foreground">Commercial jet cruise</td>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">Mach 0.85 at altitude</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">→ 562 knots or 1040 km/h (for understanding)</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-foreground">Marathon running pace</td>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">5 min/km pace</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">→ 12 km/h or 7.5 mph (comparing speeds)</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-foreground">Severe storm winds</td>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">50 m/s in tornado</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">→ 180 km/h or 112 mph (for public warnings)</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-foreground">Factory conveyor belt</td>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">2 ft/s production line</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">→ 0.61 m/s or 2.2 km/h (for international teams)</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Road Trip Across Europe: A Conversion Journey</h3>
                      <div className="bg-secondary/20 p-4 rounded-lg border border-border">
                        <p className="text-sm text-muted-foreground mb-3">
                          Imagine driving from the UK to Italy, passing through countries with different speed units and limits. Here's what you'd need to convert:
                        </p>
                        
                        <div className="space-y-3 text-sm">
                          <div>
                            <div className="font-medium text-foreground">UK (start): Motorway driving</div>
                            <div className="text-muted-foreground ml-3">Speed limit: 70 mph. Your rental car shows km/h. Convert: 70 mph = 113 km/h. Set cruise control to 110 km/h to be safe.</div>
                          </div>
                          
                          <div>
                            <div className="font-medium text-foreground">Channel Tunnel: Train transport</div>
                            <div className="text-muted-foreground ml-3">Shuttle speed: 160 km/h. As a Brit, you think: "That's 100 mph." Feels fast but smooth.</div>
                          </div>
                          
                          <div>
                            <div className="font-medium text-foreground">France: Autoroute</div>
                            <div className="text-muted-foreground ml-3">Limit: 130 km/h dry, 110 km/h wet. Convert: 130 = 81 mph, 110 = 68 mph. Notice how French limits feel similar to UK despite different numbers.</div>
                          </div>
                          
                          <div>
                            <div className="font-medium text-foreground">Switzerland: Mountain passes</div>
                            <div className="text-muted-foreground ml-3">Limit: 80 km/h on twisty roads. Convert: 50 mph. Much slower than UK motorways - adjusts driving style.</div>
                          </div>
                          
                          <div>
                            <div className="font-medium text-foreground">Italy: Autostrada</div>
                            <div className="text-muted-foreground ml-3">Limit: 130 km/h (81 mph). Similar to France. But Italians often drive faster - you see 150 km/h on speedometers (93 mph).</div>
                          </div>
                          
                          <div>
                            <div className="font-medium text-foreground">City driving throughout</div>
                            <div className="text-muted-foreground ml-3">Typically 50 km/h (31 mph) limits. Feels slow after highways. Pedestrian zones: 30 km/h (19 mph) - walking pace.</div>
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mt-3">
                          After a week, your brain starts thinking in both systems. You glance at the km/h display and know instinctively what it means in mph. That's the goal - developing intuition through practice, not just calculator use.
                        </p>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                      <h4 className="font-semibold text-foreground mb-2">The Learning Curve</h4>
                      <p className="text-sm text-muted-foreground">
                        When I first started driving in Europe as an American, I printed a cheat sheet: 30 km/h = 19 mph (school zones), 50 = 31 (towns), 80 = 50 (rural), 100 = 62 (highways), 130 = 81 (autobahn). After a few days, I didn't need it. The numbers became familiar. That's the real value of understanding conversions - not just getting the right answer, but developing fluency between measurement worlds.
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Use our converter for precision when you need it, but challenge yourself to estimate first. See how close you can get. That mental exercise builds the intuition that makes international travel, work, and communication smoother.
                      </p>
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
                    <Zap size={20} className="text-blue-600" />
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

export default SpeedConverter;