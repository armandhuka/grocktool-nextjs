'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Copy, RotateCcw, ArrowLeft, Play, Pause } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Countdown() {
  const [targetDate, setTargetDate] = useState('');
  const [targetTime, setTargetTime] = useState('');
  const [eventName, setEventName] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    total: number;
  } | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && targetDate && targetTime) {
      interval = setInterval(() => {
        const target = new Date(`${targetDate}T${targetTime}`);
        const now = new Date();
        const difference = target.getTime() - now.getTime();

        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);

          setTimeLeft({
            days,
            hours,
            minutes,
            seconds,
            total: difference
          });
        } else {
          setTimeLeft({
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            total: 0
          });
          setIsActive(false);
        }
      }, 1000);
    } else if (!isActive) {
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, targetDate, targetTime]);

  const startCountdown = () => {
    if (targetDate && targetTime) {
      setIsActive(true);
    }
  };

  const pauseCountdown = () => {
    setIsActive(false);
  };

  const clearFields = () => {
    setTargetDate('');
    setTargetTime('');
    setEventName('');
    setIsActive(false);
    setTimeLeft(null);
  };

  const copyResult = () => {
    if (timeLeft && eventName) {
      const text = `${eventName}: ${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes, ${timeLeft.seconds} seconds remaining`;
      navigator.clipboard.writeText(text);
    }
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
                Countdown Timer
              </h1>
              <p className="text-xl text-toolnest-text/80">
                Create a countdown to any future date and event
              </p>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Set Countdown Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-toolnest-text mb-2">
                    Event Name (Optional)
                  </label>
                  <Input
                    type="text"
                    placeholder="New Year, Wedding, Birthday..."
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-toolnest-text mb-2">
                      Target Date
                    </label>
                    <Input
                      type="date"
                      value={targetDate}
                      onChange={(e) => setTargetDate(e.target.value)}
                      className="text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-toolnest-text mb-2">
                      Target Time
                    </label>
                    <Input
                      type="time"
                      value={targetTime}
                      onChange={(e) => setTargetTime(e.target.value)}
                      className="text-lg"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  {!isActive ? (
                    <Button onClick={startCountdown} className="flex-1">
                      <Play className="w-4 h-4 mr-2" />
                      Start Countdown
                    </Button>
                  ) : (
                    <Button onClick={pauseCountdown} className="flex-1" variant="outline">
                      <Pause className="w-4 h-4 mr-2" />
                      Pause
                    </Button>
                  )}
                  <Button onClick={clearFields} variant="outline">
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {timeLeft && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {eventName || 'Countdown Timer'}
                      <Button onClick={copyResult} variant="outline" size="sm">
                        <Copy className="w-4 h-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {timeLeft.total > 0 ? (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div className="bg-toolnest-bg/50 p-6 rounded-lg">
                          <div className="text-3xl font-bold text-toolnest-text">{timeLeft.days}</div>
                          <div className="text-sm text-toolnest-text/70">Days</div>
                        </div>
                        <div className="bg-toolnest-bg/50 p-6 rounded-lg">
                          <div className="text-3xl font-bold text-toolnest-text">{timeLeft.hours}</div>
                          <div className="text-sm text-toolnest-text/70">Hours</div>
                        </div>
                        <div className="bg-toolnest-bg/50 p-6 rounded-lg">
                          <div className="text-3xl font-bold text-toolnest-text">{timeLeft.minutes}</div>
                          <div className="text-sm text-toolnest-text/70">Minutes</div>
                        </div>
                        <div className="bg-toolnest-bg/50 p-6 rounded-lg">
                          <div className="text-3xl font-bold text-toolnest-text">{timeLeft.seconds}</div>
                          <div className="text-sm text-toolnest-text/70">Seconds</div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <h3 className="text-2xl font-bold text-toolnest-text mb-2">
                          🎉 Time's Up!
                        </h3>
                        <p className="text-toolnest-text/70">
                          {eventName ? `${eventName} has arrived!` : 'The countdown has finished!'}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}

            <Card className="mt-8">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">How this tool works</h3>
                <p className="text-toolnest-text/70">
                  Set a target date and time for any upcoming event. The countdown timer will show you exactly 
                  how much time remains in days, hours, minutes, and seconds, updating in real-time.
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