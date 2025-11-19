'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Droplets, Calculator, RotateCcw, ArrowLeft, Activity, Sun, Thermometer } from 'lucide-react';
import Link from 'next/link';

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
                Water Intake Calculator
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Calculate your daily water intake requirements based on your lifestyle
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
            <h3 className="text-lg font-semibold text-foreground mb-4">Hydration Tips & Guidelines</h3>
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
            className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
          >
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">How Water Intake Calculation Works</h3>
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
        </div>
      </div>
    </div>
  );
}