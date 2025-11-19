'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Grid, RotateCcw, Download, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function MultiplicationTable() {
  const [number, setNumber] = useState('');
  const [range, setRange] = useState('12');
  const [table, setTable] = useState<Array<{ multiplier: number; result: number }> | null>(null);

  const generateTable = () => {
    const num = parseInt(number);
    const rangeNum = parseInt(range);
    
    if (isNaN(num) || isNaN(rangeNum) || rangeNum < 1) {
      setTable(null);
      return;
    }

    const tableData = [];
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
                Multiplication Table Generator
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Generate multiplication tables for any number with custom range
              </p>
            </motion.div>
          </div>

          {/* Main Tool Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 mb-6 shadow-sm"
          >
            <div className="space-y-6">
              {/* Input Fields */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Grid size={20} className="text-foreground" />
                  <label className="block text-sm font-medium text-foreground">
                    Table Settings
                  </label>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      Number
                    </label>
                    <input
                      type="number"
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                      placeholder="e.g., 7"
                      className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      Range (up to)
                    </label>
                    <input
                      type="number"
                      value={range}
                      onChange={(e) => setRange(e.target.value)}
                      placeholder="e.g., 12"
                      className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg"
                      min="1"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={generateTable}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent text-accent-foreground rounded-lg sm:rounded-xl hover:bg-accent/80 transition-colors text-sm sm:text-base"
                >
                  <Grid size={16} className="sm:w-4 sm:h-4" />
                  Generate Table
                </button>
                <button
                  onClick={reset}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg sm:rounded-xl hover:bg-secondary/80 transition-colors text-sm sm:text-base"
                >
                  <RotateCcw size={16} className="sm:w-4 sm:h-4" />
                  Clear All
                </button>
              </div>
            </div>
          </motion.div>

          {/* Results Card */}
          {table && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 mb-6 shadow-sm"
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
                  <Download size={16} className="sm:w-4 sm:h-4" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Table Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {table.map((row, index) => (
                    <div
                      key={index}
                      className="bg-accent/10 p-3 rounded-lg border border-accent/20 text-center hover:bg-accent/20 transition-colors"
                    >
                      <div className="text-sm font-medium text-foreground">
                        {number} × {row.multiplier}
                      </div>
                      <div className="text-lg font-bold text-foreground mt-1">
                        {row.result}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Table Info */}
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-secondary/20 p-3 rounded-lg">
                    <div className="text-xs text-muted-foreground">Base Number</div>
                    <div className="font-semibold text-foreground">{number}</div>
                  </div>
                  <div className="bg-secondary/20 p-3 rounded-lg">
                    <div className="text-xs text-muted-foreground">Table Size</div>
                    <div className="font-semibold text-foreground">1 to {range}</div>
                  </div>
                </div>

                {/* Pattern Info */}
                <div className="bg-muted p-4 rounded-lg">
                  <div className="text-sm font-medium text-foreground mb-2">Pattern Observation:</div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>• Each result increases by {number}</div>
                    <div>• The table shows multiples of {number}</div>
                    <div>• Last number: {number} × {range} = {number * parseInt(range)}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
          >
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">How Multiplication Tables Work</h3>
            <div className="space-y-2 text-muted-foreground text-sm">
              <p>
                Multiplication tables show the results of multiplying a number by a sequence of integers. 
                They are fundamental building blocks for mathematics and essential for mental math.
              </p>
              <div className="text-xs sm:text-sm space-y-1 pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Enter any number you want to generate a table for</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Set the range (how many multiples to generate)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Click "Generate Table" to create the multiplication table</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Download the table for offline use or printing</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Observe patterns and relationships in the results</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Common Multiplication Tables:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Table of 2:</strong> 2, 4, 6, 8, 10, 12, 14, 16, 18, 20</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Table of 5:</strong> 5, 10, 15, 20, 25, 30, 35, 40, 45, 50</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Table of 10:</strong> 10, 20, 30, 40, 50, 60, 70, 80, 90, 100</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Table of 12:</strong> 12, 24, 36, 48, 60, 72, 84, 96, 108, 120</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Learning Benefits:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                  <span><strong>Mental Math:</strong> Improves calculation speed and accuracy</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                  <span><strong>Pattern Recognition:</strong> Helps identify mathematical patterns</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                  <span><strong>Foundation Skills:</strong> Essential for advanced mathematics</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                  <span><strong>Problem Solving:</strong> Builds confidence in mathematical reasoning</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Practical Applications:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                  <span><strong>Everyday Calculations:</strong> Shopping, cooking, measurements</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                  <span><strong>Academic Use:</strong> Homework, exams, classroom learning</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                  <span><strong>Professional Use:</strong> Quick calculations in various fields</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                  <span><strong>Teaching Aid:</strong> Educators creating learning materials</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Tips for Learning:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                  <span>Start with smaller tables (2, 5, 10) and gradually progress</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                  <span>Practice regularly for better retention</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                  <span>Look for patterns to make memorization easier</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                  <span>Use the download feature to create study materials</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}