
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Type, RotateCcw, Copy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const NumberToWords = () => {
  const [number, setNumber] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  const thousands = ['', 'thousand', 'million', 'billion', 'trillion'];

  const convertHundreds = (num: number): string => {
    let result = '';
    
    if (num >= 100) {
      result += ones[Math.floor(num / 100)] + ' hundred';
      num %= 100;
      if (num > 0) result += ' ';
    }
    
    if (num >= 20) {
      result += tens[Math.floor(num / 10)];
      num %= 10;
      if (num > 0) result += '-' + ones[num];
    } else if (num >= 10) {
      result += teens[num - 10];
    } else if (num > 0) {
      result += ones[num];
    }
    
    return result;
  };

  const numberToWords = (num: number): string => {
    if (num === 0) return 'zero';
    
    let result = '';
    let thousandIndex = 0;
    
    while (num > 0) {
      const chunk = num % 1000;
      if (chunk !== 0) {
        const chunkWords = convertHundreds(chunk);
        if (thousandIndex > 0) {
          result = chunkWords + ' ' + thousands[thousandIndex] + (result ? ' ' + result : '');
        } else {
          result = chunkWords;
        }
      }
      num = Math.floor(num / 1000);
      thousandIndex++;
    }
    
    return result.trim();
  };

  const convert = () => {
    const num = parseInt(number);
    if (isNaN(num)) {
      setResult('Please enter a valid number');
      return;
    }
    
    if (num < 0) {
      setResult('negative ' + numberToWords(Math.abs(num)));
    } else if (num > 999999999999999) {
      setResult('Number too large (max: 999,999,999,999,999)');
    } else {
      setResult(numberToWords(num));
    }
  };

  const reset = () => {
    setNumber('');
    setResult(null);
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(result);
    }
  };

  return (
    <div className="min-h-screen bg-toolnest-bg">
      <Helmet>
        <title>Number to Words Converter - GrockTool</title>
        <meta name="description" content="Convert numbers to written words with GrockTool's free number to words converter tool." />
        <link rel="canonical" href="https://grocktool.com/number-tools/number-to-words" />
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
              Number to Words Converter
            </h1>
            <p className="text-xl text-toolnest-text/80 max-w-2xl mx-auto">
              Convert numbers to written words instantly
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
                  <Type className="w-6 h-6 text-toolnest-text" />
                  Number to Words Converter
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-toolnest-text mb-2">
                    Enter Number
                  </label>
                  <Input
                    type="number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    placeholder="e.g., 123456"
                    className="text-lg text-center"
                  />
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button onClick={convert} className="bg-toolnest-text hover:bg-toolnest-text/90">
                    <Type className="w-4 h-4 mr-2" />
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
                    <p className="text-xl font-bold text-toolnest-text capitalize">
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
                  This tool converts numeric values into their written word equivalents using standard English number naming conventions. 
                  It supports numbers from zero up to 999 trillion and handles negative numbers as well.
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

export default NumberToWords;
