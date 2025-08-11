
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Hash, RotateCcw, Copy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Factorial = () => {
  const [number, setNumber] = useState('');
  const [result, setResult] = useState<{ factorial: string; steps: string[] } | null>(null);

  const calculateFactorial = (n: number): { factorial: bigint; steps: string[] } => {
    if (n === 0 || n === 1) {
      return { factorial: BigInt(1), steps: [`${n}! = 1`] };
    }

    let factorial = BigInt(1);
    const steps: string[] = [];
    const factors: number[] = [];

    for (let i = 1; i <= n; i++) {
      factorial *= BigInt(i);
      factors.push(i);
    }

    steps.push(`${n}! = ${factors.join(' × ')}`);
    steps.push(`${n}! = ${factorial.toString()}`);

    return { factorial, steps };
  };

  const calculate = () => {
    const num = parseInt(number);
    if (isNaN(num) || num < 0) {
      setResult(null);
      return;
    }

    if (num > 170) {
      setResult({
        factorial: 'Number too large (max: 170)',
        steps: ['Factorial of numbers greater than 170 results in infinity']
      });
      return;
    }

    const { factorial, steps } = calculateFactorial(num);
    setResult({ factorial: factorial.toString(), steps });
  };

  const reset = () => {
    setNumber('');
    setResult(null);
  };

  const copyResult = () => {
    if (result?.factorial) {
      navigator.clipboard.writeText(result.factorial);
    }
  };

  return (
    <div className="min-h-screen bg-toolnest-bg">
      <Helmet>
        <title>Factorial Calculator - GrockTool</title>
        <meta name="description" content="Calculate factorial of any number with step-by-step solution using ToolNest's free factorial calculator." />
        <link rel="canonical" href="https://grocktool.com/math-tools/factorial" />
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
              Factorial Calculator
            </h1>
            <p className="text-xl text-toolnest-text/80 max-w-2xl mx-auto">
              Calculate factorial (n!) of any number with detailed steps
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
                  <Hash className="w-6 h-6 text-toolnest-text" />
                  Factorial Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-toolnest-text mb-2">
                    Enter Number
                  </label>
                  <Input
                    type="number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    placeholder="e.g., 5"
                    className="text-lg text-center"
                    min="0"
                    max="170"
                  />
                  <p className="text-sm text-toolnest-text/60 mt-1">
                    Enter a number between 0 and 170
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button onClick={calculate} className="bg-toolnest-text hover:bg-toolnest-text/90">
                    <Hash className="w-4 h-4 mr-2" />
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
                    className="space-y-4"
                  >
                    <div className="p-4 bg-toolnest-accent/20 rounded-lg border">
                      <h3 className="text-lg font-semibold text-toolnest-text mb-2">Result:</h3>
                      <p className="text-2xl font-bold text-toolnest-text font-mono break-all">
                        {result.factorial}
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg border">
                      <h3 className="text-lg font-semibold text-toolnest-text mb-2">Steps:</h3>
                      <div className="space-y-1">
                        {result.steps.map((step, index) => (
                          <p key={index} className="text-toolnest-text font-mono text-sm">
                            {step}
                          </p>
                        ))}
                      </div>
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
                  Factorial (n!) is the product of all positive integers less than or equal to n. 
                  For example, 5! = 5 × 4 × 3 × 2 × 1 = 120. By definition, 0! = 1.
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

export default Factorial;
