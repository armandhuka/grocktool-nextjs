'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, Calendar, Clock, RefreshCw, Check, ChevronDown, ChevronUp, CalendarDays, FileText, Shield, Key, Code, Zap } from 'lucide-react';
import Head from 'next/head';

export default function UnixTimestampConverterPage() {
  const [timestamp, setTimestamp] = useState('');
  const [dateResult, setDateResult] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [timestampResult, setTimestampResult] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [currentTimestamp, setCurrentTimestamp] = useState('');

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
    { name: 'Regex Tester', path: '/developer-tools/regex-tester', icon: Code },
    { name: 'UUID Generator', path: '/developer-tools/uuid-generator', icon: Zap },
  ];

  // Common timestamps
  const commonTimestamps = [
    { label: 'Now', value: () => Math.floor(Date.now() / 1000).toString() },
    { label: '1 hour ago', value: () => Math.floor((Date.now() - 3600000) / 1000).toString() },
    { label: 'Today at 00:00', value: () => {
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      return Math.floor(now.getTime() / 1000).toString();
    }},
    { label: 'Unix Epoch', value: '0' },
    { label: 'Year 2038 Problem', value: '2147483647' },
    { label: '1 Jan 2020', value: '1577836800' },
  ];

  // FAQ Data
  const faqData = [
    {
      question: "What is a Unix timestamp and how does it work?",
      answer: "A Unix timestamp (also called POSIX time or Epoch time) is a system for tracking time that counts the number of seconds elapsed since January 1, 1970, 00:00:00 UTC (the Unix epoch), excluding leap seconds. It's a standard way for computers to store and manipulate dates and times as a single integer, making time calculations and comparisons straightforward across different systems and timezones."
    },
    {
      question: "What's the difference between seconds and milliseconds in Unix timestamps?",
      answer: "Traditional Unix timestamps use seconds (10-digit numbers like 1672531200), while JavaScript and some other systems use milliseconds (13-digit numbers like 1672531200000). This converter works with seconds. To convert milliseconds to seconds, divide by 1000; to convert seconds to milliseconds, multiply by 1000. Always check which format your system expects."
    },
    {
      question: "What is the Year 2038 problem?",
      answer: "The Year 2038 problem occurs when 32-bit signed integer Unix timestamps overflow on January 19, 2038 at 03:14:07 UTC (maximum value: 2,147,483,647 seconds). After this, timestamps will wrap to negative numbers. Modern systems use 64-bit integers, avoiding this issue. This converter handles both 32-bit and 64-bit timestamps correctly."
    },
    {
      question: "How do timezones affect Unix timestamp conversion?",
      answer: "Unix timestamps are always UTC-based and timezone-agnostic—they represent the same moment in time worldwide. When converting to human-readable dates, the converter displays both UTC and local time representations. The timestamp itself doesn't change with timezones; only the displayed date/time changes based on the timezone setting."
    },
    {
      question: "Can I convert dates before 1970 or after 2038?",
      answer: "Yes, this converter handles dates before 1970 (negative timestamps) and well beyond 2038. Unix timestamps can represent dates from approximately 1901 to 2038 with 32-bit integers, and with 64-bit integers (used internally by JavaScript), dates from about 290,000 BC to 290,000 AD are supported."
    }
  ];

  // Initialize with current timestamp
  useEffect(() => {
    const now = Math.floor(Date.now() / 1000);
    setTimestamp(now.toString());
    setCurrentTimestamp(now.toString());
    
    // Update current timestamp every second
    const interval = setInterval(() => {
      const current = Math.floor(Date.now() / 1000);
      setCurrentTimestamp(current.toString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const convertToDate = () => {
    setError('');
    setDateResult('');
    setCopied(false);

    if (!timestamp.trim()) {
      setError('Please enter a Unix timestamp');
      return;
    }

    try {
      const ts = Number(timestamp);
      if (isNaN(ts)) throw new Error('Invalid timestamp: Must be a number');

      // Handle milliseconds input (13+ digits)
      const timestampSeconds = timestamp.length >= 13 ? Math.floor(ts / 1000) : ts;
      
      if (!isFinite(timestampSeconds)) throw new Error('Timestamp value is too large or invalid');

      const date = new Date(timestampSeconds * 1000);
      
      if (date.toString() === 'Invalid Date') throw new Error('Invalid date generated from timestamp');
      
      const utcString = date.toUTCString();
      const localString = date.toLocaleString();
      
      setDateResult(`UTC: ${utcString}\nLocal: ${localString}\nISO: ${date.toISOString()}`);
    } catch (err: any) {
      setError(err.message || 'Conversion failed. Please check your timestamp format.');
    }
  };

  const convertToTimestamp = () => {
    setError('');
    setTimestampResult('');
    setCopied(false);

    if (!dateInput.trim()) {
      setError('Please select or enter a date');
      return;
    }

    try {
      const date = new Date(dateInput);
      if (isNaN(date.getTime())) throw new Error('Invalid date format');

      const ts = Math.floor(date.getTime() / 1000);
      setTimestampResult(ts.toString());
    } catch (err: any) {
      setError(err.message || 'Conversion failed. Please check your date format.');
    }
  };

  const clearAll = () => {
    setTimestamp(currentTimestamp);
    setDateResult('');
    setDateInput('');
    setTimestampResult('');
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

  const handleTimestampChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimestamp(e.target.value);
    setError('');
  };

  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateInput(e.target.value);
    setError('');
  };

  const selectCommonTimestamp = (value: string | (() => string)) => {
    const timestampValue = typeof value === 'function' ? value() : value;
    setTimestamp(timestampValue);
    setError('');
  };

  const formatCurrentTimestamp = () => {
    const ts = parseInt(currentTimestamp);
    const date = new Date(ts * 1000);
    return date.toLocaleTimeString();
  };

  return (
    <>
      <Head>
        <title>Unix Timestamp Converter | Free Online Epoch Time Converter - GrockTool.com</title>
        <meta name="description" content="Convert Unix timestamps to human-readable dates and dates to Unix timestamps instantly. Supports UTC, local time, and ISO formats with real-time conversion." />
        <meta name="keywords" content="Unix timestamp converter, epoch time converter, timestamp to date, date to timestamp, Unix time converter, epoch converter, time conversion tool" />
        <meta property="og:title" content="Unix Timestamp Converter | Free Online Epoch Time Converter - GrockTool.com" />
        <meta property="og:description" content="Free online Unix timestamp converter tool to convert between epoch time and human-readable dates in multiple formats with instant results." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Unix Timestamp Converter - GrockTool.com" />
        <meta name="twitter:description" content="Free online Unix timestamp converter for developers and system administrators." />
        <link rel="canonical" href="https://grocktool.com/developer-tools/unix-timestamp" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Unix Timestamp Converter",
            "applicationCategory": "DeveloperApplication",
            "operatingSystem": "Any",
            "description": "Free online Unix timestamp converter tool to convert between epoch time and human-readable dates in UTC, local time, and ISO formats",
            "url": "https://grocktool.com/developer-tools/unix-timestamp",
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
              "Unix timestamp to date conversion",
              "Date to Unix timestamp conversion",
              "Multiple time formats (UTC, Local, ISO)",
              "Common timestamp presets",
              "Real-time current timestamp",
              "Clipboard copy functionality"
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
                  Unix Timestamp Converter – Fast, Accurate & Free
                </h1>
                <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock size={14} />
                    <span>Current timestamp: {currentTimestamp}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span>Current time: {formatCurrentTimestamp()}</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Main Tool Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 mb-6 shadow-sm"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column: Timestamp to Date */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                      <Clock size={18} />
                      Unix Timestamp → Date
                    </h2>
                    <div className="text-xs text-muted-foreground">Seconds since Jan 1, 1970</div>
                  </div>

                  {/* Common Timestamps */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Common Timestamps</label>
                    <div className="flex flex-wrap gap-2">
                      {commonTimestamps.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => selectCommonTimestamp(item.value)}
                          className="px-3 py-1.5 text-xs bg-secondary/30 hover:bg-secondary/50 text-foreground rounded-lg border border-border transition-colors"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Timestamp Input */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      Unix Timestamp (seconds)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={timestamp}
                        onChange={handleTimestampChange}
                        placeholder="Enter Unix timestamp"
                        className="w-full p-4 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-ring focus:ring-opacity-50 text-foreground placeholder-muted-foreground font-mono"
                      />
                      {timestamp && (
                        <button
                          onClick={() => copyToClipboard(timestamp)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 bg-secondary rounded-md hover:bg-secondary/80 transition-colors"
                        >
                          {copied ? <Check size={14} /> : <Copy size={14} />}
                        </button>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Enter timestamp in seconds (10 digits) or milliseconds (13 digits will be auto-converted)
                    </div>
                  </div>

                  {/* Convert Button */}
                  <button
                    onClick={convertToDate}
                    disabled={!timestamp.trim()}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Calendar size={16} />
                    Convert to Date
                  </button>

                  {/* Results */}
                  {dateResult && (
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium text-foreground">Converted Date</h3>
                      <div className="bg-muted rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="text-xs text-muted-foreground">Multiple formats:</div>
                          <button
                            onClick={() => copyToClipboard(dateResult)}
                            className="flex items-center gap-1 px-2 py-1 text-xs bg-secondary rounded hover:bg-secondary/80 transition-colors"
                          >
                            {copied ? <Check size={12} /> : <Copy size={12} />}
                            Copy All
                          </button>
                        </div>
                        <pre className="text-xs text-muted-foreground font-mono whitespace-pre-wrap">
                          {dateResult}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column: Date to Timestamp */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                      <CalendarDays size={18} />
                      Date → Unix Timestamp
                    </h2>
                    <div className="text-xs text-muted-foreground">Local timezone</div>
                  </div>

                  {/* Date Input */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      Select Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      value={dateInput}
                      onChange={handleDateInputChange}
                      className="w-full p-4 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-ring focus:ring-opacity-50 text-foreground"
                    />
                    <div className="text-xs text-muted-foreground">
                      Date will be converted to UTC timestamp
                    </div>
                  </div>

                  {/* Quick Date Buttons */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Quick Dates</label>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => {
                          const now = new Date();
                          setDateInput(now.toISOString().slice(0, 16));
                        }}
                        className="px-3 py-1.5 text-xs bg-secondary/30 hover:bg-secondary/50 text-foreground rounded-lg border border-border transition-colors"
                      >
                        Now
                      </button>
                      <button
                        onClick={() => {
                          const tomorrow = new Date();
                          tomorrow.setDate(tomorrow.getDate() + 1);
                          tomorrow.setHours(0, 0, 0, 0);
                          setDateInput(tomorrow.toISOString().slice(0, 16));
                        }}
                        className="px-3 py-1.5 text-xs bg-secondary/30 hover:bg-secondary/50 text-foreground rounded-lg border border-border transition-colors"
                      >
                        Tomorrow 00:00
                      </button>
                      <button
                        onClick={() => {
                          const nextWeek = new Date();
                          nextWeek.setDate(nextWeek.getDate() + 7);
                          setDateInput(nextWeek.toISOString().slice(0, 16));
                        }}
                        className="px-3 py-1.5 text-xs bg-secondary/30 hover:bg-secondary/50 text-foreground rounded-lg border border-border transition-colors"
                      >
                        Next Week
                      </button>
                    </div>
                  </div>

                  {/* Convert Button */}
                  <button
                    onClick={convertToTimestamp}
                    disabled={!dateInput.trim()}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Clock size={16} />
                    Convert to Timestamp
                  </button>

                  {/* Results */}
                  {timestampResult && (
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium text-foreground">Unix Timestamp</h3>
                      <div className="bg-muted rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <div className="text-xs text-muted-foreground">10-digit timestamp (seconds):</div>
                          <button
                            onClick={() => copyToClipboard(timestampResult)}
                            className="flex items-center gap-1 px-2 py-1 text-xs bg-secondary rounded hover:bg-secondary/80 transition-colors"
                          >
                            {copied ? <Check size={12} /> : <Copy size={12} />}
                            Copy
                          </button>
                        </div>
                        <code className="text-lg font-mono text-foreground block text-center py-2">
                          {timestampResult}
                        </code>
                        <div className="text-xs text-muted-foreground text-center mt-2">
                          Equivalent to: {parseInt(timestampResult) * 1000} milliseconds
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <div className="mt-6 flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <div className="text-red-500 mt-0.5 flex-shrink-0">⚠</div>
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-border">
                <button
                  onClick={() => {
                    setTimestamp(currentTimestamp);
                    convertToDate();
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Clock size={16} />
                  Convert Current Time
                </button>
                <button
                  onClick={clearAll}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                >
                  <RefreshCw size={16} />
                  Reset All
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
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">How to Use the Unix Timestamp Converter</h3>
              <div className="space-y-2 text-muted-foreground text-sm">
                <p>
                  This tool converts between Unix timestamps (seconds since January 1, 1970) and human-readable dates in multiple formats.
                </p>
                <div className="text-xs sm:text-sm space-y-1 pt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>To convert timestamp to date: Enter Unix timestamp (seconds) and click "Convert to Date"</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>To convert date to timestamp: Select date/time and click "Convert to Timestamp"</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Use common timestamps or quick dates for frequently used values</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Results show multiple formats (UTC, Local time, ISO) for comprehensive reference</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Copy results using copy buttons or reset all fields to start over</span>
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
                  <h2 className="text-xl font-bold text-foreground">Unix Timestamp Converter - What It Does</h2>
                  {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.whatItDoes && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      This comprehensive Unix timestamp converter provides bidirectional conversion between epoch time (seconds since January 1, 1970) and human-readable date formats, serving as an essential tool for developers, system administrators, and anyone working with time-based data in computing systems. The tool handles both 32-bit and 64-bit timestamps, automatically detects and converts between seconds and milliseconds, and presents results in multiple formats including UTC, local time, and ISO 8601 standards.
                    </p>
                    <p className="text-muted-foreground">
                      Beyond basic conversion, the tool offers practical features like common timestamp presets (including current time, Unix epoch, and the Year 2038 boundary), real-time timestamp display, and detailed format explanations. It properly handles edge cases like negative timestamps (dates before 1970), leap seconds considerations, and timezone conversions, making it suitable for debugging timestamp-related issues in logs, databases, APIs, and distributed systems where consistent time representation is critical.
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
                  <h2 className="text-xl font-bold text-foreground">Practical Use Cases for Unix Timestamp Conversion</h2>
                  {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.useCases && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Unix timestamp conversion serves essential purposes across various development and system administration scenarios:
                    </p>
                    <ul className="space-y-3 text-muted-foreground pl-5">
                      <li className="pl-2">
                        <strong className="text-foreground">Log Analysis & Debugging</strong>
                        <p className="mt-1">Convert timestamps in system logs, application logs, and error reports to readable dates for troubleshooting and timeline reconstruction.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Database Management</strong>
                        <p className="mt-1">Interpret timestamp columns in databases, convert between storage formats, and generate timestamps for queries and data migration.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">API Development & Integration</strong>
                        <p className="mt-1">Handle timestamp parameters in REST APIs, webhooks, and microservices that commonly use Unix time for time representation.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">File System & Metadata</strong>
                        <p className="mt-1">Interpret file modification times (mtime), creation times, and other filesystem metadata stored as Unix timestamps.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Session & Token Management</strong>
                        <p className="mt-1">Convert expiration timestamps in JWT tokens, session cookies, and authentication tokens to verify validity periods.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Data Analysis & Reporting</strong>
                        <p className="mt-1">Transform timestamp data in datasets, analytics platforms, and monitoring systems for human-readable reporting and visualization.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Cross-Platform Development</strong>
                        <p className="mt-1">Ensure consistent time handling across different programming languages and platforms that may use varying timestamp formats.</p>
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
                  <h2 className="text-xl font-bold text-foreground">How to Use This Unix Timestamp Converter Effectively</h2>
                  {openSections.howToUse ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.howToUse && (
                  <div className="px-6 pb-6">
                    <ol className="space-y-4 text-muted-foreground pl-5">
                      <li className="pl-2">
                        <strong className="text-foreground">Understand Your Timestamp Format</strong>
                        <p className="mt-1">Determine if your timestamp is in seconds (10 digits) or milliseconds (13 digits). The tool auto-detects and converts milliseconds to seconds when needed.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Use Preset Values for Common Needs</strong>
                        <p className="mt-1">Select from common timestamps like "Now," "Unix Epoch," or "Year 2038 Problem" for quick testing and reference without manual entry.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Convert Timestamps to Multiple Formats</strong>
                        <p className="mt-1">When converting to dates, review all provided formats (UTC, Local, ISO) to understand how the timestamp translates across different representations.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Handle Timezone Considerations</strong>
                        <p className="mt-1">Remember that Unix timestamps are UTC-based. When converting dates to timestamps, your local timezone setting affects the result.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Verify Edge Cases</strong>
                        <p className="mt-1">Test with boundary values like zero (1970-01-01), negative timestamps (pre-1970), and large values (post-2038) to ensure your systems handle them correctly.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Copy Results for Implementation</strong>
                        <p className="mt-1">Use the copy buttons to quickly transfer converted values to your code, documentation, or configuration files without manual transcription errors.</p>
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
                  <h2 className="text-xl font-bold text-foreground">Unix Timestamp Conversion Examples</h2>
                  {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.examples && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground text-sm mb-4">
                      Below are practical examples demonstrating Unix timestamp conversion with different scenarios:
                    </p>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 1: Common Reference Points</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-muted p-4 rounded-lg">
                            <h4 className="text-sm font-semibold text-foreground mb-2">Unix Epoch (Start)</h4>
                            <div className="space-y-1">
                              <div className="text-xs text-muted-foreground">Timestamp:</div>
                              <code className="font-mono text-sm block">0</code>
                              <div className="text-xs text-muted-foreground mt-2">Converts to:</div>
                              <div className="text-sm">Thursday, January 1, 1970 00:00:00 UTC</div>
                            </div>
                          </div>
                          <div className="bg-muted p-4 rounded-lg">
                            <h4 className="text-sm font-semibold text-foreground mb-2">Year 2038 Problem</h4>
                            <div className="space-y-1">
                              <div className="text-xs text-muted-foreground">Timestamp:</div>
                              <code className="font-mono text-sm block">2147483647</code>
                              <div className="text-xs text-muted-foreground mt-2">Converts to:</div>
                              <div className="text-sm">Tuesday, January 19, 2038 03:14:07 UTC</div>
                              <div className="text-xs text-muted-foreground mt-1">(32-bit signed integer maximum)</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 2: Real-World Conversion</h3>
                        <div className="bg-muted p-4 rounded-lg">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-sm font-semibold text-foreground mb-2">Timestamp to Date</h4>
                              <div className="space-y-2">
                                <div>
                                  <div className="text-xs text-muted-foreground">Input (timestamp):</div>
                                  <code className="font-mono text-sm">1672531200</code>
                                </div>
                                <div>
                                  <div className="text-xs text-muted-foreground">Output (date):</div>
                                  <div className="text-sm">Sunday, January 1, 2023 00:00:00 UTC</div>
                                  <div className="text-sm">Saturday, December 31, 2022 16:00:00 PST</div>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-foreground mb-2">Date to Timestamp</h4>
                              <div className="space-y-2">
                                <div>
                                  <div className="text-xs text-muted-foreground">Input (date):</div>
                                  <div className="text-sm">June 15, 2023 14:30:00 UTC</div>
                                </div>
                                <div>
                                  <div className="text-xs text-muted-foreground">Output (timestamp):</div>
                                  <code className="font-mono text-sm">1686839400</code>
                                  <div className="text-xs text-muted-foreground">(milliseconds: 1686839400000)</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                        <h4 className="text-sm font-semibold text-foreground mb-2">Timestamp Format Reference</h4>
                        <pre className="text-xs text-muted-foreground font-mono whitespace-pre">
{`Common Unix timestamp formats:
• Seconds (10 digits):   1672531200  (January 1, 2023)
• Milliseconds (13 digits): 1672531200000

Notable timestamps:
• 0:                    Unix Epoch (Jan 1, 1970)
• 86400:                1 day after epoch
• 31536000:             1 year after epoch (non-leap)
• 2147483647:           Year 2038 problem (32-bit max)
• 9999999999:           November 20, 2286

Milliseconds to seconds: Divide by 1000
Seconds to milliseconds: Multiply by 1000`}
                        </pre>
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
                  <h2 className="text-xl font-bold text-foreground">Frequently Asked Questions About Unix Timestamps</h2>
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
                    
                    {/* Technical Considerations */}
                    <div className="mt-8 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                      <h3 className="text-lg font-semibold text-foreground mb-2">Technical Considerations for Developers</h3>
                      <p className="text-sm text-muted-foreground">
                        When working with Unix timestamps in code: 1) Always specify whether you're using seconds or milliseconds in documentation and APIs, 2) Use 64-bit integers to avoid Year 2038 issues, 3) Consider timezone libraries for accurate local time conversions, 4) Handle leap seconds appropriately if absolute precision is required (most applications ignore them), 5) Validate timestamp ranges for your specific use case, 6) Use ISO 8601 for human-readable date storage when possible, and 7) Test with edge cases including negative values and very large timestamps.
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