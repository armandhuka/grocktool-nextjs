
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Calculator, RotateCcw, Copy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const LCMHCFCalculator = () => {
  const [numbers, setNumbers] = useState<string[]>(['', '']);
  const [result, setResult] = useState<{ lcm: number; hcf: number } | null>(null);

  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const lcm = (a: number, b: number): number => {
    return (a * b) / gcd(a, b);
  };

  const calculateGCDArray = (nums: number[]): number => {
    return nums.reduce((acc, num) => gcd(acc, num));
  };

  const calculateLCMArray = (nums: number[]): number => {
    return nums.reduce((acc, num) => lcm(acc, num));
  };

  const calculate = () => {
    const nums = numbers.map(n => parseInt(n)).filter(n => !isNaN(n) && n > 0);
    if (nums.length < 2) return;

    const hcfResult = calculateGCDArray(nums);
    const lcmResult = calculateLCMArray(nums);
    
    setResult({ lcm: lcmResult, hcf: hcfResult });
  };

  const reset = () => {
    setNumbers(['', '']);
    setResult(null);
  };

  const addNumber = () => {
    setNumbers([...numbers, '']);
  };

  const removeNumber = (index: number) => {
    if (numbers.length > 2) {
      setNumbers(numbers.filter((_, i) => i !== index));
    }
  };

  const updateNumber = (index: number, value: string) => {
    const newNumbers = [...numbers];
    newNumbers[index] = value;
    setNumbers(newNumbers);
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(`LCM: ${result.lcm}, HCF/GCD: ${result.hcf}`);
    }
  };

  return (
    <div className="min-h-screen bg-toolnest-bg">
      <Helmet>
        <title>LCM & HCF Calculator - GrockTool</title>
        <meta name="description" content="Find Least Common Multiple (LCM) and Highest Common Factor (HCF/GCD) of numbers with GrockTool's free calculator." />
        <link rel="canonical" href="https://grocktool.com/number-tools/lcm-hcf" />
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
              LCM & HCF Calculator
            </h1>
            <p className="text-xl text-toolnest-text/80 max-w-2xl mx-auto">
              Find Least Common Multiple and Highest Common Factor
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
                  <Calculator className="w-6 h-6 text-toolnest-text" />
                  LCM & HCF Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-toolnest-text mb-2">
                    Enter Numbers (minimum 2)
                  </label>
                  <div className="space-y-3">
                    {numbers.map((num, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          type="number"
                          value={num}
                          onChange={(e) => updateNumber(index, e.target.value)}
                          placeholder={`Number ${index + 1}`}
                          className="text-lg"
                        />
                        {numbers.length > 2 && (
                          <Button
                            onClick={() => removeNumber(index)}
                            variant="outline"
                            size="sm"
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={addNumber}
                    variant="outline"
                    className="mt-3"
                    size="sm"
                  >
                    Add Number
                  </Button>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button onClick={calculate} className="bg-toolnest-text hover:bg-toolnest-text/90">
                    <Calculator className="w-4 h-4 mr-2" />
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
                        LCM (Least Common Multiple): {result.lcm}
                      </p>
                      <p className="text-xl font-bold text-toolnest-text">
                        HCF/GCD (Highest Common Factor): {result.hcf}
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
                  LCM is the smallest positive number that is divisible by all given numbers. HCF (or GCD) is the largest positive 
                  number that divides all given numbers. This calculator uses the Euclidean algorithm for efficient computation.
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

export default LCMHCFCalculator;
