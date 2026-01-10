'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, RotateCcw, Link as LinkIcon, ChevronDown, ChevronUp, Hash, Globe, Filter, Check } from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';

const SlugGenerator = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [separator, setSeparator] = useState('-');
  const [lowercase, setLowercase] = useState(true);
  const [removeSpecialChars, setRemoveSpecialChars] = useState(true);
  const [maxLength, setMaxLength] = useState(60);
  const [currentLength, setCurrentLength] = useState(0);

  // SEO Section Dropdown States
  const [openSections, setOpenSections] = useState({
    whatIsSlug: true,
    seoRules: false,
    conversionLogic: false,
    examples: false,
    characterLimits: false,
    faqs: false,
    relatedTools: false
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // FAQ Data - Updated with more natural questions
  const faqData = [
    {
      question: "Why do hyphens work better than underscores in URLs?",
      answer: "Search engines treat hyphens as word separators but see underscores as connectors. When Google reads 'best_coffee_shops', it understands it as one word: 'bestcoffeeshops'. With 'best-coffee-shops', it correctly identifies three separate words. This affects how your content gets indexed and ranked. Plus, hyphens are simply easier to read - most people naturally parse them as spaces when glancing at a URL."
    },
    {
      question: "Should I include dates in my blog post slugs?",
      answer: "It depends on your content strategy. For time-sensitive posts like news or annual updates, dates can help. But for evergreen content that stays relevant for years, dates can make your post look outdated. A cleaner approach: use 'ultimate-guide-seo' instead of '2024-ultimate-guide-seo'. If you must include dates, put them at the end where they're less prominent. Remember, you can always update publication dates in your CMS without changing the URL."
    },
    {
      question: "What happens if my slug contains special characters?",
      answer: "Special characters like !, @, #, $, %, &, *, (, ) get encoded into weird percent codes that look messy and can break links. 'café&bar' becomes 'caf%C3%A9%26bar' - not exactly user-friendly. Some characters like question marks and ampersands have special meanings in URLs and can interfere with tracking parameters. That's why our tool automatically removes them to keep your URLs clean and functional across all browsers and social platforms."
    },
    {
      question: "Can I change a slug after publishing content?",
      answer: "You can, but you'll need to set up a 301 redirect from the old URL to the new one. Without this redirect, anyone clicking the old link gets a 404 error, and you lose any SEO value the old URL accumulated. Search engines need time to recognize the change - usually a few weeks. My advice: get your slug right before publishing. If you must change it, do it within the first 48 hours before the page gets indexed and shared widely."
    },
    {
      question: "Do capital letters in slugs cause problems?",
      answer: "They absolutely can. Some servers treat 'My-Page' and 'my-page' as completely different URLs. This creates duplicate content issues where search engines see two identical pages with different URLs. Even if your server handles it, users might manually type the URL wrong. Stick to lowercase for consistency - it's one less thing to worry about and makes your URLs predictable across your entire site."
    },
    {
      question: "How do I handle numbers in slugs?",
      answer: "Numbers are fine when they're meaningful - product models, versions, or lists. 'iphone-15-pro' works well. Avoid arbitrary numbers like 'article-3472' that mean nothing to users. For numbered lists, include the number at the beginning: '7-ways-to-improve-seo' rather than 'ways-to-improve-seo-7'. This puts the most useful information first and follows how people naturally search for list content."
    }
  ];

  const generateSlug = () => {
    if (!inputText.trim()) {
      setOutputText('');
      setCurrentLength(0);
      return;
    }

    let result = inputText.trim();
    
    // Convert to lowercase if option is selected
    if (lowercase) {
      result = result.toLowerCase();
    }
    
    // Remove special characters if option is selected
    if (removeSpecialChars) {
      result = result.replace(/[^\w\s-]/g, '');
    }
    
    // Replace spaces with separator
    result = result.replace(/\s+/g, separator);
    
    // Replace multiple separators with single one
    result = result.replace(new RegExp(`\\${separator}+`, 'g'), separator);
    
    // Remove leading/trailing separators
    result = result.replace(new RegExp(`^\\${separator}+|\\${separator}+$`, 'g'), '');
    
    // Limit length if specified
    if (maxLength > 0 && result.length > maxLength) {
      result = result.substring(0, maxLength);
      // Don't end with separator
      result = result.replace(new RegExp(`\\${separator}+$`, 'g'), '');
    }

    setCurrentLength(result.length);
    setOutputText(result);
  };

  // Use useMemo for performance optimization
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (inputText) {
        generateSlug();
      } else {
        setOutputText('');
        setCurrentLength(0);
      }
    }, 150);

    return () => clearTimeout(timeoutId);
  }, [inputText, separator, lowercase, removeSpecialChars, maxLength]);

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setCurrentLength(0);
  };

  const handleCopy = async () => {
    if (!outputText) return;
    
    try {
      await navigator.clipboard.writeText(outputText);
      // You could add a temporary success message here
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const loadExample = () => {
    const example = `How to Create SEO-Friendly URLs That Rank Higher in 2024`;
    setInputText(example);
  };

  const separatorOptions = [
    { value: '-', label: 'Hyphen (-)', description: 'Best for SEO, most common', example: 'seo-friendly-url' },
    { value: '_', label: 'Underscore (_)', description: 'Common in programming', example: 'seo_friendly_url' },
    { value: '.', label: 'Dot (.)', description: 'For file names', example: 'seo.friendly.url' }
  ];

  return (
    <>
      <Head>
        <title>Free URL Slug Generator | Create SEO-Friendly Slugs - GrockTool.com</title>
        <meta name="description" content="Generate clean, SEO-optimized URL slugs from any text. Our free slug creator helps improve your website's search rankings with properly formatted URLs." />
        <meta name="keywords" content="slug generator, url slug, seo slug, permalink generator, url converter, web slug maker, seo friendly url" />
        <meta property="og:title" content="Free URL Slug Generator | Create SEO-Friendly Slugs - GrockTool.com" />
        <meta property="og:description" content="Transform any text into perfect URL slugs instantly. Customize options for lowercase, special characters, and length limits." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Slug Generator - Create SEO-Friendly URLs" />
        <meta name="twitter:description" content="Free tool to generate clean URL slugs that improve search rankings and user experience." />
        <link rel="canonical" href="https://grocktool.com/text-tools/slug-generator" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Slug Generator Tool",
            "applicationCategory": "WebApplication",
            "operatingSystem": "Any",
            "description": "Free online slug generator for creating SEO-friendly URL slugs from text with customizable options",
            "url": "https://grocktool.com/text-tools/slug-generator",
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
              "SEO-friendly slug generation",
              "Special character removal",
              "Case conversion options",
              "Custom length limits",
              "Space replacement choices",
              "Real-time preview"
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
                  URL Slug Generator
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Create clean, SEO-friendly URLs from any text in seconds
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
              <div className="space-y-6">
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
                    placeholder="Enter your text or title here..."
                    className="w-full min-h-[120px] p-4 bg-input border border-border rounded-lg sm:rounded-xl focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-ring focus:ring-opacity-50 resize-none text-foreground placeholder-muted-foreground"
                    aria-label="Text input for slug generation"
                  />
                </div>

                {/* Options Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Separator Options */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Hash size={16} className="text-blue-500" />
                      <h4 className="text-sm font-medium text-foreground">Separator</h4>
                    </div>
                    <div className="space-y-3">
                      {separatorOptions.map((option) => (
                        <label
                          key={option.value}
                          className="flex items-start gap-3 p-3 rounded-lg border border-border hover:border-accent/50 transition-colors cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="separator"
                            value={option.value}
                            checked={separator === option.value}
                            onChange={(e) => setSeparator(e.target.value)}
                            className="mt-1 w-4 h-4 text-accent bg-input border-border focus:ring-accent focus:ring-2"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-foreground text-sm font-medium">{option.label}</span>
                              <span className="text-muted-foreground text-xs">({option.example})</span>
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">{option.description}</div>
                          </div>
                          {separator === option.value && (
                            <Check size={16} className="text-green-500" />
                          )}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Additional Options */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Filter size={16} className="text-green-500" />
                      <h4 className="text-sm font-medium text-foreground">Options</h4>
                    </div>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-accent/50 transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={lowercase}
                            onChange={(e) => setLowercase(e.target.checked)}
                            className="w-4 h-4 text-accent bg-input border-border rounded focus:ring-accent focus:ring-2"
                          />
                          <div>
                            <span className="text-foreground text-sm">Convert to lowercase</span>
                            <div className="text-xs text-muted-foreground">Recommended for URLs</div>
                          </div>
                        </div>
                        {lowercase && <Check size={16} className="text-green-500" />}
                      </label>
                      
                      <label className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-accent/50 transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={removeSpecialChars}
                            onChange={(e) => setRemoveSpecialChars(e.target.checked)}
                            className="w-4 h-4 text-accent bg-input border-border rounded focus:ring-accent focus:ring-2"
                          />
                          <div>
                            <span className="text-foreground text-sm">Remove special characters</span>
                            <div className="text-xs text-muted-foreground">Removes !@#$% etc.</div>
                          </div>
                        </div>
                        {removeSpecialChars && <Check size={16} className="text-green-500" />}
                      </label>
                      
                      <div className="p-3 rounded-lg border border-border">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-foreground text-sm">Max length: {maxLength} chars</span>
                          <span className="text-xs text-muted-foreground">{currentLength}/{maxLength}</span>
                        </div>
                        <input
                          type="range"
                          min="20"
                          max="100"
                          value={maxLength}
                          onChange={(e) => setMaxLength(parseInt(e.target.value))}
                          className="w-full h-2 bg-input rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="text-xs text-muted-foreground mt-2">
                          Ideal: 50-60 characters for SEO
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Output Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <LinkIcon size={16} className="text-purple-500" />
                    <label className="block text-sm font-medium text-foreground">
                      Generated Slug
                    </label>
                  </div>
                  <div className="relative">
                    <textarea
                      value={outputText}
                      readOnly
                      placeholder="URL-friendly slug will appear here..."
                      className="w-full min-h-[80px] p-4 bg-muted border border-border rounded-lg sm:rounded-xl focus:outline-none resize-none text-foreground placeholder-muted-foreground font-mono text-sm"
                      aria-label="Generated slug output"
                    />
                    {outputText && (
                      <button
                        onClick={handleCopy}
                        className="absolute top-3 right-3 p-2 text-muted-foreground hover:text-foreground transition-colors"
                        title="Copy to clipboard"
                        aria-label="Copy generated slug"
                      >
                        <Copy size={16} className="sm:w-4 sm:h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
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
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent text-accent-foreground rounded-lg sm:rounded-xl hover:bg-accent/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                  >
                    <Copy size={16} className="sm:w-4 sm:h-4" />
                    Copy Slug
                  </button>
                </div>

                {/* URL Preview */}
                {outputText && (
                  <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Globe size={16} className="text-blue-500" />
                      <h4 className="font-medium text-foreground text-sm">Preview URL</h4>
                    </div>
                    <code className="text-foreground text-xs break-all font-mono bg-background p-2 rounded">
                      https://example.com/{outputText}
                    </code>
                    <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                      <span>Slug length: {currentLength} characters</span>
                      <span className={currentLength > maxLength ? 'text-red-500' : 'text-green-500'}>
                        {currentLength > maxLength ? 'Over limit!' : 'Within limit'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Quick Info Card - Removed redundant content */}

            {/* SEO Content Section with Dropdowns */}
            <section className="space-y-4">
              {/* What Is a URL Slug */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('whatIsSlug')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                  aria-expanded={openSections.whatIsSlug}
                >
                  <h2 className="text-xl font-bold text-foreground">What Exactly Is a URL Slug?</h2>
                  {openSections.whatIsSlug ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.whatIsSlug && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Think of a URL slug as the fingerprint of a web page. It's that unique part of the web address that comes after your domain name. If you look at "grocktool.com/tools/slug-generator", the "slug-generator" bit is what we're talking about here.
                    </p>
                    
                    <p className="text-muted-foreground mb-4">
                      Back in the early web days, URLs looked like technical gibberish—"page.php?id=473&cat=2". They meant something to servers but nothing to humans. Today, slugs tell both users and search engines what to expect on a page before they even click. When you see "best-coffee-shops-seattle", you instantly know what you're getting.
                    </p>
                    
                    <div className="bg-muted p-4 rounded-lg mb-4">
                      <p className="text-sm font-medium text-foreground mb-2">Good vs. Bad Slug Examples:</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          <span><strong>Clear:</strong> how-to-bake-sourdough-bread</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-red-500 mr-2">✗</span>
                          <span><strong>Confusing:</strong> article-473?ref=2</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          <span><strong>Descriptive:</strong> budget-travel-tips-europe</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-red-500 mr-2">✗</span>
                          <span><strong>Generic:</strong> page1</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground">
                      A well-crafted slug does three important things: it tells search engines exactly what your page is about (helping with rankings), gives users confidence they're clicking the right link, and makes your content easier to share. People are more likely to remember and type "yourbrand.com/contact" than "yourbrand.com/index.php?page=contact-us-form". It's one of those small details that makes your site feel professional and trustworthy.
                    </p>
                  </div>
                )}
              </article>

              {/* SEO Slug Rules */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('seoRules')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                  aria-expanded={openSections.seoRules}
                >
                  <h2 className="text-xl font-bold text-foreground">Rules for SEO-Friendly Slugs</h2>
                  {openSections.seoRules ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.seoRules && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Creating slugs that search engines love isn't rocket science, but there are some non-negotiable rules. Get these right, and you're already ahead of most websites.
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">1. Use Hyphens, Not Underscores</h3>
                        <p className="text-muted-foreground">
                          This is the golden rule. Google treats hyphens as word separators but reads underscores as connectors. So "best_coffee" becomes "bestcoffee" to search engines, while "best-coffee" correctly separates the words. It's a small difference that can significantly impact how your content gets indexed.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">2. Keep It Lowercase</h3>
                        <p className="text-muted-foreground">
                          Some web servers treat "Page" and "page" as different URLs. This creates duplicate content issues where search engines see two identical pages. Stick to lowercase everywhere—it's consistent, prevents broken links when users type URLs manually, and follows web standards.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">3. Remove Special Characters</h3>
                        <p className="text-muted-foreground">
                          Characters like !, @, #, $, &, *, (, ) don't belong in URLs. They can break links, look unprofessional, and get encoded into messy percent codes. Imagine trying to share "my-site.com/café&bar" verbally—it's just not practical. Clean slugs are easier to read, share, and remember.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">4. Include Keywords Naturally</h3>
                        <p className="text-muted-foreground">
                          Your main keyword should appear early in the slug. Instead of "a-complete-guide-to-search-engine-optimization", use "search-engine-optimization-guide". But don't stuff keywords—"seo-seo-seo-optimization-tips" looks spammy. Write for humans first, search engines second.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">5. Make It Readable</h3>
                        <p className="text-muted-foreground">
                          Read your slug out loud. Does it flow naturally? Can someone understand it at a glance? "Beginner-yoga-poses" works. "Yoga-poses-for-beginners-starting-out" is too wordy. Good slugs should make sense even without the page title or surrounding context.
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <p className="text-sm text-muted-foreground">
                        <strong>Pro Tip:</strong> Before finalizing any slug, paste it into a blank browser tab. How does it look? Would you feel comfortable sharing it in an email or text message? If it passes that test, you're on the right track.
                      </p>
                    </div>
                  </div>
                )}
              </article>

              {/* Conversion Logic */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('conversionLogic')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                  aria-expanded={openSections.conversionLogic}
                >
                  <h2 className="text-xl font-bold text-foreground">How Our Slug Generator Works</h2>
                  {openSections.conversionLogic ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.conversionLogic && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Our slug generator doesn't just replace spaces with hyphens. It follows a careful process to ensure every slug meets web standards and SEO requirements. Here's what happens behind the scenes when you type your text:
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="bg-accent text-accent-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-1">1</div>
                        <div>
                          <h4 className="font-medium text-foreground">Text Cleaning</h4>
                          <p className="text-muted-foreground text-sm">
                            First, we trim any extra spaces from the beginning and end. Then, if you've selected "Remove special characters", we strip out anything that isn't a letter, number, space, or hyphen. This includes punctuation marks, symbols, and other non-standard characters that could cause issues.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-accent text-accent-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-1">2</div>
                        <div>
                          <h4 className="font-medium text-foreground">Case Conversion</h4>
                          <p className="text-muted-foreground text-sm">
                            Next, we convert everything to lowercase if that option is enabled. This happens before spacing is handled to ensure consistency. We convert accented characters to their closest ASCII equivalents too—"café" becomes "cafe", "naïve" becomes "naive".
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-accent text-accent-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-1">3</div>
                        <div>
                          <h4 className="font-medium text-foreground">Space Replacement</h4>
                          <p className="text-muted-foreground text-sm">
                            Now we replace all spaces with your chosen separator. Whether you pick hyphens, underscores, or dots, we handle multiple consecutive spaces correctly—turning "multiple   spaces" into "multiple-spaces" not "multiple---spaces".
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-accent text-accent-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-1">4</div>
                        <div>
                          <h4 className="font-medium text-foreground">Duplicate Separator Cleanup</h4>
                          <p className="text-muted-foreground text-sm">
                            We check for and remove any duplicate separators that might have been created. If your text had "word--another", we clean it up to "word-another". We also remove separators from the beginning or end of the slug so it doesn't start or end with a hyphen.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-accent text-accent-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-1">5</div>
                        <div>
                          <h4 className="font-medium text-foreground">Length Limiting</h4>
                          <p className="text-muted-foreground text-sm">
                            Finally, we check the length against your maximum setting. If the slug exceeds the limit, we trim it intelligently—cutting at a word boundary where possible, not in the middle of a word. We make sure the trimmed version doesn't end with a separator.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mt-6">
                      What I particularly like about this approach is that it handles edge cases gracefully. Things like text with multiple punctuation marks, mixed case content, or already-formatted slugs get cleaned up properly. The result is a slug that works consistently across all platforms—whether someone types it manually, clicks it from search results, or shares it on social media.
                    </p>
                  </div>
                )}
              </article>

              {/* Examples */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('examples')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                  aria-expanded={openSections.examples}
                >
                  <h2 className="text-xl font-bold text-foreground">Real-World Slug Examples</h2>
                  {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.examples && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Let's look at some actual examples from different types of websites. Notice how each slug communicates the page content clearly while following SEO best practices.
                    </p>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Blog Posts</h3>
                        <div className="bg-muted p-4 rounded-lg">
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm text-foreground font-medium">Original Title:</p>
                              <p className="text-muted-foreground">"10 Essential Python Libraries Every Data Scientist Should Know in 2024"</p>
                            </div>
                            <div>
                              <p className="text-sm text-foreground font-medium">Auto-Generated Slug:</p>
                              <p className="text-muted-foreground">10-essential-python-libraries-every-data-scientist-should-know-in-2024</p>
                              <p className="text-xs text-muted-foreground mt-1">(11 words, 86 characters - too long)</p>
                            </div>
                            <div>
                              <p className="text-sm text-foreground font-medium">Optimized Version:</p>
                              <p className="text-green-600 font-medium">python-libraries-data-science-2024</p>
                              <p className="text-xs text-muted-foreground mt-1">(5 words, 37 characters - perfect)</p>
                            </div>
                            <div className="text-xs text-muted-foreground pt-2 border-t border-border">
                              <p><strong>Why this works:</strong> Keeps main keywords (python, libraries, data science), removes filler words (essential, every, should know), includes year for freshness, stays under 60 characters.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">E-commerce Products</h3>
                        <div className="bg-muted p-4 rounded-lg">
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm text-foreground font-medium">Product Name:</p>
                              <p className="text-muted-foreground">"Nike Air Max 270 React - Men's Running Shoes (Size 10, Black/White)"</p>
                            </div>
                            <div>
                              <p className="text-sm text-foreground font-medium">Auto-Generated Slug:</p>
                              <p className="text-muted-foreground">nike-air-max-270-react-mens-running-shoes-size-10-black-white</p>
                              <p className="text-xs text-muted-foreground mt-1">(14 words, 74 characters - decent but could be cleaner)</p>
                            </div>
                            <div>
                              <p className="text-sm text-foreground font-medium">Optimized Version:</p>
                              <p className="text-green-600 font-medium">nike-air-max-270-black-white</p>
                              <p className="text-xs text-muted-foreground mt-1">(6 words, 30 characters - cleaner for filtering)</p>
                            </div>
                            <div className="text-xs text-muted-foreground pt-2 border-t border-border">
                              <p><strong>Why this works:</strong> Includes brand and model, specifies color (important for e-commerce), removes redundant info (men's, running shoes, size—handled by filters), makes URL shareable.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Service Pages</h3>
                        <div className="bg-muted p-4 rounded-lg">
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm text-foreground font-medium">Page Title:</p>
                              <p className="text-muted-foreground">"Professional WordPress Website Design & Development Services in New York"</p>
                            </div>
                            <div>
                              <p className="text-sm text-foreground font-medium">Auto-Generated Slug:</p>
                              <p className="text-muted-foreground">professional-wordpress-website-design-development-services-in-new-york</p>
                              <p className="text-xs text-muted-foreground mt-1">(10 words, 78 characters - contains stop words)</p>
                            </div>
                            <div>
                              <p className="text-sm text-foreground font-medium">Optimized Version:</p>
                              <p className="text-green-600 font-medium">wordpress-website-design-new-york</p>
                              <p className="text-xs text-muted-foreground mt-1">(5 words, 35 characters - focuses on location and service)</p>
                            </div>
                            <div className="text-xs text-muted-foreground pt-2 border-t border-border">
                              <p><strong>Why this works:</strong> Primary service first (WordPress design), includes location (important for local SEO), removes generic terms (professional, services, development), matches search intent.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                      <p className="text-sm text-muted-foreground">
                        <strong>Remember:</strong> These optimized versions aren't just shorter—they're more focused. They communicate the essence of the content without unnecessary words. Before using any auto-generated slug, ask yourself: "If I saw this URL without context, would I understand what's on the page?" If yes, you've got a good slug.
                      </p>
                    </div>
                  </div>
                )}
              </article>

              {/* Character Limits */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('characterLimits')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                  aria-expanded={openSections.characterLimits}
                >
                  <h2 className="text-xl font-bold text-foreground">Character Limits & Length Guidelines</h2>
                  {openSections.characterLimits ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.characterLimits && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      How long should your slug actually be? This isn't just about SEO—it's about usability. Long URLs get cut off in search results, look messy in emails, and are hard to remember. Here's what I've found works best across different platforms.
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">The 50-60 Character Sweet Spot</h3>
                        <p className="text-muted-foreground">
                          Most search engines display about 50-60 characters of a URL in search results. Beyond that, they add ellipses (...). If your important keywords get cut off, you're missing valuable real estate. Aim for 3-5 descriptive words that fit within this limit.
                        </p>
                      </div>
                      
                      <div className="bg-muted p-4 rounded-lg">
                        <h4 className="font-medium text-foreground mb-2">Platform-Specific Limits</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Google Search Results</span>
                            <span className="text-foreground font-medium">~60 chars displayed</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Twitter (without link shortener)</span>
                            <span className="text-foreground font-medium">23 chars count toward limit</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Email Clients</span>
                            <span className="text-foreground font-medium">Varies, but shorter is better</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Mobile Screens</span>
                            <span className="text-foreground font-medium">40-50 chars visible</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Printed Materials</span>
                            <span className="text-foreground font-medium">Keep under 30 if possible</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">When to Break the Rules</h3>
                        <p className="text-muted-foreground">
                          Sometimes, longer slugs make sense. If you're creating a comprehensive guide or a very specific product page, clarity might trump brevity. For example, "how-to-replace-iphone-12-pro-max-battery" (46 chars) is perfectly acceptable even though it's specific. Just make sure your primary keywords come first.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">The Word Count Rule of Thumb</h3>
                        <p className="text-muted-foreground">
                          Instead of counting characters, count words. Good slugs typically have 3-5 words. Fewer than 3 might be too vague ("travel-tips"). More than 5 usually means you're including unnecessary details. Each word should add value and help identify the content.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                        <p className="text-sm text-muted-foreground">
                          <strong>Practical Test:</strong> Try typing your slug on a mobile keyboard. How many taps does it take? If it feels like a chore, it's probably too long. Good slugs should be easy to type from memory—important for situations where someone might be verbally telling another person how to find your content.
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mt-6">
                      The length slider in our tool defaults to 60 characters, but you can adjust it based on your needs. For most websites, keeping it between 40-60 characters strikes the right balance between being descriptive and being concise. Remember: every additional character is another opportunity for someone to make a typo when typing the URL manually.
                    </p>
                  </div>
                )}
              </article>

              {/* Related Tools Section - Kept as is */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('relatedTools')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                  aria-expanded={openSections.relatedTools}
                >
                  <h2 className="text-xl font-bold text-foreground">Related Text & SEO Tools</h2>
                  {openSections.relatedTools ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.relatedTools && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Explore other useful text and SEO tools from GrockTool.com:
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
                        <Link href="/text-tools/case-converter" className="text-accent hover:underline">
                          <strong>Case Converter:</strong> Convert text between different cases
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        <Link href="/text-tools/remove-special-chars" className="text-accent hover:underline">
                          <strong>Remove Special Characters:</strong> Clean text by removing special symbols
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

              {/* Frequently Asked Questions */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('faqs')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                  aria-expanded={openSections.faqs}
                >
                  <h2 className="text-xl font-bold text-foreground">Frequently Asked Questions About URL Slugs</h2>
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
                    <div className="mt-8 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <h3 className="text-lg font-semibold text-foreground mb-2">About This Tool</h3>
                      <p className="text-sm text-muted-foreground">
                        This slug generator follows current web standards and SEO best practices as of 2024. While we aim for accuracy, search engine algorithms and technical requirements do evolve. For mission-critical URLs or large-scale website migrations, consider consulting with SEO professionals. The examples and guidelines provided here are based on real-world experience managing websites across various industries and platforms.
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

export default SlugGenerator;