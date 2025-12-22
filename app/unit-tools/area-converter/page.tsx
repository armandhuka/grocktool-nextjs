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
    { name: 'Length Converter', path: '/unit-tools/length-converter', icon: Square },
    { name: 'Weight Converter', path: '/unit-tools/weight-converter', icon: Home },
    { name: 'Temperature Converter', path: '/unit-tools/temperature-converter', icon: Map },
    { name: 'Time Converter', path: '/unit-tools/time-converter', icon: Building },
    { name: 'Speed Converter', path: '/unit-tools/speed-converter', icon: Crop },
    { name: 'Volume Converter', path: '/unit-tools/volume-converter', icon: Layers },
    { name: 'Data Size Converter', path: '/unit-tools/data-size-converter', icon: Compass }
  ];

  // FAQ Data
  const faqData = [
    {
      question: "What's the difference between square meters and square feet?",
      answer: "Square meters (m²) are metric units used worldwide, while square feet (ft²) are imperial units used primarily in the US and UK. 1 m² = 10.7639 ft² exactly. Square meters are based on the meter (SI base unit), while square feet are based on the foot (0.3048 m). For property measurements, use m² internationally and ft² in US/UK real estate."
    },
    {
      question: "How do I convert between acres and hectares?",
      answer: "1 acre = 0.404686 hectares, 1 hectare = 2.47105 acres. Acres are used in imperial systems (US/UK), hectares in metric systems worldwide. For land measurement: 1 acre ≈ 43,560 ft² ≈ 4,047 m². 1 hectare = 10,000 m² = 2.47 acres. Use our converter for precise calculations or approximate: hectares × 2.5 ≈ acres, acres ÷ 2.5 ≈ hectares."
    },
    {
      question: "Which area units should I use for different applications?",
      answer: "Use square meters for construction and international projects. Use square feet for US/UK real estate. Use acres for land measurement in US/UK. Use hectares for international land and agriculture. Use square kilometers for large areas like cities or parks. Use square centimeters for small surfaces. Choose units based on your location, industry standards, and measurement scale."
    },
    {
      question: "How accurate are area conversion calculations?",
      answer: "Our converter uses precise conversion factors: 1 m² = 10.76391041671 ft², 1 acre = 4046.8564224 m², 1 hectare = 10,000 m² exactly. Calculations maintain 6 decimal place accuracy. For real estate, rounding to 2 decimals is practical. For surveying and construction, full precision is recommended. All conversions use square meters as intermediate reference for consistency."
    },
    {
      question: "Can I convert between very small and very large area units?",
      answer: "Yes, the converter handles areas from square millimeters (0.000001 m²) to square kilometers (1,000,000 m²) and beyond. Enter decimal values for small areas: 0.0001 m² = 1 cm². For large areas: 1 km² = 100 hectares = 247 acres. The tool manages decimal places automatically and provides accurate conversions across all scales from microscopic to continental areas."
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
                    Area conversion between different units uses standardized factors based on square meters as the reference unit.
                  </p>
                  <div className="text-xs sm:text-sm space-y-1 pt-2">
                    <div className="font-medium text-foreground">Standard Area Relationships:</div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span><strong>1 square meter</strong> = 10.7639 square feet</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span><strong>1 square foot</strong> = 144 square inches = 0.092903 m²</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span><strong>1 acre</strong> = 43,560 square feet = 4,046.86 m²</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span><strong>1 hectare</strong> = 10,000 m² = 2.47105 acres</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm space-y-1 pt-3">
                    <div className="font-medium text-foreground">Large Area References:</div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span><strong>1 square kilometer</strong> = 100 hectares = 247.105 acres</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span><strong>1 square mile</strong> = 640 acres = 2.58999 km²</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span><strong>1 township</strong> = 36 square miles = 93.24 km²</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span><strong>1 section</strong> = 1 square mile = 640 acres</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm space-y-1 pt-3">
                    <div className="font-medium text-foreground">Precise Conversions (to m²):</div>
                    <div className="flex justify-between">
                      <span>1 ft² =</span>
                      <span>0.09290304 m²</span>
                    </div>
                    <div className="flex justify-between">
                      <span>1 yd² =</span>
                      <span>0.83612736 m²</span>
                    </div>
                    <div className="flex justify-between">
                      <span>1 acre =</span>
                      <span>4,046.8564224 m²</span>
                    </div>
                    <div className="flex justify-between">
                      <span>1 hectare =</span>
                      <span>10,000 m²</span>
                    </div>
                    <div className="flex justify-between">
                      <span>1 km² =</span>
                      <span>1,000,000 m²</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm space-y-1 pt-3">
                    <div className="font-medium text-foreground">Common Applications:</div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                      <span><strong>Real Estate:</strong> ft² in US/UK, m² internationally for property listings</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                      <span><strong>Construction:</strong> m² for floor plans, ft² for US building materials</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                      <span><strong>Agriculture:</strong> Acres in US/UK, hectares internationally for land measurement</span>
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
                    <Square size={20} className="text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Area Converter - Features & Applications</h2>
                </div>
                {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.whatItDoes && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground mb-4">
                    This Area Converter provides instant, accurate conversions between all major area measurement units. The tool seamlessly converts between square meters (metric), square feet (imperial), acres (land measurement), hectares (international land), square kilometers (large areas), square yards, square inches, and square centimeters using precise standardized conversion factors. Whether you're buying international property, planning construction projects, surveying land, calculating material requirements, or working on architectural designs, this converter delivers reliable results with up to 6 decimal place accuracy. It automatically updates conversions in real-time as you type, includes common preset conversions for quick reference, and handles both small surfaces (like flooring materials) and vast areas (like agricultural land or national parks). The intuitive interface makes it easy to switch between area units and copy results for documentation, contracts, or sharing with clients and colleagues.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Square size={18} className="text-blue-600" />
                        <h3 className="font-semibold text-foreground">Real Estate & Property</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Convert between square meters and square feet for international property listings, calculate lot sizes in acres and hectares, compare property areas across different measurement systems, and prepare accurate real estate documentation for global markets.</p>
                    </div>
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Home size={18} className="text-green-600" />
                        <h3 className="font-semibold text-foreground">Construction & Architecture</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Accurately convert floor areas, wall surfaces, and material coverage between different measurement units. Calculate construction material requirements, estimate project costs, and create precise architectural plans using standardized area conversions for international projects.</p>
                    </div>
                    <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Map size={18} className="text-purple-600" />
                        <h3 className="font-semibold text-foreground">Land Surveying & Agriculture</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Convert between acres, hectares, and square kilometers for land measurement, calculate farm sizes and agricultural plots, survey property boundaries, and prepare land documentation using appropriate area units for local and international regulations.</p>
                    </div>
                    <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Building size={18} className="text-amber-600" />
                        <h3 className="font-semibold text-foreground">Interior Design & Flooring</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Calculate room areas for flooring, painting, and furnishing projects. Convert between square meters and square feet for material purchases, estimate coverage requirements, and create accurate design plans using consistent area measurements across different product specifications.</p>
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
                    <Square size={20} className="text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Area Conversion Applications</h2>
                </div>
                {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.useCases && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">🏠 Real Estate & Property Management</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>International Property Listings:</strong> Convert property sizes between square meters and square feet for global real estate platforms, calculate price per unit area in different measurement systems, and prepare comparative market analysis using standardized area units</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Property Development:</strong> Convert land areas between acres and hectares for development planning, calculate building coverage ratios using different measurement standards, and prepare feasibility studies with accurate area conversions for international investors</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Commercial Leasing:</strong> Convert office and retail space between different area units for international lease agreements, calculate rent per square meter/foot for comparative analysis, and prepare leasing documentation with standardized area measurements</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">🏗️ Construction & Civil Engineering</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Project Planning:</strong> Convert site areas between different measurement units for construction planning, calculate earthwork volumes using area conversions, and estimate material requirements for international construction projects with varying measurement standards</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Material Calculations:</strong> Convert flooring, roofing, and painting areas between square meters and square feet for material procurement, calculate coverage rates using different unit systems, and estimate project costs with accurate area conversions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Infrastructure Development:</strong> Convert land acquisition areas between acres and hectares for road and utility projects, calculate right-of-way requirements using different measurement systems, and prepare engineering documents with standardized area units</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">🌾 Agriculture & Land Management</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Farm Planning:</strong> Convert field sizes between acres and hectares for crop planning, calculate planting densities using different area units, and prepare agricultural management plans with standardized area measurements for international operations</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Land Valuation:</strong> Convert property areas between different measurement systems for agricultural land appraisal, calculate value per unit area using standardized conversions, and prepare land valuation reports for international transactions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Conservation Planning:</strong> Convert protected area sizes between square kilometers and square miles for environmental management, calculate habitat areas using different measurement standards, and prepare conservation plans with accurate area conversions</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">📊 Urban Planning & Geography</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>City Planning:</strong> Convert urban area sizes between square kilometers and square miles for population density calculations, calculate land use allocations using different measurement systems, and prepare urban development plans with standardized area units</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Geographic Analysis:</strong> Convert country and regional areas between different measurement units for comparative analysis, calculate geographical statistics using standardized area conversions, and prepare geographic reports with accurate area measurements</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Environmental Assessment:</strong> Convert impact area sizes between different measurement systems for environmental studies, calculate ecological footprint using standardized area conversions, and prepare environmental impact assessments with accurate area calculations</span>
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
                    <Square size={20} className="text-amber-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">How to Use Area Converter - Complete Guide</h2>
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
                            <div className="font-medium text-foreground">Enter Your Area Value</div>
                            <div className="text-sm text-muted-foreground">Type the numerical area you want to convert in the "From" field. Enter whole numbers, decimals, or scientific notation for very large or very small areas.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                          <div>
                            <div className="font-medium text-foreground">Select Source Unit</div>
                            <div className="text-sm text-muted-foreground">Choose the current area unit from the dropdown menu next to your input. Options include square meters, square feet, acres, hectares, square kilometers, square yards, square inches, and square centimeters.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                          <div>
                            <div className="font-medium text-foreground">Select Target Unit</div>
                            <div className="text-sm text-muted-foreground">Choose the area unit you want to convert to from the "To" dropdown menu. The converter will automatically calculate and display the result in real-time as you make selections.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">4</div>
                          <div>
                            <div className="font-medium text-foreground">Use Conversion Results</div>
                            <div className="text-sm text-muted-foreground">Copy the converted value using the copy button, or click any preset conversion for instant calculations of common area scenarios like property sizes or construction areas.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Pro Conversion Tips</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <div className="bg-blue-500/20 p-1 rounded mt-0.5">
                            <Square size={12} className="text-blue-500" />
                          </div>
                          <span><strong>Quick Estimates:</strong> For approximate m² to ft²: multiply by 10.8. For ft² to m²: divide by 10.8. For acres to hectares: divide by 2.5. For hectares to acres: multiply by 2.5. These approximations work well for mental calculations</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-green-500/20 p-1 rounded mt-0.5">
                            <Home size={12} className="text-green-500" />
                          </div>
                          <span><strong>Swap Function:</strong> Use the swap button between units to quickly reverse your conversion direction without re-entering area values - perfect for checking calculations or comparing property sizes</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-purple-500/20 p-1 rounded mt-0.5">
                            <Map size={12} className="text-purple-500" />
                          </div>
                          <span><strong>Common Conversions:</strong> Save time by using the preset conversion buttons for frequently needed calculations like property area conversions or construction material calculations</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-amber-500/20 p-1 rounded mt-0.5">
                            <Building size={12} className="text-amber-500" />
                          </div>
                          <span><strong>Precision Control:</strong> Results show up to 6 decimal places. For real estate, round to whole numbers; for construction, use 2 decimals; for surveying, use full precision as needed</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-red-500/20 p-1 rounded mt-0.5">
                            <Copy size={12} className="text-red-500" />
                          </div>
                          <span><strong>Documentation Ready:</strong> Use the copy function to save conversion results for property listings, construction documents, land surveys, or legal contracts requiring accurate area measurements</span>
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
                    <Square size={20} className="text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Area Conversion Examples</h2>
                </div>
                {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.examples && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">Common Area Conversion Examples</h3>
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
                                  <td className="px-4 py-3 text-sm text-foreground">m²</td>
                                  <td className="px-4 py-3 text-sm text-foreground">ft²</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">1076.39</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Apartment size</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">1</td>
                                  <td className="px-4 py-3 text-sm text-foreground">acre</td>
                                  <td className="px-4 py-3 text-sm text-foreground">m²</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">4046.86</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Land plot</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">5</td>
                                  <td className="px-4 py-3 text-sm text-foreground">hectare</td>
                                  <td className="px-4 py-3 text-sm text-foreground">acre</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">12.3553</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Farm size</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">1000</td>
                                  <td className="px-4 py-3 text-sm text-foreground">ft²</td>
                                  <td className="px-4 py-3 text-sm text-foreground">m²</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">92.903</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Office space</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">1</td>
                                  <td className="px-4 py-3 text-sm text-foreground">km²</td>
                                  <td className="px-4 py-3 text-sm text-foreground">hectare</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">100</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">City district</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">144</td>
                                  <td className="px-4 py-3 text-sm text-foreground">in²</td>
                                  <td className="px-4 py-3 text-sm text-foreground">ft²</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">1.0</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Material calculation</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Detailed Example: International Real Estate Development Project</h3>
                      <div className="bg-secondary/20 p-4 rounded-lg border border-border overflow-x-auto">
                        <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
{`Example: Area conversions for a mixed-use real estate development

Project: International hotel and residential complex
Location: Multiple sites in US (imperial) and Europe (metric)
Development areas: Hotel, residential units, commercial spaces, amenities

Step 1: Site Area Calculations
Site 1 (US): 25 acres
Convert to other units:
• 25 acres to hectares: 25 × 0.404686 = 10.11715 hectares
• 25 acres to m²: 25 × 4046.86 = 101,171.5 m²
• 25 acres to ft²: 101,171.5 × 10.7639 = 1,088,999 ft²

Site 2 (Europe): 8 hectares
Convert to other units:
• 8 hectares to acres: 8 × 2.47105 = 19.7684 acres
• 8 hectares to m²: 8 × 10,000 = 80,000 m²
• 8 hectares to ft²: 80,000 × 10.7639 = 861,112 ft²

Total land area:
• In acres: 25 + 19.7684 = 44.7684 acres
• In hectares: 10.11715 + 8 = 18.11715 hectares
• In m²: 101,171.5 + 80,000 = 181,171.5 m²
• In ft²: 1,088,999 + 861,112 = 1,950,111 ft²

Step 2: Building Footprint Calculations
Hotel building (US site):
• Footprint: 15,000 ft²
  Convert to m²: 15,000 × 0.092903 = 1,393.55 m²
  Convert to acres: 15,000 ÷ 43,560 = 0.3444 acres

Residential building (Europe site):
• Footprint: 1,200 m²
  Convert to ft²: 1,200 × 10.7639 = 12,916.68 ft²
  Convert to acres: 1,200 ÷ 4046.86 = 0.2965 acres

Commercial building (US site):
• Footprint: 0.5 acres
  Convert to ft²: 0.5 × 43,560 = 21,780 ft²
  Convert to m²: 21,780 × 0.092903 = 2,023.44 m²

Step 3: Floor Area Calculations
Hotel (12 stories):
• Floor area per story: 15,000 ft²
• Total floor area: 15,000 × 12 = 180,000 ft²
  Convert to m²: 180,000 × 0.092903 = 16,722.54 m²
  Convert to acres: 180,000 ÷ 43,560 = 4.1322 acres

Residential tower (20 stories):
• Floor area per story: 1,200 m²
• Total floor area: 1,200 × 20 = 24,000 m²
  Convert to ft²: 24,000 × 10.7639 = 258,333.6 ft²
  Convert to acres: 24,000 ÷ 4046.86 = 5.9305 acres

Commercial building (5 stories):
• Floor area per story: 21,780 ft²
• Total floor area: 21,780 × 5 = 108,900 ft²
  Convert to m²: 108,900 × 0.092903 = 10,117.15 m²
  Convert to acres: 108,900 ÷ 43,560 = 2.5 acres

Step 4: Amenity Area Calculations
Swimming pool (US site):
• Pool area: 1,500 ft²
  Convert to m²: 1,500 × 0.092903 = 139.35 m²
• Deck area: 3,000 ft²
  Convert to m²: 3,000 × 0.092903 = 278.71 m²
• Total pool complex: 4,500 ft² = 418.06 m²

Garden (Europe site):
• Garden area: 2,000 m²
  Convert to ft²: 2,000 × 10.7639 = 21,527.8 ft²
  Convert to acres: 2,000 ÷ 4046.86 = 0.4942 acres

Parking (both sites):
• US parking: 300 spaces × 300 ft²/space = 90,000 ft²
  Convert to m²: 90,000 × 0.092903 = 8,361.27 m²
  Convert to acres: 90,000 ÷ 43,560 = 2.0661 acres

• Europe parking: 200 spaces × 28 m²/space = 5,600 m²
  Convert to ft²: 5,600 × 10.7639 = 60,277.84 ft²
  Convert to acres: 5,600 ÷ 4046.86 = 1.3838 acres

Step 5: Green Space Calculations
Total site area available for green space:
• US site: 25 acres total - 4.5 acres (buildings) = 20.5 acres
  Convert to m²: 20.5 × 4046.86 = 82,960.63 m²
  Convert to ft²: 20.5 × 43,560 = 892,980 ft²

• Europe site: 8 hectares total - 1.2 hectares (buildings) = 6.8 hectares
  Convert to acres: 6.8 × 2.47105 = 16.8031 acres
  Convert to m²: 6.8 × 10,000 = 68,000 m²
  Convert to ft²: 68,000 × 10.7639 = 732,145.2 ft²

Green space percentage:
• US site: (20.5 ÷ 25) × 100 = 82% green space
• Europe site: (6.8 ÷ 8) × 100 = 85% green space
• Combined: (20.5 + 16.8031) ÷ (25 + 19.7684) × 100 = 83.3% green space

Step 6: Construction Material Calculations
Flooring material requirements:
• Hotel carpet: 180,000 ft²
  Convert to m²: 180,000 × 0.092903 = 16,722.54 m²
  Material order in Europe: 16,722.54 m² ÷ 10 m²/roll = 1,672 rolls

• Residential tile: 24,000 m²
  Convert to ft²: 24,000 × 10.7639 = 258,333.6 ft²
  Material order in US: 258,333.6 ft² ÷ 100 ft²/box = 2,583 boxes

Painting requirements:
• Hotel walls: 500,000 ft² wall surface
  Convert to m²: 500,000 × 0.092903 = 46,451.5 m²
  Paint needed: 46,451.5 m² ÷ 10 m²/liter = 4,645 liters

• Residential walls: 60,000 m² wall surface
  Convert to ft²: 60,000 × 10.7639 = 645,834 ft²
  Paint needed: 645,834 ft² ÷ 350 ft²/gallon = 1,845 gallons

Step 7: Cost Calculations
Land cost per unit area:
• US site: $500,000 for 25 acres
  Cost per acre: $500,000 ÷ 25 = $20,000/acre
  Convert to cost per m²: $20,000 ÷ 4046.86 = $4.94/m²
  Convert to cost per ft²: $20,000 ÷ 43,560 = $0.46/ft²

• Europe site: €400,000 for 8 hectares
  Cost per hectare: €400,000 ÷ 8 = €50,000/hectare
  Convert to cost per m²: €50,000 ÷ 10,000 = €5.00/m²
  Convert to cost per acre: €50,000 × 2.47105 = €123,552.5/acre

Construction cost per unit area:
• Hotel: $15,000,000 for 180,000 ft²
  Cost per ft²: $15,000,000 ÷ 180,000 = $83.33/ft²
  Convert to cost per m²: $83.33 ÷ 0.092903 = $896.67/m²

• Residential: €12,000,000 for 24,000 m²
  Cost per m²: €12,000,000 ÷ 24,000 = €500/m²
  Convert to cost per ft²: €500 × 0.092903 = €46.45/ft²

Step 8: Density Calculations
Floor Area Ratio (FAR):
• US site: Total floor area ÷ Site area
  FAR = (180,000 + 108,900) ft² ÷ (25 × 43,560) ft² = 288,900 ÷ 1,089,000 = 0.265
  Alternative in m²: (16,722.54 + 10,117.15) m² ÷ 101,171.5 m² = 26,839.69 ÷ 101,171.5 = 0.265

• Europe site: Total floor area ÷ Site area
  FAR = 24,000 m² ÷ 80,000 m² = 0.3
  Alternative in ft²: 258,333.6 ft² ÷ 861,112 ft² = 0.3

Units per hectare/acre:
• US residential: 150 units on 4.1322 acres
  Units per acre: 150 ÷ 4.1322 = 36.3 units/acre
  Convert to units per hectare: 36.3 × 2.47105 = 89.7 units/hectare

• Europe residential: 200 units on 5.9305 acres
  Units per acre: 200 ÷ 5.9305 = 33.7 units/acre
  Units per hectare: 200 ÷ (5.9305 ÷ 2.47105) = 200 ÷ 2.4 = 83.3 units/hectare

Step 9: International Documentation
Property listing information:
• US property: 25 acres, 180,000 ft² building
  International listing: 10.12 hectares, 16,723 m² building

• Europe property: 8 hectares, 24,000 m² building
  US listing: 19.77 acres, 258,334 ft² building

Investment documentation:
• Total investment: $15M + €12M
• Combined area: 44.77 acres = 18.12 hectares
• Total building area: 288,900 ft² + 258,334 ft² = 547,234 ft² = 50,839 m²
• Average cost: ($15M + €12M) ÷ (547,234 ft²) = mixed currency per ft²

Step 10: Regulatory Compliance
Minimum requirements:
• US: Minimum 1 parking space per 300 ft² commercial
  Required: 180,000 ft² ÷ 300 = 600 spaces
  Provided: 300 spaces (50% compliance)

• Europe: Minimum 1 parking space per 50 m² residential
  Required: 24,000 m² ÷ 50 = 480 spaces
  Provided: 200 spaces (41.7% compliance)

Green space requirements:
• US local code: Minimum 20% green space
  Provided: 82% (well above minimum)

• Europe local code: Minimum 30% green space
  Provided: 85% (well above minimum)

Conclusion:
Using accurate area conversions ensures consistent project planning across international sites, proper material procurement, accurate cost calculations, regulatory compliance, and effective communication with stakeholders. The area converter provides the precision needed for professional real estate development while maintaining accessibility for general property and construction calculations.`}
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
                    <Square size={20} className="text-blue-600" />
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

export default AreaConverter;