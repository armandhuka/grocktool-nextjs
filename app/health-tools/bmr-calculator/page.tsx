'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Calculator, RotateCcw, ArrowLeft, Activity, Target, Flame, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function BMRCalculator() {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('male');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [formula, setFormula] = useState('mifflin');
  const [result, setResult] = useState<{
    bmr: number;
    sedentary: number;
    light: number;
    moderate: number;
    very: number;
    extra: number;
    formulaUsed: string;
  } | null>(null);

  // Measurement units
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

  // Formula options
  const formulaOptions = [
    { value: 'mifflin', label: 'Mifflin-St Jeor', description: 'Most accurate for general population' },
    { value: 'harris', label: 'Harris-Benedict', description: 'Original formula, slightly less accurate' },
    { value: 'katch', label: 'Katch-McArdle', description: 'Best for lean body mass (requires body fat %)' }
  ];

  // Activity levels with detailed descriptions
  const activityLevels = [
    { 
      level: 'sedentary', 
      multiplier: 1.2, 
      label: 'Sedentary', 
      description: 'Little or no exercise',
      icon: '💺',
      examples: 'Desk job, no exercise'
    },
    { 
      level: 'light', 
      multiplier: 1.375, 
      label: 'Light Activity', 
      description: 'Light exercise 1-3 days/week',
      icon: '🚶',
      examples: 'Walking, light housework'
    },
    { 
      level: 'moderate', 
      multiplier: 1.55, 
      label: 'Moderate Activity', 
      description: 'Moderate exercise 3-5 days/week',
      icon: '🏃',
      examples: 'Jogging, cycling, sports'
    },
    { 
      level: 'very', 
      multiplier: 1.725, 
      label: 'Very Active', 
      description: 'Hard exercise 6-7 days/week',
      icon: '💪',
      examples: 'Intense workouts, training'
    },
    { 
      level: 'extra', 
      multiplier: 1.9, 
      label: 'Extra Active', 
      description: 'Very hard exercise, physical job',
      icon: '🔥',
      examples: 'Athlete, construction work'
    }
  ];

  // Convert weight to kg
  const convertWeightToKg = (value: number, unit: string): number => {
    switch (unit) {
      case 'kg': return value;
      case 'lbs': return value * 0.453592;
      case 'st': return value * 6.35029;
      default: return value;
    }
  };

  // Convert height to cm
  const convertHeightToCm = (value: number, unit: string): number => {
    switch (unit) {
      case 'cm': return value;
      case 'ft': return value * 30.48;
      case 'in': return value * 2.54;
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
      }
    };
    return placeholders[type]?.[unit] || 'e.g., 0';
  };

  const calculateBMR = () => {
    const a = parseFloat(age);
    const w = parseFloat(weight);
    const h = parseFloat(height);
    
    if (!a || !w || !h) return;
    
    // Convert to standard units
    const weightInKg = convertWeightToKg(w, weightUnit);
    const heightInCm = convertHeightToCm(h, heightUnit);
    
    let bmr: number;
    let formulaName = '';
    
    // Different BMR formulas
    switch (formula) {
      case 'mifflin':
        // Mifflin-St Jeor Equation (most accurate)
        if (gender === 'male') {
          bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * a + 5;
        } else {
          bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * a - 161;
        }
        formulaName = 'Mifflin-St Jeor';
        break;
        
      case 'harris':
        // Harris-Benedict Equation (original)
        if (gender === 'male') {
          bmr = 88.362 + (13.397 * weightInKg) + (4.799 * heightInCm) - (5.677 * a);
        } else {
          bmr = 447.593 + (9.247 * weightInKg) + (3.098 * heightInCm) - (4.330 * a);
        }
        formulaName = 'Harris-Benedict';
        break;
        
      case 'katch':
        // Katch-McArdle (requires body fat %, using estimated)
        const LBM = gender === 'male' ? weightInKg * 0.85 : weightInKg * 0.75;
        bmr = 370 + (21.6 * LBM);
        formulaName = 'Katch-McArdle';
        break;
        
      default:
        bmr = 0;
    }
    
    // Calculate TDEE for different activity levels
    const sedentary = bmr * 1.2;
    const light = bmr * 1.375;
    const moderate = bmr * 1.55;
    const very = bmr * 1.725;
    const extra = bmr * 1.9;
    
    setResult({
      bmr: Math.round(bmr),
      sedentary: Math.round(sedentary),
      light: Math.round(light),
      moderate: Math.round(moderate),
      very: Math.round(very),
      extra: Math.round(extra),
      formulaUsed: formulaName
    });
  };

  const reset = () => {
    setAge('');
    setWeight('');
    setHeight('');
    setResult(null);
  };

  // Get calorie goals for different objectives
  const getCalorieGoals = () => {
    if (!result) return null;
    
    return {
      maintenance: result.moderate, // Using moderate activity as baseline
      weightLoss: Math.max(result.bmr, result.moderate - 500),
      extremeLoss: Math.max(result.bmr, result.moderate - 1000),
      weightGain: result.moderate + 500,
      extremeGain: result.moderate + 1000
    };
  };

  const calorieGoals = getCalorieGoals();

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
                BMR & Calorie Calculator
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Calculate your Basal Metabolic Rate and daily energy expenditure
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
                  <Zap size={20} className="text-orange-500" />
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
                  <label className="block text-sm font-medium text-foreground">
                    Body Weight
                  </label>
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
                </div>

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
                </div>

                {/* Formula Selection */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">
                    BMR Formula
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {formulaOptions.map((formulaOption) => (
                      <button
                        key={formulaOption.value}
                        onClick={() => setFormula(formulaOption.value)}
                        className={`p-3 rounded-lg border text-left transition-all ${
                          formula === formulaOption.value 
                            ? 'bg-accent text-accent-foreground border-accent' 
                            : 'bg-secondary text-secondary-foreground border-border hover:bg-secondary/80'
                        }`}
                      >
                        <div>
                          <div className="text-sm font-medium">{formulaOption.label}</div>
                          <div className="text-xs opacity-80">{formulaOption.description}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={calculateBMR}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent text-accent-foreground rounded-lg sm:rounded-xl hover:bg-accent/80 transition-colors text-sm sm:text-base"
                >
                  <Calculator size={16} className="sm:w-4 sm:h-4" />
                  Calculate BMR & TDEE
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
            <>
              {/* BMR Result Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 mb-6 shadow-sm"
              >
                <div className="space-y-6">
                  {/* Main BMR Result */}
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground mb-2">Basal Metabolic Rate (BMR)</div>
                    <div className="text-4xl font-bold text-foreground mb-2">
                      {result.bmr} calories/day
                    </div>
                    <div className="text-lg text-orange-500 font-medium">
                      {result.formulaUsed} Formula
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">
                      Calories burned at complete rest
                    </div>
                  </div>

                  {/* Activity Level Breakdown */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Activity size={16} className="text-blue-500" />
                      <label className="block text-sm font-medium text-foreground">
                        Total Daily Energy Expenditure (TDEE)
                      </label>
                    </div>
                    
                    {activityLevels.map((activity, index) => (
                      <div 
                        key={activity.level}
                        className="flex justify-between items-center p-3 rounded-lg border border-border hover:bg-secondary/20 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-lg">{activity.icon}</div>
                          <div>
                            <div className="text-sm font-medium text-foreground">{activity.label}</div>
                            <div className="text-xs text-muted-foreground">{activity.description}</div>
                            <div className="text-xs text-muted-foreground">{activity.examples}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-foreground">
                            {result[activity.level as keyof typeof result]}
                          </div>
                          <div className="text-xs text-muted-foreground">calories/day</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Calorie Goals Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 mb-6 shadow-sm"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Target size={16} className="text-green-500" />
                    <label className="block text-sm font-medium text-foreground">
                      Calorie Goals for Different Objectives
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/20 text-center">
                      <div className="text-sm text-muted-foreground mb-1">Extreme Weight Loss</div>
                      <div className="text-lg font-bold text-foreground">{calorieGoals?.extremeLoss}</div>
                      <div className="text-xs text-muted-foreground">-1000 cal/day</div>
                    </div>
                    <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20 text-center">
                      <div className="text-sm text-muted-foreground mb-1">Weight Loss</div>
                      <div className="text-lg font-bold text-foreground">{calorieGoals?.weightLoss}</div>
                      <div className="text-xs text-muted-foreground">-500 cal/day</div>
                    </div>
                    <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20 text-center">
                      <div className="text-sm text-muted-foreground mb-1">Maintenance</div>
                      <div className="text-lg font-bold text-foreground">{calorieGoals?.maintenance}</div>
                      <div className="text-xs text-muted-foreground">Current weight</div>
                    </div>
                    <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20 text-center">
                      <div className="text-sm text-muted-foreground mb-1">Weight Gain</div>
                      <div className="text-lg font-bold text-foreground">{calorieGoals?.weightGain}</div>
                      <div className="text-xs text-muted-foreground">+500 cal/day</div>
                    </div>
                    <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20 text-center">
                      <div className="text-sm text-muted-foreground mb-1">Extreme Weight Gain</div>
                      <div className="text-lg font-bold text-foreground">{calorieGoals?.extremeGain}</div>
                      <div className="text-xs text-muted-foreground">+1000 cal/day</div>
                    </div>
                    <div className="bg-gray-500/10 p-3 rounded-lg border border-gray-500/20 text-center">
                      <div className="text-sm text-muted-foreground mb-1">Minimum Safe</div>
                      <div className="text-lg font-bold text-foreground">{result.bmr}</div>
                      <div className="text-xs text-muted-foreground">BMR (do not go below)</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}

          {/* Information Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6"
          >
            {/* BMR Explanation Card */}
            <div className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-foreground mb-4">Understanding BMR & TDEE</h3>
              <div className="space-y-4">
                <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                  <div className="text-sm font-medium text-foreground mb-1">⚡ Basal Metabolic Rate (BMR)</div>
                  <div className="text-sm text-muted-foreground">
                    The minimum calories your body needs to maintain basic functions while at complete rest. 
                    This includes breathing, circulation, cell production, and nutrient processing.
                  </div>
                </div>
                
                <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                  <div className="text-sm font-medium text-foreground mb-1">🔥 Total Daily Energy Expenditure (TDEE)</div>
                  <div className="text-sm text-muted-foreground">
                    Your BMR multiplied by an activity factor. This represents the total calories you burn 
                    in a day, including physical activity and exercise.
                  </div>
                </div>

                <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
                  <div className="text-sm font-medium text-foreground mb-1">🎯 How to Use These Numbers</div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>• <strong>Maintain weight:</strong> Eat at your TDEE level</div>
                    <div>• <strong>Lose weight:</strong> Eat 300-500 calories below TDEE</div>
                    <div>• <strong>Gain weight:</strong> Eat 300-500 calories above TDEE</div>
                    <div>• <strong>Important:</strong> Never eat below your BMR for extended periods</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Formula Comparison Card */}
            <div className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-foreground mb-4">BMR Formula Comparison</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-accent/10 rounded-lg">
                  <div className="text-sm font-medium text-foreground">Mifflin-St Jeor</div>
                  <div className="text-xs text-muted-foreground">Most accurate for general population</div>
                </div>
                <div className="flex justify-between items-center p-3 bg-secondary/20 rounded-lg">
                  <div className="text-sm font-medium text-foreground">Harris-Benedict</div>
                  <div className="text-xs text-muted-foreground">Original formula, slightly overestimates</div>
                </div>
                <div className="flex justify-between items-center p-3 bg-secondary/20 rounded-lg">
                  <div className="text-sm font-medium text-foreground">Katch-McArdle</div>
                  <div className="text-xs text-muted-foreground">Most accurate with body fat percentage</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}