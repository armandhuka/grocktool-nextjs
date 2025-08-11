
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { DollarSign, RotateCcw, Copy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const SimpleInterest = () => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [result, setResult] = useState<{ interest: number; total: number } | null>(null);

  const calculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const t = parseFloat(time);
    
    if (isNaN(p) || isNaN(r) || isNaN(t)) return;

    const interest = (p * r * t) / 100;
    const total = p + interest;
    
    setResult({ interest, total });
  };

  const reset = () => {
    setPrincipal('');
    setRate('');
    setTime('');
    setResult(null);
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(`Interest: ${result.interest.toFixed(2)}, Total: ${result.total.toFixed(2)}`);
    }
  };

  return (
    <div className="min-h-screen bg-toolnest-bg">
      <Helmet>
        <title>Simple Interest Calculator - GrockTool</title>
        <meta name="description" content="Calculate simple interest and total amount with principal, rate, and time using GrockTool's free simple interest calculator." />
        <link rel="canonical" href="https://grocktool.com/number-tools/simple-interest" />
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
              Simple Interest Calculator
            </h1>
            <p className="text-xl text-toolnest-text/80 max-w-2xl mx-auto">
              Calculate simple interest and total amount with principal, rate, and time
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
                  <DollarSign className="w-6 h-6 text-toolnest-text" />
                  Simple Interest Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-toolnest-text mb-2">
                      Principal Amount ($)
                    </label>
                    <Input
                      type="number"
                      value={principal}
                      onChange={(e) => setPrincipal(e.target.value)}
                      placeholder="Enter principal amount"
                      className="text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-toolnest-text mb-2">
                      Interest Rate (%)
                    </label>
                    <Input
                      type="number"
                      value={rate}
                      onChange={(e) => setRate(e.target.value)}
                      placeholder="Enter interest rate"
                      className="text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-toolnest-text mb-2">
                      Time (Years)
                    </label>
                    <Input
                      type="number"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      placeholder="Enter time period"
                      className="text-lg"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button onClick={calculate} className="bg-toolnest-text hover:bg-toolnest-text/90">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Calculate
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
                        Simple Interest: ${result.interest.toFixed(2)}
                      </p>
                      <p className="text-xl font-bold text-toolnest-text">
                        Total Amount: ${result.total.toFixed(2)}
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
                  Simple Interest is calculated using the formula: SI = (P × R × T) / 100, where P is the principal amount, 
                  R is the annual interest rate, and T is the time period in years. The total amount is the sum of principal and interest.
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

export default SimpleInterest;
