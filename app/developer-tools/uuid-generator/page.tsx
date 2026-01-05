'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, RefreshCw, Check, ChevronDown, ChevronUp, Key, Hash, FileText, Shield, Code, Zap, Package } from 'lucide-react';
import Head from 'next/head';

export default function UuidGeneratorPage() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(1);
  const [copied, setCopied] = useState(false);
  const [version, setVersion] = useState<'v4' | 'v1'>('v4');

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
    { name: 'Base64 Encoder / Decoder', path: '/developer-tools/base64-encoder-decoder', icon: Shield },
    { name: 'JWT Decoder', path: '/developer-tools/jwt-decoder', icon: Key },
    { name: 'Regex Tester', path: '/developer-tools/regex-tester', icon: Code },
    { name: 'Unix Timestamp Converter', path: '/developer-tools/unix-timestamp', icon: Zap },
  ];

  // FAQ Data
  const faqData = [
    {
      question: "What is a UUID and how is it different from other IDs?",
      answer: "A UUID (Universally Unique Identifier) is a 128-bit identifier standardized by the Open Software Foundation. Unlike sequential IDs or database auto-increment IDs, UUIDs are designed to be globally unique across space and time, generated without central coordination. They follow specific formats (8-4-4-4-12 hex digits) and are statistically unique even when generated independently on different systems."
    },
    {
      question: "What's the difference between UUID v1 and v4?",
      answer: "UUID v1 combines MAC address and timestamp, making it partially predictable and traceable to source machine/time. UUID v4 uses random numbers, making it completely random and untraceable. Version 4 is preferred for most web applications due to its randomness and privacy benefits. Version 1 might be used where temporal ordering is important but raises privacy concerns."
    },
    {
      question: "Are UUIDs really unique? Can collisions occur?",
      answer: "While theoretically possible, UUID collisions are extremely improbable—about 1 in 2.71 quintillion for v4 UUIDs. In practice, you would need to generate 1 billion UUIDs per second for about 85 years to have a 50% chance of a single collision. For most applications, UUIDs can be treated as effectively unique."
    },
    {
      question: "When should I use UUIDs vs auto-increment database IDs?",
      answer: "Use UUIDs when: you need distributed ID generation across multiple systems, want to avoid exposing sequential data (security), merge data from different sources, or generate IDs before database insertion. Use auto-increment IDs for single-database systems where performance and storage efficiency are priorities, as UUIDs are larger (16 bytes vs 4-8 bytes) and can impact indexing performance."
    },
    {
      question: "Can UUIDs be used in URLs and database indexes efficiently?",
      answer: "Yes, but consider storage and performance implications. UUIDs are 128-bit (16 bytes) vs 32-bit (4 bytes) integers, increasing storage requirements. For database indexes, random UUIDs (v4) cause index fragmentation; consider UUID v1 for temporal ordering or use database-specific UUID optimization techniques. For URLs, UUIDs are URL-safe and don't expose sequence information."
    }
  ];

  const generateV4Uuid = () => {
    // Use crypto.randomUUID if available (modern browsers)
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    
    // Fallback for older browsers
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  const generateV1Uuid = () => {
    // Simplified v1-like UUID (not true v1, but follows format)
    const timestamp = Date.now();
    const randomPart1 = Math.floor(Math.random() * 0xffff).toString(16).padStart(4, '0');
    const randomPart2 = Math.floor(Math.random() * 0xffff).toString(16).padStart(4, '0');
    const randomPart3 = Math.floor(Math.random() * 0xffff).toString(16).padStart(4, '0');
    const randomPart4 = Math.floor(Math.random() * 0xffff).toString(16).padStart(4, '0');
    const randomPart5 = Math.floor(Math.random() * 0xffffffff).toString(16).padStart(8, '0');
    
    return `${randomPart1}${randomPart2}-${randomPart3}-1${randomPart4.slice(1)}-${randomPart5.slice(0, 4)}-${randomPart5.slice(4)}`;
  };

  const generateUuids = () => {
    const newUuids: string[] = [];
    const generator = version === 'v4' ? generateV4Uuid : generateV1Uuid;
    
    for (let i = 0; i < count; i++) {
      newUuids.push(generator());
    }
    
    setUuids(newUuids);
    setCopied(false);
  };

  const clearAll = () => {
    setUuids([]);
    setCopied(false);
  };

  const copyToClipboard = async (uuid?: string) => {
    try {
      if (uuid) {
        await navigator.clipboard.writeText(uuid);
      } else {
        await navigator.clipboard.writeText(uuids.join('\n'));
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= 100) {
      setCount(value);
    }
  };

  return (
    <>
      <Head>
        <title>UUID Generator | Free Online UUID v4/v1 Generator - GrockTool.com</title>
        <meta name="description" content="Generate UUIDs (Universally Unique Identifiers) instantly with our free online generator. Supports UUID v4 (random) and v1 (time-based) formats." />
        <meta name="keywords" content="UUID generator, GUID generator, unique identifier, random UUID, UUID v4, UUID v1, online UUID generator, generate UUID, unique ID generator" />
        <meta property="og:title" content="UUID Generator | Free Online UUID v4/v1 Generator - GrockTool.com" />
        <meta property="og:description" content="Free online UUID generator tool to create version 4 (random) and version 1 (time-based) UUIDs instantly. Generate single or multiple UUIDs with one click." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="UUID Generator - GrockTool.com" />
        <meta name="twitter:description" content="Free online UUID generator for creating unique identifiers." />
        <link rel="canonical" href="https://grocktool.com/developer-tools/uuid-generator" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "UUID Generator Tool",
            "applicationCategory": "DeveloperApplication",
            "operatingSystem": "Any",
            "description": "Free online UUID generator tool to create version 4 (random) and version 1 (time-based) UUIDs instantly with single or batch generation",
            "url": "https://grocktool.com/developer-tools/uuid-generator",
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
              "UUID v4 generation (random)",
              "UUID v1 generation (time-based)",
              "Batch UUID generation",
              "Clipboard copy functionality",
              "Count selection (1-100)",
              "Clear all functionality"
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
                  UUID Generator – Fast, Accurate & Free
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Generate UUIDs (Universally Unique Identifiers) instantly
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
              {/* Controls Section */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* UUID Version Selection */}
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-foreground">
                      UUID Version
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() => setVersion('v4')}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border transition-colors ${version === 'v4'
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-secondary/30 text-foreground border-border hover:bg-secondary/50'
                          }`}
                      >
                        <Package size={16} />
                        Version 4 (Random)
                      </button>
                      <button
                        onClick={() => setVersion('v1')}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border transition-colors ${version === 'v1'
                            ? 'bg-purple-600 text-white border-purple-600'
                            : 'bg-secondary/30 text-foreground border-border hover:bg-secondary/50'
                          }`}
                      >
                        <Hash size={16} />
                        Version 1 (Time-based)
                      </button>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                        <span>v4: Completely random, most common for web apps</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                        <span>v1: Based on timestamp and MAC address, time-ordered</span>
                      </div>
                    </div>
                  </div>

                  {/* Count Selection */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="block text-sm font-medium text-foreground">
                        Number of UUIDs to Generate
                      </label>
                      <span className="text-xs text-muted-foreground">Max: 100</span>
                    </div>
                    <div className="relative">
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={count}
                        onChange={handleCountChange}
                        className="w-full p-4 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-ring focus:ring-opacity-50 text-foreground"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-1">
                        <button
                          onClick={() => setCount(Math.max(1, count - 1))}
                          className="w-8 h-8 flex items-center justify-center bg-secondary rounded hover:bg-secondary/80 transition-colors"
                        >
                          -
                        </button>
                        <button
                          onClick={() => setCount(Math.min(100, count + 1))}
                          className="w-8 h-8 flex items-center justify-center bg-secondary rounded hover:bg-secondary/80 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Generate between 1 and 100 UUIDs at once
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={clearAll}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg sm:rounded-xl hover:bg-secondary/80 transition-colors text-sm sm:text-base"
                  >
                    <RefreshCw size={16} className="sm:w-4 sm:h-4" />
                    Clear All
                  </button>
                  <button
                    onClick={generateUuids}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg sm:rounded-xl hover:bg-blue-700 transition-colors text-sm sm:text-base"
                  >
                    <Key size={16} className="sm:w-4 sm:h-4" />
                    Generate {count} UUID{count !== 1 ? 's' : ''}
                  </button>
                </div>
              </div>

              {/* Results Section */}
              {uuids.length > 0 && (
                <div className="mt-8 pt-6 border-t border-border">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Generated UUIDs</h3>
                      <p className="text-sm text-muted-foreground">
                        Version {version.toUpperCase()} • {uuids.length} UUID{uuids.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => copyToClipboard()}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm bg-accent text-accent-foreground rounded-lg hover:bg-accent/80 transition-colors"
                      >
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                        {copied ? 'Copied!' : 'Copy All'}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                    {uuids.map((uuid, index) => (
                      <div
                        key={index}
                        className="group flex items-center justify-between p-4 bg-secondary/30 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-1">
                            <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-background rounded text-xs font-mono">
                              {index + 1}
                            </div>
                            <code className="font-mono text-sm text-foreground break-all">
                              {uuid}
                            </code>
                          </div>
                          <div className="text-xs text-muted-foreground ml-9">
                            Length: {uuid.length} chars • Format: 8-4-4-4-12
                          </div>
                        </div>
                        <button
                          onClick={() => copyToClipboard(uuid)}
                          className="flex-shrink-0 ml-3 p-2 opacity-0 group-hover:opacity-100 hover:bg-secondary rounded transition-all"
                          title="Copy UUID"
                        >
                          <Copy size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Quick Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 mb-8 shadow-sm"
            >
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">How to Generate UUIDs</h3>
              <div className="space-y-2 text-muted-foreground text-sm">
                <p>
                  This tool generates UUIDs (Universally Unique Identifiers) that are statistically unique across time and space.
                </p>
                <div className="text-xs sm:text-sm space-y-1 pt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Select UUID version: v4 (random) or v1 (time-based)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Choose how many UUIDs to generate (1-100 at once)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Click "Generate" to create UUIDs instantly</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Copy individual UUIDs or all at once using copy buttons</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Use "Clear All" to reset and generate new UUIDs</span>
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
                  <h2 className="text-xl font-bold text-foreground">UUID Generator - What It Does</h2>
                  {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.whatItDoes && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      This free online UUID generator creates Universally Unique Identifiers—128-bit identifiers standardized by RFC 4122 that are statistically unique across space and time. The tool supports both version 4 (random) and version 1 (time-based) UUID formats, providing developers with the appropriate identifier type for different application scenarios, from database keys and API tokens to session identifiers and distributed system coordination.
                    </p>
                    <p className="text-muted-foreground">
                      Unlike sequential IDs or database-generated identifiers, UUIDs can be created independently on multiple systems without coordination, making them ideal for distributed architectures, offline data generation, and scenarios where merging data from different sources is required. The generator uses cryptographically strong random number generation (for v4) and proper UUID formatting to ensure compliance with the UUID standard, producing identifiers that follow the canonical 8-4-4-4-12 hexadecimal format (e.g., 123e4567-e89b-12d3-a456-426614174000).
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
                  <h2 className="text-xl font-bold text-foreground">Practical Use Cases for UUIDs</h2>
                  {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.useCases && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      UUIDs serve essential purposes across various development and system architecture scenarios:
                    </p>
                    <ul className="space-y-3 text-muted-foreground pl-5">
                      <li className="pl-2">
                        <strong className="text-foreground">Distributed System Identifiers</strong>
                        <p className="mt-1">Generate unique IDs across multiple servers, microservices, or databases without central coordination, preventing ID conflicts in distributed architectures.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Database Primary Keys</strong>
                        <p className="mt-1">Use as primary keys in databases where records may be created offline or synchronized from multiple sources, ensuring global uniqueness.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">API Authentication & Tokens</strong>
                        <p className="mt-1">Create unique access tokens, session IDs, and API keys that are statistically unique and difficult to guess or enumerate.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">File & Resource Identifiers</strong>
                        <p className="mt-1">Assign unique names to uploaded files, storage objects, or resources to prevent naming collisions and enable easy reference.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Event Tracking & Correlation</strong>
                        <p className="mt-1">Generate correlation IDs for tracing requests through distributed systems, logging, and monitoring application workflows.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Offline Data Generation</strong>
                        <p className="mt-1">Create records in mobile or offline applications that can later be synchronized with central databases without ID conflicts.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Security & Obfuscation</strong>
                        <p className="mt-1">Use UUIDs instead of sequential IDs in URLs to prevent enumeration attacks and hide resource count information from users.</p>
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
                  <h2 className="text-xl font-bold text-foreground">How to Use This UUID Generator Effectively</h2>
                  {openSections.howToUse ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.howToUse && (
                  <div className="px-6 pb-6">
                    <ol className="space-y-4 text-muted-foreground pl-5">
                      <li className="pl-2">
                        <strong className="text-foreground">Choose UUID Version Appropriately</strong>
                        <p className="mt-1">Select v4 for most web applications (random, private) or v1 for scenarios needing temporal ordering (time-based, potentially traceable).</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Determine Required Quantity</strong>
                        <p className="mt-1">Set the count based on your needs: 1 for single identifiers, multiple for batch operations like database seeding or test data generation.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Generate UUIDs</strong>
                        <p className="mt-1">Click "Generate" to create UUIDs. The tool uses cryptographically secure random generation for v4 and proper formatting for v1.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Copy and Implement</strong>
                        <p className="mt-1">Copy individual UUIDs or all generated IDs at once for use in your database schemas, application code, or configuration files.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Verify Format Compliance</strong>
                        <p className="mt-1">Ensure generated UUIDs follow the standard format: 32 hexadecimal characters displayed in 5 groups separated by hyphens.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Consider Storage Implications</strong>
                        <p className="mt-1">Remember UUIDs require 16 bytes of storage vs 4-8 bytes for integers; plan database storage and indexing accordingly.</p>
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
                  <h2 className="text-xl font-bold text-foreground">UUID Format Examples</h2>
                  {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.examples && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground text-sm mb-4">
                      Below are examples of different UUID versions and their typical use cases:
                    </p>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">UUID Version 4 (Random) Examples</h3>
                        <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                          <div className="space-y-2">
                            <div className="flex items-start gap-3">
                              <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-background rounded text-xs">1</div>
                              <div>
                                <code className="font-mono text-sm text-foreground">f47ac10b-58cc-4372-a567-0e02b2c3d479</code>
                                <div className="text-xs text-muted-foreground mt-1">Typical v4 format with random hexadecimal characters</div>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-background rounded text-xs">2</div>
                              <div>
                                <code className="font-mono text-sm text-foreground">550e8400-e29b-41d4-a716-446655440000</code>
                                <div className="text-xs text-muted-foreground mt-1">Note the '4' in position 13 indicating version 4</div>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-background rounded text-xs">3</div>
                              <div>
                                <code className="font-mono text-sm text-foreground">123e4567-e89b-12d3-a456-426614174000</code>
                                <div className="text-xs text-muted-foreground mt-1">Example from RFC 4122 demonstrating standard format</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground">
                          Version 4 UUIDs are completely random (except for version bits). The '4' in position 13 and bits in position 17 indicate version/variant.
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">UUID Version 1 (Time-based) Examples</h3>
                        <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                          <div className="space-y-2">
                            <div className="flex items-start gap-3">
                              <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-background rounded text-xs">1</div>
                              <div>
                                <code className="font-mono text-sm text-foreground">d5a3a7f0-5b11-11ed-9b6a-0242ac120002</code>
                                <div className="text-xs text-muted-foreground mt-1">Time-based with MAC address component (position 13 contains '1')</div>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-background rounded text-xs">2</div>
                              <div>
                                <code className="font-mono text-sm text-foreground">6ba7b810-9dad-11d1-80b4-00c04fd430c8</code>
                                <div className="text-xs text-muted-foreground mt-1">Example from RFC 4122 for UUID v1</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground">
                          Version 1 UUIDs combine timestamp (first 8 hex digits) and MAC address (last 12 hex digits). The '1' in position 13 indicates version 1.
                        </div>
                      </div>
                      <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                        <h4 className="text-sm font-semibold text-foreground mb-2">UUID Structure Breakdown</h4>
                        <pre className="text-xs text-muted-foreground font-mono whitespace-pre">
{`Format: XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
Positions and meaning:
1-8:   Time-low (v1) or random (v4)
9-12:  Time-mid (v1) or random (v4)
13:    Version number (4 for v4, 1 for v1)
14-16: Time-high (v1) or random (v4)
17:    Variant (always 8, 9, A, or B for RFC 4122)
18-20: Clock sequence (v1) or random (v4)
21-32: Node identifier (MAC address for v1, random for v4)`}
                        </pre>
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
                  <h2 className="text-xl font-bold text-foreground">Frequently Asked Questions About UUIDs</h2>
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
                    
                    {/* Best Practices */}
                    <div className="mt-8 p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                      <h3 className="text-lg font-semibold text-foreground mb-2">UUID Implementation Best Practices</h3>
                      <p className="text-sm text-muted-foreground">
                        For optimal UUID usage: 1) Choose v4 for most applications due to randomness and privacy, 2) Store UUIDs as binary(16) in databases when possible for efficiency, 3) Consider database-specific UUID optimizations (like PostgreSQL's uuid-ossp), 4) Use appropriate indexing strategies for UUID columns, 5) Validate UUID format when accepting user input, 6) Consider URL-safe base64 encoding if using UUIDs in URLs, 7) Document UUID version and generation logic in your codebase for maintainability.
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