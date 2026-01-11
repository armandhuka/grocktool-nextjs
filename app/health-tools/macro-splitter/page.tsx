'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Calculator, RotateCcw, ArrowLeft, Target, Scale, Apple, Beef, Wheat, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';

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

  // SEO Section Dropdown States
  const [openSections, setOpenSections] = useState({
    macronutrientConcept: true,
    calculationLogic: false,
    fitnessUses: false,
    examples: false,
    faq: false,
    disclaimer: false
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // FAQ Data
  const faqData = [
    {
      question: "What happens if I don't hit my macros exactly every day?",
      answer: "Don't stress about perfect numbers daily—consistency over weeks matters more than daily precision. Your body adapts to averages. If you're within 10-15% of your targets most days, you're doing fine. Focus more on protein and calorie totals, and let carbs and fats have some natural fluctuation based on your energy needs and food preferences."
    },
    {
      question: "Should I change my macro split on rest days versus workout days?",
      answer: "Many people find better results by slightly adjusting macros on different days. On training days, consider shifting 5-10% from fats to carbs for workout energy. On rest days, you might reduce carbs slightly and increase protein or fats. Listen to your body—some feel better with consistent ratios, while others thrive with variation."
    },
    {
      question: "How do I track macros when eating out or having meals I didn't prepare?",
      answer: "Restaurant meals are tricky but manageable. Estimate portions visually—a palm-sized piece of protein, a fist of carbs, a thumb of fats. Most chain restaurants provide nutrition info online. When in doubt, prioritize hitting your protein target and don't worry too much about the rest for that meal. One imperfect meal won't derail weeks of consistency."
    },
    {
      question: "What if I'm always hungry on my current macro split?",
      answer: "Hunger is a signal worth listening to. Try increasing protein by 5-10% and fiber-rich carbs like vegetables and whole grains. Sometimes adding 100-200 calories of healthy fats can increase satisfaction. If you're in a calorie deficit for weight loss, hunger is normal, but it shouldn't be debilitating. Consider a smaller deficit or refeed days if hunger becomes overwhelming."
    },
    {
      question: "How long until I see results from following a macro-based approach?",
      answer: "Physical changes take time—expect 4-8 weeks to notice body composition changes. Energy levels and workout performance often improve within 2-3 weeks. Take weekly progress photos and measurements rather than relying on daily scale weight, which fluctuates based on hydration, sodium, and other factors unrelated to fat loss or muscle gain."
    }
  ];

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
    <>
      <Head>
        <title>Macro Split Calculator | Find Optimal Macronutrient Ratios - GrockTool.com</title>
        <meta name="description" content="Calculate your perfect macronutrient split for weight loss, muscle gain, or maintenance. Get personalized protein, carb, and fat ratios based on your goals." />
        <meta name="keywords" content="macro split calculator, macronutrient calculator, macro ratios, protein carb fat calculator, macro counting, nutrition calculator, macro distribution, fitness nutrition" />
        <meta property="og:title" content="Macro Split Calculator | Find Optimal Macronutrient Ratios - GrockTool.com" />
        <meta property="og:description" content="Calculate your ideal protein, carbohydrate, and fat distribution for any fitness goal. Customize ratios or choose from presets for weight loss, muscle gain, keto, and more." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Macro Split Calculator - GrockTool.com" />
        <meta name="twitter:description" content="Calculate optimal macronutrient ratios for your fitness goals and calorie target." />
        <link rel="canonical" href="https://grocktool.com/health-tools/macro-splitter" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Macro Split Calculator",
            "applicationCategory": "HealthApplication",
            "operatingSystem": "Any",
            "description": "Free macro split calculator to determine optimal protein, carbohydrate, and fat ratios for weight loss, muscle gain, or maintenance",
            "url": "https://grocktool.com/health-tools/macro-splitter",
            "author": {
              "@type": "Organization",
              "name": "GrockTool.com",
              "url": "https://grocktool.com"
            },
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "Custom macro ratio calculation",
              "Preset splits for different goals",
              "Calorie estimation based on weight and activity",
              "Protein per kg body weight analysis",
              "Visual macro distribution chart",
              "Meal planning tips"
            ]
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqData.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })}
        </script>
      </Head>
      
      <div className="min-h-screen bg-background font-inter">
        <div className="pt-20 pb-8 px-4 sm:pt-24 sm:pb-12 sm:px-6 lg:pt-28">
          <div className="max-w-lg mx-auto lg:max-w-4xl">
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
              className="space-y-6 mb-8"
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

            {/* SEO Content Section with Dropdowns */}
            <section className="space-y-4">
              {/* Macronutrient Concept */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('macronutrientConcept')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h2 className="text-xl font-bold text-foreground">What Exactly Are Macronutrients?</h2>
                  {openSections.macronutrientConcept ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.macronutrientConcept && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      When people talk about "macros," they're referring to the three categories of nutrients that provide calories: protein, carbohydrates, and fats. Think of them as the fuel types your body runs on. Each plays distinct roles—protein builds and repairs, carbs provide quick energy, and fats support hormone function and nutrient absorption.
                    </p>
                    <p className="text-muted-foreground mb-4">
                      Here's something most calculators don't tell you: macronutrient quality matters just as much as quantity. A hundred grams of protein from chicken breast affects your body differently than the same amount from processed protein bars. The same goes for carbohydrates—slow-digesting whole grains versus refined sugars—and fats—avocado versus trans fats. Your body responds not just to how much you eat, but what forms those nutrients take.
                    </p>
                    <p className="text-muted-foreground">
                      The ratios between these three macronutrients create different physiological environments in your body. Higher protein tends to increase satiety and metabolic rate. Carbohydrate levels influence insulin response and workout performance. Fat intake affects hormone production and vitamin absorption. Finding your ideal balance depends on your individual metabolism, activity patterns, health goals, and even genetic predispositions.
                    </p>
                  </div>
                )}
              </article>

              {/* Calculation Logic */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('calculationLogic')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h2 className="text-xl font-bold text-foreground">How the Math Works Behind Macro Splits</h2>
                  {openSections.calculationLogic ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.calculationLogic && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      The calculation process might seem straightforward—percentages to grams using calorie conversions—but there's interesting science behind those numbers. Protein and carbohydrates contain about 4 calories per gram, while fat provides 9 calories per gram. This difference in energy density explains why fat percentages appear lower than protein or carb percentages even when they contribute similar calories.
                    </p>
                    <p className="text-muted-foreground mb-4">
                      Here's a practical example: If you choose a 30/40/30 split (protein/carbs/fat) on 2000 calories, protein gets 600 calories (150g), carbs get 800 calories (200g), and fat gets 600 calories (67g). Notice how fat grams are fewer despite equal calorie allocation? That's the 9-calorie-per-gram factor at work.
                    </p>
                    <p className="text-muted-foreground">
                      When you use our calculator, we're doing more than simple math. We're applying research-backed ratios that have shown effectiveness for specific goals. The weight loss preset, for instance, uses slightly higher protein (30%) than maintenance (25%) because multiple studies show increased protein preserves lean mass during calorie restriction. The muscle gain preset emphasizes carbohydrates because research demonstrates adequate carb intake supports training volume and muscle glycogen replenishment.
                    </p>
                  </div>
                )}
              </article>

              {/* Fitness Uses */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('fitnessUses')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h2 className="text-xl font-bold text-foreground">Real-World Fitness Applications</h2>
                  {openSections.fitnessUses ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.fitnessUses && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Beyond just hitting numbers, macro splitting becomes truly useful when applied to real training scenarios. Consider a typical week: Monday heavy leg day, Tuesday upper body, Wednesday active recovery, Thursday intense conditioning, Friday strength work, weekend rest. Each day places different demands on your body.
                    </p>
                    <p className="text-muted-foreground mb-4">
                      On heavy training days, you might deliberately consume more carbohydrates—especially around your workout—to fuel performance and kickstart recovery. On lighter or rest days, you could reduce carbs slightly and emphasize protein and healthy fats. This approach, sometimes called "carb cycling," matches fuel availability to actual energy expenditure.
                    </p>
                    <p className="text-muted-foreground">
                      Another practical application involves managing hunger and energy throughout the day. Many people find that front-loading protein at breakfast and lunch helps control appetite and provides steady energy. Distributing carbohydrates based on activity—more in meals before and after exercise, less in other meals—can prevent energy crashes. Fats, being slowly digested, often work well in meals where you need sustained fullness, like dinner.
                    </p>
                  </div>
                )}
              </article>

              {/* Examples */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('examples')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h2 className="text-xl font-bold text-foreground">How Different People Use Macro Splits</h2>
                  {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.examples && (
                  <div className="px-6 pb-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Maya: Marathon Runner in Training</h3>
                        <p className="text-muted-foreground mb-3">
                          Maya runs 50-70km weekly. Her maintenance calories are around 2800. She uses a 20/60/20 split during peak training—higher carbs for glycogen stores, moderate protein for recovery, controlled fats to avoid excess calories. On lighter weeks, she switches to 25/50/25. She times most carbs around runs and emphasizes protein post-workout.
                        </p>
                        <p className="text-muted-foreground text-sm">
                          <strong>Key takeaway:</strong> Endurance athletes often benefit from higher carb ratios, adjusted based on weekly mileage.
                        </p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">David: Office Worker Losing Weight</h3>
                        <p className="text-muted-foreground mb-3">
                          David sits most of the day but strength trains 3x weekly. At 90kg targeting 80kg, he uses 2200 calories with 35/35/30 split. The higher protein helps preserve muscle during deficit. He front-loads carbs around workouts (pre-workout banana, post-workout rice) and keeps other meals lower carb. This approach maintains energy for training while creating deficit.
                        </p>
                        <p className="text-muted-foreground text-sm">
                          <strong>Key takeaway:</strong> For weight loss with strength training, prioritize protein and time carbs around workouts.
                        </p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Sarah: Maintaining After Weight Loss</h3>
                        <p className="text-muted-foreground mb-3">
                          Sarah lost 15kg and now maintains at 65kg. She uses 2100 calories with 30/40/30 split. She found through trial that slightly higher protein (30% vs 25%) helps her feel fuller and prevents regain. She doesn't stress about daily perfection—if she goes over on carbs one day, she naturally eats less the next. Her focus is weekly averages, not daily perfection.
                        </p>
                        <p className="text-muted-foreground text-sm">
                          <strong>Key takeaway:</strong> Maintenance often requires individual adjustment—what worked for loss might need tweaking for long-term sustainability.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </article>

              {/* FAQ */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('faq')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h2 className="text-xl font-bold text-foreground">Common Macro Questions Answered</h2>
                  {openSections.faq ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.faq && (
                  <div className="px-6 pb-6">
                    <div className="space-y-6">
                      {faqData.map((faq, index) => (
                        <div key={index}>
                          <h3 className="text-lg font-semibold text-foreground mb-2">{faq.question}</h3>
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </article>

              {/* Disclaimer */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('disclaimer')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h2 className="text-xl font-bold text-foreground">Important Considerations</h2>
                  {openSections.disclaimer ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.disclaimer && (
                  <div className="px-6 pb-6">
                    <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20 mb-4">
                      <p className="text-muted-foreground">
                        This calculator provides general nutritional guidance based on population averages. Individual requirements vary significantly based on genetics, metabolic health, medical conditions, medications, lifestyle factors, and personal preferences.
                      </p>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Several important limitations apply to macro-based approaches:
                    </p>
                    <ul className="space-y-3 text-muted-foreground mb-4">
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        <span><strong>Micronutrients matter:</strong> Hitting macro targets doesn't guarantee adequate vitamins, minerals, or fiber intake</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        <span><strong>Food quality affects results:</strong> 100g of protein from whole foods differs physiologically from processed protein isolates</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        <span><strong>Timing can be relevant:</strong> Nutrient distribution throughout the day affects energy, performance, and recovery</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        <span><strong>Individual tolerance varies:</strong> Some thrive on higher fat, others on higher carbs—there's no universal best ratio</span>
                      </li>
                    </ul>
                    <p className="text-muted-foreground">
                      If you have underlying health conditions (diabetes, thyroid disorders, kidney issues, etc.), are pregnant or breastfeeding, take medications that affect metabolism or appetite, or have a history of disordered eating, please consult healthcare professionals before making significant dietary changes. Registered dietitians can provide personalized guidance that accounts for your complete health picture.
                    </p>
                  </div>
                )}
              </article>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}