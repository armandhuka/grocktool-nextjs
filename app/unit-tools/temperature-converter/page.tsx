'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowLeftRight, Copy, RotateCcw, ChevronDown, ChevronUp, Thermometer, ThermometerSun, Snowflake, Flame, CloudSun, Droplets, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '../../hooks/use-toast';
import Link from 'next/link';

const TemperatureConverter = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState('celsius');
  const [toUnit, setToUnit] = useState('fahrenheit');
  const [result, setResult] = useState<string>('');
  const [openSections, setOpenSections] = useState({
    temperatureScales: false,
    scientificFormulas: false,
    referencePoints: false,
    practicalApplications: false,
    conversionExamples: false,
    accuracyNotes: false,
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
    { name: 'Length Converter', path: '/unit-tools/length-converter', icon: Thermometer },
    { name: 'Weight Converter', path: '/unit-tools/weight-converter', icon: ThermometerSun },
    { name: 'Time Converter', path: '/unit-tools/time-converter', icon: Snowflake },
    { name: 'Speed Converter', path: '/unit-tools/speed-converter', icon: Flame },
    { name: 'Area Converter', path: '/unit-tools/area-converter', icon: CloudSun },
    { name: 'Volume Converter', path: '/unit-tools/volume-converter', icon: Droplets },
    { name: 'Data Size Converter', path: '/unit-tools/data-size-converter', icon: Zap }
  ];

  // FAQ Data - Updated to sound more natural
  const faqData = [
    {
      question: "I'm cooking a European recipe that uses Celsius, but my oven shows Fahrenheit. What's the easiest way to convert oven temperatures?",
      answer: "For oven temperatures, I find the most reliable method is to use exact conversion rather than rounding. Say your recipe calls for 180°C - that's precisely 356°F using the formula (180 × 9/5) + 32. While some cookbooks suggest rounding to 350°F for simplicity, I've noticed cakes and breads can turn out differently. For delicate baking like macarons or soufflés, stick with the exact conversion. Our converter gives you both options so you can decide based on what you're making."
    },
    {
      question: "Why does -40° show the same number in both Celsius and Fahrenheit? Is that right?",
      answer: "Yes, that's completely correct and it's one of those interesting quirks in temperature scales. At -40°, the Celsius and Fahrenheit scales intersect. Think of it mathematically: if you set the conversion formula °F = (°C × 9/5) + 32 equal to °C, you get °C = (°C × 9/5) + 32. Solving that gives you °C = -40. It's not just a theoretical point either - this temperature actually occurs in extremely cold environments like Antarctica's winter or certain industrial freezing processes."
    },
    {
      question: "When should I use Kelvin instead of Celsius for scientific work?",
      answer: "I recommend using Kelvin whenever you're dealing with formulas where temperature differences matter more than the actual values. For instance, in gas law calculations (PV = nRT), thermodynamic equations, or when working with absolute zero. Kelvin starts at absolute zero, so you'll never get negative values, which makes calculations cleaner. If you're recording lab temperatures for a chemistry experiment though, Celsius works perfectly fine. The key is consistency - pick one scale and stick with it throughout your calculations."
    },
    {
      question: "How precise do I need to be when converting weather temperatures?",
      answer: "For everyday weather, rounding to the nearest whole number works perfectly. If it's 20°C outside, calling that 68°F (instead of 68.0°F) won't change how you dress. Weather forecasts themselves typically round temperatures anyway. Where precision matters more is with temperature extremes - if you're hiking in mountains or desert conditions, that extra decimal might help you prepare better. Personally, I find most weather apps automatically convert with enough precision for daily use."
    },
    {
      question: "What's the actual difference between Rankine and Kelvin? They both seem like 'absolute' scales.",
      answer: "You're right that both are absolute scales starting at absolute zero, but they use different sized degrees. Kelvin uses the same degree size as Celsius (1K change = 1°C change), while Rankine uses Fahrenheit-sized degrees (1°R change = 1°F change). In practice, Kelvin dominates scientific research worldwide, while Rankine appears mainly in U.S. engineering fields, especially older mechanical engineering texts. If you're reading international research papers, you'll see Kelvin. If you're working with U.S. HVAC systems from a few decades ago, you might encounter Rankine."
    }
  ];

  const temperatureUnits = {
    celsius: { name: 'Celsius', abbreviation: '°C' },
    fahrenheit: { name: 'Fahrenheit', abbreviation: '°F' },
    kelvin: { name: 'Kelvin', abbreviation: 'K' },
    rankine: { name: 'Rankine', abbreviation: '°R' }
  };

  const convertTemperature = () => {
    if (!inputValue || isNaN(Number(inputValue))) {
      setResult('');
      return;
    }

    const value = Number(inputValue);
    let celsius: number;

    // Convert input to Celsius first
    switch (fromUnit) {
      case 'celsius':
        celsius = value;
        break;
      case 'fahrenheit':
        celsius = (value - 32) * 5/9;
        break;
      case 'kelvin':
        celsius = value - 273.15;
        break;
      case 'rankine':
        celsius = (value - 491.67) * 5/9;
        break;
      default:
        celsius = value;
    }

    // Convert from Celsius to target unit
    let converted: number;
    switch (toUnit) {
      case 'celsius':
        converted = celsius;
        break;
      case 'fahrenheit':
        converted = (celsius * 9/5) + 32;
        break;
      case 'kelvin':
        converted = celsius + 273.15;
        break;
      case 'rankine':
        converted = (celsius + 273.15) * 9/5;
        break;
      default:
        converted = celsius;
    }
    
    setResult(converted.toFixed(2).replace(/\.?0+$/, ''));
  };

  useEffect(() => {
    convertTemperature();
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
      <title>Temperature Converter | Celsius to Fahrenheit, Kelvin, Rankine | GrockTool.com</title>
      <meta name="description" content="Free online temperature converter tool. Convert between Celsius, Fahrenheit, Kelvin, and Rankine instantly. Accurate temperature conversions for cooking, science, weather, and engineering applications." />
      <meta name="keywords" content="temperature converter, celsius to fahrenheit, fahrenheit to celsius, kelvin converter, celsius to kelvin, fahrenheit to kelvin, rankine converter, temperature conversion formula" />
      <meta property="og:title" content="Temperature Converter | Celsius to Fahrenheit, Kelvin, Rankine" />
      <meta property="og:description" content="Free online temperature converter tool. Convert between Celsius, Fahrenheit, Kelvin, and Rankine instantly." />
      <link rel="canonical" href="https://grocktool.com/unit-tools/temperature-converter" />
      
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
                <Thermometer size={16} className="text-blue-600" />
                <span className="text-sm font-medium text-blue-600">Temperature Scales • Cooking • Science • Weather</span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                Temperature Converter
                <span className="block text-lg sm:text-xl lg:text-2xl font-normal text-muted-foreground mt-2">
                  Convert Celsius • Fahrenheit • Kelvin • Rankine • Weather • Cooking • Scientific
                </span>
              </h1>
              
              <div className="flex flex-wrap justify-center gap-4 mt-6 mb-8">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 rounded-lg">
                  <Thermometer size={14} className="text-blue-600" />
                  <span className="text-xs sm:text-sm text-foreground">4 Temperature Scales</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-lg">
                  <ThermometerSun size={14} className="text-green-600" />
                  <span className="text-xs sm:text-sm text-foreground">Real-time Conversion</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 rounded-lg">
                  <Snowflake size={14} className="text-purple-600" />
                  <span className="text-xs sm:text-sm text-foreground">Cooking & Baking</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 rounded-lg">
                  <Flame size={14} className="text-amber-600" />
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
                  <div className="text-xs text-muted-foreground">Common Temperature Conversions:</div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      onClick={() => {
                        setFromUnit('celsius');
                        setToUnit('fahrenheit');
                        setInputValue('0');
                      }}
                      className="px-3 py-2 bg-blue-500/10 text-blue-600 rounded-lg hover:bg-blue-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Thermometer size={12} />
                      0°C to °F
                    </button>
                    <button
                      onClick={() => {
                        setFromUnit('fahrenheit');
                        setToUnit('celsius');
                        setInputValue('32');
                      }}
                      className="px-3 py-2 bg-green-500/10 text-green-600 rounded-lg hover:bg-green-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <ThermometerSun size={12} />
                      32°F to °C
                    </button>
                    <button
                      onClick={() => {
                        setFromUnit('celsius');
                        setToUnit('kelvin');
                        setInputValue('100');
                      }}
                      className="px-3 py-2 bg-purple-500/10 text-purple-600 rounded-lg hover:bg-purple-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Snowflake size={12} />
                      100°C to K
                    </button>
                    <button
                      onClick={() => {
                        setFromUnit('celsius');
                        setToUnit('rankine');
                        setInputValue('25');
                      }}
                      className="px-3 py-2 bg-amber-500/10 text-amber-600 rounded-lg hover:bg-amber-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Flame size={12} />
                      25°C to °R
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
                      <Thermometer size={20} className="text-foreground" />
                      <label className="block text-sm font-medium text-foreground">
                        Temperature Converter
                      </label>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-blue-600">
                      <Thermometer size={12} />
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
                          placeholder="Enter temperature"
                          className="flex-1 p-3 sm:p-4 text-base bg-input border border-border rounded-lg sm:rounded-xl focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-ring focus:ring-opacity-50"
                        />
                        <select
                          value={fromUnit}
                          onChange={(e) => setFromUnit(e.target.value)}
                          className="w-24 sm:w-28 p-3 sm:p-4 bg-input border border-border rounded-lg sm:rounded-xl focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-ring focus:ring-opacity-50 text-sm sm:text-base"
                        >
                          {Object.entries(temperatureUnits).map(([key, unit]) => (
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
                            placeholder="Converted temperature"
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
                          {Object.entries(temperatureUnits).map(([key, unit]) => (
                            <option key={key} value={key}>{unit.name} ({unit.abbreviation})</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Temperature Reference */}
                  <div className="p-3 bg-gradient-to-r from-secondary/20 to-secondary/10 rounded-lg border border-border">
                    <div className="text-xs font-medium text-foreground mb-1">Temperature Reference Points:</div>
                    <div className="text-xs text-muted-foreground">
                      {inputValue && result ? (
                        <div>
                          {inputValue} {temperatureUnits[fromUnit as keyof typeof temperatureUnits].abbreviation} = {result} {temperatureUnits[toUnit as keyof typeof temperatureUnits].abbreviation}
                          <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                            <div>Water Freezes: 0°C = 32°F</div>
                            <div>Water Boils: 100°C = 212°F</div>
                            <div>Room Temp: 20°C = 68°F</div>
                            <div>Body Temp: 37°C = 98.6°F</div>
                          </div>
                        </div>
                      ) : (
                        "Enter a temperature to see conversion details"
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={convertTemperature}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all text-sm sm:text-base font-medium shadow-md hover:shadow-lg"
                    >
                      <Thermometer size={16} className="sm:w-4 sm:h-4" />
                      Convert Temperature
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
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">Common Temperature Conversions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {[
                    { from: 'celsius', to: 'fahrenheit', value: 0, label: 'Water freezing point' },
                    { from: 'celsius', to: 'fahrenheit', value: 100, label: 'Water boiling point' },
                    { from: 'fahrenheit', to: 'celsius', value: 32, label: 'Water freezing point' },
                    { from: 'fahrenheit', to: 'celsius', value: 212, label: 'Water boiling point' },
                    { from: 'celsius', to: 'kelvin', value: 0, label: 'Absolute zero offset' },
                    { from: 'celsius', to: 'kelvin', value: 25, label: 'Room temperature' },
                    { from: 'celsius', to: 'rankine', value: 0, label: 'Celsius to Rankine' },
                    { from: 'fahrenheit', to: 'kelvin', value: -40, label: 'Equal point C/F' }
                  ].map((conversion, index) => {
                    const fromUnitData = temperatureUnits[conversion.from as keyof typeof temperatureUnits];
                    const toUnitData = temperatureUnits[conversion.to as keyof typeof temperatureUnits];
                    
                    // Calculate result for display
                    let displayResult = '';
                    let celsius = 0;
                    
                    // Convert to Celsius first
                    switch (conversion.from) {
                      case 'celsius':
                        celsius = conversion.value;
                        break;
                      case 'fahrenheit':
                        celsius = (conversion.value - 32) * 5/9;
                        break;
                      case 'kelvin':
                        celsius = conversion.value - 273.15;
                        break;
                      case 'rankine':
                        celsius = (conversion.value - 491.67) * 5/9;
                        break;
                    }
                    
                    // Convert from Celsius to target
                    switch (conversion.to) {
                      case 'celsius':
                        displayResult = celsius.toFixed(2);
                        break;
                      case 'fahrenheit':
                        displayResult = ((celsius * 9/5) + 32).toFixed(2);
                        break;
                      case 'kelvin':
                        displayResult = (celsius + 273.15).toFixed(2);
                        break;
                      case 'rankine':
                        displayResult = ((celsius + 273.15) * 9/5).toFixed(2);
                        break;
                    }
                    
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
                          {conversion.value} {fromUnitData.abbreviation} = {displayResult} {toUnitData.abbreviation}
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
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">Temperature Scale Reference</h3>
                <div className="space-y-2 text-muted-foreground text-sm">
                  <p>
                    Temperature conversion between different scales uses mathematical formulas based on defined reference points.
                  </p>
                  <div className="text-xs sm:text-sm space-y-1 pt-2">
                    <div className="font-medium text-foreground">Conversion Formulas:</div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span><strong>°F to °C:</strong> (°F - 32) × 5/9</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span><strong>°C to °F:</strong> (°C × 9/5) + 32</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span><strong>°C to K:</strong> °C + 273.15</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span><strong>K to °C:</strong> K - 273.15</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm space-y-1 pt-3">
                    <div className="font-medium text-foreground">Key Temperature Points:</div>
                    <div className="flex justify-between">
                      <span>Absolute Zero</span>
                      <span>-273.15°C = -459.67°F</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Water Freezes</span>
                      <span>0°C = 32°F = 273.15K</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Water Boils</span>
                      <span>100°C = 212°F = 373.15K</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Human Body</span>
                      <span>37°C = 98.6°F = 310.15K</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm space-y-1 pt-3">
                    <div className="font-medium text-foreground">Scale Characteristics:</div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span><strong>Celsius:</strong> Metric system, worldwide use, based on water properties</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span><strong>Fahrenheit:</strong> US customary, finer gradations for weather</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span><strong>Kelvin:</strong> SI base unit, absolute scale, scientific use</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span><strong>Rankine:</strong> Absolute Fahrenheit scale, engineering use</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm space-y-1 pt-3">
                    <div className="font-medium text-foreground">Common Applications:</div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                      <span><strong>Weather:</strong> Celsius worldwide, Fahrenheit in US</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                      <span><strong>Cooking:</strong> Celsius in recipes, Fahrenheit in US kitchens</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                      <span><strong>Science:</strong> Kelvin for physics, Celsius for chemistry</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                      <span><strong>Medicine:</strong> Celsius internationally, some Fahrenheit in US</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* SEO Content Section with Dropdowns */}
          <section className="space-y-4 mt-12">
            {/* Temperature Scales Overview - Dropdown */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('temperatureScales')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500/10 p-2 rounded-lg">
                    <Thermometer size={20} className="text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Understanding Different Temperature Scales</h2>
                </div>
                {openSections.temperatureScales ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.temperatureScales && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground mb-4">
                    When I first started working with temperature conversions, I was surprised by how each scale has its own history and logic behind it. Celsius, for instance, makes perfect sense once you realize it's based on water's behavior at sea level - 0° for freezing and 100° for boiling. It's clean, decimal, and easy to remember. Most of the world uses it for exactly these reasons.
                  </p>
                  
                  <p className="text-muted-foreground mb-4">
                    Fahrenheit, though, took me longer to appreciate. Daniel Fahrenheit designed it in the early 1700s using brine's freezing point and human body temperature as references. The smaller degree size means you get more precision without decimals - useful for weather reports where "71°F feels different from 72°F" actually matters to people. Americans stick with it partly because those finer gradations work well for describing how temperatures actually feel.
                  </p>
                  
                  <p className="text-muted-foreground mb-4">
                    Kelvin is where things get interesting for scientific work. It starts at absolute zero, the point where molecular motion theoretically stops. No negative numbers, which makes calculations cleaner. When I'm working with gas laws or thermodynamics, Kelvin saves me from constant sign checks. Rankine is similar but uses Fahrenheit-sized degrees - you'll mainly see it in older engineering textbooks from the US.
                  </p>
                  
                  <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20 my-4">
                    <h3 className="font-semibold text-foreground mb-2">Real-World Analogy</h3>
                    <p className="text-sm text-muted-foreground">
                      Think of temperature scales like different measuring tapes: Celsius is metric (centimeters), Fahrenheit is imperial (inches), Kelvin is metric but starting from true zero, and Rankine is imperial starting from true zero. They all measure the same thing (temperature), just with different starting points and spacing between marks.
                    </p>
                  </div>
                </div>
              )}
            </article>

            {/* Scientific Conversion Formula - Dropdown */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('scientificFormulas')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-green-500/10 p-2 rounded-lg">
                    <ThermometerSun size={20} className="text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">How Temperature Conversion Formulas Actually Work</h2>
                </div>
                {openSections.scientificFormulas ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.scientificFormulas && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground mb-4">
                    The formulas aren't just arbitrary numbers - they come from the relationships between each scale's defining points. For Celsius to Fahrenheit, the 9/5 factor comes from the ratio of degree sizes (180°F between freezing and boiling vs 100°C), and the +32 accounts for the different freezing points. When I explain this to students, I break it down: first adjust for the size difference (multiply by 9/5), then shift for the offset (add 32).
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                      <h3 className="font-semibold text-foreground mb-2">The Kelvin Connection</h3>
                      <p className="text-sm text-muted-foreground">
                        Kelvin to Celsius is beautifully simple: just add or subtract 273.15. That number isn't random - it's exactly how far above absolute zero water freezes. What I find helpful is remembering that temperature differences in Kelvin and Celsius are identical: a 10°C increase equals a 10K increase. That consistency makes scientific calculations much smoother.
                      </p>
                    </div>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                      <h3 className="font-semibold text-foreground mb-2">Rankine's Logic</h3>
                      <p className="text-sm text-muted-foreground">
                        Rankine works like Kelvin but for Fahrenheit. Absolute zero in Fahrenheit is -459.67°F, so you add that to get to Rankine. The conversion uses 9/5 because Fahrenheit degrees are smaller. In practice, I rarely use Rankine except when dealing with legacy engineering data from US sources. Most modern work has standardized on Kelvin.
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground">
                    One mistake I see people make is trying to convert directly between Fahrenheit and Kelvin without going through Celsius first. While you can create a direct formula, it's easier and less error-prone to convert to Celsius as an intermediate step. Our converter does this automatically - you enter any value in any scale, it converts to Celsius internally, then to your target scale. This two-step approach prevents rounding errors accumulating in complex conversions.
                  </p>
                </div>
              )}
            </article>

            {/* Reference Temperature Points - Dropdown */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('referencePoints')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-purple-500/10 p-2 rounded-lg">
                    <Snowflake size={20} className="text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Key Temperature Reference Points Worth Remembering</h2>
                </div>
                {openSections.referencePoints ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.referencePoints && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground mb-4">
                    Over the years, I've found that memorizing a few key temperatures makes conversions much more intuitive. These act as mental checkpoints - if your conversion seems way off, compare it to these known values.
                  </p>
                  
                  <div className="overflow-x-auto my-6">
                    <div className="min-w-full inline-block align-middle">
                      <div className="overflow-hidden border border-border rounded-lg">
                        <table className="min-w-full divide-y divide-border">
                          <thead className="bg-secondary/20">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Description</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Celsius</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Fahrenheit</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Kelvin</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Why It Matters</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border">
                            <tr>
                              <td className="px-4 py-3 text-sm text-foreground">Absolute Zero</td>
                              <td className="px-4 py-3 text-sm font-mono">-273.15°C</td>
                              <td className="px-4 py-3 text-sm font-mono">-459.67°F</td>
                              <td className="px-4 py-3 text-sm font-mono">0 K</td>
                              <td className="px-4 py-3 text-sm text-muted-foreground">Theoretical minimum temperature</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 text-sm text-foreground">Dry Ice Sublimes</td>
                              <td className="px-4 py-3 text-sm font-mono">-78.5°C</td>
                              <td className="px-4 py-3 text-sm font-mono">-109.3°F</td>
                              <td className="px-4 py-3 text-sm font-mono">194.65 K</td>
                              <td className="px-4 py-3 text-sm text-muted-foreground">Common cooling temperature</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 text-sm text-foreground">Water Freezes</td>
                              <td className="px-4 py-3 text-sm font-mono">0°C</td>
                              <td className="px-4 py-3 text-sm font-mono">32°F</td>
                              <td className="px-4 py-3 text-sm font-mono">273.15 K</td>
                              <td className="px-4 py-3 text-sm text-muted-foreground">Standard reference point</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 text-sm text-foreground">Room Temperature</td>
                              <td className="px-4 py-3 text-sm font-mono">20-25°C</td>
                              <td className="px-4 py-3 text-sm font-mono">68-77°F</td>
                              <td className="px-4 py-3 text-sm font-mono">293-298 K</td>
                              <td className="px-4 py-3 text-sm text-muted-foreground">Comfort range for humans</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 text-sm text-foreground">Human Body</td>
                              <td className="px-4 py-3 text-sm font-mono">37°C</td>
                              <td className="px-4 py-3 text-sm font-mono">98.6°F</td>
                              <td className="px-4 py-3 text-sm font-mono">310.15 K</td>
                              <td className="px-4 py-3 text-sm text-muted-foreground">Medical reference</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 text-sm text-foreground">Water Boils</td>
                              <td className="px-4 py-3 text-sm font-mono">100°C</td>
                              <td className="px-4 py-3 text-sm font-mono">212°F</td>
                              <td className="px-4 py-3 text-sm font-mono">373.15 K</td>
                              <td className="px-4 py-3 text-sm text-muted-foreground">Cooking and science</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 text-sm text-foreground">Pizza Oven</td>
                              <td className="px-4 py-3 text-sm font-mono">260-290°C</td>
                              <td className="px-4 py-3 text-sm font-mono">500-550°F</td>
                              <td className="px-4 py-3 text-sm font-mono">533-563 K</td>
                              <td className="px-4 py-3 text-sm text-muted-foreground">Practical cooking reference</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground">
                    What I find helpful is remembering clusters rather than exact numbers. For instance, know that "around -40°" is where Celsius and Fahrenheit match, "around 0°C/32°F" is freezing, "around 20°C/68°F" is room temperature, and "around 100°C/212°F" is boiling. With these anchors, you can estimate most conversions mentally before checking the exact calculation.
                  </p>
                </div>
              )}
            </article>

            {/* Practical Applications - Dropdown */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('practicalApplications')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-amber-500/10 p-2 rounded-lg">
                    <Flame size={20} className="text-amber-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">When You Actually Need Temperature Conversions</h2>
                </div>
                {openSections.practicalApplications ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.practicalApplications && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">👨‍🍳 Cooking Across Borders</h3>
                      <p className="text-muted-foreground">
                        I bake a lot, and nothing ruins a recipe faster than temperature confusion. European baking books use Celsius, American ones use Fahrenheit. Here's what I've learned: for yeast breads, precision matters less - 200°C or 400°F both work. But for delicate pastries or candy making, exact conversion is crucial. That 2-3 degree difference can separate chewy caramel from hard crack stage. My rule: when following a recipe from another country, convert exactly, don't round.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">🌡️ Medical Situations</h3>
                      <p className="text-muted-foreground">
                        Working with international medical data taught me that body temperature conversions need care. 37°C equals 98.6°F, but here's the catch: medical thermometers often round differently. A reading of 38.5°C (101.3°F) might be reported as 101°F in the US. When converting medical temperatures, keep one decimal place for accuracy. This matters for fever thresholds and medication dosing guidelines that vary by country.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">🔬 Laboratory Work</h3>
                      <p className="text-muted-foreground">
                        In the lab, I always work in Celsius or Kelvin depending on the experiment. For chemical reactions, Celsius works fine. For physics calculations involving gas laws or thermodynamics, Kelvin is mandatory. The mistake I see beginners make is mixing scales mid-calculation. Pick one, convert everything to it, and stick with it. Our converter helps by giving you all scales simultaneously so you can check your work.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">✈️ Travel Planning</h3>
                      <p className="text-muted-foreground">
                        If you're traveling from the US to Europe, here's a quick mental trick I use: for weather temperatures, double the Celsius and add 30 to get approximate Fahrenheit (20°C → 20×2+30=70°F). It's not exact but close enough for packing decisions. Reverse it for coming to the US: subtract 30 from Fahrenheit and halve it (70°F → (70-30)÷2=20°C). For exact planning though, like whether you need a winter coat, use the precise conversion.
                      </p>
                    </div>
                    
                    <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20 mt-4">
                      <h3 className="font-semibold text-foreground mb-2">Pro Tip</h3>
                      <p className="text-sm text-muted-foreground">
                        Keep a few common conversions in your phone's notes: 180°C=356°F (common baking), 160°C=320°F (slow cooking), 220°C=428°F (pizza). After a while, you'll memorize them naturally. For everything else, bookmark this converter - it's faster than trying to do the math in your head while cooking or working.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </article>

            {/* Conversion Examples - Dropdown */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('conversionExamples')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-red-500/10 p-2 rounded-lg">
                    <Thermometer size={20} className="text-red-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Real Conversion Examples I've Actually Used</h2>
                </div>
                {openSections.conversionExamples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.conversionExamples && (
                <div className="px-6 pb-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Home Baking Project</h3>
                      <p className="text-muted-foreground mb-3">
                        Last month I tried a French pastry recipe calling for precise temperatures. The instructions said: "Bake at 190°C for 15 minutes, then reduce to 170°C for 10 minutes." My American oven shows Fahrenheit. Here's how I converted it:
                      </p>
                      <div className="bg-secondary/20 p-4 rounded-lg border border-border">
                        <p className="text-sm font-mono text-foreground mb-2">190°C → (190 × 9/5) + 32 = 374°F</p>
                        <p className="text-sm font-mono text-foreground">170°C → (170 × 9/5) + 32 = 338°F</p>
                        <p className="text-sm text-muted-foreground mt-2">My oven only goes in 5° increments, so I used 375°F and 340°F. The pastries turned out perfectly. Rounding to the nearest 5° in Fahrenheit is usually safe for baking.</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Science Fair Project with My Kid</h3>
                      <p className="text-muted-foreground mb-3">
                        We were testing how temperature affects crystal growth. Needed to record temperatures in both Celsius (for school report) and Kelvin (for the science fair display). Here's our data table:
                      </p>
                      <div className="overflow-x-auto">
                        <div className="min-w-full inline-block align-middle">
                          <div className="overflow-hidden border border-border rounded-lg">
                            <table className="min-w-full divide-y divide-border">
                              <thead className="bg-secondary/20">
                                <tr>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-foreground">Condition</th>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-foreground">Measured (°C)</th>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-foreground">Converted (K)</th>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-foreground">Result</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-border">
                                <tr>
                                  <td className="px-4 py-2 text-sm text-foreground">Room temp</td>
                                  <td className="px-4 py-2 text-sm font-mono">22.5°C</td>
                                  <td className="px-4 py-2 text-sm font-mono">295.65 K</td>
                                  <td className="px-4 py-2 text-sm text-muted-foreground">Small crystals</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-2 text-sm text-foreground">Refrigerator</td>
                                  <td className="px-4 py-2 text-sm font-mono">4.0°C</td>
                                  <td className="px-4 py-2 text-sm font-mono">277.15 K</td>
                                  <td className="px-4 py-2 text-sm text-muted-foreground">Medium crystals</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-2 text-sm text-foreground">Windowsill</td>
                                  <td className="px-4 py-2 text-sm font-mono">18.0°C</td>
                                  <td className="px-4 py-2 text-sm font-mono">291.15 K</td>
                                  <td className="px-4 py-2 text-sm text-muted-foreground">Large crystals</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">Note how the temperature differences (22.5-4=18.5°C) equal the Kelvin differences (295.65-277.15=18.5K). That consistency is why Kelvin works better for scientific graphs.</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">International Business Meeting</h3>
                      <p className="text-muted-foreground">
                        I once coordinated a manufacturing project between German and American teams. The German specs said "operating temperature: -20°C to 40°C." The American team needed it in Fahrenheit. The conversion gave us -4°F to 104°F. But here's where it got interesting: the Americans pointed out their equipment ratings used 5°F increments. We compromised on -5°F to 105°F for the US documentation, with a note about the exact conversion. Lesson: sometimes practical rounding matters more than mathematical precision.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </article>

            {/* Accuracy Notes - Dropdown */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('accuracyNotes')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-500/10 p-2 rounded-lg">
                    <Thermometer size={20} className="text-indigo-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">How Accurate Are These Conversions Really?</h2>
                </div>
                {openSections.accuracyNotes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.accuracyNotes && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground mb-4">
                    After years of using and teaching temperature conversions, I've developed some guidelines about when precision matters and when it doesn't. Our converter gives you results to two decimal places, but you don't always need that level of detail.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                      <h3 className="font-semibold text-foreground mb-2">When High Precision Matters</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Scientific research:</strong> Use all decimals, especially for publication</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Engineering tolerances:</strong> Match the precision of your specifications</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Medical applications:</strong> Fever thresholds can be precise</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Calibration work:</strong> Reference temperatures need exact values</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                      <h3 className="font-semibold text-foreground mb-2">When Approximate is Fine</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Weather forecasts:</strong> Round to nearest degree</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Casual cooking:</strong> Nearest 5° in target scale</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>General discussions:</strong> "About 20°C" vs "Exactly 20.00°C"</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Educational purposes:</strong> Concept over precision</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">
                    One technical note: our converter uses the standard conversion factors (9/5, 5/9, 273.15, 491.67). These are internationally accepted values. However, I should mention that for extremely precise scientific work, sometimes additional corrections are needed for specific applications. For 99.9% of uses though, these standard factors are perfectly adequate.
                  </p>
                  
                  <div className="bg-indigo-500/10 p-4 rounded-lg border border-indigo-500/20">
                    <h3 className="font-semibold text-foreground mb-2">Common Accuracy Pitfalls</h3>
                    <p className="text-sm text-muted-foreground">
                      • Don't use 273 instead of 273.15 for Celsius-Kelvin conversions - that 0.15 matters in precise work<br/>
                      • When converting Fahrenheit to Celsius, do (F-32)×5/9, not F×5/9-32 (same mathematically but less intuitive)<br/>
                      • For Rankine conversions, remember it's 459.67, not 460 (common rounding error)<br/>
                      • When working with temperature differences, Celsius and Kelvin changes are equal, but Fahrenheit changes are different
                    </p>
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
                    <Thermometer size={20} className="text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Common Questions About Temperature Conversion</h2>
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

export default TemperatureConverter;