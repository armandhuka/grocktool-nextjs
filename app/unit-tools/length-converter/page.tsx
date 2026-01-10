'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowLeftRight, Copy, RotateCcw, ChevronDown, ChevronUp, Ruler, Navigation, MapPin, Building, Truck, Maximize } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '../../hooks/use-toast';
import Link from 'next/link';

const LengthConverter = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState('meters');
  const [toUnit, setToUnit] = useState('feet');
  const [result, setResult] = useState<string>('');
  const [openSections, setOpenSections] = useState({
    typesOfUnits: false,
    realWorldUsage: false,
    conversionFormulas: false,
    precisionRules: false,
    examples: false,
    commonErrors: false,
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
    { name: 'Weight Converter', path: '/unit-tools/weight-converter', icon: Maximize },
    { name: 'Temperature Converter', path: '/unit-tools/temperature-converter', icon: Navigation },
    { name: 'Time Converter', path: '/unit-tools/time-converter', icon: MapPin },
    { name: 'Speed Converter', path: '/unit-tools/speed-converter', icon: Truck },
    { name: 'Area Converter', path: '/unit-tools/area-converter', icon: Building },
    { name: 'Volume Converter', path: '/unit-tools/volume-converter', icon: Maximize },
    { name: 'Data Size Converter', path: '/unit-tools/data-size-converter', icon: Navigation }
  ];

  // FAQ Data
  const faqData = [
    {
      question: "What's the most accurate way to convert between metric and imperial?",
      answer: "For maximum accuracy, use the exact conversion factors: 1 meter equals exactly 3.280839895 feet, and 1 inch equals exactly 2.54 centimeters. Our converter uses these precise values, which are essential for engineering and construction work where small errors can accumulate."
    },
    {
      question: "How do I convert feet and inches together?",
      answer: "Convert inches to feet first by dividing by 12, then add to the feet value. For example, 5 feet 6 inches becomes 5 + (6/12) = 5.5 feet. Enter this decimal value into the converter. The same principle works in reverse - if you get 5.5 feet as a result, that means 5 feet and 6 inches (0.5 × 12 = 6 inches)."
    },
    {
      question: "Why do different countries use different length units?",
      answer: "Historical development led to different systems. The metric system (meters) was created during the French Revolution for standardization and is now used by most countries. Imperial units (feet, inches) evolved from ancient Roman and British measurements and are still used in the United States, Liberia, and Myanmar due to tradition and the cost of changing established systems."
    },
    {
      question: "What's better for construction - metric or imperial?",
      answer: "It depends on location and materials. In the US, imperial works better because building materials come in feet and inches. In most other countries, metric is standard. For international projects, metric is usually preferred because calculations are simpler (base 10) and less prone to errors. Many architects now use metric even in the US for large projects."
    },
    {
      question: "How precise should I be for everyday measurements?",
      answer: "For most daily tasks, rounding to 2 decimal places is sufficient. Measuring a room? Round to nearest centimeter or half-inch. Buying fabric? Round to nearest 10 centimeters or quarter-yard. Only technical work requires more precision. Our converter shows up to 6 decimals, but you should round based on your actual measuring tool's accuracy."
    }
  ];

  const lengthUnits = {
    meters: { name: 'Meters', abbreviation: 'm', factor: 1 },
    centimeters: { name: 'Centimeters', abbreviation: 'cm', factor: 0.01 },
    millimeters: { name: 'Millimeters', abbreviation: 'mm', factor: 0.001 },
    kilometers: { name: 'Kilometers', abbreviation: 'km', factor: 1000 },
    feet: { name: 'Feet', abbreviation: 'ft', factor: 0.3048 },
    inches: { name: 'Inches', abbreviation: 'in', factor: 0.0254 },
    yards: { name: 'Yards', abbreviation: 'yd', factor: 0.9144 },
    miles: { name: 'Miles', abbreviation: 'mi', factor: 1609.344 }
  };

  const convertLength = () => {
    if (!inputValue || isNaN(Number(inputValue))) {
      setResult('');
      return;
    }

    const value = Number(inputValue);
    const fromFactor = lengthUnits[fromUnit as keyof typeof lengthUnits].factor;
    const toFactor = lengthUnits[toUnit as keyof typeof lengthUnits].factor;
    
    const meters = value * fromFactor;
    const converted = meters / toFactor;
    
    setResult(converted.toFixed(6).replace(/\.?0+$/, ''));
  };

  useEffect(() => {
    convertLength();
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
      <title>Length Converter | Meters to Feet, Inches, Centimeters, Kilometers | GrockTool.com</title>
      <meta name="description" content="Free online length converter tool. Convert between meters, feet, inches, centimeters, millimeters, kilometers, yards, and miles instantly. Accurate measurements for construction, engineering, and daily use." />
      <meta name="keywords" content="length converter, meters to feet, inches to cm, feet to meters, cm to inches, kilometer to mile, millimeter converter, yard conversion, distance converter" />
      <meta property="og:title" content="Length Converter | Meters to Feet, Inches, Centimeters, Kilometers" />
      <meta property="og:description" content="Free online length converter tool. Convert between meters, feet, inches, centimeters, millimeters, kilometers, yards, and miles instantly." />
      <link rel="canonical" href="https://grocktool.com/unit-tools/length-converter" />
      
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
                <Ruler size={16} className="text-blue-600" />
                <span className="text-sm font-medium text-blue-600">Unit Conversion • Measurement • Engineering</span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                Length Converter
                <span className="block text-lg sm:text-xl lg:text-2xl font-normal text-muted-foreground mt-2">
                  Convert Meters • Feet • Inches • Centimeters • Kilometers • Miles • Yards • Millimeters
                </span>
              </h1>
              
              <div className="flex flex-wrap justify-center gap-4 mt-6 mb-8">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 rounded-lg">
                  <Ruler size={14} className="text-blue-600" />
                  <span className="text-xs sm:text-sm text-foreground">Metric & Imperial</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-lg">
                  <Copy size={14} className="text-green-600" />
                  <span className="text-xs sm:text-sm text-foreground">Real-time Conversion</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 rounded-lg">
                  <Navigation size={14} className="text-purple-600" />
                  <span className="text-xs sm:text-sm text-foreground">8 Length Units</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 rounded-lg">
                  <MapPin size={14} className="text-amber-600" />
                  <span className="text-xs sm:text-sm text-foreground">Construction Ready</span>
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
                  <div className="text-xs text-muted-foreground">Common Length Conversions:</div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      onClick={() => {
                        setFromUnit('meters');
                        setToUnit('feet');
                        setInputValue('1');
                      }}
                      className="px-3 py-2 bg-blue-500/10 text-blue-600 rounded-lg hover:bg-blue-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Ruler size={12} />
                      1 m to ft
                    </button>
                    <button
                      onClick={() => {
                        setFromUnit('feet');
                        setToUnit('meters');
                        setInputValue('10');
                      }}
                      className="px-3 py-2 bg-green-500/10 text-green-600 rounded-lg hover:bg-green-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Navigation size={12} />
                      10 ft to m
                    </button>
                    <button
                      onClick={() => {
                        setFromUnit('centimeters');
                        setToUnit('inches');
                        setInputValue('30');
                      }}
                      className="px-3 py-2 bg-purple-500/10 text-purple-600 rounded-lg hover:bg-purple-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <MapPin size={12} />
                      30 cm to in
                    </button>
                    <button
                      onClick={() => {
                        setFromUnit('kilometers');
                        setToUnit('miles');
                        setInputValue('5');
                      }}
                      className="px-3 py-2 bg-amber-500/10 text-amber-600 rounded-lg hover:bg-amber-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Building size={12} />
                      5 km to mi
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
                      <Ruler size={20} className="text-foreground" />
                      <label className="block text-sm font-medium text-foreground">
                        Length Converter
                      </label>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-blue-600">
                      <Ruler size={12} />
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
                          placeholder="Enter length value"
                          className="flex-1 p-3 sm:p-4 text-base bg-input border border-border rounded-lg sm:rounded-xl focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-ring focus:ring-opacity-50"
                        />
                        <select
                          value={fromUnit}
                          onChange={(e) => setFromUnit(e.target.value)}
                          className="w-24 sm:w-28 p-3 sm:p-4 bg-input border border-border rounded-lg sm:rounded-xl focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-ring focus:ring-opacity-50 text-sm sm:text-base"
                        >
                          {Object.entries(lengthUnits).map(([key, unit]) => (
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
                            placeholder="Converted length"
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
                          {Object.entries(lengthUnits).map(([key, unit]) => (
                            <option key={key} value={key}>{unit.name} ({unit.abbreviation})</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Unit Info */}
                  <div className="p-3 bg-gradient-to-r from-secondary/20 to-secondary/10 rounded-lg border border-border">
                    <div className="text-xs font-medium text-foreground mb-1">Current Conversion:</div>
                    <div className="text-xs text-muted-foreground">
                      {inputValue && result ? (
                        <div>
                          {inputValue} {lengthUnits[fromUnit as keyof typeof lengthUnits].abbreviation} = {result} {lengthUnits[toUnit as keyof typeof lengthUnits].abbreviation}
                          <div className="mt-1 text-xs">
                            (1 {lengthUnits[fromUnit as keyof typeof lengthUnits].abbreviation} = {(lengthUnits[fromUnit as keyof typeof lengthUnits].factor / lengthUnits[toUnit as keyof typeof lengthUnits].factor).toFixed(6)} {lengthUnits[toUnit as keyof typeof lengthUnits].abbreviation})
                          </div>
                        </div>
                      ) : (
                        "Enter a value to see conversion details"
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={convertLength}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all text-sm sm:text-base font-medium shadow-md hover:shadow-lg"
                    >
                      <Ruler size={16} className="sm:w-4 sm:h-4" />
                      Convert Length
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
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">Common Length Conversions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {[
                    { from: 'meters', to: 'feet', value: 1, label: '1 meter to feet' },
                    { from: 'feet', to: 'meters', value: 1, label: '1 foot to meters' },
                    { from: 'centimeters', to: 'inches', value: 100, label: '100 cm to inches' },
                    { from: 'inches', to: 'centimeters', value: 1, label: '1 inch to cm' },
                    { from: 'kilometers', to: 'miles', value: 1, label: '1 km to miles' },
                    { from: 'miles', to: 'kilometers', value: 1, label: '1 mile to km' },
                    { from: 'yards', to: 'meters', value: 10, label: '10 yards to meters' },
                    { from: 'millimeters', to: 'inches', value: 25.4, label: '25.4 mm to inches' }
                  ].map((conversion, index) => {
                    const fromUnitData = lengthUnits[conversion.from as keyof typeof lengthUnits];
                    const toUnitData = lengthUnits[conversion.to as keyof typeof lengthUnits];
                    const fromFactor = fromUnitData.factor;
                    const toFactor = toUnitData.factor;
                    const meters = conversion.value * fromFactor;
                    const result = (meters / toFactor).toFixed(4);
                    
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
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">Length Unit Reference</h3>
                <div className="space-y-2 text-muted-foreground text-sm">
                  <p>
                    Length conversion between metric and imperial systems uses standardized international conversion factors.
                  </p>
                  <div className="text-xs sm:text-sm space-y-1 pt-2">
                    <div className="font-medium text-foreground">Metric System (Base: Meter):</div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span><strong>1 kilometer</strong> = 1000 meters</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span><strong>1 meter</strong> = 100 centimeters</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span><strong>1 centimeter</strong> = 10 millimeters</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm space-y-1 pt-3">
                    <div className="font-medium text-foreground">Imperial System:</div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span><strong>1 mile</strong> = 1760 yards = 5280 feet</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span><strong>1 yard</strong> = 3 feet = 36 inches</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span><strong>1 foot</strong> = 12 inches</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm space-y-1 pt-3">
                    <div className="font-medium text-foreground">Standard Conversions:</div>
                    <div className="flex justify-between">
                      <span>1 meter =</span>
                      <span>3.280839895 feet</span>
                    </div>
                    <div className="flex justify-between">
                      <span>1 foot =</span>
                      <span>0.3048 meters</span>
                    </div>
                    <div className="flex justify-between">
                      <span>1 inch =</span>
                      <span>2.54 centimeters</span>
                    </div>
                    <div className="flex justify-between">
                      <span>1 mile =</span>
                      <span>1.609344 kilometers</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm space-y-1 pt-3">
                    <div className="font-medium text-foreground">Common Applications:</div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                      <span><strong>Construction:</strong> Feet and inches for framing, meters for large projects</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                      <span><strong>Science:</strong> Meters and millimeters for precision</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                      <span><strong>Travel:</strong> Kilometers or miles for distances</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* SEO Content Section with Dropdowns */}
          <section className="space-y-4 mt-12">
            {/* Types of Length Units */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('typesOfUnits')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500/10 p-2 rounded-lg">
                    <Ruler size={20} className="text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Types of Length Units Explained</h2>
                </div>
                {openSections.typesOfUnits ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.typesOfUnits && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Metric Units (International System)</h3>
                      <p className="text-muted-foreground mb-3">
                        The metric system, used by most countries worldwide, is based on the meter as its fundamental unit. What makes it particularly user-friendly is its decimal nature - everything scales by factors of 10. This means conversions within the system are as simple as moving decimal points.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div className="bg-blue-500/5 p-3 rounded-lg border border-blue-500/10">
                          <div className="font-medium text-foreground mb-1">Meters (m)</div>
                          <p className="text-muted-foreground">The base unit, originally defined as one ten-millionth of the distance from the equator to the North Pole. Perfect for room dimensions, furniture sizes, and everyday measurements.</p>
                        </div>
                        <div className="bg-blue-500/5 p-3 rounded-lg border border-blue-500/10">
                          <div className="font-medium text-foreground mb-1">Centimeters (cm)</div>
                          <p className="text-muted-foreground">One hundredth of a meter. Ideal for clothing measurements, book sizes, and smaller objects. Most rulers show centimeters alongside inches.</p>
                        </div>
                        <div className="bg-blue-500/5 p-3 rounded-lg border border-blue-500/10">
                          <div className="font-medium text-foreground mb-1">Millimeters (mm)</div>
                          <p className="text-muted-foreground">One thousandth of a meter. Used for precision work like engineering drawings, jewelry making, and mechanical parts. Paper thickness is often measured in millimeters.</p>
                        </div>
                        <div className="bg-blue-500/5 p-3 rounded-lg border border-blue-500/10">
                          <div className="font-medium text-foreground mb-1">Kilometers (km)</div>
                          <p className="text-muted-foreground">One thousand meters. Standard for road distances, running races, and geographical measurements. Most countries use kilometers for speed limits and distance signs.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Imperial Units (US Customary System)</h3>
                      <p className="text-muted-foreground mb-3">
                        The imperial system, primarily used in the United States, has historical roots in ancient measurements. Unlike the metric system, it doesn't use a consistent base-10 structure, which can make conversions more challenging without tools like this one.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div className="bg-green-500/5 p-3 rounded-lg border border-green-500/10">
                          <div className="font-medium text-foreground mb-1">Feet (ft)</div>
                          <p className="text-muted-foreground">Based on the average length of a human foot. Standard for human height, room dimensions, and construction in the US. Most tape measures are marked in feet and inches.</p>
                        </div>
                        <div className="bg-green-500/5 p-3 rounded-lg border border-green-500/10">
                          <div className="font-medium text-foreground mb-1">Inches (in)</div>
                          <p className="text-muted-foreground">Originally based on the width of a human thumb. Used for smaller measurements like screen sizes, pipe diameters, and wood thickness. There are 12 inches in a foot.</p>
                        </div>
                        <div className="bg-green-500/5 p-3 rounded-lg border border-green-500/10">
                          <div className="font-medium text-foreground mb-1">Yards (yd)</div>
                          <p className="text-muted-foreground">Three feet make a yard. Common for fabric measurements, football fields, and landscaping. A yard is roughly the length of a stride for an average adult.</p>
                        </div>
                        <div className="bg-green-500/5 p-3 rounded-lg border border-green-500/10">
                          <div className="font-medium text-foreground mb-1">Miles (mi)</div>
                          <p className="text-muted-foreground">5,280 feet. Used for road distances, running events (marathons are 26.2 miles), and geographical measurements. The statute mile differs from the nautical mile used in navigation.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-secondary/20 p-4 rounded-lg">
                      <h4 className="font-medium text-foreground mb-2">When to Use Which System</h4>
                      <p className="text-sm text-muted-foreground">
                        <strong>Use metric</strong> for scientific work, international projects, engineering calculations, and when working with countries outside the US. <strong>Use imperial</strong> for construction in the US, real estate, DIY projects with US materials, and when communicating with American clients or colleagues. Many industries use both - for example, a car might have metric bolts but imperial tire sizes.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </article>

            {/* Real-World Length Usage */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('realWorldUsage')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-green-500/10 p-2 rounded-lg">
                    <MapPin size={20} className="text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Real-World Length Usage Examples</h2>
                </div>
                {openSections.realWorldUsage ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.realWorldUsage && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-muted-foreground mb-4">
                        Understanding length units isn't just about numbers - it's about knowing which units make sense for different situations. Here's how length measurements work in everyday life and professional settings.
                      </p>
                      
                      <div className="space-y-4">
                        <div className="bg-blue-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">🏠 Home & Construction</h3>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-start gap-2">
                              <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span><strong>Room dimensions</strong> are typically measured in feet and inches in the US (12' × 15' living room) but in meters elsewhere (3.6m × 4.5m). Ceiling height is usually 8-9 feet (2.4-2.7m) in residential buildings.</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span><strong>Lumber</strong> in the US comes in nominal sizes like 2×4 (actually 1.5" × 3.5") while in metric countries, it's sold in actual millimeter dimensions like 38mm × 89mm.</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span><strong>Flooring</strong> is often sold by the square foot in the US but by the square meter elsewhere. A typical bedroom might need 180 square feet or about 16.7 square meters of carpet.</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div className="bg-green-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">🛒 Shopping & Retail</h3>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-start gap-2">
                              <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span><strong>Clothing sizes</strong> use different measurements: US pants sizes are in inches (waist 32", inseam 30"), while European sizes are in centimeters (81cm waist, 76cm inseam).</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span><strong>TV screens</strong> are measured diagonally in inches worldwide, even in metric countries. A 55-inch TV is about 140 centimeters diagonally.</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span><strong>Fabric</strong> is sold by the yard in the US (3 feet) and by the meter elsewhere. A yard is about 91 centimeters, so three yards is roughly 2.75 meters.</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div className="bg-purple-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">🚗 Travel & Transportation</h3>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-start gap-2">
                              <div className="w-1 h-1 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span><strong>Road signs</strong> show kilometers per hour outside the US (100 km/h limit) and miles per hour in the US (65 mph). 100 km/h equals about 62 mph.</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-1 h-1 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span><strong>Fuel efficiency</strong> is measured in miles per gallon (mpg) in the US but liters per 100 kilometers elsewhere. A car that gets 30 mpg uses about 7.8 liters per 100 km.</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-1 h-1 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span><strong>Running races</strong> use different units: 5K and 10K races are in kilometers (3.1 and 6.2 miles), while marathons are 26.2 miles (42.195 kilometers).</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div className="bg-amber-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">🔧 Professional & Technical</h3>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-start gap-2">
                              <div className="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span><strong>Engineering drawings</strong> use millimeters for precision, even for large objects. A machine part might be 125mm long, while the whole machine is 2500mm.</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span><strong>Surveying</strong> in the US uses feet and sometimes chains (66 feet), while most other countries use meters. A property lot might be 100' × 150' or 30.5m × 45.7m.</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span><strong>Medical measurements</strong> use centimeters for height and kilograms for weight worldwide, though some US doctors still use feet/inches and pounds.</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="mt-6 p-4 bg-secondary/20 rounded-lg">
                        <h4 className="font-medium text-foreground mb-2">Quick Reference: Common Objects for Scale</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                          <div className="text-center">
                            <div className="font-medium">Credit Card</div>
                            <div className="text-muted-foreground">3.37" × 2.125"<br/>85.6mm × 54mm</div>
                          </div>
                          <div className="text-center">
                            <div className="font-medium">Letter Paper</div>
                            <div className="text-muted-foreground">8.5" × 11"<br/>216mm × 279mm</div>
                          </div>
                          <div className="text-center">
                            <div className="font-medium">Basketball Hoop</div>
                            <div className="text-muted-foreground">10 feet high<br/>3.05 meters</div>
                          </div>
                          <div className="text-center">
                            <div className="font-medium">Football Field</div>
                            <div className="text-muted-foreground">100 yards<br/>91.44 meters</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </article>

            {/* Conversion Formula Reference */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('conversionFormulas')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-purple-500/10 p-2 rounded-lg">
                    <Navigation size={20} className="text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Conversion Formula Reference</h2>
                </div>
                {openSections.conversionFormulas ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.conversionFormulas && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-muted-foreground mb-4">
                        While our converter does the math automatically, understanding the formulas behind length conversions helps you verify results and work more confidently with measurements. Here are the exact formulas used for common conversions.
                      </p>
                      
                      <div className="overflow-x-auto">
                        <div className="min-w-full inline-block align-middle">
                          <div className="overflow-hidden border border-border rounded-lg">
                            <table className="min-w-full divide-y divide-border">
                              <thead className="bg-secondary/20">
                                <tr>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Conversion</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Exact Formula</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Approximate</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Notes</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-border">
                                <tr>
                                  <td className="px-4 py-3 text-sm font-medium text-foreground">Feet to Meters</td>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">meters = feet × 0.3048</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">feet ÷ 3.2808</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Exact since 1959 international agreement</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-medium text-foreground">Meters to Feet</td>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">feet = meters × 3.280839895</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">meters × 3.281</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">The reciprocal of 0.3048</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-medium text-foreground">Inches to Centimeters</td>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">cm = inches × 2.54</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">inches × 2.5</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Exact definition since 1959</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-medium text-foreground">Centimeters to Inches</td>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">inches = cm ÷ 2.54</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">cm × 0.3937</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Divide by 2.54 exactly</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-medium text-foreground">Miles to Kilometers</td>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">km = miles × 1.609344</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">miles × 1.609</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">International mile definition</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-medium text-foreground">Kilometers to Miles</td>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">miles = km ÷ 1.609344</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">km × 0.6214</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Reciprocal of 1.609344</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-medium text-foreground">Yards to Meters</td>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">meters = yards × 0.9144</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">yards ÷ 1.094</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Exactly 0.9144 meters per yard</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-medium text-foreground">Millimeters to Inches</td>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">inches = mm ÷ 25.4</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">mm × 0.03937</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Since 1 inch = 25.4 mm exactly</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <div className="bg-blue-500/5 p-4 rounded-lg border border-blue-500/10">
                        <h4 className="font-medium text-foreground mb-2">How These Formulas Work</h4>
                        <p className="text-sm text-muted-foreground">
                          All length conversions go through meters as the intermediate step. To convert from any unit to any other: (1) Convert source unit to meters using its exact factor, (2) Convert meters to target unit using the reciprocal of that unit's factor. This two-step process ensures maximum accuracy.
                        </p>
                      </div>
                      <div className="bg-green-500/5 p-4 rounded-lg border border-green-500/10">
                        <h4 className="font-medium text-foreground mb-2">Quick Mental Conversions</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Feet to meters: Divide by 3 and add 10%</li>
                          <li>• Meters to feet: Multiply by 3 and add 10%</li>
                          <li>• Miles to km: Multiply by 8/5 (5 miles ≈ 8 km)</li>
                          <li>• Inches to cm: Multiply by 2.5 (close enough for most needs)</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-secondary/20 p-4 rounded-lg mt-4">
                      <h4 className="font-medium text-foreground mb-2">Historical Context of Conversion Factors</h4>
                      <p className="text-sm text-muted-foreground">
                        The current exact conversion factors were established by international agreement in 1959. Before that, the US survey foot was slightly different (1200/3937 meters vs 0.3048 exactly). This old definition still appears in some US land survey data. The inch was redefined in terms of the meter in 1959, making 1 inch exactly 2.54 centimeters. These standardized definitions eliminated small variations that previously existed between different countries' measurement systems.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </article>

            {/* Precision & Rounding Rules */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('precisionRules')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-amber-500/10 p-2 rounded-lg">
                    <Ruler size={20} className="text-amber-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Precision & Rounding Rules</h2>
                </div>
                {openSections.precisionRules ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.precisionRules && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-muted-foreground mb-4">
                        Knowing how many decimal places to use can be just as important as getting the conversion right. Too many decimals can suggest false precision, while too few can cause errors. Here's how to choose the right precision for different situations.
                      </p>
                      
                      <div className="space-y-4">
                        <div className="bg-blue-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">General Precision Guidelines</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="space-y-2">
                              <div className="font-medium text-foreground text-sm">Construction & DIY</div>
                              <div className="text-xs text-muted-foreground">
                                Round to nearest 1/16" (0.0625") or 1mm. For framing, 1/4" or 5mm is usually fine. Concrete work might need 1/8" precision.
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="font-medium text-foreground text-sm">Engineering & Machining</div>
                              <div className="text-xs text-muted-foreground">
                                Typically 0.001" (one thou) or 0.01mm precision. Critical parts might need 0.0001" or 0.001mm.
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="font-medium text-foreground text-sm">Everyday Measurements</div>
                              <div className="text-xs text-muted-foreground">
                                Round to nearest 1/4" or 0.5cm. For room dimensions, nearest inch or centimeter is usually sufficient.
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-green-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">Rounding Rules by Application</h3>
                          <div className="overflow-x-auto">
                            <div className="min-w-full inline-block align-middle">
                              <div className="overflow-hidden border border-border rounded-lg">
                                <table className="min-w-full divide-y divide-border">
                                  <thead className="bg-secondary/20">
                                    <tr>
                                      <th className="px-4 py-2 text-left text-xs font-medium text-foreground">Measurement Type</th>
                                      <th className="px-4 py-2 text-left text-xs font-medium text-foreground">Imperial Precision</th>
                                      <th className="px-4 py-2 text-left text-xs font-medium text-foreground">Metric Precision</th>
                                      <th className="px-4 py-2 text-left text-xs font-medium text-foreground">Reason</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-border">
                                    <tr>
                                      <td className="px-4 py-2 text-xs font-medium text-foreground">Room Dimensions</td>
                                      <td className="px-4 py-2 text-xs text-muted-foreground">Nearest inch</td>
                                      <td className="px-4 py-2 text-xs text-muted-foreground">Nearest centimeter</td>
                                      <td className="px-4 py-2 text-xs text-muted-foreground">Tape measures have this precision</td>
                                    </tr>
                                    <tr>
                                      <td className="px-4 py-2 text-xs font-medium text-foreground">Woodworking</td>
                                      <td className="px-4 py-2 text-xs text-muted-foreground">1/16 inch</td>
                                      <td className="px-4 py-2 text-xs text-muted-foreground">1 millimeter</td>
                                      <td className="px-4 py-2 text-xs text-muted-foreground">Typical saw blade kerf</td>
                                    </tr>
                                    <tr>
                                      <td className="px-4 py-2 text-xs font-medium text-foreground">Metal Machining</td>
                                      <td className="px-4 py-2 text-xs text-muted-foreground">0.001 inch</td>
                                      <td className="px-4 py-2 text-xs text-muted-foreground">0.01 mm</td>
                                      <td className="px-4 py-2 text-xs text-muted-foreground">CNC machine capability</td>
                                    </tr>
                                    <tr>
                                      <td className="px-4 py-2 text-xs font-medium text-foreground">Surveying</td>
                                      <td className="px-4 py-2 text-xs text-muted-foreground">0.01 foot</td>
                                      <td className="px-4 py-2 text-xs text-muted-foreground">3 millimeters</td>
                                      <td className="px-4 py-2 text-xs text-muted-foreground">GPS/Total station accuracy</td>
                                    </tr>
                                    <tr>
                                      <td className="px-4 py-2 text-xs font-medium text-foreground">Clothing</td>
                                      <td className="px-4 py-2 text-xs text-muted-foreground">1/2 inch</td>
                                      <td className="px-4 py-2 text-xs text-muted-foreground">1 centimeter</td>
                                      <td className="px-4 py-2 text-xs text-muted-foreground">Body measurement tolerance</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-purple-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">Common Rounding Mistakes to Avoid</h3>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-start gap-2">
                              <div className="w-1 h-1 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span><strong>False precision:</strong> Reporting 2.7432 meters for a room measured with a tape marked only in centimeters. The tape can't measure 0.0002 meters, so 2.74 meters is more honest.</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-1 h-1 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span><strong>Early rounding:</strong> Converting 5 feet 8 inches to 5.67 feet, then multiplying by 0.3048 gives 1.728 meters. But 5'8" is exactly 5.666666... feet, which converts to 1.7272 meters. Always use exact fractions when possible.</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-1 h-1 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span><strong>Unit mismatch:</strong> Measuring something in feet but converting to millimeters with 6 decimal places. If you can only measure to the nearest 1/4 inch (6.35mm), don't report 0.001mm precision.</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-1 h-1 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span><strong>Cumulative error:</strong> Converting each of 100 measurements individually and rounding each one. The total might be off significantly. Convert totals instead of individual items when possible.</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div className="bg-amber-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">Practical Rounding Examples</h3>
                          <div className="space-y-3">
                            <div className="border-l-4 border-blue-500 pl-3 py-1">
                              <div className="text-sm font-medium text-foreground">Example 1: Flooring Calculation</div>
                              <div className="text-xs text-muted-foreground">
                                Room measures 12' 3.5" × 15' 7.25". Convert to decimal feet: 12.2917' × 15.6042'. Multiply: 191.84 sq ft. Convert to sq meters: 191.84 × 0.092903 = 17.82 sq m. Round to 18 sq m for ordering (allows for waste).
                              </div>
                            </div>
                            <div className="border-l-4 border-green-500 pl-3 py-1">
                              <div className="text-sm font-medium text-foreground">Example 2: Bolt Specifications</div>
                              <div className="text-xs text-muted-foreground">
                                1/4-20 bolt (1/4" diameter, 20 threads per inch). Convert diameter: 0.25" × 25.4 = 6.35mm. Thread pitch: 1/20 = 0.05" = 1.27mm. Report as M6.35 × 1.27mm or round to standard M6 × 1.25mm.
                              </div>
                            </div>
                            <div className="border-l-4 border-purple-500 pl-3 py-1">
                              <div className="text-sm font-medium text-foreground">Example 3: Running Race</div>
                              <div className="text-xs text-muted-foreground">
                                10K race is 10,000 meters exactly. Convert to miles: 10,000 ÷ 1609.344 = 6.21371192 miles. For race promotion, round to 6.21 miles. For timing, use 6.2137 miles for accurate split calculations.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </article>

            {/* Length Conversion Examples */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('examples')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-red-500/10 p-2 rounded-lg">
                    <Ruler size={20} className="text-red-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Length Conversion Examples</h2>
                </div>
                {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.examples && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-muted-foreground mb-4">
                        Seeing conversions in context helps understand how they work in practice. Here are detailed examples from different fields showing exactly how to approach common conversion scenarios.
                      </p>
                      
                      <div className="space-y-6">
                        <div className="bg-blue-500/5 p-4 rounded-lg border border-blue-500/10">
                          <h3 className="font-semibold text-foreground mb-3">Example 1: Kitchen Remodeling</h3>
                          <div className="space-y-3 text-sm text-muted-foreground">
                            <p><strong>Situation:</strong> You're remodeling a kitchen in the US but using European appliances with metric specifications.</p>
                            
                            <div className="pl-4 border-l-2 border-blue-500">
                              <div className="font-medium text-foreground">Appliance Space Requirements:</div>
                              <ul className="space-y-1 mt-1">
                                <li>• Refrigerator: 70cm wide × 185cm high × 65cm deep</li>
                                <li>• Oven: 60cm wide × 60cm high × 55cm deep</li>
                                <li>• Dishwasher: 60cm wide × 85cm high × 60cm deep</li>
                              </ul>
                            </div>
                            
                            <div className="pl-4 border-l-2 border-green-500">
                              <div className="font-medium text-foreground">Conversion Process:</div>
                              <p className="mt-1">Convert each dimension using exact factors:</p>
                              <ul className="space-y-1 mt-1">
                                <li>Refrigerator width: 70cm ÷ 2.54 = 27.56 inches ≈ 27 9/16"</li>
                                <li>Refrigerator height: 185cm ÷ 2.54 = 72.83 inches ≈ 72 13/16"</li>
                                <li>Oven width: 60cm ÷ 2.54 = 23.62 inches ≈ 23 5/8"</li>
                              </ul>
                            </div>
                            
                            <div className="pl-4 border-l-2 border-purple-500">
                              <div className="font-medium text-foreground">Practical Rounding:</div>
                              <p className="mt-1">Since US cabinets are built to 1/16" precision:</p>
                              <ul className="space-y-1 mt-1">
                                <li>• Round refrigerator opening to 27 9/16" wide × 72 13/16" high</li>
                                <li>• Add 1/4" clearance: Final opening = 27 13/16" × 73 1/16"</li>
                                <li>• Convert back to check: 27.8125" × 73.0625" = 70.65cm × 185.58cm</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-green-500/5 p-4 rounded-lg border border-green-500/10">
                          <h3 className="font-semibold text-foreground mb-3">Example 2: International Shipping</h3>
                          <div className="space-y-3 text-sm text-muted-foreground">
                            <p><strong>Situation:</strong> Shipping company requires dimensions in centimeters, but you only have a tape measure in feet and inches.</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <div className="font-medium text-foreground mb-2">Package Measurements:</div>
                                <ul className="space-y-1">
                                  <li>• Length: 2' 8"</li>
                                  <li>• Width: 1' 6"</li>
                                  <li>• Height: 11"</li>
                                </ul>
                              </div>
                              <div>
                                <div className="font-medium text-foreground mb-2">Conversion Steps:</div>
                                <ol className="space-y-1 text-xs">
                                  <li>1. Convert each to inches: 32", 18", 11"</li>
                                  <li>2. Multiply by 2.54: 81.28cm, 45.72cm, 27.94cm</li>
                                  <li>3. Round up for shipping: 82cm, 46cm, 28cm</li>
                                </ol>
                              </div>
                            </div>
                            
                            <div className="bg-secondary/30 p-3 rounded">
                              <div className="font-medium text-foreground">Pro Tip:</div>
                              <p className="text-xs mt-1">Shipping companies always round up to next whole centimeter and charge based on dimensional weight. Convert everything to centimeters first, then calculate volume: 82 × 46 × 28 = 105,616 cm³ = 0.1056 m³.</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-purple-500/5 p-4 rounded-lg border border-purple-500/10">
                          <h3 className="font-semibold text-foreground mb-3">Example 3: Engineering Drawing Conversion</h3>
                          <div className="space-y-3 text-sm text-muted-foreground">
                            <p><strong>Situation:</strong> Converting a mechanical drawing from inches to millimeters for international manufacturing.</p>
                            
                            <div className="overflow-x-auto">
                              <div className="min-w-full inline-block align-middle">
                                <div className="overflow-hidden border border-border rounded-lg">
                                  <table className="min-w-full divide-y divide-border">
                                    <thead className="bg-secondary/20">
                                      <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-foreground">Feature</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-foreground">Inches</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-foreground">Exact mm</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-foreground">Rounded mm</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-foreground">Tolerance</th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                      <tr>
                                        <td className="px-4 py-2 text-xs text-foreground">Shaft diameter</td>
                                        <td className="px-4 py-2 text-xs font-mono">0.3750</td>
                                        <td className="px-4 py-2 text-xs font-mono">9.5250</td>
                                        <td className="px-4 py-2 text-xs font-mono">9.53</td>
                                        <td className="px-4 py-2 text-xs">±0.005" = ±0.13mm</td>
                                      </tr>
                                      <tr>
                                        <td className="px-4 py-2 text-xs text-foreground">Hole spacing</td>
                                        <td className="px-4 py-2 text-xs font-mono">2.1250</td>
                                        <td className="px-4 py-2 text-xs font-mono">53.9750</td>
                                        <td className="px-4 py-2 text-xs font-mono">53.98</td>
                                        <td className="px-4 py-2 text-xs">±0.010" = ±0.25mm</td>
                                      </tr>
                                      <tr>
                                        <td className="px-4 py-2 text-xs text-foreground">Plate thickness</td>
                                        <td className="px-4 py-2 text-xs font-mono">0.1875</td>
                                        <td className="px-4 py-2 text-xs font-mono">4.7625</td>
                                        <td className="px-4 py-2 text-xs font-mono">4.76</td>
                                        <td className="px-4 py-2 text-xs">±0.003" = ±0.08mm</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                            
                            <div className="text-xs text-muted-foreground">
                              <strong>Note:</strong> For engineering, always convert tolerances too. A ±0.005" tolerance becomes ±0.127mm, which rounds to ±0.13mm. Never round tolerances down - always round to safer (larger) values.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </article>

            {/* Common Length Errors */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('commonErrors')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-red-500/10 p-2 rounded-lg">
                    <Ruler size={20} className="text-red-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Common Length Conversion Errors</h2>
                </div>
                {openSections.commonErrors ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.commonErrors && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-muted-foreground mb-4">
                        Even experienced professionals make length conversion mistakes. Being aware of these common errors can save you time, money, and frustration on your projects.
                      </p>
                      
                      <div className="space-y-4">
                        <div className="bg-red-500/5 p-4 rounded-lg border border-red-500/10">
                          <h3 className="font-semibold text-foreground mb-2">Error 1: Confusing Survey Feet with International Feet</h3>
                          <div className="text-sm text-muted-foreground space-y-2">
                            <p>
                              <strong>The Problem:</strong> In the US, land surveying sometimes uses the "US survey foot" (1200/3937 meters) instead of the international foot (0.3048 meters exactly). The difference is about 2 parts per million.
                            </p>
                            <p>
                              <strong>Real Example:</strong> A property described as 1000 feet long in old survey documents might actually be 1000 survey feet = 304.8006 meters, not 304.8 meters exactly. Over a mile, this adds up to about 3.2mm difference.
                            </p>
                            <p>
                              <strong>Solution:</strong> For most modern work, use international feet (0.3048). Only use survey feet if working with historical US land records. Our converter uses international feet.
                            </p>
                          </div>
                        </div>
                        
                        <div className="bg-orange-500/5 p-4 rounded-lg border border-orange-500/10">
                          <h3 className="font-semibold text-foreground mb-2">Error 2: Incorrect Feet-Inches to Decimal Conversion</h3>
                          <div className="text-sm text-muted-foreground space-y-2">
                            <p>
                              <strong>The Problem:</strong> Converting 6'2" to 6.2 feet instead of 6.1667 feet (6 + 2/12).
                            </p>
                            <div className="bg-secondary/30 p-3 rounded">
                              <div className="font-medium">Wrong way:</div>
                              <div className="font-mono">6'2" = 6.2 feet × 0.3048 = 1.88976 meters</div>
                              <div className="font-medium mt-2">Right way:</div>
                              <div className="font-mono">6'2" = (6 + 2/12) = 6.1667 feet × 0.3048 = 1.8799 meters</div>
                              <div className="text-xs mt-2">Difference: Almost 1 centimeter error</div>
                            </div>
                            <p>
                              <strong>Solution:</strong> Always convert inches to feet by dividing by 12 before adding to feet. Our converter accepts decimal feet, so convert 6'2" to 6.1667 first.
                            </p>
                          </div>
                        </div>
                        
                        <div className="bg-yellow-500/5 p-4 rounded-lg border border-yellow-500/10">
                          <h3 className="font-semibold text-foreground mb-2">Error 3: Using Approximate Conversions for Critical Work</h3>
                          <div className="text-sm text-muted-foreground space-y-2">
                            <p>
                              <strong>The Problem:</strong> Using 1 inch = 2.5 cm (approximate) instead of 2.54 cm (exact) for precision work.
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="text-center">
                                <div className="font-medium">For 10 inches:</div>
                                <div className="font-mono text-xs">2.5 × 10 = 25.0 cm</div>
                                <div className="text-xs text-red-500">0.4 cm too short</div>
                              </div>
                              <div className="text-center">
                                <div className="font-medium">For 100 inches:</div>
                                <div className="font-mono text-xs">2.5 × 100 = 250.0 cm</div>
                                <div className="text-xs text-red-500">4.0 cm too short</div>
                              </div>
                            </div>
                            <p>
                              <strong>Solution:</strong> Use exact conversions (2.54 cm/inch) for any work requiring precision. The approximate 2.5 is only suitable for rough estimates.
                            </p>
                          </div>
                        </div>
                        
                        <div className="bg-blue-500/5 p-4 rounded-lg border border-blue-500/10">
                          <h3 className="font-semibold text-foreground mb-2">Error 4: Forgetting Temperature Effects on Measurements</h3>
                          <div className="text-sm text-muted-foreground space-y-2">
                            <p>
                              <strong>The Problem:</strong> Steel expands about 0.0000065 per degree Celsius. A 100-foot steel beam (30.48 meters) expands about 0.078 inches (2mm) when temperature rises 50°F (28°C).
                            </p>
                            <p>
                              <strong>Real Example:</strong> A bridge designed in winter at 0°C might be 100 meters long. In summer at 40°C, it expands to about 100.026 meters. If conversion calculations don't account for this, expansion joints might be incorrectly sized.
                            </p>
                            <p>
                              <strong>Solution:</strong> For critical structural work, specify measurement temperature (usually 20°C/68°F for metric, 68°F for imperial). Our converter gives theoretical lengths; real-world measurements need temperature consideration.
                            </p>
                          </div>
                        </div>
                        
                        <div className="bg-green-500/5 p-4 rounded-lg border border-green-500/10">
                          <h3 className="font-semibold text-foreground mb-2">Error 5: Mixing Nautical and Statute Miles</h3>
                          <div className="text-sm text-muted-foreground space-y-2">
                            <p>
                              <strong>The Problem:</strong> A nautical mile is 1,852 meters (6,076.12 feet), while a statute mile is 1,609.344 meters (5,280 feet). They're different by about 15%.
                            </p>
                            <div className="bg-secondary/30 p-3 rounded">
                              <div className="font-medium">Critical Difference:</div>
                              <div className="grid grid-cols-2 gap-3 text-xs mt-2">
                                <div>
                                  <div>Statute mile:</div>
                                  <div className="font-mono">1,609.344 m</div>
                                  <div className="font-mono">5,280 ft</div>
                                </div>
                                <div>
                                  <div>Nautical mile:</div>
                                  <div className="font-mono">1,852.0 m</div>
                                  <div className="font-mono">6,076.12 ft</div>
                                </div>
                              </div>
                            </div>
                            <p>
                              <strong>Solution:</strong> Our converter uses statute miles (land miles). For aviation or maritime use, you need a nautical mile converter. Always verify which "mile" is being referenced.
                            </p>
                          </div>
                        </div>
                        
                        <div className="bg-purple-500/5 p-4 rounded-lg border border-purple-500/10 mt-4">
                          <h4 className="font-medium text-foreground mb-2">Quality Control Checklist</h4>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            <li className="flex items-start gap-2">
                              <div className="w-4 h-4 bg-green-500/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                              </div>
                              <span>Verify you're using the correct type of foot (international vs survey)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-4 h-4 bg-green-500/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                              </div>
                              <span>Convert feet and inches to decimal correctly (divide inches by 12)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-4 h-4 bg-green-500/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                              </div>
                              <span>Use exact conversion factors (2.54 cm/inch, 0.3048 m/foot) for precision work</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-4 h-4 bg-green-500/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                              </div>
                              <span>Consider temperature effects for structural or precision measurements</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-4 h-4 bg-green-500/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                              </div>
                              <span>Distinguish between statute miles (land) and nautical miles (sea/air)</span>
                            </li>
                          </ul>
                        </div>
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
                    <Ruler size={20} className="text-blue-600" />
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
                      <h3 className="text-lg font-semibold text-foreground mb-2">How do I convert square feet to square meters?</h3>
                      <p className="text-muted-foreground mb-3">
                        That's an area conversion, not length. But since it comes up often: 1 square foot = 0.092903 square meters. Multiply square feet by 0.0929 to get square meters. Or use our area converter tool for more precise calculations with different area units.
                      </p>
                      
                      <h3 className="text-lg font-semibold text-foreground mb-2">Why is 25.4 mm exactly equal to 1 inch?</h3>
                      <p className="text-muted-foreground">
                        This exact definition was established internationally in 1959 to standardize measurements. Before that, different countries had slightly different inch definitions. The 25.4 mm definition creates a clean relationship between metric and imperial systems that's easy to work with in manufacturing and engineering.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </article>

            {/* Related Unit Tools */}
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
                    Need to convert other types of measurements? We have a full suite of conversion tools for all your needs:
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

export default LengthConverter;