'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Calculator, RotateCcw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import Header from '../../components/Header';

export default function IdealWeight() {
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [frame, setFrame] = useState('medium');
  const [result, setResult] = useState<{
    robinson: number;
    miller: number;
    devine: number;
    hamwi: number;
    range: { min: number; max: number };
  } | null>(null);

  const calculateIdealWeight = () => {
    const h = parseFloat(height);
    const a = parseFloat(age);
    
    if (!h) return;
    
    const heightInches = h / 2.54; // Convert cm to inches
    
    // Robinson Formula (1983)
    let robinson: number;
    if (gender === 'male') {
      robinson = 52 + 1.9 * (heightInches - 60);
    } else {
      robinson = 49 + 1.7 * (heightInches - 60);
    }
    
    // Miller Formula (1983)
    let miller: number;
    if (gender === 'male') {
      miller = 56.2 + 1.41 * (heightInches - 60);
    } else {
      miller = 53.1 + 1.36 * (heightInches - 60);
    }
    
    // Devine Formula (1974)
    let devine: number;
    if (gender === 'male') {
      devine = 50 + 2.3 * (heightInches - 60);
    } else {
      devine = 45.5 + 2.3 * (heightInches - 60);
    }
    
    // Hamwi Formula (1964)
    let hamwi: number;
    if (gender === 'male') {
      hamwi = 48 + 2.7 * (heightInches - 60);
    } else {
      hamwi = 45.5 + 2.2 * (heightInches - 60);
    }
    
    // Healthy BMI range (18.5-24.9)
    const heightM = h / 100;
    const minWeight = 18.5 * heightM * heightM;
    const maxWeight = 24.9 * heightM * heightM;
    
    // Frame adjustment
    const frameMultiplier = frame === 'small' ? 0.9 : frame === 'large' ? 1.1 : 1;
    
    setResult({
      robinson: Math.round(robinson * frameMultiplier),
      miller: Math.round(miller * frameMultiplier),
      devine: Math.round(devine * frameMultiplier),
      hamwi: Math.round(hamwi * frameMultiplier),
      range: {
        min: Math.round(minWeight),
        max: Math.round(maxWeight)
      }
    });
  };

  const reset = () => {
    setHeight('');
    setAge('');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-toolnest-bg">
      <Header />

      <main className="pt-32 pb-16 px-4">
        <div className="toolnest-container max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-toolnest-text mb-4">
              Ideal Weight Calculator
            </h1>
            <p className="text-xl text-toolnest-text/80 max-w-2xl mx-auto">
              Calculate your ideal weight using multiple scientific formulas
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
                    <Target className="w-6 h-6 text-toolnest-text" />
                    Personal Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="height" className="text-sm font-medium text-toolnest-text mb-2 block">
                      Height (cm)
                    </Label>
                    <Input
                      id="height"
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder="Enter height in centimeters"
                    />
                  </div>

                  <div>
                    <Label htmlFor="age" className="text-sm font-medium text-toolnest-text mb-2 block">
                      Age (optional)
                    </Label>
                    <Input
                      id="age"
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="Enter age in years"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-toolnest-text mb-2 block">Gender</Label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-toolnest-text"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-toolnest-text mb-2 block">Body Frame</Label>
                    <select
                      value={frame}
                      onChange={(e) => setFrame(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-toolnest-text"
                    >
                      <option value="small">Small Frame</option>
                      <option value="medium">Medium Frame</option>
                      <option value="large">Large Frame</option>
                    </select>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      onClick={calculateIdealWeight}
                      className="flex-1 bg-toolnest-text hover:bg-toolnest-text/90"
                    >
                      <Calculator className="w-4 h-4 mr-2" />
                      Calculate Ideal Weight
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
                  <CardTitle>Ideal Weight Results</CardTitle>
                </CardHeader>
                <CardContent>
                  {result ? (
                    <div className="space-y-6">
                      <div className="bg-toolnest-accent/10 p-4 rounded-lg">
                        <h4 className="font-semibold text-toolnest-text mb-3">Scientific Formulas:</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Robinson Formula:</span>
                            <span className="font-medium">{result.robinson} kg</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Miller Formula:</span>
                            <span className="font-medium">{result.miller} kg</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Devine Formula:</span>
                            <span className="font-medium">{result.devine} kg</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Hamwi Formula:</span>
                            <span className="font-medium">{result.hamwi} kg</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-green-800 mb-2">Healthy BMI Range:</h4>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">
                            {result.range.min} - {result.range.max} kg
                          </div>
                          <p className="text-sm text-green-700 mt-1">
                            Based on BMI 18.5 - 24.9
                          </p>
                        </div>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-2">Average Estimate:</h4>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-600">
                            {Math.round((result.robinson + result.miller + result.devine + result.hamwi) / 4)} kg
                          </div>
                          <p className="text-sm text-blue-700 mt-1">
                            Average of all formulas
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-toolnest-text/60">
                      Enter your details to calculate ideal weight
                    </div>
                  )}
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
                <CardTitle>About Ideal Weight Formulas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-toolnest-text/80">
                  <p>
                    This calculator uses four well-established scientific formulas to estimate ideal weight:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li><strong>Robinson Formula (1983):</strong> Most commonly used in clinical settings</li>
                    <li><strong>Miller Formula (1983):</strong> Similar to Robinson with slight modifications</li>
                    <li><strong>Devine Formula (1974):</strong> Originally developed for drug dosing calculations</li>
                    <li><strong>Hamwi Formula (1964):</strong> Quick estimation method for clinical use</li>
                  </ul>
                  <p className="text-sm">
                    Remember that ideal weight varies based on many factors including muscle mass, bone density, 
                    and overall health. These calculations provide estimates and should not replace professional 
                    medical advice.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}