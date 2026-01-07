'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, Lock, Unlock, RefreshCw, Check, AlertCircle, ChevronDown, ChevronUp, Code, FileText, Shield, Key, Zap, Link as LinkIcon, Globe, Cpu } from 'lucide-react';
import Head from 'next/head';

export default function UrlEncoderDecoderPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

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

  // Related Tools Data - Updated with additional tools
  const relatedTools = [
    { name: 'JSON to CSV Converter', path: '/developer-tools/json-to-csv', icon: FileText },
    { name: 'Base64 Encoder / Decoder', path: '/developer-tools/base64-encoder-decoder', icon: Lock },
    { name: 'JWT Decoder', path: '/developer-tools/jwt-decoder', icon: Shield },
    { name: 'Regex Tester', path: '/developer-tools/regex-tester', icon: Code },
    { name: 'UUID Generator', path: '/developer-tools/uuid-generator', icon: Key },
    { name: 'Unix Timestamp Converter', path: '/developer-tools/unix-timestamp', icon: Zap },
    { name: 'JSON Formatter & Validator', path: '/developer-tools/json-formatter', icon: Cpu },
    { name: 'JSON to XML Converter', path: '/developer-tools/json-to-xml', icon: FileText },
    { name: 'HTML Minifier', path: '/developer-tools/html-minifier', icon: Code },
    { name: 'CSS Minifier', path: '/developer-tools/css-minifier', icon: Code },
    { name: 'JavaScript Minifier', path: '/developer-tools/javascript-minifier', icon: Code },
    { name: 'HTML Escape / Unescape', path: '/developer-tools/html-escape-unescape', icon: Shield },
    { name: 'Lorem Ipsum Generator', path: '/developer-tools/lorem-ipsum-generator', icon: FileText },
    { name: 'Color Code Converter', path: '/developer-tools/color-code-converter', icon: Cpu }
  ];

  // FAQ Data
  const faqData = [
    {
      question: "What is URL encoding and why is it necessary?",
      answer: "URL encoding, also known as percent-encoding, converts special characters in URLs into a format that can be safely transmitted over the internet. It's necessary because URLs can only contain a limited set of characters (A-Z, a-z, 0-9, and a few special characters). Characters like spaces, symbols, and non-ASCII characters must be encoded to prevent interpretation errors and ensure proper data transmission between browsers and servers."
    },
    {
      question: "What's the difference between encodeURI and encodeURIComponent?",
      answer: "encodeURI is designed for complete URLs and doesn't encode characters that are valid in URLs (like :, /, ?, &, =, etc.). encodeURIComponent encodes everything except alphanumeric characters and - _ . ! ~ * ' ( ), making it suitable for encoding individual URL components like query parameters. Our tool uses encodeURIComponent for encoding and decodeURIComponent for decoding, which is the standard approach for web development."
    },
    {
      question: "When should I use URL encoding in web development?",
      answer: "Use URL encoding when: 1) Building query strings with special characters or spaces, 2) Passing data via GET requests, 3) Including user input in URLs, 4) Working with API endpoints that require encoded parameters, 5) Storing URL parameters in cookies or local storage, 6) Creating dynamic URLs with variable data. Always encode data before sending it in URLs to prevent broken links and security vulnerabilities."
    },
    {
      question: "Does URL encoding affect SEO or website performance?",
      answer: "Proper URL encoding improves SEO by ensuring search engines can correctly crawl and index your URLs. Incorrectly encoded URLs can lead to 404 errors, duplicate content issues, and poor user experience. For performance, encoded URLs are slightly longer but the difference is negligible. Modern browsers and servers handle encoded URLs efficiently, so focus on readability and proper encoding rather than minimal URL length."
    },
    {
      question: "Can URL encoding handle international characters and emojis?",
      answer: "Yes, URL encoding supports UTF-8 characters including international alphabets (Chinese, Arabic, Cyrillic, etc.) and emojis. These characters are converted to percent-encoded sequences (e.g., %F0%9F%98%80 for 😀). Modern browsers automatically handle this encoding, but when working with URLs programmatically, you should always use proper encoding functions to ensure compatibility across all systems and devices."
    }
  ];

  const encodeUrl = () => {
    try {
      if (!input.trim()) {
        setError('Please enter text to encode');
        setOutput('');
        return;
      }

      const encoded = encodeURIComponent(input);
      setOutput(encoded);
      setError(null);
      setCopied(false);
    } catch (err: any) {
      setError('Failed to encode URL. Please check your input.');
      setOutput('');
    }
  };

  const decodeUrl = () => {
    try {
      if (!input.trim()) {
        setError('Please enter encoded URL to decode');
        setOutput('');
        return;
      }

      const decoded = decodeURIComponent(input);
      setOutput(decoded);
      setError(null);
      setCopied(false);
    } catch (err: any) {
      setError('Invalid encoded URL string. Please check your input format.');
      setOutput('');
    }
  };

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const resetAll = () => {
    setInput('');
    setOutput('');
    setError(null);
    setCopied(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    setError(null);
  };

  return (
    <>
      <Head>
        <title>URL Encoder / Decoder | Free Online URL Encoding Tool - GrockTool.com</title>
        <meta name="description" content="Encode URLs to percent-encoding format and decode encoded URLs instantly with our free online tool. Perfect for web developers, API testing, and URL parameter handling." />
        <meta name="keywords" content="URL encoder, URL decoder, percent encoding, URL encoding tool, decode URL, encode URL, online URL converter, web development tools, URL parameter encoding" />
        <meta property="og:title" content="URL Encoder / Decoder | Free Online URL Encoding Tool - GrockTool.com" />
        <meta property="og:description" content="Free online URL encoder and decoder tool. Instantly convert URLs to encoded format and decode percent-encoded strings back to original URLs with accurate results." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="URL Encoder / Decoder - GrockTool.com" />
        <meta name="twitter:description" content="Free online URL encoding and decoding tool for web developers and API testing." />
        <link rel="canonical" href="https://grocktool.com/developer-tools/url-encoder-decoder" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "URL Encoder / Decoder",
            "applicationCategory": "DeveloperApplication",
            "operatingSystem": "Any",
            "description": "Free online tool to encode URLs to percent-encoding format and decode encoded URLs back to original text instantly",
            "url": "https://grocktool.com/developer-tools/url-encoder-decoder",
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
              "URL encoding with encodeURIComponent",
              "URL decoding with decodeURIComponent",
              "UTF-8 character support",
              "Error validation",
              "Clipboard copy functionality",
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
                Back to Developer Tools
              </Link>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                  URL Encoder & Decoder Tool – Fast, Accurate & Free
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Convert URLs to percent-encoding format and decode encoded URLs instantly
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
                      Input URL or Text
                    </label>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Globe size={12} />
                      <span>Enter URL or text</span>
                    </div>
                  </div>
                  <textarea
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Enter URL to encode or encoded URL to decode
Example: https://example.com/search?q=hello world"
                    className="w-full min-h-[200px] p-4 bg-input border border-border rounded-lg sm:rounded-xl focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-ring focus:ring-opacity-50 resize-none text-foreground placeholder-muted-foreground font-mono text-sm"
                  />
                  
                  {error && (
                    <div className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <AlertCircle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-red-600">{error}</p>
                    </div>
                  )}
                </div>

                {/* Output Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-foreground">
                      Encoded / Decoded Result
                    </label>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <LinkIcon size={12} />
                      <span>Percent-encoded or decoded output</span>
                    </div>
                  </div>
                  <textarea
                    value={output}
                    readOnly
                    placeholder="Result will appear here after encoding or decoding"
                    className="w-full min-h-[200px] p-4 bg-input border border-border rounded-lg sm:rounded-xl focus:outline-none resize-none text-foreground placeholder-muted-foreground font-mono text-sm"
                  />
                  
                  {output && (
                    <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <p className="text-sm text-green-600">
                        ✓ Successfully {input.includes('%') && decodeURIComponent(input) === output ? 'decoded' : 'encoded'} your input
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  onClick={resetAll}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg sm:rounded-xl hover:bg-secondary/80 transition-colors text-sm sm:text-base"
                >
                  <RefreshCw size={16} className="sm:w-4 sm:h-4" />
                  Clear All
                </button>
                <button
                  onClick={encodeUrl}
                  disabled={!input.trim()}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg sm:rounded-xl hover:bg-blue-700 transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Lock size={16} className="sm:w-4 sm:h-4" />
                  Encode URL
                </button>
                <button
                  onClick={decodeUrl}
                  disabled={!input.trim()}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-lg sm:rounded-xl hover:bg-purple-700 transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Unlock size={16} className="sm:w-4 sm:h-4" />
                  Decode URL
                </button>
                {output && (
                  <button
                    onClick={copyToClipboard}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent text-accent-foreground rounded-lg sm:rounded-xl hover:bg-accent/80 transition-colors text-sm sm:text-base"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? 'Copied!' : 'Copy Result'}
                  </button>
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
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">How to Use URL Encoder/Decoder</h3>
              <div className="space-y-2 text-muted-foreground text-sm">
                <p>
                  This tool allows you to encode URLs to percent-encoding format and decode percent-encoded URLs back to readable format.
                </p>
                <div className="text-xs sm:text-sm space-y-1 pt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Enter your URL or text in the input field</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Click "Encode URL" to convert to percent-encoded format</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Click "Decode URL" to convert percent-encoded string back to original</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Copy the result or use "Clear All" to start over</span>
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
                  <h2 className="text-xl font-bold text-foreground">URL Encoder/Decoder - What It Does</h2>
                  {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.whatItDoes && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      This free online URL encoder and decoder tool provides essential functionality for web developers, SEO specialists, and anyone working with URLs. URL encoding (percent-encoding) converts special characters in URLs into a safe format that can be transmitted over the internet without errors. Since URLs can only contain a limited character set, encoding ensures that spaces, symbols, international characters, and special data are properly handled when passed as query parameters or included in web addresses.
                    </p>
                    <p className="text-muted-foreground">
                      The tool implements standard encodeURIComponent and decodeURIComponent functions, which are the industry-standard methods for URL encoding in web development. It handles UTF-8 characters properly, supports international text and emojis, and provides clear error messages for invalid inputs. Whether you're building API endpoints, creating dynamic web applications, working with analytics tracking parameters, or debugging URL-related issues, this URL encoder/decoder delivers accurate, instant results with proper validation and user-friendly feedback.
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
                  <h2 className="text-xl font-bold text-foreground">Practical Use Cases for URL Encoding</h2>
                  {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.useCases && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      URL encoding serves critical purposes across web development, SEO, and data transmission scenarios:
                    </p>
                    <ul className="space-y-3 text-muted-foreground pl-5">
                      <li className="pl-2">
                        <strong className="text-foreground">Web Development & API Integration</strong>
                        <p className="mt-1">Encode query parameters for GET requests, build dynamic URLs with user input, and prepare data for API endpoints that require properly encoded parameters.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">SEO & Analytics Tracking</strong>
                        <p className="mt-1">Create clean, properly encoded URLs for better search engine crawling and encode UTM parameters, campaign tracking codes, and referral data for analytics platforms.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Form Data Submission</strong>
                        <p className="mt-1">Encode form data when using GET method submissions, handle special characters in search queries, and prepare data for URL-based form submissions.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Social Media & Sharing</strong>
                        <p className="mt-1">Encode URLs for social media sharing, ensure proper display of shared links with parameters, and handle special characters in shareable content URLs.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Internationalization (i18n)</strong>
                        <p className="mt-1">Handle URLs with international characters, encode non-ASCII text for global websites, and support multilingual content in web addresses.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Security & Data Validation</strong>
                        <p className="mt-1">Properly encode user input to prevent URL injection attacks, validate encoded data before processing, and ensure safe transmission of sensitive parameters.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Email Marketing & Links</strong>
                        <p className="mt-1">Encode tracking parameters in email campaign links, handle special characters in newsletter URLs, and ensure click tracking works correctly across all email clients.</p>
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
                  <h2 className="text-xl font-bold text-foreground">How to Use This URL Encoder/Decoder Effectively</h2>
                  {openSections.howToUse ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.howToUse && (
                  <div className="px-6 pb-6">
                    <ol className="space-y-4 text-muted-foreground pl-5">
                      <li className="pl-2">
                        <strong className="text-foreground">Prepare Your Input Data</strong>
                        <p className="mt-1">For encoding: Enter URLs, query strings, or any text containing special characters. For decoding: Paste percent-encoded strings (containing % symbols).</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Choose Encoding or Decoding</strong>
                        <p className="mt-1">Click "Encode URL" to convert text to percent-encoded format. Click "Decode URL" to convert encoded strings back to original text.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Validate Your Results</strong>
                        <p className="mt-1">Check the output area for your converted data. Encoded URLs replace special characters with % followed by hexadecimal codes (e.g., space becomes %20).</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Copy or Use Your Output</strong>
                        <p className="mt-1">Use "Copy Result" to copy the output to clipboard for immediate use in your applications, documentation, or testing environments.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Handle Errors Appropriately</strong>
                        <p className="mt-1">If you receive an error, check your input format. For decoding, ensure the string is properly percent-encoded with valid hexadecimal codes.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Clear and Start Over</strong>
                        <p className="mt-1">Use "Clear All" to reset both input and output fields when working with multiple conversions or different datasets.</p>
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
                  <h2 className="text-xl font-bold text-foreground">URL Encoding Examples</h2>
                  {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.examples && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground text-sm mb-4">
                      Below are practical examples demonstrating URL encoding and decoding with different types of data:
                    </p>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 1: Basic URL with Query Parameters</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                            <h4 className="text-sm font-semibold text-foreground mb-2">Original URL:</h4>
                            <pre className="text-xs text-muted-foreground font-mono whitespace-pre">
{`https://example.com/search?q=web development&sort=date&page=1`}
                            </pre>
                          </div>
                          <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                            <h4 className="text-sm font-semibold text-foreground mb-2">URL Encoded:</h4>
                            <pre className="text-xs text-muted-foreground font-mono whitespace-pre">
{`https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dweb%2520development%26sort%3Ddate%26page%3D1`}
                            </pre>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 2: Special Characters and Symbols</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                            <h4 className="text-sm font-semibold text-foreground mb-2">Original Text:</h4>
                            <pre className="text-xs text-muted-foreground font-mono whitespace-pre">
{`Product: Café & Restaurant - 50% off!
Price: $49.99 <tax included>`}
                            </pre>
                          </div>
                          <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                            <h4 className="text-sm font-semibold text-foreground mb-2">URL Encoded:</h4>
                            <pre className="text-xs text-muted-foreground font-mono whitespace-pre">
{`Product%3A%20Caf%C3%A9%20%26%20Restaurant%20-%2050%25%20off!%0APrice%3A%20%2449.99%20%3Ctax%20included%3E`}
                            </pre>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 3: International Characters and Emojis</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                            <h4 className="text-sm font-semibold text-foreground mb-2">Original Text:</h4>
                            <pre className="text-xs text-muted-foreground font-mono whitespace-pre">
{`Search: 中文 español français русский
Reaction: 😀 👍 🎉`}
                            </pre>
                          </div>
                          <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                            <h4 className="text-sm font-semibold text-foreground mb-2">URL Encoded:</h4>
                            <pre className="text-xs text-muted-foreground font-mono whitespace-pre">
{`Search%3A%20%E4%B8%AD%E6%96%87%20espa%C3%B1ol%20fran%C3%A7ais%20%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9%0AReaction%3A%20%F0%9F%98%80%20%F0%9F%91%8D%20%F0%9F%8E%89`}
                            </pre>
                          </div>
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
                  <h2 className="text-xl font-bold text-foreground">Frequently Asked Questions About URL Encoding</h2>
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
                      <h3 className="text-lg font-semibold text-foreground mb-2">Security & Best Practices</h3>
                      <p className="text-sm text-muted-foreground">
                        Important: URL encoding is not a security measure—it's a data format conversion. Never use URL encoding to hide sensitive information like passwords or API keys. Always validate and sanitize user input before encoding to prevent injection attacks. For query parameters, consider using POST requests instead of GET for sensitive data. When decoding URLs, always check for malformed input that could crash your application. Implement proper error handling and input validation in your production code.
                      </p>
                    </div>
                  </div>
                )}
              </article>

              {/* Related Tools Section */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('relatedTools')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h2 className="text-xl font-bold text-foreground">More Developer Tools</h2>
                  {openSections.relatedTools ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.relatedTools && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Explore other useful developer tools from our Developer Tools category:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {relatedTools.map((tool, index) => {
                        const Icon = tool.icon;
                        return (
                          <Link
                            key={index}
                            href={tool.path}
                            className="flex items-center gap-3 p-4 bg-secondary/30 rounded-lg border border-border hover:bg-secondary/50 transition-colors group"
                          >
                            <div className="bg-accent/10 p-2 rounded-lg group-hover:bg-accent/20 transition-colors">
                              <Icon size={18} className="text-accent" />
                            </div>
                            <div>
                              <div className="font-medium text-foreground group-hover:text-accent transition-colors">{tool.name}</div>
                              <div className="text-xs text-muted-foreground">Visit tool →</div>
                            </div>
                          </Link>
                        );
                      })}
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
}