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
      question: "What's the difference between metric and imperial length units?",
      answer: "Metric units (meters, centimeters, kilometers) are based on powers of 10 and used worldwide. Imperial units (feet, inches, yards, miles) are based on historical measurements and primarily used in the US. The meter is the SI base unit for length, while other units are derived through standardized conversion factors."
    },
    {
      question: "How accurate are length conversion calculations?",
      answer: "Our length converter uses precise international standards: 1 meter = 3.280839895 feet exactly, 1 inch = 2.54 centimeters exactly. Calculations maintain 6 decimal places of accuracy, suitable for engineering, construction, and academic applications. For extremely precise scientific work, additional decimal places may be needed."
    },
    {
      question: "Which length units should I use for specific applications?",
      answer: "Use meters/kilometers for scientific work and international projects. Use feet/inches for construction and real estate in the US. Use centimeters/millimeters for precise measurements in manufacturing. Use miles for road distances in the US/UK, and kilometers elsewhere. Choose units appropriate for your industry and location."
    },
    {
      question: "Can I convert between very small and very large length units?",
      answer: "Yes, the converter handles measurements from millimeters (0.001 meters) to kilometers (1000 meters) and beyond. It supports conversions between microscopic scales (nanometers through millimeters) and macroscopic scales (kilometers through astronomical units). The tool automatically manages decimal places and scientific notation where appropriate."
    },
    {
      question: "How do I convert architectural measurements like feet and inches?",
      answer: "For feet and inches, enter measurements in decimal feet (e.g., 5.5 feet for 5 feet 6 inches). To convert 5'6\" exactly, calculate 5 + (6/12) = 5.5 feet. Our converter works with decimal values, so combine feet and inches into a single decimal value before conversion for accurate results."
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
            {/* What This Tool Does - Dropdown */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('whatItDoes')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500/10 p-2 rounded-lg">
                    <Ruler size={20} className="text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Length Converter - Features & Applications</h2>
                </div>
                {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.whatItDoes && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground mb-4">
                    This Length Converter provides instant, accurate conversions between all major length measurement units. The tool seamlessly converts between metric system units (meters, centimeters, millimeters, kilometers) and imperial system units (feet, inches, yards, miles) using precise international standards. Whether you're working on construction projects, engineering designs, academic assignments, or everyday measurements, this converter delivers reliable results with up to 6 decimal place accuracy. It automatically updates conversions in real-time as you type, includes common preset conversions for quick reference, and handles both small-scale measurements (like millimeters for precision work) and large distances (like kilometers for travel planning). The intuitive interface makes it easy to switch between units and copy results for documentation or sharing.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Ruler size={18} className="text-blue-600" />
                        <h3 className="font-semibold text-foreground">Metric Conversions</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Convert between meters, centimeters, millimeters, and kilometers with precise decimal-based calculations. Perfect for scientific research, engineering projects, and international applications where metric units are standard.</p>
                    </div>
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Navigation size={18} className="text-green-600" />
                        <h3 className="font-semibold text-foreground">Imperial Conversions</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Accurately convert feet, inches, yards, and miles using standardized conversion factors. Essential for construction, real estate, and applications in countries using imperial measurement systems.</p>
                    </div>
                    <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin size={18} className="text-purple-600" />
                        <h3 className="font-semibold text-foreground">Cross-System Conversion</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Seamlessly convert between metric and imperial systems with industry-standard accuracy. Ideal for international projects, academic work, and situations requiring measurement translation between different standards.</p>
                    </div>
                    <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Building size={18} className="text-amber-600" />
                        <h3 className="font-semibold text-foreground">Practical Applications</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Includes preset conversions for common scenarios like room dimensions, travel distances, material measurements, and architectural specifications. Save time with frequently used conversions at your fingertips.</p>
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
                    <Ruler size={20} className="text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Length Conversion Applications</h2>
                </div>
                {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.useCases && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">🏗️ Construction & Architecture</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Blueprint Conversion:</strong> Convert architectural plans between metric and imperial measurements for international construction projects and material specifications</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Material Calculations:</strong> Convert lumber dimensions from inches to centimeters, calculate flooring requirements in square meters from square feet, and determine paint coverage areas</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Site Planning:</strong> Convert property boundaries from feet to meters, calculate excavation depths in centimeters from feet measurements, and plan foundation dimensions</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">🎓 Education & Academia</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Physics Problems:</strong> Convert scientific measurements between meters and feet for motion calculations, energy formulas, and laboratory experiment documentation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Geography Studies:</strong> Convert map scales between kilometers and miles, calculate distances between locations using different measurement systems, and analyze topographic data</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Engineering Courses:</strong> Convert technical drawings between millimeters and inches, calculate tolerances in different units, and solve mechanical engineering problems requiring unit conversion</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">✈️ Travel & Navigation</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Distance Planning:</strong> Convert road trip distances between kilometers and miles, estimate travel times using different measurement systems, and plan international itineraries</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Hiking & Outdoor:</strong> Convert trail lengths from miles to kilometers, calculate elevation gains in feet versus meters, and plan backpacking distances using appropriate units</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Aviation & Maritime:</strong> Convert nautical miles to kilometers for flight planning, calculate cruising altitudes in feet versus meters, and navigate using different measurement standards</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">🏭 Manufacturing & Engineering</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Precision Machining:</strong> Convert engineering tolerances between millimeters and thousandths of an inch, calculate material dimensions for CNC programming, and interpret technical specifications</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>International Standards:</strong> Convert product specifications between ISO metric standards and imperial measurements for global manufacturing and quality control compliance</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Prototype Development:</strong> Convert design dimensions between different measurement systems for 3D printing, model making, and prototype testing across international teams</span>
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
                    <Ruler size={20} className="text-amber-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">How to Use Length Converter - Complete Guide</h2>
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
                            <div className="font-medium text-foreground">Enter Your Length Value</div>
                            <div className="text-sm text-muted-foreground">Type the numerical measurement you want to convert in the "From" field. You can enter whole numbers, decimals, or fractions converted to decimals.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                          <div>
                            <div className="font-medium text-foreground">Select Source Unit</div>
                            <div className="text-sm text-muted-foreground">Choose the current unit of measurement from the dropdown menu next to your input. Options include meters, feet, inches, centimeters, and more.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                          <div>
                            <div className="font-medium text-foreground">Select Target Unit</div>
                            <div className="text-sm text-muted-foreground">Choose the unit you want to convert to from the "To" dropdown menu. The converter will automatically calculate and display the result.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">4</div>
                          <div>
                            <div className="font-medium text-foreground">Use Conversion Results</div>
                            <div className="text-sm text-muted-foreground">Copy the converted value using the copy button, or click any preset conversion for instant calculations of common measurement scenarios.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Pro Conversion Tips</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <div className="bg-blue-500/20 p-1 rounded mt-0.5">
                            <Ruler size={12} className="text-blue-500" />
                          </div>
                          <span><strong>Real-time Updates:</strong> The converter updates automatically as you type, so you can see results instantly without clicking any buttons</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-green-500/20 p-1 rounded mt-0.5">
                            <Navigation size={12} className="text-green-500" />
                          </div>
                          <span><strong>Swap Function:</strong> Use the swap button between units to quickly reverse your conversion direction without re-entering values</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-purple-500/20 p-1 rounded mt-0.5">
                            <MapPin size={12} className="text-purple-500" />
                          </div>
                          <span><strong>Common Conversions:</strong> Save time by using the preset conversion buttons for frequently needed calculations like meters to feet or inches to cm</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-amber-500/20 p-1 rounded mt-0.5">
                            <Building size={12} className="text-amber-500" />
                          </div>
                          <span><strong>Accuracy Control:</strong> Results show up to 6 decimal places. For practical applications, round to appropriate precision for your specific use case</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-red-500/20 p-1 rounded mt-0.5">
                            <Copy size={12} className="text-red-500" />
                          </div>
                          <span><strong>Documentation Ready:</strong> Use the copy function to save conversion results for reports, specifications, or sharing with team members</span>
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
                    <Ruler size={20} className="text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Length Conversion Examples</h2>
                </div>
                {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.examples && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">Common Length Conversion Examples</h3>
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
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">2.5</td>
                                  <td className="px-4 py-3 text-sm text-foreground">Meters (m)</td>
                                  <td className="px-4 py-3 text-sm text-foreground">Feet (ft)</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">8.2021</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Room height</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">100</td>
                                  <td className="px-4 py-3 text-sm text-foreground">Feet (ft)</td>
                                  <td className="px-4 py-3 text-sm text-foreground">Meters (m)</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">30.48</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Building length</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">12</td>
                                  <td className="px-4 py-3 text-sm text-foreground">Inches (in)</td>
                                  <td className="px-4 py-3 text-sm text-foreground">Centimeters (cm)</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">30.48</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Ruler length</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">5</td>
                                  <td className="px-4 py-3 text-sm text-foreground">Kilometers (km)</td>
                                  <td className="px-4 py-3 text-sm text-foreground">Miles (mi)</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">3.10686</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Running distance</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">0.5</td>
                                  <td className="px-4 py-3 text-sm text-foreground">Miles (mi)</td>
                                  <td className="px-4 py-3 text-sm text-foreground">Meters (m)</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">804.672</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Race track</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">25.4</td>
                                  <td className="px-4 py-3 text-sm text-foreground">Millimeters (mm)</td>
                                  <td className="px-4 py-3 text-sm text-foreground">Inches (in)</td>
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
                      <h3 className="font-semibold text-foreground mb-2">Detailed Example: Construction Project Conversion</h3>
                      <div className="bg-secondary/20 p-4 rounded-lg border border-border overflow-x-auto">
                        <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
{`Example: Converting architectural measurements for an international construction project

Project: Office building with mixed measurement requirements
Requirements: Convert between metric and imperial for different teams

Step 1: Foundation Dimensions
Original: 60 feet × 100 feet foundation
Convert to meters:
• 60 feet to meters: 60 × 0.3048 = 18.288 meters
• 100 feet to meters: 100 × 0.3048 = 30.48 meters
Result: 18.288 m × 30.48 m foundation

Step 2: Interior Wall Heights
Original: 9 feet standard ceiling height
Convert to meters:
• 9 feet to meters: 9 × 0.3048 = 2.7432 meters
Result: Standard ceiling height = 2.74 meters (rounded)

Step 3: Door and Window Openings
Door specifications:
• Standard door: 80 inches height
• Convert to centimeters: 80 × 2.54 = 203.2 cm
• Standard door: 36 inches width
• Convert to centimeters: 36 × 2.54 = 91.44 cm
Result: Door openings = 203.2 cm × 91.44 cm

Window specifications:
• Large window: 72 inches × 48 inches
• Convert to centimeters:
  Height: 72 × 2.54 = 182.88 cm
  Width: 48 × 2.54 = 121.92 cm
Result: Window opening = 182.88 cm × 121.92 cm

Step 4: Material Calculations
Flooring material:
• Room size: 12 feet × 15 feet
• Convert to meters:
  Length: 12 × 0.3048 = 3.6576 m
  Width: 15 × 0.3048 = 4.572 m
• Area in square meters: 3.6576 × 4.572 = 16.722 m²
• Convert to square feet for US suppliers: 16.722 × 10.764 = 180 ft²
Result: Need 16.72 m² or 180 ft² of flooring

Step 5: Site Planning
Property boundaries:
• North side: 150 feet
• Convert to meters: 150 × 0.3048 = 45.72 m
• East side: 200 feet
• Convert to meters: 200 × 0.3048 = 60.96 m
• Total perimeter in meters: 2×(45.72 + 60.96) = 213.36 m
• Total perimeter in feet: 2×(150 + 200) = 700 ft
Result: Perimeter = 213.36 m or 700 ft

Step 6: International Coordination
For European team (metric):
• All dimensions provided in meters and centimeters
• Foundation: 18.29 m × 30.48 m
• Ceilings: 2.74 m height
• Doors: 2.032 m × 0.9144 m

For US team (imperial):
• All dimensions provided in feet and inches
• Foundation: 60 ft × 100 ft
• Ceilings: 9 ft height
• Doors: 6 ft 8 in × 3 ft

Step 7: Tolerance Conversions
Construction tolerances:
• Allowable error: ±1/8 inch
• Convert to millimeters: 0.125 × 25.4 = 3.175 mm
• Rounded to: ±3 mm for metric specifications
Result: Tolerance = ±1/8 inch or ±3 mm

Step 8: Material Ordering
Concrete calculation:
• Slab thickness: 6 inches
• Convert to meters: 6 × 0.0254 = 0.1524 m
• Volume for 60 ft × 100 ft slab:
  In cubic meters: 18.288 × 30.48 × 0.1524 = 84.95 m³
  In cubic yards (US standard): 84.95 × 1.308 = 111.1 yd³
Result: Order 85 m³ or 111 yd³ of concrete

Step 9: Verification
Cross-check conversions:
• 1 meter = 3.28084 feet
• Verify: 18.288 m × 3.28084 = 60.000 feet ✓
• 1 inch = 2.54 cm exactly
• Verify: 80 inches × 2.54 = 203.2 cm ✓

Step 10: Documentation
Create conversion table for project team:

| Measurement       | Imperial        | Metric          | Conversion Factor |
|-------------------|-----------------|-----------------|-------------------|
| Foundation        | 60' × 100'      | 18.29 m × 30.48 m | 1 ft = 0.3048 m   |
| Ceiling Height    | 9'              | 2.74 m          | 1 ft = 0.3048 m   |
| Standard Door     | 6'8" × 3'       | 2.03 m × 0.91 m | 1 in = 2.54 cm    |
| Window Opening    | 6' × 4'         | 1.83 m × 1.22 m | 1 ft = 0.3048 m   |
| Flooring Area     | 180 ft²         | 16.72 m²        | 1 ft² = 0.0929 m² |
| Concrete Volume   | 111 yd³         | 85 m³           | 1 yd³ = 0.7646 m³ |

Conclusion:
Using accurate length conversions ensures all project teams work with consistent measurements, preventing errors in construction, material ordering, and international coordination. The length converter provides the precision needed for professional construction projects while maintaining simplicity for everyday use.`}
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

export default LengthConverter;