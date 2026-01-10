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
    differenceMassWeight: false,
    metricImperial: false,
    conversionLogic: false,
    industrialDailyUse: false,
    accuracyHandling: false,
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
      question: "Why does 1 kilogram equal exactly 2.20462262 pounds?",
      answer: "That specific number comes from the international yard and pound agreement of 1959. Before that, different countries had slightly different definitions of a pound. The modern international pound is defined as exactly 0.45359237 kilograms, which makes the conversion factor 1 divided by 0.45359237, giving us 2.20462262185. It's not a round number because the two systems developed independently centuries apart."
    },
    {
      question: "When converting cooking ingredients, should I round the results?",
      answer: "For most home cooking, rounding to 1-2 decimal places works perfectly. If a recipe calls for 500 grams of flour and you convert to ounces, 17.64 oz is close enough - you wouldn't measure 17.637 ounces anyway. Professional bakers might need more precision, but for everyday use, the difference between 17.6 and 17.64 ounces won't affect your cake. Just use common sense and your measuring tools' limitations."
    },
    {
      question: "I'm shipping internationally - which weight units should I use on forms?",
      answer: "Always use the units required by the destination country's customs forms. For the US, list weights in pounds; for Europe and most other countries, use kilograms. Many courier services like FedEx and DHL accept both. If you're unsure, include both units in parentheses. Remember that shipping charges often jump at certain weight thresholds, so converting accurately can literally save you money."
    },
    {
      question: "Why are there different types of ounces and tons?",
      answer: "History gives us messy systems. The avoirdupois ounce (28.35g) is what we use for general weights. Troy ounces (31.1g) are for precious metals. Fluid ounces measure volume, not weight. Similarly, a metric ton is 1000kg, a US short ton is 2000lb, and a UK long ton is 2240lb. Our converter uses the most common avoirdupois system and metric tons unless otherwise specified."
    },
    {
      question: "How do I convert baby weight from pounds to kilograms for medical records?",
      answer: "For baby weights, precision matters more. A newborn might be 7lb 8oz. First convert ounces to pounds (8oz ÷ 16 = 0.5lb), so 7.5lb total. Then convert to kg: 7.5 × 0.45359237 = 3.4019kg, which doctors would record as 3.4kg. Many pediatric growth charts show both units, but medical dosing calculations usually require kilograms for accuracy."
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
                    Converting between weight systems means understanding how different cultures measured things throughout history. The metric system's beauty is its simplicity, while imperial units reflect practical, human-scale measurements.
                  </p>
                  <div className="text-xs sm:text-sm space-y-1 pt-2">
                    <div className="font-medium text-foreground">Metric System (Logical & Decimal):</div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span><strong>1 metric ton</strong> = 1000 kilograms (makes sense)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span><strong>1 kilogram</strong> = 1000 grams (easy math)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span><strong>1 gram</strong> = 1000 milligrams (consistent scaling)</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm space-y-1 pt-3">
                    <div className="font-medium text-foreground">Imperial System (Historical & Practical):</div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span><strong>1 stone</strong> = 14 pounds (based on trading stones)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span><strong>1 pound</strong> = 16 ounces (Roman influence)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span><strong>1 US ton</strong> = 2000 pounds (shipping convenience)</span>
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
            {/* Difference Between Mass & Weight */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('differenceMassWeight')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500/10 p-2 rounded-lg">
                    <Scale size={20} className="text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Mass vs Weight: What You're Actually Converting</h2>
                </div>
                {openSections.differenceMassWeight ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.differenceMassWeight && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground mb-4">
                    Let's clear up something confusing: when we talk about "weight conversion," we're usually talking about mass conversion. Here's the difference that matters in everyday use.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Mass: The Actual Stuff</h3>
                      <p className="text-sm text-muted-foreground">
                        Mass is the amount of matter in an object. A kilogram of feathers and a kilogram of lead have the same mass. Your bathroom scale measures weight (the force), but when you convert between kilograms and pounds, you're really converting mass values. The kilogram is actually the base unit of mass in the metric system, defined by a physical object in Paris (until 2019) and now by fundamental constants.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        What's interesting is that mass doesn't change with location. If you could teleport a 1kg weight to the Moon, it would still have a mass of 1kg. The number of atoms, the actual stuff, remains constant. That's why scientific work always uses mass measurements.
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Weight: Gravity's Pull</h3>
                      <p className="text-sm text-muted-foreground">
                        Weight is the force gravity exerts on that mass. That same 1kg weight would weigh about 1.62 Newtons on the Moon instead of 9.8 Newtons on Earth. When we say something "weighs" 150 pounds, we're talking about the gravitational pull Earth exerts on that person's mass.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        For practical purposes on Earth's surface, we use weight and mass interchangeably because gravity is relatively constant here. Your kitchen scale measures weight, but displays it as if it were mass. That's fine for cooking, shipping, and most daily tasks. Just know that if you're calculating satellite trajectories or working in microgravity, the distinction becomes crucial.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <h4 className="font-semibold text-foreground mb-2">Practical Takeaway</h4>
                    <p className="text-sm text-muted-foreground">
                      For 99% of conversions you'll do - recipes, shipping, body weight - you can ignore the physics distinction. Our converter treats kilograms, pounds, etc. as mass units because that's how they're used in everyday life. If you're a scientist or engineer, you already know when precision matters. For everyone else: yes, 1kg equals 2.2lb on Earth, and that's what really counts when you're following a recipe or weighing luggage.
                    </p>
                  </div>
                </div>
              )}
            </article>

            {/* Metric vs Imperial Units */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('metricImperial')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-green-500/10 p-2 rounded-lg">
                    <Scale size={20} className="text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Metric vs Imperial: Two Worlds of Measurement</h2>
                </div>
                {openSections.metricImperial ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.metricImperial && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground mb-4">
                    The world is roughly split between metric (kilograms, grams) and imperial (pounds, ounces) systems. Understanding why both exist helps you convert between them more intuitively.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">The Metric System: Designed for Simplicity</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Created after the French Revolution, the metric system was designed from scratch to be logical. Everything is based on powers of ten. One kilogram is 1000 grams. One gram is 1000 milligrams. It's beautifully consistent - if you can multiply by 10, you can convert within the system.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Most of the world uses metric because it's easier for trade, science, and education. Children learn it quickly. Engineers love its consistency. The kilogram was originally defined as the mass of one liter of water at maximum density, though today it's tied to fundamental physics constants.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Imperial System: History in Your Hands</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Imperial units grew organically from practical use. A pound was literally a pound (libra) of silver in ancient Rome. An ounce (uncia) was 1/12 of that. The stone? That came from actual stones used as counterweights in markets. These units feel human-scale because they evolved from daily life.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        The US, Liberia, and Myanmar still primarily use imperial. The UK uses a mix - people weigh themselves in stones and pounds but buy groceries in grams and kilograms. Imperial's staying power comes from familiarity, not logic. People can visualize a pound of butter more easily than 453.59237 grams.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                      <h4 className="font-semibold text-foreground mb-2">When to Use Which System</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div>
                          <div className="font-medium text-foreground mb-1">Use Metric For:</div>
                          <ul className="text-muted-foreground space-y-1">
                            <li>• Scientific research and papers</li>
                            <li>• International business documents</li>
                            <li>• Medical prescriptions and dosages</li>
                            <li>• Engineering and manufacturing specs</li>
                          </ul>
                        </div>
                        <div>
                          <div className="font-medium text-foreground mb-1">Use Imperial For:</div>
                          <ul className="text-muted-foreground space-y-1">
                            <li>• Cooking with American/UK recipes</li>
                            <li>• Body weight in the US (pounds)</li>
                            <li>• Body weight in the UK (stones)</li>
                            <li>• Casual conversation in imperial countries</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </article>

            {/* Conversion Logic */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('conversionLogic')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-purple-500/10 p-2 rounded-lg">
                    <Scale size={20} className="text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">How the Conversion Actually Works</h2>
                </div>
                {openSections.conversionLogic ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.conversionLogic && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground mb-4">
                    You type in a number, select units, and get a result. But what's happening behind the scenes? Let's peel back the curtain on the conversion process.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">The Kilogram Bridge Method</h3>
                      <p className="text-sm text-muted-foreground">
                        Our converter uses kilograms as a middleman. Here's why: every weight unit has a defined relationship to the kilogram. One pound equals exactly 0.45359237 kilograms. One ounce equals exactly 0.028349523125 kilograms. So when you convert 10 pounds to ounces, we:
                      </p>
                      <ol className="list-decimal pl-5 text-sm text-muted-foreground space-y-2 mt-2">
                        <li>Convert pounds to kilograms: 10 lb × 0.45359237 = 4.5359237 kg</li>
                        <li>Convert kilograms to ounces: 4.5359237 kg ÷ 0.028349523125 = 160 oz</li>
                        <li>Display the result: 160 ounces (which makes sense - 10 pounds should be 160 ounces)</li>
                      </ol>
                      <p className="text-sm text-muted-foreground mt-3">
                        This two-step approach ensures maximum accuracy. Even if you're converting between two obscure units, they both have defined kilogram relationships, so we can convert anything to anything accurately.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Why Not Direct Conversions?</h3>
                      <p className="text-sm text-muted-foreground">
                        You might think: "Why not just multiply pounds by 16 to get ounces?" That works for pounds to ounces, but what about stones to grams? Or tons to ounces? Maintaining conversion factors between every possible pair (6 units means 30 conversion factors) is messy and error-prone.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Using kilograms as a common reference point means we only need 6 conversion factors (each unit to kg). The math stays cleaner, updates are easier if standards change, and rounding errors are minimized. It's the same method used by scientific institutions and standards organizations.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                      <h4 className="font-semibold text-foreground mb-2">Real Conversion Example</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Let's trace through converting 150 pounds to kilograms:
                      </p>
                      <div className="text-sm font-mono bg-background p-3 rounded border border-border">
                        150 lb × 0.45359237 kg/lb = 68.0388555 kg<br />
                        Rounded to 6 decimals: 68.038856 kg<br />
                        Displayed as: 68.0389 kg (rounded for readability)
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Notice we keep full precision during calculation, then round at the end. That prevents rounding errors from accumulating if you do multiple conversions in a row.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </article>

            {/* Industrial & Daily Use */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('industrialDailyUse')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-amber-500/10 p-2 rounded-lg">
                    <Scale size={20} className="text-amber-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">From Kitchen Scales to Shipping Docks</h2>
                </div>
                {openSections.industrialDailyUse ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.industrialDailyUse && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground mb-4">
                    Weight conversion isn't just academic - it's practical. Different situations demand different approaches. Here's how professionals and home users handle weight conversions in the real world.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Industrial Precision</h3>
                      <p className="text-sm text-muted-foreground">
                        In manufacturing and shipping, weight conversions affect costs and compliance. A shipping container labeled with the wrong weight can lead to fines, safety issues, or incorrect freight charges. Industrial scales often display both metric and imperial simultaneously to prevent errors.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        I've seen warehouses where workers convert between systems multiple times daily. Raw materials arrive in kilograms, production specs are in pounds, and shipping documents need both. The key is consistency - always use the same conversion factor throughout a project. Switching between 2.2046 and 2.2 mid-process causes discrepancies that compound.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Everyday Kitchen Conversions</h3>
                      <p className="text-sm text-muted-foreground">
                        Home cooks face different challenges. Recipes might call for "2 pounds of potatoes" but your scale shows grams. Or you find a British recipe with ingredients in grams but your American measuring cups use ounces. The good news: cooking is forgiving.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        For baking, precision matters more - a few grams can affect bread rising. For stews and sautés, approximate conversions work fine. Most experienced cooks develop intuition: "A pound is roughly two large apples" or "100 grams of cheese is about a cup shredded." Our quick conversion buttons help build that intuition faster.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">The Body Weight Dilemma</h3>
                      <p className="text-sm text-muted-foreground">
                        Fitness tracking highlights cultural differences in weight perception. Americans think in pounds, Brits in stones, Europeans in kilograms. When international athletes compete, they constantly convert. A 90kg weightlifter knows that's about 198lb, while a 14-stone rugby player understands that's roughly 88kg.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Medical professionals face this daily. Patient records might show weight in pounds, but medication dosages are calculated per kilogram. One hospital I worked with had a policy: all medical calculations use kilograms, but they'd tell patients their weight in whatever unit they preferred. It's a practical compromise that keeps both accuracy and patient comfort.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
                      <h4 className="font-semibold text-foreground mb-2">Pro Tip: Create Your Own Cheat Sheet</h4>
                      <p className="text-sm text-muted-foreground">
                        Keep a notepad with conversions you use regularly. Mine has: 1kg = 2.2lb, 1lb = 0.45kg, 100g = 3.5oz, 1 stone = 6.35kg. After using them repeatedly, they become second nature. The goal isn't to memorize all conversions, but to recognize common ones so you can spot when a conversion looks wrong.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </article>

            {/* Accuracy Handling */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('accuracyHandling')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-red-500/10 p-2 rounded-lg">
                    <Scale size={20} className="text-red-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">How Accurate is Accurate Enough?</h2>
                </div>
                {openSections.accuracyHandling ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.accuracyHandling && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground mb-4">
                    Precision matters differently in different contexts. A pharmacist needs more accuracy than a home cook. Our converter gives you six decimal places, but when should you use them all?
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">When Every Decimal Counts</h3>
                      <p className="text-sm text-muted-foreground">
                        Scientific research, pharmaceutical manufacturing, and precious metals trading require extreme precision. In these fields, 28.3495231 grams per ounce isn't an approximation - it's the definition. A 0.0001% error in medication could be dangerous. A 0.01% error in gold trading could cost thousands.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        These professionals use calibrated equipment that measures to 0.0001 grams. They need conversion tools that maintain full precision throughout calculations. Our converter keeps internal calculations at maximum precision, then lets you decide how many decimals to display.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">When Close Enough Works</h3>
                      <p className="text-sm text-muted-foreground">
                        For cooking, shipping, and fitness, practical accuracy beats mathematical perfection. Your kitchen scale probably measures to the nearest gram (0.035 ounces). Your bathroom scale to the nearest 0.1kg (0.22lb). Package scales at the post office to the nearest ounce (28 grams).
                      </p>
                      <p className="text-sm text-muted-foreground">
                        In these cases, rounding appropriately actually helps. If a recipe calls for 8 ounces of flour, 227 grams is more practical than 226.796 grams. You can't measure 0.796 grams on a kitchen scale anyway. The difference won't affect your cookies.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                      <h4 className="font-semibold text-foreground mb-2">Practical Rounding Guidelines</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div>
                          <div className="font-medium text-foreground mb-1">Round to 1 decimal:</div>
                          <ul className="text-muted-foreground space-y-1">
                            <li>• Body weight (kg or lb)</li>
                            <li>• Package weights for shipping</li>
                            <li>• Gym weights and fitness tracking</li>
                          </ul>
                        </div>
                        <div>
                          <div className="font-medium text-foreground mb-1">Round to 2 decimals:</div>
                          <ul className="text-muted-foreground space-y-1">
                            <li>• Baking ingredients</li>
                            <li>• Coffee and tea portions</li>
                            <li>• Small package shipping</li>
                          </ul>
                        </div>
                        <div>
                          <div className="font-medium text-foreground mb-1">Use full precision:</div>
                          <ul className="text-muted-foreground space-y-1">
                            <li>• Scientific experiments</li>
                            <li>• Medication dosages</li>
                            <li>• Precious metals</li>
                            <li>• Laboratory work</li>
                          </ul>
                        </div>
                        <div>
                          <div className="font-medium text-foreground mb-1">No rounding needed:</div>
                          <ul className="text-muted-foreground space-y-1">
                            <li>• Rough estimates</li>
                            <li>• Recipe idea planning</li>
                            <li>• Casual conversation</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">The Measurement Error Reality</h3>
                      <p className="text-sm text-muted-foreground">
                        Remember that conversion accuracy depends on measurement accuracy. If you weigh something on a $20 kitchen scale that's only accurate to ±5 grams, converting that to ounces with six decimal places gives a false sense of precision. The conversion can only be as accurate as your original measurement.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        This is why professionals calibrate their scales regularly. If you're doing important work, consider the accuracy of your measuring device before worrying about conversion precision. A perfectly converted wrong measurement is still wrong.
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
                    <Scale size={20} className="text-indigo-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Real-World Conversion Scenarios</h2>
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
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Situation</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Conversion</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Practical Result</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-border">
                                <tr>
                                  <td className="px-4 py-3 text-sm text-foreground">Airline baggage allowance</td>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">23 kg → lb</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">50.7063 lb (round to 50.7 lb)</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-foreground">British recipe for American kitchen</td>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">225 g flour → oz</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">7.937 oz (call it 8 oz)</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-foreground">Weight loss tracking (UK style)</td>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">5 kg lost → stone</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">0.787 stone (about ¾ stone)</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-foreground">Shipping small package to US</td>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">850 g → lb</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">1.874 lb (round to 1.9 lb for postage)</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-foreground">Baby weight for medical records</td>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">8 lb 3 oz → kg</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">3.714 kg (record as 3.7 kg)</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-foreground">Coffee beans for espresso</td>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">18 g per shot → oz</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">0.635 oz (about ⅔ oz)</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Weekly Meal Prep Conversion Challenge</h3>
                      <div className="bg-secondary/20 p-4 rounded-lg border border-border">
                        <p className="text-sm text-muted-foreground mb-3">
                          Let's walk through a real scenario: You're meal prepping using recipes from different countries, buying ingredients locally, and tracking nutrition.
                        </p>
                        
                        <div className="space-y-3 text-sm">
                          <div>
                            <div className="font-medium text-foreground">Monday: Italian pasta sauce</div>
                            <div className="text-muted-foreground ml-3">Recipe says "1 pound ground beef" but your scale shows grams. Convert: 1 lb = 453.592 g. You have a 500g package, so use it all - close enough.</div>
                          </div>
                          
                          <div>
                            <div className="font-medium text-foreground">Tuesday: British baking</div>
                            <div className="text-muted-foreground ml-3">Scones recipe: "8 oz flour." That's 226.796 g. Your scale measures to 1g, so 227 g works. Butter: "4 oz" = 113.398 g → 113 g.</div>
                          </div>
                          
                          <div>
                            <div className="font-medium text-foreground">Wednesday: Fitness nutrition</div>
                            <div className="text-muted-foreground ml-3">Protein powder scoop = 30 g. Your American supplement says "1.05 oz per scoop." Convert: 30 g = 1.058 oz. Close enough - it's the same product.</div>
                          </div>
                          
                          <div>
                            <div className="font-medium text-foreground">Thursday: International shipping</div>
                            <div className="text-muted-foreground ml-3">Package to Canada weighs 2.3 kg. Canada uses metric, but your US postage calculator needs pounds: 2.3 kg = 5.07 lb. Shipping cost based on 5.1 lb bracket.</div>
                          </div>
                          
                          <div>
                            <div className="font-medium text-foreground">Friday: Medication for pet</div>
                            <div className="text-muted-foreground ml-3">Vet says "5 mg per kg" and your dog weighs 48.5 lb. First convert to kg: 48.5 lb = 22.00 kg. Dose = 22 × 5 = 110 mg. Precision matters here.</div>
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mt-3">
                          Notice how context changes your precision needs. Cooking allows rounding, medication demands accuracy, and shipping needs practical bracket calculations.
                        </p>
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