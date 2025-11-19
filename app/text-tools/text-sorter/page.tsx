'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, RotateCcw, ArrowUpDown } from 'lucide-react';
import Link from 'next/link';

const TextSorter = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [caseSensitive, setCaseSensitive] = useState(false);

  const sortText = () => {
    if (!inputText.trim()) {
      setOutputText('');
      return;
    }

    const lines = inputText.split('\n').filter(line => line.trim() !== '');

    const sortedLines = [...lines].sort((a, b) => {
      const strA = caseSensitive ? a : a.toLowerCase();
      const strB = caseSensitive ? b : b.toLowerCase();
      return sortOrder === 'asc'
        ? strA.localeCompare(strB)
        : strB.localeCompare(strA);
    });

    setOutputText(sortedLines.join('\n'));
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
                Text Sorter
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Sort lines of text alphabetically in ascending or descending order
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
                  placeholder="Enter lines of text to sort..."
                  className="w-full min-h-[250px] p-4 bg-input border border-border rounded-lg sm:rounded-xl focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-ring focus:ring-opacity-50 resize-none text-foreground placeholder-muted-foreground"
                />
              </div>

              {/* Output Section */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-foreground">
                  Sorted Text
                </label>
                <textarea
                  value={outputText}
                  readOnly
                  placeholder="Sorted lines will appear here..."
                  className="w-full min-h-[250px] p-4 bg-muted border border-border rounded-lg sm:rounded-xl focus:outline-none resize-none text-foreground placeholder-muted-foreground"
                />
              </div>
            </div>

            {/* Options */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-6 pt-6 border-t border-border">
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-sm text-foreground">
                  <input
                    type="radio"
                    name="sortOrder"
                    checked={sortOrder === 'asc'}
                    onChange={() => setSortOrder('asc')}
                    className="w-4 h-4 text-accent bg-input border-border focus:ring-accent focus:ring-2"
                  />
                  Ascending (A-Z)
                </label>
                <label className="flex items-center gap-2 text-sm text-foreground">
                  <input
                    type="radio"
                    name="sortOrder"
                    checked={sortOrder === 'desc'}
                    onChange={() => setSortOrder('desc')}
                    className="w-4 h-4 text-accent bg-input border-border focus:ring-accent focus:ring-2"
                  />
                  Descending (Z-A)
                </label>
              </div>
              <label className="flex items-center gap-2 text-sm text-foreground">
                <input
                  type="checkbox"
                  checked={caseSensitive}
                  onChange={(e) => setCaseSensitive(e.target.checked)}
                  className="w-4 h-4 text-accent bg-input border-border rounded focus:ring-accent focus:ring-2"
                />
                Case sensitive
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={sortText}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent text-accent-foreground rounded-lg sm:rounded-xl hover:bg-accent/80 transition-colors text-sm sm:text-base"
              >
                <ArrowUpDown size={16} className="sm:w-4 sm:h-4" />
                Sort Text
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
                Sort your text lines alphabetically with customizable sorting options.
              </p>
              <div className="text-xs sm:text-sm space-y-1 pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Enter each line of text on a separate line</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Choose ascending (A-Z) or descending (Z-A) sort order</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Enable case sensitive for precise alphabetical sorting</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Click "Sort Text" to organize your lines alphabetically</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Copy the sorted result for your use</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TextSorter;