'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowLeftRight, Copy, RotateCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '../../hooks/use-toast';
import Link from 'next/link';

const SpeedConverter = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState('kmh');
  const [toUnit, setToUnit] = useState('mph');
  const [result, setResult] = useState<string>('');
  const { toast } = useToast();

  const speedUnits = {
    kmh: { name: 'km/h', abbreviation: 'km/h', factor: 1 },
    mph: { name: 'mph', abbreviation: 'mph', factor: 0.621371 },
    ms: { name: 'm/s', abbreviation: 'm/s', factor: 0.277778 },
    fts: { name: 'ft/s', abbreviation: 'ft/s', factor: 0.911344 },
    knots: { name: 'knots', abbreviation: 'kn', factor: 0.539957 },
    mach: { name: 'Mach', abbreviation: 'Ma', factor: 0.000817661 }
  };

  const convertSpeed = () => {
    if (!inputValue || isNaN(Number(inputValue))) {
      setResult('');
      return;
    }

    const value = Number(inputValue);
    const fromFactor = speedUnits[fromUnit as keyof typeof speedUnits].factor;
    const toFactor = speedUnits[toUnit as keyof typeof speedUnits].factor;
    
    const kmh = value / fromFactor;
    const converted = kmh * toFactor;
    
    setResult(converted.toFixed(6).replace(/\.?0+$/, ''));
  };

  useEffect(() => {
    convertSpeed();
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
                Speed Converter
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Convert between speed units easily
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
                    placeholder="Enter speed"
                    className="flex-1 p-3 sm:p-4 text-base bg-input border border-border rounded-lg sm:rounded-xl focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-ring focus:ring-opacity-50"
                  />
                  <select
                    value={fromUnit}
                    onChange={(e) => setFromUnit(e.target.value)}
                    className="w-24 sm:w-28 p-3 sm:p-4 bg-input border border-border rounded-lg sm:rounded-xl focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-ring focus:ring-opacity-50 text-sm sm:text-base"
                  >
                    {Object.entries(speedUnits).map(([key, unit]) => (
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
                    {Object.entries(speedUnits).map(([key, unit]) => (
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
                { from: 'kmh', to: 'mph', value: 100 },
                { from: 'mph', to: 'kmh', value: 60 },
                { from: 'ms', to: 'kmh', value: 10 },
                { from: 'knots', to: 'kmh', value: 1 },
                { from: 'kmh', to: 'ms', value: 36 },
                { from: 'mph', to: 'fts', value: 60 }
              ].map((conversion, index) => {
                const fromUnitData = speedUnits[conversion.from as keyof typeof speedUnits];
                const toUnitData = speedUnits[conversion.to as keyof typeof speedUnits];
                const fromFactor = fromUnitData.factor;
                const toFactor = toUnitData.factor;
                const kmh = conversion.value / fromFactor;
                const result = (kmh * toFactor).toFixed(2);
                
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
                      {conversion.value} {fromUnitData.abbreviation} = {result} {toUnitData.abbreviation}
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
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">Speed Conversion</h3>
            <div className="space-y-2 text-muted-foreground text-sm">
              <p>
                Convert between different speed units using standard conversion factors.
                Kilometers per hour (km/h) is used as the base unit for calculations.
              </p>
              <div className="text-xs sm:text-sm space-y-1 pt-2">
                <div className="flex justify-between">
                  <span>100 km/h =</span>
                  <span>62.14 mph</span>
                </div>
                <div className="flex justify-between">
                  <span>1 m/s =</span>
                  <span>3.6 km/h</span>
                </div>
                <div className="flex justify-between">
                  <span>1 knot =</span>
                  <span>1.852 km/h</span>
                </div>
                <div className="flex justify-between">
                  <span>Mach 1 =</span>
                  <span>1234.8 km/h</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SpeedConverter;