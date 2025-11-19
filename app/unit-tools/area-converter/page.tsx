'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowLeftRight, Copy, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '../../hooks/use-toast';

const AreaConverter = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState('sqmeter');
  const [toUnit, setToUnit] = useState('sqfeet');
  const [result, setResult] = useState<string>('');
  const { toast } = useToast();

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
                Area Converter
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Convert between area units easily
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
                    placeholder="Enter area"
                    className="flex-1 p-3 sm:p-4 text-base bg-input border border-border rounded-lg sm:rounded-xl focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-ring focus:ring-opacity-50"
                  />
                  <select
                    value={fromUnit}
                    onChange={(e) => setFromUnit(e.target.value)}
                    className="w-24 sm:w-28 p-3 sm:p-4 bg-input border border-border rounded-lg sm:rounded-xl focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-ring focus:ring-opacity-50 text-sm sm:text-base"
                  >
                    {Object.entries(areaUnits).map(([key, unit]) => (
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
                    {Object.entries(areaUnits).map(([key, unit]) => (
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
                { from: 'sqmeter', to: 'sqfeet', value: 1 },
                { from: 'sqfeet', to: 'sqmeter', value: 100 },
                { from: 'acre', to: 'sqmeter', value: 1 },
                { from: 'hectare', to: 'acre', value: 1 },
                { from: 'sqmeter', to: 'sqyard', value: 1 },
                { from: 'sqkilometer', to: 'hectare', value: 1 }
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
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">Area Conversion</h3>
            <div className="space-y-2 text-muted-foreground text-sm">
              <p>
                Convert between different area units using standard conversion factors.
                Square meters are used as the base unit for all calculations.
              </p>
              <div className="text-xs sm:text-sm space-y-1 pt-2">
                <div className="flex justify-between">
                  <span>1 m² =</span>
                  <span>10.7639 ft²</span>
                </div>
                <div className="flex justify-between">
                  <span>1 acre =</span>
                  <span>4046.86 m²</span>
                </div>
                <div className="flex justify-between">
                  <span>1 hectare =</span>
                  <span>2.47105 acres</span>
                </div>
                <div className="flex justify-between">
                  <span>1 km² =</span>
                  <span>100 hectares</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AreaConverter;