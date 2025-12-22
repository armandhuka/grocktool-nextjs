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
    { name: 'Length Converter', path: '/unit-tools/length-converter', icon: Thermometer },
    { name: 'Weight Converter', path: '/unit-tools/weight-converter', icon: ThermometerSun },
    { name: 'Time Converter', path: '/unit-tools/time-converter', icon: Snowflake },
    { name: 'Speed Converter', path: '/unit-tools/speed-converter', icon: Flame },
    { name: 'Area Converter', path: '/unit-tools/area-converter', icon: CloudSun },
    { name: 'Volume Converter', path: '/unit-tools/volume-converter', icon: Droplets },
    { name: 'Data Size Converter', path: '/unit-tools/data-size-converter', icon: Zap }
  ];

  // FAQ Data
  const faqData = [
    {
      question: "What's the difference between Celsius, Fahrenheit, and Kelvin?",
      answer: "Celsius (°C) is based on water's freezing (0°C) and boiling points (100°C) at sea level. Fahrenheit (°F) uses 32°F for freezing and 212°F for boiling. Kelvin (K) is the SI base unit starting at absolute zero (-273.15°C). Celsius and Kelvin have the same increment size (1°C = 1K), while Fahrenheit has smaller increments (1°C = 1.8°F). Kelvin is used in scientific work, Celsius worldwide, and Fahrenheit primarily in the US."
    },
    {
      question: "How do I convert negative temperatures accurately?",
      answer: "Negative temperatures convert using the same formulas: °F to °C: (°F - 32) × 5/9. Example: -40°F = -40°C (the only point where they're equal). For Kelvin, negative Celsius values become positive Kelvin values since absolute zero is 0K. -20°C = 253.15K. Our converter handles negative values correctly for all temperature scales, including Rankine which also starts at absolute zero."
    },
    {
      question: "Which temperature scale should I use for specific applications?",
      answer: "Use Celsius for weather forecasts, cooking, and scientific work worldwide. Use Fahrenheit for US weather reports and cooking temperatures. Use Kelvin for scientific research, physics, and chemistry experiments. Use Rankine for engineering applications in the US. For medical purposes, Celsius is standard internationally, though some US medical devices still use Fahrenheit."
    },
    {
      question: "Why is Kelvin considered an absolute temperature scale?",
      answer: "Kelvin is absolute because it starts at absolute zero (-273.15°C), the theoretical point where molecular motion ceases. Unlike Celsius and Fahrenheit which have arbitrary zero points, Kelvin's zero has physical significance. This makes it ideal for scientific calculations involving gas laws, thermodynamics, and equations where temperature differences matter more than specific values."
    },
    {
      question: "How accurate are temperature conversion calculations?",
      answer: "Our converter uses precise conversion formulas with floating-point arithmetic for accuracy up to 2 decimal places (more if needed). The standard conversions are: °F to °C: (°F - 32) × 5/9, °C to K: °C + 273.15, °C to °R: (°C + 273.15) × 9/5. These formulas provide exact conversions suitable for scientific, engineering, cooking, and everyday temperature measurement needs."
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
            {/* What This Tool Does - Dropdown */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('whatItDoes')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500/10 p-2 rounded-lg">
                    <Thermometer size={20} className="text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Temperature Converter - Features & Applications</h2>
                </div>
                {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.whatItDoes && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground mb-4">
                    This Temperature Converter provides instant, accurate conversions between all major temperature measurement scales. The tool seamlessly converts between Celsius (metric system), Fahrenheit (US customary), Kelvin (SI base unit), and Rankine (engineering scale) using precise scientific formulas. Whether you're checking international weather forecasts, following recipes from different countries, conducting scientific experiments, or working on engineering projects, this converter delivers reliable results with up to 2 decimal place accuracy. It automatically updates conversions in real-time as you type, includes common preset conversions for quick reference, and handles both everyday temperatures (like weather reports) and extreme values (like cryogenic or furnace temperatures). The intuitive interface makes it easy to switch between scales and copy results for documentation or sharing.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Thermometer size={18} className="text-blue-600" />
                        <h3 className="font-semibold text-foreground">Weather & Daily Use</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Convert between Celsius and Fahrenheit for weather forecasts, room temperatures, and everyday climate measurements. Essential for international travel, understanding foreign weather reports, and comparing temperature data from different regions.</p>
                    </div>
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <ThermometerSun size={18} className="text-green-600" />
                        <h3 className="font-semibold text-foreground">Cooking & Baking</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Accurately convert oven temperatures, candy-making stages, and recipe instructions between Celsius and Fahrenheit. Perfect for following international recipes, adjusting cooking temperatures, and ensuring perfect culinary results regardless of your oven's scale.</p>
                    </div>
                    <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Snowflake size={18} className="text-purple-600" />
                        <h3 className="font-semibold text-foreground">Scientific Research</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Handle precise temperature conversions for laboratory work, chemical reactions, physics experiments, and engineering calculations. Includes Kelvin and Rankine scales for absolute temperature measurements required in scientific and technical applications.</p>
                    </div>
                    <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Flame size={18} className="text-amber-600" />
                        <h3 className="font-semibold text-foreground">Engineering & Industry</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Convert between all temperature scales for engineering design, manufacturing processes, materials testing, and industrial applications. Essential for thermodynamics calculations, HVAC system design, and working with international engineering standards.</p>
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
                    <Thermometer size={20} className="text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Temperature Conversion Applications</h2>
                </div>
                {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.useCases && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">🌡️ Medical & Healthcare</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Patient Monitoring:</strong> Convert body temperature readings between Celsius and Fahrenheit for international medical records, compare readings from different thermometer types, and understand temperature norms across measurement systems</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Medical Research:</strong> Convert laboratory temperature data between Kelvin and Celsius for scientific publications, calculate thermodynamic properties for pharmaceutical development, and standardize temperature measurements in clinical trials</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Medical Device Calibration:</strong> Convert calibration temperatures between different scales for thermometers, incubators, and refrigeration units, ensure equipment accuracy across international healthcare settings</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">🔬 Science & Education</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Physics Experiments:</strong> Convert temperature measurements for thermodynamics experiments, gas law calculations using Kelvin scale, and thermal expansion studies requiring precise temperature conversions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Chemistry Laboratory:</strong> Convert reaction temperatures between Celsius and Kelvin for chemical synthesis, calculate activation energies requiring absolute temperature scales, and standardize temperature conditions for reproducibility</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Academic Instruction:</strong> Teach temperature scale relationships, demonstrate conversion formulas in mathematics and science classes, and help students understand international temperature measurement standards</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">🌤️ Weather & Environment</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>International Travel:</strong> Convert weather forecasts between Celsius and Fahrenheit for trip planning, understand local temperature norms in different countries, and pack appropriately for climate conditions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Climate Research:</strong> Convert historical temperature data between different measurement systems, analyze climate trends using standardized temperature scales, and compare global temperature records</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Agriculture Planning:</strong> Convert temperature requirements for crop cultivation between measurement systems, calculate growing degree days using appropriate temperature scales, and plan agricultural activities based on temperature forecasts</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">🏭 Industrial & Manufacturing</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Process Control:</strong> Convert temperature settings for industrial processes between different measurement systems, maintain consistent temperatures in manufacturing using international standards, and calibrate industrial thermometers</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Materials Testing:</strong> Convert temperature specifications for material strength testing, calculate thermal expansion coefficients requiring precise temperature conversions, and test product performance under various temperature conditions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Quality Assurance:</strong> Convert temperature tolerances for product testing between different measurement systems, ensure manufacturing processes meet international temperature standards, and document temperature-controlled storage conditions</span>
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
                    <Thermometer size={20} className="text-amber-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">How to Use Temperature Converter - Complete Guide</h2>
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
                            <div className="font-medium text-foreground">Enter Your Temperature Value</div>
                            <div className="text-sm text-muted-foreground">Type the numerical temperature you want to convert in the "From" field. Enter whole numbers, decimals, or negative values for below-freezing temperatures.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                          <div>
                            <div className="font-medium text-foreground">Select Source Scale</div>
                            <div className="text-sm text-muted-foreground">Choose the current temperature scale from the dropdown menu next to your input. Options include Celsius, Fahrenheit, Kelvin, and Rankine for comprehensive conversion coverage.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                          <div>
                            <div className="font-medium text-foreground">Select Target Scale</div>
                            <div className="text-sm text-muted-foreground">Choose the temperature scale you want to convert to from the "To" dropdown menu. The converter will automatically calculate and display the result in real-time.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">4</div>
                          <div>
                            <div className="font-medium text-foreground">Use Conversion Results</div>
                            <div className="text-sm text-muted-foreground">Copy the converted value using the copy button, or click any preset conversion for instant calculations of common temperature scenarios like cooking or weather conversions.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Pro Conversion Tips</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <div className="bg-blue-500/20 p-1 rounded mt-0.5">
                            <Thermometer size={12} className="text-blue-500" />
                          </div>
                          <span><strong>Quick Estimates:</strong> For approximate °C to °F: double and add 30 (20°C ≈ 20×2+30=70°F). For °F to °C: subtract 30 and halve (70°F ≈ (70-30)÷2=20°C)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-green-500/20 p-1 rounded mt-0.5">
                            <ThermometerSun size={12} className="text-green-500" />
                          </div>
                          <span><strong>Swap Function:</strong> Use the swap button between scales to quickly reverse your conversion direction without re-entering temperature values</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-purple-500/20 p-1 rounded mt-0.5">
                            <Snowflake size={12} className="text-purple-500" />
                          </div>
                          <span><strong>Common Conversions:</strong> Save time by using the preset conversion buttons for frequently needed calculations like oven temperatures or weather conversions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-amber-500/20 p-1 rounded mt-0.5">
                            <Flame size={12} className="text-amber-500" />
                          </div>
                          <span><strong>Precision Control:</strong> Results show up to 2 decimal places. For cooking, round to nearest 5°; for scientific work, use full precision</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-red-500/20 p-1 rounded mt-0.5">
                            <Copy size={12} className="text-red-500" />
                          </div>
                          <span><strong>Documentation Ready:</strong> Use the copy function to save conversion results for recipes, lab reports, engineering specifications, or weather records</span>
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
                    <Thermometer size={20} className="text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Temperature Conversion Examples</h2>
                </div>
                {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.examples && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">Common Temperature Conversion Examples</h3>
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
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">25</td>
                                  <td className="px-4 py-3 text-sm text-foreground">Celsius (°C)</td>
                                  <td className="px-4 py-3 text-sm text-foreground">Fahrenheit (°F)</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">77.00</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Room temperature</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">98.6</td>
                                  <td className="px-4 py-3 text-sm text-foreground">Fahrenheit (°F)</td>
                                  <td className="px-4 py-3 text-sm text-foreground">Celsius (°C)</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">37.00</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Body temperature</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">180</td>
                                  <td className="px-4 py-3 text-sm text-foreground">Celsius (°C)</td>
                                  <td className="px-4 py-3 text-sm text-foreground">Fahrenheit (°F)</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">356.00</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Baking temperature</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">0</td>
                                  <td className="px-4 py-3 text-sm text-foreground">Celsius (°C)</td>
                                  <td className="px-4 py-3 text-sm text-foreground">Kelvin (K)</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">273.15</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Freezing point</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">300</td>
                                  <td className="px-4 py-3 text-sm text-foreground">Kelvin (K)</td>
                                  <td className="px-4 py-3 text-sm text-foreground">Celsius (°C)</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">26.85</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Scientific measurement</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">500</td>
                                  <td className="px-4 py-3 text-sm text-foreground">Rankine (°R)</td>
                                  <td className="px-4 py-3 text-sm text-foreground">Celsius (°C)</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">4.63</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Engineering calculation</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Detailed Example: International Scientific Research Project</h3>
                      <div className="bg-secondary/20 p-4 rounded-lg border border-border overflow-x-auto">
                        <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
{`Example: Temperature conversions for an international materials science research project

Research: Study of material properties at different temperatures
Collaboration: Teams in US (Fahrenheit), Europe (Celsius), and scientific community (Kelvin)

Step 1: Experimental Temperature Ranges
Original plan in Celsius:
• Low temperature tests: -196°C (liquid nitrogen)
• Room temperature tests: 20°C
• Elevated temperature tests: 500°C, 1000°C

Convert to Fahrenheit for US team:
• -196°C to °F: (-196 × 9/5) + 32 = -320.8°F
• 20°C to °F: (20 × 9/5) + 32 = 68°F
• 500°C to °F: (500 × 9/5) + 32 = 932°F
• 1000°C to °F: (1000 × 9/5) + 32 = 1832°F

Convert to Kelvin for scientific publication:
• -196°C to K: -196 + 273.15 = 77.15K
• 20°C to K: 20 + 273.15 = 293.15K
• 500°C to K: 500 + 273.15 = 773.15K
• 1000°C to K: 1000 + 273.15 = 1273.15K

Step 2: Temperature Control Specifications
Laboratory equipment specifications:
• Furnace maximum: 1200°C
  Convert to °F: (1200 × 9/5) + 32 = 2192°F
  Convert to K: 1200 + 273.15 = 1473.15K

• Cryostat minimum: -269°C (4K)
  Convert to °F: (-269 × 9/5) + 32 = -452.2°F
  Convert to K: -269 + 273.15 = 4.15K

• Temperature controller accuracy: ±0.1°C
  Convert to °F tolerance: 0.1°C = 0.18°F
  Convert to K tolerance: 0.1K (same as 0.1°C)

Step 3: Material Phase Transition Temperatures
Material being studied:
• Melting point: 660.32°C (pure aluminum)
  Convert to °F: (660.32 × 9/5) + 32 = 1220.58°F
  Convert to K: 660.32 + 273.15 = 933.47K

• Recrystallization temperature: 200°C
  Convert to °F: (200 × 9/5) + 32 = 392°F
  Convert to K: 200 + 273.15 = 473.15K

• Glass transition: 67°C (for polymer component)
  Convert to °F: (67 × 9/5) + 32 = 152.6°F
  Convert to K: 67 + 273.15 = 340.15K

Step 4: Thermal Expansion Calculations
Coefficient of thermal expansion:
• Material A: 23 × 10⁻⁶/°C
  Convert to /°F: 23 × 10⁻⁶ ÷ 1.8 = 12.78 × 10⁻⁶/°F
  Convert to /K: 23 × 10⁻⁶/K (same as /°C for ΔT)

• Material B: 17 × 10⁻⁶/°F
  Convert to /°C: 17 × 10⁻⁶ × 1.8 = 30.6 × 10⁻⁶/°C
  Convert to /K: 30.6 × 10⁻⁶/K

Step 5: Heat Treatment Protocols
Annealing process:
• Heat to 400°C hold for 1 hour
  US protocol: Heat to 752°F (400 × 9/5 + 32)
• Slow cool to 200°C at 50°C/hour
  US protocol: Cool to 392°F at 90°F/hour (50 × 1.8)

Quenching process:
• Quench from 800°C to 20°C water
  Temperature drop: 780°C
  Convert to °F drop: 780 × 1.8 = 1404°F
  Initial: 800°C = 1472°F
  Final: 20°C = 68°F

Step 6: Data Analysis and Reporting
Experimental results at various temperatures:
• At 25°C: Strength = 250 MPa
  Report as: 25°C (77°F, 298.15K)
• At 100°C: Strength = 220 MPa
  Report as: 100°C (212°F, 373.15K)
• At 300°C: Strength = 180 MPa
  Report as: 300°C (572°F, 573.15K)

Arrhenius plot for activation energy:
• Need 1/T in K⁻¹ for plot
  T = 300°C = 573.15K → 1/T = 0.001745 K⁻¹
  T = 400°C = 673.15K → 1/T = 0.001486 K⁻¹
  T = 500°C = 773.15K → 1/T = 0.001293 K⁻¹

Step 7: International Collaboration
Temperature data sharing format:
• Primary data in Kelvin (scientific standard)
• Supplementary data in Celsius (international)
• Alternative data in Fahrenheit (US colleagues)

Example data point:
  Measurement 1:
    Kelvin: 423.15K
    Celsius: 150.00°C
    Fahrenheit: 302.00°F

Step 8: Equipment Calibration
Calibration points for temperature sensors:
• Triple point of water: 0.01°C = 32.018°F = 273.16K
• Gallium melting point: 29.7646°C = 85.5763°F = 302.9146K
• Indium freezing point: 156.5985°C = 313.8773°F = 429.7485K

Calibration accuracy requirements:
• Required: ±0.5°C
  In °F: ±0.9°F
  In K: ±0.5K

Step 9: Safety Protocols
Temperature safety limits:
• Maximum safe touch temperature: 60°C
  Warning label in US: 140°F
  Warning label in Europe: 60°C
  
• Fire point of materials: 300°C
  US safety protocol: 572°F
  Scientific documentation: 573.15K

• Cryogenic safety: Below -150°C
  US protocol: Below -238°F
  Scientific: Below 123.15K

Step 10: Publication and Documentation
Final paper temperature reporting:
• Abstract: Use Celsius for general audience
• Methods: Use Kelvin for scientific rigor
• Results: Dual scale (Celsius with Kelvin in parentheses)
• Supplementary: Full conversion table

Example table for publication:

| Test Condition | Celsius (°C) | Fahrenheit (°F) | Kelvin (K) |
|----------------|--------------|-----------------|------------|
| Cryogenic      | -196         | -320.8          | 77.15      |
| Room Temp      | 20           | 68.0            | 293.15     |
| Intermediate   | 300          | 572.0           | 573.15     |
| High Temp      | 1000         | 1832.0          | 1273.15    |

Conclusion:
Using accurate temperature conversions ensures consistent experimental conditions across international research teams, proper equipment calibration, correct data analysis, and clear scientific communication. The temperature converter provides the precision needed for professional scientific research while maintaining accessibility for educational and practical applications.`}
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
                    <Thermometer size={20} className="text-blue-600" />
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

export default TemperatureConverter;