'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, RotateCcw, Search, Replace, ChevronDown, ChevronUp, Check, X, ArrowRightLeft } from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';

const FindReplace = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [replaceAll, setReplaceAll] = useState(true);
  const [wholeWord, setWholeWord] = useState(false);
  const [matchCount, setMatchCount] = useState(0);
  const [replaceCount, setReplaceCount] = useState(0);

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

  // FAQ Data
  const faqData = [
    {
      question: "What's the difference between case-sensitive and case-insensitive find & replace?",
      answer: "Case-sensitive find & replace matches exact letter cases: 'Hello' won't match 'hello'. Case-insensitive matches regardless of case: 'Hello', 'HELLO', and 'hello' all match. Use case-sensitive for precise replacements like proper nouns or code. Use case-insensitive for general text where case doesn't matter. Our tool shows you the match count for both modes to help you choose the right option."
    },
    {
      question: "What does 'Whole Word' option do?",
      answer: "The 'Whole Word' option ensures that only complete words are matched. For example, finding 'cat' with whole word enabled won't match 'catalog' or 'location' - only the word 'cat' by itself. This prevents accidental partial matches. Without this option, 'cat' would match any occurrence including 'catalog' and 'location'. Use whole word matching when you want to replace specific terms without affecting similar words."
    },
    {
      question: "Can I use regular expressions (regex) with this find & replace tool?",
      answer: "Our basic find & replace tool doesn't support full regex patterns, but it handles escaped characters and basic patterns. For advanced regex operations, consider using a specialized regex tool. However, you can use it for simple patterns like finding multiple spaces, common punctuation, or basic word patterns. The tool automatically escapes special regex characters to prevent errors."
    },
    {
      question: "What happens if I leave the 'Replace with' field empty?",
      answer: "If you leave the 'Replace with' field empty, the tool will remove all matches of the 'Find' text. This is useful for deleting unwanted text, extra spaces, or specific patterns. For example, find '  ' (double spaces) and replace with '' (empty) to remove extra spaces. The tool shows you how many occurrences will be removed before you apply the change."
    },
    {
      question: "How does the tool handle large text documents?",
      answer: "Our find & replace tool can handle large text documents efficiently in your browser. There's no strict size limit, but extremely large documents (10MB+) may slow down processing. The tool works entirely client-side - your data never leaves your computer, ensuring privacy. For massive documents, consider processing in sections or using specialized desktop software for better performance."
    }
  ];

  const performFindReplace = () => {
    if (!inputText || !findText) {
      setOutputText(inputText);
      setMatchCount(0);
      setReplaceCount(0);
      return;
    }

    let regexPattern = findText;
    
    // Escape special regex characters unless user wants regex
    regexPattern = regexPattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Add word boundaries if whole word is selected
    if (wholeWord) {
      regexPattern = `\\b${regexPattern}\\b`;
    }
    
    const flags = caseSensitive ? 'g' : 'gi';
    const regex = new RegExp(regexPattern, replaceAll ? flags : flags.replace('g', ''));
    
    // Count matches
    const matches = inputText.match(new RegExp(regexPattern, 'gi'));
    setMatchCount(matches ? matches.length : 0);
    
    // Perform replacement
    const result = inputText.replace(regex, replaceText);
    setOutputText(result);
    
    // Count replacements (approximate)
    const originalMatches = inputText.match(regex) || [];
    const newMatches = result.match(regex) || [];
    setReplaceCount(originalMatches.length - newMatches.length);
  };

  useEffect(() => {
    if (inputText && findText) {
      const timer = setTimeout(() => {
        performFindReplace();
      }, 300); // Debounce for performance
      
      return () => clearTimeout(timer);
    } else {
      setOutputText(inputText);
      setMatchCount(0);
      setReplaceCount(0);
    }
  }, [inputText, findText, replaceText, caseSensitive, replaceAll, wholeWord]);

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setFindText('');
    setReplaceText('');
    setMatchCount(0);
    setReplaceCount(0);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const loadExample = () => {
    const example = `Hello world! Welcome to the world of text processing.
This world has many tools for world transformation.
In this world, you can find and replace text easily.`;
    setInputText(example);
    setFindText('world');
    setReplaceText('universe');
  };

  const swapTexts = () => {
    setInputText(outputText);
    setOutputText('');
    setFindText('');
    setReplaceText('');
    setMatchCount(0);
    setReplaceCount(0);
  };

  return (
    <>
      <Head>
        <title>Find & Replace Tool | Free Online Text Search and Replace - GrockTool.com</title>
        <meta name="description" content="Free online find and replace tool to search and replace text patterns with advanced options like case sensitivity, whole word matching, and real-time preview." />
        <meta name="keywords" content="find and replace tool, text search and replace, replace text online, search replace tool, text finder, text replacer, string replacement, text editor tool, content editing" />
        <meta property="og:title" content="Find & Replace Tool | Free Online Text Search and Replace - GrockTool.com" />
        <meta property="og:description" content="Search and replace text patterns instantly with our free online find & replace tool. Advanced options include case sensitivity, whole word matching, and replace all occurrences." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Find & Replace Tool - GrockTool.com" />
        <meta name="twitter:description" content="Free online tool to find and replace text patterns with advanced search options and real-time processing." />
        <link rel="canonical" href="https://grocktool.com/text-tools/find-replace" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Find & Replace Tool",
            "applicationCategory": "TextEditingApplication",
            "operatingSystem": "Any",
            "description": "Free online find and replace tool to search and replace text patterns with advanced options and real-time preview",
            "url": "https://grocktool.com/text-tools/find-replace",
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
              "Real-time text search",
              "Advanced replace functionality",
              "Case-sensitive option",
              "Whole word matching",
              "Replace all occurrences",
              "Match counting",
              "Preview before applying"
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
                  Find & Replace Tool
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Find and replace text patterns in your content with advanced options
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
                    placeholder="Enter your text here..."
                    className="w-full min-h-[250px] p-4 bg-input border border-border rounded-lg sm:rounded-xl focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-ring focus:ring-opacity-50 resize-none text-foreground placeholder-muted-foreground"
                  />
                </div>

                {/* Output Section */}
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-foreground">
                    Result Text
                  </label>
                  <textarea
                    value={outputText}
                    readOnly
                    placeholder="Modified text will appear here..."
                    className="w-full min-h-[250px] p-4 bg-muted border border-border rounded-lg sm:rounded-xl focus:outline-none resize-none text-foreground placeholder-muted-foreground"
                  />
                </div>
              </div>

              {/* Find & Replace Inputs */}
              <div className="mt-6 pt-6 border-t border-border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-2">
                      <Search size={16} className="text-blue-500" />
                      <label className="block text-sm font-medium text-foreground">
                        Find
                      </label>
                    </div>
                    <input
                      type="text"
                      value={findText}
                      onChange={(e) => setFindText(e.target.value)}
                      placeholder="Text to find..."
                      className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground placeholder-muted-foreground"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-2">
                      <Replace size={16} className="text-green-500" />
                      <label className="block text-sm font-medium text-foreground">
                        Replace with
                      </label>
                    </div>
                    <input
                      type="text"
                      value={replaceText}
                      onChange={(e) => setReplaceText(e.target.value)}
                      placeholder="Replacement text..."
                      className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground placeholder-muted-foreground"
                    />
                  </div>
                </div>

                {/* Options & Stats */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div className="flex flex-wrap items-center gap-4">
                    <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={caseSensitive}
                        onChange={(e) => setCaseSensitive(e.target.checked)}
                        className="w-4 h-4 text-accent bg-input border-border rounded focus:ring-accent focus:ring-2"
                      />
                      <span className="group-hover:text-accent transition-colors">Case sensitive</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={replaceAll}
                        onChange={(e) => setReplaceAll(e.target.checked)}
                        className="w-4 h-4 text-accent bg-input border-border rounded focus:ring-accent focus:ring-2"
                      />
                      <span className="group-hover:text-accent transition-colors">Replace all</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={wholeWord}
                        onChange={(e) => setWholeWord(e.target.checked)}
                        className="w-4 h-4 text-accent bg-input border-border rounded focus:ring-accent focus:ring-2"
                      />
                      <span className="group-hover:text-accent transition-colors">Whole word</span>
                    </label>
                  </div>
                  
                  {/* Stats */}
                  <div className="flex items-center gap-4">
                    {matchCount > 0 && (
                      <>
                        <div className="text-sm">
                          <span className="text-foreground font-medium">{matchCount}</span>
                          <span className="text-muted-foreground ml-1">match{matchCount !== 1 ? 'es' : ''} found</span>
                        </div>
                        {replaceCount > 0 && (
                          <div className="text-sm">
                            <span className="text-green-600 font-medium">{replaceCount}</span>
                            <span className="text-muted-foreground ml-1">replaced</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  onClick={performFindReplace}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent text-accent-foreground rounded-lg sm:rounded-xl hover:bg-accent/80 transition-colors text-sm sm:text-base"
                >
                  <Replace size={16} className="sm:w-4 sm:h-4" />
                  Find & Replace
                </button>
                <button
                  onClick={handleClear}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg sm:rounded-xl hover:bg-secondary/80 transition-colors text-sm sm:text-base"
                >
                  <RotateCcw size={16} className="sm:w-4 sm:h-4" />
                  Clear All
                </button>
                <button
                  onClick={swapTexts}
                  disabled={!outputText}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg sm:rounded-xl hover:bg-secondary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  <ArrowRightLeft size={16} className="sm:w-4 sm:h-4" />
                  Use as Input
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
                  Find and replace text patterns in your content with real-time processing and advanced options.
                </p>
                <div className="text-xs sm:text-sm space-y-1 pt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Enter your text in the input area</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Specify what text you want to find in the "Find" field</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Enter the replacement text in the "Replace with" field (leave empty to remove)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Use options for case sensitivity and replace all occurrences</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>The tool processes automatically as you type</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Copy the result or use it as needed</span>
                  </div>
                </div>
                <div className="text-xs sm:text-sm space-y-2 pt-3">
                  <div className="font-medium text-foreground">Features:</div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-accent rounded-full"></div>
                    <span><strong>Real-time processing:</strong> See results instantly as you type</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-accent rounded-full"></div>
                    <span><strong>Case sensitivity:</strong> Choose whether to match case exactly</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-accent rounded-full"></div>
                    <span><strong>Replace all:</strong> Replace all occurrences or just the first one</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-accent rounded-full"></div>
                    <span><strong>Match counter:</strong> See how many matches were found</span>
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
                  <h2 className="text-xl font-bold text-foreground">Find & Replace Tool - What It Does</h2>
                  {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.whatItDoes && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      This free online find and replace tool provides powerful text search and replacement capabilities with real-time processing and advanced options. The tool allows you to search for specific text patterns and replace them with new content, offering features like case-sensitive matching, whole word searches, and the option to replace all occurrences or just the first match. It processes text instantly as you type, showing you exactly how many matches were found and replaced.
                    </p>
                    <p className="text-muted-foreground">
                      Perfect for editing documents, cleaning data, standardizing content, and making bulk text changes, this tool handles everything from simple word replacements to complex pattern matching. Whether you're updating product names in a catalog, standardizing terminology across documents, or cleaning up formatting issues, this find & replace tool delivers precise, efficient text transformation with complete control over the replacement process.
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
                  <h2 className="text-xl font-bold text-foreground">Practical Use Cases for Find & Replace</h2>
                  {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.useCases && (
                  <div className="px-6 pb-6">
                    <ul className="space-y-3 text-muted-foreground pl-5">
                      <li className="pl-2">
                        <strong className="text-foreground">Content Migration & Updates</strong>
                        <p className="mt-1">Update old company names, product names, or terminology when migrating websites, updating documentation, or rebranding content across multiple documents.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Data Cleaning & Standardization</strong>
                        <p className="mt-1">Clean imported data by standardizing date formats, phone numbers, addresses, or other data fields that have inconsistent formatting or typos.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Code Refactoring</strong>
                        <p className="mt-1">Rename variables, functions, or classes across codebases, update API endpoints, or change library imports when refactoring or updating software projects.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Document Formatting Cleanup</strong>
                        <p className="mt-1">Remove extra spaces, fix inconsistent punctuation, replace straight quotes with curly quotes, or standardize bullet point formatting across documents.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Localization & Translation Preparation</strong>
                        <p className="mt-1">Prepare content for translation by marking text for localization, replacing placeholders, or standardizing terminology before sending to translation services.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Academic & Research Paper Editing</strong>
                        <p className="mt-1">Standardize citation formats, update terminology, fix consistent spelling errors, or prepare manuscripts for different publication style guidelines.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">SEO & Content Optimization</strong>
                        <p className="mt-1">Update outdated keywords, add new target keywords, optimize meta descriptions, or improve internal linking across website content for better search rankings.</p>
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
                  <h2 className="text-xl font-bold text-foreground">How to Use Find & Replace Effectively</h2>
                  {openSections.howToUse ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.howToUse && (
                  <div className="px-6 pb-6">
                    <ol className="space-y-4 text-muted-foreground pl-5">
                      <li className="pl-2">
                        <strong className="text-foreground">Prepare Your Text</strong>
                        <p className="mt-1">Paste or type the text you want to modify. The tool handles single lines, multi-line content, paragraphs, and documents of various sizes.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Define Search Pattern</strong>
                        <p className="mt-1">Enter the exact text you want to find. Be specific to avoid unintended matches. Use the match counter to verify you're finding the right text.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Configure Search Options</strong>
                        <p className="mt-1">Choose between case-sensitive or case-insensitive search. Enable "Whole Word" to avoid partial matches. Select "Replace All" for bulk changes.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Specify Replacement</strong>
                        <p className="mt-1">Enter the replacement text. Leave empty to remove the found text. Preview the changes in real-time before applying them.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Review Results</strong>
                        <p className="mt-1">Check the output carefully. Use "Use as Input" to apply additional replacements or make further modifications to the processed text.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Export or Continue</strong>
                        <p className="mt-1">Copy the final result to your clipboard, or continue making additional find & replace operations for complex text transformations.</p>
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
                  <h2 className="text-xl font-bold text-foreground">Find & Replace Examples & Best Practices</h2>
                  {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.examples && (
                  <div className="px-6 pb-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 1: Simple Word Replacement</h3>
                        <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                          <pre className="text-sm text-muted-foreground font-mono">
{`Input Text:
"The quick brown fox jumps over the lazy dog.
The dog was very lazy indeed.
Everyone knows about the lazy dog."

Find: "dog"
Replace with: "cat"
Options: Replace All: ON, Case Sensitive: OFF, Whole Word: OFF

Result:
"The quick brown fox jumps over the lazy cat.
The cat was very lazy indeed.
Everyone knows about the lazy cat."

Matches Found: 3
Replacements Made: 3

Analysis:
• Simple word replacement
• Case-insensitive matching
• All occurrences replaced
• Basic text transformation`}
                          </pre>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 2: Advanced Pattern Replacement with Options</h3>
                        <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                          <pre className="text-sm text-muted-foreground font-mono">
{`Input Text:
"Contact us at support@example.com
For sales: sales@example.com
Customer service: help@example.com"

Find: "example.com"
Replace with: "mycompany.com"
Options: Replace All: ON, Case Sensitive: ON, Whole Word: OFF

Result:
"Contact us at support@mycompany.com
For sales: sales@mycompany.com
Customer service: help@mycompany.com"

Matches Found: 3
Replacements Made: 3

Application:
• Updating domain names
• Changing contact information
• Bulk email address updates
• Maintaining case sensitivity for proper email formatting`}
                          </pre>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 3: Formatting Cleanup with Empty Replacement</h3>
                        <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                          <pre className="text-sm text-muted-foreground font-mono">
{`Input Text:
"This  text   has  extra  spaces   that need  cleaning.
Also  remove  double  periods.. and  triple  spaces."

Find: "  " (double space)
Replace with: " " (single space)
Options: Replace All: ON

Intermediate Result:
"This text has extra spaces that need cleaning.
Also remove double periods.. and triple spaces."

Find: "   " (triple space)
Replace with: " " (single space)
Options: Replace All: ON

Find: ".." (double period)
Replace with: "." (single period)
Options: Replace All: ON

Final Result:
"This text has extra spaces that need cleaning.
Also remove double periods. and triple spaces."

Application:
• Cleaning up formatting issues
• Removing extra whitespace
• Fixing punctuation errors
• Preparing text for publication`}
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
                >
                  <h2 className="text-xl font-bold text-foreground">Related Text & Editing Tools</h2>
                  {openSections.relatedTools ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.relatedTools && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Explore other useful text and editing tools from GrockTool.com:
                    </p>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        <Link href="/text-tools/word-counter" className="text-accent hover:underline">
                          <strong>Word Counter:</strong> Count characters, words, sentences, and paragraphs
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        <Link href="/text-tools/remove-duplicates" className="text-accent hover:underline">
                          <strong>Remove Duplicates:</strong> Remove duplicate lines from text
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        <Link href="/text-tools/text-sorter" className="text-accent hover:underline">
                          <strong>Text Sorter:</strong> Sort lines of text alphabetically
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        <Link href="/text-tools/case-converter" className="text-accent hover:underline">
                          <strong>Case Converter:</strong> Convert text between different cases
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        <Link href="/text-tools/remove-special-chars" className="text-accent hover:underline">
                          <strong>Remove Special Characters:</strong> Clean text by removing special symbols
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        <Link href="/text-tools/text-limiter" className="text-accent hover:underline">
                          <strong>Text Limiter:</strong> Truncate text to specific lengths
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </article>

              {/* Frequently Asked Questions - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('faqs')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h2 className="text-xl font-bold text-foreground">Frequently Asked Questions About Find & Replace</h2>
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
                    
                    {/* Professional Disclaimer */}
                    <div className="mt-8 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                      <h3 className="text-lg font-semibold text-foreground mb-2">Text Editing Disclaimer</h3>
                      <p className="text-sm text-muted-foreground">
                        This find & replace tool provides basic text search and replacement functionality. For complex pattern matching, regular expressions, or advanced text processing, consider using specialized software or programming tools. Always review replaced text carefully, especially when making bulk changes to important documents. The tool is designed for productivity and convenience but should be used as part of a comprehensive text editing and verification process.
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

export default FindReplace;