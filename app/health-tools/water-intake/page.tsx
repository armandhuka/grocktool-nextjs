'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Droplets, Calculator, RotateCcw, ArrowLeft, Activity, Sun, Thermometer } from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';

export default function WaterIntake() {
  const [weight, setWeight] = useState('');
  const [activity, setActivity] = useState('30');
  const [climate, setClimate] = useState('normal');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('');
  const [result, setResult] = useState<{ 
    liters: number; 
    glasses: number; 
    ounces: number;
    bottles: number;
    baseIntake: number;
    exerciseIntake: number;
    climateAdjustment: number;
  } | null>(null);

  // Weight unit options
  const weightUnits = [
    { value: 'kg', label: 'kg' },
    { value: 'lbs', label: 'lbs' }
  ];

  // Climate options with descriptions
  const climateOptions = [
    { value: 'cold', label: 'Cold Climate', description: 'Low temperatures, minimal sweating', icon: Thermometer },
    { value: 'normal', label: 'Normal Climate', description: 'Moderate temperatures', icon: Activity },
    { value: 'hot', label: 'Hot Climate', description: 'High temperatures, increased sweating', icon: Sun }
  ];

  // Convert weight to kg
  const convertWeightToKg = (value: number, unit: string): number => {
    return unit === 'kg' ? value : value * 0.453592;
  };

  const calculateWaterIntake = () => {
    const w = parseFloat(weight);
    const activityMins = parseFloat(activity);
    const ageNum = parseFloat(age);
    
    if (!w) return;
    
    // Convert weight to kg for calculation
    const weightInKg = convertWeightToKg(w, weightUnit);
    
    // Base water intake: 35ml per kg of body weight
    const baseIntake = weightInKg * 35;
    
    // Add for exercise: 12oz (355ml) per 30 minutes of exercise
    const exerciseIntake = (activityMins / 30) * 355;
    
    // Climate adjustment
    const climateMultipliers = {
      cold: 0.9,
      normal: 1.0,
      hot: 1.2
    };
    
    const climateAdjustment = climateMultipliers[climate as keyof typeof climateMultipliers];
    const totalIntakeML = (baseIntake + exerciseIntake) * climateAdjustment;
    
    // Age adjustment (older adults may need slightly less)
    const ageAdjustedIntake = ageNum > 65 ? totalIntakeML * 0.9 : totalIntakeML;
    
    const liters = ageAdjustedIntake / 1000;
    const glasses = ageAdjustedIntake / 250; // 250ml per glass
    const ounces = ageAdjustedIntake / 29.5735; // ml to fluid ounces
    const bottles = ageAdjustedIntake / 500; // 500ml water bottle
    
    setResult({
      liters: Math.round(liters * 100) / 100,
      glasses: Math.round(glasses),
      ounces: Math.round(ounces),
      bottles: Math.round(bottles * 10) / 10,
      baseIntake: Math.round(baseIntake),
      exerciseIntake: Math.round(exerciseIntake),
      climateAdjustment: climateAdjustment
    });
  };

  const reset = () => {
    setWeight('');
    setActivity('30');
    setClimate('normal');
    setWeightUnit('kg');
    setGender('male');
    setAge('');
    setResult(null);
  };

  const getHydrationLevel = () => {
    if (!result) return '';
    const totalML = result.liters * 1000;
    
    if (totalML < 2000) return 'Low';
    if (totalML < 3000) return 'Moderate';
    return 'High';
  };

  const getHydrationColor = () => {
    const level = getHydrationLevel();
    switch (level) {
      case 'Low': return 'text-red-600';
      case 'Moderate': return 'text-green-600';
      case 'High': return 'text-blue-600';
      default: return 'text-foreground';
    }
  };

  return (
    <>
      <Head>
        <title>Daily Water Intake Calculator | Hydration Needs - GrockTool.com</title>
        <meta name="description" content="Calculate your daily water intake needs based on weight, activity, climate, and age. Get personalized hydration recommendations in liters, glasses, and ounces for optimal health." />
        <meta name="keywords" content="water intake calculator, daily water calculator, hydration calculator, water intake per day, how much water should I drink, water calculator by weight, hydration needs calculator, water intake based on activity" />
        <meta property="og:title" content="Daily Water Intake Calculator | Hydration Needs - GrockTool.com" />
        <meta property="og:description" content="Calculate your personalized daily water intake based on your weight, activity level, climate, and age." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Water Intake Calculator - GrockTool.com" />
        <meta name="twitter:description" content="Calculate your daily hydration needs for optimal health and performance." />
        <link rel="canonical" href="https://grocktool.com/tools/water-intake-calculator" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Water Intake Calculator",
            "applicationCategory": "HealthApplication",
            "operatingSystem": "Any",
            "description": "Free water intake calculator to calculate daily hydration needs based on weight, activity level, climate, and age",
            "url": "https://grocktool.com/tools/water-intake-calculator",
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
            {/* Header */}
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
                  Daily Water Intake Calculator
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Get personalized hydration recommendations instantly — no signup required. Calculate your optimal water intake based on your lifestyle.
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
                    <Droplets size={20} className="text-blue-500" />
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

                  {/* Activity Input */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      Daily Exercise Duration (minutes)
                    </label>
                    <input
                      type="number"
                      value={activity}
                      onChange={(e) => setActivity(e.target.value)}
                      placeholder="e.g., 30"
                      className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg"
                      min="0"
                      max="1440"
                    />
                    <div className="flex flex-wrap gap-1 text-xs text-muted-foreground">
                      <span>Quick presets:</span>
                      {[0, 30, 60, 90, 120].map((mins) => (
                        <button 
                          key={mins}
                          onClick={() => setActivity(mins.toString())}
                          className="hover:text-foreground transition-colors"
                        >
                          {mins}m
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Climate Selection */}
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-foreground">
                      Climate Conditions
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      {climateOptions.map((climateOption) => {
                        const IconComponent = climateOption.icon;
                        return (
                          <button
                            key={climateOption.value}
                            onClick={() => setClimate(climateOption.value)}
                            className={`p-3 rounded-lg border text-left transition-all ${
                              climate === climateOption.value 
                                ? 'bg-accent text-accent-foreground border-accent' 
                                : 'bg-secondary text-secondary-foreground border-border hover:bg-secondary/80'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <IconComponent size={16} />
                              <div>
                                <div className="text-sm font-medium">{climateOption.label}</div>
                                <div className="text-xs opacity-80">{climateOption.description}</div>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={calculateWaterIntake}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent text-accent-foreground rounded-lg sm:rounded-xl hover:bg-accent/80 transition-colors text-sm sm:text-base"
                  >
                    <Calculator size={16} className="sm:w-4 sm:h-4" />
                    Calculate Water Intake
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
                  {/* Main Result */}
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground mb-2">Daily Water Requirement</div>
                    <div className="text-4xl font-bold text-foreground mb-2">
                      {result.liters}L
                    </div>
                    <div className={`text-lg font-semibold ${getHydrationColor()}`}>
                      {getHydrationLevel()} Hydration Level
                    </div>
                  </div>

                  {/* Measurement Breakdown */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20 text-center">
                      <div className="text-sm text-muted-foreground mb-1">Glasses</div>
                      <div className="text-lg font-bold text-foreground">{result.glasses}</div>
                      <div className="text-xs text-muted-foreground">250ml each</div>
                    </div>
                    <div className="bg-cyan-500/10 p-3 rounded-lg border border-cyan-500/20 text-center">
                      <div className="text-sm text-muted-foreground mb-1">Ounces</div>
                      <div className="text-lg font-bold text-foreground">{result.ounces}</div>
                      <div className="text-xs text-muted-foreground">fluid oz</div>
                    </div>
                    <div className="bg-sky-500/10 p-3 rounded-lg border border-sky-500/20 text-center">
                      <div className="text-sm text-muted-foreground mb-1">Bottles</div>
                      <div className="text-lg font-bold text-foreground">{result.bottles}</div>
                      <div className="text-xs text-muted-foreground">500ml bottles</div>
                    </div>
                    <div className="bg-indigo-500/10 p-3 rounded-lg border border-indigo-500/20 text-center">
                      <div className="text-sm text-muted-foreground mb-1">Total</div>
                      <div className="text-lg font-bold text-foreground">{Math.round(result.liters * 1000)}ml</div>
                      <div className="text-xs text-muted-foreground">milliliters</div>
                    </div>
                  </div>

                  {/* Calculation Breakdown */}
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="text-sm font-medium text-foreground mb-2">Calculation Breakdown:</div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>• Base intake: {result.baseIntake}ml (35ml per kg)</div>
                      <div>• Exercise: +{result.exerciseIntake}ml ({activity} minutes)</div>
                      <div>• Climate: ×{result.climateAdjustment} ({climateOptions.find(c => c.value === climate)?.label})</div>
                      {parseFloat(age) > 65 && <div>• Age adjustment: ×0.9 (senior hydration)</div>}
                      <div className="font-medium text-foreground mt-2">
                        Total: {Math.round(result.liters * 1000)}ml = {result.liters}L
                      </div>
                    </div>
                  </div>

                  {/* Hydration Schedule */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-foreground">Recommended Hydration Schedule:</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                      {[
                        { time: 'Morning', amount: Math.round(result.glasses * 0.3) },
                        { time: 'Afternoon', amount: Math.round(result.glasses * 0.4) },
                        { time: 'Evening', amount: Math.round(result.glasses * 0.2) },
                        { time: 'Night', amount: Math.round(result.glasses * 0.1) }
                      ].map((period, index) => (
                        <div key={index} className="bg-secondary/20 p-2 rounded-lg">
                          <div className="text-xs text-muted-foreground">{period.time}</div>
                          <div className="text-sm font-bold text-foreground">{period.amount} glasses</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Hydration Tips Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 mb-6 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-foreground mb-4">Hydration Tips & Guidelines</h2>
              <div className="space-y-3">
                <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                  <div className="text-sm font-medium text-foreground mb-1">💧 Optimal Hydration Habits</div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>• Drink water consistently throughout the day</div>
                    <div>• Keep a water bottle with you at all times</div>
                    <div>• Drink before you feel thirsty</div>
                    <div>• Monitor urine color - pale yellow indicates good hydration</div>
                  </div>
                </div>
                
                <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                  <div className="text-sm font-medium text-foreground mb-1">🥤 When to Increase Intake</div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>• During and after exercise</div>
                    <div>• In hot or humid weather</div>
                    <div>• When you're sick or have a fever</div>
                    <div>• During pregnancy or breastfeeding</div>
                  </div>
                </div>

                <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
                  <div className="text-sm font-medium text-foreground mb-1">⚠️ Signs of Dehydration</div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>• Dark yellow urine</div>
                    <div>• Dry mouth and lips</div>
                    <div>• Headaches and dizziness</div>
                    <div>• Fatigue and reduced concentration</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Info Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 mb-8 shadow-sm"
            >
              <h2 className="text-base sm:text-lg font-semibold text-foreground mb-3">How Water Intake Calculation Works</h2>
              <div className="space-y-2 text-muted-foreground text-sm">
                <p>
                  This calculator estimates your daily water needs using scientifically-backed formulas that 
                  consider your body weight, activity level, climate conditions, and age for personalized hydration guidance.
                </p>
                <div className="text-xs sm:text-sm space-y-1 pt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Enter your age, gender, weight, and daily exercise duration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Select your climate conditions for accurate adjustment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Click "Calculate Water Intake" to get personalized recommendations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>View results in multiple measurements and get hydration schedule</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Follow hydration tips for optimal health benefits</span>
                  </div>
                </div>
                <div className="text-xs sm:text-sm space-y-2 pt-3">
                  <div className="font-medium text-foreground">Calculation Formula:</div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-accent rounded-full"></div>
                    <span><strong>Base Intake:</strong> 35ml per kg of body weight</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-accent rounded-full"></div>
                    <span><strong>Exercise Adjustment:</strong> +355ml per 30 minutes of exercise</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-accent rounded-full"></div>
                    <span><strong>Climate Multiplier:</strong> Cold (0.9x), Normal (1.0x), Hot (1.2x)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-accent rounded-full"></div>
                    <span><strong>Age Adjustment:</strong> 10% reduction for seniors (65+)</span>
                  </div>
                </div>
                <div className="text-xs sm:text-sm space-y-2 pt-3">
                  <div className="font-medium text-foreground">Health Benefits of Proper Hydration:</div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                    <span>Improved physical performance and energy levels</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                    <span>Better cognitive function and concentration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                    <span>Enhanced digestion and nutrient absorption</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                    <span>Healthy skin and detoxification support</span>
                  </div>
                </div>
                <div className="text-xs sm:text-sm space-y-2 pt-3">
                  <div className="font-medium text-foreground">Important Notes:</div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
                    <span>Individual needs may vary based on health conditions and medications</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
                    <span>Consult healthcare professionals for personalized medical advice</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
                    <span>Water from food and other beverages also contributes to hydration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
                    <span>Adjust intake based on your body's signals and activity levels</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* SEO Content Section */}
            <section className="space-y-8">
              {/* What This Tool Does */}
              <article className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <h2 className="text-xl font-bold text-foreground mb-4">Daily Water Intake Calculator - What It Does</h2>
                <p className="text-muted-foreground mb-4">
                  This free water intake calculator helps you determine your optimal daily hydration needs based on multiple factors. It calculates how much water your body requires to function at its best, taking into account your unique circumstances for accurate, personalized recommendations.
                </p>
                <p className="text-muted-foreground">
                  The tool uses established hydration guidelines and scientific principles to estimate your water needs in liters, glasses, ounces, and standard water bottles. Whether you're an athlete, someone in a hot climate, or simply want to improve your daily hydration habits, this calculator provides clear, actionable guidance without complex manual calculations.
                </p>
              </article>

              {/* Use Cases */}
              <article className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <h2 className="text-xl font-bold text-foreground mb-4">Practical Applications of Water Intake Calculation</h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span><strong>Fitness & Athletic Training:</strong> Determine optimal hydration for workouts, endurance sports, and athletic performance to prevent dehydration during intense physical activity</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span><strong>Health & Wellness Planning:</strong> Establish proper hydration habits for weight management, detoxification, and overall health maintenance based on your specific needs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span><strong>Climate Adaptation:</strong> Adjust water intake for hot weather conditions, humid environments, or high-altitude locations where hydration needs increase significantly</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span><strong>Workplace Hydration:</strong> Plan water intake for physically demanding jobs, outdoor work, or office environments to maintain energy and focus throughout the day</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span><strong>Travel Planning:</strong> Calculate hydration needs for travel, especially to different climates or during long flights where dehydration is common</span>
                  </li>
                </ul>
              </article>

              {/* How to Use This Tool */}
              <article className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <h2 className="text-xl font-bold text-foreground mb-4">How to Use This Water Intake Calculator</h2>
                <ol className="space-y-4 text-muted-foreground pl-5">
                  <li className="pl-2">
                    <strong className="text-foreground">Enter Your Basic Information</strong>
                    <p className="mt-1">Input your age, select your gender, and enter your current body weight in either kilograms or pounds using the unit selector.</p>
                  </li>
                  <li className="pl-2">
                    <strong className="text-foreground">Specify Activity Level</strong>
                    <p className="mt-1">Enter your typical daily exercise duration in minutes. Use the quick presets for common workout lengths or enter your exact number.</p>
                  </li>
                  <li className="pl-2">
                    <strong className="text-foreground">Select Climate Conditions</strong>
                    <p className="mt-1">Choose your current climate - Cold, Normal, or Hot - based on your environment's temperature and humidity levels.</p>
                  </li>
                  <li className="pl-2">
                    <strong className="text-foreground">Calculate Your Results</strong>
                    <p className="mt-1">Click "Calculate Water Intake" to instantly get your personalized daily water requirement in multiple measurements.</p>
                  </li>
                  <li className="pl-2">
                    <strong className="text-foreground">Implement Your Hydration Plan</strong>
                    <p className="mt-1">Use the recommended hydration schedule, measurement breakdown, and practical tips to improve your daily water consumption habits.</p>
                  </li>
                </ol>
              </article>

              {/* Example Input and Output */}
              <article className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <h2 className="text-xl font-bold text-foreground mb-4">Water Intake Calculation Examples</h2>
                <p className="text-muted-foreground text-sm mb-4">
                  Below are realistic examples to help you understand how water needs vary based on different lifestyles and conditions.
                </p>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Example 1: Active Lifestyle in Normal Climate</h3>
                    <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                      <pre className="text-sm text-muted-foreground font-mono">
{`Input:
Age: 30 years
Gender: Male
Weight: 75 kg (165 lbs)
Exercise: 60 minutes daily
Climate: Normal

Calculation:
Base Intake: 75 kg × 35ml = 2,625ml
Exercise Adjustment: 60 min ÷ 30 × 355ml = 710ml
Total Before Climate: 2,625ml + 710ml = 3,335ml
Climate Multiplier: ×1.0 = 3,335ml
Final Daily Intake: 3.34 liters

Results:
• 3.34 liters per day
• 13 glasses (250ml each)
• 113 fluid ounces
• 6.7 standard water bottles (500ml)`}
                      </pre>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Example 2: Sedentary Senior in Hot Climate</h3>
                    <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                      <pre className="text-sm text-muted-foreground font-mono">
{`Input:
Age: 70 years
Gender: Female
Weight: 65 kg (143 lbs)
Exercise: 0 minutes daily
Climate: Hot

Calculation:
Base Intake: 65 kg × 35ml = 2,275ml
Exercise Adjustment: 0 ml
Total Before Climate: 2,275ml
Climate Multiplier: ×1.2 = 2,730ml
Age Adjustment: ×0.9 = 2,457ml
Final Daily Intake: 2.46 liters

Results:
• 2.46 liters per day
• 10 glasses (250ml each)
• 83 fluid ounces
• 4.9 standard water bottles (500ml)`}
                      </pre>
                    </div>
                  </div>
                </div>
              </article>

              {/* Related Tools Section */}
              <article className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <h2 className="text-xl font-bold text-foreground mb-4">Related Health & Wellness Tools</h2>
                <p className="text-muted-foreground mb-4">
                  Explore other useful calculators from GrockTool.com that complement this water intake calculator:
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
                    <Link href="/health-tools/calorie-calculator" className="text-accent hover:underline">
                      <strong>Calorie Calculator:</strong> Calculate your daily calorie needs and macronutrient targets
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
                </ul>
              </article>

              {/* Frequently Asked Questions */}
              <article className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <h2 className="text-xl font-bold text-foreground mb-4">Frequently Asked Questions About Water Intake</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Why is water intake calculation important for health?</h3>
                    <p className="text-muted-foreground">Proper hydration is essential for nearly every bodily function, including temperature regulation, joint lubrication, nutrient transport, and waste removal. Our water intake calculator helps you determine the right amount of water for your specific needs, preventing both dehydration and overhydration while supporting optimal physical and cognitive performance.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">How accurate is this water intake calculator compared to the "8 glasses a day" rule?</h3>
                    <p className="text-muted-foreground">This calculator is significantly more accurate than the generic "8 glasses a day" recommendation because it personalizes your water needs based on your actual body weight, activity level, climate, and age. The "8 glasses" rule is a rough average that doesn't account for individual differences, while our calculator provides tailored recommendations specific to your unique circumstances.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Should I drink more water if I'm trying to lose weight?</h3>
                    <p className="text-muted-foreground">Yes, adequate hydration can support weight loss efforts by helping with appetite control, improving metabolism, and replacing high-calorie beverages. However, our calculator already accounts for your current body weight, so follow the recommended amount. Drinking excessive water beyond your calculated needs won't accelerate weight loss and could potentially be harmful.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">How does climate affect my water intake needs?</h3>
                    <p className="text-muted-foreground">Climate significantly impacts hydration requirements. In hot or humid conditions, your body loses more water through sweat to cool itself, increasing your needs. Cold climates can also be dehydrating due to dry indoor air and increased respiratory water loss. Our calculator applies climate multipliers (0.9x for cold, 1.0x for normal, 1.2x for hot) to adjust your base water requirement accordingly.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">What if I drink other beverages like coffee, tea, or juice?</h3>
                    <p className="text-muted-foreground">While other beverages do contribute to your total fluid intake, water is the optimal choice for hydration without added calories, sugar, or caffeine. Our calculator assumes pure water intake. If you consume significant amounts of other beverages, you may need slightly less water, but be mindful of their sugar, caffeine, and calorie content. Water should remain your primary hydration source.</p>
                  </div>
                </div>
                
                {/* Medical Disclaimer */}
                <div className="mt-8 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Important Hydration Disclaimer</h3>
                  <p className="text-sm text-muted-foreground">
                    This water intake calculator provides estimates based on general guidelines and should be used for informational purposes only. Individual hydration needs can vary based on specific medical conditions, medications, pregnancy, breastfeeding, and other factors not accounted for in these calculations. Certain health conditions (like kidney disease, heart conditions, or adrenal issues) require specialized hydration guidance from medical professionals. Always consult with a qualified healthcare provider for personalized medical advice regarding your hydration needs, especially if you have underlying health conditions or take medications that affect fluid balance.
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