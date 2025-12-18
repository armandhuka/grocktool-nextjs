'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, RotateCcw, CheckCircle, XCircle, ChevronDown, ChevronUp, Check, X } from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';

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
  const [stats, setStats] = useState({
    totalCharacters: 0,
    cleanedCharacters: 0,
    processingTime: 0
  });
  
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
    { name: 'Remove Duplicates', path: '/text-tools/remove-duplicates' },
    { name: 'Case Converter', path: '/text-tools/case-converter' },
    { name: 'Text Sorter', path: '/text-tools/text-sorter' },
    { name: 'Text Reverser', path: '/text-tools/text-reverser' },
    { name: 'Slug Generator', path: '/text-tools/slug-generator' },
    { name: 'Find & Replace', path: '/text-tools/find-replace' },
    { name: 'Remove Special Characters', path: '/text-tools/remove-special-chars' },
    { name: 'Text Limiter', path: '/text-tools/text-limiter' }
  ];

  const faqData = [
    {
      question: "What exactly is a palindrome?",
      answer: "A palindrome is a word, phrase, number, or other sequence of characters that reads the same forward and backward, ignoring spaces, punctuation, and capitalization when applicable. Common examples include 'racecar', 'madam', and the phrase 'A man a plan a canal Panama'. Palindromes have fascinated linguists, mathematicians, and puzzle enthusiasts for centuries."
    },
    {
      question: "Why do the checking options matter in palindrome detection?",
      answer: "The checking options (ignore case, spaces, and punctuation) allow you to control how strictly the tool evaluates your text. Real-world palindromes often include spaces, punctuation, and mixed capitalization that would break a strict character-by-character comparison. By enabling these options, you can identify palindromes in natural language phrases and sentences, not just single words."
    },
    {
      question: "Can numbers or sentences be palindromes?",
      answer: "Yes, both numbers and complete sentences can be palindromes. Numeric palindromes like '12321' or '1991' are common. Sentence palindromes include famous examples like 'Was it a car or a cat I saw?' and 'Able was I ere I saw Elba.' When checking sentences, it's helpful to enable all checking options to ignore spaces, punctuation, and capitalization for accurate detection."
    },
    {
      question: "What are some practical uses of palindrome checking?",
      answer: "Palindrome checking has applications in software development (input validation, algorithm testing), education (teaching language patterns), puzzle creation, and recreational mathematics. Developers use palindrome algorithms for data validation, string manipulation exercises, and coding interviews. Educators use them to teach symmetry in language and computational thinking."
    },
    {
      question: "How does the automatic checking feature work?",
      answer: "The tool uses React's useEffect hook to automatically trigger palindrome checking whenever your input text changes or when you modify any checking options. This provides immediate feedback as you type without requiring a separate button click. The checking process cleans your text according to selected options, reverses it, and compares the original cleaned text with the reversed version."
    }
  ];

  const palindromeExamples = [
    'racecar',
    'A man a plan a canal Panama',
    'madam',
    'Was it a car or a cat I saw?',
    'level',
    'No \'x\' in Nixon'
  ];

  const checkPalindrome = () => {
    if (!inputText.trim()) {
      setResult(null);
      return;
    }

    const startTime = performance.now();
    
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
    
    const endTime = performance.now();
    const processingTime = endTime - startTime;

    setResult({
      isPalindrome,
      cleanedText,
      reversed
    });
    
    setStats({
      totalCharacters: inputText.length,
      cleanedCharacters: cleanedText.length,
      processingTime: Number(processingTime.toFixed(2))
    });
  };

  const handleClear = () => {
    setInputText('');
    setResult(null);
    setStats({
      totalCharacters: 0,
      cleanedCharacters: 0,
      processingTime: 0
    });
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

  const loadExample = (example: string) => {
    setInputText(example);
  };

  // Auto-check as user types
  useEffect(() => {
    if (inputText.trim()) {
      checkPalindrome();
    } else {
      setResult(null);
      setStats({
        totalCharacters: 0,
        cleanedCharacters: 0,
        processingTime: 0
      });
    }
  }, [inputText, ignoreSpaces, ignorePunctuation, ignoreCase]);

  return (
    <>
      <Head>
        <title>Palindrome Checker | Free Online Text Analysis Tool - GrockTool.com</title>
        <meta name="description" content="Check if any word, phrase, or sentence is a palindrome. Instantly analyze text with customizable options for case, spaces, and punctuation. Free online palindrome detector." />
        <meta name="keywords" content="palindrome checker, palindrome detector, text palindrome, word palindrome, palindrome tool, string analysis, text symmetry, palindrome test, online palindrome checker, language tool" />
        <meta property="og:title" content="Palindrome Checker | Free Online Text Analysis Tool - GrockTool.com" />
        <meta property="og:description" content="Instantly check if your text reads the same forwards and backwards. Customize checking options for accurate palindrome detection." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Palindrome Checker - GrockTool.com" />
        <meta name="twitter:description" content="Free online tool to check if text is a palindrome. Analyze words, phrases, and sentences instantly." />
        <link rel="canonical" href="https://grocktool.com/text-tools/palindrome-checker" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Palindrome Checker",
            "applicationCategory": "TextAnalysisApplication",
            "operatingSystem": "Any",
            "description": "Free palindrome checker tool to determine if text reads the same forward and backward with customizable checking options",
            "url": "https://grocktool.com/text-tools/palindrome-checker",
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
              "Real-time palindrome checking",
              "Case insensitive detection",
              "Space ignoring option",
              "Punctuation ignoring option",
              "Automatic text cleaning",
              "Result copying functionality",
              "Palindrome examples library"
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
                  Palindrome Checker
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Instantly check if any word, phrase, or sentence reads the same forwards and backwards
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
                    placeholder="Enter a word, phrase, or sentence..."
                    className="w-full min-h-[250px] p-4 bg-input border border-border rounded-lg sm:rounded-xl focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-ring focus:ring-opacity-50 resize-none text-foreground placeholder-muted-foreground"
                  />
                </div>

                {/* Output Section */}
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-foreground">
                    Analysis Results
                  </label>
                  <div className={`w-full min-h-[250px] p-4 rounded-lg sm:rounded-xl border-2 ${
                    result ? 
                      result.isPalindrome 
                        ? 'bg-green-500/10 border-green-500/20' 
                        : 'bg-red-500/10 border-red-500/20'
                      : 'bg-muted border-border'
                  }`}>
                    {result ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          {result.isPalindrome ? (
                            <CheckCircle className="text-green-500" size={24} />
                          ) : (
                            <XCircle className="text-red-500" size={24} />
                          )}
                          <h3 className={`text-lg sm:text-xl font-bold ${
                            result.isPalindrome ? 'text-green-500' : 'text-red-500'
                          }`}>
                            {result.isPalindrome ? 'Yes, it\'s a palindrome!' : 'No, it\'s not a palindrome.'}
                          </h3>
                        </div>
                        
                        <div className="space-y-3 text-sm">
                          <div className="flex items-start gap-2">
                            <span className="font-medium text-foreground whitespace-nowrap pt-1">Cleaned text:</span>
                            <code className="bg-background px-3 py-2 rounded text-xs flex-1 break-all">{result.cleanedText}</code>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="font-medium text-foreground whitespace-nowrap pt-1">Reversed:</span>
                            <code className="bg-background px-3 py-2 rounded text-xs flex-1 break-all">{result.reversed}</code>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                        Results will appear here
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Stats Bar */}
              {result && (
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                    <div className="text-lg font-bold text-foreground">{stats.totalCharacters}</div>
                    <div className="text-xs text-muted-foreground">Total Characters</div>
                  </div>
                  <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                    <div className="text-lg font-bold text-foreground">{stats.cleanedCharacters}</div>
                    <div className="text-xs text-muted-foreground">Cleaned Characters</div>
                  </div>
                  <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
                    <div className="text-lg font-bold text-foreground">
                      {result.isPalindrome ? <Check className="inline text-green-500" size={20} /> : <X className="inline text-red-500" size={20} />}
                    </div>
                    <div className="text-xs text-muted-foreground">Palindrome Status</div>
                  </div>
                  <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
                    <div className="text-lg font-bold text-foreground">{stats.processingTime}ms</div>
                    <div className="text-xs text-muted-foreground">Processing Time</div>
                  </div>
                </div>
              )}

              {/* Checking Options */}
              <div className="mt-6 pt-6 border-t border-border">
                <h4 className="text-sm font-medium text-foreground mb-3">Checking Options</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <label className="flex items-center gap-2 text-sm text-foreground p-3 bg-secondary/50 rounded-lg">
                    <input
                      type="checkbox"
                      checked={ignoreCase}
                      onChange={(e) => setIgnoreCase(e.target.checked)}
                      className="w-4 h-4 text-accent bg-input border-border rounded focus:ring-accent focus:ring-2"
                    />
                    <div>
                      <div className="font-medium">Ignore case</div>
                      <div className="text-xs text-muted-foreground">Treat uppercase/lowercase as same</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-2 text-sm text-foreground p-3 bg-secondary/50 rounded-lg">
                    <input
                      type="checkbox"
                      checked={ignoreSpaces}
                      onChange={(e) => setIgnoreSpaces(e.target.checked)}
                      className="w-4 h-4 text-accent bg-input border-border rounded focus:ring-accent focus:ring-2"
                    />
                    <div>
                      <div className="font-medium">Ignore spaces</div>
                      <div className="text-xs text-muted-foreground">Remove all spaces</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-2 text-sm text-foreground p-3 bg-secondary/50 rounded-lg">
                    <input
                      type="checkbox"
                      checked={ignorePunctuation}
                      onChange={(e) => setIgnorePunctuation(e.target.checked)}
                      className="w-4 h-4 text-accent bg-input border-border rounded focus:ring-accent focus:ring-2"
                    />
                    <div>
                      <div className="font-medium">Ignore punctuation</div>
                      <div className="text-xs text-muted-foreground">Remove punctuation marks</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Examples Section */}
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-foreground">Palindrome Examples</h4>
                  <div className="text-xs text-muted-foreground">Click to test</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {palindromeExamples.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => loadExample(example)}
                      className="text-left p-3 bg-accent/10 rounded-lg border border-accent/20 hover:bg-accent/20 transition-colors group"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full flex-shrink-0"></div>
                        <span className="text-xs text-foreground break-words group-hover:text-accent transition-colors">{example}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  onClick={checkPalindrome}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent text-accent-foreground rounded-lg sm:rounded-xl hover:bg-accent/80 transition-colors text-sm sm:text-base"
                >
                  <CheckCircle size={16} className="sm:w-4 sm:h-4" />
                  Check Palindrome
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
                  disabled={!result}
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

            {/* SEO Content Section with Dropdowns */}
            <section className="space-y-4">
              {/* What This Tool Does - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('whatItDoes')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                  aria-expanded={openSections.whatItDoes}
                >
                  <h2 className="text-xl font-bold text-foreground">What This Palindrome Checker Tool Does</h2>
                  {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.whatItDoes && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      This free online palindrome checker determines whether any text—including words, phrases, or complete sentences—reads the same forwards and backwards. By applying sophisticated text cleaning algorithms, the tool can identify palindromes in natural language that include spaces, punctuation, and mixed capitalization.
                    </p>
                    <p className="text-muted-foreground">
                      Unlike basic palindrome detectors that only work with single words, this tool offers customizable checking options that let you control how strictly it evaluates text. Whether you're testing famous palindrome phrases like "A man a plan a canal Panama" or checking your own creative expressions, this palindrome checker provides instant analysis with detailed results showing both the cleaned text and reversed version for verification.
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
                  <h2 className="text-xl font-bold text-foreground">Practical Use Cases for Palindrome Checking</h2>
                  {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.useCases && (
                  <div className="px-6 pb-6">
                    <ul className="space-y-3 text-muted-foreground pl-5">
                      <li className="pl-2">
                        <strong className="text-foreground">Programming Education</strong>
                        <p className="mt-1">Teaching string manipulation, array methods, and algorithm development in coding classes. Palindromes are classic examples for demonstrating text reversal and comparison techniques.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Software Development</strong>
                        <p className="mt-1">Testing input validation functions and implementing palindrome detection in applications. Developers use palindrome algorithms for data validation and string manipulation exercises.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Technical Interviews</strong>
                        <p className="mt-1">Preparing for common coding interview questions involving string reversal algorithms. Palindrome checking is a frequent technical interview challenge.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Language Learning</strong>
                        <p className="mt-1">Exploring linguistic patterns, symmetry in language, and wordplay in different languages. Palindromes help understand language structure and phonetic patterns.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Puzzle Creation</strong>
                        <p className="mt-1">Developing brain teasers, word games, and recreational mathematics challenges. Palindrome puzzles are popular in puzzle books and educational materials.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Content Verification</strong>
                        <p className="mt-1">Checking product codes, license plates, or identification numbers that follow palindrome patterns. Some systems use palindromic sequences for error checking.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Creative Writing</strong>
                        <p className="mt-1">Crafting palindrome poetry, symmetrical phrases, or unique artistic expressions. Writers use palindromes to create clever and memorable text.</p>
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
                  <h2 className="text-xl font-bold text-foreground">How to Use This Palindrome Checker Effectively</h2>
                  {openSections.howToUse ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.howToUse && (
                  <div className="px-6 pb-6">
                    <ol className="space-y-4 text-muted-foreground pl-5">
                      <li className="pl-2">
                        <strong className="text-foreground">Prepare Your Text</strong>
                        <p className="mt-1">Type or paste any word, phrase, or sentence into the main text input area. The tool works with any language that uses alphabetic characters.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Adjust Checking Options</strong>
                        <p className="mt-1">Select which elements to ignore: case (uppercase/lowercase), spaces, and punctuation. For natural language phrases, enabling all three options typically yields the best results.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Review Automatic Results</strong>
                        <p className="mt-1">As you type, the tool automatically checks if your text is a palindrome. Results appear instantly with clear visual indicators (green for palindrome, red for non-palindrome).</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Examine Detailed Analysis</strong>
                        <p className="mt-1">View the cleaned text (after applying your selected options) and the reversed version to understand exactly how the palindrome checking was performed.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Save or Share Results</strong>
                        <p className="mt-1">Use the "Copy Result" button to save the detailed analysis to your clipboard for documentation, sharing, or further examination.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Try Example Palindromes</strong>
                        <p className="mt-1">Click on example palindromes to test the tool with known working examples and understand how different options affect the results.</p>
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
                  <h2 className="text-xl font-bold text-foreground">Palindrome Examples and Analysis</h2>
                  {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.examples && (
                  <div className="px-6 pb-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 1: Classic Palindrome Phrase</h3>
                        <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                          <pre className="text-sm text-muted-foreground font-mono">
{`Input: "A man a plan a canal Panama"
Options: All three enabled (ignore case, spaces, punctuation)

Processing Steps:
1. Convert to lowercase: "a man a plan a canal panama"
2. Remove spaces: "amanaplanacanalpanama"
3. Remove punctuation: "amanaplanacanalpanama" (none present)
4. Reverse: "amanaplanacanalpanama"
5. Compare: Original == Reversed? YES

Result: Palindrome detected!
Cleaned text: amanaplanacanalpanama
Reversed text: amanaplanacanalpanama`}
                          </pre>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 2: Word with Case Sensitivity</h3>
                        <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                          <pre className="text-sm text-muted-foreground font-mono">
{`Input: "Racecar"
Options: Ignore case disabled, other options enabled

Processing Steps:
1. Keep original case: "Racecar" (no change)
2. Remove spaces: "Racecar" (none present)
3. Remove punctuation: "Racecar" (none present)
4. Reverse: "racecaR"
5. Compare: "Racecar" == "racecaR"? NO (case matters!)

Result: Not a palindrome (when case sensitivity is enabled)
Cleaned text: Racecar
Reversed text: racecaR

Note: With "ignore case" enabled, this would be detected as a palindrome.`}
                          </pre>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 3: Numeric Palindrome</h3>
                        <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                          <pre className="text-sm text-muted-foreground font-mono">
{`Input: "12321"
Options: All three enabled (punctuation irrelevant for numbers)

Processing Steps:
1. Convert to lowercase: "12321" (no letters to convert)
2. Remove spaces: "12321" (none present)
3. Remove punctuation: "12321" (none present)
4. Reverse: "12321"
5. Compare: Original == Reversed? YES

Result: Palindrome detected!
Cleaned text: 12321
Reversed text: 12321

Note: The tool works with any character sequence, including numbers.`}
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
                  <h2 className="text-xl font-bold text-foreground">Frequently Asked Questions About Palindromes</h2>
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
                        This palindrome checker is implemented using React with TypeScript and uses efficient string manipulation algorithms. The core palindrome detection uses the split().reverse().join() method chain, which provides O(n) time complexity where n is the length of the cleaned text string. The tool handles Unicode characters and works with any language that uses the Latin alphabet. All text processing occurs client-side in your browser, ensuring privacy as no text is transmitted to external servers.
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

export default PalindromeChecker;