'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowLeftRight, Copy, RotateCcw, ChevronDown, ChevronUp, Scale, Package, Truck, Weight, Dumbbell, Apple, ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '../../hooks/use-toast';
import Link from 'next/link';

const WeightConverter = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState('kilogram');
  const [toUnit, setToUnit] = useState('pound');
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
    { name: 'Length Converter', path: '/unit-tools/length-converter', icon: Scale },
    { name: 'Temperature Converter', path: '/unit-tools/temperature-converter', icon: Package },
    { name: 'Time Converter', path: '/unit-tools/time-converter', icon: Truck },
    { name: 'Speed Converter', path: '/unit-tools/speed-converter', icon: Weight },
    { name: 'Area Converter', path: '/unit-tools/area-converter', icon: Dumbbell },
    { name: 'Volume Converter', path: '/unit-tools/volume-converter', icon: Apple },
    { name: 'Data Size Converter', path: '/unit-tools/data-size-converter', icon: ShoppingBag }
  ];

  // FAQ Data
  const faqData = [
    {
      question: "What's the difference between mass and weight in conversion?",
      answer: "Mass measures the amount of matter in an object (kilograms, grams), while weight measures gravitational force (pounds, ounces). For everyday Earth use, mass and weight are proportional, so conversions work. For scientific precision, note that weight changes with gravity while mass remains constant. Our converter uses mass-based conversions suitable for standard Earth gravity."
    },
    {
      question: "How accurate are the weight conversion calculations?",
      answer: "Our weight converter uses precise international standards: 1 kilogram = 2.20462262185 pounds exactly. Calculations maintain 6 decimal places of accuracy, suitable for cooking, shipping, scientific work, and commercial applications. The troy ounce (31.1035g) differs from avoirdupois ounce (28.3495g) - we use avoirdupois for general weight conversions."
    },
    {
      question: "Which weight units should I use for specific applications?",
      answer: "Use kilograms/grams for scientific work and international commerce. Use pounds/ounces for cooking and body weight in the US. Use stones for body weight in the UK. Use tons for shipping and industrial measurements. Grams are best for precision measurements like medications, while pounds work well for produce and parcels."
    },
    {
      question: "Can I convert between metric tons and US tons?",
      answer: "Yes, but note there are different tons: Metric ton = 1000 kg (2204.62 lb), US short ton = 2000 lb (907.185 kg), and UK long ton = 2240 lb (1016.05 kg). Our converter uses metric ton (1000 kg). For US tons, convert pounds to kilograms first (1 US ton = 2000 lb = 907.185 kg). Always specify which ton you're using in professional contexts."
    },
    {
      question: "How do I convert body weight between kilograms and stones/pounds?",
      answer: "For body weight: Convert kg to pounds (kg × 2.20462), then convert pounds to stones (pounds ÷ 14). Example: 70 kg = 154.323 lb = 11 stone 0.323 lb. Use our converter in two steps: first kg to lb, then note the lb result. For stones specifically, 1 stone = 14 lb = 6.35029 kg. Many prefer displaying body weight as '11 stone 4 pounds' format."
    }
  ];

  const weightUnits = {
    kilogram: { name: 'Kilogram', abbreviation: 'kg', factor: 1 },
    gram: { name: 'Gram', abbreviation: 'g', factor: 0.001 },
    pound: { name: 'Pound', abbreviation: 'lb', factor: 0.453592 },
    ounce: { name: 'Ounce', abbreviation: 'oz', factor: 0.0283495 },
    ton: { name: 'Ton (metric)', abbreviation: 't', factor: 1000 },
    stone: { name: 'Stone', abbreviation: 'st', factor: 6.35029 }
  };

  const convertWeight = () => {
    if (!inputValue || isNaN(Number(inputValue))) {
      setResult('');
      return;
    }

    const value = Number(inputValue);
    const fromFactor = weightUnits[fromUnit as keyof typeof weightUnits].factor;
    const toFactor = weightUnits[toUnit as keyof typeof weightUnits].factor;
    
    const kilograms = value * fromFactor;
    const converted = kilograms / toFactor;
    
    setResult(converted.toFixed(6).replace(/\.?0+$/, ''));
  };

  useEffect(() => {
    convertWeight();
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
      <title>Weight Converter | Kilograms to Pounds, Grams, Ounces, Stones | GrockTool.com</title>
      <meta name="description" content="Free online weight converter tool. Convert between kilograms, pounds, grams, ounces, stones, and tons instantly. Accurate measurements for cooking, shipping, fitness, and scientific applications." />
      <meta name="keywords" content="weight converter, kg to lb, pounds to kg, grams to ounces, ounces to grams, stone converter, metric to imperial weight, mass converter, body weight converter" />
      <meta property="og:title" content="Weight Converter | Kilograms to Pounds, Grams, Ounces, Stones" />
      <meta property="og:description" content="Free online weight converter tool. Convert between kilograms, pounds, grams, ounces, stones, and tons instantly." />
      <link rel="canonical" href="https://grocktool.com/unit-tools/weight-converter" />
      
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
                <Scale size={16} className="text-blue-600" />
                <span className="text-sm font-medium text-blue-600">Mass Conversion • Cooking • Shipping • Fitness</span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                Weight Converter
                <span className="block text-lg sm:text-xl lg:text-2xl font-normal text-muted-foreground mt-2">
                  Convert Kilograms • Pounds • Grams • Ounces • Stones • Tons • Metric & Imperial
                </span>
              </h1>
              
              <div className="flex flex-wrap justify-center gap-4 mt-6 mb-8">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 rounded-lg">
                  <Scale size={14} className="text-blue-600" />
                  <span className="text-xs sm:text-sm text-foreground">6 Weight Units</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-lg">
                  <Package size={14} className="text-green-600" />
                  <span className="text-xs sm:text-sm text-foreground">Real-time Conversion</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 rounded-lg">
                  <Truck size={14} className="text-purple-600" />
                  <span className="text-xs sm:text-sm text-foreground">Cooking & Shipping</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 rounded-lg">
                  <Weight size={14} className="text-amber-600" />
                  <span className="text-xs sm:text-sm text-foreground">Body Weight Ready</span>
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
                  <div className="text-xs text-muted-foreground">Common Weight Conversions:</div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      onClick={() => {
                        setFromUnit('kilogram');
                        setToUnit('pound');
                        setInputValue('1');
                      }}
                      className="px-3 py-2 bg-blue-500/10 text-blue-600 rounded-lg hover:bg-blue-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Scale size={12} />
                      1 kg to lb
                    </button>
                    <button
                      onClick={() => {
                        setFromUnit('pound');
                        setToUnit('kilogram');
                        setInputValue('10');
                      }}
                      className="px-3 py-2 bg-green-500/10 text-green-600 rounded-lg hover:bg-green-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Package size={12} />
                      10 lb to kg
                    </button>
                    <button
                      onClick={() => {
                        setFromUnit('gram');
                        setToUnit('ounce');
                        setInputValue('100');
                      }}
                      className="px-3 py-2 bg-purple-500/10 text-purple-600 rounded-lg hover:bg-purple-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Truck size={12} />
                      100 g to oz
                    </button>
                    <button
                      onClick={() => {
                        setFromUnit('kilogram');
                        setToUnit('stone');
                        setInputValue('70');
                      }}
                      className="px-3 py-2 bg-amber-500/10 text-amber-600 rounded-lg hover:bg-amber-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Weight size={12} />
                      70 kg to st
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
                      <Scale size={20} className="text-foreground" />
                      <label className="block text-sm font-medium text-foreground">
                        Weight Converter
                      </label>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-blue-600">
                      <Scale size={12} />
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
                          placeholder="Enter weight value"
                          className="flex-1 p-3 sm:p-4 text-base bg-muted border border-border rounded-lg sm:rounded-xl focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-ring focus:ring-opacity-50"
                        />
                        <select
                          value={fromUnit}
                          onChange={(e) => setFromUnit(e.target.value)}
                          className="w-24 sm:w-28 p-3 sm:p-4 bg-muted border border-border rounded-lg sm:rounded-xl focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-ring focus:ring-opacity-50 text-sm sm:text-base"
                        >
                          {Object.entries(weightUnits).map(([key, unit]) => (
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
                            placeholder="Converted weight"
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
                          className="w-24 sm:w-28 p-3 sm:p-4 bg-muted border border-border rounded-lg sm:rounded-xl focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-ring focus:ring-opacity-50 text-sm sm:text-base"
                        >
                          {Object.entries(weightUnits).map(([key, unit]) => (
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
                          {inputValue} {weightUnits[fromUnit as keyof typeof weightUnits].abbreviation} = {result} {weightUnits[toUnit as keyof typeof weightUnits].abbreviation}
                          <div className="mt-1 text-xs">
                            (1 {weightUnits[fromUnit as keyof typeof weightUnits].abbreviation} = {(weightUnits[fromUnit as keyof typeof weightUnits].factor / weightUnits[toUnit as keyof typeof weightUnits].factor).toFixed(6)} {weightUnits[toUnit as keyof typeof weightUnits].abbreviation})
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
                      onClick={convertWeight}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all text-sm sm:text-base font-medium shadow-md hover:shadow-lg"
                    >
                      <Scale size={16} className="sm:w-4 sm:h-4" />
                      Convert Weight
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
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">Common Weight Conversions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {[
                    { from: 'kilogram', to: 'pound', value: 1, label: '1 kilogram to pounds' },
                    { from: 'pound', to: 'kilogram', value: 1, label: '1 pound to kilograms' },
                    { from: 'gram', to: 'ounce', value: 100, label: '100 grams to ounces' },
                    { from: 'ounce', to: 'gram', value: 1, label: '1 ounce to grams' },
                    { from: 'kilogram', to: 'gram', value: 1, label: '1 kilogram to grams' },
                    { from: 'pound', to: 'ounce', value: 1, label: '1 pound to ounces' },
                    { from: 'stone', to: 'kilogram', value: 1, label: '1 stone to kilograms' },
                    { from: 'ton', to: 'pound', value: 1, label: '1 ton to pounds' }
                  ].map((conversion, index) => {
                    const fromUnitData = weightUnits[conversion.from as keyof typeof weightUnits];
                    const toUnitData = weightUnits[conversion.to as keyof typeof weightUnits];
                    const fromFactor = fromUnitData.factor;
                    const toFactor = toUnitData.factor;
                    const kilograms = conversion.value * fromFactor;
                    const result = (kilograms / toFactor).toFixed(4);
                    
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
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">Weight Unit Reference</h3>
                <div className="space-y-2 text-muted-foreground text-sm">
                  <p>
                    Weight conversion between metric and imperial systems uses precise international standards for mass measurement.
                  </p>
                  <div className="text-xs sm:text-sm space-y-1 pt-2">
                    <div className="font-medium text-foreground">Metric System (Base: Kilogram):</div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span><strong>1 metric ton</strong> = 1000 kilograms</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span><strong>1 kilogram</strong> = 1000 grams</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span><strong>1 gram</strong> = 1000 milligrams</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm space-y-1 pt-3">
                    <div className="font-medium text-foreground">Imperial System:</div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span><strong>1 stone</strong> = 14 pounds</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span><strong>1 pound</strong> = 16 ounces</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span><strong>1 US ton</strong> = 2000 pounds</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm space-y-1 pt-3">
                    <div className="font-medium text-foreground">Standard Conversions:</div>
                    <div className="flex justify-between">
                      <span>1 kilogram =</span>
                      <span>2.20462262 pounds</span>
                    </div>
                    <div className="flex justify-between">
                      <span>1 pound =</span>
                      <span>0.45359237 kilograms</span>
                    </div>
                    <div className="flex justify-between">
                      <span>1 ounce =</span>
                      <span>28.3495231 grams</span>
                    </div>
                    <div className="flex justify-between">
                      <span>1 stone =</span>
                      <span>6.35029318 kilograms</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm space-y-1 pt-3">
                    <div className="font-medium text-foreground">Common Applications:</div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                      <span><strong>Cooking:</strong> Grams and ounces for recipes, pounds for meat portions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                      <span><strong>Shipping:</strong> Kilograms and pounds for packages, tons for freight</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                      <span><strong>Health:</strong> Kilograms or stones/pounds for body weight monitoring</span>
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
                    <Scale size={20} className="text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Weight Converter - Features & Applications</h2>
                </div>
                {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.whatItDoes && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground mb-4">
                    This Weight Converter provides instant, accurate conversions between all major weight measurement units. The tool seamlessly converts between metric system units (kilograms, grams, metric tons) and imperial system units (pounds, ounces, stones) using precise international standards. Whether you're cooking with recipes from different countries, shipping packages internationally, monitoring body weight, or working on scientific projects, this converter delivers reliable results with up to 6 decimal place accuracy. It automatically updates conversions in real-time as you type, includes common preset conversions for quick reference, and handles both small-scale measurements (like grams for cooking ingredients) and large weights (like tons for industrial applications). The intuitive interface makes it easy to switch between units and copy results for documentation or sharing.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Scale size={18} className="text-blue-600" />
                        <h3 className="font-semibold text-foreground">Metric Conversions</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Convert between kilograms, grams, and metric tons with precise decimal-based calculations. Essential for scientific research, international trade, and countries using the metric system for all weight measurements.</p>
                    </div>
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Package size={18} className="text-green-600" />
                        <h3 className="font-semibold text-foreground">Imperial Conversions</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Accurately convert pounds, ounces, and stones using standardized conversion factors. Perfect for cooking with US/UK recipes, body weight tracking, and applications in countries using imperial measurement systems.</p>
                    </div>
                    <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Truck size={18} className="text-purple-600" />
                        <h3 className="font-semibold text-foreground">Commercial Applications</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Handle shipping weights, package measurements, and industrial scales with conversions between kilograms and pounds. Includes ton conversions for freight and large-scale commercial applications.</p>
                    </div>
                    <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Weight size={18} className="text-amber-600" />
                        <h3 className="font-semibold text-foreground">Health & Fitness</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Convert body weight between kilograms and stones/pounds for health monitoring. Ideal for tracking fitness progress, medical weight measurements, and understanding international health standards.</p>
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
                    <Scale size={20} className="text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Weight Conversion Applications</h2>
                </div>
                {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.useCases && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">👩‍🍳 Cooking & Baking</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Recipe Conversion:</strong> Convert ingredient weights between grams and ounces for international recipes, adjust baking measurements accurately, and scale recipe quantities</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Nutrition Tracking:</strong> Convert food weights for calorie counting, calculate portion sizes in different units, and track macronutrients using standardized weight measurements</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Professional Kitchen:</strong> Convert bulk ingredient orders between kilograms and pounds, calculate recipe costs using different measurement systems, and standardize portion weights</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">📦 Shipping & Logistics</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Package Shipping:</strong> Convert package weights between kilograms and pounds for international shipping labels, calculate shipping costs using different carrier systems</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Freight Calculations:</strong> Convert cargo weights between metric tons and US tons for freight quotes, calculate load capacities using different measurement standards</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Customs Documentation:</strong> Prepare international shipping documents with accurate weight conversions, comply with different countries' measurement requirements</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">💪 Health & Fitness</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Body Weight Tracking:</strong> Convert between kilograms and stones/pounds for fitness tracking, monitor weight loss progress using preferred measurement systems</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Medical Applications:</strong> Convert patient weights for medical records, calculate medication dosages based on body weight in different units</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Sports & Athletics:</strong> Convert weightlifting loads between kilograms and pounds, track athlete body composition using international standards</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">🏭 Science & Industry</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Laboratory Work:</strong> Convert chemical measurements between grams and ounces for experiments, prepare solutions using precise weight conversions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Manufacturing:</strong> Convert raw material weights for production planning, calculate batch sizes using different measurement systems</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Agriculture:</strong> Convert crop yields between kilograms and pounds, calculate fertilizer applications using appropriate weight units</span>
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
                    <Scale size={20} className="text-amber-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">How to Use Weight Converter - Complete Guide</h2>
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
                            <div className="font-medium text-foreground">Enter Your Weight Value</div>
                            <div className="text-sm text-muted-foreground">Type the numerical weight you want to convert in the "From" field. Enter whole numbers, decimals, or fractions converted to decimals (e.g., 0.5 for ½).</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                          <div>
                            <div className="font-medium text-foreground">Select Source Unit</div>
                            <div className="text-sm text-muted-foreground">Choose the current unit of measurement from the dropdown menu next to your input. Options include kilograms, pounds, grams, ounces, stones, and tons.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                          <div>
                            <div className="font-medium text-foreground">Select Target Unit</div>
                            <div className="text-sm text-muted-foreground">Choose the unit you want to convert to from the "To" dropdown menu. The converter will automatically calculate and display the result in real-time.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">4</div>
                          <div>
                            <div className="font-medium text-foreground">Use Conversion Results</div>
                            <div className="text-sm text-muted-foreground">Copy the converted value using the copy button, or click any preset conversion for instant calculations of common weight measurement scenarios.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Pro Conversion Tips</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <div className="bg-blue-500/20 p-1 rounded mt-0.5">
                            <Scale size={12} className="text-blue-500" />
                          </div>
                          <span><strong>Real-time Updates:</strong> The converter updates automatically as you type, so you can see weight conversion results instantly without clicking any buttons</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-green-500/20 p-1 rounded mt-0.5">
                            <Package size={12} className="text-green-500" />
                          </div>
                          <span><strong>Swap Function:</strong> Use the swap button between units to quickly reverse your conversion direction without re-entering weight values</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-purple-500/20 p-1 rounded mt-0.5">
                            <Truck size={12} className="text-purple-500" />
                          </div>
                          <span><strong>Common Conversions:</strong> Save time by using the preset conversion buttons for frequently needed calculations like kg to lb or g to oz</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-amber-500/20 p-1 rounded mt-0.5">
                            <Weight size={12} className="text-amber-500" />
                          </div>
                          <span><strong>Precision Control:</strong> Results show up to 6 decimal places. For cooking, round to 1-2 decimals; for scientific work, use full precision</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-red-500/20 p-1 rounded mt-0.5">
                            <Copy size={12} className="text-red-500" />
                          </div>
                          <span><strong>Documentation Ready:</strong> Use the copy function to save conversion results for recipes, shipping labels, medical records, or project documentation</span>
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
                    <Scale size={20} className="text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Weight Conversion Examples</h2>
                </div>
                {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.examples && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">Common Weight Conversion Examples</h3>
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
                                  <td className="px-4 py-3 text-sm text-foreground">Kilograms (kg)</td>
                                  <td className="px-4 py-3 text-sm text-foreground">Pounds (lb)</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">5.51156</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Produce weight</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">150</td>
                                  <td className="px-4 py-3 text-sm text-foreground">Pounds (lb)</td>
                                  <td className="px-4 py-3 text-sm text-foreground">Kilograms (kg)</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">68.0389</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Body weight</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">500</td>
                                  <td className="px-4 py-3 text-sm text-foreground">Grams (g)</td>
                                  <td className="px-4 py-3 text-sm text-foreground">Ounces (oz)</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">17.6370</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Package weight</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">11</td>
                                  <td className="px-4 py-3 text-sm text-foreground">Stones (st)</td>
                                  <td className="px-4 py-3 text-sm text-foreground">Kilograms (kg)</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">69.8532</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">UK body weight</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">1.5</td>
                                  <td className="px-4 py-3 text-sm text-foreground">Tons (t)</td>
                                  <td className="px-4 py-3 text-sm text-foreground">Pounds (lb)</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">3306.93</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Shipping weight</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">28.35</td>
                                  <td className="px-4 py-3 text-sm text-foreground">Grams (g)</td>
                                  <td className="px-4 py-3 text-sm text-foreground">Ounces (oz)</td>
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
                      <h3 className="font-semibold text-foreground mb-2">Detailed Example: International Cooking & Shipping Project</h3>
                      <div className="bg-secondary/20 p-4 rounded-lg border border-border overflow-x-auto">
                        <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
{`Example: Converting weights for an international food business

Business: Gourmet food exporter shipping products worldwide
Requirements: Convert between metric and imperial for recipes, packaging, and shipping

Step 1: Recipe Development
Original recipe (European in grams):
• Flour: 500g
• Sugar: 200g
• Butter: 250g
• Chocolate chips: 150g

Convert to ounces for US customers:
• Flour: 500g × 0.035274 = 17.637 oz
• Sugar: 200g × 0.035274 = 7.055 oz
• Butter: 250g × 0.035274 = 8.8185 oz
• Chocolate chips: 150g × 0.035274 = 5.2911 oz

Rounded for practical use:
• Flour: 17.5 oz (≈ 496g)
• Sugar: 7 oz (≈ 198g)
• Butter: 8.75 oz (≈ 248g)
• Chocolate chips: 5.25 oz (≈ 149g)

Step 2: Product Packaging
Package sizes for different markets:
• Small package: 250g for Europe
• Convert to ounces: 250 × 0.035274 = 8.8185 oz
• Rounded: 8.8 oz for US market

• Medium package: 500g for Europe
• Convert to pounds: 500g = 0.5kg = 1.10231 lb
• Rounded: 1.1 lb for US market

• Large package: 1kg for Europe
• Convert to pounds: 1kg = 2.20462 lb
• Rounded: 2.2 lb for US market

Step 3: Shipping Calculations
Order to US customer:
• 10 small packages: 10 × 250g = 2500g = 2.5kg
• 5 medium packages: 5 × 500g = 2500g = 2.5kg
• 2 large packages: 2 × 1000g = 2000g = 2.0kg
• Total: 7.0kg

Convert to pounds for US shipping:
• 7.0kg × 2.20462 = 15.43234 lb
• Shipping cost based on weight brackets:
  - 0-1 lb: $5.00
  - 1-5 lb: $10.00
  - 5-10 lb: $15.00
  - 10-20 lb: $20.00
• Our package: 15.43 lb → $20.00 shipping

Step 4: Bulk Ingredients Ordering
Monthly needs for production:
• Flour: 500kg
• Convert to pounds: 500 × 2.20462 = 1102.31 lb
• Order from US supplier: 1100 lb (slight adjustment)

• Sugar: 200kg
• Convert to pounds: 200 × 2.20462 = 440.924 lb
• Order from US supplier: 441 lb

• Chocolate: 100kg
• Convert to pounds: 100 × 2.20462 = 220.462 lb
• Order from US supplier: 220 lb

Step 5: Nutritional Labeling
Per 100g serving nutritional info:
• Calories: 350 kcal
• Protein: 8g
• Convert protein to ounces: 8g = 0.282192 oz
• For US label (per serving size 1.4oz/40g):
  - Scale factor: 40g/100g = 0.4
  - Calories: 350 × 0.4 = 140 kcal
  - Protein: 8g × 0.4 = 3.2g = 0.1129 oz

Step 6: International Customs Documentation
Shipment to UK:
• Total weight: 50kg
• Convert to stones and pounds for UK understanding:
  - 50kg = 110.231 lb
  - Stones: 110.231 ÷ 14 = 7.87364 stones
  - Pounds remainder: 0.87364 × 14 = 12.231 lb
  - Result: 7 stone 12.2 lb

• Alternative for UK shipping forms:
  - In kilograms: 50kg
  - In pounds: 110.23 lb

Step 7: Recipe Scaling for Production
Batch size adjustment:
• Original recipe makes 24 units at 50g each = 1200g total
• Need to produce 1000 units:
  - Scale factor: 1000 ÷ 24 = 41.6667
  - Total weight needed: 1200g × 41.6667 = 50,000g = 50kg
  - Convert to pounds for US kitchen equipment: 50kg = 110.231 lb

• Individual ingredients scaling:
  - Flour: 500g × 41.6667 = 20,833.35g = 20.833kg = 45.93 lb
  - Sugar: 200g × 41.6667 = 8,333.34g = 8.333kg = 18.37 lb

Step 8: Cost Calculations
Ingredient costs from different suppliers:
• European supplier (price per kg):
  - Flour: €1.20/kg
  - Sugar: €1.50/kg
  - Chocolate: €8.00/kg

• US supplier (price per lb):
  - Flour: $0.60/lb = $0.60 ÷ 2.20462 = $0.272/kg
  - Sugar: $0.75/lb = $0.75 ÷ 2.20462 = $0.340/kg
  - Chocolate: $4.00/lb = $4.00 ÷ 2.20462 = $1.814/kg

• Convert to common unit (EUR/kg):
  - Assume exchange rate: 1 EUR = 1.10 USD
  - US flour: $0.272/kg ÷ 1.10 = €0.247/kg
  - US sugar: $0.340/kg ÷ 1.10 = €0.309/kg
  - US chocolate: $1.814/kg ÷ 1.10 = €1.649/kg

• Cost comparison:
  - Flour: Europe €1.20 vs US €0.247 → US cheaper
  - Sugar: Europe €1.50 vs US €0.309 → US cheaper
  - Chocolate: Europe €8.00 vs US €1.649 → US cheaper

Step 9: Quality Control
Acceptable weight variations:
• Package target: 250g
• Allowable variation: ±5g
• Convert to ounces: 5g = 0.17637 oz
• Quality check: Packages between 8.64 oz and 8.99 oz acceptable
  - Lower limit: 245g = 8.642 oz
  - Upper limit: 255g = 8.995 oz

Step 10: International Standards Compliance
Meeting regulatory requirements:
• EU: Labels in grams and kilograms
• US: Labels in ounces and pounds (with metric in parentheses)
• UK: May use grams or ounces, often both

Example label for all markets:
  Net Weight:
    EU: 250g
    US: 8.8 oz (250g)
    UK: 8.8 oz/250g

Conclusion:
Using accurate weight conversions ensures consistent product quality across international markets, correct shipping calculations, proper recipe scaling, and compliance with regional regulations. The weight converter provides the precision needed for professional food business operations while maintaining simplicity for home cooking applications.`}
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
                    <Scale size={20} className="text-blue-600" />
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

export default WeightConverter;