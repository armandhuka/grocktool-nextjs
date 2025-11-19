'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, RotateCcw } from 'lucide-react';

export default function CaseConverterPage() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const convertCase = (type: string) => {
    if (!inputText.trim()) return;

    let result = '';
    switch (type) {
      case 'uppercase':
        result = inputText.toUpperCase();
        break;
      case 'lowercase':
        result = inputText.toLowerCase();
        break;
      case 'titlecase':
        result = inputText.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
        break;
      case 'sentencecase':
        result = inputText.toLowerCase().replace(/(^\w|\.\s+\w)/g, (char) => char.toUpperCase());
        break;
      case 'camelcase':
        result = inputText.toLowerCase().replace(/\s+(.)/g, (match, char) => char.toUpperCase());
        break;
      case 'snakecase':
        result = inputText.toLowerCase().replace(/\s+/g, '_');
        break;
      case 'kebabcase':
        result = inputText.toLowerCase().replace(/\s+/g, '-');
        break;
      case 'alternating':
        result = inputText.split('').map((char, index) => 
          index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
        ).join('');
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

  const handleSwap = () => {
    setInputText(outputText);
    setOutputText('');
  };

  const caseButtons = [
    { type: 'uppercase', label: 'UPPERCASE' },
    { type: 'lowercase', label: 'lowercase' },
    { type: 'titlecase', label: 'Title Case' },
    { type: 'sentencecase', label: 'Sentence case' },
    { type: 'camelcase', label: 'camelCase' },
    { type: 'snakecase', label: 'snake_case' },
    { type: 'kebabcase', label: 'kebab-case' },
    { type: 'alternating', label: 'aLtErNaTiNg' }
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
                Case Converter
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Convert text between different case formats instantly
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
            {/* Case Conversion Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-6">
              {caseButtons.map((button) => (
                <button
                  key={button.type}
                  onClick={() => convertCase(button.type)}
                  className="px-3 py-2 sm:px-4 sm:py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-xs sm:text-sm font-medium"
                >
                  {button.label}
                </button>
              ))}
            </div>

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
                  className="w-full min-h-[200px] p-4 bg-input border border-border rounded-lg sm:rounded-xl focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-ring focus:ring-opacity-50 resize-none text-foreground placeholder-muted-foreground"
                />
                
                {/* Action Buttons */}
                <button
                  onClick={handleClear}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg sm:rounded-xl hover:bg-secondary/80 transition-colors text-sm sm:text-base"
                >
                  <RotateCcw size={16} className="sm:w-4 sm:h-4" />
                  Clear All
                </button>
              </div>

              {/* Output Section */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-foreground">
                  Result
                </label>
                <textarea
                  value={outputText}
                  readOnly
                  placeholder="Converted text will appear here..."
                  className="w-full min-h-[200px] p-4 bg-muted border border-border rounded-lg sm:rounded-xl focus:outline-none resize-none text-foreground placeholder-muted-foreground"
                />
                
                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleCopy}
                    disabled={!outputText}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg sm:rounded-xl hover:bg-secondary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                  >
                    <Copy size={16} className="sm:w-4 sm:h-4" />
                    Copy Result
                  </button>
                  <button
                    onClick={handleSwap}
                    disabled={!outputText}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent text-accent-foreground rounded-lg sm:rounded-xl hover:bg-accent/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                  >
                    <RotateCcw size={16} className="sm:w-4 sm:h-4" />
                    Use as Input
                  </button>
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
                Convert your text between different case formats with a single click.
              </p>
              <div className="text-xs sm:text-sm space-y-1 pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Enter your text in the input area</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Click any case conversion button to transform your text</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>View the converted text in the result area</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Copy the result or use it as new input</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Try different case formats for your specific needs</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}