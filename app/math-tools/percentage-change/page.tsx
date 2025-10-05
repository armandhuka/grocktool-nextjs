'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, RotateCcw, Copy, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import Link from 'next/link';

export default function PercentageChange() {
  const [originalValue, setOriginalValue] = useState('');
  const [newValue, setNewValue] = useState('');
  const [result, setResult] = useState<{
    percentageChange: number;
    absoluteChange: number;
    changeType: 'increase' | 'decrease' | 'no change';
  } | null>(null);

  const calculatePercentageChange = () => {
    const original = parseFloat(originalValue);
    const newVal = parseFloat(newValue);

    if (isNaN(original) || isNaN(newVal)) {
      setResult(null);
      return;
    }

    if (original === 0) {
      setResult({
        percentageChange: newVal === 0 ? 0 : Infinity,
        absoluteChange: newVal,
        changeType: newVal === 0 ? 'no change' : 'increase'
      });
      return;
    }

    const absoluteChange = newVal - original;
    const percentageChange = (absoluteChange / original) * 100;
    
    let changeType: 'increase' | 'decrease' | 'no change';
    if (absoluteChange > 0) {
      changeType = 'increase';
    } else if (absoluteChange < 0) {
      changeType = 'decrease';
    } else {
      changeType = 'no change';
    }

    setResult({
      percentageChange: Math.abs(percentageChange),
      absoluteChange: Math.abs(absoluteChange),
      changeType
    });
  };

  const reset = () => {
    setOriginalValue('');
    setNewValue('');
    setResult(null);
  };

  const copyResult = () => {
    if (result) {
      const text = `${result.changeType === 'increase' ? '+' : result.changeType === 'decrease' ? '-' : ''}${result.percentageChange.toFixed(2)}%`;
      navigator.clipboard.writeText(text);
    }
  };

  return (
    <div className="min-h-screen bg-toolnest-bg">
      <main className="pt-32 pb-16 px-4">
        <div className="toolnest-container max-w-4xl mx-auto">
          <div className="mb-6">
            <Link 
              href="/tool"
              className="inline-flex items-center text-toolnest-text hover:text-toolnest-accent transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Tools
            </Link>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-toolnest-text mb-4">
              Percentage Change Calculator
            </h1>
            <p className="text-xl text-toolnest-text/80 max-w-2xl mx-auto">
              Calculate percentage increase or decrease between two values
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
                  <TrendingUp className="w-6 h-6 text-toolnest-text" />
                  Percentage Change Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-toolnest-text mb-2">
                      Original Value
                    </label>
                    <Input
                      type="number"
                      value={originalValue}
                      onChange={(e) => setOriginalValue(e.target.value)}
                      placeholder="e.g., 100"
                      className="text-lg text-center"
                      step="any"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-toolnest-text mb-2">
                      New Value
                    </label>
                    <Input
                      type="number"
                      value={newValue}
                      onChange={(e) => setNewValue(e.target.value)}
                      placeholder="e.g., 120"
                      className="text-lg text-center"
                      step="any"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button onClick={calculatePercentageChange} className="bg-toolnest-text hover:bg-toolnest-text/90">
                    <TrendingUp className="w-4 h-4 mr-2" />
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
                    className="mt-6"
                  >
                    <div className={`p-6 rounded-lg border ${
                      result.changeType === 'increase' ? 'bg-green-50 border-green-200' :
                      result.changeType === 'decrease' ? 'bg-red-50 border-red-200' :
                      'bg-gray-50 border-gray-200'
                    }`}>
                      <div className="flex items-center gap-3 mb-4">
                        {result.changeType === 'increase' ? (
                          <TrendingUp className="w-8 h-8 text-green-600" />
                        ) : result.changeType === 'decrease' ? (
                          <TrendingDown className="w-8 h-8 text-red-600" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-gray-300" />
                        )}
                        <div>
                          <h3 className="text-2xl font-bold text-toolnest-text">
                            {result.changeType === 'increase' ? '+' : result.changeType === 'decrease' ? '-' : ''}
                            {result.percentageChange === Infinity ? '∞' : result.percentageChange.toFixed(2)}%
                          </h3>
                          <p className="text-toolnest-text/70 capitalize">
                            {result.changeType === 'no change' ? 'No Change' : `Percentage ${result.changeType}`}
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-toolnest-text">
                        <p><strong>Absolute Change:</strong> {result.absoluteChange}</p>
                        <p><strong>Formula:</strong> ((New Value - Original Value) / Original Value) × 100</p>
                        {originalValue && newValue && (
                          <p><strong>Calculation:</strong> (({newValue} - {originalValue}) / {originalValue}) × 100 = {result.percentageChange === Infinity ? '∞' : result.percentageChange.toFixed(2)}%</p>
                        )}
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
                  Percentage change shows the relative change between two values. It's calculated as: 
                  ((New Value - Original Value) / Original Value) × 100. Positive results indicate an increase, 
                  while negative results indicate a decrease.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}