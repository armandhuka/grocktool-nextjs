'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Grid, RotateCcw, Download, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
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
              Multiplication Table Generator
            </h1>
            <p className="text-xl text-toolnest-text/80 max-w-2xl mx-auto">
              Generate multiplication tables for any number with custom range
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
                  <Grid className="w-6 h-6 text-toolnest-text" />
                  Multiplication Table Generator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-toolnest-text mb-2">
                      Number
                    </label>
                    <Input
                      type="number"
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                      placeholder="e.g., 7"
                      className="text-lg text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-toolnest-text mb-2">
                      Range (up to)
                    </label>
                    <Input
                      type="number"
                      value={range}
                      onChange={(e) => setRange(e.target.value)}
                      placeholder="e.g., 12"
                      className="text-lg text-center"
                      min="1"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button onClick={generateTable} className="bg-toolnest-text hover:bg-toolnest-text/90">
                    <Grid className="w-4 h-4 mr-2" />
                    Generate Table
                  </Button>
                  <Button onClick={reset} variant="outline">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                  {table && (
                    <Button onClick={downloadTable} variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  )}
                </div>

                {table && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-6"
                  >
                    <div className="p-4 bg-toolnest-accent/20 rounded-lg border">
                      <h3 className="text-lg font-semibold text-toolnest-text mb-4">
                        Multiplication Table for {number}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {table.map((row, index) => (
                          <div
                            key={index}
                            className="p-2 bg-white rounded border text-center font-mono"
                          >
                            {number} × {row.multiplier} = {row.result}
                          </div>
                        ))}
                      </div>
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
                  This tool generates multiplication tables for any number up to your chosen range. 
                  It's perfect for learning multiplication facts, homework help, or quick reference.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}