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
    palindromeConcept: true,
    checkingLogic: false,
    educationalUses: false,
    examples: false,
    inputRules: false,
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
      question: "Do spaces and punctuation affect palindrome checking?",
      answer: "They can, depending on your settings. The classic palindrome 'A man, a plan, a canal: Panama!' only works if you ignore spaces and punctuation. That's why we include those options — so you can choose whether to treat them as part of the text or remove them. For most phrase palindromes, you'll want both options enabled. For single words like 'racecar', they don't matter much."
    },
    {
      question: "Why would someone disable 'ignore case'?",
      answer: "Sometimes case sensitivity matters. Maybe you're checking programming code where 'Racecar' and 'racecaR' should be different. Or perhaps you're designing a logo where the visual appearance of uppercase vs lowercase letters is important. Most of the time, you'll want case ignored for language palindromes, but having the option gives you control for specific situations."
    },
    {
      question: "Can numbers or dates be palindromes?",
      answer: "Absolutely! Numbers like 12321 or 1991 are perfect palindromes. Dates too — 02/02/2020 reads the same forwards and backwards (if you write it that way). The tool works with any characters, including digits. Just remember that punctuation (like slashes in dates) will be removed if you have that option enabled, which might affect the result."
    },
    {
      question: "What's the longest possible palindrome?",
      answer: "In theory, there's no limit — but practically, very long palindromes are rare because they're difficult to construct meaningfully. The longest known English palindrome sentence is over 15,000 words! Our tool can handle surprisingly long text, though extremely long inputs might slow down slightly. For normal use — words, phrases, even paragraphs — you won't hit any limits."
    },
    {
      question: "Does the tool work with other languages?",
      answer: "It works with any language that uses characters our system can process. For languages with accents (like café in French or naïve in English), the accents stay with their letters during reversal. For right-to-left languages like Arabic, the reversal happens mechanically — characters reverse order, but the result might not be naturally readable in that language. Test with a sample if you're working with non-English text."
    },
    {
      question: "Is my text stored or sent anywhere when I use this tool?",
      answer: "No — everything happens right in your browser. Your text never leaves your computer or phone. This is important for privacy, especially if you're checking sensitive information, creative writing drafts, or unpublished work. You can even use it offline after loading the page once."
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
                  Discover the symmetry in words — see what reads the same forwards and backwards
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
                    placeholder="Type a word, phrase, or sentence..."
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
                            {result.isPalindrome ? 'Palindrome found!' : 'Not a palindrome'}
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
                        Results appear automatically as you type
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
                      <div className="text-xs text-muted-foreground">A = a</div>
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
                      <div className="text-xs text-muted-foreground">Remove spaces</div>
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
                      <div className="text-xs text-muted-foreground">Remove ,.!? etc.</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Examples Section */}
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-foreground">Try These Palindromes</h4>
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
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">Quick Start Guide</h3>
              <div className="space-y-2 text-muted-foreground text-sm">
                <p>
                  Type anything — a word, phrase, or sentence — and watch it check automatically. The options let you control what gets ignored during checking.
                </p>
                <div className="text-xs sm:text-sm space-y-1 pt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Type or paste text in the left box</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Results update instantly as you type</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Green means palindrome, red means not</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Click examples to see known palindromes</span>
                  </div>
                </div>
                <div className="text-xs sm:text-sm space-y-2 pt-3">
                  <div className="font-medium text-foreground">Option tips:</div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-accent rounded-full"></div>
                    <span><strong>All three enabled:</strong> Best for phrases with spaces/punctuation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-accent rounded-full"></div>
                    <span><strong>Case sensitive:</strong> Use when letter case matters</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-accent rounded-full"></div>
                    <span><strong>Keep spaces/punctuation:</strong> For checking exact formatting</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* SEO Content Section with Dropdowns */}
            <section className="space-y-4">
              {/* Palindrome Concept - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('palindromeConcept')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h2 className="text-xl font-bold text-foreground">What Makes a Palindrome So Interesting?</h2>
                  {openSections.palindromeConcept ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.palindromeConcept && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Palindromes are more than just word games — they're linguistic mirror images that reveal something fundamental about how we structure language. The fascination with words that read the same forwards and backwards goes back centuries, across cultures and languages.
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">The Simple Beauty of Symmetry</h3>
                        <p className="text-muted-foreground">
                          At its core, a palindrome represents perfect symmetry in text. Just like a mirror reflects your image perfectly, a palindrome reflects its own letters. This symmetry creates a satisfying sense of completeness. Think about the word "level" — it has a balanced, stable feel that ordinary words don't have. That balance is what draws people to palindromes, whether they're casual wordplay enthusiasts or serious linguists.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">More Than Just Words</h3>
                        <p className="text-muted-foreground">
                          While single words like "racecar" get most of the attention, some of the most impressive palindromes are complete sentences or even paragraphs. Consider "A man, a plan, a canal: Panama!" — it tells a (very condensed) story about the Panama Canal while maintaining perfect symmetry. Creating meaningful palindromes at this scale requires incredible linguistic skill. It's like solving a puzzle where every letter needs to work in two directions simultaneously.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Why We're Drawn to Palindromes</h3>
                        <p className="text-muted-foreground">
                          There's something inherently satisfying about patterns that complete themselves. Palindromes offer that satisfaction in a compact, accessible form. They're like little linguistic magic tricks — you read forward, you read backward, and somehow it works both ways. This might explain why palindromes appear in everything from ancient Greek inscriptions to modern-day social media challenges.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                        <p className="text-sm text-muted-foreground">
                          <strong>Personal observation:</strong> I've noticed that people who discover palindromes often become slightly obsessed with finding them in everyday life. Once you start looking, you see them everywhere — in license plates, addresses, even in random number sequences. It's like developing a new lens for viewing the world.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </article>

              {/* Checking Logic - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('checkingLogic')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h2 className="text-xl font-bold text-foreground">How the Tool Actually Checks for Palindromes</h2>
                  {openSections.checkingLogic ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.checkingLogic && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Behind the simple interface, there's a precise sequence of operations that determines whether your text qualifies as a palindrome. Understanding this process helps you use the tool more effectively, especially when the results surprise you.
                    </p>
                    
                    <div className="space-y-5">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">The Cleaning Phase — Preparing Text for Comparison</h3>
                        <p className="text-muted-foreground">
                          Before any comparison happens, your text gets cleaned according to your chosen options. This is the most important step because it determines what actually gets compared. If you've checked "ignore case," all letters become lowercase. "Racecar" becomes "racecar." If you've checked "ignore spaces," every space disappears — "a man" becomes "aman." Punctuation marks vanish if that option is selected. This cleaning happens instantly, but it fundamentally changes what the tool sees.
                        </p>
                        <div className="bg-muted p-3 rounded-lg mt-2">
                          <pre className="text-sm font-mono text-muted-foreground">Original: "Madam, I'm Adam"
With all options: "madamimadam"
With case only: "MadamImAdam"
With none: "Madam, I'm Adam"</pre>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">The Reversal — Creating the Mirror Image</h3>
                        <p className="text-muted-foreground">
                          Once cleaned, the text gets reversed character by character. This isn't like flipping a word mentally — it's a mechanical process where position 1 becomes position last, position 2 becomes second-to-last, and so on. The reversal preserves each character exactly as it appears after cleaning. So if your cleaned text is "amanaplanacanalpanama," the reversed version is exactly the same letters in opposite order: "amanaplanacanalpanama" (which, in this case, happens to be identical).
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">The Comparison — The Final Decision</h3>
                        <p className="text-muted-foreground">
                          Here's where the magic happens (or doesn't). The cleaned original gets compared to the reversed version. Character 1 to character 1, character 2 to character 2, all the way through. If every single character matches, congratulations — you have a palindrome. If even one character differs, it's not a palindrome. The tool doesn't care about meaning, grammar, or aesthetics — only exact character matching.
                        </p>
                        <p className="text-muted-foreground mt-2">
                          This strict comparison explains why options matter so much. "Racecar" with case sensitivity off compares "Racecar" to "racecaR" — different because of the capital R. With case sensitivity on, both become "racecar" and match perfectly.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                        <h3 className="text-lg font-semibold text-foreground mb-2">Real Processing Example</h3>
                        <p className="text-muted-foreground">
                          Let's trace through "No 'x' in Nixon" with all options enabled: <br/>
                          1. Lowercase: "no 'x' in nixon" <br/>
                          2. Remove spaces: "no'x'innixon" <br/>
                          3. Remove punctuation: "noxinnixon" <br/>
                          4. Reverse: "noxinnixon" <br/>
                          5. Compare: identical → palindrome!
                        </p>
                        <p className="text-muted-foreground mt-2 text-sm">
                          Without removing punctuation, the apostrophes would break it. That's why those options exist — to handle real-world text.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </article>

              {/* Educational Uses - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('educationalUses')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h2 className="text-xl font-bold text-foreground">Using Palindromes to Teach and Learn</h2>
                  {openSections.educationalUses ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.educationalUses && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      I've seen palindromes used in classrooms, coding bootcamps, and self-study programs with remarkable effectiveness. They're not just curiosities — they're practical teaching tools that make abstract concepts tangible.
                    </p>
                    
                    <div className="space-y-5">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">For Programming Students</h3>
                        <p className="text-muted-foreground">
                          If you're learning to code, palindrome problems are everywhere in exercises and interviews. They teach string manipulation — how to split text, reverse it, compare it. More importantly, they teach problem decomposition: break the big problem ("is this a palindrome?") into smaller steps (clean text, reverse, compare). This tool lets students test their understanding instantly. Write a palindrome checker in Python or JavaScript, then verify it works against this tool's results.
                        </p>
                        <p className="text-muted-foreground mt-2">
                          I remember helping a student debug their palindrome function. Their code said "A man a plan" wasn't a palindrome. This tool showed it was. The difference? They'd forgotten to remove spaces. That single visual comparison taught them more about edge cases than any lecture could.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">For Language Learners</h3>
                        <p className="text-muted-foreground">
                          Palindromes reveal patterns in language structure. English learners discover that certain letter combinations naturally create symmetry. Teachers create exercises where students find palindromes in their reading or create their own. It's a fun way to practice spelling and letter recognition — if you can spell "racecar" forwards, you automatically know it backwards too. That reinforcement helps with memorization and pattern recognition.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">For Math and Logic Classes</h3>
                        <p className="text-muted-foreground">
                          Palindromes demonstrate symmetry, a fundamental mathematical concept. Numeric palindromes (like 12321) show the same pattern with digits. Students explore questions like: Are there more palindromes between 1-100 or 100-200? What's the probability that a random 5-digit number is a palindrome? These questions teach combinatorial thinking and probability in an engaging way.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Creative Writing Workshops</h3>
                        <p className="text-muted-foreground">
                          Creating palindromes is a constraint-based writing exercise that forces creativity within strict limits. I've watched writing students spend hours crafting palindrome poems — the discipline of working backwards and forwards simultaneously improves their overall writing precision. Even if they never write another palindrome, the experience makes them more conscious of word choice and sentence structure.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                        <p className="text-sm text-muted-foreground">
                          <strong>Unexpected educational benefit:</strong> I once worked with a student who struggled with reading direction due to mild dyslexia. Practicing with palindromes — reading forwards, then backwards, then comparing — actually improved their reading fluency. The symmetrical nature seemed to provide a stable reference point that helped with tracking.
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
                  <h2 className="text-xl font-bold text-foreground">Not Just "Racecar" — Diverse Palindrome Examples</h2>
                  {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.examples && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Everyone knows "racecar" and "madam." But palindromes come in many forms, each revealing different aspects of how language can mirror itself. Here are some categories with explanations of why they work (or sometimes, why they almost work).
                    </p>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">The Single-Word Classics</h3>
                        <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                          <pre className="text-sm text-muted-foreground font-mono">
{`Level - Perfect symmetry with 'v' as center
Radar - Technical term that happens to work
Civic - Common word, uncommon symmetry
Kayak - Outdoor gear that's linguistically balanced
Deified - Theological palindrome
Repaper - Rare verb form that mirrors itself

What these share: They tend to have an odd number of letters,
with the middle letter often acting as a natural pivot point.
The 'v' in 'level', the 'd' in 'radar' — these central letters
create natural mirroring opportunities.`}
                          </pre>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Phrases That Tell Stories</h3>
                        <p className="text-muted-foreground">
                          These are my favorites — palindromes that actually mean something:
                        </p>
                        <div className="bg-muted p-4 rounded-lg overflow-x-auto mt-2">
                          <pre className="text-sm text-muted-foreground font-mono">
{`"A man, a plan, a canal: Panama!" - Historical reference
"Mr. Owl ate my metal worm" - Surreal but grammatical
"Never odd or even" - Self-referential logic
"Step on no pets" - Good advice, symmetrically delivered
"Was it a car or a cat I saw?" - Common confusion, uncommon structure

These work because their creators found ways to make 
natural language fold back on itself. Notice how punctuation
and spacing create the illusion of normal sentences while
maintaining the underlying symmetry.`}
                          </pre>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Numbers and Dates</h3>
                        <p className="text-muted-foreground">
                          Palindromes aren't just for letters:
                        </p>
                        <div className="bg-muted p-4 rounded-lg overflow-x-auto mt-2">
                          <pre className="text-sm text-muted-foreground font-mono">
{`Numerical palindromes:
12321 - Simple ascending/descending pattern
1991 - Recent enough to remember
02/02/2020 - A perfect palindrome date
1001 - Binary representation is also palindrome (1111101001)

What's interesting: People notice these in daily life.
License plate "RAC3CAR" (if numbers count as letters)
Address "12321 Main Street"
Phone numbers with symmetrical patterns

These "accidental" palindromes in the wild are often
more exciting to discover than deliberate ones.`}
                          </pre>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Near Misses and Why They Fail</h3>
                        <p className="text-muted-foreground">
                          Sometimes text looks like it should be a palindrome but isn't. These near misses teach us about the precision required:
                        </p>
                        <div className="bg-muted p-4 rounded-lg overflow-x-auto mt-2">
                          <pre className="text-sm text-muted-foreground font-mono">
{`"Palindrome" - Ironically, not a palindrome
"Rotator" - Actually works (try it!)
"Test set" - Works if you ignore space
"Hello olleH" - Works with capital H, fails with lowercase
"123432" - So close! Change to 123321 and it works

These examples show how sensitive palindrome detection is.
One letter case, one space, one digit out of place —
and the symmetry breaks. That's why our tool gives you
options to control what matters in your specific case.`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </article>

              {/* Input Rules - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('inputRules')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h2 className="text-xl font-bold text-foreground">What You Can (and Can't) Check with This Tool</h2>
                  {openSections.inputRules ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.inputRules && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      While the palindrome checker handles most everyday text beautifully, there are boundaries. Knowing these helps you get accurate results and avoid confusion when the tool behaves unexpectedly.
                    </p>
                    
                    <div className="space-y-5">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Characters That Work Perfectly</h3>
                        <p className="text-muted-foreground">
                          Standard English letters (A-Z, a-z), numbers (0-9), and common punctuation all process correctly. The tool handles spaces, tabs, and line breaks as you'd expect. Accented characters like café or naïve keep their accents during reversal — "café" becomes "éfac" with the accent staying on the 'e'. This is important for multilingual users or when working with borrowed words.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Emoji and Special Symbol Considerations</h3>
                        <p className="text-muted-foreground">
                          Single emojis like 😀 or ❤️ reverse perfectly. However, combined emojis (like family 👨‍👩‍👧‍👦 or skin tone variations 👍🏿) might not reverse as single units because they're actually multiple Unicode characters joined together. Flags 🇺🇸 are particularly tricky — they're two-letter country codes that might separate when reversed. If you're working heavily with emojis, test a sample first to see how they behave.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Right-to-Left Languages</h3>
                        <p className="text-muted-foreground">
                          For languages like Arabic or Hebrew, the tool will reverse character order mechanically. However, this might not produce naturally readable text because these languages have different letter-joining rules. The characters will be in reverse order, but the shaping (how letters connect in Arabic script) might break. If you need to check palindromes in RTL languages for actual readability, you might need specialized tools that understand the language's specific rules.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Size and Performance Limits</h3>
                        <p className="text-muted-foreground">
                          There's no hard character limit, but extremely long texts (like entire book chapters) might cause brief processing delays. The tool works entirely in your browser's memory, so giant inputs could temporarily slow things down. For normal use — words, sentences, even paragraphs — you won't notice any delay. If you need to check novel-length text, consider breaking it into sections.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">What the Tool Doesn't Do</h3>
                        <p className="text-muted-foreground">
                          It doesn't check for semantic palindromes (where meaning is symmetrical rather than letters). It doesn't handle phonetic palindromes (that sound the same backwards). It doesn't preserve rich text formatting like bold or italics — it works with plain text only. And it certainly doesn't create palindromes for you (though it helps you test ones you create).
                        </p>
                      </div>
                      
                      <div className="p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
                        <h3 className="text-lg font-semibold text-foreground mb-2">Pro Tips for Best Results</h3>
                        <p className="text-muted-foreground">
                          1. When checking phrases, enable all three options (case, spaces, punctuation) <br/>
                          2. For programming exercises, disable case if your code is case-sensitive <br/>
                          3. If results seem wrong, check the "cleaned text" to see what's actually being compared <br/>
                          4. Use the example palindromes to verify the tool is working as expected <br/>
                          5. For ambiguous cases, try different option combinations to understand what's happening
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
                  <h2 className="text-xl font-bold text-foreground">Other Text Tools You Might Find Useful</h2>
                  {openSections.relatedTools ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.relatedTools && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      If you're working with text manipulation, here are some other tools that might help with different tasks:
                    </p>
                    <ul className="space-y-3 text-muted-foreground">
                      {relatedTools.map((tool, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-accent mr-2">•</span>
                          <Link href={tool.path} className="text-accent hover:underline flex-1">
                            <strong>{tool.name}:</strong> Check out this tool for related text processing needs
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
                >
                  <h2 className="text-xl font-bold text-foreground">Common Questions About Palindrome Checking</h2>
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
                    
                    {/* Technical Note */}
                    <div className="mt-8 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <h3 className="text-lg font-semibold text-foreground mb-2">About This Tool's Implementation</h3>
                      <p className="text-sm text-muted-foreground">
                        This palindrome checker is built with React and TypeScript, running entirely in your browser for privacy and speed. The core algorithm uses standard JavaScript string methods for cleaning and reversal, with performance optimizations to handle real-time checking as you type. All text processing happens locally — nothing gets sent to external servers, which means your text stays completely private. The tool is designed to be accessible, with clear visual feedback and options that let you control exactly how checking happens.
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        If you encounter any issues or have suggestions, the tool's code is structured to be maintainable and extensible. The focus is on providing accurate, immediate feedback while handling the edge cases that make palindrome checking more interesting than it first appears.
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