'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Droplets, Calculator, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Header from '@/components/Header';

export default function WaterIntake() {
  const [weight, setWeight] = useState('');
  const [activity, setActivity] = useState('30');
  const [climate, setClimate] = useState('normal');
  const [result, setResult] = useState<{ liters: number; glasses: number; ounces: number } | null>(null);

  const calculateWaterIntake = () => {
    const w = parseFloat(weight);
    const activityMins = parseFloat(activity);
    
    if (!w) return;
    
    // Base water intake: 35ml per kg of body weight
    const baseIntake = w * 35;
    
    // Add for exercise: 12oz (355ml) per 30 minutes of exercise
    const exerciseIntake = (activityMins / 30) * 355;
    
    // Climate adjustment
    const climateMultiplier = climate === 'hot' ? 1.2 : climate === 'cold' ? 0.9 : 1;
    
    const totalIntakeML = (baseIntake + exerciseIntake) * climateMultiplier;
    const liters = totalIntakeML / 1000;
    const glasses = totalIntakeML / 250; // 250ml per glass
    const ounces = totalIntakeML / 29.5735; // ml to fluid ounces
    
    setResult({
      liters: Math.round(liters * 100) / 100,
      glasses: Math.round(glasses),
      ounces: Math.round(ounces)
    });
  };

  const reset = () => {
    setWeight('');
    setActivity('30');
    setClimate('normal');
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
              Water Intake Calculator
            </h1>
            <p className="text-xl text-toolnest-text/80 max-w-2xl mx-auto">
              Calculate your daily water intake requirements based on your lifestyle
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
                    <Droplets className="w-6 h-6 text-blue-500" />
                    Personal Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="weight" className="text-sm font-medium text-toolnest-text mb-2 block">
                      Body Weight (kg)
                    </Label>
                    <Input
                      id="weight"
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="Enter your weight in kg"
                    />
                  </div>

                  <div>
                    <Label htmlFor="activity" className="text-sm font-medium text-toolnest-text mb-2 block">
                      Daily Exercise Duration (minutes)
                    </Label>
                    <Input
                      id="activity"
                      type="number"
                      value={activity}
                      onChange={(e) => setActivity(e.target.value)}
                      placeholder="Minutes of exercise per day"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-toolnest-text mb-2 block">Climate Conditions</Label>
                    <select
                      value={climate}
                      onChange={(e) => setClimate(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-toolnest-text"
                    >
                      <option value="cold">Cold Climate</option>
                      <option value="normal">Normal Climate</option>
                      <option value="hot">Hot Climate</option>
                    </select>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      onClick={calculateWaterIntake}
                      className="flex-1 bg-toolnest-text hover:bg-toolnest-text/90"
                    >
                      <Calculator className="w-4 h-4 mr-2" />
                      Calculate Water Intake
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
                  <CardTitle>Your Daily Water Requirement</CardTitle>
                </CardHeader>
                <CardContent>
                  {result ? (
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-blue-600 mb-2">
                          {result.liters}L
                        </div>
                        <p className="text-toolnest-text/70">
                          Daily water intake recommendation
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg text-center">
                          <div className="text-2xl font-bold text-blue-600">{result.glasses}</div>
                          <div className="text-sm text-toolnest-text/70">Glasses (250ml each)</div>
                        </div>
                        <div className="bg-cyan-50 p-4 rounded-lg text-center">
                          <div className="text-2xl font-bold text-cyan-600">{result.ounces}</div>
                          <div className="text-sm text-toolnest-text/70">Fluid Ounces</div>
                        </div>
                      </div>

                      <div className="bg-toolnest-accent/10 p-4 rounded-lg">
                        <h4 className="font-semibold text-toolnest-text mb-2">Hydration Tips:</h4>
                        <ul className="text-sm text-toolnest-text/80 space-y-1">
                          <li>• Drink water consistently throughout the day</li>
                          <li>• Increase intake during hot weather or illness</li>
                          <li>• Monitor urine color - pale yellow indicates good hydration</li>
                          <li>• Include water-rich foods in your diet</li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-toolnest-text/60">
                      Enter your details to calculate daily water intake
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
                <CardTitle>About Water Intake Calculation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-toolnest-text/80 leading-relaxed">
                  This calculator estimates your daily water needs based on your body weight (35ml per kg), 
                  exercise duration (additional 355ml per 30 minutes), and climate conditions. The formula 
                  provides a general guideline for healthy adults. Individual needs may vary based on health 
                  conditions, pregnancy, or other factors. Consult healthcare professionals for personalized advice.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}