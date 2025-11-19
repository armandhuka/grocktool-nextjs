'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Calculator, RotateCcw, ArrowLeft, Target, Scale, Apple, Beef, Wheat } from 'lucide-react';
import Link from 'next/link';

export default function MacroSplitter() {
  const [calories, setCalories] = useState('');
  const [proteinPercent, setProteinPercent] = useState('25');
  const [carbPercent, setCarbPercent] = useState('45');
  const [fatPercent, setFatPercent] = useState('30');
  const [goal, setGoal] = useState('maintain');
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('moderate');
  const [result, setResult] = useState<{
    protein: { grams: number; calories: number };
    carbs: { grams: number; calories: number };
    fats: { grams: number; calories: number };
    total: number;
    proteinPerKg: number;
  } | null>(null);

  // Preset macro splits
  const presetSplits = {
    maintain: { protein: 25, carbs: 45, fats: 30, label: 'Weight Maintenance', description: 'Balanced approach for maintaining current weight' },
    lose: { protein: 30, carbs: 35, fats: 35, label: 'Weight Loss', description: 'Higher protein to preserve muscle while losing fat' },
    gain: { protein: 25, carbs: 50, fats: 25, label: 'Muscle Gain', description: 'Higher carbs for energy and muscle growth' },
    keto: { protein: 25, carbs: 5, fats: 70, label: 'Ketogenic', description: 'Very low carb, high fat for ketosis' },
    lowcarb: { protein: 30, carbs: 20, fats: 50, label: 'Low Carb', description: 'Moderate carb reduction for fat loss' },
    balanced: { protein: 20, carbs: 50, fats: 30, label: 'Balanced', description: 'Standard balanced macronutrient ratio' },
    highprotein: { protein: 40, carbs: 30, fats: 30, label: 'High Protein', description: 'Maximize muscle protein synthesis' }
  };

  // Activity levels for calorie estimation
  const activityLevels = [
    { value: 'sedentary', label: 'Sedentary', multiplier: 1.2 },
    { value: 'light', label: 'Light Activity', multiplier: 1.375 },
    { value: 'moderate', label: 'Moderate Activity', multiplier: 1.55 },
    { value: 'active', label: 'Active', multiplier: 1.725 },
    { value: 'veryactive', label: 'Very Active', multiplier: 1.9 }
  ];

  const applyPreset = (presetGoal: string) => {
    const preset = presetSplits[presetGoal as keyof typeof presetSplits];
    setProteinPercent(preset.protein.toString());
    setCarbPercent(preset.carbs.toString());
    setFatPercent(preset.fats.toString());
    setGoal(presetGoal);
  };

  // Estimate calories based on weight and activity level
  const estimateCalories = () => {
    const weightNum = parseFloat(weight);
    if (!weightNum) return;

    const activity = activityLevels.find(a => a.value === activityLevel);
    if (!activity) return;

    // Simple calorie estimation: 30-40 calories per kg based on activity
    const baseCalories = weightNum * 30;
    const estimatedCalories = baseCalories * activity.multiplier;
    
    setCalories(Math.round(estimatedCalories).toString());
  };

  const calculateMacros = () => {
    const totalCalories = parseFloat(calories);
    const proteinPct = parseFloat(proteinPercent);
    const carbPct = parseFloat(carbPercent);
    const fatPct = parseFloat(fatPercent);
    
    if (!totalCalories || proteinPct + carbPct + fatPct !== 100) return;
    
    const proteinCalories = (totalCalories * proteinPct) / 100;
    const carbCalories = (totalCalories * carbPct) / 100;
    const fatCalories = (totalCalories * fatPct) / 100;
    
    // Macronutrient calories per gram: Protein=4, Carbs=4, Fat=9
    const proteinGrams = proteinCalories / 4;
    const carbGrams = carbCalories / 4;
    const fatGrams = fatCalories / 9;

    const weightNum = parseFloat(weight);
    const proteinPerKg = weightNum ? proteinGrams / weightNum : 0;
    
    setResult({
      protein: { 
        grams: Math.round(proteinGrams * 10) / 10, 
        calories: Math.round(proteinCalories) 
      },
      carbs: { 
        grams: Math.round(carbGrams * 10) / 10, 
        calories: Math.round(carbCalories) 
      },
      fats: { 
        grams: Math.round(fatGrams * 10) / 10, 
        calories: Math.round(fatCalories) 
      },
      total: totalCalories,
      proteinPerKg: Math.round(proteinPerKg * 100) / 100
    });
  };

  const reset = () => {
    setCalories('');
    setProteinPercent('25');
    setCarbPercent('45');
    setFatPercent('30');
    setGoal('maintain');
    setWeight('');
    setActivityLevel('moderate');
    setResult(null);
  };

  const totalPercent = parseFloat(proteinPercent || '0') + parseFloat(carbPercent || '0') + parseFloat(fatPercent || '0');

  // Macro distribution visualization data
  const macroData = [
    { name: 'Protein', value: parseFloat(proteinPercent), color: 'bg-red-500' },
    { name: 'Carbs', value: parseFloat(carbPercent), color: 'bg-blue-500' },
    { name: 'Fats', value: parseFloat(fatPercent), color: 'bg-yellow-500' }
  ];

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
                Macro Split Calculator
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Calculate optimal macronutrient distribution from your total daily calories
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
              {/* Calorie Input Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Target size={20} className="text-blue-500" />
                  <label className="block text-sm font-medium text-foreground">
                    Daily Calorie Target
                  </label>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">
                    Total Daily Calories
                  </label>
                  <input
                    type="number"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    placeholder="e.g., 2000"
                    className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg"
                    min="0"
                  />
                </div>

                {/* Calorie Estimation Helper */}
                <div className="bg-secondary/20 p-3 rounded-lg">
                  <div className="text-sm font-medium text-foreground mb-2">Not sure about calories?</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <label className="block text-xs font-medium text-foreground">
                        Your Weight (kg)
                      </label>
                      <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="e.g., 70"
                        className="w-full p-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-sm"
                        min="0"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-medium text-foreground">
                        Activity Level
                      </label>
                      <select
                        value={activityLevel}
                        onChange={(e) => setActivityLevel(e.target.value)}
                        className="w-full p-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-sm"
                      >
                        {activityLevels.map((level) => (
                          <option key={level.value} value={level.value}>
                            {level.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <button
                    onClick={estimateCalories}
                    className="w-full mt-2 px-3 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/80 transition-colors text-xs"
                  >
                    Estimate Calories
                  </button>
                </div>
              </div>

              {/* Preset Goals */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Preset Macro Goals
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {Object.entries(presetSplits).map(([key, preset]) => (
                    <button
                      key={key}
                      onClick={() => applyPreset(key)}
                      className={`p-2 rounded-lg border text-center transition-all text-xs ${
                        goal === key 
                          ? 'bg-accent text-accent-foreground border-accent' 
                          : 'bg-secondary text-secondary-foreground border-border hover:bg-secondary/80'
                      }`}
                    >
                      <div className="font-medium">{preset.label}</div>
                    </button>
                  ))}
                </div>
                {presetSplits[goal as keyof typeof presetSplits] && (
                  <div className="text-xs text-muted-foreground">
                    {presetSplits[goal as keyof typeof presetSplits].description}
                  </div>
                )}
              </div>

              {/* Custom Macro Sliders */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <PieChart size={16} className="text-blue-500" />
                  <label className="block text-sm font-medium text-foreground">
                    Custom Macro Split
                  </label>
                </div>

                {/* Macro Distribution Visualization */}
                <div className="flex h-4 bg-secondary rounded-full overflow-hidden">
                  {macroData.map((macro, index) => (
                    <div
                      key={macro.name}
                      className={`${macro.color} transition-all duration-300`}
                      style={{ width: `${macro.value}%` }}
                      title={`${macro.name}: ${macro.value}%`}
                    />
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      Protein (%)
                    </label>
                    <input
                      type="number"
                      value={proteinPercent}
                      onChange={(e) => setProteinPercent(e.target.value)}
                      className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg"
                      min="0"
                      max="100"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      Carbs (%)
                    </label>
                    <input
                      type="number"
                      value={carbPercent}
                      onChange={(e) => setCarbPercent(e.target.value)}
                      className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg"
                      min="0"
                      max="100"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      Fats (%)
                    </label>
                    <input
                      type="number"
                      value={fatPercent}
                      onChange={(e) => setFatPercent(e.target.value)}
                      className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg"
                      min="0"
                      max="100"
                    />
                  </div>
                </div>

                <div className={`text-sm text-center p-2 rounded-lg ${
                  totalPercent === 100 ? 'bg-green-500/10 text-green-600 border border-green-500/20' : 'bg-red-500/10 text-red-600 border border-red-500/20'
                }`}>
                  Total: {totalPercent.toFixed(1)}% {totalPercent !== 100 && '(Must equal 100%)'}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={calculateMacros}
                  disabled={totalPercent !== 100 || !calories}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent text-accent-foreground rounded-lg sm:rounded-xl hover:bg-accent/80 transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Calculator size={16} className="sm:w-4 sm:h-4" />
                  Calculate Macros
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
                {/* Total Calories */}
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-2">Total Daily Calories</div>
                  <div className="text-4xl font-bold text-foreground mb-2">
                    {result.total}
                  </div>
                  <div className="text-lg text-muted-foreground">
                    {presetSplits[goal as keyof typeof presetSplits]?.label}
                  </div>
                </div>

                {/* Macro Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Beef size={16} className="text-red-500" />
                      <div className="text-sm font-medium text-foreground">Protein</div>
                    </div>
                    <div className="text-2xl font-bold text-foreground mb-1">{result.protein.grams}g</div>
                    <div className="text-sm text-muted-foreground">{result.protein.calories} calories</div>
                    <div className="text-xs text-red-500 mt-1">{proteinPercent}% • {result.proteinPerKg}g/kg</div>
                  </div>

                  <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Wheat size={16} className="text-blue-500" />
                      <div className="text-sm font-medium text-foreground">Carbohydrates</div>
                    </div>
                    <div className="text-2xl font-bold text-foreground mb-1">{result.carbs.grams}g</div>
                    <div className="text-sm text-muted-foreground">{result.carbs.calories} calories</div>
                    <div className="text-xs text-blue-500 mt-1">{carbPercent}%</div>
                  </div>

                  <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Apple size={16} className="text-yellow-500" />
                      <div className="text-sm font-medium text-foreground">Fats</div>
                    </div>
                    <div className="text-2xl font-bold text-foreground mb-1">{result.fats.grams}g</div>
                    <div className="text-sm text-muted-foreground">{result.fats.calories} calories</div>
                    <div className="text-xs text-yellow-500 mt-1">{fatPercent}%</div>
                  </div>
                </div>

                {/* Protein Analysis */}
                {result.proteinPerKg > 0 && (
                  <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                    <div className="text-sm font-medium text-foreground mb-1">💪 Protein Analysis</div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>• Current: {result.proteinPerKg}g per kg body weight</div>
                      <div>• General recommendation: 1.6-2.2g/kg for muscle building</div>
                      <div>• Maintenance: 1.2-1.6g/kg</div>
                    </div>
                  </div>
                )}

                {/* Meal Planning Tips */}
                <div className="bg-muted p-4 rounded-lg">
                  <div className="text-sm font-medium text-foreground mb-2">📝 Meal Planning Tips:</div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>• Spread protein intake across 3-4 meals daily</div>
                    <div>• Include fiber-rich carbohydrates for sustained energy</div>
                    <div>• Choose healthy fats like avocado, nuts, and olive oil</div>
                    <div>• Track your intake using a food diary app</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Information Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Macronutrient Guide */}
            <div className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-foreground mb-4">Understanding Macronutrients</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                  <div className="text-sm font-medium text-foreground mb-2">🥩 Protein (4 cal/g)</div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>• Builds and repairs tissues</div>
                    <div>• Supports muscle growth</div>
                    <div>• Boosts metabolism</div>
                    <div className="text-xs mt-2 font-medium">Sources: Meat, fish, eggs, dairy, legumes</div>
                  </div>
                </div>
                
                <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                  <div className="text-sm font-medium text-foreground mb-2">🌾 Carbohydrates (4 cal/g)</div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>• Primary energy source</div>
                    <div>• Fuels brain and muscles</div>
                    <div>• Supports digestion</div>
                    <div className="text-xs mt-2 font-medium">Sources: Grains, fruits, vegetables, legumes</div>
                  </div>
                </div>

                <div className="bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/20">
                  <div className="text-sm font-medium text-foreground mb-2">🥑 Fats (9 cal/g)</div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>• Hormone production</div>
                    <div>• Nutrient absorption</div>
                    <div>• Brain health</div>
                    <div className="text-xs mt-2 font-medium">Sources: Oils, nuts, seeds, avocado, fatty fish</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Preset Explanations */}
            <div className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-foreground mb-4">Macro Split Strategies</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-medium text-foreground mb-1">Weight Loss (30/35/35)</div>
                  <div className="text-muted-foreground">Higher protein to preserve muscle, moderate carbs and fats for sustainable energy.</div>
                </div>
                <div>
                  <div className="font-medium text-foreground mb-1">Muscle Gain (25/50/25)</div>
                  <div className="text-muted-foreground">Higher carbs for training energy and recovery, adequate protein for growth.</div>
                </div>
                <div>
                  <div className="font-medium text-foreground mb-1">Ketogenic (25/5/70)</div>
                  <div className="text-muted-foreground">Very low carb to induce ketosis, high fat for energy, moderate protein.</div>
                </div>
                <div>
                  <div className="font-medium text-foreground mb-1">Balanced (20/50/30)</div>
                  <div className="text-muted-foreground">Standard ratio suitable for most people maintaining weight and general health.</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}