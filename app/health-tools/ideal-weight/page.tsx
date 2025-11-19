'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Calculator, RotateCcw, ArrowLeft, Scale, Ruler, User, Bone } from 'lucide-react';
import Link from 'next/link';

export default function IdealWeight() {
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [frame, setFrame] = useState('medium');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [result, setResult] = useState<{
    robinson: number;
    miller: number;
    devine: number;
    hamwi: number;
    range: { min: number; max: number };
    bmiRange: { min: number; max: number };
    average: number;
  } | null>(null);

  // Measurement units
  const heightUnits = [
    { value: 'cm', label: 'cm' },
    { value: 'ft', label: 'ft' },
    { value: 'in', label: 'inches' }
  ];

  const weightUnits = [
    { value: 'kg', label: 'kg' },
    { value: 'lbs', label: 'lbs' },
    { value: 'st', label: 'st' }
  ];

  // Body frame options
  const frameOptions = [
    { value: 'small', label: 'Small Frame', description: 'Slender build, smaller bones' },
    { value: 'medium', label: 'Medium Frame', description: 'Average build' },
    { value: 'large', label: 'Large Frame', description: 'Larger build, bigger bones' }
  ];

  // Convert height to cm
  const convertHeightToCm = (value: number, unit: string): number => {
    switch (unit) {
      case 'cm': return value;
      case 'ft': return value * 30.48;
      case 'in': return value * 2.54;
      default: return value;
    }
  };

  // Convert weight from kg to desired unit
  const convertWeightFromKg = (value: number, unit: string): number => {
    switch (unit) {
      case 'kg': return value;
      case 'lbs': return value * 2.20462;
      case 'st': return value * 0.157473;
      default: return value;
    }
  };

  // Get placeholder based on unit
  const getPlaceholder = (unit: string): string => {
    const placeholders: any = {
      height: {
        'cm': 'e.g., 175',
        'ft': 'e.g., 5.75',
        'in': 'e.g., 69'
      }
    };
    return placeholders.height[unit] || 'e.g., 0';
  };

  const calculateIdealWeight = () => {
    const h = parseFloat(height);
    const a = parseFloat(age);
    
    if (!h) return;
    
    // Convert height to cm for calculations
    const heightInCm = convertHeightToCm(h, heightUnit);
    const heightInches = heightInCm / 2.54;
    
    // Robinson Formula (1983)
    let robinson: number;
    if (gender === 'male') {
      robinson = 52 + 1.9 * (heightInches - 60);
    } else {
      robinson = 49 + 1.7 * (heightInches - 60);
    }
    
    // Miller Formula (1983)
    let miller: number;
    if (gender === 'male') {
      miller = 56.2 + 1.41 * (heightInches - 60);
    } else {
      miller = 53.1 + 1.36 * (heightInches - 60);
    }
    
    // Devine Formula (1974)
    let devine: number;
    if (gender === 'male') {
      devine = 50 + 2.3 * (heightInches - 60);
    } else {
      devine = 45.5 + 2.3 * (heightInches - 60);
    }
    
    // Hamwi Formula (1964)
    let hamwi: number;
    if (gender === 'male') {
      hamwi = 48 + 2.7 * (heightInches - 60);
    } else {
      hamwi = 45.5 + 2.2 * (heightInches - 60);
    }
    
    // Frame adjustment
    const frameMultipliers = {
      small: 0.9,
      medium: 1.0,
      large: 1.1
    };
    
    const frameMultiplier = frameMultipliers[frame as keyof typeof frameMultipliers];
    
    // Apply frame adjustment
    robinson *= frameMultiplier;
    miller *= frameMultiplier;
    devine *= frameMultiplier;
    hamwi *= frameMultiplier;
    
    // Healthy BMI range (18.5-24.9)
    const heightM = heightInCm / 100;
    const minWeight = 18.5 * heightM * heightM;
    const maxWeight = 24.9 * heightM * heightM;
    
    // Age adjustment (slight reduction for older adults)
    const ageAdjustedMultiplier = a > 65 ? 0.95 : 1.0;
    
    const finalRobinson = robinson * ageAdjustedMultiplier;
    const finalMiller = miller * ageAdjustedMultiplier;
    const finalDevine = devine * ageAdjustedMultiplier;
    const finalHamwi = hamwi * ageAdjustedMultiplier;
    const finalMinWeight = minWeight * ageAdjustedMultiplier;
    const finalMaxWeight = maxWeight * ageAdjustedMultiplier;
    
    const average = (finalRobinson + finalMiller + finalDevine + finalHamwi) / 4;
    
    setResult({
      robinson: finalRobinson,
      miller: finalMiller,
      devine: finalDevine,
      hamwi: finalHamwi,
      range: {
        min: finalMinWeight,
        max: finalMaxWeight
      },
      bmiRange: {
        min: 18.5,
        max: 24.9
      },
      average
    });
  };

  const reset = () => {
    setHeight('');
    setAge('');
    setResult(null);
  };

  // Format weight based on selected unit
  const formatWeight = (weight: number): string => {
    const converted = convertWeightFromKg(weight, weightUnit);
    return Math.round(converted).toString();
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
                Ideal Weight Calculator
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Calculate your ideal weight using multiple scientific formulas
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
                  <User size={20} className="text-blue-500" />
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
                      placeholder={getPlaceholder(heightUnit)}
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

                {/* Body Frame Selection */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Bone size={16} className="text-blue-500" />
                    <label className="block text-sm font-medium text-foreground">
                      Body Frame Size
                    </label>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {frameOptions.map((frameOption) => (
                      <button
                        key={frameOption.value}
                        onClick={() => setFrame(frameOption.value)}
                        className={`p-3 rounded-lg border text-left transition-all ${
                          frame === frameOption.value 
                            ? 'bg-accent text-accent-foreground border-accent' 
                            : 'bg-secondary text-secondary-foreground border-border hover:bg-secondary/80'
                        }`}
                      >
                        <div>
                          <div className="text-sm font-medium">{frameOption.label}</div>
                          <div className="text-xs opacity-80">{frameOption.description}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Weight Unit Selection */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Scale size={16} className="text-blue-500" />
                    <label className="block text-sm font-medium text-foreground">
                      Display Weight In
                    </label>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {weightUnits.map((unit) => (
                      <button
                        key={unit.value}
                        onClick={() => setWeightUnit(unit.value)}
                        className={`p-3 rounded-lg border transition-all ${
                          weightUnit === unit.value 
                            ? 'bg-accent text-accent-foreground border-accent' 
                            : 'bg-secondary text-secondary-foreground border-border hover:bg-secondary/80'
                        }`}
                      >
                        <div className="text-sm font-medium">{unit.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={calculateIdealWeight}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent text-accent-foreground rounded-lg sm:rounded-xl hover:bg-accent/80 transition-colors text-sm sm:text-base"
                >
                  <Calculator size={16} className="sm:w-4 sm:h-4" />
                  Calculate Ideal Weight
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
                {/* Average Result */}
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-2">Recommended Ideal Weight</div>
                  <div className="text-4xl font-bold text-foreground mb-2">
                    {formatWeight(result.average)} {weightUnit}
                  </div>
                  <div className="text-lg text-muted-foreground">
                    Average of all formulas
                  </div>
                </div>

                {/* Formula Results */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20 text-center">
                    <div className="text-sm text-muted-foreground mb-1">Robinson</div>
                    <div className="text-lg font-bold text-foreground">{formatWeight(result.robinson)}</div>
                    <div className="text-xs text-muted-foreground">{weightUnit}</div>
                  </div>
                  <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20 text-center">
                    <div className="text-sm text-muted-foreground mb-1">Miller</div>
                    <div className="text-lg font-bold text-foreground">{formatWeight(result.miller)}</div>
                    <div className="text-xs text-muted-foreground">{weightUnit}</div>
                  </div>
                  <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20 text-center">
                    <div className="text-sm text-muted-foreground mb-1">Devine</div>
                    <div className="text-lg font-bold text-foreground">{formatWeight(result.devine)}</div>
                    <div className="text-xs text-muted-foreground">{weightUnit}</div>
                  </div>
                  <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20 text-center">
                    <div className="text-sm text-muted-foreground mb-1">Hamwi</div>
                    <div className="text-lg font-bold text-foreground">{formatWeight(result.hamwi)}</div>
                    <div className="text-xs text-muted-foreground">{weightUnit}</div>
                  </div>
                </div>

                {/* Healthy BMI Range */}
                <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                  <div className="text-sm font-medium text-foreground mb-2">Healthy BMI Range</div>
                  <div className="text-center mb-2">
                    <div className="text-2xl font-bold text-foreground">
                      {formatWeight(result.range.min)} - {formatWeight(result.range.max)} {weightUnit}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      BMI {result.bmiRange.min} - {result.bmiRange.max}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    This range represents a healthy weight based on Body Mass Index calculations
                  </div>
                </div>

                {/* Adjustments Applied */}
                <div className="bg-muted p-4 rounded-lg">
                  <div className="text-sm font-medium text-foreground mb-2">Adjustments Applied:</div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>• Body Frame: {frameOptions.find(f => f.value === frame)?.label} ({frame === 'small' ? '-10%' : frame === 'large' ? '+10%' : 'no adjustment'})</div>
                    {parseFloat(age) > 65 && <div>• Age: 5% reduction (senior adjustment)</div>}
                    <div>• Gender: {gender === 'male' ? 'Male' : 'Female'} formulas applied</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Formula Information Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 mb-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-foreground mb-4">About Ideal Weight Formulas</h3>
            <div className="space-y-4">
              <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                <div className="text-sm font-medium text-foreground mb-1">📊 Robinson Formula (1983)</div>
                <div className="text-sm text-muted-foreground">
                  Most commonly used in clinical settings. Considered one of the most accurate formulas 
                  for ideal body weight calculation.
                </div>
              </div>
              
              <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                <div className="text-sm font-medium text-foreground mb-1">⚖️ Miller Formula (1983)</div>
                <div className="text-sm text-muted-foreground">
                  Similar to Robinson formula with slight modifications. Developed as an improvement 
                  over earlier formulas.
                </div>
              </div>

              <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
                <div className="text-sm font-medium text-foreground mb-1">💊 Devine Formula (1974)</div>
                <div className="text-sm text-muted-foreground">
                  Originally developed for medication dosing calculations. Widely used in medical 
                  practice for decades.
                </div>
              </div>

              <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
                <div className="text-sm font-medium text-foreground mb-1">🏥 Hamwi Formula (1964)</div>
                <div className="text-sm text-muted-foreground">
                  Quick estimation method developed for clinical use. One of the earliest and 
                  most referenced formulas.
                </div>
              </div>
            </div>
          </motion.div>

          {/* Health Guidelines Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 mb-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-foreground mb-4">Health Guidelines & Considerations</h3>
            <div className="space-y-3">
              <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                <div className="text-sm font-medium text-foreground mb-1">💪 Factors Affecting Ideal Weight</div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>• Muscle mass and body composition</div>
                  <div>• Bone density and frame size</div>
                  <div>• Age and metabolic changes</div>
                  <div>• Physical activity level</div>
                  <div>• Genetic factors and ethnicity</div>
                </div>
              </div>
              
              <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                <div className="text-sm font-medium text-foreground mb-1">🎯 When to Consult a Professional</div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>• If you have significant muscle mass (athletes)</div>
                  <div>• If you have underlying health conditions</div>
                  <div>• For personalized diet and exercise plans</div>
                  <div>• If you're pregnant or breastfeeding</div>
                </div>
              </div>

              <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
                <div className="text-sm font-medium text-foreground mb-1">⚠️ Important Notes</div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>• These are estimates based on statistical formulas</div>
                  <div>• Individual needs may vary significantly</div>
                  <div>• Focus on overall health, not just weight</div>
                  <div>• Consult healthcare professionals for personalized advice</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Unit Conversion Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
          >
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">How Ideal Weight Calculation Works</h3>
            <div className="space-y-2 text-muted-foreground text-sm">
              <p>
                Ideal weight calculations use statistical formulas based on height and gender to estimate 
                a healthy weight range. These formulas were developed through medical research and are 
                widely used in clinical practice.
              </p>
              <div className="text-xs sm:text-sm space-y-1 pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Enter your height, age, gender, and body frame size</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Select preferred units for input and output</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Click "Calculate Ideal Weight" to get results from multiple formulas</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>View average recommendation and healthy BMI range</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Formula Details:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>All formulas</strong> are based on statistical data from population studies</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Frame size adjustment</strong> accounts for bone structure variations</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Age adjustment</strong> applies slight reduction for seniors (65+)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>BMI range</strong> shows healthy weight based on Body Mass Index 18.5-24.9</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}