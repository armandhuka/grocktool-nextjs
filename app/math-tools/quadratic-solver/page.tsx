'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, RotateCcw, Copy, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import Link from 'next/link';

export default function QuadraticSolver() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [result, setResult] = useState<{
    discriminant: number;
    roots: { x1: string; x2: string };
    nature: string;
    steps: string[];
  } | null>(null);

  const solveQuadratic = () => {
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    const numC = parseFloat(c);

    if (isNaN(numA) || isNaN(numB) || isNaN(numC)) {
      setResult(null);
      return;
    }

    if (numA === 0) {
      setResult({
        discriminant: 0,
        roots: { x1: 'Not a quadratic equation (a ≠ 0)', x2: '' },
        nature: 'Linear equation',
        steps: ['Since a = 0, this is not a quadratic equation']
      });
      return;
    }

    const discriminant = numB * numB - 4 * numA * numC;
    const steps = [
      `Given: ${numA}x² + ${numB}x + ${numC} = 0`,
      `Discriminant (Δ) = b² - 4ac`,
      `Δ = (${numB})² - 4(${numA})(${numC})`,
      `Δ = ${numB * numB} - ${4 * numA * numC}`,
      `Δ = ${discriminant}`
    ];

    let roots: { x1: string; x2: string };
    let nature: string;

    if (discriminant > 0) {
      const sqrtDiscriminant = Math.sqrt(discriminant);
      const x1 = (-numB + sqrtDiscriminant) / (2 * numA);
      const x2 = (-numB - sqrtDiscriminant) / (2 * numA);
      roots = { 
        x1: x1.toFixed(4), 
        x2: x2.toFixed(4) 
      };
      nature = 'Two distinct real roots';
      steps.push(`x = (-b ± √Δ) / 2a`);
      steps.push(`x₁ = (${-numB} + √${discriminant}) / ${2 * numA} = ${x1.toFixed(4)}`);
      steps.push(`x₂ = (${-numB} - √${discriminant}) / ${2 * numA} = ${x2.toFixed(4)}`);
    } else if (discriminant === 0) {
      const x = -numB / (2 * numA);
      roots = { 
        x1: x.toFixed(4), 
        x2: 'Same as x₁' 
      };
      nature = 'One repeated real root';
      steps.push(`x = -b / 2a = ${-numB} / ${2 * numA} = ${x.toFixed(4)}`);
    } else {
      const realPart = -numB / (2 * numA);
      const imaginaryPart = Math.sqrt(-discriminant) / (2 * numA);
      roots = { 
        x1: `${realPart.toFixed(4)} + ${imaginaryPart.toFixed(4)}i`, 
        x2: `${realPart.toFixed(4)} - ${imaginaryPart.toFixed(4)}i` 
      };
      nature = 'Two complex roots';
      steps.push(`x = (-b ± √Δ) / 2a where Δ < 0`);
      steps.push(`x₁ = ${realPart.toFixed(4)} + ${imaginaryPart.toFixed(4)}i`);
      steps.push(`x₂ = ${realPart.toFixed(4)} - ${imaginaryPart.toFixed(4)}i`);
    }

    setResult({ discriminant, roots, nature, steps });
  };

  const reset = () => {
    setA('');
    setB('');
    setC('');
    setResult(null);
  };

  const copyResult = () => {
    if (result) {
      const text = `x₁ = ${result.roots.x1}, x₂ = ${result.roots.x2}`;
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
              Quadratic Equation Solver
            </h1>
            <p className="text-xl text-toolnest-text/80 max-w-2xl mx-auto">
              Solve quadratic equations of the form ax² + bx + c = 0
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
                  <Calculator className="w-6 h-6 text-toolnest-text" />
                  Quadratic Equation Solver
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center mb-4">
                  <p className="text-lg text-toolnest-text">
                    <span className="font-mono">ax² + bx + c = 0</span>
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-toolnest-text mb-2">
                      Coefficient a
                    </label>
                    <Input
                      type="number"
                      value={a}
                      onChange={(e) => setA(e.target.value)}
                      placeholder="e.g., 1"
                      className="text-lg text-center"
                      step="any"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-toolnest-text mb-2">
                      Coefficient b
                    </label>
                    <Input
                      type="number"
                      value={b}
                      onChange={(e) => setB(e.target.value)}
                      placeholder="e.g., -3"
                      className="text-lg text-center"
                      step="any"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-toolnest-text mb-2">
                      Coefficient c
                    </label>
                    <Input
                      type="number"
                      value={c}
                      onChange={(e) => setC(e.target.value)}
                      placeholder="e.g., 2"
                      className="text-lg text-center"
                      step="any"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button onClick={solveQuadratic} className="bg-toolnest-text hover:bg-toolnest-text/90">
                    <Calculator className="w-4 h-4 mr-2" />
                    Solve
                  </Button>
                  <Button onClick={reset} variant="outline">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                  {result && (
                    <Button onClick={copyResult} variant="outline">
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Roots
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
                        <p><strong>Nature:</strong> {result.nature}</p>
                        <p><strong>Discriminant:</strong> {result.discriminant}</p>
                        <p><strong>Root 1 (x₁):</strong> {result.roots.x1}</p>
                        <p><strong>Root 2 (x₂):</strong> {result.roots.x2}</p>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg border">
                      <h3 className="text-lg font-semibold text-toolnest-text mb-2">Solution Steps:</h3>
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
                  This solver uses the quadratic formula to find roots: x = (-b ± √(b² - 4ac)) / 2a. 
                  The discriminant (b² - 4ac) determines the nature of roots: positive gives two real roots, 
                  zero gives one repeated root, and negative gives complex roots.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}