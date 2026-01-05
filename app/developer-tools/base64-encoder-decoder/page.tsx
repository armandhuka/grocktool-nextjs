'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, Lock, Unlock, RefreshCw, Check, AlertCircle, ChevronDown, ChevronUp, Code, FileText, Shield, Key, Zap } from 'lucide-react';
import Head from 'next/head';

export default function Base64EncoderDecoderPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
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

  // Related Tools Data
  const relatedTools = [
    { name: 'JSON to CSV Converter', path: '/developer-tools/json-to-csv', icon: FileText },
    { name: 'JWT Decoder', path: '/developer-tools/jwt-decoder', icon: Shield },
    { name: 'Regex Tester', path: '/developer-tools/regex-tester', icon: Code },
    { name: 'UUID Generator', path: '/developer-tools/uuid-generator', icon: Key },
    { name: 'Unix Timestamp Converter', path: '/developer-tools/unix-timestamp', icon: Zap },
  ];

  // FAQ Data
  const faqData = [
    {
      question: "What is Base64 encoding and why is it used?",
      answer: "Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. It's commonly used to encode data that needs to be stored and transferred over media designed to deal with text. This encoding helps prevent data corruption when binary data is transmitted through systems that only support text content, such as email systems or web APIs."
    },
    {
      question: "What's the difference between encoding and decoding in Base64?",
      answer: "Encoding converts regular text or binary data into Base64 format, creating a string of ASCII characters. Decoding does the reverse—it converts a Base64 string back to its original text or binary form. Encoding is used to make data safe for transmission, while decoding is used to retrieve the original data at the destination."
    },
    {
      question: "Does Base64 encoding increase the size of data?",
      answer: "Yes, Base64 encoding increases the size of the original data by approximately 33%. This is because every 3 bytes of binary data become 4 ASCII characters. While this adds overhead, the trade-off is necessary for compatibility with text-only systems that might otherwise corrupt binary data."
    },
    {
      question: "Is Base64 encoding secure or encrypted?",
      answer: "Base64 is NOT encryption—it's encoding. The process doesn't provide any security or confidentiality. Base64 encoded data can be easily decoded by anyone. For security, you need proper encryption algorithms like AES in addition to encoding if you want to protect sensitive information."
    },
    {
      question: "What types of data are commonly Base64 encoded?",
      answer: "Common uses include embedding images in HTML/CSS (data URIs), attaching files in emails, storing binary data in JSON/XML, encoding credentials for HTTP Basic Auth, and transferring binary data through web APIs. Image files, PDFs, and other binary documents are frequently Base64 encoded for web transmission."
    }
  ];

  const encodeBase64 = () => {
    setError('');
    setCopied(false);
    if (!input.trim()) {
      setError('Please enter text to encode');
      return;
    }
    try {
      setOutput(btoa(unescape(encodeURIComponent(input))));
    } catch {
      setError('Unable to encode input. Check for special characters.');
    }
  };

  const decodeBase64 = () => {
    setError('');
    setCopied(false);
    if (!input.trim()) {
      setError('Please enter Base64 string to decode');
      return;
    }
    try {
      setOutput(decodeURIComponent(escape(atob(input))));
    } catch {
      setError('Invalid Base64 string. Please check your input.');
    }
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setError('');
    setCopied(false);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    setError('');
  };

  return (
    <>
      <Head>
        <title>Base64 Encoder / Decoder | Free Online Encoding Tool - GrockTool.com</title>
        <meta name="description" content="Encode text to Base64 and decode Base64 to text instantly with our free online tool. Perfect for developers, security professionals, and data transmission needs." />
        <meta name="keywords" content="Base64 encoder, Base64 decoder, encoding tool, decode Base64, encode to Base64, online Base64 converter, data encoding, binary to text, ASCII encoding" />
        <meta property="og:title" content="Base64 Encoder / Decoder | Free Online Encoding Tool - GrockTool.com" />
        <meta property="og:description" content="Free online Base64 encoder and decoder tool. Instantly convert text to Base64 format and decode Base64 strings back to original text with accurate results." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Base64 Encoder / Decoder - GrockTool.com" />
        <meta name="twitter:description" content="Free online Base64 encoding and decoding tool for developers and security professionals." />
        <link rel="canonical" href="https://grocktool.com/developer-tools/base64-encoder-decoder" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Base64 Encoder / Decoder",
            "applicationCategory": "DeveloperApplication",
            "operatingSystem": "Any",
            "description": "Free online tool to encode text to Base64 format and decode Base64 strings back to original text instantly",
            "url": "https://grocktool.com/developer-tools/base64-encoder-decoder",
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
              "Text to Base64 encoding",
              "Base64 to text decoding",
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
                  Base64 Encode & Decode Tool – Fast, Accurate & Free
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Convert text to Base64 and decode Base64 strings instantly
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
                      Input Text or Base64 String
                    </label>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <FileText size={12} />
                      <span>Enter text or Base64</span>
                    </div>
                  </div>
                  <textarea
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Enter text to encode or Base64 string to decode"
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
                      <Code size={12} />
                      <span>Base64 or Text output</span>
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
                        ✓ Successfully {input.trim() && btoa(unescape(encodeURIComponent(input))) === output ? 'encoded' : 'decoded'} your input
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  onClick={clearAll}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg sm:rounded-xl hover:bg-secondary/80 transition-colors text-sm sm:text-base"
                >
                  <RefreshCw size={16} className="sm:w-4 sm:h-4" />
                  Clear All
                </button>
                <button
                  onClick={encodeBase64}
                  disabled={!input.trim()}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg sm:rounded-xl hover:bg-blue-700 transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Lock size={16} className="sm:w-4 sm:h-4" />
                  Encode to Base64
                </button>
                <button
                  onClick={decodeBase64}
                  disabled={!input.trim()}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-lg sm:rounded-xl hover:bg-purple-700 transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Unlock size={16} className="sm:w-4 sm:h-4" />
                  Decode from Base64
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
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">How to Use Base64 Encoder/Decoder</h3>
              <div className="space-y-2 text-muted-foreground text-sm">
                <p>
                  This tool allows you to encode text to Base64 format and decode Base64 strings back to readable text.
                </p>
                <div className="text-xs sm:text-sm space-y-1 pt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Enter your text or Base64 string in the input field</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Click "Encode to Base64" to convert text to Base64 format</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Click "Decode from Base64" to convert Base64 back to text</span>
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
                  <h2 className="text-xl font-bold text-foreground">Base64 Encoder/Decoder - What It Does</h2>
                  {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.whatItDoes && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      This free online Base64 encoder and decoder tool provides seamless conversion between plain text and Base64 encoding format—a fundamental requirement in modern web development, data transmission, and security applications. Base64 encoding transforms binary data into ASCII characters, making it safe for transmission through systems designed to handle text-only data, such as email systems, JSON APIs, and HTML documents.
                    </p>
                    <p className="text-muted-foreground">
                      The tool handles UTF-8 character encoding properly, ensuring that international characters, emojis, and special symbols are accurately converted without data loss. Whether you're working with API authentication headers, embedding images in HTML/CSS, preparing data for storage in text-based formats, or debugging encoded strings in web applications, this Base64 converter delivers reliable, instant results with proper error handling for invalid inputs.
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
                  <h2 className="text-xl font-bold text-foreground">Practical Use Cases for Base64 Encoding</h2>
                  {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.useCases && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Base64 encoding serves essential purposes across various development and data processing scenarios:
                    </p>
                    <ul className="space-y-3 text-muted-foreground pl-5">
                      <li className="pl-2">
                        <strong className="text-foreground">Web Development & Data URIs</strong>
                        <p className="mt-1">Embed images, fonts, and other assets directly in HTML/CSS using data URIs, reducing HTTP requests and improving page load performance.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">API Development & Authentication</strong>
                        <p className="mt-1">Encode credentials for HTTP Basic Authentication headers and handle binary data in JSON/XML APIs that only support text content.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Email Attachments & MIME</strong>
                        <p className="mt-1">Encode file attachments in emails using MIME standards, ensuring binary files transmit correctly through email systems.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Data Storage & Serialization</strong>
                        <p className="mt-1">Store binary data in text-based storage systems like databases, configuration files, or environment variables.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Cryptography & Security</strong>
                        <p className="mt-1">Prepare binary data for cryptographic operations and encode digital signatures or certificates for transmission.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">File Uploads & Downloads</strong>
                        <p className="mt-1">Handle file content in web applications where binary data needs to be transmitted as text, such as in AJAX requests.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Cross-Platform Data Exchange</strong>
                        <p className="mt-1">Ensure data integrity when transferring information between systems with different character encoding standards or binary handling capabilities.</p>
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
                  <h2 className="text-xl font-bold text-foreground">How to Use This Base64 Encoder/Decoder Effectively</h2>
                  {openSections.howToUse ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.howToUse && (
                  <div className="px-6 pb-6">
                    <ol className="space-y-4 text-muted-foreground pl-5">
                      <li className="pl-2">
                        <strong className="text-foreground">Prepare Your Input Data</strong>
                        <p className="mt-1">For encoding: Enter any text including special characters, URLs, or credentials. For decoding: Ensure your Base64 string is valid and properly formatted.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Choose Encoding or Decoding</strong>
                        <p className="mt-1">Click "Encode to Base64" to convert text to Base64 format. Click "Decode from Base64" to convert a Base64 string back to original text.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Validate Your Results</strong>
                        <p className="mt-1">Check the output area for your converted data. Base64 encoded strings typically end with = or == padding and contain only A-Z, a-z, 0-9, +, / characters.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Copy or Use Your Output</strong>
                        <p className="mt-1">Use "Copy Result" to copy the output to clipboard for immediate use in your applications, documentation, or communications.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Handle Errors Appropriately</strong>
                        <p className="mt-1">If you receive an error, check your input format. Base64 strings must be properly padded and contain valid characters for decoding to work.</p>
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
                  <h2 className="text-xl font-bold text-foreground">Base64 Encoding Examples</h2>
                  {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.examples && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground text-sm mb-4">
                      Below are practical examples demonstrating Base64 encoding and decoding with different types of data:
                    </p>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 1: Basic Text Encoding</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                            <h4 className="text-sm font-semibold text-foreground mb-2">Original Text:</h4>
                            <pre className="text-xs text-muted-foreground font-mono whitespace-pre">
{`Hello, World!
This is a test message.`}
                            </pre>
                          </div>
                          <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                            <h4 className="text-sm font-semibold text-foreground mb-2">Base64 Encoded:</h4>
                            <pre className="text-xs text-muted-foreground font-mono whitespace-pre">
{`SGVsbG8sIFdvcmxkIQpUaGlzIGlzIGEgdGVzdCBtZXNzYWdlLg==`}
                            </pre>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 2: URL and Special Characters</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                            <h4 className="text-sm font-semibold text-foreground mb-2">Original Text:</h4>
                            <pre className="text-xs text-muted-foreground font-mono whitespace-pre">
{`https://example.com/api?query=test&sort=desc
User: admin, Password: secret123!@#`}
                            </pre>
                          </div>
                          <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                            <h4 className="text-sm font-semibold text-foreground mb-2">Base64 Encoded:</h4>
                            <pre className="text-xs text-muted-foreground font-mono whitespace-pre">
{`aHR0cHM6Ly9leGFtcGxlLmNvbS9hcGk/cXVlcnk9dGVzdCZzb3J0PWRlc2MKVXNlcjogYWRtaW4sIFBhc3N3b3JkOiBzZWNyZXQxMjMhQCM=`}
                            </pre>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 3: JSON Data Encoding</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                            <h4 className="text-sm font-semibold text-foreground mb-2">Original JSON:</h4>
                            <pre className="text-xs text-muted-foreground font-mono whitespace-pre">
{`{
  "user": "john_doe",
  "email": "john@example.com",
  "active": true,
  "role": "admin"
}`}
                            </pre>
                          </div>
                          <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                            <h4 className="text-sm font-semibold text-foreground mb-2">Base64 Encoded:</h4>
                            <pre className="text-xs text-muted-foreground font-mono whitespace-pre">
{`ewogICJ1c2VyIjogImpvaG5fZG9lIiwKICAiZW1haWwiOiAiam9obkBleGFtcGxlLmNvbSIsCiAgImFjdGl2ZSI6IHRydWUsCiAgInJvbGUiOiAiYWRtaW4iCn0=`}
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
                  <h2 className="text-xl font-bold text-foreground">Frequently Asked Questions About Base64</h2>
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
                        Important: Base64 encoding is NOT encryption and provides no security. Do not use it to hide sensitive information like passwords or API keys. For security, use proper encryption algorithms like AES with appropriate key management. Base64 encoded data can be easily decoded by anyone with access to the encoded string. Always validate and sanitize decoded data before use in applications to prevent injection attacks or malformed data issues.
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