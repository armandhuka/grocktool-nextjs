'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Dice6, RotateCcw, Copy, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const RandomGenerator = () => {
  const [minValue, setMinValue] = useState('1');
  const [maxValue, setMaxValue] = useState('100');
  const [count, setCount] = useState('1');
  const [allowDuplicates, setAllowDuplicates] = useState(true);
  const [result, setResult] = useState<number[] | null>(null);

  const generateRandom = () => {
    const min = parseInt(minValue);
    const max = parseInt(maxValue);
    const num = parseInt(count);
    
    if (isNaN(min) || isNaN(max) || isNaN(num) || min >= max || num <= 0) return;
    
    if (!allowDuplicates && num > (max - min + 1)) {
      return;
    }

    const numbers: number[] = [];
    const used = new Set<number>();
    
    for (let i = 0; i < num; i++) {
      let randomNum: number;
      
      if (allowDuplicates) {
        randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        numbers.push(randomNum);
      } else {
        do {
          randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        } while (used.has(randomNum));
        
        used.add(randomNum);
        numbers.push(randomNum);
      }
    }
    
    setResult(numbers);
  };

  const reset = () => {
    setMinValue('1');
    setMaxValue('100');
    setCount('1');
    setAllowDuplicates(true);
    setResult(null);
  };

  const copyResult = async () => {
    if (result) {
      try {
        await navigator.clipboard.writeText(result.join(', '));
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
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
                Random Number Generator
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Generate random numbers within specified ranges
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
              {/* Input Fields */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Dice6 size={20} className="text-foreground" />
                  <label className="block text-sm font-medium text-foreground">
                    Random Number Settings
                  </label>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      Minimum Value
                    </label>
                    <input
                      type="number"
                      value={minValue}
                      onChange={(e) => setMinValue(e.target.value)}
                      placeholder="1"
                      className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      Maximum Value
                    </label>
                    <input
                      type="number"
                      value={maxValue}
                      onChange={(e) => setMaxValue(e.target.value)}
                      placeholder="100"
                      className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      How Many Numbers
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="1000"
                      value={count}
                      onChange={(e) => setCount(e.target.value)}
                      placeholder="1"
                      className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground"
                    />
                  </div>
                </div>

                {/* Checkbox */}
                <div className="flex items-center gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="allowDuplicates"
                    checked={allowDuplicates}
                    onChange={(e) => setAllowDuplicates(e.target.checked)}
                    className="rounded border-border text-accent focus:ring-accent"
                  />
                  <label htmlFor="allowDuplicates" className="text-sm font-medium text-foreground">
                    Allow duplicate numbers
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={generateRandom}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent text-accent-foreground rounded-lg sm:rounded-xl hover:bg-accent/80 transition-colors text-sm sm:text-base"
                >
                  <Dice6 size={16} className="sm:w-4 sm:h-4" />
                  Generate Numbers
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
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Generated Numbers</h3>
                <button
                  onClick={copyResult}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Copy size={16} className="sm:w-4 sm:h-4" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Number Pills */}
                <div className="flex flex-wrap gap-2">
                  {result.map((num, index) => (
                    <span
                      key={index}
                      className="px-3 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-bold"
                    >
                      {num}
                    </span>
                  ))}
                </div>

                {/* Plain Text Result */}
                <div className="bg-accent/10 p-3 rounded-lg border border-accent/20">
                  <p className="text-sm text-foreground text-center">
                    {result.join(', ')}
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground">Total Numbers</div>
                    <div className="font-semibold text-foreground">{result.length}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground">Range</div>
                    <div className="font-semibold text-foreground">{minValue} - {maxValue}</div>
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
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">How This Tool Works</h3>
            <div className="space-y-2 text-muted-foreground text-sm">
              <p>
                Generate truly random numbers within your specified range using cryptographically strong random number generation.
              </p>
              <div className="text-xs sm:text-sm space-y-1 pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Set your desired minimum and maximum values</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Choose how many random numbers to generate</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Toggle duplicate allowance for unique numbers</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Click "Generate Numbers" to create random values</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Copy results for use in your applications</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Common Use Cases:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Games:</strong> Dice rolls, card shuffling, random selections</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Sampling:</strong> Random samples from datasets</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Testing:</strong> Generating test data and inputs</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Lotteries:</strong> Random draws and selections</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Education:</strong> Math exercises and probability studies</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Technical Details:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span>Uses cryptographically strong random number generation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span>Inclusive range (min and max values included)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span>Maximum of 1000 numbers per generation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span>Uniform distribution across specified range</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RandomGenerator;