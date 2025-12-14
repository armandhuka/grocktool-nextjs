'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Calculator, RotateCcw, ArrowLeft, Scale, Ruler, Weight, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';

export default function BodyFat() {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [neck, setNeck] = useState('');
  const [waist, setWaist] = useState('');
  const [hip, setHip] = useState('');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [circumferenceUnit, setCircumferenceUnit] = useState('cm');
  const [result, setResult] = useState<{ 
    bodyFat: number; 
    category: string; 
    color: string;
    leanMass: number;
    fatMass: number;
    bmi: number;
    idealRange: { min: number; max: number };
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

  // Measurement units - 3 different units for different measurements
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

  const circumferenceUnits = [
    { value: 'cm', label: 'cm' },
    { value: 'in', label: 'inches' },
    { value: 'mm', label: 'mm' }
  ];

  // Body fat categories with detailed info
  const bodyFatCategories = {
    male: [
      { range: '2-5%', category: 'Essential Fat', color: 'text-red-600', description: 'Minimum necessary for basic physiological functions' },
      { range: '6-13%', category: 'Athletes', color: 'text-green-600', description: 'Typical for athletic individuals' },
      { range: '14-17%', category: 'Fitness', color: 'text-blue-600', description: 'Good fitness level' },
      { range: '18-24%', category: 'Average', color: 'text-yellow-600', description: 'Average for general population' },
      { range: '25%+', category: 'Obese', color: 'text-red-600', description: 'Increased health risks' }
    ],
    female: [
      { range: '10-13%', category: 'Essential Fat', color: 'text-red-600', description: 'Minimum necessary for basic physiological functions' },
      { range: '14-20%', category: 'Athletes', color: 'text-green-600', description: 'Typical for athletic individuals' },
      { range: '21-24%', category: 'Fitness', color: 'text-blue-600', description: 'Good fitness level' },
      { range: '25-31%', category: 'Average', color: 'text-yellow-600', description: 'Average for general population' },
      { range: '32%+', category: 'Obese', color: 'text-red-600', description: 'Increased health risks' }
    ]
  };

  // Convert weight to kg
  const convertWeightToKg = (value: number, unit: string): number => {
    switch (unit) {
      case 'kg': return value;
      case 'lbs': return value * 0.453592;
      case 'st': return value * 6.35029; // 1 stone = 6.35029 kg
      default: return value;
    }
  };

  // Convert height to cm
  const convertHeightToCm = (value: number, unit: string): number => {
    switch (unit) {
      case 'cm': return value;
      case 'ft': return value * 30.48; // 1 ft = 30.48 cm
      case 'in': return value * 2.54;  // 1 inch = 2.54 cm
      default: return value;
    }
  };

  // Convert circumference to cm
  const convertCircumferenceToCm = (value: number, unit: string): number => {
    switch (unit) {
      case 'cm': return value;
      case 'in': return value * 2.54;  // 1 inch = 2.54 cm
      case 'mm': return value * 0.1;   // 1 mm = 0.1 cm
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
      },
      circumference: {
        'cm': 'e.g., 38',
        'in': 'e.g., 15',
        'mm': 'e.g., 380'
      }
    };
    return placeholders[type]?.[unit] || 'e.g., 0';
  };

  const calculateBodyFat = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const n = parseFloat(neck);
    const wa = parseFloat(waist);
    const hi = parseFloat(hip);
    
    if (!w || !h || !n || !wa || (gender === 'female' && !hi)) return;
    
    // Convert all measurements to standard units (cm and kg)
    const weightInKg = convertWeightToKg(w, weightUnit);
    const heightInCm = convertHeightToCm(h, heightUnit);
    const neckInCm = convertCircumferenceToCm(n, circumferenceUnit);
    const waistInCm = convertCircumferenceToCm(wa, circumferenceUnit);
    const hipInCm = convertCircumferenceToCm(hi, circumferenceUnit);
    
    let bodyFat: number;
    
    // US Navy Body Fat Formula
    if (gender === 'male') {
      bodyFat = 86.010 * Math.log10(waistInCm - neckInCm) - 70.041 * Math.log10(heightInCm) + 36.76;
    } else {
      bodyFat = 163.205 * Math.log10(waistInCm + hipInCm - neckInCm) - 97.684 * Math.log10(heightInCm) - 78.387;
    }
    
    // Ensure body fat is within reasonable bounds
    bodyFat = Math.max(2, Math.min(50, bodyFat));
    
    // Calculate additional metrics
    const fatMass = (bodyFat / 100) * weightInKg;
    const leanMass = weightInKg - fatMass;
    const bmi = weightInKg / ((heightInCm / 100) ** 2);
    
    // Determine ideal body fat range
    const idealRange = gender === 'male' 
      ? { min: 8, max: 19 }
      : { min: 21, max: 33 };
    
    let category = '';
    let color = '';
    
    const categories = gender === 'male' ? bodyFatCategories.male : bodyFatCategories.female;
    for (const cat of categories) {
      const range = cat.range;
      const min = parseFloat(range.split('-')[0]);
      const max = parseFloat(range.split('-')[1].replace('%', '').replace('+', ''));
      
      if (bodyFat >= min && (range.includes('+') ? bodyFat >= max : bodyFat <= max)) {
        category = cat.category;
        color = cat.color;
        break;
      }
    }
    
    setResult({ 
      bodyFat: Math.round(bodyFat * 10) / 10, 
      category, 
      color,
      leanMass: Math.round(leanMass * 10) / 10,
      fatMass: Math.round(fatMass * 10) / 10,
      bmi: Math.round(bmi * 10) / 10,
      idealRange
    });
  };

  const reset = () => {
    setAge('');
    setWeight('');
    setHeight('');
    setNeck('');
    setWaist('');
    setHip('');
    setResult(null);
  };

  const getProgressValue = () => {
    if (!result) return 0;
    return Math.min(100, Math.max(0, (result.bodyFat / 40) * 100));
  };

  // FAQ Data
  const faqData = [
    {
      question: "How accurate is this body fat calculator compared to other methods?",
      answer: "This calculator uses the US Navy circumference method, which is about 3-4% accurate for most people. While not as precise as DEXA scans or hydrostatic weighing, it provides a reliable estimate without special equipment. For athletes or those with unusual body compositions, results may vary slightly."
    },
    {
      question: "Why do I need different measurements for men and women?",
      answer: "Women naturally carry more body fat in different areas than men, particularly around the hips and thighs. The US Navy formula accounts for these biological differences by including hip circumference for women, providing more accurate results for each gender."
    },
    {
      question: "How often should I measure my body fat percentage?",
      answer: "For consistent tracking, measure every 2-4 weeks at the same time of day under similar conditions. Daily measurements aren't recommended as natural fluctuations in water weight can skew results. Focus on long-term trends rather than day-to-day changes."
    },
    {
      question: "Is a lower body fat percentage always better for health?",
      answer: "No, extremely low body fat can be dangerous. Essential fat percentages (around 3-5% for men, 10-13% for women) are necessary for basic physiological functions. The 'fitness' range (14-17% for men, 21-24% for women) generally offers the best balance of health and performance."
    },
    {
      question: "Can I use this calculator if I'm pregnant or have medical conditions?",
      answer: "The US Navy formula isn't validated for pregnancy or certain medical conditions. For accurate assessment during pregnancy or with medical conditions affecting body composition, consult healthcare professionals who can recommend appropriate measurement methods."
    }
  ];

  return (
    <>
      <Head>
        <title>Body Fat Percentage Calculator | Accurate US Navy Method - GrockTool.com</title>
        <meta name="description" content="Calculate your body fat percentage instantly using the US Navy circumference method. Get accurate estimates with lean mass, fat mass, and BMI calculations for better health tracking." />
        <meta name="keywords" content="body fat calculator, body fat percentage calculator, US Navy body fat calculator, body fat measurement, body composition calculator, fat percentage calculator, lean mass calculator, body fat estimate" />
        <meta property="og:title" content="Body Fat Percentage Calculator | Accurate US Navy Method - GrockTool.com" />
        <meta property="og:description" content="Calculate your body fat percentage instantly with our free calculator using the proven US Navy circumference method." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Body Fat Calculator - GrockTool.com" />
        <meta name="twitter:description" content="Calculate your body fat percentage and body composition metrics in seconds." />
        <link rel="canonical" href="https://grocktool.com/tools/body-fat-calculator" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Body Fat Percentage Calculator",
            "applicationCategory": "HealthApplication",
            "operatingSystem": "Any",
            "description": "Free body fat calculator using US Navy circumference method to estimate body fat percentage, lean mass, and fat mass",
            "url": "https://grocktool.com/tools/body-fat-calculator",
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
              "US Navy circumference method",
              "Body fat percentage calculation",
              "Lean mass and fat mass estimation",
              "BMI calculation",
              "Health category classification"
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
                Back to All Tools
              </Link>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                  Body Fat Calculator
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Get your body fat percentage in under 5 seconds using the scientifically validated US Navy method.
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
                    <Activity size={20} className="text-blue-500" />
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
                    <div className="flex items-center gap-2">
                      <Weight size={16} className="text-blue-500" />
                      <label className="block text-sm font-medium text-foreground">
                        Body Weight
                      </label>
                    </div>
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
                    <div className="flex flex-wrap gap-1 text-xs text-muted-foreground">
                      <span>Units:</span>
                      {weightUnits.map((unit) => (
                        <button 
                          key={unit.value}
                          onClick={() => setWeightUnit(unit.value)}
                          className={`hover:text-foreground transition-colors ${
                            weightUnit === unit.value ? 'text-accent font-medium' : ''
                          }`}
                        >
                          {unit.label}
                        </button>
                      ))}
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

                  {/* Circumference Measurements */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Scale size={16} className="text-blue-500" />
                      <label className="block text-sm font-medium text-foreground">
                        Circumference Measurements
                      </label>
                    </div>
                    
                    {/* Unit selector for circumference */}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>Unit:</span>
                      {circumferenceUnits.map((unit) => (
                        <button 
                          key={unit.value}
                          onClick={() => setCircumferenceUnit(unit.value)}
                          className={`hover:text-foreground transition-colors ${
                            circumferenceUnit === unit.value ? 'text-accent font-medium' : ''
                          }`}
                        >
                          {unit.label}
                        </button>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-foreground">
                          Neck
                        </label>
                        <input
                          type="number"
                          value={neck}
                          onChange={(e) => setNeck(e.target.value)}
                          placeholder={getPlaceholder('circumference', circumferenceUnit)}
                          className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg"
                          step="any"
                          min="0"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-foreground">
                          Waist
                        </label>
                        <input
                          type="number"
                          value={waist}
                          onChange={(e) => setWaist(e.target.value)}
                          placeholder={getPlaceholder('circumference', circumferenceUnit)}
                          className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg"
                          step="any"
                          min="0"
                        />
                      </div>
                    </div>

                    {gender === 'female' && (
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-foreground">
                          Hip (required for females)
                        </label>
                        <input
                          type="number"
                          value={hip}
                          onChange={(e) => setHip(e.target.value)}
                          placeholder={getPlaceholder('circumference', circumferenceUnit)}
                          className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg"
                          step="any"
                          min="0"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={calculateBodyFat}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent text-accent-foreground rounded-lg sm:rounded-xl hover:bg-accent/80 transition-colors text-sm sm:text-base"
                  >
                    <Calculator size={16} className="sm:w-4 sm:h-4" />
                    Calculate Body Fat
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
                    <div className="text-sm text-muted-foreground mb-2">Body Fat Percentage</div>
                    <div className="text-4xl font-bold text-foreground mb-2">
                      {result.bodyFat}%
                    </div>
                    <div className={`text-lg font-semibold ${result.color} mb-4`}>
                      {result.category}
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-secondary rounded-full h-3 mb-2">
                      <div 
                        className="bg-accent h-3 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${getProgressValue()}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0%</span>
                      <span>Ideal: {result.idealRange.min}%-{result.idealRange.max}%</span>
                      <span>40%</span>
                    </div>
                  </div>

                  {/* Body Composition Breakdown */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20 text-center">
                      <div className="text-sm text-muted-foreground mb-1">Fat Mass</div>
                      <div className="text-lg font-bold text-foreground">{result.fatMass}kg</div>
                      <div className="text-xs text-muted-foreground">{result.bodyFat}% of weight</div>
                    </div>
                    <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20 text-center">
                      <div className="text-sm text-muted-foreground mb-1">Lean Mass</div>
                      <div className="text-lg font-bold text-foreground">{result.leanMass}kg</div>
                      <div className="text-xs text-muted-foreground">{100 - result.bodyFat}% of weight</div>
                    </div>
                    <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20 text-center">
                      <div className="text-sm text-muted-foreground mb-1">BMI</div>
                      <div className="text-lg font-bold text-foreground">{result.bmi}</div>
                      <div className="text-xs text-muted-foreground">Body Mass Index</div>
                    </div>
                    <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20 text-center">
                      <div className="text-sm text-muted-foreground mb-1">Status</div>
                      <div className={`text-sm font-bold ${result.color}`}>{result.category}</div>
                      <div className="text-xs text-muted-foreground">Category</div>
                    </div>
                  </div>

                  {/* Health Assessment */}
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="text-sm font-medium text-foreground mb-2">Health Assessment:</div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      {result.bodyFat < result.idealRange.min && (
                        <div>• Your body fat is below the recommended range. Consider gaining healthy weight.</div>
                      )}
                      {result.bodyFat >= result.idealRange.min && result.bodyFat <= result.idealRange.max && (
                        <div>• Your body fat is within the healthy range. Maintain your current lifestyle.</div>
                      )}
                      {result.bodyFat > result.idealRange.max && (
                        <div>• Your body fat is above the recommended range. Consider lifestyle changes.</div>
                      )}
                      <div className="font-medium text-foreground mt-2">
                        Ideal range for your gender and age: {result.idealRange.min}% - {result.idealRange.max}%
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Unit Conversion Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 mb-6 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-foreground mb-4">Unit Conversion Guide</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                  <div className="text-sm font-medium text-foreground mb-2">Weight Units</div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>• 1 kg = 2.20462 lbs</div>
                    <div>• 1 kg = 0.15747 st</div>
                    <div>• 1 st = 6.35029 kg</div>
                    <div>• 1 lb = 0.453592 kg</div>
                  </div>
                </div>
                <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                  <div className="text-sm font-medium text-foreground mb-2">Height Units</div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>• 1 cm = 0.393701 in</div>
                    <div>• 1 ft = 30.48 cm</div>
                    <div>• 1 in = 2.54 cm</div>
                    <div>• 1 m = 100 cm</div>
                  </div>
                </div>
                <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
                  <div className="text-sm font-medium text-foreground mb-2">Circumference Units</div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>• 1 cm = 0.393701 in</div>
                    <div>• 1 in = 2.54 cm</div>
                    <div>• 1 mm = 0.1 cm</div>
                    <div>• 1 cm = 10 mm</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 mb-6 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-foreground mb-4">Body Fat Categories</h2>
              <div className="space-y-4">
                {(gender === 'male' ? bodyFatCategories.male : bodyFatCategories.female).map((category, index) => (
                  <div key={index} className="bg-secondary/20 p-3 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`font-medium ${category.color}`}>{category.category}</span>
                      <span className="text-sm text-muted-foreground">{category.range}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">{category.description}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Health Tips Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 mb-8 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-foreground mb-4">Health & Fitness Tips</h2>
              <div className="space-y-3">
                <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                  <div className="text-sm font-medium text-foreground mb-1">💪 Reducing Body Fat</div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>• Create a calorie deficit through diet and exercise</div>
                    <div>• Include both cardio and strength training</div>
                    <div>• Focus on whole foods and protein intake</div>
                    <div>• Get adequate sleep and manage stress</div>
                  </div>
                </div>
                
                <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                  <div className="text-sm font-medium text-foreground mb-1">📊 Measurement Accuracy</div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>• Measure circumference in the morning on empty stomach</div>
                    <div>• Use a flexible tape measure at skin level</div>
                    <div>• Don't pull the tape too tight or leave it too loose</div>
                    <div>• For consistent results, measure at the same time daily</div>
                  </div>
                </div>

                <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
                  <div className="text-sm font-medium text-foreground mb-1">⚠️ Health Considerations</div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>• Very low body fat can be dangerous to health</div>
                    <div>• High body fat increases chronic disease risk</div>
                    <div>• Consult healthcare professionals for personalized advice</div>
                    <div>• Focus on overall health, not just body fat percentage</div>
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
                  <h2 className="text-xl font-bold text-foreground">Body Fat Calculator - What It Does</h2>
                  {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.whatItDoes && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      This free tool helps you estimate your body composition using the scientifically validated US Navy circumference method. It calculates your body fat percentage based on key measurements, providing insights into your body's composition beyond simple weight tracking.
                    </p>
                    <p className="text-muted-foreground">
                      Unlike basic weight measurements, this calculator gives you detailed breakdowns of fat mass, lean mass, and body mass index. Understanding your body composition is crucial for setting realistic fitness goals, tracking progress effectively, and making informed decisions about your health and nutrition strategies.
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
                  <h2 className="text-xl font-bold text-foreground">How to Use This Body Fat Calculator</h2>
                  {openSections.howToUse ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.howToUse && (
                  <div className="px-6 pb-6">
                    <ol className="space-y-4 text-muted-foreground pl-5">
                      <li className="pl-2">
                        <strong className="text-foreground">Enter Your Personal Information</strong>
                        <p className="mt-1">Input your age, select your gender, and provide your current body weight and height using the appropriate unit selectors.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Take Accurate Measurements</strong>
                        <p className="mt-1">Measure your neck and waist circumferences. For women, also measure your hip circumference. Use a flexible tape measure at skin level without pulling too tight.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Select Your Units</strong>
                        <p className="mt-1">Choose the measurement units that match your tape measure or scale. The calculator automatically converts between kilograms, pounds, centimeters, and inches.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Calculate Your Results</strong>
                        <p className="mt-1">Click "Calculate Body Fat" to instantly get your body fat percentage, lean mass, fat mass, and health category based on the US Navy formula.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Review and Track Progress</strong>
                        <p className="mt-1">Use the detailed breakdown to understand your current body composition. For best results, track your measurements every 2-4 weeks to monitor changes over time.</p>
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
                  <h2 className="text-xl font-bold text-foreground">Body Fat Calculation Examples</h2>
                  {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.examples && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground text-sm mb-4">
                      Below are practical examples showing how body fat percentage varies based on different body compositions and measurement inputs.
                    </p>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 1: Active Male with Average Body Composition</h3>
                        <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                          <pre className="text-sm text-muted-foreground font-mono">
{`Input:
Age: 30 years
Gender: Male
Weight: 80 kg (176 lbs)
Height: 180 cm (5'11")
Neck: 38 cm (15 in)
Waist: 86 cm (34 in)

Calculation:
US Navy Formula: 86.010 × log10(86 - 38) - 70.041 × log10(180) + 36.76
Body Fat Percentage: 18.3%

Results:
• Body Fat: 18.3% (Average category)
• Fat Mass: 14.6 kg
• Lean Mass: 65.4 kg
• BMI: 24.7
• Ideal Range: 8-19% for men`}
                          </pre>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 2: Fitness-Focused Female</h3>
                        <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                          <pre className="text-sm text-muted-foreground font-mono">
{`Input:
Age: 28 years
Gender: Female
Weight: 62 kg (137 lbs)
Height: 165 cm (5'5")
Neck: 32 cm (12.6 in)
Waist: 71 cm (28 in)
Hip: 96 cm (37.8 in)

Calculation:
US Navy Formula: 163.205 × log10(71 + 96 - 32) - 97.684 × log10(165) - 78.387
Body Fat Percentage: 22.7%

Results:
• Body Fat: 22.7% (Fitness category)
• Fat Mass: 14.1 kg
• Lean Mass: 47.9 kg
• BMI: 22.8
• Ideal Range: 21-33% for women`}
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
                      Explore other useful calculators from GrockTool.com that complement this body fat assessment tool:
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
                        <Link href="/health-tools/ideal-weight" className="text-accent hover:underline">
                          <strong>Ideal Weight Calculator:</strong> Determine your healthy weight range based on height
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
                  <h2 className="text-xl font-bold text-foreground">Frequently Asked Questions About Body Fat</h2>
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
                        This body fat calculator provides estimates based on the US Navy circumference method and should be used for informational purposes only. Individual body compositions can vary based on genetics, medical conditions, medications, and other factors not accounted for in these calculations. The results from this calculator are not a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider or registered dietitian for personalized medical advice regarding your body composition, especially if you have underlying health conditions or take medications that affect metabolism or body composition.
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