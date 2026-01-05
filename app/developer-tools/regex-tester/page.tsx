'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, Search, RefreshCw, Check, AlertCircle, ChevronDown, ChevronUp, Code, FileText, Shield, Key, Zap, Regex } from 'lucide-react';
import Head from 'next/head';

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState('');
  const [matches, setMatches] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  // SEO Section Dropdown States
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

  // Related Tools Data
  const relatedTools = [
    { name: 'JSON to CSV Converter', path: '/developer-tools/json-to-csv', icon: FileText },
    { name: 'Base64 Encoder / Decoder', path: '/developer-tools/base64-encoder-decoder', icon: Shield },
    { name: 'JWT Decoder', path: '/developer-tools/jwt-decoder', icon: Key },
    { name: 'UUID Generator', path: '/developer-tools/uuid-generator', icon: Zap },
    { name: 'Unix Timestamp Converter', path: '/developer-tools/unix-timestamp', icon: Code },
  ];

  // Flag Options
  const flagOptions = [
    { value: 'g', label: 'g - Global search' },
    { value: 'i', label: 'i - Case insensitive' },
    { value: 'm', label: 'm - Multiline mode' },
    { value: 's', label: 's - Dot matches newline' },
    { value: 'u', label: 'u - Unicode support' },
    { value: 'y', label: 'y - Sticky search' }
  ];

  // Predefined Patterns
  const predefinedPatterns = [
    { name: 'Email', pattern: '\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b', description: 'Matches email addresses' },
    { name: 'URL', pattern: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)', description: 'Matches URLs' },
    { name: 'Phone Number', pattern: '\\+?\\d{1,4}?[-.\\s]?\\(?\\d{1,3}?\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}', description: 'Matches international phone numbers' },
    { name: 'IPv4 Address', pattern: '\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b', description: 'Matches IPv4 addresses' },
    { name: 'Digits', pattern: '\\d+', description: 'Matches one or more digits' },
    { name: 'Words', pattern: '\\b\\w+\\b', description: 'Matches complete words' },
  ];

  // FAQ Data
  const faqData = [
    {
      question: "What are regular expressions and how are they used?",
      answer: "Regular expressions (regex) are sequences of characters that define search patterns, primarily used for pattern matching within strings. They're extensively used for text searching, validation, parsing, and replacement operations in programming languages, text editors, and command-line tools. Regex provides a concise and flexible way to identify specific text patterns like email addresses, phone numbers, or custom formats."
    },
    {
      question: "What do the different regex flags mean?",
      answer: "Flags modify regex behavior: 'g' (global) finds all matches, not just first; 'i' (insensitive) makes matching case-insensitive; 'm' (multiline) makes ^ and $ match start/end of lines; 's' (dotall) makes . match newlines; 'u' (unicode) enables full Unicode support; 'y' (sticky) matches only from lastIndex position. Multiple flags can be combined like 'gi' for global case-insensitive search."
    },
    {
      question: "Why is my regex pattern not matching as expected?",
      answer: "Common issues include: incorrect escaping of special characters (use \\ for ., *, +, ?, ^, $, etc.), misunderstanding of greedy vs lazy quantifiers, incorrect character class usage, or missing flag configurations. Test with simple patterns first, then build complexity gradually. Use this tester to debug each component of your regex pattern."
    },
    {
      question: "What are the most common regex special characters?",
      answer: "Key special characters: . (any char), ^ (start of string), $ (end of string), * (0 or more), + (1 or more), ? (0 or 1), {n} (exactly n), {n,} (n or more), {n,m} (between n and m), [] (character class), | (alternation), () (capturing group), \\ (escape char). Each has specific matching behavior that must be understood for effective regex writing."
    },
    {
      question: "Are there performance considerations with complex regex patterns?",
      answer: "Yes, complex regex patterns, especially those with excessive backtracking, nested quantifiers, or overly broad wildcards, can cause performance issues. Avoid catastrophic backtracking by being specific in patterns, using atomic groups where appropriate, and testing with various input sizes. For extremely large text processing, consider alternative parsing approaches for performance-critical applications."
    }
  ];

  const testRegex = () => {
    setError('');
    setMatches([]);
    setCopied(false);

    if (!pattern.trim()) {
      setError('Please enter a regex pattern');
      return;
    }

    try {
      const safeFlags = flags.includes('g') ? flags : flags + 'g';
      const regex = new RegExp(pattern, safeFlags);
      const results = Array.from(testString.matchAll(regex), m => m[0]);
      setMatches(results);
    } catch (err: any) {
      setMatches([]);
      setError(err.message || 'Invalid regular expression syntax');
    }
  };

  const clearAll = () => {
    setPattern('');
    setFlags('g');
    setTestString('');
    setMatches([]);
    setError('');
    setCopied(false);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const selectPredefinedPattern = (patternStr: string) => {
    setPattern(patternStr);
    setError('');
  };

  const handlePatternChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPattern(e.target.value);
    setError('');
  };

  const handleFlagsChange = (flag: string) => {
    if (flags.includes(flag)) {
      setFlags(flags.replace(flag, ''));
    } else {
      setFlags(flags + flag);
    }
  };

  return (
    <>
      <Head>
        <title>Regex Tester | Free Online Regular Expression Tester - GrockTool.com</title>
        <meta name="description" content="Test and debug regular expressions instantly with our free online regex tester. Supports all regex features with real-time matching and detailed results." />
        <meta name="keywords" content="regex tester, regular expression tester, regex debugger, pattern matching, regex validator, online regex tester, regex patterns, regex syntax checker" />
        <meta property="og:title" content="Regex Tester | Free Online Regular Expression Tester - GrockTool.com" />
        <meta property="og:description" content="Free online regex tester tool to validate, test, and debug regular expressions with real-time matching and detailed analysis." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Regex Tester - GrockTool.com" />
        <meta name="twitter:description" content="Free online regular expression tester and debugger for developers." />
        <link rel="canonical" href="https://grocktool.com/developer-tools/regex-tester" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Regex Tester Tool",
            "applicationCategory": "DeveloperApplication",
            "operatingSystem": "Any",
            "description": "Free online regular expression tester to validate, test, and debug regex patterns with real-time matching and detailed results",
            "url": "https://grocktool.com/developer-tools/regex-tester",
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
              "Real-time regex testing",
              "Multiple flag support",
              "Predefined common patterns",
              "Match highlighting",
              "Error detection",
              "Copy functionality"
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
                Back to Developer Tools
              </Link>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                  Regex Tester – Fast, Accurate & Free
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Test and debug regular expressions in real-time
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
              {/* Predefined Patterns */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-foreground mb-3">Common Patterns</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {predefinedPatterns.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => selectPredefinedPattern(item.pattern)}
                      className="text-left p-3 bg-secondary/30 hover:bg-secondary/50 border border-border rounded-lg transition-colors group"
                    >
                      <div className="font-medium text-foreground text-sm group-hover:text-accent transition-colors">{item.name}</div>
                      <div className="text-xs text-muted-foreground mt-1 truncate" title={item.pattern}>{item.pattern}</div>
                      <div className="text-xs text-muted-foreground mt-1">{item.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Pattern Input Section */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-foreground">
                      Regular Expression Pattern
                    </label>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Regex size={12} />
                      <span>Enter regex pattern</span>
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={pattern}
                      onChange={handlePatternChange}
                      placeholder="Enter regex pattern (e.g., \d+ for digits)"
                      className="w-full p-4 bg-input border border-border rounded-lg sm:rounded-xl focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-ring focus:ring-opacity-50 text-foreground placeholder-muted-foreground font-mono text-sm"
                    />
                    {pattern && (
                      <button
                        onClick={() => copyToClipboard(pattern)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 bg-secondary rounded-md hover:bg-secondary/80 transition-colors"
                      >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                      </button>
                    )}
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    This tester uses <strong>JavaScript (ECMAScript)</strong> regex syntax.
                  </p>

                </div>

                {/* Flags Section */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-foreground">
                    Regex Flags
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {flagOptions.map((flag) => (
                      <button
                        key={flag.value}
                        onClick={() => handleFlagsChange(flag.value)}
                        className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${flags.includes(flag.value)
                          ? 'bg-accent text-accent-foreground border-accent'
                          : 'bg-secondary/30 text-foreground border-border hover:bg-secondary/50'
                          }`}
                      >
                        {flag.label}
                      </button>
                    ))}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Current flags: <code className="px-1.5 py-0.5 bg-muted rounded">{flags || '(none)'}</code>
                  </div>
                </div>

                {/* Test String Input */}
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-foreground">
                    Test String
                  </label>
                  <textarea
                    value={testString}
                    onChange={(e) => setTestString(e.target.value)}
                    placeholder="Enter text to test against the regex pattern"
                    className="w-full min-h-[150px] p-4 bg-input border border-border rounded-lg sm:rounded-xl focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-ring focus:ring-opacity-50 resize-none text-foreground placeholder-muted-foreground font-mono text-sm"
                  />
                </div>

                {error && (
                  <div className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <AlertCircle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm text-red-600 font-medium">Regex Error</p>
                      <p className="text-sm text-red-600 mt-1">{error}</p>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={clearAll}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg sm:rounded-xl hover:bg-secondary/80 transition-colors text-sm sm:text-base"
                  >
                    <RefreshCw size={16} className="sm:w-4 sm:h-4" />
                    Clear All
                  </button>
                  <button
                    onClick={testRegex}
                    disabled={!pattern.trim()}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg sm:rounded-xl hover:bg-blue-700 transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Search size={16} className="sm:w-4 sm:h-4" />
                    Test Regex
                  </button>
                </div>
              </div>

              {/* Results Section */}
              {testString && (
                <div className="mt-8 pt-6 border-t border-border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground">Results</h3>
                    {matches.length > 0 && (
                      <span className="px-3 py-1 bg-green-500/10 text-green-600 text-sm rounded-full">
                        {matches.length} match{matches.length !== 1 ? 'es' : ''} found
                      </span>
                    )}
                  </div>

                  {matches.length === 0 && !error && (
                    <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                      <p className="text-sm text-yellow-600">
                        No matches found for the given pattern in the test string.
                      </p>
                    </div>
                  )}

                  {matches.length > 0 && (
                    <div className="space-y-4">
                      <div className="bg-muted rounded-lg p-4">
                        <h4 className="text-sm font-medium text-foreground mb-2">Matched Text (Highlighted):</h4>
                        <div className="p-3 bg-background rounded border border-border font-mono text-sm">
                          {(() => {
                            let lastIndex = 0;
                            const elements = [];
                            const safeFlags = flags.includes('g') ? flags : flags + 'g';
                            const regex = new RegExp(pattern, safeFlags);
                            const allMatches = [...testString.matchAll(regex)];

                            allMatches.forEach((match, index) => {
                              // Text before match
                              if (match.index! > lastIndex) {
                                elements.push(
                                  <span key={`text-${index}`}>
                                    {testString.substring(lastIndex, match.index)}
                                  </span>
                                );
                              }

                              // Match itself
                              elements.push(
                                <span key={`match-${index}`} className="bg-yellow-500/20 text-yellow-700 px-0.5 rounded">
                                  {match[0]}
                                </span>
                              );

                              lastIndex = match.index! + match[0].length;
                            });

                            // Remaining text after last match
                            if (lastIndex < testString.length) {
                              elements.push(
                                <span key="text-end">
                                  {testString.substring(lastIndex)}
                                </span>
                              );
                            }

                            return elements.length ? elements : testString;
                          })()}
                        </div>
                      </div>

                      <div className="bg-muted rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-medium text-foreground">All Matches ({matches.length}):</h4>
                          <button
                            onClick={() => copyToClipboard(matches.join('\n'))}
                            className="flex items-center gap-2 px-3 py-1.5 text-xs bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                          >
                            {copied ? <Check size={12} /> : <Copy size={12} />}
                            {copied ? 'Copied!' : 'Copy All'}
                          </button>
                        </div>
                        <div className="space-y-2 max-h-60 overflow-y-auto">
                          {matches.map((match, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-background rounded border border-border">
                              <div className="font-mono text-sm">
                                <span className="text-muted-foreground mr-2">#{index + 1}</span>
                                {match}
                              </div>
                              <button
                                onClick={() => copyToClipboard(match)}
                                className="p-1 hover:bg-secondary rounded transition-colors"
                              >
                                <Copy size={12} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>

            {/* Quick Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 mb-8 shadow-sm"
            >
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">How to Use the Regex Tester</h3>
              <div className="space-y-2 text-muted-foreground text-sm">
                <p>
                  This tool allows you to test and debug regular expressions with instant feedback and detailed results.
                </p>
                <div className="text-xs sm:text-sm space-y-1 pt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Enter a regex pattern or select from common patterns above</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Choose flags to modify regex behavior (global, case-insensitive, etc.)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Input test text to match against your pattern</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Click "Test Regex" to see matches highlighted in the results</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Copy individual matches or all results for further use</span>
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
                >
                  <h2 className="text-xl font-bold text-foreground">Regex Tester - What It Does</h2>
                  {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>

                {openSections.whatItDoes && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      This comprehensive online regex tester provides real-time validation and debugging capabilities for regular expressions—a powerful pattern-matching language used across programming languages, text editors, and command-line tools. The tool offers immediate feedback on regex syntax, visual highlighting of matches within test strings, and detailed analysis of pattern performance and results.
                    </p>
                    <p className="text-muted-foreground">
                      Designed for developers, data analysts, and anyone working with text processing, this regex tester supports all standard regex features including character classes, quantifiers, groups, lookaheads, and lookbehinds. With built-in common patterns for emails, URLs, phone numbers, and other frequently used formats, users can quickly test and modify regex expressions. The tool's real-time highlighting and detailed match reporting make it invaluable for learning regex syntax, debugging complex patterns, and ensuring pattern accuracy before implementing in production code.
                    </p>
                  </div>
                )}
              </article>

              {/* Use Cases Section - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('useCases')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h2 className="text-xl font-bold text-foreground">Practical Use Cases for Regular Expressions</h2>
                  {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>

                {openSections.useCases && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Regular expressions serve essential purposes across various development and data processing scenarios:
                    </p>
                    <ul className="space-y-3 text-muted-foreground pl-5">
                      <li className="pl-2">
                        <strong className="text-foreground">Form Validation & Data Sanitization</strong>
                        <p className="mt-1">Validate email addresses, phone numbers, passwords, and other user inputs in web forms and applications with precise pattern matching.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Text Search & Data Extraction</strong>
                        <p className="mt-1">Extract specific information from logs, documents, or datasets, such as dates, IP addresses, error codes, or custom patterns from large text files.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Data Cleaning & Transformation</strong>
                        <p className="mt-1">Clean and transform data by finding and replacing patterns, removing unwanted characters, or reformatting text during data processing pipelines.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Log Analysis & Monitoring</strong>
                        <p className="mt-1">Parse server logs, application logs, and monitoring data to identify patterns, errors, or specific events in system outputs.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Web Scraping & Content Parsing</strong>
                        <p className="mt-1">Extract structured data from HTML, XML, or JSON responses when more sophisticated parsers aren't available or necessary.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Code Refactoring & Search</strong>
                        <p className="mt-1">Find and replace patterns in codebases across multiple files during refactoring, migration, or code standardization efforts.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Natural Language Processing</strong>
                        <p className="mt-1">Perform initial text processing tasks like tokenization, pattern recognition, and simple linguistic analysis in NLP pipelines.</p>
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
                >
                  <h2 className="text-xl font-bold text-foreground">How to Use This Regex Tester Effectively</h2>
                  {openSections.howToUse ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>

                {openSections.howToUse && (
                  <div className="px-6 pb-6">
                    <ol className="space-y-4 text-muted-foreground pl-5">
                      <li className="pl-2">
                        <strong className="text-foreground">Start with Predefined Patterns</strong>
                        <p className="mt-1">Use the common patterns section as starting points for emails, URLs, phone numbers, or other common use cases, then customize as needed.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Select Appropriate Flags</strong>
                        <p className="mt-1">Choose regex flags based on your needs: 'g' for multiple matches, 'i' for case-insensitive search, 'm' for multiline text, etc.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Test with Representative Data</strong>
                        <p className="mt-1">Input realistic test strings that include both matching and non-matching examples to thoroughly validate your pattern.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Analyze Match Results</strong>
                        <p className="mt-1">Review highlighted matches in the test string and the detailed matches list to ensure your pattern captures exactly what you intend.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Debug Incrementally</strong>
                        <p className="mt-1">Build complex patterns gradually, testing each component. Use simple patterns first, then add complexity while verifying matches at each step.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Optimize Performance</strong>
                        <p className="mt-1">For large text processing, test pattern performance with realistic data sizes and consider optimization techniques for production use.</p>
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
                >
                  <h2 className="text-xl font-bold text-foreground">Regex Pattern Examples</h2>
                  {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>

                {openSections.examples && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground text-sm mb-4">
                      Below are practical regex examples with test strings and expected results:
                    </p>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 1: Email Address Extraction</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="bg-muted p-4 rounded-lg">
                              <h4 className="text-sm font-semibold text-foreground mb-2">Pattern:</h4>
                              <code className="text-sm font-mono text-muted-foreground">\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2}\b</code>
                            </div>
                            <div className="bg-muted p-4 rounded-lg">
                              <h4 className="text-sm font-semibold text-foreground mb-2">Test String:</h4>
                              <pre className="text-xs text-muted-foreground font-mono whitespace-pre-wrap">Contact us at support@example.com or sales@company.co.uk for assistance.</pre>
                            </div>
                          </div>
                          <div className="bg-muted p-4 rounded-lg">
                            <h4 className="text-sm font-semibold text-foreground mb-2">Matches Found:</h4>
                            <div className="space-y-2">
                              <div className="p-2 bg-background rounded border border-border">
                                <div className="text-xs text-muted-foreground">Match 1:</div>
                                <div className="font-mono text-sm">support@example.com</div>
                              </div>
                              <div className="p-2 bg-background rounded border border-border">
                                <div className="text-xs text-muted-foreground">Match 2:</div>
                                <div className="font-mono text-sm">sales@company.co.uk</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 2: Date Pattern Matching</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="bg-muted p-4 rounded-lg">
                              <h4 className="text-sm font-semibold text-foreground mb-2">Pattern:</h4>
                              <code className="text-sm font-mono text-muted-foreground">\d{4}-\d{2}-\d{2}</code>
                              <div className="text-xs text-muted-foreground mt-2">Flags: g (global search)</div>
                            </div>
                            <div className="bg-muted p-4 rounded-lg">
                              <h4 className="text-sm font-semibold text-foreground mb-2">Test String:</h4>
                              <pre className="text-xs text-muted-foreground font-mono whitespace-pre-wrap">Events: 2023-12-25 (Christmas), 2024-01-01 (New Year), 2024-02-14 (Valentine's)</pre>
                            </div>
                          </div>
                          <div className="bg-muted p-4 rounded-lg">
                            <h4 className="text-sm font-semibold text-foreground mb-2">Matches Found:</h4>
                            <div className="space-y-2">
                              <div className="p-2 bg-background rounded border border-border">
                                <div className="text-xs text-muted-foreground">Match 1:</div>
                                <div className="font-mono text-sm">2023-12-25</div>
                              </div>
                              <div className="p-2 bg-background rounded border border-border">
                                <div className="text-xs text-muted-foreground">Match 2:</div>
                                <div className="font-mono text-sm">2024-01-01</div>
                              </div>
                              <div className="p-2 bg-background rounded border border-border">
                                <div className="text-xs text-muted-foreground">Match 3:</div>
                                <div className="font-mono text-sm">2024-02-14</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </article>

              {/* Frequently Asked Questions - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('faqs')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h2 className="text-xl font-bold text-foreground">Frequently Asked Questions About Regex</h2>
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

                    {/* Performance Tips */}
                    <div className="mt-8 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <h3 className="text-lg font-semibold text-foreground mb-2">Regex Performance Tips</h3>
                      <p className="text-sm text-muted-foreground">
                        For optimal regex performance: 1) Be specific in patterns to avoid excessive backtracking, 2) Use character classes instead of alternations where possible, 3) Avoid nested quantifiers in complex patterns, 4) Consider atomic groups for performance-critical patterns, 5) Test with realistic data volumes before production deployment. Remember that regex engines differ slightly between programming languages, so test patterns in your target environment when possible.
                      </p>
                    </div>
                  </div>
                )}
              </article>

              {/* Related Tools Section */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('relatedTools')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h2 className="text-xl font-bold text-foreground">More Developer Tools</h2>
                  {openSections.relatedTools ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>

                {openSections.relatedTools && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Explore other useful developer tools from our Developer Tools category:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {relatedTools.map((tool, index) => {
                        const Icon = tool.icon;
                        return (
                          <Link
                            key={index}
                            href={tool.path}
                            className="flex items-center gap-3 p-4 bg-secondary/30 rounded-lg border border-border hover:bg-secondary/50 transition-colors group"
                          >
                            <div className="bg-accent/10 p-2 rounded-lg group-hover:bg-accent/20 transition-colors">
                              <Icon size={18} className="text-accent" />
                            </div>
                            <div>
                              <div className="font-medium text-foreground group-hover:text-accent transition-colors">{tool.name}</div>
                              <div className="text-xs text-muted-foreground">Visit tool →</div>
                            </div>
                          </Link>
                        );
                      })}
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
}