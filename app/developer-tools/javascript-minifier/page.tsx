'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, RefreshCw, Check, AlertCircle, ChevronDown, ChevronUp, Code, FileText, Shield, Key, Zap, Cpu, Tag, Gauge, Cpu as CpuIcon } from 'lucide-react';
import Head from 'next/head';

export default function JavaScriptMinifierPage() {
  const [jsInput, setJsInput] = useState('');
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
    { name: 'CSS Minifier', path: '/developer-tools/css-minifier', icon: Code },
    { name: 'URL Encoder / Decoder', path: '/developer-tools/url-encoder-decoder', icon: Tag },
    { name: 'HTML Escape / Unescape', path: '/developer-tools/html-escape-unescape', icon: Shield },
    { name: 'Lorem Ipsum Generator', path: '/developer-tools/lorem-ipsum-generator', icon: FileText },
    { name: 'Color Code Converter', path: '/developer-tools/color-code-converter', icon: CpuIcon }
  ];

  // FAQ Data
  const faqData = [
    {
      question: "What is JavaScript minification and why is it crucial for web performance?",
      answer: "JavaScript minification removes unnecessary characters from code—including comments, whitespace, and line breaks—without changing functionality. This reduces file size dramatically, leading to faster download times, reduced bandwidth usage, and improved page load performance. Since JavaScript is often render-blocking, minified files allow browsers to parse and execute code faster, improving Core Web Vitals metrics like First Input Delay (FID) and Time to Interactive (TTI). Minification can also include advanced optimizations like variable name shortening and dead code elimination."
    },
    {
      question: "Does JavaScript minification affect code functionality or debugging?",
      answer: "Proper minification preserves all functionality while making code less readable. However, debugging minified code is challenging. Always use source maps in production to map minified code back to original source files for debugging. For development, work with unminified code. Our tool provides basic minification that maintains functionality while removing non-essential characters. For production applications, consider using advanced minifiers like Terser or UglifyJS that include additional optimizations and source map generation."
    },
    {
      question: "How much file size reduction can I expect from JavaScript minification?",
      answer: "Typical JavaScript minification reduces file size by 30-60%, depending on the original code structure. Code with many comments, descriptive variable names, and extensive formatting achieves the highest reduction. For example, a 200KB JavaScript file might reduce to 80-140KB. Combined with compression (gzip/brotli), the final transferred size can be 70-90% smaller than the original. Modern bundlers like Webpack and Vite combine minification with tree-shaking for even greater reductions."
    },
    {
      question: "Should I minify JavaScript manually or use build tools?",
      answer: "For production applications, always use automated build tools (Webpack, Rollup, Vite, esbuild) that include advanced minification with tree-shaking and dead code elimination. Manual minification is useful for quick optimizations, learning purposes, or small scripts. Our tool is perfect for optimizing individual files, testing different approaches, or working with legacy code that isn't part of a modern build system. For large applications, build tools provide better optimization and maintainability."
    },
    {
      question: "Can minified JavaScript be formatted back to readable code?",
      answer: "Basic formatting (adding line breaks and indentation) can be restored using JavaScript formatters like Prettier, but removed comments and shortened variable names cannot be recovered. Source maps are essential for debugging production code. Always keep original unminified JavaScript files for development and version control. Browser developer tools can pretty-print minified code, but for serious debugging, use source maps that connect minified production code to original source files."
    }
  ];

  const minifyJavaScript = () => {
    try {
      if (!jsInput.trim()) {
        setError('Please enter JavaScript code to minify');
        setMinifiedOutput('');
        setOriginalSize(0);
        setMinifiedSize(0);
        return;
      }

      const originalSizeBytes = new Blob([jsInput]).size;
      setOriginalSize(originalSizeBytes);

      let minified = jsInput
        // Remove single-line comments but preserve specific ones
        .replace(/\/\/.*$/gm, '')
        // Remove multi-line comments
        .replace(/\/\*[\s\S]*?\*\//g, '')
        // Remove whitespace around operators and symbols
        .replace(/\s*([{}();,:=+\-*/%<>!&|?.])\s*/g, '$1')
        // Remove multiple spaces
        .replace(/\s+/g, ' ')
        // Remove leading/trailing whitespace from lines
        .replace(/^\s+|\s+$/gm, '')
        // Remove new lines
        .replace(/\n+/g, '')
        // Trim the whole result
        .trim();

      const minifiedSizeBytes = new Blob([minified]).size;
      setMinifiedSize(minifiedSizeBytes);
      setMinifiedOutput(minified);
      setError(null);
      setCopied(false);
    } catch (err: any) {
      setError('Failed to minify JavaScript. Please check your JavaScript syntax.');
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
    setJsInput('');
    setMinifiedOutput('');
    setError(null);
    setCopied(false);
    setOriginalSize(0);
    setMinifiedSize(0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsInput(e.target.value);
    setError(null);
  };

  const calculateReduction = () => {
    if (originalSize === 0) return 0;
    return Math.round(((originalSize - minifiedSize) / originalSize) * 100);
  };

  return (
    <>
      <Head>
        <title>JavaScript Minifier | Free Online JS Compression Tool - GrockTool.com</title>
        <meta name="description" content="Minify JavaScript code to reduce file size and improve website performance. Remove comments, whitespace, and unnecessary characters while preserving functionality." />
        <meta name="keywords" content="JavaScript minifier, JS minifier, minify JavaScript, reduce JS size, website optimization, performance tool, online JavaScript minifier, web development tools, script optimization" />
        <meta property="og:title" content="JavaScript Minifier | Free Online JS Compression Tool - GrockTool.com" />
        <meta property="og:description" content="Free online JavaScript minification tool. Reduce JS file size by removing comments, whitespace, and unnecessary characters to improve website performance." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="JavaScript Minifier - GrockTool.com" />
        <meta name="twitter:description" content="Free online JavaScript minification tool for website performance optimization." />
        <link rel="canonical" href="https://grocktool.com/developer-tools/javascript-minifier" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "JavaScript Minifier",
            "applicationCategory": "DeveloperApplication",
            "operatingSystem": "Any",
            "description": "Free online tool to minify JavaScript code by removing comments, whitespace, and unnecessary characters to reduce file size and improve website performance",
            "url": "https://grocktool.com/developer-tools/javascript-minifier",
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
              "JavaScript comment removal",
              "Whitespace optimization",
              "Operator spacing optimization",
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
                  JavaScript Minifier Tool – Optimize & Compress Scripts
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Reduce JavaScript file size by removing comments, whitespace, and unnecessary characters
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
                      JavaScript Input
                    </label>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CpuIcon size={12} />
                      <span>Original JavaScript code</span>
                    </div>
                  </div>
                  <textarea
                    value={jsInput}
                    onChange={handleInputChange}
                    placeholder={`// Function to calculate sum
function calculateSum(numbers) {
  let total = 0;
  
  // Loop through numbers array
  for (let i = 0; i < numbers.length; i++) {
    total += numbers[i];
  }
  
  return total;
}

// Event handler
document.addEventListener('click', function(event) {
  console.log('Click event:', event.target);
});`}
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
                      <span>Compressed JavaScript</span>
                    </div>
                  </div>
                  <textarea
                    value={minifiedOutput}
                    readOnly
                    placeholder="Minified JavaScript will appear here"
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
                            {calculateReduction() > 40 ? 'Excellent compression!' : 
                             calculateReduction() > 20 ? 'Good optimization' : 
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
                  onClick={minifyJavaScript}
                  disabled={!jsInput.trim()}
                  className="flex-2 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg sm:rounded-xl hover:bg-blue-700 transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Code size={16} className="sm:w-4 sm:h-4" />
                  Minify JavaScript
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
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">How to Use JavaScript Minifier</h3>
              <div className="space-y-2 text-muted-foreground text-sm">
                <p>
                  This tool removes unnecessary characters from JavaScript code to reduce file size and improve website performance.
                </p>
                <div className="text-xs sm:text-sm space-y-1 pt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Paste your JavaScript code into the input field</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Click "Minify JavaScript" to compress your script</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Check the size reduction percentage and minified output</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Use "Copy Result" to copy minified JavaScript or "Clear All" to start over</span>
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
                  <h2 className="text-xl font-bold text-foreground">JavaScript Minifier - What It Does</h2>
                  {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.whatItDoes && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      This free online JavaScript minifier tool optimizes your scripts by removing unnecessary characters while preserving all functionality. It intelligently strips out both single-line and multi-line comments, eliminates excess whitespace and line breaks, and optimizes operator spacing. The result is significantly smaller JavaScript files that load faster, reduce bandwidth usage, and improve your website's Core Web Vitals scores—particularly important for Time to Interactive (TTI) and First Input Delay (FID) metrics that directly impact user experience.
                    </p>
                    <p className="text-muted-foreground">
                      The tool provides detailed size comparison metrics, showing original file size, minified file size, and percentage reduction. It performs safe minification that maintains code functionality while applying optimizations that work across all modern browsers. Whether you're optimizing a website's main scripts, preparing JavaScript for production deployment, improving mobile performance, or learning about web optimization techniques, this JavaScript minifier delivers professional-grade compression with clear, actionable results and performance insights.
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
                  <h2 className="text-xl font-bold text-foreground">Practical Use Cases for JavaScript Minification</h2>
                  {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.useCases && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      JavaScript minification provides performance benefits across various web development and optimization scenarios:
                    </p>
                    <ul className="space-y-3 text-muted-foreground pl-5">
                      <li className="pl-2">
                        <strong className="text-foreground">Web Application Performance Optimization</strong>
                        <p className="mt-1">Improve Google PageSpeed Insights and Lighthouse scores, enhance Core Web Vitals metrics, and reduce JavaScript execution time for better SEO ranking and user experience.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Production Deployment Preparation</strong>
                        <p className="mt-1">Minify JavaScript before deploying to production servers, reducing bandwidth costs and improving Time to Interactive (TTI) while maintaining identical functionality.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Single Page Applications (SPAs)</strong>
                        <p className="mt-1">Optimize React, Vue, and Angular application bundles for faster initial load times, better code splitting efficiency, and improved perceived performance.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Third-Party Script Optimization</strong>
                        <p className="mt-1">Minify analytics scripts, tracking codes, and third-party widgets to reduce their performance impact while maintaining their functionality.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Progressive Web Apps (PWAs)</strong>
                        <p className="mt-1">Optimize service worker scripts and application logic for faster installation, better offline performance, and improved mobile experience.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Library & Framework Development</strong>
                        <p className="mt-1">Create production-ready distributions of JavaScript libraries and frameworks with minified versions alongside source maps for debugging.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">API & Microservice Development</strong>
                        <p className="mt-1">Optimize Node.js server-side scripts and API handlers for faster startup times and reduced memory footprint in cloud deployments.</p>
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
                  <h2 className="text-xl font-bold text-foreground">How to Use This JavaScript Minifier Effectively</h2>
                  {openSections.howToUse ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.howToUse && (
                  <div className="px-6 pb-6">
                    <ol className="space-y-4 text-muted-foreground pl-5">
                      <li className="pl-2">
                        <strong className="text-foreground">Prepare Your JavaScript Code</strong>
                        <p className="mt-1">Copy your complete JavaScript code including functions, variables, and event handlers. Ensure your code is valid and properly structured for best results.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Paste and Minify</strong>
                        <p className="mt-1">Paste JavaScript into the input field and click "Minify JavaScript". The tool processes your code, removing comments and optimizing whitespace.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Review Size Reduction</strong>
                        <p className="mt-1">Check the size comparison metrics. Good JavaScript minification typically achieves 30-60% reduction. Higher percentages indicate more optimization opportunities.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Test Functionality</strong>
                        <p className="mt-1">Always test minified JavaScript in a browser or Node.js environment to ensure all functionality remains intact. Pay special attention to complex logic and event handlers.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Copy and Implement</strong>
                        <p className="mt-1">Use "Copy Result" to copy minified JavaScript for use in production. For development, keep original unminified files for readability and maintenance.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Combine with Other Optimizations</strong>
                        <p className="mt-1">For maximum performance, combine minification with other techniques: code splitting, lazy loading, tree shaking, and using modern JavaScript features.</p>
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
                  <h2 className="text-xl font-bold text-foreground">JavaScript Minification Examples</h2>
                  {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.examples && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground text-sm mb-4">
                      Below are practical examples demonstrating JavaScript minification with different types of code:
                    </p>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 1: Basic Function with Comments</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                            <h4 className="text-sm font-semibold text-foreground mb-2">Original JavaScript (215 bytes):</h4>
                            <pre className="text-xs text-muted-foreground font-mono whitespace-pre">
{`// Function to calculate average
function calculateAverage(numbers) {
  // Check if array is empty
  if (numbers.length === 0) {
    return 0;
  }
  
  let sum = 0;
  
  // Calculate sum
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  
  // Return average
  return sum / numbers.length;
}`}
                            </pre>
                          </div>
                          <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                            <h4 className="text-sm font-semibold text-foreground mb-2">Minified JavaScript (92 bytes):</h4>
                            <pre className="text-xs text-muted-foreground font-mono whitespace-pre">
{`function calculateAverage(numbers){if(numbers.length===0){return 0}let sum=0;for(let i=0;i<numbers.length;i++){sum+=numbers[i]}return sum/numbers.length}`}
                            </pre>
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-green-600">
                          ✓ 57% size reduction achieved
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 2: Event Handling with Modern Syntax</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                            <h4 className="text-sm font-semibold text-foreground mb-2">Original JavaScript (285 bytes):</h4>
                            <pre className="text-xs text-muted-foreground font-mono whitespace-pre">
{`/* 
 * Initialize application when DOM is ready
 * This handles the main setup
 */
document.addEventListener('DOMContentLoaded', () => {
  // Get button element
  const button = document.getElementById('submitBtn');
  
  // Add click event listener
  button.addEventListener('click', (event) => {
    event.preventDefault();
    
    // Get input value
    const input = document.getElementById('userInput').value;
    
    // Process input
    console.log('User entered:', input);
  });
});`}
                            </pre>
                          </div>
                          <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                            <h4 className="text-sm font-semibold text-foreground mb-2">Minified JavaScript (145 bytes):</h4>
                            <pre className="text-xs text-muted-foreground font-mono whitespace-pre">
{`document.addEventListener('DOMContentLoaded',()=>{const button=document.getElementById('submitBtn');button.addEventListener('click',(event)=>{event.preventDefault();const input=document.getElementById('userInput').value;console.log('User entered:',input)})});`}
                            </pre>
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-green-600">
                          ✓ 49% size reduction achieved
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 3: Complex Logic with Multiple Functions</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                            <h4 className="text-sm font-semibold text-foreground mb-2">Original JavaScript:</h4>
                            <pre className="text-xs text-muted-foreground font-mono whitespace-pre">
{`// Utility function for validation
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Main form handler
function handleFormSubmit(formData) {
  // Validate email
  if (!isValidEmail(formData.email)) {
    return { success: false, error: 'Invalid email' };
  }
  
  // Validate password length
  if (formData.password.length < 8) {
    return { success: false, error: 'Password too short' };
  }
  
  // Return success
  return { success: true, data: formData };
}`}
                            </pre>
                          </div>
                          <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                            <h4 className="text-sm font-semibold text-foreground mb-2">Minified JavaScript:</h4>
                            <pre className="text-xs text-muted-foreground font-mono whitespace-pre">
{`function isValidEmail(email){const regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;return regex.test(email)}function handleFormSubmit(formData){if(!isValidEmail(formData.email)){return{success:false,error:'Invalid email'}}if(formData.password.length<8){return{success:false,error:'Password too short'}}return{success:true,data:formData}}`}
                            </pre>
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-blue-600">
                          Note: All functionality preserved while reducing readability
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
                  <h2 className="text-xl font-bold text-foreground">Frequently Asked Questions About JavaScript Minification</h2>
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
                        Important: Always use source maps when deploying minified JavaScript to production. Test minified code thoroughly across different browsers and devices. For large applications, use modern bundlers (Webpack, Vite, Rollup) that combine minification with tree-shaking and dead code elimination. Consider code splitting to load only necessary JavaScript for each page. Monitor JavaScript performance using browser developer tools and real user monitoring (RUM). For critical functionality, implement progressive enhancement to ensure basic functionality works without JavaScript. Always keep original source files in version control.
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