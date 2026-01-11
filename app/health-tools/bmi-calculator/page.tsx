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

            {/* SEO Content Section */}
            <section className="space-y-8">
              {/* BMI Formula */}
              <article className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <h2 className="text-xl font-bold text-foreground mb-4">BMI Formula - How It Actually Works</h2>
                <p className="text-muted-foreground mb-4">
                  At its core, BMI is a straightforward mathematical calculation. The formula is weight in kilograms divided by height in meters squared. But here's what many people don't realize: the simplicity of this calculation masks its scientific background.
                </p>
                <p className="text-muted-foreground mb-4">
                  The BMI formula was originally developed in the 1830s by Belgian statistician Adolphe Quetelet, who was studying social physics. He noticed that weight tends to increase proportionally to the square of height in average adults - that's where the "squared" part comes from. It wasn't originally created as a medical tool, but researchers in the 1970s found it correlated surprisingly well with body fat percentage in population studies.
                </p>
                <p className="text-muted-foreground">
                  When you enter your measurements into our calculator, we're doing more than just plugging numbers into a formula. We're first converting whatever units you provide into the standard metric measurements required by the BMI equation. This conversion happens behind the scenes, so you get accurate results whether you're thinking in pounds and inches or kilograms and centimeters.
                </p>
              </article>

              {/* Result Interpretation */}
              <article className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <h2 className="text-xl font-bold text-foreground mb-4">Making Sense of Your BMI Result</h2>
                <p className="text-muted-foreground mb-4">
                  Getting your BMI number is one thing, but understanding what it means for you personally is another. The categories - underweight, normal, overweight, and obese - are based on epidemiological research that links these ranges to health outcomes in large population studies.
                </p>
                <p className="text-muted-foreground mb-4">
                  For most adults, a BMI between 18.5 and 24.9 correlates with the lowest risk of weight-related health issues. But here's something important: BMI doesn't distinguish between fat, muscle, or bone mass. A professional athlete with substantial muscle might register as "overweight" even with very low body fat. Similarly, an older adult with muscle loss might show a "normal" BMI while carrying excess fat.
                </p>
                <p className="text-muted-foreground mb-4">
                  Context matters tremendously. Your age, sex, ethnicity, and lifestyle all influence what your BMI number means for you. For instance, some ethnic groups have different health risks at the same BMI levels. That's why our calculator provides guidance but can't replace personalized medical advice.
                </p>
                <p className="text-muted-foreground">
                  If your result surprises you, consider these factors. Have you recently gained muscle through strength training? Are you naturally more muscular or have a larger bone structure? These can all push your BMI higher without indicating excess body fat. Conversely, if you're elderly and less active than you used to be, you might want to pay attention to a normal BMI that could mask muscle loss.
                </p>
              </article>

              {/* Standard Ranges */}
              <article className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <h2 className="text-xl font-bold text-foreground mb-4">Standard BMI Ranges and Their Meaning</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <h3 className="text-lg font-semibold text-blue-600 mb-2">Underweight (Below 18.5)</h3>
                    <p className="text-muted-foreground">
                      Being underweight can indicate inadequate nutrition, which might affect immune function, bone health, and energy levels. Some people are naturally lean with a BMI in this range and experience no health issues. However, if you've unintentionally lost weight or struggle to maintain weight, it's worth discussing with a healthcare provider.
                    </p>
                  </div>
                  <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                    <h3 className="text-lg font-semibold text-green-600 mb-2">Normal Weight (18.5 - 24.9)</h3>
                    <p className="text-muted-foreground">
                      This range is associated with the lowest risk of weight-related health problems for most people. However, "normal" doesn't automatically mean "healthy" - your lifestyle, diet quality, activity level, and where you carry fat (waist measurement matters) all contribute to your actual health status.
                    </p>
                  </div>
                  <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                    <h3 className="text-lg font-semibold text-yellow-600 mb-2">Overweight (25 - 29.9)</h3>
                    <p className="text-muted-foreground">
                      The overweight category is nuanced. Some research suggests people in the lower end of this range (25-27) might have similar mortality risk to those in the normal range. The health implications often depend more on fitness level, blood markers, and fat distribution than the BMI number alone.
                    </p>
                  </div>
                  <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                    <h3 className="text-lg font-semibold text-red-600 mb-2">Obese (30 and Above)</h3>
                    <p className="text-muted-foreground">
                      Obesity is medically defined as having excess body fat that may impair health. BMI categories further divide obesity into Class 1 (30-34.9), Class 2 (35-39.9), and Class 3 (40+). Higher categories generally correlate with increased health risks, but individual health can vary significantly.
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground mt-4">
                  Remember that these ranges apply to adults aged 20-65. Different standards exist for children, teens, and older adults. The cutoffs also vary slightly for some Asian populations, who may experience health risks at lower BMI levels.
                </p>
              </article>

              {/* Examples */}
              <article className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <h2 className="text-xl font-bold text-foreground mb-4">Real-World Examples That Illustrate BMI Nuances</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Example 1: The Office Worker</h3>
                    <p className="text-muted-foreground mb-3">
                      Sarah is 35, works a desk job, and measures 5'6" (167.6 cm) tall. She weighs 155 lbs (70.3 kg). Her BMI calculates to 25.1, putting her just into the overweight category. However, Sarah walks daily and strength trains twice a week. Her waist measures 31 inches, well below the risk threshold. Her blood pressure and cholesterol are excellent.
                    </p>
                    <p className="text-muted-foreground">
                      <strong>Takeaway:</strong> Sarah's slightly elevated BMI doesn't necessarily indicate poor health. Her fitness level, body composition, and metabolic markers tell a more complete story than BMI alone.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Example 2: The Retiree</h3>
                    <p className="text-muted-foreground mb-3">
                      Robert is 68 and retired. At 5'9" (175 cm) and 170 lbs (77 kg), his BMI is 25.2 - also technically overweight. But Robert has lost 15 pounds of muscle over the past decade while gaining some fat. His scale weight hasn't changed much, but his body composition has shifted significantly.
                    </p>
                    <p className="text-muted-foreground">
                      <strong>Takeaway:</strong> For older adults, BMI can be misleading because it doesn't account for age-related muscle loss (sarcopenia). A "normal" or slightly "overweight" BMI might mask significant health concerns.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Example 3: The Construction Worker</h3>
                    <p className="text-muted-foreground mb-3">
                      Miguel works construction and lifts weights regularly. At 5'10" (178 cm) and 200 lbs (90.7 kg), his BMI is 28.6 - solidly in the overweight range. But his body fat percentage, measured by his doctor, is only 15%. Most of his weight comes from muscle developed through years of physical labor and training.
                    </p>
                    <p className="text-muted-foreground">
                      <strong>Takeaway:</strong> For very muscular individuals, BMI often overestimates body fat. Other measurements like waist circumference or body fat percentage provide more accurate health assessments.
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground mt-4">
                  These examples show why BMI should be just one piece of your health assessment puzzle. It's a useful screening tool for populations and a starting point for individuals, but it doesn't capture the whole picture of anyone's health.
                </p>
              </article>

              {/* Medical Disclaimer */}
              <article className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <h2 className="text-xl font-bold text-foreground mb-4">Important Medical Information You Should Know</h2>
                <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20 mb-4">
                  <p className="text-muted-foreground">
                    This BMI calculator provides general information for educational purposes only. The results should not be considered medical advice, diagnosis, or treatment recommendations. BMI is a screening tool with known limitations, not a comprehensive health assessment.
                  </p>
                </div>
                <p className="text-muted-foreground mb-4">
                  Several important factors that BMI doesn't account for include:
                </p>
                <ul className="space-y-3 text-muted-foreground mb-4">
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span><strong>Muscle mass vs. fat mass:</strong> Two people with identical BMI can have completely different body compositions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span><strong>Fat distribution:</strong> Abdominal fat carries different health risks than fat stored elsewhere</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span><strong>Bone density:</strong> People with heavier bones may have higher BMI without excess fat</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span><strong>Age-related changes:</strong> Muscle loss and fat redistribution occur naturally with aging</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span><strong>Ethnic differences:</strong> Health risks vary among different ethnic groups at the same BMI</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span><strong>Pregnancy status:</strong> BMI calculations are not appropriate during pregnancy</span>
                  </li>
                </ul>
                <p className="text-muted-foreground">
                  If you have concerns about your weight or health, please consult with a qualified healthcare professional. They can perform a comprehensive assessment that considers your medical history, family history, lifestyle, and specific health markers. Never make significant changes to your diet, exercise routine, or medications based solely on BMI calculations without professional guidance.
                </p>
              </article>

              {/* FAQs */}
              <article className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <h2 className="text-xl font-bold text-foreground mb-6">Common Questions About BMI</h2>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Why does my BMI say I'm overweight when I look and feel healthy?</h3>
                    <p className="text-muted-foreground">
                      This happens more often than you might think. BMI is a population-level screening tool that works reasonably well for groups but can miss the mark for individuals. If you're physically active, eat well, have good energy levels, and your doctor says your health markers are fine, your BMI category might not accurately reflect your health status. Many fit, muscular people fall into the "overweight" BMI category despite having low body fat percentages.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">How often should I check my BMI?</h3>
                    <p className="text-muted-foreground">
                      For most people, checking every 1-3 months is sufficient unless you're actively trying to change your weight. More frequent checks aren't usually helpful because normal daily weight fluctuations (from hydration, food intake, etc.) can be misleading. Remember that slow, sustainable changes are generally healthier than rapid weight loss or gain. If you're monitoring for health reasons, consider tracking additional measures like waist circumference, how your clothes fit, or energy levels alongside BMI.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Is BMI accurate for athletes and bodybuilders?</h3>
                    <p className="text-muted-foreground">
                      Not particularly. BMI tends to overestimate body fat in very muscular individuals because it can't distinguish between muscle weight and fat weight. A bodybuilder with minimal body fat might have a BMI in the obese range due to their substantial muscle mass. For athletes, other measures like body fat percentage (via skinfold measurements, DEXA scans, or other methods) or performance metrics often provide more meaningful information about their fitness and health.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Why are there different BMI categories for Asian populations?</h3>
                    <p className="text-muted-foreground">
                      Studies have shown that people from many Asian backgrounds may face weight-related health risks at lower BMI levels compared to Western populations. This is largely due to differences in body composition, especially a higher tendency to store fat around the abdominal area, often called visceral fat. Because of this, the same BMI number can represent different health risks for different populations. As a result, some health organizations suggest adjusted BMI ranges for Asian individuals: underweight below 18.5, a healthy range between 18.5 and 23, overweight from 23 to 27.5, and obesity above 27.5.
                    </p>

                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Can children and teens use this calculator?</h3>
                    <p className="text-muted-foreground">
                      This calculator uses adult BMI categories, which aren't appropriate for anyone under 20. Children and teens need age- and sex-specific BMI percentiles because their bodies are still growing and developing. What's considered a healthy BMI changes dramatically throughout childhood and adolescence. Pediatricians use growth charts that compare a child's BMI to others of the same age and sex. If you need to calculate BMI for someone under 20, please use tools specifically designed for pediatric assessment.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">What's more important - BMI or waist measurement?</h3>
                    <p className="text-muted-foreground">
                      Both provide useful but different information. BMI gives you a general weight-for-height ratio, while waist measurement helps assess abdominal fat, which is particularly linked to metabolic health risks. Many experts consider waist circumference a better predictor of health problems than BMI alone. For adults, a waist measurement over 40 inches (102 cm) for men or 35 inches (88 cm) for women indicates increased health risk regardless of BMI. Ideally, look at both measures together for a more complete picture.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">I lost weight but my BMI barely changed. Why?</h3>
                    <p className="text-muted-foreground">
                      Small changes in weight can take time to show up in your BMI category because the ranges are fairly broad. For example, if you started at a BMI of 26.5 (overweight) and lost enough weight to reach 24.9, you'd move into the normal category - but that might represent 10-15 pounds of weight loss depending on your height. Also, remember that BMI is based on the square of your height, so shorter people need less absolute weight change to shift categories than taller people.
                    </p>
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