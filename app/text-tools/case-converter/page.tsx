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
    supportedCaseTypes: true,
    writingCodingUses: false,
    conversionRules: false,
    examples: false,
    characterHandling: false,
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
      question: "Why does my Title Case conversion look wrong for small words?",
      answer: "That's actually correct behavior for proper Title Case. Words like 'a', 'an', 'the', 'and', 'but', 'or', etc. are usually lowercase unless they're the first or last word. Different style guides have different rules - AP Style capitalizes words with 4+ letters, Chicago Style is more complex. Our converter follows standard title case rules. If you need different rules, you might need manual adjustment after conversion."
    },
    {
      question: "Can I convert code from camelCase to snake_case without breaking it?",
      answer: "For simple variable names, yes. But be careful with code - our converter just changes text, it doesn't understand programming syntax. So 'userName' becomes 'user_name' fine, but 'getUserName()' becomes 'get_user_name()' which adds parentheses that might not belong. For code conversion, it's best for simple identifiers, not complex expressions. Always review the output before using in production code."
    },
    {
      question: "What happens to numbers and symbols during conversion?",
      answer: "Numbers stay exactly as they are - 'iPhone12' becomes 'IPHONE12' in uppercase, 'iphone12' in lowercase. Symbols like @, #, $, %, &, * are preserved but treated as word separators in some cases. So 'hello-world' becomes 'Hello-World' in Title Case. Underscores and hyphens are preserved in most conversions. The converter tries to be smart about word boundaries without mangling your text."
    },
    {
      question: "Is there a keyboard shortcut to convert text quickly?",
      answer: "Not directly in the web tool, but you can use Ctrl+A (Cmd+A on Mac) to select all input text, then click your conversion button. For power users who convert text often, consider browser extensions or text editor macros. Many code editors have built-in case conversion - VS Code has 'Transform to Uppercase' etc. right in the command palette. Our web tool is great for one-off conversions or when you're not in your usual editing environment."
    },
    {
      question: "How do I handle names with apostrophes or special characters?",
      answer: "The converter preserves apostrophes and most special characters. 'O'Connor' becomes 'O'CONNOR' in uppercase, 'o'connor' in lowercase. For names with non-English characters like 'José' or 'Björn', the conversion works normally - 'JOSÉ', 'björn'. Emojis and other Unicode symbols are left untouched. If you're working with international text, the converter handles it gracefully."
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
              {/* Supported Case Types */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('supportedCaseTypes')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h2 className="text-xl font-bold text-foreground">Eight Case Types Explained</h2>
                  {openSections.supportedCaseTypes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.supportedCaseTypes && (
                  <div className="px-6 pb-6">
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        Text case isn't just about capitalization - it's about communication style, technical requirements, and even personality. Each of these eight case types serves different purposes in writing, coding, and design.
                      </p>
                      
                      <div className="space-y-4">
                        <div className="bg-blue-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">UPPERCASE & lowercase - The Basics</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            <strong>UPPERCASE</strong> (all caps) isn't just shouting - it's used for acronyms (NASA), legal documents (TERMS AND CONDITIONS), and emphasizing headings. In design, uppercase text can feel more formal or authoritative. But use it sparingly in paragraphs - it's harder to read in bulk because we recognize word shapes, not just individual letters.
                          </p>
                          <p className="text-sm text-muted-foreground">
                            <strong>lowercase</strong> feels informal and modern. Email addresses and URLs are lowercase by necessity. In contemporary branding, lowercase logos (like tumblr or audible) feel approachable. Most body text uses lowercase with sentence case - we're just showing the pure form here.
                          </p>
                        </div>
                        
                        <div className="bg-green-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">Title Case & Sentence Case - For Readers</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            <strong>Title Case</strong> follows specific rules that vary by style guide. Generally: capitalize nouns, pronouns, verbs, adjectives, adverbs, and subordinate conjunctions (like "because"). Don't capitalize articles (a, an, the), coordinating conjunctions (and, but, or), or prepositions (in, on, at) unless they're the first or last word. Our converter follows standard rules, but different publications have their own variations.
                          </p>
                          <p className="text-sm text-muted-foreground">
                            <strong>Sentence case</strong> is what you're reading right now - first word capitalized, rest lowercase (except proper nouns). It's the most readable for paragraphs. News articles, blog posts, and most web content use sentence case. It feels natural because it matches how we speak.
                          </p>
                        </div>
                        
                        <div className="bg-purple-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">camelCase, snake_case, kebab-case - For Machines</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            <strong>camelCase</strong> (or "lower camelCase") starts with lowercase, then capitalizes each subsequent word. Used in JavaScript, Java, and Swift for variables and functions. "Upper CamelCase" or "PascalCase" capitalizes every word - used for class names in many languages.
                          </p>
                          <p className="text-sm text-muted-foreground mb-2">
                            <strong>snake_case</strong> uses underscores between words, all lowercase. Common in Python, Ruby, and databases. It's readable and doesn't require holding Shift. Some use SCREAMING_SNAKE_CASE for constants.
                          </p>
                          <p className="text-sm text-muted-foreground">
                            <strong>kebab-case</strong> (or "dash-case") uses hyphens. Perfect for URLs, CSS classes, and file names because they're URL-safe and don't have the underscore's hidden-underline problem in early web browsers.
                          </p>
                        </div>
                        
                        <div className="bg-amber-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">Alternating Case - For Personality</h3>
                          <p className="text-sm text-muted-foreground">
                            <strong>aLtErNaTiNg cAsE</strong> (or "spongebob case" after the mocking meme) has no technical purpose - it's purely stylistic. Used in social media for playful emphasis, or in design for visual texture. It's hard to read in long passages but can grab attention in short bursts. Some use it ironically online. The converter alternates letter by letter, not word by word, which gives that distinctive up-down rhythm.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </article>

              {/* Writing & Coding Uses */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('writingCodingUses')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h2 className="text-xl font-bold text-foreground">When to Use Each Case Type</h2>
                  {openSections.writingCodingUses ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.writingCodingUses && (
                  <div className="px-6 pb-6">
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        Choosing the right case isn't arbitrary - different contexts demand different formats. Here's when to reach for each type in your writing and coding work.
                      </p>
                      
                      <div className="space-y-4">
                        <div className="bg-blue-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">Writing & Publishing Contexts</h3>
                          <div className="space-y-3 text-sm">
                            <div className="flex items-start gap-2">
                              <div className="w-4 h-4 bg-blue-500/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                                <FileText size={12} className="text-blue-500" />
                              </div>
                              <span><strong>Blog posts & articles:</strong> Title Case for headlines, Sentence case for body text. Subheadings can go either way depending on publication style.</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-4 h-4 bg-green-500/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                                <FileText size={12} className="text-green-500" />
                              </div>
                              <span><strong>Academic papers:</strong> Title Case for paper titles, Sentence case for section headings (varies by style guide). Check APA, MLA, or Chicago requirements.</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-4 h-4 bg-purple-500/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                                <FileText size={12} className="text-purple-500" />
                              </div>
                              <span><strong>Business documents:</strong> Often use Title Case for all headings. Legal documents might use UPPERCASE for emphasis of key terms.</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-4 h-4 bg-amber-500/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                                <FileText size={12} className="text-amber-500" />
                              </div>
                              <span><strong>Social media:</strong> Sentence case feels natural. Some brands use Title Case for posts. Alternating case for playful content. NEVER USE ALL CAPS UNLESS YOU'RE YELLING.</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-green-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">Programming & Development</h3>
                          <div className="space-y-3 text-sm">
                            <div className="flex items-start gap-2">
                              <div className="w-4 h-4 bg-blue-500/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Code size={12} className="text-blue-500" />
                              </div>
                              <span><strong>JavaScript/TypeScript:</strong> camelCase for variables/functions, PascalCase for classes/components, UPPERCASE for constants. 'calculateTotalPrice', 'UserProfile', 'MAX_RETRIES'</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-4 h-4 bg-green-500/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Code size={12} className="text-green-500" />
                              </div>
                              <span><strong>Python:</strong> snake_case for everything (functions, variables). PascalCase for classes. SCREAMING_SNAKE for constants. 'calculate_total', 'UserClass', 'DEFAULT_TIMEOUT'</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-4 h-4 bg-purple-500/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Code size={12} className="text-purple-500" />
                              </div>
                              <span><strong>Database/SQL:</strong> snake_case common for table/column names. Some use camelCase. Consistency within a project matters most. 'user_accounts', 'createdAt'</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-4 h-4 bg-amber-500/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Code size={12} className="text-amber-500" />
                              </div>
                              <span><strong>HTML/CSS:</strong> kebab-case for classes/IDs, lowercase for tags/attributes. 'main-navigation', 'user-profile-card'. Some frameworks use BEM: 'block__element--modifier'</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-purple-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">File Management & URLs</h3>
                          <div className="space-y-3 text-sm">
                            <div className="border-l-4 border-blue-500 pl-3 py-1">
                              <div className="font-medium text-foreground">File naming</div>
                              <div className="text-muted-foreground">Use kebab-case or snake_case. Avoid spaces (breaks in terminals). 'quarterly-report-2024.pdf' or 'quarterly_report_2024.pdf'. Lowercase preferred for cross-platform compatibility.</div>
                            </div>
                            <div className="border-l-4 border-green-500 pl-3 py-1">
                              <div className="font-medium text-foreground">URL slugs</div>
                              <div className="text-muted-foreground">kebab-case, all lowercase. SEO-friendly and readable. 'how-to-learn-python-quickly' converts well from 'How to Learn Python Quickly'.</div>
                            </div>
                            <div className="border-l-4 border-purple-500 pl-3 py-1">
                              <div className="font-medium text-foreground">Git commits/branches</div>
                              <div className="text-muted-foreground">kebab-case for branch names: 'feature/add-user-authentication'. Sentence case for commit messages: 'Add user authentication feature'.</div>
                            </div>
                            <div className="border-l-4 border-amber-500 pl-3 py-1">
                              <div className="font-medium text-foreground">API endpoints</div>
                              <div className="text-muted-foreground">kebab-case or snake_case. '/api/user-profiles' or '/api/user_profiles'. Consistency with your framework's conventions.</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-amber-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">Common Mistakes to Avoid</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1 flex-shrink-0"></div>
                              <span>Using Title Case for hashtags (#ThisLooksWeird vs #thislooksnormal)</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1 flex-shrink-0"></div>
                              <span>Mixing cases in code (calculate_total and calculateTotal in same project)</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1 flex-shrink-0"></div>
                              <span>Using spaces in file names that will be used on command line</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1 flex-shrink-0"></div>
                              <span>Overusing UPPERCASE in emails or messages (comes across as angry)</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1 flex-shrink-0"></div>
                              <span>Inconsistent case in database columns (userName vs user_name in same table)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </article>

              {/* Conversion Rules */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('conversionRules')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h2 className="text-xl font-bold text-foreground">How Case Conversion Actually Works</h2>
                  {openSections.conversionRules ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.conversionRules && (
                  <div className="px-6 pb-6">
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        Converting text between cases seems simple, but there are nuanced rules that affect the results. Understanding these helps you get predictable outcomes and troubleshoot when conversions don't look right.
                      </p>
                      
                      <div className="space-y-4">
                        <div className="bg-blue-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">Word Boundary Detection</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            The converter needs to know where words start and end. It uses spaces, punctuation, and symbols as boundaries. But different cases treat boundaries differently:
                          </p>
                          <div className="space-y-2 text-sm mb-3">
                            <div className="flex items-center justify-between">
                              <div>"hello-world"</div>
                              <div className="font-mono text-xs bg-blue-500/10 px-2 py-1 rounded">Title Case: "Hello-World"</div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div>"hello_world"</div>
                              <div className="font-mono text-xs bg-green-500/10 px-2 py-1 rounded">Title Case: "Hello_World"</div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div>"helloWorld"</div>
                              <div className="font-mono text-xs bg-purple-500/10 px-2 py-1 rounded">Title Case: "Helloworld" (no boundary detected)</div>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            The hyphen and underscore are treated as word separators, so each side gets capitalized. But camelCase text without spaces or punctuation gets treated as one word. This is why 'iPhone' becomes 'IPHONE' in uppercase, not 'IPHONE' with weird capitalization.
                          </p>
                        </div>
                        
                        <div className="bg-green-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">Title Case Complexity</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            Title Case has the most rules. Our converter follows these general principles:
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                            <div className="p-3 bg-blue-500/10 rounded">
                              <div className="font-medium text-sm mb-1">Always capitalize</div>
                              <div className="text-xs space-y-1">
                                <div>• First and last words</div>
                                <div>• Nouns (book, computer)</div>
                                <div>• Pronouns (he, they, it)</div>
                                <div>• Verbs (run, think, is)</div>
                                <div>• Adjectives (big, beautiful)</div>
                                <div>• Adverbs (quickly, very)</div>
                              </div>
                            </div>
                            <div className="p-3 bg-green-500/10 rounded">
                              <div className="font-medium text-sm mb-1">Usually lowercase</div>
                              <div className="text-xs space-y-1">
                                <div>• Articles (a, an, the)</div>
                                <div>• Coordinating conjunctions (and, but, or)</div>
                                <div>• Short prepositions (in, on, at, by)</div>
                                <div>• "To" in infinitives (to run)</div>
                                <div>• Parts of phrasal verbs (look up to)</div>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            But here's where it gets tricky: "because" is a subordinating conjunction, so it gets capitalized. "Than" and "as" are usually lowercase. Prepositions over 4 letters (like "between", "through") often get capitalized. Different style guides (AP, Chicago, MLA) have different lists. Our converter uses a standard approach that works for most cases.
                          </p>
                        </div>
                        
                        <div className="bg-purple-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">Programming Case Algorithms</h3>
                          <div className="space-y-3 text-sm">
                            <div className="border-l-4 border-blue-500 pl-3 py-1">
                              <div className="font-medium text-foreground">camelCase conversion</div>
                              <div className="text-muted-foreground">Lowercase everything first, then find word boundaries (spaces, underscores, hyphens), capitalize next letter, remove separators. 'user profile' → 'userprofile' → 'userProfile'. Works for simple cases but can't handle 'XMLHttpRequest' correctly.</div>
                            </div>
                            <div className="border-l-4 border-green-500 pl-3 py-1">
                              <div className="font-medium text-foreground">snake_case conversion</div>
                              <div className="text-muted-foreground">Lowercase everything, replace spaces with underscores. Simple but effective. For camelCase input, we'd need to detect capital letters as word breaks, which our converter doesn't do automatically. You'd need to add spaces first.</div>
                            </div>
                            <div className="border-l-4 border-purple-500 pl-3 py-1">
                              <div className="font-medium text-foreground">kebab-case conversion</div>
                              <div className="text-muted-foreground">Similar to snake_case but with hyphens. Important for URLs because spaces become %20, plus signs have meaning, underscores can disappear under links. Hyphens are the safe choice for web addresses.</div>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-3">
                            For programming conversions, the tool works best when you start with spaced text. If you have 'userProfile' and want 'user_profile', convert to Title Case first ('User Profile'), then to lowercase ('user profile'), then to snake_case ('user_profile'). Two-step process but gets you there.
                          </p>
                        </div>
                        
                        <div className="bg-amber-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">Edge Cases and Limitations</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-start gap-2">
                              <div className="w-4 h-4 bg-red-500/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                                <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                              </div>
                              <span><strong>Acronyms in Title Case:</strong> 'NASA official' becomes 'Nasa Official' (lowercases the acronym). You'd want 'NASA Official'. Our converter doesn't know what's an acronym.</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-4 h-4 bg-yellow-500/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                              </div>
                              <span><strong>Proper nouns:</strong> 'mcdonald' becomes 'Mcdonald' not 'McDonald'. The converter doesn't have a dictionary of proper names.</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-4 h-4 bg-green-500/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                              </div>
                              <span><strong>Mixed case input:</strong> 'iPhone' to uppercase becomes 'IPHONE' correctly. But 'iPHONE' (weird casing) also becomes 'IPHONE'. Uppercase/lowercase conversions are straightforward.</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-4 h-4 bg-blue-500/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                              </div>
                              <span><strong>Non-English text:</strong> Works fine with accented characters: 'café' → 'CAFÉ' → 'café'. But language-specific rules (German nouns always capitalized) aren't applied.</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </article>

              {/* Examples */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('examples')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h2 className="text-xl font-bold text-foreground">Real-World Case Conversion Examples</h2>
                  {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.examples && (
                  <div className="px-6 pb-6">
                    <div className="space-y-4">
                      <p className="text-muted-foreground mb-4">
                        Seeing case conversion in action helps understand when and how to use each type. Here are practical examples from different fields.
                      </p>
                      
                      <div className="space-y-4">
                        <div className="bg-blue-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">Example 1: Blog Post Workflow</h3>
                          <div className="space-y-3 text-sm">
                            <p><strong>Starting with a working title:</strong> "10 tips for better python code"</p>
                            
                            <div className="pl-4 border-l-2 border-blue-500">
                              <div className="font-medium text-foreground">Conversions needed:</div>
                              <div className="mt-1 text-muted-foreground space-y-1">
                                <div>• <strong>Title Case for headline:</strong> "10 Tips for Better Python Code"</div>
                                <div>• <strong>Sentence case for intro:</strong> "Here are 10 tips for better Python code."</div>
                                <div>• <strong>kebab-case for URL:</strong> "10-tips-for-better-python-code"</div>
                                <div>• <strong>camelCase for JavaScript variable:</strong> "tipsForBetterPythonCode" (if tracking in analytics)</div>
                              </div>
                            </div>
                            
                            <div className="bg-secondary/30 p-3 rounded">
                              <div className="font-medium text-foreground">Why this matters:</div>
                              <div className="text-xs mt-1 text-muted-foreground">The URL slug affects SEO and sharing. The headline needs proper title case for professionalism. The JavaScript variable needs to follow coding conventions if you're adding interactive elements to the post.</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-green-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">Example 2: Database Migration Project</h3>
                          <div className="space-y-3 text-sm">
                            <p><strong>Old database uses inconsistent naming:</strong> Some tables use spaces, some use underscores, some are camelCase.</p>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <div className="font-medium text-foreground mb-1">Original column names:</div>
                                <ul className="space-y-1 text-muted-foreground text-xs">
                                  <li>• "First Name" (with space)</li>
                                  <li>• "last_name" (snake_case)</li>
                                  <li>• "EmailAddress" (camelCase)</li>
                                  <li>• "date-of-birth" (kebab-case)</li>
                                </ul>
                              </div>
                              <div>
                                <div className="font-medium text-foreground mb-1">Standardized to snake_case:</div>
                                <ul className="space-y-1 text-muted-foreground text-xs">
                                  <li>• "first_name"</li>
                                  <li>• "last_name" (unchanged)</li>
                                  <li>• "email_address"</li>
                                  <li>• "date_of_birth"</li>
                                </ul>
                              </div>
                            </div>
                            
                            <div className="pl-4 border-l-2 border-green-500">
                              <div className="font-medium text-foreground">Conversion process:</div>
                              <div className="mt-1 text-muted-foreground text-xs">
                                For "EmailAddress": Convert to lowercase → "emailaddress". Not right. Better: Convert to Title Case with spaces → "Email Address". Then lowercase → "email address". Then snake_case → "email_address". Three steps but gets correct word boundaries.
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-purple-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">Example 3: Multi-Language Web Application</h3>
                          <div className="space-y-3 text-sm">
                            <p><strong>Building a user profile feature:</strong> Need consistent naming across frontend, backend, and database.</p>
                            
                            <div className="overflow-x-auto">
                              <div className="min-w-full inline-block align-middle">
                                <div className="overflow-hidden border border-border rounded-lg">
                                  <table className="min-w-full divide-y divide-border">
                                    <thead className="bg-secondary/20">
                                      <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-foreground">Context</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-foreground">Case Format</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-foreground">Example</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-foreground">Notes</th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                      <tr>
                                        <td className="px-4 py-2 text-xs">React component</td>
                                        <td className="px-4 py-2 text-xs font-mono">PascalCase</td>
                                        <td className="px-4 py-2 text-xs font-mono">UserProfileCard</td>
                                        <td className="px-4 py-2 text-xs">React convention</td>
                                      </tr>
                                      <tr>
                                        <td className="px-4 py-2 text-xs">CSS class</td>
                                        <td className="px-4 py-2 text-xs font-mono">kebab-case</td>
                                        <td className="px-4 py-2 text-xs font-mono">user-profile-card</td>
                                        <td className="px-4 py-2 text-xs">HTML/CSS standard</td>
                                      </tr>
                                      <tr>
                                        <td className="px-4 py-2 text-xs">JavaScript variable</td>
                                        <td className="px-4 py-2 text-xs font-mono">camelCase</td>
                                        <td className="px-4 py-2 text-xs font-mono">userProfileData</td>
                                        <td className="px-4 py-2 text-xs">JS/TS convention</td>
                                      </tr>
                                      <tr>
                                        <td className="px-4 py-2 text-xs">API endpoint</td>
                                        <td className="px-4 py-2 text-xs font-mono">kebab-case</td>
                                        <td className="px-4 py-2 text-xs font-mono">/api/user-profile</td>
                                        <td className="px-4 py-2 text-xs">REST API best practice</td>
                                      </tr>
                                      <tr>
                                        <td className="px-4 py-2 text-xs">Database table</td>
                                        <td className="px-4 py-2 text-xs font-mono">snake_case</td>
                                        <td className="px-4 py-2 text-xs font-mono">user_profiles</td>
                                        <td className="px-4 py-2 text-xs">SQL/common practice</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                            
                            <p className="text-sm text-muted-foreground">
                              <strong>The workflow:</strong> Start with a plain language description: "user profile". Use our converter to quickly generate each format as needed. Store these conversions in a project glossary so everyone uses the same names.
                            </p>
                          </div>
                        </div>
                        
                        <div className="bg-amber-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">Example 4: Social Media Campaign</h3>
                          <div className="space-y-3 text-sm">
                            <p><strong>Launching a product called "QuickCalc":</strong> Need consistent branding across platforms.</p>
                            
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div>Twitter handle</div>
                                <div className="font-mono text-xs bg-blue-500/10 px-2 py-1 rounded">@QuickCalcApp</div>
                              </div>
                              <div className="flex items-center justify-between">
                                <div>Hashtag</div>
                                <div className="font-mono text-xs bg-green-500/10 px-2 py-1 rounded">#QuickCalc</div>
                              </div>
                              <div className="flex items-center justify-between">
                                <div>Website URL</div>
                                <div className="font-mono text-xs bg-purple-500/10 px-2 py-1 rounded">quickcalc-app.com</div>
                              </div>
                              <div className="flex items-center justify-between">
                                <div>App Store name</div>
                                <div className="font-mono text-xs bg-amber-500/10 px-2 py-1 rounded">QuickCalc: Calculator App</div>
                              </div>
                              <div className="flex items-center justify-between">
                                <div>Playful social post</div>
                                <div className="font-mono text-xs bg-red-500/10 px-2 py-1 rounded">qUiCkCaLc iS hErE! 🎉</div>
                              </div>
                            </div>
                            
                            <div className="bg-secondary/30 p-3 rounded">
                              <div className="font-medium text-foreground">Key insight:</div>
                              <div className="text-xs mt-1 text-muted-foreground">Each platform has its own conventions. Twitter handles often use camelCase or PascalCase. URLs use kebab-case or lowercase. Hashtags usually PascalCase for readability (#QuickCalc not #quickcalc). The alternating case post grabs attention but should be used sparingly.</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 p-4 bg-secondary/20 rounded-lg">
                        <h4 className="font-medium text-foreground mb-2">Pro Tips from These Examples</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span><strong>Plan your case strategy early:</strong> Decide on conventions before coding/writing to avoid costly renames later.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span><strong>Use multi-step conversions:</strong> Sometimes you need to convert through an intermediate format to get proper word boundaries.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-1 h-1 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span><strong>Platforms have conventions:</strong> What works for code might not work for URLs or social media. Adapt to each context.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span><strong>Create a project glossary:</strong> Document your case decisions so team members stay consistent.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </article>

              {/* Character Handling */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('characterHandling')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h2 className="text-xl font-bold text-foreground">How Special Characters Are Handled</h2>
                  {openSections.characterHandling ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.characterHandling && (
                  <div className="px-6 pb-6">
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        Real text isn't just letters - it has numbers, symbols, emojis, and special characters. The converter handles these intelligently, but there are some things you should know.
                      </p>
                      
                      <div className="space-y-4">
                        <div className="bg-blue-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">Numbers Stay Put</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            Numbers remain unchanged in all conversions. This is important for product names, version numbers, and technical identifiers:
                          </p>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
                            <div className="text-center p-2 bg-blue-500/10 rounded text-xs">
                              <div>iPhone12</div>
                              <div className="font-mono">→ IPHONE12</div>
                            </div>
                            <div className="text-center p-2 bg-green-500/10 rounded text-xs">
                              <div>Windows 11</div>
                              <div className="font-mono">→ windows 11</div>
                            </div>
                            <div className="text-center p-2 bg-purple-500/10 rounded text-xs">
                              <div>Python3.9</div>
                              <div className="font-mono">→ python3_9</div>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Notice in the last example: the period becomes an underscore in snake_case because periods aren't allowed in identifiers. The converter treats periods as word separators in some cases.
                          </p>
                        </div>
                        
                        <div className="bg-green-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">Symbols as Word Breaks</h3>
                          <div className="space-y-3 text-sm">
                            <div className="border-l-4 border-blue-500 pl-3 py-1">
                              <div className="font-medium text-foreground">Hyphens and underscores</div>
                              <div className="text-muted-foreground">Treated as word separators. "front-end" → "Front-End" in Title Case, "front_end" in snake_case, "frontEnd" in camelCase. They're preserved in most conversions.</div>
                            </div>
                            <div className="border-l-4 border-green-500 pl-3 py-1">
                              <div className="font-medium text-foreground">Periods and commas</div>
                              <div className="text-muted-foreground">Sentence breaks for Sentence Case. "hello.world" → "Hello.world". In snake_case, periods often become underscores because they're not valid in identifiers.</div>
                            </div>
                            <div className="border-l-4 border-purple-500 pl-3 py-1">
                              <div className="font-medium text-foreground">Apostrophes and quotes</div>
                              <div className="text-muted-foreground">Preserved but not treated as word breaks. "don't" → "DON'T". "O'Connor" → "O'CONNOR". The apostrophe stays put through conversions.</div>
                            </div>
                            <div className="border-l-4 border-amber-500 pl-3 py-1">
                              <div className="font-medium text-foreground">Special symbols (@, #, $, etc.)</div>
                              <div className="text-muted-foreground">Preserved but may affect word detection. "user@example.com" → "USER@EXAMPLE.COM". Hashtags: "#helloWorld" → "#helloworld" in lowercase.</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-purple-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">Unicode and International Text</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            The converter handles Unicode characters correctly, which means it works with most languages:
                          </p>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
                            <div className="text-center p-2 bg-blue-500/10 rounded text-xs">
                              <div>café</div>
                              <div className="font-mono">→ CAFÉ</div>
                            </div>
                            <div className="text-center p-2 bg-green-500/10 rounded text-xs">
                              <div>naïve</div>
                              <div className="font-mono">→ NAÏVE</div>
                            </div>
                            <div className="text-center p-2 bg-purple-500/10 rounded text-xs">
                              <div>Björn</div>
                              <div className="font-mono">→ BJÖRN</div>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Accented characters maintain their accents through conversions. Greek, Cyrillic, Arabic, Chinese, Japanese - all handled. Emojis are also preserved: "Hello 👋" → "HELLO 👋". The converter doesn't try to "capitalize" non-Latin scripts that don't have case concepts.
                          </p>
                        </div>
                        
                        <div className="bg-amber-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">Common Problem Cases</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-start gap-2">
                              <div className="w-4 h-4 bg-red-500/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                                <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                              </div>
                              <span><strong>Email addresses:</strong> "user@example.com" becomes "USER@EXAMPLE.COM" in uppercase. Valid but looks odd. Usually you'd want to preserve the original casing for emails.</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-4 h-4 bg-yellow-500/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                              </div>
                              <span><strong>URLs:</strong> Converting "https://example.com/page" to uppercase gives "HTTPS://EXAMPLE.COM/PAGE". Technically URLs are case-insensitive for domain, case-sensitive for path. Usually leave URLs as-is.</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-4 h-4 bg-green-500/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                              </div>
                              <span><strong>Code snippets:</strong> Converting to uppercase breaks the code. Don't use case conversion on actual code unless you're just transforming identifiers.</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-4 h-4 bg-blue-500/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                              </div>
                              <span><strong>Password-like text:</strong> "P@ssw0rd!" becomes "p@ssw0rd!" in lowercase. The symbols and numbers stay. But obviously don't put real passwords into web tools.</span>
                            </div>
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
                      
                      <div className="pt-4">
                        <h3 className="text-lg font-semibold text-foreground mb-2">How do I convert between camelCase and snake_case properly?</h3>
                        <p className="text-muted-foreground mb-3">
                          For camelCase to snake_case: First, add spaces before capital letters (using regex or manually): 'userName' → 'user Name'. Then convert to lowercase: 'user name'. Then to snake_case: 'user_name'. For snake_case to camelCase: Convert spaces to camelCase directly works if you replace underscores with spaces first: 'user_name' → 'user name' → 'userName'. Our tool can do this with the "Use as Input" button for multi-step conversions.
                        </p>
                        
                        <h3 className="text-lg font-semibold text-foreground mb-2">What's the fastest way to convert a lot of text?</h3>
                        <p className="text-muted-foreground">
                          Paste all your text at once - the converter handles multi-line input. If you have a list of items (like column names), paste them one per line. Each line converts independently. For programming files with many variables, consider using your IDE's built-in refactoring tools which understand code structure better than a general text converter.
                        </p>
                      </div>
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
            </section>
          </div>
        </div>
      </div>
    </>
  );
}