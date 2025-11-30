'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, RotateCcw, Copy, ArrowLeft, History, Binary, Hash, Code, Cpu } from 'lucide-react';
import Link from 'next/link';

export default function BaseConverterPage() {
  const [inputValue, setInputValue] = useState<string>('');
  const [fromBase, setFromBase] = useState<number>(10);
  const [toBase, setToBase] = useState<number>(2);
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [history, setHistory] = useState<{ input: string; fromBase: number; toBase: number; result: string }[]>([]);
  const [showSteps, setShowSteps] = useState<boolean>(false);
  const [conversionSteps, setConversionSteps] = useState<string[]>([]);

  // Common bases with labels
  const commonBases = [
    { value: 2, label: 'Binary (2)', icon: <Binary size={16} /> },
    { value: 8, label: 'Octal (8)', icon: <Hash size={16} /> },
    { value: 10, label: 'Decimal (10)', icon: <Calculator size={16} /> },
    { value: 16, label: 'Hexadecimal (16)', icon: <Code size={16} /> },
    { value: 32, label: 'Base32 (32)', icon: <Cpu size={16} /> },
    { value: 64, label: 'Base64 (64)', icon: <Cpu size={16} /> }
  ];

  // All supported bases (2-36)
  const allBases = Array.from({ length: 35 }, (_, i) => i + 2);

  // Character sets for different bases
  const getCharSet = (base: number): string => {
    if (base <= 10) return '0123456789'.slice(0, base);
    if (base <= 36) return '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.slice(0, base);
    return '';
  };

  // Validate input for given base
  const validateInput = (value: string, base: number): boolean => {
    if (!value) return false;
    
    const charSet = getCharSet(base);
    const validChars = new Set(charSet);
    
    return value.toUpperCase().split('').every(char => validChars.has(char));
  };

  // Convert from any base to decimal
  const toDecimal = (value: string, base: number): number => {
    const charSet = getCharSet(base);
    let decimal = 0;
    
    for (let i = 0; i < value.length; i++) {
      const char = value[value.length - 1 - i].toUpperCase();
      const digitValue = charSet.indexOf(char);
      decimal += digitValue * Math.pow(base, i);
    }
    
    return decimal;
  };

  // Convert from decimal to any base
  const fromDecimal = (decimal: number, base: number): string => {
    if (decimal === 0) return '0';
    
    const charSet = getCharSet(base);
    let result = '';
    let num = decimal;
    
    while (num > 0) {
      const remainder = num % base;
      result = charSet[remainder] + result;
      num = Math.floor(num / base);
    }
    
    return result;
  };

  // Generate conversion steps
  const generateSteps = (value: string, fromBase: number, toBase: number): string[] => {
    const steps: string[] = [];
    
    if (fromBase === toBase) {
      steps.push(`Same base conversion: ${value} (base ${fromBase}) = ${value} (base ${toBase})`);
      return steps;
    }

    if (fromBase !== 10) {
      const decimalValue = toDecimal(value, fromBase);
      steps.push(`Convert from base ${fromBase} to decimal:`);
      steps.push(`${value} (base ${fromBase}) = ${decimalValue} (base 10)`);
      
      if (toBase === 10) {
        return steps;
      }
      
      const result = fromDecimal(decimalValue, toBase);
      steps.push(`Convert from decimal to base ${toBase}:`);
      steps.push(`${decimalValue} (base 10) = ${result} (base ${toBase})`);
    } else {
      const decimalValue = parseInt(value, 10);
      const result = fromDecimal(decimalValue, toBase);
      steps.push(`Convert from decimal to base ${toBase}:`);
      steps.push(`${value} (base 10) = ${result} (base ${toBase})`);
    }
    
    return steps;
  };

  // Perform conversion
  const convert = () => {
    setError('');
    setResult('');
    setConversionSteps([]);

    if (!inputValue.trim()) {
      setError('Please enter a value to convert');
      return;
    }

    if (!validateInput(inputValue, fromBase)) {
      setError(`Invalid input for base ${fromBase}. Valid characters: ${getCharSet(fromBase)}`);
      return;
    }

    try {
      let convertedValue = '';
      
      if (fromBase === toBase) {
        convertedValue = inputValue.toUpperCase();
      } else if (fromBase === 10) {
        const decimalValue = parseInt(inputValue, 10);
        convertedValue = fromDecimal(decimalValue, toBase);
      } else if (toBase === 10) {
        convertedValue = toDecimal(inputValue, fromBase).toString();
      } else {
        // Convert via decimal
        const decimalValue = toDecimal(inputValue, fromBase);
        convertedValue = fromDecimal(decimalValue, toBase);
      }

      setResult(convertedValue.toUpperCase());
      
      // Generate and set conversion steps
      const steps = generateSteps(inputValue, fromBase, toBase);
      setConversionSteps(steps);

      // Add to history
      setHistory(prev => [{
        input: inputValue,
        fromBase,
        toBase,
        result: convertedValue.toUpperCase()
      }, ...prev.slice(0, 9)]);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Conversion failed');
    }
  };

  // Clear all fields
  const clearFields = () => {
    setInputValue('');
    setResult('');
    setError('');
    setConversionSteps([]);
  };

  // Copy result to clipboard
  const copyResult = async () => {
    if (result) {
      const text = `Base Conversion:\nInput: ${inputValue} (base ${fromBase})\nOutput: ${result} (base ${toBase})`;
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

  // Swap bases
  const swapBases = () => {
    setFromBase(toBase);
    setToBase(fromBase);
    setInputValue(result);
    setResult('');
    setConversionSteps([]);
  };

  // Common conversions for quick testing
  const commonConversions = [
    { input: '255', fromBase: 10, toBase: 16, label: '255 → HEX' },
    { input: 'FF', fromBase: 16, toBase: 10, label: 'FF → DEC' },
    { input: '1010', fromBase: 2, toBase: 10, label: '1010 → DEC' },
    { input: '10', fromBase: 10, toBase: 2, label: '10 → BIN' },
    { input: '777', fromBase: 8, toBase: 10, label: '777 → DEC' },
    { input: '100', fromBase: 10, toBase: 8, label: '100 → OCT' }
  ];

  // Sample values for different bases
  const sampleValues = {
    2: ['1010', '11011', '11111111', '1001'],
    8: ['12', '77', '123', '777'],
    10: ['10', '255', '1000', '4096'],
    16: ['A', 'FF', '1F4', '1000'],
    32: ['10', 'VV', '100'],
    64: ['AQ', 'Qg']
  };

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
                Base Converter
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Convert numbers between different bases (Binary, Decimal, Hexadecimal, and more)
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
                      Base Converter
                    </label>
                  </div>

                  {/* Base Selection Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* From Base */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-foreground">
                          From Base
                        </label>
                        
                        {/* Common Bases */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
                          {commonBases.map((base) => (
                            <button
                              key={base.value}
                              onClick={() => setFromBase(base.value)}
                              className={`p-2 rounded-lg border transition-all text-xs ${
                                fromBase === base.value 
                                  ? 'bg-accent text-accent-foreground border-accent' 
                                  : 'bg-secondary text-secondary-foreground border-border hover:bg-secondary/80'
                              }`}
                            >
                              <div className="flex items-center gap-1 justify-center">
                                {base.icon}
                                {base.value}
                              </div>
                            </button>
                          ))}
                        </div>

                        {/* All Bases Select */}
                        <select
                          value={fromBase}
                          onChange={(e) => setFromBase(parseInt(e.target.value))}
                          className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-sm"
                        >
                          {allBases.map((base) => (
                            <option key={base} value={base}>
                              Base {base} ({getCharSet(base)})
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Input Field */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-foreground">
                          Input Value (Base {fromBase})
                        </label>
                        <input
                          type="text"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          placeholder={`Enter value in base ${fromBase}`}
                          className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg font-mono"
                        />
                        <p className="text-xs text-muted-foreground">
                          Valid characters: {getCharSet(fromBase)}
                        </p>
                      </div>
                    </div>

                    {/* To Base */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-foreground">
                          To Base
                        </label>
                        
                        {/* Common Bases */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
                          {commonBases.map((base) => (
                            <button
                              key={base.value}
                              onClick={() => setToBase(base.value)}
                              className={`p-2 rounded-lg border transition-all text-xs ${
                                toBase === base.value 
                                  ? 'bg-accent text-accent-foreground border-accent' 
                                  : 'bg-secondary text-secondary-foreground border-border hover:bg-secondary/80'
                              }`}
                            >
                              <div className="flex items-center gap-1 justify-center">
                                {base.icon}
                                {base.value}
                              </div>
                            </button>
                          ))}
                        </div>

                        {/* All Bases Select */}
                        <select
                          value={toBase}
                          onChange={(e) => setToBase(parseInt(e.target.value))}
                          className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-sm"
                        >
                          {allBases.map((base) => (
                            <option key={base} value={base}>
                              Base {base} ({getCharSet(base)})
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Swap Button */}
                      <button
                        onClick={swapBases}
                        className="w-full p-3 bg-secondary text-secondary-foreground rounded-lg border border-border hover:bg-secondary/80 transition-colors text-sm"
                      >
                        ↕ Swap Bases
                      </button>
                    </div>
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

                  {/* Quick Conversions */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      Quick Conversions
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {commonConversions.map((conv, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setInputValue(conv.input);
                            setFromBase(conv.fromBase);
                            setToBase(conv.toBase);
                          }}
                          className="p-2 text-xs bg-secondary text-secondary-foreground rounded border border-border hover:bg-secondary/80 transition-colors text-center"
                        >
                          {conv.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sample Values */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      Sample Values (Base {fromBase})
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {(sampleValues[fromBase as keyof typeof sampleValues] || []).map((value, index) => (
                        <button
                          key={index}
                          onClick={() => setInputValue(value)}
                          className="px-3 py-1 text-xs bg-secondary text-secondary-foreground rounded border border-border hover:bg-secondary/80 transition-colors"
                        >
                          {value}
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
                    <div className="flex gap-2">
                      <button
                        onClick={() => setShowSteps(!showSteps)}
                        className="p-2 text-muted-foreground hover:text-foreground transition-colors text-xs"
                      >
                        {showSteps ? 'Hide Steps' : 'Show Steps'}
                      </button>
                      <button
                        onClick={copyResult}
                        className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Copy size={16} className="sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Main Result Display */}
                    <div className="bg-accent/10 p-6 rounded-lg border border-accent/20 text-center">
                      <div className="text-sm text-muted-foreground mb-2">
                        Base {toBase} Result
                      </div>
                      <div className="text-3xl font-bold text-foreground font-mono break-all">
                        {result}
                      </div>
                      <div className="text-xs text-muted-foreground mt-2">
                        Converted from {inputValue} (base {fromBase})
                      </div>
                    </div>

                    {/* Conversion Steps */}
                    {showSteps && conversionSteps.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-foreground">Conversion Steps</h4>
                        <div className="bg-secondary/30 p-4 rounded-lg border border-border">
                          <div className="space-y-2 text-sm">
                            {conversionSteps.map((step, index) => (
                              <div key={index} className="font-mono text-foreground">
                                {step}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Conversion Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-secondary/50 p-4 rounded-lg border border-border">
                        <div className="text-sm text-muted-foreground">Input</div>
                        <div className="text-lg font-semibold text-foreground font-mono">
                          {inputValue} <span className="text-muted-foreground">(base {fromBase})</span>
                        </div>
                      </div>
                      <div className="bg-secondary/50 p-4 rounded-lg border border-border">
                        <div className="text-sm text-muted-foreground">Output</div>
                        <div className="text-lg font-semibold text-foreground font-mono">
                          {result} <span className="text-muted-foreground">(base {toBase})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Base Systems Guide */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Cpu size={18} />
                  Number Systems Guide
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {commonBases.map((base) => (
                    <div key={base.value} className="p-4 bg-secondary/30 rounded-lg border border-border">
                      <div className="flex items-center gap-2 mb-2">
                        {base.icon}
                        <span className="font-semibold text-foreground">{base.label}</span>
                      </div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div>Characters: {getCharSet(base.value)}</div>
                        <div>Uses: {getBaseUses(base.value)}</div>
                      </div>
                    </div>
                  ))}
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
                          <span className="text-xs font-medium text-foreground">
                            Base {item.fromBase} → Base {item.toBase}
                          </span>
                          <span className="text-xs text-muted-foreground">{index + 1}</span>
                        </div>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Input:</span>
                            <span className="font-mono text-foreground">{item.input}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Output:</span>
                            <span className="font-mono text-foreground font-semibold">{item.result}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Quick Reference */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <h3 className="text-base font-semibold text-foreground mb-3">Quick Reference</h3>
                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-secondary/30 rounded text-center">
                      <div className="font-mono text-foreground">A</div>
                      <div className="text-xs text-muted-foreground">= 10</div>
                    </div>
                    <div className="p-2 bg-secondary/30 rounded text-center">
                      <div className="font-mono text-foreground">F</div>
                      <div className="text-xs text-muted-foreground">= 15</div>
                    </div>
                    <div className="p-2 bg-secondary/30 rounded text-center">
                      <div className="font-mono text-foreground">10</div>
                      <div className="text-xs text-muted-foreground">= 16</div>
                    </div>
                    <div className="p-2 bg-secondary/30 rounded text-center">
                      <div className="font-mono text-foreground">FF</div>
                      <div className="text-xs text-muted-foreground">= 255</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Info Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">About Base Conversion</h3>
                <div className="space-y-2 text-muted-foreground text-sm">
                  <p>
                    Convert numbers between different numeral systems (bases) used in computing, 
                    mathematics, and digital electronics.
                  </p>
                  <div className="text-xs sm:text-sm space-y-1 pt-2">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                      <span>Supports bases from 2 to 36</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                      <span>Step-by-step conversion explanation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                      <span>Input validation for each base</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                      <span>Quick swap between bases</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm space-y-2 pt-3">
                    <div className="font-medium text-foreground">Common Uses:</div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      <span>Computer programming and debugging</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      <span>Digital electronics and circuit design</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      <span>Cryptography and data encoding</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      <span>Mathematics and number theory</span>
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

// Helper function to describe base uses
function getBaseUses(base: number): string {
  switch (base) {
    case 2: return 'Computers, binary logic';
    case 8: return 'Unix permissions, shorthand';
    case 10: return 'Everyday mathematics';
    case 16: return 'Programming, memory addresses';
    case 32: return 'Data encoding, URLs';
    case 64: return 'Data encoding, emails';
    default: return 'Specialized applications';
  }
}