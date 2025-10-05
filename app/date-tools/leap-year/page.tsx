'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Copy, RotateCcw, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Header from '../../components/Header';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

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

  const copyResult = () => {
    if (result) {
      const text = `${result.year} is ${result.isLeap ? '' : 'not '}a leap year (${result.days} days)`;
      navigator.clipboard.writeText(text);
    }
  };

  const checkCurrentYear = () => {
    const currentYear = new Date().getFullYear();
    setYear(currentYear.toString());
  };

  return (
    <div className="min-h-screen bg-toolnest-bg font-inter">
      <Header />

      <div className="pt-32 pb-20 px-4">
        <div className="toolnest-container max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-toolnest-text mb-4">
                Leap Year Checker
              </h1>
              <p className="text-xl text-toolnest-text/80">
                Check if any year is a leap year with 366 days
              </p>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Enter Year to Check
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-toolnest-text mb-2">
                    Year
                  </label>
                  <Input
                    type="number"
                    placeholder="e.g., 2024"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="text-lg"
                    min="1"
                    max="9999"
                  />
                </div>

                <div className="flex gap-3">
                  <Button onClick={checkLeapYear} className="flex-1">
                    Check Leap Year
                  </Button>
                  <Button onClick={checkCurrentYear} variant="outline">
                    Current Year
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
                      Leap Year Result
                      <Button onClick={copyResult} variant="outline" size="sm">
                        <Copy className="w-4 h-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-6">
                      <h3 className="text-3xl font-bold text-toolnest-text mb-2">
                        {result.year}
                      </h3>
                      <div className={`text-xl font-semibold ${result.isLeap ? 'text-green-600' : 'text-orange-600'}`}>
                        {result.isLeap ? '✅ IS a Leap Year' : '❌ NOT a Leap Year'}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-toolnest-bg/50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-toolnest-text">{result.days}</div>
                        <div className="text-sm text-toolnest-text/70">Days in Year</div>
                      </div>
                      <div className="bg-toolnest-bg/50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-toolnest-text">{result.nextLeapYear}</div>
                        <div className="text-sm text-toolnest-text/70">Next Leap Year</div>
                      </div>
                      <div className="bg-toolnest-bg/50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-toolnest-text">{result.previousLeapYear}</div>
                        <div className="text-sm text-toolnest-text/70">Previous Leap Year</div>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">Leap Year Rules:</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Divisible by 4: Usually a leap year</li>
                        <li>• Divisible by 100: NOT a leap year</li>
                        <li>• Divisible by 400: IS a leap year</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            <Card className="mt-8">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">How this tool works</h3>
                <p className="text-toolnest-text/70">
                  Enter any year to check if it's a leap year. Leap years occur every 4 years, 
                  with exceptions for century years unless they're divisible by 400. They have 366 days instead of 365.
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