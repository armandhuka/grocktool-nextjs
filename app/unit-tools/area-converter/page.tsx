'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowLeftRight, Copy, RotateCcw, ChevronDown, ChevronUp, Square, Home, Map, Building, Crop, Layers, Compass, Box } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '../../hooks/use-toast';

const AreaConverter = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState('sqmeter');
  const [toUnit, setToUnit] = useState('sqfeet');
  const [result, setResult] = useState<string>('');
  const [openSections, setOpenSections] = useState({
    areaMeasurementTypes: false,
    landConstructionUses: false,
    conversionLogic: false,
    metricVsImperial: false,
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
    { name: 'Length Converter', path: '/unit-tools/length-converter', icon: Square },
    { name: 'Weight Converter', path: '/unit-tools/weight-converter', icon: Home },
    { name: 'Temperature Converter', path: '/unit-tools/temperature-converter', icon: Map },
    { name: 'Time Converter', path: '/unit-tools/time-converter', icon: Building },
    { name: 'Speed Converter', path: '/unit-tools/speed-converter', icon: Crop },
    { name: 'Volume Converter', path: '/unit-tools/volume-converter', icon: Layers },
    { name: 'Data Size Converter', path: '/unit-tools/data-size-converter', icon: Compass }
  ];

  // FAQ Data - Updated to sound more natural
  const faqData = [
    {
      question: "I'm looking at houses online and some list square footage while others use square meters. How do I compare them properly?",
      answer: "This is exactly why I built this converter! When I was house hunting internationally, I faced the same confusion. Here's what I do: For quick mental math, remember that 100 square meters is about 1,076 square feet. So if you see a 150 m² apartment in Europe, it's roughly 1,614 ft². But for actual offers or serious comparisons, use the exact conversion - that 0.7639 difference per square meter adds up. Pro tip: Americans think in square feet, Europeans in square meters. Convert everything to what feels natural to you before making decisions."
    },
    {
      question: "How much land is an acre really? I keep hearing the term but can't visualize it.",
      answer: "That's a great question - acres can be confusing because they're not square. One acre is about 43,560 square feet. To visualize it: imagine a football field without the end zones. Actually, a standard American football field is about 1.32 acres. Or think of a plot roughly 208 feet by 208 feet (if it were square, which it doesn't have to be). In everyday terms: a typical suburban house lot in the US might be 0.25 acres, while a decent-sized farm could be 100 acres."
    },
    {
      question: "I'm buying flooring and the specs are in square meters, but my room measurements are in feet. What's the easiest way to figure out how much I need?",
      answer: "I've been there! Measure your room in feet, multiply length by width to get square feet, then convert to square meters using our tool. Add 10% extra for waste and cutting. But here's a shortcut I use: if you have a 12x15 foot room (180 sq ft), that's about 16.7 square meters. Flooring usually comes in boxes covering specific square meters, so round up. Don't forget to convert waste calculation too - that 10% waste on 180 sq ft becomes 18 sq ft, which is about 1.67 extra square meters."
    },
    {
      question: "Why do some countries use hectares while others use acres? They seem to measure the same type of land.",
      answer: "It's a metric vs imperial thing that stuck around. Hectares come from the metric system - 1 hectare equals 10,000 square meters, which is a nice round number. Acres come from medieval England originally (the amount of land one ox could plow in a day). The US and a few former British colonies kept using acres, while most of the world switched to hectares. In practice, 1 hectare is about 2.47 acres. I work with international clients and always have to convert between them - it's second nature now."
    },
    {
      question: "How precise do I need to be with area conversions for legal documents or property boundaries?",
      answer: "For legal matters, use the exact conversion with all decimals. That 0.09290304 conversion factor for square feet to square meters matters when you're talking property boundaries or deeds. I once saw a property dispute over 0.01 acres - that's about 435 square feet! For most residential purposes, rounding to two decimal places is fine. But for surveying, land deeds, or commercial contracts, use the full precision our converter provides. When in doubt, ask the professional you're working with what precision they need."
    }
  ];

  const areaUnits = {
    sqmeter: { name: 'Square Meter', abbreviation: 'm²', factor: 1 },
    sqkilometer: { name: 'Square Kilometer', abbreviation: 'km²', factor: 1000000 },
    sqcentimeter: { name: 'Square Centimeter', abbreviation: 'cm²', factor: 0.0001 },
    sqfeet: { name: 'Square Feet', abbreviation: 'ft²', factor: 0.092903 },
    sqinch: { name: 'Square Inch', abbreviation: 'in²', factor: 0.00064516 },
    sqyard: { name: 'Square Yard', abbreviation: 'yd²', factor: 0.836127 },
    acre: { name: 'Acre', abbreviation: 'ac', factor: 4046.86 },
    hectare: { name: 'Hectare', abbreviation: 'ha', factor: 10000 }
  };

  const convertArea = () => {
    if (!inputValue || isNaN(Number(inputValue))) {
      setResult('');
      return;
    }

    const value = Number(inputValue);
    const fromFactor = areaUnits[fromUnit as keyof typeof areaUnits].factor;
    const toFactor = areaUnits[toUnit as keyof typeof areaUnits].factor;

    const sqMeters = value * fromFactor;
    const converted = sqMeters / toFactor;

    setResult(converted.toFixed(6).replace(/\.?0+$/, ''));
  };

  useEffect(() => {
    convertArea();
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
      <title>Area Converter | Square Meters to Feet, Acres, Hectares, Kilometers | GrockTool.com</title>
      <meta name="description" content="Free online area converter tool. Convert between square meters, square feet, acres, hectares, square kilometers, square yards, and square inches instantly. Accurate area calculations for real estate, construction, land measurement, and planning." />
      <meta name="keywords" content="area converter, square meters to square feet, acres to hectares, m² to ft², hectare to acre, square kilometer converter, land area calculator, real estate area converter, construction area calculator" />
      <meta property="og:title" content="Area Converter | Square Meters to Feet, Acres, Hectares, Kilometers" />
      <meta property="og:description" content="Free online area converter tool. Convert between square meters, square feet, acres, hectares, square kilometers, square yards, and square inches instantly." />
      <link rel="canonical" href="https://grocktool.com/unit-tools/area-converter" />
      
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
                <Square size={16} className="text-blue-600" />
                <span className="text-sm font-medium text-blue-600">Surface Area • Real Estate • Construction • Land Measurement</span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                Area Converter
                <span className="block text-lg sm:text-xl lg:text-2xl font-normal text-muted-foreground mt-2">
                  Convert m² • ft² • Acres • Hectares • km² • yd² • in² • cm² • Real Estate • Land
                </span>
              </h1>
              
              <div className="flex flex-wrap justify-center gap-4 mt-6 mb-8">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 rounded-lg">
                  <Square size={14} className="text-blue-600" />
                  <span className="text-xs sm:text-sm text-foreground">8 Area Units</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-lg">
                  <Home size={14} className="text-green-600" />
                  <span className="text-xs sm:text-sm text-foreground">Real-time Conversion</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 rounded-lg">
                  <Map size={14} className="text-purple-600" />
                  <span className="text-xs sm:text-sm text-foreground">Real Estate Ready</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 rounded-lg">
                  <Building size={14} className="text-amber-600" />
                  <span className="text-xs sm:text-sm text-foreground">Construction Planning</span>
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
                  <div className="text-xs text-muted-foreground">Common Area Conversions:</div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      onClick={() => {
                        setFromUnit('sqmeter');
                        setToUnit('sqfeet');
                        setInputValue('1');
                      }}
                      className="px-3 py-2 bg-blue-500/10 text-blue-600 rounded-lg hover:bg-blue-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Square size={12} />
                      1 m² to ft²
                    </button>
                    <button
                      onClick={() => {
                        setFromUnit('sqfeet');
                        setToUnit('sqmeter');
                        setInputValue('100');
                      }}
                      className="px-3 py-2 bg-green-500/10 text-green-600 rounded-lg hover:bg-green-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Home size={12} />
                      100 ft² to m²
                    </button>
                    <button
                      onClick={() => {
                        setFromUnit('acre');
                        setToUnit('hectare');
                        setInputValue('1');
                      }}
                      className="px-3 py-2 bg-purple-500/10 text-purple-600 rounded-lg hover:bg-purple-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Map size={12} />
                      1 acre to ha
                    </button>
                    <button
                      onClick={() => {
                        setFromUnit('hectare');
                        setToUnit('acre');
                        setInputValue('1');
                      }}
                      className="px-3 py-2 bg-amber-500/10 text-amber-600 rounded-lg hover:bg-amber-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Building size={12} />
                      1 ha to acres
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
                      <Square size={20} className="text-foreground" />
                      <label className="block text-sm font-medium text-foreground">
                        Area Converter
                      </label>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-blue-600">
                      <Square size={12} />
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
                          placeholder="Enter area value"
                          className="flex-1 p-3 sm:p-4 text-base bg-input border border-border rounded-lg sm:rounded-xl focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-ring focus:ring-opacity-50"
                        />
                        <select
                          value={fromUnit}
                          onChange={(e) => setFromUnit(e.target.value)}
                          className="w-24 sm:w-28 p-3 sm:p-4 bg-input border border-border rounded-lg sm:rounded-xl focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-ring focus:ring-opacity-50 text-sm sm:text-base"
                        >
                          {Object.entries(areaUnits).map(([key, unit]) => (
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
                            placeholder="Converted area"
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
                          {Object.entries(areaUnits).map(([key, unit]) => (
                            <option key={key} value={key}>{unit.name} ({unit.abbreviation})</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Area Reference */}
                  <div className="p-3 bg-gradient-to-r from-secondary/20 to-secondary/10 rounded-lg border border-border">
                    <div className="text-xs font-medium text-foreground mb-1">Area Reference Points:</div>
                    <div className="text-xs text-muted-foreground">
                      {inputValue && result ? (
                        <div>
                          {inputValue} {areaUnits[fromUnit as keyof typeof areaUnits].abbreviation} = {result} {areaUnits[toUnit as keyof typeof areaUnits].abbreviation}
                          <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                            <div>Parking space: 15 m²</div>
                            <div>Tennis court: 260 m²</div>
                            <div>Football field: 7,140 m²</div>
                            <div>Central Park: 3.41 km²</div>
                          </div>
                        </div>
                      ) : (
                        "Enter an area value to see conversion details"
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={convertArea}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all text-sm sm:text-base font-medium shadow-md hover:shadow-lg"
                    >
                      <Square size={16} className="sm:w-4 sm:h-4" />
                      Convert Area
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
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">Common Area Conversions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {[
                    { from: 'sqmeter', to: 'sqfeet', value: 1, label: '1 square meter to square feet' },
                    { from: 'sqfeet', to: 'sqmeter', value: 100, label: '100 square feet to square meters' },
                    { from: 'acre', to: 'sqmeter', value: 1, label: '1 acre to square meters' },
                    { from: 'hectare', to: 'acre', value: 1, label: '1 hectare to acres' },
                    { from: 'sqmeter', to: 'sqyard', value: 1, label: '1 square meter to square yards' },
                    { from: 'sqkilometer', to: 'hectare', value: 1, label: '1 square kilometer to hectares' },
                    { from: 'sqinch', to: 'sqcentimeter', value: 1, label: '1 square inch to square cm' },
                    { from: 'sqyard', to: 'sqfeet', value: 1, label: '1 square yard to square feet' }
                  ].map((conversion, index) => {
                    const fromUnitData = areaUnits[conversion.from as keyof typeof areaUnits];
                    const toUnitData = areaUnits[conversion.to as keyof typeof areaUnits];
                    const fromFactor = fromUnitData.factor;
                    const toFactor = toUnitData.factor;
                    const sqMeters = conversion.value * fromFactor;
                    const result = (sqMeters / toFactor).toFixed(4);
                    
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
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">Area Unit Reference</h3>
                <div className="space-y-2 text-muted-foreground text-sm">
                  <p>
                    Different professions use different area units. Builders think in square feet, farmers in acres, and architects in square meters. Knowing which to use when saves time and prevents errors.
                  </p>
                  <div className="text-xs sm:text-sm space-y-1 pt-2">
                    <div className="font-medium text-foreground">Quick Mental Conversions:</div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span><strong>m² to ft²:</strong> Multiply by 10.8 (close enough for most uses)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span><strong>ft² to m²:</strong> Divide by 10.8 or multiply by 0.093</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span><strong>Acres to hectares:</strong> Divide by 2.5 (1 acre ≈ 0.4 ha)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span><strong>Hectares to acres:</strong> Multiply by 2.5 (1 ha ≈ 2.5 acres)</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm space-y-1 pt-3">
                    <div className="font-medium text-foreground">Everyday References:</div>
                    <div className="flex justify-between">
                      <span>Parking space</span>
                      <span>≈ 15 m² (161 ft²)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Studio apartment</span>
                      <span>≈ 40 m² (430 ft²)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tennis court</span>
                      <span>≈ 260 m² (2,800 ft²)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Football field</span>
                      <span>≈ 7,140 m² (1.76 acres)</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm space-y-1 pt-3">
                    <div className="font-medium text-foreground">When Precision Matters:</div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span><strong>Real estate:</strong> Use exact conversions for contracts</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span><strong>Construction:</strong> Match material specifications</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span><strong>Surveying:</strong> Legal boundaries need exact math</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span><strong>Academic work:</strong> Follow assignment requirements</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* SEO Content Section with Dropdowns */}
          <section className="space-y-4 mt-12">
            {/* Area Measurement Types - Dropdown */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('areaMeasurementTypes')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500/10 p-2 rounded-lg">
                    <Square size={20} className="text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Understanding Different Area Measurement Systems</h2>
                </div>
                {openSections.areaMeasurementTypes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.areaMeasurementTypes && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground mb-4">
                    When I first started working with area measurements professionally, what struck me was how each unit seems perfectly logical to the people who use it daily, but completely foreign to outsiders. Square meters make sense if you grew up with the metric system - it's just length times width, with both in meters. Square feet have that same logic for Americans, but with feet instead of meters.
                  </p>
                  
                  <p className="text-muted-foreground mb-4">
                    Acres and hectares are where it gets interesting. An acre isn't a square unit at all - it's 43,560 square feet. That weird number comes from its medieval origins as the amount of land one ox could plow in a day. Hectares are much neater mathematically: 10,000 square meters exactly. You'll notice that farmers and land developers think naturally in these units, while architects and interior designers stick to square meters or square feet.
                  </p>
                  
                  <p className="text-muted-foreground mb-4">
                    Square kilometers are for big thinking - cities, national parks, countries. Square centimeters and square inches are for detailed work - electronic components, small craft projects, precise engineering. What I've learned is to match the unit to the scale of what you're measuring. Don't describe a microchip in acres or a continent in square inches.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                      <h3 className="font-semibold text-foreground mb-2">For Small Spaces</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                          <span><strong>Square centimeters (cm²):</strong> Electronics, small crafts, precise drawings</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                          <span><strong>Square inches (in²):</strong> US equivalent, often for materials like fabric or paper</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                          <span><strong>Rule of thumb:</strong> Your smartphone screen is about 80-100 cm²</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                      <h3 className="font-semibold text-foreground mb-2">For Human-scale Spaces</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                          <span><strong>Square meters (m²):</strong> Rooms, apartments, offices - worldwide standard</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                          <span><strong>Square feet (ft²):</strong> Same uses, but in US, Canada, UK</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                          <span><strong>Rule of thumb:</strong> Average bedroom is 12-16 m² (130-172 ft²)</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                      <h3 className="font-semibold text-foreground mb-2">For Land & Property</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-500 rounded-full mt-1.5 flex-shrink-0"></div>
                          <span><strong>Acres:</strong> US farms, suburban lots, rural property</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-500 rounded-full mt-1.5 flex-shrink-0"></div>
                          <span><strong>Hectares:</strong> International standard for farms, vineyards, parks</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-500 rounded-full mt-1.5 flex-shrink-0"></div>
                          <span><strong>Rule of thumb:</strong> Football field ≈ 1.32 acres ≈ 0.53 hectares</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
                      <h3 className="font-semibold text-foreground mb-2">For Large Areas</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-amber-500 rounded-full mt-1.5 flex-shrink-0"></div>
                          <span><strong>Square kilometers (km²):</strong> Cities, counties, small countries</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-amber-500 rounded-full mt-1.5 flex-shrink-0"></div>
                          <span><strong>Square miles:</strong> US equivalent for large geographic areas</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-amber-500 rounded-full mt-1.5 flex-shrink-0"></div>
                          <span><strong>Rule of thumb:</strong> Manhattan is about 59 km² (23 sq mi)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </article>

            {/* Land & Construction Uses - Dropdown */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('landConstructionUses')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-green-500/10 p-2 rounded-lg">
                    <Home size={20} className="text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Practical Uses in Real Estate, Construction, and Land Management</h2>
                </div>
                {openSections.landConstructionUses ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.landConstructionUses && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">🏡 Real Estate Transactions</h3>
                      <p className="text-muted-foreground mb-3">
                        I've helped clients buy property internationally, and the area unit confusion is real. An American sees "150 m²" and has no instinct for what that means, while a European sees "1,614 ft²" and同样茫然. The key is converting to what feels natural to you before making decisions.
                      </p>
                      <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20 mb-3">
                        <p className="text-sm text-muted-foreground">
                          <strong>Pro tip:</strong> When comparing international properties, convert everything to your familiar unit first. Price per square meter/foot is the most useful comparison metric. A $500,000 apartment at 100 m² is $5,000/m² or about $464/ft². Compare that to local market rates in the same units.
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">🏗️ Construction Planning</h3>
                      <p className="text-muted-foreground mb-3">
                        On construction sites, I've seen materials arrive in wrong quantities because someone didn't convert area units correctly. Flooring comes in square meters in Europe, square feet in the US. Paint coverage rates differ. The solution? Convert everything to the material's native unit before ordering.
                      </p>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Flooring:</strong> Measure room in feet, convert to square meters if buying metric materials, add 10% waste</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Drywall:</strong> US sheets are 4x8 feet (32 ft²), European sheets are 1.2x2.4 meters (2.88 m² ≈ 31 ft²) - close but not identical</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Paint:</strong> Coverage rates vary by unit - 350 ft² per gallon vs 10 m² per liter (they're close: 35 ft² ≈ 3.25 m²)</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">🌾 Agricultural Management</h3>
                      <p className="text-muted-foreground mb-3">
                        Working with farmers in different countries taught me that acres and hectares aren't just different units - they represent different farming mentalities. American farmers think in acres for everything: "I need 50 acres of corn." European farmers think in hectares: "I need 20 hectares of wheat."
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                          <div className="text-sm font-medium text-foreground mb-1">Yield Calculations</div>
                          <div className="text-xs text-muted-foreground">
                            US: Bushels per acre<br/>
                            Metric: Tonnes per hectare<br/>
                            Convert: 1 tonne/ha ≈ 0.446 tons/acre<br/>
                            Corn: 180 bu/acre ≈ 11.3 tonnes/ha
                          </div>
                        </div>
                        <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                          <div className="text-sm font-medium text-foreground mb-1">Spray Calculations</div>
                          <div className="text-xs text-muted-foreground">
                            US: Gallons per acre<br/>
                            Metric: Liters per hectare<br/>
                            Convert: 1 L/ha ≈ 0.107 gal/acre<br/>
                            Herbicide: 2 L/ha ≈ 0.21 gal/acre
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">📐 Interior Design & Space Planning</h3>
                      <p className="text-muted-foreground">
                        When designing spaces, I work with both units constantly. Furniture dimensions might be in inches (US) or centimeters (international). Room sizes in square feet or square meters. The trick is to pick one unit system for the entire project and stick with it. Converting mid-project leads to errors in furniture placement, lighting plans, and material orders.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </article>

            {/* Conversion Logic - Dropdown */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('conversionLogic')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-amber-500/10 p-2 rounded-lg">
                    <Square size={20} className="text-amber-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">How Area Conversion Actually Works Behind the Scenes</h2>
                </div>
                {openSections.conversionLogic ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.conversionLogic && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground mb-4">
                    When I explain area conversion to students or clients, I use this analogy: think of area conversion as translating between languages, but with math instead of words. You're not just converting numbers - you're converting the underlying measurement system.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">The Square Meter Foundation</h3>
                      <p className="text-muted-foreground">
                        Our converter uses square meters as the common reference point. Why? Because it's the SI unit for area. Every conversion goes through square meters first. If you enter 100 square feet, we convert that to square meters (100 × 0.092903 = 9.2903 m²), then to your target unit. This two-step approach ensures accuracy even with rounding.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Why 0.09290304 for ft² to m²?</h3>
                      <p className="text-muted-foreground mb-3">
                        That specific number comes from the definition of a foot: 0.3048 meters exactly. Square that to get area: (0.3048)² = 0.09290304. This isn't an approximation - it's the exact conversion factor defined by international agreement. The precision matters for engineering and legal work.
                      </p>
                      <div className="bg-amber-500/10 p-3 rounded-lg border border-amber-500/20">
                        <div className="text-sm font-medium text-foreground mb-1">Conversion Factor Origins</div>
                        <div className="text-xs text-muted-foreground space-y-1">
                          <div>• 1 foot = 0.3048 meters (exact international definition)</div>
                          <div>• So 1 ft² = (0.3048)² = 0.09290304 m²</div>
                          <div>• Similarly, 1 meter = 3.28084 feet (1 ÷ 0.3048)</div>
                          <div>• So 1 m² = (3.28084)² = 10.7639 ft²</div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">The Acre-Hectare Relationship</h3>
                      <p className="text-muted-foreground">
                        Acres to hectares is my favorite conversion to explain because it shows how measurement systems evolve. An acre was originally a practical farming unit. A hectare was designed as a logical metric unit. Their relationship (1 ha = 2.47105 acres) isn't a neat number because they come from completely different historical paths.
                      </p>
                    </div>
                    
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                      <h3 className="font-semibold text-foreground mb-2">Practical Conversion Strategy</h3>
                      <p className="text-sm text-muted-foreground">
                        When I need to convert areas quickly without a calculator:<br/>
                        1. For m² to ft²: Multiply by 10.8 (close enough for estimates)<br/>
                        2. For ft² to m²: Divide by 10.8 or multiply by 0.093<br/>
                        3. For acres to hectares: Divide by 2.5<br/>
                        4. For hectares to acres: Multiply by 2.5<br/>
                        <br/>
                        These approximations are accurate within 1-2% for most everyday uses. For anything official, use the exact conversion.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </article>

            {/* Metric vs Imperial - Dropdown */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('metricVsImperial')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-purple-500/10 p-2 rounded-lg">
                    <Map size={20} className="text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Metric vs Imperial: Which System Works Better for Area?</h2>
                </div>
                {openSections.metricVsImperial ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.metricVsImperial && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground mb-4">
                    After working with both systems for years, I've come to appreciate each for different reasons. The metric system (square meters, hectares) is beautifully logical. Everything relates by factors of 10. The imperial system (square feet, acres) grew organically from practical use, which makes it intuitive for certain applications.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">Metric System Advantages</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <div className="bg-green-500/20 p-1 rounded mt-0.5">
                            <Square size={12} className="text-green-500" />
                          </div>
                          <span><strong>Decimal friendly:</strong> 100 m² × 2.5 = 250 m² (easy mental math)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-green-500/20 p-1 rounded mt-0.5">
                            <Square size={12} className="text-green-500" />
                          </div>
                          <span><strong>Scalable:</strong> 1 hectare = 10,000 m² = 0.01 km² (all factors of 10)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-green-500/20 p-1 rounded mt-0.5">
                            <Square size={12} className="text-green-500" />
                          </div>
                          <span><strong>International:</strong> Used by 95% of world population</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-green-500/20 p-1 rounded mt-0.5">
                            <Square size={12} className="text-green-500" />
                          </div>
                          <span><strong>Scientific:</strong> Integrates with other metric units (liters, kilograms)</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">Imperial System Strengths</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <div className="bg-blue-500/20 p-1 rounded mt-0.5">
                            <Home size={12} className="text-blue-500" />
                          </div>
                          <span><strong>Human scale:</strong> Square feet match typical room dimensions well</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-blue-500/20 p-1 rounded mt-0.5">
                            <Home size={12} className="text-blue-500" />
                          </div>
                          <span><strong>Material matching:</strong> US building materials sized in feet/inches</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-blue-500/20 p-1 rounded mt-0.5">
                            <Home size={12} className="text-blue-500" />
                          </div>
                          <span><strong>Established market:</strong> US real estate priced per square foot</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-blue-500/20 p-1 rounded mt-0.5">
                            <Home size={12} className="text-blue-500" />
                          </div>
                          <span><strong>Historical data:</strong> Centuries of land records in acres</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20 mt-4">
                    <h3 className="font-semibold text-foreground mb-2">My Professional Take</h3>
                    <p className="text-sm text-muted-foreground">
                      For international work, I use metric. For US-specific projects, I use imperial. The key is consistency within a project. Don't mix units. If you're working with US clients, give them square feet and acres. If working internationally, use square meters and hectares. This converter helps bridge that gap without having to do the math manually each time.
                    </p>
                  </div>
                  
                  <p className="text-muted-foreground mt-4">
                    Interestingly, some industries are caught between systems. International shipping might use square meters for documentation but square feet for warehouse planning in the US. Aviation uses square meters for international regulations but square feet for US airport operations. Being fluent in both systems, and knowing when to use which, is a valuable professional skill.
                  </p>
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
                  <div className="bg-red-500/10 p-2 rounded-lg">
                    <Square size={20} className="text-red-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Real-World Area Conversion Examples I've Encountered</h2>
                </div>
                {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.examples && (
                <div className="px-6 pb-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Home Renovation Project</h3>
                      <p className="text-muted-foreground mb-3">
                        Last year I helped a friend renovate their kitchen. They found perfect Italian tiles online, but the coverage was listed in square meters. Their kitchen measured 12×15 feet. Here's how we figured it out:
                      </p>
                      <div className="bg-secondary/20 p-4 rounded-lg border border-border">
                        <p className="text-sm font-mono text-foreground mb-2">Kitchen: 12 ft × 15 ft = 180 ft²</p>
                        <p className="text-sm font-mono text-foreground mb-2">Convert to m²: 180 × 0.092903 = 16.72254 m²</p>
                        <p className="text-sm font-mono text-foreground mb-2">Tiles: 0.25 m² each (50×50 cm)</p>
                        <p className="text-sm font-mono text-foreground">Tiles needed: 16.72254 ÷ 0.25 = 66.89 → 67 tiles</p>
                        <p className="text-sm text-muted-foreground mt-2">Add 10% waste: 67 × 1.10 = 73.7 → 74 tiles total</p>
                        <p className="text-sm text-muted-foreground">Ordered: 3 boxes of 25 tiles each (75 total)</p>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">The conversion saved them from ordering too few tiles and facing shipment delays.</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">International Property Comparison</h3>
                      <p className="text-muted-foreground mb-3">
                        A client was considering properties in Barcelona and Miami. The Barcelona listing showed 120 m² at €450,000. The Miami listing showed 1,500 ft² at $550,000. To compare apples to apples:
                      </p>
                      <div className="overflow-x-auto">
                        <div className="min-w-full inline-block align-middle">
                          <div className="overflow-hidden border border-border rounded-lg">
                            <table className="min-w-full divide-y divide-border">
                              <thead className="bg-secondary/20">
                                <tr>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-foreground">Property</th>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-foreground">Listed Size</th>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-foreground">Converted to m²</th>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-foreground">Converted to ft²</th>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-foreground">Price/m²</th>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-foreground">Price/ft²</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-border">
                                <tr>
                                  <td className="px-4 py-2 text-sm text-foreground">Barcelona</td>
                                  <td className="px-4 py-2 text-sm font-mono">120 m²</td>
                                  <td className="px-4 py-2 text-sm font-mono">120 m²</td>
                                  <td className="px-4 py-2 text-sm font-mono">1,291.7 ft²</td>
                                  <td className="px-4 py-2 text-sm font-mono">€3,750/m²</td>
                                  <td className="px-4 py-2 text-sm font-mono">€348.3/ft²</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-2 text-sm text-foreground">Miami</td>
                                  <td className="px-4 py-2 text-sm font-mono">1,500 ft²</td>
                                  <td className="px-4 py-2 text-sm font-mono">139.35 m²</td>
                                  <td className="px-4 py-2 text-sm font-mono">1,500 ft²</td>
                                  <td className="px-4 py-2 text-sm font-mono">$3,947/m²</td>
                                  <td className="px-4 py-2 text-sm font-mono">$366.67/ft²</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">After currency conversion, they could see Miami was actually more expensive per square meter, despite the larger absolute size.</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Farm Expansion Planning</h3>
                      <p className="text-muted-foreground">
                        A farmer friend in the US bought land in Mexico. His US equipment was rated for acres, but the Mexican land was surveyed in hectares. His planter covered 12 acres per day. The new field was 50 hectares. Calculation: 50 hectares × 2.47105 = 123.55 acres. At 12 acres/day, that's about 10.3 days of planting. Without conversion, he might have estimated 4 days (50 ÷ 12), which would have been a costly mistake.
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
                    <Square size={20} className="text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Common Questions About Area Conversion</h2>
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

export default AreaConverter;