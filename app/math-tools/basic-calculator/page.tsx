'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Calculator, RotateCcw, Delete, ArrowLeft, ChevronUp, ChevronDown, Percent, Target, PieChart, TrendingUp, Zap, Hash, Square, Triangle, Circle, BarChart, Divide, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function BasicCalculatorPage() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [calculationHistory, setCalculationHistory] = useState<{ expression: string; result: string }[]>([]);
  const [memory, setMemory] = useState<number>(0);
  const [openSections, setOpenSections] = useState({
    whatItDoes: false,
    useCases: false,
    howToUse: false,
    examples: false,
    faqs: false,
    relatedTools: false
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Related tools for Math Tools category
  const relatedTools = [
    { name: 'Prime Number Checker', path: '/math-tools/prime-checker', icon: Target },
    { name: 'Factorial Calculator', path: '/math-tools/factorial', icon: PieChart },
    { name: 'Multiplication Tables', path: '/math-tools/multiplication-table', icon: TrendingUp },
    { name: 'Quadratic Equation Solver', path: '/math-tools/quadratic-solver', icon: Zap },
    { name: 'Percentage Change Calculator', path: '/math-tools/percentage-change', icon: Percent },
    { name: 'Triangle Area Calculator', path: '/math-tools/triangle-area', icon: Triangle },
    { name: 'Circle Area Calculator', path: '/math-tools/circle-calculator', icon: Circle },
    { name: 'Logarithm Calculator', path: '/math-tools/exponent-log', icon: BarChart },
    { name: 'Statistics Calculator', path: '/math-tools/statistics-calculator', icon: Hash }
  ];

  // FAQ Data
  const faqData = [
    {
      question: "What makes this calculator different from others?",
      answer: "This calculator combines a clean, intuitive interface with advanced features like calculation history tracking, memory functions (M+, M-, MR, MC), keyboard support, and detailed educational content about mathematical operations. It provides both basic arithmetic functionality and mathematical insights for learning purposes."
    },
    {
      question: "Can I use keyboard shortcuts with this calculator?",
      answer: "Yes! The calculator supports full keyboard functionality: Number keys (0-9) for input, +, -, *, / for operations, Enter or = for calculation, Escape for clear, Backspace for deleting last digit, and m, M, r, c for memory functions (M+, M-, MR, MC). This makes it efficient for quick calculations."
    },
    {
      question: "How accurate are the calculations?",
      answer: "The calculator uses JavaScript's floating-point arithmetic with proper handling of decimal operations. It maintains precision up to 15-17 significant digits and includes error handling for division by zero and other mathematical edge cases. For most practical purposes, the accuracy is equivalent to standard calculators."
    },
    {
      question: "Can I save and recall calculations?",
      answer: "Yes! The calculator includes memory functions (M+, M-, MR, MC) for storing and recalling values, plus a calculation history that tracks your recent operations. You can review previous calculations to check your work or continue from previous results."
    },
    {
      question: "Does the calculator handle complex expressions?",
      answer: "This is a basic calculator that processes one operation at a time following standard order of operations when using chained calculations. For complex expressions with multiple operations, it evaluates sequentially as you input them, similar to traditional handheld calculators."
    }
  ];

  useEffect(() => {
    document.title = 'Basic Calculator | Advanced Online Calculator with Memory & History | ToolNest';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Free online Basic Calculator with advanced features. Perform arithmetic operations (addition, subtraction, multiplication, division) with memory functions, calculation history, and keyboard support.');
    }
  }, []);

  const inputNumber = useCallback((num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  }, [display, waitingForOperand]);

  const inputOperation = useCallback((nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = performCalculation(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
      
      // Add to history
      setCalculationHistory(prev => [{
        expression: `${currentValue} ${operation} ${inputValue}`,
        result: String(newValue)
      }, ...prev.slice(0, 9)]);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  }, [display, previousValue, operation]);

  const performCalculation = useCallback((firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case '+': return firstValue + secondValue;
      case '-': return firstValue - secondValue;
      case '×': return firstValue * secondValue;
      case '÷': 
        if (secondValue === 0) {
          alert('Cannot divide by zero');
          return firstValue;
        }
        return firstValue / secondValue;
      case '=': return secondValue;
      default: return secondValue;
    }
  }, []);

  const calculate = useCallback(() => {
    const inputValue = parseFloat(display);
    
    if (previousValue !== null && operation) {
      const newValue = performCalculation(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      
      // Add to history
      setCalculationHistory(prev => [{
        expression: `${previousValue} ${operation} ${inputValue}`,
        result: String(newValue)
      }, ...prev.slice(0, 9)]);
      
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  }, [display, previousValue, operation, performCalculation]);

  const clear = useCallback(() => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  }, []);

  const backspace = useCallback(() => {
    if (!waitingForOperand) {
      setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
    }
  }, [display, waitingForOperand]);

  const inputDecimal = useCallback(() => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  }, [display, waitingForOperand]);

  // Memory functions
  const memoryAdd = useCallback(() => {
    setMemory(prev => prev + parseFloat(display));
  }, [display]);

  const memorySubtract = useCallback(() => {
    setMemory(prev => prev - parseFloat(display));
  }, [display]);

  const memoryRecall = useCallback(() => {
    setDisplay(String(memory));
    setWaitingForOperand(false);
  }, [memory]);

  const memoryClear = useCallback(() => {
    setMemory(0);
  }, []);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        inputNumber(e.key);
      } else if (e.key === '.') {
        inputDecimal();
      } else if (e.key === '+' || e.key === '-') {
        inputOperation(e.key);
      } else if (e.key === '*' || e.key === '/') {
        inputOperation(e.key === '*' ? '×' : '÷');
      } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        calculate();
      } else if (e.key === 'Escape') {
        clear();
      } else if (e.key === 'Backspace') {
        backspace();
      } else if (e.key.toLowerCase() === 'm') {
        if (e.shiftKey) memorySubtract();
        else memoryAdd();
      } else if (e.key.toLowerCase() === 'r') {
        memoryRecall();
      } else if (e.key.toLowerCase() === 'c') {
        memoryClear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inputNumber, inputDecimal, inputOperation, calculate, clear, backspace, memoryAdd, memorySubtract, memoryRecall, memoryClear]);

  // Quick calculation examples
  const quickExamples = [
    { expression: '15 + 27 = 42', action: () => { setDisplay('15'); inputOperation('+'); setDisplay('27'); calculate(); } },
    { expression: '125 × 8 = 1000', action: () => { setDisplay('125'); inputOperation('×'); setDisplay('8'); calculate(); } },
    { expression: '144 ÷ 12 = 12', action: () => { setDisplay('144'); inputOperation('÷'); setDisplay('12'); calculate(); } },
    { expression: '75 - 29 = 46', action: () => { setDisplay('75'); inputOperation('-'); setDisplay('29'); calculate(); } }
  ];

  return (
    <div className="min-h-screen bg-background font-inter">
      
      <title>Basic Calculator | Advanced Online Calculator with Memory & History | GrockTool.com</title>
      <meta name="description" content="Free online Basic Calculator with advanced features. Perform arithmetic operations (addition, subtraction, multiplication, division) with memory functions, calculation history, and keyboard support." />
      <meta name="keywords" content="basic calculator, online calculator, arithmetic calculator, math calculator, addition calculator, subtraction calculator, multiplication calculator, division calculator, scientific calculator" />
      <meta property="og:title" content="Basic Calculator | Advanced Online Calculator with Memory & History" />
      <meta property="og:description" content="Free online Basic Calculator with advanced features. Perform arithmetic operations with memory functions, calculation history, and keyboard support." />
      <link rel="canonical" href="https://grocktool.com/math-tools/basic-calculator" />
     

      <div className="pt-20 pb-8 px-4 sm:pt-24 sm:pb-12 sm:px-6 lg:pt-28">
        <div className="max-w-lg mx-auto lg:max-w-6xl">
          {/* Enhanced Header */}
          <div className="mb-8 sm:mb-12">
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
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-green-500/10 px-4 py-2 rounded-full mb-4 border border-blue-500/20">
                <Calculator size={16} className="text-blue-600" />
                <span className="text-sm font-medium text-blue-600">Arithmetic Operations • Memory Functions • Calculation History</span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                Basic Calculator
                <span className="block text-lg sm:text-xl lg:text-2xl font-normal text-muted-foreground mt-2">
                  Perform Arithmetic Operations • Memory Functions • Calculation History • Keyboard Support
                </span>
              </h1>
              
              <div className="flex flex-wrap justify-center gap-4 mt-6 mb-8">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 rounded-lg">
                  <Calculator size={14} className="text-blue-600" />
                  <span className="text-xs sm:text-sm text-foreground">Addition & Subtraction</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-lg">
                  <Divide size={14} className="text-green-600" />
                  <span className="text-xs sm:text-sm text-foreground">Multiplication & Division</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 rounded-lg">
                  <Square size={14} className="text-purple-600" />
                  <span className="text-xs sm:text-sm text-foreground">Memory Functions</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 rounded-lg">
                  <BarChart size={14} className="text-amber-600" />
                  <span className="text-xs sm:text-sm text-foreground">Calculation History</span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Calculator */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Examples Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <div className="space-y-3">
                  <div className="text-xs text-muted-foreground">Quick Calculation Examples:</div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {quickExamples.map((example, index) => (
                      <button
                        key={index}
                        onClick={example.action}
                        className="px-3 py-2 bg-gradient-to-r from-blue-500/10 to-green-500/10 text-blue-600 rounded-lg hover:from-blue-500/20 hover:to-green-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                      >
                        <Zap size={12} />
                        {example.expression}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Main Calculator Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Calculator size={20} className="text-foreground" />
                      <label className="block text-sm font-medium text-foreground">
                        Advanced Calculator
                      </label>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-blue-600">
                      <Zap size={12} />
                      <span>Keyboard supported</span>
                    </div>
                  </div>

                  {/* Memory Display */}
                  <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-secondary/20 to-secondary/10 rounded-lg border border-border">
                    <div className="text-xs text-muted-foreground">Memory:</div>
                    <div className="font-mono text-sm font-semibold text-foreground">{memory}</div>
                    <div className="flex gap-1">
                      <button
                        onClick={memoryAdd}
                        className="px-2 py-1 text-xs bg-blue-500/10 text-blue-600 rounded hover:bg-blue-500/20 transition-colors"
                        title="Memory Add (M+)"
                      >
                        M+
                      </button>
                      <button
                        onClick={memorySubtract}
                        className="px-2 py-1 text-xs bg-blue-500/10 text-blue-600 rounded hover:bg-blue-500/20 transition-colors"
                        title="Memory Subtract (M-)"
                      >
                        M-
                      </button>
                      <button
                        onClick={memoryRecall}
                        className="px-2 py-1 text-xs bg-green-500/10 text-green-600 rounded hover:bg-green-500/20 transition-colors"
                        title="Memory Recall (MR)"
                      >
                        MR
                      </button>
                      <button
                        onClick={memoryClear}
                        className="px-2 py-1 text-xs bg-red-500/10 text-red-600 rounded hover:bg-red-500/20 transition-colors"
                        title="Memory Clear (MC)"
                      >
                        MC
                      </button>
                    </div>
                  </div>

                  {/* Calculator Display */}
                  <div className="bg-gradient-to-r from-input to-input/80 border border-border rounded-lg p-4 relative">
                    <div className="text-right text-2xl sm:text-3xl lg:text-4xl font-mono text-foreground min-h-[60px] flex items-center justify-end break-all">
                      {display}
                    </div>
                    {operation && previousValue !== null && (
                      <div className="absolute top-2 left-4 text-sm text-muted-foreground font-mono">
                        {previousValue} {operation}
                      </div>
                    )}
                    <div className="absolute top-2 right-4 text-xs text-muted-foreground">
                      {waitingForOperand ? 'Enter number' : 'Ready'}
                    </div>
                  </div>

                  {/* Button Grid */}
                  <div className="grid grid-cols-4 gap-3">
                    {/* Row 1 - Memory and Clear */}
                    <button
                      onClick={clear}
                      className="col-span-2 flex items-center justify-center gap-2 px-3 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all text-sm font-medium shadow-sm"
                    >
                      <RotateCcw size={16} />
                      Clear (Esc)
                    </button>
                    <button
                      onClick={backspace}
                      className="flex items-center justify-center px-3 py-4 bg-gradient-to-r from-secondary to-secondary/90 text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors shadow-sm"
                      title="Backspace"
                    >
                      <Delete size={16} />
                    </button>
                    <button
                      onClick={() => inputOperation('÷')}
                      className="flex items-center justify-center px-3 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all text-lg font-medium shadow-sm"
                    >
                      ÷
                    </button>

                    {/* Row 2 */}
                    <button
                      onClick={() => inputNumber('7')}
                      className="flex items-center justify-center px-3 py-4 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-lg font-medium shadow-sm"
                    >
                      7
                    </button>
                    <button
                      onClick={() => inputNumber('8')}
                      className="flex items-center justify-center px-3 py-4 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-lg font-medium shadow-sm"
                    >
                      8
                    </button>
                    <button
                      onClick={() => inputNumber('9')}
                      className="flex items-center justify-center px-3 py-4 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-lg font-medium shadow-sm"
                    >
                      9
                    </button>
                    <button
                      onClick={() => inputOperation('×')}
                      className="flex items-center justify-center px-3 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all text-lg font-medium shadow-sm"
                    >
                      ×
                    </button>

                    {/* Row 3 */}
                    <button
                      onClick={() => inputNumber('4')}
                      className="flex items-center justify-center px-3 py-4 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-lg font-medium shadow-sm"
                    >
                      4
                    </button>
                    <button
                      onClick={() => inputNumber('5')}
                      className="flex items-center justify-center px-3 py-4 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-lg font-medium shadow-sm"
                    >
                      5
                    </button>
                    <button
                      onClick={() => inputNumber('6')}
                      className="flex items-center justify-center px-3 py-4 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-lg font-medium shadow-sm"
                    >
                      6
                    </button>
                    <button
                      onClick={() => inputOperation('-')}
                      className="flex items-center justify-center px-3 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all text-lg font-medium shadow-sm"
                    >
                      -
                    </button>

                    {/* Row 4 */}
                    <button
                      onClick={() => inputNumber('1')}
                      className="flex items-center justify-center px-3 py-4 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-lg font-medium shadow-sm"
                    >
                      1
                    </button>
                    <button
                      onClick={() => inputNumber('2')}
                      className="flex items-center justify-center px-3 py-4 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-lg font-medium shadow-sm"
                    >
                      2
                    </button>
                    <button
                      onClick={() => inputNumber('3')}
                      className="flex items-center justify-center px-3 py-4 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-lg font-medium shadow-sm"
                    >
                      3
                    </button>
                    <button
                      onClick={() => inputOperation('+')}
                      className="flex items-center justify-center px-3 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all text-lg font-medium shadow-sm"
                    >
                      +
                    </button>

                    {/* Row 5 */}
                    <button
                      onClick={() => inputNumber('0')}
                      className="col-span-2 flex items-center justify-center px-3 py-4 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-lg font-medium shadow-sm"
                    >
                      0
                    </button>
                    <button
                      onClick={inputDecimal}
                      className="flex items-center justify-center px-3 py-4 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-lg font-medium shadow-sm"
                    >
                      .
                    </button>
                    <button
                      onClick={calculate}
                      className="flex items-center justify-center px-3 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all text-lg font-medium shadow-md hover:shadow-lg"
                    >
                      = (Enter)
                    </button>
                  </div>

                  {/* Keyboard Shortcuts Info */}
                  <div className="p-3 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-lg border border-blue-500/20">
                    <div className="text-xs text-muted-foreground">
                      <strong>Keyboard Shortcuts:</strong> Numbers (0-9), Operators (+, -, *, /), Enter (=), Esc (Clear), Backspace, M (M+), Shift+M (M-), R (MR), C (MC)
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Calculation History */}
              {calculationHistory.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
                >
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <BarChart size={18} className="text-blue-600" />
                    Calculation History
                  </h3>
                  
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                    {calculationHistory.map((calc, index) => (
                      <div key={index} className="p-3 bg-gradient-to-r from-secondary/20 to-secondary/10 rounded-lg border border-border">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-medium text-foreground">#{index + 1}</span>
                          <button
                            onClick={() => setDisplay(calc.result)}
                            className="text-xs text-blue-600 hover:text-blue-700 transition-colors"
                          >
                            Use Result
                          </button>
                        </div>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Expression:</span>
                            <span className="font-mono text-foreground">{calc.expression}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Result:</span>
                            <span className="font-mono text-foreground font-semibold text-green-600">{calc.result}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Calculator Guide Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Calculator size={18} className="text-green-600" />
                  Arithmetic Operations Complete Guide
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  {/* Basic Operations */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-blue-500/10 p-2 rounded-lg">
                        <Calculator size={16} className="text-blue-600" />
                      </div>
                      <h4 className="text-sm font-medium text-foreground">Basic Arithmetic Operations</h4>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Addition (+):</strong> Combining numbers to find their total sum</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Subtraction (-):</strong> Finding the difference between numbers</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Multiplication (×):</strong> Repeated addition or scaling numbers</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Division (÷):</strong> Splitting numbers into equal parts</span>
                      </div>
                    </div>
                  </div>

                  {/* Advanced Features */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-green-500/10 p-2 rounded-lg">
                        <Square size={16} className="text-green-600" />
                      </div>
                      <h4 className="text-sm font-medium text-foreground">Calculator Features</h4>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Memory Functions:</strong> M+ (add to memory), M- (subtract from memory), MR (recall), MC (clear)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Calculation History:</strong> Track previous calculations for reference</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Keyboard Support:</strong> Full keyboard shortcuts for efficient operation</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Decimal Operations:</strong> Support for floating-point calculations</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-lg border border-blue-500/20">
                  <h4 className="text-sm font-medium text-foreground mb-2">Common Calculation Examples</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-muted-foreground">
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-foreground">Simple Addition</span>
                      <span className="font-mono">15 + 27 = 42</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-foreground">Multiplication</span>
                      <span className="font-mono">125 × 8 = 1000</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-foreground">Division</span>
                      <span className="font-mono">144 ÷ 12 = 12</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-foreground">Subtraction</span>
                      <span className="font-mono">75 - 29 = 46</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Info & Examples */}
            <div className="lg:col-span-1 space-y-6">
              {/* Memory Functions Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-4">
                  <Square size={18} className="text-purple-600" />
                  Memory Functions Guide
                </h3>
                
                <div className="space-y-3">
                  <div className="p-3 bg-gradient-to-r from-purple-500/5 to-purple-600/5 rounded-lg border border-purple-500/20">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="bg-purple-500/10 p-1 rounded">
                        <span className="text-xs font-bold text-purple-600">M+</span>
                      </div>
                      <span className="font-medium text-foreground">Memory Add</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Adds current display value to memory. Keyboard: M</p>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-purple-500/5 to-purple-600/5 rounded-lg border border-purple-500/20">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="bg-purple-500/10 p-1 rounded">
                        <span className="text-xs font-bold text-purple-600">M-</span>
                      </div>
                      <span className="font-medium text-foreground">Memory Subtract</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Subtracts current display value from memory. Keyboard: Shift+M</p>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-green-500/5 to-green-600/5 rounded-lg border border-green-500/20">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="bg-green-500/10 p-1 rounded">
                        <span className="text-xs font-bold text-green-600">MR</span>
                      </div>
                      <span className="font-medium text-foreground">Memory Recall</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Recalls value stored in memory to display. Keyboard: R</p>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-red-500/5 to-red-600/5 rounded-lg border border-red-500/20">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="bg-red-500/10 p-1 rounded">
                        <span className="text-xs font-bold text-red-600">MC</span>
                      </div>
                      <span className="font-medium text-foreground">Memory Clear</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Clears memory value to zero. Keyboard: C</p>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-lg border border-blue-500/20">
                    <h5 className="text-xs font-medium text-foreground mb-1">Memory Tip:</h5>
                    <p className="text-xs text-muted-foreground">
                      Use memory functions for multi-step calculations, intermediate results, or storing constants for repeated use.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Keyboard Shortcuts */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Zap size={16} className="text-amber-600" />
                  Keyboard Shortcuts
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-gradient-to-r from-blue-500/5 to-blue-600/5 rounded text-center border border-blue-500/20">
                      <div className="font-mono text-foreground font-bold">0-9</div>
                      <div className="text-xs text-muted-foreground">Number Input</div>
                    </div>
                    <div className="p-2 bg-gradient-to-r from-blue-500/5 to-blue-600/5 rounded text-center border border-blue-500/20">
                      <div className="font-mono text-foreground font-bold">+ - * /</div>
                      <div className="text-xs text-muted-foreground">Operations</div>
                    </div>
                    <div className="p-2 bg-gradient-to-r from-green-500/5 to-green-600/5 rounded text-center border border-green-500/20">
                      <div className="font-mono text-foreground font-bold">Enter</div>
                      <div className="text-xs text-muted-foreground">Calculate (=)</div>
                    </div>
                    <div className="p-2 bg-gradient-to-r from-green-500/5 to-green-600/5 rounded text-center border border-green-500/20">
                      <div className="font-mono text-foreground font-bold">Esc</div>
                      <div className="text-xs text-muted-foreground">Clear All</div>
                    </div>
                    <div className="p-2 bg-gradient-to-r from-purple-500/5 to-purple-600/5 rounded text-center border border-purple-500/20">
                      <div className="font-mono text-foreground font-bold">Backspace</div>
                      <div className="text-xs text-muted-foreground">Delete Digit</div>
                    </div>
                    <div className="p-2 bg-gradient-to-r from-purple-500/5 to-purple-600/5 rounded text-center border border-purple-500/20">
                      <div className="font-mono text-foreground font-bold">.</div>
                      <div className="text-xs text-muted-foreground">Decimal Point</div>
                    </div>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-amber-500/10 to-amber-600/10 rounded-lg border border-amber-500/20">
                    <h5 className="text-xs font-medium text-foreground mb-1">Efficiency Tip:</h5>
                    <p className="text-xs text-muted-foreground">
                      Use keyboard shortcuts for faster calculations. Keep hands on keyboard without switching to mouse.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Real-World Applications */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Calculator size={18} className="text-blue-600" />
                  Real-World Applications
                </h3>
                <div className="space-y-2 text-muted-foreground text-sm">
                  <div className="text-xs sm:text-sm space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span><strong>Financial Calculations</strong>: Budgeting, expense tracking, tax calculations, and financial planning</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span><strong>Academic Studies</strong>: Homework assistance, practice problems, and mathematical exercises</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                      <span><strong>Business Operations</strong>: Invoice calculations, profit margins, sales totals, and business analytics</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-amber-500 rounded-full"></div>
                      <span><strong>Everyday Calculations</strong>: Shopping totals, recipe adjustments, measurement conversions, and tip calculations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                      <span><strong>Professional Use</strong>: Engineering calculations, scientific research, data analysis, and statistical work</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm space-y-2 pt-3">
                    <div className="font-medium text-foreground">Why This Calculator is Useful:</div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      <span>Accessible anywhere with internet connection</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      <span>No installation required - works in browser</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      <span>Memory functions for complex calculations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      <span>Calculation history for reference and verification</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* SEO Content Section with Dropdowns */}
          <section className="space-y-4 mt-12">
            {/* What This Tool Does - Dropdown */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('whatItDoes')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500/10 p-2 rounded-lg">
                    <Calculator size={20} className="text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Basic Calculator - Features & Mathematical Capabilities</h2>
                </div>
                {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.whatItDoes && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground mb-4">
                    This Basic Calculator provides comprehensive arithmetic functionality with advanced features typically found in professional calculators. It supports all fundamental operations including addition, subtraction, multiplication, and division with precise decimal handling. Beyond basic arithmetic, it includes memory functions (M+, M-, MR, MC) for storing intermediate results, calculation history tracking for reviewing previous operations, and full keyboard support for efficient data entry. The calculator implements proper mathematical order of operations, handles edge cases like division by zero with appropriate error messages, and provides a clean, intuitive interface suitable for both casual users and professionals requiring quick, accurate calculations.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Divide size={18} className="text-blue-600" />
                        <h3 className="font-semibold text-foreground">Arithmetic Operations</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Complete set of arithmetic functions including addition, subtraction, multiplication, and division with proper decimal handling and error management for mathematical edge cases.</p>
                    </div>
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Square size={18} className="text-green-600" />
                        <h3 className="font-semibold text-foreground">Memory Functions</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Full memory functionality with M+ (add to memory), M- (subtract from memory), MR (memory recall), and MC (memory clear) for storing intermediate results in complex calculations.</p>
                    </div>
                    <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <BarChart size={18} className="text-purple-600" />
                        <h3 className="font-semibold text-foreground">Advanced Features</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Calculation history tracking, full keyboard support with shortcuts, large clear display, and educational content about mathematical operations and proper calculation techniques.</p>
                    </div>
                  </div>
                </div>
              )}
            </article>

            {/* Use Cases Section - Dropdown */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('useCases')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-green-500/10 p-2 rounded-lg">
                    <Calculator size={20} className="text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Calculator Applications</h2>
                </div>
                {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.useCases && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">💰 Financial & Business Applications</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Budgeting & Expense Tracking</strong>: Calculating monthly budgets, tracking expenses, and analyzing spending patterns with addition and subtraction operations</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Invoice & Billing Calculations</strong>: Computing invoice totals, applying taxes and discounts, and calculating payment amounts for business transactions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Profit Margin Analysis</strong>: Calculating profit percentages, cost analyses, and business performance metrics using division and multiplication</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Investment Calculations</strong>: Computing returns on investment, interest calculations, and financial planning for personal and business investments</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">📚 Academic & Educational Applications</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Homework Assistance</strong>: Solving math problems, checking answers, and practicing arithmetic operations for students of all levels</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Test Preparation</strong>: Quick calculations for standardized tests, exam practice, and mathematical problem-solving exercises</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Educational Demonstrations</strong>: Teaching mathematical concepts, demonstrating calculation methods, and explaining arithmetic principles</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Research Calculations</strong>: Basic computations for academic research, data analysis, and scientific studies requiring arithmetic operations</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">🏠 Everyday Life Applications</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Shopping & Retail Calculations</strong>: Calculating totals, comparing prices, applying discounts, and budgeting for purchases</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Cooking & Recipe Adjustments</strong>: Scaling recipes, converting measurements, and calculating ingredient proportions for cooking and baking</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Home Improvement Projects</strong>: Calculating material quantities, measurement conversions, and project cost estimations for DIY projects</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Travel Planning</strong>: Calculating distances, budgeting expenses, currency conversions, and travel itinerary planning</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </article>

            {/* How to Use - Dropdown */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('howToUse')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-orange-500/10 p-2 rounded-lg">
                    <Calculator size={20} className="text-orange-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">How to Use Basic Calculator - Complete Guide</h2>
                </div>
                {openSections.howToUse ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.howToUse && (
                <div className="px-6 pb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Simple 6-Step Process</h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                          <div>
                            <div className="font-medium text-foreground">Enter First Number</div>
                            <div className="text-sm text-muted-foreground">Click number buttons (0-9) or use keyboard to input your first number. Use decimal point for fractions if needed.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                          <div>
                            <div className="font-medium text-foreground">Select Operation</div>
                            <div className="text-sm text-muted-foreground">Choose arithmetic operation: addition (+), subtraction (-), multiplication (×), or division (÷).</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                          <div>
                            <div className="font-medium text-foreground">Enter Second Number</div>
                            <div className="text-sm text-muted-foreground">Input the second number for your calculation. The calculator will show the operation in progress.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">4</div>
                          <div>
                            <div className="font-medium text-foreground">Calculate Result</div>
                            <div className="text-sm text-muted-foreground">Press equals (=) or Enter key to perform the calculation. The result will display immediately.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">5</div>
                          <div>
                            <div className="font-medium text-foreground">Use Memory Functions</div>
                            <div className="text-sm text-muted-foreground">Store results with M+, recall with MR, or perform multi-step calculations using memory features.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">6</div>
                          <div>
                            <div className="font-medium text-foreground">Review History</div>
                            <div className="text-sm text-muted-foreground">Check calculation history for previous operations, reuse results, or verify calculations.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Pro Calculator Tips</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Zap size={12} className="text-accent" />
                          </div>
                          <span><strong>Use Keyboard Shortcuts</strong>: Enter numbers and operations directly from keyboard for faster calculations without mouse clicks</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Square size={12} className="text-accent" />
                          </div>
                          <span><strong>Master Memory Functions</strong>: Use M+ to store intermediate results, MR to recall them, and MC to clear memory when needed</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <BarChart size={12} className="text-accent" />
                          </div>
                          <span><strong>Review Calculation History</strong>: Check previous calculations for errors, reuse results, or continue from previous operations</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Calculator size={12} className="text-accent" />
                          </div>
                          <span><strong>Handle Decimal Calculations</strong>: Use decimal point for precise calculations and ensure proper placement for accurate results</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Divide size={12} className="text-accent" />
                          </div>
                          <span><strong>Clear When Stuck</strong>: Use Clear button (Esc key) to reset calculator if you make an error or want to start fresh</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </article>

            {/* Example Input and Output Section */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('examples')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-purple-500/10 p-2 rounded-lg">
                    <Zap size={20} className="text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Calculator Examples</h2>
                </div>
                {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.examples && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">Common Calculation Examples</h3>
                      <div className="overflow-x-auto">
                        <div className="min-w-full inline-block align-middle">
                          <div className="overflow-hidden border border-border rounded-lg">
                            <table className="min-w-full divide-y divide-border">
                              <thead className="bg-secondary/20">
                                <tr>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Calculation Type</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Input Sequence</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Result</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Application</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-border">
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-medium">Simple Addition</td>
                                  <td className="px-4 py-3 text-sm text-green-600 font-mono">15 + 27 =</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground font-semibold">42</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Adding expenses, combining quantities</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-medium">Multiplication</td>
                                  <td className="px-4 py-3 text-sm text-green-600 font-mono">125 × 8 =</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground font-semibold">1000</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Calculating totals, scaling recipes</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-medium">Division</td>
                                  <td className="px-4 py-3 text-sm text-green-600 font-mono">144 ÷ 12 =</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground font-semibold">12</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Splitting bills, calculating averages</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-medium">Subtraction</td>
                                  <td className="px-4 py-3 text-sm text-green-600 font-mono">75 - 29 =</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground font-semibold">46</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Calculating differences, making change</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-medium">Decimal Addition</td>
                                  <td className="px-4 py-3 text-sm text-green-600 font-mono">15.75 + 8.25 =</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground font-semibold">24.00</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Financial calculations, measurements</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-medium">Multi-step Calculation</td>
                                  <td className="px-4 py-3 text-sm text-green-600 font-mono">(15 + 27) × 2 =</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground font-semibold">84</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Complex calculations, formula solving</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-medium">Percentage Calculation</td>
                                  <td className="px-4 py-3 text-sm text-green-600 font-mono">200 × 15 ÷ 100 =</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground font-semibold">30</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Calculating tips, discounts, taxes</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Detailed Example: Multi-Step Calculation with Memory Functions</h3>
                      <div className="bg-secondary/20 p-4 rounded-lg border border-border overflow-x-auto">
                        <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
{`Example: Budget calculation for monthly expenses with tax and discounts

Step 1: Understand the scenario
Monthly expenses breakdown:
• Rent: $850
• Utilities: $120
• Groceries: $300
• Transportation: $150
Tax rate: 8%
Grocery discount: 15%

Step 2: Calculate subtotal without tax or discount
Subtotal = Rent + Utilities + Groceries + Transportation
850 + 120 + 300 + 150

Calculator steps:
1. Clear calculator (C)
2. Enter 850
3. Press + (addition)
4. Enter 120
5. Press = → Result: 970
6. Press M+ (store subtotal in memory)

Step 3: Calculate grocery discount
Grocery discount = 300 × 15 ÷ 100
1. Clear calculator (C)
2. Enter 300
3. Press × (multiplication)
4. Enter 15
5. Press = → Result: 4500
6. Press ÷ (division)
7. Enter 100
8. Press = → Result: 45 (discount amount)
9. Press M- (subtract discount from memory)

Step 4: Calculate discounted subtotal
1. Press MR (recall memory) → 970 - 45 = 925
2. Clear calculator (C)
3. Enter 925 (discounted subtotal)

Step 5: Calculate tax
Tax = Discounted subtotal × 8 ÷ 100
925 × 8 ÷ 100 = 74

Step 6: Calculate final total
Final total = Discounted subtotal + Tax
925 + 74 = 999

Step 7: Verify with alternative calculation
Method B: Calculate everything in one expression
((850 + 120 + 300 + 150) - (300 × 0.15)) × 1.08

Step-by-step verification:
1. Sum base expenses: 850 + 120 + 300 + 150 = 1420
2. Calculate discount: 300 × 0.15 = 45
3. Subtract discount: 1420 - 45 = 1375
4. Calculate tax: 1375 × 0.08 = 110
5. Add tax: 1375 + 110 = 1485

Wait - there's a discrepancy! Let's check our work.

Step 8: Identify and correct error
Error in Step 2: We added incorrectly
850 + 120 = 970 ✓
970 + 300 = 1270 ✓
1270 + 150 = 1420 ✓

Correct subtotal: 1420 (not 970)
Memory error: We stored 970 instead of 1420

Step 9: Recalculate correctly with memory functions
1. Clear calculator and memory (C, MC)
2. Enter 850, press +
3. Enter 120, press = → 970
4. Press M+ (store intermediate)
5. Enter 300, press +
6. Press MR (recall 970), press = → 1270
7. Press MC, then M+ (store new subtotal)
8. Enter 150, press +
9. Press MR (recall 1270), press = → 1420
10. Press MC, then M+ (store final subtotal)

Step 10: Calculate discount correctly
1. Clear calculator (C)
2. Enter 300, press ×
3. Enter 15, press =
4. Enter ÷ 100 = → 45 (discount)
5. Press M- (subtract from memory)

Step 11: Calculate tax on discounted amount
1. Press MR → 1420 - 45 = 1375
2. Clear calculator (C)
3. Enter 1375, press ×
4. Enter 8, press =
5. Enter ÷ 100 = → 110 (tax)

Step 12: Calculate final total
1. Clear calculator (C)
2. Enter 1375, press +
3. Enter 110, press = → 1485 (final total)

Step 13: Key lessons learned
✓ Always verify intermediate results
✓ Use memory functions carefully
✓ Double-check calculations for complex problems
✓ Consider using paper for complex multi-step calculations
✓ Use calculator's history feature to review steps

Step 14: Final results
Subtotal: $1420.00
Grocery discount: $45.00
Discounted subtotal: $1375.00
Tax (8%): $110.00
Final total: $1485.00

Step 15: Memory function usage summary
• M+: Store intermediate results
• M-: Subtract from stored value
• MR: Recall stored value
• MC: Clear memory
• Best practice: Clear memory (MC) before new calculation sequences`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </article>

            {/* Frequently Asked Questions (FAQs) */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('faqs')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500/10 p-2 rounded-lg">
                    <Calculator size={20} className="text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Frequently Asked Questions</h2>
                </div>
                {openSections.faqs ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.faqs && (
                <div className="px-6 pb-6">
                  <div className="space-y-6">
                    {faqData.map((faq, index) => (
                      <div key={index} className="pb-4 border-b border-border/50 last:border-0">
                        <h3 className="text-lg font-semibold text-foreground mb-2">{faq.question}</h3>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* Related Tools Section */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('relatedTools')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <h2 className="text-xl font-bold text-foreground">More Math Tools</h2>
                {openSections.relatedTools ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.relatedTools && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground mb-4">
                    Explore other useful mathematical calculation tools from our Math Tools category:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {relatedTools.map((tool, index) => {
                      const Icon = tool.icon;
                      return (
                        <Link
                          key={index}
                          href={tool.path}
                          className="flex items-center gap-3 p-4 bg-secondary/30 rounded-lg border border-border hover:bg-secondary/50 transition-colors group"
                        >
                          <div className="bg-accent/10 p-2 rounded-lg group-hover:bg-accent/20 transition-colors">
                            <Icon size={18} className="text-accent" />
                          </div>
                          <div>
                            <div className="font-medium text-foreground group-hover:text-accent transition-colors">{tool.name}</div>
                            <div className="text-xs text-muted-foreground">Visit tool →</div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </article>
          </section>
        </div>
      </div>
    </div>
  );
}