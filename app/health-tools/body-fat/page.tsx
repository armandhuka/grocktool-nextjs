'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Calculator, RotateCcw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import Header from '../../components/Header';

export default function BodyFat() {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [neck, setNeck] = useState('');
  const [waist, setWaist] = useState('');
  const [hip, setHip] = useState('');
  const [result, setResult] = useState<{ bodyFat: number; category: string; color: string } | null>(null);

  const calculateBodyFat = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const n = parseFloat(neck);
    const wa = parseFloat(waist);
    const hi = parseFloat(hip);
    
    if (!w || !h || !n || !wa || (gender === 'female' && !hi)) return;
    
    let bodyFat: number;
    
    if (gender === 'male') {
      bodyFat = 86.010 * Math.log10(wa - n) - 70.041 * Math.log10(h) + 36.76;
    } else {
      bodyFat = 163.205 * Math.log10(wa + hi - n) - 97.684 * Math.log10(h) - 78.387;
    }
    
    let category = '';
    let color = '';
    
    if (gender === 'male') {
      if (bodyFat < 6) {
        category = 'Essential Fat';
        color = 'text-red-600';
      } else if (bodyFat < 14) {
        category = 'Athletes';
        color = 'text-green-600';
      } else if (bodyFat < 18) {
        category = 'Fitness';
        color = 'text-blue-600';
      } else if (bodyFat < 25) {
        category = 'Average';
        color = 'text-yellow-600';
      } else {
        category = 'Obese';
        color = 'text-red-600';
      }
    } else {
      if (bodyFat < 16) {
        category = 'Essential Fat';
        color = 'text-red-600';
      } else if (bodyFat < 20) {
        category = 'Athletes';
        color = 'text-green-600';
      } else if (bodyFat < 25) {
        category = 'Fitness';
        color = 'text-blue-600';
      } else if (bodyFat < 32) {
        category = 'Average';
        color = 'text-yellow-600';
      } else {
        category = 'Obese';
        color = 'text-red-600';
      }
    }
    
    setResult({ 
      bodyFat: Math.round(bodyFat * 10) / 10, 
      category, 
      color 
    });
  };

  const reset = () => {
    setAge('');
    setWeight('');
    setHeight('');
    setNeck('');
    setWaist('');
    setHip('');
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
              Body Fat Percentage Calculator
            </h1>
            <p className="text-xl text-toolnest-text/80 max-w-2xl mx-auto">
              Estimate your body fat percentage using the US Navy circumference method
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
                    <Activity className="w-6 h-6 text-toolnest-text" />
                    Body Measurements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="age" className="text-sm font-medium text-toolnest-text mb-2 block">
                        Age
                      </Label>
                      <Input
                        id="age"
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="Age in years"
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
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="weight" className="text-sm font-medium text-toolnest-text mb-2 block">
                        Weight (kg)
                      </Label>
                      <Input
                        id="weight"
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="Weight in kg"
                      />
                    </div>
                    <div>
                      <Label htmlFor="height" className="text-sm font-medium text-toolnest-text mb-2 block">
                        Height (cm)
                      </Label>
                      <Input
                        id="height"
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        placeholder="Height in cm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="neck" className="text-sm font-medium text-toolnest-text mb-2 block">
                        Neck (cm)
                      </Label>
                      <Input
                        id="neck"
                        type="number"
                        value={neck}
                        onChange={(e) => setNeck(e.target.value)}
                        placeholder="Neck circumference"
                      />
                    </div>
                    <div>
                      <Label htmlFor="waist" className="text-sm font-medium text-toolnest-text mb-2 block">
                        Waist (cm)
                      </Label>
                      <Input
                        id="waist"
                        type="number"
                        value={waist}
                        onChange={(e) => setWaist(e.target.value)}
                        placeholder="Waist circumference"
                      />
                    </div>
                  </div>

                  {gender === 'female' && (
                    <div>
                      <Label htmlFor="hip" className="text-sm font-medium text-toolnest-text mb-2 block">
                        Hip (cm) - Required for females
                      </Label>
                      <Input
                        id="hip"
                        type="number"
                        value={hip}
                        onChange={(e) => setHip(e.target.value)}
                        placeholder="Hip circumference"
                      />
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button 
                      onClick={calculateBodyFat}
                      className="flex-1 bg-toolnest-text hover:bg-toolnest-text/90"
                    >
                      <Calculator className="w-4 h-4 mr-2" />
                      Calculate Body Fat
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
                  <CardTitle>Body Fat Percentage</CardTitle>
                </CardHeader>
                <CardContent>
                  {result ? (
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-toolnest-text mb-2">
                          {result.bodyFat}%
                        </div>
                        <div className={`text-xl font-semibold ${result.color}`}>
                          {result.category}
                        </div>
                      </div>
                      
                      <div className="bg-toolnest-accent/10 p-4 rounded-lg">
                        <p className="text-sm text-toolnest-text/80">
                          Your body fat percentage places you in the {result.category.toLowerCase()} category.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-toolnest-text/60">
                      Enter your measurements to calculate body fat percentage
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Body Fat Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-toolnest-text mb-2">Men:</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Essential Fat:</span>
                          <span className="text-red-600">2-5%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Athletes:</span>
                          <span className="text-green-600">6-13%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Fitness:</span>
                          <span className="text-blue-600">14-17%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Average:</span>
                          <span className="text-yellow-600">18-24%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Obese:</span>
                          <span className="text-red-600">25%+</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-toolnest-text mb-2">Women:</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Essential Fat:</span>
                          <span className="text-red-600">10-13%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Athletes:</span>
                          <span className="text-green-600">14-20%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Fitness:</span>
                          <span className="text-blue-600">21-24%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Average:</span>
                          <span className="text-yellow-600">25-31%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Obese:</span>
                          <span className="text-red-600">32%+</span>
                        </div>
                      </div>
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
                <CardTitle>About Body Fat Calculation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-toolnest-text/80 leading-relaxed">
                  This calculator uses the US Navy circumference method to estimate body fat percentage. 
                  The method uses body circumference measurements to estimate the amount of body fat. 
                  While this method is reasonably accurate for most people, it may not be suitable for 
                  athletes or individuals with very low or very high muscle mass. For the most accurate 
                  results, consider professional body composition analysis methods.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}