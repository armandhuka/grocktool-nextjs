'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, RotateCcw, Filter, ChevronDown, ChevronUp, Type, FileText, CheckCircle, XCircle, ArrowDownUp, RotateCw, Hash, Code, TextCursorInput, Check, X } from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';

const RemoveSpecialChars = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [keepSpaces, setKeepSpaces] = useState(true);
  const [keepNumbers, setKeepNumbers] = useState(true);
  const [keepNewlines, setKeepNewlines] = useState(true);
  const [customChars, setCustomChars] = useState('');
  const [openSections, setOpenSections] = useState({
    whatItDoes: true,
    useCases: false,
    howToUse: false,
    examples: false,
    faqs: false,
    relatedTools: false
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const relatedTools = [
    { name: 'Word Counter', path: '/text-tools/word-counter' },
    { name: 'Remove Duplicates',  path: '/text-tools/remove-duplicates' },
    { name: 'Case Converter',  path: '/text-tools/case-converter' },
    { name: 'Text Sorter', path: '/text-tools/text-sorter' },
    { name: 'Text Reverser', path: '/text-tools/text-reverser' },
    { name: 'Slug Generator',path: '/text-tools/slug-generator' },
    { name: 'Find & Replace', path: '/text-tools/find-replace' },
    { name: 'Palindrome Checker', path: '/text-tools/palindrome-checker' },
    { name: 'Text Limiter', path: '/text-tools/text-limiter' }
  ];

  const faqData = [
    {
      question: "What are considered special characters?",
      answer: "Special characters include punctuation marks, symbols, and non-alphanumeric characters that are not letters (a-z, A-Z) or numbers (0-9). Examples include: ! @ # $ % ^ & * ( ) [ ] { } ; : ' \" , . < > ? / \\ | ` ~ - _ = +. The tool allows you to control exactly which types of characters get removed or preserved."
    },
    {
      question: "Why would I need to remove special characters?",
      answer: "Removing special characters is useful for data cleaning, preparing text for databases, creating URLs/slugs, sanitizing user input, preparing text for machine learning models, cleaning code snippets, and making text compatible with systems that only accept alphanumeric characters. It's commonly used in programming, data analysis, and content management."
    },
    {
      question: "Does this tool support Unicode or international characters?",
      answer: "The tool is optimized for English text and basic Latin alphabet. For international characters, it treats accented letters (like é, ñ, ü) as special characters unless specified in the custom characters field. To preserve specific Unicode characters, add them to the custom characters field. The tool processes UTF-8 text but focuses on removing standard special characters."
    },
    {
      question: "How does the custom characters field work?",
      answer: "The custom characters field lets you specify exactly which special characters to preserve. For example, if you want to keep underscores and hyphens, enter '_ -' in the field. The tool will remove all other special characters except those you specify. This gives you precise control over the cleaning process for specific use cases like programming or data formatting."
    },
    {
      question: "What's the difference between this tool and a slug generator?",
      answer: "This tool gives you granular control over which characters to remove or keep. A slug generator specifically creates URL-friendly strings by converting spaces to hyphens and removing most special characters. This tool is more flexible - you can decide to keep spaces, numbers, or specific symbols based on your needs, while slug generators follow predefined rules for URL creation."
    }
  ];

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

  const getStats = () => {
    const removedChars = inputText.length - outputText.length;
    const reductionPercentage = inputText.length > 0 ? Math.round((removedChars / inputText.length) * 100) : 0;
    
    return {
      totalLines: inputText.split('\n').length,
      originalLength: inputText.length,
      cleanedLength: outputText.length,
      removedCount: removedChars,
      reductionPercentage
    };
  };

  const stats = getStats();

  const exampleInput = `Hello, World! 😊
Welcome to our Tool - it's amazing!
Contact: info@example.com
Price: $29.99
Discount: 25% OFF!`;

  const loadExample = () => {
    setInputText(exampleInput);
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
                    <h4 className="text-sm font-medium text-foreground">Preserve These Characters</h4>
                    <div className="space-y-3">
                      <label className="flex items-center gap-2 text-sm text-foreground p-3 bg-secondary/50 rounded-lg">
                        <input
                          type="checkbox"
                          checked={keepSpaces}
                          onChange={(e) => setKeepSpaces(e.target.checked)}
                          className="w-4 h-4 text-accent bg-input border-border rounded focus:ring-accent focus:ring-2"
                        />
                        <div>
                          <div className="font-medium">Spaces</div>
                          <div className="text-xs text-muted-foreground">Keep spaces between words</div>
                        </div>
                      </label>
                      <label className="flex items-center gap-2 text-sm text-foreground p-3 bg-secondary/50 rounded-lg">
                        <input
                          type="checkbox"
                          checked={keepNumbers}
                          onChange={(e) => setKeepNumbers(e.target.checked)}
                          className="w-4 h-4 text-accent bg-input border-border rounded focus:ring-accent focus:ring-2"
                        />
                        <div>
                          <div className="font-medium">Numbers (0-9)</div>
                          <div className="text-xs text-muted-foreground">Preserve numerical digits</div>
                        </div>
                      </label>
                      <label className="flex items-center gap-2 text-sm text-foreground p-3 bg-secondary/50 rounded-lg">
                        <input
                          type="checkbox"
                          checked={keepNewlines}
                          onChange={(e) => setKeepNewlines(e.target.checked)}
                          className="w-4 h-4 text-accent bg-input border-border rounded focus:ring-accent focus:ring-2"
                        />
                        <div>
                          <div className="font-medium">New lines</div>
                          <div className="text-xs text-muted-foreground">Preserve line breaks</div>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Custom Characters */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-foreground">Custom Characters to Keep</h4>
                    <input
                      type="text"
                      value={customChars}
                      onChange={(e) => setCustomChars(e.target.value)}
                      placeholder="e.g., .!?_-@"
                      className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground placeholder-muted-foreground"
                    />
                    <p className="text-muted-foreground text-xs">
                      Enter specific characters you want to preserve (dots, underscores, etc.)
                    </p>
                    <button
                      onClick={loadExample}
                      className="text-sm text-accent hover:underline"
                    >
                      Load Example Text
                    </button>
                  </div>
                </div>
              </div>

              {/* Statistics */}
              {inputText && (
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                    <div className="text-lg font-bold text-foreground">{stats.originalLength}</div>
                    <div className="text-xs text-muted-foreground">Original Characters</div>
                  </div>
                  <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                    <div className="text-lg font-bold text-foreground">{stats.cleanedLength}</div>
                    <div className="text-xs text-muted-foreground">Cleaned Characters</div>
                  </div>
                  <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                    <div className="text-lg font-bold text-foreground">{stats.removedCount}</div>
                    <div className="text-xs text-muted-foreground">Removed Characters</div>
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
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent text-accent-foreground rounded-lg sm:rounded-xl hover:bg-accent/80 transition-colors text-sm sm:text-base"
                >
                  <Filter size={16} className="sm:w-4 sm:h-4" />
                  Remove Special Characters
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

            {/* Quick Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 mb-8 shadow-sm"
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

            {/* SEO Content Section with Dropdowns */}
            <section className="space-y-4">
              {/* What This Tool Does - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('whatItDoes')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                  aria-expanded={openSections.whatItDoes}
                >
                  <h2 className="text-xl font-bold text-foreground">Remove Special Characters - What It Does</h2>
                  {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.whatItDoes && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      This free online tool cleans text by removing special characters while giving you complete control over what gets preserved. The tool automatically keeps letters (a-z, A-Z) and allows you to choose whether to keep spaces, numbers (0-9), new lines, and specific custom characters. It processes text in real-time, updating the cleaned output as you type or modify options.
                    </p>
                    <p className="text-muted-foreground">
                      Perfect for data sanitization, text preparation for databases, creating clean URLs, processing user input, and preparing text for various applications. Whether you need to clean messy text data, prepare strings for programming, or sanitize content for different systems, this tool provides a flexible and efficient solution with detailed statistics showing exactly how many characters were removed.
                    </p>
                  </div>
                )}
              </article>

              {/* Use Cases Section - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('useCases')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                  aria-expanded={openSections.useCases}
                >
                  <h2 className="text-xl font-bold text-foreground">Practical Use Cases for Character Removal</h2>
                  {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.useCases && (
                  <div className="px-6 pb-6">
                    <ul className="space-y-3 text-muted-foreground pl-5">
                      <li className="pl-2">
                        <strong className="text-foreground">Database Entry Cleaning</strong>
                        <p className="mt-1">Prepare text data for database storage by removing special characters that might cause SQL injection issues or formatting problems in database fields.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">URL and Slug Creation</strong>
                        <p className="mt-1">Generate clean URLs and slugs from text titles by removing special characters while keeping dashes or underscores for word separation.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Data Analysis Preparation</strong>
                        <p className="mt-1">Clean datasets for analysis by removing inconsistent special characters that could affect text mining, sentiment analysis, or machine learning models.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Programming and Development</strong>
                        <p className="mt-1">Sanitize user input, clean configuration files, or prepare strings for coding where special characters might cause syntax errors or security issues.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Content Management Systems</strong>
                        <p className="mt-1">Clean imported content, remove unwanted formatting characters, and prepare text for consistent display across different platforms and devices.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Text Messaging and Communication</strong>
                        <p className="mt-1">Prepare clean text for SMS, chat systems, or platforms with character limits by removing unnecessary symbols and special formatting.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Academic and Research Work</strong>
                        <p className="mt-1">Clean research data, bibliographic entries, or text corpora by standardizing character sets and removing inconsistent special characters.</p>
                      </li>
                    </ul>
                  </div>
                )}
              </article>

              {/* How to Use This Tool - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('howToUse')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                  aria-expanded={openSections.howToUse}
                >
                  <h2 className="text-xl font-bold text-foreground">How to Remove Special Characters Effectively</h2>
                  {openSections.howToUse ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.howToUse && (
                  <div className="px-6 pb-6">
                    <ol className="space-y-4 text-muted-foreground pl-5">
                      <li className="pl-2">
                        <strong className="text-foreground">Prepare Your Text</strong>
                        <p className="mt-1">Copy and paste the text containing special characters into the input area. The tool works with any amount of text, from single lines to large documents.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Configure Preservation Options</strong>
                        <p className="mt-1">Decide what to keep: enable spaces for readable text, numbers for data preservation, new lines for paragraph structure, based on your needs.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Specify Custom Characters</strong>
                        <p className="mt-1">Add specific characters to preserve in the custom field. For example, add '.' to keep periods or '_' to keep underscores for specific formatting needs.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Review Automatic Processing</strong>
                        <p className="mt-1">As you make changes, the tool automatically processes the text and shows the cleaned result in the output area with real-time statistics.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Check Statistics and Adjust</strong>
                        <p className="mt-1">Review the character statistics to understand the cleaning impact. If too many or too few characters are removed, adjust your options accordingly.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Save and Export Results</strong>
                        <p className="mt-1">When satisfied with the cleaned text, use the "Copy Result" button to copy it to your clipboard for use in other applications or systems.</p>
                      </li>
                    </ol>
                  </div>
                )}
              </article>

              {/* Example Input and Output - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('examples')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                  aria-expanded={openSections.examples}
                >
                  <h2 className="text-xl font-bold text-foreground">Character Removal Examples & Analysis</h2>
                  {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.examples && (
                  <div className="px-6 pb-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 1: Basic Text Cleaning for Databases</h3>
                        <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                          <pre className="text-sm text-muted-foreground font-mono">
{`Input:
Hello, World! Welcome to our database.
User: john_doe123
Email: john@example.com
Age: 25 years old!
Score: 98.5%

Options:
• Keep spaces: ON
• Keep numbers: ON
• Keep new lines: ON
• Custom characters: _@. (underscore, at, dot)

Output:
Hello World Welcome to our database
User john_doe123
Email john@example.com
Age 25 years old
Score 98.5

Statistics:
• Original characters: 108
• Cleaned characters: 97
• Removed characters: 11
• Reduction: 10%

Analysis:
The tool removed commas, exclamation marks, and colons while
preserving underscores, dots, and @ symbol for email addresses.
This creates database-friendly text while keeping essential
formatting for usernames and email addresses.`}
                          </pre>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 2: Creating URL Slugs from Titles</h3>
                        <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                          <pre className="text-sm text-muted-foreground font-mono">
{`Input:
Top 10 Programming Languages in 2024: Python, JavaScript & More!

Options:
• Keep spaces: OFF
• Keep numbers: ON
• Keep new lines: OFF
• Custom characters: - (hyphen)

Processing Steps:
1. Original: "Top 10 Programming Languages in 2024: Python, JavaScript & More!"
2. Remove special characters (except numbers and hyphen)
3. Convert spaces to hyphens
4. Convert to lowercase

Output:
top-10-programming-languages-in-2024-python-javascript-more

Statistics:
• Original characters: 68
• Cleaned characters: 63
• Removed characters: 5
• Reduction: 7%

Analysis:
The tool created a clean URL slug by removing punctuation,
converting to lowercase, and replacing spaces with hyphens.
This format is perfect for SEO-friendly URLs and web addresses.`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </article>

              {/* Related Tools Section - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('relatedTools')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                  aria-expanded={openSections.relatedTools}
                >
                  <h2 className="text-xl font-bold text-foreground">Related Text & Data Tools</h2>
                  {openSections.relatedTools ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.relatedTools && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Explore other useful text and data processing tools from GrockTool.com:
                    </p>
                    <ul className="space-y-3 text-muted-foreground">
                      {relatedTools.map((tool, index) => (
                        <li key={index} className="flex items-start">
                          <Link href={tool.path} className="text-accent hover:underline flex-1">
                            <strong>{tool.name}:</strong> Visit this tool for additional text manipulation capabilities
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>

              {/* Frequently Asked Questions - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('faqs')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                  aria-expanded={openSections.faqs}
                >
                  <h2 className="text-xl font-bold text-foreground">Frequently Asked Questions About Character Removal</h2>
                  {openSections.faqs ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.faqs && (
                  <div className="px-6 pb-6">
                    <div className="space-y-6">
                      {faqData.map((faq, index) => (
                        <div key={index}>
                          <h3 className="text-lg font-semibold text-foreground mb-2">{faq.question}</h3>
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                    
                    {/* Technical Note */}
                    <div className="mt-8 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <h3 className="text-lg font-semibold text-foreground mb-2">Technical Implementation Notes</h3>
                      <p className="text-sm text-muted-foreground">
                        This special character removal tool uses regular expressions for efficient text processing. The tool dynamically builds regex patterns based on your selected options and processes text in real-time as you type. All processing happens client-side in your browser for maximum privacy and security. The tool handles UTF-8 encoding and processes text efficiently using JavaScript's built-in string manipulation methods.
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