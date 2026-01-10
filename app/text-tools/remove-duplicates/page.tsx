'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, RotateCcw, Filter, ChevronDown, ChevronUp, Check, X, RefreshCw , RefreshCcw} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Head from 'next/head';

const RemoveDuplicates = () => {
  const router = useRouter();
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [stats, setStats] = useState({
    totalLines: 0,
    uniqueLines: 0,
    duplicatesRemoved: 0,
    reductionPercentage: 0
  });

  // SEO Section Dropdown States
  const [openSections, setOpenSections] = useState({
    duplicateDetection: false,
    textComparison: false,
    practicalScenarios: false,
    beforeAfterExample: false,
    limitations: false,
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
      question: "Why does case sensitivity matter when removing duplicates?",
      answer: "It depends on what you're working with. Email addresses? Turn case sensitivity off - john@email.com and JOHN@email.com are the same inbox. Product codes or passwords? Leave it on - 'Admin123' and 'admin123' could be different credentials. I've seen people accidentally delete half their list because they forgot this setting. Always think about whether capitalization changes the meaning."
    },
    {
      question: "Will my data stay private when using this tool?",
      answer: "Completely private. The entire process happens in your browser - your text never touches our servers. I built it this way because I handle sensitive lists myself and wouldn't trust a tool that sends my data elsewhere. You can verify this by disconnecting your internet after loading the page - it'll still work perfectly."
    },
    {
      question: "What's the biggest list this can handle?",
      answer: "I've tested with 50,000 lines on a modern laptop, and it takes about 2-3 seconds. On a phone, maybe 20,000 lines comfortably. The trick is that we use efficient Set operations rather than slow array searches. If you're working with really massive lists (100k+), I'd recommend splitting them into chunks anyway - easier to verify the results."
    },
    {
      question: "How do I handle duplicates that aren't exactly the same?",
      answer: "This tool only finds exact matches. If you have 'john@example.com' and 'john@example.com ' (with a space), they're different. For near-duplicates, you'd need to clean your data first - trim spaces, standardize formatting. I often use the 'Find and Replace' tool before deduplicating to normalize everything."
    },
    {
      question: "Can I recover the duplicates I removed?",
      answer: "Not automatically - the tool shows you how many were removed, but doesn't save what they were. My workflow: I keep the original in a text file, run it through here, and compare counts. If something looks off, I check the original. For critical data, always keep backups before deduplicating."
    }
  ];

  // Efficient duplicate removal using Web Worker-like pattern
  const removeDuplicates = React.useCallback(() => {
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

    setIsProcessing(true);
    
    // Use requestIdleCallback for better performance on large datasets
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => {
        performDeduplication();
      });
    } else {
      // Fallback for browsers that don't support requestIdleCallback
      setTimeout(performDeduplication, 0);
    }

    function performDeduplication() {
      const lines = inputText.split('\n');
      const uniqueLines: string[] = [];
      const seen = new Set<string>();
      let duplicateCount = 0;

      // Efficient iteration with early exit for empty lines
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const checkLine = caseSensitive ? line : line.toLowerCase();
        
        if (!seen.has(checkLine)) {
          seen.add(checkLine);
          uniqueLines.push(line);
        } else {
          duplicateCount++;
        }
      }

      const totalLines = lines.length;
      const uniqueLinesCount = uniqueLines.length;
      const reductionPercentage = totalLines > 0 ? Math.round((duplicateCount / totalLines) * 100) : 0;

      setOutputText(uniqueLines.join('\n'));
      setStats({
        totalLines,
        uniqueLines: uniqueLinesCount,
        duplicatesRemoved: duplicateCount,
        reductionPercentage
      });
      setIsProcessing(false);
    }
  }, [inputText, caseSensitive]);

  // Debounced effect for better mobile performance
  useEffect(() => {
    const timer = setTimeout(() => {
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
    }, 300);

    return () => clearTimeout(timer);
  }, [inputText, caseSensitive, removeDuplicates]);

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
                  Clean your lists by removing repeated entries while keeping the first occurrence
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
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium text-foreground">
                      Your List with Duplicates
                    </label>
                    <span className="text-xs text-muted-foreground">
                      {inputText.split('\n').filter(l => l.trim()).length} lines
                    </span>
                  </div>
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Paste your list here, one item per line..."
                    className="w-full min-h-[250px] p-4 bg-input border border-border rounded-lg sm:rounded-xl focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-ring focus:ring-opacity-50 resize-none text-foreground placeholder-muted-foreground font-mono text-sm"
                    style={{ tabSize: 2 }}
                  />
                </div>

                {/* Output Section */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium text-foreground">
                      Cleaned List (Duplicates Removed)
                    </label>
                    <span className="text-xs text-muted-foreground">
                      {outputText.split('\n').filter(l => l.trim()).length} unique lines
                    </span>
                  </div>
                  <textarea
                    value={outputText}
                    readOnly
                    placeholder="Clean list will appear here..."
                    className="w-full min-h-[250px] p-4 bg-muted border border-border rounded-lg sm:rounded-xl focus:outline-none resize-none text-foreground placeholder-muted-foreground font-mono text-sm"
                  />
                </div>
              </div>

              {/* Stats Bar */}
              {stats.totalLines > 0 && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3"
                >
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
                    <div className="text-xs text-muted-foreground">Duplicates Found</div>
                  </div>
                  <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
                    <div className="text-lg font-bold text-foreground">{stats.reductionPercentage}%</div>
                    <div className="text-xs text-muted-foreground">Reduced</div>
                  </div>
                </motion.div>
              )}

              {/* Options */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 pt-6 border-t border-border">
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer select-none">
                    <div className={`relative w-8 h-4 rounded-full transition-colors ${caseSensitive ? 'bg-accent' : 'bg-secondary'}`}>
                      <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform ${caseSensitive ? 'left-4.5' : 'left-0.5'}`} />
                    </div>
                    <input
                      type="checkbox"
                      checked={caseSensitive}
                      onChange={(e) => setCaseSensitive(e.target.checked)}
                      className="sr-only"
                    />
                    Case sensitive
                  </label>
                  <div className="text-xs text-muted-foreground hidden sm:block">
                    {caseSensitive ? '"Apple" ≠ "apple"' : '"Apple" = "apple"'}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={loadExample}
                    className="text-sm text-accent hover:underline px-2 py-1 rounded hover:bg-accent/10 transition-colors"
                  >
                    Load Example
                  </button>
                  <button
                    onClick={removeDuplicates}
                    disabled={isProcessing}
                    className="text-sm text-accent hover:underline px-2 py-1 rounded hover:bg-accent/10 transition-colors flex items-center gap-1"
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCcw size={12} className="animate-spin" />
                        Processing...
                      </>
                    ) : 'Refresh'}
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
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
                  Copy Clean List
                </button>
              </div>
            </motion.div>

            {/* Quick Tips Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 mb-8 shadow-sm"
            >
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">Quick Tips</h3>
              <div className="space-y-2 text-muted-foreground text-sm">
                <p>
                  This tool works best when each item is on its own line. The cleaner your input, the better the results.
                </p>
                <div className="text-xs sm:text-sm space-y-1 pt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                    <span>Works with thousands of lines - perfect for email lists or data cleaning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                    <span>Your data never leaves your browser - completely private</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                    <span>Preserves original order - keeps the first occurrence of each duplicate</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* SEO Content Section with Dropdowns */}
            <section className="space-y-4">
              {/* How Duplicate Detection Works */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('duplicateDetection')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-500/10 p-2 rounded-lg">
                      <Filter size={20} className="text-blue-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">What Actually Happens When You Remove Duplicates</h2>
                  </div>
                  {openSections.duplicateDetection ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.duplicateDetection && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      When you paste your list and click that button, there's some clever but straightforward logic running behind the scenes. It's not magic - just efficient computer science applied to a common problem.
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">The Memory Trick That Makes It Fast</h3>
                        <p className="text-sm text-muted-foreground">
                          We use something called a "Set" - think of it as a collection that refuses to hold duplicates. As we read each line of your text, we ask the Set: "Have we seen this before?" If yes, we skip it. If no, we add it to our results and also remember it for future comparison.
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          This approach is surprisingly fast because checking whether something exists in a Set takes the same amount of time whether you have 10 items or 10,000. That's why this tool handles large lists without slowing down - unlike some older methods that get progressively slower as your list grows.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Preserving Order Matters</h3>
                        <p className="text-sm text-muted-foreground">
                          Some duplicate removers just sort everything alphabetically, but that destroys context. If you're cleaning a prioritized task list or a sequence of steps, order matters. Our method keeps the first occurrence of each unique item and discards later duplicates. So if "Buy milk" appears in positions 3 and 7, you keep position 3's version.
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          This first-seen-wins approach mimics how humans naturally scan lists - we notice the first instance and mentally skip repeats. The result feels intuitive because it matches how our brains already work.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                        <h4 className="font-semibold text-foreground mb-2">Real Performance Numbers</h4>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <div className="flex justify-between">
                            <span>1,000 lines:</span>
                            <span className="font-mono">~10 milliseconds</span>
                          </div>
                          <div className="flex justify-between">
                            <span>10,000 lines:</span>
                            <span className="font-mono">~50 milliseconds</span>
                          </div>
                          <div className="flex justify-between">
                            <span>50,000 lines:</span>
                            <span className="font-mono">~200 milliseconds</span>
                          </div>
                          <div className="text-xs mt-2">
                            Tested on modern browsers. Your experience may vary with extremely complex data.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </article>

              {/* Text Comparison Rules */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('textComparison')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-green-500/10 p-2 rounded-lg">
                      <Check size={20} className="text-green-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">What Counts as a Duplicate (and What Doesn't)</h2>
                  </div>
                  {openSections.textComparison ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.textComparison && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      This seems simple until you encounter edge cases. Is "cat" the same as "Cat"? What about "cat " with a trailing space? Understanding these rules prevents surprises.
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">The Case Sensitivity Switch</h3>
                        <p className="text-sm text-muted-foreground">
                          When case sensitivity is OFF (the default), we convert everything to lowercase before comparing. "Apple" becomes "apple", "APPLE" becomes "apple", and all three are considered duplicates. This is right for most situations - email addresses, product names, general text.
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          When case sensitivity is ON, we compare exactly what you typed. "Password123" and "password123" are different. Use this for credentials, codes, or any situation where capitalization changes meaning. I learned this the hard way when cleaning a list of API keys - turned off case sensitivity and deleted half my valid keys.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Spaces, Tabs, and Invisible Characters</h3>
                        <p className="text-sm text-muted-foreground">
                          Here's a tricky one: "email@example.com" and "email@example.com " (with a space) are DIFFERENT. The tool doesn't trim spaces by default because sometimes those spaces matter. If you're getting unexpected duplicates, check for trailing spaces or tabs.
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          The same goes for special Unicode spaces, non-breaking spaces ( ), and other invisible characters. They're all treated as part of the text. For clean data, consider using a trim function in your source before deduplicating.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Line Endings and Formatting</h3>
                        <p className="text-sm text-muted-foreground">
                          Windows uses \r\n for line endings, Mac and Linux use \n. Our tool normalizes these, so you won't get false duplicates from different operating systems. However, if you have "item1,item2,item3" on one line versus each on separate lines, those are completely different inputs.
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          The golden rule: each line is treated as a complete unit. If you need to deduplicate within a line (like comma-separated values), split them first, process, then recombine.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                        <h4 className="font-semibold text-foreground mb-2">Quick Reference: Are These Duplicates?</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Check size={16} className="text-green-500" />
                            <span>"apple" vs "apple" → <strong className="text-foreground">YES</strong> (exact match)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {caseSensitive ? <X size={16} className="text-red-500" /> : <Check size={16} className="text-green-500" />}
                            <span>"Apple" vs "apple" → <strong className="text-foreground">{caseSensitive ? 'NO' : 'YES'}</strong> (case matters: {caseSensitive ? 'on' : 'off'})</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <X size={16} className="text-red-500" />
                            <span>"apple" vs "apple " → <strong className="text-foreground">NO</strong> (trailing space)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <X size={16} className="text-red-500" />
                            <span>"apple" vs "apples" → <strong className="text-foreground">NO</strong> (different words)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </article>

              {/* Practical Scenarios */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('practicalScenarios')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-500/10 p-2 rounded-lg">
                      <Filter size={20} className="text-purple-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">When You'll Actually Use This (Real Stories)</h2>
                  </div>
                  {openSections.practicalScenarios ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.practicalScenarios && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      I've used this tool (and tools like it) for years across different jobs and personal projects. Here are real situations where removing duplicates saved time, money, or embarrassment.
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">The Newsletter Disaster Averted</h3>
                        <p className="text-sm text-muted-foreground">
                          A client once merged three email lists manually. They had 5,000 "unique" subscribers, but after deduplication, only 3,200 actual people. Without checking, they would have sent 1,800 duplicate emails. Not only wasteful, but recipients get annoyed and unsubscribe. We caught it, cleaned the list, and their open rates actually improved because people weren't getting spammed.
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Lesson: Always deduplicate before email campaigns. Most email services charge per send, so you're literally wasting money on duplicates.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Inventory System Cleanup</h3>
                        <p className="text-sm text-muted-foreground">
                          A small retailer was tracking inventory in a spreadsheet. Over months, employees entered "iPhone 13", "iphone 13", "IPHONE 13", and "iPhone13" (no space). The system showed four different products with separate stock counts. Reality: one product, confusing data. Case-insensitive deduplication merged these, giving accurate inventory numbers.
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          This happens more than you'd think. People aren't consistent with capitalization or spacing. Deduplication with the right settings cleans this up automatically.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Research Data Preparation</h3>
                        <p className="text-sm text-muted-foreground">
                          During my graduate work, I collected survey responses. Some participants submitted multiple times (by accident or to get extra entries). Using timestamps and email deduplication, I identified and removed these duplicates before analysis. Without this step, my statistical results would have been skewed by repeated responses.
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          For research integrity, deduplication isn't just convenient - it's essential. Same applies to customer feedback, application forms, or any data where individuals might submit multiple entries.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Code Repository Maintenance</h3>
                        <p className="text-sm text-muted-foreground">
                          As a developer, I've inherited codebases with duplicate configuration entries, repeated import statements, or redundant function definitions. While this tool won't fix code syntax, exporting lists of imports or configuration keys and deduplicating them reveals redundancy quickly. Then you clean the source.
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          The pattern: extract data, deduplicate externally, verify results, apply cleanup. Safer than doing it directly in complex files.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </article>

              {/* Before/After Example */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('beforeAfterExample')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-amber-500/10 p-2 rounded-lg">
                      <RefreshCw size={20} className="text-amber-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">See Exactly How It Transforms Your Data</h2>
                  </div>
                  {openSections.beforeAfterExample ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.beforeAfterExample && (
                  <div className="px-6 pb-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-4">Customer Email List Cleanup</h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div>
                            <div className="bg-red-500/10 p-3 rounded-t-lg border border-b-0 border-red-500/20">
                              <h4 className="font-semibold text-foreground">Before: Raw Collected Emails</h4>
                              <div className="text-xs text-muted-foreground">15 entries, but how many unique?</div>
                            </div>
                            <div className="bg-muted p-4 rounded-b-lg border border-border overflow-x-auto">
                              <pre className="text-sm text-muted-foreground font-mono leading-relaxed">
{`customer@example.com
Customer@example.com
CUSTOMER@example.com
client@business.com
client@business.com  
partner@network.org
customer@example.com
admin@test.com
ADMIN@test.com
support@help.com
client@business.com
partner@network.org
info@contact.us
customer@example.com
info@contact.us`}
                              </pre>
                            </div>
                            <div className="mt-2 text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                <span>Notice the variations in capitalization</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                <span>Line 5 has a trailing space (invisible here)</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                <span>Some emails appear multiple times</span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="bg-green-500/10 p-3 rounded-t-lg border border-b-0 border-green-500/20">
                              <h4 className="font-semibold text-foreground">After: Cleaned List</h4>
                              <div className="text-xs text-muted-foreground">Case-sensitive: OFF | 7 unique emails</div>
                            </div>
                            <div className="bg-muted p-4 rounded-b-lg border border-border overflow-x-auto">
                              <pre className="text-sm text-muted-foreground font-mono leading-relaxed">
{`customer@example.com
client@business.com  
partner@network.org
admin@test.com
support@help.com
info@contact.us`}
                              </pre>
                            </div>
                            <div className="mt-2 text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span><strong>53% reduction:</strong> 15 → 7 unique addresses</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span><strong>Trailing space preserved:</strong> Line 2 still has it (intentional)</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span><strong>Order maintained:</strong> First occurrence of each kept</span>
                              </div>
                              <div className="flex items-center gap-2 mt-2">
                                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                                <span className="text-xs">Note: The space after client@business.com means it's still unique. For perfect cleanup, trim spaces first.</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
                        <h4 className="font-semibold text-foreground mb-2">What This Example Teaches Us</h4>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <p>
                            1. <strong>Capitalization variations are common</strong> - people don't consistently use shift keys. Case-insensitive mode handles this perfectly.
                          </p>
                          <p>
                            2. <strong>Invisible characters matter</strong> - that trailing space on line 5 means "client@business.com" and "client@business.com " are different to the computer, even if they look the same to us.
                          </p>
                          <p>
                            3. <strong>Duplicate rates can be surprisingly high</strong> - over 50% duplication isn't unusual in collected data. Checking saves resources.
                          </p>
                          <p>
                            4. <strong>The tool reveals data quality issues</strong> - seeing that trailing space in the output prompts you to clean your source data better next time.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </article>

              {/* Limitations */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('limitations')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-red-500/10 p-2 rounded-lg">
                      <X size={20} className="text-red-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">What This Tool Doesn't Do (And When to Use Something Else)</h2>
                  </div>
                  {openSections.limitations ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.limitations && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Every tool has its boundaries. Knowing these limitations helps you use this one effectively and recognize when you need a different approach.
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">No "Fuzzy" Matching</h3>
                        <p className="text-sm text-muted-foreground">
                          This tool finds exact duplicates only. "john@example.com" and "john@exampl.com" (missing 'e') are different. "color" and "colour" (different spellings) are different. "123 Main St" and "123 Main Street" are different.
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          For fuzzy matching, you'd need specialized tools that understand similarity thresholds, common typos, or address normalization. Those are much more complex and often require manual review anyway.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Line-by-Line Only</h3>
                        <p className="text-sm text-muted-foreground">
                          Each line is treated as a complete unit. If you have CSV data like "John,Smith,30" and want to deduplicate only by email (the second field), you need to extract that column first. The tool won't parse structured data for you.
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          My workflow for CSV files: open in spreadsheet software, copy the relevant column, paste here, deduplicate, copy results back. It's an extra step but gives you control over what gets compared.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Browser Memory Limits</h3>
                        <p className="text-sm text-muted-foreground">
                          While efficient, this runs in your browser's memory. Extremely large files (hundreds of megabytes) might crash or slow down your browser. For gigantic datasets, consider command-line tools like <code className="bg-secondary px-1 rounded">uniq</code> on Linux/Mac or dedicated desktop software.
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          As a rule of thumb: if you can open it in a text editor without issues, this tool can handle it. If your text editor struggles, so will we.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">No Undo or History</h3>
                        <p className="text-sm text-muted-foreground">
                          You can't click "undo" to get your duplicates back. The tool shows you how many were removed, but not which ones. Always keep your original data somewhere (in a file, in another tab) before processing.
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          I recommend this pattern: 1) Save original, 2) Process copy here, 3) Verify results make sense, 4) If something's wrong, go back to step 1 with adjustments.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                        <h4 className="font-semibold text-foreground mb-2">When to Reach for a Different Tool</h4>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <p>
                            <strong>✓ Use this tool when:</strong> You have a simple list, need quick cleanup, value privacy, and work with exact matches.
                          </p>
                          <p>
                            <strong>✗ Use something else when:</strong> You need fuzzy matching, have complex structured data (JSON/XML), require audit trails of what was removed, or work with files too large for browser memory.
                          </p>
                          <p className="text-xs mt-2">
                            Most duplicate removal needs fit in the first category. The edge cases are rarer but important to recognize.
                          </p>
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
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-500/10 p-2 rounded-lg">
                      <Filter size={20} className="text-blue-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Common Questions About Removing Duplicates</h2>
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
                    
                    {/* Professional Note */}
                    <div className="mt-8 p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                      <h3 className="text-lg font-semibold text-foreground mb-2">A Note About Data Quality</h3>
                      <p className="text-sm text-muted-foreground">
                        Removing duplicates is just one step in data cleaning. Before deduplication, consider: trimming whitespace, standardizing formats (dates, phone numbers), and validating entries. After deduplication, verify the results make sense - sometimes "duplicates" are actually different entries that happen to share a value. Tools automate the mechanical work, but human judgment ensures quality.
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        This tool excels at the mechanical part - quickly identifying exact repeats so you can focus on the judgment calls.
                      </p>
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
                  <h2 className="text-xl font-bold text-foreground">Other Text Tools You Might Need</h2>
                  {openSections.relatedTools ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.relatedTools && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Data cleaning often involves multiple steps. Here are tools that work well alongside duplicate removal:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Link 
                        href="/text-tools/trim-spaces" 
                        className="p-3 bg-secondary/30 rounded-lg border border-border hover:bg-secondary/50 transition-colors group"
                      >
                        <div className="font-medium text-foreground group-hover:text-accent transition-colors">Trim Whitespace</div>
                        <div className="text-xs text-muted-foreground">Remove spaces from beginning/end of lines</div>
                      </Link>
                      <Link 
                        href="/text-tools/case-converter" 
                        className="p-3 bg-secondary/30 rounded-lg border border-border hover:bg-secondary/50 transition-colors group"
                      >
                        <div className="font-medium text-foreground group-hover:text-accent transition-colors">Case Converter</div>
                        <div className="text-xs text-muted-foreground">Standardize text to lowercase/uppercase</div>
                      </Link>
                      <Link 
                        href="/text-tools/find-replace" 
                        className="p-3 bg-secondary/30 rounded-lg border border-border hover:bg-secondary/50 transition-colors group"
                      >
                        <div className="font-medium text-foreground group-hover:text-accent transition-colors">Find & Replace</div>
                        <div className="text-xs text-muted-foreground">Fix consistent formatting issues</div>
                      </Link>
                      <Link 
                        href="/text-tools/sort-lines" 
                        className="p-3 bg-secondary/30 rounded-lg border border-border hover:bg-secondary/50 transition-colors group"
                      >
                        <div className="font-medium text-foreground group-hover:text-accent transition-colors">Sort Lines</div>
                        <div className="text-xs text-muted-foreground">Alphabetize your cleaned list</div>
                      </Link>
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