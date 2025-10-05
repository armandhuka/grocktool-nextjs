'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Triangle, RotateCcw, Copy, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import Link from 'next/link';

export default function TriangleArea() {
  const [method, setMethod] = useState('base-height');
  const [base, setBase] = useState('');
  const [height, setHeight] = useState('');
  const [sideA, setSideA] = useState('');
  const [sideB, setSideB] = useState('');
  const [sideC, setSideC] = useState('');
  const [result, setResult] = useState<{
    area: number;
    perimeter: number;
    formula: string;
    calculation: string;
  } | null>(null);

  const calculateTriangle = () => {
    let area: number;
    let perimeter: number;
    let formula: string;
    let calculation: string;

    if (method === 'base-height') {
      const b = parseFloat(base);
      const h = parseFloat(height);
      
      if (isNaN(b) || isNaN(h) || b <= 0 || h <= 0) {
        setResult(null);
        return;
      }

      area = (b * h) / 2;
      perimeter = NaN; // Cannot calculate perimeter with just base and height
      formula = 'Area = ½ × base × height';
      calculation = `Area = ½ × ${b} × ${h} = ${area}`;
    } else {
      const a = parseFloat(sideA);
      const b = parseFloat(sideB);
      const c = parseFloat(sideC);
      
      if (isNaN(a) || isNaN(b) || isNaN(c) || a <= 0 || b <= 0 || c <= 0) {
        setResult(null);
        return;
      }

      // Check if triangle is valid
      if (a + b <= c || a + c <= b || b + c <= a) {
        setResult(null);
        return;
      }

      // Heron's formula
      const s = (a + b + c) / 2; // semi-perimeter
      area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
      perimeter = a + b + c;
      formula = "Heron's Formula: Area = √(s(s-a)(s-b)(s-c))";
      calculation = `s = (${a} + ${b} + ${c}) / 2 = ${s}\nArea = √(${s} × ${s-a} × ${s-b} × ${s-c}) = ${area.toFixed(4)}`;
    }

    setResult({ area, perimeter, formula, calculation });
  };

  const reset = () => {
    setBase('');
    setHeight('');
    setSideA('');
    setSideB('');
    setSideC('');
    setResult(null);
  };

  const copyResult = () => {
    if (result) {
      const text = `Area: ${result.area.toFixed(4)}${!isNaN(result.perimeter) ? `, Perimeter: ${result.perimeter}` : ''}`;
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
              Triangle Area Calculator
            </h1>
            <p className="text-xl text-toolnest-text/80 max-w-2xl mx-auto">
              Calculate triangle area using base & height or Heron's formula
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
                  <Triangle className="w-6 h-6 text-toolnest-text" />
                  Triangle Area Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-toolnest-text mb-2">
                    Calculation Method
                  </label>
                  <Select value={method} onValueChange={setMethod}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="base-height">Base & Height</SelectItem>
                      <SelectItem value="three-sides">Three Sides (Heron's Formula)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {method === 'base-height' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-toolnest-text mb-2">
                        Base
                      </label>
                      <Input
                        type="number"
                        value={base}
                        onChange={(e) => setBase(e.target.value)}
                        placeholder="e.g., 10"
                        className="text-lg text-center"
                        step="any"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-toolnest-text mb-2">
                        Height
                      </label>
                      <Input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        placeholder="e.g., 8"
                        className="text-lg text-center"
                        step="any"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-toolnest-text mb-2">
                        Side A
                      </label>
                      <Input
                        type="number"
                        value={sideA}
                        onChange={(e) => setSideA(e.target.value)}
                        placeholder="e.g., 5"
                        className="text-lg text-center"
                        step="any"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-toolnest-text mb-2">
                        Side B
                      </label>
                      <Input
                        type="number"
                        value={sideB}
                        onChange={(e) => setSideB(e.target.value)}
                        placeholder="e.g., 6"
                        className="text-lg text-center"
                        step="any"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-toolnest-text mb-2">
                        Side C
                      </label>
                      <Input
                        type="number"
                        value={sideC}
                        onChange={(e) => setSideC(e.target.value)}
                        placeholder="e.g., 7"
                        className="text-lg text-center"
                        step="any"
                      />
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-3">
                  <Button onClick={calculateTriangle} className="bg-toolnest-text hover:bg-toolnest-text/90">
                    <Triangle className="w-4 h-4 mr-2" />
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
                      <h3 className="text-lg font-semibold text-toolnest-text mb-2">Results:</h3>
                      <div className="space-y-2">
                        <p><strong>Area:</strong> {result.area.toFixed(4)} square units</p>
                        {!isNaN(result.perimeter) && (
                          <p><strong>Perimeter:</strong> {result.perimeter} units</p>
                        )}
                        <p><strong>Formula:</strong> {result.formula}</p>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg border">
                      <h3 className="text-lg font-semibold text-toolnest-text mb-2">Calculation:</h3>
                      <pre className="text-toolnest-text text-sm font-mono whitespace-pre-wrap">
                        {result.calculation}
                      </pre>
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
                  This calculator supports two methods: Base & Height (Area = ½ × base × height) and 
                  Heron's Formula for when you know all three sides. Heron's formula calculates area using 
                  the semi-perimeter: Area = √(s(s-a)(s-b)(s-c)) where s = (a+b+c)/2.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}