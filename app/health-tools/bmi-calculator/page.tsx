'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Calculator, RotateCcw, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';

export default function BMICalculator() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [result, setResult] = useState<{ bmi: number; category: string; color: string } | null>(null);

  // Height unit options
  const heightUnits = [
    { value: 'cm', label: 'cm' },
    { value: 'm', label: 'm' },
    { value: 'ft', label: 'feet' },
    { value: 'in', label: 'inches' }
  ];

  // Weight unit options
  const weightUnits = [
    { value: 'kg', label: 'kg' },
    { value: 'lbs', label: 'lbs' },
    { value: 'st', label: 'stone' }
  ];

  // Convert height to meters
  const convertHeightToMeters = (value: number, unit: string): number => {
    switch (unit) {
      case 'cm':
        return value / 100;
      case 'm':
        return value;
      case 'ft':
        return value * 0.3048;
      case 'in':
        return value * 0.0254;
      default:
        return value;
    }
  };

  // Convert weight to kilograms
  const convertWeightToKg = (value: number, unit: string): number => {
    switch (unit) {
      case 'kg':
        return value;
      case 'lbs':
        return value * 0.453592;
      case 'st':
        return value * 6.35029;
      default:
        return value;
    }
  };

  const calculateBMI = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (!h || !w) return;

    // Convert all inputs to metric units
    const heightInMeters = convertHeightToMeters(h, heightUnit);
    const weightInKg = convertWeightToKg(w, weightUnit);

    // Calculate BMI using metric formula
    const bmi = weightInKg / (heightInMeters * heightInMeters);

    let category = '';
    let color = '';

    if (bmi < 18.5) {
      category = 'Underweight';
      color = 'text-blue-600';
    } else if (bmi < 25) {
      category = 'Normal weight';
      color = 'text-green-600';
    } else if (bmi < 30) {
      category = 'Overweight';
      color = 'text-yellow-600';
    } else {
      category = 'Obese';
      color = 'text-red-600';
    }

    setResult({ bmi: Math.round(bmi * 10) / 10, category, color });
  };

  const reset = () => {
    setHeight('');
    setWeight('');
    setHeightUnit('cm');
    setWeightUnit('kg');
    setResult(null);
  };

  // Get conversion formula for display
  const getConversionFormula = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (!h || !w) return '';

    const heightInMeters = convertHeightToMeters(h, heightUnit);
    const weightInKg = convertWeightToKg(w, weightUnit);

    return `Height: ${h} ${heightUnit} → ${heightInMeters.toFixed(4)} m | Weight: ${w} ${weightUnit} → ${weightInKg.toFixed(4)} kg | BMI = ${weightInKg.toFixed(4)} / (${heightInMeters.toFixed(4)})² = ${result?.bmi}`;
  };

  return (
    <>
      <Head>
        <title>Free BMI Calculator Online - Calculate Body Mass Index with All Units</title>
        <meta name="description" content="Use our free BMI calculator to calculate your Body Mass Index instantly. Supports cm, feet, kg, lbs & stone. Accurate results with WHO standards. Mobile-friendly tool." />
        <meta name="keywords" content="BMI calculator, free BMI calculator, body mass index calculator, calculate BMI online, BMI calculator with height and weight, BMI calculator kg and cm, BMI calculator feet and inches, health calculator, weight calculator" />
        <meta property="og:title" content="Free BMI Calculator Online - Calculate Body Mass Index" />
        <meta property="og:description" content="Calculate your BMI instantly using cm, feet, kg, lbs, or stone. Accurate results with health assessment." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free BMI Calculator - Calculate Your Body Mass Index" />
        <meta name="twitter:description" content="Instant BMI calculation with all measurement units. Get accurate health assessment." />
        <link rel="canonical" href="https://www.grocktool.com/health-tools/bmi-calculator" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "BMI Calculator",
            "applicationCategory": "HealthApplication",
            "operatingSystem": "Any",
            "description": "Free online BMI calculator to calculate Body Mass Index using various measurement units",
            "url": "https://www.grocktool.com/health-tools/bmi-calculator",
            "author": {
              "@type": "Organization",
              "name": "GrockTool"
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
                href="/tools"
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
                  Free BMI Calculator Online
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Free, fast, and accurate BMI calculator — no signup required.
                  Calculate your Body Mass Index instantly using cm, feet, kg, lbs, or stone.
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
                {/* Input Fields with Unit Selection */}
                <div className="grid grid-cols-1 gap-4">
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
                        placeholder="Enter height"
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
                      <span>Common heights:</span>
                      <button
                        onClick={() => { setHeight('170'); setHeightUnit('cm'); }}
                        className="hover:text-foreground transition-colors"
                      >
                        170cm
                      </button>
                      <span>•</span>
                      <button
                        onClick={() => { setHeight('5.7'); setHeightUnit('ft'); }}
                        className="hover:text-foreground transition-colors"
                      >
                        5'7"
                      </button>
                      <span>•</span>
                      <button
                        onClick={() => { setHeight('68'); setHeightUnit('in'); }}
                        className="hover:text-foreground transition-colors"
                      >
                        68in
                      </button>
                    </div>
                  </div>

                  {/* Weight Input */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      Weight
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="Enter weight"
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
                      <span>Common weights:</span>
                      <button
                        onClick={() => { setWeight('65'); setWeightUnit('kg'); }}
                        className="hover:text-foreground transition-colors"
                      >
                        65kg
                      </button>
                      <span>•</span>
                      <button
                        onClick={() => { setWeight('150'); setWeightUnit('lbs'); }}
                        className="hover:text-foreground transition-colors"
                      >
                        150lbs
                      </button>
                      <span>•</span>
                      <button
                        onClick={() => { setWeight('10'); setWeightUnit('st'); }}
                        className="hover:text-foreground transition-colors"
                      >
                        10st
                      </button>
                    </div>
                  </div>
                </div>

                {/* Unit Conversion Info */}
                <div className="bg-muted p-3 rounded-lg">
                  <div className="text-sm text-foreground font-medium mb-1">Supported Units:</div>
                  <div className="text-xs text-muted-foreground grid grid-cols-2 gap-1">
                    <div><strong>Height:</strong> cm, m, feet, inches</div>
                    <div><strong>Weight:</strong> kg, lbs, stone</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={calculateBMI}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent text-accent-foreground rounded-lg sm:rounded-xl hover:bg-accent/80 transition-colors text-sm sm:text-base"
                  >
                    <Calculator size={16} className="sm:w-4 sm:h-4" />
                    Calculate BMI
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
                  {/* BMI Result */}
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground mb-2">Your BMI Score</div>
                    <div className="text-4xl font-bold text-foreground mb-2">
                      {result.bmi}
                    </div>
                    <div className={`text-xl font-semibold ${result.color}`}>
                      {result.category}
                    </div>
                  </div>

                  {/* Input Summary */}
                  <div className="bg-secondary/20 p-3 rounded-lg border border-border">
                    <div className="text-sm font-medium text-foreground mb-1">Your Input:</div>
                    <div className="text-sm text-muted-foreground">
                      Height: {height} {heightUnit} | Weight: {weight} {weightUnit}
                    </div>
                  </div>

                  {/* Conversion Details */}
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="text-sm font-medium text-foreground mb-1">Calculation Details:</div>
                    <div className="text-xs text-muted-foreground font-mono">
                      {getConversionFormula()}
                    </div>
                  </div>

                  {/* Health Assessment */}
                  <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
                    <div className="text-sm font-medium text-foreground mb-2">Health Assessment:</div>
                    <div className="text-sm text-muted-foreground">
                      Your BMI indicates you are in the <span className="font-medium text-foreground">{result.category.toLowerCase()}</span> category.
                      {result.category === 'Normal weight' && ' This is considered a healthy weight range according to WHO standards.'}
                      {result.category === 'Underweight' && ' Consider consulting a healthcare provider for guidance.'}
                      {result.category === 'Overweight' && ' Maintaining a healthy lifestyle is recommended.'}
                      {result.category === 'Obese' && ' Consulting with healthcare professionals is advised.'}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* BMI Categories Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 mb-6 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-foreground mb-4">BMI Categories (WHO Standards)</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <span className="text-sm font-medium text-foreground">Underweight</span>
                  <span className="text-sm font-bold text-blue-600">Below 18.5</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                  <span className="text-sm font-medium text-foreground">Normal weight</span>
                  <span className="text-sm font-bold text-green-600">18.5 - 24.9</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                  <span className="text-sm font-medium text-foreground">Overweight</span>
                  <span className="text-sm font-bold text-yellow-600">25 - 29.9</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                  <span className="text-sm font-medium text-foreground">Obese</span>
                  <span className="text-sm font-bold text-red-600">30 and above</span>
                </div>
              </div>
            </motion.div>

            {/* Unit Conversion Guide */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 mb-8 shadow-sm"
            >
              <h2 className="text-base sm:text-lg font-semibold text-foreground mb-3">Unit Conversion Guide</h2>
              <div className="space-y-2 text-muted-foreground text-sm">
                <div className="text-xs sm:text-sm space-y-2">
                  <div className="font-medium text-foreground">Height Conversions:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div>1 foot = 30.48 cm = 0.3048 m</div>
                    <div>1 inch = 2.54 cm = 0.0254 m</div>
                    <div>1 cm = 0.3937 inches</div>
                    <div>1 m = 3.2808 feet</div>
                  </div>
                </div>
                <div className="text-xs sm:text-sm space-y-2 pt-3">
                  <div className="font-medium text-foreground">Weight Conversions:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div>1 pound (lb) = 0.4536 kg</div>
                    <div>1 stone = 14 lbs = 6.3503 kg</div>
                    <div>1 kg = 2.2046 lbs</div>
                    <div>1 kg = 0.1575 stone</div>
                  </div>
                </div>
                <div className="text-xs sm:text-sm space-y-2 pt-3">
                  <div className="font-medium text-foreground">Common Examples:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div>5'7" = 170 cm = 1.70 m</div>
                    <div>150 lbs = 68 kg = 10.7 stone</div>
                    <div>6 feet = 182.9 cm = 1.83 m</div>
                    <div>180 lbs = 81.6 kg = 12.9 stone</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* SEO Content Section */}
            <section className="space-y-8">
              {/* What This Tool Does */}
              <article className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <h2 className="text-xl font-bold text-foreground mb-4">Free BMI Calculator - What It Does</h2>
                <p className="text-muted-foreground mb-4">
                  This free online tool helps you calculate your Body Mass Index (BMI) using height and weight in multiple measurement systems.
                  It supports both metric units (cm, m, kg) and imperial units (feet, inches, lbs, stone), making it suitable for users worldwide.
                </p>
                <p className="text-muted-foreground">
                  The calculator automatically converts your inputs, applies the standard BMI formula recommended by the World Health Organization (WHO),
                  and shows your result along with the correct weight category. You also get clear calculation details and unit conversions,
                  so you understand exactly how your BMI is calculated.
                </p>

              </article>

              {/* Use Cases */}
              <article className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <h2 className="text-xl font-bold text-foreground mb-4">Practical Applications of BMI Calculation</h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span><strong>Health Screening:</strong> Use this <strong>free BMI calculator</strong> for preliminary health assessments before medical consultations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span><strong>Fitness Tracking:</strong> Monitor weight changes relative to height during fitness programs using our <strong>weight calculator</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span><strong>Nutrition Planning:</strong> Determine appropriate calorie intake based on BMI categories from this <strong>body mass index calculator</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span><strong>International Standards:</strong> Convert between measurement systems for global health comparisons with our unit conversion</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span><strong>Educational Tool:</strong> Learn about body composition, health metrics, and the importance of maintaining healthy weight</span>
                  </li>
                </ul>
              </article>

              {/* How to Use This Tool */}
              <article className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <h2 className="text-xl font-bold text-foreground mb-4">How to Calculate BMI Using This Tool</h2>
                <ol className="space-y-4 text-muted-foreground pl-5">
                  <li className="pl-2">
                    <strong className="text-foreground">Enter Your Height</strong>
                    <p className="mt-1">Type your height in the first field. Select your preferred unit: centimeters (cm), meters (m), feet (ft), or inches (in). For <strong>BMI calculator feet and inches</strong>, you can use decimal feet (5.7 for 5'7") or use the preset buttons.</p>
                  </li>
                  <li className="pl-2">
                    <strong className="text-foreground">Enter Your Weight</strong>
                    <p className="mt-1">Type your weight in the second field. Choose your unit: kilograms (kg), pounds (lbs), or stone (st). The <strong>BMI calculator kg and cm</strong> mode is automatic if you use metric units.</p>
                  </li>
                  <li className="pl-2">
                    <strong className="text-foreground">Calculate Your BMI</strong>
                    <p className="mt-1">Click "Calculate BMI" to get instant results. Our <strong>calculate BMI online</strong> tool will convert units automatically and apply the formula: BMI = weight(kg) / height(m)².</p>
                  </li>
                  <li className="pl-2">
                    <strong className="text-foreground">Review Detailed Results</strong>
                    <p className="mt-1">Examine your BMI score, category, conversion details, and health assessment. The tool shows exactly how your input was calculated.</p>
                  </li>
                  <li className="pl-2">
                    <strong className="text-foreground">Take Appropriate Action</strong>
                    <p className="mt-1">Based on your BMI category, consider the provided guidance. For personalized medical advice, always consult healthcare professionals.</p>
                  </li>
                </ol>
              </article>

              {/* Example Input and Output */}
              <article className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <h2 className="text-xl font-bold text-foreground mb-4">BMI Calculator Examples (Metric & Imperial)</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Example 1: BMI Calculator Using Metric Units</h3>
                    <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                      <pre className="text-sm text-muted-foreground font-mono">
                        {`Input (Metric System):
Height: 175 centimeters (cm)
Weight: 70 kilograms (kg)

Calculation Process:
Height converted to meters: 175 cm ÷ 100 = 1.75 m
Weight in kg: 70 kg (no conversion needed)
BMI Formula: 70 ÷ (1.75 × 1.75) = 70 ÷ 3.0625
Result: BMI = 22.9

Output:
BMI Score: 22.9
Category: Normal weight
Health Assessment: This BMI indicates a healthy weight range according to WHO standards.`}
                      </pre>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Example 2: BMI Calculator Using Imperial Units</h3>
                    <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                      <pre className="text-sm text-muted-foreground font-mono">
                        {`Input (Imperial System):
Height: 5 feet 9 inches (5'9")
Weight: 160 pounds (lbs)

Calculation Process:
Height conversion: 5'9" = 69 inches = 1.753 meters
Weight conversion: 160 lbs × 0.453592 = 72.57 kg
BMI Formula: 72.57 ÷ (1.753 × 1.753) = 72.57 ÷ 3.073
Result: BMI = 23.6

Output:
BMI Score: 23.6
Category: Normal weight
Health Assessment: This falls within the healthy weight range.`}
                      </pre>
                    </div>
                  </div>
                </div>
              </article>

              {/* Related Tools Section - Internal Linking */}
              <article className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <h2 className="text-xl font-bold text-foreground mb-4">Related Health Calculators</h2>
                <p className="text-muted-foreground mb-4">
                  Explore our other health and fitness tools that complement this BMI calculator:
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <Link href="/unit-tools/weight-converter" className="text-accent hover:underline">
                      <strong>Weight Converter:</strong> Convert between kg, lbs, stone, and other weight units
                    </Link>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <Link href="/unit-tools/length-converter" className="text-accent hover:underline">
                      <strong>Height Converter:</strong> Convert between cm, feet, inches, and meters
                    </Link>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <Link href="/health-tools/calorie-calculator" className="text-accent hover:underline">
                      <strong>Calorie Calculator:</strong> Calculate daily calorie needs based on activity level
                    </Link>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <Link href="/health-tools/body-fat" className="text-accent hover:underline">
                      <strong>Body Fat Calculator:</strong> Estimate body fat percentage using multiple methods
                    </Link>
                  </li>
                </ul>
              </article>

              {/* Frequently Asked Questions */}
              <article className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <h2 className="text-xl font-bold text-foreground mb-4">Frequently Asked Questions About BMI Calculation</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">What is BMI and why should I use a BMI calculator?</h3>
                    <p className="text-muted-foreground">BMI (Body Mass Index) is a numerical value calculated from a person's weight and height. It's a widely used screening tool to identify potential weight-related health risks. Our <strong>free BMI calculator online</strong> makes this calculation instant and accurate, supporting all measurement units for global accessibility.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">How accurate is this BMI calculator compared to others?</h3>
                    <p className="text-muted-foreground">Our <strong>BMI calculator with height and weight</strong> uses precise conversion factors and follows WHO standards. Unlike simple calculators that only work with one unit system, our tool handles cm, m, feet, inches, kg, lbs, and stone with mathematical accuracy to 4 decimal places in conversions.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Can I use this BMI calculator for children or athletes?</h3>
                    <p className="text-muted-foreground">This calculator uses standard adult BMI categories. For children, growth charts are more appropriate. For athletes with high muscle mass, BMI may overestimate body fat. Consider using our <Link href="/tools/body-fat-calculator" className="text-accent hover:underline">Body Fat Calculator</Link> for more accurate body composition assessment.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">How often should I check my BMI for health monitoring?</h3>
                    <p className="text-muted-foreground">For general health monitoring, checking your BMI once every 1-3 months is sufficient. If you're actively working on weight management, monthly checks can help track progress. Remember that <strong>calculate BMI online</strong> tools provide screening information, not diagnostic medical advice.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">What should I do if my BMI is outside the normal range?</h3>
                    <p className="text-muted-foreground">A single BMI reading outside normal range isn't necessarily cause for concern. However, consistent readings combined with other factors should prompt consultation with healthcare professionals. Our tool provides general guidance, but personalized medical advice should come from qualified providers.</p>
                  </div>
                </div>

                {/* Medical Disclaimer */}
                <div className="mt-8 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Important Medical Disclaimer</h3>
                  <p className="text-sm text-muted-foreground">
                    This BMI calculator is for informational purposes only. BMI is a general health indicator and does not account for muscle mass, bone density, overall body composition, or racial and sex differences. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare providers for health-related decisions.
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