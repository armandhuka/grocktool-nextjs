'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Copy, RotateCcw, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState('');
  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
    totalWeeks: number;
    totalHours: number;
    totalMinutes: number;
  } | null>(null);
  
  const { toast } = useToast();

  const calculateAge = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const today = new Date();
    
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;

    setResult({
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalHours,
      totalMinutes
    });
  };

  const clearFields = () => {
    setBirthDate('');
    setResult(null);
  };

  const copyResult = () => {
    if (result) {
      const text = `Age: ${result.years} years, ${result.months} months, ${result.days} days`;
      navigator.clipboard.writeText(text);
      toast({
        description: 'Age copied to clipboard',
      });
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
                Age Calculator
              </h1>
              <p className="text-xl text-toolnest-text/80">
                Calculate your exact age in years, months, days, and more
              </p>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Enter Your Birth Date
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-toolnest-text mb-2">
                    Birth Date
                  </label>
                  <Input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div className="flex gap-3">
                  <Button onClick={calculateAge} className="flex-1">
                    Calculate Age
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
                      Your Age
                      <Button onClick={copyResult} variant="outline" size="sm">
                        <Copy className="w-4 h-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-toolnest-bg/50 p-4 rounded-lg">
                        <h3 className="text-2xl font-bold text-toolnest-text mb-2">
                          {result.years} years, {result.months} months, {result.days} days
                        </h3>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Total Days:</span>
                          <span className="font-semibold">{result.totalDays.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Weeks:</span>
                          <span className="font-semibold">{result.totalWeeks.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Hours:</span>
                          <span className="font-semibold">{result.totalHours.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Minutes:</span>
                          <span className="font-semibold">{result.totalMinutes.toLocaleString()}</span>
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
                  Enter your birth date and instantly calculate your exact age in years, months, and days. 
                  The tool also shows your age in total days, weeks, hours, and minutes for detailed insights.
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
};

export default AgeCalculator;