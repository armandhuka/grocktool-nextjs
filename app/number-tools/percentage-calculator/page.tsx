'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, TrendingDown, Copy, RotateCcw, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PercentageCalculatorPage() {
  const [calculationType, setCalculationType] = useState<'basic' | 'increase' | 'decrease' | 'of'>('basic');
  const [values, setValues] = useState({
    value1: '',
    value2: '',
    percentage: '',
    result: ''
  });

  const calculatePercentage = () => {
    const val1 = parseFloat(values.value1);
    const val2 = parseFloat(values.value2);
    const percent = parseFloat(values.percentage);

    if (isNaN(val1) || isNaN(val2)) return;

    let result = 0;
    switch (calculationType) {
      case 'basic':
        result = (val1 / val2) * 100;
        break;
      case 'increase':
        result = val1 + (val1 * percent / 100);
        break;
      case 'decrease':
        result = val1 - (val1 * percent / 100);
        break;
      case 'of':
        result = (val1 * percent) / 100;
        break;
    }

    setValues(prev => ({ ...prev, result: result.toFixed(2) }));
  };

  const clearFields = () => {
    setValues({
      value1: '',
      value2: '',
      percentage: '',
      result: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setValues(prev => ({ ...prev, [field]: value }));
  };

  const copyResult = async () => {
    if (values.result) {
      const text = `Result: ${values.result}${calculationType === 'basic' ? '%' : ''}`;
      try {
        await navigator.clipboard.writeText(text);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  const getCalculationExplanation = () => {
    const val1 = parseFloat(values.value1);
    const val2 = parseFloat(values.value2);
    const percent = parseFloat(values.percentage);
    
    switch(calculationType) {
      case 'basic':
        return `${val1} is ${values.result}% of ${val2}`;
      case 'increase':
        return `${val1} + ${percent}% = ${values.result}`;
      case 'decrease':
        return `${val1} - ${percent}% = ${values.result}`;
      case 'of':
        return `${percent}% of ${val1} = ${values.result}`;
      default:
        return '';
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
                Percentage Calculator
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Calculate percentages, increases, decreases, and more with ease
              </p>
            </motion.div>
          </div>

          {/* Calculation Type Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 mb-6 shadow-sm"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Calculator size={20} className="text-foreground" />
                <label className="block text-sm font-medium text-foreground">
                  Select Calculation Type
                </label>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setCalculationType('basic')}
                  className={`p-3 rounded-lg border transition-all ${
                    calculationType === 'basic' 
                      ? 'bg-accent text-accent-foreground border-accent' 
                      : 'bg-secondary text-secondary-foreground border-border hover:bg-secondary/80'
                  }`}
                >
                  <div className="flex items-center gap-2 justify-center text-sm">
                    <Calculator size={16} />
                    Basic %
                  </div>
                </button>
                <button
                  onClick={() => setCalculationType('increase')}
                  className={`p-3 rounded-lg border transition-all ${
                    calculationType === 'increase' 
                      ? 'bg-accent text-accent-foreground border-accent' 
                      : 'bg-secondary text-secondary-foreground border-border hover:bg-secondary/80'
                  }`}
                >
                  <div className="flex items-center gap-2 justify-center text-sm">
                    <TrendingUp size={16} />
                    Increase
                  </div>
                </button>
                <button
                  onClick={() => setCalculationType('decrease')}
                  className={`p-3 rounded-lg border transition-all ${
                    calculationType === 'decrease' 
                      ? 'bg-accent text-accent-foreground border-accent' 
                      : 'bg-secondary text-secondary-foreground border-border hover:bg-secondary/80'
                  }`}
                >
                  <div className="flex items-center gap-2 justify-center text-sm">
                    <TrendingDown size={16} />
                    Decrease
                  </div>
                </button>
                <button
                  onClick={() => setCalculationType('of')}
                  className={`p-3 rounded-lg border transition-all ${
                    calculationType === 'of' 
                      ? 'bg-accent text-accent-foreground border-accent' 
                      : 'bg-secondary text-secondary-foreground border-border hover:bg-secondary/80'
                  }`}
                >
                  <div className="flex items-center gap-2 justify-center text-sm">
                    <Calculator size={16} />
                    % Of
                  </div>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Input Fields Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 mb-6 shadow-sm"
          >
            <div className="space-y-6">
              {/* Input Fields */}
              <div className="space-y-4">
                {calculationType === 'basic' && (
                  <>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-foreground">
                          Value 1
                        </label>
                        <input
                          type="number"
                          value={values.value1}
                          onChange={(e) => handleInputChange('value1', e.target.value)}
                          placeholder="Enter first value"
                          className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-foreground">
                          Value 2
                        </label>
                        <input
                          type="number"
                          value={values.value2}
                          onChange={(e) => handleInputChange('value2', e.target.value)}
                          placeholder="Enter second value"
                          className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Calculates: What percentage is Value 1 of Value 2?
                    </p>
                  </>
                )}

                {(calculationType === 'increase' || calculationType === 'decrease') && (
                  <>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-foreground">
                          Original Value
                        </label>
                        <input
                          type="number"
                          value={values.value1}
                          onChange={(e) => handleInputChange('value1', e.target.value)}
                          placeholder="Enter original value"
                          className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-foreground">
                          Percentage
                        </label>
                        <input
                          type="number"
                          value={values.percentage}
                          onChange={(e) => handleInputChange('percentage', e.target.value)}
                          placeholder="Enter percentage"
                          className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {calculationType === 'increase' 
                        ? 'Calculates: Original value + percentage increase'
                        : 'Calculates: Original value - percentage decrease'
                      }
                    </p>
                  </>
                )}

                {calculationType === 'of' && (
                  <>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-foreground">
                          Value
                        </label>
                        <input
                          type="number"
                          value={values.value1}
                          onChange={(e) => handleInputChange('value1', e.target.value)}
                          placeholder="Enter value"
                          className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-foreground">
                          Percentage
                        </label>
                        <input
                          type="number"
                          value={values.percentage}
                          onChange={(e) => handleInputChange('percentage', e.target.value)}
                          placeholder="Enter percentage"
                          className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Calculates: What is X% of the given value?
                    </p>
                  </>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={calculatePercentage}
                  disabled={!values.value1 || !values.value2}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent text-accent-foreground rounded-lg sm:rounded-xl hover:bg-accent/80 transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Calculator size={16} className="sm:w-4 sm:h-4" />
                  Calculate
                </button>
                <button
                  onClick={clearFields}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg sm:rounded-xl hover:bg-secondary/80 transition-colors text-sm sm:text-base"
                >
                  <RotateCcw size={16} className="sm:w-4 sm:h-4" />
                  Clear All
                </button>
              </div>
            </div>
          </motion.div>

          {/* Results Card */}
          {values.result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 mb-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Calculation Result</h3>
                <button
                  onClick={copyResult}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Copy size={16} className="sm:w-4 sm:h-4" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Main Result Display */}
                <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
                  <div className="text-2xl font-bold text-foreground text-center">
                    {values.result}
                    {calculationType === 'basic' && '%'}
                  </div>
                </div>

                {/* Calculation Explanation */}
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    {getCalculationExplanation()}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
          >
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">How to Use</h3>
            <div className="space-y-2 text-muted-foreground text-sm">
              <p>
                Calculate percentages for various scenarios including basic calculations, 
                increases, decreases, and percentage of values.
              </p>
              <div className="text-xs sm:text-sm space-y-1 pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Select the type of percentage calculation you need</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Enter the required values in the input fields</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Click "Calculate" to see the result</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Use "Clear All" to reset the calculator</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Copy your result for sharing or record keeping</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Calculation Types:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Basic %:</strong> What percentage is value 1 of value 2?</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Increase:</strong> Add a percentage to original value</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Decrease:</strong> Subtract a percentage from original value</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>% Of:</strong> Calculate what X% of a value equals</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}