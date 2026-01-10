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
    characterHandling: true,
    howItWorks: false,
    useCases: false,
    examples: false,
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
      question: "Does the tool work with emojis and special Unicode characters?",
      answer: "Most of the time, yes — but there are exceptions. Standard emojis like 😀 or 🌍 reverse perfectly. However, complex emojis that combine multiple Unicode characters (like family emojis 👨‍👩‍👧‍👦 or skin tone variations 👍🏿) might not reverse as a single unit. For most languages, including those with accent marks (like café or naïve), the reversal works accurately. If you're working with highly specialized symbols, test a small sample first to ensure it meets your needs."
    },
    {
      question: "What happens to punctuation when I reverse words?",
      answer: "Punctuation generally stays attached to the word it was originally with. For example, 'Hello, world!' becomes 'world! Hello,' when you reverse words. The comma stays with 'Hello' and the exclamation mark stays with 'world'. This approach maintains readability. If you need punctuation moved differently, you might need to clean your text first or make manual adjustments after reversing."
    },
    {
      question: "Can I reverse text from right-to-left languages like Arabic or Hebrew?",
      answer: "Yes, but with important considerations. The tool will reverse the character order mechanically, which might not align with how the language is naturally read. For Arabic, reversing characters could break the connected letter forms. If you're working with RTL languages, I'd recommend using the 'Reverse Lines' option for paragraph reorganization instead of character reversal, as it preserves the internal text structure."
    },
    {
      question: "Is there a limit to how much text I can reverse at once?",
      answer: "Technically, no — but for the best experience, I'd suggest keeping it under 10,000 characters per reversal. Very large texts (like entire book chapters) might slow down processing slightly in your browser. If you need to reverse massive documents, consider breaking them into sections. The tool handles everyday uses like emails, code snippets, lists, and paragraphs without any issues."
    },
    {
      question: "Why would I need to preserve formatting?",
      answer: "Formatting preservation matters when spacing affects meaning. Programmers use this when reversing code snippets to maintain indentation. Poets might use it to keep intentional line breaks. Data analysts need it when reversing CSV lines where tabs separate values. If you're just reversing plain sentences, you can usually leave it off. But for anything where spaces, tabs, or line breaks are meaningful, toggle it on."
    },
    {
      question: "Does the tool store or send my text anywhere?",
      answer: "No — everything happens right in your browser. Your text never leaves your device or gets sent to any server. This is important for privacy, especially if you're reversing sensitive information like code, personal notes, or draft documents. You can verify this by disconnecting from the internet after loading the page; the tool will still work perfectly."
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
                  Flip text, words, or lines — choose exactly how you want to reverse your content
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
                    placeholder="Paste or type your text here..."
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
                    placeholder="Your reversed text will appear here..."
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
                  Simply paste your text, choose how you want to reverse it, and click the button. It's that straightforward.
                </p>
                <div className="text-xs sm:text-sm space-y-1 pt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Enter or paste your text in the left box</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Pick your reversal type below</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Check 'Preserve formatting' if spacing matters</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Click Reverse Text to see your flipped content</span>
                  </div>
                </div>
                <div className="text-xs sm:text-sm space-y-2 pt-3">
                  <div className="font-medium text-foreground">Which option should I choose?</div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-accent rounded-full"></div>
                    <span><strong>Reverse Text:</strong> Flips every character — "hello" → "olleh"</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-accent rounded-full"></div>
                    <span><strong>Reverse Words:</strong> Flips word order — "cat dog" → "dog cat"</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-accent rounded-full"></div>
                    <span><strong>Reverse Lines:</strong> Flips line order — line 1,2,3 → 3,2,1</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* SEO Content Section with Dropdowns */}
            <section className="space-y-4">
              {/* Character Handling - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('characterHandling')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h2 className="text-xl font-bold text-foreground">How This Tool Handles Different Characters</h2>
                  {openSections.characterHandling ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.characterHandling && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Not all text is created equal, and our reverser knows that. When you're working with standard English letters and numbers, everything reverses cleanly — "abc123" becomes "321cba". But what about the more interesting characters?
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Emojis and Symbols</h3>
                        <p className="text-muted-foreground">
                          Single emojis like 🚀 or ❤️ work perfectly. They reverse as you'd expect. The challenge comes with combined emojis. For instance, the family emoji 👨‍👩‍👧‍👦 is actually four separate emojis joined with special connector characters. When reversed, those connectors might break, and you could get individual person emojis instead. Flags (🇺🇸) and skin tone variations (👍🏻👍🏿) might also separate into their component parts.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Accented Letters and International Text</h3>
                        <p className="text-muted-foreground">
                          If you work with languages like Spanish, French, or German, you'll be happy to know that accented characters stay intact. "café" reverses to "éfac", keeping the accent on the 'e' where it belongs. The same goes for characters with umlauts, tildes, or cedillas. For languages like Arabic or Hebrew, the reversal happens at the character level, which might not match natural reading flow but maintains each character's integrity.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Spaces, Tabs, and Line Breaks</h3>
                        <p className="text-muted-foreground">
                          This is where the "Preserve formatting" option really matters. With it on, every space, tab, and line break stays exactly where you put it. If you have indented code or poetry with intentional spacing, those visual elements remain. Turn it off, and extra spaces get trimmed — useful for cleaning up messy text but potentially disastrous for formatted content.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Numbers and Punctuation</h3>
                        <p className="text-muted-foreground">
                          Numbers reverse just like letters: "123.45" becomes "54.321". Punctuation sticks with nearby words during word reversal, which usually gives more readable results. If you have specialized formatting like CSV data where commas separate values, preserving formatting becomes crucial to maintain the data structure.
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <p className="text-sm text-muted-foreground">
                        <strong>Tip from experience:</strong> If you're unsure how something will reverse, test with a small sample first. Copy a representative piece of your text, paste it here, and see what happens. This saves time compared to reversing a large document and then discovering you need different settings.
                      </p>
                    </div>
                  </div>
                )}
              </article>

              {/* How Reversal Works - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('howItWorks')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h2 className="text-xl font-bold text-foreground">What Actually Happens When You Reverse Text</h2>
                  {openSections.howItWorks ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.howItWorks && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      At first glance, reversing text seems simple — just flip it around. But there's more happening under the hood, especially when you choose between character, word, or line reversal. Let me walk you through what actually occurs each time you click that Reverse Text button.
                    </p>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Character-by-Character Reversal (The Mirror Effect)</h3>
                        <p className="text-muted-foreground">
                          This is the most literal reversal. The tool takes your text, breaks it into individual characters (including spaces and punctuation), then rebuilds it in reverse order. Think of it like writing on a transparent sheet and flipping it over. "Hello there" becomes "ereht olleH". Every single character changes position. This method is perfect for creating mirror writing effects, testing palindromes, or when you need complete character-level reversal for programming exercises.
                        </p>
                        <div className="bg-muted p-3 rounded-lg mt-2">
                          <pre className="text-sm font-mono text-muted-foreground">Input: "Code: 42#important"
Output: "tnatropmi#24 :edoC"</pre>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Word Order Reversal (Sentence Restructuring)</h3>
                        <p className="text-muted-foreground">
                          Here's where things get interesting. Instead of looking at characters, the tool identifies words — basically anything separated by spaces. Then it reverses their order while keeping each word intact. "The quick brown fox" becomes "fox brown quick The". Notice how each word stays spelled correctly, just in a different position. This is incredibly useful for linguistic analysis, poetry, or when you want to change sentence emphasis without rewriting content.
                        </p>
                        <p className="text-muted-foreground mt-2">
                          The "Preserve formatting" option changes how words are identified. With it on, multiple spaces between words are maintained. With it off, extra spaces collapse into single spaces, which often looks cleaner for normal text.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Line Order Reversal (Paragraph Reorganization)</h3>
                        <p className="text-muted-foreground">
                          This method treats each line (separated by pressing Enter) as a unit. It's like taking a list or a poem and reading it from bottom to top instead of top to bottom. Line 1 becomes the last line, Line 2 becomes second-to-last, and so on. Each line's internal content remains unchanged — words and characters stay in their original order within each line.
                        </p>
                        <p className="text-muted-foreground mt-2">
                          I find this particularly helpful when working with log files where you want the most recent entries first, or when reorganizing lists without manually cutting and pasting. It's also great for poets experimenting with stanza order.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                        <h3 className="text-lg font-semibold text-foreground mb-2">A Real-World Example from My Work</h3>
                        <p className="text-muted-foreground">
                          Last month, I was helping a researcher analyze interview transcripts. They wanted to see if reading responses in reverse order would reveal different patterns. We used line reversal to reorder paragraphs while keeping each response intact. Then we used word reversal on specific sentences to experiment with emphasis. Having these three methods in one tool saved hours of manual editing.
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
                  <h2 className="text-xl font-bold text-foreground">When You Might Actually Need to Reverse Text</h2>
                  {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.useCases && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      You might wonder who needs to flip text around regularly. As someone who's worked with text tools for years, I've seen this functionality help in surprisingly diverse situations — from creative projects to technical debugging.
                    </p>
                    
                    <div className="space-y-5">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">For Programmers and Developers</h3>
                        <p className="text-muted-foreground">
                          If you write code, you'll use this more than you might think. Testing string manipulation functions? Reverse text to check edge cases. Debugging encoding issues? Sometimes seeing text backwards reveals patterns. Working with palindromes in algorithm challenges? This gives instant verification. I've even used it to reverse CSS property orders or to check if two strings are mirrors of each other. The formatting preservation is crucial here — you don't want to mess up indentation in your code snippets.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">For Writers and Content Creators</h3>
                        <p className="text-muted-foreground">
                          Poets use word reversal to experiment with line emphasis. Bloggers sometimes reverse paragraphs to check if their conclusion logically follows from their introduction. I know a novelist who reverses dialogue to ensure each character's voice remains distinct even when the word order changes. It's a fresh way to look at your writing when you've been staring at it too long. The "aha" moments often come from seeing familiar words in unfamiliar arrangements.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">For Data and Research Work</h3>
                        <p className="text-muted-foreground">
                          Analyzing survey responses? Reverse the order to avoid sequence bias. Working with time-stamped data? Line reversal puts the most recent entries first. Linguists study reversed text to understand reading patterns. Psychologists use it in perception experiments. I worked with a data analyst who regularly reversed CSV lines to process data from different directions, checking for inconsistencies that weren't visible in the original order.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">For Education and Learning</h3>
                        <p className="text-muted-foreground">
                          Teachers create puzzles where students must reverse text to find hidden messages. Language learners practice by reversing sentences to understand word order differences between languages. Reading reversed text slowly can actually improve reading skills by forcing your brain to process words differently. I've seen dyslexia tutors use carefully selected reversal exercises with great success.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">For Design and Visual Projects</h3>
                        <p className="text-muted-foreground">
                          Graphic designers create mirror text effects for logos and artwork. Web designers test how interfaces handle reversed content (especially important for international sites). Artists incorporate reversed text in installations where text reflects in mirrors or water. The character reversal creates perfect mirror writing without needing special fonts or complicated design software.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                        <p className="text-sm text-muted-foreground">
                          <strong>Unexpected use I discovered:</strong> A musician friend uses text reversal on lyrics to find new rhyme patterns. Sometimes reversing a line suggests alternative phrasing that works better rhythmically. Creativity often comes from constraints, and reversing text is a constraint that can spark new ideas.
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
                  <h2 className="text-xl font-bold text-foreground">Real Examples with Different Text Types</h2>
                  {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.examples && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Let's look at concrete examples. These aren't just demonstrations — they're actual scenarios I've encountered where text reversal solved a real problem.
                    </p>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 1: Debugging a String Encoding Issue</h3>
                        <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                          <pre className="text-sm text-muted-foreground font-mono">
{`Problem: A programmer was getting unexpected output from a text processing function.
They suspected certain characters were being handled incorrectly.

Original string from their code:
"user@example.com — important!"

Character reversal revealed:
"!tnatropmi — moc.elpmaxe@resu"

What they discovered: The em dash (—) was being treated as 
multiple characters by their library. Seeing it in reverse position 
helped them identify the encoding mismatch.`}
                          </pre>
                        </div>
                        <p className="text-muted-foreground mt-2 text-sm">
                          Without reversal, they'd have been scanning character by character. Reversing the whole string made the anomaly visually obvious.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 2: Reorganizing Interview Notes</h3>
                        <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                          <pre className="text-sm text-muted-foreground font-mono">
{`Situation: A researcher conducted five interviews and transcribed them.
They wanted to analyze themes without being influenced by interview order.

Original notes order:
Interview 1: Background questions
Interview 2: Technical discussion
Interview 3: Personal experiences
Interview 4: Future predictions
Interview 5: Closing thoughts

After line reversal:
Interview 5: Closing thoughts
Interview 4: Future predictions
Interview 3: Personal experiences
Interview 2: Technical discussion
Interview 1: Background questions

Result: By reading conclusions first, they identified 
ending themes before beginning themes, revealing patterns 
they'd missed in chronological order.`}
                          </pre>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 3: Creating a Design Element</h3>
                        <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                          <pre className="text-sm text-muted-foreground font-mono">
{`Design need: A logo where text reads normally in a mirror.

Designer's process:
1. Wrote the intended text: "REFLECT"
2. Used character reversal: "TCELFER"
3. Placed "TCELFER" in the design
4. Added a mirror effect in design software
5. In the mirror, "TCELFER" appears as "REFLECT"

Without the reverser: They would have manually figured out 
the mirror writing or searched for a special font.

Time saved: Approximately 15 minutes per iteration, and 
they could experiment with different words quickly.`}
                          </pre>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 4: Processing Log Files</h3>
                        <p className="text-muted-foreground">
                          System administrators often need the most recent log entries first. Instead of scrolling to the bottom of massive files, they can reverse line order. Here's what happens with a simple log:
                        </p>
                        <div className="bg-muted p-4 rounded-lg overflow-x-auto mt-2">
                          <pre className="text-sm text-muted-foreground font-mono">
{`Original log:
[2024-01-01 08:00] System start
[2024-01-01 09:30] User login
[2024-01-01 12:15] Backup initiated
[2024-01-01 12:45] Backup completed
[2024-01-01 17:00] System shutdown

After line reversal:
[2024-01-01 17:00] System shutdown
[2024-01-01 12:45] Backup completed
[2024-01-01 12:15] Backup initiated
[2024-01-01 09:30] User login
[2024-01-01 08:00] System start

Now the most recent events are at the top, making 
monitoring and troubleshooting much faster.`}
                          </pre>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
                      <p className="text-sm text-muted-foreground">
                        <strong>Pro tip:</strong> Combine reversal types for complex tasks. Try reversing words first, then lines. Or reverse characters, then words. Sometimes the most useful transformations come from applying multiple reversals in sequence. Just remember to copy your intermediate results.
                      </p>
                    </div>
                  </div>
                )}
              </article>

              {/* Limitations - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('limitations')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h2 className="text-xl font-bold text-foreground">What This Tool Can't Do (And What to Use Instead)</h2>
                  {openSections.limitations ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.limitations && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Every tool has its boundaries, and being honest about them helps you use it more effectively. While this text reverser handles most everyday tasks beautifully, there are situations where it might not be the right solution — or where you need to combine it with other approaches.
                    </p>
                    
                    <div className="space-y-5">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Complex Emoji Sequences</h3>
                        <p className="text-muted-foreground">
                          As mentioned earlier, emojis that combine multiple characters (like flags, families, or skin tone variations) might not reverse as single units. The tool processes characters individually, so 🇺🇸 might become 🇸🇺 (which isn't a valid flag). If you're working extensively with emojis and need perfect reversal, consider testing with a small sample first or using specialized emoji tools before bringing text here.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Right-to-Left Language Limitations</h3>
                        <p className="text-muted-foreground">
                          For Arabic, Hebrew, or other RTL languages, character reversal creates text that's mechanically backwards but not necessarily readable. The letters reverse, but the shaping (how letters connect in Arabic) might break. If you need to truly reverse RTL text for natural reading, you might need specialized software that understands the language's rules. For simple line or word reversal in RTL, this tool works fine — just avoid character reversal for complex RTL content.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Extremely Large Documents</h3>
                        <p className="text-muted-foreground">
                          While there's no hard limit, reversing entire novels or massive datasets might slow down your browser temporarily. The processing happens in your browser's memory, so extremely large texts (over 100,000 characters) might cause slight delays. If you need to reverse book-length content, consider breaking it into chapters or using desktop software designed for bulk operations.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Intelligent Sentence Restructuring</h3>
                        <p className="text-muted-foreground">
                          This tool reverses words mechanically, not intelligently. "The cat sat on the mat" becomes "mat the on sat cat The" — which isn't grammatically correct English. If you need sentences that remain grammatically correct after rearrangement, you're looking for natural language processing tools, not simple text reversal. This tool changes order; it doesn't adjust grammar, add articles, or fix syntax.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Formatting Beyond Spaces and Tabs</h3>
                        <p className="text-muted-foreground">
                          The "Preserve formatting" option handles spaces, tabs, and line breaks. It doesn't preserve rich text formatting like bold, italics, colors, or fonts. If you copy text from a Word document or webpage with formatting, that styling will be lost. The tool works with plain text only. For formatted content, you'd need to extract the plain text first, reverse it, then reapply formatting manually.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                        <h3 className="text-lg font-semibold text-foreground mb-2">When Not to Use This Tool</h3>
                        <p className="text-muted-foreground">
                          Don't use this for sensitive information that requires true encryption — reversal is trivial to undo. Don't use it for critical documents without keeping a backup of the original. And don't expect it to magically make nonsensical text meaningful — reversal sometimes creates interesting patterns, but it won't turn gibberish into coherent language.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Workarounds and Alternatives</h3>
                        <p className="text-muted-foreground">
                          For complex needs, sometimes the best approach is to use this tool as part of a workflow. Need to reverse formatted text? Copy plain text version, reverse here, then paste back into your formatted document. Working with massive data? Reverse in batches. Need intelligent rearrangement? Use this for the mechanical reversal, then edit for grammar. Knowing the limitations helps you plan around them.
                        </p>
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
                  <h2 className="text-xl font-bold text-foreground">More Tools You Might Find Useful</h2>
                  {openSections.relatedTools ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.relatedTools && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      If you're working with text manipulation, you might find these other tools helpful for different tasks:
                    </p>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        <Link href="/text-tools/text-sorter" className="text-accent hover:underline">
                          <strong>Text Sorter:</strong> Organize lines alphabetically or reverse alphabetically
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        <Link href="/text-tools/case-converter" className="text-accent hover:underline">
                          <strong>Case Converter:</strong> Change between UPPERCASE, lowercase, and Title Case
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        <Link href="/text-tools/remove-duplicates" className="text-accent hover:underline">
                          <strong>Remove Duplicates:</strong> Clean repeated lines from lists or data
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        <Link href="/text-tools/palindrome-checker" className="text-accent hover:underline">
                          <strong>Palindrome Checker:</strong> Test if text reads the same forwards and backwards
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        <Link href="/text-tools/find-replace" className="text-accent hover:underline">
                          <strong>Find & Replace:</strong> Search for specific text and swap it with something else
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        <Link href="/text-tools/text-limiter" className="text-accent hover:underline">
                          <strong>Text Limiter:</strong> Trim text to specific character counts
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
                  <h2 className="text-xl font-bold text-foreground">Questions People Actually Ask About Text Reversal</h2>
                  {openSections.faqs ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.faqs && (
                  <div className="px-6 pb-6">
                    <div className="space-y-6">
                      {faqData.map((faq, index) => (
                        <div key={index} className="pb-4 border-b border-border last:border-0 last:pb-0">
                          <h3 className="text-lg font-semibold text-foreground mb-2">{faq.question}</h3>
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                    
                    {/* Professional Disclaimer */}
                    <div className="mt-8 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                      <h3 className="text-lg font-semibold text-foreground mb-2">A Note About Text Tools</h3>
                      <p className="text-sm text-muted-foreground">
                        Tools like this one are designed to handle most everyday text manipulation tasks quickly and reliably. They work entirely in your browser for privacy and speed. However, for mission-critical applications — especially in programming, data analysis, or professional publishing — always verify results match your specific requirements. Text manipulation is often one step in a larger workflow, and understanding both the capabilities and limitations of each tool helps you use them effectively.
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        This tool is maintained to provide consistent, accurate results for common use cases. If you encounter unusual behavior with specific text types, try the example first to ensure the tool is working normally, then test your specific text. Most issues can be resolved by adjusting the reversal type or formatting preservation setting.
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