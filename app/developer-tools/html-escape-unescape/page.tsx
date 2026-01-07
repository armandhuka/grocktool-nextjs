'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, Shield, Unlock, RefreshCw, Check, AlertCircle, ChevronDown, ChevronUp, Code, FileText, Lock, Key, Zap, Cpu, Tag } from 'lucide-react';
import Head from 'next/head';

export default function HtmlEscapeUnescapePage() {
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
    { name: 'URL Encoder / Decoder', path: '/developer-tools/url-encoder-decoder', icon: Tag },
    { name: 'Lorem Ipsum Generator', path: '/developer-tools/lorem-ipsum-generator', icon: FileText },
    { name: 'Color Code Converter', path: '/developer-tools/color-code-converter', icon: Cpu }
  ];

  // FAQ Data
  const faqData = [
    {
      question: "What is HTML escaping and why is it important for web security?",
      answer: "HTML escaping converts special characters that have meaning in HTML (like <, >, &, \", ') into their corresponding HTML entities (&lt;, &gt;, &amp;, &quot;, &#039;). This is crucial for security because it prevents Cross-Site Scripting (XSS) attacks where malicious scripts could be injected into web pages. When user input containing HTML tags is escaped, browsers display the actual text instead of interpreting it as HTML code, protecting your website and users from potential security threats."
    },
    {
      question: "What's the difference between HTML escaping and URL encoding?",
      answer: "HTML escaping deals with characters that have special meaning in HTML markup, converting them to HTML entities for safe display. URL encoding (percent-encoding) deals with characters that have special meaning in URLs, converting them to percent sequences for safe transmission. HTML escaping is for preventing XSS attacks in web content, while URL encoding is for ensuring URLs work correctly across different systems. Both are essential but serve different purposes in web development."
    },
    {
      question: "When should I escape HTML in my web applications?",
      answer: "Always escape HTML when: 1) Displaying user-generated content (comments, posts, reviews), 2) Outputting data from databases or APIs, 3) Rendering dynamic content in templates, 4) Building innerHTML strings, 5) Creating email templates with user data, 6) Generating PDFs or documents from web content. The rule is simple: escape all output unless you specifically need to render HTML. For trusted content that needs HTML rendering, use a sanitization library instead."
    },
    {
      question: "Does HTML escaping affect SEO or website performance?",
      answer: "HTML escaping does not negatively affect SEO—search engines understand HTML entities and process them correctly. For performance, escaped content is slightly larger in file size (entities are longer than original characters), but the impact is minimal and worthwhile for security. Modern browsers render HTML entities efficiently, and gzip compression minimizes the size difference. The security benefits far outweigh any negligible performance impact."
    },
    {
      question: "Can HTML entities be nested or combined with other encodings?",
      answer: "HTML entities should not be nested, and double-escaping (escaping already escaped content) creates display issues. When working with multiple encoding layers (like JSON within HTML), apply escaping in the correct order: escape the innermost content first. Also, HTML escaping is separate from JavaScript escaping—both may be needed when embedding user content in script tags. Use appropriate context-specific escaping methods for each layer of your application."
    }
  ];

  const escapeHtml = () => {
    try {
      if (!input.trim()) {
        setError('Please enter HTML or text to escape');
        setOutput('');
        return;
      }

      const escaped = input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');

      setOutput(escaped);
      setError(null);
      setCopied(false);
    } catch {
      setError('Failed to escape HTML. Please check your input.');
      setOutput('');
    }
  };

  const unescapeHtml = () => {
    try {
      if (!input.trim()) {
        setError('Please enter escaped HTML to unescape');
        setOutput('');
        return;
      }

      const textarea = document.createElement('textarea');
      textarea.innerHTML = input;
      const unescaped = textarea.value;

      setOutput(unescaped);
      setError(null);
      setCopied(false);
    } catch {
      setError('Invalid escaped HTML string. Please check your input format.');
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
        <title>HTML Escape / Unescape | Free Online HTML Security Tool - GrockTool.com</title>
        <meta name="description" content="Escape HTML special characters to prevent XSS attacks and unescape HTML entities back to original text. Essential security tool for web developers and content management." />
        <meta name="keywords" content="HTML escape, HTML unescape, XSS prevention, HTML entities, web security, escape special characters, HTML encoding, online HTML tool, web development security" />
        <meta property="og:title" content="HTML Escape / Unescape | Free Online HTML Security Tool - GrockTool.com" />
        <meta property="og:description" content="Free online HTML escaping and unescaping tool. Convert HTML special characters to entities for security and convert entities back to original characters." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="HTML Escape / Unescape - GrockTool.com" />
        <meta name="twitter:description" content="Free online HTML escaping tool for web security and XSS prevention." />
        <link rel="canonical" href="https://grocktool.com/developer-tools/html-escape-unescape" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "HTML Escape / Unescape",
            "applicationCategory": "DeveloperApplication",
            "operatingSystem": "Any",
            "description": "Free online tool to escape HTML special characters to prevent XSS attacks and unescape HTML entities back to original text",
            "url": "https://grocktool.com/developer-tools/html-escape-unescape",
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
              "HTML escaping for XSS prevention",
              "HTML unescaping for entity conversion",
              "Five key character conversion",
              "Error validation",
              "Clipboard copy functionality",
              "Security-focused processing"
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
                  HTML Escape & Unescape Tool – Security Focused & Free
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Convert HTML special characters to entities and back for secure web content
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
                      Input HTML or Text
                    </label>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Code size={12} />
                      <span>Enter HTML or text</span>
                    </div>
                  </div>
                  <textarea
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Enter HTML to escape or escaped HTML to unescape
Example: <div>Hello & Welcome</div>"
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
                      Escaped / Unescaped Result
                    </label>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Shield size={12} />
                      <span>HTML entities or plain text</span>
                    </div>
                  </div>
                  <textarea
                    value={output}
                    readOnly
                    placeholder="Result will appear here after escaping or unescaping"
                    className="w-full min-h-[200px] p-4 bg-input border border-border rounded-lg sm:rounded-xl focus:outline-none resize-none text-foreground placeholder-muted-foreground font-mono text-sm"
                  />
                  
                  {output && (
                    <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <p className="text-sm text-green-600">
                        ✓ Successfully {input.includes('&lt;') || input.includes('&gt;') || input.includes('&amp;') ? 'unescaped' : 'escaped'} your HTML
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
                  onClick={escapeHtml}
                  disabled={!input.trim()}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg sm:rounded-xl hover:bg-blue-700 transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Shield size={16} className="sm:w-4 sm:h-4" />
                  Escape HTML
                </button>
                <button
                  onClick={unescapeHtml}
                  disabled={!input.trim()}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-lg sm:rounded-xl hover:bg-purple-700 transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Unlock size={16} className="sm:w-4 sm:h-4" />
                  Unescape HTML
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
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">How to Use HTML Escape/Unescape</h3>
              <div className="space-y-2 text-muted-foreground text-sm">
                <p>
                  This tool converts HTML special characters to their entity equivalents for security and converts HTML entities back to their original characters.
                </p>
                <div className="text-xs sm:text-sm space-y-1 pt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Enter your HTML code or text in the input field</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Click "Escape HTML" to convert special characters to HTML entities</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Click "Unescape HTML" to convert HTML entities back to original characters</span>
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
                  <h2 className="text-xl font-bold text-foreground">HTML Escape/Unescape - What It Does</h2>
                  {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.whatItDoes && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      This free online HTML escape and unescape tool provides essential security functionality for web developers, content managers, and anyone working with web content. HTML escaping converts special characters that have meaning in HTML markup into safe HTML entities, preventing Cross-Site Scripting (XSS) attacks and ensuring user-generated content displays as intended text rather than executable code. This is a fundamental security practice required for any web application that accepts user input.
                    </p>
                    <p className="text-muted-foreground">
                      The tool handles the five critical HTML special characters: & becomes &amp;, &lt; becomes &lt;, &gt; becomes &gt;, " becomes &quot;, and ' becomes &#039;. It also supports unescaping, converting these HTML entities back to their original characters when you need to work with escaped content. Whether you're building web applications, managing content systems, creating secure email templates, or developing APIs that handle HTML data, this tool provides reliable, instant conversion with proper error handling and security-focused functionality.
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
                  <h2 className="text-xl font-bold text-foreground">Practical Use Cases for HTML Escaping</h2>
                  {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.useCases && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      HTML escaping serves critical security and display purposes across web development and content management:
                    </p>
                    <ul className="space-y-3 text-muted-foreground pl-5">
                      <li className="pl-2">
                        <strong className="text-foreground">Web Application Security (XSS Prevention)</strong>
                        <p className="mt-1">Protect against Cross-Site Scripting attacks by escaping user input before displaying it in web pages, comments sections, forums, and user profiles.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Content Management Systems</strong>
                        <p className="mt-1">Safely display user-generated content in blogs, news sites, and community platforms while maintaining security and proper formatting.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Email Template Development</strong>
                        <p className="mt-1">Escape dynamic content in HTML emails to prevent rendering issues across different email clients and ensure consistent display.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">API Development & Data Exchange</strong>
                        <p className="mt-1">Prepare HTML content for JSON/XML APIs, escape data before database storage, and handle content exchange between different systems securely.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Document Generation</strong>
                        <p className="mt-1">Escape content when generating PDFs, reports, or documents from web data to maintain proper formatting and prevent injection issues.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Educational & Learning Resources</strong>
                        <p className="mt-1">Demonstrate HTML entity usage in tutorials, display code examples in documentation, and teach web security principles effectively.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Debugging & Development</strong>
                        <p className="mt-1">Test escaping implementations, debug display issues with special characters, and verify that security measures work correctly.</p>
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
                  <h2 className="text-xl font-bold text-foreground">How to Use This HTML Escape/Unescape Tool Effectively</h2>
                  {openSections.howToUse ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.howToUse && (
                  <div className="px-6 pb-6">
                    <ol className="space-y-4 text-muted-foreground pl-5">
                      <li className="pl-2">
                        <strong className="text-foreground">Prepare Your Input Data</strong>
                        <p className="mt-1">For escaping: Enter HTML code, user-generated content, or any text containing &lt;, &gt;, &amp;, ", or '. For unescaping: Paste HTML entities (&lt;, &gt;, &amp;, &quot;, &#039;).</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Choose Escaping or Unescaping</strong>
                        <p className="mt-1">Click "Escape HTML" to convert special characters to HTML entities for security. Click "Unescape HTML" to convert entities back to original characters.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Validate Your Results</strong>
                        <p className="mt-1">Check the output area for your converted data. Escaped HTML shows entities instead of original characters. Unescaped HTML shows the readable version.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Copy or Use Your Output</strong>
                        <p className="mt-1">Use "Copy Result" to copy the output to clipboard for immediate use in your applications, templates, or security implementations.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Handle Errors Appropriately</strong>
                        <p className="mt-1">If you receive an error, check your input format. For unescaping, ensure entities are properly formatted and not double-escaped.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Clear and Start Over</strong>
                        <p className="mt-1">Use "Clear All" to reset both input and output fields when working with multiple conversions or different content sets.</p>
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
                  <h2 className="text-xl font-bold text-foreground">HTML Escaping Examples</h2>
                  {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.examples && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground text-sm mb-4">
                      Below are practical examples demonstrating HTML escaping and unescaping with different types of content:
                    </p>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 1: Basic HTML Tag Escaping</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                            <h4 className="text-sm font-semibold text-foreground mb-2">Original HTML:</h4>
                            <pre className="text-xs text-muted-foreground font-mono whitespace-pre">
{`<div class="alert">
  Hello & Welcome <strong>User</strong>
</div>`}
                            </pre>
                          </div>
                          <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                            <h4 className="text-sm font-semibold text-foreground mb-2">HTML Escaped:</h4>
                            <pre className="text-xs text-muted-foreground font-mono whitespace-pre">
{`&lt;div class=&quot;alert&quot;&gt;
  Hello &amp; Welcome &lt;strong&gt;User&lt;/strong&gt;
&lt;/div&gt;`}
                            </pre>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 2: User Input with Script Tag</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                            <h4 className="text-sm font-semibold text-foreground mb-2">Malicious User Input:</h4>
                            <pre className="text-xs text-muted-foreground font-mono whitespace-pre">
{`<script>alert('XSS Attack');</script>
<img src="x" onerror="maliciousCode()">`}
                            </pre>
                          </div>
                          <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                            <h4 className="text-sm font-semibold text-foreground mb-2">Safe Escaped Version:</h4>
                            <pre className="text-xs text-muted-foreground font-mono whitespace-pre">
{`&lt;script&gt;alert(&#039;XSS Attack&#039;);&lt;/script&gt;
&lt;img src=&quot;x&quot; onerror=&quot;maliciousCode()&quot;&gt;`}
                            </pre>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 3: JSON Data with HTML Content</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                            <h4 className="text-sm font-semibold text-foreground mb-2">Original JSON with HTML:</h4>
                            <pre className="text-xs text-muted-foreground font-mono whitespace-pre">
{`{
  "title": "Product <Sale>",
  "description": "50% off & free shipping",
  "html": "<span class='highlight'>Limited Time!</span>"
}`}
                            </pre>
                          </div>
                          <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                            <h4 className="text-sm font-semibold text-foreground mb-2">Escaped for Safe Display:</h4>
                            <pre className="text-xs text-muted-foreground font-mono whitespace-pre">
{`{
  "title": "Product &lt;Sale&gt;",
  "description": "50% off &amp; free shipping",
  "html": "&lt;span class=&#039;highlight&#039;&gt;Limited Time!&lt;/span&gt;"
}`}
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
                  <h2 className="text-xl font-bold text-foreground">Frequently Asked Questions About HTML Escaping</h2>
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
                        Critical: HTML escaping is essential but not sufficient alone for complete web security. Always implement multiple security layers: 1) Validate input on both client and server sides, 2) Use Content Security Policy (CSP) headers, 3) Implement proper session management, 4) Use prepared statements for database queries, 5) Regularly update dependencies. For content that needs HTML rendering (like rich text editors), use a proper sanitization library like DOMPurify instead of simple escaping. Never trust user input—always escape output.
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