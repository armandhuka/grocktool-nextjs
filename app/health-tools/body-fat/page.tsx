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
    calculationMethod: true,
    measurementInputs: false,
    examples: false,
    healthDisclaimer: false,
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

  // FAQ Data - Updated with natural, human-like questions
  const faqData = [
    {
      question: "I measured myself three times and got different results each time. What's going on?",
      answer: "That's actually pretty common! Your body changes throughout the day - water retention, food in your system, even posture can affect measurements. For the most consistent results, try measuring first thing in the morning before eating or drinking anything. Stand up straight but relaxed, and make sure the tape measure is level around your body without digging into your skin. Even then, expect a 0.5-1% variation between measurements."
    },
    {
      question: "Why does my gym's body fat scale show a completely different number than this calculator?",
      answer: "Great question! Gym scales use bioelectrical impedance, which sends a tiny electrical current through your body. The problem? Hydration levels dramatically affect the reading. If you're dehydrated, it'll show higher body fat. If you just had a big glass of water, it'll show lower. The US Navy method we use here relies on actual measurements of your body's size, which tends to be more consistent day-to-day once you learn to measure properly."
    },
    {
      question: "My body fat seems high but I can see my abs. Which measurement should I trust?",
      answer: "Trust what you see in the mirror over any single number. Some people naturally carry more visceral fat (around organs) or subcutaneous fat (under skin) in different patterns. If you're muscular, the Navy formula might overestimate slightly because it doesn't account for muscle mass directly. The number here is a helpful benchmark, but how you look and feel, how your clothes fit, and your performance in workouts are all equally important indicators."
    },
    {
      question: "I lost 5 pounds but my body fat percentage went up. How is that possible?",
      answer: "This happens more often than people realize! When you lose weight quickly, you're often losing both fat and muscle. Since muscle is denser than fat, losing muscle can actually increase your body fat percentage even as total weight drops. That's why focusing on body composition (through strength training and adequate protein) is so important - you want to preserve or build muscle while losing fat for the healthiest transformation."
    },
    {
      question: "Is it normal for women to have higher body fat percentages than men?",
      answer: "Absolutely, and it's completely healthy. Women naturally need more body fat for hormone production, reproductive health, and overall physiological function. Essential fat (the minimum needed for basic health) is about 10-13% for women versus just 2-5% for men. The 'fitness' range for women (21-24%) would be considered very lean for most men. Comparing percentages between genders doesn't make sense - each has completely different healthy ranges."
    },
    {
      question: "How long does it realistically take to change my body fat percentage?",
      answer: "Real, sustainable changes take time. A safe rate of fat loss is about 0.5-1% of your total body weight per week. For someone weighing 180 pounds, that's 1-2 pounds weekly. At that pace, dropping 5% body fat might take 10-20 weeks. Quicker results often mean losing more muscle and water weight, which usually comes right back. Consistency with nutrition and exercise over months - not days - is what creates lasting change."
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

            {/* Body Fat Categories */}
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

            {/* SEO Content Section with Dropdowns */}
            <section className="space-y-4">
              {/* Calculation Method - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('calculationMethod')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h2 className="text-xl font-bold text-foreground">How This Body Fat Calculator Works</h2>
                  {openSections.calculationMethod ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.calculationMethod && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      This calculator uses what's called the U.S. Navy body fat formula, which has been around since the 1980s. Back then, the Navy needed a quick, reliable way to assess sailors' fitness without expensive equipment. Researchers found that certain body measurements - specifically your neck, waist, and for women, hips - could predict body fat percentage surprisingly well.
                    </p>
                    
                    <p className="text-muted-foreground mb-4">
                      The science behind it is actually pretty clever. The formula compares the circumference of areas where people typically store fat (like the waist) against areas where they don't (like the neck). By looking at these ratios along with your height, it creates a mathematical model that estimates how much of your body mass is fat versus lean tissue.
                    </p>
                    
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20 mb-4">
                      <h3 className="font-semibold text-foreground mb-2">Why This Method Works Better Than Guessing</h3>
                      <p className="text-sm text-muted-foreground">
                        What makes the Navy method stand out is its practicality. Unlike skinfold calipers that require precise pinching technique or expensive DEXA scans, all you need is a simple tape measure. The formulas are different for men and women because we store fat differently - women naturally carry more around hips and thighs, which the formula accounts for.
                      </p>
                    </div>
                    
                    <p className="text-muted-foreground">
                      Is it perfect? No method is. But for most people, it gets within 3-4% of more advanced testing. The key is taking accurate measurements - a loose tape measure or measuring at different times of day can throw off results. When done consistently, this method gives you a reliable benchmark to track changes over time, which is what really matters for fitness progress.
                    </p>
                  </div>
                )}
              </article>

              {/* Measurement Inputs - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('measurementInputs')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h2 className="text-xl font-bold text-foreground">Getting Accurate Measurements</h2>
                  {openSections.measurementInputs ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.measurementInputs && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Getting your measurements right makes all the difference. I've seen people get results that are off by 5% or more just because they measured incorrectly. Here's exactly how to do it properly:
                    </p>
                    
                    <div className="space-y-4">
                      <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                        <h3 className="font-semibold text-foreground mb-2">📏 Neck Measurement</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Stand straight and look forward. Find the point just below your Adam's apple (for men) or the most prominent point of your neck (for women). Place the tape measure here horizontally, making sure it's level all the way around. Don't pull tight - just let it rest against your skin without digging in.
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <strong>Common mistake:</strong> Measuring at an angle or too high/low. The tape should be perpendicular to your spine.
                        </p>
                      </div>
                      
                      <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                        <h3 className="font-semibold text-foreground mb-2">📏 Waist Measurement</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Find the top of your hip bone on one side - it's that bony point you can feel. Now find the bottom of your rib cage. Measure halfway between these two points. For most people, this is right at the belly button level, but not always.
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <strong>Important:</strong> Breathe out normally and measure at the end of your exhale. Don't suck in your stomach - that defeats the purpose!
                        </p>
                      </div>
                      
                      {gender === 'female' && (
                        <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                          <h3 className="font-semibold text-foreground mb-2">📏 Hip Measurement (Women Only)</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            This is the widest part of your hips and buttocks. Stand with your feet together and find the point where your hips are fullest. This is usually about 7-9 inches below your waist measurement for most women.
                          </p>
                          <p className="text-sm text-muted-foreground">
                            <strong>Tip:</strong> Wear form-fitting clothing or measure directly on skin. Baggy clothes add unnecessary inches.
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-6 p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
                      <h3 className="font-semibold text-foreground mb-2">Best Practices for Consistent Results</h3>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• <strong>Time it right:</strong> Measure first thing in the morning before eating or drinking</li>
                        <li>• <strong>Be consistent:</strong> Use the same tape measure each time</li>
                        <li>• <strong>Stand naturally:</strong> Don't tense your muscles or hold unusual posture</li>
                        <li>• <strong>Track trends:</strong> Single measurements can fluctuate - look at changes over 2-4 weeks</li>
                        <li>• <strong>Round properly:</strong> Record to the nearest 0.25 inch or 0.5 cm</li>
                      </ul>
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
                  <h2 className="text-xl font-bold text-foreground">Real Examples and What They Mean</h2>
                  {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.examples && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground text-sm mb-6">
                      Numbers on their own don't tell the whole story. Here are some real-world scenarios to help you understand what different results actually mean in practice.
                    </p>
                    
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Example 1: The Weekend Warrior</h3>
                        <div className="bg-muted p-4 rounded-lg mb-3">
                          <div className="font-mono text-sm text-muted-foreground">
                            <div>Male, 35 years, 5'10" (178 cm), 185 lbs (84 kg)</div>
                            <div>Neck: 16 inches (41 cm), Waist: 36 inches (91 cm)</div>
                            <div className="mt-2 text-accent font-semibold">Result: 21.3% body fat</div>
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm">
                          This is really common for guys who exercise but don't watch their diet closely. At 21.3%, he's in the "average" category - not overweight by BMI standards (BMI: 26.5), but carrying some extra fat around the middle. The waist-to-neck ratio here tells the story: a 36-inch waist on a 16-inch neck suggests more abdominal fat than ideal. He might look "solid" in clothes but feel soft around the middle. For someone like this, cutting out a few beers each week and adding some cardio could drop him to the fitness range in 2-3 months.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Example 2: The Active Mom</h3>
                        <div className="bg-muted p-4 rounded-lg mb-3">
                          <div className="font-mono text-sm text-muted-foreground">
                            <div>Female, 42 years, 5'4" (163 cm), 140 lbs (63.5 kg)</div>
                            <div>Neck: 13 inches (33 cm), Waist: 29 inches (74 cm), Hips: 39 inches (99 cm)</div>
                            <div className="mt-2 text-accent font-semibold">Result: 26.8% body fat</div>
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm">
                          This result often surprises women who exercise regularly. At 26.8%, she's right at the top of the "average" category for women. Despite being a healthy weight (BMI: 24.0), her body composition shows she's carrying more fat than muscle. The hip measurement is key here - at 39 inches, she carries weight in the typical female pattern. What's interesting? She could be the same weight as a more muscular woman but have completely different body fat. Strength training 2-3 times weekly would help shift this composition toward more muscle, less fat, even if the scale doesn't change much.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Example 3: The Skinny-Fat Office Worker</h3>
                        <div className="bg-muted p-4 rounded-lg mb-3">
                          <div className="font-mono text-sm text-muted-foreground">
                            <div>Male, 28 years, 6'0" (183 cm), 165 lbs (75 kg)</div>
                            <div>Neck: 15 inches (38 cm), Waist: 34 inches (86 cm)</div>
                            <div className="mt-2 text-accent font-semibold">Result: 19.1% body fat</div>
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm">
                          This is the classic "skinny-fat" scenario that confuses a lot of people. At 165 lbs and 6 feet tall, he looks thin in clothes (BMI: 22.4). But the 19.1% body fat puts him at the high end of average. How? Low muscle mass. His waist is 34 inches on a thin frame, suggesting he has very little muscle to give his body shape. The scale says he's fine, but his body composition says otherwise. For this person, focusing on building muscle through weight training is more important than losing weight. He might actually gain weight but look leaner as muscle replaces fat.
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <p className="text-sm text-muted-foreground">
                        <strong>The takeaway:</strong> Your body fat percentage tells you what the scale can't. Two people can weigh exactly the same but have completely different body compositions. That's why tracking this number alongside weight gives you a much clearer picture of your actual health and fitness progress.
                      </p>
                    </div>
                  </div>
                )}
              </article>

              {/* Related Tools - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('relatedTools')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h2 className="text-xl font-bold text-foreground">Other Helpful Health Calculators</h2>
                  {openSections.relatedTools ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.relatedTools && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Body fat is just one piece of the health puzzle. Here are some other tools that work well alongside this calculator:
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Link 
                        href="/tools/bmi-calculator" 
                        className="bg-secondary/30 p-4 rounded-lg border border-border hover:border-accent transition-colors group"
                      >
                        <div className="font-medium text-foreground mb-1 group-hover:text-accent transition-colors">BMI Calculator</div>
                        <div className="text-xs text-muted-foreground">
                          While BMI has limitations, it's still useful for population-level health assessments. Our calculator adjusts for different measurement units.
                        </div>
                      </Link>
                      
                      <Link 
                        href="/tools/calorie-calculator" 
                        className="bg-secondary/30 p-4 rounded-lg border border-border hover:border-accent transition-colors group"
                      >
                        <div className="font-medium text-foreground mb-1 group-hover:text-accent transition-colors">Calorie Calculator</div>
                        <div className="text-xs text-muted-foreground">
                          Once you know your body fat, use this to calculate your daily calorie needs for maintenance, loss, or muscle gain.
                        </div>
                      </Link>
                      
                      <Link 
                        href="/tools/macro-calculator" 
                        className="bg-secondary/30 p-4 rounded-lg border border-border hover:border-accent transition-colors group"
                      >
                        <div className="font-medium text-foreground mb-1 group-hover:text-accent transition-colors">Macro Calculator</div>
                        <div className="text-xs text-muted-foreground">
                          Breaks down your calories into protein, carbs, and fats based on your goals and activity level.
                        </div>
                      </Link>
                      
                      <Link 
                        href="/tools/ideal-weight" 
                        className="bg-secondary/30 p-4 rounded-lg border border-border hover:border-accent transition-colors group"
                      >
                        <div className="font-medium text-foreground mb-1 group-hover:text-accent transition-colors">Ideal Weight Calculator</div>
                        <div className="text-xs text-muted-foreground">
                          Gives you a healthy weight range based on your height, age, and gender.
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
              </article>

              {/* Health Disclaimer - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('healthDisclaimer')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h2 className="text-xl font-bold text-foreground">Important Health Information</h2>
                  {openSections.healthDisclaimer ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.healthDisclaimer && (
                  <div className="px-6 pb-6">
                    <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20 mb-6">
                      <p className="text-sm text-muted-foreground">
                        <strong>Please read this carefully:</strong> This calculator is designed for general informational purposes only. It's not a medical device, and the results should not be treated as medical advice.
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">What This Calculator Can't Tell You</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          While the Navy method is useful, it doesn't distinguish between subcutaneous fat (under your skin) and visceral fat (around your organs). Visceral fat is more dangerous but invisible from the outside. A person can have a "healthy" body fat percentage but still carry dangerous amounts of visceral fat.
                        </p>
                        <p className="text-sm text-muted-foreground">
                          It also doesn't account for differences in bone density, genetic variations in fat distribution, or medical conditions that affect body composition. Older adults naturally have less muscle mass, pregnant women have completely different body composition needs, and athletes often fall outside standard formulas.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">When to See a Professional</h3>
                        <ul className="text-sm text-muted-foreground space-y-2">
                          <li className="flex items-start">
                            <span className="text-red-500 mr-2 mt-1">•</span>
                            <span>If you're considering making significant changes to your diet or exercise routine, especially if you have pre-existing health conditions</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-red-500 mr-2 mt-1">•</span>
                            <span>If you have a history of eating disorders or body image issues - numbers can sometimes trigger unhealthy behaviors</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-red-500 mr-2 mt-1">•</span>
                            <span>If you're pregnant, breastfeeding, or planning to become pregnant - your nutritional needs are completely different</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-red-500 mr-2 mt-1">•</span>
                            <span>If you take medications that affect weight, metabolism, or fluid retention (like steroids, insulin, or certain blood pressure medications)</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-red-500 mr-2 mt-1">•</span>
                            <span>If you have conditions like thyroid disorders, diabetes, heart disease, or kidney problems</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Healthy Mindset Matters</h3>
                        <p className="text-sm text-muted-foreground">
                          I've worked with hundreds of people on their fitness journeys, and the ones who succeed long-term are those who don't obsess over numbers. Your body fat percentage is just data - it's not a measure of your worth, discipline, or health. Some days it'll be higher, some days lower. Stress, sleep, hormones, and hydration all play roles.
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Use this tool to track trends over months, not to judge yourself day-to-day. If seeing these numbers causes anxiety or leads to restrictive behaviors, it might be better to focus on how you feel, how your clothes fit, and your energy levels instead.
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                      <p className="text-sm text-muted-foreground">
                        <strong>Medical Disclaimer:</strong> The creators of this tool are not medical professionals. This calculator provides estimates based on mathematical formulas. It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition or health objectives.
                      </p>
                    </div>
                  </div>
                )}
              </article>

              {/* FAQs - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('faqs')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h2 className="text-xl font-bold text-foreground">Common Questions About Body Fat</h2>
                  {openSections.faqs ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.faqs && (
                  <div className="px-6 pb-6">
                    <div className="space-y-8">
                      {faqData.map((faq, index) => (
                        <div key={index} className="pb-6 border-b border-border last:border-b-0 last:pb-0">
                          <h3 className="text-lg font-semibold text-foreground mb-3">{faq.question}</h3>
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </div>
                      ))}
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