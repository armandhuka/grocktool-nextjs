'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Percent, RotateCcw, Copy, ArrowLeft, Calculator, DollarSign, TrendingUp, Calendar, Sparkles, ChevronUp, ChevronDown, ChevronRight, Lock, Zap, Target, BarChart, Hash, SortAsc, FileText, Maximize2, Globe, Shuffle } from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';

const SimpleInterest = () => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [result, setResult] = useState<{ interest: number; amount: number } | null>(null);

  const [openSections, setOpenSections] = useState({
    whatItDoes: false,
    useCases: false,
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

  // Related tools for Number Tools category - using your provided list
  const relatedTools = [
    { name: 'Percentage Calculator', path: '/number-tools/percentage-calculator', icon: Percent },
    { name: 'Roman Number Converter', path: '/number-tools/roman-converter', icon: Hash },
    { name: 'LCM/HCF Calculator', path: '/number-tools/lcm-hcf-calculator', icon: SortAsc },
    { name: 'Number to Words', path: '/number-tools/number-to-words', icon: FileText },
    { name: 'Scientific Notation', path: '/number-tools/scientific-notation', icon: Maximize2 },
    { name: 'Base Converter', path: '/number-tools/number-base-converter', icon: Globe },
    { name: 'Number Rounding', path: '/number-tools/rounding', icon: TrendingUp },
    { name: 'Random Generator', path: '/number-tools/random-generator', icon: Shuffle }
  ];

  const faqData = [
    {
      question: "What is simple interest and how is it calculated?",
      answer: "Simple interest is interest calculated only on the principal amount, not on previously earned interest. It's calculated using the formula: Interest = (Principal × Rate × Time) ÷ 100. This calculator automatically applies this formula to provide accurate interest and total amount calculations."
    },
    {
      question: "How does simple interest differ from compound interest?",
      answer: "Simple interest is calculated only on the original principal, while compound interest calculates interest on both the principal and accumulated interest. Simple interest grows linearly, while compound interest grows exponentially over time. For short-term investments, simple interest is often used."
    },
    {
      question: "Can I calculate interest for partial years?",
      answer: "Yes, you can enter decimal values for time (e.g., 2.5 years for 2 years and 6 months). The calculator accurately handles fractional time periods, making it suitable for investments or loans of any duration."
    },
    {
      question: "What currency does the calculator use?",
      answer: "The calculator displays results with ₹ symbol by default, but it works with any currency. You can input amounts in any currency, and the calculations remain mathematically accurate regardless of currency type."
    },
    {
      question: "Is this calculator suitable for loan calculations?",
      answer: "Yes, this simple interest calculator is perfect for personal loans, education loans, car loans, and other short-term financing where simple interest applies. For mortgages and long-term loans with compound interest, use our compound interest calculator."
    }
  ];

  const calculateInterest = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const t = parseFloat(time);

    if (isNaN(p) || isNaN(r) || isNaN(t) || p <= 0 || r <= 0 || t <= 0) {
      setResult(null);
      return;
    }

    const interest = (p * r * t) / 100;
    const amount = p + interest;

    setResult({ interest, amount });
  };

  const reset = () => {
    setPrincipal('');
    setRate('');
    setTime('');
    setResult(null);
  };

  const copyResult = async () => {
    if (result) {
      const text = `Simple Interest Calculation:\nPrincipal: ₹${principal}\nRate: ${rate}% per annum\nTime: ${time} years\nInterest Earned: ₹${result.interest.toFixed(2)}\nTotal Amount: ₹${result.amount.toFixed(2)}`;
      try {
        await navigator.clipboard.writeText(text);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  const setExampleCalculation = (exampleType: string) => {
    switch (exampleType) {
      case 'fixedDeposit':
        setPrincipal('100000');
        setRate('6.5');
        setTime('3');
        break;
      case 'personalLoan':
        setPrincipal('50000');
        setRate('12');
        setTime('2');
        break;
      case 'savings':
        setPrincipal('25000');
        setRate('4.2');
        setTime('5');
        break;
      case 'educationLoan':
        setPrincipal('200000');
        setRate('8.5');
        setTime('4');
        break;
    }
  };

  useEffect(() => {
    calculateInterest();
  }, [principal, rate, time]);

  return (
    <>
      <Head>
        <title>Simple Interest Calculator | Calculate Interest on Loans & Investments | GrockTool.com</title>
        <meta name="description" content="Calculate simple interest instantly with our free online calculator. Perfect for loans, investments, and financial planning. Accurate results with detailed breakdowns and formulas." />
        <meta name="keywords" content="simple interest calculator, interest calculator, loan interest calculator, investment calculator, financial calculator, interest calculation, personal loan calculator" />
        <meta property="og:title" content="Simple Interest Calculator | Calculate Interest on Loans & Investments" />
        <meta property="og:description" content="Calculate simple interest instantly with our free online calculator. Perfect for loans, investments, and financial planning. Accurate results with detailed breakdowns and formulas." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Simple Interest Calculator - Free & Accurate" />
        <meta name="twitter:description" content="Calculate simple interest for loans and investments instantly. Get accurate results with detailed breakdowns." />
        <link rel="canonical" href="https://grocktool.com/number-tools/simple-interest" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Simple Interest Calculator - Financial Calculation Tool",
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "Any",
            "description": "Calculate simple interest instantly with our free online calculator. Perfect for loans, investments, and financial planning. Accurate results with detailed breakdowns and formulas.",
            "url": "https://grocktool.com/number-tools/simple-interest",
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
              "Simple interest calculation",
              "Automatic real-time updates",
              "Detailed formula breakdown",
              "Example calculations",
              "Copy results functionality",
              "No signup required",
              "Responsive design"
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
          <div className="max-w-6xl mx-auto">
            {/* Header - Improved Hero Section */}
            <div className="mb-8 sm:mb-12">
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
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/10 to-blue-500/10 px-4 py-2 rounded-full mb-4 border border-green-500/20">
                  <Sparkles size={16} className="text-green-500" />
                  <span className="text-sm font-medium text-green-600">Real-Time Calculations • Financial Planning • 100% Accurate</span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                  Simple Interest Calculator
                  <span className="block text-lg sm:text-xl lg:text-2xl font-normal text-muted-foreground mt-2">
                    Calculate Interest on Loans, Investments & Savings • Instant Results with Detailed Breakdowns
                  </span>
                </h1>

                <div className="flex flex-wrap justify-center gap-4 mt-6 mb-8">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-lg">
                    <Percent size={14} className="text-green-600" />
                    <span className="text-xs sm:text-sm text-foreground">Interest Calculation</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 rounded-lg">
                    <TrendingUp size={14} className="text-blue-600" />
                    <span className="text-xs sm:text-sm text-foreground">Investment Planning</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 rounded-lg">
                    <DollarSign size={14} className="text-purple-600" />
                    <span className="text-xs sm:text-sm text-foreground">Loan Analysis</span>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Left Panel - Calculator */}
              <div className="space-y-6">
                {/* Main Tool Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-card rounded-xl border border-border p-6 shadow-sm"
                >
                  <div className="space-y-6">
                    {/* Quick Examples */}
                    <div className="space-y-2">
                      <div className="text-xs text-muted-foreground">Quick Example Calculations:</div>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setExampleCalculation('fixedDeposit')}
                          className="px-3 py-1.5 bg-green-500/10 text-green-600 rounded-lg hover:bg-green-500/20 transition-colors text-xs"
                        >
                          Fixed Deposit
                        </button>
                        <button
                          onClick={() => setExampleCalculation('personalLoan')}
                          className="px-3 py-1.5 bg-blue-500/10 text-blue-600 rounded-lg hover:bg-blue-500/20 transition-colors text-xs"
                        >
                          Personal Loan
                        </button>
                        <button
                          onClick={() => setExampleCalculation('savings')}
                          className="px-3 py-1.5 bg-purple-500/10 text-purple-600 rounded-lg hover:bg-purple-500/20 transition-colors text-xs"
                        >
                          Savings Account
                        </button>
                      </div>
                    </div>

                    {/* Input Fields */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Calculator size={20} className="text-foreground" />
                          <label className="block text-sm font-medium text-foreground">
                            Enter Investment/Loan Details
                          </label>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-green-600">
                          <Calculator size={12} />
                          <span>Real-time calculation</span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <DollarSign size={16} className="text-muted-foreground" />
                            <label className="block text-sm font-medium text-foreground">
                              Principal Amount
                            </label>
                          </div>
                          <div className="relative">
                            <input
                              type="number"
                              value={principal}
                              onChange={(e) => setPrincipal(e.target.value)}
                              placeholder="e.g., 10000"
                              className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground"
                              step="any"
                              min="0"
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                              <div className="bg-green-500 text-white rounded-full p-1">
                                <DollarSign size={10} />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Percent size={16} className="text-muted-foreground" />
                            <label className="block text-sm font-medium text-foreground">
                              Annual Interest Rate (%)
                            </label>
                          </div>
                          <div className="relative">
                            <input
                              type="number"
                              value={rate}
                              onChange={(e) => setRate(e.target.value)}
                              placeholder="e.g., 5"
                              className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground"
                              step="any"
                              min="0"
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                              <div className="bg-blue-500 text-white rounded-full p-1">
                                <Percent size={10} />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-muted-foreground" />
                            <label className="block text-sm font-medium text-foreground">
                              Time Period (Years)
                            </label>
                          </div>
                          <div className="relative">
                            <input
                              type="number"
                              value={time}
                              onChange={(e) => setTime(e.target.value)}
                              placeholder="e.g., 2"
                              className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground"
                              step="any"
                              min="0"
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                              <div className="bg-purple-500 text-white rounded-full p-1">
                                <Calendar size={10} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={calculateInterest}
                        disabled={!principal || !rate || !time}
                        className="flex items-center justify-center gap-2 flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                      >
                        <Calculator size={18} />
                        Calculate Interest
                      </button>
                      <button
                        onClick={reset}
                        className="flex-1 sm:flex-none px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-sm font-medium"
                      >
                        <RotateCcw size={16} />
                        Clear All
                      </button>
                    </div>
                  </div>
                </motion.div>

                {/* Simple Interest Formula Card */}
                <div className="rounded-xl border border-blue-200 dark:border-blue-800 p-6 shadow-sm">
                  <h3 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
                    <Target size={16} className="text-blue-600" />
                    Simple Interest Formula
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-secondary/20 p-4 rounded-lg border border-border">
                      <div className="text-center text-lg font-bold text-foreground mb-2">
                        I = P × R × T / 100
                      </div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div className="flex items-center justify-between">
                          <span>I = Simple Interest</span>
                          <span className="font-medium">₹{(parseFloat(principal || '0') * parseFloat(rate || '0') * parseFloat(time || '0') / 100).toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>P = Principal Amount</span>
                          <span className="font-medium">₹{principal || '0'}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>R = Annual Interest Rate</span>
                          <span className="font-medium">{rate || '0'}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>T = Time Period</span>
                          <span className="font-medium">{time || '0'} years</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Simple interest grows linearly and is calculated only on the original principal amount throughout the investment or loan period.
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Panel - Results */}
              <div className="space-y-6">
                {/* Results Card */}
                {result ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-card rounded-xl border border-border p-6 shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">Simple Interest Results</h3>
                        <p className="text-sm text-muted-foreground">
                          {principal} at {rate}% for {time} years
                        </p>
                      </div>
                      <button
                        onClick={copyResult}
                        className="p-2 text-muted-foreground hover:text-foreground transition-colors hover:bg-secondary/50 rounded-lg"
                        title="Copy results"
                      >
                        <Copy size={18} />
                      </button>
                    </div>

                    <div className="space-y-6">
                      {/* Main Results Display */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gradient-to-r from-green-500/10 to-green-600/10 p-4 rounded-xl border border-green-500/20 text-center">
                          <div className="text-2xl font-bold text-foreground">₹{result.interest.toFixed(2)}</div>
                          <div className="text-xs text-muted-foreground mt-1">Simple Interest Earned</div>
                        </div>
                        <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 p-4 rounded-xl border border-blue-500/20 text-center">
                          <div className="text-2xl font-bold text-foreground">₹{result.amount.toFixed(2)}</div>
                          <div className="text-xs text-muted-foreground mt-1">Total Amount</div>
                        </div>
                      </div>

                      {/* Detailed Breakdown */}
                      <div className="space-y-4">
                        <h4 className="text-sm font-medium text-foreground">Investment/Loan Breakdown</h4>
                        <div className="bg-secondary/20 p-4 rounded-lg border border-border">
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">Principal Amount</span>
                              <span className="font-semibold text-foreground">₹{parseFloat(principal).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">Annual Interest Rate</span>
                              <span className="font-semibold text-foreground">{rate}%</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">Time Period</span>
                              <span className="font-semibold text-foreground">{time} years</span>
                            </div>
                            <div className="pt-3 border-t border-border/50">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Interest Earned</span>
                                <span className="font-semibold text-green-600">₹{result.interest.toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Visual Progress */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Principal vs Interest</span>
                          <span className="font-medium text-foreground">
                            {((parseFloat(principal) / result.amount) * 100).toFixed(1)}% Principal
                          </span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-green-500 to-blue-500"
                            style={{ width: `${(result.interest / result.amount) * 100}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Principal: ₹{parseFloat(principal).toLocaleString()}</span>
                          <span>Interest: ₹{result.interest.toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Yearly Breakdown */}
                      {parseFloat(time) > 1 && (
                        <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                          <div className="flex items-center gap-2 mb-2">
                            <TrendingUp size={16} className="text-blue-600" />
                            <span className="text-sm font-medium text-foreground">Yearly Interest Growth</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Annual interest: ₹{(result.interest / parseFloat(time)).toFixed(2)} per year
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="bg-card rounded-xl border border-border p-6 shadow-sm"
                  >
                    <div className="text-center">
                      <div className="relative inline-block mb-4">
                        <Percent className="w-16 h-16 text-muted-foreground" />
                        <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-1">
                          <Calculator size={12} />
                        </div>
                      </div>
                      <p className="text-foreground font-medium mb-2">Enter Investment Details</p>
                      <p className="text-muted-foreground text-sm mb-4">
                        Add principal amount, interest rate, and time period to calculate simple interest
                      </p>
                      <div className="text-xs text-green-600 flex items-center justify-center gap-1">
                        <Lock size={10} />
                        <span>Real-time calculations • No data storage • Financial accuracy</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Common Scenarios Card */}
                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                  <h3 className="text-sm font-medium text-foreground mb-4">Common Simple Interest Scenarios</h3>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center gap-2 p-2 bg-green-500/10 rounded">
                      <DollarSign size={14} className="text-green-600" />
                      <span className="text-foreground">Fixed Deposits</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-blue-500/10 rounded">
                      <TrendingUp size={14} className="text-blue-600" />
                      <span className="text-foreground">Personal Loans</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-purple-500/10 rounded">
                      <BarChart size={14} className="text-purple-600" />
                      <span className="text-foreground">Education Loans</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-orange-500/10 rounded">
                      <Calendar size={14} className="text-orange-600" />
                      <span className="text-foreground">Short-term Savings</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SEO Content Section with Dropdowns */}
            <section className="space-y-4 mt-12">
              {/* What This Tool Does - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('whatItDoes')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-green-500/10 p-2 rounded-lg">
                      <Calculator size={20} className="text-green-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Simple Interest Calculator - Features & Financial Benefits</h2>
                  </div>
                  {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>

                {openSections.whatItDoes && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      This Simple Interest Calculator provides instant, accurate calculations for loans, investments, and savings using the standard simple interest formula (I = P × R × T / 100). Unlike complex financial tools, it focuses specifically on simple interest scenarios, making it perfect for personal loans, fixed deposits, education loans, and short-term investments where interest doesn't compound. The calculator offers real-time updates, detailed breakdowns of principal versus interest, and clear formula explanations to help users understand exactly how their interest is calculated.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Percent size={18} className="text-green-600" />
                          <h3 className="font-semibold text-foreground">Accurate Calculations</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">Uses precise mathematical formulas to calculate simple interest with real-time updates and automatic validation of inputs.</p>
                      </div>
                      <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign size={18} className="text-blue-600" />
                          <h3 className="font-semibold text-foreground">Financial Planning</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">Helps plan loans, investments, and savings with clear breakdowns of interest earned and total amounts.</p>
                      </div>
                      <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp size={18} className="text-purple-600" />
                          <h3 className="font-semibold text-foreground">Educational Tool</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">Provides formula explanations and step-by-step breakdowns to help users understand simple interest concepts.</p>
                      </div>
                    </div>
                  </div>
                )}
              </article>

              {/* Use Cases Section - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('useCases')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-500/10 p-2 rounded-lg">
                      <DollarSign size={20} className="text-blue-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Practical Simple Interest Applications</h2>
                  </div>
                  {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>

                {openSections.useCases && (
                  <div className="px-6 pb-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">💰 Personal Finance & Loans</h3>
                        <ul className="space-y-1 text-muted-foreground text-sm">
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Calculate interest on personal loans from banks or financial institutions for informed borrowing decisions</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Determine car loan interest costs to compare financing options and plan monthly budgets effectively</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Calculate education loan interest for college or university funding to understand total repayment amounts</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">🏦 Investments & Savings</h3>
                        <ul className="space-y-1 text-muted-foreground text-sm">
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Calculate returns on fixed deposits and recurring deposits with banks and financial institutions</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Determine interest earned on savings accounts and basic investment products for financial planning</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Plan short-term investments with predictable returns for specific financial goals and timelines</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">📚 Educational & Business Applications</h3>
                        <ul className="space-y-1 text-muted-foreground text-sm">
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Teach mathematical concepts of simple interest in classrooms and educational institutions</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Calculate business loan interest for small business financing and startup funding requirements</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Determine interest on vendor credit, trade finance, and short-term business borrowing</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </article>

              {/* How to Use - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('howToUse')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-500/10 p-2 rounded-lg">
                      <Zap size={20} className="text-orange-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">How to Calculate Simple Interest - Complete Guide</h2>
                  </div>
                  {openSections.howToUse ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>

                {openSections.howToUse && (
                  <div className="px-6 pb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h3 className="font-semibold text-foreground">Simple 4-Step Process</h3>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                            <div>
                              <div className="font-medium text-foreground">Enter Principal Amount</div>
                              <div className="text-sm text-muted-foreground">Input the initial investment or loan amount. Use quick examples for common scenarios.</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                            <div>
                              <div className="font-medium text-foreground">Set Interest Rate</div>
                              <div className="text-sm text-muted-foreground">Specify the annual interest rate as a percentage (e.g., 5 for 5% per annum).</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                            <div>
                              <div className="font-medium text-foreground">Define Time Period</div>
                              <div className="text-sm text-muted-foreground">Enter the duration in years. Use decimals for partial years (e.g., 2.5 for 2 years 6 months).</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">4</div>
                            <div>
                              <div className="font-medium text-foreground">Review Results</div>
                              <div className="text-sm text-muted-foreground">Get instant calculations of interest earned and total amount with detailed breakdowns.</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h3 className="font-semibold text-foreground">Pro Financial Tips</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <div className="bg-accent/20 p-1 rounded mt-0.5">
                              <Percent size={12} className="text-accent" />
                            </div>
                            <span>Compare simple interest rates across different banks and financial institutions for best deals</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-accent/20 p-1 rounded mt-0.5">
                              <Copy size={12} className="text-accent" />
                            </div>
                            <span>Use copy feature to save calculation results for loan applications or investment planning</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-accent/20 p-1 rounded mt-0.5">
                              <TrendingUp size={12} className="text-accent" />
                            </div>
                            <span>For investments longer than 1-2 years, consider compound interest for potentially higher returns</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-accent/20 p-1 rounded mt-0.5">
                              <Calendar size={12} className="text-accent" />
                            </div>
                            <span>Always verify whether your loan or investment uses simple or compound interest before calculating</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </article>

              {/* Example Input and Output Section */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('examples')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-500/10 p-2 rounded-lg">
                      <Calculator size={20} className="text-purple-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Simple Interest Calculation Examples</h2>
                  </div>
                  {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>

                {openSections.examples && (
                  <div className="px-6 pb-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-3">Common Simple Interest Scenarios</h3>
                        <div className="overflow-x-auto">
                          <div className="min-w-full inline-block align-middle">
                            <div className="overflow-hidden border border-border rounded-lg">
                              <table className="min-w-full divide-y divide-border">
                                <thead className="bg-secondary/20">
                                  <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Scenario</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Principal</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Rate</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Time</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Interest</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Total</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                  <tr>
                                    <td className="px-4 py-3 text-sm text-foreground">Fixed Deposit</td>
                                    <td className="px-4 py-3 text-sm text-blue-600">₹1,00,000</td>
                                    <td className="px-4 py-3 text-sm text-green-600">6.5%</td>
                                    <td className="px-4 py-3 text-sm text-purple-600">3 years</td>
                                    <td className="px-4 py-3 text-sm text-orange-600 font-medium">₹19,500</td>
                                    <td className="px-4 py-3 text-sm text-green-600 font-medium">₹1,19,500</td>
                                  </tr>
                                  <tr>
                                    <td className="px-4 py-3 text-sm text-foreground">Personal Loan</td>
                                    <td className="px-4 py-3 text-sm text-blue-600">₹50,000</td>
                                    <td className="px-4 py-3 text-sm text-green-600">12%</td>
                                    <td className="px-4 py-3 text-sm text-purple-600">2 years</td>
                                    <td className="px-4 py-3 text-sm text-orange-600 font-medium">₹12,000</td>
                                    <td className="px-4 py-3 text-sm text-green-600 font-medium">₹62,000</td>
                                  </tr>
                                  <tr>
                                    <td className="px-4 py-3 text-sm text-foreground">Education Loan</td>
                                    <td className="px-4 py-3 text-sm text-blue-600">₹2,00,000</td>
                                    <td className="px-4 py-3 text-sm text-green-600">8.5%</td>
                                    <td className="px-4 py-3 text-sm text-purple-600">4 years</td>
                                    <td className="px-4 py-3 text-sm text-orange-600 font-medium">₹68,000</td>
                                    <td className="px-4 py-3 text-sm text-green-600 font-medium">₹2,68,000</td>
                                  </tr>
                                  <tr>
                                    <td className="px-4 py-3 text-sm text-foreground">Savings Account</td>
                                    <td className="px-4 py-3 text-sm text-blue-600">₹25,000</td>
                                    <td className="px-4 py-3 text-sm text-green-600">4.2%</td>
                                    <td className="px-4 py-3 text-sm text-purple-600">5 years</td>
                                    <td className="px-4 py-3 text-sm text-orange-600 font-medium">₹5,250</td>
                                    <td className="px-4 py-3 text-sm text-green-600 font-medium">₹30,250</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Detailed Calculation Example</h3>
                        <div className="bg-secondary/20 p-4 rounded-lg border border-border overflow-x-auto">
                          <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
                            {`Example: Calculate simple interest for a ₹1,00,000 fixed deposit at 6.5% for 3 years

Step 1: Identify the variables
Principal (P) = ₹1,00,000
Rate of Interest (R) = 6.5% per annum
Time Period (T) = 3 years

Step 2: Apply simple interest formula
Formula: I = (P × R × T) ÷ 100

Step 3: Substitute values
I = (100000 × 6.5 × 3) ÷ 100

Step 4: Calculate step by step
1. Multiply principal by rate: 100000 × 6.5 = 650000
2. Multiply by time: 650000 × 3 = 1950000
3. Divide by 100: 1950000 ÷ 100 = 19500

Simple Interest (I) = ₹19,500

Step 5: Calculate total amount
Formula: Total Amount = Principal + Interest
Total Amount = 100000 + 19500 = ₹1,19,500

Step 6: Annual breakdown
Annual interest = Total Interest ÷ Time
Annual interest = 19500 ÷ 3 = ₹6,500 per year

Monthly interest approximation = Annual interest ÷ 12
Monthly interest ≈ 6500 ÷ 12 = ₹541.67 per month

Step 7: Verification
Using alternative calculation:
Interest rate per year = 6.5% of ₹1,00,000 = ₹6,500
For 3 years = 6500 × 3 = ₹19,500 ✓

Final Results:
• Principal Amount: ₹1,00,000
• Annual Interest Rate: 6.5%
• Time Period: 3 years
• Simple Interest Earned: ₹19,500
• Total Amount: ₹1,19,500
• Annual Interest: ₹6,500
• Monthly Interest (approx): ₹541.67

Key Calculation Features:
✓ Accurate simple interest formula application
✓ Step-by-step calculation breakdown
✓ Annual and monthly interest calculations
✓ Total amount including principal
✓ Verification using alternative method
✓ Clear financial result presentation`}
                          </pre>
                        </div>
                      </div>
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
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-500/10 p-2 rounded-lg">
                      <Percent size={20} className="text-purple-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Frequently Asked Questions</h2>
                  </div>
                  {openSections.faqs ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>

                {openSections.faqs && (
                  <div className="px-6 pb-6">
                    <div className="space-y-6">
                      {faqData.map((faq, index) => (
                        <div key={index} className="pb-4 border-b border-border/50 last:border-0">
                          <h3 className="text-lg font-semibold text-foreground mb-2">{faq.question}</h3>
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </div>
                      ))}
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
                  <h2 className="text-xl font-bold text-foreground">More Number Tools</h2>
                  {openSections.relatedTools ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>

                {openSections.relatedTools && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Explore other useful number calculation tools from our Number Tools category:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {relatedTools.map((tool, index) => {
                        const Icon = tool.icon;
                        return (
                          <Link
                            key={index}
                            href={tool.path}
                            className="flex items-center gap-3 p-4 bg-secondary/30 rounded-lg border border-border hover:bg-secondary/50 transition-colors group"
                          >
                            <div className="bg-accent/10 p-2 rounded-lg group-hover:bg-accent/20 transition-colors">
                              <Icon size={18} className="text-accent" />
                            </div>
                            <div>
                              <div className="font-medium text-foreground group-hover:text-accent transition-colors">{tool.name}</div>
                              <div className="text-xs text-muted-foreground">Visit tool →</div>
                            </div>
                          </Link>
                        );
                      })}
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
};

export default SimpleInterest;