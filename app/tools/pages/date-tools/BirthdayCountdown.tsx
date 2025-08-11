
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Gift, Copy, RotateCcw, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

const BirthdayCountdown = () => {
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

  const copyResult = () => {
    if (result) {
      const text = `${name ? `${name}'s` : 'Next'} birthday is in ${result.daysUntil} days (${result.nextBirthday}) - turning ${result.nextAge}!`;
      navigator.clipboard.writeText(text);
    }
  };

  return (
    <div className="min-h-screen bg-toolnest-bg font-inter">
      <Helmet>
        <title>Birthday Countdown - GrockTool</title>
        <meta name="description" content="Calculate how many days until your next birthday with ToolNest's Birthday Countdown tool." />
        <link rel="canonical" href="https://grocktool.com/date-tools/birthday-countdown" />
      </Helmet>

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
                Birthday Countdown
              </h1>
              <p className="text-xl text-toolnest-text/80">
                Find out how many days until your next birthday
              </p>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="w-5 h-5" />
                  Birthday Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-toolnest-text mb-2">
                    Name (Optional)
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter your name..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="text-lg"
                  />
                </div>

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
                  <Button onClick={calculateBirthdayCountdown} className="flex-1">
                    Calculate Countdown
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
                      {name ? `${name}'s Birthday Countdown` : 'Birthday Countdown'}
                      <Button onClick={copyResult} variant="outline" size="sm">
                        <Copy className="w-4 h-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-6">
                      <h3 className="text-3xl font-bold text-toolnest-text mb-2">
                        🎂 {result.daysUntil} Days to Go!
                      </h3>
                      <p className="text-lg text-toolnest-text/70">
                        {result.nextBirthday}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-toolnest-bg/50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-toolnest-text">{result.daysUntil}</div>
                        <div className="text-sm text-toolnest-text/70">Days</div>
                      </div>
                      <div className="bg-toolnest-bg/50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-toolnest-text">{result.weeksUntil}</div>
                        <div className="text-sm text-toolnest-text/70">Weeks</div>
                      </div>
                      <div className="bg-toolnest-bg/50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-toolnest-text">{result.monthsUntil}</div>
                        <div className="text-sm text-toolnest-text/70">Months</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Current Age:</span>
                        <span className="font-semibold">{result.age} years old</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Next Age:</span>
                        <span className="font-semibold">{result.nextAge} years old</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Year:</span>
                        <span className="font-semibold">
                          {result.isPastThisYear ? 'Next Year' : 'This Year'}
                        </span>
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
                  Enter your birth date to see exactly how many days, weeks, and months until your next birthday. 
                  Perfect for planning celebrations or just satisfying your curiosity!
                </p>
              </CardContent>
            </Card>

            <div className="text-center mt-8">
              <Link to="/tools" className="inline-flex items-center gap-2 text-toolnest-text hover:text-toolnest-text/80 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to Tools
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BirthdayCountdown;
