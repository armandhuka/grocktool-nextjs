'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Circle, RotateCcw, Copy, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function CircleCalculatorPage() {
  const [radius, setRadius] = useState('');
  const [result, setResult] = useState<{
    area: number;
    circumference: number;
    diameter: number;
  } | null>(null);

  const calculateCircle = () => {
    const r = parseFloat(radius);
    if (isNaN(r) || r <= 0) {
      setResult(null);
      return;
    }

    const area = Math.PI * r * r;
    const circumference = 2 * Math.PI * r;
    const diameter = 2 * r;

    setResult({ area, circumference, diameter });
  };

  const reset = () => {
    setRadius('');
    setResult(null);
  };

  const copyResult = () => {
    if (result) {
      const text = `Area: ${result.area.toFixed(4)}, Circumference: ${result.circumference.toFixed(4)}, Diameter: ${result.diameter}`;
      navigator.clipboard.writeText(text);
    }
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
                Circle Calculator
              </h1>
              <p className="text-xl text-toolnest-text/80 max-w-2xl mx-auto">
                Calculate area, circumference, and diameter of a circle
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
                    <Circle className="w-6 h-6 text-toolnest-text" />
                    Circle Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-toolnest-text mb-2">
                      Radius
                    </label>
                    <Input
                      type="number"
                      value={radius}
                      onChange={(e) => setRadius(e.target.value)}
                      placeholder="e.g., 5"
                      className="text-lg text-center"
                      step="any"
                    />
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button onClick={calculateCircle} className="bg-toolnest-text hover:bg-toolnest-text/90">
                      <Circle className="w-4 h-4 mr-2" />
                      Calculate
                    </Button>
                    <Button onClick={reset} variant="outline">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset
                    </Button>
                    {result && (
                      <Button onClick={copyResult} variant="outline">
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Results
                      </Button>
                    )}
                  </div>

                  {result && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <h3 className="text-lg font-semibold text-toolnest-text mb-2">Area</h3>
                          <p className="text-2xl font-bold text-blue-600">
                            {result.area.toFixed(4)}
                          </p>
                          <p className="text-sm text-toolnest-text/70">square units</p>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                          <h3 className="text-lg font-semibold text-toolnest-text mb-2">Circumference</h3>
                          <p className="text-2xl font-bold text-green-600">
                            {result.circumference.toFixed(4)}
                          </p>
                          <p className="text-sm text-toolnest-text/70">units</p>
                        </div>
                        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                          <h3 className="text-lg font-semibold text-toolnest-text mb-2">Diameter</h3>
                          <p className="text-2xl font-bold text-purple-600">
                            {result.diameter}
                          </p>
                          <p className="text-sm text-toolnest-text/70">units</p>
                        </div>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-lg border">
                        <h3 className="text-lg font-semibold text-toolnest-text mb-2">Formulas Used:</h3>
                        <div className="space-y-1 text-toolnest-text font-mono text-sm">
                          <p>Area = π × r² = π × {radius}² = {result.area.toFixed(4)}</p>
                          <p>Circumference = 2π × r = 2π × {radius} = {result.circumference.toFixed(4)}</p>
                          <p>Diameter = 2 × r = 2 × {radius} = {result.diameter}</p>
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
                    This calculator uses the fundamental circle formulas: Area = πr², Circumference = 2πr, 
                    and Diameter = 2r. Simply enter the radius and get all the important measurements of your circle.
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