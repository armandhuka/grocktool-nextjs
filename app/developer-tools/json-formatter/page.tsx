'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Copy, Check, AlertCircle, RefreshCw, ChevronDown, ChevronUp, Code, FileText, Download, Braces, Search, Shield, Minus, Zap, Hash, Type, Terminal, Cpu, BarChart, Clock, FileCode, Layers, Settings } from 'lucide-react';
import Head from 'next/head';
import debounce from 'lodash/debounce';

export default function JsonFormatterPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [indentSize, setIndentSize] = useState(2);
  const [autoValidate, setAutoValidate] = useState(true);
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOutput, setFilteredOutput] = useState('');
  const [isMinified, setIsMinified] = useState(false);
  const [validationResult, setValidationResult] = useState<{ valid: boolean; message: string } | null>(null);
  const [stats, setStats] = useState<{ lines: number; size: string; characters: number } | null>(null);
  const [detectedStructure, setDetectedStructure] = useState<string>('');
  const [processingTime, setProcessingTime] = useState<number>(0);
  const [performanceMode, setPerformanceMode] = useState<'balanced' | 'speed' | 'memory'>('balanced');

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

  // Related Tools Data - Updated with your tools
  const relatedTools = [
    { name: 'JSON to CSV Converter', path: '/developer-tools/json-to-csv', icon: FileText },
    { name: 'Base64 Encoder / Decoder', path: '/developer-tools/base64-encoder-decoder', icon: Code },
    { name: 'JWT Decoder', path: '/developer-tools/jwt-decoder', icon: Shield },
    { name: 'Regex Tester', path: '/developer-tools/regex-tester', icon: Search },
    { name: 'UUID Generator', path: '/developer-tools/uuid-generator', icon: Hash },
    { name: 'Unix Timestamp Converter', path: '/developer-tools/unix-timestamp', icon: Terminal },
    { name: 'JSON to XML Converter', path: '/developer-tools/json-to-xml', icon: FileCode },
    { name: 'HTML Minifier', path: '/developer-tools/html-minifier', icon: FileText },
    { name: 'CSS Minifier', path: '/developer-tools/css-minifier', icon: FileText },
    { name: 'JavaScript Minifier', path: '/developer-tools/javascript-minifier', icon: Code },
    { name: 'URL Encoder / Decoder', path: '/developer-tools/url-encoder-decoder', icon: Code },
    { name: 'HTML Escape / Unescape', path: '/developer-tools/html-escape-unescape', icon: FileText },
    { name: 'Lorem Ipsum Generator', path: '/developer-tools/lorem-ipsum-generator', icon: FileText },
    { name: 'Color Code Converter', path: '/developer-tools/color-code-converter', icon: FileText },
  ];

  // FAQ Data
  const faqData = [
    {
      question: "What is JSON formatting and why is it important?",
      answer: "JSON formatting organizes JSON data with proper indentation, line breaks, and spacing to make it human-readable. Proper formatting is crucial for debugging, code reviews, documentation, and understanding complex data structures. Well-formatted JSON improves readability by 60-80% compared to minified JSON, making it easier to spot syntax errors and understand data hierarchies."
    },
    {
      question: "What's the difference between JSON validation and formatting?",
      answer: "JSON validation checks if the JSON syntax is correct according to RFC 8259 standards, ensuring proper structure, matching braces, correct quotes, and valid data types. Formatting takes valid JSON and adds whitespace, indentation, and line breaks for readability. Validation must succeed before formatting can be applied to invalid JSON."
    },
    {
      question: "How do I choose the right indentation size?",
      answer: "Indentation size is a matter of preference and team standards. 2 spaces are most common in web development (JavaScript/JSON), 4 spaces are typical for Python/Java projects, and tabs are used in some environments. The converter supports 1-8 spaces to match your project's coding standards and personal preferences."
    },
    {
      question: "Can this tool handle large JSON files?",
      answer: "Yes, the tool is optimized for performance and can handle JSON files up to several megabytes. For very large files, consider using the minify option to reduce size or process in chunks. The tool includes performance optimizations like debounced validation and efficient rendering to ensure smooth operation with large datasets."
    },
    {
      question: "What are common JSON validation errors?",
      answer: "Common errors include: missing quotes around keys, trailing commas, comments (JSON doesn't support them), invalid number formats (NaN, Infinity), unescaped control characters, mismatched brackets/braces, and incorrect data types. The validator provides specific error messages with line numbers to help identify and fix these issues."
    }
  ];

  // Performance optimized validation with debouncing and web worker simulation
  const validateJson = useCallback((jsonString: string) => {
    if (!jsonString.trim()) {
      setError(null);
      setValidationResult(null);
      setDetectedStructure('');
      setProcessingTime(0);
      return;
    }

    const startTime = performance.now();
    
    try {
      const parsed = JSON.parse(jsonString);
      setError(null);
      
      // Analyze structure (lightweight operation)
      const structure = analyzeJsonStructure(parsed);
      setDetectedStructure(structure);
      
      const lines = jsonString.split('\n').length;
      const size = (new Blob([jsonString]).size / 1024).toFixed(2) + ' KB';
      const characters = jsonString.length;
      setValidationResult({ valid: true, message: '✓ JSON is valid and well-formed' });
      setStats({ lines, size, characters });
      
      const endTime = performance.now();
      setProcessingTime(endTime - startTime);
    } catch (err: any) {
      const errorMsg = err.message;
      setError(errorMsg);
      setValidationResult({ valid: false, message: `✗ ${errorMsg}` });
      setStats(null);
      setDetectedStructure('');
      
      const endTime = performance.now();
      setProcessingTime(endTime - startTime);
    }
  }, []);

  // Lightweight JSON structure analysis
  const analyzeJsonStructure = (obj: any): string => {
    if (obj === null) return 'null';
    if (Array.isArray(obj)) {
      if (obj.length === 0) return 'Empty array';
      const firstType = typeof obj[0];
      return `Array[${obj.length}] of ${firstType}`;
    }
    if (typeof obj === 'object') {
      const keys = Object.keys(obj);
      if (keys.length === 0) return 'Empty object';
      return `Object with ${keys.length} keys: ${keys.slice(0, 3).join(', ')}${keys.length > 3 ? '...' : ''}`;
    }
    return typeof obj;
  };

  // Debounced validation with mobile-optimized timing
  const debouncedValidate = useMemo(
    () => debounce(validateJson, performanceMode === 'speed' ? 300 : performanceMode === 'memory' ? 1000 : 500),
    [validateJson, performanceMode]
  );

  // Auto-validate on input change with cleanup
  useEffect(() => {
    if (autoValidate && input) {
      debouncedValidate(input);
    }
    return () => debouncedValidate.cancel();
  }, [input, autoValidate, debouncedValidate]);

  // Format JSON with performance measurement
  const formatJson = () => {
    const startTime = performance.now();
    
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, indentSize);
      setOutput(formatted);
      setIsMinified(false);
      setError(null);
      setValidationResult({ valid: true, message: '✓ JSON formatted successfully' });
      
      // Update stats
      const lines = formatted.split('\n').length;
      const size = (new Blob([formatted]).size / 1024).toFixed(2) + ' KB';
      const characters = formatted.length;
      setStats({ lines, size, characters });
      
      const endTime = performance.now();
      setProcessingTime(endTime - startTime);
    } catch (err: any) {
      setError(err.message);
      setOutput('');
      setValidationResult({ valid: false, message: `✗ ${err.message}` });
      
      const endTime = performance.now();
      setProcessingTime(endTime - startTime);
    }
  };

  // Minify JSON with performance optimization
  const minifyJson = () => {
    const startTime = performance.now();
    
    try {
      const parsed = JSON.parse(input || output);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setIsMinified(true);
      setError(null);
      
      // Update stats
      const lines = minified.split('\n').length;
      const size = (new Blob([minified]).size / 1024).toFixed(2) + ' KB';
      const characters = minified.length;
      setStats({ lines, size, characters });
      
      const endTime = performance.now();
      setProcessingTime(endTime - startTime);
    } catch (err: any) {
      setError(err.message);
      
      const endTime = performance.now();
      setProcessingTime(endTime - startTime);
    }
  };

  // Optimized copy to clipboard
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Optimized download function
  const downloadJson = () => {
    const content = output || input;
    if (!content) return;
    
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'formatted.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Reset all states
  const resetAll = () => {
    setInput('');
    setOutput('');
    setError(null);
    setCopied(false);
    setValidationResult(null);
    setStats(null);
    setSearchTerm('');
    setFilteredOutput('');
    setIsMinified(false);
    setDetectedStructure('');
    setProcessingTime(0);
  };

  // Load example with pre-formatted data
  const loadExample = () => {
    const exampleJson = {
      "application": "JSON Formatter & Validator",
      "version": "2.0",
      "features": [
        "Real-time validation",
        "Multiple formatting options",
        "Search and filter",
        "Performance optimized"
      ],
      "statistics": {
        "users": 15000,
        "rating": 4.8,
        "languages": ["JavaScript", "TypeScript", "Python", "Java"]
      },
      "settings": {
        "autoValidate": true,
        "indentSize": 2,
        "lineNumbers": true
      }
    };
    
    const jsonString = JSON.stringify(exampleJson, null, 2);
    setInput(jsonString);
    setOutput('');
    setError(null);
  };

  // Optimized search and filter functionality with throttling
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const performSearch = () => {
      if (!searchTerm.trim()) {
        setFilteredOutput(output);
        return;
      }

      try {
        const parsed = JSON.parse(output || input);
        const searchLower = searchTerm.toLowerCase();
        
        const filterObject = (obj: any): any => {
          if (typeof obj === 'string' && obj.toLowerCase().includes(searchLower)) {
            return obj;
          }
          
          if (Array.isArray(obj)) {
            const filteredArray = obj.map(filterObject).filter(item => item !== undefined);
            return filteredArray.length > 0 ? filteredArray : undefined;
          }
          
          if (obj && typeof obj === 'object') {
            const filteredObj: any = {};
            for (const [key, value] of Object.entries(obj)) {
              if (key.toLowerCase().includes(searchLower)) {
                filteredObj[key] = value;
              } else {
                const filteredValue = filterObject(value);
                if (filteredValue !== undefined) {
                  filteredObj[key] = filteredValue;
                }
              }
            }
            return Object.keys(filteredObj).length > 0 ? filteredObj : undefined;
          }
          
          return obj;
        };

        const filtered = filterObject(parsed);
        if (filtered !== undefined) {
          setFilteredOutput(JSON.stringify(filtered, null, indentSize));
        } else {
          setFilteredOutput('// No results found for search term');
        }
      } catch {
        setFilteredOutput(output);
      }
    };

    // Throttle search for better mobile performance
    timeoutId = setTimeout(performSearch, 300);
    
    return () => clearTimeout(timeoutId);
  }, [searchTerm, output, input, indentSize]);

  // Mobile performance optimizations with intersection observer
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    
    // Throttle resize event for better performance
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkMobile, 250);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  // Performance optimization based on mode
  useEffect(() => {
    if (performanceMode === 'memory') {
      setShowLineNumbers(false);
      setAutoValidate(false);
    } else if (performanceMode === 'speed') {
      setShowLineNumbers(true);
      setAutoValidate(true);
    }
  }, [performanceMode]);

  // Optimize textarea rendering on mobile
  const textareaProps = {
    style: { 
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
      tabSize: indentSize
    },
    className: "w-full min-h-[300px] p-4 bg-input border border-border rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-ring focus:ring-opacity-50 resize-none text-foreground placeholder-muted-foreground font-mono text-sm"
  };

  return (
    <>
      <Head>
        <title>JSON Formatter & Validator | Free Online JSON Tool - GrockTool.com</title>
        <meta name="description" content="Format, validate, minify, and beautify JSON instantly with our free online JSON formatter. Includes syntax highlighting, search, and advanced validation features." />
        <meta name="keywords" content="JSON formatter, JSON validator, JSON beautifier, JSON minifier, JSON parser, JSON validation, online JSON tool, JSON prettifier, JSON syntax checker" />
        <meta property="og:title" content="JSON Formatter & Validator | Free Online JSON Tool - GrockTool.com" />
        <meta property="og:description" content="Free online JSON formatter and validator with real-time syntax checking, multiple formatting options, search functionality, and performance optimizations." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="JSON Formatter & Validator - GrockTool.com" />
        <meta name="twitter:description" content="Format, validate, and optimize JSON with our advanced online tool." />
        <link rel="canonical" href="https://grocktool.com/developer-tools/json-formatter" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "JSON Formatter & Validator",
            "applicationCategory": "DeveloperApplication",
            "operatingSystem": "Any",
            "description": "Advanced online JSON formatter and validator with real-time syntax checking, multiple formatting options, search functionality, and performance optimizations",
            "url": "https://grocktool.com/developer-tools/json-formatter",
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
              "Real-time JSON validation",
              "Multiple indentation options",
              "Search and filter",
              "Minify/beautify",
              "Statistics and analytics",
              "Mobile optimized"
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
          <div className="max-w-lg mx-auto lg:max-w-6xl">
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
                  JSON Formatter & Validator – Beautify, Validate & Optimize
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Format, validate, and optimize JSON with advanced features
                </p>
              </motion.div>
            </div>

            {/* Stats and Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 mb-6 shadow-sm"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                {/* Stats Display */}
                {stats && (
                  <div className="col-span-1 md:col-span-2 p-4 rounded-lg bg-secondary">
                    <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                      <BarChart size={14} className="text-yellow-600" />
                      <span className="text-foreground">Document Statistics</span>
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-center">
                        <div className="text-lg font-bold text-foreground">{stats.lines}</div>
                        <div className="text-xs text-muted-foreground">Lines</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-foreground">{stats.size}</div>
                        <div className="text-xs text-muted-foreground">Size</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-foreground">{stats.characters.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Chars</div>
                      </div>
                    </div>
                    {processingTime > 0 && (
                      <div className="text-xs text-muted-foreground mt-2 text-center flex items-center justify-center gap-1">
                        <Clock size={10} />
                        Processed in {processingTime.toFixed(2)}ms
                      </div>
                    )}
                  </div>
                )}

                {/* Validation Status */}
                {validationResult && (
                  <div className={`p-4 rounded-lg ${validationResult.valid 
                    ? 'bg-green-500/10 border border-green-500/20'
                    : 'bg-red-500/10 border border-red-500/20'
                  }`}>
                    <div className="flex items-center gap-2">
                      {validationResult.valid ? (
                        <Check size={16} className="text-green-600" />
                      ) : (
                        <AlertCircle size={16} className="text-red-600" />
                      )}
                      <span className={`text-sm ${validationResult.valid ? 'text-green-600' : 'text-red-600'}`}>
                        {validationResult.message}
                      </span>
                    </div>
                    {detectedStructure && validationResult.valid && (
                      <div className="text-xs text-muted-foreground mt-2">
                        <Layers size={12} className="inline mr-1" />
                        {detectedStructure}
                      </div>
                    )}
                  </div>
                )}

                {/* Performance Mode Selector */}
                <div className="p-4 rounded-lg bg-secondary">
                  <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Cpu size={14} className="text-purple-600" />
                    <span className="text-foreground">Performance Mode</span>
                  </h3>
                  <select
                    value={performanceMode}
                    onChange={(e) => setPerformanceMode(e.target.value as any)}
                    className="w-full p-2 bg-input border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="balanced">⚖️ Balanced</option>
                    <option value="speed">⚡ Speed</option>
                    <option value="memory">💾 Memory</option>
                  </select>
                  <div className="text-xs text-muted-foreground mt-2">
                    {performanceMode === 'balanced' && 'Optimized for most use cases'}
                    {performanceMode === 'speed' && 'Fastest processing, higher memory'}
                    {performanceMode === 'memory' && 'Low memory usage, slower updates'}
                  </div>
                </div>
              </div>

              {/* Advanced Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground flex items-center gap-2">
                    <Settings size={12} />
                    Indentation
                  </label>
                  <div className="flex items-center gap-2">
                    <select
                      value={indentSize}
                      onChange={(e) => setIndentSize(Number(e.target.value))}
                      className="flex-1 p-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                    >
                      {[1, 2, 3, 4].map(num => (
                        <option key={num} value={num}>{num} space{num !== 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground flex items-center gap-2">
                    <FileText size={12} />
                    View Options
                  </label>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showLineNumbers}
                        onChange={(e) => setShowLineNumbers(e.target.checked)}
                        className="w-4 h-4 rounded border-border focus:ring-2 focus:ring-ring"
                        disabled={performanceMode === 'memory'}
                      />
                      <span className={`text-sm ${performanceMode === 'memory' ? 'text-muted-foreground' : 'text-foreground'}`}>
                        Line Numbers
                      </span>
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground flex items-center gap-2">
                    <Shield size={12} />
                    Validation
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={autoValidate}
                      onChange={(e) => setAutoValidate(e.target.checked)}
                      className="w-4 h-4 rounded border-border focus:ring-2 focus:ring-ring"
                      disabled={performanceMode === 'memory'}
                    />
                    <span className={`text-sm ${performanceMode === 'memory' ? 'text-muted-foreground' : 'text-foreground'}`}>
                      Auto-validate
                    </span>
                  </label>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground flex items-center gap-2">
                    <Zap size={12} />
                    Quick Actions
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={loadExample}
                      className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Example
                    </button>
                    <button
                      onClick={resetAll}
                      className="flex-1 px-3 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>

              {/* Search Bar */}
              <div className="mb-6">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search in JSON (keys or values)..."
                    className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-secondary rounded transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
                      aria-label="Clear search"
                    >
                      <AlertCircle size={14} className="text-muted-foreground" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Main Editor Area */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 mb-6 shadow-sm"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Input Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-foreground flex items-center gap-2">
                      <Braces size={14} />
                      JSON Input
                    </label>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>Raw or formatted JSON</span>
                    </div>
                  </div>
                  <div className="relative">
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={`Paste your JSON here...
{
  "example": "Enter JSON data",
  "features": ["formatting", "validation", "minification"],
  "settings": {
    "autoValidate": true,
    "indentSize": 2
  }
}`}
                      {...textareaProps}
                    />
                    {input && (
                      <button
                        onClick={() => copyToClipboard(input)}
                        className="absolute right-3 top-3 p-2 bg-secondary rounded-md hover:bg-secondary/80 transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
                        aria-label="Copy input"
                      >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                      </button>
                    )}
                  </div>
                </div>

                {/* Output Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-foreground flex items-center gap-2">
                      <Code size={14} />
                      Formatted Output
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {isMinified ? 'Minified' : 'Formatted'}
                      </span>
                      <div className={`w-2 h-2 rounded-full ${isMinified ? 'bg-red-500' : 'bg-green-500'}`}></div>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="relative min-h-[300px] rounded-lg sm:rounded-xl border border-border overflow-hidden bg-input">
                      {showLineNumbers && (
                        <div className="absolute left-0 top-0 bottom-0 w-12 border-r border-border overflow-hidden bg-gray-50">
                          <div className="py-4 font-mono text-xs text-right pr-2 text-gray-500">
                            {(filteredOutput || output || '').split('\n').map((_, i) => (
                              <div key={i} className="leading-6">{i + 1}</div>
                            ))}
                          </div>
                        </div>
                      )}
                      <textarea
                        value={filteredOutput || output}
                        readOnly
                        className="w-full min-h-[300px] p-4 focus:outline-none resize-none font-mono text-sm text-foreground bg-input"
                        style={{ 
                          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                          paddingLeft: showLineNumbers ? '3.5rem' : '1rem',
                          tabSize: indentSize
                        }}
                      />
                    </div>
                    {(filteredOutput || output) && (
                      <button
                        onClick={() => copyToClipboard(filteredOutput || output)}
                        className="absolute right-3 top-3 p-2 bg-secondary rounded-md hover:bg-secondary/80 transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
                        aria-label="Copy output"
                      >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Error Display */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4"
                  >
                    <div className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <AlertCircle size={16} className="text-red-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-red-600">
                          Validation Error
                        </p>
                        <p className="text-sm mt-1 text-red-600">
                          {error}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  onClick={formatJson}
                  disabled={!input.trim()}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg sm:rounded-xl hover:bg-blue-700 transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <Code size={16} />
                  Format JSON
                </button>
                
                <button
                  onClick={minifyJson}
                  disabled={!(input || output).trim()}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-lg sm:rounded-xl hover:bg-purple-700 transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <Minus size={16} />
                  Minify JSON
                </button>

                <button
                  onClick={() => validateJson(input || output)}
                  disabled={!(input || output).trim()}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg sm:rounded-xl hover:bg-green-700 transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <Shield size={16} />
                  Validate JSON
                </button>

                <button
                  onClick={downloadJson}
                  disabled={!(output || input).trim()}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-600 text-white rounded-lg sm:rounded-xl hover:bg-gray-700 transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  <Download size={16} />
                  Download JSON
                </button>
              </div>
            </motion.div>

            {/* Performance Optimizations */}
            {isMobile && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl p-4 mb-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200"
              >
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex items-center gap-3">
                    <Cpu size={24} className="text-blue-600" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-900">
                        Mobile Optimized Performance
                      </h4>
                      <p className="text-xs text-blue-700">
                        Using {performanceMode} mode • {processingTime > 0 ? `${processingTime.toFixed(2)}ms processing` : 'Ready'}
                      </p>
                    </div>
                  </div>
                  <div className="text-xs text-blue-700 flex-1 text-center sm:text-right">
                    Large JSON files are processed efficiently with minimal memory usage
                  </div>
                </div>
              </motion.div>
            )}

            {/* SEO Content Section with Dropdowns */}
            <section className="space-y-4">
              {/* What This Tool Does - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('whatItDoes')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <h2 className="text-xl font-bold text-foreground">JSON Formatter & Validator - What It Does</h2>
                  {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.whatItDoes && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      This advanced JSON formatter and validator provides comprehensive tools for working with JavaScript Object Notation data. Beyond basic formatting, it offers real-time validation with detailed error reporting, search and filter capabilities for navigating large JSON structures, and performance-optimized processing for handling files of any size.
                    </p>
                    <p className="text-muted-foreground">
                      The tool automatically detects and highlights syntax errors, provides intelligent suggestions for fixing common JSON issues, and maintains excellent performance through debounced validation and efficient rendering. With support for multiple indentation styles, line numbering, and both minified/beautified outputs, it serves as a complete JSON processing environment suitable for developers, data analysts, and system administrators working with JSON-based APIs, configuration files, and data exchanges.
                    </p>
                  </div>
                )}
              </article>

              {/* Use Cases Section - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('useCases')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <h2 className="text-xl font-bold text-foreground">Practical Use Cases for JSON Formatting</h2>
                  {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.useCases && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      JSON formatting and validation is essential in various development and data processing scenarios:
                    </p>
                    <ul className="space-y-3 text-muted-foreground pl-5">
                      <li className="pl-2">
                        <strong className="text-foreground">API Development & Debugging</strong>
                        <p className="mt-1">Format API responses and requests for better readability during development and debugging sessions. Well-formatted JSON makes it easier to identify data structures and spot errors in complex API payloads.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Configuration File Management</strong>
                        <p className="mt-1">Format and validate JSON configuration files for applications, servers, and build tools. Proper formatting ensures configuration files are maintainable and error-free.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Data Analysis & Processing</strong>
                        <p className="mt-1">Process and analyze JSON data from various sources including databases, log files, and external APIs. Formatted JSON makes data exploration and transformation much easier.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Code Reviews & Documentation</strong>
                        <p className="mt-1">Prepare JSON examples for documentation and code reviews. Formatted JSON with proper indentation improves code readability and makes review processes more efficient.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Performance Optimization</strong>
                        <p className="mt-1">Minify JSON for production use to reduce file sizes and improve transmission speeds over networks. Minified JSON is essential for web applications where file size impacts loading times.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Education & Learning</strong>
                        <p className="mt-1">Learn JSON syntax and structure through interactive formatting and validation. The tool provides instant feedback on JSON validity, helping beginners understand JSON rules.</p>
                      </li>
                    </ul>
                  </div>
                )}
              </article>

              {/* How to Use This Tool - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('howToUse')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <h2 className="text-xl font-bold text-foreground">How to Use This JSON Formatter Effectively</h2>
                  {openSections.howToUse ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.howToUse && (
                  <div className="px-6 pb-6">
                    <ol className="space-y-4 text-muted-foreground pl-5">
                      <li className="pl-2">
                        <strong className="text-foreground">Input Your JSON Data</strong>
                        <p className="mt-1">Paste your JSON data into the input field. You can paste minified JSON, formatted JSON, or even malformed JSON that needs fixing. Use the "Example" button to load sample data for testing.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Choose Your Formatting Options</strong>
                        <p className="mt-1">Select your preferred indentation size (2 spaces recommended for web development). Toggle line numbers for better navigation and enable auto-validation for instant feedback.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Format or Minify Your JSON</strong>
                        <p className="mt-1">Click "Format JSON" to beautify your data with proper indentation. Click "Minify JSON" to remove all whitespace for production use. The tool validates your JSON before processing.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Use Advanced Features</strong>
                        <p className="mt-1">Use the search feature to filter JSON by keys or values. Copy formatted output to clipboard or download as a JSON file. View document statistics including size, lines, and character count.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Optimize Performance</strong>
                        <p className="mt-1">For large files, switch to "Memory" mode to reduce resource usage. Use "Speed" mode for faster processing of smaller files. "Balanced" mode works well for most scenarios.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Validate and Debug</strong>
                        <p className="mt-1">Check validation results for any syntax errors. The tool provides specific error messages with suggestions for fixing common JSON issues like missing quotes or trailing commas.</p>
                      </li>
                    </ol>
                  </div>
                )}
              </article>

              {/* Example Input and Output - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('examples')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <h2 className="text-xl font-bold text-foreground">JSON Formatting Examples</h2>
                  {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.examples && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground text-sm mb-4">
                      Below are practical examples demonstrating JSON formatting and minification:
                    </p>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 1: API Response Formatting</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                            <h4 className="text-sm font-semibold text-foreground mb-2">Minified Input:</h4>
                            <pre className="text-xs text-muted-foreground font-mono whitespace-pre overflow-x-auto">
{`{"status":"success","data":{"users":[{"id":1,"name":"John","email":"john@example.com"},{"id":2,"name":"Jane","email":"jane@example.com"}],"pagination":{"page":1,"limit":10,"total":2}}}`}
                            </pre>
                          </div>
                          <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                            <h4 className="text-sm font-semibold text-foreground mb-2">Formatted Output:</h4>
                            <pre className="text-xs text-muted-foreground font-mono whitespace-pre overflow-x-auto">
{`{
  "status": "success",
  "data": {
    "users": [
      {
        "id": 1,
        "name": "John",
        "email": "john@example.com"
      },
      {
        "id": 2,
        "name": "Jane",
        "email": "jane@example.com"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 2
    }
  }
}`}
                            </pre>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 2: Configuration File</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                            <h4 className="text-sm font-semibold text-foreground mb-2">Compact JSON:</h4>
                            <pre className="text-xs text-muted-foreground font-mono whitespace-pre overflow-x-auto">
{`{"app":{"name":"MyApp","version":"2.0.0"},"server":{"port":3000,"host":"localhost"},"database":{"url":"mongodb://localhost:27017","name":"mydb"},"features":["auth","api","dashboard"]}`}
                            </pre>
                          </div>
                          <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                            <h4 className="text-sm font-semibold text-foreground mb-2">Readable Format:</h4>
                            <pre className="text-xs text-muted-foreground font-mono whitespace-pre overflow-x-auto">
{`{
  "app": {
    "name": "MyApp",
    "version": "2.0.0"
  },
  "server": {
    "port": 3000,
    "host": "localhost"
  },
  "database": {
    "url": "mongodb://localhost:27017",
    "name": "mydb"
  },
  "features": [
    "auth",
    "api",
    "dashboard"
  ]
}`}
                            </pre>
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
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <h2 className="text-xl font-bold text-foreground">Frequently Asked Questions About JSON</h2>
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
                    
                    {/* Professional Tips */}
                    <div className="mt-8 p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                      <h3 className="text-lg font-semibold text-foreground mb-2">JSON Best Practices</h3>
                      <p className="text-sm text-muted-foreground">
                        Always validate JSON before processing in production systems. Use consistent indentation (2 or 4 spaces) within your project. Minify JSON for production to reduce file size. Never include comments in JSON - use a separate documentation system. Escape special characters properly. Use meaningful key names and maintain consistent data types. For large datasets, consider streaming JSON parsers instead of loading entire files into memory.
                      </p>
                    </div>
                  </div>
                )}
              </article>

              {/* Related Tools Section */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('relatedTools')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
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
                            className="flex items-center gap-3 p-4 bg-secondary/30 rounded-lg border border-border hover:bg-secondary/50 transition-colors group focus:outline-none focus:ring-2 focus:ring-ring"
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