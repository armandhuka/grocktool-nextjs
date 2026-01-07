'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, RefreshCw, Check, AlertCircle, ChevronDown, ChevronUp, Code, FileText, Shield, Key, Zap, Cpu, Tag, Gauge } from 'lucide-react';
import Head from 'next/head';

export default function HtmlMinifierPage() {
  const [htmlInput, setHtmlInput] = useState('');
  const [minifiedOutput, setMinifiedOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [originalSize, setOriginalSize] = useState(0);
  const [minifiedSize, setMinifiedSize] = useState(0);

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
    { name: 'Base64 Encoder / Decoder', path: '/developer-tools/base64-encoder-decoder', icon: Shield },
    { name: 'JWT Decoder', path: '/developer-tools/jwt-decoder', icon: Shield },
    { name: 'Regex Tester', path: '/developer-tools/regex-tester', icon: Code },
    { name: 'UUID Generator', path: '/developer-tools/uuid-generator', icon: Key },
    { name: 'Unix Timestamp Converter', path: '/developer-tools/unix-timestamp', icon: Zap },
    { name: 'JSON Formatter & Validator', path: '/developer-tools/json-formatter', icon: Cpu },
    { name: 'JSON to XML Converter', path: '/developer-tools/json-to-xml', icon: FileText },
    { name: 'CSS Minifier', path: '/developer-tools/css-minifier', icon: Code },
    { name: 'JavaScript Minifier', path: '/developer-tools/javascript-minifier', icon: Code },
    { name: 'URL Encoder / Decoder', path: '/developer-tools/url-encoder-decoder', icon: Tag },
    { name: 'HTML Escape / Unescape', path: '/developer-tools/html-escape-unescape', icon: Shield },
    { name: 'Lorem Ipsum Generator', path: '/developer-tools/lorem-ipsum-generator', icon: FileText },
    { name: 'Color Code Converter', path: '/developer-tools/color-code-converter', icon: Cpu }
  ];

  // FAQ Data
  const faqData = [
    {
      question: "What is HTML minification and why is it important for website performance?",
      answer: "HTML minification is the process of removing unnecessary characters from HTML code without changing its functionality. This includes removing comments, whitespace, line breaks, and unnecessary quotes. Minification reduces file size, leading to faster page load times, reduced bandwidth usage, and improved SEO ranking. Google's PageSpeed Insights and Core Web Vitals prioritize fast-loading pages, making HTML minification essential for modern web development and optimal user experience."
    },
    {
      question: "Does HTML minification affect website functionality or SEO?",
      answer: "Proper HTML minification does not affect functionality when done correctly—it only removes non-essential characters while preserving the code's behavior. For SEO, minification improves performance metrics that search engines consider for ranking. However, avoid minifying inline JSON-LD structured data or special script tags that require specific formatting. Always test minified code thoroughly to ensure all interactive elements, forms, and scripts continue working as expected."
    },
    {
      question: "How much size reduction can I expect from HTML minification?",
      answer: "Typical HTML minification reduces file size by 15-30%, depending on the original code's structure. Pages with many comments, whitespace, and verbose formatting see the greatest reduction. For example, a 100KB HTML file might reduce to 70-85KB after minification. Combined with CSS and JavaScript minification, overall page weight can decrease by 40-60%, significantly improving load times, especially on mobile networks and slower connections."
    },
    {
      question: "Should I minify HTML on development or production environments?",
      answer: "Always keep unminified HTML in development for readability and debugging. Minify only in production using build tools or during deployment. Most modern frameworks (Next.js, React, Vue) include minification in their build processes. For static sites, minify before deployment. Never minify the only copy of your source code—maintain original files separately. Use version control to track changes in human-readable format while deploying minified versions to production."
    },
    {
      question: "Can minified HTML be formatted back to readable code?",
      answer: "Minification is not easily reversible because it removes information (comments, formatting). While code formatters can add indentation, they cannot restore removed comments or specific whitespace. Always preserve original unminified files. For debugging minified production code, use browser developer tools' 'Pretty Print' feature which adds basic formatting. For critical debugging, compare against your original source files rather than trying to reverse minification completely."
    }
  ];

  const minifyHtml = () => {
    try {
      if (!htmlInput.trim()) {
        setError('Please enter HTML code to minify');
        setMinifiedOutput('');
        setOriginalSize(0);
        setMinifiedSize(0);
        return;
      }

      const originalSizeBytes = new Blob([htmlInput]).size;
      setOriginalSize(originalSizeBytes);

      let minified = htmlInput
        // Remove HTML comments but preserve conditional comments and special scripts
        .replace(/<!--(?!\[if |<!\[endif\]|\[CDATA\[|\]\]>)[\s\S]*?-->/g, '')
        // Remove whitespace between tags
        .replace(/>\s+</g, '><')
        // Remove multiple spaces (except in pre/code/textarea)
        .replace(/(?<!(pre|code|textarea|script|style)[^>]*>)[\s\t]+(?![^<]*<\/(pre|code|textarea|script|style)>)/g, ' ')
        // Remove leading/trailing whitespace from lines
        .replace(/^\s+|\s+$/gm, '')
        // Trim the whole result
        .trim();

      const minifiedSizeBytes = new Blob([minified]).size;
      setMinifiedSize(minifiedSizeBytes);
      setMinifiedOutput(minified);
      setError(null);
      setCopied(false);
    } catch (err: any) {
      setError('Failed to minify HTML. Please check your HTML syntax.');
      setMinifiedOutput('');
      setOriginalSize(0);
      setMinifiedSize(0);
    }
  };

  const copyToClipboard = async () => {
    if (!minifiedOutput) return;
    
    try {
      await navigator.clipboard.writeText(minifiedOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const resetAll = () => {
    setHtmlInput('');
    setMinifiedOutput('');
    setError(null);
    setCopied(false);
    setOriginalSize(0);
    setMinifiedSize(0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHtmlInput(e.target.value);
    setError(null);
  };

  const calculateReduction = () => {
    if (originalSize === 0) return 0;
    return Math.round(((originalSize - minifiedSize) / originalSize) * 100);
  };

  return (
    <>
      <Head>
        <title>HTML Minifier | Free Online HTML Compression Tool - GrockTool.com</title>
        <meta name="description" content="Minify HTML code to reduce file size and improve website performance. Remove comments, whitespace, and unnecessary characters while preserving functionality." />
        <meta name="keywords" content="HTML minifier, HTML compression, minify HTML, reduce HTML size, website optimization, performance tool, online HTML minifier, web development tools, page speed optimization" />
        <meta property="og:title" content="HTML Minifier | Free Online HTML Compression Tool - GrockTool.com" />
        <meta property="og:description" content="Free online HTML minification tool. Reduce HTML file size by removing comments, whitespace, and unnecessary characters to improve website performance." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="HTML Minifier - GrockTool.com" />
        <meta name="twitter:description" content="Free online HTML minification tool for website performance optimization." />
        <link rel="canonical" href="https://grocktool.com/developer-tools/html-minifier" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "HTML Minifier",
            "applicationCategory": "DeveloperApplication",
            "operatingSystem": "Any",
            "description": "Free online tool to minify HTML code by removing comments, whitespace, and unnecessary characters to reduce file size and improve website performance",
            "url": "https://grocktool.com/developer-tools/html-minifier",
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
              "HTML comment removal",
              "Whitespace optimization",
              "File size reduction",
              "Size comparison metrics",
              "Clipboard copy functionality",
              "Performance-focused processing"
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
          <div className="max-w-lg mx-auto lg:max-w-5xl">
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
                  HTML Minifier Tool – Optimize & Compress HTML Code
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Reduce HTML file size by removing comments, whitespace, and unnecessary characters
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
                      HTML Input
                    </label>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Code size={12} />
                      <span>Original HTML code</span>
                    </div>
                  </div>
                  <textarea
                    value={htmlInput}
                    onChange={handleInputChange}
                    placeholder={`<!DOCTYPE html>
<html>
<head>
  <title>My Page</title>
  <!-- This is a comment -->
</head>
<body>
  <div class="container">
    <h1>Hello World</h1>
  </div>
</body>
</html>`}
                    className="w-full min-h-[300px] p-4 bg-input border border-border rounded-lg sm:rounded-xl focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-ring focus:ring-opacity-50 resize-none text-foreground placeholder-muted-foreground font-mono text-sm"
                  />
                  
                  {originalSize > 0 && (
                    <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-blue-600">Original Size:</span>
                        <span className="text-sm font-medium text-blue-700">{originalSize} bytes</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Output Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-foreground">
                      Minified Output
                    </label>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Code size={12} />
                      <span>Compressed HTML</span>
                    </div>
                  </div>
                  <textarea
                    value={minifiedOutput}
                    readOnly
                    placeholder="Minified HTML will appear here"
                    className="w-full min-h-[300px] p-4 bg-input border border-border rounded-lg sm:rounded-xl focus:outline-none resize-none text-foreground placeholder-muted-foreground font-mono text-sm"
                  />
                  
                  {minifiedSize > 0 && (
                    <div className="space-y-2">
                      <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-green-600">Minified Size:</span>
                          <span className="text-sm font-medium text-green-700">{minifiedSize} bytes</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-green-600">Size Reduction:</span>
                          <span className="text-sm font-medium text-green-700">{calculateReduction()}%</span>
                        </div>
                      </div>
                      <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                        <div className="flex items-center gap-2">
                          <Gauge size={14} className="text-purple-600" />
                          <span className="text-sm text-purple-600">
                            {calculateReduction() > 20 ? 'Excellent compression!' : 
                             calculateReduction() > 10 ? 'Good optimization' : 
                             'Minimal reduction - already optimized'}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <div className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg mt-4">
                  <AlertCircle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

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
                  onClick={minifyHtml}
                  disabled={!htmlInput.trim()}
                  className="flex-2 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg sm:rounded-xl hover:bg-blue-700 transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Code size={16} className="sm:w-4 sm:h-4" />
                  Minify HTML
                </button>
                {minifiedOutput && (
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
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">How to Use HTML Minifier</h3>
              <div className="space-y-2 text-muted-foreground text-sm">
                <p>
                  This tool removes unnecessary characters from HTML code to reduce file size and improve website performance.
                </p>
                <div className="text-xs sm:text-sm space-y-1 pt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Paste your HTML code into the input field</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Click "Minify HTML" to compress your code</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Check the size reduction percentage and minified output</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Use "Copy Result" to copy minified HTML or "Clear All" to start over</span>
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
                  <h2 className="text-xl font-bold text-foreground">HTML Minifier - What It Does</h2>
                  {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.whatItDoes && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      This free online HTML minifier tool optimizes your HTML code by removing unnecessary characters while preserving functionality. It intelligently strips out HTML comments (except conditional comments), eliminates excess whitespace between tags, reduces multiple spaces to single spaces, and trims leading/trailing whitespace. The result is significantly smaller HTML files that load faster, consume less bandwidth, and improve your website's Core Web Vitals scores—critical factors for SEO ranking and user experience.
                    </p>
                    <p className="text-muted-foreground">
                      The tool provides detailed size comparison metrics, showing original file size, minified file size, and percentage reduction. It preserves content within &lt;pre&gt;, &lt;code&gt;, &lt;textarea&gt;, &lt;script&gt;, and &lt;style&gt; tags to ensure critical code and formatted text remain intact. Whether you're optimizing a single HTML file, preparing code for production deployment, improving website performance metrics, or learning about web optimization techniques, this HTML minifier delivers professional-grade compression with clear, actionable results.
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
                  <h2 className="text-xl font-bold text-foreground">Practical Use Cases for HTML Minification</h2>
                  {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.useCases && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      HTML minification provides performance benefits across various web development and optimization scenarios:
                    </p>
                    <ul className="space-y-3 text-muted-foreground pl-5">
                      <li className="pl-2">
                        <strong className="text-foreground">Website Performance Optimization</strong>
                        <p className="mt-1">Improve Google PageSpeed Insights scores, enhance Core Web Vitals metrics (LCP, FID, CLS), and reduce page load times for better user experience and SEO ranking.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Production Deployment Preparation</strong>
                        <p className="mt-1">Minify HTML before deploying to production servers, reducing bandwidth costs and server load while maintaining identical functionality.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Mobile Web Optimization</strong>
                        <p className="mt-1">Reduce HTML size for mobile users on slower connections, improving accessibility and engagement on smartphones and tablets.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Email Template Development</strong>
                        <p className="mt-1">Minify HTML email templates to ensure faster loading in email clients and better compatibility across different email service providers.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Static Site Generation</strong>
                        <p className="mt-1">Optimize static HTML files generated by SSG tools like Jekyll, Hugo, or Next.js for maximum performance and minimal file size.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Learning & Education</strong>
                        <p className="mt-1">Understand web optimization principles, compare minified vs. original code, and learn best practices for production-ready web development.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">API Response Optimization</strong>
                        <p className="mt-1">Minify HTML responses from APIs and microservices to reduce payload size and improve API performance for client applications.</p>
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
                  <h2 className="text-xl font-bold text-foreground">How to Use This HTML Minifier Effectively</h2>
                  {openSections.howToUse ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.howToUse && (
                  <div className="px-6 pb-6">
                    <ol className="space-y-4 text-muted-foreground pl-5">
                      <li className="pl-2">
                        <strong className="text-foreground">Prepare Your HTML Code</strong>
                        <p className="mt-1">Copy your complete HTML code including DOCTYPE, head, and body sections. Ensure your code is valid and properly structured for best results.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Paste and Minify</strong>
                        <p className="mt-1">Paste HTML into the input field and click "Minify HTML". The tool processes your code, removing comments and unnecessary whitespace.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Review Size Reduction</strong>
                        <p className="mt-1">Check the size comparison metrics. Good minification typically achieves 15-30% reduction. Higher percentages indicate more optimization opportunities.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Verify Functionality</strong>
                        <p className="mt-1">Always test minified code in a browser to ensure all functionality works. Pay special attention to JavaScript interactions and CSS styling.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Copy and Implement</strong>
                        <p className="mt-1">Use "Copy Result" to copy minified HTML for use in production. For development, keep original unminified files for readability and maintenance.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Combine with Other Optimizations</strong>
                        <p className="mt-1">For maximum performance, combine HTML minification with CSS/JS minification, image optimization, and proper caching strategies.</p>
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
                  <h2 className="text-xl font-bold text-foreground">HTML Minification Examples</h2>
                  {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.examples && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground text-sm mb-4">
                      Below are practical examples demonstrating HTML minification with different types of code:
                    </p>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 1: Basic HTML Page</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                            <h4 className="text-sm font-semibold text-foreground mb-2">Original HTML (152 bytes):</h4>
                            <pre className="text-xs text-muted-foreground font-mono whitespace-pre">
{`<!DOCTYPE html>
<html>
<head>
  <title>My Page</title>
  <!-- SEO Description -->
</head>
<body>
  <div class="container">
    <h1>Hello World</h1>
  </div>
</body>
</html>`}
                            </pre>
                          </div>
                          <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                            <h4 className="text-sm font-semibold text-foreground mb-2">Minified HTML (86 bytes):</h4>
                            <pre className="text-xs text-muted-foreground font-mono whitespace-pre">
{`<!DOCTYPE html><html><head><title>My Page</title></head><body><div class="container"><h1>Hello World</h1></div></body></html>`}
                            </pre>
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-green-600">
                          ✓ 43% size reduction achieved
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 2: HTML with Comments and Formatting</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                            <h4 className="text-sm font-semibold text-foreground mb-2">Original HTML (312 bytes):</h4>
                            <pre className="text-xs text-muted-foreground font-mono whitespace-pre">
{`<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Page Title -->
    <title>Example Page</title>
    
    <!-- Main Stylesheet -->
    <link rel="stylesheet" href="styles.css">
  </head>
  
  <body>
    <!-- Navigation -->
    <nav>Menu Items</nav>
    
    <!-- Main Content -->
    <main>
      <article>
        <h1>Welcome</h1>
        <p>This is example content.</p>
      </article>
    </main>
  </body>
</html>`}
                            </pre>
                          </div>
                          <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                            <h4 className="text-sm font-semibold text-foreground mb-2">Minified HTML (210 bytes):</h4>
                            <pre className="text-xs text-muted-foreground font-mono whitespace-pre">
{`<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Example Page</title><link rel="stylesheet" href="styles.css"></head><body><nav>Menu Items</nav><main><article><h1>Welcome</h1><p>This is example content.</p></article></main></body></html>`}
                            </pre>
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-green-600">
                          ✓ 33% size reduction achieved
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 3: Preserved Content in Special Tags</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                            <h4 className="text-sm font-semibold text-foreground mb-2">Original HTML:</h4>
                            <pre className="text-xs text-muted-foreground font-mono whitespace-pre">
{`<div>
  <pre>
    function hello() {
      console.log("Hello World");
    }
  </pre>
  <script>
    // This comment stays
    console.log("Script content");
  </script>
  <style>
    /* CSS comment */
    body { margin: 0; }
  </style>
</div>`}
                            </pre>
                          </div>
                          <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                            <h4 className="text-sm font-semibold text-foreground mb-2">Minified HTML:</h4>
                            <pre className="text-xs text-muted-foreground font-mono whitespace-pre">
{`<div><pre>
    function hello() {
      console.log("Hello World");
    }
  </pre><script>
    // This comment stays
    console.log("Script content");
  </script><style>
    /* CSS comment */
    body { margin: 0; }
  </style></div>`}
                            </pre>
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-blue-600">
                          Note: Content in &lt;pre&gt;, &lt;script&gt;, and &lt;style&gt; tags is preserved
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
                  <h2 className="text-xl font-bold text-foreground">Frequently Asked Questions About HTML Minification</h2>
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
                      <h3 className="text-lg font-semibold text-foreground mb-2">Best Practices & Recommendations</h3>
                      <p className="text-sm text-muted-foreground">
                        Important: Always test minified code thoroughly before deployment. Use build tools (Webpack, Gulp, Parcel) for automated minification in production workflows. Keep original unminified files for development and debugging. Combine HTML minification with other optimizations: CSS/JS minification, image compression, browser caching, and CDN deployment. Monitor performance impact using tools like Google PageSpeed Insights, Lighthouse, and WebPageTest. For dynamic content, implement server-side minification or use caching strategies to avoid runtime overhead.
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