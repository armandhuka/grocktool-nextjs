'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Copy, RotateCcw, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

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

  const copyResult = async () => {
    if (result) {
      const text = `${result.date} is in Week ${result.weekNumber} of ${result.year}`;
      try {
        await navigator.clipboard.writeText(text);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
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
                Week Number Checker
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Find out which week of the year any date falls in
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
              {/* Date Input */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Calendar size={20} className="text-foreground" />
                  <label className="block text-sm font-medium text-foreground">
                    Select Date
                  </label>
                </div>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={setToday}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent text-accent-foreground rounded-lg sm:rounded-xl hover:bg-accent/80 transition-colors text-sm sm:text-base"
                >
                  <Calendar size={16} className="sm:w-4 sm:h-4" />
                  Today
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
                <h3 className="text-lg font-semibold text-foreground">Week Number Result</h3>
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
                  <div className="text-sm text-muted-foreground text-center mb-2">
                    {result.date}
                  </div>
                  <div className="text-2xl font-bold text-foreground text-center mb-2">
                    Week {result.weekNumber}
                  </div>
                  {result.isCurrentWeek && (
                    <div className="text-green-600 font-semibold text-center">
                      📅 This is the current week!
                    </div>
                  )}
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-background p-3 rounded-lg border border-border text-center">
                    <div className="text-lg font-bold text-foreground">{result.weekNumber}</div>
                    <div className="text-xs text-muted-foreground">Week of Year</div>
                  </div>
                  <div className="bg-background p-3 rounded-lg border border-border text-center">
                    <div className="text-lg font-bold text-foreground">{result.dayOfYear}</div>
                    <div className="text-xs text-muted-foreground">Day of Year</div>
                  </div>
                  <div className="bg-background p-3 rounded-lg border border-border text-center">
                    <div className="text-base font-bold text-foreground">{result.dayOfWeek}</div>
                    <div className="text-xs text-muted-foreground">Day of Week</div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Year</span>
                    <span className="font-semibold text-foreground">{result.year}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Day of Week</span>
                    <span className="font-semibold text-foreground">{result.dayOfWeek}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Week Number</span>
                    <span className="font-semibold text-foreground">Week {result.weekNumber} of {result.year}</span>
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
                Select any date to find out which week of the year it falls in. Week numbers start from 1 
                and go up to 52 or 53, depending on the year. Perfect for project planning and scheduling.
              </p>
              <div className="text-xs sm:text-sm space-y-1 pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Select a date using the date picker</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Use "Today" to quickly check current date</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>View week number and additional date information</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>See if it's the current week</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Copy results for sharing or documentation</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Week Calculation:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span>Weeks start from January 1st each year</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span>Calculates day of year and week number</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span>Shows complete date information</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span>Highlights if it's the current week</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}