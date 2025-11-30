'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, RotateCcw, Copy, ArrowLeft, History, Info, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function RomanNumberConverterPage() {
  const [inputValue, setInputValue] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [conversionType, setConversionType] = useState<'toRoman' | 'fromRoman'>('toRoman');
  const [error, setError] = useState<string>('');
  const [history, setHistory] = useState<{ input: string; output: string; type: string }[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  // Roman numeral values
  const romanNumerals = [
    { value: 1000, numeral: 'M' },
    { value: 900, numeral: 'CM' },
    { value: 500, numeral: 'D' },
    { value: 400, numeral: 'CD' },
    { value: 100, numeral: 'C' },
    { value: 90, numeral: 'XC' },
    { value: 50, numeral: 'L' },
    { value: 40, numeral: 'XL' },
    { value: 10, numeral: 'X' },
    { value: 9, numeral: 'IX' },
    { value: 5, numeral: 'V' },
    { value: 4, numeral: 'IV' },
    { value: 1, numeral: 'I' }
  ];

  // Convert number to Roman numeral
  const numberToRoman = (num: number): string => {
    if (num <= 0 || num > 3999) {
      throw new Error('Number must be between 1 and 3999');
    }

    let result = '';
    let remaining = num;

    for (const { value, numeral } of romanNumerals) {
      while (remaining >= value) {
        result += numeral;
        remaining -= value;
      }
    }

    return result;
  };

  // Convert Roman numeral to number
  const romanToNumber = (roman: string): number => {
    const validRomanRegex = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i;
    
    if (!validRomanRegex.test(roman)) {
      throw new Error('Invalid Roman numeral');
    }

    let result = 0;
    let i = 0;
    const upperRoman = roman.toUpperCase();

    while (i < upperRoman.length) {
      const currentChar = upperRoman[i];
      const nextChar = upperRoman[i + 1];
      let found = false;

      // Check for two-character numerals first
      for (const { value, numeral } of romanNumerals) {
        if (numeral.length === 2 && currentChar + nextChar === numeral) {
          result += value;
          i += 2;
          found = true;
          break;
        }
      }

      if (found) continue;

      // Check for single-character numerals
      for (const { value, numeral } of romanNumerals) {
        if (numeral.length === 1 && currentChar === numeral) {
          result += value;
          i += 1;
          found = true;
          break;
        }
      }

      if (!found) {
        throw new Error('Invalid Roman numeral sequence');
      }
    }

    return result;
  };

  // Perform conversion
  const convert = () => {
    setError('');
    setResult('');

    if (!inputValue.trim()) {
      setError('Please enter a value to convert');
      return;
    }

    try {
      let output = '';
      
      if (conversionType === 'toRoman') {
        const number = parseInt(inputValue);
        if (isNaN(number)) {
          throw new Error('Please enter a valid number');
        }
        output = numberToRoman(number);
        
        // Add to history
        setHistory(prev => [{
          input: inputValue,
          output: output,
          type: 'Number to Roman'
        }, ...prev.slice(0, 9)]); // Keep last 10 items
      } else {
        output = romanToNumber(inputValue.toUpperCase()).toString();
        
        // Add to history
        setHistory(prev => [{
          input: inputValue.toUpperCase(),
          output: output,
          type: 'Roman to Number'
        }, ...prev.slice(0, 9)]);
      }

      setResult(output);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Conversion failed');
    }
  };

  // Clear all fields
  const clearFields = () => {
    setInputValue('');
    setResult('');
    setError('');
  };

  // Copy result to clipboard
  const copyResult = async () => {
    if (result) {
      const text = `${conversionType === 'toRoman' ? 'Number to Roman' : 'Roman to Number'}:\nInput: ${inputValue}\nOutput: ${result}`;
      try {
        await navigator.clipboard.writeText(text);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  // Clear history
  const clearHistory = () => {
    setHistory([]);
  };

  // Sample conversions for quick testing
  const sampleConversions = [
    { number: '2024', roman: 'MMXXIV' },
    { number: '1000', roman: 'M' },
    { number: '499', roman: 'CDXCIX' },
    { number: '88', roman: 'LXXXVIII' },
    { number: '14', roman: 'XIV' }
  ];

  // Roman numeral rules
  const romanRules = [
    { numeral: 'I', value: '1' },
    { numeral: 'IV', value: '4' },
    { numeral: 'V', value: '5' },
    { numeral: 'IX', value: '9' },
    { numeral: 'X', value: '10' },
    { numeral: 'XL', value: '40' },
    { numeral: 'L', value: '50' },
    { numeral: 'XC', value: '90' },
    { numeral: 'C', value: '100' },
    { numeral: 'CD', value: '400' },
    { numeral: 'D', value: '500' },
    { numeral: 'CM', value: '900' },
    { numeral: 'M', value: '1000' }
  ];

  return (
    <div className="min-h-screen bg-background font-inter">
      <div className="pt-20 pb-8 px-4 sm:pt-24 sm:pb-12 sm:px-6 lg:pt-28">
        <div className="max-w-lg mx-auto lg:max-w-4xl">
          {/* Header */}
          <div className="mb-8 sm:mb-10">
            <Link
              href="/tool"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors group text-sm sm:text-base"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to Tools
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                Roman Number Converter
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Convert between Roman numerals and Arabic numbers with ease
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Converter */}
            <div className="lg:col-span-2 space-y-6">
              {/* Converter Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Calculator size={20} className="text-foreground" />
                    <label className="block text-sm font-medium text-foreground">
                      Roman Numeral Converter
                    </label>
                  </div>

                  {/* Conversion Type Selector */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setConversionType('toRoman')}
                      className={`p-3 rounded-lg border transition-all ${
                        conversionType === 'toRoman' 
                          ? 'bg-accent text-accent-foreground border-accent' 
                          : 'bg-secondary text-secondary-foreground border-border hover:bg-secondary/80'
                      }`}
                    >
                      <div className="flex items-center gap-2 justify-center text-sm">
                        <Calculator size={16} />
                        Number → Roman
                      </div>
                    </button>
                    <button
                      onClick={() => setConversionType('fromRoman')}
                      className={`p-3 rounded-lg border transition-all ${
                        conversionType === 'fromRoman' 
                          ? 'bg-accent text-accent-foreground border-accent' 
                          : 'bg-secondary text-secondary-foreground border-border hover:bg-secondary/80'
                      }`}
                    >
                      <div className="flex items-center gap-2 justify-center text-sm">
                        <Calculator size={16} />
                        Roman → Number
                      </div>
                    </button>
                  </div>

                  {/* Input Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      {conversionType === 'toRoman' ? 'Enter Number (1-3999)' : 'Enter Roman Numeral'}
                    </label>
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder={conversionType === 'toRoman' ? 'e.g., 2024' : 'e.g., MMXXIV'}
                      className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg font-mono"
                    />
                    <p className="text-xs text-muted-foreground">
                      {conversionType === 'toRoman' 
                        ? 'Enter a number between 1 and 3999' 
                        : 'Enter valid Roman numerals (I, V, X, L, C, D, M)'
                      }
                    </p>
                  </div>

                  {/* Error Display */}
                  {error && (
                    <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                      <p className="text-destructive text-sm text-center">{error}</p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={convert}
                      disabled={!inputValue.trim()}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent text-accent-foreground rounded-lg sm:rounded-xl hover:bg-accent/80 transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Calculator size={16} className="sm:w-4 sm:h-4" />
                      Convert
                    </button>
                    <button
                      onClick={clearFields}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg sm:rounded-xl hover:bg-secondary/80 transition-colors text-sm sm:text-base"
                    >
                      <RotateCcw size={16} className="sm:w-4 sm:h-4" />
                      Clear
                    </button>
                  </div>

                  {/* Quick Samples */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      Quick Samples
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {sampleConversions.map((sample, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            if (conversionType === 'toRoman') {
                              setInputValue(sample.number);
                            } else {
                              setInputValue(sample.roman);
                            }
                          }}
                          className="p-2 text-xs bg-secondary text-secondary-foreground rounded border border-border hover:bg-secondary/80 transition-colors text-center"
                        >
                          {conversionType === 'toRoman' ? sample.number : sample.roman}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Results Card */}
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground">Conversion Result</h3>
                    <button
                      onClick={copyResult}
                      className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Copy size={16} className="sm:w-4 sm:h-4" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {/* Main Result Display */}
                    <div className="bg-accent/10 p-6 rounded-lg border border-accent/20 text-center">
                      <div className="text-sm text-muted-foreground mb-2">
                        {conversionType === 'toRoman' ? 'Roman Numeral' : 'Arabic Number'}
                      </div>
                      <div className="text-3xl font-bold text-foreground font-mono">
                        {result}
                      </div>
                      <div className="text-xs text-muted-foreground mt-2">
                        {conversionType === 'toRoman' 
                          ? `${inputValue} in Roman numerals` 
                          : `${inputValue.toUpperCase()} in Arabic numbers`
                        }
                      </div>
                    </div>

                    {/* Conversion Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-secondary/50 p-4 rounded-lg border border-border">
                        <div className="text-sm text-muted-foreground">Input</div>
                        <div className="text-lg font-semibold text-foreground font-mono">{inputValue}</div>
                      </div>
                      <div className="bg-secondary/50 p-4 rounded-lg border border-border">
                        <div className="text-sm text-muted-foreground">Output</div>
                        <div className="text-lg font-semibold text-foreground font-mono">{result}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Roman Numerals Guide */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <BookOpen size={18} />
                  Roman Numerals Guide
                </h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
                  {romanRules.map((rule, index) => (
                    <div key={index} className="text-center p-3 bg-secondary/30 rounded-lg border border-border">
                      <div className="text-lg font-bold text-foreground font-mono">{rule.numeral}</div>
                      <div className="text-xs text-muted-foreground">= {rule.value}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-4 bg-accent/10 rounded-lg border border-accent/20">
                  <h4 className="text-sm font-medium text-foreground mb-2">Rules to Remember:</h4>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      <span>Numerals must be written from largest to smallest</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      <span>I, X, C can be repeated up to 3 times</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      <span>V, L, D cannot be repeated</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      <span>Subtraction only with I, X, C before larger numerals</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - History & Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* History Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <History size={18} />
                    Conversion History
                  </h3>
                  {history.length > 0 && (
                    <button
                      onClick={clearHistory}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {history.length === 0 ? (
                  <div className="text-center py-8">
                    <History size={32} className="mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">No conversion history yet</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {history.map((item, index) => (
                      <div key={index} className="p-3 bg-secondary/30 rounded-lg border border-border">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-medium text-foreground">{item.type}</span>
                          <span className="text-xs text-muted-foreground">{index + 1}</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Input:</span>
                            <span className="font-mono text-foreground">{item.input}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Output:</span>
                            <span className="font-mono text-foreground font-semibold">{item.output}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Info Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Info size={18} />
                  About Roman Numerals
                </h3>
                <div className="space-y-2 text-muted-foreground text-sm">
                  <p>
                    Roman numerals originated in ancient Rome and were used throughout the Roman Empire. 
                    They are still used today in various contexts like clock faces, book chapters, and movie credits.
                  </p>
                  <div className="text-xs sm:text-sm space-y-1 pt-2">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                      <span>Maximum supported number: 3999 (MMMCMXCIX)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                      <span>No concept of zero in Roman numerals</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                      <span>Case insensitive (IV = iv = Iv)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                      <span>Follows additive and subtractive principles</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm space-y-2 pt-3">
                    <div className="font-medium text-foreground">Common Uses Today:</div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      <span>Clock and watch faces</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      <span>Book volumes and chapters</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      <span>Movie release years</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      <span>Monuments and building dates</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}