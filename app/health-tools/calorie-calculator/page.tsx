'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Utensils, Calculator, RotateCcw, ArrowLeft, Target, Activity, TrendingUp, TrendingDown } from 'lucide-react';
import Link from 'next/link';

export default function CalorieCalculator() {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('male');
  const [activity, setActivity] = useState('sedentary');
  const [goal, setGoal] = useState('maintain');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [result, setResult] = useState<{ 
    bmr: number; 
    calories: number;
    goalCalories: number;
    protein: number;
    carbs: number;
    fat: number;
  } | null>(null);

  // Unit options
  const weightUnits = [
    { value: 'kg', label: 'kg' },
    { value: 'lbs', label: 'lbs' }
  ];

  const heightUnits = [
    { value: 'cm', label: 'cm' },
    { value: 'ft', label: 'feet' },
    { value: 'in', label: 'inches' }
  ];

  // Activity levels with descriptions
  const activityLevels = [
    { value: 'sedentary', label: 'Sedentary', description: 'Little or no exercise' },
    { value: 'light', label: 'Light', description: 'Light exercise 1-3 days/week' },
    { value: 'moderate', label: 'Moderate', description: 'Moderate exercise 3-5 days/week' },
    { value: 'very', label: 'Very Active', description: 'Hard exercise 6-7 days/week' },
    { value: 'extra', label: 'Extra Active', description: 'Very hard exercise, physical job' }
  ];

  // Weight goals
  const weightGoals = [
    { value: 'lose_fast', label: 'Lose Weight Fast', deficit: 1000 },
    { value: 'lose_moderate', label: 'Lose Weight', deficit: 500 },
    { value: 'maintain', label: 'Maintain Weight', deficit: 0 },
    { value: 'gain_moderate', label: 'Gain Weight', surplus: 500 },
    { value: 'gain_fast', label: 'Gain Weight Fast', surplus: 1000 }
  ];

  // Convert weight to kg
  const convertWeightToKg = (value: number, unit: string): number => {
    return unit === 'kg' ? value : value * 0.453592;
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

  const calculateCalories = () => {
    const a = parseFloat(age);
    const w = parseFloat(weight);
    const h = parseFloat(height);
    
    if (!a || !w || !h) return;
    
    // Convert to metric units
    const weightInKg = convertWeightToKg(w, weightUnit);
    const heightInCm = convertHeightToCm(h, heightUnit);
    
    // Harris-Benedict Equation
    let bmr: number;
    if (gender === 'male') {
      bmr = 88.362 + (13.397 * weightInKg) + (4.799 * heightInCm) - (5.677 * a);
    } else {
      bmr = 447.593 + (9.247 * weightInKg) + (3.098 * heightInCm) - (4.330 * a);
    }
    
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      very: 1.725,
      extra: 1.9
    };
    
    const maintenanceCalories = bmr * activityMultipliers[activity as keyof typeof activityMultipliers];
    
    // Calculate goal calories
    const selectedGoal = weightGoals.find(g => g.value === goal);
    let goalCalories = maintenanceCalories;
    
    if (selectedGoal) {
      if ('deficit' in selectedGoal) {
        goalCalories = maintenanceCalories - selectedGoal.deficit;
      } else if ('surplus' in selectedGoal) {
        goalCalories = maintenanceCalories + selectedGoal.surplus;
      }
    }
    
    // Macronutrient calculation (40% carbs, 30% protein, 30% fat)
    const protein = (goalCalories * 0.3) / 4; // 4 calories per gram
    const carbs = (goalCalories * 0.4) / 4;   // 4 calories per gram
    const fat = (goalCalories * 0.3) / 9;     // 9 calories per gram
    
    setResult({ 
      bmr: Math.round(bmr), 
      calories: Math.round(maintenanceCalories),
      goalCalories: Math.round(goalCalories),
      protein: Math.round(protein),
      carbs: Math.round(carbs),
      fat: Math.round(fat)
    });
  };

  const reset = () => {
    setAge('');
    setWeight('');
    setHeight('');
    setGender('male');
    setActivity('sedentary');
    setGoal('maintain');
    setWeightUnit('kg');
    setHeightUnit('cm');
    setResult(null);
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
                Calorie Calculator
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Calculate your daily calorie needs and macronutrient targets
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
                  <Utensils size={20} className="text-foreground" />
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
                      min="15"
                      max="100"
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
                    Weight
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="e.g., 70"
                      className="flex-1 p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg"
                      step="any"
                      min="0"
                    />
                    <select
                      value={weightUnit}
                      onChange={(e) => setWeightUnit(e.target.value)}
                      className="w-20 p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center"
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
                      placeholder="e.g., 170"
                      className="flex-1 p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg"
                      step="any"
                      min="0"
                    />
                    <select
                      value={heightUnit}
                      onChange={(e) => setHeightUnit(e.target.value)}
                      className="w-20 p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center"
                    >
                      {heightUnits.map((unit) => (
                        <option key={unit.value} value={unit.value}>
                          {unit.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Activity Level */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Activity size={20} className="text-foreground" />
                  <label className="block text-sm font-medium text-foreground">
                    Activity Level
                  </label>
                </div>
                
                <div className="grid grid-cols-1 gap-2">
                  {activityLevels.map((level) => (
                    <button
                      key={level.value}
                      onClick={() => setActivity(level.value)}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        activity === level.value 
                          ? 'bg-accent text-accent-foreground border-accent' 
                          : 'bg-secondary text-secondary-foreground border-border hover:bg-secondary/80'
                      }`}
                    >
                      <div className="text-sm font-medium">{level.label}</div>
                      <div className="text-xs opacity-80">{level.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Weight Goal */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Target size={20} className="text-foreground" />
                  <label className="block text-sm font-medium text-foreground">
                    Weight Goal
                  </label>
                </div>
                
                <div className="grid grid-cols-1 gap-2">
                  {weightGoals.map((goalItem) => (
                    <button
                      key={goalItem.value}
                      onClick={() => setGoal(goalItem.value)}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        goal === goalItem.value 
                          ? 'bg-accent text-accent-foreground border-accent' 
                          : 'bg-secondary text-secondary-foreground border-border hover:bg-secondary/80'
                      }`}
                    >
                      <div className="text-sm font-medium">{goalItem.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={calculateCalories}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent text-accent-foreground rounded-lg sm:rounded-xl hover:bg-accent/80 transition-colors text-sm sm:text-base"
                >
                  <Calculator size={16} className="sm:w-4 sm:h-4" />
                  Calculate Calories
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
                {/* Main Results */}
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-2">Daily Calorie Target</div>
                  <div className="text-4xl font-bold text-foreground mb-2">
                    {result.goalCalories} calories
                  </div>
                  <div className="text-sm text-muted-foreground">
                    For {weightGoals.find(g => g.value === goal)?.label.toLowerCase()}
                  </div>
                </div>

                {/* BMR and Maintenance */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20 text-center">
                    <div className="text-sm text-muted-foreground mb-1">BMR</div>
                    <div className="text-xl font-bold text-foreground">{result.bmr} calories</div>
                    <div className="text-xs text-muted-foreground mt-1">Basal Metabolic Rate</div>
                  </div>
                  <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20 text-center">
                    <div className="text-sm text-muted-foreground mb-1">Maintenance</div>
                    <div className="text-xl font-bold text-foreground">{result.calories} calories</div>
                    <div className="text-xs text-muted-foreground mt-1">To maintain weight</div>
                  </div>
                </div>

                {/* Macronutrients */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-foreground">Daily Macronutrient Targets:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20 text-center">
                      <div className="text-sm text-muted-foreground mb-1">Protein</div>
                      <div className="text-lg font-bold text-foreground">{result.protein}g</div>
                    </div>
                    <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20 text-center">
                      <div className="text-sm text-muted-foreground mb-1">Carbs</div>
                      <div className="text-lg font-bold text-foreground">{result.carbs}g</div>
                    </div>
                    <div className="bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/20 text-center">
                      <div className="text-sm text-muted-foreground mb-1">Fat</div>
                      <div className="text-lg font-bold text-foreground">{result.fat}g</div>
                    </div>
                  </div>
                </div>

                {/* All Goals Comparison */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-foreground">All Weight Goals:</h4>
                  <div className="space-y-2">
                    {weightGoals.map((goalItem) => {
                      let goalCalories = result.calories;
                      if ('deficit' in goalItem) {
                        goalCalories = result.calories - goalItem.deficit;
                      } else if ('surplus' in goalItem) {
                        goalCalories = result.calories + goalItem.surplus;
                      }
                      
                      return (
                        <div 
                          key={goalItem.value}
                          className={`flex justify-between items-center p-3 rounded-lg border ${
                            goal === goalItem.value 
                              ? 'bg-accent/20 border-accent' 
                              : 'bg-secondary/20 border-border'
                          }`}
                        >
                          <span className="text-sm font-medium text-foreground">{goalItem.label}</span>
                          <span className="text-sm font-bold text-foreground">{Math.round(goalCalories)} cal</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
          >
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">How Calorie Calculation Works</h3>
            <div className="space-y-2 text-muted-foreground text-sm">
              <p>
                This calculator uses the Harris-Benedict Equation to estimate your Basal Metabolic Rate (BMR), 
                then adjusts it based on your activity level and weight goals to provide personalized calorie targets.
              </p>
              <div className="text-xs sm:text-sm space-y-1 pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Enter your personal details including age, gender, weight, and height</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Select your activity level and weight goal</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Click "Calculate Calories" to get your personalized targets</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>View your BMR, maintenance calories, and goal calories</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Get macronutrient breakdown for optimal nutrition</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Key Terms:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>BMR (Basal Metabolic Rate):</strong> Calories burned at complete rest</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>TDEE (Total Daily Energy Expenditure):</strong> BMR × Activity Multiplier</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Calorie Deficit:</strong> Eating fewer calories than TDEE to lose weight</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Calorie Surplus:</strong> Eating more calories than TDEE to gain weight</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Macronutrient Ratios:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                  <span><strong>Protein (30%):</strong> {result?.protein}g - Muscle repair and growth</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                  <span><strong>Carbohydrates (40%):</strong> {result?.carbs}g - Energy and fuel</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-yellow-500 rounded-full"></div>
                  <span><strong>Fat (30%):</strong> {result?.fat}g - Hormone production and energy</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Important Notes:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
                  <span>These are estimates - individual needs may vary</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
                  <span>Consult healthcare professionals for personalized advice</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
                  <span>Adjust based on progress and how your body responds</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
                  <span>Focus on nutrient-dense foods and balanced nutrition</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}