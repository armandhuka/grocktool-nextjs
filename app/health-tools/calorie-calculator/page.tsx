'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Utensils, Calculator, RotateCcw, ArrowLeft, Target, Activity } from 'lucide-react';
import Link from 'next/link';

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
    <div className="min-h-screen bg-background font-inter">
      <div className="pt-20 pb-8 px-4 sm:pt-24 sm:pb-12 sm:px-6 lg:pt-28">
        <div className="max-w-lg mx-auto lg:max-w-2xl">

          {/* Back Button */}
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
                        className={`p-3 rounded-lg border transition ${
                          gender === 'male'
                            ? 'bg-accent text-accent-foreground border-accent'
                            : 'bg-secondary border-border'
                        }`}
                      >
                        Male
                      </button>
                      <button
                        onClick={() => setGender('female')}
                        className={`p-3 rounded-lg border transition ${
                          gender === 'female'
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
                      className={`p-3 rounded-lg border text-left transition ${
                        activity === lvl.value
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
                      className={`p-3 rounded-lg border text-left transition ${
                        goal === g.value
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

        </div>
      </div>
    </div>
  );
}
