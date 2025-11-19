'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, RotateCcw, Delete, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function BasicCalculatorPage() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = performCalculation(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const performCalculation = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case '+': return firstValue + secondValue;
      case '-': return firstValue - secondValue;
      case '×': return firstValue * secondValue;
      case '÷': return firstValue / secondValue;
      case '=': return secondValue;
      default: return secondValue;
    }
  };

  const calculate = () => {
    const inputValue = parseFloat(display);
    
    if (previousValue !== null && operation) {
      const newValue = performCalculation(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const backspace = () => {
    if (!waitingForOperand) {
      setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  return (
    <div className="min-h-screen bg-background font-inter">
      <div className="pt-20 pb-8 px-4 sm:pt-24 sm:pb-12 sm:px-6 lg:pt-28">
        <div className="max-w-lg mx-auto lg:max-w-2xl">
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
                Basic Calculator
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Perform basic arithmetic operations with our easy-to-use calculator
              </p>
            </motion.div>
          </div>

          {/* Calculator Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 mb-6 shadow-sm"
          >
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center gap-2">
                <Calculator size={20} className="text-foreground" />
                <label className="block text-sm font-medium text-foreground">
                  Calculator
                </label>
              </div>

              {/* Display */}
              <div className="bg-input border border-border rounded-lg p-4">
                <div className="text-right text-2xl sm:text-3xl font-mono text-foreground min-h-[48px] flex items-center justify-end">
                  {display}
                </div>
              </div>

              {/* Button Grid */}
              <div className="grid grid-cols-4 gap-3">
                {/* Row 1 */}
                <button
                  onClick={clear}
                  className="col-span-2 flex items-center justify-center gap-2 px-3 py-4 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-sm font-medium"
                >
                  <RotateCcw size={16} />
                  Clear
                </button>
                <button
                  onClick={backspace}
                  className="flex items-center justify-center px-3 py-4 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                >
                  <Delete size={16} />
                </button>
                <button
                  onClick={() => inputOperation('÷')}
                  className="flex items-center justify-center px-3 py-4 bg-accent text-accent-foreground rounded-lg hover:bg-accent/80 transition-colors text-lg font-medium"
                >
                  ÷
                </button>

                {/* Row 2 */}
                <button
                  onClick={() => inputNumber('7')}
                  className="flex items-center justify-center px-3 py-4 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-lg font-medium"
                >
                  7
                </button>
                <button
                  onClick={() => inputNumber('8')}
                  className="flex items-center justify-center px-3 py-4 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-lg font-medium"
                >
                  8
                </button>
                <button
                  onClick={() => inputNumber('9')}
                  className="flex items-center justify-center px-3 py-4 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-lg font-medium"
                >
                  9
                </button>
                <button
                  onClick={() => inputOperation('×')}
                  className="flex items-center justify-center px-3 py-4 bg-accent text-accent-foreground rounded-lg hover:bg-accent/80 transition-colors text-lg font-medium"
                >
                  ×
                </button>

                {/* Row 3 */}
                <button
                  onClick={() => inputNumber('4')}
                  className="flex items-center justify-center px-3 py-4 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-lg font-medium"
                >
                  4
                </button>
                <button
                  onClick={() => inputNumber('5')}
                  className="flex items-center justify-center px-3 py-4 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-lg font-medium"
                >
                  5
                </button>
                <button
                  onClick={() => inputNumber('6')}
                  className="flex items-center justify-center px-3 py-4 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-lg font-medium"
                >
                  6
                </button>
                <button
                  onClick={() => inputOperation('-')}
                  className="flex items-center justify-center px-3 py-4 bg-accent text-accent-foreground rounded-lg hover:bg-accent/80 transition-colors text-lg font-medium"
                >
                  -
                </button>

                {/* Row 4 */}
                <button
                  onClick={() => inputNumber('1')}
                  className="flex items-center justify-center px-3 py-4 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-lg font-medium"
                >
                  1
                </button>
                <button
                  onClick={() => inputNumber('2')}
                  className="flex items-center justify-center px-3 py-4 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-lg font-medium"
                >
                  2
                </button>
                <button
                  onClick={() => inputNumber('3')}
                  className="flex items-center justify-center px-3 py-4 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-lg font-medium"
                >
                  3
                </button>
                <button
                  onClick={() => inputOperation('+')}
                  className="flex items-center justify-center px-3 py-4 bg-accent text-accent-foreground rounded-lg hover:bg-accent/80 transition-colors text-lg font-medium"
                >
                  +
                </button>

                {/* Row 5 */}
                <button
                  onClick={() => inputNumber('0')}
                  className="col-span-2 flex items-center justify-center px-3 py-4 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-lg font-medium"
                >
                  0
                </button>
                <button
                  onClick={inputDecimal}
                  className="flex items-center justify-center px-3 py-4 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-lg font-medium"
                >
                  .
                </button>
                <button
                  onClick={calculate}
                  className="flex items-center justify-center px-3 py-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-lg font-medium"
                >
                  =
                </button>
              </div>
            </div>
          </motion.div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
          >
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">How This Calculator Works</h3>
            <div className="space-y-2 text-muted-foreground text-sm">
              <p>
                This basic calculator performs standard arithmetic operations including addition, subtraction, 
                multiplication, and division with a clean, intuitive interface.
              </p>
              <div className="text-xs sm:text-sm space-y-1 pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Click number buttons to input values</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Select arithmetic operations (+, -, ×, ÷)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Press equals (=) to calculate the result</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Use Clear button to reset the calculator</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Backspace button removes the last digit</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Supported Operations:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Addition (+):</strong> Add two or more numbers</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Subtraction (-):</strong> Subtract one number from another</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Multiplication (×):</strong> Multiply numbers together</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Division (÷):</strong> Divide one number by another</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Decimal Numbers:</strong> Use dot (.) for decimal points</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Keyboard Shortcuts:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                  <span><strong>Enter:</strong> Calculate result (equals)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                  <span><strong>Escape:</strong> Clear calculator</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                  <span><strong>Backspace:</strong> Remove last digit</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                  <span><strong>Number keys:</strong> Input numbers 0-9</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                  <span><strong>Operator keys:</strong> +, -, *, / for operations</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}