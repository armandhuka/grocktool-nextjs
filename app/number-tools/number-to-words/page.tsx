'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, RotateCcw, Copy, ArrowLeft, History, BookOpen, Languages, FileText } from 'lucide-react';
import Link from 'next/link';

export default function NumberToWordsPage() {
  const [inputValue, setInputValue] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [language, setLanguage] = useState<'en' | 'en-IN'>('en');
  const [currency, setCurrency] = useState<boolean>(false);
  const [decimalPlaces, setDecimalPlaces] = useState<number>(2);
  const [error, setError] = useState<string>('');
  const [history, setHistory] = useState<{ input: string; output: string; language: string }[]>([]);

  // Number to words conversion functions
  const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  
  // Indian numbering system
  const indianUnits = ['', 'Thousand', 'Lakh', 'Crore', 'Arab', 'Kharab'];
  const internationalUnits = ['', 'Thousand', 'Million', 'Billion', 'Trillion'];

  const convertHundreds = (num: number): string => {
    if (num === 0) return '';
    
    let result = '';
    
    // Hundreds place
    if (num >= 100) {
      result += units[Math.floor(num / 100)] + ' Hundred ';
      num %= 100;
    }
    
    // Tens and ones place
    if (num >= 20) {
      result += tens[Math.floor(num / 10)] + ' ';
      num %= 10;
    } else if (num >= 10) {
      result += teens[num - 10] + ' ';
      num = 0;
    }
    
    // Ones place
    if (num > 0) {
      result += units[num] + ' ';
    }
    
    return result.trim();
  };

  const convertNumberToWords = (num: number, system: 'en' | 'en-IN' = 'en'): string => {
    if (num === 0) return 'Zero';
    if (num < 0) return 'Minus ' + convertNumberToWords(-num, system);
    
    let words = '';
    const units = system === 'en-IN' ? indianUnits : internationalUnits;
    const unitValues = system === 'en-IN' ? [1000, 100, 100, 100, 100] : [1000, 1000, 1000, 1000, 1000];
    
    let remaining = num;
    
    for (let i = units.length - 1; i >= 0; i--) {
      if (system === 'en-IN' && i === 1) {
        // Lakh calculation for Indian system
        const lakhValue = Math.floor(remaining / 100000);
        if (lakhValue > 0) {
          words += convertHundreds(lakhValue) + ' Lakh ';
          remaining %= 100000;
        }
      } else if (system === 'en-IN' && i === 2) {
        // Crore calculation for Indian system
        const croreValue = Math.floor(remaining / 10000000);
        if (croreValue > 0) {
          words += convertHundreds(croreValue) + ' Crore ';
          remaining %= 10000000;
        }
      } else {
        const unitValue = unitValues[i];
        const currentUnit = Math.floor(remaining / unitValue);
        
        if (currentUnit > 0) {
          words += convertHundreds(currentUnit) + ' ' + units[i] + ' ';
          remaining %= unitValue;
        }
      }
    }
    
    // Handle remaining hundreds
    if (remaining > 0) {
      words += convertHundreds(remaining);
    }
    
    return words.trim().replace(/\s+/g, ' ');
  };

  const convertDecimalToWords = (decimal: number): string => {
    const decimalStr = decimal.toString().padEnd(2, '0');
    const tensDigit = parseInt(decimalStr[0]);
    const onesDigit = parseInt(decimalStr[1]);
    
    if (tensDigit === 0 && onesDigit === 0) return '';
    if (tensDigit === 0) return units[onesDigit];
    if (tensDigit === 1) return teens[onesDigit];
    
    return tens[tensDigit] + (onesDigit > 0 ? ' ' + units[onesDigit] : '');
  };

  const convertToCurrency = (num: number, system: 'en' | 'en-IN' = 'en'): string => {
    const mainUnit = system === 'en-IN' ? 'Rupee' : 'Dollar';
    const subUnit = system === 'en-IN' ? 'Paise' : 'Cent';
    
    const wholePart = Math.floor(num);
    const decimalPart = Math.round((num - wholePart) * 100);
    
    let result = convertNumberToWords(wholePart, system) + ' ' + mainUnit;
    
    if (decimalPart > 0) {
      result += ' and ' + convertDecimalToWords(decimalPart) + ' ' + subUnit;
    }
    
    return result;
  };

  // Perform conversion
  const convert = () => {
    setError('');
    setResult('');

    if (!inputValue.trim()) {
      setError('Please enter a number to convert');
      return;
    }

    try {
      const number = parseFloat(inputValue.replace(/,/g, ''));
      
      if (isNaN(number)) {
        throw new Error('Please enter a valid number');
      }

      if (Math.abs(number) > 999999999999999) {
        throw new Error('Number is too large to convert');
      }

      let output = '';
      
      if (currency) {
        output = convertToCurrency(number, language);
      } else {
        output = convertNumberToWords(number, language);
        
        // Add decimal part if needed
        if (decimalPlaces > 0 && number % 1 !== 0) {
          const decimalPart = Math.round((number % 1) * Math.pow(10, decimalPlaces));
          if (decimalPart > 0) {
            output += ' Point ' + convertDecimalToWords(decimalPart);
          }
        }
      }

      // Capitalize first letter
      output = output.charAt(0).toUpperCase() + output.slice(1);
      
      setResult(output);
      
      // Add to history
      setHistory(prev => [{
        input: formatNumber(number),
        output: output,
        language: language === 'en' ? 'International' : 'Indian'
      }, ...prev.slice(0, 9)]);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Conversion failed');
    }
  };

  // Format number with commas
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('en-IN').format(num);
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
      const text = `Number to Words:\nInput: ${inputValue}\nOutput: ${result}`;
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

  // Sample numbers for quick testing
  const sampleNumbers = [
    '0',
    '123',
    '1000',
    '12345',
    '100000',
    '1234567',
    '10000000',
    '123.45',
    '999999999'
  ];

  // Number ranges for testing
  const numberRanges = [
    { label: 'Units', examples: ['1', '7', '9'] },
    { label: 'Teens', examples: ['10', '15', '19'] },
    { label: 'Tens', examples: ['20', '45', '99'] },
    { label: 'Hundreds', examples: ['100', '456', '999'] },
    { label: 'Thousands', examples: ['1000', '7890', '9999'] },
    { label: 'Lakhs/Crores', examples: ['100000', '1234567', '99999999'] }
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
                Number to Words Converter
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Convert numbers to words in different formats and languages
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
                      Number to Words Converter
                    </label>
                  </div>

                  {/* Settings Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Language/System Selector */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">
                        Number System
                      </label>
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value as 'en' | 'en-IN')}
                        className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-sm"
                      >
                        <option value="en">International</option>
                        <option value="en-IN">Indian</option>
                      </select>
                    </div>

                    {/* Currency Toggle */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">
                        Output Type
                      </label>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setCurrency(false)}
                          className={`flex-1 p-3 rounded-lg border transition-all text-sm ${
                            !currency 
                              ? 'bg-accent text-accent-foreground border-accent' 
                              : 'bg-secondary text-secondary-foreground border-border hover:bg-secondary/80'
                          }`}
                        >
                          Words
                        </button>
                        <button
                          onClick={() => setCurrency(true)}
                          className={`flex-1 p-3 rounded-lg border transition-all text-sm ${
                            currency 
                              ? 'bg-accent text-accent-foreground border-accent' 
                              : 'bg-secondary text-secondary-foreground border-border hover:bg-secondary/80'
                          }`}
                        >
                          Currency
                        </button>
                      </div>
                    </div>

                    {/* Decimal Places */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">
                        Decimal Places
                      </label>
                      <select
                        value={decimalPlaces}
                        onChange={(e) => setDecimalPlaces(parseInt(e.target.value))}
                        className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-sm"
                      >
                        <option value="0">No decimals</option>
                        <option value="1">1 decimal</option>
                        <option value="2">2 decimals</option>
                        <option value="3">3 decimals</option>
                      </select>
                    </div>
                  </div>

                  {/* Input Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      Enter Number
                    </label>
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="e.g., 1234567.89"
                      className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg font-mono"
                    />
                    <p className="text-xs text-muted-foreground">
                      Enter any number up to 999 trillion (999,999,999,999,999)
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
                      Convert to Words
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
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {sampleNumbers.map((number, index) => (
                        <button
                          key={index}
                          onClick={() => setInputValue(number)}
                          className="p-2 text-xs bg-secondary text-secondary-foreground rounded border border-border hover:bg-secondary/80 transition-colors text-center"
                        >
                          {number}
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
                    <div className="bg-accent/10 p-6 rounded-lg border border-accent/20">
                      <div className="text-sm text-muted-foreground mb-2 text-center">
                        {currency ? 'Currency in Words' : 'Number in Words'}
                      </div>
                      <div className="text-xl font-bold text-foreground text-center leading-relaxed">
                        {result}
                      </div>
                      <div className="text-xs text-muted-foreground mt-2 text-center">
                        {language === 'en' ? 'International System' : 'Indian Number System'} • 
                        {currency ? ' Currency Format' : ' Word Format'}
                      </div>
                    </div>

                    {/* Conversion Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-secondary/50 p-4 rounded-lg border border-border">
                        <div className="text-sm text-muted-foreground">Input Number</div>
                        <div className="text-lg font-semibold text-foreground font-mono">
                          {formatNumber(parseFloat(inputValue.replace(/,/g, '')))}
                        </div>
                      </div>
                      <div className="bg-secondary/50 p-4 rounded-lg border border-border">
                        <div className="text-sm text-muted-foreground">Output Format</div>
                        <div className="text-lg font-semibold text-foreground">
                          {language === 'en' ? 'International' : 'Indian'} {currency ? 'Currency' : 'Words'}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Number Systems Guide */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Languages size={18} />
                  Number Systems Guide
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* International System */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-foreground">International System</h4>
                    <div className="space-y-2 text-sm">
                      {[
                        { value: '1', name: 'One' },
                        { value: '1,000', name: 'Thousand' },
                        { value: '1,000,000', name: 'Million' },
                        { value: '1,000,000,000', name: 'Billion' },
                        { value: '1,000,000,000,000', name: 'Trillion' }
                      ].map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-secondary/30 rounded">
                          <span className="font-mono text-foreground">{item.value}</span>
                          <span className="text-muted-foreground">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Indian System */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-foreground">Indian System</h4>
                    <div className="space-y-2 text-sm">
                      {[
                        { value: '1', name: 'One' },
                        { value: '1,000', name: 'Thousand' },
                        { value: '1,00,000', name: 'Lakh' },
                        { value: '1,00,00,000', name: 'Crore' },
                        { value: '1,00,00,00,000', name: 'Arab' }
                      ].map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-secondary/30 rounded">
                          <span className="font-mono text-foreground">{item.value}</span>
                          <span className="text-muted-foreground">{item.name}</span>
                        </div>
                      ))}
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
                          <span className="text-xs font-medium text-foreground">{item.language} System</span>
                          <span className="text-xs text-muted-foreground">{index + 1}</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Number:</span>
                            <span className="font-mono text-foreground">{item.input}</span>
                          </div>
                          <div className="text-xs text-foreground truncate" title={item.output}>
                            {item.output}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Number Ranges Examples */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
                  <FileText size={18} />
                  Number Ranges Examples
                </h3>
                <div className="space-y-3">
                  {numberRanges.map((range, index) => (
                    <div key={index} className="space-y-1">
                      <div className="text-sm font-medium text-foreground">{range.label}</div>
                      <div className="flex gap-2 flex-wrap">
                        {range.examples.map((example, exampleIndex) => (
                          <button
                            key={exampleIndex}
                            onClick={() => setInputValue(example)}
                            className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded border border-border hover:bg-secondary/80 transition-colors"
                          >
                            {example}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Info Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <BookOpen size={18} />
                  About Number to Words
                </h3>
                <div className="space-y-2 text-muted-foreground text-sm">
                  <p>
                    Convert numbers to their word representation for checks, legal documents, 
                    financial transactions, and educational purposes.
                  </p>
                  <div className="text-xs sm:text-sm space-y-1 pt-2">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                      <span>Supports numbers up to 999 trillion</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                      <span>International and Indian numbering systems</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                      <span>Currency conversion with proper formatting</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                      <span>Decimal number support</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm space-y-2 pt-3">
                    <div className="font-medium text-foreground">Common Uses:</div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      <span>Bank checks and financial documents</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      <span>Legal agreements and contracts</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      <span>Invoice and receipt generation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      <span>Educational and learning purposes</span>
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