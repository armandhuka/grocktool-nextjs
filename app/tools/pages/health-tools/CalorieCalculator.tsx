
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Utensils, Calculator, RotateCcw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CalorieCalculator = () => {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('male');
  const [activity, setActivity] = useState('sedentary');
  const [result, setResult] = useState<{ bmr: number; calories: number } | null>(null);

  const calculateCalories = () => {
    const a = parseFloat(age);
    const w = parseFloat(weight);
    const h = parseFloat(height);
    
    if (!a || !w || !h) return;
    
    // Harris-Benedict Equation
    let bmr: number;
    if (gender === 'male') {
      bmr = 88.362 + (13.397 * w) + (4.799 * h) - (5.677 * a);
    } else {
      bmr = 447.593 + (9.247 * w) + (3.098 * h) - (4.330 * a);
    }
    
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      very: 1.725,
      extra: 1.9
    };
    
    const calories = bmr * activityMultipliers[activity as keyof typeof activityMultipliers];
    
    setResult({ 
      bmr: Math.round(bmr), 
      calories: Math.round(calories) 
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
        <title>Calorie Calculator - GrockTool</title>
        <meta name="description" content="Calculate your daily calorie needs based on age, weight, height, gender, and activity level using ToolNest's calorie calculator." />
        <link rel="canonical" href="https://grocktool.com/health-tools/calorie-calculator" />
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
              Calorie Calculator
            </h1>
            <p className="text-xl text-toolnest-text/80 max-w-2xl mx-auto">
              Calculate your daily calorie needs based on your personal details and activity level
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
                    <Utensils className="w-6 h-6 text-toolnest-text" />
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

                  <div>
                    <Label className="text-sm font-medium text-toolnest-text mb-2 block">Activity Level</Label>
                    <select
                      value={activity}
                      onChange={(e) => setActivity(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-toolnest-text"
                    >
                      <option value="sedentary">Sedentary (little or no exercise)</option>
                      <option value="light">Light (light exercise 1-3 days/week)</option>
                      <option value="moderate">Moderate (moderate exercise 3-5 days/week)</option>
                      <option value="very">Very Active (hard exercise 6-7 days/week)</option>
                      <option value="extra">Extra Active (very hard exercise, physical job)</option>
                    </select>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      onClick={calculateCalories}
                      className="flex-1 bg-toolnest-text hover:bg-toolnest-text/90"
                    >
                      <Calculator className="w-4 h-4 mr-2" />
                      Calculate Calories
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
                  <CardTitle>Your Daily Calorie Needs</CardTitle>
                </CardHeader>
                <CardContent>
                  {result ? (
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-toolnest-text mb-2">
                          {result.calories} calories/day
                        </div>
                        <p className="text-toolnest-text/70">
                          To maintain your current weight
                        </p>
                      </div>
                      
                      <div className="bg-toolnest-accent/10 p-4 rounded-lg">
                        <h4 className="font-semibold text-toolnest-text mb-2">BMR: {result.bmr} calories</h4>
                        <p className="text-sm text-toolnest-text/80">
                          Your Basal Metabolic Rate - calories burned at rest
                        </p>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-semibold text-toolnest-text">Weight Goals:</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between bg-red-50 p-2 rounded">
                            <span>Lose 1 kg/week:</span>
                            <span className="font-medium">{result.calories - 1000} calories/day</span>
                          </div>
                          <div className="flex justify-between bg-yellow-50 p-2 rounded">
                            <span>Lose 0.5 kg/week:</span>
                            <span className="font-medium">{result.calories - 500} calories/day</span>
                          </div>
                          <div className="flex justify-between bg-green-50 p-2 rounded">
                            <span>Gain 0.5 kg/week:</span>
                            <span className="font-medium">{result.calories + 500} calories/day</span>
                          </div>
                          <div className="flex justify-between bg-blue-50 p-2 rounded">
                            <span>Gain 1 kg/week:</span>
                            <span className="font-medium">{result.calories + 1000} calories/day</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-toolnest-text/60">
                      Enter your details to calculate daily calorie needs
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
                <CardTitle>How Calorie Calculation Works</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-toolnest-text/80 leading-relaxed">
                  This calculator uses the Harris-Benedict Equation to estimate your Basal Metabolic Rate (BMR), 
                  then multiplies it by your activity factor to determine your Total Daily Energy Expenditure (TDEE). 
                  The results provide guidance for maintaining, losing, or gaining weight. Individual needs may vary, 
                  and it's recommended to consult with healthcare professionals for personalized nutrition advice.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CalorieCalculator;
