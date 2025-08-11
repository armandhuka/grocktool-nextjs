
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Calculator, RotateCcw, Delete } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const BasicCalculator = () => {
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
    <div className="min-h-screen bg-toolnest-bg">
      <Helmet>
        <title>Basic Calculator - GrockTool</title>
        <meta name="description" content="Free online basic calculator for arithmetic operations. Add, subtract, multiply, and divide numbers with ToolNest's calculator." />
        <link rel="canonical" href="https://grocktool.com/math-tools/basic-calculator" />
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
              Basic Calculator
            </h1>
            <p className="text-xl text-toolnest-text/80 max-w-2xl mx-auto">
              Perform basic arithmetic operations with our easy-to-use calculator
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-white shadow-lg max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Calculator className="w-6 h-6 text-toolnest-text" />
                  Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Display */}
                <div className="bg-toolnest-accent/10 p-4 rounded-lg">
                  <div className="text-right text-2xl font-mono text-toolnest-text">
                    {display}
                  </div>
                </div>

                {/* Button Grid */}
                <div className="grid grid-cols-4 gap-2">
                  <Button onClick={clear} variant="outline" className="col-span-2">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Clear
                  </Button>
                  <Button onClick={backspace} variant="outline">
                    <Delete className="w-4 h-4" />
                  </Button>
                  <Button onClick={() => inputOperation('÷')} variant="outline">÷</Button>

                  <Button onClick={() => inputNumber('7')} variant="outline">7</Button>
                  <Button onClick={() => inputNumber('8')} variant="outline">8</Button>
                  <Button onClick={() => inputNumber('9')} variant="outline">9</Button>
                  <Button onClick={() => inputOperation('×')} variant="outline">×</Button>

                  <Button onClick={() => inputNumber('4')} variant="outline">4</Button>
                  <Button onClick={() => inputNumber('5')} variant="outline">5</Button>
                  <Button onClick={() => inputNumber('6')} variant="outline">6</Button>
                  <Button onClick={() => inputOperation('-')} variant="outline">-</Button>

                  <Button onClick={() => inputNumber('1')} variant="outline">1</Button>
                  <Button onClick={() => inputNumber('2')} variant="outline">2</Button>
                  <Button onClick={() => inputNumber('3')} variant="outline">3</Button>
                  <Button onClick={() => inputOperation('+')} variant="outline">+</Button>

                  <Button onClick={() => inputNumber('0')} variant="outline" className="col-span-2">0</Button>
                  <Button onClick={inputDecimal} variant="outline">.</Button>
                  <Button onClick={calculate} className="bg-toolnest-text hover:bg-toolnest-text/90">=</Button>
                </div>
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
                <CardTitle>How This Calculator Works</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-toolnest-text/80 leading-relaxed">
                  This basic calculator performs standard arithmetic operations including addition, subtraction, 
                  multiplication, and division. Click the number buttons to input values, select an operation, 
                  and press equals to see the result.
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

export default BasicCalculator;
