
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Target, RotateCcw, Copy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const RoundingTool = () => {
  const [number, setNumber] = useState('');
  const [decimalPlaces, setDecimalPlaces] = useState('2');
  const [result, setResult] = useState<{ rounded: number; floor: number; ceil: number } | null>(null);

  const round = () => {
    const num = parseFloat(number);
    const places = parseInt(decimalPlaces);
    
    if (isNaN(num) || isNaN(places)) return;

    const multiplier = Math.pow(10, places);
    const rounded = Math.round(num * multiplier) / multiplier;
    const floor = Math.floor(num * multiplier) / multiplier;
    const ceil = Math.ceil(num * multiplier) / multiplier;
    
    setResult({ rounded, floor, ceil });
  };

  const reset = () => {
    setNumber('');
    setDecimalPlaces('2');
    setResult(null);
  };

  const copyResult = (value: number) => {
    navigator.clipboard.writeText(value.toString());
  };

  return (
    <div className="min-h-screen bg-toolnest-bg">
      <Helmet>
        <title>Number Rounding Tool - GrockTool</title>
        <meta name="description" content="Round numbers to specified decimal places with GrockTool's free number rounding tool." />
        <link rel="canonical" href="https://grocktool.com/number-tools/rounding" />
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
              Number Rounding Tool
            </h1>
            <p className="text-xl text-toolnest-text/80 max-w-2xl mx-auto">
              Round numbers to specified decimal places
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
                  <Target className="w-6 h-6 text-toolnest-text" />
                  Number Rounding Tool
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-toolnest-text mb-2">
                      Enter Number
                    </label>
                    <Input
                      type="number"
                      step="any"
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                      placeholder="e.g., 3.14159"
                      className="text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-toolnest-text mb-2">
                      Decimal Places
                    </label>
                    <Input
                      type="number"
                      min="0"
                      max="10"
                      value={decimalPlaces}
                      onChange={(e) => setDecimalPlaces(e.target.value)}
                      placeholder="2"
                      className="text-lg"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button onClick={round} className="bg-toolnest-text hover:bg-toolnest-text/90">
                    <Target className="w-4 h-4 mr-2" />
                    Round Number
                  </Button>
                  <Button onClick={reset} variant="outline">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                </div>

                {result && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-6 space-y-4"
                  >
                    <h3 className="text-lg font-semibold text-toolnest-text">Results:</h3>
                    
                    <div className="grid gap-4">
                      <div className="p-4 bg-toolnest-accent/20 rounded-lg border flex justify-between items-center">
                        <div>
                          <span className="text-sm font-medium text-toolnest-text/70">Rounded:</span>
                          <p className="text-xl font-bold text-toolnest-text">{result.rounded}</p>
                        </div>
                        <Button onClick={() => copyResult(result.rounded)} variant="outline" size="sm">
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="p-4 bg-toolnest-accent/20 rounded-lg border flex justify-between items-center">
                        <div>
                          <span className="text-sm font-medium text-toolnest-text/70">Floor (Round Down):</span>
                          <p className="text-lg font-bold text-toolnest-text">{result.floor}</p>
                        </div>
                        <Button onClick={() => copyResult(result.floor)} variant="outline" size="sm">
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="p-4 bg-toolnest-accent/20 rounded-lg border flex justify-between items-center">
                        <div>
                          <span className="text-sm font-medium text-toolnest-text/70">Ceiling (Round Up):</span>
                          <p className="text-lg font-bold text-toolnest-text">{result.ceil}</p>
                        </div>
                        <Button onClick={() => copyResult(result.ceil)} variant="outline" size="sm">
                          <Copy className="w-4 h-4" />
                        </Button>
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
                  This tool provides three rounding methods: standard rounding (rounds to nearest), floor (always rounds down), 
                  and ceiling (always rounds up). You can specify the number of decimal places for precise control over the result.
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

export default RoundingTool;
