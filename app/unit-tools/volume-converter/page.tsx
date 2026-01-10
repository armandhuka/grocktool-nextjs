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
    volumeUnitsExplained: false,
    liquidVsSolid: false,
    conversionFormula: false,
    practicalUseCases: false,
    accuracyNotes: false,
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
      question: "Why are US gallons different from UK gallons?",
      answer: "It's a historical quirk. The US kept the old British wine gallon (3.785 L) from colonial times, while Britain switched to a larger imperial gallon (4.546 L) in 1824. The difference matters when you're buying fuel or comparing recipes across countries. Always check which gallon you're working with - most modern tools (including ours) default to US gallons unless specified."
    },
    {
      question: "When measuring flour or sugar, should I use cups or weight?",
      answer: "For baking, always use weight if possible. A cup of flour can weigh anywhere from 120 to 150 grams depending on how you scoop it - sifted, spooned, or packed. That difference can ruin delicate baked goods. Cooks can get away with volume measurements for most things, but bakers need precision. If a recipe gives both, use the weight."
    },
    {
      question: "How do I convert between liquid and dry measurements?",
      answer: "They're different systems, despite sharing names like 'cup' and 'tablespoon.' A liquid cup is 236.6 mL, while a dry cup varies by ingredient. For water, 1 cup liquid = 1 cup volume. For flour, 1 cup dry ≈ 120-150 grams, not directly convertible to milliliters. The rule: use liquid measures for liquids, dry measures for powders, and a kitchen scale when accuracy matters."
    },
    {
      question: "Why is a fluid ounce different from a weight ounce?",
      answer: "Fluid ounces measure volume, weight ounces measure mass. They're completely different things that happen to share a name. One fluid ounce of water weighs about one avoirdupois ounce, but that's specific to water at a certain temperature. Olive oil is lighter, honey is heavier. This confusion causes countless recipe failures - always check whether you're dealing with fluid ounces (volume) or ounces (weight)."
    },
    {
      question: "How precise do I need to be when converting cooking measurements?",
      answer: "For soups and stews, approximate conversions work fine. If a recipe calls for 500 mL broth and you use 2 cups (473 mL), the 5% difference won't matter. For baking, especially with leavening agents, be precise. 5 mL baking powder instead of 4.5 mL can affect rising. When in doubt: savory cooking tolerates approximation, baking demands precision, and cocktails need exact measurements."
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
                    <div className="text-xs font-medium text-foreground mb-1">Quick Volume Reference:</div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>• 1 US gallon = about 3.8 liters (think: a milk jug)</div>
                      <div>• 1 liter = about 4.2 cups (think: a large soda bottle)</div>
                      <div>• 1 cup = about 240 mL (think: a coffee mug)</div>
                      <div>• 1 fluid ounce = about 30 mL (think: a shot glass)</div>
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
                  Everyday Volume Comparisons
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  {/* Common Household Items */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-blue-500/10 p-2 rounded-lg">
                        <Home size={16} className="text-blue-600" />
                      </div>
                      <h4 className="text-sm font-medium text-foreground">You Probably Have These:</h4>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Soda can:</strong> 12 fl oz = 355 mL (exactly, not rounded)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Water bottle:</strong> 16.9 fl oz = 500 mL (common size)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Milk jug:</strong> 1 gallon = 3.78 L (US standard)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Wine bottle:</strong> 750 mL = 25.4 fl oz (standard)</span>
                      </div>
                    </div>
                  </div>

                  {/* Cooking References */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-green-500/10 p-2 rounded-lg">
                        <Utensils size={16} className="text-green-600" />
                      </div>
                      <h4 className="text-sm font-medium text-foreground">In Your Kitchen:</h4>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Teaspoon:</strong> 5 mL (actually 4.93, but everyone rounds)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Tablespoon:</strong> 15 mL (3 teaspoons, easy math)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Cup:</strong> 240 mL (in practice, though 236.6 is exact)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Stick of butter:</strong> ½ cup = 113.4 grams weight</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-lg border border-blue-500/20">
                  <h4 className="text-sm font-medium text-foreground mb-2">Mental Shortcuts That Work</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-muted-foreground">
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-foreground">Gallons to Liters:</span>
                      <span className="font-mono">Multiply by 4 (close enough)</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-foreground">Cups to Milliliters:</span>
                      <span className="font-mono">Multiply by 240 (easy math)</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-foreground">Fluid Ounces to mL:</span>
                      <span className="font-mono">Multiply by 30 (good estimate)</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-foreground">Quarts to Liters:</span>
                      <span className="font-mono">Almost the same (0.95 L)</span>
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
                    Different cultures measure volume in ways that made sense for their daily lives. Understanding why these systems exist helps you convert between them more intuitively.
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
            {/* Volume Units Explained */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('volumeUnitsExplained')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500/10 p-2 rounded-lg">
                    <Droplets size={20} className="text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Where Volume Measurements Come From</h2>
                </div>
                {openSections.volumeUnitsExplained ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.volumeUnitsExplained && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground mb-4">
                    Volume units didn't appear out of nowhere - they evolved from practical human needs. Understanding their origins makes them less arbitrary and easier to remember.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">The Liter: A Cube of Water</h3>
                      <p className="text-sm text-muted-foreground">
                        The liter was originally defined in 1795 as the volume of one kilogram of water at its maximum density (4°C). Think about that: a cube 10 cm × 10 cm × 10 cm holds exactly one liter of water and weighs exactly one kilogram. That elegant connection between volume and weight only works with water, but it's why the metric system feels so logical.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Today, the liter is defined as exactly 0.001 cubic meters, but the water connection remains useful for intuition. When you picture a liter, imagine a cube slightly smaller than a rubik's cube. That mental image helps estimate volumes without measuring tools.
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Gallons: From Wine to Gasoline</h3>
                      <p className="text-sm text-muted-foreground">
                        The gallon has a messy history. The word comes from Old Northern French "galon" meaning "liquid measure." Different gallons existed for wine, beer, and grain. The US kept the old British wine gallon (231 cubic inches) while Britain switched to a larger imperial gallon in 1824.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Why does this matter today? When you buy fuel in the US, you're using a measurement based on 18th century wine barrels. When you follow a British recipe calling for gallons, you need 20% more liquid than the US version. Historical accidents become modern headaches.
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Cups and Spoons: Kitchen Convenience</h3>
                      <p className="text-sm text-muted-foreground">
                        Cooking measurements developed separately from scientific ones. A "cup" wasn't standardized until Fannie Farmer published The Boston Cooking-School Cook Book in 1896. Before that, cooks used whatever cup was handy. Her insistence on level measurements transformed home baking.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Tablespoons and teaspoons came from actual cutlery. A tablespoon was literally the amount a dining tablespoon would hold. The problem: spoons vary. Modern standardized spoons are smaller than most eating spoons, which explains why grandma's "tablespoon" of vanilla was probably closer to two modern tablespoons.
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Cubic Measurements: Building and Shipping</h3>
                      <p className="text-sm text-muted-foreground">
                        Cubic meters and cubic feet exist because sometimes you need to measure space, not liquid. Construction materials, shipping containers, room volumes - these demand three-dimensional measurements. A cubic meter is a substantial amount: imagine a washing machine box. A cubic foot is about the size of a basketball.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        These units bridge the gap between linear measurements (meters, feet) and volume. If you know a room is 4m × 5m × 2.5m, you can calculate 50 cubic meters. That connection to length measurements makes them useful for planning and estimation.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <h4 className="font-semibold text-foreground mb-2">The Takeaway</h4>
                    <p className="text-sm text-muted-foreground">
                      Each volume unit solves a specific problem: liters for science and international trade, gallons for historical continuity, cups for cooking convenience, cubic units for spatial planning. Rather than memorizing conversion factors, understand what each unit is good for. Then use our converter when you need to translate between these different "languages" of measurement.
                    </p>
                  </div>
                </div>
              )}
            </article>

            {/* Liquid vs Solid Volume */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('liquidVsSolid')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-green-500/10 p-2 rounded-lg">
                    <Droplets size={20} className="text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">The Tricky Difference Between Liquid and Dry Measures</h2>
                </div>
                {openSections.liquidVsSolid ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.liquidVsSolid && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground mb-4">
                    This is where most volume conversion errors happen. Liquid ounces aren't weight ounces. A cup of flour isn't the same as a cup of water. Understanding these differences saves ruined recipes and incorrect calculations.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Fluid Ounces vs Ounces: The Classic Confusion</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        In the US, we use "ounce" for both volume (fluid ounce) and weight (avoirdupois ounce). They're completely different. One fluid ounce of water weighs about one ounce, but that's specific to water at a certain temperature and pressure. Honey is denser - one fluid ounce weighs about 1.5 ounces. Olive oil is lighter - one fluid ounce weighs about 0.9 ounces.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        I've seen recipes fail because someone measured 8 ounces of flour by volume instead of weight. The difference is substantial: 8 fluid ounces of flour is about 1 cup, which weighs around 4.5 ounces. That's almost half what the recipe intended. Always check whether you're dealing with fluid ounces (volume) or ounces (weight).
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">The Flour Problem: Why Volume Fails for Dry Goods</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Flour is the perfect example of why dry volume measurements are problematic. How you fill the cup matters dramatically. Dip the cup into the flour bin and you might get 150 grams. Spoon flour into the cup and level it: 120 grams. Sift flour into the cup: even less. That's a 25% variation from the same "cup."
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Professional bakers weigh ingredients because it's precise. Home cooks use cups because it's convenient. The compromise: use the "spoon and level" method for consistency. And recognize that when a recipe says "1 cup flour," it probably means around 125 grams, though this varies by author and flour type.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">When to Use Which Measurement</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Liquids settle into a consistent volume. One cup of milk is always one cup, assuming you're using a liquid measuring cup (with a spout and space above the line). Dry ingredients need dry measuring cups (those that you level off at the top).
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Some ingredients bridge both worlds. Brown sugar is often measured packed into a cup, while granulated sugar is simply scooped. Chocolate chips are usually just poured into a cup. Each ingredient has its own convention that experienced cooks learn through practice and failed batches.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                      <h4 className="font-semibold text-foreground mb-2">Practical Rule of Thumb</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div>
                          <div className="font-medium text-foreground mb-1">Use Volume For:</div>
                          <ul className="text-muted-foreground space-y-1">
                            <li>• Liquids (milk, water, oil)</li>
                            <li>• Small amounts of powders (baking powder)</li>
                            <li>• Recipes where precision isn't critical</li>
                            <li>• Quick everyday cooking</li>
                          </ul>
                        </div>
                        <div>
                          <div className="font-medium text-foreground mb-1">Use Weight For:</div>
                          <ul className="text-muted-foreground space-y-1">
                            <li>• Baking (especially breads, pastries)</li>
                            <li>• Dry ingredients in large quantities</li>
                            <li>• Professional or precise cooking</li>
                            <li>• Converting between systems accurately</li>
                          </ul>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Our converter handles liquid volume conversions. For dry ingredients, consider that 1 cup of most flours ≈ 125g, 1 cup granulated sugar ≈ 200g, 1 cup brown sugar (packed) ≈ 220g. These approximations work until you can get a kitchen scale.
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
                    <Droplets size={20} className="text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">How Volume Conversion Actually Works</h2>
                </div>
                {openSections.conversionFormula ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.conversionFormula && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground mb-4">
                    Converting between volume units isn't magic - it's consistent math based on defined relationships. Understanding these relationships helps you estimate conversions and spot errors.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">The Liter as the Common Denominator</h3>
                      <p className="text-sm text-muted-foreground">
                        Our converter uses liters as the middle ground. Every unit has a defined relationship to the liter. One gallon = 3.78541 liters. One cup = 0.236588 liters. One cubic meter = 1000 liters. So when you convert 2 gallons to cups, we:
                      </p>
                      <ol className="list-decimal pl-5 text-sm text-muted-foreground space-y-2 mt-2">
                        <li>Convert gallons to liters: 2 gal × 3.78541 = 7.57082 L</li>
                        <li>Convert liters to cups: 7.57082 L ÷ 0.236588 = 32 cups</li>
                        <li>Display the result: 32 cups (which makes sense - 2 gallons should be 32 cups)</li>
                      </ol>
                      <p className="text-sm text-muted-foreground mt-3">
                        This two-step approach ensures accuracy. Even converting between obscure units works because they both have defined liter relationships. The liter becomes the universal translator between volume "languages."
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Why Not Memorize Everything?</h3>
                      <p className="text-sm text-muted-foreground">
                        You could memorize that 1 gallon = 4 quarts = 8 pints = 16 cups = 128 fluid ounces. That works within the US system. But what about liters? Or cubic feet? Maintaining conversion factors between every possible pair becomes overwhelming quickly.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Using liters as the reference point means we only need to know each unit's relationship to liters. That's simpler, more consistent, and mirrors how international standards organizations work. It also minimizes rounding errors in chain conversions.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                      <h4 className="font-semibold text-foreground mb-2">Real Conversion Walkthrough</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Let's trace through converting 5 cups to milliliters:
                      </p>
                      <div className="text-sm font-mono bg-background p-3 rounded border border-border space-y-1">
                        <div>5 cups × 0.236588 L/cup = 1.18294 liters</div>
                        <div>1.18294 L × 1000 mL/L = 1182.94 mL</div>
                        <div>Displayed: 1182.94 mL (rounded to 2 decimals)</div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Notice how we convert to liters first, then to the target unit. This preserves precision through the calculation. If we used a direct cup-to-mL factor (236.588), we'd get the same result, but the liter method scales to any unit combination.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">The Beauty of Metric Simplicity</h3>
                      <p className="text-sm text-muted-foreground">
                        Within the metric system, conversions are beautifully simple: multiply or divide by powers of ten. 1 liter = 1000 milliliters = 0.001 cubic meters. No strange numbers, just decimal movement. This elegance is why most of the world uses metric.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Contrast this with US customary: 1 gallon = 4 quarts = 8 pints = 16 cups = 128 fluid ounces. The factors are 4, 2, 2, 8 - historical artifacts rather than mathematical logic. Our converter handles these quirks so you don't have to.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </article>

            {/* Practical Use Cases */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('practicalUseCases')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-amber-500/10 p-2 rounded-lg">
                    <Droplets size={20} className="text-amber-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">When You'll Actually Need These Conversions</h2>
                </div>
                {openSections.practicalUseCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.practicalUseCases && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground mb-4">
                    Volume conversion isn't academic - it's everyday practical. Different situations call for different approaches. Here's where these conversions matter in real life.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Cooking Across Borders</h3>
                      <p className="text-sm text-muted-foreground">
                        The most common need: following recipes from other countries. European recipes use grams and milliliters. American recipes use cups and tablespoons. Australian recipes might use both. I've cooked from all three, and conversion errors lead to failed dishes.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        My rule: for savory cooking, approximate conversions work. If a soup calls for 1 liter broth and I use 4 cups (946 mL), the 5% difference won't matter. For baking, be precise. That same 5% difference in flour or leavening agents can mean dense cakes or overflowing muffins.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Travel and Fuel</h3>
                      <p className="text-sm text-muted-foreground">
                        Driving in Europe as an American means converting fuel consumption. European cars show liters per 100 km. American drivers think in miles per gallon. The mental math is tricky: 7 L/100km equals about 33.6 mpg. Getting this wrong affects trip planning and fuel budgeting.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        At the pump, you'll see prices in euros per liter but think in dollars per gallon. Quick conversion: multiply euros per liter by 3.8 to get approximate euros per gallon, then convert currency. Doing this in your head while jet-lagged is why our converter exists.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Home Improvement and Gardening</h3>
                      <p className="text-sm text-muted-foreground">
                        Paint cans show coverage in square meters or square feet, but you buy paint in liters or gallons. Calculating how much you need requires volume conversions. Soil and mulch are sold by cubic feet or liters. Pool chemicals specify amounts per 10,000 gallons or cubic meters.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        I've seen people buy twice as much paint as needed because they converted liters to gallons incorrectly. Or worse, not enough, requiring a second trip to the store where the color batch might differ slightly. Accurate conversion saves time, money, and frustration.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Medical and Scientific Applications</h3>
                      <p className="text-sm text-muted-foreground">
                        In healthcare, medication might be dosed in milliliters but measured in teaspoons for administration. That conversion needs to be precise - a teaspoon is 5 mL, not "about a spoonful." Parents giving children's medicine face this daily.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        In laboratories, reagents come with instructions in various units. A protocol might specify 50 µL (microliters) but your pipette shows mL. That's three orders of magnitude difference. Scientific work demands exact conversions, often involving very small or very large volumes.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
                      <h4 className="font-semibold text-foreground mb-2">Developing Volume Intuition</h4>
                      <p className="text-sm text-muted-foreground">
                        With experience, you develop a feel for volumes. You know that a 2-liter bottle is about half a gallon. A cup is about 240 mL. A tablespoon is about 15 mL. This intuition comes from repeated conversion and practical use.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Our converter gives you exact numbers when precision matters, but challenge yourself to estimate first. How close can you get? That practice builds the intuition that makes you faster and more confident in the kitchen, workshop, or laboratory.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </article>

            {/* Accuracy Notes */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('accuracyNotes')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-red-500/10 p-2 rounded-lg">
                    <Droplets size={20} className="text-red-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">How Accurate Do You Really Need to Be?</h2>
                </div>
                {openSections.accuracyNotes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.accuracyNotes && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground mb-4">
                    More precision isn't always better. Knowing when to round and when to be exact separates practical cooking from mathematical exercise. Here's how different applications handle accuracy.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Everyday Cooking: Practical Rounding</h3>
                      <p className="text-sm text-muted-foreground">
                        For most cooking, ±5% accuracy is fine. If a recipe calls for 500 mL broth and you use 2 cups (473 mL), the 5% difference won't be noticeable. Your measuring tools probably aren't that accurate anyway - liquid measuring cups typically have ±10 mL markings.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        The exception: baking powder, baking soda, yeast, and salt in baking. These work in small amounts with big effects. 5 mL baking powder instead of 4.5 mL can affect rising. For these, use precise conversions and proper measuring spoons.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Baking and Pastry: Precision Matters</h3>
                      <p className="text-sm text-muted-foreground">
                        Professional bakers use scales because volume measurements for dry ingredients are inherently imprecise. A "cup" of flour can vary by 20% depending on how it's measured. For delicate pastries, breads, and cakes, that variation affects texture and structure.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        If you must use volume for baking, be consistent. Always use the same method (spoon and level, not dip and sweep). Better yet, invest in a $20 kitchen scale. The improvement in consistency is worth it.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Scientific and Medical: Exact Requirements</h3>
                      <p className="text-sm text-muted-foreground">
                        In laboratories and medicine, conversions must be exact. Medication dosages often convert between milliliters and teaspoons for patient instructions. A teaspoon is exactly 5 mL in medical contexts (though 4.93 mL technically).
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Scientific protocols specify volumes to multiple decimal places because reactions depend on exact proportions. Here, use full precision conversions and verify with calibrated equipment. Don't round unless the protocol specifies rounding rules.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                      <h4 className="font-semibold text-foreground mb-2">Accuracy Guidelines by Application</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div>
                          <div className="font-medium text-foreground mb-1">Round to nearest:</div>
                          <ul className="text-muted-foreground space-y-1">
                            <li>• 10 mL for soups, stews, sauces</li>
                            <li>• ¼ cup for most cooking liquids</li>
                            <li>• Whole cup for large volumes</li>
                            <li>• Nearest teaspoon for casual baking</li>
                          </ul>
                        </div>
                        <div>
                          <div className="font-medium text-foreground mb-1">Be precise to:</div>
                          <ul className="text-muted-foreground space-y-1">
                            <li>• 1 mL for cocktails and pharmacy</li>
                            <li>• 0.1 mL for laboratory work</li>
                            <li>• Exact grams for professional baking</li>
                            <li>• Manufacturer specs for chemicals</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">The Measurement Reality Check</h3>
                      <p className="text-sm text-muted-foreground">
                        Remember that conversion accuracy depends on measurement accuracy. If you measure 1 cup of flour using a $2 plastic cup, converting that to 236.588 mL implies precision that doesn't exist. The cup probably holds anywhere from 220 to 250 mL depending on how you fill it.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        This is why professionals use calibrated equipment. For important work, consider the accuracy of your measuring tools before worrying about conversion precision. A perfectly converted wrong measurement is still wrong.
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
                    <Droplets size={20} className="text-indigo-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Real-World Volume Conversion Scenarios</h2>
                </div>
                {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.examples && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">Common Volume Situations</h3>
                      <div className="overflow-x-auto">
                        <div className="min-w-full inline-block align-middle">
                          <div className="overflow-hidden border border-border rounded-lg">
                            <table className="min-w-full divide-y divide-border">
                              <thead className="bg-secondary/20">
                                <tr>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Situation</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Typical Measurement</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Conversion Needed</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-border">
                                <tr>
                                  <td className="px-4 py-3 text-sm text-foreground">European recipe for American kitchen</td>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">500 mL milk</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">→ 2.1 cups (call it 2 cups + 1 tbsp)</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-foreground">Fuel efficiency comparison</td>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">7 L/100km</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">→ 33.6 mpg (US gallons)</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-foreground">Painting a room</td>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">4 liters of paint</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">→ 1.06 gallons (buy 1 gallon + quart)</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-foreground">Making cocktails</td>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">50 mL spirit</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">→ 1.7 fl oz (standard shot is 1.5 oz)</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-foreground">Filling a fish tank</td>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">200 L tank</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">→ 52.8 gallons (needs water conditioner)</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-foreground">Canning preserves</td>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">8 oz jars</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">→ 237 mL each (standard canning size)</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Weekly International Cooking Challenge</h3>
                      <div className="bg-secondary/20 p-4 rounded-lg border border-border">
                        <p className="text-sm text-muted-foreground mb-3">
                          Imagine cooking dinner every night using recipes from different countries. Here's what you'd convert:
                        </p>
                        
                        <div className="space-y-3 text-sm">
                          <div>
                            <div className="font-medium text-foreground">Monday: Italian pasta sauce</div>
                            <div className="text-muted-foreground ml-3">Recipe says "800 mL crushed tomatoes." Your cans are 14.5 oz (411 mL). Need about 2 cans. Convert: 800 mL = 27 fl oz ≈ 1.9 US cans.</div>
                          </div>
                          
                          <div>
                            <div className="font-medium text-foreground">Tuesday: British scones</div>
                            <div className="text-muted-foreground ml-3">"300 mL milk" → 1¼ cups (300 ÷ 240 = 1.25). "225 g flour" → about 1¾ cups (but better to weigh).</div>
                          </div>
                          
                          <div>
                            <div className="font-medium text-foreground">Wednesday: Indian curry</div>
                            <div className="text-muted-foreground ml-3">"400 mL coconut milk" → about 1⅔ cups. Can sizes: 13.5 fl oz = 400 mL exactly. Perfect.</div>
                          </div>
                          
                          <div>
                            <div className="font-medium text-foreground">Thursday: Mexican rice</div>
                            <div className="text-muted-foreground ml-3">"2 cups chicken broth" → 473 mL. Your bouillon makes 1 liter. Use half, save rest.</div>
                          </div>
                          
                          <div>
                            <div className="font-medium text-foreground">Friday: French vinaigrette</div>
                            <div className="text-muted-foreground ml-3">"80 mL olive oil, 20 mL vinegar" → 80 mL = 5⅓ tbsp, 20 mL = 4 tsp. Precision matters for emulsion.</div>
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mt-3">
                          After a month of this, you'll start thinking in both systems. You'll know that 500 mL is about 2 cups, 250 mL is about 1 cup, and 30 mL is 2 tablespoons. That intuition makes international cooking much smoother.
                        </p>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                      <h4 className="font-semibold text-foreground mb-2">The Learning Process</h4>
                      <p className="text-sm text-muted-foreground">
                        When I started cooking from international recipes, I made mistakes. I once added 2 cups of flour instead of 2 cups worth of grams. The dough was unworkable. Another time, I used 1 US gallon of water in a British recipe calling for 1 imperial gallon - the stock was too concentrated.
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        These mistakes taught me to pay attention to units. Now I glance at a recipe and immediately note what measurement system it uses. That awareness, combined with our converter for precision, means I rarely make conversion errors anymore. The goal isn't perfection on day one - it's developing awareness and using tools when needed.
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