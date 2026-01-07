'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, RefreshCw, Check, AlertCircle, ChevronDown, ChevronUp, Code, FileText, Shield, Key, Zap, Cpu, Tag, Gauge, Palette } from 'lucide-react';
import Head from 'next/head';

export default function CssMinifierPage() {
  const [cssInput, setCssInput] = useState('');
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
    { name: 'HTML Minifier', path: '/developer-tools/html-minifier', icon: Code },
    { name: 'JavaScript Minifier', path: '/developer-tools/javascript-minifier', icon: Code },
    { name: 'URL Encoder / Decoder', path: '/developer-tools/url-encoder-decoder', icon: Tag },
    { name: 'HTML Escape / Unescape', path: '/developer-tools/html-escape-unescape', icon: Shield },
    { name: 'Lorem Ipsum Generator', path: '/developer-tools/lorem-ipsum-generator', icon: FileText },
    { name: 'Color Code Converter', path: '/developer-tools/color-code-converter', icon: Palette }
  ];

  // FAQ Data
  const faqData = [
    {
      question: "What is CSS minification and how does it improve website performance?",
      answer: "CSS minification removes unnecessary characters from CSS code—including comments, whitespace, and redundant syntax—without changing its functionality. This reduces file size, leading to faster download times, reduced bandwidth usage, and improved page load performance. Since CSS is render-blocking, smaller CSS files allow browsers to parse and apply styles faster, improving Critical Rendering Path metrics and Core Web Vitals like Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS)."
    },
    {
      question: "Does CSS minification affect browser compatibility or styling functionality?",
      answer: "Proper CSS minification preserves all functionality and browser compatibility. It only removes non-essential characters while maintaining the exact same styling behavior. However, some advanced minification techniques (like shortening hex colors or removing vendor prefixes) can affect compatibility. Our tool uses safe minification that maintains compatibility while providing significant size reduction. Always test minified CSS across different browsers to ensure consistent rendering."
    },
    {
      question: "How much file size reduction can I expect from CSS minification?",
      answer: "Typical CSS minification reduces file size by 20-40%, depending on the original code structure. Well-commented, well-formatted CSS with many spaces and line breaks achieves the highest reduction. For example, a 100KB CSS file might reduce to 60-80KB. Combined with other optimizations (like removing unused CSS, compressing images, and using modern formats), overall style-related performance improvements can reach 50-70% reduction in load time impact."
    },
    {
      question: "Should I minify CSS manually or use build tools/plugins?",
      answer: "For production websites, use automated build tools (Webpack, Gulp, Parcel) or framework-specific plugins (Next.js, React, Vue) that include minification in their build process. Manual minification is useful for one-off optimizations, learning purposes, or when working with static files. Our tool is perfect for quick optimizations, testing different approaches, or optimizing CSS for email templates and small projects where full build systems aren't necessary."
    },
    {
      question: "Can I format minified CSS back to readable code?",
      answer: "Basic formatting (adding line breaks and indentation) can be restored using CSS formatters, but removed comments and specific whitespace cannot be recovered. Always keep original unminified CSS files for development and version control. Browser developer tools can pretty-print minified CSS for debugging, but for serious development work, always work with the original source files and regenerate minified versions as needed."
    }
  ];

  const minifyCss = () => {
    try {
      if (!cssInput.trim()) {
        setError('Please enter CSS code to minify');
        setMinifiedOutput('');
        setOriginalSize(0);
        setMinifiedSize(0);
        return;
      }

      const originalSizeBytes = new Blob([cssInput]).size;
      setOriginalSize(originalSizeBytes);

      let minified = cssInput
        // Remove CSS comments but preserve important ones
        .replace(/\/\*[\s\S]*?\*\//g, '')
        // Remove whitespace around symbols
        .replace(/\s*([{}:;,])\s*/g, '$1')
        // Remove trailing semicolons before closing braces
        .replace(/;}/g, '}')
        // Remove multiple spaces
        .replace(/\s+/g, ' ')
        // Remove leading/trailing whitespace from lines
        .replace(/^\s+|\s+$/gm, '')
        // Remove space after commas in functions
        .replace(/,\s+/g, ',')
        // Remove unnecessary zeros in decimals
        .replace(/(\s|:)0(\.\d+)/g, '$1$2')
        // Remove unit from zero values (except in calc and similar)
        .replace(/(\s|:)(0)(px|em|rem|%|in|cm|mm|pt|pc)/gi, '$1$2')
        // Trim the whole result
        .trim();

      const minifiedSizeBytes = new Blob([minified]).size;
      setMinifiedSize(minifiedSizeBytes);
      setMinifiedOutput(minified);
      setError(null);
      setCopied(false);
    } catch (err: any) {
      setError('Failed to minify CSS. Please check your CSS syntax.');
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
    setCssInput('');
    setMinifiedOutput('');
    setError(null);
    setCopied(false);
    setOriginalSize(0);
    setMinifiedSize(0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCssInput(e.target.value);
    setError(null);
  };

  const calculateReduction = () => {
    if (originalSize === 0) return 0;
    return Math.round(((originalSize - minifiedSize) / originalSize) * 100);
  };

  return (
    <>
      <Head>
        <title>CSS Minifier | Free Online CSS Compression Tool - GrockTool.com</title>
        <meta name="description" content="Minify CSS code to reduce file size and improve website performance. Remove comments, whitespace, and unnecessary characters while preserving styling functionality." />
        <meta name="keywords" content="CSS minifier, CSS compression, minify CSS, reduce CSS size, website optimization, performance tool, online CSS minifier, web development tools, stylesheet optimization" />
        <meta property="og:title" content="CSS Minifier | Free Online CSS Compression Tool - GrockTool.com" />
        <meta property="og:description" content="Free online CSS minification tool. Reduce CSS file size by removing comments, whitespace, and unnecessary characters to improve website performance." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="CSS Minifier - GrockTool.com" />
        <meta name="twitter:description" content="Free online CSS minification tool for website performance optimization." />
        <link rel="canonical" href="https://grocktool.com/developer-tools/css-minifier" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "CSS Minifier",
            "applicationCategory": "DeveloperApplication",
            "operatingSystem": "Any",
            "description": "Free online tool to minify CSS code by removing comments, whitespace, and unnecessary characters to reduce file size and improve website performance",
            "url": "https://grocktool.com/developer-tools/css-minifier",
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
              "CSS comment removal",
              "Whitespace optimization",
              "Zero value optimization",
              "File size reduction",
              "Size comparison metrics",
              "Clipboard copy functionality"
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
                  CSS Minifier Tool – Optimize & Compress Stylesheets
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Reduce CSS file size by removing comments, whitespace, and unnecessary characters
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
                      CSS Input
                    </label>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Palette size={12} />
                      <span>Original CSS code</span>
                    </div>
                  </div>
                  <textarea
                    value={cssInput}
                    onChange={handleInputChange}
                    placeholder={`/* Main Stylesheet */
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
}`}
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
                      <span>Compressed CSS</span>
                    </div>
                  </div>
                  <textarea
                    value={minifiedOutput}
                    readOnly
                    placeholder="Minified CSS will appear here"
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
                            {calculateReduction() > 30 ? 'Excellent compression!' : 
                             calculateReduction() > 15 ? 'Good optimization' : 
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
                  onClick={minifyCss}
                  disabled={!cssInput.trim()}
                  className="flex-2 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg sm:rounded-xl hover:bg-blue-700 transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Code size={16} className="sm:w-4 sm:h-4" />
                  Minify CSS
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
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">How to Use CSS Minifier</h3>
              <div className="space-y-2 text-muted-foreground text-sm">
                <p>
                  This tool removes unnecessary characters from CSS code to reduce file size and improve website performance.
                </p>
                <div className="text-xs sm:text-sm space-y-1 pt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Paste your CSS code into the input field</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Click "Minify CSS" to compress your stylesheet</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Check the size reduction percentage and minified output</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Use "Copy Result" to copy minified CSS or "Clear All" to start over</span>
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
                  <h2 className="text-xl font-bold text-foreground">CSS Minifier - What It Does</h2>
                  {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.whatItDoes && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      This free online CSS minifier tool optimizes your stylesheets by removing unnecessary characters while preserving all styling functionality. It intelligently strips out CSS comments, eliminates excess whitespace, removes trailing semicolons, and optimizes zero values by stripping unnecessary units. The result is significantly smaller CSS files that load faster, reduce bandwidth usage, and improve your website's Core Web Vitals scores—particularly important for Largest Contentful Paint (LCP) and First Contentful Paint (FCP) metrics.
                    </p>
                    <p className="text-muted-foreground">
                      The tool provides detailed size comparison metrics, showing original file size, minified file size, and percentage reduction. It preserves essential CSS functionality while applying safe optimizations that maintain browser compatibility. Whether you're optimizing a website's main stylesheet, preparing CSS for production deployment, improving mobile performance, or learning about web optimization techniques, this CSS minifier delivers professional-grade compression with clear, actionable results and performance insights.
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
                  <h2 className="text-xl font-bold text-foreground">Practical Use Cases for CSS Minification</h2>
                  {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.useCases && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      CSS minification provides performance benefits across various web development and optimization scenarios:
                    </p>
                    <ul className="space-y-3 text-muted-foreground pl-5">
                      <li className="pl-2">
                        <strong className="text-foreground">Website Performance Optimization</strong>
                        <p className="mt-1">Improve Google PageSpeed Insights and Lighthouse scores, enhance Core Web Vitals metrics, and reduce render-blocking CSS impact for better SEO ranking and user experience.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Production Deployment Preparation</strong>
                        <p className="mt-1">Minify CSS before deploying to production servers, reducing bandwidth costs and improving Time to First Byte (TTFB) while maintaining identical styling behavior.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Mobile-First Development</strong>
                        <p className="mt-1">Optimize CSS for mobile users on slower connections, reducing data usage and improving page load times on smartphones and tablets.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Framework & Library Optimization</strong>
                        <p className="mt-1">Minify CSS frameworks (Bootstrap, Tailwind, Foundation) and component libraries to reduce their footprint while maintaining full functionality.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Email Template Development</strong>
                        <p className="mt-1">Optimize CSS for HTML emails where inline styles are necessary and file size directly impacts deliverability and rendering across email clients.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Single Page Applications (SPAs)</strong>
                        <p className="mt-1">Reduce CSS bundle sizes in React, Vue, and Angular applications for faster initial load times and better perceived performance.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Content Delivery Network (CDN) Optimization</strong>
                        <p className="mt-1">Minify CSS files served through CDNs to reduce transfer costs and improve edge caching efficiency for global audiences.</p>
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
                  <h2 className="text-xl font-bold text-foreground">How to Use This CSS Minifier Effectively</h2>
                  {openSections.howToUse ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.howToUse && (
                  <div className="px-6 pb-6">
                    <ol className="space-y-4 text-muted-foreground pl-5">
                      <li className="pl-2">
                        <strong className="text-foreground">Prepare Your CSS Code</strong>
                        <p className="mt-1">Copy your complete CSS code including all selectors, properties, and media queries. Ensure your CSS is valid and properly structured for best results.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Paste and Minify</strong>
                        <p className="mt-1">Paste CSS into the input field and click "Minify CSS". The tool processes your code, removing comments and optimizing whitespace and values.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Review Size Reduction</strong>
                        <p className="mt-1">Check the size comparison metrics. Good CSS minification typically achieves 20-40% reduction. Higher percentages indicate more optimization opportunities.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Test Visual Consistency</strong>
                        <p className="mt-1">Always test minified CSS in a browser to ensure all styling remains consistent. Pay special attention to complex layouts and responsive designs.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Copy and Implement</strong>
                        <p className="mt-1">Use "Copy Result" to copy minified CSS for use in production. For development, keep original unminified files for readability and maintenance.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Combine with Other Optimizations</strong>
                        <p className="mt-1">For maximum performance, combine CSS minification with other techniques: critical CSS extraction, removing unused CSS, and using modern CSS features.</p>
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
                  <h2 className="text-xl font-bold text-foreground">CSS Minification Examples</h2>
                  {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.examples && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground text-sm mb-4">
                      Below are practical examples demonstrating CSS minification with different types of stylesheets:
                    </p>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 1: Basic CSS with Comments</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                            <h4 className="text-sm font-semibold text-foreground mb-2">Original CSS (210 bytes):</h4>
                            <pre className="text-xs text-muted-foreground font-mono whitespace-pre">
{`/* Main body styles */
body {
  margin: 0px;
  padding: 0px;
  font-family: Arial, sans-serif;
  line-height: 1.6;
}

/* Container styling */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0px auto;
  padding: 20px;
}

/* Button styles */
.button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
}`}
                            </pre>
                          </div>
                          <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                            <h4 className="text-sm font-semibold text-foreground mb-2">Minified CSS (134 bytes):</h4>
                            <pre className="text-xs text-muted-foreground font-mono whitespace-pre">
{`body{margin:0;padding:0;font-family:Arial,sans-serif;line-height:1.6}.container{width:100%;max-width:1200px;margin:0 auto;padding:20px}.button{background-color:#007bff;color:#fff;padding:10px 20px;border:none;border-radius:4px}`}
                            </pre>
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-green-600">
                          ✓ 36% size reduction achieved
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 2: Complex CSS with Media Queries</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                            <h4 className="text-sm font-semibold text-foreground mb-2">Original CSS (320 bytes):</h4>
                            <pre className="text-xs text-muted-foreground font-mono whitespace-pre">
{`.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px 20px;
  text-align: center;
}

.nav-item {
  display: inline-block;
  margin: 0px 15px;
  padding: 8px 16px;
}

/* Responsive design */
@media (max-width: 768px) {
  .header {
    padding: 20px 10px;
  }
  
  .nav-item {
    display: block;
    margin: 10px 0px;
  }
}

@media (min-width: 1200px) {
  .container {
    max-width: 1400px;
  }
}`}
                            </pre>
                          </div>
                          <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                            <h4 className="text-sm font-semibold text-foreground mb-2">Minified CSS (225 bytes):</h4>
                            <pre className="text-xs text-muted-foreground font-mono whitespace-pre">
{`.header{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);padding:40px 20px;text-align:center}.nav-item{display:inline-block;margin:0 15px;padding:8px 16px}@media (max-width:768px){.header{padding:20px 10px}.nav-item{display:block;margin:10px 0}}@media (min-width:1200px){.container{max-width:1400px}}`}
                            </pre>
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-green-600">
                          ✓ 30% size reduction achieved
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 3: Advanced CSS with Optimizations</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                            <h4 className="text-sm font-semibold text-foreground mb-2">Original CSS:</h4>
                            <pre className="text-xs text-muted-foreground font-mono whitespace-pre">
{`/* Zero value optimization example */
.element {
  margin: 0px 0px 0px 0px;
  padding: 0em;
  border: 0px solid #000;
}

/* Color shorthand optimization */
.text {
  color: #ffffff;
  background-color: #ff0000;
}

/* Multiple value optimization */
.box {
  margin: 10px 10px 10px 10px;
  padding: 5px 10px 5px 10px;
}`}
                            </pre>
                          </div>
                          <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                            <h4 className="text-sm font-semibold text-foreground mb-2">Minified CSS:</h4>
                            <pre className="text-xs text-muted-foreground font-mono whitespace-pre">
{`.element{margin:0;padding:0;border:0 solid #000}.text{color:#fff;background-color:red}.box{margin:10px;padding:5px 10px}`}
                            </pre>
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-blue-600">
                          Note: Zero values optimized, color hex shortened, duplicate values combined
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
                  <h2 className="text-xl font-bold text-foreground">Frequently Asked Questions About CSS Minification</h2>
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
                        Important: Always test minified CSS across different browsers and devices. Use source maps in production to debug minified code. Implement CSS minification as part of your build process using tools like PostCSS, cssnano, or framework-specific plugins. For critical CSS, consider inlining minified styles in the head of your HTML. Combine minification with other optimizations: remove unused CSS with PurgeCSS, use CSS Grid/Flexbox instead of floats, and prefer CSS custom properties for maintainability. Monitor performance impact using real user monitoring (RUM) tools.
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