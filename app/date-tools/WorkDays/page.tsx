'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Copy, RotateCcw, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Header from '../../components/Header';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

export default function WorkDays() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [result, setResult] = useState<{
    totalDays: number;
    workdays: number;
    weekends: number;
    percentage: number;
  } | null>(null);

  const calculateWorkDays = () => {
    if (!startDate || !endDate) return;

    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start > end) return;

    let totalDays = 0;
    let workdays = 0;
    let weekends = 0;
    
    const currentDate = new Date(start);
    
    while (currentDate <= end) {
      totalDays++;
      const dayOfWeek = currentDate.getDay();
      
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        weekends++;
      } else {
        workdays++;
      }
      
      currentDate.setDate(currentDate.getDate() + 1);
    }

    const percentage = totalDays > 0 ? Math.round((workdays / totalDays) * 100) : 0;

    setResult({
      totalDays,
      workdays,
      weekends,
      percentage
    });
  };

  const clearFields = () => {
    setStartDate('');
    setEndDate('');
    setResult(null);
  };

  const copyResult = () => {
    if (result) {
      const text = `Work Days: ${result.workdays} out of ${result.totalDays} total days (${result.percentage}% work days)`;
      navigator.clipboard.writeText(text);
    }
  };

  return (
    <div className="min-h-screen bg-toolnest-bg font-inter">
      <div className="pt-32 pb-20 px-4">
        <div className="toolnest-container max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-toolnest-text mb-4">
                Work Days Calculator
              </h1>
              <p className="text-xl text-toolnest-text/80">
                Calculate work days between dates, excluding weekends
              </p>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Select Date Range
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-toolnest-text mb-2">
                      Start Date
                    </label>
                    <Input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-toolnest-text mb-2">
                      End Date
                    </label>
                    <Input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="text-lg"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button onClick={calculateWorkDays} className="flex-1">
                    Calculate Work Days
                  </Button>
                  <Button onClick={clearFields} variant="outline">
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Work Days Calculation
                      <Button onClick={copyResult} variant="outline" size="sm">
                        <Copy className="w-4 h-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-toolnest-bg/50 p-6 rounded-lg text-center">
                        <h3 className="text-3xl font-bold text-toolnest-text mb-2">
                          {result.workdays}
                        </h3>
                        <p className="text-toolnest-text/70">Work Days</p>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Total Days:</span>
                          <span className="font-semibold">{result.totalDays}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Work Days:</span>
                          <span className="font-semibold text-green-600">{result.workdays}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Weekend Days:</span>
                          <span className="font-semibold text-orange-600">{result.weekends}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Work Days %:</span>
                          <span className="font-semibold">{result.percentage}%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            <Card className="mt-8">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">How this tool works</h3>
                <p className="text-toolnest-text/70">
                  Enter a start and end date to calculate the number of work days (Monday-Friday) 
                  between them, excluding weekends. Perfect for project planning and timeline estimation.
                </p>
              </CardContent>
            </Card>

            <div className="text-center mt-8">
              <Link href="/tools" className="inline-flex items-center gap-2 text-toolnest-text hover:text-toolnest-text/80 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to Tools
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}