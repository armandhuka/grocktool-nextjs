'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Calculator, RotateCcw, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function BMICalculator() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [result, setResult] = useState<{ bmi: number; category: string; color: string } | null>(null);

  // Height unit options
  const heightUnits = [
    { value: 'cm', label: 'cm' },
    { value: 'm', label: 'm' },
    { value: 'ft', label: 'feet' },
    { value: 'in', label: 'inches' }
  ];

  // Weight unit options
  const weightUnits = [
    { value: 'kg', label: 'kg' },
    { value: 'lbs', label: 'lbs' },
    { value: 'st', label: 'stone' }
  ];

  // Convert height to meters
  const convertHeightToMeters = (value: number, unit: string): number => {
    switch (unit) {
      case 'cm':
        return value / 100;
      case 'm':
        return value;
      case 'ft':
        return value * 0.3048;
      case 'in':
        return value * 0.0254;
      default:
        return value;
    }
  };

  // Convert weight to kilograms
  const convertWeightToKg = (value: number, unit: string): number => {
    switch (unit) {
      case 'kg':
        return value;
      case 'lbs':
        return value * 0.453592;
      case 'st':
        return value * 6.35029;
      default:
        return value;
    }
  };

  const calculateBMI = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    
    if (!h || !w) return;
    
    // Convert all inputs to metric units
    const heightInMeters = convertHeightToMeters(h, heightUnit);
    const weightInKg = convertWeightToKg(w, weightUnit);
    
    // Calculate BMI using metric formula
    const bmi = weightInKg / (heightInMeters * heightInMeters);
    
    let category = '';
    let color = '';
    
    if (bmi < 18.5) {
      category = 'Underweight';
      color = 'text-blue-600';
    } else if (bmi < 25) {
      category = 'Normal weight';
      color = 'text-green-600';
    } else if (bmi < 30) {
      category = 'Overweight';
      color = 'text-yellow-600';
    } else {
      category = 'Obese';
      color = 'text-red-600';
    }
    
    setResult({ bmi: Math.round(bmi * 10) / 10, category, color });
  };

  const reset = () => {
    setHeight('');
    setWeight('');
    setHeightUnit('cm');
    setWeightUnit('kg');
    setResult(null);
  };

  // Get conversion formula for display
  const getConversionFormula = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    
    if (!h || !w) return '';
    
    const heightInMeters = convertHeightToMeters(h, heightUnit);
    const weightInKg = convertWeightToKg(w, weightUnit);
    
    return `Height: ${h} ${heightUnit} → ${heightInMeters.toFixed(4)} m | Weight: ${w} ${weightUnit} → ${weightInKg.toFixed(4)} kg | BMI = ${weightInKg.toFixed(4)} / (${heightInMeters.toFixed(4)})² = ${result?.bmi}`;
  };

  return (
    <div className="min-h-screen bg-background font-inter">
      <div className="pt-20 pb-8 px-4 sm:pt-24 sm:pb-12 sm:px-6 lg:pt-28">
        <div className="max-w-lg mx-auto lg:max-w-2xl">
          {/* Header */}
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
                BMI Calculator
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Calculate BMI with any measurement units
              </p>
            </motion.div>
          </div>

          {/* Main Tool Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 mb-6 shadow-sm"
          >
            <div className="space-y-6">
              {/* Input Fields with Unit Selection */}
              <div className="grid grid-cols-1 gap-4">
                {/* Height Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">
                    Height
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder="Enter height"
                      className="flex-1 p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg"
                      step="any"
                      min="0"
                    />
                    <select
                      value={heightUnit}
                      onChange={(e) => setHeightUnit(e.target.value)}
                      className="w-24 p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center"
                    >
                      {heightUnits.map((unit) => (
                        <option key={unit.value} value={unit.value}>
                          {unit.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-wrap gap-1 text-xs text-muted-foreground">
                    <span>Common heights:</span>
                    <button 
                      onClick={() => { setHeight('170'); setHeightUnit('cm'); }}
                      className="hover:text-foreground transition-colors"
                    >
                      170cm
                    </button>
                    <span>•</span>
                    <button 
                      onClick={() => { setHeight('5.7'); setHeightUnit('ft'); }}
                      className="hover:text-foreground transition-colors"
                    >
                      5'7"
                    </button>
                    <span>•</span>
                    <button 
                      onClick={() => { setHeight('68'); setHeightUnit('in'); }}
                      className="hover:text-foreground transition-colors"
                    >
                      68in
                    </button>
                  </div>
                </div>

                {/* Weight Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">
                    Weight
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="Enter weight"
                      className="flex-1 p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg"
                      step="any"
                      min="0"
                    />
                    <select
                      value={weightUnit}
                      onChange={(e) => setWeightUnit(e.target.value)}
                      className="w-24 p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center"
                    >
                      {weightUnits.map((unit) => (
                        <option key={unit.value} value={unit.value}>
                          {unit.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-wrap gap-1 text-xs text-muted-foreground">
                    <span>Common weights:</span>
                    <button 
                      onClick={() => { setWeight('65'); setWeightUnit('kg'); }}
                      className="hover:text-foreground transition-colors"
                    >
                      65kg
                    </button>
                    <span>•</span>
                    <button 
                      onClick={() => { setWeight('150'); setWeightUnit('lbs'); }}
                      className="hover:text-foreground transition-colors"
                    >
                      150lbs
                    </button>
                    <span>•</span>
                    <button 
                      onClick={() => { setWeight('10'); setWeightUnit('st'); }}
                      className="hover:text-foreground transition-colors"
                    >
                      10st
                    </button>
                  </div>
                </div>
              </div>

              {/* Unit Conversion Info */}
              <div className="bg-muted p-3 rounded-lg">
                <div className="text-sm text-foreground font-medium mb-1">Supported Units:</div>
                <div className="text-xs text-muted-foreground grid grid-cols-2 gap-1">
                  <div><strong>Height:</strong> cm, m, feet, inches</div>
                  <div><strong>Weight:</strong> kg, lbs, stone</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={calculateBMI}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent text-accent-foreground rounded-lg sm:rounded-xl hover:bg-accent/80 transition-colors text-sm sm:text-base"
                >
                  <Calculator size={16} className="sm:w-4 sm:h-4" />
                  Calculate BMI
                </button>
                <button
                  onClick={reset}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg sm:rounded-xl hover:bg-secondary/80 transition-colors text-sm sm:text-base"
                >
                  <RotateCcw size={16} className="sm:w-4 sm:h-4" />
                  Clear All
                </button>
              </div>
            </div>
          </motion.div>

          {/* Results Card */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 mb-6 shadow-sm"
            >
              <div className="space-y-6">
                {/* BMI Result */}
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-2">Your BMI Score</div>
                  <div className="text-4xl font-bold text-foreground mb-2">
                    {result.bmi}
                  </div>
                  <div className={`text-xl font-semibold ${result.color}`}>
                    {result.category}
                  </div>
                </div>

                {/* Input Summary */}
                <div className="bg-secondary/20 p-3 rounded-lg border border-border">
                  <div className="text-sm font-medium text-foreground mb-1">Your Input:</div>
                  <div className="text-sm text-muted-foreground">
                    Height: {height} {heightUnit} | Weight: {weight} {weightUnit}
                  </div>
                </div>

                {/* Conversion Details */}
                <div className="bg-muted p-3 rounded-lg">
                  <div className="text-sm font-medium text-foreground mb-1">Calculation Details:</div>
                  <div className="text-xs text-muted-foreground font-mono">
                    {getConversionFormula()}
                  </div>
                </div>

                {/* Health Assessment */}
                <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
                  <div className="text-sm font-medium text-foreground mb-2">Health Assessment:</div>
                  <div className="text-sm text-muted-foreground">
                    Your BMI indicates you are in the <span className="font-medium text-foreground">{result.category.toLowerCase()}</span> category.
                    {result.category === 'Normal weight' && ' This is considered a healthy weight range.'}
                    {result.category === 'Underweight' && ' Consider consulting a healthcare provider for guidance.'}
                    {result.category === 'Overweight' && ' Maintaining a healthy lifestyle is recommended.'}
                    {result.category === 'Obese' && ' Consulting with healthcare professionals is advised.'}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* BMI Categories Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 mb-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-foreground mb-4">BMI Categories</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <span className="text-sm font-medium text-foreground">Underweight</span>
                <span className="text-sm font-bold text-blue-600">Below 18.5</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <span className="text-sm font-medium text-foreground">Normal weight</span>
                <span className="text-sm font-bold text-green-600">18.5 - 24.9</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                <span className="text-sm font-medium text-foreground">Overweight</span>
                <span className="text-sm font-bold text-yellow-600">25 - 29.9</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                <span className="text-sm font-medium text-foreground">Obese</span>
                <span className="text-sm font-bold text-red-600">30 and above</span>
              </div>
            </div>
          </motion.div>

          {/* Unit Conversion Guide */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
          >
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">Unit Conversion Guide</h3>
            <div className="space-y-2 text-muted-foreground text-sm">
              <div className="text-xs sm:text-sm space-y-2">
                <div className="font-medium text-foreground">Height Conversions:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div>1 foot = 30.48 cm = 0.3048 m</div>
                  <div>1 inch = 2.54 cm = 0.0254 m</div>
                  <div>1 cm = 0.3937 inches</div>
                  <div>1 m = 3.2808 feet</div>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Weight Conversions:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div>1 pound (lb) = 0.4536 kg</div>
                  <div>1 stone = 14 lbs = 6.3503 kg</div>
                  <div>1 kg = 2.2046 lbs</div>
                  <div>1 kg = 0.1575 stone</div>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Common Examples:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div>5'7" = 170 cm = 1.70 m</div>
                  <div>150 lbs = 68 kg = 10.7 stone</div>
                  <div>6 feet = 182.9 cm = 1.83 m</div>
                  <div>180 lbs = 81.6 kg = 12.9 stone</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}