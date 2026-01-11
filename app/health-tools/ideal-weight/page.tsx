'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Calculator, RotateCcw, ArrowLeft, Scale, Ruler, User, Bone, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';

export default function IdealWeight() {
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [frame, setFrame] = useState('medium');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [result, setResult] = useState<{
    robinson: number;
    miller: number;
    devine: number;
    hamwi: number;
    range: { min: number; max: number };
    bmiRange: { min: number; max: number };
    average: number;
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
  const heightUnits = [
    { value: 'cm', label: 'cm' },
    { value: 'ft', label: 'ft' },
    { value: 'in', label: 'inches' }
  ];

  const weightUnits = [
    { value: 'kg', label: 'kg' },
    { value: 'lbs', label: 'lbs' },
    { value: 'st', label: 'st' }
  ];

  // Body frame options
  const frameOptions = [
    { value: 'small', label: 'Small Frame', description: 'Slender build, smaller bones' },
    { value: 'medium', label: 'Medium Frame', description: 'Average build' },
    { value: 'large', label: 'Large Frame', description: 'Larger build, bigger bones' }
  ];

  // FAQ Data - UPDATED
  const faqData = [
    {
      question: "Why do I get four different ideal weight numbers?",
      answer: "That's actually a good sign—it means the calculator is working properly! Each formula was developed at different times for different purposes. Robinson (1983) is considered most accurate today, while Hamwi (1964) reflects older standards. The variation between them accounts for differences in how researchers defined 'ideal' across decades. Taking the average gives you a balanced modern recommendation that considers all these perspectives."
    },
    {
      question: "My actual weight is outside the healthy BMI range—should I be worried?",
      answer: "Not necessarily. BMI has limitations—it doesn't distinguish between muscle and fat. If you're athletic with significant muscle mass, you might show as 'overweight' on BMI while being perfectly healthy. Conversely, some people fall in the 'normal' range but have poor body composition. Use these numbers as a starting point, not a verdict. If you're concerned, consider getting a body composition analysis or consult with a healthcare provider who can look at your overall health picture."
    },
    {
      question: "How accurate is the body frame adjustment?",
      answer: "The frame adjustment (+/- 10%) is a practical estimate based on clinical experience rather than precise science. People with larger bone structures naturally weigh more, but there's no universal measurement for 'large frame.' The adjustment helps personalize results, but it's still an approximation. If you're unsure about your frame size, medium is usually a safe default that works for most people."
    },
    {
      question: "I'm trying to gain muscle—should I ignore these ideal weight numbers?",
      answer: "Not ignore, but interpret them differently. If you're actively strength training, your healthy weight range will likely be higher than what these formulas suggest. Muscle tissue is denser than fat, so you can weigh more while looking leaner. Pay more attention to how your clothes fit, your energy levels, and your strength progress than chasing a specific number on the scale. Body composition matters more than total weight for athletes."
    },
    {
      question: "Why does the calculator reduce weight recommendations for people over 65?",
      answer: "As we age, we typically lose muscle mass (about 3-8% per decade after 30) and our metabolism slows. The 5% reduction for seniors accounts for these natural changes while still maintaining healthy body function. However, maintaining muscle through strength training becomes increasingly important with age. The focus should shift from weight alone to preserving muscle mass and functional ability."
    }
  ];

  // Convert height to cm
  const convertHeightToCm = (value: number, unit: string): number => {
    switch (unit) {
      case 'cm': return value;
      case 'ft': return value * 30.48;
      case 'in': return value * 2.54;
      default: return value;
    }
  };

  // Convert weight from kg to desired unit
  const convertWeightFromKg = (value: number, unit: string): number => {
    switch (unit) {
      case 'kg': return value;
      case 'lbs': return value * 2.20462;
      case 'st': return value * 0.157473;
      default: return value;
    }
  };

  // Get placeholder based on unit
  const getPlaceholder = (unit: string): string => {
    const placeholders: any = {
      height: {
        'cm': 'e.g., 175',
        'ft': 'e.g., 5.75',
        'in': 'e.g., 69'
      }
    };
    return placeholders.height[unit] || 'e.g., 0';
  };

  const calculateIdealWeight = () => {
    const h = parseFloat(height);
    const a = parseFloat(age);
    
    if (!h) return;
    
    // Convert height to cm for calculations
    const heightInCm = convertHeightToCm(h, heightUnit);
    const heightInches = heightInCm / 2.54;
    
    // Robinson Formula (1983)
    let robinson: number;
    if (gender === 'male') {
      robinson = 52 + 1.9 * (heightInches - 60);
    } else {
      robinson = 49 + 1.7 * (heightInches - 60);
    }
    
    // Miller Formula (1983)
    let miller: number;
    if (gender === 'male') {
      miller = 56.2 + 1.41 * (heightInches - 60);
    } else {
      miller = 53.1 + 1.36 * (heightInches - 60);
    }
    
    // Devine Formula (1974)
    let devine: number;
    if (gender === 'male') {
      devine = 50 + 2.3 * (heightInches - 60);
    } else {
      devine = 45.5 + 2.3 * (heightInches - 60);
    }
    
    // Hamwi Formula (1964)
    let hamwi: number;
    if (gender === 'male') {
      hamwi = 48 + 2.7 * (heightInches - 60);
    } else {
      hamwi = 45.5 + 2.2 * (heightInches - 60);
    }
    
    // Frame adjustment
    const frameMultipliers = {
      small: 0.9,
      medium: 1.0,
      large: 1.1
    };
    
    const frameMultiplier = frameMultipliers[frame as keyof typeof frameMultipliers];
    
    // Apply frame adjustment
    robinson *= frameMultiplier;
    miller *= frameMultiplier;
    devine *= frameMultiplier;
    hamwi *= frameMultiplier;
    
    // Healthy BMI range (18.5-24.9)
    const heightM = heightInCm / 100;
    const minWeight = 18.5 * heightM * heightM;
    const maxWeight = 24.9 * heightM * heightM;
    
    // Age adjustment (slight reduction for older adults)
    const ageAdjustedMultiplier = a > 65 ? 0.95 : 1.0;
    
    const finalRobinson = robinson * ageAdjustedMultiplier;
    const finalMiller = miller * ageAdjustedMultiplier;
    const finalDevine = devine * ageAdjustedMultiplier;
    const finalHamwi = hamwi * ageAdjustedMultiplier;
    const finalMinWeight = minWeight * ageAdjustedMultiplier;
    const finalMaxWeight = maxWeight * ageAdjustedMultiplier;
    
    const average = (finalRobinson + finalMiller + finalDevine + finalHamwi) / 4;
    
    setResult({
      robinson: finalRobinson,
      miller: finalMiller,
      devine: finalDevine,
      hamwi: finalHamwi,
      range: {
        min: finalMinWeight,
        max: finalMaxWeight
      },
      bmiRange: {
        min: 18.5,
        max: 24.9
      },
      average
    });
  };

  const reset = () => {
    setHeight('');
    setAge('');
    setResult(null);
  };

  // Format weight based on selected unit
  const formatWeight = (weight: number): string => {
    const converted = convertWeightFromKg(weight, weightUnit);
    return Math.round(converted).toString();
  };

  return (
    <>
      <Head>
        <title>Ideal Weight Calculator | Find Your Healthy Weight Range - GrockTool.com</title>
        <meta name="description" content="Calculate your ideal weight using Robinson, Miller, Devine & Hamwi formulas. Get personalized recommendations based on height, age, gender, and body frame size." />
        <meta name="keywords" content="ideal weight calculator, healthy weight calculator, ideal body weight calculator, weight calculator by height, ideal weight for height, healthy weight range, body frame calculator, weight recommendations" />
        <meta property="og:title" content="Ideal Weight Calculator | Find Your Healthy Weight Range - GrockTool.com" />
        <meta property="og:description" content="Calculate your ideal weight instantly using multiple scientific formulas. Get personalized recommendations based on your body frame and age." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ideal Weight Calculator - GrockTool.com" />
        <meta name="twitter:description" content="Find your perfect healthy weight range based on scientific formulas and body frame size." />
        <link rel="canonical" href="https://grocktool.com/health-tools/ideal-weight" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Ideal Weight Calculator",
            "applicationCategory": "HealthApplication",
            "operatingSystem": "Any",
            "description": "Free ideal weight calculator using Robinson, Miller, Devine, and Hamwi formulas to determine healthy weight range",
            "url": "https://grocktool.com/health-tools/ideal-weight",
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
              "Robinson formula calculation",
              "Miller formula calculation",
              "Devine formula calculation",
              "Hamwi formula calculation",
              "Body frame size adjustment",
              "Age adjustment",
              "Healthy BMI range"
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
                  Ideal Weight Calculator
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Discover your perfect healthy weight range in under 5 seconds using scientifically validated formulas.
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
                    <User size={20} className="text-blue-500" />
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

                  {/* Height Input */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Ruler size={16} className="text-blue-500" />
                      <label className="block text-sm font-medium text-foreground">
                        Height
                      </label>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        placeholder={getPlaceholder(heightUnit)}
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
                    <div className="flex flex-wrap gap-1 text-xs text-muted-foreground">
                      <span>Units:</span>
                      {heightUnits.map((unit) => (
                        <button 
                          key={unit.value}
                          onClick={() => setHeightUnit(unit.value)}
                          className={`hover:text-foreground transition-colors ${
                            heightUnit === unit.value ? 'text-accent font-medium' : ''
                          }`}
                        >
                          {unit.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Body Frame Selection */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Bone size={16} className="text-blue-500" />
                      <label className="block text-sm font-medium text-foreground">
                        Body Frame Size
                      </label>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {frameOptions.map((frameOption) => (
                        <button
                          key={frameOption.value}
                          onClick={() => setFrame(frameOption.value)}
                          className={`p-3 rounded-lg border text-left transition-all ${
                            frame === frameOption.value 
                              ? 'bg-accent text-accent-foreground border-accent' 
                              : 'bg-secondary text-secondary-foreground border-border hover:bg-secondary/80'
                          }`}
                        >
                          <div>
                            <div className="text-sm font-medium">{frameOption.label}</div>
                            <div className="text-xs opacity-80">{frameOption.description}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Weight Unit Selection */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Scale size={16} className="text-blue-500" />
                      <label className="block text-sm font-medium text-foreground">
                        Display Weight In
                      </label>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {weightUnits.map((unit) => (
                        <button
                          key={unit.value}
                          onClick={() => setWeightUnit(unit.value)}
                          className={`p-3 rounded-lg border transition-all ${
                            weightUnit === unit.value 
                              ? 'bg-accent text-accent-foreground border-accent' 
                              : 'bg-secondary text-secondary-foreground border-border hover:bg-secondary/80'
                          }`}
                        >
                          <div className="text-sm font-medium">{unit.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={calculateIdealWeight}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent text-accent-foreground rounded-lg sm:rounded-xl hover:bg-accent/80 transition-colors text-sm sm:text-base"
                  >
                    <Calculator size={16} className="sm:w-4 sm:h-4" />
                    Calculate Ideal Weight
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
                  {/* Average Result */}
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground mb-2">Recommended Ideal Weight</div>
                    <div className="text-4xl font-bold text-foreground mb-2">
                      {formatWeight(result.average)} {weightUnit}
                    </div>
                    <div className="text-lg text-muted-foreground">
                      Average of all formulas
                    </div>
                  </div>

                  {/* Formula Results */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20 text-center">
                      <div className="text-sm text-muted-foreground mb-1">Robinson</div>
                      <div className="text-lg font-bold text-foreground">{formatWeight(result.robinson)}</div>
                      <div className="text-xs text-muted-foreground">{weightUnit}</div>
                    </div>
                    <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20 text-center">
                      <div className="text-sm text-muted-foreground mb-1">Miller</div>
                      <div className="text-lg font-bold text-foreground">{formatWeight(result.miller)}</div>
                      <div className="text-xs text-muted-foreground">{weightUnit}</div>
                    </div>
                    <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20 text-center">
                      <div className="text-sm text-muted-foreground mb-1">Devine</div>
                      <div className="text-lg font-bold text-foreground">{formatWeight(result.devine)}</div>
                      <div className="text-xs text-muted-foreground">{weightUnit}</div>
                    </div>
                    <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20 text-center">
                      <div className="text-sm text-muted-foreground mb-1">Hamwi</div>
                      <div className="text-lg font-bold text-foreground">{formatWeight(result.hamwi)}</div>
                      <div className="text-xs text-muted-foreground">{weightUnit}</div>
                    </div>
                  </div>

                  {/* Healthy BMI Range */}
                  <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                    <div className="text-sm font-medium text-foreground mb-2">Healthy BMI Range</div>
                    <div className="text-center mb-2">
                      <div className="text-2xl font-bold text-foreground">
                        {formatWeight(result.range.min)} - {formatWeight(result.range.max)} {weightUnit}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        BMI {result.bmiRange.min} - {result.bmiRange.max}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      This range represents a healthy weight based on Body Mass Index calculations
                    </div>
                  </div>

                  {/* Adjustments Applied */}
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="text-sm font-medium text-foreground mb-2">Adjustments Applied:</div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>• Body Frame: {frameOptions.find(f => f.value === frame)?.label} ({frame === 'small' ? '-10%' : frame === 'large' ? '+10%' : 'no adjustment'})</div>
                      {parseFloat(age) > 65 && <div>• Age: 5% reduction (senior adjustment)</div>}
                      <div>• Gender: {gender === 'male' ? 'Male' : 'Female'} formulas applied</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Formula Information Card - UPDATED */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 mb-6 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-foreground mb-4">How These Weight Formulas Actually Work</h2>
              <div className="space-y-4">
                <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                  <div className="text-sm font-medium text-foreground mb-2">📊 Where These Numbers Come From</div>
                  <p className="text-sm text-muted-foreground mb-3">
                    You might wonder why we use four different formulas instead of just one. The truth is, each formula was developed during different eras with different medical philosophies about what "ideal" weight means. They're all based on statistical analysis of height-weight data from large populations, but they weight factors differently.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    The Robinson formula (1983) is generally considered the most accurate today because it used more recent and diverse population data. It starts with a base weight (52kg for men, 49kg for women) and adds a specific amount for each inch over 5 feet. The Miller formula from the same year uses slightly different coefficients, while Devine (1974) was developed for medication dosing. Hamwi (1964) is the oldest and tends to give the highest estimates, reflecting different historical standards.
                  </p>
                </div>
                
                <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                  <div className="text-sm font-medium text-foreground mb-2">⚖️ Why Gender Matters in the Calculations</div>
                  <p className="text-sm text-muted-foreground">
                    Men and women have different body compositions—men typically have more muscle mass and less body fat at the same height. The formulas account for this through different starting points and growth rates. Men's formulas start about 2-6kg higher than women's at 5 feet tall. This isn't arbitrary; it reflects biological reality where muscle tissue weighs more than fat tissue, and men's bodies naturally carry more lean mass.
                  </p>
                </div>

                <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                  <div className="text-sm font-medium text-foreground mb-2">📐 The Height Conversion Behind the Scenes</div>
                  <p className="text-sm text-muted-foreground">
                    Internally, the calculator converts everything to centimeters and kilograms for precision, then converts back to your preferred units. This avoids rounding errors that can occur with imperial units. The inch-based formulas work because they were developed using imperial measurements, but modern implementations use metric conversions for accuracy. The height adjustment for each inch over 5 feet ranges from 1.36kg to 2.7kg depending on the formula and gender.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Health Guidelines Card - UPDATED */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 mb-8 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-foreground mb-4">What Your Results Actually Mean for Your Health</h2>
              <div className="space-y-4">
                <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                  <div className="text-sm font-medium text-foreground mb-2">🎯 Understanding the Range, Not Just the Number</div>
                  <p className="text-sm text-muted-foreground mb-3">
                    The most important result isn't the single average number, but the healthy BMI range shown below it. That range (typically about 20-30 pounds wide) represents where your weight could healthily fall. If you're within that range, you're in a good place regardless of which formula you look at. The average gives you a target, but the range shows flexibility based on your individual body composition.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    People often fixate on hitting the exact average number, but that's not necessary for health. Your weight naturally fluctuates by several pounds throughout the day based on hydration, digestion, and other factors. Being consistently within the healthy range matters more than hitting a specific target weight.
                  </p>
                </div>
                
                <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                  <div className="text-sm font-medium text-foreground mb-2">💪 When These Numbers Don't Tell the Whole Story</div>
                  <p className="text-sm text-muted-foreground mb-3">
                    These formulas work well for the average person, but they have limitations. If you're an athlete with significant muscle mass, you might weigh more than the "ideal" while being perfectly healthy. Conversely, someone could fall within the healthy BMI range but have poor body composition (too much fat, not enough muscle).
                  </p>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div className="flex items-start">
                      <span className="text-accent mr-2">•</span>
                      <span><strong>Athletes:</strong> Muscle weighs more than fat—you might be "overweight" by these standards but healthy by body composition</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-accent mr-2">•</span>
                      <span><strong>Elderly:</strong> The 5% reduction accounts for age, but maintaining muscle becomes more important than weight alone</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-accent mr-2">•</span>
                      <span><strong>Medical conditions:</strong> Some conditions affect fluid retention or metabolism, making these formulas less applicable</span>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/20">
                  <div className="text-sm font-medium text-foreground mb-2">🎯 Practical Application: What to Do with Your Results</div>
                  <p className="text-sm text-muted-foreground">
                    Instead of obsessing over daily scale readings, use these numbers as long-term guides. If you're outside the healthy range, consider gradual changes rather than rapid weight loss or gain. Losing 1-2 pounds per week or gaining 0.5-1 pound per week is sustainable. Focus on habits—eating nutrient-dense foods, staying active, getting enough sleep—rather than just the number on the scale. Your weight is one health indicator among many, not the only one that matters.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* SEO Content Section with Dropdowns - UPDATED */}
            <section className="space-y-4">
              {/* Formula Used - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('whatItDoes')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h2 className="text-xl font-bold text-foreground">The Formulas Behind Your Ideal Weight Calculation</h2>
                  {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.whatItDoes && (
                  <div className="px-6 pb-6">
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        When you use this calculator, you're actually getting insights from four different medical formulas developed over five decades. Each formula tells a slightly different story about what researchers considered "ideal" at different points in history. Understanding where these numbers come from helps you interpret your results more effectively.
                      </p>
                      
                      <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                        <h3 className="text-lg font-semibold text-foreground mb-2">The Evolution of Ideal Weight Standards</h3>
                        <p className="mb-2">
                          Dr. G. J. Hamwi published his formula in 1964, creating a simple rule for clinicians: 106 pounds for men at 5 feet, plus 6 pounds per additional inch (100 pounds + 5 pounds per inch for women). This was designed as a quick mental calculation for doctors assessing patients.
                        </p>
                        <p className="mb-2">
                          A decade later in 1974, Dr. B. J. Devine developed his formula specifically for medication dosing. He needed accurate estimates of lean body mass to calculate proper drug dosages. His formula became widely adopted in hospitals and remains in use today for certain clinical applications.
                        </p>
                        <p>
                          By 1983, researchers J. D. Robinson and D. R. Miller independently published updated formulas based on newer, more comprehensive population data. These formulas generally produce lower "ideal" weights than their predecessors, reflecting changing understanding of health risks associated with weight.
                        </p>
                      </div>
                      
                      <p>
                        The mathematical structure is similar across formulas: a base weight at 5 feet tall, plus a specific amount per additional inch. What changes are the coefficients. For men, Robinson adds 1.9kg per inch, Miller adds 1.41kg, Devine adds 2.3kg, and Hamwi adds 2.7kg. These differences might seem small, but they add up significantly for taller individuals.
                      </p>
                      
                      <p>
                        Why do we still use older formulas like Hamwi and Devine? Because they're embedded in medical literature and clinical practice. Some hospital protocols still reference these older standards. By showing you all four results, you get to see how medical thinking has evolved and where the consensus lies today.
                      </p>
                    </div>
                  </div>
                )}
              </article>

              {/* Result Interpretation - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('howToUse')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h2 className="text-xl font-bold text-foreground">How to Make Sense of Your Ideal Weight Results</h2>
                  {openSections.howToUse ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.howToUse && (
                  <div className="px-6 pb-6">
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        Getting your results is just the beginning—interpreting them correctly matters more. Here's how to think about those numbers in practical, health-focused ways.
                      </p>
                      
                      <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                        <h3 className="text-lg font-semibold text-foreground mb-2">The Healthy BMI Range: Your Most Important Result</h3>
                        <p className="mb-2">
                          The healthy BMI range (18.5-24.9) shown with your results isn't just an afterthought—it's actually more scientifically valid than the ideal weight formulas. This range comes from decades of epidemiological research linking weight to health outcomes.
                        </p>
                        <p>
                          If your current weight falls within this range, you're in a statistically healthy zone regardless of what the individual formulas say. The range accounts for natural variations in body composition that the formulas can't capture. Someone at the lower end might have a smaller frame, while someone at the higher end might have more muscle mass—both can be equally healthy.
                        </p>
                      </div>
                      
                      <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                        <h3 className="text-lg font-semibold text-foreground mb-2">When Your Weight Doesn't Match the Formulas</h3>
                        <p className="mb-2">
                          If your actual weight differs significantly from the recommendations, don't panic. Consider these possibilities:
                        </p>
                        <ul className="space-y-2 text-sm pl-4">
                          <li className="flex items-start">
                            <span className="text-accent mr-2">•</span>
                            <span><strong>Muscle vs. Fat:</strong> Are you strength training regularly? Muscle is denser than fat—you might weigh more but be leaner.</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-accent mr-2">•</span>
                            <span><strong>Frame Size:</strong> Did you select the right frame? People often underestimate their frame size—your wrists and ankles can give clues.</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-accent mr-2">•</span>
                            <span><strong>Recent Changes:</strong> Have you gained or lost weight recently? Your body might still be adjusting to a new normal.</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-accent mr-2">•</span>
                            <span><strong>Hydration:</strong> Your weight can fluctuate by 2-4 pounds daily based on water retention and digestion.</span>
                          </li>
                        </ul>
                      </div>
                      
                      <p>
                        Instead of focusing solely on weight, consider other health markers: How do your clothes fit? What's your energy level like? How's your sleep quality? Do you have strength for daily activities? These subjective measures often tell you more about your health than the scale alone.
                      </p>
                      
                      <p>
                        If you decide to make changes based on these results, aim for gradual progress. Trying to lose or gain weight too quickly usually backfires. Sustainable changes come from small, consistent adjustments to eating and activity patterns, not drastic diets or extreme exercise regimens.
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
                  <h2 className="text-xl font-bold text-foreground">Real People, Real Results: How Ideal Weight Varies</h2>
                  {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.examples && (
                  <div className="px-6 pb-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Case Study: The Office Worker vs. The Construction Worker</h3>
                        <div className="bg-muted p-4 rounded-lg">
                          <p className="text-muted-foreground mb-3">
                            Take two men, both 35 years old and 6 feet tall (183 cm). One works in an office, the other in construction. They enter the same numbers into the calculator but get different real-world implications.
                          </p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                            <div className="bg-blue-500/10 p-3 rounded-lg">
                              <h4 className="font-semibold text-foreground mb-2">Office Worker (Medium Frame)</h4>
                              <p className="text-sm text-muted-foreground">
                                Results show 76-81kg (167-179 lbs) as ideal. He currently weighs 85kg (187 lbs). The calculator suggests he's slightly above ideal, but his sedentary job means most excess weight is likely fat rather than muscle.
                              </p>
                            </div>
                            <div className="bg-green-500/10 p-3 rounded-lg">
                              <h4 className="font-semibold text-foreground mb-2">Construction Worker (Large Frame)</h4>
                              <p className="text-sm text-muted-foreground">
                                Results show 84-89kg (185-196 lbs) as ideal. He currently weighs 90kg (198 lbs). Though heavier, his job involves constant physical activity, so some excess weight could be muscle rather than fat.
                              </p>
                            </div>
                          </div>
                          
                          <p className="text-sm text-muted-foreground">
                            Same calculator, same numbers, but different interpretations based on lifestyle. The office worker might benefit from reducing calorie intake slightly, while the construction worker might focus more on body composition than weight alone.
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">The Postpartum Adjustment</h3>
                        <div className="bg-muted p-4 rounded-lg">
                          <p className="text-muted-foreground mb-3">
                            Sarah is 28, 5'6" (168 cm), and 6 months postpartum. Before pregnancy she weighed 62kg (137 lbs). Now she's 68kg (150 lbs) and wondering about her ideal weight.
                          </p>
                          
                          <div className="space-y-2 text-sm text-muted-foreground pl-4">
                            <div className="flex items-start">
                              <span className="text-accent mr-2">•</span>
                              <span><strong>Calculator result:</strong> 59-66kg (130-145 lbs) ideal range</span>
                            </div>
                            <div className="flex items-start">
                              <span className="text-accent mr-2">•</span>
                              <span><strong>Current status:</strong> 2kg above the healthy range</span>
                            </div>
                            <div className="flex items-start">
                              <span className="text-accent mr-2">•</span>
                              <span><strong>Important context:</strong> She's still breastfeeding, which requires extra calories and affects hormone levels</span>
                            </div>
                            <div className="flex items-start">
                              <span className="text-accent mr-2">•</span>
                              <span><strong>Reasonable approach:</strong> Focus on nutrient-dense foods and gentle activity rather than aggressive weight loss while breastfeeding</span>
                            </div>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mt-3">
                            In this case, the calculator provides a target for eventual return to pre-pregnancy health, but the timeline should extend through the breastfeeding period rather than rushing immediately.
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">The Senior with Changing Body Composition</h3>
                        <div className="bg-muted p-4 rounded-lg">
                          <p className="text-muted-foreground mb-3">
                            Robert is 72, 5'9" (175 cm), and has noticed gradual weight gain despite eating less. He's concerned about his 82kg (181 lbs) weight.
                          </p>
                          
                          <div className="space-y-2 text-sm text-muted-foreground pl-4">
                            <div className="flex items-start">
                              <span className="text-accent mr-2">•</span>
                              <span><strong>Calculator with age adjustment:</strong> 67-77kg (148-170 lbs) ideal range</span>
                            </div>
                            <div className="flex items-start">
                              <span className="text-accent mr-2">•</span>
                              <span><strong>Current status:</strong> 5kg above the healthy range</span>
                            </div>
                            <div className="flex items-start">
                              <span className="text-accent mr-2">•</span>
                              <span><strong>Age factor:</strong> The 5% reduction accounts for typical muscle loss, but Robert might have lost more muscle than average</span>
                            </div>
                            <div className="flex items-start">
                              <span className="text-accent mr-2">•</span>
                              <span><strong>Better approach:</strong> Strength training to preserve muscle, moderate calorie reduction, protein-focused nutrition</span>
                            </div>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mt-3">
                            For Robert, the weight number matters less than preserving muscle mass. Losing weight through muscle loss would be counterproductive—he needs to lose fat while maintaining or building muscle through resistance training.
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
                  <h2 className="text-xl font-bold text-foreground">Important Health Considerations and Limitations</h2>
                  {openSections.relatedTools ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.relatedTools && (
                  <div className="px-6 pb-6">
                    <div className="space-y-4 text-muted-foreground">
                      <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20 mb-4">
                        <h3 className="text-lg font-semibold text-foreground mb-2">What This Calculator Can and Cannot Tell You</h3>
                        <p>
                          This tool provides statistical estimates based on population data. It cannot account for your individual genetics, medical history, or unique body composition. The formulas assume "average" body proportions and composition, which might not match your particular situation.
                        </p>
                      </div>
                      
                      <p>
                        Several important factors aren't captured in these calculations. Bone density varies significantly between individuals—some people naturally have denser bones that add weight without adding size. Hydration status affects scale weight temporarily. Medical conditions like hypothyroidism, PCOS, or certain medications can alter metabolism and weight distribution in ways these formulas don't consider.
                      </p>
                      
                      <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                        <h4 className="font-semibold text-foreground mb-2">When to Seek Professional Guidance</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• If you have a history of eating disorders or disordered eating patterns</li>
                          <li>• If you're taking medications that affect weight or metabolism</li>
                          <li>• If you have underlying health conditions like diabetes, heart disease, or thyroid disorders</li>
                          <li>• If you're pregnant, trying to conceive, or breastfeeding</li>
                          <li>• If you experience rapid, unexplained weight changes</li>
                          <li>• If weight concerns are causing significant stress or anxiety</li>
                        </ul>
                      </div>
                      
                      <p>
                        Remember that health exists on a spectrum. Being slightly outside the "ideal" range doesn't automatically mean you're unhealthy, just as being within it doesn't guarantee perfect health. Other factors—blood pressure, cholesterol levels, blood sugar control, fitness level, mental health—contribute significantly to overall wellbeing.
                      </p>
                      
                      <p>
                        If you use these results to guide lifestyle changes, prioritize sustainable habits over quick fixes. Gradual changes you can maintain long-term beat drastic diets you abandon after a month. Consider working with a registered dietitian or certified personal trainer who can create a personalized plan based on your specific needs and goals.
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
                  <h2 className="text-xl font-bold text-foreground">Common Questions About Finding Your Healthy Weight</h2>
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
                        <h3 className="text-lg font-semibold text-foreground mb-2">How often should I check my weight against these ideal ranges?</h3>
                        <p className="text-muted-foreground">
                          Daily weigh-ins often cause unnecessary stress due to normal fluctuations. Weekly checks at the same time of day (morning after bathroom, before eating) give a clearer trend. Monthly assessments work even better for seeing progress without getting bogged down in daily variations. Remember, the scale measures everything—water, food waste, muscle, fat. A 2-3 pound change from one day to the next usually reflects hydration or digestion, not actual fat loss or gain.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">I'm within the healthy BMI range but still have belly fat. What gives?</h3>
                        <p className="text-muted-foreground">
                          BMI measures total weight relative to height, not where fat is distributed. Some people store more fat viscerally (around organs) even at normal weights. This "normal weight obesity" carries health risks. If you're in this situation, focus on body composition rather than weight. Strength training builds muscle that boosts metabolism, while reducing processed foods and added sugars can help reduce visceral fat. Waist circumference (less than 40 inches for men, 35 inches for women) is actually a better predictor of certain health risks than BMI alone.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Are these ideal weights different for different ethnicities?</h3>
                        <p className="text-muted-foreground">
                          The formulas were developed primarily using Western populations, so they might not perfectly match optimal weights for all ethnic groups. Research shows that some Asian populations have higher health risks at lower BMIs, while other groups might have different healthy ranges. However, the differences are relatively small for most people. The healthy BMI range (18.5-24.9) is internationally recognized, though some countries use modified ranges for specific populations. If you have concerns about ethnicity-specific standards, consult healthcare providers familiar with your background.
                        </p>
                      </div>
                    </div>
                    
                    {/* Medical Disclaimer */}
                    <div className="mt-8 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                      <h3 className="text-lg font-semibold text-foreground mb-2">Professional Medical Disclaimer</h3>
                      <p className="text-sm text-muted-foreground">
                        This ideal weight calculator provides estimates based on statistical formulas and should be used for informational purposes only. The results are not medical advice, diagnosis, or treatment recommendations. Individual weight needs vary based on muscle mass, bone density, genetics, medical conditions, medications, lifestyle factors, and other variables not accounted for in these calculations. These formulas do not replace professional medical evaluation or personalized guidance from qualified healthcare providers. Always consult with your doctor, registered dietitian, or other qualified health professional before making significant changes to your diet, exercise routine, or weight management approach, especially if you have existing health conditions or take medications.
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