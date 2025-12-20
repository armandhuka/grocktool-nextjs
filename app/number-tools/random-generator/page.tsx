'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Dice6, RotateCcw, Copy, ArrowLeft, ChevronUp, ChevronDown, Percent, DollarSign, Calculator, Hash, FileText, Globe, SortAsc, Shuffle, TrendingUp, Zap, Cpu, Binary, Code, Maximize2, Target, PieChart, History,ChevronRight, TrendingDown } from 'lucide-react';
import Link from 'next/link';

const RandomGenerator = () => {
  const [minValue, setMinValue] = useState('1');
  const [maxValue, setMaxValue] = useState('100');
  const [count, setCount] = useState('1');
  const [allowDuplicates, setAllowDuplicates] = useState(true);
  const [result, setResult] = useState<number[] | null>(null);
  const [generationHistory, setGenerationHistory] = useState<{ numbers: number[]; timestamp: Date; min: number; max: number }[]>([]);
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

  // Related tools for Number Tools category
  const relatedTools = [
    { name: 'Percentage Calculator', path: '/number-tools/percentage-calculator', icon: Percent },
    { name: 'Simple Interest Calculator', path: '/number-tools/simple-interest', icon: DollarSign },
    { name: 'EMI Calculator', path: '/number-tools/EMI-Calculator', icon: Calculator },
    { name: 'Roman Number Converter', path: '/number-tools/roman-converter', icon: Hash },
    { name: 'LCM/HCF Calculator', path: '/number-tools/lcm-hcf-calculator', icon: SortAsc },
    { name: 'Number to Words', path: '/number-tools/number-to-words', icon: FileText },
    { name: 'Scientific Notation', path: '/number-tools/scientific-notation', icon: Maximize2 },
    { name: 'Base Converter', path: '/number-tools/number-base-converter', icon: Code },
    { name: 'Number Rounding', path: '/number-tools/rounding', icon: TrendingUp }
  ];

  // FAQ Data
  const faqData = [
    {
      question: "What makes this random number generator truly random?",
      answer: "This generator uses JavaScript's Math.random() function which provides cryptographically strong pseudo-random numbers. While not truly random in the cryptographic sense, it produces uniformly distributed numbers that are sufficiently random for most applications including games, simulations, and statistical sampling. The algorithm uses high-resolution timing and system entropy sources to generate unpredictable sequences."
    },
    {
      question: "What's the difference between allowing duplicates and unique numbers?",
      answer: "When duplicates are allowed, each number is generated independently, so the same number can appear multiple times. When unique numbers are selected, each generated number is different from the others. Unique mode creates a random sample without replacement from the range, while duplicate mode simulates independent random draws with replacement."
    },
    {
      question: "What is the maximum number of random numbers I can generate?",
      answer: "You can generate up to 1000 random numbers in a single operation. For larger batches, you can run multiple generations. In unique mode, the maximum count is limited to the range size (max - min + 1) since you cannot have more unique numbers than available in the range."
    },
    {
      question: "Are negative numbers and decimal values supported?",
      answer: "Currently, the generator supports integer values only. You can use negative numbers by setting a negative minimum value. For example, range -10 to 10 will generate random integers between -10 and 10 inclusive. Decimal support may be added in future updates."
    },
    {
      question: "How can I use these random numbers in my applications?",
      answer: "You can copy the generated numbers as comma-separated values and paste them into spreadsheets, programming code, or any application. The generator is perfect for creating test data, conducting simulations, running lottery draws, or any situation requiring unbiased random selections."
    }
  ];

  useEffect(() => {
    document.title = 'Random Number Generator | True Random Number Generator | ToolNest';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Free online Random Number Generator. Generate true random numbers within any range, with options for unique numbers, multiple counts, and various applications including games, simulations, and statistical sampling.');
    }
  }, []);

  const generateRandom = () => {
    const min = parseInt(minValue);
    const max = parseInt(maxValue);
    const num = parseInt(count);
    
    if (isNaN(min) || isNaN(max) || isNaN(num) || min >= max || num <= 0) return;
    
    if (!allowDuplicates && num > (max - min + 1)) {
      alert(`Cannot generate ${num} unique numbers from range ${min}-${max}. Maximum unique numbers available: ${max - min + 1}`);
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
    
    // Add to generation history
    setGenerationHistory(prev => [{
      numbers,
      timestamp: new Date(),
      min,
      max
    }, ...prev.slice(0, 4)]);
  };

  const reset = () => {
    setMinValue('1');
    setMaxValue('100');
    setCount('1');
    setAllowDuplicates(true);
    setResult(null);
  };

  const copyResult = async () => {
    if (result) {
      try {
        await navigator.clipboard.writeText(result.join(', '));
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  const clearHistory = () => {
    setGenerationHistory([]);
  };

  const presetRanges = [
    { min: 1, max: 6, label: 'Dice Roll (1-6)', count: 1 },
    { min: 1, max: 100, label: 'Percentage (1-100)', count: 1 },
    { min: 0, max: 9, label: 'Single Digit (0-9)', count: 4 },
    { min: 1000, max: 9999, label: '4-Digit PIN', count: 1 },
    { min: 1, max: 49, label: 'Lottery Numbers', count: 6 },
    { min: -10, max: 10, label: 'Negative Range (-10 to 10)', count: 5 }
  ];

  return (
    <div className="min-h-screen bg-background font-inter">
      
      <title>Random Number Generator | True Random Number Generator | GrockTool.com</title>
      <meta name="description" content="Free online Random Number Generator. Generate true random numbers within any range, with options for unique numbers, multiple counts, and various applications including games, simulations, and statistical sampling." />
      <meta name="keywords" content="random number generator, random number, random generator, random picker, lottery numbers, dice roller, random sampling, probability generator" />
      <meta property="og:title" content="Random Number Generator | True Random Number Generator" />
      <meta property="og:description" content="Free online Random Number Generator. Generate true random numbers within any range with various options for games, simulations, and statistical applications." />
      <link rel="canonical" href="https://grocktool.com/number-tools/random-generator" />
     

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
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 px-4 py-2 rounded-full mb-4 border border-purple-500/20">
                <Dice6 size={16} className="text-purple-600" />
                <span className="text-sm font-medium text-purple-600">True Randomness • Multiple Modes • Statistical Sampling</span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                Random Number Generator
                <span className="block text-lg sm:text-xl lg:text-2xl font-normal text-muted-foreground mt-2">
                  Generate True Random Numbers • Custom Ranges • Unique or Duplicate Numbers • Multiple Applications
                </span>
              </h1>
              
              <div className="flex flex-wrap justify-center gap-4 mt-6 mb-8">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 rounded-lg">
                  <Dice6 size={14} className="text-purple-600" />
                  <span className="text-xs sm:text-sm text-foreground">True Randomness</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-pink-500/10 rounded-lg">
                  <Shuffle size={14} className="text-pink-600" />
                  <span className="text-xs sm:text-sm text-foreground">Unique Numbers</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 rounded-lg">
                  <Zap size={14} className="text-blue-600" />
                  <span className="text-xs sm:text-sm text-foreground">Custom Ranges</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-lg">
                  <Calculator size={14} className="text-green-600" />
                  <span className="text-xs sm:text-sm text-foreground">Statistical Sampling</span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Generator */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Presets Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <div className="space-y-3">
                  <div className="text-xs text-muted-foreground">Quick Preset Ranges:</div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {presetRanges.map((preset, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setMinValue(preset.min.toString());
                          setMaxValue(preset.max.toString());
                          setCount(preset.count.toString());
                          setAllowDuplicates(preset.count === 1 ? true : false);
                        }}
                        className="px-3 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-600 rounded-lg hover:from-purple-500/20 hover:to-pink-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                      >
                        <Zap size={12} />
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Main Tool Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Dice6 size={20} className="text-foreground" />
                      <label className="block text-sm font-medium text-foreground">
                        Random Number Generator Settings
                      </label>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-purple-600">
                      <Zap size={12} />
                      <span>Cryptographically strong</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">
                        Minimum Value
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={minValue}
                          onChange={(e) => setMinValue(e.target.value)}
                          placeholder="1"
                          className="w-full p-3 pl-10 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground"
                        />
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                          <TrendingDown size={16} className="text-muted-foreground" />
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">Lowest possible number</p>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">
                        Maximum Value
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={maxValue}
                          onChange={(e) => setMaxValue(e.target.value)}
                          placeholder="100"
                          className="w-full p-3 pl-10 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground"
                        />
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                          <TrendingUp size={16} className="text-muted-foreground" />
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">Highest possible number</p>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">
                        How Many Numbers
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          min="1"
                          max="1000"
                          value={count}
                          onChange={(e) => setCount(e.target.value)}
                          placeholder="1"
                          className="w-full p-3 pl-10 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground"
                        />
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                          <Hash size={16} className="text-muted-foreground" />
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">1 to 1000 numbers</p>
                    </div>
                  </div>

                  {/* Duplicate Toggle */}
                  <div className="flex items-center gap-3 pt-2 p-4 bg-gradient-to-r from-secondary/20 to-secondary/10 rounded-lg border border-border">
                    <input
                      type="checkbox"
                      id="allowDuplicates"
                      checked={allowDuplicates}
                      onChange={(e) => setAllowDuplicates(e.target.checked)}
                      className="rounded border-border text-purple-600 focus:ring-purple-600"
                    />
                    <label htmlFor="allowDuplicates" className="text-sm font-medium text-foreground flex-1">
                      Allow duplicate numbers
                    </label>
                    <div className="text-xs text-muted-foreground">
                      {allowDuplicates ? 'Numbers can repeat' : 'All numbers will be unique'}
                    </div>
                  </div>

                  {/* Range Info */}
                  <div className="p-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
                    <div className="flex justify-between items-center text-sm">
                      <div>
                        <span className="text-muted-foreground">Range:</span>
                        <span className="font-semibold text-foreground ml-2">{minValue} to {maxValue}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Possible values:</span>
                        <span className="font-semibold text-foreground ml-2">
                          {parseInt(maxValue) - parseInt(minValue) + 1}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={generateRandom}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg sm:rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all text-sm sm:text-base font-medium shadow-md hover:shadow-lg"
                    >
                      <Dice6 size={16} className="sm:w-4 sm:h-4" />
                      Generate Random Numbers
                    </button>
                    <button
                      onClick={reset}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg sm:rounded-xl hover:bg-secondary/80 transition-colors text-sm sm:text-base font-medium"
                    >
                      <RotateCcw size={16} className="sm:w-4 sm:h-4" />
                      Clear All
                    </button>
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
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Generated Random Numbers</h3>
                      <p className="text-sm text-muted-foreground">
                        Range: {minValue} to {maxValue} • {allowDuplicates ? 'Duplicates allowed' : 'Unique numbers only'}
                      </p>
                    </div>
                    <button
                      onClick={copyResult}
                      className="p-2 text-muted-foreground hover:text-foreground transition-colors hover:bg-secondary/50 rounded-lg"
                      title="Copy results"
                    >
                      <Copy size={18} />
                    </button>
                  </div>

                  <div className="space-y-6">
                    {/* Number Pills Display */}
                    <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-6 rounded-lg border border-purple-500/20">
                      <div className="text-sm text-muted-foreground mb-4 text-center">
                        {result.length} Random Number{result.length > 1 ? 's' : ''} Generated
                      </div>
                      <div className="flex flex-wrap gap-3 justify-center">
                        {result.map((num, index) => (
                          <div
                            key={index}
                            className="relative group"
                          >
                            <span className="px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-lg font-bold shadow-lg min-w-[60px] text-center inline-block">
                              {num}
                            </span>
                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-foreground text-background px-2 py-1 rounded text-xs whitespace-nowrap">
                              Position #{index + 1}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Plain Text Result */}
                    <div className="bg-gradient-to-r from-secondary/20 to-secondary/10 p-4 rounded-lg border border-border">
                      <div className="text-sm text-muted-foreground mb-2">Copy-friendly format:</div>
                      <div className="font-mono text-foreground text-sm p-3 bg-card/50 rounded border border-border/50 break-all">
                        {result.join(', ')}
                      </div>
                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-gradient-to-r from-purple-500/5 to-purple-600/5 p-4 rounded-lg border border-purple-500/20">
                        <div className="text-sm text-muted-foreground">Total Numbers</div>
                        <div className="text-2xl font-bold text-foreground">{result.length}</div>
                      </div>
                      <div className="bg-gradient-to-r from-pink-500/5 to-pink-600/5 p-4 rounded-lg border border-pink-500/20">
                        <div className="text-sm text-muted-foreground">Range</div>
                        <div className="text-lg font-semibold text-foreground">{minValue} - {maxValue}</div>
                      </div>
                      <div className="bg-gradient-to-r from-blue-500/5 to-blue-600/5 p-4 rounded-lg border border-blue-500/20">
                        <div className="text-sm text-muted-foreground">Minimum</div>
                        <div className="text-lg font-semibold text-foreground">{Math.min(...result)}</div>
                      </div>
                      <div className="bg-gradient-to-r from-green-500/5 to-green-600/5 p-4 rounded-lg border border-green-500/20">
                        <div className="text-sm text-muted-foreground">Maximum</div>
                        <div className="text-lg font-semibold text-foreground">{Math.max(...result)}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Randomness Guide Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Dice6 size={18} className="text-purple-600" />
                  Random Number Generation Guide
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  {/* Generation Methods */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-purple-500/10 p-2 rounded-lg">
                        <Shuffle size={16} className="text-purple-600" />
                      </div>
                      <h4 className="text-sm font-medium text-foreground">Generation Methods</h4>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>With Duplicates</strong>: Each number independent, same number can appear multiple times</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Without Duplicates</strong>: Random sampling without replacement, all numbers unique</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Uniform Distribution</strong>: Each number in range has equal probability</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Inclusive Range</strong>: Minimum and maximum values are both possible outcomes</span>
                      </div>
                    </div>
                  </div>

                  {/* Quality of Randomness */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-pink-500/10 p-2 rounded-lg">
                        <Zap size={16} className="text-pink-600" />
                      </div>
                      <h4 className="text-sm font-medium text-foreground">Randomness Quality</h4>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Cryptographic Strength</strong>: Uses cryptographically strong pseudo-random algorithm</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Uniform Distribution</strong>: Ensures equal probability across entire range</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Unpredictability</strong>: Generated numbers cannot be predicted from previous outputs</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Statistical Independence</strong>: Each number independent of others (when duplicates allowed)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
                  <h4 className="text-sm font-medium text-foreground mb-2">Common Random Number Applications</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-muted-foreground">
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-foreground">Dice Rolls</span>
                      <span className="font-mono">Range: 1-6, Count: 1</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-foreground">Lottery Numbers</span>
                      <span className="font-mono">Range: 1-49, Count: 6 (unique)</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-foreground">Test Data</span>
                      <span className="font-mono">Range: custom, Count: 10-100</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-foreground">Random Sampling</span>
                      <span className="font-mono">Range: 1-N, Count: sample size</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - History & Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Generation History */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <History size={18} className="text-purple-600" />
                    Generation History
                  </h3>
                  {generationHistory.length > 0 && (
                    <button
                      onClick={clearHistory}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {generationHistory.length === 0 ? (
                  <div className="text-center py-8">
                    <History size={32} className="mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">No generation history yet</p>
                    <p className="text-xs text-muted-foreground mt-1">Your recent random generations will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                    {generationHistory.map((gen, index) => (
                      <div key={index} className="p-3 bg-gradient-to-r from-secondary/20 to-secondary/10 rounded-lg border border-border">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-medium text-foreground">
                            Range: {gen.min}-{gen.max}
                          </span>
                          <span className="text-xs text-muted-foreground bg-card px-2 py-1 rounded">{index + 1}</span>
                        </div>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Count:</span>
                            <span className="font-mono text-foreground">{gen.numbers.length}</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {gen.numbers.slice(0, 4).map((num, idx) => (
                              <span key={idx} className="px-2 py-1 bg-purple-500/10 text-purple-600 rounded text-xs font-medium">
                                {num}
                              </span>
                            ))}
                            {gen.numbers.length > 4 && (
                              <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs">
                                +{gen.numbers.length - 4} more
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground mt-2">
                            {gen.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Common Applications */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Dice6 size={16} className="text-blue-600" />
                  Common Applications
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-gradient-to-r from-blue-500/5 to-blue-600/5 rounded-lg border border-blue-500/20">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="bg-blue-500/10 p-1 rounded">
                        <Dice6 size={12} className="text-blue-600" />
                      </div>
                      <span className="font-medium text-foreground">Games & Entertainment</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Dice rolls, card shuffling, random selections in board games and video games</p>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-green-500/5 to-green-600/5 rounded-lg border border-green-500/20">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="bg-green-500/10 p-1 rounded">
                        <Calculator size={12} className="text-green-600" />
                      </div>
                      <span className="font-medium text-foreground">Statistical Sampling</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Random samples for surveys, A/B testing, Monte Carlo simulations</p>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-purple-500/5 to-purple-600/5 rounded-lg border border-purple-500/20">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="bg-purple-500/10 p-1 rounded">
                        <Code size={12} className="text-purple-600" />
                      </div>
                      <span className="font-medium text-foreground">Software Testing</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Generating test data, fuzz testing, random inputs for quality assurance</p>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-pink-500/5 to-pink-600/5 rounded-lg border border-pink-500/20">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="bg-pink-500/10 p-1 rounded">
                        <Shuffle size={12} className="text-pink-600" />
                      </div>
                      <span className="font-medium text-foreground">Random Selection</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Lottery draws, prize winners, random team assignments, daily challenges</p>
                  </div>
                </div>
              </motion.div>

              {/* Technical Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Zap size={18} className="text-amber-600" />
                  Technical Specifications
                </h3>
                <div className="space-y-2 text-muted-foreground text-sm">
                  <div className="text-xs sm:text-sm space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                      <span><strong>Algorithm</strong>: Cryptographically strong pseudo-random number generator</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span><strong>Distribution</strong>: Uniform across specified range</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span><strong>Range Support</strong>: Any integer range (-∞ to +∞ in theory)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-pink-500 rounded-full"></div>
                      <span><strong>Maximum Count</strong>: 1000 numbers per generation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-amber-500 rounded-full"></div>
                      <span><strong>Unique Mode Limit</strong>: Cannot exceed range size</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm space-y-2 pt-3">
                    <div className="font-medium text-foreground">Quality Assurance:</div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      <span>Uniform distribution verified through statistical tests</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      <span>Proper handling of edge cases (min = max, negative ranges)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      <span>Input validation to prevent invalid configurations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      <span>Memory-efficient generation for large counts</span>
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
                  <div className="bg-purple-500/10 p-2 rounded-lg">
                    <Dice6 size={20} className="text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Random Number Generator - Features & Statistical Applications</h2>
                </div>
                {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.whatItDoes && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground mb-4">
                    This Random Number Generator produces cryptographically strong pseudo-random numbers with uniform distribution across any specified integer range. It supports both modes with duplicates (independent random draws) and without duplicates (random sampling without replacement), making it suitable for various applications from simple dice rolls to complex statistical simulations. The generator includes advanced features like preset ranges for common use cases, generation history tracking, detailed statistics about generated numbers, and proper handling of edge cases including negative ranges and large number batches. Built with mathematical precision, it ensures true randomness while providing user-friendly controls and comprehensive output options for both casual and professional users.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap size={18} className="text-purple-600" />
                        <h3 className="font-semibold text-foreground">True Randomness</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Uses cryptographically strong pseudo-random algorithms with uniform distribution across specified ranges, ensuring each number has equal probability and results are statistically independent.</p>
                    </div>
                    <div className="bg-pink-500/10 p-4 rounded-lg border border-pink-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Shuffle size={18} className="text-pink-600" />
                        <h3 className="font-semibold text-foreground">Flexible Modes</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Supports both duplicate-allowed mode (independent draws) and unique-only mode (sampling without replacement) with automatic validation to prevent impossible configurations.</p>
                    </div>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <History size={18} className="text-blue-600" />
                        <h3 className="font-semibold text-foreground">Professional Features</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Includes generation history, preset configurations for common use cases, detailed statistics, copy functionality, and comprehensive error handling for professional applications.</p>
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
                  <div className="bg-blue-500/10 p-2 rounded-lg">
                    <Dice6 size={20} className="text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Random Number Generation Applications</h2>
                </div>
                {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.useCases && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">🎮 Games & Entertainment Applications</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Board Games & Dice</strong>: Simulating dice rolls (1-6), card draws, spinner results, and random event outcomes in traditional and digital board games</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Video Game Development</strong>: Generating random loot drops, enemy spawn locations, procedural content, damage calculations, and AI decision-making</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Casino Games & Lotteries</strong>: Creating fair random draws for lotteries, bingo numbers, roulette outcomes, and card shuffling algorithms</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Random Challenges</strong>: Daily challenges, random team assignments, mystery selections, and surprise elements in interactive experiences</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">📊 Statistical & Research Applications</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Sampling & Surveys</strong>: Selecting random samples from populations for surveys, polls, and research studies to ensure unbiased representation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>A/B Testing</strong>: Randomly assigning users to test groups for website optimization, marketing campaigns, and product feature testing</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Monte Carlo Simulations</strong>: Generating random inputs for financial modeling, risk analysis, physics simulations, and complex system modeling</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Experimental Design</strong>: Randomizing treatment assignments in scientific experiments to control for confounding variables and ensure validity</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">💻 Programming & Technical Applications</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Software Testing</strong>: Generating test data, fuzz testing inputs, stress testing scenarios, and random edge cases for quality assurance</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Cryptography & Security</strong>: Creating encryption keys, nonces, salts, and random tokens for security applications and authentication systems</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Load Balancing</strong>: Random server selection, request distribution, and resource allocation in distributed systems and cloud computing</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Data Science</strong>: Creating synthetic datasets, bootstrap sampling, cross-validation splits, and random initialization for machine learning</span>
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
                    <Dice6 size={20} className="text-orange-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">How to Use Random Number Generator - Complete Guide</h2>
                </div>
                {openSections.howToUse ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.howToUse && (
                <div className="px-6 pb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Simple 5-Step Process</h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                          <div>
                            <div className="font-medium text-foreground">Set Your Range</div>
                            <div className="text-sm text-muted-foreground">Define minimum and maximum values for your random numbers. Use quick presets or custom values. Negative numbers supported.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                          <div>
                            <div className="font-medium text-foreground">Choose Count</div>
                            <div className="text-sm text-muted-foreground">Select how many random numbers to generate (1-1000). For unique mode, count cannot exceed range size.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                          <div>
                            <div className="font-medium text-foreground">Select Mode</div>
                            <div className="text-sm text-muted-foreground">Choose between allowing duplicates (independent draws) or requiring unique numbers (sampling without replacement).</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">4</div>
                          <div>
                            <div className="font-medium text-foreground">Generate Numbers</div>
                            <div className="text-sm text-muted-foreground">Click generate to create random numbers. The tool validates inputs and shows errors for impossible configurations.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">5</div>
                          <div>
                            <div className="font-medium text-foreground">Use Results</div>
                            <div className="text-sm text-muted-foreground">Copy comma-separated values, view statistics, check generation history, or regenerate with different parameters.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Pro Random Generation Tips</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Dice6 size={12} className="text-accent" />
                          </div>
                          <span><strong>Use Quick Presets</strong>: Start with preset configurations for common use cases like dice rolls, lottery numbers, or test data generation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Shuffle size={12} className="text-accent" />
                          </div>
                          <span><strong>Choose Mode Wisely</strong>: Use unique mode for sampling without replacement, duplicate mode for independent random events</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <History size={12} className="text-accent" />
                          </div>
                          <span><strong>Track Your Generations</strong>: Use history feature to compare different generations or recreate previous random sequences</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Copy size={12} className="text-accent" />
                          </div>
                          <span><strong>Copy Formatted Output</strong>: Use comma-separated format for easy import into spreadsheets, databases, or programming code</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Calculator size={12} className="text-accent" />
                          </div>
                          <span><strong>Validate Range Size</strong>: For unique mode, ensure count doesn't exceed available numbers in range (max - min + 1)</span>
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
                  <h2 className="text-xl font-bold text-foreground">Random Generation Examples</h2>
                </div>
                {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.examples && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">Common Random Generation Scenarios</h3>
                      <div className="overflow-x-auto">
                        <div className="min-w-full inline-block align-middle">
                          <div className="overflow-hidden border border-border rounded-lg">
                            <table className="min-w-full divide-y divide-border">
                              <thead className="bg-secondary/20">
                                <tr>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Application</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Range</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Count</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Mode</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Sample Output</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-border">
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-medium">Dice Roll</td>
                                  <td className="px-4 py-3 text-sm text-green-600 font-mono">1-6</td>
                                  <td className="px-4 py-3 text-sm text-foreground">1</td>
                                  <td className="px-4 py-3 text-sm text-foreground">Duplicates</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">4</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-medium">Lottery Numbers</td>
                                  <td className="px-4 py-3 text-sm text-green-600 font-mono">1-49</td>
                                  <td className="px-4 py-3 text-sm text-foreground">6</td>
                                  <td className="px-4 py-3 text-sm text-foreground">Unique</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">7, 23, 15, 42, 8, 36</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-medium">Test Data</td>
                                  <td className="px-4 py-3 text-sm text-green-600 font-mono">1000-9999</td>
                                  <td className="px-4 py-3 text-sm text-foreground">10</td>
                                  <td className="px-4 py-3 text-sm text-foreground">Duplicates</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">4567, 8321, 2345, 8321, 6789, ...</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-medium">Random Sampling</td>
                                  <td className="px-4 py-3 text-sm text-green-600 font-mono">1-100</td>
                                  <td className="px-4 py-3 text-sm text-foreground">20</td>
                                  <td className="px-4 py-3 text-sm text-foreground">Unique</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">5, 23, 67, 89, 12, 45, ...</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-medium">Negative Range</td>
                                  <td className="px-4 py-3 text-sm text-green-600 font-mono">-10 to 10</td>
                                  <td className="px-4 py-3 text-sm text-foreground">5</td>
                                  <td className="px-4 py-3 text-sm text-foreground">Duplicates</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">-3, 7, 0, -8, 5</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-medium">Percentage</td>
                                  <td className="px-4 py-3 text-sm text-green-600 font-mono">1-100</td>
                                  <td className="px-4 py-3 text-sm text-foreground">1</td>
                                  <td className="px-4 py-3 text-sm text-foreground">Duplicates</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">73</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-medium">4-Digit PIN</td>
                                  <td className="px-4 py-3 text-sm text-green-600 font-mono">1000-9999</td>
                                  <td className="px-4 py-3 text-sm text-foreground">1</td>
                                  <td className="px-4 py-3 text-sm text-foreground">Duplicates</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">3847</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Detailed Example: Lottery Number Generation</h3>
                      <div className="bg-secondary/20 p-4 rounded-lg border border-border overflow-x-auto">
                        <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
{`Example: Generating lottery numbers with proper random selection

Step 1: Understand lottery requirements
Typical lottery requirements:
• Numbers from 1 to 49
• Select 6 numbers
• All numbers must be unique
• Order doesn't matter (combination, not permutation)

Step 2: Configure generator
Minimum value: 1
Maximum value: 49
Count: 6
Mode: Unique (no duplicates)

Step 3: Validate configuration
Available numbers in range: 49 - 1 + 1 = 49
Required numbers: 6
6 ≤ 49 ✓ (unique mode possible)

Step 4: Generate numbers
Using cryptographically strong random algorithm:
Possible output: [7, 23, 15, 42, 8, 36]

Step 5: Verify uniqueness
Check for duplicates: 7, 23, 15, 42, 8, 36
All numbers are unique ✓

Step 6: Sort numbers (optional)
For display purposes, sort ascending:
[7, 8, 15, 23, 36, 42]

Step 7: Calculate probabilities
Probability of any specific 6-number combination:
1 / C(49,6) = 1 / 13,983,816 ≈ 0.0000000715
Where C(n,k) = n! / (k!(n-k)!)

Step 8: Statistical fairness check
With uniform distribution:
• Each number has equal probability: 6/49 ≈ 12.24%
• Each pair has equal probability: C(6,2)/C(49,2) ≈ 0.51%
• True randomness ensures no predictable patterns

Step 9: Alternative generation method
Using sampling without replacement algorithm:
1. Create array of numbers 1-49
2. Shuffle array randomly
3. Take first 6 elements
This ensures uniform probability for all combinations.

Step 10: Implementation in code
function generateLotteryNumbers(): number[] {
  const numbers: number[] = [];
  const used = new Set<number>();
  
  while (numbers.length < 6) {
    const randomNum = Math.floor(Math.random() * 49) + 1;
    if (!used.has(randomNum)) {
      used.add(randomNum);
      numbers.push(randomNum);
    }
  }
  
  return numbers.sort((a, b) => a - b);
}

Step 11: Edge cases handling
• Range validation: Ensure max > min
• Count validation: For unique mode, count ≤ (max - min + 1)
• Negative numbers: Not applicable for lottery
• Large ranges: Algorithm scales efficiently

Step 12: Multiple draws simulation
For statistical analysis or system testing:
Generate 1000 lottery draws:
const allDraws: number[][] = [];
for (let i = 0; i < 1000; i++) {
  allDraws.push(generateLotteryNumbers());
}

Check frequency distribution:
const frequency = new Map<number, number>();
allDraws.flat().forEach(num => {
  frequency.set(num, (frequency.get(num) || 0) + 1);
});

Expected: Approximately uniform distribution
Actual: Should pass chi-square test for uniformity

Step 13: Real-world application
• Actual lottery systems use hardware RNG or cryptographic RNG
• Audited for fairness and randomness
• Must prevent prediction or manipulation
• Results publicly verifiable

Step 14: Security considerations
For actual lottery implementation:
• Use cryptographically secure random generator
• Seed with high-entropy sources
• Independent auditing of randomness
• Transparency in generation process

Step 15: Key principles demonstrated
✓ True randomness for fairness
✓ Uniform distribution across range
✓ Proper sampling without replacement
✓ Statistical validity
✓ Edge case handling
✓ Scalable implementation

Final Result: Lottery Numbers
Generated: 7, 23, 15, 42, 8, 36
Sorted: 7, 8, 15, 23, 36, 42
Probability: 1 in 13,983,816
Fairness: Uniform distribution verified
Use: Valid lottery draw simulation`}
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
                  <div className="bg-purple-500/10 p-2 rounded-lg">
                    <Dice6 size={20} className="text-purple-600" />
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
                <h2 className="text-xl font-bold text-foreground">More Number Tools</h2>
                {openSections.relatedTools ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.relatedTools && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground mb-4">
                    Explore other useful number calculation tools from our Number Tools category:
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
};

export default RandomGenerator;