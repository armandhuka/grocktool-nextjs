'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, RotateCcw, Zap, Ruler, History, Copy, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Debounce hook for performance
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const LengthConverter = () => {
  const [fromUnit, setFromUnit] = useState('meters');
  const [toUnit, setToUnit] = useState('feet');
  const [fromValue, setFromValue] = useState('1');
  const [toValue, setToValue] = useState('3.28084');
  const [isSwapping, setIsSwapping] = useState(false);
  const [copied, setCopied] = useState(false);
  const [conversionHistory, setConversionHistory] = useState<Array<{
    from: string;
    to: string;
    value: string;
    result: string;
    timestamp: number;
  }>>([]);
  
  const router = useRouter();
  const debouncedFromValue = useDebounce(fromValue, 300);

  const units = [
    { value: 'kilometers', label: 'Kilometers', symbol: 'km', category: 'metric' },
    { value: 'meters', label: 'Meters', symbol: 'm', category: 'metric' },
    { value: 'centimeters', label: 'Centimeters', symbol: 'cm', category: 'metric' },
    { value: 'millimeters', label: 'Millimeters', symbol: 'mm', category: 'metric' },
    { value: 'miles', label: 'Miles', symbol: 'mi', category: 'imperial' },
    { value: 'yards', label: 'Yards', symbol: 'yd', category: 'imperial' },
    { value: 'feet', label: 'Feet', symbol: 'ft', category: 'imperial' },
    { value: 'inches', label: 'Inches', symbol: 'in', category: 'imperial' }
  ];

  // Conversion factors to meters (base unit)
  const conversionFactors: { [key: string]: number } = {
    kilometers: 1000,
    meters: 1,
    centimeters: 0.01,
    millimeters: 0.001,
    miles: 1609.344,
    yards: 0.9144,
    feet: 0.3048,
    inches: 0.0254
  };

  // Optimized conversion function
  const convert = useCallback((value: string, from: string, to: string): string => {
    if (!value || isNaN(Number(value)) || Number(value) === 0) {
      return '0';
    }

    const numValue = Number(value);
    const fromMeters = numValue * conversionFactors[from];
    const result = fromMeters / conversionFactors[to];
    
    // Smart formatting based on magnitude
    if (Math.abs(result) < 0.0001 || Math.abs(result) > 999999) {
      return result.toExponential(4);
    } else if (Math.abs(result) < 0.01) {
      return result.toFixed(6).replace(/\.?0+$/, '');
    } else if (Math.abs(result) < 1) {
      return result.toFixed(4).replace(/\.?0+$/, '');
    } else if (Math.abs(result) < 100) {
      return result.toFixed(3).replace(/\.?0+$/, '');
    } else {
      return result.toFixed(2).replace(/\.?0+$/, '');
    }
  }, []);

  // Perform conversion when inputs change
  useEffect(() => {
    const result = convert(debouncedFromValue, fromUnit, toUnit);
    setToValue(result);

    // Add to history if valid conversion
    if (debouncedFromValue && !isNaN(Number(debouncedFromValue)) && Number(debouncedFromValue) !== 0) {
      setConversionHistory(prev => [
        {
          from: `${debouncedFromValue} ${getUnitSymbol(fromUnit)}`,
          to: `${result} ${getUnitSymbol(toUnit)}`,
          value: debouncedFromValue,
          result,
          timestamp: Date.now()
        },
        ...prev.slice(0, 4) // Keep only last 5 conversions
      ]);
    }
  }, [debouncedFromValue, fromUnit, toUnit, convert]);

  const handleSwap = async () => {
    setIsSwapping(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setFromValue(toValue);
    
    setTimeout(() => setIsSwapping(false), 100);
  };

  const handleClear = () => {
    setFromValue('1');
    setToValue('3.28084');
    setFromUnit('meters');
    setToUnit('feet');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${toValue} ${getUnitSymbol(toUnit)}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getUnitSymbol = (unit: string) => {
    return units.find(u => u.value === unit)?.symbol || '';
  };

  const getUnitCategory = (unit: string) => {
    return units.find(u => u.value === unit)?.category || 'metric';
  };

  const quickConversions = [
    { from: '1 km', to: '0.621 mi', description: 'Kilometers to Miles' },
    { from: '1 m', to: '3.281 ft', description: 'Meters to Feet' },
    { from: '1 cm', to: '0.394 in', description: 'Centimeters to Inches' },
    { from: '1 mi', to: '1.609 km', description: 'Miles to Kilometers' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 font-inter pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            href="/tool"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors mb-6 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Tools
          </Link>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center text-3xl shadow-lg">
              📏
            </div>
            <div className="flex-1">
              <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
                Length Converter
              </h1>
              <p className="text-slate-600 text-lg">Precise, instant length conversions with beautiful design</p>
            </div>
          </div>
        </motion.div>

        {/* Main Converter */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Converter Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-800">Convert Length</h2>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Zap size={16} className="text-yellow-500" />
                Instant Results
              </div>
            </div>

            <div className="space-y-6">
              {/* From Unit */}
              <div className="bg-slate-50 rounded-2xl p-6">
                <label className="block text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
                  From
                </label>
                <div className="space-y-4">
                  <select
                    value={fromUnit}
                    onChange={(e) => setFromUnit(e.target.value)}
                    className="w-full p-4 bg-white border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-slate-800 font-medium"
                  >
                    {units.map(unit => (
                      <option key={unit.value} value={unit.value}>
                        {unit.label} ({unit.symbol})
                      </option>
                    ))}
                  </select>
                  
                  <div className="relative">
                    <input
                      type="text"
                      value={fromValue}
                      onChange={(e) => setFromValue(e.target.value)}
                      placeholder="Enter value"
                      className="w-full p-4 bg-white border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-3xl font-bold text-slate-800 placeholder-slate-400"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 font-medium">
                      {getUnitSymbol(fromUnit)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center">
                <motion.button
                  onClick={handleSwap}
                  disabled={isSwapping}
                  className={`p-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl ${
                    isSwapping ? 'opacity-50' : ''
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title="Swap units"
                >
                  <motion.div
                    animate={{ rotate: isSwapping ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </motion.div>
                </motion.button>
              </div>

              {/* To Unit */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-100">
                <label className="block text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
                  To
                </label>
                <div className="space-y-4">
                  <select
                    value={toUnit}
                    onChange={(e) => setToUnit(e.target.value)}
                    className="w-full p-4 bg-white border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-slate-800 font-medium"
                  >
                    {units.map(unit => (
                      <option key={unit.value} value={unit.value}>
                        {unit.label} ({unit.symbol})
                      </option>
                    ))}
                  </select>
                  
                  <div className="relative">
                    <input
                      type="text"
                      value={toValue}
                      readOnly
                      className="w-full p-4 bg-white border-2 border-blue-200 rounded-xl text-3xl font-bold text-slate-800 pr-20"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 font-medium">
                      {getUnitSymbol(toUnit)}
                    </div>
                    <button
                      onClick={handleCopy}
                      className="absolute right-20 top-1/2 transform -translate-y-1/2 p-2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <button
                onClick={handleClear}
                className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all duration-200 font-semibold group"
              >
                <RotateCcw size={20} className="group-hover:rotate-180 transition-transform" />
                Reset All
              </button>
            </div>
          </motion.div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Conversions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100"
            >
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Zap size={20} className="text-yellow-500" />
                Quick Conversions
              </h3>
              <div className="space-y-3">
                {quickConversions.map((conv, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors"
                    onClick={() => {
                      setFromValue('1');
                      setFromUnit(conv.from.split(' ')[1] === 'km' ? 'kilometers' : 
                                 conv.from.split(' ')[1] === 'm' ? 'meters' :
                                 conv.from.split(' ')[1] === 'cm' ? 'centimeters' : 'miles');
                      setToUnit(conv.to.split(' ')[1] === 'mi' ? 'miles' :
                               conv.to.split(' ')[1] === 'ft' ? 'feet' :
                               conv.to.split(' ')[1] === 'in' ? 'inches' : 'kilometers');
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-slate-700">{conv.from}</span>
                      <span className="text-slate-400">→</span>
                      <span className="font-semibold text-blue-600">{conv.to}</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">{conv.description}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Conversion History */}
            {conversionHistory.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100"
              >
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <History size={20} className="text-purple-500" />
                  Recent Conversions
                </h3>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  <AnimatePresence>
                    {conversionHistory.map((item, index) => (
                      <motion.div
                        key={item.timestamp}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="p-3 bg-slate-50 rounded-lg"
                      >
                        <div className="flex justify-between items-center text-sm">
                          <span className="font-medium text-slate-700">{item.from}</span>
                          <span className="text-slate-400 mx-2">→</span>
                          <span className="font-semibold text-green-600">{item.result} {getUnitSymbol(toUnit)}</span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {/* Unit Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-6 text-white"
            >
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Ruler size={20} />
                Unit Systems
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Current:</span>
                  <span className="font-semibold">
                    {getUnitCategory(fromUnit) === 'metric' ? 'Metric' : 'Imperial'} →{' '}
                    {getUnitCategory(toUnit) === 'metric' ? 'Metric' : 'Imperial'}
                  </span>
                </div>
                <div className="h-px bg-white/20 my-2"></div>
                <div className="text-white/80">
                  <div className="font-medium mb-1">💡 Tip:</div>
                  <div className="text-xs">
                    {getUnitCategory(fromUnit) !== getUnitCategory(toUnit) 
                      ? 'Converting between measurement systems'
                      : 'Converting within the same system'}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LengthConverter;