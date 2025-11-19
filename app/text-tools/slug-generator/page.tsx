'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, RotateCcw, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';

const SlugGenerator = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [separator, setSeparator] = useState('-');
  const [lowercase, setLowercase] = useState(true);

  const generateSlug = () => {
    if (!inputText.trim()) {
      setOutputText('');
      return;
    }

    let result = inputText.trim();
    
    // Convert to lowercase if option is selected
    if (lowercase) {
      result = result.toLowerCase();
    }
    
    // Remove special characters and replace spaces
    result = result
      .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
      .replace(/\s+/g, separator) // Replace spaces with separator
      .replace(/-+/g, separator) // Replace multiple hyphens with single separator
      .replace(new RegExp(`^\\${separator}+|\\${separator}+$`, 'g'), ''); // Remove leading/trailing separators

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

  // Auto-generate slug as user types
  useEffect(() => {
    if (inputText) {
      generateSlug();
    } else {
      setOutputText('');
    }
  }, [inputText, separator, lowercase]);

  const separatorOptions = [
    { value: '-', label: 'Hyphen (-)', example: 'hello-world' },
    { value: '_', label: 'Underscore (_)', example: 'hello_world' },
    { value: '.', label: 'Dot (.)', example: 'hello.world' }
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
                Slug Generator
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Generate URL-friendly slugs from your text for SEO-optimized URLs
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
                  Input Text
                </label>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Enter your text or title here..."
                  className="w-full min-h-[120px] p-4 bg-input border border-border rounded-lg sm:rounded-xl focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-ring focus:ring-opacity-50 resize-none text-foreground placeholder-muted-foreground"
                />
              </div>

              {/* Options Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Separator Options */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-foreground">Separator</h4>
                  <div className="space-y-3">
                    {separatorOptions.map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="separator"
                          value={option.value}
                          checked={separator === option.value}
                          onChange={(e) => setSeparator(e.target.value)}
                          className="w-4 h-4 text-accent bg-input border-border focus:ring-accent focus:ring-2"
                        />
                        <div className="flex-1">
                          <span className="text-foreground text-sm">{option.label}</span>
                          <span className="text-muted-foreground text-xs ml-2">({option.example})</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Additional Options */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-foreground">Options</h4>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={lowercase}
                      onChange={(e) => setLowercase(e.target.checked)}
                      className="w-4 h-4 text-accent bg-input border-border rounded focus:ring-accent focus:ring-2"
                    />
                    <span className="text-foreground text-sm">Convert to lowercase</span>
                  </label>
                </div>
              </div>

              {/* Output Section */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-foreground">
                  Generated Slug
                </label>
                <div className="relative">
                  <textarea
                    value={outputText}
                    readOnly
                    placeholder="URL-friendly slug will appear here..."
                    className="w-full min-h-[80px] p-4 bg-muted border border-border rounded-lg sm:rounded-xl focus:outline-none resize-none text-foreground placeholder-muted-foreground font-mono text-sm"
                  />
                  {outputText && (
                    <button
                      onClick={handleCopy}
                      className="absolute top-3 right-3 p-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Copy size={16} className="sm:w-4 sm:h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <button
                onClick={handleClear}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg sm:rounded-xl hover:bg-secondary/80 transition-colors text-sm sm:text-base"
              >
                <RotateCcw size={16} className="sm:w-4 sm:h-4" />
                Clear All
              </button>

              {/* URL Preview */}
              {outputText && (
                <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                  <h4 className="font-medium text-foreground mb-2 text-sm">Preview URL</h4>
                  <code className="text-foreground text-xs break-all font-mono">
                    https://yourwebsite.com/{outputText}
                  </code>
                </div>
              )}
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
                Generate clean, SEO-friendly URL slugs from your text titles and phrases.
              </p>
              <div className="text-xs sm:text-sm space-y-1 pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Enter your title or text that you want to convert to a slug</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Choose your preferred separator (hyphen is most common for URLs)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>The slug will be generated automatically as you type</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Use the generated slug in your URLs for better SEO and readability</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Best Practices:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span>Keep slugs short and descriptive</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span>Use hyphens for better SEO (search engines treat them as spaces)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span>Avoid special characters and uppercase letters</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SlugGenerator;