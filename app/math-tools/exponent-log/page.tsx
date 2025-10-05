'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, RotateCcw, Copy, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import Link from 'next/link';

export default function ExponentLog() {
  const [operation, setOperation] = useState('power');
  const [base, setBase] = useState('');
  const [exponent, setExponent] = useState('');
  const [number, setNumber] = useState('');
  const [logBase, setLogBase] = useState('10');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    if (operation === 'power') {
      const b = parseFloat(base);
      const e = parseFloat(exponent);
      if (isNaN(b) || isNaN(e)) {
        setResult(null);
        return;
      }
      setResult(Math.pow(b, e));
    } else if (operation === 'logarithm') {
      const n = parseFloat(number);
      const lb = parseFloat(logBase);
      if (isNaN(n) || isNaN(lb) || n <= 0 || lb <= 0 || lb === 1) {
        setResult(null);
        return;
      }
      
      if (lb === 10) {
        setResult(Math.log10(n));
      } else if (lb === Math.E) {
        setResult(Math.log(n));
      } else {
        setResult(Math.log(n) / Math.log(lb));
      }
    } else if (operation === 'natural-log') {
      const n = parseFloat(number);
      if (isNaN(n) || n <= 0) {
        setResult(null);
        return;
      }
      setResult(Math.log(n));
    } else if (operation === 'square-root') {
      const n = parseFloat(number);
      if (isNaN(n) || n < 0) {
        setResult(null);
        return;
      }
      setResult(Math.sqrt(n));
    }
  };

  const reset = () => {
    setBase('');
    setExponent('');
    setNumber('');
    setLogBase('10');
    setResult(null);
  };

  const copyResult = () => {
    if (result !== null) {
      navigator.clipboard.writeText(result.toString());
    }
  };

  return (
    <div className="min-h-screen bg-toolnest-bg">
      <main className="pt-32 pb-16 px-4">
        <div className="toolnest-container max-w-4xl mx-auto">
          <div className="mb-6">
            <Link 
              href="/tool"
              className="inline-flex items-center text-toolnest-text hover:text-toolnest-accent transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Tools
            </Link>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-toolnest-text mb-4">
              Exponent & Logarithm Calculator
            </h1>
            <p className="text-xl text-toolnest-text/80 max-w-2xl mx-auto">
              Calculate powers, logarithms, natural logs, and square roots
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
                  <Zap className="w-6 h-6 text-toolnest-text" />
                  Exponent & Logarithm Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-toolnest-text mb-2">
                    Operation
                  </label>
                  <Select value={operation} onValueChange={setOperation}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="power">Power (a^b)</SelectItem>
                      <SelectItem value="logarithm">Logarithm (log_b(n))</SelectItem>
                      <SelectItem value="natural-log">Natural Logarithm (ln(n))</SelectItem>
                      <SelectItem value="square-root">Square Root (√n)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {operation === 'power' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-toolnest-text mb-2">
                        Base (a)
                      </label>
                      <Input
                        type="number"
                        value={base}
                        onChange={(e) => setBase(e.target.value)}
                        placeholder="e.g., 2"
                        className="text-lg text-center"
                        step="any"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-toolnest-text mb-2">
                        Exponent (b)
                      </label>
                      <Input
                        type="number"
                        value={exponent}
                        onChange={(e) => setExponent(e.target.value)}
                        placeholder="e.g., 3"
                        className="text-lg text-center"
                        step="any"
                      />
                    </div>
                  </div>
                )}

                {operation === 'logarithm' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-toolnest-text mb-2">
                        Number (n)
                      </label>
                      <Input
                        type="number"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        placeholder="e.g., 100"
                        className="text-lg text-center"
                        step="any"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-toolnest-text mb-2">
                        Base (b)
                      </label>
                      <Select value={logBase} onValueChange={setLogBase}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10 (Common Log)</SelectItem>
                          <SelectItem value="2.718281828459045">e (Natural Log)</SelectItem>
                          <SelectItem value="2">2 (Binary Log)</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                      {logBase === 'custom' && (
                        <Input
                          type="number"
                          value={logBase}
                          onChange={(e) => setLogBase(e.target.value)}
                          placeholder="Enter custom base"
                          className="text-lg text-center mt-2"
                          step="any"
                        />
                      )}
                    </div>
                  </div>
                )}

                {(operation === 'natural-log' || operation === 'square-root') && (
                  <div>
                    <label className="block text-sm font-medium text-toolnest-text mb-2">
                      Number (n)
                    </label>
                    <Input
                      type="number"
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                      placeholder={operation === 'square-root' ? 'e.g., 16' : 'e.g., 2.718'}
                      className="text-lg text-center"
                      step="any"
                    />
                  </div>
                )}

                <div className="flex flex-wrap gap-3">
                  <Button onClick={calculate} className="bg-toolnest-text hover:bg-toolnest-text/90">
                    <Zap className="w-4 h-4 mr-2" />
                    Calculate
                  </Button>
                  <Button onClick={reset} variant="outline">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                  {result !== null && (
                    <Button onClick={copyResult} variant="outline">
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Result
                    </Button>
                  )}
                </div>

                {result !== null && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-6 p-4 bg-toolnest-accent/20 rounded-lg border"
                  >
                    <h3 className="text-lg font-semibold text-toolnest-text mb-2">Result:</h3>
                    <p className="text-3xl font-bold text-toolnest-text font-mono">
                      {result.toFixed(8)}
                    </p>
                    
                    <div className="mt-3 text-sm text-toolnest-text/70">
                      {operation === 'power' && base && exponent && (
                        <p>Formula: {base}^{exponent} = {result.toFixed(8)}</p>
                      )}
                      {operation === 'logarithm' && number && logBase && (
                        <p>Formula: log_{logBase}({number}) = {result.toFixed(8)}</p>
                      )}
                      {operation === 'natural-log' && number && (
                        <p>Formula: ln({number}) = {result.toFixed(8)}</p>
                      )}
                      {operation === 'square-root' && number && (
                        <p>Formula: √{number} = {result.toFixed(8)}</p>
                      )}
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
                  This calculator handles exponential and logarithmic operations. Powers calculate a^b, 
                  logarithms find the exponent that gives a result (log_b(n) = x means b^x = n), 
                  natural logarithms use base e, and square roots find the value that when squared equals the input.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}