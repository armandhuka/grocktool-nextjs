
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { CreditCard, RotateCcw, Copy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [result, setResult] = useState<{ emi: number; totalInterest: number; totalAmount: number } | null>(null);

  const calculate = () => {
    const p = parseFloat(loanAmount);
    const r = parseFloat(interestRate) / 12 / 100; // Monthly interest rate
    const n = parseFloat(tenure) * 12; // Total number of months
    
    if (isNaN(p) || isNaN(r) || isNaN(n)) return;

    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalAmount = emi * n;
    const totalInterest = totalAmount - p;
    
    setResult({ emi, totalInterest, totalAmount });
  };

  const reset = () => {
    setLoanAmount('');
    setInterestRate('');
    setTenure('');
    setResult(null);
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(`EMI: ${result.emi.toFixed(2)}, Total Interest: ${result.totalInterest.toFixed(2)}, Total Amount: ${result.totalAmount.toFixed(2)}`);
    }
  };

  return (
    <div className="min-h-screen bg-toolnest-bg">
      <Helmet>
        <title>EMI Calculator - GrockTool</title>
        <meta name="description" content="Calculate loan EMI, total interest, and payment schedules with GrockTool's free EMI calculator." />
        <link rel="canonical" href="https://grocktool.com/number-tools/emi" />
      </Helmet>

      <Header />

      <main className="pt-32 pb-16 px-4">
        <div className="toolnest-container max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-toolnest-text mb-4">
              EMI Calculator
            </h1>
            <p className="text-xl text-toolnest-text/80 max-w-2xl mx-auto">
              Calculate loan EMI and payment schedules easily
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <CreditCard className="w-6 h-6 text-toolnest-text" />
                  EMI Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-toolnest-text mb-2">
                      Loan Amount ($)
                    </label>
                    <Input
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      placeholder="Enter loan amount"
                      className="text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-toolnest-text mb-2">
                      Interest Rate (% per annum)
                    </label>
                    <Input
                      type="number"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      placeholder="Enter interest rate"
                      className="text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-toolnest-text mb-2">
                      Tenure (Years)
                    </label>
                    <Input
                      type="number"
                      value={tenure}
                      onChange={(e) => setTenure(e.target.value)}
                      placeholder="Enter tenure"
                      className="text-lg"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button onClick={calculate} className="bg-toolnest-text hover:bg-toolnest-text/90">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Calculate EMI
                  </Button>
                  <Button onClick={reset} variant="outline">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                  {result && (
                    <Button onClick={copyResult} variant="outline">
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Result
                    </Button>
                  )}
                </div>

                {result && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-6 p-4 bg-toolnest-accent/20 rounded-lg border"
                  >
                    <h3 className="text-lg font-semibold text-toolnest-text mb-2">Results:</h3>
                    <div className="space-y-2">
                      <p className="text-xl font-bold text-toolnest-text">
                        Monthly EMI: ${result.emi.toFixed(2)}
                      </p>
                      <p className="text-lg text-toolnest-text">
                        Total Interest: ${result.totalInterest.toFixed(2)}
                      </p>
                      <p className="text-lg text-toolnest-text">
                        Total Amount: ${result.totalAmount.toFixed(2)}
                      </p>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8"
          >
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle>How This Tool Works</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-toolnest-text/80 leading-relaxed">
                  EMI (Equated Monthly Installment) is calculated using the formula: EMI = [P × R × (1+R)^N] / [(1+R)^N-1], 
                  where P is the loan amount, R is the monthly interest rate, and N is the number of monthly installments.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EMICalculator;
