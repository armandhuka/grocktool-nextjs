'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, RotateCcw, Copy, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';

export default function StatisticsCalculator() {
  const [numbers, setNumbers] = useState('');
  const [result, setResult] = useState<{
    count: number;
    sum: number;
    mean: number;
    median: number;
    mode: number[];
    range: number;
    standardDeviation: number;
    variance: number;
  } | null>(null);

  const calculateStatistics = () => {
    const numberArray = numbers
      .split(/[,\s\n]+/)
      .map(n => parseFloat(n.trim()))
      .filter(n => !isNaN(n));

    if (numberArray.length === 0) {
      setResult(null);
      return;
    }

    // Basic calculations
    const count = numberArray.length;
    const sum = numberArray.reduce((acc, n) => acc + n, 0);
    const mean = sum / count;

    // Median
    const sortedNumbers = [...numberArray].sort((a, b) => a - b);
    const median = count % 2 === 0
      ? (sortedNumbers[count / 2 - 1] + sortedNumbers[count / 2]) / 2
      : sortedNumbers[Math.floor(count / 2)];

    // Mode
    const frequency: { [key: number]: number } = {};
    numberArray.forEach(n => {
      frequency[n] = (frequency[n] || 0) + 1;
    });
    const maxFreq = Math.max(...Object.values(frequency));
    const mode = Object.keys(frequency)
      .filter(key => frequency[parseFloat(key)] === maxFreq)
      .map(key => parseFloat(key));

    // Range
    const range = Math.max(...numberArray) - Math.min(...numberArray);

    // Variance and Standard Deviation
    const variance = numberArray.reduce((acc, n) => acc + Math.pow(n - mean, 2), 0) / count;
    const standardDeviation = Math.sqrt(variance);

    setResult({
      count,
      sum,
      mean,
      median,
      mode,
      range,
      standardDeviation,
      variance
    });
  };

  const reset = () => {
    setNumbers('');
    setResult(null);
  };

  const copyResult = () => {
    if (result) {
      const text = `Mean: ${result.mean.toFixed(4)}, Median: ${result.median}, Mode: ${result.mode.join(', ')}, SD: ${result.standardDeviation.toFixed(4)}`;
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
              Statistics Calculator
            </h1>
            <p className="text-xl text-toolnest-text/80 max-w-2xl mx-auto">
              Calculate mean, median, mode, standard deviation, and more
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
                  <BarChart3 className="w-6 h-6 text-toolnest-text" />
                  Statistics Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-toolnest-text mb-2">
                    Enter Numbers (separated by commas, spaces, or new lines)
                  </label>
                  <Textarea
                    value={numbers}
                    onChange={(e) => setNumbers(e.target.value)}
                    placeholder="e.g., 1, 2, 3, 4, 5&#10;or&#10;1 2 3 4 5&#10;or&#10;1&#10;2&#10;3&#10;4&#10;5"
                    className="text-lg min-h-[120px]"
                    rows={6}
                  />
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button onClick={calculateStatistics} className="bg-toolnest-text hover:bg-toolnest-text/90">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Calculate
                  </Button>
                  <Button onClick={reset} variant="outline">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                  {result && (
                    <Button onClick={copyResult} variant="outline">
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Summary
                    </Button>
                  )}
                </div>

                {result && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <h3 className="text-sm font-semibold text-toolnest-text mb-1">Count</h3>
                        <p className="text-2xl font-bold text-blue-600">{result.count}</p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <h3 className="text-sm font-semibold text-toolnest-text mb-1">Sum</h3>
                        <p className="text-2xl font-bold text-green-600">{result.sum}</p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <h3 className="text-sm font-semibold text-toolnest-text mb-1">Mean</h3>
                        <p className="text-2xl font-bold text-purple-600">{result.mean.toFixed(4)}</p>
                      </div>
                      <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                        <h3 className="text-sm font-semibold text-toolnest-text mb-1">Median</h3>
                        <p className="text-2xl font-bold text-orange-600">{result.median}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                        <h3 className="text-sm font-semibold text-toolnest-text mb-1">Mode</h3>
                        <p className="text-lg font-bold text-red-600">
                          {result.mode.length === result.count ? 'No mode' : result.mode.join(', ')}
                        </p>
                      </div>
                      <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                        <h3 className="text-sm font-semibold text-toolnest-text mb-1">Range</h3>
                        <p className="text-2xl font-bold text-teal-600">{result.range}</p>
                      </div>
                      <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                        <h3 className="text-sm font-semibold text-toolnest-text mb-1">Std Dev</h3>
                        <p className="text-lg font-bold text-indigo-600">{result.standardDeviation.toFixed(4)}</p>
                      </div>
                      <div className="p-4 bg-pink-50 rounded-lg border border-pink-200">
                        <h3 className="text-sm font-semibold text-toolnest-text mb-1">Variance</h3>
                        <p className="text-lg font-bold text-pink-600">{result.variance.toFixed(4)}</p>
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
                  This calculator computes key statistical measures: Mean (average), Median (middle value), 
                  Mode (most frequent), Range (max - min), Standard Deviation (spread from mean), 
                  and Variance (average squared deviation). Enter your data separated by commas, spaces, or new lines.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}