'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Utensils, Calculator, RotateCcw, ArrowLeft, Target, Activity } from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';

// ===============================
//   PROPER TYPES ADDED HERE ✔
// ===============================

// Weight goal type (deficit OR surplus)
type WeightGoal =
  | { value: string; label: string; deficit: number }
  | { value: string; label: string; surplus: number };

// Result type (for setResult)
interface ResultData {
  bmr: number;
  calories: number;
  goalCalories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export default function CalorieCalculator() {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('male');
  const [activity, setActivity] = useState('sedentary');
  const [goal, setGoal] = useState('maintain');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [result, setResult] = useState<ResultData | null>(null);

  // ===============================
  //   UNIT OPTIONS
  // ===============================

  const weightUnits = [
    { value: 'kg', label: 'kg' },
    { value: 'lbs', label: 'lbs' }
  ];

  const heightUnits = [
    { value: 'cm', label: 'cm' },
    { value: 'ft', label: 'feet' },
    { value: 'in', label: 'inches' }
  ];

  // ===============================
  //   ACTIVITY LEVELS
  // ===============================

  const activityLevels = [
    { value: 'sedentary', label: 'Sedentary', description: 'Little or no exercise' },
    { value: 'light', label: 'Light', description: 'Light exercise 1-3 days/week' },
    { value: 'moderate', label: 'Moderate', description: 'Moderate exercise 3-5 days/week' },
    { value: 'very', label: 'Very Active', description: 'Hard exercise 6-7 days/week' },
    { value: 'extra', label: 'Extra Active', description: 'Very hard exercise, physical job' }
  ];

  // ===============================
  //   WEIGHT GOALS (WITH TYPE)
  // ===============================

  const weightGoals: WeightGoal[] = [
    { value: 'lose_fast', label: 'Lose Weight Fast', deficit: 1000 },
    { value: 'lose_moderate', label: 'Lose Weight', deficit: 500 },
    { value: 'maintain', label: 'Maintain Weight', deficit: 0 },
    { value: 'gain_moderate', label: 'Gain Weight', surplus: 500 },
    { value: 'gain_fast', label: 'Gain Weight Fast', surplus: 1000 }
  ];

  // ===============================
  //   UNIT CONVERSIONS
  // ===============================

  const convertWeightToKg = (value: number, unit: string): number =>
    unit === 'kg' ? value : value * 0.453592;

  const convertHeightToCm = (value: number, unit: string): number => {
    switch (unit) {
      case 'cm': return value;
      case 'ft': return value * 30.48;
      case 'in': return value * 2.54;
      default: return value;
    }
  };

  // ===============================
  //   CALCULATE CALORIES (FIXED) ✔
  // ===============================

  const calculateCalories = () => {
    const a = parseFloat(age);
    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (!a || !w || !h) return;

    const weightInKg = convertWeightToKg(w, weightUnit);
    const heightInCm = convertHeightToCm(h, heightUnit);

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

    const maintenanceCalories =
      bmr * activityMultipliers[activity as keyof typeof activityMultipliers];

    const selectedGoal = weightGoals.find(g => g.value === goal);

    let goalCalories = maintenanceCalories;

    // FIXED ✔ Type-safe goal calories calculation
    if (selectedGoal) {
      if ("deficit" in selectedGoal) {
        goalCalories = maintenanceCalories - selectedGoal.deficit;
      } else if ("surplus" in selectedGoal) {
        goalCalories = maintenanceCalories + selectedGoal.surplus;
      }
    }

    const protein = (goalCalories * 0.3) / 4;
    const carbs = (goalCalories * 0.4) / 4;
    const fat = (goalCalories * 0.3) / 9;

    setResult({
      bmr: Math.round(bmr),
      calories: Math.round(maintenanceCalories),
      goalCalories: Math.round(goalCalories),
      protein: Math.round(protein),
      carbs: Math.round(carbs),
      fat: Math.round(fat)
    });
  };

  // ===============================
  //   RESET FORM
  // ===============================

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

  // ===============================
  //   UI STARTS HERE
  // ===============================

  return (
    <>
      <Head>
        <title>Free Calorie Calculator | Daily Calorie & Macro Needs - GrockTool.com</title>
        <meta name="description" content="Calculate your daily calorie needs, BMR, and macronutrient targets with our free calorie calculator. Perfect for weight loss, maintenance, or muscle gain. Get personalized results instantly." />
        <meta name="keywords" content="calorie calculator, daily calorie calculator, BMR calculator, macro calculator, weight loss calculator, calorie intake calculator, maintenance calories, TDEE calculator, calorie deficit calculator, calorie surplus calculator" />
        <meta property="og:title" content="Free Calorie Calculator | Daily Calorie & Macro Needs - GrockTool.com" />
        <meta property="og:description" content="Calculate your exact daily calorie needs and macronutrient targets for weight loss, maintenance, or muscle gain." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Calorie Calculator - GrockTool.com" />
        <meta name="twitter:description" content="Calculate your daily calorie needs and macros for any fitness goal." />
        <link rel="canonical" href="https://grocktool.com/tools/calorie-calculator" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Calorie Calculator",
            "applicationCategory": "HealthApplication",
            "operatingSystem": "Any",
            "description": "Free calorie calculator to calculate daily calorie needs, BMR, and macronutrient targets for weight loss, maintenance, or muscle gain",
            "url": "https://grocktool.com/tools/calorie-calculator",
            "author": {
              "@type": "Organization",
              "name": "GrockTool.com",
              "url": "https://grocktool.com"
            },
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })}
        </script>
      </Head>

      <div className="min-h-screen bg-background font-inter">
        <div className="pt-20 pb-8 px-4 sm:pt-24 sm:pb-12 sm:px-6 lg:pt-28">
          <div className="max-w-lg mx-auto lg:max-w-4xl">

            {/* Back Button */}
            <div className="mb-8 sm:mb-10">
              <Link
                href="/tool"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors group text-sm sm:text-base"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Back to All Tools
              </Link>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                  Free Calorie Calculator
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Free, fast, and personalized calorie calculator — no signup required.
                  Instantly calculate your daily calorie needs and macronutrient targets.
                </p>

              </motion.div>
            </div>

            {/* ============================
                MAIN CALCULATOR CARD
            ============================ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card rounded-xl border border-border p-4 sm:p-6 mb-6 shadow-sm"
            >
              <div className="space-y-6">

                {/* Age + Gender */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Utensils size={20} className="text-foreground" />
                    <label className="block text-sm font-medium text-foreground">
                      Personal Details
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Age */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">
                        Age (years)
                      </label>
                      <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="e.g., 25"
                        className="w-full p-3 bg-input border border-border rounded-lg text-center text-lg"
                      />
                    </div>

                    {/* Gender */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">
                        Gender
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setGender('male')}
                          className={`p-3 rounded-lg border transition ${gender === 'male'
                            ? 'bg-accent text-accent-foreground border-accent'
                            : 'bg-secondary border-border'
                            }`}
                        >
                          Male
                        </button>
                        <button
                          onClick={() => setGender('female')}
                          className={`p-3 rounded-lg border transition ${gender === 'female'
                            ? 'bg-accent text-accent-foreground border-accent'
                            : 'bg-secondary border-border'
                            }`}
                        >
                          Female
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Weight */}
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
                        className="flex-1 p-3 bg-input border border-border rounded-lg text-center text-lg"
                      />
                      <select
                        value={weightUnit}
                        onChange={(e) => setWeightUnit(e.target.value)}
                        className="w-20 p-3 bg-input border border-border rounded-lg"
                      >
                        {weightUnits.map((u) => (
                          <option key={u.value} value={u.value}>{u.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Height */}
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
                        className="flex-1 p-3 bg-input border border-border rounded-lg text-center text-lg"
                      />
                      <select
                        value={heightUnit}
                        onChange={(e) => setHeightUnit(e.target.value)}
                        className="w-20 p-3 bg-input border border-border rounded-lg"
                      >
                        {heightUnits.map((u) => (
                          <option key={u.value} value={u.value}>{u.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* ============================
                    ACTIVITY LEVEL
                ============================ */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Activity size={20} className="text-foreground" />
                    <label className="block text-sm font-medium text-foreground">
                      Activity Level
                    </label>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    {activityLevels.map((lvl) => (
                      <button
                        key={lvl.value}
                        onClick={() => setActivity(lvl.value)}
                        className={`p-3 rounded-lg border text-left transition ${activity === lvl.value
                          ? 'bg-accent text-accent-foreground border-accent'
                          : 'bg-secondary border-border'
                          }`}
                      >
                        <div className="text-sm font-medium">{lvl.label}</div>
                        <div className="text-xs opacity-80">{lvl.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* ============================
                    WEIGHT GOAL
                ============================ */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Target size={20} className="text-foreground" />
                    <label className="block text-sm font-medium text-foreground">
                      Weight Goal
                    </label>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    {weightGoals.map((g) => (
                      <button
                        key={g.value}
                        onClick={() => setGoal(g.value)}
                        className={`p-3 rounded-lg border text-left transition ${goal === g.value
                          ? 'bg-accent text-accent-foreground border-accent'
                          : 'bg-secondary border-border'
                          }`}
                      >
                        <div className="text-sm font-medium">{g.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={calculateCalories}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/80"
                  >
                    <Calculator size={16} />
                    Calculate Calories
                  </button>

                  <button
                    onClick={reset}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80"
                  >
                    <RotateCcw size={16} />
                    Clear All
                  </button>
                </div>

              </div>
            </motion.div>

            {/* ============================
                RESULT CARD
            ============================ */}
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-card rounded-xl border border-border p-4 sm:p-6 mb-6 shadow-sm"
              >
                <div className="space-y-6">

                  {/* Main Result */}
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground mb-2">Daily Calorie Target</div>
                    <div className="text-4xl font-bold">{result.goalCalories} calories</div>
                  </div>

                  {/* BMR + Maintenance */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-500/10 rounded-lg text-center border border-blue-500/20">
                      <div className="text-sm mb-1">BMR</div>
                      <div className="text-xl font-bold">{result.bmr} cal</div>
                    </div>
                    <div className="p-4 bg-green-500/10 rounded-lg text-center border border-green-500/20">
                      <div className="text-sm mb-1">Maintenance</div>
                      <div className="text-xl font-bold">{result.calories} cal</div>
                    </div>
                  </div>

                  {/* Macros */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg text-center">
                      <div className="text-sm">Protein</div>
                      <div className="text-lg font-bold">{result.protein}g</div>
                    </div>
                    <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg text-center">
                      <div className="text-sm">Carbs</div>
                      <div className="text-lg font-bold">{result.carbs}g</div>
                    </div>
                    <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-center">
                      <div className="text-sm">Fat</div>
                      <div className="text-lg font-bold">{result.fat}g</div>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

            {/* ============================
                MACRONUTRIENT INFO CARD
            ============================ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card rounded-xl border border-border p-4 sm:p-6 mb-6 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-foreground mb-4">Understanding Your Macros</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                    <div className="text-sm font-medium text-foreground mb-1">Protein (30%)</div>
                    <div className="text-xs text-muted-foreground">Builds & repairs muscle, 4 calories/gram</div>
                  </div>
                  <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                    <div className="text-sm font-medium text-foreground mb-1">Carbs (40%)</div>
                    <div className="text-xs text-muted-foreground">Primary energy source, 4 calories/gram</div>
                  </div>
                  <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <div className="text-sm font-medium text-foreground mb-1">Fat (30%)</div>
                    <div className="text-xs text-muted-foreground">Hormone production, 9 calories/gram</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ============================
                ACTIVITY MULTIPLIERS CARD
            ============================ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-card rounded-xl border border-border p-4 sm:p-6 mb-8 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-foreground mb-4">Activity Level Multipliers</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-secondary/20 rounded-lg">
                  <span className="text-sm font-medium text-foreground">Sedentary</span>
                  <span className="text-sm font-bold">× 1.2</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-secondary/20 rounded-lg">
                  <span className="text-sm font-medium text-foreground">Lightly Active</span>
                  <span className="text-sm font-bold">× 1.375</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-secondary/20 rounded-lg">
                  <span className="text-sm font-medium text-foreground">Moderately Active</span>
                  <span className="text-sm font-bold">× 1.55</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-secondary/20 rounded-lg">
                  <span className="text-sm font-medium text-foreground">Very Active</span>
                  <span className="text-sm font-bold">× 1.725</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-secondary/20 rounded-lg">
                  <span className="text-sm font-medium text-foreground">Extra Active</span>
                  <span className="text-sm font-bold">× 1.9</span>
                </div>
              </div>
            </motion.div>

            {/* ============================
                SEO CONTENT SECTION
            ============================ */}
            <section className="space-y-8">
              {/* What This Tool Does */}
              <article className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <h2 className="text-xl font-bold text-foreground mb-4">Free Calorie Calculator - What It Does</h2>
                <p className="text-muted-foreground mb-4">
                  This free tool helps you calculate your daily calorie needs using the
                  scientifically validated Harris-Benedict equation. It estimates your
                  Basal Metabolic Rate (BMR) and applies activity multipliers to determine
                  how many calories your body needs each day.
                </p>

                <p className="text-muted-foreground">
                  Based on your goal—weight loss, maintenance, or muscle gain—the calculator
                  also provides a clear macronutrient breakdown for protein, carbohydrates,
                  and fats. You get accurate, personalized results without manual math,
                  making it easy to plan meals and track progress.
                </p>

              </article>

              {/* Use Cases */}
              <article className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <h2 className="text-xl font-bold text-foreground mb-4">Practical Applications of Calorie Calculation</h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span><strong>Weight Loss Planning:</strong> Use this <strong>calorie deficit calculator</strong> to determine how many calories to cut for safe, sustainable weight loss of 1-2 pounds per week</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span><strong>Muscle Gain Programs:</strong> Calculate optimal <strong>calorie surplus</strong> for lean muscle growth without excessive fat gain using our <strong>calorie calculator for bulking</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span><strong>Weight Maintenance:</strong> Find your exact <strong>maintenance calories</strong> to sustain your current weight with our <strong>TDEE calculator</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span><strong>Meal Planning:</strong> Use the macronutrient breakdown from this <strong>macro calculator</strong> to create balanced meal plans that meet your protein, carb, and fat targets</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span><strong>Fitness Program Design:</strong> Determine appropriate calorie intake for different training phases - cutting, maintenance, or bulking cycles</span>
                  </li>
                </ul>
              </article>

              {/* How to Use This Tool */}
              <article className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <h2 className="text-xl font-bold text-foreground mb-4">How to Use This Calorie Calculator</h2>
                <ol className="space-y-4 text-muted-foreground pl-5">
                  <li className="pl-2">
                    <strong className="text-foreground">Enter Personal Details</strong>
                    <p className="mt-1">Input your age, gender, weight, and height. Our <strong>calorie calculator</strong> accepts both metric (kg, cm) and imperial (lbs, feet/inches) units automatically.</p>
                  </li>
                  <li className="pl-2">
                    <strong className="text-foreground">Select Activity Level</strong>
                    <p className="mt-1">Choose from Sedentary to Extra Active based on your weekly exercise and daily activity. This determines your activity multiplier in our <strong>TDEE calculator</strong>.</p>
                  </li>
                  <li className="pl-2">
                    <strong className="text-foreground">Choose Weight Goal</strong>
                    <p className="mt-1">Select Lose Weight (500-1000 calorie deficit), Maintain Weight, or Gain Weight (500-1000 calorie surplus) based on your objectives.</p>
                  </li>
                  <li className="pl-2">
                    <strong className="text-foreground">Calculate Your Results</strong>
                    <p className="mt-1">Click "Calculate Calories" to get your personalized BMR, maintenance calories, goal calories, and macronutrient breakdown from our <strong>macro calculator</strong>.</p>
                  </li>
                  <li className="pl-2">
                    <strong className="text-foreground">Apply to Your Nutrition Plan</strong>
                    <p className="mt-1">Use the calorie target and macro numbers to plan meals, track intake, and achieve your fitness goals effectively.</p>
                  </li>
                </ol>
              </article>

              {/* Example Input and Output */}
              <article className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <h2 className="text-xl font-bold text-foreground mb-4">Calorie Calculator Examples</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Example 1: Weight Loss Calculation</h3>
                    <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                      <pre className="text-sm text-muted-foreground font-mono">
                        {`Input:
Age: 30 years
Gender: Male
Weight: 80 kg (176 lbs)
Height: 180 cm (5'11")
Activity Level: Moderately Active
Goal: Lose Weight (500 calorie deficit)

Calculation:
BMR (Harris-Benedict): 1,826 calories
TDEE (BMR × 1.55): 2,830 calories
Goal Calories (TDEE - 500): 2,330 calories

Macronutrient Breakdown:
Protein: 175 grams (30% of calories)
Carbs: 233 grams (40% of calories)
Fat: 78 grams (30% of calories)

This creates a sustainable weight loss of approximately 1 pound per week.`}
                      </pre>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Example 2: Muscle Gain Calculation</h3>
                    <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                      <pre className="text-sm text-muted-foreground font-mono">
                        {`Input:
Age: 25 years
Gender: Female
Weight: 60 kg (132 lbs)
Height: 165 cm (5'5")
Activity Level: Very Active
Goal: Gain Weight (500 calorie surplus)

Calculation:
BMR (Harris-Benedict): 1,379 calories
TDEE (BMR × 1.725): 2,379 calories
Goal Calories (TDEE + 500): 2,879 calories

Macronutrient Breakdown:
Protein: 216 grams (30% of calories)
Carbs: 288 grams (40% of calories)
Fat: 96 grams (30% of calories)

This provides adequate energy for intense training while supporting muscle growth.`}
                      </pre>
                    </div>
                  </div>
                </div>
              </article>

              {/* Related Tools Section */}
              <article className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <h2 className="text-xl font-bold text-foreground mb-4">Related Health & Fitness Tools</h2>
                <p className="text-muted-foreground mb-4">
                  Explore other useful calculators from GrockTool.com that complement this calorie calculator:
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <Link href="/health-tools/bmi-calculator" className="text-accent hover:underline">
                      <strong>BMI Calculator:</strong> Calculate your Body Mass Index using any measurement units
                    </Link>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <Link href="/health-tools/body-fat" className="text-accent hover:underline">
                      <strong>Body Fat Calculator:</strong> Estimate body fat percentage using multiple methods
                    </Link>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <Link href="/unit-tools/weight-converter" className="text-accent hover:underline">
                      <strong>Weight Converter:</strong> Convert between kg, lbs, stone, and other weight units
                    </Link>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <Link href="/health-tools/ideal-weight" className="text-accent hover:underline">
                      <strong>Ideal Weight Calculator:</strong> Determine your healthy weight range based on height and body frame
                    </Link>
                  </li>
                </ul>
              </article>

              {/* Frequently Asked Questions */}
              <article className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <h2 className="text-xl font-bold text-foreground mb-4">Frequently Asked Questions About Calorie Calculation</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">What is BMR and why is it important in calorie calculation?</h3>
                    <p className="text-muted-foreground">BMR (Basal Metabolic Rate) represents the calories your body needs at complete rest to maintain vital functions like breathing and circulation. Our <strong>BMR calculator</strong> uses the Harris-Benedict equation, which is more accurate than simple formulas. BMR forms the foundation for all <strong>calorie calculator</strong> results, as it accounts for 60-75% of your total daily calorie expenditure.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">How accurate is this calorie calculator compared to others?</h3>
                    <p className="text-muted-foreground">This <strong>daily calorie calculator</strong> uses the scientifically validated Harris-Benedict equation, which is considered the gold standard for BMR calculation. Unlike simplified <strong>calorie intake calculators</strong>, our tool accounts for age, gender, weight, height, activity level, and specific goals. The <strong>macro calculator</strong> component uses optimal ratios (30% protein, 40% carbs, 30% fat) that can be adjusted based on individual preferences.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Should I use the "Lose Weight Fast" option for maximum weight loss?</h3>
                    <p className="text-muted-foreground">The "Lose Weight Fast" option creates a 1000-calorie deficit, which may be too aggressive for some individuals. For sustainable weight loss, most experts recommend the standard "Lose Weight" option (500-calorie deficit) which results in about 1 pound of fat loss per week. Extreme deficits from <strong>calorie deficit calculators</strong> can lead to muscle loss, metabolic adaptation, and nutritional deficiencies.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">How often should I recalculate my calorie needs?</h3>
                    <p className="text-muted-foreground">Recalculate using this <strong>calorie calculator</strong> every 4-8 weeks or whenever your weight changes by 5-10 pounds, your activity level changes significantly, or you reach a weight loss/gain plateau. As you lose weight, your BMR decreases, requiring adjustment of your calorie intake to continue progress.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Can I adjust the macronutrient ratios from the standard 30/40/30 split?</h3>
                    <p className="text-muted-foreground">The 30% protein, 40% carbs, 30% fat ratio provided by our <strong>macro calculator</strong> is an optimal starting point for most people. However, individual needs vary based on activity type, insulin sensitivity, and personal preferences. Athletes may need more carbs, while those on low-carb diets may adjust accordingly. The results from this <strong>free calorie calculator</strong> should be customized based on how your body responds.</p>
                  </div>
                </div>

                {/* Medical Disclaimer */}
                <div className="mt-8 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Important Nutrition Disclaimer</h3>
                  <p className="text-sm text-muted-foreground">
                    This calorie calculator provides estimates based on mathematical formulas and should be used for informational purposes only. Individual calorie needs can vary based on genetics, medical conditions, medications, and other factors not accounted for in these calculations. The results from this <strong>calorie calculator</strong> are not a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider or registered dietitian before making significant changes to your diet or exercise routine, especially if you have underlying health conditions.
                  </p>
                </div>
              </article>
            </section>

          </div>
        </div>
      </div>
    </>
  );
}