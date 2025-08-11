'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, RotateCcw, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function PrimeCheckerPage() {
  const [number, setNumber] = useState('');
  const [result, setResult] = useState<{ isPrime: boolean; factors: number[] } | null>(null);

  const isPrime = (num: number): boolean => {
    if (num < 2) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;
    
    for (let i = 3; i <= Math.sqrt(num); i += 2) {
      if (num % i === 0) return false;
    }
    return true;
  };

  const getFactors = (num: number): number[] => {
    const factors: number[] = [];
    for (let i = 1; i <= num; i++) {
      if (num % i === 0) {
        factors.push(i);
      }
    }
    return factors;
  };

  const checkPrime = () => {
    const num = parseInt(number);
    if (isNaN(num) || num < 1) {
      setResult(null);
      return;
    }

    const prime = isPrime(num);
    const factors = getFactors(num);
    setResult({ isPrime: prime, factors });
  };

  const reset = () => {
    setNumber('');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-toolnest-bg font-inter">
      <section className="pt-32 pb-20 px-4">
        <div className="toolnest-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            {/* Back Link */}
            <Link
              href="/tool"
              className="inline-flex items-center gap-2 text-toolnest-text/70 hover:text-toolnest-text mb-8 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Tools
            </Link>

            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-toolnest-text mb-4">
                Prime Number Checker
              </h1>
              <p className="text-xl text-toolnest-text/80 max-w-2xl mx-auto">
                Check if a number is prime and discover all its factors
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Search className="w-6 h-6 text-toolnest-text" />
                    Prime Number Checker
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
                      placeholder="e.g., 17"
                      className="text-lg text-center"
                    />
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button onClick={checkPrime} className="bg-toolnest-text hover:bg-toolnest-text/90">
                      <Search className="w-4 h-4 mr-2" />
                      Check Prime
                    </Button>
                    <Button onClick={reset} variant="outline">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset
                    </Button>
                  </div>

                  {result && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-4"
                    >
                      <div className={`p-4 rounded-lg border ${result.isPrime ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                        <div className="flex items-center gap-2 mb-2">
                          {result.isPrime ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-600" />
                          )}
                          <h3 className="text-lg font-semibold text-toolnest-text">
                            {number} is {result.isPrime ? 'Prime' : 'Not Prime'}
                          </h3>
                        </div>
                      </div>

                      <div className="p-4 bg-toolnest-accent/20 rounded-lg border">
                        <h3 className="text-lg font-semibold text-toolnest-text mb-2">
                          Factors of {number}:
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {result.factors.map((factor, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-white rounded-full text-sm font-medium text-toolnest-text border"
                            >
                              {factor}
                            </span>
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
                    A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself. 
                    This tool checks if your number is prime and shows all its factors to help you understand its mathematical properties.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}