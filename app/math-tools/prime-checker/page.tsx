'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, RotateCcw, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

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
    <div className="min-h-screen bg-background font-inter">
      <div className="pt-20 pb-8 px-4 sm:pt-24 sm:pb-12 sm:px-6 lg:pt-28">
        <div className="max-w-lg mx-auto lg:max-w-2xl">
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
                Prime Number Checker
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Check if a number is prime and discover all its factors
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
              {/* Input Field */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Search size={20} className="text-foreground" />
                  <label className="block text-sm font-medium text-foreground">
                    Enter Number
                  </label>
                </div>
                <input
                  type="number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  placeholder="e.g., 17"
                  className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg"
                  min="1"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={checkPrime}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent text-accent-foreground rounded-lg sm:rounded-xl hover:bg-accent/80 transition-colors text-sm sm:text-base"
                >
                  <Search size={16} className="sm:w-4 sm:h-4" />
                  Check Prime
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
                {/* Prime Status */}
                <div className={`p-4 rounded-lg border ${
                  result.isPrime 
                    ? 'bg-green-500/10 border-green-500/20' 
                    : 'bg-red-500/10 border-red-500/20'
                }`}>
                  <div className="flex items-center gap-3">
                    {result.isPrime ? (
                      <CheckCircle size={24} className="text-green-600" />
                    ) : (
                      <XCircle size={24} className="text-red-600" />
                    )}
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {number} is {result.isPrime ? 'a Prime Number' : 'Not a Prime Number'}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {result.isPrime 
                          ? 'This number is only divisible by 1 and itself'
                          : 'This number has more than two factors'
                        }
                      </p>
                    </div>
                  </div>
                </div>

                {/* Factors Display */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    Factors of {number}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {result.factors.map((factor, index) => (
                      <span
                        key={index}
                        className={`px-3 py-2 rounded-lg text-sm font-medium ${
                          factor === 1 || factor === parseInt(number)
                            ? 'bg-accent text-accent-foreground'
                            : 'bg-secondary text-secondary-foreground'
                        }`}
                      >
                        {factor}
                      </span>
                    ))}
                  </div>
                  <div className="text-center text-sm text-muted-foreground">
                    Total {result.factors.length} factor{result.factors.length !== 1 ? 's' : ''}
                  </div>
                </div>

                {/* Prime Info */}
                <div className="bg-muted p-4 rounded-lg">
                  <div className="text-sm font-medium text-foreground mb-2">Prime Number Definition:</div>
                  <div className="text-sm text-muted-foreground">
                    A prime number is a natural number greater than 1 that has no positive divisors 
                    other than 1 and itself.
                    {result.isPrime && (
                      <span className="block mt-1 text-accent">
                        ✓ {number} meets the criteria for prime numbers.
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
          >
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">How Prime Numbers Work</h3>
            <div className="space-y-2 text-muted-foreground text-sm">
              <p>
                Prime numbers are the building blocks of mathematics. They play a crucial role in number theory, 
                cryptography, and computer science.
              </p>
              <div className="text-xs sm:text-sm space-y-1 pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Enter any positive integer greater than 1</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Click "Check Prime" to analyze the number</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>View whether the number is prime or composite</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>See all factors of the number</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Understand the mathematical properties</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Prime Number Properties:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Exactly two factors:</strong> 1 and the number itself</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Greater than 1:</strong> 1 is not considered prime</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Infinite:</strong> There are infinitely many prime numbers</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Unique factorization:</strong> Every number has a unique prime factorization</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Examples of Prime Numbers:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                  <span><strong>Small primes:</strong> 2, 3, 5, 7, 11, 13, 17, 19, 23</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                  <span><strong>Larger primes:</strong> 97, 101, 103, 107, 109</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                  <span><strong>Special primes:</strong> 2 (only even prime), Mersenne primes</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                  <span><strong>Non-primes:</strong> 4, 6, 8, 9, 10, 12, 14, 15, 16, 18</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Real-World Applications:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Cryptography:</strong> RSA encryption uses large prime numbers</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Computer Science:</strong> Hash functions and algorithms</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Mathematics:</strong> Number theory and mathematical proofs</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Education:</strong> Fundamental concept in mathematics</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}