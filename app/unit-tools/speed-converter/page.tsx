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
      question: "What's the difference between km/h and mph speed measurements?",
      answer: "km/h (kilometers per hour) is metric system used worldwide, mph (miles per hour) is imperial system used primarily in the US and UK. 1 km/h = 0.621371 mph, 1 mph = 1.60934 km/h. Highway speed limits are typically 100-120 km/h (62-75 mph) internationally. For precise conversions, use exact factor 1 km/h = 0.62137119223733 mph."
    },
    {
      question: "How is Mach speed calculated and what does it represent?",
      answer: "Mach number represents speed relative to sound speed in air. Mach 1 = speed of sound = 1,234.8 km/h (767 mph) at sea level (20°C). Speed of sound varies with temperature and altitude. Our converter uses sea level standard: 1 Mach = 1,234.8 km/h. For precise aviation calculations, consider altitude-specific sound speeds."
    },
    {
      question: "What are knots and why are they used in aviation/maritime?",
      answer: "Knots (kn) measure speed in nautical miles per hour. 1 knot = 1.852 km/h = 1.15078 mph. Used in aviation, maritime, and meteorology because nautical miles correspond to one minute of latitude. This makes navigation calculations easier. Knots are standard for aircraft airspeed and ship speed internationally."
    },
    {
      question: "How accurate are speed conversion calculations for different applications?",
      answer: "Our converter uses precise conversion factors: km/h to mph 0.621371, m/s to km/h 3.6, knots to km/h 1.852. Calculations maintain 6 decimal place accuracy. For scientific applications, this precision is sufficient. For real-world applications like speed limit conversion, rounding to whole numbers is practical (100 km/h ≈ 62 mph)."
    },
    {
      question: "Which speed units should I use for specific modes of transportation?",
      answer: "Use km/h for cars and trains worldwide. Use mph for US/UK road vehicles. Use knots for aircraft and ships. Use m/s for scientific calculations and wind speeds. Use ft/s for engineering applications in imperial countries. Use Mach for high-speed aviation (supersonic). Choose units appropriate for your context and location."
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
                    Speed conversion between different units uses standardized factors based on kilometers per hour as the reference unit.
                  </p>
                  <div className="text-xs sm:text-sm space-y-1 pt-2">
                    <div className="font-medium text-foreground">Standard Speed Relationships:</div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span><strong>1 km/h</strong> = 0.621371 mph = 0.277778 m/s</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span><strong>1 m/s</strong> = 3.6 km/h = 2.23694 mph</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span><strong>1 knot</strong> = 1.852 km/h = 1.15078 mph</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span><strong>1 ft/s</strong> = 1.09728 km/h = 0.681818 mph</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm space-y-1 pt-3">
                    <div className="font-medium text-foreground">High-Speed References:</div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span><strong>Mach 1</strong> = Speed of sound = 1,234.8 km/h (sea level)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span><strong>Commercial jets</strong> typically cruise at Mach 0.78-0.85</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span><strong>Supersonic</strong> = Above Mach 1 (faster than sound)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span><strong>Hypersonic</strong> = Above Mach 5 (extreme speeds)</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm space-y-1 pt-3">
                    <div className="font-medium text-foreground">Precise Conversions (to km/h):</div>
                    <div className="flex justify-between">
                      <span>1 mph =</span>
                      <span>1.609344 km/h</span>
                    </div>
                    <div className="flex justify-between">
                      <span>1 m/s =</span>
                      <span>3.6 km/h</span>
                    </div>
                    <div className="flex justify-between">
                      <span>1 knot =</span>
                      <span>1.852 km/h</span>
                    </div>
                    <div className="flex justify-between">
                      <span>1 ft/s =</span>
                      <span>1.09728 km/h</span>
                    </div>
                    <div className="flex justify-between">
                      <span>1 Mach =</span>
                      <span>1,234.8 km/h</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm space-y-1 pt-3">
                    <div className="font-medium text-foreground">Common Applications:</div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                      <span><strong>Driving:</strong> km/h worldwide, mph in US/UK for speed limits and vehicle specifications</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                      <span><strong>Aviation:</strong> Knots for airspeed, Mach for high-altitude jet speeds</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                      <span><strong>Science:</strong> m/s for physics calculations, km/h for everyday science</span>
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
                    <Zap size={20} className="text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Speed Converter - Features & Applications</h2>
                </div>
                {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.whatItDoes && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground mb-4">
                    This Speed Converter provides instant, accurate conversions between all major speed measurement units. The tool seamlessly converts between kilometers per hour (metric), miles per hour (imperial), meters per second (scientific), knots (nautical/aviation), Mach (supersonic), and feet per second (engineering) using precise standardized conversion factors. Whether you're planning international travel, comparing vehicle specifications, analyzing sports performance, working on aviation projects, or conducting scientific research, this converter delivers reliable results with up to 6 decimal place accuracy. It automatically updates conversions in real-time as you type, includes common preset conversions for quick reference, and handles both everyday speeds (like driving limits) and extreme velocities (like supersonic flight). The intuitive interface makes it easy to switch between speed units and copy results for documentation, reports, or sharing with colleagues.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap size={18} className="text-blue-600" />
                        <h3 className="font-semibold text-foreground">Driving & Transportation</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Convert between km/h and mph for international driving, compare vehicle speed specifications, calculate travel times, and understand speed limits worldwide. Essential for road trips, vehicle imports, and transportation planning across different measurement systems.</p>
                    </div>
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Gauge size={18} className="text-green-600" />
                        <h3 className="font-semibold text-foreground">Aviation & Maritime</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Accurately convert between knots, km/h, and mph for aircraft and ship speed calculations. Includes Mach conversions for high-altitude jet operations. Perfect for pilots, sailors, aviation enthusiasts, and maritime professionals working with international speed standards.</p>
                    </div>
                    <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Car size={18} className="text-purple-600" />
                        <h3 className="font-semibold text-foreground">Sports & Athletics</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Convert running speeds, cycling velocities, and athletic performance metrics between different measurement units. Compare world records, calculate pace conversions, and analyze sports performance data using consistent speed measurements across international competitions.</p>
                    </div>
                    <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Plane size={18} className="text-amber-600" />
                        <h3 className="font-semibold text-foreground">Science & Engineering</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Handle precise speed conversions for physics experiments, engineering calculations, fluid dynamics, and meteorological applications. Convert between m/s, ft/s, and other scientific units for accurate technical calculations and research documentation.</p>
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
                    <Zap size={20} className="text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Speed Conversion Applications</h2>
                </div>
                {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.useCases && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">🚗 Automotive & Transportation</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>International Driving:</strong> Convert speed limits between km/h and mph for cross-border travel, calculate fuel efficiency at different speed units, and compare vehicle performance specifications from different markets</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Vehicle Import/Export:</strong> Convert speedometer readings between measurement systems, calculate technical specifications for international compliance, and understand performance metrics in different units for vehicle documentation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Fleet Management:</strong> Convert speed data between different measurement systems for international logistics, calculate delivery times using various speed units, and optimize routing based on speed limit conversions</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">✈️ Aviation & Aerospace</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Flight Planning:</strong> Convert airspeed between knots, km/h, and mph for flight operations, calculate ground speed conversions for navigation, and convert Mach numbers for high-altitude jet performance calculations</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Aircraft Performance:</strong> Convert takeoff and landing speeds between different units, calculate climb/descent rates in various measurement systems, and analyze aircraft specifications using international speed standards</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Space Exploration:</strong> Convert orbital velocities between different measurement units, calculate re-entry speeds using various systems, and analyze spacecraft performance metrics with precise speed conversions</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">🏃 Sports & Athletics</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Running & Cycling:</strong> Convert pace between minutes per km and minutes per mile for race planning, calculate speed conversions for training zones, and compare athletic performance across international competitions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Motor Sports:</strong> Convert lap speeds between different measurement systems for international racing, calculate acceleration rates in various units, and analyze vehicle performance using consistent speed metrics</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Water Sports:</strong> Convert sailing speeds between knots and km/h for competition planning, calculate rowing/paddling velocities in different units, and analyze watercraft performance across measurement systems</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">🔬 Science & Meteorology</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Weather Forecasting:</strong> Convert wind speeds between km/h, mph, knots, and m/s for meteorological reports, calculate storm velocities using different measurement systems, and analyze climate data with standardized speed units</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Physics Research:</strong> Convert velocity measurements between m/s, km/h, and other scientific units for experiments, calculate particle speeds in different measurement systems, and analyze motion data with precise conversions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Engineering Applications:</strong> Convert fluid velocities between different units for pipeline design, calculate mechanical speeds for equipment specifications, and analyze technical data using consistent speed measurements</span>
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
                    <Zap size={20} className="text-amber-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">How to Use Speed Converter - Complete Guide</h2>
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
                            <div className="font-medium text-foreground">Enter Your Speed Value</div>
                            <div className="text-sm text-muted-foreground">Type the numerical speed you want to convert in the "From" field. Enter whole numbers, decimals, or scientific notation for extremely fast or slow speeds.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                          <div>
                            <div className="font-medium text-foreground">Select Source Unit</div>
                            <div className="text-sm text-muted-foreground">Choose the current speed unit from the dropdown menu next to your input. Options include km/h, mph, m/s, knots, Mach, and ft/s for comprehensive speed conversion coverage.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                          <div>
                            <div className="font-medium text-foreground">Select Target Unit</div>
                            <div className="text-sm text-muted-foreground">Choose the speed unit you want to convert to from the "To" dropdown menu. The converter will automatically calculate and display the result in real-time as you make selections.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">4</div>
                          <div>
                            <div className="font-medium text-foreground">Use Conversion Results</div>
                            <div className="text-sm text-muted-foreground">Copy the converted value using the copy button, or click any preset conversion for instant calculations of common speed scenarios like highway limits or aviation speeds.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Pro Conversion Tips</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <div className="bg-blue-500/20 p-1 rounded mt-0.5">
                            <Zap size={12} className="text-blue-500" />
                          </div>
                          <span><strong>Quick Estimates:</strong> For approximate km/h to mph: multiply by 0.6. For mph to km/h: multiply by 1.6. For knots to km/h: multiply by 1.85. These approximations work well for mental calculations</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-green-500/20 p-1 rounded mt-0.5">
                            <Gauge size={12} className="text-green-500" />
                          </div>
                          <span><strong>Swap Function:</strong> Use the swap button between units to quickly reverse your conversion direction without re-entering speed values - perfect for checking calculations or comparing units</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-purple-500/20 p-1 rounded mt-0.5">
                            <Car size={12} className="text-purple-500" />
                          </div>
                          <span><strong>Common Conversions:</strong> Save time by using the preset conversion buttons for frequently needed calculations like speed limit conversions or aviation speed comparisons</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-amber-500/20 p-1 rounded mt-0.5">
                            <Plane size={12} className="text-amber-500" />
                          </div>
                          <span><strong>Precision Control:</strong> Results show up to 6 decimal places. For driving applications, round to whole numbers; for scientific work, use full precision as needed for accuracy</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-red-500/20 p-1 rounded mt-0.5">
                            <Copy size={12} className="text-red-500" />
                          </div>
                          <span><strong>Documentation Ready:</strong> Use the copy function to save conversion results for travel documents, technical reports, aviation logs, or scientific papers requiring accurate speed measurements</span>
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
                    <Zap size={20} className="text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Speed Conversion Examples</h2>
                </div>
                {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.examples && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">Common Speed Conversion Examples</h3>
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
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">100</td>
                                  <td className="px-4 py-3 text-sm text-foreground">km/h</td>
                                  <td className="px-4 py-3 text-sm text-foreground">mph</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">62.14</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Highway speed</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">60</td>
                                  <td className="px-4 py-3 text-sm text-foreground">mph</td>
                                  <td className="px-4 py-3 text-sm text-foreground">km/h</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">96.56</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Urban driving</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">500</td>
                                  <td className="px-4 py-3 text-sm text-foreground">knots</td>
                                  <td className="px-4 py-3 text-sm text-foreground">km/h</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">926.00</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Jet cruising</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">10</td>
                                  <td className="px-4 py-3 text-sm text-foreground">m/s</td>
                                  <td className="px-4 py-3 text-sm text-foreground">km/h</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">36.00</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Sprinting speed</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">2.5</td>
                                  <td className="px-4 py-3 text-sm text-foreground">Mach</td>
                                  <td className="px-4 py-3 text-sm text-foreground">km/h</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">3087.00</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Supersonic flight</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">88</td>
                                  <td className="px-4 py-3 text-sm text-foreground">ft/s</td>
                                  <td className="px-4 py-3 text-sm text-foreground">km/h</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">96.56</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Engineering speed</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Detailed Example: International Aviation Operations</h3>
                      <div className="bg-secondary/20 p-4 rounded-lg border border-border overflow-x-auto">
                        <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
{`Example: Speed conversions for international flight operations

Aircraft: Boeing 787 Dreamliner on transatlantic route
Route: New York (JFK) to London (LHR)
Operational requirements: Convert between speed units for different flight phases

Step 1: Takeoff Speed Conversions
Maximum takeoff weight: 228,000 kg
Takeoff speeds:
• V1 (Takeoff decision speed): 150 knots
  Convert to km/h: 150 × 1.852 = 277.8 km/h
  Convert to mph: 150 × 1.15078 = 172.6 mph
  Convert to m/s: 277.8 ÷ 3.6 = 77.2 m/s

• VR (Rotation speed): 155 knots
  Convert to km/h: 155 × 1.852 = 287.1 km/h
  Convert to mph: 155 × 1.15078 = 178.4 mph

• V2 (Takeoff safety speed): 160 knots
  Convert to km/h: 160 × 1.852 = 296.3 km/h
  Convert to mph: 160 × 1.15078 = 184.1 mph

Step 2: Climb Phase Conversions
Climb speeds:
• Initial climb: 250 knots (below 10,000 ft)
  Convert to km/h: 250 × 1.852 = 463.0 km/h
  Convert to mph: 250 × 1.15078 = 287.7 mph
  Convert to Mach: 463 ÷ 1234.8 = 0.375 Mach

• Accelerated climb: 300 knots
  Convert to km/h: 300 × 1.852 = 555.6 km/h
  Convert to mph: 300 × 1.15078 = 345.2 mph
  Convert to Mach: 555.6 ÷ 1234.8 = 0.450 Mach

Step 3: Cruise Phase Conversions
Cruise altitude: 40,000 ft
Cruise speeds:
• Typical cruise: Mach 0.85
  Convert to km/h: 0.85 × 1234.8 = 1049.6 km/h
  Convert to mph: 1049.6 × 0.621371 = 652.3 mph
  Convert to knots: 1049.6 ÷ 1.852 = 566.8 knots

• Maximum cruise: Mach 0.90
  Convert to km/h: 0.90 × 1234.8 = 1111.3 km/h
  Convert to mph: 1111.3 × 0.621371 = 690.6 mph
  Convert to knots: 1111.3 ÷ 1.852 = 600.0 knots

• Long-range cruise: Mach 0.84
  Convert to km/h: 0.84 × 1234.8 = 1037.2 km/h
  Convert to mph: 1037.2 × 0.621371 = 644.6 mph
  Convert to knots: 1037.2 ÷ 1.852 = 560.0 knots

Step 4: Descent Phase Conversions
Descent speeds:
• Initial descent: Mach 0.82
  Convert to km/h: 0.82 × 1234.8 = 1012.5 km/h
  Convert to mph: 1012.5 × 0.621371 = 629.2 mph
  Convert to knots: 1012.5 ÷ 1.852 = 546.7 knots

• Approach descent: 250 knots
  Convert to km/h: 250 × 1.852 = 463.0 km/h
  Convert to mph: 250 × 1.15078 = 287.7 mph
  Convert to Mach: 463 ÷ 1234.8 = 0.375 Mach

Step 5: Approach and Landing Conversions
Landing speeds:
• Final approach: 140 knots
  Convert to km/h: 140 × 1.852 = 259.3 km/h
  Convert to mph: 140 × 1.15078 = 161.1 mph
  Convert to m/s: 259.3 ÷ 3.6 = 72.0 m/s

• Landing speed: 135 knots
  Convert to km/h: 135 × 1.852 = 250.0 km/h
  Convert to mph: 135 × 1.15078 = 155.4 mph
  Convert to m/s: 250.0 ÷ 3.6 = 69.4 m/s

Step 6: Ground Speed Calculations
Flight planning calculations:
• Headwind component: 50 knots
  Convert to km/h: 50 × 1.852 = 92.6 km/h
  Convert to mph: 50 × 1.15078 = 57.5 mph

• True airspeed: Mach 0.85 at 40,000 ft = 1049.6 km/h
• Ground speed with 50 knot headwind:
  Ground speed = TAS - headwind
  In knots: 566.8 - 50 = 516.8 knots
  In km/h: 1049.6 - 92.6 = 957.0 km/h
  In mph: 652.3 - 57.5 = 594.8 mph

• Estimated flight time: Distance 5,500 km
  Time in knots: 5,500 ÷ 957.0 × 1.852 = 10.65 hours
  Time in km/h: 5,500 ÷ 957.0 = 5.75 hours (actually 5.75 × 1.852 conversion needed)
  Correct calculation: Time = Distance ÷ Ground speed
  Time = 5,500 km ÷ 957.0 km/h = 5.75 hours = 5h 45min

Step 7: Fuel Calculations
Fuel flow at cruise: 5,500 kg/hour
• Speed in knots: 566.8 knots
  Fuel per nautical mile: 5,500 ÷ 566.8 = 9.70 kg/NM
• Speed in km/h: 1049.6 km/h
  Fuel per kilometer: 5,500 ÷ 1049.6 = 5.24 kg/km
• Speed in mph: 652.3 mph
  Fuel per mile: 5,500 ÷ 652.3 = 8.43 kg/mile

Total fuel for 5,500 km flight:
• In km/h calculation: 5,500 km × 5.24 kg/km = 28,820 kg
• In knots calculation: (5,500 ÷ 1.852) NM × 9.70 kg/NM = 28,820 kg
• In mph calculation: (5,500 × 0.621371) miles × 8.43 kg/mile = 28,820 kg

Step 8: International Regulations Compliance
Speed limit conversions:
• Below 10,000 ft: 250 knots maximum
  ICAO standard: 250 knots
  Convert to km/h for European pilots: 463 km/h
  Convert to mph for US pilots: 288 mph

• Terminal area: 200 knots maximum
  Convert to km/h: 370 km/h
  Convert to mph: 230 mph

• Noise abatement: 220 knots maximum
  Convert to km/h: 407 km/h
  Convert to mph: 253 mph

Step 9: Performance Monitoring
Performance parameters:
• Rate of climb: 3,000 ft/minute
  Convert to m/s: 3,000 × 0.3048 ÷ 60 = 15.24 m/s
  Convert to km/h vertical: 15.24 × 3.6 = 54.86 km/h vertical

• Rate of descent: 2,000 ft/minute
  Convert to m/s: 2,000 × 0.3048 ÷ 60 = 10.16 m/s
  Convert to km/h vertical: 10.16 × 3.6 = 36.58 km/h vertical

Step 10: International Communication
ATC communications with different units:
• US ATC: "Maintain 280 knots"
  European pilot converts to km/h: 280 × 1.852 = 519 km/h
• European ATC: "Maintain 500 km/h"
  US pilot converts to knots: 500 ÷ 1.852 = 270 knots
• Oceanic ATC: "Maintain Mach 0.85"
  All pilots convert as needed:
  - European: 0.85 × 1234.8 = 1049.6 km/h
  - US: 0.85 × 767 = 652 mph
  - All: 0.85 × 661.5 = 562 knots

Conclusion:
Using accurate speed conversions ensures safe flight operations, proper fuel planning, regulatory compliance, and effective international communication in aviation. The speed converter provides the precision needed for professional aviation calculations while maintaining accessibility for general transportation and sports applications.`}
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