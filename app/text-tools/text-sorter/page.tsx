'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, RotateCcw, ArrowUpDown, ChevronDown, ChevronUp, SortAsc, SortDesc, CaseSensitive } from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';

const TextSorter = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [removeEmptyLines, setRemoveEmptyLines] = useState(true);

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
      question: "What's the difference between ascending and descending sort order?",
      answer: "Ascending order (A-Z) sorts text from smallest to largest (alphabetically forward). Descending order (Z-A) sorts from largest to smallest (reverse alphabetical). For example: Ascending: ['Apple', 'Banana', 'Cherry']; Descending: ['Cherry', 'Banana', 'Apple']. Ascending is standard alphabetical order, while descending is reverse alphabetical order."
    },
    {
      question: "How does case sensitivity affect text sorting?",
      answer: "With case sensitivity OFF (default): 'apple', 'Apple', and 'APPLE' are treated equally and sorted together. With case sensitivity ON: Uppercase letters come before lowercase in ASCII order, so 'Apple' sorts before 'apple'. Example case-sensitive: ['Apple', 'Banana', 'apple', 'banana']; case-insensitive: ['apple', 'Apple', 'banana', 'Banana']. Use case-sensitive when letter case is meaningful (like programming or technical data)."
    },
    {
      question: "Does this text sorter handle numbers within text?",
      answer: "Yes, the sorter handles numbers using natural string comparison. Numbers are sorted as text characters, not numerically. For example: ['item10', 'item2', 'item1'] sorts as ['item1', 'item10', 'item2']. For true numerical sorting, ensure numbers are padded with zeros: ['item01', 'item02', 'item10']. The tool uses JavaScript's localeCompare() which provides intelligent sorting for alphanumeric combinations."
    },
    {
      question: "Can I sort by other criteria besides alphabetical order?",
      answer: "This tool sorts alphabetically (lexicographically) only. For numerical sorting, date sorting, or custom sorting rules, you would need specialized tools. However, you can achieve basic numerical sorting by padding numbers with zeros. For example, to sort ['Chapter 10', 'Chapter 2', 'Chapter 1'], convert to ['Chapter 01', 'Chapter 02', 'Chapter 10'] before sorting."
    },
    {
      question: "How does the tool handle special characters and Unicode?",
      answer: "The sorter uses JavaScript's localeCompare() method which properly handles Unicode characters, special characters, and accented letters according to language-specific rules. Special characters typically sort before letters and numbers. Accented characters are sorted appropriately for their language (é sorts near e in French). The tool works with any UTF-8 text including international characters and emojis."
    }
  ];

  const sortText = () => {
    if (!inputText.trim()) {
      setOutputText('');
      return;
    }

    let lines = inputText.split('\n');
    
    // Remove empty lines if option is enabled
    if (removeEmptyLines) {
      lines = lines.filter(line => line.trim() !== '');
    }

    const sortedLines = [...lines].sort((a, b) => {
      const strA = caseSensitive ? a : a.toLowerCase();
      const strB = caseSensitive ? b : b.toLowerCase();
      return sortOrder === 'asc'
        ? strA.localeCompare(strB)
        : strB.localeCompare(strA);
    });

    setOutputText(sortedLines.join('\n'));
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

  const loadExample = () => {
    const example = `Apple
banana
Orange
apple
Grape
BANANA
cherry
orange
grape
Cherry`;
    setInputText(example);
  };

  return (
    <>
      <Head>
        <title>Text Sorter | Free Online Alphabetical Sorter Tool - GrockTool.com</title>
        <meta name="description" content="Sort lines of text alphabetically with our free online text sorter. Choose ascending/descending order, case sensitivity, and remove empty lines options." />
        <meta name="keywords" content="text sorter, alphabetical sorter, sort lines alphabetically, text organizer, line sorter, alphabetize text, sort tool, text arrangement, data sorting" />
        <meta property="og:title" content="Text Sorter | Free Online Alphabetical Sorter Tool - GrockTool.com" />
        <meta property="og:description" content="Organize your text alphabetically with our free text sorter. Sort lines in A-Z or Z-A order with case-sensitive options and automatic empty line removal." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Text Sorter - GrockTool.com" />
        <meta name="twitter:description" content="Free online tool to sort lines of text alphabetically in ascending or descending order." />
        <link rel="canonical" href="https://grocktool.com/text-tools/text-sorter" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Text Sorter Tool",
            "applicationCategory": "DataOrganizationApplication",
            "operatingSystem": "Any",
            "description": "Free online text sorter to alphabetically organize lines of text with customizable sorting options",
            "url": "https://grocktool.com/text-tools/text-sorter",
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
              "Alphabetical text sorting",
              "Ascending/descending order",
              "Case-sensitive option",
              "Empty line removal",
              "Natural string comparison",
              "Unicode character support"
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
                  Text Sorter
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Sort lines of text alphabetically in ascending or descending order
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
                    placeholder="Enter lines of text to sort..."
                    className="w-full min-h-[250px] p-4 bg-input border border-border rounded-lg sm:rounded-xl focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-ring focus:ring-opacity-50 resize-none text-foreground placeholder-muted-foreground"
                  />
                </div>

                {/* Output Section */}
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-foreground">
                    Sorted Text
                  </label>
                  <textarea
                    value={outputText}
                    readOnly
                    placeholder="Sorted lines will appear here..."
                    className="w-full min-h-[250px] p-4 bg-muted border border-border rounded-lg sm:rounded-xl focus:outline-none resize-none text-foreground placeholder-muted-foreground"
                  />
                </div>
              </div>

              {/* Options */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 pt-6 border-t border-border">
                <div className="space-y-3 sm:space-y-0 sm:flex sm:items-center sm:gap-6">
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 text-sm text-foreground">
                      <input
                        type="radio"
                        name="sortOrder"
                        checked={sortOrder === 'asc'}
                        onChange={() => setSortOrder('asc')}
                        className="w-4 h-4 text-accent bg-input border-border focus:ring-accent focus:ring-2"
                      />
                      <div className="flex items-center gap-1">
                        <SortAsc size={14} />
                        Ascending (A-Z)
                      </div>
                    </label>
                    <label className="flex items-center gap-2 text-sm text-foreground">
                      <input
                        type="radio"
                        name="sortOrder"
                        checked={sortOrder === 'desc'}
                        onChange={() => setSortOrder('desc')}
                        className="w-4 h-4 text-accent bg-input border-border focus:ring-accent focus:ring-2"
                      />
                      <div className="flex items-center gap-1">
                        <SortDesc size={14} />
                        Descending (Z-A)
                      </div>
                    </label>
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 text-sm text-foreground">
                      <input
                        type="checkbox"
                        checked={caseSensitive}
                        onChange={(e) => setCaseSensitive(e.target.checked)}
                        className="w-4 h-4 text-accent bg-input border-border rounded focus:ring-accent focus:ring-2"
                      />
                      <div className="flex items-center gap-1">
                        <CaseSensitive size={14} />
                        Case sensitive
                      </div>
                    </label>
                    <label className="flex items-center gap-2 text-sm text-foreground">
                      <input
                        type="checkbox"
                        checked={removeEmptyLines}
                        onChange={(e) => setRemoveEmptyLines(e.target.checked)}
                        className="w-4 h-4 text-accent bg-input border-border rounded focus:ring-accent focus:ring-2"
                      />
                      Remove empty lines
                    </label>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  onClick={sortText}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent text-accent-foreground rounded-lg sm:rounded-xl hover:bg-accent/80 transition-colors text-sm sm:text-base"
                >
                  <ArrowUpDown size={16} className="sm:w-4 sm:h-4" />
                  Sort Text
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
                  Sort your text lines alphabetically with customizable sorting options.
                </p>
                <div className="text-xs sm:text-sm space-y-1 pt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Enter each line of text on a separate line</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Choose ascending (A-Z) or descending (Z-A) sort order</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Enable case sensitive for precise alphabetical sorting</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Click "Sort Text" to organize your lines alphabetically</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Copy the sorted result for your use</span>
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
                  <h2 className="text-xl font-bold text-foreground">Text Sorter Tool - What It Does</h2>
                  {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.whatItDoes && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      This free online text sorter organizes lines of text alphabetically with professional-grade sorting algorithms. The tool provides flexible sorting options including ascending (A-Z) or descending (Z-A) order, case-sensitive comparison, and automatic empty line removal. It uses JavaScript's advanced localeCompare() method that properly handles Unicode characters, special characters, and international text according to language-specific sorting rules.
                    </p>
                    <p className="text-muted-foreground">
                      Perfect for organizing lists, cleaning data, preparing content, and managing text-based information, this sorter processes text entirely in your browser for maximum privacy and speed. Whether you're alphabetizing names, sorting product lists, organizing vocabulary, or preparing data for analysis, this tool delivers accurate, reliable alphabetical organization with customizable options to match your specific needs.
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
                  <h2 className="text-xl font-bold text-foreground">Practical Use Cases for Text Sorting</h2>
                  {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.useCases && (
                  <div className="px-6 pb-6">
                    <ul className="space-y-3 text-muted-foreground pl-5">
                      <li className="pl-2">
                        <strong className="text-foreground">Contact List Organization</strong>
                        <p className="mt-1">Alphabetize names in contact lists, email directories, or customer databases for easy lookup and professional presentation.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Content Management</strong>
                        <p className="mt-1">Sort article titles, blog post names, or media files alphabetically in content management systems and media libraries.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Programming & Development</strong>
                        <p className="mt-1">Organize code variables, function names, configuration options, or string resources in alphabetical order for better code maintenance.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Academic Research</strong>
                        <p className="mt-1">Sort bibliographic references, research sources, or keyword lists alphabetically for papers, theses, and academic publications.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Inventory Management</strong>
                        <p className="mt-1">Alphabetize product names, SKU lists, or inventory items for efficient stock management and quick product lookup.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Language Learning</strong>
                        <p className="mt-1">Organize vocabulary lists, phrase collections, or language exercises alphabetically for systematic study and review.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Data Preparation for Analysis</strong>
                        <p className="mt-1">Sort survey responses, research data, or experimental results alphabetically before statistical analysis or reporting.</p>
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
                  <h2 className="text-xl font-bold text-foreground">How to Sort Text Alphabetically</h2>
                  {openSections.howToUse ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.howToUse && (
                  <div className="px-6 pb-6">
                    <ol className="space-y-4 text-muted-foreground pl-5">
                      <li className="pl-2">
                        <strong className="text-foreground">Prepare Your Text</strong>
                        <p className="mt-1">Ensure each item you want to sort is on a separate line. The tool processes line by line, so proper line breaks are essential for accurate sorting.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Configure Sorting Options</strong>
                        <p className="mt-1">Choose between ascending (A-Z) or descending (Z-A) order. Decide if case sensitivity matters for your data. Enable empty line removal for cleaner results.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Process Your Text</strong>
                        <p className="mt-1">Click "Sort Text" to alphabetically organize your lines. The tool uses natural sorting algorithms that properly handle alphanumeric combinations.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Review and Adjust</strong>
                        <p className="mt-1">Check the sorted output. If results aren't as expected, adjust case sensitivity or try with/without empty line removal and re-sort.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Handle Special Cases</strong>
                        <p className="mt-1">For numbers within text, ensure consistent formatting. For special sorting needs (dates, custom orders), pre-process your text before sorting.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Export Results</strong>
                        <p className="mt-1">Use "Copy Result" to transfer the sorted text to your clipboard, or manually select and copy for use in other applications.</p>
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
                  <h2 className="text-xl font-bold text-foreground">Text Sorting Examples & Best Practices</h2>
                  {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.examples && (
                  <div className="px-6 pb-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 1: Case-Insensitive Name Sorting</h3>
                        <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                          <pre className="text-sm text-muted-foreground font-mono">
{`Input (Case Sensitive: OFF, Ascending Order):
Michael
jane
JOHN
Alice
Robert
alice
MICHAEL
Jane

Output (Alphabetically Sorted):
Alice
alice
Jane
jane
JOHN
Michael
MICHAEL
Robert

Analysis:
• Case-insensitive sorting groups same names together
• 'Alice' and 'alice' appear consecutively
• Natural alphabetical order is maintained
• Perfect for contact lists where case variations exist`}
                          </pre>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 2: Case-Sensitive Technical Data</h3>
                        <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                          <pre className="text-sm text-muted-foreground font-mono">
{`Input (Case Sensitive: ON, Ascending Order):
user001
Admin
user002
admin
User001
ADMIN
user003
Admin

Output (Case-Sensitive Sorted):
ADMIN
Admin
Admin
User001
admin
user001
user002
user003

Analysis:
• Uppercase sorts before lowercase in ASCII
• 'ADMIN' comes before 'Admin' before 'admin'
• Important for programming and system data
• Maintains technical case requirements`}
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
                        <Link href="/text-tools/remove-duplicates" className="text-accent hover:underline">
                          <strong>Remove Duplicates:</strong> Remove duplicate lines from text
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        <Link href="/text-tools/word-counter" className="text-accent hover:underline">
                          <strong>Word Counter:</strong> Count characters, words, sentences, and paragraphs
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        <Link href="/text-tools/text-reverser" className="text-accent hover:underline">
                          <strong>Text Reverser:</strong> Reverse text or word order
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
                        <Link href="/text-tools/find-replace" className="text-accent hover:underline">
                          <strong>Find & Replace:</strong> Search and replace text patterns
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        <Link href="/text-tools/slug-generator" className="text-accent hover:underline">
                          <strong>Slug Generator:</strong> Create SEO-friendly URL slugs
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
                  <h2 className="text-xl font-bold text-foreground">Frequently Asked Questions About Text Sorting</h2>
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
                      <h3 className="text-lg font-semibold text-foreground mb-2">Data Organization Disclaimer</h3>
                      <p className="text-sm text-muted-foreground">
                        This text sorter uses standard alphabetical sorting algorithms based on JavaScript's localeCompare() method. Sorting behavior may vary slightly between browsers due to different Unicode implementations. For critical data organization requiring specific locale rules or custom sorting orders, consider using specialized software or programming libraries. Always verify sorted results for accuracy, especially when dealing with mixed data types or international characters.
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

export default TextSorter;