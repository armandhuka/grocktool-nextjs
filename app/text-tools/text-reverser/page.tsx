'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, RotateCcw, ChevronDown, ChevronUp, ArrowRightLeft, TextCursor, ListOrdered, AlignLeft } from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';

const TextReverser = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [reverseType, setReverseType] = useState<'text' | 'words' | 'lines'>('text');
  const [preserveFormatting, setPreserveFormatting] = useState(false);

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
      question: "What's the difference between reversing text, words, and lines?",
      answer: "Text reversal reverses character-by-character: 'hello' becomes 'olleh'. Word reversal reverses word order: 'hello world' becomes 'world hello'. Line reversal reverses line order: lines 1,2,3 become 3,2,1. Text reversal is for character manipulation, word reversal changes sentence structure, line reversal reorganizes paragraphs or lists. Each serves different purposes in text processing and analysis."
    },
    {
      question: "Does the text reverser handle Unicode characters and emojis?",
      answer: "Yes, our text reverser properly handles Unicode characters, emojis, and special symbols. However, some complex emojis (like skin tone modifiers or flag emojis) may not reverse perfectly due to their multi-character nature. For standard text in any language (including right-to-left languages), the reversal works accurately. The tool preserves character integrity while applying the selected reversal method."
    },
    {
      question: "What is the 'Preserve Formatting' option and when should I use it?",
      answer: "The 'Preserve Formatting' option maintains spaces, tabs, and indentation during reversal. With this ON: '  hello  world' reverses to '  dlrow  olleh'. With this OFF: extra spaces may be normalized. Use this option when working with code, formatted text, or documents where whitespace matters. For plain text processing, you can usually leave it OFF for cleaner results."
    },
    {
      question: "Can I reverse text with numbers and special characters?",
      answer: "Yes, the reverser handles all characters including numbers, punctuation, and symbols. Numbers reverse as part of the text: '123abc' becomes 'cba321'. Special characters maintain their positions relative to the reversal type. For word reversal: 'Hello, world!' becomes 'world! Hello,'. The tool processes all characters while maintaining text structure according to your selected reversal type."
    },
    {
      question: "What are some practical applications of text reversal?",
      answer: "Text reversal has many practical uses: creating mirror text for design, testing string manipulation in programming, analyzing palindromes, preparing content for right-to-left languages, obfuscating text temporarily, testing user interfaces, creating puzzles or games, and data processing where reverse order analysis is needed. Each reversal type serves different professional and creative purposes."
    }
  ];

  const reverseText = () => {
    if (!inputText.trim()) {
      setOutputText('');
      return;
    }

    let result = '';
    switch (reverseType) {
      case 'text':
        if (preserveFormatting) {
          result = inputText.split('').reverse().join('');
        } else {
          result = inputText.trim().split('').reverse().join('');
        }
        break;
      case 'words':
        const words = preserveFormatting ? inputText.split(/(\s+)/) : inputText.split(/\s+/);
        result = words.reverse().join(preserveFormatting ? '' : ' ');
        break;
      case 'lines':
        const lines = inputText.split('\n');
        result = lines.reverse().join('\n');
        break;
      default:
        result = inputText;
    }

    setOutputText(result);
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
    const example = `Hello World!
This is a sample text.
Reverse me in different ways.
Try all three reversal types.`;
    setInputText(example);
  };

  const reverseOptions = [
    { 
      type: 'text', 
      label: 'Reverse Text', 
      description: 'Reverse character by character',
      icon: <TextCursor size={16} />
    },
    { 
      type: 'words', 
      label: 'Reverse Words', 
      description: 'Reverse word order',
      icon: <AlignLeft size={16} />
    },
    { 
      type: 'lines', 
      label: 'Reverse Lines', 
      description: 'Reverse line order',
      icon: <ListOrdered size={16} />
    }
  ];

  return (
    <>
      <Head>
        <title>Text Reverser | Free Online Text Reverse Tool - GrockTool.com</title>
        <meta name="description" content="Reverse text, words, or lines with our free online text reverser. Choose between character, word, or line reversal with formatting preservation options." />
        <meta name="keywords" content="text reverser, reverse text, reverse words, reverse lines, text reverse tool, string reverser, word reverser, line reverser, text manipulation, reverse order" />
        <meta property="og:title" content="Text Reverser | Free Online Text Reverse Tool - GrockTool.com" />
        <meta property="og:description" content="Instantly reverse text character-by-character, reverse word order, or reverse line order with our versatile text reverser tool. Perfect for programming, data processing, and creative projects." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Text Reverser - GrockTool.com" />
        <meta name="twitter:description" content="Free online tool to reverse text, words, or lines with multiple reversal options." />
        <link rel="canonical" href="https://grocktool.com/text-tools/text-reverser" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Text Reverser Tool",
            "applicationCategory": "TextManipulationApplication",
            "operatingSystem": "Any",
            "description": "Free online text reverser to reverse text character-by-character, reverse word order, or reverse line order with formatting options",
            "url": "https://grocktool.com/text-tools/text-reverser",
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
              "Character-by-character text reversal",
              "Word order reversal",
              "Line order reversal",
              "Formatting preservation",
              "Unicode character support",
              "Real-time processing"
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
                  Text Reverser
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Reverse text, words, or lines based on your preference
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
                    Reversed Text
                  </label>
                  <textarea
                    value={outputText}
                    readOnly
                    placeholder="Reversed text will appear here..."
                    className="w-full min-h-[250px] p-4 bg-muted border border-border rounded-lg sm:rounded-xl focus:outline-none resize-none text-foreground placeholder-muted-foreground"
                  />
                </div>
              </div>

              {/* Reverse Type Options */}
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <h4 className="text-sm font-medium text-foreground">Choose reverse type:</h4>
                  <label className="flex items-center gap-2 text-sm text-foreground">
                    <input
                      type="checkbox"
                      checked={preserveFormatting}
                      onChange={(e) => setPreserveFormatting(e.target.checked)}
                      className="w-4 h-4 text-accent bg-input border-border rounded focus:ring-accent focus:ring-2"
                    />
                    Preserve formatting (spaces, tabs)
                  </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {reverseOptions.map((option) => (
                    <label
                      key={option.type}
                      className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        reverseType === option.type
                          ? 'border-accent bg-accent/10'
                          : 'border-border hover:border-accent/50 hover:bg-secondary/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="reverseType"
                        value={option.type}
                        checked={reverseType === option.type}
                        onChange={(e) => setReverseType(e.target.value as 'text' | 'words' | 'lines')}
                        className="mt-1 w-4 h-4 text-accent bg-input border-border focus:ring-accent focus:ring-2"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 font-medium text-foreground text-sm">
                          {option.icon}
                          {option.label}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">{option.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  onClick={reverseText}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent text-accent-foreground rounded-lg sm:rounded-xl hover:bg-accent/80 transition-colors text-sm sm:text-base"
                >
                  <ArrowRightLeft size={16} className="sm:w-4 sm:h-4" />
                  Reverse Text
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
                  Reverse your text in different ways based on your needs.
                </p>
                <div className="text-xs sm:text-sm space-y-1 pt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Enter your text in the input area</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Choose the type of reversal you want to perform</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Click "Reverse Text" to process your content</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Copy the result or use it as needed</span>
                  </div>
                </div>
                <div className="text-xs sm:text-sm space-y-2 pt-3">
                  <div className="font-medium text-foreground">Reverse Types:</div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-accent rounded-full"></div>
                    <span><strong>Reverse Text:</strong> Reverses character by character</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-accent rounded-full"></div>
                    <span><strong>Reverse Words:</strong> Reverses the order of words</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-accent rounded-full"></div>
                    <span><strong>Reverse Lines:</strong> Reverses the order of lines</span>
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
                  <h2 className="text-xl font-bold text-foreground">Text Reverser Tool - What It Does</h2>
                  {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.whatItDoes && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      This free online text reverser provides three distinct reversal methods for processing text in different ways. The tool can reverse text character-by-character (creating mirror text), reverse the order of words within sentences (changing sentence structure), or reverse the order of lines (reorganizing paragraphs or lists). Each method serves specific purposes in text manipulation, data processing, programming, and creative projects.
                    </p>
                    <p className="text-muted-foreground">
                      With advanced formatting preservation options, the tool maintains spaces, tabs, and indentation during reversal—crucial for working with code, formatted documents, or data files. Whether you're testing string manipulation algorithms, creating artistic text effects, reorganizing content, or analyzing text patterns, this reverser delivers precise, reliable results with the flexibility to handle different text structures and formatting requirements.
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
                  <h2 className="text-xl font-bold text-foreground">Practical Use Cases for Text Reversal</h2>
                  {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.useCases && (
                  <div className="px-6 pb-6">
                    <ul className="space-y-3 text-muted-foreground pl-5">
                      <li className="pl-2">
                        <strong className="text-foreground">Programming & Software Development</strong>
                        <p className="mt-1">Test string manipulation functions, reverse arrays/lists, debug text processing algorithms, and prepare data for specific algorithms that require reversed input.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Data Analysis & Processing</strong>
                        <p className="mt-1">Reverse data sequences for time-series analysis, process log files in reverse chronological order, and prepare datasets for specific analytical methods.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Creative Design & Art Projects</strong>
                        <p className="mt-1">Create mirror text for graphic designs, generate artistic patterns with reversed text, and prepare text for special visual effects in digital artwork.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Language & Linguistics Research</strong>
                        <p className="mt-1">Analyze palindrome structures, study text patterns in different languages, and experiment with right-to-left text processing for linguistic research.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Content Management & Organization</strong>
                        <p className="mt-1">Reverse list orders, reorganize document sections, prepare content for different display formats, and manage text data in various arrangements.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Education & Learning Tools</strong>
                        <p className="mt-1">Create puzzles and brain teasers, develop language learning exercises, demonstrate text manipulation concepts, and generate educational materials.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Security & Obfuscation</strong>
                        <p className="mt-1">Temporarily obfuscate sensitive text, create simple encoding methods for basic security exercises, and demonstrate text transformation principles.</p>
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
                  <h2 className="text-xl font-bold text-foreground">How to Reverse Text Effectively</h2>
                  {openSections.howToUse ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.howToUse && (
                  <div className="px-6 pb-6">
                    <ol className="space-y-4 text-muted-foreground pl-5">
                      <li className="pl-2">
                        <strong className="text-foreground">Select Your Text</strong>
                        <p className="mt-1">Paste or type the text you want to reverse. The tool handles single lines, multi-line content, paragraphs, and formatted text with equal efficiency.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Choose Reversal Method</strong>
                        <p className="mt-1">Select between character reversal (mirror text), word reversal (sentence restructuring), or line reversal (paragraph reorganization) based on your needs.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Set Formatting Options</strong>
                        <p className="mt-1">Enable "Preserve formatting" when working with code, indented text, or documents where spaces and tabs need to be maintained during reversal.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Apply Reversal</strong>
                        <p className="mt-1">Click "Reverse Text" to process your content. The tool instantly applies the selected reversal method while respecting your formatting preferences.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Review Results</strong>
                        <p className="mt-1">Check the output for accuracy. For complex text with special formatting, verify that the reversal maintains the intended structure and spacing.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Export or Reuse</strong>
                        <p className="mt-1">Copy the reversed text to your clipboard, or use the cleared input field to start a new reversal. Chain multiple reversals for complex transformations.</p>
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
                  <h2 className="text-xl font-bold text-foreground">Text Reversal Examples & Applications</h2>
                  {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.examples && (
                  <div className="px-6 pb-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 1: Character-by-Character Reversal</h3>
                        <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                          <pre className="text-sm text-muted-foreground font-mono">
{`Input Text:
"Hello, World! Welcome to text reversal."

Character Reversal (Preserve Formatting: OFF):
".lasrever txet ot emocleW !dlroW ,olleH"

Character Reversal (Preserve Formatting: ON):
".lasrever txet ot emocleW !dlroW ,olleH"

Application:
• Creating mirror text for design
• Testing palindrome detection
• Simple text obfuscation
• Demonstrating string manipulation`}
                          </pre>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 2: Word Order Reversal</h3>
                        <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                          <pre className="text-sm text-muted-foreground font-mono">
{`Input Text:
"The quick brown fox jumps over the lazy dog"

Word Reversal:
"dog lazy the over jumps fox brown quick The"

Application:
• Changing sentence structure
• Creating poetic or artistic effects
• Testing natural language processing
• Analyzing sentence patterns
• Preparing text for specific algorithms

Note: Punctuation stays with its original word.`}
                          </pre>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 3: Line Order Reversal with Formatting</h3>
                        <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                          <pre className="text-sm text-muted-foreground font-mono">
{`Input Text:
Line 1: First item
Line 2: Second item
Line 3: Third item
    Indented sub-item
Line 4: Fourth item

Line Reversal:
Line 4: Fourth item
    Indented sub-item
Line 3: Third item
Line 2: Second item
Line 1: First item

Application:
• Reversing log file entries
• Changing list order
• Reorganizing document sections
• Processing data in reverse sequence
• Maintaining hierarchical formatting`}
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
                  <h2 className="text-xl font-bold text-foreground">Related Text & Manipulation Tools</h2>
                  {openSections.relatedTools ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.relatedTools && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Explore other useful text and manipulation tools from GrockTool.com:
                    </p>
                    <ul className="space-y-3 text-muted-foreground">
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
                        <Link href="/text-tools/remove-duplicates" className="text-accent hover:underline">
                          <strong>Remove Duplicates:</strong> Remove duplicate lines from text
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        <Link href="/text-tools/palindrome-checker" className="text-accent hover:underline">
                          <strong>Palindrome Checker:</strong> Check if text reads the same forwards and backwards
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
                  <h2 className="text-xl font-bold text-foreground">Frequently Asked Questions About Text Reversal</h2>
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
                      <h3 className="text-lg font-semibold text-foreground mb-2">Text Manipulation Disclaimer</h3>
                      <p className="text-sm text-muted-foreground">
                        This text reverser uses standard text manipulation algorithms for reversing character sequences, word orders, and line arrangements. While the tool handles most text formats accurately, some complex Unicode characters, combined emojis, or special text formatting may not reverse perfectly. For critical applications, especially in programming or data processing, always verify reversed results match your specific requirements. The tool is designed for productivity and convenience but should be used as part of a comprehensive text validation process.
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

export default TextReverser;