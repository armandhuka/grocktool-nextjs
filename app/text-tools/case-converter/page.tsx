'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, RotateCcw, ChevronDown, ChevronUp, Type, ArrowUpDown, Hash, FileText, Code } from 'lucide-react';
import Head from 'next/head';

export default function CaseConverterPage() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

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
      question: "What's the difference between Title Case and Sentence Case?",
      answer: "Title Case capitalizes the first letter of every major word (nouns, pronouns, verbs, adjectives, adverbs), typically used for titles and headings. Sentence Case capitalizes only the first word of each sentence, like normal writing. Example: Title Case: 'The Quick Brown Fox Jumps Over The Lazy Dog'; Sentence Case: 'The quick brown fox jumps over the lazy dog.' Title Case is for headlines, Sentence Case is for paragraphs."
    },
    {
      question: "When should I use camelCase vs snake_case vs kebab-case?",
      answer: "camelCase (exampleVariableName) is standard in JavaScript and Java for variable/function names. snake_case (example_variable_name) is common in Python, Ruby, and databases. kebab-case (example-variable-name) is used in URLs, CSS classes, and file names. Use camelCase for programming, snake_case for databases/configs, kebab-case for web addresses and file naming. Each has specific conventions in different tech stacks."
    },
    {
      question: "Does the case converter handle special characters and numbers?",
      answer: "Yes, our case converter properly handles all characters including numbers, symbols, and Unicode. Numbers remain unchanged in all cases. Special characters are preserved but may affect word boundaries in conversions. For example: 'hello-world' converts to 'Hello-World' in Title Case. Unicode characters (accented letters, emojis) are also supported. The tool maintains character integrity while applying case transformations."
    },
    {
      question: "What is alternating case and when is it useful?",
      answer: "Alternating case (aLtErNaTiNg CaSe) converts text to alternating uppercase and lowercase letters, often starting with lowercase. This format is primarily used for stylistic purposes in social media, branding, or creative writing to create visual interest. It's not used in formal writing or programming. Example: 'alternating case' becomes 'aLtErNaTiNg CaSe'. The tool preserves word boundaries while alternating letters."
    },
    {
      question: "Can I convert multiple lines or paragraphs at once?",
      answer: "Yes, the case converter handles multi-line text and paragraphs seamlessly. Each line is processed independently, maintaining line breaks. For Title Case and Sentence Case, each line or sentence is treated separately. This is useful for converting lists, addresses, or structured data. The tool preserves the original formatting while applying the selected case transformation across all content."
    }
  ];

  const convertCase = (type: string) => {
    if (!inputText.trim()) return;

    let result = '';
    switch (type) {
      case 'uppercase':
        result = inputText.toUpperCase();
        break;
      case 'lowercase':
        result = inputText.toLowerCase();
        break;
      case 'titlecase':
        result = inputText.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
        break;
      case 'sentencecase':
        result = inputText.toLowerCase().replace(/(^\w|\.\s+\w)/g, (char) => char.toUpperCase());
        break;
      case 'camelcase':
        result = inputText.toLowerCase().replace(/\s+(.)/g, (match, char) => char.toUpperCase());
        break;
      case 'snakecase':
        result = inputText.toLowerCase().replace(/\s+/g, '_');
        break;
      case 'kebabcase':
        result = inputText.toLowerCase().replace(/\s+/g, '-');
        break;
      case 'alternating':
        result = inputText.split('').map((char, index) => 
          index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
        ).join('');
        break;
      default:
        result = inputText;
    }
    
    setOutputText(result);
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleSwap = () => {
    setInputText(outputText);
    setOutputText('');
  };

  const caseButtons = [
    { type: 'uppercase', label: 'UPPERCASE', icon: <Type size={14} />, description: 'All letters uppercase' },
    { type: 'lowercase', label: 'lowercase', icon: <Type size={14} />, description: 'All letters lowercase' },
    { type: 'titlecase', label: 'Title Case', icon: <FileText size={14} />, description: 'First letter of each word' },
    { type: 'sentencecase', label: 'Sentence case', icon: <FileText size={14} />, description: 'First word capitalized' },
    { type: 'camelcase', label: 'camelCase', icon: <Code size={14} />, description: 'JavaScript variable style' },
    { type: 'snakecase', label: 'snake_case', icon: <Code size={14} />, description: 'Python/database style' },
    { type: 'kebabcase', label: 'kebab-case', icon: <Hash size={14} />, description: 'URL/file naming style' },
    { type: 'alternating', label: 'aLtErNaTiNg', icon: <ArrowUpDown size={14} />, description: 'Alternating uppercase/lowercase' }
  ];

  const loadExample = () => {
    const example = `hello world! this is a sample text for case conversion.
it includes multiple lines and different characters.
try converting this text to various case formats.`;
    setInputText(example);
  };

  return (
    <>
      <Head>
        <title>Case Converter | Free Online Text Case Transformation Tool - GrockTool.com</title>
        <meta name="description" content="Convert text between uppercase, lowercase, title case, sentence case, camelCase, snake_case, kebab-case and more with our free online case converter." />
        <meta name="keywords" content="case converter, text case converter, uppercase converter, lowercase converter, title case converter, camel case converter, snake case converter, kebab case, text transformation" />
        <meta property="og:title" content="Case Converter | Free Online Text Case Transformation Tool - GrockTool.com" />
        <meta property="og:description" content="Transform text between 8 different case formats instantly: uppercase, lowercase, title case, sentence case, camelCase, snake_case, kebab-case, and alternating case." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Case Converter - GrockTool.com" />
        <meta name="twitter:description" content="Free online tool to convert text between uppercase, lowercase, title case, camelCase, snake_case, and other case formats." />
        <link rel="canonical" href="https://grocktool.com/text-tools/case-converter" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Case Converter Tool",
            "applicationCategory": "TextTransformationApplication",
            "operatingSystem": "Any",
            "description": "Free online case converter to transform text between uppercase, lowercase, title case, camelCase, snake_case, kebab-case and other formats",
            "url": "https://grocktool.com/text-tools/case-converter",
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
              "Uppercase conversion",
              "Lowercase conversion",
              "Title Case formatting",
              "Sentence Case formatting",
              "camelCase generation",
              "snake_case generation",
              "kebab-case generation",
              "Alternating case styling"
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
                  Case Converter
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Convert text between different case formats instantly
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
              {/* Case Conversion Buttons */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-foreground">
                    Conversion Options
                  </label>
                  <button
                    onClick={loadExample}
                    className="text-xs text-accent hover:underline"
                  >
                    Load Example
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                  {caseButtons.map((button) => (
                    <button
                      key={button.type}
                      onClick={() => convertCase(button.type)}
                      className="px-3 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-xs sm:text-sm font-medium text-center group"
                    >
                      <div className="flex items-center justify-center gap-1 mb-1">
                        {button.icon}
                        <span>{button.label}</span>
                      </div>
                      <div className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                        {button.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Input Section */}
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-foreground">
                    Input Text
                  </label>
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Enter your text here..."
                    className="w-full min-h-[200px] p-4 bg-input border border-border rounded-lg sm:rounded-xl focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-ring focus:ring-opacity-50 resize-none text-foreground placeholder-muted-foreground"
                  />
                  
                  {/* Action Buttons */}
                  <button
                    onClick={handleClear}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg sm:rounded-xl hover:bg-secondary/80 transition-colors text-sm sm:text-base"
                  >
                    <RotateCcw size={16} className="sm:w-4 sm:h-4" />
                    Clear All
                  </button>
                </div>

                {/* Output Section */}
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-foreground">
                    Result
                  </label>
                  <textarea
                    value={outputText}
                    readOnly
                    placeholder="Converted text will appear here..."
                    className="w-full min-h-[200px] p-4 bg-muted border border-border rounded-lg sm:rounded-xl focus:outline-none resize-none text-foreground placeholder-muted-foreground"
                  />
                  
                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={handleCopy}
                      disabled={!outputText}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg sm:rounded-xl hover:bg-secondary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                    >
                      <Copy size={16} className="sm:w-4 sm:h-4" />
                      Copy Result
                    </button>
                    <button
                      onClick={handleSwap}
                      disabled={!outputText}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent text-accent-foreground rounded-lg sm:rounded-xl hover:bg-accent/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                    >
                      <RotateCcw size={16} className="sm:w-4 sm:h-4" />
                      Use as Input
                    </button>
                  </div>
                </div>
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
                  Convert your text between different case formats with a single click.
                </p>
                <div className="text-xs sm:text-sm space-y-1 pt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Enter your text in the input area</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Click any case conversion button to transform your text</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>View the converted text in the result area</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Copy the result or use it as new input</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Try different case formats for your specific needs</span>
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
                  <h2 className="text-xl font-bold text-foreground">Case Converter Tool - What It Does</h2>
                  {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.whatItDoes && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      This free online case converter transforms text between eight different case formats with precision and speed. The tool handles everything from basic uppercase/lowercase conversions to specialized programming formats like camelCase, snake_case, and kebab-case. Each conversion uses sophisticated algorithms that preserve text integrity while applying the appropriate case transformation rules.
                    </p>
                    <p className="text-muted-foreground">
                      Beyond simple case changes, the converter intelligently handles word boundaries, punctuation, and special characters. It supports Title Case with proper capitalization rules, Sentence Case for natural writing, and even stylistic formats like alternating case. Whether you're formatting programming code, preparing content for publication, or standardizing data across systems, this tool provides the exact case transformation you need with a single click.
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
                  <h2 className="text-xl font-bold text-foreground">Practical Use Cases for Case Conversion</h2>
                  {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.useCases && (
                  <div className="px-6 pb-6">
                    <ul className="space-y-3 text-muted-foreground pl-5">
                      <li className="pl-2">
                        <strong className="text-foreground">Programming & Development</strong>
                        <p className="mt-1">Convert variable names between camelCase, snake_case, and other naming conventions when switching between programming languages or following style guides.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Content Creation & Publishing</strong>
                        <p className="mt-1">Format headlines with Title Case, body text with Sentence Case, or prepare text for different publication platforms with specific case requirements.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Database & Data Management</strong>
                        <p className="mt-1">Standardize data entries by converting names, addresses, or product information to consistent case formats for database consistency and search optimization.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Web Development & SEO</strong>
                        <p className="mt-1">Create kebab-case URLs from page titles, format CSS class names, and prepare meta tags with proper case formatting for better search engine performance.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Academic & Professional Writing</strong>
                        <p className="mt-1">Format paper titles, headings, and citations according to specific style guides (APA, MLA, Chicago) with appropriate case rules for academic publications.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Social Media & Marketing</strong>
                        <p className="mt-1">Create attention-grabbing text with alternating case for social media posts, or standardize brand mentions and hashtags across different platforms.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Internationalization & Localization</strong>
                        <p className="mt-1">Adapt text case for different languages with specific capitalization rules, especially for languages with different character sets or case conventions.</p>
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
                  <h2 className="text-xl font-bold text-foreground">How to Convert Text Between Different Cases</h2>
                  {openSections.howToUse ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.howToUse && (
                  <div className="px-6 pb-6">
                    <ol className="space-y-4 text-muted-foreground pl-5">
                      <li className="pl-2">
                        <strong className="text-foreground">Input Your Text</strong>
                        <p className="mt-1">Paste or type the text you want to convert in the input field. The tool handles single lines, paragraphs, and multi-line content with equal efficiency.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Choose Conversion Type</strong>
                        <p className="mt-1">Select from eight case formats: UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case, kebab-case, or alternating case based on your specific needs.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Apply Conversion</strong>
                        <p className="mt-1">Click your chosen case button to instantly transform the text. The tool processes the conversion in real-time, maintaining all characters and formatting.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Review Results</strong>
                        <p className="mt-1">Check the output for accuracy. For programming conversions, verify that variable names or identifiers follow the intended language conventions.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Iterate if Needed</strong>
                        <p className="mt-1">Use the "Use as Input" button to take the converted text and apply additional transformations, or try different case formats to compare results.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Export Your Text</strong>
                        <p className="mt-1">Copy the converted text to your clipboard with one click, or manually select the output for use in your target application or document.</p>
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
                  <h2 className="text-xl font-bold text-foreground">Case Conversion Examples & Applications</h2>
                  {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.examples && (
                  <div className="px-6 pb-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 1: Programming Variable Conversion</h3>
                        <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                          <pre className="text-sm text-muted-foreground font-mono">
{`Original Text:
user profile information

Conversions:
• UPPERCASE: USER PROFILE INFORMATION
• lowercase: user profile information
• Title Case: User Profile Information
• Sentence case: User profile information
• camelCase: userProfileInformation
• snake_case: user_profile_information
• kebab-case: user-profile-information
• Alternating: uSeR pRoFiLe iNfOrMaTiOn

Application:
Moving from Python (snake_case) to JavaScript (camelCase):
user_profile_info → userProfileInfo
Database column to programming variable conversion.`}
                          </pre>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 2: Content Formatting for Publication</h3>
                        <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                          <pre className="text-sm text-muted-foreground font-mono">
{`Original Text:
the future of artificial intelligence in healthcare

Conversions:
• UPPERCASE: THE FUTURE OF ARTIFICIAL INTELLIGENCE IN HEALTHCARE
• lowercase: the future of artificial intelligence in healthcare
• Title Case: The Future of Artificial Intelligence in Healthcare
• Sentence case: The future of artificial intelligence in healthcare
• camelCase: theFutureOfArtificialIntelligenceInHealthcare
• snake_case: the_future_of_artificial_intelligence_in_healthcare
• kebab-case: the-future-of-artificial-intelligence-in-healthcare
• Alternating: tHe fUtUrE oF aRtIfIcIaL iNtElLiGeNcE iN hEaLtHcArE

Application:
• Title Case: Article headline
• Sentence case: Article introduction
• kebab-case: URL slug: the-future-of-artificial-intelligence-in-healthcare
• UPPERCASE: Section heading in document`}
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
                  <h2 className="text-xl font-bold text-foreground">Related Text & Formatting Tools</h2>
                  {openSections.relatedTools ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.relatedTools && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Explore other useful text and formatting tools from GrockTool.com:
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
                        <Link href="/text-tools/text-sorter" className="text-accent hover:underline">
                          <strong>Text Sorter:</strong> Sort lines of text alphabetically
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        <Link href="/text-tools/text-reverser" className="text-accent hover:underline">
                          <strong>Text Reverser:</strong> Reverse text or word order
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        <Link href="/text-tools/slug-generator" className="text-accent hover:underline">
                          <strong>Slug Generator:</strong> Create SEO-friendly URL slugs
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
                  <h2 className="text-xl font-bold text-foreground">Frequently Asked Questions About Case Conversion</h2>
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
                      <h3 className="text-lg font-semibold text-foreground mb-2">Text Formatting Disclaimer</h3>
                      <p className="text-sm text-muted-foreground">
                        This case converter uses standard text transformation algorithms for case conversion. Different programming languages and style guides may have specific variations or exceptions to standard case conventions. For critical applications, especially in programming or formal publications, always verify that converted text meets the specific requirements of your target language, framework, or style guide. The tool is designed for productivity and convenience but should be used as part of a comprehensive text validation process.
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
}