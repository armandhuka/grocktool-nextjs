'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Calculator, RotateCcw, ArrowLeft, Activity, Target, Flame, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';

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

  // SEO Section Dropdown States
  const [openSections, setOpenSections] = useState({
    whatItDoes: true,
    howToUse: false,
    examples: false,
    faqs: false,
    relatedTools: false
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

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

  // FAQ Data
  const faqData = [
    {
      question: "What is the difference between BMR and TDEE?",
      answer: "BMR (Basal Metabolic Rate) represents the calories your body burns at complete rest for basic functions like breathing and circulation. TDEE (Total Daily Energy Expenditure) is your BMR multiplied by an activity factor, representing your total daily calorie burn including all physical activity and exercise."
    },
    {
      question: "Which BMR formula is the most accurate?",
      answer: "The Mifflin-St Jeor formula is generally considered the most accurate for the general population (90% accuracy rate). The Harris-Benedict formula tends to overestimate by about 5%, while Katch-McArdle is most accurate if you know your exact body fat percentage. Our calculator defaults to Mifflin-St Jeor for optimal accuracy."
    },
    {
      question: "Why does my BMR decrease with age?",
      answer: "As you age, muscle mass naturally decreases (about 3-8% per decade after 30) while body fat percentage increases. Muscle tissue burns more calories at rest than fat tissue, so reduced muscle mass leads to a lower metabolic rate. This is why the calculator includes age as a key variable in all formulas."
    },
    {
      question: "How often should I recalculate my BMR?",
      answer: "Recalculate your BMR every 3-6 months, or whenever your weight changes by more than 10 pounds (4.5 kg), your activity level changes significantly, or you reach a weight loss/gain plateau. As you lose weight, your BMR decreases, requiring calorie adjustments for continued progress."
    },
    {
      question: "Is it safe to eat below my BMR for weight loss?",
      answer: "Consistently eating below your BMR is not recommended, as it can lead to muscle loss, nutrient deficiencies, metabolic adaptation, and other health issues. For safe and sustainable weight loss, aim for a calorie deficit of 300-500 calories below your TDEE while ensuring you still meet or exceed your BMR."
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
    <>
      <Head>
        <title>BMR Calculator | Basal Metabolic Rate & TDEE Calculation - GrockTool.com</title>
        <meta name="description" content="Calculate your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) using Mifflin-St Jeor, Harris-Benedict, or Katch-McArdle formulas. Get personalized calorie targets for weight loss, maintenance, or muscle gain." />
        <meta name="keywords" content="BMR calculator, basal metabolic rate calculator, TDEE calculator, calorie calculator, metabolic rate calculator, energy expenditure calculator, weight loss calculator, maintenance calories, calorie needs calculator" />
        <meta property="og:title" content="BMR Calculator | Basal Metabolic Rate & TDEE Calculation - GrockTool.com" />
        <meta property="og:description" content="Calculate your exact BMR and TDEE using scientifically validated formulas. Get personalized calorie targets for your fitness goals." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BMR Calculator - GrockTool.com" />
        <meta name="twitter:description" content="Calculate your basal metabolic rate and daily calorie needs in seconds." />
        <link rel="canonical" href="https://grocktool.com/health-tools/bmr-calculator" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "BMR Calculator",
            "applicationCategory": "HealthApplication",
            "operatingSystem": "Any",
            "description": "Free BMR calculator to calculate Basal Metabolic Rate and Total Daily Energy Expenditure using multiple scientific formulas",
            "url": "https://grocktool.com/health-tools/bmr-calculator",
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
              "Mifflin-St Jeor formula",
              "Harris-Benedict formula",
              "Katch-McArdle formula",
              "TDEE calculation with activity levels",
              "Calorie targets for weight goals",
              "Age and gender adjustment"
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
                  BMR & TDEE Calculator
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Discover your exact metabolic rate and daily calorie needs in under 5 seconds.
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
              className="space-y-6 mb-8"
            >
              {/* BMR Explanation Card */}
              <div className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-foreground mb-4">Understanding BMR & TDEE</h2>
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
                <h2 className="text-lg font-semibold text-foreground mb-4">BMR Formula Comparison</h2>
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

            {/* SEO Content Section with Dropdowns */}
            <section className="space-y-4">
              {/* What This Tool Does - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('whatItDoes')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h2 className="text-xl font-bold text-foreground">BMR & TDEE Calculator - What It Does</h2>
                  {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.whatItDoes && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      This free tool helps you calculate your Basal Metabolic Rate (BMR) - the calories your body burns at complete rest - and your Total Daily Energy Expenditure (TDEE) - your total daily calorie burn including all activity. Understanding these numbers is essential for effective weight management, fitness planning, and nutrition strategy development.
                    </p>
                    <p className="text-muted-foreground">
                      The calculator uses three scientifically validated formulas (Mifflin-St Jeor, Harris-Benedict, and Katch-McArdle) to provide accurate metabolic rate estimates. It then calculates your TDEE across five activity levels and provides specific calorie targets for weight loss, maintenance, and weight gain goals. This comprehensive approach gives you the data needed to make informed decisions about your nutrition and fitness.
                    </p>
                  </div>
                )}
              </article>

              {/* How to Use This Tool - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('howToUse')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h2 className="text-xl font-bold text-foreground">How to Use This BMR Calculator</h2>
                  {openSections.howToUse ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.howToUse && (
                  <div className="px-6 pb-6">
                    <ol className="space-y-4 text-muted-foreground pl-5">
                      <li className="pl-2">
                        <strong className="text-foreground">Enter Your Personal Information</strong>
                        <p className="mt-1">Input your age, select your gender, and provide your current body weight and height using the unit selectors for kg/lbs/st and cm/ft/inches.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Choose Your BMR Formula</strong>
                        <p className="mt-1">Select from Mifflin-St Jeor (most accurate), Harris-Benedict (original), or Katch-McArdle (best with body fat percentage). The calculator defaults to Mifflin-St Jeor for optimal accuracy.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Calculate Your Metabolic Rate</strong>
                        <p className="mt-1">Click "Calculate BMR & TDEE" to get your Basal Metabolic Rate and Total Daily Energy Expenditure across five activity levels from Sedentary to Extra Active.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Review Calorie Targets</strong>
                        <p className="mt-1">Examine the specific calorie goals for different objectives: extreme weight loss (-1000 calories), weight loss (-500), maintenance, weight gain (+500), and extreme gain (+1000).</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Apply to Your Nutrition Plan</strong>
                        <p className="mt-1">Use your TDEE (based on your actual activity level) as a starting point for calorie intake, adjusting based on your specific weight management goals and monitoring progress over time.</p>
                      </li>
                    </ol>
                  </div>
                )}
              </article>

              {/* Example Input and Output - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('examples')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h2 className="text-xl font-bold text-foreground">BMR & TDEE Calculation Examples</h2>
                  {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.examples && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground text-sm mb-4">
                      Below are practical examples showing how BMR and TDEE calculations work for different individuals with varying characteristics.
                    </p>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 1: Moderately Active Female</h3>
                        <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                          <pre className="text-sm text-muted-foreground font-mono">
{`Input:
Age: 32 years
Gender: Female
Weight: 65 kg (143 lbs)
Height: 165 cm (5'5")
Formula: Mifflin-St Jeor

Calculations:
BMR (Mifflin-St Jeor): 1,379 calories/day
TDEE by Activity Level:
• Sedentary: 1,655 calories/day
• Light Activity: 1,896 calories/day
• Moderate Activity: 2,137 calories/day (selected)
• Very Active: 2,379 calories/day
• Extra Active: 2,620 calories/day

Goal Calorie Targets:
• Extreme Weight Loss: 1,137 calories/day
• Weight Loss: 1,637 calories/day
• Maintenance: 2,137 calories/day
• Weight Gain: 2,637 calories/day
• Extreme Weight Gain: 3,137 calories/day`}
                          </pre>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 2: Sedentary Male</h3>
                        <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                          <pre className="text-sm text-muted-foreground font-mono">
{`Input:
Age: 45 years
Gender: Male
Weight: 85 kg (187 lbs)
Height: 178 cm (5'10")
Formula: Harris-Benedict

Calculations:
BMR (Harris-Benedict): 1,786 calories/day
TDEE by Activity Level:
• Sedentary: 2,143 calories/day (selected)
• Light Activity: 2,456 calories/day
• Moderate Activity: 2,768 calories/day
• Very Active: 3,081 calories/day
• Extra Active: 3,393 calories/day

Goal Calorie Targets:
• Extreme Weight Loss: 1,768 calories/day
• Weight Loss: 2,268 calories/day
• Maintenance: 2,768 calories/day
• Weight Gain: 3,268 calories/day
• Extreme Weight Gain: 3,768 calories/day

Note: For sedentary lifestyle, maintenance calories
are based on Sedentary TDEE rather than Moderate.`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </article>

              {/* Related Tools Section - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('relatedTools')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h2 className="text-xl font-bold text-foreground">Related Health & Fitness Tools</h2>
                  {openSections.relatedTools ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.relatedTools && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Explore other useful calculators from GrockTool.com that complement this BMR and TDEE calculator:
                    </p>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        <Link href="/health-tools/calorie-calculator" className="text-accent hover:underline">
                          <strong>Calorie Calculator:</strong> Calculate your daily calorie needs and macronutrient targets
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        <Link href="/health-tools/bmi-calculator" className="text-accent hover:underline">
                          <strong>BMI Calculator:</strong> Calculate your Body Mass Index using any measurement units
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        <Link href="/health-tools/body-fat" className="text-accent hover:underline">
                          <strong>Body Fat Calculator:</strong> Estimate your body fat percentage using multiple methods
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        <Link href="/health-tools/ideal-weight" className="text-accent hover:underline">
                          <strong>Ideal Weight Calculator:</strong> Determine your healthy weight range based on height
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        <Link href="/health-tools/macro-splitter" className="text-accent hover:underline">
                          <strong>Macro Split Calculator:</strong> Calculate optimal macronutrient ratios for your goals
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        <Link href="/health-tools/water-intake" className="text-accent hover:underline">
                          <strong>Water Intake Calculator:</strong> Calculate your optimal daily hydration needs
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </article>

              {/* Frequently Asked Questions - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('faqs')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h2 className="text-xl font-bold text-foreground">Frequently Asked Questions About BMR & TDEE</h2>
                  {openSections.faqs ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.faqs && (
                  <div className="px-6 pb-6">
                    <div className="space-y-6">
                      {faqData.map((faq, index) => (
                        <div key={index}>
                          <h3 className="text-lg font-semibold text-foreground mb-2">{faq.question}</h3>
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                    
                    {/* Medical Disclaimer */}
                    <div className="mt-8 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                      <h3 className="text-lg font-semibold text-foreground mb-2">Important Health Disclaimer</h3>
                      <p className="text-sm text-muted-foreground">
                        This BMR and TDEE calculator provides estimates based on statistical formulas and should be used for informational purposes only. Individual metabolic rates can vary based on genetics, medical conditions (like thyroid disorders), medications, hormonal factors, and other variables not accounted for in these calculations. The results from this calculator are not a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider, registered dietitian, or certified nutritionist for personalized medical advice regarding your metabolic health and nutrition planning, especially if you have underlying health conditions or take medications that affect metabolism.
                      </p>
                    </div>
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