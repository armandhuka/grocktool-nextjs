'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Calculator, RotateCcw, ArrowLeft, Scale, Ruler, Weight } from 'lucide-react';
import Link from 'next/link';

export default function BodyFat() {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [neck, setNeck] = useState('');
  const [waist, setWaist] = useState('');
  const [hip, setHip] = useState('');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [circumferenceUnit, setCircumferenceUnit] = useState('cm');
  const [result, setResult] = useState<{ 
    bodyFat: number; 
    category: string; 
    color: string;
    leanMass: number;
    fatMass: number;
    bmi: number;
    idealRange: { min: number; max: number };
  } | null>(null);

  // Measurement units - 3 different units for different measurements
  const weightUnits = [
    { value: 'kg', label: 'kg' },
    { value: 'lbs', label: 'lbs' },
    { value: 'st', label: 'st' }
  ];

  const heightUnits = [
    { value: 'cm', label: 'cm' },
    { value: 'ft', label: 'ft' },
    { value: 'in', label: 'inches' }
  ];

  const circumferenceUnits = [
    { value: 'cm', label: 'cm' },
    { value: 'in', label: 'inches' },
    { value: 'mm', label: 'mm' }
  ];

  // Body fat categories with detailed info
  const bodyFatCategories = {
    male: [
      { range: '2-5%', category: 'Essential Fat', color: 'text-red-600', description: 'Minimum necessary for basic physiological functions' },
      { range: '6-13%', category: 'Athletes', color: 'text-green-600', description: 'Typical for athletic individuals' },
      { range: '14-17%', category: 'Fitness', color: 'text-blue-600', description: 'Good fitness level' },
      { range: '18-24%', category: 'Average', color: 'text-yellow-600', description: 'Average for general population' },
      { range: '25%+', category: 'Obese', color: 'text-red-600', description: 'Increased health risks' }
    ],
    female: [
      { range: '10-13%', category: 'Essential Fat', color: 'text-red-600', description: 'Minimum necessary for basic physiological functions' },
      { range: '14-20%', category: 'Athletes', color: 'text-green-600', description: 'Typical for athletic individuals' },
      { range: '21-24%', category: 'Fitness', color: 'text-blue-600', description: 'Good fitness level' },
      { range: '25-31%', category: 'Average', color: 'text-yellow-600', description: 'Average for general population' },
      { range: '32%+', category: 'Obese', color: 'text-red-600', description: 'Increased health risks' }
    ]
  };

  // Convert weight to kg
  const convertWeightToKg = (value: number, unit: string): number => {
    switch (unit) {
      case 'kg': return value;
      case 'lbs': return value * 0.453592;
      case 'st': return value * 6.35029; // 1 stone = 6.35029 kg
      default: return value;
    }
  };

  // Convert height to cm
  const convertHeightToCm = (value: number, unit: string): number => {
    switch (unit) {
      case 'cm': return value;
      case 'ft': return value * 30.48; // 1 ft = 30.48 cm
      case 'in': return value * 2.54;  // 1 inch = 2.54 cm
      default: return value;
    }
  };

  // Convert circumference to cm
  const convertCircumferenceToCm = (value: number, unit: string): number => {
    switch (unit) {
      case 'cm': return value;
      case 'in': return value * 2.54;  // 1 inch = 2.54 cm
      case 'mm': return value * 0.1;   // 1 mm = 0.1 cm
      default: return value;
    }
  };

  // Get placeholder based on unit
  const getPlaceholder = (type: string, unit: string): string => {
    const placeholders: any = {
      weight: {
        'kg': 'e.g., 70',
        'lbs': 'e.g., 154',
        'st': 'e.g., 11'
      },
      height: {
        'cm': 'e.g., 175',
        'ft': 'e.g., 5.75',
        'in': 'e.g., 69'
      },
      circumference: {
        'cm': 'e.g., 38',
        'in': 'e.g., 15',
        'mm': 'e.g., 380'
      }
    };
    return placeholders[type]?.[unit] || 'e.g., 0';
  };

  const calculateBodyFat = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const n = parseFloat(neck);
    const wa = parseFloat(waist);
    const hi = parseFloat(hip);
    
    if (!w || !h || !n || !wa || (gender === 'female' && !hi)) return;
    
    // Convert all measurements to standard units (cm and kg)
    const weightInKg = convertWeightToKg(w, weightUnit);
    const heightInCm = convertHeightToCm(h, heightUnit);
    const neckInCm = convertCircumferenceToCm(n, circumferenceUnit);
    const waistInCm = convertCircumferenceToCm(wa, circumferenceUnit);
    const hipInCm = convertCircumferenceToCm(hi, circumferenceUnit);
    
    let bodyFat: number;
    
    // US Navy Body Fat Formula
    if (gender === 'male') {
      bodyFat = 86.010 * Math.log10(waistInCm - neckInCm) - 70.041 * Math.log10(heightInCm) + 36.76;
    } else {
      bodyFat = 163.205 * Math.log10(waistInCm + hipInCm - neckInCm) - 97.684 * Math.log10(heightInCm) - 78.387;
    }
    
    // Ensure body fat is within reasonable bounds
    bodyFat = Math.max(2, Math.min(50, bodyFat));
    
    // Calculate additional metrics
    const fatMass = (bodyFat / 100) * weightInKg;
    const leanMass = weightInKg - fatMass;
    const bmi = weightInKg / ((heightInCm / 100) ** 2);
    
    // Determine ideal body fat range
    const idealRange = gender === 'male' 
      ? { min: 8, max: 19 }
      : { min: 21, max: 33 };
    
    let category = '';
    let color = '';
    
    const categories = gender === 'male' ? bodyFatCategories.male : bodyFatCategories.female;
    for (const cat of categories) {
      const range = cat.range;
      const min = parseFloat(range.split('-')[0]);
      const max = parseFloat(range.split('-')[1].replace('%', '').replace('+', ''));
      
      if (bodyFat >= min && (range.includes('+') ? bodyFat >= max : bodyFat <= max)) {
        category = cat.category;
        color = cat.color;
        break;
      }
    }
    
    setResult({ 
      bodyFat: Math.round(bodyFat * 10) / 10, 
      category, 
      color,
      leanMass: Math.round(leanMass * 10) / 10,
      fatMass: Math.round(fatMass * 10) / 10,
      bmi: Math.round(bmi * 10) / 10,
      idealRange
    });
  };

  const reset = () => {
    setAge('');
    setWeight('');
    setHeight('');
    setNeck('');
    setWaist('');
    setHip('');
    setResult(null);
  };

  const getProgressValue = () => {
    if (!result) return 0;
    return Math.min(100, Math.max(0, (result.bodyFat / 40) * 100));
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
                Body Fat Percentage Calculator
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Estimate your body fat percentage using the US Navy circumference method
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
              {/* Personal Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Activity size={20} className="text-blue-500" />
                  <label className="block text-sm font-medium text-foreground">
                    Personal Details
                  </label>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      Age (years)
                    </label>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="e.g., 25"
                      className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg"
                      min="1"
                      max="120"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      Gender
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setGender('male')}
                        className={`p-3 rounded-lg border transition-all ${
                          gender === 'male' 
                            ? 'bg-accent text-accent-foreground border-accent' 
                            : 'bg-secondary text-secondary-foreground border-border hover:bg-secondary/80'
                        }`}
                      >
                        <div className="text-sm font-medium">Male</div>
                      </button>
                      <button
                        onClick={() => setGender('female')}
                        className={`p-3 rounded-lg border transition-all ${
                          gender === 'female' 
                            ? 'bg-accent text-accent-foreground border-accent' 
                            : 'bg-secondary text-secondary-foreground border-border hover:bg-secondary/80'
                        }`}
                      >
                        <div className="text-sm font-medium">Female</div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Weight Input */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Weight size={16} className="text-blue-500" />
                    <label className="block text-sm font-medium text-foreground">
                      Body Weight
                    </label>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder={getPlaceholder('weight', weightUnit)}
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
                    <span>Units:</span>
                    {weightUnits.map((unit) => (
                      <button 
                        key={unit.value}
                        onClick={() => setWeightUnit(unit.value)}
                        className={`hover:text-foreground transition-colors ${
                          weightUnit === unit.value ? 'text-accent font-medium' : ''
                        }`}
                      >
                        {unit.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Height Input */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Ruler size={16} className="text-blue-500" />
                    <label className="block text-sm font-medium text-foreground">
                      Height
                    </label>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder={getPlaceholder('height', heightUnit)}
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
                    <span>Units:</span>
                    {heightUnits.map((unit) => (
                      <button 
                        key={unit.value}
                        onClick={() => setHeightUnit(unit.value)}
                        className={`hover:text-foreground transition-colors ${
                          heightUnit === unit.value ? 'text-accent font-medium' : ''
                        }`}
                      >
                        {unit.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Circumference Measurements */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Scale size={16} className="text-blue-500" />
                    <label className="block text-sm font-medium text-foreground">
                      Circumference Measurements
                    </label>
                  </div>
                  
                  {/* Unit selector for circumference */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>Unit:</span>
                    {circumferenceUnits.map((unit) => (
                      <button 
                        key={unit.value}
                        onClick={() => setCircumferenceUnit(unit.value)}
                        className={`hover:text-foreground transition-colors ${
                          circumferenceUnit === unit.value ? 'text-accent font-medium' : ''
                        }`}
                      >
                        {unit.label}
                      </button>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">
                        Neck
                      </label>
                      <input
                        type="number"
                        value={neck}
                        onChange={(e) => setNeck(e.target.value)}
                        placeholder={getPlaceholder('circumference', circumferenceUnit)}
                        className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg"
                        step="any"
                        min="0"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">
                        Waist
                      </label>
                      <input
                        type="number"
                        value={waist}
                        onChange={(e) => setWaist(e.target.value)}
                        placeholder={getPlaceholder('circumference', circumferenceUnit)}
                        className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg"
                        step="any"
                        min="0"
                      />
                    </div>
                  </div>

                  {gender === 'female' && (
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">
                        Hip (required for females)
                      </label>
                      <input
                        type="number"
                        value={hip}
                        onChange={(e) => setHip(e.target.value)}
                        placeholder={getPlaceholder('circumference', circumferenceUnit)}
                        className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg"
                        step="any"
                        min="0"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={calculateBodyFat}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent text-accent-foreground rounded-lg sm:rounded-xl hover:bg-accent/80 transition-colors text-sm sm:text-base"
                >
                  <Calculator size={16} className="sm:w-4 sm:h-4" />
                  Calculate Body Fat
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
                {/* Main Result */}
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-2">Body Fat Percentage</div>
                  <div className="text-4xl font-bold text-foreground mb-2">
                    {result.bodyFat}%
                  </div>
                  <div className={`text-lg font-semibold ${result.color} mb-4`}>
                    {result.category}
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-secondary rounded-full h-3 mb-2">
                    <div 
                      className="bg-accent h-3 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${getProgressValue()}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0%</span>
                    <span>Ideal: {result.idealRange.min}%-{result.idealRange.max}%</span>
                    <span>40%</span>
                  </div>
                </div>

                {/* Body Composition Breakdown */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20 text-center">
                    <div className="text-sm text-muted-foreground mb-1">Fat Mass</div>
                    <div className="text-lg font-bold text-foreground">{result.fatMass}kg</div>
                    <div className="text-xs text-muted-foreground">{result.bodyFat}% of weight</div>
                  </div>
                  <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20 text-center">
                    <div className="text-sm text-muted-foreground mb-1">Lean Mass</div>
                    <div className="text-lg font-bold text-foreground">{result.leanMass}kg</div>
                    <div className="text-xs text-muted-foreground">{100 - result.bodyFat}% of weight</div>
                  </div>
                  <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20 text-center">
                    <div className="text-sm text-muted-foreground mb-1">BMI</div>
                    <div className="text-lg font-bold text-foreground">{result.bmi}</div>
                    <div className="text-xs text-muted-foreground">Body Mass Index</div>
                  </div>
                  <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20 text-center">
                    <div className="text-sm text-muted-foreground mb-1">Status</div>
                    <div className={`text-sm font-bold ${result.color}`}>{result.category}</div>
                    <div className="text-xs text-muted-foreground">Category</div>
                  </div>
                </div>

                {/* Health Assessment */}
                <div className="bg-muted p-4 rounded-lg">
                  <div className="text-sm font-medium text-foreground mb-2">Health Assessment:</div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    {result.bodyFat < result.idealRange.min && (
                      <div>• Your body fat is below the recommended range. Consider gaining healthy weight.</div>
                    )}
                    {result.bodyFat >= result.idealRange.min && result.bodyFat <= result.idealRange.max && (
                      <div>• Your body fat is within the healthy range. Maintain your current lifestyle.</div>
                    )}
                    {result.bodyFat > result.idealRange.max && (
                      <div>• Your body fat is above the recommended range. Consider lifestyle changes.</div>
                    )}
                    <div className="font-medium text-foreground mt-2">
                      Ideal range for your gender and age: {result.idealRange.min}% - {result.idealRange.max}%
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Unit Conversion Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 mb-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-foreground mb-4">Unit Conversion Guide</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                <div className="text-sm font-medium text-foreground mb-2">Weight Units</div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div>• 1 kg = 2.20462 lbs</div>
                  <div>• 1 kg = 0.15747 st</div>
                  <div>• 1 st = 6.35029 kg</div>
                  <div>• 1 lb = 0.453592 kg</div>
                </div>
              </div>
              <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                <div className="text-sm font-medium text-foreground mb-2">Height Units</div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div>• 1 cm = 0.393701 in</div>
                  <div>• 1 ft = 30.48 cm</div>
                  <div>• 1 in = 2.54 cm</div>
                  <div>• 1 m = 100 cm</div>
                </div>
              </div>
              <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
                <div className="text-sm font-medium text-foreground mb-2">Circumference Units</div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div>• 1 cm = 0.393701 in</div>
                  <div>• 1 in = 2.54 cm</div>
                  <div>• 1 mm = 0.1 cm</div>
                  <div>• 1 cm = 10 mm</div>
                </div>
              </div>
            </div>
          </motion.div>

     <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 mb-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-foreground mb-4">Body Fat Categories</h3>
            <div className="space-y-4">
              {(gender === 'male' ? bodyFatCategories.male : bodyFatCategories.female).map((category, index) => (
                <div key={index} className="bg-secondary/20 p-3 rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`font-medium ${category.color}`}>{category.category}</span>
                    <span className="text-sm text-muted-foreground">{category.range}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">{category.description}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Health Tips Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 mb-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-foreground mb-4">Health & Fitness Tips</h3>
            <div className="space-y-3">
              <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                <div className="text-sm font-medium text-foreground mb-1">💪 Reducing Body Fat</div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>• Create a calorie deficit through diet and exercise</div>
                  <div>• Include both cardio and strength training</div>
                  <div>• Focus on whole foods and protein intake</div>
                  <div>• Get adequate sleep and manage stress</div>
                </div>
              </div>
              
              <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                <div className="text-sm font-medium text-foreground mb-1">📊 Measurement Accuracy</div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>• Measure circumference in the morning on empty stomach</div>
                  <div>• Use a flexible tape measure at skin level</div>
                  <div>• Don't pull the tape too tight or leave it too loose</div>
                  <div>• For consistent results, measure at the same time daily</div>
                </div>
              </div>

              <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
                <div className="text-sm font-medium text-foreground mb-1">⚠️ Health Considerations</div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>• Very low body fat can be dangerous to health</div>
                  <div>• High body fat increases chronic disease risk</div>
                  <div>• Consult healthcare professionals for personalized advice</div>
                  <div>• Focus on overall health, not just body fat percentage</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
          >
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">About Body Fat Calculation</h3>
            <div className="space-y-2 text-muted-foreground text-sm">
              <p>
                This calculator uses the US Navy circumference method to estimate body fat percentage. 
                The method uses body circumference measurements to estimate the amount of body fat. 
                While this method is reasonably accurate for most people, it may not be suitable for 
                athletes or individuals with very low or very high muscle mass.
              </p>
              <div className="text-xs sm:text-sm space-y-1 pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Enter your age, gender, weight, and height</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Provide accurate circumference measurements in centimeters</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>For females, hip measurement is required for accurate calculation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Click "Calculate Body Fat" to get your results and analysis</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Calculation Formulas:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Men:</strong> 86.010 × log10(waist - neck) - 70.041 × log10(height) + 36.76</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Women:</strong> 163.205 × log10(waist + hip - neck) - 97.684 × log10(height) - 78.387</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Limitations & Considerations:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
                  <span>Accuracy may vary for athletes, elderly, and certain ethnic groups</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
                  <span>Does not account for body fat distribution patterns</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
                  <span>For precise measurements, consider DEXA scans or hydrostatic weighing</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
                  <span>Regular tracking is more valuable than single measurements</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}