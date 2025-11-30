'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, PieChart, RotateCcw, Copy, ArrowLeft, Calendar, DollarSign, Percent, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export default function EMICalculatorPage() {
  const [loanAmount, setLoanAmount] = useState<string>('100000');
  const [interestRate, setInterestRate] = useState<string>('8.5');
  const [loanTenure, setLoanTenure] = useState<string>('5');
  const [tenureType, setTenureType] = useState<'years' | 'months'>('years');
  const [results, setResults] = useState<{
    emi: number;
    totalInterest: number;
    totalPayment: number;
    breakdown: { month: number; principal: number; interest: number; balance: number }[];
    chartData: { principal: number; interest: number }[];
  } | null>(null);

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

  return (
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
                EMI Calculator
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Calculate your Equated Monthly Installment with detailed breakdown
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Inputs */}
            <div className="lg:col-span-1 space-y-6">
              {/* Input Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Calculator size={20} className="text-foreground" />
                    <label className="block text-sm font-medium text-foreground">
                      Loan Details
                    </label>
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
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent text-accent-foreground rounded-lg sm:rounded-xl hover:bg-accent/80 transition-colors text-sm sm:text-base"
                    >
                      <Calculator size={16} className="sm:w-4 sm:h-4" />
                      Calculate
                    </button>
                    <button
                      onClick={clearFields}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg sm:rounded-xl hover:bg-secondary/80 transition-colors text-sm sm:text-base"
                    >
                      <RotateCcw size={16} className="sm:w-4 sm:h-4" />
                      Reset
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
                    <h3 className="text-lg font-semibold text-foreground">EMI Calculation Result</h3>
                    <button
                      onClick={copyResult}
                      className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Copy size={16} className="sm:w-4 sm:h-4" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    {/* Main EMI Display */}
                    <div className="bg-accent/10 p-6 rounded-lg border border-accent/20 text-center">
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
                      <div className="bg-secondary/50 p-4 rounded-lg border border-border">
                        <div className="text-sm text-muted-foreground">Loan Amount</div>
                        <div className="text-lg font-semibold text-foreground">{formatCurrency(parseFloat(loanAmount))}</div>
                      </div>
                      <div className="bg-secondary/50 p-4 rounded-lg border border-border">
                        <div className="text-sm text-muted-foreground">Total Interest</div>
                        <div className="text-lg font-semibold text-foreground">{formatCurrency(results.totalInterest)}</div>
                      </div>
                      <div className="bg-secondary/50 p-4 rounded-lg border border-border">
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
                  <h3 className="text-lg font-semibold text-foreground mb-4">Amortization Schedule</h3>
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
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">About EMI Calculator</h3>
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
        </div>
      </div>
    </div>
  );
}