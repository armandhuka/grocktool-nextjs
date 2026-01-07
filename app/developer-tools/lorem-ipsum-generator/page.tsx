'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, RefreshCw, Check, AlertCircle, ChevronDown, ChevronUp, FileText, Type, Hash, Clipboard, FileCheck } from 'lucide-react';
import Head from 'next/head';

const LOREM_WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur',
  'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor',
  'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna',
  'aliqua', 'ut', 'enim', 'ad', 'minim', 'veniam', 'quis',
  'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi',
  'aliquip', 'ex', 'ea', 'commodo', 'consequat', 'duis',
  'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'eu', 'fugiat', 'nulla',
  'pariatur', 'excepteur', 'sint', 'occaecat', 'cupidatat',
  'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
  'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
];

export default function LoremIpsumGeneratorPage() {
  const [count, setCount] = useState(3);
  const [type, setType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [paragraphCount, setParagraphCount] = useState(0);

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
    { name: 'Base64 Encoder / Decoder', path: '/developer-tools/base64-encoder-decoder', icon: FileCheck },
    { name: 'JWT Decoder', path: '/developer-tools/jwt-decoder', icon: FileCheck },
    { name: 'Regex Tester', path: '/developer-tools/regex-tester', icon: FileText },
    { name: 'UUID Generator', path: '/developer-tools/uuid-generator', icon: Hash },
    { name: 'Unix Timestamp Converter', path: '/developer-tools/unix-timestamp', icon: Hash },
    { name: 'JSON Formatter & Validator', path: '/developer-tools/json-formatter', icon: FileText },
    { name: 'JSON to XML Converter', path: '/developer-tools/json-to-xml', icon: FileText },
    { name: 'HTML Minifier', path: '/developer-tools/html-minifier', icon: FileText },
    { name: 'CSS Minifier', path: '/developer-tools/css-minifier', icon: FileText },
    { name: 'JavaScript Minifier', path: '/developer-tools/javascript-minifier', icon: FileText },
    { name: 'URL Encoder / Decoder', path: '/developer-tools/url-encoder-decoder', icon: FileText },
    { name: 'HTML Escape / Unescape', path: '/developer-tools/html-escape-unescape', icon: FileCheck },
    { name: 'Color Code Converter', path: '/developer-tools/color-code-converter', icon: FileText }
  ];

  // FAQ Data
  const faqData = [
    {
      question: "What is Lorem Ipsum and why is it used in design?",
      answer: "Lorem Ipsum is dummy text used in graphic design, typesetting, and web development to demonstrate visual layouts without distracting readers with meaningful content. It originates from Cicero's philosophical work 'De finibus bonorum et malorum' (On the Extremes of Good and Evil), adapted as nonsense Latin text. Designers use Lorem Ipsum to focus clients on layout, typography, and visual hierarchy rather than getting sidetracked by actual content during the design review process. It provides realistic text blocks that mimic real content length and density."
    },
    {
      question: "How many types of Lorem Ipsum text can I generate?",
      answer: "Our generator supports three main types: paragraphs (multiple sentences grouped with line breaks), sentences (individual sentences with proper punctuation), and words (single words without formatting). You can generate any quantity from 1 to 1000 units. Paragraphs typically contain 3-6 sentences each, sentences contain 8-16 words, and words are selected from a comprehensive Latin vocabulary that creates authentic-looking dummy text for all design purposes."
    },
    {
      question: "What are common use cases for Lorem Ipsum in modern design?",
      answer: "Common uses include: 1) Website mockups and wireframes, 2) Print design layouts (brochures, magazines), 3) UI/UX prototyping, 4) Testing typography and font pairings, 5) Demonstrating content density in responsive designs, 6) Filling content areas during development, 7) Creating design presentations for clients, 8) Testing text rendering and line heights, 9) Evaluating color contrast with text content, 10) Simulating real content in templates and themes before actual content is available."
    },
    {
      question: "Is Lorem Ipsum suitable for accessibility testing?",
      answer: "For accessibility testing, use real content whenever possible. However, Lorem Ipsum can be used for: 1) Testing screen reader flow through layout structures, 2) Evaluating text sizing and spacing for readability, 3) Testing color contrast ratios with realistic text density, 4) Checking navigation flow through content-heavy pages. For WCAG compliance testing, supplement with real content. Remember that screen readers pronounce Latin words, which differs from real language processing, so combine with meaningful content for comprehensive accessibility testing."
    },
    {
      question: "Can I customize the generated Lorem Ipsum text?",
      answer: "While classic Lorem Ipsum maintains its specific Latin vocabulary for authenticity, our generator provides control over quantity and format. For custom vocabulary or industry-specific dummy text, you would need specialized tools. The value of standard Lorem Ipsum is its consistency—designers worldwide recognize it as placeholder text, allowing them to focus on design elements rather than content meaning. For most design and development purposes, the standard Latin text provides the ideal neutral placeholder that doesn't distract from visual evaluation."
    }
  ];

  const getRandomWord = () =>
    LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];

  const generateWords = (num: number) =>
    Array.from({ length: num }, getRandomWord).join(' ');

  const generateSentences = (num: number) =>
    Array.from({ length: num }, () => {
      const length = 8 + Math.floor(Math.random() * 8);
      const sentence = generateWords(length);
      return sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
    }).join(' ');

  const generateParagraphs = (num: number) =>
    Array.from({ length: num }, () => {
      const sentences = 3 + Math.floor(Math.random() * 4);
      return generateSentences(sentences);
    }).join('\n\n');

  const generateLorem = () => {
    let text = '';
    if (type === 'words') text = generateWords(count);
    if (type === 'sentences') text = generateSentences(count);
    if (type === 'paragraphs') text = generateParagraphs(count);
    
    setOutput(text);
    setCharacterCount(text.length);
    setWordCount(text.split(/\s+/).filter(word => word.length > 0).length);
    setParagraphCount(type === 'paragraphs' ? count : 1);
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

  const resetAll = () => {
    setOutput('');
    setCount(3);
    setType('paragraphs');
    setCopied(false);
    setCharacterCount(0);
    setWordCount(0);
    setParagraphCount(0);
  };

  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(1000, Math.max(1, Number(e.target.value)));
    setCount(value);
  };

  return (
    <>
      <Head>
        <title>Lorem Ipsum Generator | Free Online Dummy Text Tool - GrockTool.com</title>
        <meta name="description" content="Generate Lorem Ipsum placeholder text for design mockups, website prototypes, and content layout testing. Create paragraphs, sentences, or words with custom counts." />
        <meta name="keywords" content="Lorem Ipsum generator, dummy text, placeholder text, design mockup, content filler, web design tool, prototype text, Latin text generator, design placeholder" />
        <meta property="og:title" content="Lorem Ipsum Generator | Free Online Dummy Text Tool - GrockTool.com" />
        <meta property="og:description" content="Free online Lorem Ipsum generator tool. Create placeholder text for design mockups, website prototypes, and content layout testing with custom paragraph counts." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Lorem Ipsum Generator - GrockTool.com" />
        <meta name="twitter:description" content="Free online Lorem Ipsum generator for design mockups and prototypes." />
        <link rel="canonical" href="https://grocktool.com/developer-tools/lorem-ipsum-generator" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Lorem Ipsum Generator",
            "applicationCategory": "DesignApplication",
            "operatingSystem": "Any",
            "description": "Free online tool to generate Lorem Ipsum placeholder text for design mockups, website prototypes, and content layout testing",
            "url": "https://grocktool.com/developer-tools/lorem-ipsum-generator",
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
              "Paragraph generation",
              "Sentence generation",
              "Word generation",
              "Custom quantity control",
              "Character/word counting",
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
                  Lorem Ipsum Generator – Design & Prototyping Tool
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Generate placeholder text for design mockups, website prototypes, and content layout testing
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      Text Type
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { value: 'paragraphs', label: 'Paragraphs', icon: Type },
                        { value: 'sentences', label: 'Sentences', icon: FileText },
                        { value: 'words', label: 'Words', icon: Hash }
                      ].map((option) => {
                        const Icon = option.icon;
                        return (
                          <button
                            key={option.value}
                            onClick={() => setType(option.value as any)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${type === option.value ? 'bg-blue-100 border-blue-300 text-blue-700' : 'bg-secondary/30 border-border text-foreground hover:bg-secondary/50'}`}
                          >
                            <Icon size={16} />
                            <span className="text-sm font-medium">{option.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="block text-sm font-medium text-foreground">
                        Count: <span className="font-bold text-blue-600">{count}</span>
                      </label>
                      <span className="text-xs text-muted-foreground">1-1000</span>
                    </div>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="1"
                        max="100"
                        value={Math.min(count, 100)}
                        onChange={(e) => setCount(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>1</span>
                        <span>50</span>
                        <span>100</span>
                      </div>
                      <input
                        type="number"
                        min="1"
                        max="1000"
                        value={count}
                        onChange={handleCountChange}
                        className="w-full p-2 border rounded-lg text-center font-medium"
                      />
                    </div>
                  </div>
                </div>

                {/* Stats Preview */}
                <div className="space-y-4">
                  <div className="bg-secondary/30 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-foreground mb-3">Quick Stats</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-background rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-blue-600">{count}</div>
                        <div className="text-xs text-muted-foreground mt-1">{type.charAt(0).toUpperCase() + type.slice(1)}</div>
                      </div>
                      <div className="bg-background rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-green-600">{wordCount}</div>
                        <div className="text-xs text-muted-foreground mt-1">Words</div>
                      </div>
                      <div className="bg-background rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-purple-600">{characterCount}</div>
                        <div className="text-xs text-muted-foreground mt-1">Characters</div>
                      </div>
                      <div className="bg-background rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-orange-600">{paragraphCount}</div>
                        <div className="text-xs text-muted-foreground mt-1">Paragraphs</div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={generateLorem}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg sm:rounded-xl hover:bg-blue-700 transition-colors text-sm sm:text-base"
                  >
                    <FileText size={18} />
                    Generate Lorem Ipsum
                  </button>
                </div>
              </div>

              {/* Output Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-foreground">
                    Generated Text
                  </label>
                  {output && (
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <FileText size={12} />
                        <span>{wordCount} words</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Type size={12} />
                        <span>{characterCount} chars</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="relative">
                  <textarea
                    value={output}
                    readOnly
                    placeholder="Generated Lorem Ipsum text will appear here..."
                    className="w-full min-h-[250px] p-4 bg-input border border-border rounded-lg sm:rounded-xl focus:outline-none resize-none text-foreground placeholder-muted-foreground font-serif text-sm leading-relaxed"
                  />
                  {output && (
                    <div className="absolute top-2 right-2">
                      <button
                        onClick={copyToClipboard}
                        className="flex items-center gap-2 px-3 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/80 transition-colors text-sm"
                      >
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                        {copied ? 'Copied!' : 'Copy Text'}
                      </button>
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
                {output && (
                  <button
                    onClick={copyToClipboard}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent text-accent-foreground rounded-lg sm:rounded-xl hover:bg-accent/80 transition-colors text-sm sm:text-base"
                  >
                    {copied ? <Check size={16} /> : <Clipboard size={16} />}
                    {copied ? 'Copied!' : 'Copy All Text'}
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
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">How to Use Lorem Ipsum Generator</h3>
              <div className="space-y-2 text-muted-foreground text-sm">
                <p>
                  Generate placeholder text for design mockups, website prototypes, and content layout testing.
                </p>
                <div className="text-xs sm:text-sm space-y-1 pt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Choose text type: Paragraphs, Sentences, or Words</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Select quantity using slider or input field (1-1000)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Click "Generate Lorem Ipsum" to create placeholder text</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Check word and character counts for precise layout planning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Use "Copy Text" to copy generated text or "Clear All" to start over</span>
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
                  <h2 className="text-xl font-bold text-foreground">Lorem Ipsum Generator - What It Does</h2>
                  {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.whatItDoes && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      This free online Lorem Ipsum generator creates authentic placeholder text for designers, developers, and content creators working on visual layouts and prototypes. It produces the classic Latin-derived dummy text that has been the industry standard since the 1500s, allowing professionals to focus on design elements like typography, spacing, and visual hierarchy without being distracted by meaningful content. The tool generates text that mimics real content density and length, providing realistic blocks of text for accurate layout testing and client presentations.
                    </p>
                    <p className="text-muted-foreground">
                      With flexible output options including paragraphs, sentences, and individual words, you can generate precisely the amount of placeholder text needed for any design scenario. The generator includes detailed statistics showing word count, character count, and paragraph count—essential metrics for responsive design testing and content planning. Whether you're creating website mockups, designing print materials, testing typography systems, or building UI prototypes, this tool delivers professional-grade Lorem Ipsum text with the control and precision modern design workflows require.
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
                  <h2 className="text-xl font-bold text-foreground">Practical Use Cases for Lorem Ipsum</h2>
                  {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.useCases && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Lorem Ipsum serves essential purposes across design, development, and content creation workflows:
                    </p>
                    <ul className="space-y-3 text-muted-foreground pl-5">
                      <li className="pl-2">
                        <strong className="text-foreground">Website & App Design Mockups</strong>
                        <p className="mt-1">Fill content areas in wireframes and prototypes to test layout, spacing, and visual flow without distracting stakeholders with actual content.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Print Design & Publishing</strong>
                        <p className="mt-1">Create placeholder text for brochures, magazines, books, and marketing materials to evaluate typography and page layout before final content is ready.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">UI/UX Development</strong>
                        <p className="mt-1">Test responsive designs with realistic text blocks to ensure proper scaling, line breaking, and readability across different screen sizes and devices.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Typography & Font Testing</strong>
                        <p className="mt-1">Evaluate font pairings, sizes, weights, and spacing using text that mimics real content density without introducing content bias.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Template & Theme Development</strong>
                        <p className="mt-1">Fill WordPress themes, HTML templates, and email newsletter designs with placeholder content to demonstrate functionality to clients.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Content Management Systems</strong>
                        <p className="mt-1">Test CMS layouts, editor interfaces, and content display with realistic text blocks before actual content is created or imported.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Accessibility Testing</strong>
                        <p className="mt-1">Check screen reader flow, text sizing, and color contrast ratios with content that has consistent density but no semantic meaning.</p>
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
                  <h2 className="text-xl font-bold text-foreground">How to Use This Lorem Ipsum Generator Effectively</h2>
                  {openSections.howToUse ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.howToUse && (
                  <div className="px-6 pb-6">
                    <ol className="space-y-4 text-muted-foreground pl-5">
                      <li className="pl-2">
                        <strong className="text-foreground">Determine Your Needs</strong>
                        <p className="mt-1">Decide whether you need paragraphs (for body content), sentences (for headings or captions), or words (for labels or tags). Consider the content density required for your design.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Set Quantity and Format</strong>
                        <p className="mt-1">Select text type and adjust the quantity slider or input field. For responsive design testing, generate multiple quantities to test different content scenarios.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Generate and Review</strong>
                        <p className="mt-1">Click "Generate Lorem Ipsum" and review the output. Check the statistics panel for word and character counts to ensure appropriate content density.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Apply to Your Design</strong>
                        <p className="mt-1">Copy the generated text into your design tools (Figma, Adobe XD, Sketch), development environment, or document. Use different quantities for different layout areas.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Test Responsiveness</strong>
                        <p className="mt-1">Test how the placeholder text behaves in different viewport sizes. Adjust quantities as needed to simulate various content lengths and user scenarios.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Iterate and Refine</strong>
                        <p className="mt-1">Generate new text with different parameters as your design evolves. Use the statistics to maintain consistent content density across your project.</p>
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
                  <h2 className="text-xl font-bold text-foreground">Lorem Ipsum Generation Examples</h2>
                  {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.examples && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground text-sm mb-4">
                      Below are practical examples demonstrating different Lorem Ipsum generation scenarios:
                    </p>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 1: Website Body Content (3 Paragraphs)</h3>
                        <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                          <pre className="text-xs text-muted-foreground font-serif whitespace-pre">
{`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.`}
                          </pre>
                          <div className="mt-3 text-sm text-blue-600">
                            3 paragraphs • 198 words • 1,245 characters
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 2: Short Description (2 Sentences)</h3>
                        <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                          <pre className="text-xs text-muted-foreground font-serif whitespace-pre">
{`Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor. Incididunt ut labore et dolore magna aliqua ut enim ad minim veniam.`}
                          </pre>
                          <div className="mt-3 text-sm text-blue-600">
                            2 sentences • 20 words • 128 characters
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 3: Tags/Labels (10 Words)</h3>
                        <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                          <pre className="text-xs text-muted-foreground font-serif whitespace-pre">
{`lorem ipsum dolor sit amet consectetur adipiscing elit sed do`}
                          </pre>
                          <div className="mt-3 text-sm text-blue-600">
                            10 words • 50 characters
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
                  <h2 className="text-xl font-bold text-foreground">Frequently Asked Questions About Lorem Ipsum</h2>
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
                      <h3 className="text-lg font-semibold text-foreground mb-2">Design Best Practices</h3>
                      <p className="text-sm text-muted-foreground">
                        Important: While Lorem Ipsum is excellent for visual design and layout testing, always supplement with real content for: 1) Final client presentations, 2) Usability testing with real users, 3) SEO optimization and metadata planning, 4) Accessibility compliance verification, 5) Content strategy development. Use Lorem Ipsum during the design phase to focus on visual elements, but transition to actual content as soon as possible. For responsive design, test with both short and long content variations to ensure your layout handles all real-world content scenarios effectively.
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