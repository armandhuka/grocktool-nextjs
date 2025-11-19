'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, RotateCcw, Filter } from 'lucide-react';
import Link from 'next/link';

const RemoveSpecialChars = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [keepSpaces, setKeepSpaces] = useState(true);
  const [keepNumbers, setKeepNumbers] = useState(true);
  const [keepNewlines, setKeepNewlines] = useState(true);
  const [customChars, setCustomChars] = useState('');

  const removeSpecialChars = () => {
    if (!inputText) {
      setOutputText('');
      return;
    }

    let result = inputText;
    
    // Build regex pattern based on options
    let pattern = '[^a-zA-Z';
    
    if (keepNumbers) {
      pattern += '0-9';
    }
    
    if (keepSpaces) {
      pattern += ' ';
    }
    
    if (keepNewlines) {
      pattern += '\\n\\r';
    }
    
    // Add custom characters to keep
    if (customChars) {
      // Escape special regex characters
      const escapedCustom = customChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      pattern += escapedCustom;
    }
    
    pattern += ']';
    
    const regex = new RegExp(pattern, 'g');
    result = result.replace(regex, '');
    
    setOutputText(result);
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setCustomChars('');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Auto-process as user types or changes options
  useEffect(() => {
    if (inputText) {
      removeSpecialChars();
    } else {
      setOutputText('');
    }
  }, [inputText, keepSpaces, keepNumbers, keepNewlines, customChars]);

  const getPreview = () => {
    const removedChars = inputText.length - outputText.length;
    return {
      originalLength: inputText.length,
      cleanedLength: outputText.length,
      removedCount: removedChars
    };
  };

  const preview = getPreview();

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
                Remove Special Characters
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Remove or filter special characters and keep only the content you need
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
                  placeholder="Enter text with special characters..."
                  className="w-full min-h-[250px] p-4 bg-input border border-border rounded-lg sm:rounded-xl focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-ring focus:ring-opacity-50 resize-none text-foreground placeholder-muted-foreground"
                />
              </div>

              {/* Output Section */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-foreground">
                  Cleaned Text
                </label>
                <textarea
                  value={outputText}
                  readOnly
                  placeholder="Text without special characters will appear here..."
                  className="w-full min-h-[250px] p-4 bg-muted border border-border rounded-lg sm:rounded-xl focus:outline-none resize-none text-foreground placeholder-muted-foreground"
                />
              </div>
            </div>

            {/* Options Section */}
            <div className="mt-6 pt-6 border-t border-border">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Keep Options */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-foreground">Keep these characters</h4>
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-sm text-foreground">
                      <input
                        type="checkbox"
                        checked={keepSpaces}
                        onChange={(e) => setKeepSpaces(e.target.checked)}
                        className="w-4 h-4 text-accent bg-input border-border rounded focus:ring-accent focus:ring-2"
                      />
                      Spaces
                    </label>
                    <label className="flex items-center gap-2 text-sm text-foreground">
                      <input
                        type="checkbox"
                        checked={keepNumbers}
                        onChange={(e) => setKeepNumbers(e.target.checked)}
                        className="w-4 h-4 text-accent bg-input border-border rounded focus:ring-accent focus:ring-2"
                      />
                      Numbers (0-9)
                    </label>
                    <label className="flex items-center gap-2 text-sm text-foreground">
                      <input
                        type="checkbox"
                        checked={keepNewlines}
                        onChange={(e) => setKeepNewlines(e.target.checked)}
                        className="w-4 h-4 text-accent bg-input border-border rounded focus:ring-accent focus:ring-2"
                      />
                      New lines
                    </label>
                  </div>
                </div>

                {/* Custom Characters */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-foreground">Custom characters to keep</h4>
                  <input
                    type="text"
                    value={customChars}
                    onChange={(e) => setCustomChars(e.target.value)}
                    placeholder="e.g., !@#$%"
                    className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground placeholder-muted-foreground"
                  />
                  <p className="text-muted-foreground text-xs">
                    Enter specific characters you want to preserve
                  </p>
                </div>
              </div>
            </div>

            {/* Statistics */}
            {inputText && (
              <div className="mt-6 p-4 bg-secondary rounded-lg">
                <h4 className="text-sm font-medium text-foreground mb-3">Statistics</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold text-foreground">{preview.originalLength}</div>
                    <div className="text-xs text-muted-foreground">Original chars</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-foreground">{preview.cleanedLength}</div>
                    <div className="text-xs text-muted-foreground">Cleaned chars</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-red-500">{preview.removedCount}</div>
                    <div className="text-xs text-muted-foreground">Removed chars</div>
                  </div>
                </div>
              </div>
            )}

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
                Clean your text by removing special characters while preserving the content you need.
              </p>
              <div className="text-xs sm:text-sm space-y-1 pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Paste your text containing special characters in the input area</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Choose which types of characters to keep using the checkboxes</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Add specific characters to preserve in the custom field</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>The cleaned text updates automatically as you type or change options</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Monitor the statistics to see how many characters were removed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Copy the result when you're satisfied with the cleaning</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Character Types:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Letters:</strong> Always kept (a-z, A-Z)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Spaces:</strong> Optional - preserve or remove spaces</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Numbers:</strong> Optional - preserve or remove digits (0-9)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>New lines:</strong> Optional - preserve or remove line breaks</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Custom:</strong> Add specific characters you want to keep</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RemoveSpecialChars;