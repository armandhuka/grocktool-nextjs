'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Calculator, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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

  const handleClear = () => {
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
              href="/tools"
              className="inline-flex items-center gap-2 text-toolnest-text/70 hover:text-toolnest-text mb-8 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Tools
            </Link>

            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-toolnest-text mb-4">
                Percentage Calculator
              </h1>
              <p className="text-xl text-toolnest-text/80 max-w-2xl mx-auto">
                Calculate percentages, increases, decreases, and more with ease
              </p>
            </div>

            {/* Tool Interface */}
            <div className="bg-white rounded-3xl shadow-lg p-8">
              {/* Calculation Type Selector */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                <Button
                  onClick={() => setCalculationType('basic')}
                  variant={calculationType === 'basic' ? 'default' : 'outline'}
                  className="h-12"
                >
                  <Calculator size={16} className="mr-2" />
                  Basic %
                </Button>
                <Button
                  onClick={() => setCalculationType('increase')}
                  variant={calculationType === 'increase' ? 'default' : 'outline'}
                  className="h-12"
                >
                  <TrendingUp size={16} className="mr-2" />
                  Increase
                </Button>
                <Button
                  onClick={() => setCalculationType('decrease')}
                  variant={calculationType === 'decrease' ? 'default' : 'outline'}
                  className="h-12"
                >
                  <TrendingDown size={16} className="mr-2" />
                  Decrease
                </Button>
                <Button
                  onClick={() => setCalculationType('of')}
                  variant={calculationType === 'of' ? 'default' : 'outline'}
                  className="h-12"
                >
                  <Calculator size={16} className="mr-2" />
                  % Of
                </Button>
              </div>

              {/* Input Fields */}
              <div className="space-y-6 mb-8">
                {calculationType === 'basic' && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="value1" className="text-toolnest-text font-medium">
                          Value 1:
                        </Label>
                        <Input
                          id="value1"
                          type="number"
                          value={values.value1}
                          onChange={(e) => handleInputChange('value1', e.target.value)}
                          placeholder="Enter first value"
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="value2" className="text-toolnest-text font-medium">
                          Value 2:
                        </Label>
                        <Input
                          id="value2"
                          type="number"
                          value={values.value2}
                          onChange={(e) => handleInputChange('value2', e.target.value)}
                          placeholder="Enter second value"
                          className="mt-2"
                        />
                      </div>
                    </div>
                    <p className="text-sm text-toolnest-text/70">
                      Calculates: What percentage is Value 1 of Value 2?
                    </p>
                  </>
                )}

                {(calculationType === 'increase' || calculationType === 'decrease') && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="value1" className="text-toolnest-text font-medium">
                          Original Value:
                        </Label>
                        <Input
                          id="value1"
                          type="number"
                          value={values.value1}
                          onChange={(e) => handleInputChange('value1', e.target.value)}
                          placeholder="Enter original value"
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="percentage" className="text-toolnest-text font-medium">
                          Percentage:
                        </Label>
                        <Input
                          id="percentage"
                          type="number"
                          value={values.percentage}
                          onChange={(e) => handleInputChange('percentage', e.target.value)}
                          placeholder="Enter percentage"
                          className="mt-2"
                        />
                      </div>
                    </div>
                    <p className="text-sm text-toolnest-text/70">
                      {calculationType === 'increase' 
                        ? 'Calculates: Original value + percentage increase'
                        : 'Calculates: Original value - percentage decrease'
                      }
                    </p>
                  </>
                )}

                {calculationType === 'of' && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="value1" className="text-toolnest-text font-medium">
                          Value:
                        </Label>
                        <Input
                          id="value1"
                          type="number"
                          value={values.value1}
                          onChange={(e) => handleInputChange('value1', e.target.value)}
                          placeholder="Enter value"
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="percentage" className="text-toolnest-text font-medium">
                          Percentage:
                        </Label>
                        <Input
                          id="percentage"
                          type="number"
                          value={values.percentage}
                          onChange={(e) => handleInputChange('percentage', e.target.value)}
                          placeholder="Enter percentage"
                          className="mt-2"
                        />
                      </div>
                    </div>
                    <p className="text-sm text-toolnest-text/70">
                      Calculates: What is X% of the given value?
                    </p>
                  </>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mb-8">
                <Button
                  onClick={calculatePercentage}
                  className="flex items-center gap-2"
                  disabled={!values.value1 || !values.value2}
                >
                  <Calculator size={16} />
                  Calculate
                </Button>
                <Button
                  onClick={handleClear}
                  variant="outline"
                >
                  Clear
                </Button>
              </div>

              {/* Result */}
              {values.result && (
                <div className="bg-toolnest-bg/30 rounded-2xl p-6 text-center">
                  <h3 className="text-lg font-medium text-toolnest-text mb-2">Result:</h3>
                  <div className="text-4xl font-bold text-toolnest-text">
                    {values.result}
                    {calculationType === 'basic' && '%'}
                  </div>
                </div>
              )}

              {/* Instructions */}
              <div className="mt-8 p-6 bg-toolnest-bg/20 rounded-2xl">
                <h4 className="font-medium text-toolnest-text mb-2">How to use:</h4>
                <ul className="text-toolnest-text/70 text-sm space-y-1">
                  <li>• <strong>Basic %:</strong> Calculate what percentage one value is of another</li>
                  <li>• <strong>Increase:</strong> Calculate a value after adding a percentage</li>
                  <li>• <strong>Decrease:</strong> Calculate a value after subtracting a percentage</li>
                  <li>• <strong>% Of:</strong> Calculate what a percentage of a value equals</li>
                  <li>• Enter your values and click Calculate</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
