'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, RotateCcw, Scissors } from 'lucide-react';
import Link from 'next/link';

const TextLimiter = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [limitType, setLimitType] = useState<'characters' | 'words'>('characters');
  const [limit, setLimit] = useState(100);
  const [addEllipsis, setAddEllipsis] = useState(true);

  const limitText = () => {
    if (!inputText) {
      setOutputText('');
      return;
    }

    let result = inputText;
    let truncated = false;

    if (limitType === 'characters') {
      if (inputText.length > limit) {
        result = inputText.substring(0, limit);
        truncated = true;
      }
    } else {
      const words = inputText.split(' ');
      if (words.length > limit) {
        result = words.slice(0, limit).join(' ');
        truncated = true;
      }
    }

    if (truncated && addEllipsis) {
      result += '...';
    }

    setOutputText(result);
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Auto-limit as user types or changes settings
  useEffect(() => {
    if (inputText) {
      limitText();
    } else {
      setOutputText('');
    }
  }, [inputText, limitType, limit, addEllipsis]);

  const getStats = () => {
    const inputChars = inputText.length;
    const inputWords = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
    const outputChars = outputText.length;
    const outputWords = outputText.trim() ? outputText.trim().split(/\s+/).length : 0;

    return {
      input: { chars: inputChars, words: inputWords },
      output: { chars: outputChars, words: outputWords }
    };
  };

  const stats = getStats();
  const isLimited = limitType === 'characters' 
    ? stats.input.chars > limit 
    : stats.input.words > limit;

  const presetLimits = [
    { label: 'Tweet', chars: 280, words: 50 },
    { label: 'Meta Description', chars: 160, words: 25 },
    { label: 'Instagram Caption', chars: 2200, words: 300 },
    { label: 'SMS', chars: 160, words: 30 }
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
                Text Length Limiter
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Limit text to a specific number of characters or words
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Input Section */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-foreground">
                  Input Text
                </label>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Enter your text here..."
                  className="w-full min-h-[250px] p-4 bg-input border border-border rounded-lg sm:rounded-xl focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-ring focus:ring-opacity-50 resize-none text-foreground placeholder-muted-foreground"
                />
                
                {inputText && (
                  <div className="text-xs text-muted-foreground">
                    {stats.input.chars} characters, {stats.input.words} words
                  </div>
                )}
              </div>

              {/* Output Section */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-foreground">
                  Limited Text
                </label>
                <textarea
                  value={outputText}
                  readOnly
                  placeholder="Limited text will appear here..."
                  className="w-full min-h-[250px] p-4 bg-muted border border-border rounded-lg sm:rounded-xl focus:outline-none resize-none text-foreground placeholder-muted-foreground"
                />
                
                {outputText && (
                  <div className={`text-xs ${isLimited ? 'text-orange-500' : 'text-muted-foreground'}`}>
                    {stats.output.chars} characters, {stats.output.words} words
                    {isLimited && ' (truncated)'}
                  </div>
                )}
              </div>
            </div>

            {/* Settings Section */}
            <div className="mt-6 pt-6 border-t border-border">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Limit Settings */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-foreground">Limit Settings</h4>
                  
                  {/* Limit Type */}
                  <div className="space-y-2">
                    <label className="text-xs text-muted-foreground">Limit by:</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 text-sm text-foreground">
                        <input
                          type="radio"
                          name="limitType"
                          value="characters"
                          checked={limitType === 'characters'}
                          onChange={(e) => setLimitType(e.target.value as 'characters' | 'words')}
                          className="w-4 h-4 text-accent bg-input border-border focus:ring-accent focus:ring-2"
                        />
                        Characters
                      </label>
                      <label className="flex items-center gap-2 text-sm text-foreground">
                        <input
                          type="radio"
                          name="limitType"
                          value="words"
                          checked={limitType === 'words'}
                          onChange={(e) => setLimitType(e.target.value as 'characters' | 'words')}
                          className="w-4 h-4 text-accent bg-input border-border focus:ring-accent focus:ring-2"
                        />
                        Words
                      </label>
                    </div>
                  </div>

                  {/* Limit Number */}
                  <div className="space-y-2">
                    <label className="text-xs text-muted-foreground">
                      Maximum {limitType}:
                    </label>
                    <input
                      type="number"
                      value={limit}
                      onChange={(e) => setLimit(Math.max(1, parseInt(e.target.value) || 1))}
                      min="1"
                      className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground"
                    />
                  </div>

                  {/* Ellipsis Option */}
                  <label className="flex items-center gap-2 text-sm text-foreground">
                    <input
                      type="checkbox"
                      checked={addEllipsis}
                      onChange={(e) => setAddEllipsis(e.target.checked)}
                      className="w-4 h-4 text-accent bg-input border-border rounded focus:ring-accent focus:ring-2"
                    />
                    Add "..." when truncated
                  </label>
                </div>

                {/* Common Limits */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-foreground">Common Limits</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {presetLimits.map((preset) => (
                      <button
                        key={preset.label}
                        onClick={() => {
                          setLimit(limitType === 'characters' ? preset.chars : preset.words);
                        }}
                        className="p-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-xs"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={handleClear}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg sm:rounded-xl hover:bg-secondary/80 transition-colors text-sm sm:text-base"
              >
                <RotateCcw size={16} className="sm:w-4 sm:h-4" />
                Clear All
              </button>
              <button
                onClick={handleCopy}
                disabled={!outputText}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg sm:rounded-xl hover:bg-secondary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                <Copy size={16} className="sm:w-4 sm:h-4" />
                Copy Result
              </button>
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
                Limit your text length for social media, meta descriptions, and other platforms with character or word limits.
              </p>
              <div className="text-xs sm:text-sm space-y-1 pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Enter your text in the input area</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Choose to limit by characters or words</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Set your desired limit number</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Use preset buttons for common platform limits</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>The limited text updates automatically as you type</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Platform Limits:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Tweet:</strong> 280 characters or ~50 words</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Meta Description:</strong> 160 characters or ~25 words</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Instagram Caption:</strong> 2,200 characters or ~300 words</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>SMS:</strong> 160 characters or ~30 words</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TextLimiter;