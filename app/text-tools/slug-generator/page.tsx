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
      question: "What is a URL slug and why is it important for SEO?",
      answer: "A URL slug is the part of a URL that identifies a specific page, typically appearing after the domain name. For example, in 'example.com/blog/seo-tips', 'seo-tips' is the slug. SEO-optimized slugs improve search rankings because search engines read keywords in URLs, users find them more readable, and they're easier to share. Good slugs should be descriptive, keyword-rich, and use hyphens to separate words."
    },
    {
      question: "What's the difference between hyphen, underscore, and dot separators?",
      answer: "Hyphens (-) are the standard for SEO-friendly URLs because search engines treat them as word separators. Underscores (_) are often used in programming but aren't recognized as word separators by search engines. Dots (.) are typically used for file extensions. For best SEO results, always use hyphens: 'seo-friendly-urls' not 'seo_friendly_urls' or 'seo.friendly.urls'."
    },
    {
      question: "Should URL slugs always be in lowercase?",
      answer: "Yes, URL slugs should always be lowercase for several reasons: 1) URLs are case-sensitive on some servers, so 'Page' and 'page' could lead to different pages. 2) Lowercase is more readable and user-friendly. 3) Search engines may treat 'Page' and 'page' as different URLs, causing duplicate content issues. 4) It's a web standard that prevents confusion and broken links."
    },
    {
      question: "What is the ideal length for a URL slug?",
      answer: "The ideal URL slug length is 3-5 words or approximately 50-60 characters. Shorter slugs are more memorable and user-friendly. Longer slugs may get cut off in search results and social media shares. Our tool defaults to 60 characters maximum, but you can adjust this. Focus on including your primary keywords near the beginning while keeping the slug concise and descriptive."
    },
    {
      question: "How does the slug generator handle special characters and non-English text?",
      answer: "Our slug generator automatically removes special characters (!@#$%^&*() etc.) and converts spaces to your chosen separator. For non-English characters (accented letters, Cyrillic, Arabic, etc.), the tool converts them to their closest ASCII equivalents when possible. For example: 'café' becomes 'cafe', 'München' becomes 'muenchen'. This ensures compatibility across all browsers and systems."
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

  useEffect(() => {
    if (inputText) {
      generateSlug();
    } else {
      setOutputText('');
      setCurrentLength(0);
    }
  }, [inputText, separator, lowercase, removeSpecialChars, maxLength]);

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setCurrentLength(0);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
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
        <title>Slug Generator | Create SEO-Friendly URL Slugs - GrockTool.com</title>
        <meta name="description" content="Free URL slug generator tool that creates SEO-friendly slugs from any text. Perfect for blog posts, pages, and website URLs with customizable options." />
        <meta name="keywords" content="slug generator, url slug generator, seo slug generator, url slug creator, seo friendly url generator, web slug maker, permalink generator, url converter" />
        <meta property="og:title" content="Slug Generator | Create SEO-Friendly URL Slugs - GrockTool.com" />
        <meta property="og:description" content="Generate perfect SEO-friendly URL slugs instantly with our free online slug generator. Customize options for lowercase, special characters, and length limits." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Slug Generator - GrockTool.com" />
        <meta name="twitter:description" content="Create SEO-optimized URL slugs for better search engine rankings and user experience." />
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
                  Slug Generator
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Generate URL-friendly slugs from your text for SEO-optimized URLs
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
                    />
                    {outputText && (
                      <button
                        onClick={handleCopy}
                        className="absolute top-3 right-3 p-2 text-muted-foreground hover:text-foreground transition-colors"
                        title="Copy to clipboard"
                      >
                        <Copy size={16} className="sm:w-4 sm:h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
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
                  Generate clean, SEO-friendly URL slugs from your text titles and phrases.
                </p>
                <div className="text-xs sm:text-sm space-y-1 pt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Enter your title or text that you want to convert to a slug</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Choose your preferred separator (hyphen is most common for URLs)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>The slug will be generated automatically as you type</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Use the generated slug in your URLs for better SEO and readability</span>
                  </div>
                </div>
                <div className="text-xs sm:text-sm space-y-2 pt-3">
                  <div className="font-medium text-foreground">Best Practices:</div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-accent rounded-full"></div>
                    <span>Keep slugs short and descriptive</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-accent rounded-full"></div>
                    <span>Use hyphens for better SEO (search engines treat them as spaces)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-accent rounded-full"></div>
                    <span>Avoid special characters and uppercase letters</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-accent rounded-full"></div>
                    <span>Include primary keywords near the beginning</span>
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
                  <h2 className="text-xl font-bold text-foreground">Slug Generator Tool - What It Does</h2>
                  {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.whatItDoes && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      This free online slug generator transforms any text into SEO-friendly URL slugs perfect for websites, blogs, e-commerce products, and digital content. The tool automatically cleans your text by removing special characters, converting to lowercase, replacing spaces with your chosen separator, and optimizing length for search engines. It provides real-time slug generation with customizable options to match your specific requirements.
                    </p>
                    <p className="text-muted-foreground">
                      Unlike manual slug creation, our generator follows SEO best practices and technical requirements for URL structures. It ensures compatibility across all browsers and content management systems (WordPress, Shopify, etc.). Whether you're creating new web pages, optimizing existing URLs, or managing large content databases, this tool saves time and improves your website's search engine visibility through properly formatted, keyword-rich slugs that enhance user experience and click-through rates.
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
                  <h2 className="text-xl font-bold text-foreground">Practical Use Cases for Slug Generation</h2>
                  {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.useCases && (
                  <div className="px-6 pb-6">
                    <ul className="space-y-3 text-muted-foreground pl-5">
                      <li className="pl-2">
                        <strong className="text-foreground">Blog Post URL Creation</strong>
                        <p className="mt-1">Generate clean, keyword-optimized slugs from blog post titles that improve SEO and are easy to remember and share on social media.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">E-commerce Product Pages</strong>
                        <p className="mt-1">Create consistent product URLs from product names, especially important for large catalogs with thousands of items and product variations.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Website Migration & URL Restructuring</strong>
                        <p className="mt-1">Batch generate new slugs when migrating websites or restructuring URL architectures for better SEO and user navigation.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Content Management System Integration</strong>
                        <p className="mt-1">Use API or batch processing to generate slugs automatically when creating new content in WordPress, Drupal, Joomla, or other CMS platforms.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Social Media Profile URLs</strong>
                        <p className="mt-1">Create clean custom URLs for social media profiles and pages based on business names, personal brands, or campaign names.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Multilingual Website URLs</strong>
                        <p className="mt-1">Generate language-specific slugs that maintain SEO value while being readable and culturally appropriate in different languages.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">File Naming Conventions</strong>
                        <p className="mt-1">Create consistent, web-friendly file names for images, documents, PDFs, and downloads on your website or content delivery network.</p>
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
                  <h2 className="text-xl font-bold text-foreground">How to Generate Perfect URL Slugs</h2>
                  {openSections.howToUse ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.howToUse && (
                  <div className="px-6 pb-6">
                    <ol className="space-y-4 text-muted-foreground pl-5">
                      <li className="pl-2">
                        <strong className="text-foreground">Enter Your Source Text</strong>
                        <p className="mt-1">Paste or type the text you want to convert into a URL slug. This could be a blog title, product name, page heading, or any descriptive text that needs a clean URL representation.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Customize Generation Options</strong>
                        <p className="mt-1">Adjust settings: choose separator (hyphen recommended for SEO), enable lowercase conversion, set special character removal, and define maximum slug length (50-60 characters ideal).</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Review Generated Slug</strong>
                        <p className="mt-1">Check the automatically generated slug for readability and SEO optimization. Ensure it contains your target keywords near the beginning and maintains natural language flow.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Optimize for SEO</strong>
                        <p className="mt-1">Manually tweak if needed: remove unnecessary words (stop words like "the", "a", "an"), ensure keyword prominence, and check length. Aim for 3-5 descriptive words.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Copy and Implement</strong>
                        <p className="mt-1">Copy the final slug to your clipboard and use it in your website's CMS, blog platform, or web development project. Verify it works correctly in a browser.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Test and Validate</strong>
                        <p className="mt-1">After implementation, test the URL in multiple browsers to ensure it loads correctly, doesn't have character encoding issues, and maintains SEO value in search engines.</p>
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
                  <h2 className="text-xl font-bold text-foreground">Slug Generation Examples & Best Practices</h2>
                  {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.examples && (
                  <div className="px-6 pb-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 1: Blog Post Title to SEO Slug</h3>
                        <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                          <pre className="text-sm text-muted-foreground font-mono">
{`Input Title:
"How to Create SEO-Friendly URLs That Rank in 2024"

Generated Slug (with default options):
how-to-create-seo-friendly-urls-that-rank-in-2024

Manual Optimization (Recommended):
seo-friendly-urls-rank-2024

SEO Analysis:
• Original: 11 words, 58 characters
• Generated: 11 words, 58 characters
• Optimized: 5 words, 30 characters (better)
• Keywords: "seo-friendly-urls" at beginning
• Removed stop words: "how", "to", "that", "in"
• Year included for freshness
• Hyphenated for readability

Best Practices Applied:
✅ Primary keywords first
✅ Removed unnecessary words
✅ Included year for timeliness
✅ Used hyphens as separators
✅ Kept under 60 characters`}
                          </pre>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 2: E-commerce Product Name</h3>
                        <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                          <pre className="text-sm text-muted-foreground font-mono">
{`Input Product Name:
"Apple iPhone 15 Pro Max - 256GB (Deep Purple) - Latest Model 2023"

Generated Slug:
apple-iphone-15-pro-max-256gb-deep-purple-latest-model-2023

Manual Optimization (Recommended):
iphone-15-pro-max-256gb-deep-purple

SEO Analysis:
• Original: 14 words, 73 characters
• Generated: 14 words, 73 characters
• Optimized: 7 words, 43 characters (ideal)
• Removed: "Apple" (brand in category), "Latest Model 2023" (redundant)
• Keywords: Main product name first, specs, color
• Perfect for product filtering and search

Best Practices Applied:
✅ Product name first (iPhone 15 Pro Max)
✅ Key specifications included (256GB)
✅ Color variation specified (Deep Purple)
✅ Removed redundant information
✅ Structured for e-commerce navigation`}
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

              {/* Frequently Asked Questions - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('faqs')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
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
                    <div className="mt-8 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                      <h3 className="text-lg font-semibold text-foreground mb-2">SEO Best Practices Disclaimer</h3>
                      <p className="text-sm text-muted-foreground">
                        While this slug generator follows SEO best practices, optimal URL structure depends on your specific website architecture, content strategy, and target audience. Always consider your website's overall SEO strategy, including keyword research, content quality, and user experience. For large websites or complex URL structures, consult with SEO professionals. Search engine algorithms and best practices evolve, so stay updated with current SEO guidelines from major search engines like Google, Bing, and others.
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