'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Copy, RotateCcw, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function BirthdayCountdown() {
  const [birthDate, setBirthDate] = useState('');
  const [name, setName] = useState('');
  const [result, setResult] = useState<{
    nextBirthday: string;
    daysUntil: number;
    weeksUntil: number;
    monthsUntil: number;
    age: number;
    nextAge: number;
    isPastThisYear: boolean;
  } | null>(null);

  const calculateBirthdayCountdown = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const today = new Date();
    
    // Calculate current age
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    // Calculate next birthday
    const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    
    // If birthday has passed this year, set it for next year
    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }

    const timeDiff = nextBirthday.getTime() - today.getTime();
    const daysUntil = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    const weeksUntil = Math.floor(daysUntil / 7);
    const monthsUntil = Math.floor(daysUntil / 30.44); // Average days per month

    setResult({
      nextBirthday: nextBirthday.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      daysUntil,
      weeksUntil,
      monthsUntil,
      age,
      nextAge: age + 1,
      isPastThisYear: nextBirthday.getFullYear() > today.getFullYear()
    });
  };

  const clearFields = () => {
    setBirthDate('');
    setName('');
    setResult(null);
  };

  const copyResult = async () => {
    if (result) {
      const text = `${name ? `${name}'s` : 'Next'} birthday is in ${result.daysUntil} days (${result.nextBirthday}) - turning ${result.nextAge}!`;
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
                Birthday Countdown
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Find out how many days until your next birthday
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
              {/* Name Input */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Gift size={20} className="text-foreground" />
                  <label className="block text-sm font-medium text-foreground">
                    Name (Optional)
                  </label>
                </div>
                <input
                  type="text"
                  placeholder="Enter your name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground placeholder:text-muted-foreground"
                />
              </div>

              {/* Date Input */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Gift size={20} className="text-foreground" />
                  <label className="block text-sm font-medium text-foreground">
                    Birth Date
                  </label>
                </div>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={calculateBirthdayCountdown}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent text-accent-foreground rounded-lg sm:rounded-xl hover:bg-accent/80 transition-colors text-sm sm:text-base"
                >
                  <Gift size={16} className="sm:w-4 sm:h-4" />
                  Calculate Countdown
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
                <h3 className="text-lg font-semibold text-foreground">
                  {name ? `${name}'s Birthday Countdown` : 'Birthday Countdown'}
                </h3>
                <button
                  onClick={copyResult}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Copy size={16} className="sm:w-4 sm:h-4" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Main Countdown Display */}
                <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
                  <div className="text-2xl font-bold text-foreground text-center mb-2">
                    🎂 {result.daysUntil} Days to Go!
                  </div>
                  <div className="text-sm text-muted-foreground text-center">
                    {result.nextBirthday}
                  </div>
                </div>

                {/* Time Units Grid */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-background p-3 rounded-lg border border-border text-center">
                    <div className="text-lg font-bold text-foreground">{result.daysUntil}</div>
                    <div className="text-xs text-muted-foreground">Days</div>
                  </div>
                  <div className="bg-background p-3 rounded-lg border border-border text-center">
                    <div className="text-lg font-bold text-foreground">{result.weeksUntil}</div>
                    <div className="text-xs text-muted-foreground">Weeks</div>
                  </div>
                  <div className="bg-background p-3 rounded-lg border border-border text-center">
                    <div className="text-lg font-bold text-foreground">{result.monthsUntil}</div>
                    <div className="text-xs text-muted-foreground">Months</div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Current Age</span>
                    <span className="font-semibold text-foreground">{result.age} years old</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Next Age</span>
                    <span className="font-semibold text-foreground">{result.nextAge} years old</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Year</span>
                    <span className="font-semibold text-foreground">
                      {result.isPastThisYear ? 'Next Year' : 'This Year'}
                    </span>
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
                Enter your birth date to see exactly how many days, weeks, and months until your next birthday. 
                Perfect for planning celebrations or just satisfying your curiosity!
              </p>
              <div className="text-xs sm:text-sm space-y-1 pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Enter your name (optional) and birth date</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Click "Calculate Countdown" to see results</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>View countdown in days, weeks, and months</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>See your current age and next age</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Copy results for sharing or reminders</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Countdown Features:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span>Calculates exact days until your next birthday</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span>Shows equivalent time in weeks and months</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span>Accounts for leap years and different month lengths</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span>Displays whether birthday is this year or next</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}