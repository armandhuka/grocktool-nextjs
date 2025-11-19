'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, RotateCcw } from 'lucide-react';
import Link from 'next/link';

const TextReverser = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [reverseType, setReverseType] = useState<'text' | 'words' | 'lines'>('text');

  const reverseText = () => {
    if (!inputText.trim()) {
      setOutputText('');
      return;
    }

    let result = '';
    switch (reverseType) {
      case 'text':
        result = inputText.split('').reverse().join('');
        break;
      case 'words':
        result = inputText.split(' ').reverse().join(' ');
        break;
      case 'lines':
        result = inputText.split('\n').reverse().join('\n');
        break;
      default:
        result = inputText;
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

  const reverseOptions = [
    { type: 'text', label: 'Reverse Text', description: 'Reverse character by character' },
    { type: 'words', label: 'Reverse Words', description: 'Reverse word order' },
    { type: 'lines', label: 'Reverse Lines', description: 'Reverse line order' }
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
                Text Reverser
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Reverse text, words, or lines based on your preference
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
              </div>

              {/* Output Section */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-foreground">
                  Reversed Text
                </label>
                <textarea
                  value={outputText}
                  readOnly
                  placeholder="Reversed text will appear here..."
                  className="w-full min-h-[250px] p-4 bg-muted border border-border rounded-lg sm:rounded-xl focus:outline-none resize-none text-foreground placeholder-muted-foreground"
                />
              </div>
            </div>

            {/* Reverse Type Options */}
            <div className="mt-6 pt-6 border-t border-border">
              <h4 className="text-sm font-medium text-foreground mb-4">Choose reverse type:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {reverseOptions.map((option) => (
                  <label
                    key={option.type}
                    className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                      reverseType === option.type
                        ? 'border-accent bg-accent/10'
                        : 'border-border hover:border-accent/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="reverseType"
                      value={option.type}
                      checked={reverseType === option.type}
                      onChange={(e) => setReverseType(e.target.value as 'text' | 'words' | 'lines')}
                      className="mt-1 w-4 h-4 text-accent bg-input border-border focus:ring-accent focus:ring-2"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-foreground text-sm">{option.label}</div>
                      <div className="text-xs text-muted-foreground mt-1">{option.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={reverseText}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent text-accent-foreground rounded-lg sm:rounded-xl hover:bg-accent/80 transition-colors text-sm sm:text-base"
              >
                <RotateCcw size={16} className="sm:w-4 sm:h-4" />
                Reverse Text
              </button>
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
                Reverse your text in different ways based on your needs.
              </p>
              <div className="text-xs sm:text-sm space-y-1 pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Enter your text in the input area</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Choose the type of reversal you want to perform</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Click "Reverse Text" to process your content</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Copy the result or use it as needed</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Reverse Types:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Reverse Text:</strong> Reverses character by character</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Reverse Words:</strong> Reverses the order of words</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Reverse Lines:</strong> Reverses the order of lines</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TextReverser;