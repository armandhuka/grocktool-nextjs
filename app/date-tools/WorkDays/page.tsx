'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Copy, RotateCcw, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

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

  const copyResult = async () => {
    if (result) {
      const text = `Work Days: ${result.workdays} out of ${result.totalDays} total days (${result.percentage}% work days)`;
      try {
        await navigator.clipboard.writeText(text);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
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
                Work Days Calculator
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Calculate work days between dates, excluding weekends
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
              {/* Date Inputs */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Calendar size={20} className="text-foreground" />
                  <label className="block text-sm font-medium text-foreground">
                    Select Date Range
                  </label>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm text-muted-foreground">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm text-muted-foreground">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={calculateWorkDays}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent text-accent-foreground rounded-lg sm:rounded-xl hover:bg-accent/80 transition-colors text-sm sm:text-base"
                >
                  <Calendar size={16} className="sm:w-4 sm:h-4" />
                  Calculate Work Days
                </button>
                <button
                  onClick={clearFields}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg sm:rounded-xl hover:bg-secondary/80 transition-colors text-sm sm:text-base"
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
              className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 mb-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Work Days Calculation</h3>
                <button
                  onClick={copyResult}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Copy size={16} className="sm:w-4 sm:h-4" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Main Work Days Display */}
                <div className="bg-accent/10 p-4 rounded-lg border border-accent/20 text-center">
                  <div className="text-2xl font-bold text-foreground mb-2">
                    {result.workdays} Work Days
                  </div>
                  <div className="text-sm text-muted-foreground">
                    out of {result.totalDays} total days
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-background p-3 rounded-lg border border-border text-center">
                    <div className="text-lg font-bold text-foreground">{result.totalDays}</div>
                    <div className="text-xs text-muted-foreground">Total Days</div>
                  </div>
                  <div className="bg-background p-3 rounded-lg border border-green-200 text-center">
                    <div className="text-lg font-bold text-green-600">{result.workdays}</div>
                    <div className="text-xs text-muted-foreground">Work Days</div>
                  </div>
                  <div className="bg-background p-3 rounded-lg border border-orange-200 text-center">
                    <div className="text-lg font-bold text-orange-600">{result.weekends}</div>
                    <div className="text-xs text-muted-foreground">Weekend Days</div>
                  </div>
                  <div className="bg-background p-3 rounded-lg border border-border text-center">
                    <div className="text-lg font-bold text-foreground">{result.percentage}%</div>
                    <div className="text-xs text-muted-foreground">Work Days %</div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Date Range</span>
                    <span className="font-semibold text-foreground text-right">
                      {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Work Days Percentage</span>
                    <span className="font-semibold text-foreground">{result.percentage}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Weekend Days Percentage</span>
                    <span className="font-semibold text-foreground">{100 - result.percentage}%</span>
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
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">How this tool works</h3>
            <div className="space-y-2 text-muted-foreground text-sm">
              <p>
                Enter a start and end date to calculate the number of work days (Monday-Friday) 
                between them, excluding weekends. Perfect for project planning and timeline estimation.
              </p>
              <div className="text-xs sm:text-sm space-y-1 pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Select start and end dates using the date pickers</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Click "Calculate Work Days" to get results</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>View work days count and detailed breakdown</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>See percentage of work days vs weekend days</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Copy results for project planning or reporting</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Calculation Method:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span>Counts all days between start and end dates (inclusive)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span>Excludes Saturdays and Sundays as weekend days</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span>Includes all weekdays (Monday-Friday) as work days</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span>Calculates percentages based on total days</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}