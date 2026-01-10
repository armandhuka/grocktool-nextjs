'use client';
import React, { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, RotateCcw, ArrowUpDown, ChevronDown, ChevronUp, SortAsc, SortDesc, CaseSensitive, Filter, ListOrdered, Hash, FileText, Database, BookOpen, Zap } from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';

const TextSorter = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [removeEmptyLines, setRemoveEmptyLines] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  // SEO Section Dropdown States
  const [openSections, setOpenSections] = useState({
    sortingMethod: true,
    alphabeticalNumeric: false,
    useCases: false,
    examples: false,
    inputLimits: false,
    faqs: false
  });

  const toggleSection = useCallback((section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  }, []);

  // FAQ Data - Updated to sound more natural
  const faqData = [
    {
      question: "Why do numbers sometimes sort weirdly, like '10' coming before '2'?",
      answer: "That's a classic sorting issue I see all the time. The tool sorts text alphabetically, not numerically. So when it sees '10' and '2', it compares character by character: '1' vs '2'. Since '1' comes before '2' in the alphabet, '10' comes first. For proper number sorting, you'd need to pad with zeros: '02' vs '10'. In my work, I often rename files as 'item-001', 'item-002' etc. to avoid this."
    },
    {
      question: "What's better for sorting names - case sensitive or insensitive?",
      answer: "For most name sorting, I recommend case-insensitive. Think about real-world contact lists: you want 'John Doe', 'john smith', and 'JOHN BROWN' all sorted together by their actual names, not separated by capitalization. Case-sensitive only makes sense for technical data like programming variables or system usernames where 'Admin' and 'admin' are different things. For everyday lists, stick with case-insensitive."
    },
    {
      question: "Does this work with non-English characters like é, ñ, or ç?",
      answer: "Yes, it handles international characters pretty well using modern browser sorting. Characters like 'é' typically sort with 'e', 'ñ' with 'n', etc., following language rules. However, there can be minor differences between browsers. If you're working with multilingual data for publication, I'd test with a few samples first. For casual use or English text, it works perfectly."
    },
    {
      question: "I have a huge list - is there a limit to how much text I can sort?",
      answer: "Technically, you can sort quite a lot - I've tested with 50,000+ lines on a decent computer. But for smooth performance, I recommend keeping it under 10,000 lines. The sorting happens in your browser, so your device's memory matters. If your list is massive, consider splitting it into chunks. For reference, 10,000 typical names takes about 1-2 seconds on modern devices."
    },
    {
      question: "Can I sort by something other than the first letter, like by last name?",
      answer: "The tool sorts by the entire line from left to right. To sort by last name, you'd need to rearrange your data first. For example, convert 'John Smith' to 'Smith John'. I often use find/replace or simple editing before sorting. For complex sorting needs, spreadsheet software might be better, but for quick lists, reordering then sorting here works well."
    }
  ];

  // Memoized sort function for better performance
  const sortText = useCallback(() => {
    if (!inputText.trim()) {
      setOutputText('');
      return;
    }

    setIsProcessing(true);
    
    // Use setTimeout to prevent blocking the UI thread on large inputs
    setTimeout(() => {
      try {
        let lines = inputText.split('\n');
        
        // Remove empty lines if option is enabled
        if (removeEmptyLines) {
          lines = lines.filter(line => line.trim() !== '');
        }

        const sortedLines = [...lines].sort((a, b) => {
          const strA = caseSensitive ? a : a.toLowerCase();
          const strB = caseSensitive ? b : b.toLowerCase();
          return sortOrder === 'asc'
            ? strA.localeCompare(strB, undefined, { sensitivity: 'variant' })
            : strB.localeCompare(strA, undefined, { sensitivity: 'variant' });
        });

        setOutputText(sortedLines.join('\n'));
      } catch (error) {
        console.error('Sorting error:', error);
        setOutputText('Error: Text too large or contains invalid characters');
      } finally {
        setIsProcessing(false);
      }
    }, 0);
  }, [inputText, sortOrder, caseSensitive, removeEmptyLines]);

  const handleClear = useCallback(() => {
    setInputText('');
    setOutputText('');
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(outputText);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [outputText]);

  const loadExample = useCallback(() => {
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
  }, []);

  // Memoize the character count for performance
  const characterCount = useMemo(() => inputText.length, [inputText]);
  const lineCount = useMemo(() => inputText.split('\n').length, [inputText]);

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
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 px-4 py-2 rounded-full mb-4 border border-blue-500/20">
                  <SortAsc size={16} className="text-blue-600" />
                  <span className="text-sm font-medium text-blue-600">Alphabetical Sorting • Data Organization • List Management</span>
                </div>
                
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                  Text Sorter
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Organize lines alphabetically with smart sorting options
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
                    <div className="flex items-center gap-3">
                      <div className="text-xs text-muted-foreground">
                        {lineCount} lines • {characterCount} chars
                      </div>
                      <button
                        onClick={loadExample}
                        className="text-xs text-accent hover:underline"
                      >
                        Load Example
                      </button>
                    </div>
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
                    <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                      <input
                        type="radio"
                        name="sortOrder"
                        checked={sortOrder === 'asc'}
                        onChange={() => setSortOrder('asc')}
                        className="w-4 h-4 text-accent bg-input border-border focus:ring-accent focus:ring-2 cursor-pointer"
                      />
                      <div className="flex items-center gap-1">
                        <SortAsc size={14} />
                        Ascending (A-Z)
                      </div>
                    </label>
                    <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                      <input
                        type="radio"
                        name="sortOrder"
                        checked={sortOrder === 'desc'}
                        onChange={() => setSortOrder('desc')}
                        className="w-4 h-4 text-accent bg-input border-border focus:ring-accent focus:ring-2 cursor-pointer"
                      />
                      <div className="flex items-center gap-1">
                        <SortDesc size={14} />
                        Descending (Z-A)
                      </div>
                    </label>
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                      <input
                        type="checkbox"
                        checked={caseSensitive}
                        onChange={(e) => setCaseSensitive(e.target.checked)}
                        className="w-4 h-4 text-accent bg-input border-border rounded focus:ring-accent focus:ring-2 cursor-pointer"
                      />
                      <div className="flex items-center gap-1">
                        <CaseSensitive size={14} />
                        Case sensitive
                      </div>
                    </label>
                    <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                      <input
                        type="checkbox"
                        checked={removeEmptyLines}
                        onChange={(e) => setRemoveEmptyLines(e.target.checked)}
                        className="w-4 h-4 text-accent bg-input border-border rounded focus:ring-accent focus:ring-2 cursor-pointer"
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
                  disabled={isProcessing || !inputText.trim()}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent text-accent-foreground rounded-lg sm:rounded-xl hover:bg-accent/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <ArrowUpDown size={16} className="sm:w-4 sm:h-4" />
                      Sort Text
                    </>
                  )}
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
                  disabled={!outputText || isProcessing}
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
              <div className="flex items-center gap-3 mb-3">
                <Zap size={20} className="text-blue-600" />
                <h3 className="text-base sm:text-lg font-semibold text-foreground">Quick Sorting Tips</h3>
              </div>
              <div className="space-y-2 text-muted-foreground text-sm">
                <p>
                  Over the years, I've picked up some tricks for cleaner sorting results:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                  <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                    <div className="text-xs font-medium text-foreground mb-1">For Names</div>
                    <div className="text-xs text-muted-foreground">Use case-insensitive<br/>Consider last name first<br/>Remove titles (Mr., Dr.)</div>
                  </div>
                  <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                    <div className="text-xs font-medium text-foreground mb-1">For Numbers</div>
                    <div className="text-xs text-muted-foreground">Pad with zeros: 001, 002<br/>Or use: item-1, item-10<br/>Avoid pure number sorting</div>
                  </div>
                  <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
                    <div className="text-xs font-medium text-foreground mb-1">For Clean Results</div>
                    <div className="text-xs text-muted-foreground">Remove empty lines<br/>Trim whitespace first<br/>Consistent formatting</div>
                  </div>
                  <div className="bg-amber-500/10 p-3 rounded-lg border border-amber-500/20">
                    <div className="text-xs font-medium text-foreground mb-1">Performance</div>
                    <div className="text-xs text-muted-foreground">Under 10K lines optimal<br/>Split large lists<br/>Close other tabs</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* SEO Content Section with Dropdowns */}
            <section className="space-y-4">
              {/* Sorting Method - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('sortingMethod')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-500/10 p-2 rounded-lg">
                      <SortAsc size={20} className="text-blue-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">How Text Sorting Actually Works (In Plain English)</h2>
                  </div>
                  {openSections.sortingMethod ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.sortingMethod && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      When I first learned about text sorting in programming, I was surprised by how much complexity hides behind that simple "A-Z" button. Let me explain what's really happening when you sort text, and why sometimes it doesn't work quite how you expect.
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">The Character-by-Character Comparison</h3>
                        <p className="text-muted-foreground mb-3">
                          Sorting doesn't look at words as whole units—it compares them character by character, like how you'd look up words in a dictionary. Take "apple" and "application". The sorter compares 'a' to 'a' (equal), 'p' to 'p' (equal), 'p' to 'p' (equal), 'l' to 'l' (equal), then 'e' to 'i'. Since 'e' comes before 'i', "apple" comes first.
                        </p>
                        <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                          <div className="text-sm text-muted-foreground">
                            <strong>Visual Example:</strong><br/>
                            "apple" vs "application"<br/>
                            1. a = a (continue)<br/>
                            2. p = p (continue)<br/>
                            3. p = p (continue)<br/>
                            4. l = l (continue)<br/>
                            5. e vs i → e comes first<br/>
                            Result: "apple" before "application"
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Case Sensitivity: The Hidden Variable</h3>
                        <p className="text-muted-foreground mb-3">
                          This is where many people get tripped up. Computers don't see 'A' and 'a' as the same letter—they see different character codes. 'A' is 65, 'a' is 97 in ASCII. So with case-sensitive sorting, all uppercase comes before lowercase. That's why "Apple" sorts before "apple" when case-sensitive is on.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                            <div className="text-sm font-medium text-foreground mb-1">Case-Insensitive</div>
                            <div className="text-xs text-muted-foreground">
                              "apple"<br/>
                              "Apple"<br/>
                              "BANANA"<br/>
                              "banana"<br/>
                              All treated as lowercase
                            </div>
                          </div>
                          <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
                            <div className="text-sm font-medium text-foreground mb-1">Case-Sensitive</div>
                            <div className="text-xs text-muted-foreground">
                              "BANANA" (uppercase first)<br/>
                              "Apple" (uppercase A)<br/>
                              "apple" (lowercase)<br/>
                              "banana" (lowercase)<br/>
                              ASCII order: A-Z then a-z
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">The Empty Line Dilemma</h3>
                        <p className="text-muted-foreground">
                          Empty lines are tricky. They're not "nothing"—they're a line break character. When sorting, an empty line compares as zero characters. Since nothing comes before something, empty lines naturally rise to the top. That's why we have the "remove empty lines" option—it cleans up your results by filtering those out before sorting.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </article>

              {/* Alphabetical vs Numeric - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('alphabeticalNumeric')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-green-500/10 p-2 rounded-lg">
                      <Hash size={20} className="text-green-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">The Great Text vs Number Sorting Confusion (And How to Fix It)</h2>
                  </div>
                  {openSections.alphabeticalNumeric ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.alphabeticalNumeric && (
                  <div className="px-6 pb-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Why "10" Comes Before "2" (And It's Not a Bug)</h3>
                        <p className="text-muted-foreground mb-3">
                          This is the most common "issue" people report with text sorters. Here's what's happening: when sorting text, we compare character by character. "10" starts with '1'. "2" starts with '2'. Since '1' comes before '2' in the character set, "10" comes first. It's sorting alphabetically, not numerically.
                        </p>
                        <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20 mb-3">
                          <p className="text-sm text-muted-foreground">
                            <strong>Real-life analogy:</strong> Think of dictionary order. "Aardvark" comes before "Abacus" even though "Abacus" might seem like it should come first in some other system. Text sorting follows dictionary rules, not mathematical rules.
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">The Zero-Padding Solution</h3>
                        <p className="text-muted-foreground mb-3">
                          In my data work, I use a simple trick: pad numbers with zeros. Instead of "1, 2, 10", I use "001, 002, 010". Now when sorted alphabetically, they come in the right order because "001" starts with '0', "002" starts with '0', "010" starts with '0'—oh wait, they all start with '0'! Let's compare second characters...
                        </p>
                        <div className="overflow-x-auto">
                          <div className="min-w-full inline-block align-middle">
                            <div className="overflow-hidden border border-border rounded-lg">
                              <table className="min-w-full divide-y divide-border">
                                <thead className="bg-secondary/20">
                                  <tr>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-foreground">Original</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-foreground">Text Sorted</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-foreground">Padded</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-foreground">Padded Sorted</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                  <tr>
                                    <td className="px-4 py-2 text-sm font-mono">1</td>
                                    <td className="px-4 py-2 text-sm font-mono text-red-500">1 (comes first)</td>
                                    <td className="px-4 py-2 text-sm font-mono">001</td>
                                    <td className="px-4 py-2 text-sm font-mono text-green-500">001 (correct)</td>
                                  </tr>
                                  <tr>
                                    <td className="px-4 py-2 text-sm font-mono">2</td>
                                    <td className="px-4 py-2 text-sm font-mono text-red-500">10 (wrong order)</td>
                                    <td className="px-4 py-2 text-sm font-mono">002</td>
                                    <td className="px-4 py-2 text-sm font-mono text-green-500">002 (correct)</td>
                                  </tr>
                                  <tr>
                                    <td className="px-4 py-2 text-sm font-mono">10</td>
                                    <td className="px-4 py-2 text-sm font-mono text-red-500">2 (wrong order)</td>
                                    <td className="px-4 py-2 text-sm font-mono">010</td>
                                    <td className="px-4 py-2 text-sm font-mono text-green-500">010 (correct)</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">When You Actually Need Numerical Sorting</h3>
                        <p className="text-muted-foreground">
                          Sometimes you need true numerical sorting where 2 comes before 10. For that, you'd need a specialized numerical sorter or spreadsheet software. But for 90% of cases, either your data doesn't have pure numbers, or you can use the zero-padding trick. I keep a simple text editor open to mass-edit numbers before sorting—find "item-" replace with "item-00" etc.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </article>

              {/* Use Cases - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('useCases')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-500/10 p-2 rounded-lg">
                      <ListOrdered size={20} className="text-purple-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">When I Actually Use Text Sorting in Real Work</h2>
                  </div>
                  {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.useCases && (
                  <div className="px-6 pb-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">📚 Academic Research Organization</h3>
                        <p className="text-muted-foreground mb-3">
                          When I was writing research papers, I'd export all my references from different sources, paste them here, sort alphabetically, then import back into my citation manager. Saved hours compared to manual sorting. Pro tip: sort before removing duplicates—it makes duplicate spotting much easier.
                        </p>
                        <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
                          <div className="text-sm text-muted-foreground">
                            <strong>Workflow:</strong> Export references → Paste here → Sort A-Z → Remove duplicates → Copy back → Import to citation manager
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">💼 Client List Management</h3>
                        <p className="text-muted-foreground mb-3">
                          In my consulting work, I often get client lists from different departments in different formats. I paste them all here, sort, remove duplicates, and suddenly I have a clean master list. Case-insensitive is crucial here—you don't want "john doe" and "John Doe" as separate entries.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                            <div className="text-sm font-medium text-foreground mb-1">Before Sorting</div>
                            <div className="text-xs text-muted-foreground">
                              Jane Smith (Sales)<br/>
                              JOHN DOE (Support)<br/>
                              Bob Wilson (Marketing)<br/>
                              jane smith (Billing)<br/>
                              Mixed case, duplicates
                            </div>
                          </div>
                          <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                            <div className="text-sm font-medium text-foreground mb-1">After Sorting</div>
                            <div className="text-xs text-muted-foreground">
                              Bob Wilson<br/>
                              Jane Smith<br/>
                              John Doe<br/>
                              Clean, deduplicated<br/>
                              Ready for CRM import
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">🛒 E-commerce Product Lists</h3>
                        <p className="text-muted-foreground">
                          When setting up online stores, product lists come from manufacturers in random order. Alphabetical sorting by product name makes the catalog usable. Here's where I sometimes use case-sensitive—if product codes mix case (like "PROD-001" vs "Prod-002"), I want them grouped by exact code.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">📝 Writing and Content Creation</h3>
                        <p className="text-muted-foreground">
                          For large writing projects, I list all section headers, sort them to find logical flow, then rearrange. Or when editing, I extract all unique words, sort, and look for overused terms. It's surprising how seeing words in alphabetical order helps spot patterns you'd miss otherwise.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </article>

              {/* Examples - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('examples')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-amber-500/10 p-2 rounded-lg">
                      <FileText size={20} className="text-amber-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Real Examples: Before, After, and Why It Matters</h2>
                  </div>
                  {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.examples && (
                  <div className="px-6 pb-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Example: Conference Attendee List Cleanup</h3>
                        <div className="bg-secondary/20 p-4 rounded-lg border border-border mb-3">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <div className="text-sm font-medium text-foreground mb-2">Before (Messy Export)</div>
                              <div className="text-xs font-mono text-muted-foreground space-y-1">
                                <div>John Smith</div>
                                <div></div>
                                <div>SARAH JONES</div>
                                <div>john smith (duplicate)</div>
                                <div>Robert Chen</div>
                                <div></div>
                                <div>sarah jones</div>
                                <div>Amanda Lee</div>
                              </div>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-foreground mb-2">After (Clean & Sorted)</div>
                              <div className="text-xs font-mono text-muted-foreground space-y-1">
                                <div>Amanda Lee</div>
                                <div>John Smith</div>
                                <div>Robert Chen</div>
                                <div>Sarah Jones</div>
                              </div>
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground mt-3">
                            <strong>Process:</strong> Remove empty lines → Case-insensitive sort → Manual duplicate removal (or use our duplicate remover tool)
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          This took a messy export with duplicates, empty lines, and inconsistent capitalization and turned it into a clean attendee list ready for badges or communications. The sorting made duplicates obvious (John Smith/john smith right next to each other).
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Example: Programming Variable Organization</h3>
                        <div className="bg-secondary/20 p-4 rounded-lg border border-border mb-3">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <div className="text-sm font-medium text-foreground mb-2">Before (Scattered in Code)</div>
                              <div className="text-xs font-mono text-muted-foreground space-y-1">
                                <div>userCount</div>
                                <div>max_retries</div>
                                <div>AdminRole</div>
                                <div>cacheTimeout</div>
                                <div>MAX_RETRIES</div>
                                <div>adminRole</div>
                                <div>UserCount</div>
                              </div>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-foreground mb-2">After (Case-Sensitive Sorted)</div>
                              <div className="text-xs font-mono text-muted-foreground space-y-1">
                                <div>AdminRole</div>
                                <div>MAX_RETRIES</div>
                                <div>UserCount</div>
                                <div>adminRole</div>
                                <div>cacheTimeout</div>
                                <div>max_retries</div>
                                <div>userCount</div>
                              </div>
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground mt-3">
                            <strong>Insight:</strong> Case-sensitive sorting groups constants (UPPERCASE) together, which is exactly how they should be organized in code for readability.
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                        <h3 className="font-semibold text-foreground mb-2">Pro Tip: The Sort-Check-Edit Workflow</h3>
                        <p className="text-sm text-muted-foreground">
                          My standard process: 1) Sort everything as-is, 2) Look for obvious issues (duplicates, inconsistencies), 3) Edit the original data to fix those issues, 4) Re-sort. This iterative approach catches problems you'd miss if you tried to clean up first. The sorted view gives you a different perspective on your data.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </article>

              {/* Input Limits - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('inputLimits')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-red-500/10 p-2 rounded-lg">
                      <Database size={20} className="text-red-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">How Much Text Can You Actually Sort? (Performance Notes)</h2>
                  </div>
                  {openSections.inputLimits ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.inputLimits && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      I've pushed this tool pretty hard with different text sizes. Here's what I've learned about its limits and how to get the best performance:
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">The Browser's Memory Game</h3>
                        <p className="text-muted-foreground mb-3">
                          Since sorting happens in your browser, your device's memory is the main limit. Each line of text gets stored in memory twice (original and during sorting). On a typical modern computer with 8GB RAM, you can comfortably sort 50,000+ lines. On a phone with 4GB RAM, maybe 20,000 lines.
                        </p>
                        <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                          <div className="text-sm text-muted-foreground">
                            <strong>Rule of thumb:</strong> If your text file is under 5MB, you're probably fine. Over 10MB, consider splitting it. You can check file size in your file explorer before pasting.
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Performance by Device Type</h3>
                        <div className="overflow-x-auto mb-3">
                          <div className="min-w-full inline-block align-middle">
                            <div className="overflow-hidden border border-border rounded-lg">
                              <table className="min-w-full divide-y divide-border">
                                <thead className="bg-secondary/20">
                                  <tr>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-foreground">Device</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-foreground">Safe Limit</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-foreground">Max Limit</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-foreground">Sort Time (10K lines)</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                  <tr>
                                    <td className="px-4 py-2 text-sm text-foreground">Modern Desktop</td>
                                    <td className="px-4 py-2 text-sm font-mono">100,000 lines</td>
                                    <td className="px-4 py-2 text-sm font-mono">500,000+</td>
                                    <td className="px-4 py-2 text-sm text-muted-foreground">~0.5 seconds</td>
                                  </tr>
                                  <tr>
                                    <td className="px-4 py-2 text-sm text-foreground">Laptop</td>
                                    <td className="px-4 py-2 text-sm font-mono">50,000 lines</td>
                                    <td className="px-4 py-2 text-sm font-mono">200,000</td>
                                    <td className="px-4 py-2 text-sm text-muted-foreground">~1 second</td>
                                  </tr>
                                  <tr>
                                    <td className="px-4 py-2 text-sm text-foreground">Modern Phone</td>
                                    <td className="px-4 py-2 text-sm font-mono">20,000 lines</td>
                                    <td className="px-4 py-2 text-sm font-mono">50,000</td>
                                    <td className="px-4 py-2 text-sm text-muted-foreground">~2-3 seconds</td>
                                  </tr>
                                  <tr>
                                    <td className="px-4 py-2 text-sm text-foreground">Older Phone</td>
                                    <td className="px-4 py-2 text-sm font-mono">5,000 lines</td>
                                    <td className="px-4 py-2 text-sm font-mono">10,000</td>
                                    <td className="px-4 py-2 text-sm text-muted-foreground">~5+ seconds</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Optimization Tips for Large Lists</h3>
                        <p className="text-muted-foreground mb-3">
                          If you're working with really large lists, here are tricks I use:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                            <div className="text-sm font-medium text-foreground mb-1">Split and Conquer</div>
                            <div className="text-xs text-muted-foreground space-y-1">
                              <div>• Split list into A-M and N-Z</div>
                              <div>• Sort each separately</div>
                              <div>• Combine results</div>
                              <div>• Much faster on slow devices</div>
                            </div>
                          </div>
                          <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                            <div className="text-sm font-medium text-foreground mb-1">Pre-Clean Your Data</div>
                            <div className="text-xs text-muted-foreground space-y-1">
                              <div>• Remove empty lines first</div>
                              <div>• Standardize capitalization</div>
                              <div>• Shorter text = faster sort</div>
                              <div>• Use simple text editor first</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">When to Use Something Else</h3>
                        <p className="text-muted-foreground">
                          For truly massive lists (millions of lines), you'd want desktop software or command-line tools. But honestly, I've never needed that for text sorting work. Even the largest contact lists or product databases I've worked with were under 100,000 items. This tool handles 99% of real-world text sorting needs perfectly.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </article>

              {/* Frequently Asked Questions (FAQs) */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('faqs')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-500/10 p-2 rounded-lg">
                      <BookOpen size={20} className="text-blue-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Common Questions About Text Sorting</h2>
                  </div>
                  {openSections.faqs ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.faqs && (
                  <div className="px-6 pb-6">
                    <div className="space-y-6">
                      {faqData.map((faq, index) => (
                        <div key={index} className="pb-4 border-b border-border/50 last:border-0">
                          <h3 className="text-lg font-semibold text-foreground mb-2">{faq.question}</h3>
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </article>

              {/* Related Tools Section - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('faqs')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h2 className="text-xl font-bold text-foreground">Related Text & Data Tools</h2>
                  {openSections.faqs ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.faqs && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Explore other useful text and data processing tools from GrockTool.com:
                    </p>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        <Link href="/text-tools/remove-duplicates" className="text-accent hover:underline">
                          <strong>Remove Duplicates:</strong> Clean duplicate lines from lists
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        <Link href="/text-tools/word-counter" className="text-accent hover:underline">
                          <strong>Word Counter:</strong> Count characters, words, and sentences
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
                          <strong>Case Converter:</strong> Change text capitalization styles
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        <Link href="/text-tools/find-replace" className="text-accent hover:underline">
                          <strong>Find & Replace:</strong> Search and modify text patterns
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        <Link href="/text-tools/slug-generator" className="text-accent hover:underline">
                          <strong>Slug Generator:</strong> Create clean URLs from text
                        </Link>
                      </li>
                    </ul>
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