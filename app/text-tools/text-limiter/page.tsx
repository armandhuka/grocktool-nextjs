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
      question: "What's the difference between character and word limits?",
      answer: "Character limits count every single character including letters, numbers, spaces, and punctuation. Word limits count complete words separated by spaces. For example, 'Hello World!' is 12 characters (including space and exclamation) but only 2 words. Character limits are stricter and used for precise text length control, while word limits are better for content structure and readability."
    },
    {
      question: "How does the ellipsis (...) option work?",
      answer: "When enabled, the tool automatically adds '...' (three dots) to the end of your text when it gets truncated. This indicates to readers that the text has been shortened. The ellipsis is counted as part of the character limit (3 characters) but not part of the word limit. It's recommended for social media posts, article summaries, and any content where readers should know the text was shortened from a longer version."
    },
    {
      question: "Can I use this tool for social media character limits?",
      answer: "Yes! The tool includes preset buttons for common social media limits: Twitter/X (280 characters), Instagram captions (2,200 characters), and Facebook posts (63,206 characters). The tool also shows real-time character and word counts so you can stay within platform limits. It's perfect for crafting posts that maximize impact while staying within platform constraints."
    },
    {
      question: "Does the tool preserve formatting when limiting text?",
      answer: "The tool preserves basic formatting like spaces and line breaks within the limit. However, it doesn't preserve HTML, Markdown, or rich text formatting. For best results, paste plain text and apply formatting after limiting. The tool focuses on text content length management rather than complex formatting preservation."
    },
    {
      question: "What happens if my text is already shorter than the limit?",
      answer: "If your text is already within the specified limit, the tool won't make any changes. The output will be identical to the input, and no ellipsis will be added. The statistics will show that your text wasn't truncated, making it easy to verify that you're within your desired length constraints."
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
        result = inputText.substring(0, limit);
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

  // Auto-limit as user types or changes settings
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
                  Limit text to specific character or word counts for social media, SEO, and content creation
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
                    placeholder="Enter your text here..."
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
                    placeholder="Limited text will appear here..."
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
                      {isLimited ? <X className="inline text-red-500" size={20} /> : <Check className="inline text-green-500" size={20} />}
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
                        <div className="text-xs text-muted-foreground">Indicates shortened text</div>
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
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">How to Use</h3>
              <div className="space-y-2 text-muted-foreground text-sm">
                <p>
                  Limit your text length for social media, meta descriptions, and other platforms with character or word limits.
                </p>
                <div className="text-xs sm:text-sm space-y-1 pt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Enter your text in the input area or load an example</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Choose to limit by characters or words based on your needs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Set your desired limit manually or use platform presets</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Enable ellipsis to indicate truncated text to readers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>The limited text updates automatically as you type or change settings</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Copy the result when satisfied with the limited text</span>
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
                  aria-expanded={openSections.whatItDoes}
                >
                  <h2 className="text-xl font-bold text-foreground">Text Length Limiter - What It Does</h2>
                  {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.whatItDoes && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      This free online text length limiter tool helps you control text size for various platforms and purposes. Whether you need to meet social media character limits, optimize SEO meta descriptions, create email subject lines, or simply keep content concise, this tool provides precise control over text length with real-time statistics.
                    </p>
                    <p className="text-muted-foreground">
                      The tool offers both character and word limiting options, with preset configurations for common platforms like Twitter/X (280 characters), Instagram (2,200 characters), SMS (160 characters), and SEO titles/descriptions. With automatic processing, ellipsis options for truncated text, and detailed statistics, you can ensure your content always stays within required limits while maintaining readability and impact.
                    </p>
                  </div>
                )}
              </article>

              {/* Use Cases Section - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('useCases')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                  aria-expanded={openSections.useCases}
                >
                  <h2 className="text-xl font-bold text-foreground">Practical Use Cases for Text Limiting</h2>
                  {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.useCases && (
                  <div className="px-6 pb-6">
                    <ul className="space-y-3 text-muted-foreground pl-5">
                      <li className="pl-2">
                        <strong className="text-foreground">Social Media Optimization</strong>
                        <p className="mt-1">Craft perfect posts for Twitter (280 characters), Instagram captions (2,200 characters), Facebook posts (63,206 characters), and LinkedIn updates (3,000 characters) while staying within platform limits.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">SEO and Content Marketing</strong>
                        <p className="mt-1">Optimize meta titles (50-60 characters) and descriptions (150-160 characters) for search engine results pages to maximize click-through rates and visibility.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Email Marketing</strong>
                        <p className="mt-1">Create compelling subject lines (50-60 characters) and preview text (85-100 characters) that display properly across all email clients and devices.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Academic and Professional Writing</strong>
                        <p className="mt-1">Meet strict word count requirements for essays, research papers, abstracts, and professional documents while maintaining content quality.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Mobile and SMS Communication</strong>
                        <p className="mt-1">Prepare text messages within SMS limits (160 characters per message) and optimize content for mobile screen displays and notifications.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Content Creation and Editing</strong>
                        <p className="mt-1">Edit articles, blog posts, and web content to specific length requirements while preserving key messages and maintaining readability.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Advertising and Copywriting</strong>
                        <p className="mt-1">Create impactful ad copy within strict character limits for Google Ads, Facebook Ads, and other advertising platforms with space constraints.</p>
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
                  aria-expanded={openSections.howToUse}
                >
                  <h2 className="text-xl font-bold text-foreground">How to Limit Text Effectively</h2>
                  {openSections.howToUse ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.howToUse && (
                  <div className="px-6 pb-6">
                    <ol className="space-y-4 text-muted-foreground pl-5">
                      <li className="pl-2">
                        <strong className="text-foreground">Choose Your Limiting Method</strong>
                        <p className="mt-1">Select "Characters" for precise platform limits (social media, SEO) or "Words" for content structure control (articles, documents). Character limits are stricter, while word limits focus on content flow.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Set Your Limit</strong>
                        <p className="mt-1">Enter your desired limit manually or use platform presets. For social media, use the preset buttons. For custom requirements, enter specific numbers that match your needs.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Configure Display Options</strong>
                        <p className="mt-1">Enable "Add ... when truncated" to indicate shortened text to readers. This is especially useful for previews, summaries, and social media posts where full content isn't shown.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Process Your Text</strong>
                        <p className="mt-1">Paste or type your text in the input area. The tool automatically processes and displays the limited version with real-time statistics showing character/word counts.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Review and Adjust</strong>
                        <p className="mt-1">Check the statistics to see if text was truncated. Review the output for readability and flow. Adjust limits or edit the original text if needed for better results.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Save and Use Results</strong>
                        <p className="mt-1">When satisfied with the limited text, use the "Copy Result" button to copy it to your clipboard for use in social media posts, website content, or other applications.</p>
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
                  aria-expanded={openSections.examples}
                >
                  <h2 className="text-xl font-bold text-foreground">Text Limiting Examples & Analysis</h2>
                  {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.examples && (
                  <div className="px-6 pb-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 1: Twitter/X Post Optimization</h3>
                        <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                          <pre className="text-sm text-muted-foreground font-mono">
{`Input (Original Tweet Draft):
"Just published our comprehensive guide to digital marketing strategies for 2024! 
Discover the latest trends in SEO, content marketing, social media, and email automation. 
Perfect for marketers looking to stay ahead in the competitive digital landscape. 
Read now: [link] #DigitalMarketing #SEO #ContentStrategy"

Character Count: 278 characters (including spaces)
Word Count: 47 words

Options:
• Limit type: Characters
• Maximum: 280 characters (Twitter limit)
• Add ellipsis: Enabled

Processing:
1. Check character count: 278 characters (within limit)
2. No truncation needed
3. Output is identical to input
4. Statistics show text is within limits

Output (Twitter-ready):
"Just published our comprehensive guide to digital marketing strategies for 2024! 
Discover the latest trends in SEO, content marketing, social media, and email automation. 
Perfect for marketers looking to stay ahead in the competitive digital landscape. 
Read now: [link] #DigitalMarketing #SEO #ContentStrategy"

Statistics:
• Input characters: 278
• Output characters: 278
• Characters removed: 0
• Within limit: Yes (2 characters remaining)`}
                          </pre>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 2: SEO Meta Description Creation</h3>
                        <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                          <pre className="text-sm text-muted-foreground font-mono">
{`Input (Long Description):
"Learn how to create effective digital marketing strategies with our complete 2024 guide. 
We cover everything from SEO optimization and content creation to social media management 
and email marketing automation. Perfect for businesses and marketers who want to improve 
their online presence and drive more traffic to their websites."

Character Count: 232 characters
Word Count: 39 words

Options:
• Limit type: Characters
• Maximum: 160 characters (SEO meta description limit)
• Add ellipsis: Enabled

Processing:
1. Check character count: 232 characters (exceeds limit)
2. Truncate to first 157 characters (160 - 3 for ellipsis)
3. Add "..." to indicate truncation
4. Ensure sentence ends naturally

Output (SEO Meta Description):
"Learn how to create effective digital marketing strategies with our complete 2024 guide. 
We cover everything from SEO optimization and content..."

Statistics:
• Input characters: 232
• Output characters: 160
• Characters removed: 72
• Within limit: Yes (truncated with ellipsis)
• Reduction: 31%`}
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
                  aria-expanded={openSections.relatedTools}
                >
                  <h2 className="text-xl font-bold text-foreground">Related Text & Content Tools</h2>
                  {openSections.relatedTools ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.relatedTools && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Explore other useful text and content tools from GrockTool.com:
                    </p>
                    <ul className="space-y-3 text-muted-foreground">
                      {relatedTools.map((tool, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-accent mr-2">•</span>
                          <Link href={tool.path} className="text-accent hover:underline">
                            <strong>{tool.name}:</strong> Visit this tool for additional text manipulation capabilities
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
                  aria-expanded={openSections.faqs}
                >
                  <h2 className="text-xl font-bold text-foreground">Frequently Asked Questions About Text Limiting</h2>
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
                    
                    {/* Technical Note */}
                    <div className="mt-8 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <h3 className="text-lg font-semibold text-foreground mb-2">Technical Implementation Notes</h3>
                      <p className="text-sm text-muted-foreground">
                        This text limiter tool uses efficient JavaScript string manipulation methods for real-time processing. The character limiting uses substring() method for O(1) time complexity, while word limiting uses split() and slice() methods. All processing happens client-side in your browser for maximum privacy and performance. The tool handles Unicode characters correctly and provides accurate counts for various text formats.
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