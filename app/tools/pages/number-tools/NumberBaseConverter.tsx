
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Binary, RotateCcw, Copy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const NumberBaseConverter = () => {
  const [inputValue, setInputValue] = useState('');
  const [fromBase, setFromBase] = useState('10');
  const [result, setResult] = useState<{ binary: string; decimal: string; octal: string; hex: string } | null>(null);

  const convertFromDecimal = (decimal: number) => {
    return {
      binary: decimal.toString(2),
      decimal: decimal.toString(10),
      octal: decimal.toString(8),
      hex: decimal.toString(16).toUpperCase()
    };
  };

  const convert = () => {
    if (!inputValue.trim()) return;

    let decimal: number;
    
    try {
      switch (fromBase) {
        case '2':
          if (!/^[01]+$/.test(inputValue)) {
            setResult({ binary: 'Invalid binary', decimal: '', octal: '', hex: '' });
            return;
          }
          decimal = parseInt(inputValue, 2);
          break;
        case '8':
          if (!/^[0-7]+$/.test(inputValue)) {
            setResult({ binary: '', decimal: '', octal: 'Invalid octal', hex: '' });
            return;
          }
          decimal = parseInt(inputValue, 8);
          break;
        case '10':
          decimal = parseInt(inputValue);
          if (isNaN(decimal)) {
            setResult({ binary: '', decimal: 'Invalid decimal', octal: '', hex: '' });
            return;
          }
          break;
        case '16':
          if (!/^[0-9A-Fa-f]+$/.test(inputValue)) {
            setResult({ binary: '', decimal: '', octal: '', hex: 'Invalid hexadecimal' });
            return;
          }
          decimal = parseInt(inputValue, 16);
          break;
        default:
          return;
      }

      setResult(convertFromDecimal(decimal));
    } catch {
      setResult({ binary: 'Error', decimal: 'Error', octal: 'Error', hex: 'Error' });
    }
  };

  const reset = () => {
    setInputValue('');
    setResult(null);
  };

  const copyResult = (value: string) => {
    navigator.clipboard.writeText(value);
  };

  const getBaseName = (base: string) => {
    const names: { [key: string]: string } = {
      '2': 'Binary',
      '8': 'Octal',
      '10': 'Decimal',
      '16': 'Hexadecimal'
    };
    return names[base] || 'Unknown';
  };

  return (
    <div className="min-h-screen bg-toolnest-bg">
      <Helmet>
        <title>Number Base Converter - GrockTool</title>
        <meta name="description" content="Convert between binary, decimal, octal, and hexadecimal number systems with GrockTool's free base converter." />
        <link rel="canonical" href="https://grocktool.com/number-tools/number-base-converter" />
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
              Number Base Converter
            </h1>
            <p className="text-xl text-toolnest-text/80 max-w-2xl mx-auto">
              Convert between binary, decimal, octal, and hexadecimal
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
                  <Binary className="w-6 h-6 text-toolnest-text" />
                  Number Base Converter
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-toolnest-text mb-2">
                      From Base
                    </label>
                    <select
                      value={fromBase}
                      onChange={(e) => setFromBase(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-toolnest-text focus:border-transparent"
                    >
                      <option value="2">Binary (Base 2)</option>
                      <option value="8">Octal (Base 8)</option>
                      <option value="10">Decimal (Base 10)</option>
                      <option value="16">Hexadecimal (Base 16)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-toolnest-text mb-2">
                      Enter {getBaseName(fromBase)} Number
                    </label>
                    <Input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value.toUpperCase())}
                      placeholder={`Enter ${getBaseName(fromBase).toLowerCase()} number`}
                      className="text-lg"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button onClick={convert} className="bg-toolnest-text hover:bg-toolnest-text/90">
                    <Binary className="w-4 h-4 mr-2" />
                    Convert
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
                          <span className="text-sm font-medium text-toolnest-text/70">Binary (Base 2):</span>
                          <p className="text-lg font-bold text-toolnest-text">{result.binary}</p>
                        </div>
                        <Button onClick={() => copyResult(result.binary)} variant="outline" size="sm">
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="p-4 bg-toolnest-accent/20 rounded-lg border flex justify-between items-center">
                        <div>
                          <span className="text-sm font-medium text-toolnest-text/70">Decimal (Base 10):</span>
                          <p className="text-lg font-bold text-toolnest-text">{result.decimal}</p>
                        </div>
                        <Button onClick={() => copyResult(result.decimal)} variant="outline" size="sm">
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="p-4 bg-toolnest-accent/20 rounded-lg border flex justify-between items-center">
                        <div>
                          <span className="text-sm font-medium text-toolnest-text/70">Octal (Base 8):</span>
                          <p className="text-lg font-bold text-toolnest-text">{result.octal}</p>
                        </div>
                        <Button onClick={() => copyResult(result.octal)} variant="outline" size="sm">
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="p-4 bg-toolnest-accent/20 rounded-lg border flex justify-between items-center">
                        <div>
                          <span className="text-sm font-medium text-toolnest-text/70">Hexadecimal (Base 16):</span>
                          <p className="text-lg font-bold text-toolnest-text">{result.hex}</p>
                        </div>
                        <Button onClick={() => copyResult(result.hex)} variant="outline" size="sm">
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
                  Different number systems use different bases: Binary (base 2) uses 0-1, Octal (base 8) uses 0-7, 
                  Decimal (base 10) uses 0-9, and Hexadecimal (base 16) uses 0-9 and A-F. This converter translates 
                  between all these systems instantly.
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

export default NumberBaseConverter;
