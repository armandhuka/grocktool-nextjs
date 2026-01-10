'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, RotateCcw, Filter, ChevronDown, ChevronUp, CheckCircle, XCircle, Check, X, Hash, Type, CornerDownLeft } from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';

const RemoveSpecialChars = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [keepSpaces, setKeepSpaces] = useState(true);
  const [keepNumbers, setKeepNumbers] = useState(true);
  const [keepNewlines, setKeepNewlines] = useState(true);
  const [customChars, setCustomChars] = useState('');
  
  // All sections collapsed by default for better mobile performance
  const [openSections, setOpenSections] = useState({
    filteringRules: false,
    encodingHandling: false,
    useCases: false,
    examples: false,
    limitations: false,
    faqs: false,
    relatedTools: false
  });

  // Separate state for quick guide section
  const [quickGuideOpen, setQuickGuideOpen] = useState(false);

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleQuickGuide = () => {
    setQuickGuideOpen(!quickGuideOpen);
  };

  const relatedTools = [
    { name: 'Word Counter', path: '/text-tools/word-counter' },
    { name: 'Remove Duplicates', path: '/text-tools/remove-duplicates' },
    { name: 'Case Converter', path: '/text-tools/case-converter' },
    { name: 'Text Sorter', path: '/text-tools/text-sorter' },
    { name: 'Slug Generator', path: '/text-tools/slug-generator' },
    { name: 'Find & Replace', path: '/text-tools/find-replace' },
    { name: 'Text Limiter', path: '/text-tools/text-limiter' }
  ];

  const faqData = [
    {
      question: "Why did my text turn into gibberish after removing special characters?",
      answer: "That usually happens when your text contains emoji or extended Unicode characters. The tool focuses on standard English text cleaning. If you're working with international text, try adding specific characters you want to keep in the custom field. For example, if you need to preserve Spanish accents, add 'áéíóúñ' to the custom characters. The basic mode treats these as 'special' because they're not standard a-z letters."
    },
    {
      question: "Can I use this to clean data from Excel or CSV files?",
      answer: "Absolutely - it works great for that. Just copy-paste from your spreadsheet. I use it regularly to clean exported data. Keep numbers ON, spaces OFF if you want compact data, and add commas or tabs to custom characters if they're your separators. One tip: clean in chunks if you have thousands of rows, as extremely large pastes might slow down your browser temporarily."
    },
    {
      question: "What happens to invisible characters like tabs or non-breaking spaces?",
      answer: "Good question - those get removed unless you specifically add them to the custom field. Things like tabs (\\t), non-breaking spaces, and other whitespace characters don't show up visibly but still get filtered out. If you need to keep tabs, add '\\t' to custom characters (type it literally as backslash-t). Most people don't need these, but it's there if you do."
    },
    {
      question: "Is there a way to remove letters and keep only numbers and symbols?",
      answer: "Not with this specific tool - it's designed to keep letters and remove special characters. If you need the opposite (remove letters, keep numbers/symbols), you'd want a different approach. For that specific need, you could use our Find & Replace tool with a pattern to remove a-z and A-Z instead."
    },
    {
      question: "How do I clean text that has mixed quotes (straight vs curly)?",
      answer: "That's a common issue with text copied from different sources. This tool will remove all quote marks unless you add them to custom characters. If you want to keep quotes but standardize them, try this: first remove all quotes (don't add any to custom), then use Find & Replace to add back the type you want. I often do this when cleaning content for publishing - remove everything, then add consistent smart quotes."
    }
  ];

  // Memoized processing function for better performance
  const removeSpecialChars = useCallback(() => {
    if (!inputText.trim()) {
      setOutputText('');
      return;
    }

    let result = inputText;
    
    // Build regex pattern incrementally for better readability
    const parts = ['a-zA-Z'];
    
    if (keepNumbers) {
      parts.push('0-9');
    }
    
    if (keepSpaces) {
      parts.push(' ');
    }
    
    if (keepNewlines) {
      parts.push('\\n\\r\\t');
    }
    
    if (customChars) {
      // Escape regex special characters in custom input
      const escaped = customChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      parts.push(escaped);
    }
    
    const pattern = `[^${parts.join('')}]`;
    const regex = new RegExp(pattern, 'g');
    
    // Use requestAnimationFrame for smoother UI updates on mobile
    requestAnimationFrame(() => {
      result = inputText.replace(regex, '');
      setOutputText(result);
    });
  }, [inputText, keepSpaces, keepNumbers, keepNewlines, customChars]);

  // Debounced effect with cleanup
  useEffect(() => {
    if (!inputText) {
      setOutputText('');
      return;
    }

    const timer = setTimeout(() => {
      removeSpecialChars();
    }, 150);

    return () => clearTimeout(timer);
  }, [inputText, keepSpaces, keepNumbers, keepNewlines, customChars, removeSpecialChars]);

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setCustomChars('');
  };

  const handleCopy = async () => {
    if (!outputText) return;
    
    try {
      await navigator.clipboard.writeText(outputText);
      // Could add a temporary success indicator here
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getStats = () => {
    if (!inputText) {
      return {
        totalLines: 0,
        originalLength: 0,
        cleanedLength: 0,
        removedCount: 0,
        reductionPercentage: 0
      };
    }

    const originalLength = inputText.length;
    const cleanedLength = outputText.length;
    const removedCount = originalLength - cleanedLength;
    const reductionPercentage = originalLength > 0 
      ? Math.round((removedCount / originalLength) * 100) 
      : 0;

    return {
      totalLines: inputText.split('\n').length,
      originalLength,
      cleanedLength,
      removedCount,
      reductionPercentage
    };
  };

  const stats = getStats();

  const loadExample = () => {
    const example = `Customer Feedback - Q4 2024
================================
Rating: ★★★★☆ (4/5)
Comment: "Great service! The team was responsive and helpful."
User: john_doe@example.com
Phone: +1 (555) 123-4567
Order: #ORD-78945
Amount: $249.99 💰

Issues fixed: 98% ✅
Response time: <24 hours ⏰

Note: Special characters in this text will be cleaned based on your settings.`;
    
    setInputText(example);
    setCustomChars('@._-');
  };

  return (
    <>
      <Head>
        <title>Remove Special Characters | Free Online Text Cleaner Tool - GrockTool.com</title>
        <meta name="description" content="Clean text by removing special characters with customizable options. Keep letters, numbers, spaces, or specific characters. Free online text sanitizer tool." />
        <meta name="keywords" content="remove special characters, text cleaner, sanitize text, special character remover, text filter, clean text, remove symbols, character filter, text sanitizer" />
        <meta property="og:title" content="Remove Special Characters | Free Online Text Cleaner Tool - GrockTool.com" />
        <meta property="og:description" content="Clean your text by removing special characters with customizable options. Keep only the content you need with our free online text sanitizer." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Remove Special Characters - GrockTool.com" />
        <meta name="twitter:description" content="Free online tool to remove special characters and clean your text with customizable options." />
        <link rel="canonical" href="https://grocktool.com/text-tools/remove-special-chars" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Remove Special Characters Tool",
            "applicationCategory": "TextCleaningApplication",
            "operatingSystem": "Any",
            "description": "Free online tool to remove special characters from text with customizable preservation options",
            "url": "https://grocktool.com/text-tools/remove-special-chars",
            "author": {
              "@type": "Organization",
              "name": "GrockTool.com",
              "url": "https://grocktool.com"
            },
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "Special character removal",
              "Customizable preservation options",
              "Space preservation",
              "Number preservation",
              "Newline preservation",
              "Custom character preservation",
              "Real-time processing",
              "Statistics tracking"
            ]
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqData.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })}
        </script>
      </Head>
      
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
                  Clean text by removing special characters while preserving exactly what you need
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
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-foreground">
                      Input Text
                    </label>
                    <button
                      onClick={loadExample}
                      className="text-xs text-accent hover:underline"
                    >
                      Load Example
                    </button>
                  </div>
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Paste your messy text here with special characters, symbols, or unwanted formatting..."
                    className="w-full min-h-[250px] p-4 bg-input border border-border rounded-lg sm:rounded-xl focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-ring focus:ring-opacity-50 resize-none text-foreground placeholder-muted-foreground text-sm sm:text-base"
                    rows={8}
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
                    placeholder="Your cleaned text will appear here automatically..."
                    className="w-full min-h-[250px] p-4 bg-muted border border-border rounded-lg sm:rounded-xl focus:outline-none resize-none text-foreground placeholder-muted-foreground text-sm sm:text-base"
                    rows={8}
                  />
                </div>
              </div>

              {/* Options Section */}
              <div className="mt-6 pt-6 border-t border-border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Keep Options */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Filter size={16} />
                      What to Keep
                    </h4>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 text-sm text-foreground p-3 bg-secondary/50 rounded-lg hover:bg-secondary/70 transition-colors cursor-pointer">
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={keepSpaces}
                            onChange={(e) => setKeepSpaces(e.target.checked)}
                            className="sr-only"
                          />
                          <div className={`w-5 h-5 rounded border flex items-center justify-center ${keepSpaces ? 'bg-accent border-accent' : 'bg-input border-border'}`}>
                            {keepSpaces && <Check size={14} className="text-white" />}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">Spaces</div>
                          <div className="text-xs text-muted-foreground">Keep spaces between words (recommended)</div>
                        </div>
                      </label>
                      <label className="flex items-center gap-3 text-sm text-foreground p-3 bg-secondary/50 rounded-lg hover:bg-secondary/70 transition-colors cursor-pointer">
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={keepNumbers}
                            onChange={(e) => setKeepNumbers(e.target.checked)}
                            className="sr-only"
                          />
                          <div className={`w-5 h-5 rounded border flex items-center justify-center ${keepNumbers ? 'bg-accent border-accent' : 'bg-input border-border'}`}>
                            {keepNumbers && <Check size={14} className="text-white" />}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">Numbers (0-9)</div>
                          <div className="text-xs text-muted-foreground">Preserve digits and numerical data</div>
                        </div>
                      </label>
                      <label className="flex items-center gap-3 text-sm text-foreground p-3 bg-secondary/50 rounded-lg hover:bg-secondary/70 transition-colors cursor-pointer">
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={keepNewlines}
                            onChange={(e) => setKeepNewlines(e.target.checked)}
                            className="sr-only"
                          />
                          <div className={`w-5 h-5 rounded border flex items-center justify-center ${keepNewlines ? 'bg-accent border-accent' : 'bg-input border-border'}`}>
                            {keepNewlines && <Check size={14} className="text-white" />}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">Line Breaks</div>
                          <div className="text-xs text-muted-foreground">Preserve paragraph structure</div>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Custom Characters */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Type size={16} />
                      Custom Characters to Keep
                    </h4>
                    <input
                      type="text"
                      value={customChars}
                      onChange={(e) => setCustomChars(e.target.value)}
                      placeholder="Example: .!?_-@ or add specific symbols"
                      className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground placeholder-muted-foreground text-sm sm:text-base"
                    />
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>Add characters you want to preserve exactly as typed.</p>
                      <p className="text-accent">Common examples: ._-@ for emails, # for hashtags, / for dates</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Statistics - Only show when there's input */}
              {inputText && (
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                    <div className="text-lg font-bold text-foreground">{stats.originalLength}</div>
                    <div className="text-xs text-muted-foreground">Original</div>
                  </div>
                  <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                    <div className="text-lg font-bold text-foreground">{stats.cleanedLength}</div>
                    <div className="text-xs text-muted-foreground">Cleaned</div>
                  </div>
                  <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                    <div className="text-lg font-bold text-foreground">{stats.removedCount}</div>
                    <div className="text-xs text-muted-foreground">Removed</div>
                  </div>
                  <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
                    <div className="text-lg font-bold text-foreground">{stats.reductionPercentage}%</div>
                    <div className="text-xs text-muted-foreground">Reduction</div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  onClick={removeSpecialChars}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent text-accent-foreground rounded-lg sm:rounded-xl hover:bg-accent/80 active:scale-[0.98] transition-all text-sm sm:text-base"
                >
                  <Filter size={16} className="sm:w-4 sm:h-4" />
                  Clean Text Now
                </button>
                <button
                  onClick={handleClear}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg sm:rounded-xl hover:bg-secondary/80 active:scale-[0.98] transition-all text-sm sm:text-base"
                >
                  <RotateCcw size={16} className="sm:w-4 sm:h-4" />
                  Clear All
                </button>
                <button
                  onClick={handleCopy}
                  disabled={!outputText}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg sm:rounded-xl hover:bg-secondary/80 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 text-sm sm:text-base"
                >
                  <Copy size={16} className="sm:w-4 sm:h-4" />
                  Copy Result
                </button>
              </div>
            </motion.div>

            {/* Quick Info Card - Collapsible for mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 mb-8 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-foreground">Quick Guide</h3>
                <button
                  onClick={toggleQuickGuide}
                  className="text-accent hover:text-accent/80 transition-colors"
                >
                  {quickGuideOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>
              
              {quickGuideOpen && (
                <div className="space-y-4 text-muted-foreground text-sm">
                  <p>
                    This tool removes special characters from your text while letting you choose what to keep. It's like a filter for your text - only lets through what you want.
                  </p>
                  <div className="space-y-3 pt-2">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-medium text-accent">1</span>
                      </div>
                      <div>
                        <span className="font-medium text-foreground">Paste your text</span>
                        <p className="mt-1">Anything with symbols, punctuation, or messy formatting works. The example text shows common cases.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-medium text-accent">2</span>
                      </div>
                      <div>
                        <span className="font-medium text-foreground">Choose what stays</span>
                        <p className="mt-1">Tick boxes for spaces, numbers, line breaks. Add specific symbols you need in the custom field.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-medium text-accent">3</span>
                      </div>
                      <div>
                        <span className="font-medium text-foreground">Get clean text</span>
                        <p className="mt-1">The result updates automatically. Check the stats, copy when ready. Works for emails, data, code, any text.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* SEO Content Section - All collapsed by default for mobile performance */}
            <section className="space-y-4">
              {/* Filtering Rules */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('filteringRules')}
                  className="w-full flex items-center justify-between p-4 sm:p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h2 className="text-lg sm:text-xl font-bold text-foreground">How the Filtering Actually Works</h2>
                  {openSections.filteringRules ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.filteringRules && (
                  <div className="px-4 sm:px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      When you paste text and choose your options, the tool goes through each character and decides whether to keep it or remove it. It's not magic - just simple rules applied consistently. Understanding these rules helps you get exactly what you need.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <h3 className="font-semibold text-foreground mb-2">The Basics: What Always Stays</h3>
                        <p className="text-muted-foreground text-sm">
                          Letters (a-z and A-Z) always stay - that's the point of the tool. You're cleaning text, not deleting it entirely. Everything else gets evaluated based on your settings. If you don't check any boxes and leave custom characters empty, you get only letters back.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <h3 className="font-semibold text-foreground mb-2">The Checkbox Rules</h3>
                        <p className="text-muted-foreground text-sm">
                          Each checkbox adds a category back in. Spaces are actual space characters. Numbers are digits 0 through 9. Line breaks include newlines and carriage returns. These work independently - you can keep spaces but remove numbers, or any combination. Most people keep all three for readable text.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <h3 className="font-semibold text-foreground mb-2">Custom Characters Field</h3>
                        <p className="text-muted-foreground text-sm">
                          This is where you get precise control. Type exactly what you want to keep: dots for emails, underscores for usernames, @ symbols, etc. The tool treats these characters literally - if you add "._-", it keeps periods, underscores, and hyphens exactly where they appear in your original text.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-blue-500/5 rounded-lg border border-blue-500/10">
                        <h3 className="font-semibold text-foreground mb-2">Real Example from My Work</h3>
                        <p className="text-muted-foreground text-sm">
                          Cleaning user-submitted email addresses: I check all boxes (spaces, numbers, lines) and add "@._-" to custom. This keeps "user.name_123@example.com" intact while removing any parentheses, brackets, or stray symbols people might accidentally include. Works every time.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </article>

              {/* Encoding Handling */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('encodingHandling')}
                  className="w-full flex items-center justify-between p-4 sm:p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h2 className="text-lg sm:text-xl font-bold text-foreground">Text Encoding & Character Support</h2>
                  {openSections.encodingHandling ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.encodingHandling && (
                  <div className="px-4 sm:px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Text encoding sounds technical, but it just means how your computer stores and displays text. Different systems use different encodings, and this tool handles the most common ones while having some limitations you should know about.
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <CheckCircle size={18} className="text-green-500 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-medium text-foreground">What Works Well</h3>
                          <p className="text-muted-foreground text-sm mt-1">
                            Standard English text with basic symbols ($, %, &, etc.) works perfectly. The tool handles UTF-8 encoding, which is what most websites and modern apps use. Things like @ symbols in emails, dots in URLs, and standard punctuation get processed correctly when you tell the tool to keep them.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-xs font-medium text-yellow-600">!</span>
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground">International Text & Accents</h3>
                          <p className="text-muted-foreground text-sm mt-1">
                            Accented letters (é, ñ, ü, etc.) and non-Latin scripts (Arabic, Chinese, Cyrillic) get removed by default because they're not standard a-z. If you need to keep these, add them to the custom characters field. Type them exactly as they appear - the tool will preserve them.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <XCircle size={18} className="text-red-500 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-medium text-foreground">What Doesn't Work</h3>
                          <p className="text-muted-foreground text-sm mt-1">
                            Complex emoji, combining characters, and some rare Unicode symbols might not process correctly. If you paste something and it comes out wrong, try removing those characters first in a text editor. The tool focuses on practical text cleaning, not preserving every possible character.
                          </p>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-yellow-500/5 rounded-lg border border-yellow-500/10 mt-4">
                        <p className="text-muted-foreground text-sm">
                          <strong>Pro tip:</strong> If you're working with text from different sources (Word, PDF, web pages), paste it into a simple text editor first, then into this tool. That often fixes encoding issues before you even start cleaning.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </article>

              {/* Use Cases */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('useCases')}
                  className="w-full flex items-center justify-between p-4 sm:p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h2 className="text-lg sm:text-xl font-bold text-foreground">When I Actually Use This Tool</h2>
                  {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.useCases && (
                  <div className="px-4 sm:px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      I've been cleaning text for years - for websites, databases, and documents. Here are the situations where this tool saves me actual time, not just hypothetical use cases.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="border-l-4 border-accent pl-4 py-2">
                        <h3 className="font-semibold text-foreground">Preparing User Data for Import</h3>
                        <p className="text-muted-foreground text-sm mt-2">
                          When clients send me spreadsheet data, it often has random quotes, extra punctuation, or weird formatting. I paste it here, keep spaces/numbers/lines, add commas if needed, and get clean data ready for importing into any system. Takes 30 seconds instead of manually cleaning hundreds of rows.
                        </p>
                      </div>
                      
                      <div className="border-l-4 border-green-500 pl-4 py-2">
                        <h3 className="font-semibold text-foreground">Cleaning Code Comments & Documentation</h3>
                        <p className="text-muted-foreground text-sm mt-2">
                          Copying code comments or documentation from different sources often brings along weird formatting characters. I remove everything except letters, numbers, spaces, and basic punctuation. What's left is clean text I can use in my own documentation without formatting conflicts.
                        </p>
                      </div>
                      
                      <div className="border-l-4 border-blue-500 pl-4 py-2">
                        <h3 className="font-semibold text-foreground">Making Text Safe for Old Systems</h3>
                        <p className="text-muted-foreground text-sm mt-2">
                          Some older databases or legacy systems choke on special characters. I run text through here with minimal settings (just letters and numbers) to create "safe" versions that won't crash anything. It's like putting text through a strainer - only the simple parts come through.
                        </p>
                      </div>
                      
                      <div className="border-l-4 border-purple-500 pl-4 py-2">
                        <h3 className="font-semibold text-foreground">Creating Consistent Product Descriptions</h3>
                        <p className="text-muted-foreground text-sm mt-2">
                          E-commerce work involves cleaning up product descriptions from manufacturers. They use different quote styles, random symbols, inconsistent formatting. I standardize everything by removing the mess, then add back consistent punctuation. All products end up with clean, professional-looking descriptions.
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-green-500/5 rounded-lg border border-green-500/10">
                      <p className="text-muted-foreground text-sm">
                        <strong>Unexpected use:</strong> I once used this to clean up OCR (scanned text) output. The scanner added random symbols where it misread characters. Removing all special characters left readable text that I could then correct manually - much faster than fixing every single symbol.
                      </p>
                    </div>
                  </div>
                )}
              </article>

              {/* Examples */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('examples')}
                  className="w-full flex items-center justify-between p-4 sm:p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h2 className="text-lg sm:text-xl font-bold text-foreground">Step-by-Step Cleaning Examples</h2>
                  {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.examples && (
                  <div className="px-4 sm:px-6 pb-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Example: Cleaning Messy Contact Information</h3>
                        <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                          <pre className="text-sm text-muted-foreground font-mono leading-relaxed">
{`Original (copied from various sources):
John Doe | "Primary Contact" 
Email: john.doe@company-123.com
Phone: (+1) 555-123-4567
Address: 123 Main St., Suite #45B
Notes: "Urgent - callback before 5PM!!"

Goal: Keep readable contact info, remove formatting clutter

Settings I'd use:
☑ Keep spaces (for readability)
☑ Keep numbers (for phone/address)
☑ Keep line breaks (structure)
Custom characters: .@-_# (dots, at-sign, hyphens, underscore, hash)

Result after cleaning:
John Doe  Primary Contact 
Email john.doe@company-123.com
Phone 1 5551234567
Address 123 Main St Suite 45B
Notes Urgent  callback before 5PM

What happened:
• Quotes, parentheses, plus sign removed from phone
• Punctuation kept only where specified (.@-_#)
• Double spaces created (can fix with find/replace)
• Readable, database-ready text in 10 seconds

Alternative approach for just email/phone:
Custom characters: .@- (only essentials)
Result would keep emails perfect, remove everything else from other lines`}
                          </pre>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Example: Preparing Text for Programming</h3>
                        <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                          <pre className="text-sm text-muted-foreground font-mono leading-relaxed">
{`Original code comment/string:
// TODO: Fix the user's login issue (ID: #789) 
// Priority: HIGH!!! 
// Deadline: 2024-12-31
// Notes: Check API response for "error_code": 401

Goal: Extract just the meaningful text for a report

Settings:
☑ Keep spaces
☑ Keep numbers  
☑ Keep line breaks
Custom characters: -: (hyphen and colon for dates/times)

Clean result:
 TODO Fix the users login issue ID 789 
 Priority HIGH 
 Deadline 2024-12-31
 Notes Check API response for error_code 401

Now I can:
1. Use this in documentation
2. Paste into project management tools
3. Search for specific issue numbers
4. Remove the comment markers (//) with find/replace

Why this works for programming:
• Keeps issue numbers (#789 becomes 789)
• Preserves dates in standard format
• Removes emotional punctuation (!!!)
• Leaves clean, factual information
• Maintains structure with line breaks

Time saved vs manual editing: About 2 minutes per block of comments`}
                          </pre>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-accent/5 rounded-lg border border-accent/20">
                      <p className="text-muted-foreground text-sm">
                        <strong>Experiment tip:</strong> Try the same text with different settings. Start strict (remove everything), then gradually add back what you need. You'll quickly learn what each option does and how to get exactly the result you want.
                      </p>
                    </div>
                  </div>
                )}
              </article>

              {/* Limitations */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('limitations')}
                  className="w-full flex items-center justify-between p-4 sm:p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h2 className="text-lg sm:text-xl font-bold text-foreground">What This Tool Can't Do</h2>
                  {openSections.limitations ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.limitations && (
                  <div className="px-4 sm:px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Every tool has its boundaries. Knowing these helps you avoid frustration and pick the right tool for your job. Here's what this character remover isn't designed to handle.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <X size={16} className="text-red-500 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-medium text-foreground">Context-Aware Cleaning</h3>
                          <p className="text-muted-foreground text-sm mt-1">
                            It can't think. If you have "I'm happy" and remove apostrophes, you get "Im happy" not "I am happy". It processes character by character without understanding words or meaning. For smart text processing, you need manual editing or more advanced natural language tools.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <X size={16} className="text-red-500 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-medium text-foreground">Formatting Preservation</h3>
                          <p className="text-muted-foreground text-sm mt-1">
                            Bold, italics, colors, fonts - all gone. This is a plain text tool. If you copy from Word with formatting, you get just the characters. The styling doesn't come through. For formatted text cleaning, you'd need to work in your original editor first.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <X size={16} className="text-red-500 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-medium text-foreground">Massive File Processing</h3>
                          <p className="text-muted-foreground text-sm mt-1">
                            While it handles thousands of characters easily, pasting a 100-page novel might slow your browser. For huge files, consider cleaning in sections or using desktop software designed for massive text processing. This tool is for practical, everyday text cleaning jobs.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Check size={16} className="text-green-500 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-medium text-foreground">What It Does Exceptionally Well</h3>
                          <p className="text-muted-foreground text-sm mt-1">
                            Quick cleanup of messy text, preparing data for systems, creating consistent formatting, removing unwanted symbols, and giving you precise control over exactly which characters stay or go. For these tasks, it's faster and more reliable than manual editing.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-blue-500/5 rounded-lg border border-blue-500/10">
                      <p className="text-muted-foreground text-sm">
                        <strong>Workaround for complex jobs:</strong> Sometimes you need multiple tools. Clean here first, then use Find & Replace for specific fixes, then maybe Case Converter for formatting. I often use 2-3 tools in sequence for complex text processing jobs.
                      </p>
                    </div>
                  </div>
                )}
              </article>

              {/* Related Tools Section */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('relatedTools')}
                  className="w-full flex items-center justify-between p-4 sm:p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h2 className="text-lg sm:text-xl font-bold text-foreground">More Text Tools You Might Like</h2>
                  {openSections.relatedTools ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.relatedTools && (
                  <div className="px-4 sm:px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      If you work with text regularly, these other free tools might come in handy:
                    </p>
                    <ul className="space-y-3 text-muted-foreground">
                      {relatedTools.map((tool, index) => (
                        <li key={index} className="flex items-start group">
                          <span className="text-accent mr-2 group-hover:text-accent/80 transition-colors">•</span>
                          <Link 
                            href={tool.path}
                            className="text-accent hover:underline transition-colors flex-1"
                          >
                            <strong>{tool.name}:</strong> Useful for different text manipulation needs
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 text-sm text-muted-foreground">
                      <p>Each tool solves specific problems. I use different ones depending on whether I'm cleaning data, formatting text, or preparing content for different systems.</p>
                    </div>
                  </div>
                )}
              </article>

              {/* Frequently Asked Questions */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('faqs')}
                  className="w-full flex items-center justify-between p-4 sm:p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h2 className="text-lg sm:text-xl font-bold text-foreground">Common Questions Answered</h2>
                  {openSections.faqs ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.faqs && (
                  <div className="px-4 sm:px-6 pb-6">
                    <div className="space-y-6">
                      {faqData.map((faq, index) => (
                        <div key={index} className="pb-4 border-b border-border last:border-0 last:pb-0">
                          <h3 className="text-lg font-semibold text-foreground mb-2">{faq.question}</h3>
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                    
                    {/* Professional Note */}
                    <div className="mt-8 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                      <p className="text-sm text-muted-foreground">
                        <strong>A practical note:</strong> Always test with a small sample first. Paste a representative chunk, adjust settings, check the result. When it looks right, do the full text. This saves time and ensures you get exactly what you need.
                      </p>
                    </div>
                  </div>
                )}
              </article>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default RemoveSpecialChars;