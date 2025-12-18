'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, RotateCcw, Filter, ChevronDown, ChevronUp, Check, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Head from 'next/head';

const RemoveDuplicates = () => {
  const router = useRouter();
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [stats, setStats] = useState({
    totalLines: 0,
    uniqueLines: 0,
    duplicatesRemoved: 0,
    reductionPercentage: 0
  });

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
      question: "What is the difference between case-sensitive and case-insensitive duplicate removal?",
      answer: "Case-sensitive duplicate removal treats 'Apple' and 'apple' as different lines, while case-insensitive treats them as duplicates. For example, with case-sensitive OFF: 'apple', 'Apple', and 'APPLE' would all be considered duplicates. With case-sensitive ON: each variation would be kept as unique. Choose case-sensitive when uppercase/lowercase differences are meaningful (like passwords or codes)."
    },
    {
      question: "Does this tool preserve the order of lines when removing duplicates?",
      answer: "Yes, our duplicate remover preserves the original order of unique lines. The first occurrence of each line is kept, and subsequent duplicates are removed. For example: Input: ['A', 'B', 'A', 'C', 'B'] → Output: ['A', 'B', 'C']. The tool maintains the natural flow and context of your text while eliminating redundancy."
    },
    {
      question: "How many lines can this duplicate remover handle?",
      answer: "The tool can process thousands of lines efficiently in your browser. There's no strict limit, but extremely large datasets (100,000+ lines) may slow down processing. For massive datasets, consider splitting into chunks. The tool works entirely client-side—your data never leaves your browser, ensuring privacy and security."
    },
    {
      question: "Can I remove duplicates from comma-separated values (CSV) or tabular data?",
      answer: "Yes, but you need to prepare the data properly. For CSV files: paste each row on a new line. For specific columns: extract the column first, then process. The tool treats each line as a complete unit, so 'John,Doe,30' and 'John,Doe,30' would be duplicates, but 'John,Doe,30' and 'John,Doe,31' would be unique."
    },
    {
      question: "What types of duplicates does this tool handle?",
      answer: "The tool handles exact line duplicates. It doesn't handle similar or fuzzy duplicates (like 'color' and 'colour'). For partial duplicates, you need to extract the duplicate portion first. The tool is perfect for cleaning lists, removing duplicate entries from databases, cleaning email lists, and preparing data for analysis."
    }
  ];

  const removeDuplicates = () => {
    if (!inputText.trim()) {
      setOutputText('');
      setStats({
        totalLines: 0,
        uniqueLines: 0,
        duplicatesRemoved: 0,
        reductionPercentage: 0
      });
      return;
    }

    const lines = inputText.split('\n');
    const uniqueLines: string[] = [];
    const seen = new Set<string>();

    lines.forEach(line => {
      const checkLine = caseSensitive ? line : line.toLowerCase();
      if (!seen.has(checkLine)) {
        seen.add(checkLine);
        uniqueLines.push(line);
      }
    });

    const totalLines = lines.length;
    const uniqueLinesCount = uniqueLines.length;
    const duplicatesRemoved = totalLines - uniqueLinesCount;
    const reductionPercentage = totalLines > 0 ? Math.round((duplicatesRemoved / totalLines) * 100) : 0;

    setOutputText(uniqueLines.join('\n'));
    setStats({
      totalLines,
      uniqueLines: uniqueLinesCount,
      duplicatesRemoved,
      reductionPercentage
    });
  };

  useEffect(() => {
    if (inputText.trim()) {
      removeDuplicates();
    } else {
      setOutputText('');
      setStats({
        totalLines: 0,
        uniqueLines: 0,
        duplicatesRemoved: 0,
        reductionPercentage: 0
      });
    }
  }, [inputText, caseSensitive]);

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setStats({
      totalLines: 0,
      uniqueLines: 0,
      duplicatesRemoved: 0,
      reductionPercentage: 0
    });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Example data for demonstration
  const exampleInput = `apple
banana
Apple
orange
banana
grape
apple
ORANGE
banana
kiwi`;

  const loadExample = () => {
    setInputText(exampleInput);
  };

  return (
    <>
      <Head>
        <title>Remove Duplicate Lines | Free Online Duplicate Remover Tool - GrockTool.com</title>
        <meta name="description" content="Remove duplicate lines from text instantly with our free online duplicate remover. Keep only unique entries with case-sensitive options and real-time statistics." />
        <meta name="keywords" content="remove duplicate lines, duplicate remover, duplicate line remover, remove duplicates from text, unique lines extractor, text cleaner, duplicate finder, data deduplication" />
        <meta property="og:title" content="Remove Duplicate Lines | Free Online Duplicate Remover Tool - GrockTool.com" />
        <meta property="og:description" content="Instantly remove duplicate lines from any text with our free online tool. Process lists, emails, data, and more with case-sensitive options and real-time stats." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Remove Duplicate Lines - GrockTool.com" />
        <meta name="twitter:description" content="Free online tool to remove duplicate lines and keep only unique entries from your text." />
        <link rel="canonical" href="https://grocktool.com/text-tools/remove-duplicates" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Remove Duplicate Lines Tool",
            "applicationCategory": "DataCleaningApplication",
            "operatingSystem": "Any",
            "description": "Free online tool to remove duplicate lines from text with case-sensitive options and statistics",
            "url": "https://grocktool.com/text-tools/remove-duplicates",
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
              "Duplicate line removal",
              "Case-sensitive option",
              "Real-time statistics",
              "Order preservation",
              "Privacy protection",
              "Copy to clipboard"
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
                  Remove Duplicate Lines
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Remove duplicate lines and keep only unique entries
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
                    placeholder="Enter your text with duplicate lines..."
                    className="w-full min-h-[250px] p-4 bg-input border border-border rounded-lg sm:rounded-xl focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-ring focus:ring-opacity-50 resize-none text-foreground placeholder-muted-foreground"
                  />
                </div>

                {/* Output Section */}
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-foreground">
                    Unique Lines
                  </label>
                  <textarea
                    value={outputText}
                    readOnly
                    placeholder="Unique lines will appear here..."
                    className="w-full min-h-[250px] p-4 bg-muted border border-border rounded-lg sm:rounded-xl focus:outline-none resize-none text-foreground placeholder-muted-foreground"
                  />
                </div>
              </div>

              {/* Stats Bar */}
              {stats.totalLines > 0 && (
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                    <div className="text-lg font-bold text-foreground">{stats.totalLines}</div>
                    <div className="text-xs text-muted-foreground">Total Lines</div>
                  </div>
                  <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                    <div className="text-lg font-bold text-foreground">{stats.uniqueLines}</div>
                    <div className="text-xs text-muted-foreground">Unique Lines</div>
                  </div>
                  <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                    <div className="text-lg font-bold text-foreground">{stats.duplicatesRemoved}</div>
                    <div className="text-xs text-muted-foreground">Duplicates Removed</div>
                  </div>
                  <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
                    <div className="text-lg font-bold text-foreground">{stats.reductionPercentage}%</div>
                    <div className="text-xs text-muted-foreground">Reduction</div>
                  </div>
                </div>
              )}

              {/* Options */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 pt-6 border-t border-border">
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 text-sm text-foreground">
                    <input
                      type="checkbox"
                      checked={caseSensitive}
                      onChange={(e) => setCaseSensitive(e.target.checked)}
                      className="w-4 h-4 text-accent bg-input border-border rounded focus:ring-accent focus:ring-2"
                    />
                    Case sensitive
                  </label>
                  <div className="text-xs text-muted-foreground">
                    {caseSensitive ? 'Treats "Apple" and "apple" as different' : 'Treats "Apple" and "apple" as same'}
                  </div>
                </div>
                
                <button
                  onClick={loadExample}
                  className="text-sm text-accent hover:underline"
                >
                  Load Example
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  onClick={removeDuplicates}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent text-accent-foreground rounded-lg sm:rounded-xl hover:bg-accent/80 transition-colors text-sm sm:text-base"
                >
                  <Filter size={16} className="sm:w-4 sm:h-4" />
                  Remove Duplicates
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
                  Remove duplicate lines from your text while preserving the order of unique entries.
                </p>
                <div className="text-xs sm:text-sm space-y-1 pt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Paste your text with duplicate lines in the input area</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Enable "Case sensitive" to treat different cases as unique</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Click "Remove Duplicates" to process your text</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Copy the result or use it as needed</span>
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
                  <h2 className="text-xl font-bold text-foreground">Remove Duplicate Lines - What It Does</h2>
                  {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.whatItDoes && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      This free online duplicate line remover tool efficiently eliminates redundant lines from your text while preserving the original order of unique entries. The tool processes text line by line, identifying and removing exact duplicates with optional case-sensitive comparison. It provides real-time statistics showing total lines, unique lines, duplicates removed, and reduction percentage.
                    </p>
                    <p className="text-muted-foreground">
                      Perfect for data cleaning, list preparation, email list deduplication, and text normalization, this tool works entirely in your browser—ensuring complete privacy as your data never leaves your computer. Whether you're cleaning CSV files, preparing data for analysis, or removing duplicate entries from any text-based list, this tool saves time and improves data quality with its efficient duplicate detection algorithm.
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
                  <h2 className="text-xl font-bold text-foreground">Practical Use Cases for Duplicate Removal</h2>
                  {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.useCases && (
                  <div className="px-6 pb-6">
                    <ul className="space-y-3 text-muted-foreground pl-5">
                      <li className="pl-2">
                        <strong className="text-foreground">Email List Cleaning</strong>
                        <p className="mt-1">Remove duplicate email addresses from mailing lists to prevent multiple sends to the same recipient and improve email deliverability rates.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Data Analysis Preparation</strong>
                        <p className="mt-1">Clean datasets by removing duplicate entries before analysis to ensure accurate statistical results and prevent data skewing.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Content Management</strong>
                        <p className="mt-1">Remove duplicate entries from product lists, inventory databases, or content management systems to maintain clean records.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Programming & Development</strong>
                        <p className="mt-1">Clean configuration files, remove duplicate entries from logs, or deduplicate lists in code without affecting functionality.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Academic Research</strong>
                        <p className="mt-1">Prepare bibliographies or reference lists by removing duplicate citations and ensuring each source appears only once.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Social Media Management</strong>
                        <p className="mt-1">Clean follower lists, remove duplicate usernames from engagement reports, or prepare unique user lists for campaigns.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Inventory Management</strong>
                        <p className="mt-1">Remove duplicate product SKUs or entries from inventory lists to maintain accurate stock counts and prevent ordering errors.</p>
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
                  <h2 className="text-xl font-bold text-foreground">How to Remove Duplicate Lines Effectively</h2>
                  {openSections.howToUse ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.howToUse && (
                  <div className="px-6 pb-6">
                    <ol className="space-y-4 text-muted-foreground pl-5">
                      <li className="pl-2">
                        <strong className="text-foreground">Prepare Your Text</strong>
                        <p className="mt-1">Ensure each item you want to deduplicate is on a separate line. The tool processes line by line, so proper formatting is essential.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Set Case Sensitivity</strong>
                        <p className="mt-1">Decide if case matters: Enable "Case sensitive" for passwords/codes; disable for names/email addresses where case doesn't matter.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Process Your Text</strong>
                        <p className="mt-1">Paste your text and click "Remove Duplicates." The tool automatically processes and shows statistics about duplicates removed.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Review Results</strong>
                        <p className="mt-1">Check the output for accuracy. Review the statistics to understand how many duplicates were removed and the reduction percentage.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Save or Export</strong>
                        <p className="mt-1">Use "Copy Result" to copy the cleaned text to your clipboard, or manually select and copy the output for use in other applications.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Process Large Datasets</strong>
                        <p className="mt-1">For very large datasets (10,000+ lines), consider splitting into chunks or using the browser's built-in find/replace for better performance.</p>
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
                  <h2 className="text-xl font-bold text-foreground">Duplicate Removal Examples & Analysis</h2>
                  {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.examples && (
                  <div className="px-6 pb-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 1: Case-Insensitive Email List Cleaning</h3>
                        <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                          <pre className="text-sm text-muted-foreground font-mono">
{`Input (Case Sensitive: OFF):
john@example.com
JOHN@example.com
jane@example.com
John@Example.com
mike@example.com
john@example.com
JANE@example.com
alice@example.com

Output (Unique emails):
john@example.com
jane@example.com
mike@example.com
alice@example.com

Statistics:
• Total lines: 8
• Unique lines: 4
• Duplicates removed: 4
• Reduction: 50%

Analysis:
Email addresses are case-insensitive by standard, so all variations
of john@example.com and jane@example.com are treated as duplicates.
The tool keeps only the first occurrence of each unique address.`}
                          </pre>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 2: Case-Sensitive Product Code Deduplication</h3>
                        <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                          <pre className="text-sm text-muted-foreground font-mono">
{`Input (Case Sensitive: ON):
PROD001
prod001
PROD002
Prod001
PROD003
prod001
PROD001
prod002

Output (Unique codes):
PROD001
prod001
PROD002
Prod001
PROD003
prod002

Statistics:
• Total lines: 8
• Unique lines: 6
• Duplicates removed: 2
• Reduction: 25%

Analysis:
In this example, case matters (different product variants).
'PROD001' and 'prod001' are treated as different products.
Only exact case matches are considered duplicates.`}
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
                  <h2 className="text-xl font-bold text-foreground">Related Text & Data Tools</h2>
                  {openSections.relatedTools ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.relatedTools && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Explore other useful text and data processing tools from GrockTool.com:
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
                        <Link href="/text-tools/text-sorter" className="text-accent hover:underline">
                          <strong>Text Sorter:</strong> Sort lines alphabetically or numerically
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        <Link href="/text-tools/find-replace" className="text-accent hover:underline">
                          <strong>Find & Replace:</strong> Search and replace text patterns
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
                        <Link href="/text-tools/text-limiter" className="text-accent hover:underline">
                          <strong>Text Limiter:</strong> Truncate text to specific lengths
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        <Link href="/text-tools/remove-special-chars" className="text-accent hover:underline">
                          <strong>Remove Special Characters:</strong> Clean text by removing special symbols
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
                  <h2 className="text-xl font-bold text-foreground">Frequently Asked Questions About Duplicate Removal</h2>
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
                      <h3 className="text-lg font-semibold text-foreground mb-2">Data Processing Disclaimer</h3>
                      <p className="text-sm text-muted-foreground">
                        This duplicate removal tool processes text entirely in your browser for privacy protection. While we strive for accuracy, the tool works on exact line matches and doesn't handle fuzzy matching or semantic similarity. For critical data processing, always verify results manually, especially when dealing with sensitive information. The tool is designed for productivity enhancement and should be used as part of a comprehensive data validation process.
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

export default RemoveDuplicates;