'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowLeftRight, Copy, RotateCcw, ChevronDown, ChevronUp, Droplets, Package, Beaker, FlaskRound, Home, Factory, Utensils, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '../../hooks/use-toast';
import Link from 'next/link';

const VolumeConverter = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState('liter');
  const [toUnit, setToUnit] = useState('gallon');
  const [result, setResult] = useState<string>('');
  const { toast } = useToast();
  const [openSections, setOpenSections] = useState({
    whatItDoes: false,
    useCases: false,
    howToUse: false,
    examples: false,
    faqs: false,
    relatedTools: false
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Related tools for Unit Converter category
  const relatedTools = [
    { name: 'Length Converter', path: '/unit-tools/length-converter', icon: Package },
    { name: 'Weight Converter', path: '/unit-tools/weight-converter', icon: Package },
    { name: 'Temperature Converter', path: '/unit-tools/temperature-converter', icon: Beaker },
    { name: 'Time Converter', path: '/unit-tools/time-converter', icon: Package },
    { name: 'Speed Converter', path: '/unit-tools/speed-converter', icon: Package },
    { name: 'Area Converter', path: '/unit-tools/area-converter', icon: Home },
    { name: 'Data Size Converter', path: '/unit-tools/data-size-converter', icon: Package }
  ];

  // FAQ Data
  const faqData = [
    {
      question: "What's the difference between US gallons and imperial gallons?",
      answer: "US gallons and imperial gallons are different units. A US gallon equals 3.78541 liters, while an imperial gallon equals 4.54609 liters. This calculator uses US gallons by default, which is the standard measurement system used in the United States for liquid volumes."
    },
    {
      question: "Why are there so many different volume measurement systems?",
      answer: "Different volume systems developed historically based on cultural practices and regional standards. The metric system (liters) is used internationally, while the US customary system (gallons, quarts) is used primarily in the United States. Cooking measurements (cups, tablespoons) evolved separately for practical kitchen use."
    },
    {
      question: "How accurate is this volume conversion calculator?",
      answer: "The calculator provides high-precision conversions using standard conversion factors accurate to six decimal places. For scientific applications requiring extreme precision, additional factors like temperature and pressure might be considered, but for everyday use, educational purposes, and most business applications, this tool provides accurate and reliable conversions."
    },
    {
      question: "Can I convert between metric and imperial volume units?",
      answer: "Yes, this calculator seamlessly converts between all major volume measurement systems including metric (liters, milliliters), US customary (gallons, quarts, pints), cooking measurements (cups, fluid ounces), and cubic measurements (cubic meters, cubic feet). The conversion happens instantly as you change units or values."
    },
    {
      question: "What's the most commonly used volume conversion?",
      answer: "The most common volume conversions are liters to gallons (used in fuel and liquid measurements), milliliters to fluid ounces (used in cooking and medicine), and cups to milliliters (used in recipes). These conversions are frequently needed in daily life, cooking, international travel, and various professional fields."
    }
  ];

  const volumeUnits = {
    liter: { name: 'Liter', abbreviation: 'L', factor: 1 },
    milliliter: { name: 'Milliliter', abbreviation: 'mL', factor: 0.001 },
    gallon: { name: 'Gallon', abbreviation: 'gal', factor: 3.78541 },
    quart: { name: 'Quart', abbreviation: 'qt', factor: 0.946353 },
    pint: { name: 'Pint', abbreviation: 'pt', factor: 0.473176 },
    cup: { name: 'Cup', abbreviation: 'cup', factor: 0.236588 },
    fluidounce: { name: 'Fluid Ounce', abbreviation: 'fl oz', factor: 0.0295735 },
    cubicmeter: { name: 'Cubic Meter', abbreviation: 'm³', factor: 1000 },
    cubicfoot: { name: 'Cubic Foot', abbreviation: 'ft³', factor: 28.3168 }
  };

  const convertVolume = () => {
    if (!inputValue || isNaN(Number(inputValue))) {
      setResult('');
      return;
    }

    const value = Number(inputValue);
    const fromFactor = volumeUnits[fromUnit as keyof typeof volumeUnits].factor;
    const toFactor = volumeUnits[toUnit as keyof typeof volumeUnits].factor;
    
    const liters = value * fromFactor;
    const converted = liters / toFactor;
    
    setResult(converted.toFixed(6).replace(/\.?0+$/, ''));
  };

  useEffect(() => {
    convertVolume();
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
      <title>Volume Converter | Liters to Gallons, Milliliters, Cups, Ounces | GrockTool.com</title>
      <meta name="description" content="Free online volume converter. Convert between liters, gallons, milliliters, cups, fluid ounces, quarts, pints, cubic meters, and cubic feet instantly. Perfect for cooking, science, and everyday use." />
      <meta name="keywords" content="volume converter, liters to gallons, milliliters to cups, fluid ounces to milliliters, gallon to liter, cup to milliliter, volume conversion, liquid measurement, cooking conversion, metric to imperial" />
      <meta property="og:title" content="Volume Converter | Liters to Gallons, Milliliters, Cups, Ounces" />
      <meta property="og:description" content="Free online volume converter. Convert between liters, gallons, milliliters, cups, fluid ounces, quarts, pints, cubic meters, and cubic feet instantly." />
      <link rel="canonical" href="https://grocktool.com/unit-tools/volume-converter" />
      
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
                <Droplets size={16} className="text-blue-600" />
                <span className="text-sm font-medium text-blue-600">Unit Conversion • Cooking • Science • Engineering</span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                Volume Converter
                <span className="block text-lg sm:text-xl lg:text-2xl font-normal text-muted-foreground mt-2">
                  Convert Liters • Gallons • Milliliters • Cups • Fluid Ounces • Quarts • Pints
                </span>
              </h1>
              
              <div className="flex flex-wrap justify-center gap-4 mt-6 mb-8">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 rounded-lg">
                  <Droplets size={14} className="text-blue-600" />
                  <span className="text-xs sm:text-sm text-foreground">Liters to Gallons</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-lg">
                  <Utensils size={14} className="text-green-600" />
                  <span className="text-xs sm:text-sm text-foreground">Cooking Measurements</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 rounded-lg">
                  <FlaskRound size={14} className="text-purple-600" />
                  <span className="text-xs sm:text-sm text-foreground">Scientific Units</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 rounded-lg">
                  <Factory size={14} className="text-amber-600" />
                  <span className="text-xs sm:text-sm text-foreground">Industrial Volumes</span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Converter & Results */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Examples Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <div className="space-y-3">
                  <div className="text-xs text-muted-foreground">Common Volume Conversions:</div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                    <button
                      onClick={() => {
                        setFromUnit('gallon');
                        setToUnit('liter');
                        setInputValue('1');
                      }}
                      className="px-3 py-2 bg-blue-500/10 text-blue-600 rounded-lg hover:bg-blue-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Droplets size={12} />
                      1 gal to L
                    </button>
                    <button
                      onClick={() => {
                        setFromUnit('cup');
                        setToUnit('milliliter');
                        setInputValue('1');
                      }}
                      className="px-3 py-2 bg-green-500/10 text-green-600 rounded-lg hover:bg-green-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Utensils size={12} />
                      1 cup to mL
                    </button>
                    <button
                      onClick={() => {
                        setFromUnit('liter');
                        setToUnit('gallon');
                        setInputValue('5');
                      }}
                      className="px-3 py-2 bg-purple-500/10 text-purple-600 rounded-lg hover:bg-purple-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Factory size={12} />
                      5 L to gal
                    </button>
                    <button
                      onClick={() => {
                        setFromUnit('fluidounce');
                        setToUnit('milliliter');
                        setInputValue('8');
                      }}
                      className="px-3 py-2 bg-amber-500/10 text-amber-600 rounded-lg hover:bg-amber-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Beaker size={12} />
                      8 oz to mL
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
                      <Droplets size={20} className="text-foreground" />
                      <label className="block text-sm font-medium text-foreground">
                        Volume Converter
                      </label>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-blue-600">
                      <Droplets size={12} />
                      <span>Real-time conversion</span>
                    </div>
                  </div>

                  {/* Input Section */}
                  <div className="space-y-4">
                    {/* From Unit */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">From</label>
                      <div className="flex gap-2 sm:gap-3">
                        <input
                          type="number"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          placeholder="Enter volume"
                          className="flex-1 p-3 sm:p-4 text-base bg-input border border-border rounded-lg sm:rounded-xl focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-ring focus:ring-opacity-50"
                        />
                        <select
                          value={fromUnit}
                          onChange={(e) => setFromUnit(e.target.value)}
                          className="w-24 sm:w-28 p-3 sm:p-4 bg-input border border-border rounded-lg sm:rounded-xl focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-ring focus:ring-opacity-50 text-sm sm:text-base"
                        >
                          {Object.entries(volumeUnits).map(([key, unit]) => (
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
                            placeholder="Result"
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
                          {Object.entries(volumeUnits).map(([key, unit]) => (
                            <option key={key} value={key}>{unit.name} ({unit.abbreviation})</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Volume Tips */}
                  <div className="p-3 bg-gradient-to-r from-secondary/20 to-secondary/10 rounded-lg border border-border">
                    <div className="text-xs font-medium text-foreground mb-1">Volume Measurement Tips:</div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>• 1 US gallon = 3.78541 liters (liquid volume)</div>
                      <div>• 1 cup = 236.588 milliliters (standard cooking measurement)</div>
                      <div>• 1 fluid ounce = 29.5735 milliliters (US standard)</div>
                      <div>• 1 cubic meter = 1000 liters (metric system)</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={convertVolume}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all text-sm sm:text-base font-medium shadow-md hover:shadow-lg"
                    >
                      <Droplets size={16} className="sm:w-4 sm:h-4" />
                      Convert Volume
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

              {/* Volume Guide Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Droplets size={18} className="text-blue-600" />
                  Volume Conversion Complete Guide
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  {/* Metric System */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-blue-500/10 p-2 rounded-lg">
                        <Droplets size={16} className="text-blue-600" />
                      </div>
                      <h4 className="text-sm font-medium text-foreground">Metric Volume Units</h4>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Liter (L):</strong> Base metric unit, used worldwide for liquids</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Milliliter (mL):</strong> 1/1000 of a liter, used for small quantities</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Cubic Meter (m³):</strong> 1000 liters, used for large volumes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Cubic Centimeter (cm³):</strong> Equal to 1 mL, used in science</span>
                      </div>
                    </div>
                  </div>

                  {/* US Customary Units */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-green-500/10 p-2 rounded-lg">
                        <Factory size={16} className="text-green-600" />
                      </div>
                      <h4 className="text-sm font-medium text-foreground">US Customary Units</h4>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Gallon (gal):</strong> 3.78541 L, used for fuel and large containers</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Quart (qt):</strong> 1/4 gallon, used for milk and juices</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Pint (pt):</strong> 1/8 gallon, used for beer and cream</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Cup (c):</strong> 1/16 gallon, used in cooking recipes</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-lg border border-blue-500/20">
                  <h4 className="text-sm font-medium text-foreground mb-2">Common Volume Equivalents</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-muted-foreground">
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-foreground">1 Gallon</span>
                      <span className="font-mono">3.785 L | 4 Quarts | 8 Pints</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-foreground">1 Liter</span>
                      <span className="font-mono">1000 mL | 33.814 fl oz</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-foreground">1 Cup</span>
                      <span className="font-mono">236.588 mL | 8 fl oz</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-foreground">1 Cubic Meter</span>
                      <span className="font-mono">1000 L | 264.172 gal</span>
                    </div>
                  </div>
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
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">Volume Conversion Systems</h3>
                <div className="space-y-2 text-muted-foreground text-sm">
                  <p>
                    Volume measurement systems vary globally, with the metric system used internationally
                    and US customary units primarily used in the United States. Cooking measurements form
                    a separate practical system.
                  </p>
                  <div className="text-xs sm:text-sm space-y-1 pt-2">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                      <span>Enter the volume value you want to convert</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                      <span>Select the unit you're converting from</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                      <span>Select the unit you're converting to</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                      <span>View instant conversion results</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                      <span>Use swap button to reverse conversion</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm space-y-2 pt-3">
                    <div className="font-medium text-foreground">Metric System (International):</div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span><strong>Liter (L):</strong> Base unit for liquid volume</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span><strong>Milliliter (mL):</strong> 1/1000 liter, for precise measurements</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span><strong>Cubic Meter (m³):</strong> Used for large volumes like pools</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm space-y-2 pt-3">
                    <div className="font-medium text-foreground">US Customary Units:</div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span><strong>Gallon (gal):</strong> Used for fuel, milk, large containers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span><strong>Quart (qt):</strong> 1/4 gallon, common for beverages</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span><strong>Pint (pt):</strong> 1/8 gallon, used for beer, ice cream</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm space-y-2 pt-3">
                    <div className="font-medium text-foreground">Cooking Measurements:</div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                      <span><strong>Cup (c):</strong> Standard cooking measurement, 236.6 mL</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                      <span><strong>Fluid Ounce (fl oz):</strong> Used in recipes, 29.57 mL</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                      <span><strong>Tablespoon (tbsp):</strong> 1/16 cup, 14.79 mL</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm space-y-2 pt-3">
                    <div className="font-medium text-foreground">Specialized Units:</div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-amber-500 rounded-full"></div>
                      <span><strong>Cubic Foot (ft³):</strong> Used in construction, shipping</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-amber-500 rounded-full"></div>
                      <span><strong>Barrel (bbl):</strong> 42 US gallons, oil industry</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-amber-500 rounded-full"></div>
                      <span><strong>Acre-foot:</strong> Water volume measurement</span>
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
                    <Droplets size={20} className="text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Volume Converter - Features & Conversion Systems</h2>
                </div>
                {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.whatItDoes && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground mb-4">
                    This Volume Converter is a comprehensive tool for converting between different volume measurement systems used worldwide. It handles conversions between metric units (liters, milliliters, cubic meters), US customary units (gallons, quarts, pints, fluid ounces), cooking measurements (cups), and specialized units (cubic feet). The calculator provides instant, accurate conversions essential for international travel, cooking with foreign recipes, scientific research, engineering projects, and everyday measurement needs. With real-time calculation and precision up to six decimal places, this tool eliminates the confusion of manual conversions and ensures accuracy across all volume measurement standards.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Droplets size={18} className="text-blue-600" />
                        <h3 className="font-semibold text-foreground">Metric Conversions</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Convert between liters, milliliters, and cubic meters—the international standard volume units used in science, medicine, and most countries worldwide. Essential for international trade and scientific research.</p>
                    </div>
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Factory size={18} className="text-green-600" />
                        <h3 className="font-semibold text-foreground">US Customary Units</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Convert gallons, quarts, pints, and fluid ounces—the primary volume measurements used in the United States for fuel, beverages, cooking, and industrial applications.</p>
                    </div>
                    <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Utensils size={18} className="text-purple-600" />
                        <h3 className="font-semibold text-foreground">Cooking Measurements</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Convert cups, tablespoons, and fluid ounces for recipe preparation. Essential for following international recipes and converting between measurement systems in the kitchen.</p>
                    </div>
                    <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Beaker size={18} className="text-amber-600" />
                        <h3 className="font-semibold text-foreground">Scientific & Industrial</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Convert cubic meters and cubic feet for engineering, construction, and scientific applications. Includes specialized volume units for professional and technical use.</p>
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
                    <Droplets size={20} className="text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Volume Conversion Applications</h2>
                </div>
                {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.useCases && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">👨‍🍳 Cooking & Baking Applications</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>International Recipes:</strong> Convert European recipes (liters/milliliters) to US measurements (cups/fluid ounces) and vice versa for accurate ingredient measurements</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Recipe Scaling:</strong> Convert measurements when doubling or halving recipes, ensuring precise proportions for successful cooking and baking results</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Ingredient Substitutions:</strong> Convert between different measurement systems when substituting ingredients or using alternative measuring tools</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Canning & Preserving:</strong> Convert volumes for jar filling, brine preparation, and preserving liquid measurements in home canning operations</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">🚗 Automotive & Industrial Applications</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Fuel Conversion:</strong> Convert between liters and gallons for fuel consumption calculations, trip planning, and understanding international fuel efficiency ratings</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Fluid Capacity:</strong> Convert engine oil capacities, coolant volumes, and other automotive fluids between metric and US customary measurement systems</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Industrial Processing:</strong> Convert batch sizes, tank capacities, and production volumes in manufacturing, chemical processing, and food production facilities</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Construction Materials:</strong> Convert concrete volumes, paint quantities, and other construction material measurements between different unit systems</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">🔬 Science & Education Applications</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Laboratory Work:</strong> Convert between milliliters, liters, and fluid ounces for precise chemical measurements, solution preparation, and experimental protocols</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Medical Dosages:</strong> Convert medication volumes between milliliters and fluid ounces for accurate dosage calculations and international medical practice</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Educational Instruction:</strong> Teach students volume conversion principles, demonstrate real-world applications, and practice unit conversion skills</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Research Publications:</strong> Convert volume measurements for scientific papers, ensure consistency across international research standards, and prepare data for publication</span>
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
                    <Droplets size={20} className="text-amber-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">How to Use Volume Converter - Complete Guide</h2>
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
                            <div className="font-medium text-foreground">Enter Volume Value</div>
                            <div className="text-sm text-muted-foreground">Input the numerical volume you want to convert. You can use decimal numbers for precise measurements.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                          <div>
                            <div className="font-medium text-foreground">Select Source Unit</div>
                            <div className="text-sm text-muted-foreground">Choose the unit of the volume you entered from the dropdown menu (e.g., liters, gallons, cups).</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                          <div>
                            <div className="font-medium text-foreground">Select Target Unit</div>
                            <div className="text-sm text-muted-foreground">Choose the unit you want to convert to from the second dropdown menu.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">4</div>
                          <div>
                            <div className="font-medium text-foreground">View & Use Results</div>
                            <div className="text-sm text-muted-foreground">The converted volume appears instantly. Use the copy button to save results for recipes, calculations, or records.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Pro Conversion Tips</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <div className="bg-blue-500/20 p-1 rounded mt-0.5">
                            <Droplets size={12} className="text-blue-500" />
                          </div>
                          <span><strong>Quick Conversions:</strong> Use the quick buttons for common conversions like 1 gallon to liters or 1 cup to milliliters</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-green-500/20 p-1 rounded mt-0.5">
                            <ArrowLeftRight size={12} className="text-green-500" />
                          </div>
                          <span><strong>Reverse Conversion:</strong> Click the swap button to instantly reverse your conversion without re-entering values</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-purple-500/20 p-1 rounded mt-0.5">
                            <Utensils size={12} className="text-purple-500" />
                          </div>
                          <span><strong>Cooking Accuracy:</strong> For baking, use precise conversions (cups to mL) as baking requires exact measurements</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-amber-500/20 p-1 rounded mt-0.5">
                            <Factory size={12} className="text-amber-500" />
                          </div>
                          <span><strong>Large Volumes:</strong> For industrial applications, use cubic meters or cubic feet for more manageable numbers</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-red-500/20 p-1 rounded mt-0.5">
                            <Copy size={12} className="text-red-500" />
                          </div>
                          <span><strong>Save Results:</strong> Use the copy function to save conversion results for recipes, shopping lists, or project documentation</span>
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
                    <Droplets size={20} className="text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Volume Conversion Examples</h2>
                </div>
                {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.examples && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">Common Volume Conversion Examples</h3>
                      <div className="overflow-x-auto">
                        <div className="min-w-full inline-block align-middle">
                          <div className="overflow-hidden border border-border rounded-lg">
                            <table className="min-w-full divide-y divide-border">
                              <thead className="bg-secondary/20">
                                <tr>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">From</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">To</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Conversion Factor</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Example</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Result</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-border">
                                <tr>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">1 Gallon</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">Liters</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">× 3.78541</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">5 gal</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">18.9271 L</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">1 Liter</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">Milliliters</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">× 1000</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">2.5 L</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">2500 mL</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">1 Cup</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">Milliliters</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">× 236.588</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">3 cups</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">709.764 mL</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">1 Fluid Ounce</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">Milliliters</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">× 29.5735</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">8 fl oz</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">236.588 mL</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">1 Cubic Meter</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">Liters</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">× 1000</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">0.5 m³</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">500 L</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Detailed Example: Recipe Conversion</h3>
                      <div className="bg-secondary/20 p-4 rounded-lg border border-border overflow-x-auto">
                        <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
{`Example: Converting a European cake recipe to US measurements

Original European Recipe (Metric System):
• 500 mL milk
• 250 mL vegetable oil
• 3 eggs (approximately 150 mL)
• 1 L water
• 750 g flour (not volume, but included for context)

Step 1: Convert Milk
500 mL milk to US cups:
500 mL ÷ 236.588 mL per cup = 2.11338 cups
Rounded for cooking: 2⅛ cups or 2 cups + 2 tablespoons

Step 2: Convert Vegetable Oil
250 mL vegetable oil to US cups:
250 mL ÷ 236.588 = 1.05669 cups
Rounded: 1 cup + 1 tablespoon (since 1 tbsp = 14.79 mL)

Step 3: Convert Eggs (approximate)
3 large eggs ≈ 150 mL total volume
150 mL ÷ 29.5735 = 5.07 fluid ounces
US standard: 3 large eggs (no conversion needed)

Step 4: Convert Water
1 L water to US cups:
1 L = 1000 mL
1000 mL ÷ 236.588 = 4.22675 cups
Rounded: 4¼ cups or 4 cups + 2 fluid ounces

Step 5: Complete Converted Recipe
US Customary Measurements:
• 2⅛ cups milk (or 2 cups + 2 tbsp)
• 1 cup + 1 tbsp vegetable oil
• 3 large eggs
• 4¼ cups water (or 4 cups + 2 fl oz)
• 26.46 oz flour (750 g converted to ounces)

Step 6: Practical Cooking Adjustments
Since US measuring cups are standardized:
• Milk: Use 2 cups + 2 tablespoons (measure 2 cups, then add 2 tbsp)
• Oil: Use 1 cup + 1 tablespoon
• Water: Use 4 cups + 2 fluid ounces (use liquid measuring cup)

Step 7: Verification Check
Total liquid volume in original recipe:
500 + 250 + 150 + 1000 = 1900 mL
Total in converted recipe:
(2.125 × 236.588) + (1.0625 × 236.588) + 150 + (4.25 × 236.588) = 
502.5 + 251.4 + 150 + 1005.5 = 1909.4 mL
Difference: 9.4 mL (0.5% difference) - acceptable for cooking

Step 8: Baking Notes
• For baking, precision matters more than cooking
• Consider weighing ingredients instead of volume for flour
• Temperature and altitude may also need adjustment
• Oven temperatures may need conversion (°C to °F)

Final Tips:
1. When converting recipes, round to nearest practical measurement
2. Keep a conversion chart in your kitchen
3. Test converted recipes before important occasions
4. Adjust liquid slightly based on humidity and flour absorption`}
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
                    <Droplets size={20} className="text-blue-600" />
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
                <h2 className="text-xl font-bold text-foreground">More Unit Converter Tools</h2>
                {openSections.relatedTools ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.relatedTools && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground mb-4">
                    Explore other useful unit conversion tools from our Unit Converter category:
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

export default VolumeConverter;