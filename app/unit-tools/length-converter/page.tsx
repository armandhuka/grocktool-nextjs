'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowLeftRight, Copy, RotateCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const LengthConverter = () => {
  const [fromUnit, setFromUnit] = useState('meters');
  const [toUnit, setToUnit] = useState('feet');
  const [fromValue, setFromValue] = useState('1');
  const [toValue, setToValue] = useState('3.28084');
  const router = useRouter();

  const units = [
    { value: 'kilometers', label: 'Kilometers (km)', symbol: 'km' },
    { value: 'meters', label: 'Meters (m)', symbol: 'm' },
    { value: 'centimeters', label: 'Centimeters (cm)', symbol: 'cm' },
    { value: 'millimeters', label: 'Millimeters (mm)', symbol: 'mm' },
    { value: 'miles', label: 'Miles (mi)', symbol: 'mi' },
    { value: 'yards', label: 'Yards (yd)', symbol: 'yd' },
    { value: 'feet', label: 'Feet (ft)', symbol: 'ft' },
    { value: 'inches', label: 'Inches (in)', symbol: 'in' }
  ];

  // Conversion factors to meters
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

  useEffect(() => {
    convert();
  }, [fromValue, fromUnit, toUnit]);

  const convert = () => {
    if (!fromValue || isNaN(Number(fromValue))) {
      setToValue('');
      return;
    }

    const fromMeters = Number(fromValue) * conversionFactors[fromUnit];
    const result = fromMeters / conversionFactors[toUnit];
    
    // Format result based on magnitude
    if (result < 0.0001 || result > 999999) {
      setToValue(result.toExponential(4));
    } else if (result < 0.01) {
      setToValue(result.toFixed(6));
    } else if (result < 1) {
      setToValue(result.toFixed(4));
    } else if (result < 100) {
      setToValue(result.toFixed(3));
    } else {
      setToValue(result.toFixed(2));
    }
  };

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setFromValue(toValue);
  };

  const handleClear = () => {
    setFromValue('1');
    setToValue('3.28084');
    setFromUnit('meters');
    setToUnit('feet');
  };

  const handleBack = () => {
    router.push('/tool');
  };

  const getUnitSymbol = (unit: string) => {
    return units.find(u => u.value === unit)?.symbol || '';
  };

  return (
    <div className="min-h-screen bg-toolnest-bg font-inter pt-20">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            href="/tool"
            className="flex items-center gap-2 text-toolnest-text/70 hover:text-toolnest-text transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            Back to Tools
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl">
              📏
            </div>
            <div>
              <h1 className="text-4xl font-bold text-toolnest-text">Length Converter</h1>
              <p className="text-toolnest-text/70">Convert between different length units</p>
            </div>
          </div>
        </motion.div>

        {/* Converter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-8 shadow-lg"
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* From Unit */}
            <div>
              <label className="block text-sm font-medium text-toolnest-text/70 mb-2">
                From
              </label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full p-3 border-2 border-toolnest-accent rounded-xl focus:border-toolnest-text outline-none bg-white text-toolnest-text"
              >
                {units.map(unit => (
                  <option key={unit.value} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </select>
              
              <div className="mt-4">
                <input
                  type="number"
                  value={fromValue}
                  onChange={(e) => setFromValue(e.target.value)}
                  placeholder="Enter value"
                  className="w-full p-3 border-2 border-toolnest-accent rounded-xl focus:border-toolnest-text outline-none text-toolnest-text text-2xl font-semibold"
                />
                <div className="text-sm text-toolnest-text/50 mt-1">
                  {getUnitSymbol(fromUnit)}
                </div>
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex items-center justify-center">
              <motion.button
                onClick={handleSwap}
                className="p-3 bg-toolnest-accent hover:bg-toolnest-accent/80 rounded-full transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Swap units"
              >
                <svg className="w-6 h-6 text-toolnest-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </motion.button>
            </div>

            {/* To Unit */}
            <div>
              <label className="block text-sm font-medium text-toolnest-text/70 mb-2">
                To
              </label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full p-3 border-2 border-toolnest-accent rounded-xl focus:border-toolnest-text outline-none bg-white text-toolnest-text"
              >
                {units.map(unit => (
                  <option key={unit.value} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </select>
              
              <div className="mt-4">
                <input
                  type="text"
                  value={toValue}
                  readOnly
                  className="w-full p-3 border-2 border-toolnest-accent rounded-xl bg-gray-50 text-toolnest-text text-2xl font-semibold"
                />
                <div className="text-sm text-toolnest-text/50 mt-1">
                  {getUnitSymbol(toUnit)}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center mt-8">
            <button
              onClick={handleClear}
              className="px-6 py-3 bg-toolnest-accent hover:bg-toolnest-accent/80 text-toolnest-text rounded-xl transition-colors flex items-center gap-2"
            >
              <RotateCcw size={20} />
              Reset
            </button>
          </div>
        </motion.div>

        {/* Common Conversions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-toolnest-text mb-4">Common Conversions</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-toolnest-text/70">1 km =</span>
                <span className="font-medium text-toolnest-text">0.621 mi</span>
              </div>
              <div className="flex justify-between">
                <span className="text-toolnest-text/70">1 m =</span>
                <span className="font-medium text-toolnest-text">3.281 ft</span>
              </div>
              <div className="flex justify-between">
                <span className="text-toolnest-text/70">1 ft =</span>
                <span className="font-medium text-toolnest-text">12 in</span>
              </div>
              <div className="flex justify-between">
                <span className="text-toolnest-text/70">1 yd =</span>
                <span className="font-medium text-toolnest-text">3 ft</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-toolnest-text mb-4">Tips</h3>
            <ul className="text-sm text-toolnest-text/70 space-y-2">
              <li>• Use metric units for scientific work</li>
              <li>• Imperial units are common in the US</li>
              <li>• 1 inch = 2.54 cm exactly</li>
              <li>• 1 mile = 1.609 km</li>
            </ul>
          </div>

          <div className="bg-blue-50 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">💡 Quick Facts</h3>
            <ul className="text-blue-700 text-sm space-y-2">
              <li>• The meter is the base unit of length in SI</li>
              <li>• 1 light year ≈ 9.46 trillion km</li>
              <li>• Human hair is about 0.1 mm thick</li>
              <li>• Earth's circumference is about 40,075 km</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LengthConverter;
