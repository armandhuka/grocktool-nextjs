'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, RotateCcw, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

const PalindromeChecker = () => {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState<{
    isPalindrome: boolean;
    cleanedText: string;
    reversed: string;
  } | null>(null);
  const [ignoreSpaces, setIgnoreSpaces] = useState(true);
  const [ignorePunctuation, setIgnorePunctuation] = useState(true);
  const [ignoreCase, setIgnoreCase] = useState(true);

  const checkPalindrome = () => {
    if (!inputText.trim()) {
      setResult(null);
      return;
    }

    let cleanedText = inputText;

    // Apply cleaning options
    if (ignoreCase) {
      cleanedText = cleanedText.toLowerCase();
    }
    
    if (ignoreSpaces) {
      cleanedText = cleanedText.replace(/\s/g, '');
    }
    
    if (ignorePunctuation) {
      cleanedText = cleanedText.replace(/[^\w\s]/g, '');
    }

    const reversed = cleanedText.split('').reverse().join('');
    const isPalindrome = cleanedText === reversed;

    setResult({
      isPalindrome,
      cleanedText,
      reversed
    });
  };

  const handleClear = () => {
    setInputText('');
    setResult(null);
  };

  const handleCopy = async () => {
    if (!result) return;
    
    const resultText = `Text: "${inputText}"\nIs Palindrome: ${result.isPalindrome ? 'Yes' : 'No'}\nCleaned Text: "${result.cleanedText}"\nReversed: "${result.reversed}"`;
    try {
      await navigator.clipboard.writeText(resultText);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Auto-check as user types
  useEffect(() => {
    if (inputText) {
      checkPalindrome();
    } else {
      setResult(null);
    }
  }, [inputText, ignoreSpaces, ignorePunctuation, ignoreCase]);

  const palindromeExamples = [
    'racecar',
    'A man a plan a canal Panama',
    'madam',
    'Was it a car or a cat I saw?',
    'level',
    'No \'x\' in Nixon'
  ];

  return (
    <div className="min-h-screen bg-background font-inter">
      <div className="pt-20 pb-8 px-4 sm:pt-24 sm:pb-12 sm:px-6 lg:pt-28">
        <div className="max-w-lg mx-auto lg:max-w-4xl">
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
                Palindrome Checker
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Check if text reads the same forwards and backwards
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
              {/* Input Section */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-foreground">
                  Enter text to check
                </label>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Enter a word, phrase, or sentence..."
                  className="w-full min-h-[120px] p-4 bg-input border border-border rounded-lg sm:rounded-xl focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-ring focus:ring-opacity-50 resize-none text-foreground placeholder-muted-foreground text-center text-lg"
                />
              </div>

              {/* Checking Options */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-foreground">Checking Options</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <label className="flex items-center gap-2 text-sm text-foreground">
                    <input
                      type="checkbox"
                      checked={ignoreCase}
                      onChange={(e) => setIgnoreCase(e.target.checked)}
                      className="w-4 h-4 text-accent bg-input border-border rounded focus:ring-accent focus:ring-2"
                    />
                    Ignore case
                  </label>
                  <label className="flex items-center gap-2 text-sm text-foreground">
                    <input
                      type="checkbox"
                      checked={ignoreSpaces}
                      onChange={(e) => setIgnoreSpaces(e.target.checked)}
                      className="w-4 h-4 text-accent bg-input border-border rounded focus:ring-accent focus:ring-2"
                    />
                    Ignore spaces
                  </label>
                  <label className="flex items-center gap-2 text-sm text-foreground">
                    <input
                      type="checkbox"
                      checked={ignorePunctuation}
                      onChange={(e) => setIgnorePunctuation(e.target.checked)}
                      className="w-4 h-4 text-accent bg-input border-border rounded focus:ring-accent focus:ring-2"
                    />
                    Ignore punctuation
                  </label>
                </div>
              </div>

              {/* Result Display */}
              {result && (
                <div className={`p-4 rounded-lg border-2 ${
                  result.isPalindrome 
                    ? 'bg-green-500/10 border-green-500/20' 
                    : 'bg-red-500/10 border-red-500/20'
                }`}>
                  <div className="flex items-center gap-3 mb-3">
                    {result.isPalindrome ? (
                      <CheckCircle className="text-green-500" size={20} />
                    ) : (
                      <XCircle className="text-red-500" size={20} />
                    )}
                    <h3 className={`text-lg font-bold ${
                      result.isPalindrome ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {result.isPalindrome ? 'Yes, it\'s a palindrome!' : 'No, it\'s not a palindrome.'}
                    </h3>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="font-medium text-foreground text-xs whitespace-nowrap pt-1">Cleaned text:</span>
                      <code className="bg-background px-2 py-1 rounded text-xs flex-1 break-all">{result.cleanedText}</code>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-medium text-foreground text-xs whitespace-nowrap pt-1">Reversed:</span>
                      <code className="bg-background px-2 py-1 rounded text-xs flex-1 break-all">{result.reversed}</code>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleClear}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg sm:rounded-xl hover:bg-secondary/80 transition-colors text-sm sm:text-base"
                >
                  <RotateCcw size={16} className="sm:w-4 sm:h-4" />
                  Clear All
                </button>
                {result && (
                  <button
                    onClick={handleCopy}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg sm:rounded-xl hover:bg-secondary/80 transition-colors text-sm sm:text-base"
                  >
                    <Copy size={16} className="sm:w-4 sm:h-4" />
                    Copy Result
                  </button>
                )}
              </div>

              {/* Examples Section */}
              <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                <h4 className="font-medium text-foreground mb-3 text-sm">Examples of palindromes:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-foreground text-xs">
                  {palindromeExamples.map((example, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full flex-shrink-0"></div>
                      <span className="break-words">{example}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
          >
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">How to Use</h3>
            <div className="space-y-2 text-muted-foreground text-sm">
              <p>
                Check if your text reads the same forwards and backwards with customizable checking options.
              </p>
              <div className="text-xs sm:text-sm space-y-1 pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Enter any word, phrase, or sentence in the input area</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Choose which elements to ignore during checking using the options</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>The result will update automatically as you type</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Green result means it's a palindrome, red means it's not</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Copy the detailed result for your records</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Checking Options Explained:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Ignore case:</strong> Treat uppercase and lowercase letters as the same</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Ignore spaces:</strong> Remove all spaces before checking</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Ignore punctuation:</strong> Remove punctuation marks before checking</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PalindromeChecker;