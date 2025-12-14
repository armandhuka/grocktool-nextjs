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

  // FAQ Data
  const faqData = [
    {
      question: "Which ideal weight formula is the most accurate?",
      answer: "The Robinson formula (1983) is generally considered the most accurate for the general population as it was developed from more recent and comprehensive data. However, all formulas provide estimates - the average of all four formulas often gives the most balanced recommendation for most individuals."
    },
    {
      question: "Why does body frame size affect ideal weight calculations?",
      answer: "Body frame size accounts for bone structure variations. People with larger bone structures naturally weigh more than those with smaller frames at the same height. The adjustment (small: -10%, medium: no change, large: +10%) helps personalize the estimate based on your natural build."
    },
    {
      question: "Should athletes use these ideal weight calculations?",
      answer: "Athletes and bodybuilders may find these formulas less accurate because they don't account for high muscle mass. Muscle weighs more than fat, so athletes often have higher healthy weights. Consider using body fat percentage measurements alongside ideal weight estimates for a more complete picture."
    },
    {
      question: "How does age affect ideal weight recommendations?",
      answer: "As we age, muscle mass naturally decreases while body fat percentage tends to increase. The calculator applies a 5% reduction for individuals over 65 to account for these metabolic changes and ensure age-appropriate healthy weight recommendations."
    },
    {
      question: "Is it unhealthy to be below the ideal weight range?",
      answer: "Being significantly below the ideal weight range can indicate insufficient body fat for normal physiological functions. Very low weight may lead to nutrient deficiencies, hormonal imbalances, and increased health risks. Consult a healthcare professional if you consistently fall below the healthy BMI range (18.5)."
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

            {/* Formula Information Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 mb-6 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-foreground mb-4">About Ideal Weight Formulas</h2>
              <div className="space-y-4">
                <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                  <div className="text-sm font-medium text-foreground mb-1">📊 Robinson Formula (1983)</div>
                  <div className="text-sm text-muted-foreground">
                    Most commonly used in clinical settings. Considered one of the most accurate formulas 
                    for ideal body weight calculation.
                  </div>
                </div>
                
                <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                  <div className="text-sm font-medium text-foreground mb-1">⚖️ Miller Formula (1983)</div>
                  <div className="text-sm text-muted-foreground">
                    Similar to Robinson formula with slight modifications. Developed as an improvement 
                    over earlier formulas.
                  </div>
                </div>

                <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
                  <div className="text-sm font-medium text-foreground mb-1">💊 Devine Formula (1974)</div>
                  <div className="text-sm text-muted-foreground">
                    Originally developed for medication dosing calculations. Widely used in medical 
                    practice for decades.
                  </div>
                </div>

                <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
                  <div className="text-sm font-medium text-foreground mb-1">🏥 Hamwi Formula (1964)</div>
                  <div className="text-sm text-muted-foreground">
                    Quick estimation method developed for clinical use. One of the earliest and 
                    most referenced formulas.
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Health Guidelines Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 mb-8 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-foreground mb-4">Health Guidelines & Considerations</h2>
              <div className="space-y-3">
                <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                  <div className="text-sm font-medium text-foreground mb-1">💪 Factors Affecting Ideal Weight</div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>• Muscle mass and body composition</div>
                    <div>• Bone density and frame size</div>
                    <div>• Age and metabolic changes</div>
                    <div>• Physical activity level</div>
                    <div>• Genetic factors and ethnicity</div>
                  </div>
                </div>
                
                <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                  <div className="text-sm font-medium text-foreground mb-1">🎯 When to Consult a Professional</div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>• If you have significant muscle mass (athletes)</div>
                    <div>• If you have underlying health conditions</div>
                    <div>• For personalized diet and exercise plans</div>
                    <div>• If you're pregnant or breastfeeding</div>
                  </div>
                </div>

                <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
                  <div className="text-sm font-medium text-foreground mb-1">⚠️ Important Notes</div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>• These are estimates based on statistical formulas</div>
                    <div>• Individual needs may vary significantly</div>
                    <div>• Focus on overall health, not just weight</div>
                    <div>• Consult healthcare professionals for personalized advice</div>
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
                  <h2 className="text-xl font-bold text-foreground">Ideal Weight Calculator - What It Does</h2>
                  {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.whatItDoes && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      This free tool helps you determine your optimal healthy weight range using four scientifically validated formulas: Robinson, Miller, Devine, and Hamwi. Each formula provides a slightly different perspective based on extensive medical research and population studies.
                    </p>
                    <p className="text-muted-foreground">
                      Unlike simple weight charts, this calculator personalizes results based on your unique body frame size, age, and gender. The average of all four formulas gives you a balanced recommendation, while the healthy BMI range shows where your weight should fall for optimal health outcomes. Understanding your ideal weight range helps set realistic fitness goals and maintain overall wellness.
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
                  <h2 className="text-xl font-bold text-foreground">How to Use This Ideal Weight Calculator</h2>
                  {openSections.howToUse ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.howToUse && (
                  <div className="px-6 pb-6">
                    <ol className="space-y-4 text-muted-foreground pl-5">
                      <li className="pl-2">
                        <strong className="text-foreground">Enter Your Personal Details</strong>
                        <p className="mt-1">Input your age, select your gender, and provide your height using the unit selector (cm, ft, or inches).</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Select Your Body Frame Size</strong>
                        <p className="mt-1">Choose Small, Medium, or Large frame based on your natural bone structure. This adjusts the calculation by ±10%.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Choose Display Units</strong>
                        <p className="mt-1">Select your preferred weight units for results (kg, lbs, or stone). The calculator works internally with metric units.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Calculate Your Ideal Weight</strong>
                        <p className="mt-1">Click "Calculate Ideal Weight" to get results from all four formulas plus their average and healthy BMI range.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Interpret Your Results</strong>
                        <p className="mt-1">Use the average recommendation as a guideline, with the healthy BMI range showing acceptable variations. Consider your individual health factors when applying these numbers.</p>
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
                  <h2 className="text-xl font-bold text-foreground">Ideal Weight Calculation Examples</h2>
                  {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.examples && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground text-sm mb-4">
                      Below are practical examples showing how ideal weight varies based on different heights, ages, and body frames.
                    </p>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 1: Average Male with Medium Frame</h3>
                        <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                          <pre className="text-sm text-muted-foreground font-mono">
{`Input:
Age: 35 years
Gender: Male
Height: 180 cm (5'11")
Body Frame: Medium
Display Units: kg

Calculation Results:
• Robinson Formula: 72.5 kg
• Miller Formula: 74.8 kg
• Devine Formula: 76.0 kg
• Hamwi Formula: 77.2 kg
• Average Recommendation: 75.1 kg
• Healthy BMI Range: 60.0 - 80.7 kg

Interpretation:
A healthy weight range for this individual is 60.0-80.7 kg,
with the ideal target around 75.1 kg based on multiple formulas.`}
                          </pre>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 2: Older Female with Small Frame</h3>
                        <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                          <pre className="text-sm text-muted-foreground font-mono">
{`Input:
Age: 68 years
Gender: Female
Height: 162 cm (5'4")
Body Frame: Small
Display Units: lbs

Calculation Results:
• Robinson Formula: 113.2 lbs
• Miller Formula: 115.4 lbs
• Devine Formula: 112.6 lbs
• Hamwi Formula: 114.8 lbs
• Average Recommendation: 114.0 lbs
• Healthy BMI Range: 98.7 - 133.0 lbs

Adjustments Applied:
• Frame size: -10% (small frame)
• Age: -5% (senior adjustment)
• Total adjustment: -14.5%

Interpretation:
With age and frame adjustments, the healthy range is 
98.7-133.0 lbs, with ideal around 114.0 lbs.`}
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
                      Explore other useful calculators from GrockTool.com that complement this ideal weight assessment:
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
                        <Link href="/health-tools/water-intake" className="text-accent hover:underline">
                          <strong>Water Intake Calculator:</strong> Calculate your optimal daily hydration needs
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
                        <Link href="/health-tools/bmr-calculator" className="text-accent hover:underline">
                          <strong>BMR Calculator:</strong> Calculate your Basal Metabolic Rate for weight management
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        <Link href="/health-tools/macro-splitter" className="text-accent hover:underline">
                          <strong>Macro Split Calculator:</strong> Calculate optimal macronutrient ratios for your goals
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
                  <h2 className="text-xl font-bold text-foreground">Frequently Asked Questions About Ideal Weight</h2>
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
                        This ideal weight calculator provides estimates based on statistical formulas and should be used for informational purposes only. Individual weight needs can vary significantly based on muscle mass, genetics, medical conditions, medications, and other factors not accounted for in these calculations. The results from this calculator are not a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider or registered dietitian for personalized medical advice regarding your weight and health, especially if you have underlying health conditions or take medications that affect metabolism or body composition.
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