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

            {/* Updated Content Sections */}
            <section className="space-y-8">
              {/* Hydration Logic Section */}
              <article className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <h2 className="text-xl font-bold text-foreground mb-4">How Your Body Uses Water and Why It Matters</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Most people know they should drink water, but few understand exactly what happens inside their body when they do. It's not just about quenching thirst—every sip supports complex biological processes. Your body uses water as a transport system, carrying nutrients to cells and removing waste products. It acts as a temperature regulator through sweating, a joint lubricant to prevent friction, and even helps maintain blood pressure at healthy levels.
                  </p>
                  <p>
                    What's interesting is how your daily water needs fluctuate. They're not static numbers but shift with your activities, environment, and even the foods you eat. On days when you're mostly indoors with light activity, your requirements differ significantly from days spent outdoors in summer heat. This calculator accounts for those variables because drinking the same amount every day doesn't match how your body actually works.
                  </p>
                  <p>
                    The "drink eight glasses" advice oversimplifies things. A construction worker in Arizona needs different hydration than an office worker in Seattle, even if they weigh the same. That's why we consider climate and activity—two factors that dramatically change how much water your body loses through sweat and respiration.
                  </p>
                  <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20 mt-4">
                    <h3 className="text-lg font-semibold text-foreground mb-2">Why Timing Matters</h3>
                    <p className="text-sm">
                      Drinking all your water at once doesn't work well. Your body can only absorb about 800-1000ml per hour effectively. The rest gets excreted without proper hydration benefits. That's why we suggest spreading intake throughout the day—it matches your body's absorption capacity and maintains steady hydration levels.
                    </p>
                  </div>
                </div>
              </article>

              {/* Weight-Based Formula Section */}
              <article className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <h2 className="text-xl font-bold text-foreground mb-4">How Your Weight Determines Your Base Hydration Needs</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    The 35ml-per-kg formula might seem arbitrary, but it's grounded in physiological reality. Larger bodies have more cells that need hydration, greater blood volume to maintain, and typically more muscle mass that requires water for optimal function. Think of it this way: every kilogram of your body needs water to function properly, so it makes sense that hydration scales with your size.
                  </p>
                  <p>
                    Here's what that 35ml per kg actually covers: approximately 20ml goes toward basic metabolic processes in your cells, 8ml supports kidney function and waste removal, 4ml maintains digestive processes, and the remaining 3ml accounts for minimal daily water loss through breathing and skin evaporation under normal conditions.
                  </p>
                  <p>
                    This base calculation assumes you're at rest in a comfortable environment. It's your starting point—the water you'd need if you spent the day lounging around at 22°C (72°F) with minimal movement. From there, we add adjustments for everything else you do.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                      <h4 className="font-semibold text-foreground mb-2">Muscle vs. Fat</h4>
                      <p className="text-sm">
                        Muscle tissue contains about 75-80% water, while fat tissue is only 10-15% water. This means two people at the same weight can have different hydration needs based on their body composition. Our calculator uses weight as a practical measure since most people don't know their exact muscle percentage.
                      </p>
                    </div>
                    <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                      <h4 className="font-semibold text-foreground mb-2">The Age Factor</h4>
                      <p className="text-sm">
                        As we get older, our kidneys become slightly less efficient at conserving water, and thirst signals can weaken. However, total body water percentage also decreases. The 10% reduction for those over 65 balances these factors—maintaining hydration without overburdening aging kidneys.
                      </p>
                    </div>
                  </div>
                </div>
              </article>

              {/* Examples Section */}
              <article className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <h2 className="text-xl font-bold text-foreground mb-4">Real-Life Scenarios: How Different Lifestyles Affect Water Needs</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">The Weekend Hiker</h3>
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-muted-foreground mb-3">
                        Sarah, 32, plans a 4-hour mountain hike on a warm Saturday. She weighs 68kg and typically drinks about 2 liters on office days. During her hike, she'll need significantly more:
                      </p>
                      <ul className="space-y-2 text-sm text-muted-foreground pl-4">
                        <li className="flex items-start">
                          <span className="text-accent mr-2">•</span>
                          <span><strong>Base needs:</strong> 68kg × 35ml = 2,380ml</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-accent mr-2">•</span>
                          <span><strong>Exercise:</strong> 240 minutes ÷ 30 × 355ml = 2,840ml additional</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-accent mr-2">•</span>
                          <span><strong>Climate:</strong> Warm weather multiplier (1.2×) applied</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-accent mr-2">•</span>
                          <span><strong>Total:</strong> Approximately 6.3 liters for that day</span>
                        </li>
                      </ul>
                      <p className="text-sm text-muted-foreground mt-3">
                        The key insight here? Sarah needs to drink about 500ml every hour during her hike, not just before and after. Spreading it out prevents dehydration while avoiding the discomfort of drinking too much at once.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">The Office Worker in Air Conditioning</h3>
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-muted-foreground mb-3">
                        Michael, 45, works in a climate-controlled office 9 hours a day. He walks 20 minutes to work but otherwise sits at his desk. His needs look different:
                      </p>
                      <ul className="space-y-2 text-sm text-muted-foreground pl-4">
                        <li className="flex items-start">
                          <span className="text-accent mr-2">•</span>
                          <span><strong>Weight:</strong> 82kg gives base of 2,870ml</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-accent mr-2">•</span>
                          <span><strong>Activity:</strong> Just 20 minutes walking adds minimal exercise water</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-accent mr-2">•</span>
                          <span><strong>Climate twist:</strong> Air conditioning is dehydrating—we still use normal climate setting but with a note about dry air</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-accent mr-2">•</span>
                          <span><strong>Total:</strong> About 3.1 liters daily</span>
                        </li>
                      </ul>
                      <p className="text-sm text-muted-foreground mt-3">
                        Michael's challenge isn't quantity but remembering to drink while focused on work. Setting hourly reminders or keeping a visible water bottle helps more than trying to drink large amounts at lunch.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">The New Parent Up All Night</h3>
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-muted-foreground mb-3">
                        Jamal, 29, is getting broken sleep with a newborn. His activity consists of light housework and baby care, not traditional "exercise," but his needs still shift:
                      </p>
                      <ul className="space-y-2 text-sm text-muted-foreground pl-4">
                        <li className="flex items-start">
                          <span className="text-accent mr-2">•</span>
                          <span><strong>Weight-based:</strong> 77kg = 2,695ml base</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-accent mr-2">•</span>
                          <span><strong>Activity adjustment:</strong> We count 2 hours of light activity throughout day/night</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-accent mr-2">•</span>
                          <span><strong>Sleep factor:</strong> Less sleep can increase mild dehydration risk</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-accent mr-2">•</span>
                          <span><strong>Total:</strong> Approximately 3.4 liters, spread across waking hours</span>
                        </li>
                      </ul>
                      <p className="text-sm text-muted-foreground mt-3">
                        For Jamal, keeping water by the nightstand for those late-night feedings makes more sense than trying to meet needs entirely during daytime hours. Small, frequent sips work better than large glasses.
                      </p>
                    </div>
                  </div>
                </div>
              </article>

              {/* Health Disclaimer Section */}
              <article className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <h2 className="text-xl font-bold text-foreground mb-4">Important Considerations About Your Health and Hydration</h2>
                <div className="space-y-4 text-muted-foreground">
                  <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20 mb-4">
                    <h3 className="text-lg font-semibold text-foreground mb-2">When Our Calculator Is a Starting Point, Not a Prescription</h3>
                    <p>
                      This tool provides general recommendations for healthy adults. If you have specific medical conditions, your needs may differ significantly. For instance, people with heart failure or severe kidney disease often need to restrict fluids, while those with certain metabolic conditions might require more.
                    </p>
                  </div>
                  
                  <p>
                    Medications dramatically affect hydration too. Diuretics (water pills) increase urine output, while some antidepressants and blood pressure medications can cause dry mouth that might feel like dehydration. If you're on regular medication, it's worth discussing hydration with your doctor rather than relying solely on calculators.
                  </p>
                  
                  <p>
                    Pregnancy and breastfeeding create unique hydration demands. During pregnancy, blood volume increases by about 50%, and amniotic fluid needs regular replenishment. Breastfeeding mothers produce milk that's about 90% water. In these cases, thirst is usually a reliable guide, but adding 750-1000ml to your calculated needs is a reasonable starting point.
                  </p>
                  
                  <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20 mt-4">
                    <h4 className="font-semibold text-foreground mb-2">Signs You Should Consult a Doctor</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Consistently producing very small amounts of dark urine despite adequate fluid intake</li>
                      <li>• Sudden, extreme increases in thirst that don't correlate with activity or climate changes</li>
                      <li>• Swelling in hands, feet, or ankles when increasing water intake</li>
                      <li>• Difficulty balancing fluid intake with medical conditions like diabetes or hypertension</li>
                    </ul>
                  </div>
                  
                  <p className="pt-4">
                    Remember that about 20% of our daily water comes from foods, especially fruits, vegetables, soups, and even coffee or tea. If your diet is rich in watermelon, cucumbers, oranges, or broth-based soups, you're getting hydration from sources beyond your water glass. This calculator focuses on drinking water, but your total fluid intake includes these dietary sources.
                  </p>
                </div>
              </article>

              {/* FAQs Section */}
              <article className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <h2 className="text-xl font-bold text-foreground mb-4">Common Questions About Hydration</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">I often forget to drink water until I'm thirsty. Is that okay?</h3>
                    <p className="text-muted-foreground">
                      Thirst means you're already mildly dehydrated—about 1-2% below optimal hydration. At that point, you might notice reduced concentration or slight fatigue. It's better to drink regularly before thirst hits. Try linking water to daily habits: a glass after brushing teeth, one with each meal, and sips during natural breaks in your day. Your body will thank you with better energy levels.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Can I drink too much water? What happens then?</h3>
                    <p className="text-muted-foreground">
                      Yes, though it's rare for healthy adults with normal kidney function. Water intoxication (hyponatremia) occurs when you drink so much that sodium levels in your blood become dangerously diluted. Symptoms include nausea, headache, confusion, and in severe cases, seizures. Most cases occur in endurance athletes who drink enormous quantities without electrolytes. For everyday hydration, your kidneys can handle up to about 15 liters per day, but sticking to your calculated needs eliminates this risk entirely.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Does coffee and tea count toward my daily water intake, or do they dehydrate me?</h3>
                    <p className="text-muted-foreground">
                      This is a persistent myth. While caffeine has a mild diuretic effect, the water in coffee or tea more than compensates. A 2003 study in the Journal of Human Nutrition and Dietetics found no significant difference in hydration between those drinking caffeinated beverages and plain water. So yes, your morning coffee counts. Just be mindful of added sugar or cream, and remember that very large amounts of caffeine (more than 500mg daily) might have stronger diuretic effects.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">I'm trying to lose weight. Will drinking more water help?</h3>
                    <p className="text-muted-foreground">
                      It can support weight loss in several ways. First, drinking water before meals can create a sense of fullness, potentially reducing calorie intake. Second, replacing sugary drinks with water eliminates empty calories. Third, adequate hydration supports metabolic processes. However, water alone won't cause weight loss—it works best as part of a balanced approach with healthy eating and activity. Don't expect miracles from excessive water consumption.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">My urine is always clear. Does that mean I'm perfectly hydrated?</h3>
                    <p className="text-muted-foreground">
                      Clear urine often means you're well-hydrated, but consistently crystal-clear urine might indicate you're drinking more than necessary. Pale straw color is the ideal target. If your urine is always clear and you're making frequent bathroom trips, you might be slightly overdoing it. Conversely, dark yellow or amber urine suggests you need more fluids. Remember that some medications and supplements (like B vitamins) can affect urine color independently of hydration.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">I exercise first thing in the morning. Should I drink before my workout if I haven't had water all night?</h3>
                    <p className="text-muted-foreground">
                      Absolutely. Overnight, you lose water through breathing and minimal sweating. Drinking 250-500ml of water 30 minutes before morning exercise helps offset this. During your workout, sip regularly (about 150-200ml every 15-20 minutes for moderate exercise). Afterward, replace what you've lost—a good rule is to drink 500ml for every pound of sweat loss, but since few people weigh themselves pre- and post-exercise, drinking until your urine returns to pale yellow works well.
                    </p>
                  </div>
                  
                  <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                    <h3 className="text-lg font-semibold text-foreground mb-2">Quick Hydration Checklist</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        <span><strong>Morning:</strong> Drink within an hour of waking to rehydrate after sleep</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        <span><strong>Meals:</strong> Have a glass with each meal to aid digestion</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        <span><strong>Activity:</strong> Sip during exercise, don't guzzle after</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        <span><strong>Evening:</strong> Reduce intake 2 hours before bed to avoid sleep disruptions</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        <span><strong>Monitor:</strong> Check urine color midday as a quick hydration check</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </article>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}