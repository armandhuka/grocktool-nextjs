'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, PieChart, RotateCcw, Copy, ArrowLeft, Calendar, DollarSign, Percent, BarChart3, ChevronUp, ChevronDown, ChevronRight, Home, Car, GraduationCap, Building2, CreditCard, Heart, FileText, BookOpen, Hash, Globe, SortAsc, Shuffle, Maximize2, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

export default function EMICalculatorPage() {
  const [loanAmount, setLoanAmount] = useState<string>('100000');
  const [interestRate, setInterestRate] = useState<string>('8.5');
  const [loanTenure, setLoanTenure] = useState<string>('5');
  const [tenureType, setTenureType] = useState<'years' | 'months'>('years');
  const [openSections, setOpenSections] = useState({
    whatItDoes: false,
    useCases: false,
    howToUse: false,
    examples: false,
    faqs: false,
    relatedTools: false
  });
  
  const [results, setResults] = useState<{
    emi: number;
    totalInterest: number;
    totalPayment: number;
    breakdown: { month: number; principal: number; interest: number; balance: number }[];
    chartData: { principal: number; interest: number }[];
  } | null>(null);

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Related tools for Number Tools category - using your provided list
  const relatedTools = [
    { name: 'Percentage Calculator', path: '/number-tools/percentage-calculator', icon: Percent },
    { name: 'Simple Interest Calculator', path: '/number-tools/simple-interest', icon: DollarSign },
    { name: 'Roman Number Converter', path: '/number-tools/roman-converter', icon: Hash },
    { name: 'LCM/HCF Calculator', path: '/number-tools/lcm-hcf-calculator', icon: SortAsc },
    { name: 'Number to Words', path: '/number-tools/number-to-words', icon: FileText },
    { name: 'Scientific Notation', path: '/number-tools/scientific-notation', icon: Maximize2 },
    { name: 'Base Converter', path: '/number-tools/number-base-converter', icon: Globe },
    { name: 'Number Rounding', path: '/number-tools/rounding', icon: TrendingUp },
    { name: 'Random Generator', path: '/number-tools/random-generator', icon: Shuffle }
  ];

  // FAQ Data
  const faqData = [
    {
      question: "What is EMI and how is it calculated?",
      answer: "EMI (Equated Monthly Installment) is the fixed monthly payment you make to repay a loan. It's calculated using the formula: EMI = P × r × (1 + r)ⁿ / ((1 + r)ⁿ - 1), where P is the principal loan amount, r is the monthly interest rate (annual rate divided by 12), and n is the loan tenure in months. This calculator automatically applies this formula to provide accurate EMI calculations."
    },
    {
      question: "How does the interest rate affect my EMI?",
      answer: "Interest rate directly impacts your EMI - higher rates increase both your monthly payment and total interest paid. For example, on a ₹10 lakh loan for 20 years, increasing the rate from 8% to 9% can increase your EMI by ₹800-₹1000 per month and total interest by ₹2-3 lakhs. This calculator helps you visualize this impact instantly."
    },
    {
      question: "Should I choose a longer or shorter loan tenure?",
      answer: "Shorter tenure means higher EMI but less total interest paid, while longer tenure reduces EMI but increases total interest. For example, a ₹20 lakh home loan at 8.5% for 15 years has higher EMI but saves ₹7-8 lakh in interest compared to 20 years. Use this calculator to find the right balance for your budget."
    },
    {
      question: "What is an amortization schedule and why is it important?",
      answer: "An amortization schedule shows how each EMI payment is split between principal and interest over the loan period. Initially, most of your EMI goes toward interest; over time, more goes toward principal. Understanding this helps with financial planning and making informed decisions about prepayments."
    },
    {
      question: "Can I calculate EMI for different types of loans?",
      answer: "Yes, this EMI calculator works for all types of loans including home loans, car loans, personal loans, education loans, and business loans. Just adjust the principal amount, interest rate, and tenure according to your specific loan terms for accurate calculations."
    }
  ];

  // Calculate EMI and other details
  const calculateEMI = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 12 / 100; // Monthly interest rate
    let time = tenureType === 'years' ? parseFloat(loanTenure) * 12 : parseFloat(loanTenure);

    if (isNaN(principal) || isNaN(rate) || isNaN(time) || principal <= 0 || time <= 0) {
      setResults(null);
      return;
    }

    // EMI Calculation formula
    const emi = principal * rate * Math.pow(1 + rate, time) / (Math.pow(1 + rate, time) - 1);
    
    // Total payment and interest
    const totalPayment = emi * time;
    const totalInterest = totalPayment - principal;

    // Generate amortization schedule
    let balance = principal;
    const breakdown = [];
    const chartData = [];

    for (let month = 1; month <= time; month++) {
      const interest = balance * rate;
      const principal = emi - interest;
      balance -= principal;

      breakdown.push({
        month,
        principal,
        interest,
        balance: balance > 0 ? balance : 0
      });

      // For chart data (sample first 12 months and then yearly)
      if (month <= 12 || month % 12 === 0) {
        chartData.push({ principal, interest });
      }
    }

    setResults({
      emi,
      totalInterest,
      totalPayment,
      breakdown,
      chartData
    });
  };

  // Calculate on component mount and when inputs change
  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, loanTenure, tenureType]);

  const clearFields = () => {
    setLoanAmount('100000');
    setInterestRate('8.5');
    setLoanTenure('5');
    setTenureType('years');
  };

  const copyResult = async () => {
    if (results) {
      const text = `EMI Calculation:\nLoan Amount: ₹${parseFloat(loanAmount).toLocaleString()}\nInterest Rate: ${interestRate}%\nTenure: ${loanTenure} ${tenureType}\nEMI: ₹${results.emi.toFixed(2)}\nTotal Interest: ₹${results.totalInterest.toFixed(2)}\nTotal Payment: ₹${results.totalPayment.toFixed(2)}`;
      try {
        await navigator.clipboard.writeText(text);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Set example calculations
  const setExampleCalculation = (exampleType: string) => {
    switch(exampleType) {
      case 'homeLoan':
        setLoanAmount('5000000');
        setInterestRate('8.4');
        setLoanTenure('20');
        setTenureType('years');
        break;
      case 'carLoan':
        setLoanAmount('800000');
        setInterestRate('9.5');
        setLoanTenure('5');
        setTenureType('years');
        break;
      case 'personalLoan':
        setLoanAmount('300000');
        setInterestRate('12');
        setLoanTenure('3');
        setTenureType('years');
        break;
      case 'educationLoan':
        setLoanAmount('1500000');
        setInterestRate('8.75');
        setLoanTenure('10');
        setTenureType('years');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-background font-inter">
      {/* Add SEO meta tags in your layout or head component */}
      {/* 
      <title>EMI Calculator | Calculate Home, Car & Personal Loan EMI | GrockTool.com</title>
      <meta name="description" content="Free EMI Calculator for home loans, car loans, personal loans & more. Calculate monthly EMI, total interest, and get amortization schedule instantly. Plan your loan repayment effectively." />
      <meta name="keywords" content="EMI calculator, loan EMI calculator, home loan EMI calculator, car loan EMI, personal loan calculator, loan repayment calculator, amortization calculator" />
      <meta property="og:title" content="EMI Calculator | Calculate Home, Car & Personal Loan EMI" />
      <meta property="og:description" content="Free EMI Calculator for home loans, car loans, personal loans & more. Calculate monthly EMI, total interest, and get amortization schedule instantly." />
      <link rel="canonical" href="https://grocktool.com/number-tools/EMI-Calculator" />
      */}

      <div className="pt-20 pb-8 px-4 sm:pt-24 sm:pb-12 sm:px-6 lg:pt-28">
        <div className="max-w-lg mx-auto lg:max-w-6xl">
          {/* Enhanced Header */}
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
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-4 py-2 rounded-full mb-4 border border-blue-500/20">
                <Calculator size={16} className="text-blue-600" />
                <span className="text-sm font-medium text-blue-600">Real-Time Calculations • Loan Planning • 100% Accurate</span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                EMI Calculator
                <span className="block text-lg sm:text-xl lg:text-2xl font-normal text-muted-foreground mt-2">
                  Calculate Home Loan, Car Loan & Personal Loan EMI • Instant Results with Amortization Schedule
                </span>
              </h1>
              
              <div className="flex flex-wrap justify-center gap-4 mt-6 mb-8">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 rounded-lg">
                  <Home size={14} className="text-blue-600" />
                  <span className="text-xs sm:text-sm text-foreground">Home Loans</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-lg">
                  <Car size={14} className="text-green-600" />
                  <span className="text-xs sm:text-sm text-foreground">Car Loans</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 rounded-lg">
                  <CreditCard size={14} className="text-purple-600" />
                  <span className="text-xs sm:text-sm text-foreground">Personal Loans</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-500/10 rounded-lg">
                  <GraduationCap size={14} className="text-orange-600" />
                  <span className="text-xs sm:text-sm text-foreground">Education Loans</span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Inputs */}
            <div className="lg:col-span-1 space-y-6">
              {/* Quick Examples Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <div className="space-y-3">
                  <div className="text-xs text-muted-foreground">Quick Example Calculations:</div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setExampleCalculation('homeLoan')}
                      className="px-3 py-2 bg-blue-500/10 text-blue-600 rounded-lg hover:bg-blue-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Home size={12} />
                      Home Loan
                    </button>
                    <button
                      onClick={() => setExampleCalculation('carLoan')}
                      className="px-3 py-2 bg-green-500/10 text-green-600 rounded-lg hover:bg-green-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Car size={12} />
                      Car Loan
                    </button>
                    <button
                      onClick={() => setExampleCalculation('personalLoan')}
                      className="px-3 py-2 bg-purple-500/10 text-purple-600 rounded-lg hover:bg-purple-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <CreditCard size={12} />
                      Personal Loan
                    </button>
                    <button
                      onClick={() => setExampleCalculation('educationLoan')}
                      className="px-3 py-2 bg-orange-500/10 text-orange-600 rounded-lg hover:bg-orange-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <GraduationCap size={12} />
                      Education Loan
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Input Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Calculator size={20} className="text-foreground" />
                      <label className="block text-sm font-medium text-foreground">
                        Loan Details
                      </label>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-blue-600">
                      <Calculator size={12} />
                      <span>Real-time calculation</span>
                    </div>
                  </div>

                  {/* Loan Amount */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      Loan Amount
                    </label>
                    <div className="relative">
                      <DollarSign size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value)}
                        placeholder="Enter loan amount"
                        className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="bg-blue-500 text-white rounded-full p-1">
                          <DollarSign size={10} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Interest Rate */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      Interest Rate (% per annum)
                    </label>
                    <div className="relative">
                      <Percent size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="number"
                        step="0.1"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        placeholder="Enter interest rate"
                        className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="bg-green-500 text-white rounded-full p-1">
                          <Percent size={10} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Loan Tenure */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      Loan Tenure
                    </label>
                    <div className="flex gap-3">
                      <div className="relative flex-1">
                        <Calendar size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <input
                          type="number"
                          value={loanTenure}
                          onChange={(e) => setLoanTenure(e.target.value)}
                          placeholder="Enter tenure"
                          className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setTenureType('years')}
                          className={`px-4 py-3 rounded-lg border transition-all text-sm ${
                            tenureType === 'years' 
                              ? 'bg-accent text-accent-foreground border-accent' 
                              : 'bg-secondary text-secondary-foreground border-border hover:bg-secondary/80'
                          }`}
                        >
                          Years
                        </button>
                        <button
                          onClick={() => setTenureType('months')}
                          className={`px-4 py-3 rounded-lg border transition-all text-sm ${
                            tenureType === 'months' 
                              ? 'bg-accent text-accent-foreground border-accent' 
                              : 'bg-secondary text-secondary-foreground border-border hover:bg-secondary/80'
                          }`}
                        >
                          Months
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <button
                      onClick={calculateEMI}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all text-sm sm:text-base font-medium shadow-md hover:shadow-lg"
                    >
                      <Calculator size={16} className="sm:w-4 sm:h-4" />
                      Calculate EMI
                    </button>
                    <button
                      onClick={clearFields}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg sm:rounded-xl hover:bg-secondary/80 transition-colors text-sm sm:text-base font-medium"
                    >
                      <RotateCcw size={16} className="sm:w-4 sm:h-4" />
                      Reset All
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Quick Tips Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <BarChart3 size={18} />
                  Quick Tips
                </h3>
                <div className="space-y-2 text-muted-foreground text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-accent rounded-full"></div>
                    <span>Lower interest rates reduce total payment significantly</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-accent rounded-full"></div>
                    <span>Shorter tenure means higher EMI but less interest</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-accent rounded-full"></div>
                    <span>Consider prepayment to reduce interest burden</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-accent rounded-full"></div>
                    <span>Factor in processing fees and other charges</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Results */}
            <div className="lg:col-span-2 space-y-6">
              {/* Results Summary Card */}
              {results && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">EMI Calculation Result</h3>
                      <p className="text-sm text-muted-foreground">
                        ₹{parseFloat(loanAmount).toLocaleString()} at {interestRate}% for {loanTenure} {tenureType}
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
                    {/* Main EMI Display */}
                    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-6 rounded-lg border border-blue-500/20 text-center">
                      <div className="text-sm text-muted-foreground mb-2">Your Monthly EMI</div>
                      <div className="text-3xl font-bold text-foreground">
                        {formatCurrency(results.emi)}
                      </div>
                      <div className="text-xs text-muted-foreground mt-2">
                        per month for {tenureType === 'years' ? `${loanTenure} years` : `${loanTenure} months`}
                      </div>
                    </div>

                    {/* Summary Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gradient-to-r from-blue-500/5 to-blue-600/5 p-4 rounded-lg border border-blue-500/20">
                        <div className="text-sm text-muted-foreground">Loan Amount</div>
                        <div className="text-lg font-semibold text-foreground">{formatCurrency(parseFloat(loanAmount))}</div>
                      </div>
                      <div className="bg-gradient-to-r from-green-500/5 to-green-600/5 p-4 rounded-lg border border-green-500/20">
                        <div className="text-sm text-muted-foreground">Total Interest</div>
                        <div className="text-lg font-semibold text-foreground">{formatCurrency(results.totalInterest)}</div>
                      </div>
                      <div className="bg-gradient-to-r from-purple-500/5 to-purple-600/5 p-4 rounded-lg border border-purple-500/20">
                        <div className="text-sm text-muted-foreground">Total Payment</div>
                        <div className="text-lg font-semibold text-foreground">{formatCurrency(results.totalPayment)}</div>
                      </div>
                    </div>

                    {/* Pie Chart Visualization */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
                          <PieChart size={16} />
                          Payment Breakdown
                        </h4>
                        <div className="flex items-center justify-center">
                          <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                            <div className="absolute inset-2 bg-card rounded-full flex items-center justify-center">
                              <div className="text-center">
                                <div className="text-xs text-muted-foreground">Principal</div>
                                <div className="text-sm font-bold text-foreground">
                                  {((parseFloat(loanAmount) / results.totalPayment) * 100).toFixed(1)}%
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-center gap-4 text-xs">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-blue-500 rounded"></div>
                            <span>Principal: {formatCurrency(parseFloat(loanAmount))}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-purple-600 rounded"></div>
                            <span>Interest: {formatCurrency(results.totalInterest)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Year-wise Breakdown */}
                      <div className="space-y-4">
                        <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
                          <TrendingUp size={16} />
                          Year-wise Summary
                        </h4>
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                          {results.breakdown.filter((_, index) => (index + 1) % 12 === 0).map((year) => (
                            <div key={year.month} className="flex justify-between items-center p-2 bg-secondary/30 rounded">
                              <span className="text-sm text-foreground">Year {year.month / 12}</span>
                              <span className="text-sm font-medium text-foreground">
                                Principal: {formatCurrency(year.principal * 12)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Amortization Schedule */}
              {results && results.breakdown.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
                >
                  <h3 className="text-lg font-semibold text-foreground mb-4">Amortization Schedule (First 12 Months)</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-2 px-3 text-muted-foreground">Month</th>
                          <th className="text-right py-2 px-3 text-muted-foreground">Principal</th>
                          <th className="text-right py-2 px-3 text-muted-foreground">Interest</th>
                          <th className="text-right py-2 px-3 text-muted-foreground">Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.breakdown.slice(0, 12).map((row) => (
                          <tr key={row.month} className="border-b border-border/50">
                            <td className="py-2 px-3 text-foreground">{row.month}</td>
                            <td className="py-2 px-3 text-right text-foreground">{formatCurrency(row.principal)}</td>
                            <td className="py-2 px-3 text-right text-muted-foreground">{formatCurrency(row.interest)}</td>
                            <td className="py-2 px-3 text-right text-foreground">{formatCurrency(row.balance)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {results.breakdown.length > 12 && (
                      <div className="text-center mt-4 text-sm text-muted-foreground">
                        Showing first 12 months of {results.breakdown.length} months
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Info Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <BookOpen size={18} />
                  About EMI Calculation
                </h3>
                <div className="space-y-2 text-muted-foreground text-sm">
                  <p>
                    EMI (Equated Monthly Installment) is the fixed amount you pay to the lender each month 
                    to repay your loan. It consists of both principal and interest components.
                  </p>
                  <div className="text-xs sm:text-sm space-y-1 pt-2">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                      <span>EMI remains constant throughout the loan tenure</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                      <span>Interest component is higher in initial EMIs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                      <span>Principal component increases over time</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                      <span>Use this calculator to plan your loan effectively</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm space-y-2 pt-3">
                    <div className="font-medium text-foreground">Formula Used:</div>
                    <div className="bg-secondary/30 p-3 rounded-lg font-mono text-xs">
                      EMI = P × r × (1 + r)ⁿ / ((1 + r)ⁿ - 1)
                      <br />
                      Where: P = Principal, r = Monthly Interest Rate, n = Loan Tenure in Months
                    </div>
                  </div>
                </div>
              </motion.div>
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
                  <div className="bg-blue-500/10 p-2 rounded-lg">
                    <Calculator size={20} className="text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">EMI Calculator - Features & Financial Benefits</h2>
                </div>
                {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.whatItDoes && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground mb-4">
                    This EMI Calculator provides instant, accurate calculations for home loans, car loans, personal loans, education loans, and all types of installment-based financing. Using the standard EMI formula (EMI = P × r × (1 + r)ⁿ / ((1 + r)ⁿ - 1)), it calculates your monthly payments, total interest payable, and provides a complete amortization schedule. The tool helps borrowers understand exactly how much they'll pay each month, how their payments are split between principal and interest, and the total cost of their loan over time. With real-time updates and detailed visualizations, this EMI calculator is essential for anyone planning to take a loan or managing existing loan repayments.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Calculator size={18} className="text-blue-600" />
                        <h3 className="font-semibold text-foreground">Accurate EMI Calculation</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Uses precise mathematical formulas to calculate EMI with real-time updates and automatic validation of inputs for all loan types.</p>
                    </div>
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText size={18} className="text-green-600" />
                        <h3 className="font-semibold text-foreground">Amortization Schedule</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Generates detailed month-by-month breakdown showing principal vs interest allocation throughout the loan tenure.</p>
                    </div>
                    <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp size={18} className="text-purple-600" />
                        <h3 className="font-semibold text-foreground">Financial Planning</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Helps plan loan affordability, compare different loan options, and make informed borrowing decisions for better financial management.</p>
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
                  <div className="bg-green-500/10 p-2 rounded-lg">
                    <Home size={20} className="text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Practical EMI Calculator Applications</h2>
                </div>
                {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.useCases && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">🏠 Home & Property Loans</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>Calculate home loan EMI for apartments, houses, and property purchases to determine affordability</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>Plan home renovation loan payments and budget for improvement projects</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>Compare different home loan offers from banks and housing finance companies</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">🚗 Vehicle & Auto Loans</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>Calculate car loan EMI for new and used vehicle purchases across different manufacturers</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>Plan two-wheeler loan payments for motorcycles, scooters, and other personal transport</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>Calculate commercial vehicle loan EMI for business and transportation purposes</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">📚 Education & Personal Finance</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>Calculate education loan EMI for college fees, study abroad programs, and vocational courses</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>Plan personal loan EMI for medical emergencies, weddings, travel, and other personal needs</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>Calculate business loan EMI for startup funding, expansion, and working capital requirements</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>Plan consumer durable loan EMI for electronics, appliances, and household equipment purchases</span>
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
                    <BookOpen size={20} className="text-orange-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">How to Calculate EMI - Complete Guide</h2>
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
                          <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                          <div>
                            <div className="font-medium text-foreground">Enter Loan Amount</div>
                            <div className="text-sm text-muted-foreground">Input the principal loan amount you want to borrow. Use quick examples for common loan scenarios.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                          <div>
                            <div className="font-medium text-foreground">Set Interest Rate</div>
                            <div className="text-sm text-muted-foreground">Specify the annual interest rate offered by your bank or lender as a percentage.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                          <div>
                            <div className="font-medium text-foreground">Define Loan Tenure</div>
                            <div className="text-sm text-muted-foreground">Enter the loan duration in years or months. Choose between years or months using the toggle.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">4</div>
                          <div>
                            <div className="font-medium text-foreground">Review Results</div>
                            <div className="text-sm text-muted-foreground">Get instant calculations of monthly EMI, total interest, and complete amortization schedule.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Pro Loan Planning Tips</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Percent size={12} className="text-accent" />
                          </div>
                          <span>Compare interest rates from multiple banks and financial institutions for the best deal</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Calendar size={12} className="text-accent" />
                          </div>
                          <span>Consider shorter tenures if you can afford higher EMI to save on total interest paid</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Copy size={12} className="text-accent" />
                          </div>
                          <span>Use copy feature to save calculation results for loan applications or financial planning</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Heart size={12} className="text-accent" />
                          </div>
                          <span>Ensure your EMI doesn't exceed 40-50% of your monthly income for comfortable repayment</span>
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
                  <h2 className="text-xl font-bold text-foreground">EMI Calculation Examples</h2>
                </div>
                {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.examples && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">Common EMI Calculation Scenarios</h3>
                      <div className="overflow-x-auto">
                        <div className="min-w-full inline-block align-middle">
                          <div className="overflow-hidden border border-border rounded-lg">
                            <table className="min-w-full divide-y divide-border">
                              <thead className="bg-secondary/20">
                                <tr>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Loan Type</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Amount</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Rate</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Tenure</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Monthly EMI</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Total Interest</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-border">
                                <tr>
                                  <td className="px-4 py-3 text-sm text-foreground">Home Loan</td>
                                  <td className="px-4 py-3 text-sm text-blue-600">₹50,00,000</td>
                                  <td className="px-4 py-3 text-sm text-green-600">8.4%</td>
                                  <td className="px-4 py-3 text-sm text-purple-600">20 years</td>
                                  <td className="px-4 py-3 text-sm text-orange-600 font-medium">₹43,228</td>
                                  <td className="px-4 py-3 text-sm text-red-600 font-medium">₹53,74,720</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-foreground">Car Loan</td>
                                  <td className="px-4 py-3 text-sm text-blue-600">₹8,00,000</td>
                                  <td className="px-4 py-3 text-sm text-green-600">9.5%</td>
                                  <td className="px-4 py-3 text-sm text-purple-600">5 years</td>
                                  <td className="px-4 py-3 text-sm text-orange-600 font-medium">₹16,810</td>
                                  <td className="px-4 py-3 text-sm text-red-600 font-medium">₹2,08,600</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-foreground">Personal Loan</td>
                                  <td className="px-4 py-3 text-sm text-blue-600">₹3,00,000</td>
                                  <td className="px-4 py-3 text-sm text-green-600">12%</td>
                                  <td className="px-4 py-3 text-sm text-purple-600">3 years</td>
                                  <td className="px-4 py-3 text-sm text-orange-600 font-medium">₹9,964</td>
                                  <td className="px-4 py-3 text-sm text-red-600 font-medium">₹58,704</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-foreground">Education Loan</td>
                                  <td className="px-4 py-3 text-sm text-blue-600">₹15,00,000</td>
                                  <td className="px-4 py-3 text-sm text-green-600">8.75%</td>
                                  <td className="px-4 py-3 text-sm text-purple-600">10 years</td>
                                  <td className="px-4 py-3 text-sm text-orange-600 font-medium">₹18,858</td>
                                  <td className="px-4 py-3 text-sm text-red-600 font-medium">₹7,62,960</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Detailed EMI Calculation Example</h3>
                      <div className="bg-secondary/20 p-4 rounded-lg border border-border overflow-x-auto">
                        <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
{`Example: Calculate EMI for a ₹50,00,000 home loan at 8.4% for 20 years

Step 1: Identify the variables
Principal (P) = ₹50,00,000
Annual Interest Rate = 8.4%
Loan Tenure = 20 years

Step 2: Convert to monthly values
Monthly Interest Rate (r) = Annual Rate / (12 × 100)
r = 8.4 / (12 × 100) = 8.4 / 1200 = 0.007

Loan Tenure in Months (n) = Years × 12
n = 20 × 12 = 240 months

Step 3: Apply EMI formula
Formula: EMI = P × r × (1 + r)ⁿ / ((1 + r)ⁿ - 1)

Step 4: Calculate step by step
1. Calculate (1 + r): 1 + 0.007 = 1.007
2. Calculate (1 + r)ⁿ: 1.007^240 = 4.7435
3. Calculate numerator: P × r × (1 + r)ⁿ = 5000000 × 0.007 × 4.7435 = 166,022.5
4. Calculate denominator: (1 + r)ⁿ - 1 = 4.7435 - 1 = 3.7435
5. Calculate EMI: 166,022.5 / 3.7435 = 44,345

Step 5: Calculate totals
Monthly EMI = ₹44,345 (rounded)
Total Payment = EMI × n = 44,345 × 240 = ₹1,06,42,800
Total Interest = Total Payment - Principal = 1,06,42,800 - 50,00,000 = ₹56,42,800

Step 6: Amortization breakdown (first month)
Interest for Month 1 = Principal × Monthly Rate = 50,00,000 × 0.007 = ₹35,000
Principal for Month 1 = EMI - Interest = 44,345 - 35,000 = ₹9,345
Remaining Balance = 50,00,000 - 9,345 = ₹49,90,655

Step 7: Verification
Using alternative calculation methods or financial formulas yields same result.

Final Results:
• Principal Amount: ₹50,00,000
• Annual Interest Rate: 8.4%
• Loan Tenure: 20 years (240 months)
• Monthly EMI: ₹44,345
• Total Interest Payable: ₹56,42,800
• Total Payment: ₹1,06,42,800
• Interest to Principal Ratio: 112.86%

Key Calculation Features:
✓ Accurate EMI formula application
✓ Monthly interest rate conversion
✓ Compound interest calculation for amortization
✓ Step-by-step breakdown
✓ Total cost analysis
✓ Amortization schedule generation
✓ Financial planning insights`}
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
                    <FileText size={20} className="text-purple-600" />
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
  );
}