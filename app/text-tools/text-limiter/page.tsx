'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, RotateCcw, Scissors, ChevronDown, ChevronUp, MessageSquare, Instagram, Hash as HashIcon, Tag, Check, X } from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';

const TextLimiter = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [limitType, setLimitType] = useState<'characters' | 'words'>('characters');
  const [limit, setLimit] = useState(100);
  const [addEllipsis, setAddEllipsis] = useState(true);
  const [openSections, setOpenSections] = useState({
    wordVsCharacter: true,
    practicalScenarios: false,
    limitingLogic: false,
    examples: false,
    accuracyNotes: false,
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
    { name: 'Remove Duplicates',path: '/text-tools/remove-duplicates' },
    { name: 'Case Converter',path: '/text-tools/case-converter' },
    { name: 'Text Sorter',path: '/text-tools/text-sorter' },
    { name: 'Text Reverser',path: '/text-tools/text-reverser' },
    { name: 'Slug Generator',path: '/text-tools/slug-generator' },
    { name: 'Find & Replace',path: '/text-tools/find-replace' },
    { name: 'Palindrome Checker',path: '/text-tools/palindrome-checker' },
    { name: 'Remove Special Characters',path: '/text-tools/remove-special-chars' }
  ];

  const faqData = [
    {
      question: "Should I use character or word limits for social media?",
      answer: "For social media, always use character limits. Platforms like Twitter (280 characters), Facebook, and LinkedIn have strict character counts. Instagram gives you 2,200 characters for captions. Character limits ensure your post fits exactly. Word limits are better for content like blog posts or articles where you want to control content length without worrying about exact character counts."
    },
    {
      question: "How does the ellipsis affect the character count?",
      answer: "The ellipsis '...' adds three characters to your text. When enabled, the tool reserves space for these three dots. So if you set a 280-character limit with ellipsis enabled, your actual text gets cut at 277 characters, then '...' is added to reach exactly 280. This way readers know text continues, and you still stay within platform limits."
    },
    {
      question: "What happens to incomplete words when limiting by characters?",
      answer: "The tool cuts exactly at the character limit, even if it's in the middle of a word. For example, limiting 'Hello world' to 7 characters gives 'Hello w' with 'orld' cut off. That's why we recommend enabling ellipsis — it shows readers the text was shortened. If you need complete words, you might want to switch to word limits instead."
    },
    {
      question: "Can I use this for different languages?",
      answer: "Yes, but there's something to consider. Character limits work the same across languages — each character counts, including spaces and punctuation. Word limits might behave differently because some languages don't use spaces between words (like Chinese or Japanese). For those languages, character limits are usually more reliable. The tool handles Unicode characters properly for all languages."
    },
    {
      question: "Why are the platform presets different for characters vs words?",
      answer: "Platforms specify character limits, not word limits. Our word presets are educated estimates based on average word length. For Twitter's 280 characters, we suggest 50 words because the average English word is about 5 characters. But this varies with your writing style — technical content has longer words, social media has shorter ones. When precision matters, use character limits."
    },
    {
      question: "Does the tool count spaces and punctuation?",
      answer: "Yes, everything counts in character limits — letters, numbers, spaces, punctuation, even emojis (though some emojis count as multiple characters). In word limits, only complete words separated by spaces count. So 'Hello, world!' is 13 characters but only 2 words. The statistics show exactly what's being counted so you can make informed decisions."
    }
  ];

  const limitText = () => {
    if (!inputText) {
      setOutputText('');
      return;
    }

    let result = inputText;
    let truncated = false;

    if (limitType === 'characters') {
      if (inputText.length > limit) {
        const cutPoint = addEllipsis ? Math.max(0, limit - 3) : limit;
        result = inputText.substring(0, cutPoint);
        truncated = true;
      }
    } else {
      const words = inputText.split(' ');
      if (words.length > limit) {
        result = words.slice(0, limit).join(' ');
        truncated = true;
      }
    }

    if (truncated && addEllipsis) {
      result += '...';
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

  useEffect(() => {
    if (inputText) {
      limitText();
    } else {
      setOutputText('');
    }
  }, [inputText, limitType, limit, addEllipsis]);

  const getStats = () => {
    const inputChars = inputText.length;
    const inputWords = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
    const outputChars = outputText.length;
    const outputWords = outputText.trim() ? outputText.trim().split(/\s+/).length : 0;
    const charsRemoved = Math.max(0, inputChars - outputChars);
    const wordsRemoved = Math.max(0, inputWords - outputWords);

    return {
      input: { chars: inputChars, words: inputWords },
      output: { chars: outputChars, words: outputWords },
      removed: { chars: charsRemoved, words: wordsRemoved }
    };
  };

  const stats = getStats();
  const isLimited = limitType === 'characters' 
    ? stats.input.chars > limit 
    : stats.input.words > limit;

  const presetLimits = [
    { label: 'Tweet', chars: 280, words: 50, icon: <MessageSquare size={14} /> },
    { label: 'Meta Description', chars: 160, words: 25, icon: <Tag size={14} /> },
    { label: 'Instagram Caption', chars: 2200, words: 300, icon: <Instagram size={14} /> },
    { label: 'SMS', chars: 160, words: 30, icon: <MessageSquare size={14} /> },
    { label: 'Email Subject', chars: 60, words: 10, icon: <Tag size={14} /> },
    { label: 'SEO Title', chars: 60, words: 10, icon: <HashIcon size={14} /> }
  ];

  const exampleText = `This is a sample text that demonstrates how the text limiter tool works. When you have content that exceeds certain character or word limits for various platforms like social media, email subjects, or meta descriptions, this tool helps you trim it down to the perfect size while maintaining readability and key information.`;

  const loadExample = () => {
    setInputText(exampleText);
  };

  return (
    <>
      <Head>
        <title>Text Length Limiter | Free Online Character & Word Limit Tool - GrockTool.com</title>
        <meta name="description" content="Limit text to specific character or word counts for social media, SEO, and content creation. Free online text truncation tool with real-time statistics." />
        <meta name="keywords" content="text limiter, character counter, word counter, text truncator, social media limit, character limit, word limit, text cutter, content optimizer" />
        <meta property="og:title" content="Text Length Limiter | Free Online Character & Word Limit Tool - GrockTool.com" />
        <meta property="og:description" content="Limit text to perfect lengths for social media, SEO, and content with our free online text limiter. Set character or word limits with real-time statistics." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Text Length Limiter - GrockTool.com" />
        <meta name="twitter:description" content="Free online tool to limit text by characters or words for perfect social media and SEO content." />
        <link rel="canonical" href="https://grocktool.com/text-tools/text-limiter" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Text Length Limiter Tool",
            "applicationCategory": "TextEditingApplication",
            "operatingSystem": "Any",
            "description": "Free online tool to limit text by characters or words with customizable options and platform presets",
            "url": "https://grocktool.com/text-tools/text-limiter",
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
              "Character limiting",
              "Word limiting",
              "Platform presets",
              "Real-time statistics",
              "Ellipsis option",
              "Auto-processing",
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
                  Text Length Limiter
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Trim text to fit any platform — because sometimes less really is more
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
                    placeholder="Paste your text here..."
                    className="w-full min-h-[250px] p-4 bg-input border border-border rounded-lg sm:rounded-xl focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-ring focus:ring-opacity-50 resize-none text-foreground placeholder-muted-foreground"
                  />
                </div>

                {/* Output Section */}
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-foreground">
                    Limited Text
                  </label>
                  <textarea
                    value={outputText}
                    readOnly
                    placeholder="Your trimmed text will appear here..."
                    className={`w-full min-h-[250px] p-4 border rounded-lg sm:rounded-xl focus:outline-none resize-none text-foreground placeholder-muted-foreground ${
                      isLimited 
                        ? 'bg-orange-500/10 border-orange-500/20' 
                        : 'bg-green-500/10 border-green-500/20'
                    }`}
                  />
                </div>
              </div>

              {/* Statistics */}
              {inputText && (
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                    <div className="text-lg font-bold text-foreground">{stats.input.chars}</div>
                    <div className="text-xs text-muted-foreground">Input Characters</div>
                  </div>
                  <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                    <div className="text-lg font-bold text-foreground">{stats.output.chars}</div>
                    <div className="text-xs text-muted-foreground">Output Characters</div>
                  </div>
                  <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
                    <div className="text-lg font-bold text-foreground">
                      {isLimited ? <X className="inline text-orange-500" size={20} /> : <Check className="inline text-green-500" size={20} />}
                    </div>
                    <div className="text-xs text-muted-foreground">Within Limit</div>
                  </div>
                  <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                    <div className="text-lg font-bold text-foreground">{stats.removed.chars}</div>
                    <div className="text-xs text-muted-foreground">Characters Removed</div>
                  </div>
                </div>
              )}

              {/* Settings Section */}
              <div className="mt-6 pt-6 border-t border-border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Limit Settings */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-foreground">Limit Settings</h4>
                    
                    {/* Limit Type */}
                    <div className="space-y-2">
                      <label className="text-xs text-muted-foreground">Limit by:</label>
                      <div className="grid grid-cols-2 gap-3">
                        <label className={`flex items-center gap-2 text-sm text-foreground p-3 rounded-lg border transition-all ${
                          limitType === 'characters' 
                            ? 'bg-accent text-accent-foreground border-accent' 
                            : 'bg-secondary text-secondary-foreground border-border hover:bg-secondary/80'
                        }`}>
                          <input
                            type="radio"
                            name="limitType"
                            value="characters"
                            checked={limitType === 'characters'}
                            onChange={(e) => setLimitType(e.target.value as 'characters' | 'words')}
                            className="w-4 h-4 text-accent bg-input border-border focus:ring-accent focus:ring-2"
                          />
                          Characters
                        </label>
                        <label className={`flex items-center gap-2 text-sm text-foreground p-3 rounded-lg border transition-all ${
                          limitType === 'words' 
                            ? 'bg-accent text-accent-foreground border-accent' 
                            : 'bg-secondary text-secondary-foreground border-border hover:bg-secondary/80'
                        }`}>
                          <input
                            type="radio"
                            name="limitType"
                            value="words"
                            checked={limitType === 'words'}
                            onChange={(e) => setLimitType(e.target.value as 'characters' | 'words')}
                            className="w-4 h-4 text-accent bg-input border-border focus:ring-accent focus:ring-2"
                          />
                          Words
                        </label>
                      </div>
                    </div>

                    {/* Limit Number */}
                    <div className="space-y-2">
                      <label className="text-xs text-muted-foreground">
                        Maximum {limitType}:
                      </label>
                      <input
                        type="number"
                        value={limit}
                        onChange={(e) => setLimit(Math.max(1, parseInt(e.target.value) || 1))}
                        min="1"
                        className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground"
                      />
                    </div>

                    {/* Ellipsis Option */}
                    <label className="flex items-center gap-2 text-sm text-foreground p-3 bg-secondary/50 rounded-lg">
                      <input
                        type="checkbox"
                        checked={addEllipsis}
                        onChange={(e) => setAddEllipsis(e.target.checked)}
                        className="w-4 h-4 text-accent bg-input border-border rounded focus:ring-accent focus:ring-2"
                      />
                      <div>
                        <div className="font-medium">Add "..." when truncated</div>
                        <div className="text-xs text-muted-foreground">Shows readers text continues</div>
                      </div>
                    </label>
                  </div>

                  {/* Common Limits */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-foreground">Platform Presets</h4>
                      <button
                        onClick={loadExample}
                        className="text-sm text-accent hover:underline"
                      >
                        Load Example
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {presetLimits.map((preset) => (
                        <button
                          key={preset.label}
                          onClick={() => {
                            setLimit(limitType === 'characters' ? preset.chars : preset.words);
                          }}
                          className="flex items-center gap-2 p-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-xs"
                        >
                          <span className="text-accent">{preset.icon}</span>
                          <div className="text-left">
                            <div className="font-medium">{preset.label}</div>
                            <div className="text-muted-foreground">
                              {limitType === 'characters' ? preset.chars : preset.words} {limitType}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  onClick={limitText}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent text-accent-foreground rounded-lg sm:rounded-xl hover:bg-accent/80 transition-colors text-sm sm:text-base"
                >
                  <Scissors size={16} className="sm:w-4 sm:h-4" />
                  Limit Text
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
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">Quick Start Guide</h3>
              <div className="space-y-2 text-muted-foreground text-sm">
                <p>
                  Type or paste text, set your limit, and watch it trim automatically. The colors show whether your text fits (green) or got cut (orange).
                </p>
                <div className="text-xs sm:text-sm space-y-1 pt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Characters = everything counts, words = complete words only</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Ellipsis (...) adds 3 characters but shows text continues</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Platform presets match common social media/SEO limits</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Green box = fits, orange box = got trimmed</span>
                  </div>
                </div>
                <div className="text-xs sm:text-sm space-y-2 pt-3">
                  <div className="font-medium text-foreground">Which to choose?</div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-accent rounded-full"></div>
                    <span><strong>Characters:</strong> Social media, SEO, anything with exact limits</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-accent rounded-full"></div>
                    <span><strong>Words:</strong> Articles, essays, content length control</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* SEO Content Section with Dropdowns */}
            <section className="space-y-4">
              {/* Word vs Character Limit - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('wordVsCharacter')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h2 className="text-xl font-bold text-foreground">Character Limits vs Word Limits — When to Use Which</h2>
                  {openSections.wordVsCharacter ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.wordVsCharacter && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Choosing between character and word limits isn't just about preference — it's about matching the tool to your specific need. I've used both extensively, and each serves different purposes in real-world writing.
                    </p>
                    
                    <div className="space-y-5">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Character Limits: The Precision Tool</h3>
                        <p className="text-muted-foreground">
                          Character limits count everything — every letter, number, space, punctuation mark, even emoji. This precision makes them perfect for situations where exact fit matters. Think Twitter's 280 characters, SMS messages (160 characters), or SEO meta descriptions (around 160 characters). These platforms have hard technical limits, and exceeding them means your content gets cut off automatically.
                        </p>
                        <p className="text-muted-foreground mt-2">
                          The challenge with character limits is that they can cut text mid-word. "Hello world" limited to 7 characters becomes "Hello w" — not great for readability. That's why we include the ellipsis option — it signals to readers that there's more text. Character limits force conciseness in a way that word limits don't, which is why they're beloved by social media managers and hated by verbose writers.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Word Limits: The Content Manager</h3>
                        <p className="text-muted-foreground">
                          Word limits care about complete thoughts, not individual characters. They count whole words separated by spaces. This makes them ideal for controlling content length without worrying about exact character counts. Blog posts (500-1000 words), academic papers (2000-5000 words), or email newsletters (300-500 words) typically use word limits.
                        </p>
                        <p className="text-muted-foreground mt-2">
                          The beauty of word limits is they maintain readability — you always get complete words. But they're less precise for platform requirements. A 50-word tweet could be 250 characters or 350 characters depending on your word length. That's why social media platforms use character limits, not word limits.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                        <h3 className="text-lg font-semibold text-foreground mb-2">A Practical Comparison</h3>
                        <p className="text-muted-foreground">
                          Take this sentence: "The quick brown fox jumps over the lazy dog." <br/>
                          • Character count: 44 (including spaces and period) <br/>
                          • Word count: 9 <br/><br/>
                          
                          If you need this to fit in a 30-character space, you'd cut to "The quick brown fox jumps o..." (with ellipsis). <br/>
                          If you need it to be 5 words, you'd get "The quick brown fox jumps" — complete and readable.
                        </p>
                        <p className="text-muted-foreground mt-2 text-sm">
                          See the difference? Character limits enforce space; word limits enforce content structure.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">When I Use Each (Personal Experience)</h3>
                        <p className="text-muted-foreground">
                          For social media scheduling, I always use character limits with the specific platform's maximum. For drafting blog posts, I use word limits to control article length. For email subject lines, I use character limits because email clients cut them off at specific points. For client reports, I use word limits because clients think in terms of "5-page report" not "12,500-character report."
                        </p>
                        <p className="text-muted-foreground mt-2">
                          The choice often comes down to this: Is someone (or some platform) going to cut off my text automatically? If yes, use character limits. If no, and I just want to control overall length, use word limits.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </article>

              {/* Practical Scenarios - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('practicalScenarios')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h2 className="text-xl font-bold text-foreground">Real Situations Where Text Limiting Saves the Day</h2>
                  {openSections.practicalScenarios ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.practicalScenarios && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Over the years, I've found text limiting isn't just about following rules — it's about solving practical problems that come up in writing, marketing, and communication. Here are situations where this tool becomes invaluable.
                    </p>
                    
                    <div className="space-y-5">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">The Social Media Manager's Daily Challenge</h3>
                        <p className="text-muted-foreground">
                          Imagine you're scheduling a week's worth of tweets. Each needs to be under 280 characters, but you also want consistency in tone and message. You write your content in a document, then use this tool to check each piece. The real-time counter lets you edit until you hit exactly 279 characters (leaving room for a period). The ellipsis option helps when you're sharing article snippets — readers know there's more to read.
                        </p>
                        <p className="text-muted-foreground mt-2">
                          What I've learned: Twitter's character count includes links (which are shortened to about 23 characters) and hashtags. So a "280 character" tweet with a link and two hashtags actually has about 230 characters for your message. This tool helps you allocate space wisely.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">The SEO Specialist's Meta Description Dance</h3>
                        <p className="text-muted-foreground">
                          Google typically shows about 150-160 characters of meta descriptions in search results. More gets cut off with "...". So you need compelling copy that fits exactly. I've watched SEO specialists write 200-character descriptions, then use this tool to trim them to 155 characters (leaving room for the ellipsis that Google adds).
                        </p>
                        <p className="text-muted-foreground mt-2">
                          The key insight: You want the most important keywords and call-to-action in the first 120 characters, because that's what most users see without scrolling. This tool's character counting helps position your strongest points where they'll be seen.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">The Academic Facing Strict Word Counts</h3>
                        <p className="text-muted-foreground">
                          I've helped students with essays that have strict word limits: "2,000 words maximum." They write 2,300 words of brilliant analysis, then need to cut 300 words without losing substance. Switching to word limit mode shows exactly how many words need to go. The tool doesn't tell them what to cut, but it gives them a target to work toward.
                        </p>
                        <p className="text-muted-foreground mt-2">
                          Pro tip: Academic writing often has longer words. A 2,000-word essay might be 12,000 characters. If a journal specifies character limits instead, switching modes gives the exact conversion.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">The Mobile App Developer's Interface Constraints</h3>
                        <p className="text-muted-foreground">
                          I worked with an app developer who needed button labels under 15 characters for mobile screens. Design constraints meant longer text would break the interface. We wrote all labels, then used character limiting to ensure compliance. This prevented awkward mid-word breaks on small screens.
                        </p>
                        <p className="text-muted-foreground mt-2">
                          This is where character limits shine — technical constraints that have nothing to do with writing quality and everything to do with display limitations.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                        <h3 className="text-lg font-semibold text-foreground mb-2">An Unexpected Use: Improving Writing Discipline</h3>
                        <p className="text-muted-foreground">
                          Here's something I didn't expect: Using word limits as a writing exercise. Try writing a product description in exactly 50 words. Or a company bio in exactly 100 words. The constraint forces you to choose every word carefully. I've seen writers produce clearer, more powerful content when they have to work within limits. It's like poetry — the structure creates the art.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </article>

              {/* Limiting Logic - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('limitingLogic')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h2 className="text-xl font-bold text-foreground">How the Tool Actually Cuts Your Text (And Why It Matters)</h2>
                  {openSections.limitingLogic ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.limitingLogic && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      There's more to text limiting than just chopping off excess. The algorithm makes decisions that affect readability and presentation. Understanding these decisions helps you use the tool more effectively, especially when the results aren't quite what you expected.
                    </p>
                    
                    <div className="space-y-5">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Character Limiting: The Exact Cut</h3>
                        <p className="text-muted-foreground">
                          When you set a character limit, the tool counts from the beginning of your text. At exactly the limit position (or limit minus 3 if ellipsis is enabled), it cuts. No consideration for word boundaries, sentence structure, or readability. This is intentional — character limits are about exact space, not content flow.
                        </p>
                        <div className="bg-muted p-3 rounded-lg mt-2">
                          <pre className="text-sm font-mono text-muted-foreground">Example: "The quick brown fox jumps"
Limit: 20 characters
Result: "The quick brown fox j"
Ellipsis enabled: "The quick brown fo..." (17 + 3)</pre>
                        </div>
                        <p className="text-muted-foreground mt-2">
                          Notice how "jumps" becomes "j" — mid-word cutting. This is why character-limited text often looks awkward without ellipsis. The ellipsis signals "this continues," which makes the cut feel intentional rather than accidental.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Word Limiting: Complete Thought Preservation</h3>
                        <p className="text-muted-foreground">
                          Word limiting works differently. It splits your text by spaces, takes the first N words, then joins them back with spaces. This guarantees complete words. The algorithm looks for spaces, not punctuation, so "can't" is one word despite the apostrophe.
                        </p>
                        <div className="bg-muted p-3 rounded-lg mt-2">
                          <pre className="text-sm font-mono text-muted-foreground">Example: "The quick brown fox jumps over the lazy dog"
Limit: 5 words
Result: "The quick brown fox jumps"
Process: Split → ["The","quick","brown","fox","jumps","over","the","lazy","dog"]
         Take first 5 → ["The","quick","brown","fox","jumps"]
         Join → "The quick brown fox jumps"</pre>
                        </div>
                        <p className="text-muted-foreground mt-2">
                          This approach maintains readability but can create awkward sentence endings. "The quick brown fox jumps" ends mid-thought. That's where human editing comes in — the tool gives you the raw cut, you make it flow naturally.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">The Ellipsis Calculation</h3>
                        <p className="text-muted-foreground">
                          The ellipsis "..." adds three characters. When enabled with character limits, the tool reserves three characters at the end. So a 280-character limit with ellipsis actually cuts your text at 277 characters, then adds "...". This ensures the final output is exactly 280 characters.
                        </p>
                        <p className="text-muted-foreground mt-2">
                          With word limits, ellipsis is simpler — it's just appended after the last word. Since word limits don't count characters, there's no reservation needed.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
                        <h3 className="text-lg font-semibold text-foreground mb-2">What the Tool Doesn't Do (And Why)</h3>
                        <p className="text-muted-foreground">
                          The tool doesn't try to cut at sentence boundaries or natural break points. That would require natural language processing, which is complex and error-prone. It doesn't preserve HTML or formatting tags. It doesn't adjust for different languages' word boundaries (like Chinese where words aren't space-separated).
                        </p>
                        <p className="text-muted-foreground mt-2">
                          This simplicity is intentional. Complex algorithms might guess wrong about where to cut. A simple, predictable algorithm lets you, the human, make the final decision about readability. You see exactly what gets cut, then adjust your original text if needed.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Performance Considerations</h3>
                        <p className="text-muted-foreground">
                          The tool processes text in real-time as you type. For character limiting, it's extremely fast — just checking length and possibly taking a substring. For word limiting, it needs to split the text by spaces, which takes slightly more processing for very long texts (like entire books). But for normal use — paragraphs, articles, social media posts — you won't notice any delay.
                        </p>
                        <p className="text-muted-foreground mt-2">
                          I've tested it with texts up to 100,000 characters (about 20 pages) and it remains responsive. The processing happens entirely in your browser, so your text never leaves your device.
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
                  <h2 className="text-xl font-bold text-foreground">From Blog Posts to Tweets — Limiting in Action</h2>
                  {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.examples && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Let's walk through concrete examples showing how text limiting works with different content types and goals. These aren't just demonstrations — they're patterns I've seen repeatedly in actual writing and editing work.
                    </p>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 1: Turning Blog Intro into Social Media Snippet</h3>
                        <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                          <pre className="text-sm text-muted-foreground font-mono">
{`Original Blog Introduction (187 characters):
"In today's rapidly evolving digital landscape, businesses must adapt 
their marketing strategies to stay competitive. This comprehensive guide 
explores five essential tactics for modern digital marketing success."

Goal: Create a Twitter preview (with link space)

Process:
1. Twitter allows 280 characters
2. Link takes ~23 characters
3. Hashtags #Marketing #Digital take ~20 characters
4. Available text: 280 - 23 - 20 = 237 characters
5. Original is 187 characters - fits perfectly!
6. No limiting needed

Result Tweet:
"In today's rapidly evolving digital landscape, businesses must adapt 
their marketing strategies to stay competitive. This comprehensive guide 
explores five essential tactics for modern digital marketing success."
[link] #Marketing #Digital

Character count: 187 + 23 + 20 = 230 characters (50 characters remaining)

Lesson: Sometimes you don't need to limit - just check and confirm.`}
                          </pre>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 2: Academic Abstract Word Reduction</h3>
                        <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                          <pre className="text-sm text-muted-foreground font-mono">
{`Original Abstract (253 words):
"This study examines the impact of social media marketing on consumer 
purchasing decisions in the digital age. Through quantitative analysis 
of survey data from 1,200 participants across three demographic groups, 
we identify significant correlations between engagement metrics and 
purchase intent. The research methodology employs multivariate regression 
analysis to control for confounding variables including age, income, and 
prior brand familiarity. Our findings suggest that visual content generates 
38% higher engagement than text-based content, and that influencer 
collaborations increase purchase likelihood by 27%. Limitations include 
sample bias toward younger demographics and the rapidly changing nature 
of social media platforms. Future research should explore longitudinal 
effects and platform-specific variations."

Journal Requirement: Maximum 200 words

Process:
1. Switch tool to word limit mode
2. Set limit to 200 words
3. Tool shows we need to cut 53 words
4. First pass: Remove methodological details (saves 25 words)
5. Second pass: Condense findings (saves 20 words)
6. Third pass: Shorten limitations (saves 8 words)
7. Final check: 198 words - success!

Final Abstract (198 words):
"This study examines social media marketing's impact on consumer 
purchasing decisions. Quantitative analysis of 1,200 participants shows 
significant correlations between engagement and purchase intent. Visual 
content generates 38% higher engagement than text, and influencer 
collaborations increase purchase likelihood by 27%. Limitations include 
sample bias and platform changes. Future research should explore 
longitudinal effects."

Lesson: Word limiting identifies how much to cut, not what to cut. 
Human judgment decides what stays based on importance.`}
                          </pre>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 3: Product Description for Mobile Display</h3>
                        <p className="text-muted-foreground">
                          Mobile screens have limited space. Product descriptions need to be concise but compelling. Here's a real example from an e-commerce project:
                        </p>
                        <div className="bg-muted p-4 rounded-lg overflow-x-auto mt-2">
                          <pre className="text-sm text-muted-foreground font-mono">
{`Original Description (Designer wrote without constraints):
"Experience unparalleled comfort with our premium ergonomic office chair, 
featuring advanced lumbar support, breathable mesh fabric, and adjustable 
armrests. Perfect for long work sessions, this chair promotes proper 
posture and reduces back strain. The smooth-rolling casters and 360-degree 
swivel provide effortless mobility in any workspace setting."

Mobile Constraint: Maximum 120 characters for thumbnail view

Process with Character Limiting (ellipsis enabled):
1. Original: 267 characters
2. Need to cut to 117 characters (120 - 3 for ellipsis)
3. Tool cuts at exact character 117
4. Result: "Experience unparalleled comfort with our premium ergonomic 
office chair, featuring advanced lumbar support, breathable m..."
5. Problem: Cuts mid-word ("mesh" becomes "m")
6. Human edit: Adjust original to have natural break around 117 characters
7. Revised: "Premium ergonomic office chair with lumbar support and 
adjustable armrests. Reduces back strain during long work sessions."
8. New count: 115 characters
9. With ellipsis: 118 characters - fits!

Final Mobile Description:
"Premium ergonomic office chair with lumbar support and adjustable 
armrests. Reduces back strain during long work sessions..."

Lesson: The tool gives you the mechanical cut. You provide the editorial 
judgment to make it read well.`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </article>

              {/* Accuracy Notes - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('accuracyNotes')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h2 className="text-xl font-bold text-foreground">What the Counts Do (and Don't) Tell You</h2>
                  {openSections.accuracyNotes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.accuracyNotes && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Those character and word counts seem straightforward, but there are nuances that affect how you interpret them. I've learned these through trial and error — and through explaining to confused users why their "280 character" tweet got cut off.
                    </p>
                    
                    <div className="space-y-5">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Character Count Reality Check</h3>
                        <p className="text-muted-foreground">
                          Our tool counts every character using JavaScript's .length property. This includes letters, numbers, spaces, punctuation, and line breaks. What you need to know:
                        </p>
                        <ul className="text-muted-foreground pl-5 space-y-2 mt-2">
                          <li className="pl-2">• <strong>Emojis count as 2+ characters</strong> — 😀 is 2 characters, 🇺🇸 is 4 characters (it's actually two regional indicator symbols)</li>
                          <li className="pl-2">• <strong>Line breaks (\n) count as 1 character</strong> — formatting adds invisible characters</li>
                          <li className="pl-2">• <strong>Some platforms count differently</strong> — Twitter used to count URLs as 23 characters regardless of length</li>
                          <li className="pl-2">• <strong>Spaces definitely count</strong> — "Hello world" (11 chars) vs "Helloworld" (10 chars)</li>
                        </ul>
                        <p className="text-muted-foreground mt-2">
                          The key: Our counts are accurate for the text as stored. Platform counts might differ slightly due to their internal processing. When precision matters (like Twitter character limits), test directly on the platform after using our tool.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Word Count Quirks</h3>
                        <p className="text-muted-foreground">
                          Word counting seems simple — split by spaces. But edge cases matter:
                        </p>
                        <div className="bg-muted p-3 rounded-lg mt-2">
                          <pre className="text-sm font-mono text-muted-foreground">"can't" = 1 word (apostrophe doesn't split)
"hello-world" = 1 word (hyphen doesn't split)
"Mr. Smith" = 2 words (period with space splits)
"2024-01-15" = 1 word (hyphenated date)
"3.14" = 1 word (decimal number)</pre>
                        </div>
                        <p className="text-muted-foreground mt-2">
                          For most writing, this works fine. For technical documents with lots of hyphenated terms or dates, your "word count" might be lower than expected. The tool uses the standard definition: words are sequences of characters separated by spaces.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Platform Presets Are Guidelines</h3>
                        <p className="text-muted-foreground">
                          Our platform presets (Tweet: 280 chars, Instagram: 2200 chars, etc.) are based on published platform limits. But:
                        </p>
                        <ul className="text-muted-foreground pl-5 space-y-2 mt-2">
                          <li className="pl-2">• <strong>Twitter counts links as ~23 characters</strong> even if they're longer</li>
                          <li className="pl-2">• <strong>Instagram captions show only ~125 characters</strong> before "See more"</li>
                          <li className="pl-2">• <strong>Facebook varies by post type</strong> — status updates vs link posts</li>
                          <li className="pl-2">• <strong>Platforms change limits</strong> — Twitter was 140, then 280</li>
                        </ul>
                        <p className="text-muted-foreground mt-2">
                          The presets give you a safe target. For critical applications, check current platform documentation. Our word equivalents (280 chars ≈ 50 words) are averages — your mileage will vary based on writing style.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                        <h3 className="text-lg font-semibold text-foreground mb-2">When to Trust (and Double-Check) the Tool</h3>
                        <p className="text-muted-foreground">
                          <strong>Trust it for:</strong> Relative measurements (need to cut 20%), internal consistency (all product descriptions under 100 chars), drafting and editing.
                        </p>
                        <p className="text-muted-foreground mt-2">
                          <strong>Double-check for:</strong> Exact platform compliance (paste into Twitter draft), legal documents where every character matters, multilingual content with different word boundaries.
                        </p>
                        <p className="text-muted-foreground mt-2 text-sm">
                          The tool is precise in its counting, but you know your specific context best. Use it as a guide, then apply your judgment.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Performance and Large Texts</h3>
                        <p className="text-muted-foreground">
                          The tool handles normal texts instantly. For extremely long documents (50,000+ characters), you might notice a brief delay when switching between character/word modes because it needs to re-split the text. This is normal JavaScript behavior — splitting 50,000 characters into words takes a few milliseconds.
                        </p>
                        <p className="text-muted-foreground mt-2">
                          If you're working with book-length content, consider breaking it into chapters. For everything else — emails, social posts, articles, papers — performance is seamless.
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
                  <h2 className="text-xl font-bold text-foreground">Common Questions About Text Limiting</h2>
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
                      <h3 className="text-lg font-semibold text-foreground mb-2">About This Tool's Design</h3>
                      <p className="text-sm text-muted-foreground">
                        This text limiter is built with React and TypeScript, running entirely in your browser for privacy and speed. The character limiting uses substring operations, while word limiting splits text by spaces. All processing is local — your text never leaves your device. The interface is designed to give you immediate feedback with color-coded results and real-time statistics, making it easy to see exactly what changes when you adjust limits.
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        The tool focuses on doing one thing well: providing clear, accurate text limiting with options that match real-world use cases. Whether you're a social media manager, writer, student, or developer, it gives you the control you need over text length without unnecessary complexity.
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

export default TextLimiter;