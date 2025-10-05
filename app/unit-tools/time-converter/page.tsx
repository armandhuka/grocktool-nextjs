'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowLeftRight, Copy, RotateCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '../../hooks/use-toast';
import Link from 'next/link';

const TimeConverter = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState('seconds');
  const [toUnit, setToUnit] = useState('minutes');
  const [result, setResult] = useState<string>('');
  const { toast } = useToast();

  const timeUnits = {
    seconds: { name: 'Seconds (s)', factor: 1 },
    minutes: { name: 'Minutes (min)', factor: 60 },
    hours: { name: 'Hours (h)', factor: 3600 },
    days: { name: 'Days (d)', factor: 86400 },
    weeks: { name: 'Weeks (w)', factor: 604800 },
    months: { name: 'Months (mo)', factor: 2629746 },
    years: { name: 'Years (y)', factor: 31556952 }
  };



  const convertTime = () => {
    if (!inputValue || isNaN(Number(inputValue))) {
      setResult('');
      return;
    }

    const value = Number(inputValue);
    const fromFactor = timeUnits[fromUnit as keyof typeof timeUnits].factor;
    const toFactor = timeUnits[toUnit as keyof typeof timeUnits].factor;
    
    const seconds = value * fromFactor;
    const converted = seconds / toFactor;
    
    setResult(converted.toFixed(8).replace(/\.?0+$/, ''));
  };

  useEffect(() => {
    convertTime();
  }, [inputValue, fromUnit, toUnit]);

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
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
    <div className="min-h-screen bg-toolnest-bg font-inter">
      <div className="pt-32 pb-20 px-4">
        <div className="toolnest-container max-w-4xl mx-auto">
          <Link
            href="/tool"
            className="inline-flex items-center gap-2 text-toolnest-text/70 hover:text-toolnest-text mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Tools
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-toolnest-text mb-4">
              Time Converter
            </h1>
            <p className="text-xl text-toolnest-text/70 max-w-2xl mx-auto">
              Convert between different time units including seconds, minutes, hours, days and more
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl shadow-xl p-8 mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
              {/* From Section */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-toolnest-text">From</label>
                <select
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                  className="w-full p-3 border border-toolnest-accent/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-toolnest-text/20"
                >
                  {Object.entries(timeUnits).map(([key, unit]) => (
                    <option key={key} value={key}>{unit.name}</option>
                  ))}
                </select>
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter value"
                  className="w-full p-4 text-xl border border-toolnest-accent/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-toolnest-text/20"
                />
              </div>

              {/* Swap Button */}
              <div className="flex justify-center md:justify-start">
                <button
                  onClick={swapUnits}
                  className="p-3 bg-toolnest-accent/20 hover:bg-toolnest-accent/30 rounded-xl transition-colors duration-200"
                >
                  <ArrowLeftRight className="w-6 h-6 text-toolnest-text" />
                </button>
              </div>

              {/* To Section */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-toolnest-text">To</label>
                <select
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                  className="w-full p-3 border border-toolnest-accent/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-toolnest-text/20"
                >
                  {Object.entries(timeUnits).map(([key, unit]) => (
                    <option key={key} value={key}>{unit.name}</option>
                  ))}
                </select>
                <div className="relative">
                  <input
                    type="text"
                    value={result}
                    readOnly
                    placeholder="Result"
                    className="w-full p-4 text-xl bg-gray-50 border border-toolnest-accent/30 rounded-xl focus:outline-none"
                  />
                  {result && (
                    <button
                      onClick={copyResult}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                    >
                      <Copy className="w-5 h-5 text-toolnest-text" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={clearAll}
                className="flex items-center gap-2 px-6 py-3 bg-toolnest-accent/20 hover:bg-toolnest-accent/30 text-toolnest-text rounded-xl transition-colors duration-200"
              >
                <RotateCcw className="w-5 h-5" />
                Clear
              </button>
            </div>
          </motion.div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-3xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-toolnest-text mb-4">How This Tool Works</h2>
            <p className="text-toolnest-text/70 leading-relaxed">
              This time converter uses standard time conversion factors to convert between different units of time. 
              All conversions are calculated through seconds as the base unit for accuracy. The tool supports 
              various time units from seconds to years, making it useful for various calculations and projects.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TimeConverter;
