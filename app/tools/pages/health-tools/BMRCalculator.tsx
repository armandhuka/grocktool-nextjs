
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Zap, Calculator, RotateCcw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const BMRCalculator = () => {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('male');
  const [result, setResult] = useState<{
    bmr: number;
    sedentary: number;
    light: number;
    moderate: number;
    very: number;
    extra: number;
  } | null>(null);

  const calculateBMR = () => {
    const a = parseFloat(age);
    const w = parseFloat(weight);
    const h = parseFloat(height);
    
    if (!a || !w || !h) return;
    
    // Mifflin-St Jeor Equation (more accurate than Harris-Benedict)
    let bmr: number;
    if (gender === 'male') {
      bmr = 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      bmr = 10 * w + 6.25 * h - 5 * a - 161;
    }
    
    // Activity level multipliers
    setResult({
      bmr: Math.round(bmr),
      sedentary: Math.round(bmr * 1.2),     // Little or no exercise
      light: Math.round(bmr * 1.375),       // Light exercise 1-3 days/week
      moderate: Math.round(bmr * 1.55),     // Moderate exercise 3-5 days/week
      very: Math.round(bmr * 1.725),        // Hard exercise 6-7 days/week
      extra: Math.round(bmr * 1.9)          // Very hard exercise, physical job
    });
  };

  const reset = () => {
    setAge('');
    setWeight('');
    setHeight('');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-toolnest-bg">
      <Helmet>
        <title>BMR Calculator - GrockTool</title>
        <meta name="description" content="Calculate your Basal Metabolic Rate (BMR) and daily energy expenditure with ToolNest's BMR calculator." />
        <link rel="canonical" href="https://grocktool.com/health-tools/bmr-calculator" />
      </Helmet>

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
              BMR Calculator
            </h1>
            <p className="text-xl text-toolnest-text/80 max-w-2xl mx-auto">
              Calculate your Basal Metabolic Rate and daily energy expenditure
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
                    <Zap className="w-6 h-6 text-orange-500" />
                    Personal Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="age" className="text-sm font-medium text-toolnest-text mb-2 block">
                        Age (years)
                      </Label>
                      <Input
                        id="age"
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="Enter age"
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

                  <div>
                    <Label htmlFor="weight" className="text-sm font-medium text-toolnest-text mb-2 block">
                      Weight (kg)
                    </Label>
                    <Input
                      id="weight"
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="Enter weight in kg"
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
                      placeholder="Enter height in cm"
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      onClick={calculateBMR}
                      className="flex-1 bg-toolnest-text hover:bg-toolnest-text/90"
                    >
                      <Calculator className="w-4 h-4 mr-2" />
                      Calculate BMR
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
                  <CardTitle>Your Metabolic Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  {result ? (
                    <div className="space-y-6">
                      <div className="text-center bg-orange-50 p-4 rounded-lg">
                        <div className="text-3xl font-bold text-orange-600 mb-2">
                          {result.bmr} calories/day
                        </div>
                        <p className="text-orange-700 text-sm">
                          Your Basal Metabolic Rate (BMR)
                        </p>
                        <p className="text-orange-600 text-xs mt-1">
                          Calories burned at complete rest
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-toolnest-text mb-3">Daily Energy Expenditure (TDEE):</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <div>
                              <div className="font-medium text-sm">Sedentary</div>
                              <div className="text-xs text-gray-600">Little or no exercise</div>
                            </div>
                            <div className="font-bold text-toolnest-text">{result.sedentary}</div>
                          </div>
                          
                          <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                            <div>
                              <div className="font-medium text-sm">Light Activity</div>
                              <div className="text-xs text-gray-600">Light exercise 1-3 days/week</div>
                            </div>
                            <div className="font-bold text-yellow-700">{result.light}</div>
                          </div>
                          
                          <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                            <div>
                              <div className="font-medium text-sm">Moderate Activity</div>
                              <div className="text-xs text-gray-600">Moderate exercise 3-5 days/week</div>
                            </div>
                            <div className="font-bold text-green-700">{result.moderate}</div>
                          </div>
                          
                          <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                            <div>
                              <div className="font-medium text-sm">Very Active</div>
                              <div className="text-xs text-gray-600">Hard exercise 6-7 days/week</div>
                            </div>
                            <div className="font-bold text-blue-700">{result.very}</div>
                          </div>
                          
                          <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                            <div>
                              <div className="font-medium text-sm">Extra Active</div>
                              <div className="text-xs text-gray-600">Very hard exercise, physical job</div>
                            </div>
                            <div className="font-bold text-purple-700">{result.extra}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-toolnest-text/60">
                      Enter your details to calculate BMR and daily energy needs
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
                <CardTitle>What is BMR?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-toolnest-text/80">
                  <p>
                    <strong>Basal Metabolic Rate (BMR)</strong> is the minimum number of calories your body needs 
                    to maintain basic physiological functions while at complete rest. This includes breathing, 
                    circulation, cell production, nutrient processing, and protein synthesis.
                  </p>
                  <p>
                    <strong>Total Daily Energy Expenditure (TDEE)</strong> is your BMR multiplied by an activity 
                    factor to account for physical activity and exercise. This represents the total calories 
                    you burn in a day.
                  </p>
                  <div className="bg-toolnest-accent/10 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">How to Use These Numbers:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Use TDEE to maintain current weight</li>
                      <li>• Eat 300-500 calories below TDEE to lose weight</li>
                      <li>• Eat 300-500 calories above TDEE to gain weight</li>
                      <li>• Never eat below your BMR for extended periods</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BMRCalculator;
