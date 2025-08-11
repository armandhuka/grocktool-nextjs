
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Calculator, RotateCcw, Copy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PercentageCalculator = () => {
  const [value, setValue] = useState('');
  const [percentage, setPercentage] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [calculationType, setCalculationType] = useState('percentage-of');

  const calculate = () => {
    const val = parseFloat(value);
    const perc = parseFloat(percentage);
    
    if (isNaN(val) || isNaN(perc)) return;

    let calculatedResult = 0;
    switch (calculationType) {
      case 'percentage-of':
        calculatedResult = (perc / 100) * val;
        break;
      case 'what-percent':
        calculatedResult = (val / perc) * 100;
        break;
      case 'percentage-change':
        calculatedResult = ((perc - val) / val) * 100;
        break;
      default:
        calculatedResult = (perc / 100) * val;
    }
    
    setResult(calculatedResult);
  };

  const reset = () => {
    setValue('');
    setPercentage('');
    setResult(null);
  };

  const copyResult = () => {
    if (result !== null) {
      navigator.clipboard.writeText(result.toString());
    }
  };

  return (
    <div className="min-h-screen bg-toolnest-bg">
      <Helmet>
        <title>Percentage Calculator - GrockTool</title>
        <meta name="description" content="Calculate percentages, percentage increase/decrease, and what percent one number is of another with GrockTool's free percentage calculator." />
        <link rel="canonical" href="https://grocktool.com/number-tools/percentage-calculator" />
      </Helmet>

      <Header />

      <main className="pt-32 pb-16 px-4">
        <div className="toolnest-container max-w-4xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-toolnest-text mb-4">
              Percentage Calculator
            </h1>
            <p className="text-xl text-toolnest-text/80 max-w-2xl mx-auto">
              Calculate percentages, percentage increase/decrease, and more
            </p>
          </motion.div>

          {/* Main Calculator */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Calculator className="w-6 h-6 text-toolnest-text" />
                  Percentage Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Calculation Type */}
                <div>
                  <label className="block text-sm font-medium text-toolnest-text mb-2">
                    Calculation Type
                  </label>
                  <select
                    value={calculationType}
                    onChange={(e) => setCalculationType(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-toolnest-text focus:border-transparent"
                  >
                    <option value="percentage-of">What is X% of Y?</option>
                    <option value="what-percent">X is what percent of Y?</option>
                    <option value="percentage-change">Percentage change from X to Y</option>
                  </select>
                </div>

                {/* Input Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-toolnest-text mb-2">
                      {calculationType === 'percentage-of' ? 'Value' : 'First Number'}
                    </label>
                    <Input
                      type="number"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="Enter number"
                      className="text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-toolnest-text mb-2">
                      {calculationType === 'percentage-of' ? 'Percentage' : 'Second Number'}
                    </label>
                    <Input
                      type="number"
                      value={percentage}
                      onChange={(e) => setPercentage(e.target.value)}
                      placeholder="Enter number"
                      className="text-lg"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <Button onClick={calculate} className="bg-toolnest-text hover:bg-toolnest-text/90">
                    <Calculator className="w-4 h-4 mr-2" />
                    Calculate
                  </Button>
                  <Button onClick={reset} variant="outline">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                  {result !== null && (
                    <Button onClick={copyResult} variant="outline">
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Result
                    </Button>
                  )}
                </div>

                {/* Result */}
                {result !== null && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-6 p-4 bg-toolnest-accent/20 rounded-lg border"
                  >
                    <h3 className="text-lg font-semibold text-toolnest-text mb-2">Result:</h3>
                    <p className="text-2xl font-bold text-toolnest-text">
                      {result.toFixed(2)}{calculationType === 'what-percent' || calculationType === 'percentage-change' ? '%' : ''}
                    </p>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Info Section */}
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
                  This percentage calculator can handle three main types of calculations: finding what percentage of a number is (X% of Y), 
                  determining what percent one number is of another, and calculating percentage change between two values. Simply select your 
                  calculation type, enter the numbers, and get instant results.
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

export default PercentageCalculator;
