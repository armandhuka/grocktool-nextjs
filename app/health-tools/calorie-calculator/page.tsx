`use client`;

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
                ACTIVITY LEVEL LOGIC SECTION
            ============================ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-card rounded-xl border border-border p-6 shadow-sm mb-6"
            >
              <h2 className="text-xl font-bold text-foreground mb-4">Activity Level Logic</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  The activity multiplier is probably the most misunderstood part of calorie calculations. Many people overestimate their actual activity level, which leads to frustration when the scale doesn't move as expected. Let's break down what each category really means in practical terms.
                </p>
                
                <p>
                  <strong>Sedentary (×1.2):</strong> This isn't just "office workers." It includes anyone who gets fewer than 5,000 steps daily, doesn't exercise intentionally, and spends most of their day sitting. Think remote workers, students with minimal walking between classes, or people recovering from injuries. The 1.2 multiplier accounts for basic movement like getting dressed, light housekeeping, and walking to the car—not much else.
                </p>
                
                <p>
                  <strong>Lightly Active (×1.375):</strong> You hit this level if you walk 7,000-10,000 steps most days or do light exercise like gentle yoga, casual cycling, or 30 minutes of moderate activity 1-3 times weekly. Many retail workers, teachers who move around classrooms, and people with dogs they walk regularly fit here. It's movement that makes you breathe slightly harder but doesn't leave you sweaty.
                </p>
                
                <p>
                  <strong>Moderately Active (×1.55):</strong> This is where most regular exercisers land. You're doing 30-60 minutes of intentional exercise 3-5 days weekly—things like jogging, swimming laps, weight training with minimal rest, or playing recreational sports. Your daily steps likely exceed 10,000, and your job might involve some physical tasks like stocking shelves or walking between different work areas.
                </p>
                
                <p>
                  <strong>Very Active (×1.725):</strong> You train hard 6-7 days weekly, maybe doing doubles some days. Think marathon training, intense weightlifting programs, or physically demanding jobs like construction work combined with regular workouts. Your total weekly exercise exceeds 8 hours, and you're often sore from yesterday's session. Most people who think they're here actually aren't—be honest about recovery days.
                </p>
                
                <p>
                  <strong>Extra Active (×1.9):</strong> Reserved for professional athletes, military personnel in training, or people with extremely physical jobs (landscaping, roofing, moving furniture) who also train hard outside work. Energy expenditure here is substantial—we're talking 3,000+ calories burned through activity alone daily. Unless you're paid to move or train, you probably don't need this multiplier.
                </p>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-sm">
                    <strong>Practical tip:</strong> If you're between categories, choose the lower one. It's better to underestimate activity and be pleasantly surprised by faster progress than to overestimate and wonder why you're not seeing results. You can always adjust up later if you're losing weight too quickly or feeling constantly drained.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* ============================
                ESTIMATION METHOD SECTION
            ============================ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-card rounded-xl border border-border p-6 shadow-sm mb-6"
            >
              <h2 className="text-xl font-bold text-foreground mb-4">How We Estimate Your Numbers</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Our calculator uses the Harris-Benedict equation, which has been the gold standard for estimating basal metabolic rate since 1919. Unlike simpler formulas that only consider weight, this equation factors in your age, gender, height, and weight to give a more personalized starting point. Here's why that matters.
                </p>
                
                <p>
                  <strong>BMR vs. TDEE:</strong> Your Basal Metabolic Rate (BMR) is what you'd burn if you stayed in bed all day—the energy needed just to keep your heart beating, lungs breathing, and brain functioning. Total Daily Energy Expenditure (TDEE) is your BMR multiplied by your activity level. This distinction is crucial because many calculators confuse the two, leading to inaccurate targets.
                </p>
                
                <p>
                  <strong>The gender difference</strong> in the formula isn't arbitrary. Women typically have a higher percentage of body fat relative to lean mass, which burns fewer calories at rest. The equation adjusts for this biological reality, which is why a man and woman with identical stats get different BMR results. This becomes especially noticeable as people age—metabolism naturally slows by about 1-2% per decade after 20, which the formula accounts for.
                </p>
                
                <p>
                  <strong>Why we use 30/40/30 macros:</strong> The 30% protein, 40% carb, 30% fat split is a balanced starting point that works well for most people. Protein supports muscle retention (especially important in a deficit), carbs fuel workouts and brain function, and fats support hormone production. Some calculators use extreme splits like 40% protein or 10% carbs, but those often aren't sustainable long-term or enjoyable to follow.
                </p>
                
                <p>
                  The deficit/surplus numbers (500 and 1000 calories) are based on the well-established fact that one pound of body fat contains approximately 3,500 calories. A 500-calorie daily deficit leads to about one pound of fat loss per week—a rate that minimizes muscle loss and metabolic adaptation. Similarly, a 500-calorie surplus supports steady muscle gain without excessive fat accumulation for most people.
                </p>
                
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <p className="text-sm">
                    <strong>Remember:</strong> All formulas are estimates. Individual variations like genetics, medication effects, thyroid function, and even gut microbiome composition can affect your actual energy needs. Use these numbers as a starting point, then adjust based on how your body responds over 2-3 weeks.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* ============================
                EXAMPLES SECTION
            ============================ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-card rounded-xl border border-border p-6 shadow-sm mb-6"
            >
              <h2 className="text-xl font-bold text-foreground mb-4">Real-World Examples</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Sarah's Weight Loss Journey</h3>
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                    <p className="text-muted-foreground mb-3">
                      Sarah is 34, works an office job, and wants to lose 15 pounds for her upcoming wedding. She selected "Sedentary" despite walking her dog daily because those walks are leisurely. Here's what the calculator gave her:
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>BMR:</span>
                        <span className="font-medium">1,420 calories</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Maintenance:</span>
                        <span className="font-medium">1,704 calories</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Goal (500 deficit):</span>
                        <span className="font-medium">1,204 calories</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground mt-3 text-sm">
                      <strong>What she actually did:</strong> Sarah found 1,204 calories too restrictive, so she added two 30-minute brisk walks during her lunch breaks. This bumped her to "Lightly Active" (1,754 maintenance) and allowed a more comfortable 1,254 daily target. She lost the weight in 4 months without feeling deprived.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Mark's Muscle Building Phase</h3>
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                    <p className="text-muted-foreground mb-3">
                      Mark is 28, lifts weights 5 days weekly, and wants to add lean muscle. He works as a teacher and is on his feet most of the day, so he selected "Moderately Active." His results:
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>BMR:</span>
                        <span className="font-medium">1,780 calories</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Maintenance:</span>
                        <span className="font-medium">2,759 calories</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Goal (500 surplus):</span>
                        <span className="font-medium">3,259 calories</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground mt-3 text-sm">
                      <strong>His adjustment:</strong> After two weeks at 3,259 calories, Mark noticed faster fat gain than expected. He realized he was overcounting activity—while he's on his feet, teaching isn't intense exercise. Switching to "Lightly Active" (2,448 maintenance) and a 300-calorie surplus (2,748 total) gave him better results with less unwanted fat.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Linda's Maintenance After Weight Loss</h3>
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                    <p className="text-muted-foreground mb-3">
                      Linda lost 40 pounds over 8 months and wants to maintain. Her stats: 52 years old, walks 3 miles daily, does yoga twice weekly. She chose "Lightly Active":
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>BMR:</span>
                        <span className="font-medium">1,310 calories</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Maintenance:</span>
                        <span className="font-medium">1,801 calories</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Goal (maintain):</span>
                        <span className="font-medium">1,801 calories</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground mt-3 text-sm">
                      <strong>The reality check:</strong> Linda was surprised her maintenance was only 1,801 calories—much lower than during her 20s. This is normal: age reduces BMR, and significant weight loss can lower it further as the body adapts. She focuses on nutrient-dense foods and accepts that her calorie needs are simply lower now than before.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ============================
                HEALTH DISCLAIMER
            ============================ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800 p-6 shadow-sm mb-6"
            >
              <h2 className="text-xl font-bold text-foreground mb-4">Important Health Considerations</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  While calorie calculators provide helpful estimates, they can't account for individual medical conditions that significantly affect metabolism. If you have hypothyroidism, PCOS, diabetes, or are taking medications like beta-blockers, antidepressants, or steroids, your actual energy needs may differ substantially from these calculations.
                </p>
                
                <p>
                  <strong>Extreme deficits are problematic:</strong> Choosing the "Lose Weight Fast" option (1,000-calorie deficit) often backfires. Your body interprets this as starvation and responds by slowing your metabolism, increasing hunger hormones, and breaking down muscle for energy. The initial rapid weight loss is often water and muscle, not fat. Most registered dietitians recommend against deficits larger than 750 calories daily except under medical supervision.
                </p>
                
                <p>
                  <strong>When not to use these numbers:</strong> If you're pregnant, breastfeeding, under 18, over 75, have a history of eating disorders, or are significantly underweight (BMI below 18.5), please consult a healthcare professional instead of relying on calculator results. These life stages and conditions require specialized nutritional approaches that generic formulas can't provide.
                </p>
                
                <p>
                  <strong>The mental health aspect:</strong> Constantly tracking calories can become obsessive for some people. If you find yourself stressed about hitting exact numbers, anxious about going over by 50 calories, or avoiding social events because you can't track food there, it might be time to step back. Nutrition should support your life, not control it.
                </p>
                
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                  <p className="text-sm">
                    <strong>Medical disclaimer:</strong> This tool provides general educational information only. It is not medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider before making significant dietary changes, especially if you have pre-existing health conditions. If you experience dizziness, fatigue, hair loss, or menstrual irregularities while following a calorie target, stop immediately and seek professional guidance.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* ============================
                FAQ SECTION
            ============================ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="bg-card rounded-xl border border-border p-6 shadow-sm mb-8"
            >
              <h2 className="text-xl font-bold text-foreground mb-6">Common Questions About Calorie Calculation</h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Why did my maintenance calories drop after losing weight?</h3>
                  <p className="text-muted-foreground">
                    This is completely normal and expected. When you lose weight, your body has less mass to move around and maintain. Think of it like driving a lighter car—it uses less fuel. Each pound of weight loss typically reduces your BMR by about 10 calories daily. So if you've lost 20 pounds, your maintenance calories might be 200 calories lower than before. This is why weight loss often plateaus, and you need to periodically recalculate your needs.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">I'm hitting my calorie target but not losing weight. What's wrong?</h3>
                  <p className="text-muted-foreground">
                    Several possibilities here. First, you might be underestimating food portions—studies show people typically underestimate intake by 20-50%. Second, your activity level might be lower than selected. Third, water retention from increased sodium, carbs, or exercise can mask fat loss for weeks. Fourth, metabolic adaptation might have occurred. Try weighing and measuring food precisely for a week, choosing a lower activity level, and giving it 3-4 weeks before adjusting.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Do I need to eat back calories burned through exercise?</h3>
                  <p className="text-muted-foreground">
                    Generally no, unless you're doing extreme endurance training or feeling constantly drained. Fitness trackers notoriously overestimate exercise calories—sometimes by 40% or more. The activity multipliers in our calculator already account for regular exercise. If you do an extra-hard workout, listen to your body. A small post-workout snack might help recovery, but don't feel obligated to "eat back" every calorie your watch says you burned.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">How do menstrual cycles affect calorie needs?</h3>
                  <p className="text-muted-foreground">
                    Many women notice increased hunger and energy needs during the luteal phase (the week before their period). Research suggests BMR may increase by 5-10% during this time due to hormonal changes. Some women find it helpful to eat 100-200 more calories daily during this week rather than fighting intense cravings. The scale might also show temporary water weight gain of 2-5 pounds—this isn't fat, and it usually drops after menstruation begins.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Is counting calories necessary for weight management?</h3>
                  <p className="text-muted-foreground">
                    For some people yes, for others no. If you're new to nutrition or have specific goals, tracking for 2-3 months teaches you about portion sizes and food composition. Many people eventually transition to intuitive eating while occasionally checking in with tracking. Others with busy schedules prefer simplified approaches like using hand portions (palm of protein, fist of veggies, etc.). The calculator gives you a target, but how you implement it can vary based on your lifestyle and preferences.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Why do men usually get higher calorie targets than women with similar stats?</h3>
                  <p className="text-muted-foreground">
                    It comes down to body composition. Men naturally carry more muscle mass than women, even at the same weight and height. Muscle tissue is metabolically active—it burns calories just existing. Fat tissue burns far fewer calories. So a 160-pound man with 20% body fat has significantly more calorie-burning muscle than a 160-pound woman with 30% body fat. The formula accounts for this biological difference, which is why gender selection matters for accuracy.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </>
  );
}