
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeftRight, RotateCcw, Copy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const RomanConverter = () => {
  const [inputValue, setInputValue] = useState('');
  const [conversionType, setConversionType] = useState<'toRoman' | 'toArabic'>('toRoman');
  const [result, setResult] = useState<string | null>(null);

  const toRoman = (num: number): string => {
    const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    const literals = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
    
    let roman = '';
    for (let i = 0; i < values.length; i++) {
      while (num >= values[i]) {
        roman += literals[i];
        num -= values[i];
      }
    }
    return roman;
  };

  const toArabic = (roman: string): number => {
    const romanValues: { [key: string]: number } = {
      'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000
    };
    
    let result = 0;
    for (let i = 0; i < roman.length; i++) {
      const current = romanValues[roman[i]];
      const next = romanValues[roman[i + 1]];
      
      if (next && current < next) {
        result += next - current;
        i++;
      } else {
        result += current;
      }
    }
    return result;
  };

  const convert = () => {
    if (!inputValue.trim()) return;

    if (conversionType === 'toRoman') {
      const num = parseInt(inputValue);
      if (isNaN(num) || num < 1 || num > 3999) {
        setResult('Please enter a number between 1 and 3999');
        return;
      }
      setResult(toRoman(num));
    } else {
      const roman = inputValue.toUpperCase().trim();
      if (!/^[IVXLCDM]+$/.test(roman)) {
        setResult('Please enter valid Roman numerals (I, V, X, L, C, D, M)');
        return;
      }
      setResult(toArabic(roman).toString());
    }
  };

  const reset = () => {
    setInputValue('');
    setResult(null);
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(result);
    }
  };

  const switchConversion = () => {
    setConversionType(conversionType === 'toRoman' ? 'toArabic' : 'toRoman');
    setInputValue('');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-toolnest-bg">
      <Helmet>
        <title>Roman Numeral Converter - GrockTool</title>
        <meta name="description" content="Convert between Arabic and Roman numerals with GrockTool's free Roman numeral converter tool." />
        <link rel="canonical" href="https://grocktool.com/number-tools/roman-converter" />
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
              Roman Numeral Converter
            </h1>
            <p className="text-xl text-toolnest-text/80 max-w-2xl mx-auto">
              Convert between Arabic and Roman numerals instantly
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
                  <ArrowLeftRight className="w-6 h-6 text-toolnest-text" />
                  Roman Numeral Converter
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <span className={`px-4 py-2 rounded-lg ${conversionType === 'toRoman' ? 'bg-toolnest-text text-white' : 'bg-gray-200 text-toolnest-text'}`}>
                    Arabic to Roman
                  </span>
                  <Button onClick={switchConversion} variant="outline" size="sm">
                    <ArrowLeftRight className="w-4 h-4" />
                  </Button>
                  <span className={`px-4 py-2 rounded-lg ${conversionType === 'toArabic' ? 'bg-toolnest-text text-white' : 'bg-gray-200 text-toolnest-text'}`}>
                    Roman to Arabic
                  </span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-toolnest-text mb-2">
                    {conversionType === 'toRoman' ? 'Enter Arabic Number (1-3999)' : 'Enter Roman Numerals'}
                  </label>
                  <Input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={conversionType === 'toRoman' ? 'e.g., 2024' : 'e.g., MMXXIV'}
                    className="text-lg text-center"
                  />
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button onClick={convert} className="bg-toolnest-text hover:bg-toolnest-text/90">
                    <ArrowLeftRight className="w-4 h-4 mr-2" />
                    Convert
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
                    className="mt-6 p-4 bg-toolnest-accent/20 rounded-lg border"
                  >
                    <h3 className="text-lg font-semibold text-toolnest-text mb-2">Result:</h3>
                    <p className="text-2xl font-bold text-toolnest-text text-center">
                      {result}
                    </p>
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
                <p className="text-toolnest-text/80 leading-relaxed mb-4">
                  Roman numerals use combinations of letters to represent numbers: I=1, V=5, X=10, L=50, C=100, D=500, M=1000. 
                  When a smaller numeral appears before a larger one, it's subtracted (e.g., IV=4, IX=9).
                </p>
                <div className="text-sm text-toolnest-text/70">
                  <strong>Examples:</strong> 2024 = MMXXIV, 1994 = MCMXCIV, 444 = CDXLIV
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

export default RomanConverter;
