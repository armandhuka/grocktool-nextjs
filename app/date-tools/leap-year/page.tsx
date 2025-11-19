'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Copy, RotateCcw, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function LeapYear() {
  const [year, setYear] = useState('');
  const [result, setResult] = useState<{
    year: number;
    isLeap: boolean;
    days: number;
    nextLeapYear: number;
    previousLeapYear: number;
  } | null>(null);

  const isLeapYear = (year: number): boolean => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  };

  const findNextLeapYear = (startYear: number): number => {
    let nextYear = startYear + 1;
    while (!isLeapYear(nextYear)) {
      nextYear++;
    }
    return nextYear;
  };

  const findPreviousLeapYear = (startYear: number): number => {
    let prevYear = startYear - 1;
    while (!isLeapYear(prevYear)) {
      prevYear--;
    }
    return prevYear;
  };

  const checkLeapYear = () => {
    if (!year) return;

    const yearNum = parseInt(year);
    if (isNaN(yearNum) || yearNum < 1) return;

    const leap = isLeapYear(yearNum);
    const daysInYear = leap ? 366 : 365;
    const nextLeap = findNextLeapYear(yearNum);
    const prevLeap = findPreviousLeapYear(yearNum);

    setResult({
      year: yearNum,
      isLeap: leap,
      days: daysInYear,
      nextLeapYear: nextLeap,
      previousLeapYear: prevLeap
    });
  };

  const clearFields = () => {
    setYear('');
    setResult(null);
  };

  const copyResult = async () => {
    if (result) {
      const text = `${result.year} is ${result.isLeap ? '' : 'not '}a leap year (${result.days} days)`;
      try {
        await navigator.clipboard.writeText(text);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  const checkCurrentYear = () => {
    const currentYear = new Date().getFullYear();
    setYear(currentYear.toString());
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
                Leap Year Checker
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Check if any year is a leap year with 366 days
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
              {/* Year Input */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Calendar size={20} className="text-foreground" />
                  <label className="block text-sm font-medium text-foreground">
                    Enter Year to Check
                  </label>
                </div>
                <input
                  type="number"
                  placeholder="e.g., 2024"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  min="1"
                  max="9999"
                  className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground placeholder:text-muted-foreground"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={checkLeapYear}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent text-accent-foreground rounded-lg sm:rounded-xl hover:bg-accent/80 transition-colors text-sm sm:text-base"
                >
                  <Calendar size={16} className="sm:w-4 sm:h-4" />
                  Check Leap Year
                </button>
                <button
                  onClick={checkCurrentYear}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg sm:rounded-xl hover:bg-secondary/80 transition-colors text-sm sm:text-base"
                >
                  Current Year
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
                <h3 className="text-lg font-semibold text-foreground">Leap Year Result</h3>
                <button
                  onClick={copyResult}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Copy size={16} className="sm:w-4 sm:h-4" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Main Result Display */}
                <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
                  <div className="text-2xl font-bold text-foreground text-center mb-2">
                    {result.year}
                  </div>
                  <div className={`text-lg font-semibold text-center ${result.isLeap ? 'text-green-600' : 'text-orange-600'}`}>
                    {result.isLeap ? '✅ IS a Leap Year' : '❌ NOT a Leap Year'}
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-background p-3 rounded-lg border border-border text-center">
                    <div className="text-lg font-bold text-foreground">{result.days}</div>
                    <div className="text-xs text-muted-foreground">Days in Year</div>
                  </div>
                  <div className="bg-background p-3 rounded-lg border border-border text-center">
                    <div className="text-lg font-bold text-foreground">{result.nextLeapYear}</div>
                    <div className="text-xs text-muted-foreground">Next Leap Year</div>
                  </div>
                  <div className="bg-background p-3 rounded-lg border border-border text-center">
                    <div className="text-lg font-bold text-foreground">{result.previousLeapYear}</div>
                    <div className="text-xs text-muted-foreground">Previous Leap Year</div>
                  </div>
                </div>

                {/* Leap Year Rules */}
                <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Leap Year Rules:</h4>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span>Divisible by 4: Usually a leap year</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span>Divisible by 100: NOT a leap year</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span>Divisible by 400: IS a leap year</span>
                    </li>
                  </ul>
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
                Enter any year to check if it's a leap year. Leap years occur every 4 years, 
                with exceptions for century years unless they're divisible by 400. They have 366 days instead of 365.
              </p>
              <div className="text-xs sm:text-sm space-y-1 pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Enter a year using the number input</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Click "Check Leap Year" to verify</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Use "Current Year" to quickly check this year</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>View detailed results and leap year rules</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Copy results for sharing or reference</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Leap Year Calculation:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span>Follows Gregorian calendar rules</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span>Accounts for century year exceptions</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span>Shows adjacent leap years for context</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span>Valid for years 1 through 9999</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}