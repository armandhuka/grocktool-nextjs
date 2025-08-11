
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeftRight, RotateCcw, Copy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ScientificNotation = () => {
  const [inputValue, setInputValue] = useState('');
  const [conversionType, setConversionType] = useState<'toScientific' | 'toStandard'>('toScientific');
  const [result, setResult] = useState<string | null>(null);

  const toScientific = (num: number): string => {
    if (num === 0) return '0 × 10⁰';
    
    const exponent = Math.floor(Math.log10(Math.abs(num)));
    const mantissa = num / Math.pow(10, exponent);
    
    return `${mantissa.toFixed(2)} × 10${exponent >= 0 ? '⁺' : '⁻'}${Math.abs(exponent)}`;
  };

  const toStandard = (scientific: string): number => {
    // Parse scientific notation like "1.23e5" or "1.23 × 10⁺5"
    const cleanInput = scientific.replace(/[×\s⁺⁻]/g, '').replace('10', 'e');
    return parseFloat(cleanInput);
  };

  const convert = () => {
    if (!inputValue.trim()) return;

    if (conversionType === 'toScientific') {
      const num = parseFloat(inputValue);
      if (isNaN(num)) {
        setResult('Please enter a valid number');
        return;
      }
      setResult(toScientific(num));
    } else {
      try {
        const standardNum = toStandard(inputValue);
        if (isNaN(standardNum)) {
          setResult('Please enter valid scientific notation (e.g., 1.23e5 or 1.23 × 10⁺5)');
          return;
        }
        setResult(standardNum.toString());
      } catch {
        setResult('Please enter valid scientific notation');
      }
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
    setConversionType(conversionType === 'toScientific' ? 'toStandard' : 'toScientific');
    setInputValue('');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-toolnest-bg">
      <Helmet>
        <title>Scientific Notation Converter - GrockTool</title>
        <meta name="description" content="Convert numbers to and from scientific notation with GrockTool's free scientific notation converter." />
        <link rel="canonical" href="https://grocktool.com/number-tools/scientific-notation" />
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
              Scientific Notation Converter
            </h1>
            <p className="text-xl text-toolnest-text/80 max-w-2xl mx-auto">
              Convert numbers to and from scientific notation
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
                  Scientific Notation Converter
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <span className={`px-4 py-2 rounded-lg ${conversionType === 'toScientific' ? 'bg-toolnest-text text-white' : 'bg-gray-200 text-toolnest-text'}`}>
                    To Scientific
                  </span>
                  <Button onClick={switchConversion} variant="outline" size="sm">
                    <ArrowLeftRight className="w-4 h-4" />
                  </Button>
                  <span className={`px-4 py-2 rounded-lg ${conversionType === 'toStandard' ? 'bg-toolnest-text text-white' : 'bg-gray-200 text-toolnest-text'}`}>
                    To Standard
                  </span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-toolnest-text mb-2">
                    {conversionType === 'toScientific' ? 'Enter Standard Number' : 'Enter Scientific Notation'}
                  </label>
                  <Input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={conversionType === 'toScientific' ? 'e.g., 123000' : 'e.g., 1.23e5 or 1.23 × 10⁺5'}
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
                <p className="text-toolnest-text/80 leading-relaxed">
                  Scientific notation expresses numbers as a × 10ⁿ where 'a' is between 1 and 10, and 'n' is an integer. 
                  It's useful for very large or very small numbers. For example: 123000 = 1.23 × 10⁺5, and 0.00123 = 1.23 × 10⁻³.
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

export default ScientificNotation;
