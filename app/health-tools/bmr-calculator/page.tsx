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
    metabolism: true,
    formulas: false,
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

  // FAQ Data - UPDATED
  const faqData = [
    {
      question: "Why does my friend eat more than me but doesn't gain weight?",
      answer: "Metabolism varies significantly between individuals due to factors like muscle mass (muscle burns more calories than fat), genetics, age, and even gut bacteria composition. Your friend might have more lean muscle, better genetics for fat burning, or higher NEAT (Non-Exercise Activity Thermogenesis) - those unconscious movements like fidgeting that burn extra calories. Comparing metabolisms is like comparing fingerprints - everyone's is unique."
    },
    {
      question: "I calculated my TDEE but the scale isn't moving - what's wrong?",
      answer: "Several things could be happening. You might be underestimating your calorie intake (most people do by 20-30%). Water retention from salt, carbs, or hormones can mask fat loss. You could be gaining muscle while losing fat (body recomposition). Or your metabolism has adapted to your new calorie level. Try tracking accurately for 2-3 weeks, adjust by 100-200 calories if needed, and focus on measurements and how clothes fit rather than just scale weight."
    },
    {
      question: "Does eating more frequently really boost metabolism?",
      answer: "Not significantly for most people. The thermic effect of food (calories burned digesting) stays about the same whether you eat 2 meals or 6. However, some people find frequent meals help control hunger and maintain energy. What matters most is total daily calories and nutrients, not meal timing. If you're not hungry between meals and can stick to your calories with fewer meals, that works too."
    },
    {
      question: "I'm over 40 and my metabolism feels broken. Can I fix it?",
      answer: "Your metabolism isn't broken - it's just changed. After 40, we typically lose 3-8% of muscle per decade, and muscle burns more calories than fat. The fix? Strength training is crucial. Building muscle through resistance exercise can offset age-related metabolic decline. Also, protein becomes more important for muscle maintenance. Focus on whole foods, strength training 2-3 times weekly, and staying active throughout the day."
    },
    {
      question: "Are these formulas accurate for very muscular or overweight people?",
      answer: "They're estimates that work well for average bodies. Very muscular individuals will have higher BMRs than the formulas predict because muscle is metabolically active. Overweight individuals might have slightly lower BMRs per pound than predicted due to different body composition. Katch-McArdle formula works better if you know your body fat percentage. For extreme body types, these numbers are starting points - adjust based on real-world results."
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

            {/* Information Cards - UPDATED */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-6 mb-8"
            >
              {/* Metabolism Explanation Card - UPDATED */}
              <div className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-foreground mb-4">What Metabolism Actually Means in Real Life</h2>
                <div className="space-y-4">
                  <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                    <div className="text-sm font-medium text-foreground mb-2">⚡ Your Body's Energy Budget</div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Think of your metabolism as your body's daily energy budget. Your BMR is the fixed overhead - the calories needed just to keep the lights on: heart beating, lungs breathing, brain thinking. Even if you stayed in bed all day, this cost would still be there.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      TDEE is your total daily spending. It includes that fixed overhead plus everything else: walking to the kitchen, typing emails, your evening workout. Some people have naturally higher "overhead" costs (more muscle, larger bodies), while others move more throughout the day without realizing it.
                    </p>
                  </div>
                  
                  <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                    <div className="text-sm font-medium text-foreground mb-2">🔥 Where Those Calories Actually Go</div>
                    <div className="text-sm text-muted-foreground space-y-2">
                      <p><strong>Basal Functions (60-75%):</strong> Your organs are calorie-hungry. Your brain alone uses about 20% of your BMR. Liver, kidneys, heart - they're always working, even when you're not.</p>
                      <p><strong>Digestion (10%):</strong> Breaking down food burns calories (thermic effect). Protein costs the most to digest, fats and carbs less.</p>
                      <p><strong>Physical Activity (15-30%):</strong> This includes both exercise and NEAT (Non-Exercise Activity Thermogenesis) - fidgeting, pacing, household chores.</p>
                    </div>
                  </div>

                  <div className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/20">
                    <div className="text-sm font-medium text-foreground mb-2">🎯 Why These Numbers Matter for Real Results</div>
                    <div className="text-sm text-muted-foreground space-y-2">
                      <p>Knowing your BMR tells you the absolute minimum your body needs. Eating below this consistently can backfire - your metabolism might slow down to conserve energy.</p>
                      <p>Your TDEE gives you a realistic target. If you want to lose weight, aim for 300-500 calories below this number. Want to maintain? Match it. Trying to gain? Go 300-500 above.</p>
                      <p>The most common mistake? People pick "moderately active" when they're really sedentary, then wonder why they're not losing weight despite "eating right."</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Formula Reference Card - UPDATED */}
              <div className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-foreground mb-4">How These Metabolic Formulas Actually Work</h2>
                <div className="space-y-4">
                  <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                    <div className="text-sm font-medium text-foreground mb-2">📊 The Math Behind the Magic</div>
                    <p className="text-sm text-muted-foreground mb-2">
                      These formulas aren't just random numbers - they're based on decades of metabolic research. Scientists measured calorie burn in thousands of people under controlled conditions, then created equations that predict metabolism based on easy-to-measure factors like weight, height, age, and gender.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      The Mifflin-St Jeor formula (the default here) came out in 1990 and is considered the gold standard. It's about 90% accurate for most people. The numbers 10 (weight coefficient), 6.25 (height), and 5 (age) weren't chosen arbitrarily - they're statistical weights from actual metabolic data.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                      <h4 className="font-semibold text-foreground mb-2">Why Men and Women Get Different Numbers</h4>
                      <p className="text-sm text-muted-foreground">
                        Men typically have more muscle mass and less body fat at the same weight. Since muscle burns more calories than fat, men's formulas start with higher base numbers and add more per kilogram of weight.
                      </p>
                    </div>
                    <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                      <h4 className="font-semibold text-foreground mb-2">The Age Factor Reality</h4>
                      <p className="text-sm text-muted-foreground">
                        As we age, we lose about 3-8% of muscle per decade after 30. Less muscle means lower calorie burn. The formulas subtract calories based on age to account for this natural metabolic slowdown.
                      </p>
                    </div>
                  </div>

                  <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20">
                    <div className="text-sm font-medium text-foreground mb-2">⚖️ Formula Limitations to Keep in Mind</div>
                    <p className="text-sm text-muted-foreground">
                      These are population averages, not personal guarantees. They don't account for genetics, thyroid function, recent dieting history, or medications. Very muscular people will burn more than predicted; those with higher body fat percentages might burn less. Use these as starting points, then adjust based on your actual results over 2-3 weeks.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* SEO Content Section with Dropdowns - UPDATED */}
            <section className="space-y-4">
              {/* Metabolism Explanation - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('metabolism')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h2 className="text-xl font-bold text-foreground">Your Metabolism Decoded: More Than Just "Fast" or "Slow"</h2>
                  {openSections.metabolism ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.metabolism && (
                  <div className="px-6 pb-6">
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        When people talk about metabolism, they usually mean whether they burn calories quickly or slowly. But it's more nuanced than that. Your metabolism isn't a single thing—it's the sum of countless chemical reactions happening every second in your body. Each organ has its own metabolic rate, and they all add up to your total daily burn.
                      </p>
                      
                      <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                        <h3 className="text-lg font-semibold text-foreground mb-2">The Three Components of Daily Calorie Burn</h3>
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-medium text-foreground mb-1">1. Basal Metabolic Rate (BMR) - Your Body's Housekeeping</h4>
                            <p className="text-sm">
                              This is what the calculator measures. It's not just "resting"—it's the energy needed for survival functions. Your brain alone uses about 300-400 calories daily just thinking. Your liver processes nutrients, your kidneys filter blood, your heart beats 100,000 times daily. All this happens whether you're awake or asleep.
                            </p>
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground mb-1">2. Thermic Effect of Food (TEF) - The Cost of Eating</h4>
                            <p className="text-sm">
                              Digesting, absorbing, and storing nutrients burns calories too. Protein has the highest thermic effect (20-30% of its calories are burned during digestion), followed by carbs (5-10%), then fats (0-3%). This is why high-protein diets can help with weight management—you burn more just processing your food.
                            </p>
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground mb-1">3. Physical Activity - Both Intentional and Unconscious</h4>
                            <p className="text-sm">
                              This includes your workouts, but also NEAT (Non-Exercise Activity Thermogenesis)—all the movement you don't think about. Tapping your foot, pacing while on the phone, shifting in your chair, household chores. Some people naturally move more, burning hundreds of extra calories daily without "exercising."
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <p>
                        What's fascinating is how these components interact. When you eat less, your BMR can dip slightly as your body conserves energy. When you're more active, you might unconsciously move less later (compensatory behavior). Your metabolism isn't static—it responds to your environment, diet, and activity patterns.
                      </p>
                      
                      <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                        <h3 className="text-lg font-semibold text-foreground mb-2">Metabolic Adaptation: Why Diets Sometimes Stop Working</h3>
                        <p className="mb-2">
                          When you consistently eat less than you burn, your body adapts. It becomes more efficient, doing the same work with fewer calories. This isn't "starvation mode" (a myth for most people), but rather metabolic adaptation. Your NEAT decreases—you might fidget less, choose to sit instead of stand. Your BMR might drop slightly as you lose weight (smaller bodies need less energy).
                        </p>
                        <p>
                          This adaptation explains why weight loss often plateaus. The calorie deficit that worked initially becomes smaller as your metabolism adjusts. The solution isn't eating less and less, but periodically "resetting" with maintenance phases or adjusting your activity level.
                        </p>
                      </div>
                      
                      <p>
                        Understanding these concepts helps you work with your metabolism rather than against it. Instead of blaming a "slow metabolism," you can identify which components you can influence (activity, muscle mass, NEAT) and which you can't (organ size, genetics). This calculator gives you the numbers, but the real value comes from understanding what they mean for your daily life.
                      </p>
                    </div>
                  </div>
                )}
              </article>

              {/* Formula Reference - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('formulas')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h2 className="text-xl font-bold text-foreground">The Science Behind BMR Formulas: Why We Use Multiple Methods</h2>
                  {openSections.formulas ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.formulas && (
                  <div className="px-6 pb-6">
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        You might wonder why we offer three different formulas instead of just giving you one "correct" answer. The truth is, each formula was developed during different eras using different methods and populations. By understanding their history and limitations, you can better interpret your results.
                      </p>
                      
                      <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                        <h3 className="text-lg font-semibold text-foreground mb-2">Historical Context: How These Formulas Evolved</h3>
                        <p className="mb-2">
                          The Harris-Benedict equation dates back to 1919. Researchers J. Arthur Harris and Francis G. Benedict studied 136 men and 103 women, measuring their metabolism in controlled laboratory conditions. Their formula became the standard for decades, but it has a flaw: it tends to overestimate BMR by about 5%, especially for overweight individuals.
                        </p>
                        <p>
                          Fast forward to 1990: researchers Mifflin, St Jeor, Hill, Scott, Daugherty, and Koh published an updated formula based on more diverse and modern population data. Their Mifflin-St Jeor equation is now considered the gold standard, with about 90% accuracy for the general population. It's the default in most clinical settings today.
                        </p>
                      </div>
                      
                      <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                        <h3 className="text-lg font-semibold text-foreground mb-2">Breaking Down the Mifflin-St Jeor Math</h3>
                        <div className="space-y-2">
                          <p>
                            For men: <strong>BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age) + 5</strong>
                          </p>
                          <p>
                            For women: <strong>BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age) - 161</strong>
                          </p>
                          <p className="text-sm">
                            These coefficients (10, 6.25, 5) come from statistical regression analysis. They represent how much each factor (weight, height, age) contributes to metabolic rate. The gender constants (+5 for men, -161 for women) account for average differences in body composition between sexes.
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                          <h4 className="font-semibold text-foreground mb-2">When to Use Katch-McArdle</h4>
                          <p className="text-sm">
                            The Katch-McArdle formula is different—it requires lean body mass instead of total weight. If you know your body fat percentage, this formula can be more accurate because it focuses on metabolically active tissue (muscle) rather than total mass. The formula: <strong>BMR = 370 + (21.6 × lean body mass in kg)</strong>
                          </p>
                        </div>
                        <div className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/20">
                          <h4 className="font-semibold text-foreground mb-2">Activity Multipliers: More Than Guesswork</h4>
                          <p className="text-sm">
                            The activity multipliers (1.2 to 1.9) come from research on energy expenditure. Sedentary (1.2) assumes almost no movement beyond basic activities of daily living. Each step up represents approximately 30-60 minutes of moderate exercise daily. These are estimates—your actual multiplier depends on both structured exercise and spontaneous movement.
                          </p>
                        </div>
                      </div>
                      
                      <p>
                        No formula is perfect. They work best for people within average body composition ranges. If you're extremely muscular, very lean, or have significant weight to lose, the formulas might be less accurate. That's why we recommend using them as starting points, then adjusting based on real-world results over several weeks of consistent tracking.
                      </p>
                    </div>
                  </div>
                )}
              </article>

              {/* Examples - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('examples')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h2 className="text-xl font-bold text-foreground">Real Metabolic Stories: How BMR Plays Out in Daily Life</h2>
                  {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.examples && (
                  <div className="px-6 pb-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Case Study: The Desk Worker vs. The Restaurant Server</h3>
                        <div className="bg-muted p-4 rounded-lg">
                          <p className="text-muted-foreground mb-3">
                            Sarah (32) works at a desk, while Maria (31) waits tables. Both women are 5'6" and weigh 140 lbs. They might assume they have similar calorie needs, but their daily energy expenditure tells a different story.
                          </p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                            <div className="bg-blue-500/10 p-3 rounded-lg">
                              <h4 className="font-semibold text-foreground mb-2">Sarah: Software Developer</h4>
                              <div className="text-sm text-muted-foreground space-y-1">
                                <div>• <strong>BMR:</strong> 1,380 calories</div>
                                <div>• <strong>Activity:</strong> Sedentary (sits 8+ hours)</div>
                                <div>• <strong>Exercise:</strong> 3x/week gym sessions</div>
                                <div>• <strong>NEAT:</strong> Low (minimal fidgeting)</div>
                                <div>• <strong>TDEE:</strong> ~2,000 calories</div>
                              </div>
                            </div>
                            <div className="bg-green-500/10 p-3 rounded-lg">
                              <h4 className="font-semibold text-foreground mb-2">Maria: Restaurant Server</h4>
                              <div className="text-sm text-muted-foreground space-y-1">
                                <div>• <strong>BMR:</strong> 1,380 calories (same)</div>
                                <div>• <strong>Activity:</strong> On feet 6-8 hours daily</div>
                                <div>• <strong>Exercise:</strong> Occasional yoga</div>
                                <div>• <strong>NEAT:</strong> High (constant movement)</div>
                                <div>• <strong>TDEE:</strong> ~2,400 calories</div>
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-sm text-muted-foreground">
                            Despite similar stats, Maria burns about 400 more calories daily through her job and natural movement patterns. If both ate 2,000 calories, Sarah would maintain while Maria would lose weight. This shows why activity level selection matters—Sarah would choose "light activity" while Maria might choose "moderate" or "very active."
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Metabolic Adaptation: The Post-Diet Experience</h3>
                        <div className="bg-muted p-4 rounded-lg">
                          <p className="text-muted-foreground mb-3">
                            Mark lost 40 pounds over 6 months. He started at 220 lbs with a TDEE of 2,800 calories. At 180 lbs, his calculator shows a TDEE of 2,400 calories. But here's what actually happened:
                          </p>
                          
                          <div className="space-y-2 text-sm text-muted-foreground pl-4">
                            <div className="flex items-start">
                              <span className="text-accent mr-2">•</span>
                              <span><strong>Expected drop:</strong> 400 calories (2,800 → 2,400)</span>
                            </div>
                            <div className="flex items-start">
                              <span className="text-accent mr-2">•</span>
                              <span><strong>Actual drop:</strong> 550 calories (2,800 → 2,250)</span>
                            </div>
                            <div className="flex items-start">
                              <span className="text-accent mr-2">•</span>
                              <span><strong>Why the difference?</strong> Metabolic adaptation - his body became more efficient, his NEAT decreased (less fidgeting), and he had less mass to move around</span>
                            </div>
                            <div className="flex items-start">
                              <span className="text-accent mr-2">•</span>
                              <span><strong>The fix:</strong> He added resistance training to build muscle (increasing BMR) and consciously increased daily movement (boosting NEAT)</span>
                            </div>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mt-3">
                            This example shows why recalculating periodically is important, and why building muscle matters for long-term metabolic health. The formulas predict the change from weight loss, but they can't account for adaptive responses.
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">The Muscle Building Phase</h3>
                        <div className="bg-muted p-4 rounded-lg">
                          <p className="text-muted-foreground mb-3">
                            Alex wants to build muscle. At 160 lbs with a TDEE of 2,500 calories, he starts eating 3,000 calories daily while strength training. After 3 months:
                          </p>
                          
                          <div className="space-y-2 text-sm text-muted-foreground pl-4">
                            <div className="flex items-start">
                              <span className="text-accent mr-2">•</span>
                              <span><strong>Weight gain:</strong> 8 pounds (160 → 168)</span>
                            </div>
                            <div className="flex items-start">
                              <span className="text-accent mr-2">•</span>
                              <span><strong>Body composition:</strong> Gained 6 pounds muscle, 2 pounds fat</span>
                            </div>
                            <div className="flex items-start">
                              <span className="text-accent mr-2">•</span>
                              <span><strong>New BMR:</strong> Increased by about 60 calories due to added muscle</span>
                            </div>
                            <div className="flex items-start">
                              <span className="text-accent mr-2">•</span>
                              <span><strong>Result:</strong> He can now eat slightly more (2,560 maintenance) without gaining fat</span>
                            </div>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mt-3">
                            This illustrates the metabolic benefit of muscle gain. Each pound of muscle burns about 6-10 calories daily at rest. While that seems small, over years it adds up. More importantly, muscle changes body composition, allowing you to eat more while maintaining leanness.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </article>

              {/* Health Disclaimer - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('relatedTools')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h2 className="text-xl font-bold text-foreground">Important Health Considerations and Metabolic Limitations</h2>
                  {openSections.relatedTools ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.relatedTools && (
                  <div className="px-6 pb-6">
                    <div className="space-y-4 text-muted-foreground">
                      <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20 mb-4">
                        <h3 className="text-lg font-semibold text-foreground mb-2">What These Calculations Can't Tell You</h3>
                        <p>
                          These formulas provide population averages, not personal guarantees. They don't account for individual variations in genetics, hormone levels, medical conditions, or medication effects. If you have thyroid issues, PCOS, diabetes, or take certain medications, your actual metabolic rate might differ significantly from these estimates.
                        </p>
                      </div>
                      
                      <p>
                        Metabolic health exists on a spectrum. Two people with identical calculations might respond differently to the same calorie intake due to factors like insulin sensitivity, gut microbiome composition, or stress levels. These formulas focus on quantity (calories burned) but not quality (how efficiently your body uses those calories).
                      </p>
                      
                      <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                        <h4 className="font-semibold text-foreground mb-2">When Metabolic Calculations Need Professional Context</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• If you have a history of eating disorders or disordered eating patterns</li>
                          <li>• If you're taking medications that affect metabolism (thyroid meds, steroids, antidepressants)</li>
                          <li>• If you have metabolic conditions like diabetes, PCOS, or thyroid disorders</li>
                          <li>• If you're pregnant, breastfeeding, or trying to conceive</li>
                          <li>• If you experience extreme fatigue, temperature intolerance, or unexplained weight changes</li>
                          <li>• If you've undergone significant weight loss surgery or have digestive issues</li>
                        </ul>
                      </div>
                      
                      <p>
                        Remember that sustainable health comes from balanced habits, not just calorie counting. Sleep quality, stress management, nutrient timing, food quality, and hydration all influence how your body uses energy. These calculations give you a numerical starting point, but they're just one piece of the health puzzle.
                      </p>
                      
                      <p>
                        If you use these numbers to guide dietary changes, prioritize nutrient density. Eating 1,800 calories of whole foods affects your body differently than 1,800 calories of processed foods, even if the calorie math is identical. Work with your body's signals of hunger and fullness rather than rigidly adhering to calculated numbers that might not match your individual needs.
                      </p>
                    </div>
                  </div>
                )}
              </article>

              {/* Frequently Asked Questions - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('faqs')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h2 className="text-xl font-bold text-foreground">Common Questions About Metabolism and Calorie Needs</h2>
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
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Can I really "boost" my metabolism with certain foods or supplements?</h3>
                        <p className="text-muted-foreground">
                          Some foods have minor metabolic effects. Protein has the highest thermic effect (20-30% of its calories burned in digestion). Spicy foods might temporarily increase metabolism by 8% for an hour or two. Caffeine can boost metabolism by 3-11%. But these effects are small and temporary. The most effective ways to increase metabolism long-term are building muscle through strength training and increasing daily movement. Beware of supplements claiming dramatic metabolic boosts—most are ineffective or unsafe.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Why do I burn fewer calories on the treadmill than it says?</h3>
                        <p className="text-muted-foreground">
                          Exercise machines often overestimate calorie burn by 20-40%. They don't account for your individual efficiency, fitness level, or how much you're leaning on the handles. Heart rate monitors are somewhat better but still imperfect. The most accurate method for exercise calories is using a percentage of your BMR based on intensity and duration. For example, moderate exercise might burn 5-8 calories per minute. Focus on consistency and effort rather than exact calorie counts from equipment.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Does eating late at night slow metabolism or cause weight gain?</h3>
                        <p className="text-muted-foreground">
                          Meal timing has minimal effect on metabolism or weight gain compared to total daily calories. Your body doesn't have an internal clock that says "store fat after 7 PM." However, late-night eating can lead to weight gain indirectly: people often make poorer food choices when tired, eat out of boredom rather than hunger, or consume more calories than needed. If you're hitting your calorie targets, when you eat matters less than what and how much you eat.
                        </p>
                      </div>
                    </div>
                    
                    {/* Medical Disclaimer */}
                    <div className="mt-8 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                      <h3 className="text-lg font-semibold text-foreground mb-2">Professional Medical Disclaimer</h3>
                      <p className="text-sm text-muted-foreground">
                        This BMR and TDEE calculator provides estimates based on statistical formulas and should be used for informational purposes only. Individual metabolic rates vary based on genetics, medical conditions, medications, hormonal factors, lifestyle, and other variables not accounted for in these calculations. These formulas do not constitute medical advice, diagnosis, or treatment recommendations. Always consult with qualified healthcare providers, registered dietitians, or certified nutritionists for personalized guidance regarding metabolic health, nutrition planning, and weight management, especially if you have underlying health conditions, take medications, or have a history of eating disorders. Sustainable health comes from balanced approaches that consider nutrition, activity, sleep, stress management, and individual needs beyond calorie calculations alone.
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