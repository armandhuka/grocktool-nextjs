'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowLeftRight, Copy, RotateCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '../../hooks/use-toast';
import Link from 'next/link';

const TemperatureConverter = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState('celsius');
  const [toUnit, setToUnit] = useState('fahrenheit');
  const [result, setResult] = useState<string>('');
  const { toast } = useToast();

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
      <div className="pt-20 pb-8 px-4 sm:pt-24 sm:pb-12 sm:px-6 lg:pt-28">
        <div className="max-w-lg mx-auto lg:max-w-2xl">
          {/* Header - Adjusted spacing */}
          <div className="mb-8 sm:mb-10">
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
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                Temperature Converter
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Convert between temperature units easily
              </p>
            </motion.div>
          </div>

          {/* Main Converter Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 mb-6 shadow-sm"
          >
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
                      <option key={key} value={key}>{unit.abbreviation}</option>
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
                    {Object.entries(temperatureUnits).map(([key, unit]) => (
                      <option key={key} value={key}>{unit.abbreviation}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-border">
              <button
                onClick={clearAll}
                className="flex-1 flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-secondary text-secondary-foreground rounded-lg sm:rounded-xl hover:bg-secondary/80 transition-colors text-sm sm:text-base"
              >
                <RotateCcw size={16} className="sm:w-4 sm:h-4" />
                Clear All
              </button>
            </div>
          </motion.div>

          {/* Quick Conversions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 mb-6 shadow-sm"
          >
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">Common Conversions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {[
                { from: 'celsius', to: 'fahrenheit', value: 0 },
                { from: 'fahrenheit', to: 'celsius', value: 32 },
                { from: 'celsius', to: 'kelvin', value: 0 },
                { from: 'kelvin', to: 'celsius', value: 273.15 },
                { from: 'celsius', to: 'rankine', value: 0 },
                { from: 'fahrenheit', to: 'kelvin', value: 32 }
              ].map((conversion, index) => {
                const fromUnitData = temperatureUnits[conversion.from as keyof typeof temperatureUnits];
                const toUnitData = temperatureUnits[conversion.to as keyof typeof temperatureUnits];
                
                // Calculate result for display
                let displayResult = '';
                switch (conversion.from) {
                  case 'celsius':
                    if (conversion.to === 'fahrenheit') displayResult = '32';
                    else if (conversion.to === 'kelvin') displayResult = '273.15';
                    else if (conversion.to === 'rankine') displayResult = '491.67';
                    break;
                  case 'fahrenheit':
                    if (conversion.to === 'celsius') displayResult = '0';
                    else if (conversion.to === 'kelvin') displayResult = '273.15';
                    break;
                  case 'kelvin':
                    if (conversion.to === 'celsius') displayResult = '0';
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
                    className="p-2 sm:p-3 bg-secondary text-left rounded-lg hover:bg-secondary/80 transition-colors text-xs sm:text-sm"
                  >
                    <div className="text-foreground font-medium">
                      {conversion.value} {fromUnitData.abbreviation} = {displayResult} {toUnitData.abbreviation}
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
          >
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">Temperature Conversion</h3>
            <div className="space-y-2 text-muted-foreground text-sm">
              <p>
                Convert between different temperature scales using standard conversion formulas.
                Celsius is used as the intermediate unit for all conversions.
              </p>
              <div className="text-xs sm:text-sm space-y-1 pt-2">
                <div className="flex justify-between">
                  <span>0°C =</span>
                  <span>32°F</span>
                </div>
                <div className="flex justify-between">
                  <span>100°C =</span>
                  <span>212°F</span>
                </div>
                <div className="flex justify-between">
                  <span>0°C =</span>
                  <span>273.15K</span>
                </div>
                <div className="flex justify-between">
                  <span>0°C =</span>
                  <span>491.67°R</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TemperatureConverter;