'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Grid, RotateCcw, Download, ArrowLeft, Calculator, Hash, PieChart, Zap, Target, Triangle, Circle, BarChart, ChevronUp, ChevronDown, ChevronRight } from 'lucide-react';
import Link from 'next/link';

// Type for table rows
interface TableRow {
  multiplier: number;
  result: number;
}

export default function MultiplicationTable() {
  const [number, setNumber] = useState<string>('');
  const [range, setRange] = useState<string>('12');
  const [table, setTable] = useState<TableRow[] | null>(null);
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

  const relatedTools = [
    { name: 'Advanced Calculator', path: '/math-tools/basic-calculator', icon: Calculator },
    { name: 'Prime Number Checker', path: '/math-tools/prime-checker', icon: PieChart },
    { name: 'Factorial Calculator', path: '/math-tools/factorial', icon: Hash },
    { name: 'Quadratic Equation Solver', path: '/math-tools/quadratic-solver', icon: Zap },
    { name: 'Percentage Change Calculator', path: '/math-tools/percentage-change', icon: Target },
    { name: 'Triangle Area Calculator', path: '/math-tools/triangle-area', icon: Triangle },
    { name: 'Circle Area Calculator', path: '/math-tools/circle-calculator', icon: Circle },
    { name: 'Logarithm Calculator', path: '/math-tools/exponent-log', icon: BarChart }
  ];

  const faqData = [
    {
      question: "Why are multiplication tables important to learn?",
      answer: "Multiplication tables are fundamental mathematical building blocks that enable quick mental calculations, improve number sense, and form the basis for more advanced math concepts like division, fractions, algebra, and problem-solving. Memorizing multiplication facts significantly enhances calculation speed and accuracy in daily life, academics, and professional settings."
    },
    {
      question: "What's the most effective way to memorize multiplication tables?",
      answer: "The most effective memorization strategies include: 1) Learning in chunks (master 1-5 first, then 6-10), 2) Using patterns and relationships (commutative property: 3×7 = 7×3), 3) Practicing with games and flashcards, 4) Applying tables in real-life scenarios, and 5) Using mnemonic devices. Regular practice with this generator helps reinforce learning through visual patterns."
    },
    {
      question: "What is the commutative property in multiplication tables?",
      answer: "The commutative property states that changing the order of factors does not change the product (a × b = b × a). This means that learning one multiplication fact automatically gives you another. For example, knowing 7×8=56 means you also know 8×7=56. This property effectively cuts the memorization workload almost in half."
    },
    {
      question: "How can I use this generator for teaching or learning?",
      answer: "This multiplication table generator serves as an excellent educational tool for: 1) Teachers creating customized practice sheets, 2) Students learning specific number tables, 3) Parents helping children with homework, 4) Testing knowledge with random numbers, and 5) Visualizing multiplication patterns. The downloadable format allows offline practice anywhere."
    },
    {
      question: "What are the practical applications of multiplication tables?",
      answer: "Multiplication tables have countless real-world applications including: calculating discounts and percentages while shopping, determining areas and measurements in construction, computing cooking measurements in recipes, calculating time and distance in travel planning, budgeting and financial calculations, and solving everyday problems that involve equal groupings or repeated addition scenarios."
    }
  ];

  const generateTable = () => {
    const num = parseInt(number);
    const rangeNum = parseInt(range);

    if (isNaN(num) || isNaN(rangeNum) || rangeNum < 1) {
      setTable(null);
      return;
    }

    const tableData: TableRow[] = [];
    for (let i = 1; i <= rangeNum; i++) {
      tableData.push({
        multiplier: i,
        result: num * i
      });
    }
    setTable(tableData);
  };

  const reset = () => {
    setNumber('');
    setRange('12');
    setTable(null);
  };

  const downloadTable = () => {
    if (!table || !number) return;

    const content = table
      .map(row => `${number} × ${row.multiplier} = ${row.result}`)
      .join('\n');

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `multiplication-table-${number}.txt`;
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background font-inter">
      <title>Multiplication Table Generator | Custom Times Tables Creator | ToolNest</title>
      <meta name="description" content="Free online multiplication table generator. Create custom times tables for any number with printable/downloadable formats. Perfect for learning, teaching, and mathematical practice." />
      <meta name="keywords" content="multiplication table generator, times tables, multiplication chart, math practice, educational tool, printable tables, mathematics, learning multiplication, teaching resource" />
      <meta property="og:title" content="Multiplication Table Generator | Custom Times Tables Creator" />
      <meta property="og:description" content="Free online multiplication table generator. Create custom times tables for any number with printable/downloadable formats." />
      <link rel="canonical" href="https://grocktool.com/math-tools/multiplication-table" />

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
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/10 to-blue-500/10 px-4 py-2 rounded-full mb-4 border border-green-500/20">
                <Grid size={16} className="text-green-600" />
                <span className="text-sm font-medium text-green-600">Mathematics • Education • Learning Tool</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                Multiplication Table Generator
                <span className="block text-lg sm:text-xl font-normal text-muted-foreground mt-2">
                  Create Custom Times Tables • Download & Print • Educational Resource
                </span>
              </h1>

              <div className="flex flex-wrap justify-center gap-3 mt-6 mb-8">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-lg">
                  <Grid size={14} className="text-green-600" />
                  <span className="text-xs sm:text-sm text-foreground">Table Generation</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 rounded-lg">
                  <Download size={14} className="text-blue-600" />
                  <span className="text-xs sm:text-sm text-foreground">Printable Format</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 rounded-lg">
                  <Calculator size={14} className="text-purple-600" />
                  <span className="text-xs sm:text-sm text-foreground">Educational Tool</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 rounded-lg">
                  <Target size={14} className="text-amber-600" />
                  <span className="text-xs sm:text-sm text-foreground">Math Practice</span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Generator & Results */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Test Numbers Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <div className="space-y-3">
                  <div className="text-xs text-muted-foreground">Quick Start Tables:</div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      onClick={() => {
                        setNumber('7');
                        setRange('12');
                      }}
                      className="px-3 py-2 bg-green-500/10 text-green-600 rounded-lg hover:bg-green-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Zap size={12} />
                      7 Times Table
                    </button>
                    <button
                      onClick={() => {
                        setNumber('12');
                        setRange('15');
                      }}
                      className="px-3 py-2 bg-blue-500/10 text-blue-600 rounded-lg hover:bg-blue-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Zap size={12} />
                      12 Times Table
                    </button>
                    <button
                      onClick={() => {
                        setNumber('25');
                        setRange('10');
                      }}
                      className="px-3 py-2 bg-purple-500/10 text-purple-600 rounded-lg hover:bg-purple-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Zap size={12} />
                      25 Times Table
                    </button>
                    <button
                      onClick={() => {
                        setNumber('3');
                        setRange('20');
                      }}
                      className="px-3 py-2 bg-amber-500/10 text-amber-600 rounded-lg hover:bg-amber-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Zap size={12} />
                      3 Times Table
                    </button>
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
                      <Grid size={20} className="text-foreground" />
                      <label className="block text-sm font-medium text-foreground">
                        Multiplication Table Generator
                      </label>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-green-600">
                      <Zap size={12} />
                      <span>Educational mathematics</span>
                    </div>
                  </div>

                  {/* Inputs */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      {/* Number */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-foreground">
                          Base Number
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            placeholder="e.g., 7, 12, 25"
                            className="w-full p-3 pl-10 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg"
                          />
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <Hash size={16} className="text-muted-foreground" />
                          </div>
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <div className="bg-green-500 text-white rounded-full p-1">
                              <Zap size={10} />
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground text-center">
                          Enter the number you want to generate the multiplication table for
                        </p>
                      </div>

                      {/* Range */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-foreground">
                          Table Range (1 to)
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            value={range}
                            onChange={(e) => setRange(e.target.value)}
                            placeholder="e.g., 10, 12, 20"
                            className="w-full p-3 pl-10 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg"
                            min="1"
                          />
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <Grid size={16} className="text-muted-foreground" />
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground text-center">
                          Choose how many multiples to generate (typically 10, 12, or 20)
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Common Ranges */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      Common Table Ranges
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {[10, 12, 15, 20, 25].map((rangeValue) => (
                        <button
                          key={rangeValue}
                          onClick={() => setRange(rangeValue.toString())}
                          className="px-2 py-1.5 text-xs bg-blue-500/10 text-blue-600 rounded border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
                        >
                          Up to {rangeValue}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={generateTable}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg sm:rounded-xl hover:from-green-700 hover:to-blue-700 transition-all text-sm sm:text-base font-medium shadow-md hover:shadow-lg"
                    >
                      <Grid size={16} className="sm:w-4 sm:h-4" />
                      Generate Multiplication Table
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

              {/* Results */}
              {table && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
                >

                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground">
                      Multiplication Table for {number}
                    </h3>

                    <button
                      onClick={downloadTable}
                      className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                      title="Download Table"
                    >
                      <Download size={16} />
                    </button>
                  </div>

                  <div className="space-y-6">

                    {/* Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                      {table.map((row, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-br from-green-500/10 to-blue-500/10 p-3 rounded-lg border border-green-500/20 text-center hover:from-green-500/20 hover:to-blue-500/20 transition-all duration-200 hover:scale-[1.02]"
                        >
                          <div className="text-sm font-medium text-muted-foreground">{number} × {row.multiplier}</div>
                          <div className="text-lg font-bold text-foreground">{row.result}</div>
                        </div>
                      ))}
                    </div>

                    {/* Table Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gradient-to-r from-green-500/5 to-green-600/5 p-4 rounded-lg border border-green-500/20">
                        <div className="text-sm text-muted-foreground">Base Number</div>
                        <div className="text-lg font-semibold text-foreground font-mono text-center">
                          {number}
                        </div>
                        <div className="text-xs text-muted-foreground text-center mt-1">
                          Multiples generated from 1 to {range}
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-blue-500/5 to-blue-600/5 p-4 rounded-lg border border-blue-500/20">
                        <div className="text-sm text-muted-foreground">Table Size</div>
                        <div className="text-lg font-semibold text-foreground font-mono text-center">
                          1 to {range} ({table.length} entries)
                        </div>
                        <div className="text-xs text-muted-foreground text-center mt-1">
                          Total calculations: {table.length}
                        </div>
                      </div>
                    </div>

                    {/* Mathematical Patterns */}
                    <div className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 p-4 rounded-lg border border-purple-500/20">
                      <h4 className="text-sm font-medium text-foreground mb-2">Mathematical Patterns & Observations:</h4>
                      <div className="text-sm text-muted-foreground space-y-2">
                        <div className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-500 rounded-full mt-2"></div>
                          <span><strong>Constant Difference:</strong> Each result increases by {number} (arithmetic progression)</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-500 rounded-full mt-2"></div>
                          <span><strong>Commutative Property:</strong> {number}×{range} = {parseInt(number) * parseInt(range)} = {range}×{number}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-500 rounded-full mt-2"></div>
                          <span><strong>Even/Odd Pattern:</strong> Product is even when {number} is even or multiplier is even</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-500 rounded-full mt-2"></div>
                          <span><strong>Final Value:</strong> {number} × {range} = {parseInt(number) * parseInt(range)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Reference */}
                    <div className="p-4 bg-gradient-to-r from-amber-500/10 to-amber-600/10 rounded-lg border border-amber-500/20">
                      <h4 className="text-sm font-medium text-foreground mb-2">Quick Reference Highlights:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-muted-foreground">
                        <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                          <span className="font-semibold text-foreground">First Entry</span>
                          <span className="font-mono">{number} × 1 = {parseInt(number) * 1}</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                          <span className="font-semibold text-foreground">Middle Entry</span>
                          <span className="font-mono">{number} × {Math.floor(parseInt(range)/2)} = {parseInt(number) * Math.floor(parseInt(range)/2)}</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                          <span className="font-semibold text-foreground">Last Entry</span>
                          <span className="font-mono">{number} × {range} = {parseInt(number) * parseInt(range)}</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                          <span className="font-semibold text-foreground">Total Sum</span>
                          <span className="font-mono">{number} × ({range}×({parseInt(range)}+1)/2) = {parseInt(number) * (parseInt(range)*(parseInt(range)+1)/2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Multiplication Guide Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Grid size={18} className="text-green-600" />
                  Multiplication Tables Complete Guide
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  {/* Learning Strategies */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-green-500/10 p-2 rounded-lg">
                        <Grid size={16} className="text-green-600" />
                      </div>
                      <h4 className="text-sm font-medium text-foreground">Effective Learning Strategies</h4>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Chunking Method:</strong> Learn tables in groups (0-5 first, then 6-10)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Pattern Recognition:</strong> Notice repeating patterns and relationships</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Daily Practice:</strong> Regular short sessions are more effective than occasional long ones</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Real Applications:</strong> Use tables in shopping, cooking, and daily calculations</span>
                      </div>
                    </div>
                  </div>

                  {/* Mathematical Properties */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-blue-500/10 p-2 rounded-lg">
                        <Calculator size={16} className="text-blue-600" />
                      </div>
                      <h4 className="text-sm font-medium text-foreground">Key Mathematical Properties</h4>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Commutative Property:</strong> a × b = b × a (order doesn't matter)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Distributive Property:</strong> a × (b + c) = a×b + a×c</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Identity Property:</strong> a × 1 = a (1 is the multiplicative identity)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Zero Property:</strong> a × 0 = 0 (anything times zero is zero)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
                  <h4 className="text-sm font-medium text-foreground mb-2">Essential Multiplication Facts</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-muted-foreground">
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-foreground">1-5 Tables</span>
                      <span className="font-mono">Foundation for all multiplication</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-foreground">6-10 Tables</span>
                      <span className="font-mono">Builds on 1-5 knowledge</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-foreground">11-12 Tables</span>
                      <span className="font-mono">Extended practice for mastery</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-foreground">Pattern Recognition</span>
                      <span className="font-mono">Key to quick mental math</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Empty as requested */}
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
                  <div className="bg-green-500/10 p-2 rounded-lg">
                    <Grid size={20} className="text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Multiplication Table Generator - Educational Mathematics Tool</h2>
                </div>
                {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>

              {openSections.whatItDoes && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground mb-4">
                    This Multiplication Table Generator is a comprehensive educational tool designed to create customized times tables for any number with flexible range options. It serves students, teachers, parents, and anyone needing to practice or teach multiplication facts. The tool generates clean, organized multiplication tables that can be studied online or downloaded for offline practice. Beyond simple table generation, it highlights mathematical patterns, demonstrates the commutative property, and provides educational insights about multiplication concepts. With support for custom ranges from 1 to any positive number, this generator adapts to different learning levels—from basic 10×10 tables for beginners to extended tables for advanced practice. The downloadable format makes it perfect for classroom worksheets, homework assignments, or personal study sessions.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Grid size={18} className="text-green-600" />
                        <h3 className="font-semibold text-foreground">Custom Table Generation</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Create multiplication tables for any number with adjustable range settings from 1 to any positive integer, accommodating all learning levels.</p>
                    </div>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Download size={18} className="text-blue-600" />
                        <h3 className="font-semibold text-foreground">Printable & Downloadable</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Download generated tables in text format for printing, creating worksheets, or offline study sessions anywhere, anytime.</p>
                    </div>
                    <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Calculator size={18} className="text-purple-600" />
                        <h3 className="font-semibold text-foreground">Educational Features</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Highlights mathematical patterns, demonstrates properties, and provides learning strategies for effective multiplication mastery.</p>
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
                    <Calculator size={20} className="text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Multiplication Table Applications & Use Cases</h2>
                </div>
                {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>

              {openSections.useCases && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">🏫 Education & Learning Environments</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Classroom Teaching</strong>: Teachers generating customized worksheets for different student levels and creating visual aids for multiplication lessons</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Homework Assignments</strong>: Creating targeted practice sheets for specific multiplication tables that students struggle with</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Special Education</strong>: Generating simplified tables with smaller ranges for students with learning difficulties</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Homeschooling Resources</strong>: Parents creating comprehensive multiplication curriculum materials for home education</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">🧠 Learning & Skill Development</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Memorization Practice</strong>: Students creating tables for numbers they find challenging and using generated tables for daily drilling</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Pattern Recognition</strong>: Studying generated tables to identify mathematical patterns, relationships, and properties visually</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Test Preparation</strong>: Generating random number tables for multiplication speed tests and accuracy practice</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Concept Reinforcement</strong>: Visualizing multiplication as repeated addition through structured table layouts</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">🔧 Practical & Professional Applications</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Tutoring Sessions</strong>: Private tutors creating personalized multiplication materials for individual student needs</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Curriculum Development</strong>: Educational publishers and content creators designing multiplication learning materials</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Quick Reference Creation</strong>: Making portable multiplication reference charts for work, study, or daily use</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Professional Training</strong>: Creating multiplication resources for vocational training where quick calculations are needed</span>
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
                  <div className="bg-amber-500/10 p-2 rounded-lg">
                    <Grid size={20} className="text-amber-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">How to Use Multiplication Table Generator - Complete Guide</h2>
                </div>
                {openSections.howToUse ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>

              {openSections.howToUse && (
                <div className="px-6 pb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Simple 4-Step Process</h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                          <div>
                            <div className="font-medium text-foreground">Enter Base Number</div>
                            <div className="text-sm text-muted-foreground">Input the number you want to generate the multiplication table for (e.g., 7 for the 7 times table).</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                          <div>
                            <div className="font-medium text-foreground">Set Table Range</div>
                            <div className="text-sm text-muted-foreground">Choose how many multiples to generate (typically 10, 12, or 20 for comprehensive tables).</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                          <div>
                            <div className="font-medium text-foreground">Generate Table</div>
                            <div className="text-sm text-muted-foreground">Click "Generate Multiplication Table" to create your customized times table instantly.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">4</div>
                          <div>
                            <div className="font-medium text-foreground">Download & Practice</div>
                            <div className="text-sm text-muted-foreground">Download the table for offline practice or study the patterns and properties online.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Effective Learning Tips</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Zap size={12} className="text-accent" />
                          </div>
                          <span><strong>Start Small</strong>: Begin with tables 1-5, master them, then progress to 6-10 and beyond</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Grid size={12} className="text-accent" />
                          </div>
                          <span><strong>Use Patterns</strong>: Notice that 7×8=56 and 8×7=56 (commutative property reduces memorization)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Target size={12} className="text-accent" />
                          </div>
                          <span><strong>Daily Practice</strong>: Short, frequent practice sessions (10-15 minutes daily) are more effective than long sessions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Calculator size={12} className="text-accent" />
                          </div>
                          <span><strong>Real-World Application</strong>: Practice with shopping calculations, cooking measurements, and time calculations</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Download size={12} className="text-accent" />
                          </div>
                          <span><strong>Portable Practice</strong>: Download tables and carry them for practice during commute or waiting times</span>
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
                    <Grid size={20} className="text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Multiplication Table Examples & Patterns</h2>
                </div>
                {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>

              {openSections.examples && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">Common Multiplication Table Examples</h3>
                      <div className="overflow-x-auto">
                        <div className="min-w-full inline-block align-middle">
                          <div className="overflow-hidden border border-border rounded-lg">
                            <table className="min-w-full divide-y divide-border">
                              <thead className="bg-secondary/20">
                                <tr>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Table</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Key Facts</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Patterns</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Learning Tips</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-border">
                                <tr>
                                  <td className="px-4 py-3 text-sm text-green-600 font-mono font-bold">2× Table</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">2,4,6,8,10,12,14,16,18,20</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">All results even, skip counting by 2</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Relate to doubling, pairs, and even numbers</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-green-600 font-mono font-bold">5× Table</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">5,10,15,20,25,30,35,40,45,50</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Ends with 5 or 0, skip counting by 5</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Relate to clock (minutes), money (nickels)</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-green-600 font-mono font-bold">9× Table</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">9,18,27,36,45,54,63,72,81,90</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Digits sum to 9, pattern in tens place</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Use finger trick, notice 9×n = 10×n - n</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-green-600 font-mono font-bold">10× Table</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">10,20,30,40,50,60,70,80,90,100</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Add zero to multiplier, skip counting by 10</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Foundation for decimal system, place value</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-green-600 font-mono font-bold">12× Table</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">12,24,36,48,60,72,84,96,108,120</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Useful for time, dozens, measurement</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Learn 11× first, then add the number</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Detailed Example: 7 Times Table Analysis</h3>
                      <div className="bg-secondary/20 p-4 rounded-lg border border-border overflow-x-auto">
                        <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
{`Example: Complete analysis of 7 times table (7 × 1 to 7 × 12)

Step 1: Generate the table
Base Number: 7
Range: 12
Table Generation:

1. 7 × 1 = 7
2. 7 × 2 = 14
3. 7 × 3 = 21
4. 7 × 4 = 28
5. 7 × 5 = 35
6. 7 × 6 = 42
7. 7 × 7 = 49
8. 7 × 8 = 56
9. 7 × 9 = 63
10. 7 × 10 = 70
11. 7 × 11 = 77
12. 7 × 12 = 84

Step 2: Pattern Analysis
• Last Digit Pattern: 7, 4, 1, 8, 5, 2, 9, 6, 3, 0, 7, 4
  This cycles every 10: 7,4,1,8,5,2,9,6,3,0 repeats
• Tens Digit Pattern: 0,1,2,2,3,4,4,5,6,7,7,8
• Sum of Digits Pattern: 
  7 (7), 1+4=5, 2+1=3, 2+8=10→1, 3+5=8, 4+2=6, 4+9=13→4, 5+6=11→2, 6+3=9, 7+0=7, 7+7=14→5, 8+4=12→3

Step 3: Mathematical Properties
• Arithmetic Progression: Each result increases by 7
• Commutative Property Examples:
  7 × 8 = 56 and 8 × 7 = 56
  7 × 6 = 42 and 6 × 7 = 42
• Distributive Property Demonstration:
  7 × 8 = 7 × (4 + 4) = (7 × 4) + (7 × 4) = 28 + 28 = 56
  7 × 12 = 7 × (10 + 2) = (7 × 10) + (7 × 2) = 70 + 14 = 84

Step 4: Memory Techniques for 7× Table
1. Double and Add: 7×4 = double 7×2 (14) = 28
2. Use Known Facts: 7×8 = 56 (5,6,7,8 sequence)
3. Relate to 5× Table: 7×n = (5×n) + (2×n)
   Example: 7×6 = (5×6) + (2×6) = 30 + 12 = 42
4. Pattern Recognition: 7,14,21,28,35,42,49,56,63,70

Step 5: Real-World Applications
• Days in Weeks: 7 days × 4 weeks = 28 days ≈ 1 month
• Time Calculations: 7 hours × 60 minutes = 420 minutes
• Measurement: 7 feet × 12 inches = 84 inches
• Money: 7 items × $8 each = $56 total
• Cooking: 7 cups × 240 ml = 1,680 ml

Step 6: Learning Progression Strategy
Week 1: Master 7×1 to 7×5 (7,14,21,28,35)
Week 2: Master 7×6 to 7×10 (42,49,56,63,70)
Week 3: Master 7×11 to 7×12 (77,84)
Week 4: Mixed practice and speed tests

Step 7: Common Mistakes to Avoid
• Confusing 7×8=56 with 8×8=64
• Mixing up 7×6=42 and 6×7=42 (same result, different context)
• Forgetting that 7×12=84 (not 82 or 86)
• Missing the pattern in the ones place

Step 8: Practice Exercises
1. Fill in the blanks: 7 × __ = 63, 7 × 8 = __, __ × 7 = 35
2. Word problems: "If each box has 7 pencils, how many in 9 boxes?"
3. Speed drill: Time yourself reciting 7× table in order
4. Reverse practice: 84 ÷ 7 = ?, 56 ÷ 7 = ?, 21 ÷ 7 = ?

Step 9: Advanced Connections
• Prime Factorization: 7 is prime, so 7×n products have 7 as factor
• Algebra Connection: 7x represents linear relationship with slope 7
• Geometry: Area of rectangle with sides 7 and n = 7n
• Probability: 7 possible outcomes in some probability scenarios

Step 10: Mastery Verification
✓ Can recite table forward and backward
✓ Can answer random 7× questions within 3 seconds
✓ Can apply 7× facts to word problems
✓ Can explain patterns and properties
✓ Can use 7× facts to solve related division problems

Final Mastery: Complete understanding of 7 times table as both 
memorized facts and conceptual mathematical relationships.`}
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
                  <div className="bg-green-500/10 p-2 rounded-lg">
                    <Grid size={20} className="text-green-600" />
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