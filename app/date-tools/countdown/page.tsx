'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Copy, RotateCcw, ArrowLeft, Play, Pause } from 'lucide-react';
import Link from 'next/link';

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

  const copyResult = async () => {
    if (timeLeft && eventName) {
      const text = `${eventName}: ${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes, ${timeLeft.seconds} seconds remaining`;
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
                Countdown Timer
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Create a countdown to any future date and event
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
              {/* Event Name */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Clock size={20} className="text-foreground" />
                  <label className="block text-sm font-medium text-foreground">
                    Set Countdown Details
                  </label>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm text-muted-foreground">
                    Event Name (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="New Year, Wedding, Birthday..."
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground placeholder-muted-foreground"
                  />
                </div>
              </div>

              {/* Date and Time Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm text-muted-foreground">
                    Target Date
                  </label>
                  <input
                    type="date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm text-muted-foreground">
                    Target Time
                  </label>
                  <input
                    type="time"
                    value={targetTime}
                    onChange={(e) => setTargetTime(e.target.value)}
                    className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                {!isActive ? (
                  <button
                    onClick={startCountdown}
                    disabled={!targetDate || !targetTime}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent text-accent-foreground rounded-lg sm:rounded-xl hover:bg-accent/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                  >
                    <Play size={16} className="sm:w-4 sm:h-4" />
                    Start Countdown
                  </button>
                ) : (
                  <button
                    onClick={pauseCountdown}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg sm:rounded-xl hover:bg-secondary/80 transition-colors text-sm sm:text-base"
                  >
                    <Pause size={16} className="sm:w-4 sm:h-4" />
                    Pause Countdown
                  </button>
                )}
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

          {/* Countdown Display */}
          {timeLeft && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 mb-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">
                  {eventName || 'Countdown Timer'}
                </h3>
                <button
                  onClick={copyResult}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Copy size={16} className="sm:w-4 sm:h-4" />
                </button>
              </div>

              {timeLeft.total > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-accent/10 p-4 rounded-lg border border-accent/20 text-center">
                    <div className="text-2xl font-bold text-foreground">{timeLeft.days}</div>
                    <div className="text-xs text-muted-foreground mt-1">Days</div>
                  </div>
                  <div className="bg-accent/10 p-4 rounded-lg border border-accent/20 text-center">
                    <div className="text-2xl font-bold text-foreground">{timeLeft.hours}</div>
                    <div className="text-xs text-muted-foreground mt-1">Hours</div>
                  </div>
                  <div className="bg-accent/10 p-4 rounded-lg border border-accent/20 text-center">
                    <div className="text-2xl font-bold text-foreground">{timeLeft.minutes}</div>
                    <div className="text-xs text-muted-foreground mt-1">Minutes</div>
                  </div>
                  <div className="bg-accent/10 p-4 rounded-lg border border-accent/20 text-center">
                    <div className="text-2xl font-bold text-foreground">{timeLeft.seconds}</div>
                    <div className="text-xs text-muted-foreground mt-1">Seconds</div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="text-3xl mb-3">🎉</div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Time's Up!
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {eventName ? `${eventName} has arrived!` : 'The countdown has finished!'}
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
          >
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">How to Use</h3>
            <div className="space-y-2 text-muted-foreground text-sm">
              <p>
                Create real-time countdowns for any upcoming event with live updates every second.
              </p>
              <div className="text-xs sm:text-sm space-y-1 pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Enter an event name to personalize your countdown (optional)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Select the target date and time for your countdown</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Click "Start Countdown" to begin the real-time timer</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Use "Pause Countdown" to temporarily stop the timer</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Watch the countdown update every second</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Copy the current countdown status for sharing</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Perfect For:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span>New Year's Eve celebrations</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span>Birthday and anniversary countdowns</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span>Project deadlines and launch dates</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span>Vacation and trip planning</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span>Event and meeting reminders</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}