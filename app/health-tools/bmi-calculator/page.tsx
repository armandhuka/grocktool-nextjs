'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Calculator, RotateCcw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function BMICalculator() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('metric');
  const [result, setResult] = useState<{ bmi: number; category: string; color: string } | null>(null);

  const calculateBMI = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    
    if (!h || !w) return;
    
    let bmi: number;
    if (unit === 'metric') {
      bmi = w / ((h / 100) * (h / 100));
    } else {
      bmi = (w / (h * h)) * 703;
    }
    
    let category = '';
    let color = '';
    
    if (bmi < 18.5) {
      category = 'Underweight';
      color = 'text-blue-600';
    } else if (bmi < 25) {
      category = 'Normal weight';
      color = 'text-green-600';
    } else if (bmi < 30) {
      category = 'Overweight';
      color = 'text-yellow-600';
    } else {
      category = 'Obese';
      color = 'text-red-600';
    }
    
    setResult({ bmi: Math.round(bmi * 10) / 10, category, color });
  };

  const reset = () => {
    setHeight('');
    setWeight('');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-toolnest-bg">
      <main className="pt-32 pb-16 px-4">
        <div className="toolnest-container max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-toolnest-text mb-4">
              BMI Calculator
            </h1>
            <p className="text-xl text-toolnest-text/80 max-w-2xl mx-auto">
              Calculate your Body Mass Index and understand your health category
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Heart className="w-6 h-6 text-toolnest-text" />
                    BMI Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-sm font-medium text-toolnest-text mb-2 block">Unit System</Label>
                    <select
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-toolnest-text"
                    >
                      <option value="metric">Metric (cm, kg)</option>
                      <option value="imperial">Imperial (in, lbs)</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="height" className="text-sm font-medium text-toolnest-text mb-2 block">
                      Height ({unit === 'metric' ? 'cm' : 'inches'})
                    </Label>
                    <Input
                      id="height"
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder={unit === 'metric' ? 'Enter height in cm' : 'Enter height in inches'}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <Label htmlFor="weight" className="text-sm font-medium text-toolnest-text mb-2 block">
                      Weight ({unit === 'metric' ? 'kg' : 'lbs'})
                    </Label>
                    <Input
                      id="weight"
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder={unit === 'metric' ? 'Enter weight in kg' : 'Enter weight in lbs'}
                      className="w-full"
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      onClick={calculateBMI}
                      className="flex-1 bg-toolnest-text hover:bg-toolnest-text/90"
                    >
                      <Calculator className="w-4 h-4 mr-2" />
                      Calculate BMI
                    </Button>
                    <Button onClick={reset} variant="outline">
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle>Result</CardTitle>
                </CardHeader>
                <CardContent>
                  {result ? (
                    <div className="text-center space-y-4">
                      <div className="text-4xl font-bold text-toolnest-text">
                        {result.bmi}
                      </div>
                      <div className={`text-xl font-semibold ${result.color}`}>
                        {result.category}
                      </div>
                      <div className="bg-toolnest-accent/10 p-4 rounded-lg">
                        <p className="text-sm text-toolnest-text/80">
                          Your BMI indicates you are in the {result.category.toLowerCase()} category.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-toolnest-text/60">
                      Enter your height and weight to calculate BMI
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">BMI Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Underweight:</span>
                      <span className="text-blue-600">Below 18.5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Normal weight:</span>
                      <span className="text-green-600">18.5 - 24.9</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Overweight:</span>
                      <span className="text-yellow-600">25 - 29.9</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Obese:</span>
                      <span className="text-red-600">30 and above</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8"
          >
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle>What is BMI?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-toolnest-text/80 leading-relaxed">
                  Body Mass Index (BMI) is a measure of body fat based on height and weight. It's used as a screening tool 
                  to identify potential health risks associated with being underweight, overweight, or obese. While BMI is a 
                  useful indicator, it doesn't directly measure body fat and may not be accurate for athletes or individuals 
                  with high muscle mass. Always consult with healthcare professionals for personalized health advice.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}