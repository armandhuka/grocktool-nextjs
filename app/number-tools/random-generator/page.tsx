'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Dice6, RotateCcw, Copy } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const RandomGenerator = () => {
  const router = useRouter();
  const [minValue, setMinValue] = useState('1');
  const [maxValue, setMaxValue] = useState('100');
  const [count, setCount] = useState('1');
  const [allowDuplicates, setAllowDuplicates] = useState(true);
  const [result, setResult] = useState<number[] | null>(null);

  const generateRandom = () => {
    const min = parseInt(minValue);
    const max = parseInt(maxValue);
    const num = parseInt(count);
    
    if (isNaN(min) || isNaN(max) || isNaN(num) || min >= max || num <= 0) return;
    
    if (!allowDuplicates && num > (max - min + 1)) {
      alert('Cannot generate unique numbers: count exceeds available range');
      return;
    }

    const numbers: number[] = [];
    const used = new Set<number>();
    
    for (let i = 0; i < num; i++) {
      let randomNum: number;
      
      if (allowDuplicates) {
        randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        numbers.push(randomNum);
      } else {
        do {
          randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        } while (used.has(randomNum));
        
        used.add(randomNum);
        numbers.push(randomNum);
      }
    }
    
    setResult(numbers);
  };

  const reset = () => {
    setMinValue('1');
    setMaxValue('100');
    setCount('1');
    setResult(null);
  };

  const copyResult = async () => {
    if (result) {
      try {
        await navigator.clipboard.writeText(result.join(', '));
        alert('Results copied to clipboard!');
      } catch (err) {
        alert('Failed to copy to clipboard');
      }
    }
  };

  return (
    <div className="min-h-screen bg-toolnest-bg">
      <Header />

      <main className="pt-32 pb-16 px-4">
        <div className="toolnest-container max-w-4xl mx-auto">
          <button onClick={() => router.push('/tool')} className="inline-flex items-center gap-2 text-toolnest-text/70 hover:text-toolnest-text mb-8 transition-colors">
            ← Back to Tools
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-toolnest-text mb-4">
              Random Number Generator
            </h1>
            <p className="text-xl text-toolnest-text/80 max-w-2xl mx-auto">
              Generate random numbers within specified ranges
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white shadow-lg rounded-lg">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold text-toolnest-text flex items-center gap-3">
                  <Dice6 className="w-6 h-6 text-toolnest-text" />
                  Random Number Generator
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-toolnest-text mb-2">
                      Minimum Value
                    </label>
                    <input
                      type="number"
                      value={minValue}
                      onChange={(e) => setMinValue(e.target.value)}
                      placeholder="1"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-toolnest-text focus:border-transparent text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-toolnest-text mb-2">
                      Maximum Value
                    </label>
                    <input
                      type="number"
                      value={maxValue}
                      onChange={(e) => setMaxValue(e.target.value)}
                      placeholder="100"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-toolnest-text focus:border-transparent text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-toolnest-text mb-2">
                      How Many Numbers
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="1000"
                      value={count}
                      onChange={(e) => setCount(e.target.value)}
                      placeholder="1"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-toolnest-text focus:border-transparent text-lg"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="allowDuplicates"
                    checked={allowDuplicates}
                    onChange={(e) => setAllowDuplicates(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="allowDuplicates" className="text-sm font-medium text-toolnest-text">
                    Allow duplicate numbers
                  </label>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button 
                    onClick={generateRandom} 
                    className="bg-toolnest-text hover:bg-toolnest-text/90 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <Dice6 className="w-4 h-4" />
                    Generate
                  </button>
                  <button 
                    onClick={reset} 
                    className="border border-gray-300 hover:bg-gray-50 text-toolnest-text px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </button>
                  {result && (
                    <button 
                      onClick={copyResult} 
                      className="border border-gray-300 hover:bg-gray-50 text-toolnest-text px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                      Copy Results
                    </button>
                  )}
                </div>

                {result && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-6 p-4 bg-toolnest-accent/20 rounded-lg border"
                  >
                    <h3 className="text-lg font-semibold text-toolnest-text mb-2">Generated Numbers:</h3>
                    <div className="flex flex-wrap gap-2">
                      {result.map((num, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-toolnest-text text-white rounded-full text-sm font-bold"
                        >
                          {num}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-toolnest-text/70 mt-2">
                      {result.join(', ')}
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8"
          >
            <div className="bg-white shadow-lg rounded-lg">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold text-toolnest-text">How This Tool Works</h2>
              </div>
              <div className="p-6">
                <p className="text-toolnest-text/80 leading-relaxed">
                  This generator creates truly random numbers within your specified range using JavaScript's Math.random() function. 
                  You can generate single or multiple numbers, with or without duplicates, making it perfect for games, sampling, or any application requiring randomness.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RandomGenerator;
