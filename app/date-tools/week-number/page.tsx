'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Copy, RotateCcw, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function WeekNumber() {
  const [selectedDate, setSelectedDate] = useState('');
  const [result, setResult] = useState<{
    date: string;
    weekNumber: number;
    year: number;
    dayOfWeek: string;
    dayOfYear: number;
    isCurrentWeek: boolean;
  } | null>(null);

  const getWeekNumber = (date: Date): number => {
    const startDate = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000));
    return Math.ceil(days / 7);
  };

  const getDayOfYear = (date: Date): number => {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - start.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  const checkWeekNumber = () => {
    if (!selectedDate) return;

    const date = new Date(selectedDate);
    const weekNumber = getWeekNumber(date);
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
    const dayOfYear = getDayOfYear(date);
    
    const today = new Date();
    const currentWeek = getWeekNumber(today);
    const isCurrentWeek = weekNumber === currentWeek && date.getFullYear() === today.getFullYear();

    setResult({
      date: date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      weekNumber,
      year: date.getFullYear(),
      dayOfWeek,
      dayOfYear,
      isCurrentWeek
    });
  };

  const clearFields = () => {
    setSelectedDate('');
    setResult(null);
  };

  const copyResult = () => {
    if (result) {
      const text = `${result.date} is in Week ${result.weekNumber} of ${result.year}`;
      navigator.clipboard.writeText(text);
    }
  };

  const setToday = () => {
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    setSelectedDate(todayString);
  };

  // Auto-calculate when date changes
  useEffect(() => {
    if (selectedDate) {
      checkWeekNumber();
    }
  }, [selectedDate]);

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
                Week Number Checker
              </h1>
              <p className="text-xl text-toolnest-text/80">
                Find out which week of the year any date falls in
              </p>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Select Date
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-toolnest-text mb-2">
                    Date
                  </label>
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div className="flex gap-3">
                  <Button onClick={setToday} className="flex-1">
                    Today
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
                      Week Number Result
                      <Button onClick={copyResult} variant="outline" size="sm">
                        <Copy className="w-4 h-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-6">
                      <h3 className="text-lg text-toolnest-text/70 mb-2">
                        {result.date}
                      </h3>
                      <div className="text-4xl font-bold text-toolnest-text mb-2">
                        Week {result.weekNumber}
                      </div>
                      {result.isCurrentWeek && (
                        <div className="text-green-600 font-semibold">
                          📅 This is the current week!
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-toolnest-bg/50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-toolnest-text">{result.weekNumber}</div>
                        <div className="text-sm text-toolnest-text/70">Week of Year</div>
                      </div>
                      <div className="bg-toolnest-bg/50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-toolnest-text">{result.dayOfYear}</div>
                        <div className="text-sm text-toolnest-text/70">Day of Year</div>
                      </div>
                      <div className="bg-toolnest-bg/50 p-4 rounded-lg text-center">
                        <div className="text-xl font-bold text-toolnest-text">{result.dayOfWeek}</div>
                        <div className="text-sm text-toolnest-text/70">Day of Week</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Year:</span>
                        <span className="font-semibold">{result.year}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Day of Week:</span>
                        <span className="font-semibold">{result.dayOfWeek}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Week Number:</span>
                        <span className="font-semibold">Week {result.weekNumber} of {result.year}</span>
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
                  Select any date to find out which week of the year it falls in. Week numbers start from 1 
                  and go up to 52 or 53, depending on the year. Perfect for project planning and scheduling.
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