
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { PieChart, Calculator, RotateCcw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const MacroSplitter = () => {
  const [calories, setCalories] = useState('');
  const [proteinPercent, setProteinPercent] = useState('25');
  const [carbPercent, setCarbPercent] = useState('45');
  const [fatPercent, setFatPercent] = useState('30');
  const [goal, setGoal] = useState('maintain');
  const [result, setResult] = useState<{
    protein: { grams: number; calories: number };
    carbs: { grams: number; calories: number };
    fats: { grams: number; calories: number };
    total: number;
  } | null>(null);

  const presetSplits = {
    maintain: { protein: 25, carbs: 45, fats: 30 },
    lose: { protein: 30, carbs: 35, fats: 35 },
    gain: { protein: 25, carbs: 50, fats: 25 },
    keto: { protein: 25, carbs: 5, fats: 70 },
    lowcarb: { protein: 30, carbs: 20, fats: 50 },
    balanced: { protein: 20, carbs: 50, fats: 30 }
  };

  const applyPreset = (presetGoal: string) => {
    const preset = presetSplits[presetGoal as keyof typeof presetSplits];
    setProteinPercent(preset.protein.toString());
    setCarbPercent(preset.carbs.toString());
    setFatPercent(preset.fats.toString());
    setGoal(presetGoal);
  };

  const calculateMacros = () => {
    const totalCalories = parseFloat(calories);
    const proteinPct = parseFloat(proteinPercent);
    const carbPct = parseFloat(carbPercent);
    const fatPct = parseFloat(fatPercent);
    
    if (!totalCalories || proteinPct + carbPct + fatPct !== 100) return;
    
    const proteinCalories = (totalCalories * proteinPct) / 100;
    const carbCalories = (totalCalories * carbPct) / 100;
    const fatCalories = (totalCalories * fatPct) / 100;
    
    // Macronutrient calories per gram: Protein=4, Carbs=4, Fat=9
    const proteinGrams = proteinCalories / 4;
    const carbGrams = carbCalories / 4;
    const fatGrams = fatCalories / 9;
    
    setResult({
      protein: { 
        grams: Math.round(proteinGrams), 
        calories: Math.round(proteinCalories) 
      },
      carbs: { 
        grams: Math.round(carbGrams), 
        calories: Math.round(carbCalories) 
      },
      fats: { 
        grams: Math.round(fatGrams), 
        calories: Math.round(fatCalories) 
      },
      total: totalCalories
    });
  };

  const reset = () => {
    setCalories('');
    setProteinPercent('25');
    setCarbPercent('45');
    setFatPercent('30');
    setGoal('maintain');
    setResult(null);
  };

  const totalPercent = parseFloat(proteinPercent || '0') + parseFloat(carbPercent || '0') + parseFloat(fatPercent || '0');

  return (
    <div className="min-h-screen bg-toolnest-bg">
      <Helmet>
        <title>Macro Split Calculator - GrockTool</title>
        <meta name="description" content="Calculate optimal macronutrient distribution (protein, carbs, fats) from total calories using ToolNest's macro splitter." />
        <link rel="canonical" href="https://grocktool.com/health-tools/macro-splitter" />
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
              Macro Split Calculator
            </h1>
            <p className="text-xl text-toolnest-text/80 max-w-2xl mx-auto">
              Calculate optimal macronutrient distribution from your total daily calories
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
                    <PieChart className="w-6 h-6 text-toolnest-text" />
                    Macro Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="calories" className="text-sm font-medium text-toolnest-text mb-2 block">
                      Total Daily Calories
                    </Label>
                    <Input
                      id="calories"
                      type="number"
                      value={calories}
                      onChange={(e) => setCalories(e.target.value)}
                      placeholder="Enter total calories"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-toolnest-text mb-2 block">Preset Goals</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        variant={goal === 'maintain' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => applyPreset('maintain')}
                      >
                        Maintain
                      </Button>
                      <Button 
                        variant={goal === 'lose' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => applyPreset('lose')}
                      >
                        Lose Weight
                      </Button>
                      <Button 
                        variant={goal === 'gain' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => applyPreset('gain')}
                      >
                        Gain Weight
                      </Button>
                      <Button 
                        variant={goal === 'keto' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => applyPreset('keto')}
                      >
                        Keto
                      </Button>
                      <Button 
                        variant={goal === 'lowcarb' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => applyPreset('lowcarb')}
                      >
                        Low Carb
                      </Button>
                      <Button 
                        variant={goal === 'balanced' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => applyPreset('balanced')}
                      >
                        Balanced
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="protein" className="text-sm font-medium text-toolnest-text mb-2 block">
                        Protein (%)
                      </Label>
                      <Input
                        id="protein"
                        type="number"
                        value={proteinPercent}
                        onChange={(e) => setProteinPercent(e.target.value)}
                        min="0"
                        max="100"
                      />
                    </div>

                    <div>
                      <Label htmlFor="carbs" className="text-sm font-medium text-toolnest-text mb-2 block">
                        Carbohydrates (%)
                      </Label>
                      <Input
                        id="carbs"
                        type="number"
                        value={carbPercent}
                        onChange={(e) => setCarbPercent(e.target.value)}
                        min="0"
                        max="100"
                      />
                    </div>

                    <div>
                      <Label htmlFor="fats" className="text-sm font-medium text-toolnest-text mb-2 block">
                        Fats (%)
                      </Label>
                      <Input
                        id="fats"
                        type="number"
                        value={fatPercent}
                        onChange={(e) => setFatPercent(e.target.value)}
                        min="0"
                        max="100"
                      />
                    </div>

                    <div className={`text-sm text-center p-2 rounded-lg ${
                      totalPercent === 100 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      Total: {totalPercent.toFixed(1)}% {totalPercent !== 100 && '(Must equal 100%)'}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      onClick={calculateMacros}
                      className="flex-1 bg-toolnest-text hover:bg-toolnest-text/90"
                      disabled={totalPercent !== 100}
                    >
                      <Calculator className="w-4 h-4 mr-2" />
                      Calculate Macros
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
                  <CardTitle>Your Macro Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  {result ? (
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-toolnest-text mb-1">
                          {result.total} calories
                        </div>
                        <p className="text-toolnest-text/70 text-sm">Total daily intake</p>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-red-50 p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-semibold text-red-800">Protein</h4>
                            <span className="text-sm text-red-600">{proteinPercent}%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-2xl font-bold text-red-600">{result.protein.grams}g</span>
                            <span className="text-sm text-red-700">{result.protein.calories} calories</span>
                          </div>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-semibold text-blue-800">Carbohydrates</h4>
                            <span className="text-sm text-blue-600">{carbPercent}%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-2xl font-bold text-blue-600">{result.carbs.grams}g</span>
                            <span className="text-sm text-blue-700">{result.carbs.calories} calories</span>
                          </div>
                        </div>

                        <div className="bg-yellow-50 p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-semibold text-yellow-800">Fats</h4>
                            <span className="text-sm text-yellow-600">{fatPercent}%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-2xl font-bold text-yellow-600">{result.fats.grams}g</span>
                            <span className="text-sm text-yellow-700">{result.fats.calories} calories</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-toolnest-accent/10 p-4 rounded-lg">
                        <h4 className="font-semibold text-toolnest-text mb-2">Quick Tips:</h4>
                        <ul className="text-sm text-toolnest-text/80 space-y-1">
                          <li>• Track your macros using a food diary app</li>
                          <li>• Spread protein intake throughout the day</li>
                          <li>• Choose complex carbs over simple sugars</li>
                          <li>• Include healthy fats like nuts, avocado, olive oil</li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-toolnest-text/60">
                      Enter your calories and adjust percentages to calculate macros
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
                <CardTitle>Understanding Macronutrients</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 text-sm">
                  <div>
                    <h4 className="font-semibold text-red-700 mb-2">Protein (4 cal/g)</h4>
                    <p className="text-toolnest-text/80">
                      Essential for muscle building, repair, and metabolism. Sources: meat, fish, eggs, 
                      dairy, legumes, nuts.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-700 mb-2">Carbohydrates (4 cal/g)</h4>
                    <p className="text-toolnest-text/80">
                      Primary energy source for brain and muscles. Sources: grains, fruits, vegetables, 
                      dairy products.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-yellow-700 mb-2">Fats (9 cal/g)</h4>
                    <p className="text-toolnest-text/80">
                      Important for hormone production and nutrient absorption. Sources: oils, nuts, 
                      seeds, fatty fish, avocado.
                    </p>
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

export default MacroSplitter;
