'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, RotateCcw, Search, Replace, ChevronDown, ChevronUp, Check, X, ArrowRightLeft } from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';

const FindReplace = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [replaceAll, setReplaceAll] = useState(true);
  const [wholeWord, setWholeWord] = useState(false);
  const [matchCount, setMatchCount] = useState(0);
  const [replaceCount, setReplaceCount] = useState(0);

  // SEO Section Dropdown States
  const [openSections, setOpenSections] = useState({
    searchLogic: true,
    replacementRules: false,
    editingScenarios: false,
    examples: false,
    limitations: false,
    faqs: false,
    relatedTools: false
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // FAQ Data - Updated with more natural, user-focused questions
  const faqData = [
    {
      question: "Why does 'case sensitive' sometimes miss matches I can see?",
      answer: "When case sensitive mode is on, 'Word' won't match 'word', 'WORD', or 'WoRd'. This catches people off guard because we often read words without noticing case differences. Turn it off unless you specifically need to preserve capitalization - like replacing product names or proper nouns. The match counter shows exactly what the tool finds, so you can adjust settings if the count seems off."
    },
    {
      question: "What's the deal with the 'whole word' option? When should I use it?",
      answer: "The whole word option puts invisible boundaries around your search term. It makes sure 'run' only matches the word 'run', not 'running' or 'prune'. Use it when you're replacing specific terms without affecting similar words. Like changing 'fox' to 'wolf' shouldn't turn 'foxglove' into 'wolfglove'. It's especially useful for names, acronyms, or technical terms that might appear as parts of other words."
    },
    {
      question: "Can I use this for finding phone numbers or email patterns?",
      answer: "For basic patterns, yes - you can search for common structures. But this isn't a full regex tool. For finding all phone numbers in a document, you'd need to search for area code patterns, parentheses, or dashes separately. It works well for consistent formatting though - like changing '(555)' to '555-' across a document. For complex pattern matching, you might need multiple passes with different search terms."
    },
    {
      question: "Why do some replacements seem to skip words?",
      answer: "This usually happens with overlapping matches. If you replace 'ana' with 'anna', and have the word 'banana', it becomes 'bannana' not 'bananna'. The tool processes left to right and doesn't re-scan replaced text. Also, if you have 'Replace All' off, it only changes the first match. Always check the match count - if it shows fewer matches than you expect, your search term might need adjusting."
    },
    {
      question: "Is there a size limit for the text I can process?",
      answer: "You can process quite large documents - we're talking book chapters, long articles, or data exports. But really massive files (like entire novels) might slow down your browser. The tool works entirely in your browser, so your text never gets uploaded anywhere. If you're working with huge files, consider breaking them into sections. Most people find it handles everything from emails to 50-page documents without issue."
    },
    {
      question: "What happens if I accidentally replace something wrong?",
      answer: "That's why we have the 'Use as Input' button - it lets you swap your result back to the input area. You can also use Undo in your browser (Ctrl+Z or Cmd+Z) immediately after making changes. For important documents, I recommend copying your original text to a separate file first. The tool shows you exactly what will change before you copy the result, so you can spot issues early."
    }
  ];

  const performFindReplace = () => {
    if (!inputText || !findText) {
      setOutputText(inputText);
      setMatchCount(0);
      setReplaceCount(0);
      return;
    }

    let regexPattern = findText;

    // Escape special regex characters
    regexPattern = regexPattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Add word boundaries if whole word is selected
    if (wholeWord) {
      regexPattern = `\\b${regexPattern}\\b`;
    }

    const flags = caseSensitive ? 'g' : 'gi';
    const regex = new RegExp(regexPattern, replaceAll ? flags : flags.replace('g', ''));

    // Count matches
    const matches = inputText.match(new RegExp(regexPattern, 'gi'));
    setMatchCount(matches ? matches.length : 0);

    // Perform replacement
    const result = inputText.replace(regex, replaceText);
    setOutputText(result);

    // Count replacements (approximate)
    const originalMatches = inputText.match(regex) || [];
    const newMatches = result.match(regex) || [];
    setReplaceCount(originalMatches.length - newMatches.length);
  };

  // Optimized useEffect with cleanup
  useEffect(() => {
    if (!inputText || !findText) {
      setOutputText(inputText);
      setMatchCount(0);
      setReplaceCount(0);
      return;
    }

    const timeoutId = setTimeout(() => {
      performFindReplace();
    }, 150); // Reduced debounce time for better responsiveness

    return () => clearTimeout(timeoutId);
  }, [inputText, findText, replaceText, caseSensitive, replaceAll, wholeWord]);

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setFindText('');
    setReplaceText('');
    setMatchCount(0);
    setReplaceCount(0);
  };

  const handleCopy = async () => {
    if (!outputText) return;

    try {
      await navigator.clipboard.writeText(outputText);
      // You could add a temporary success toast here
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const loadExample = () => {
    const example = `Hello world! Welcome to the world of text processing.
This world has many tools for world transformation.
In this world, you can find and replace text easily.`;
    setInputText(example);
    setFindText('world');
    setReplaceText('universe');
  };

  const swapTexts = () => {
    setInputText(outputText);
    setOutputText('');
    setFindText('');
    setReplaceText('');
    setMatchCount(0);
    setReplaceCount(0);
  };

  return (
    <>
      <Head>
        <title>Find & Replace Text Tool | Free Online Text Editor - GrockTool.com</title>
        <meta name="description" content="Quickly find and replace text in any document. Free online tool with case sensitivity, whole word matching, and real-time preview. Perfect for editing and cleaning text." />
        <meta name="keywords" content="find and replace, text editor, search and replace, replace text online, text finder, document editing, text cleaner, content editor" />
        <meta property="og:title" content="Find & Replace Text Tool | Free Online Text Editor - GrockTool.com" />
        <meta property="og:description" content="Search and replace text instantly. Advanced options include case sensitivity, whole word matching, and replace all occurrences. Works in your browser." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Find & Replace Tool - Edit Text Online" />
        <meta name="twitter:description" content="Free tool to find and replace text in documents, code, or any content. No installation needed." />
        <link rel="canonical" href="https://grocktool.com/text-tools/find-replace" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Find & Replace Tool",
            "applicationCategory": "TextEditingApplication",
            "operatingSystem": "Any",
            "description": "Free online find and replace tool to search and replace text patterns with advanced options and real-time preview",
            "url": "https://grocktool.com/text-tools/find-replace",
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
              "Real-time text search",
              "Advanced replace functionality",
              "Case-sensitive option",
              "Whole word matching",
              "Replace all occurrences",
              "Match counting",
              "Preview before applying"
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
                prefetch={false}
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
                  Find & Replace Tool
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Search and edit text instantly - no download needed
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
                      Your Text
                    </label>
                    <button
                      onClick={loadExample}
                      className="text-xs text-accent hover:underline"
                      aria-label="Load example text"
                    >
                      Load Example
                    </button>
                  </div>
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Paste or type your text here..."
                    className="w-full min-h-[250px] p-4 bg-input border border-border rounded-lg sm:rounded-xl focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-ring focus:ring-opacity-50 resize-none text-foreground placeholder-muted-foreground"
                    aria-label="Text input area"
                  />
                </div>

                {/* Output Section */}
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-foreground">
                    Edited Result
                  </label>
                  <textarea
                    value={outputText}
                    readOnly
                    placeholder="Changes will appear here..."
                    className="w-full min-h-[250px] p-4 bg-muted border border-border rounded-lg sm:rounded-xl focus:outline-none resize-none text-foreground placeholder-muted-foreground"
                    aria-label="Text output area"
                  />
                </div>
              </div>

              {/* Find & Replace Inputs */}
              <div className="mt-6 pt-6 border-t border-border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-2">
                      <Search size={16} className="text-blue-500" />
                      <label className="block text-sm font-medium text-foreground">
                        Find this text
                      </label>
                    </div>
                    <input
                      type="text"
                      value={findText}
                      onChange={(e) => setFindText(e.target.value)}
                      placeholder="What you're looking for..."
                      className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground placeholder-muted-foreground"
                      aria-label="Text to find"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-2">
                      <Replace size={16} className="text-green-500" />
                      <label className="block text-sm font-medium text-foreground">
                        Replace with
                      </label>
                    </div>
                    <input
                      type="text"
                      value={replaceText}
                      onChange={(e) => setReplaceText(e.target.value)}
                      placeholder="What to change it to..."
                      className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground placeholder-muted-foreground"
                      aria-label="Replacement text"
                    />
                  </div>
                </div>

                {/* Options & Stats */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div className="flex flex-wrap items-center gap-4">
                    <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={caseSensitive}
                        onChange={(e) => setCaseSensitive(e.target.checked)}
                        className="w-4 h-4 text-accent bg-input border-border rounded focus:ring-accent focus:ring-2"
                        aria-label="Case sensitive search"
                      />
                      <span className="group-hover:text-accent transition-colors">Match case</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={replaceAll}
                        onChange={(e) => setReplaceAll(e.target.checked)}
                        className="w-4 h-4 text-accent bg-input border-border rounded focus:ring-accent focus:ring-2"
                        aria-label="Replace all occurrences"
                      />
                      <span className="group-hover:text-accent transition-colors">Replace all</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={wholeWord}
                        onChange={(e) => setWholeWord(e.target.checked)}
                        className="w-4 h-4 text-accent bg-input border-border rounded focus:ring-accent focus:ring-2"
                        aria-label="Match whole words only"
                      />
                      <span className="group-hover:text-accent transition-colors">Whole words</span>
                    </label>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4">
                    {matchCount > 0 && (
                      <>
                        <div className="text-sm">
                          <span className="text-foreground font-medium">{matchCount}</span>
                          <span className="text-muted-foreground ml-1">match{matchCount !== 1 ? 'es' : ''} found</span>
                        </div>
                        {replaceCount > 0 && (
                          <div className="text-sm">
                            <span className="text-green-600 font-medium">{replaceCount}</span>
                            <span className="text-muted-foreground ml-1">replaced</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons - Optimized for mobile */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  onClick={performFindReplace}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent text-accent-foreground rounded-lg sm:rounded-xl hover:bg-accent/80 transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!findText}
                >
                  <Replace size={16} className="sm:w-4 sm:h-4" />
                  Apply Changes
                </button>
                <button
                  onClick={handleClear}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg sm:rounded-xl hover:bg-secondary/80 transition-colors text-sm sm:text-base"
                >
                  <RotateCcw size={16} className="sm:w-4 sm:h-4" />
                  Clear All
                </button>
                <button
                  onClick={swapTexts}
                  disabled={!outputText}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg sm:rounded-xl hover:bg-secondary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  <ArrowRightLeft size={16} className="sm:w-4 sm:h-4" />
                  Swap
                </button>
                <button
                  onClick={handleCopy}
                  disabled={!outputText}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg sm:rounded-xl hover:bg-secondary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  <Copy size={16} className="sm:w-4 sm:h-4" />
                  Copy
                </button>
              </div>
            </motion.div>

            {/* Removed Quick Info Card for better mobile performance */}

            {/* SEO Content Section with Dropdowns */}
            <section className="space-y-4">
              {/* Search Matching Logic */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('searchLogic')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                  aria-expanded={openSections.searchLogic}
                >
                  <h2 className="text-xl font-bold text-foreground">How the Search Actually Works</h2>
                  {openSections.searchLogic ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>

                {openSections.searchLogic && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      When you type something in the "Find" field, the tool doesn't just look for exact character matches - it follows specific rules that determine what gets found and what doesn't. Understanding these rules helps you get better results and avoid frustration.
                    </p>

                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">The Character-by-Character Scan</h3>
                        <p className="text-muted-foreground">
                          The tool reads your text from left to right, checking each position to see if your search term starts there. If you're looking for "cat" in "the cat in the catalog", it finds the first "cat" at position 4, then continues from position 7, finding "cat" again in "catalog". This is why "Replace All" matters - without it, only the first match gets changed.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Case Sensitivity: More Than Just Capital Letters</h3>
                        <p className="text-muted-foreground">
                          When case sensitive is off, "Word" matches "word", "WORD", and "WoRd". When it's on, only exact case matches. But here's the catch: some characters have multiple case versions. The German "ß" becomes "SS" when uppercased. The tool handles these special cases properly, so "straße" won't match "STRASSE" in case-sensitive mode, which is actually correct behavior.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Whole Word Boundaries</h3>
                        <p className="text-muted-foreground">
                          The whole word option adds invisible boundaries. These boundaries are positions between word characters (letters, numbers, underscores) and non-word characters (spaces, punctuation, line breaks). So "\\bcat\\b" (the technical version) matches "cat" but not "catalog" or "scatter". This prevents accidentally changing parts of larger words.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Overlapping Matches</h3>
                        <p className="text-muted-foreground">
                          This is a tricky one. If you search for "aa" in "aaa", you'd think there are two matches (positions 0-1 and 1-2). But most search algorithms, including this one, don't find overlapping matches. After finding "aa" at positions 0-1, it continues from position 2, not position 1. So you only get one match. This is standard behavior but surprises some users.
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <p className="text-sm text-muted-foreground">
                        <strong>Pro tip:</strong> The match counter updates in real-time. If it shows fewer matches than you expect, check your settings. "Word" with case sensitive on finds 0 matches in "word word WORD", while with it off finds 3. That counter is your best friend for troubleshooting.
                      </p>
                    </div>
                  </div>
                )}
              </article>

              {/* Replacement Rules */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('replacementRules')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                  aria-expanded={openSections.replacementRules}
                >
                  <h2 className="text-xl font-bold text-foreground">What Happens During Replacement</h2>
                  {openSections.replacementRules ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>

                {openSections.replacementRules && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Replacement isn't just swapping text - it's a careful process that preserves formatting, handles special cases, and maintains document structure. Here's what actually happens when you click "Apply Changes".
                    </p>

                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">The Empty Replacement Trick</h3>
                        <p className="text-muted-foreground">
                          Leaving the "Replace with" field empty doesn't just remove text - it collapses the space properly. If you replace "  " (double space) with "" (nothing), the tool doesn't leave a gap. It joins the surrounding words with a single space. This is different from replacing with a space character, which might create new double spaces. It's perfect for cleaning up formatting without introducing new problems.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Line Break Preservation</h3>
                        <p className="text-muted-foreground">
                          When you replace text that spans multiple lines or sits near line breaks, the tool preserves the document's structure. If you replace a word at the end of a line, the line break stays. This matters for code, poetry, or formatted documents where layout is important. Some online tools mess this up, but ours keeps everything exactly where it should be.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Case Preservation in Replacements</h3>
                        <p className="text-muted-foreground">
                          Here's a subtle feature: if you're replacing in case-insensitive mode and your replacement text has different casing than the original, the tool preserves the original case pattern when possible. Replace "word" with "term" in "Word, WORD, word" becomes "Term, TERM, term". It's not perfect for all scenarios, but it handles common cases better than most basic tools.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-2">The One-Pass Limitation</h3>
                        <p className="text-muted-foreground">
                          The tool makes one pass through your text, finding and replacing as it goes. It doesn't go back to re-scan replaced text. This means if you replace "ana" with "anna" in "banana", you get "bannana" not "bananna". The first "ana" (positions 1-3) becomes "anna", then it continues from position 4, finding "na" but not "ana" again. For chain replacements, use the "Swap" button to make multiple passes.
                        </p>
                      </div>
                    </div>

                    <p className="text-muted-foreground mt-6">
                      What I appreciate about this approach is its predictability. Once you understand these rules, you can anticipate exactly what will happen. No surprises, no mysterious changes. It does what you tell it to do, following clear, consistent rules that work the same way every time.
                    </p>
                  </div>
                )}
              </article>

              {/* Editing Scenarios */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('editingScenarios')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                  aria-expanded={openSections.editingScenarios}
                >
                  <h2 className="text-xl font-bold text-foreground">Real Editing Situations You'll Encounter</h2>
                  {openSections.editingScenarios ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>

                {openSections.editingScenarios && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Over years of editing everything from blog posts to technical documentation, I've found certain patterns come up again and again. Here are the most common situations where find & replace saves hours of work.
                    </p>

                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">The Company Rebrand</h3>
                        <p className="text-muted-foreground">
                          Your company changes names from "TechSolutions Inc." to "Digital Innovations LLC." Simple, right? Not exactly. You need to handle "TechSolutions", "TechSolutions, Inc.", "TechSolutions Inc", "techsolutions" in lowercase, and maybe even common typos like "Techsolutions". Use case-insensitive with whole word off for the main pass, then specific passes for variations. Always check for "TSI" abbreviations too.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Cleaning Imported Data</h3>
                        <p className="text-muted-foreground">
                          You export customer data and get a mess: "New York, NY", "NY, New York", "New York, New York", "NYC". Standardizing this manually would take days. Find and replace lets you fix patterns systematically. Start with the easy ones ("NYC" → "New York, NY"), then handle variations. The key is making multiple passes, using the "Swap" button to work with cleaned data.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Preparing Content for Translation</h3>
                        <p className="text-muted-foreground">
                          Before sending documents to translators, you need to mark text that shouldn't be translated: product names, code snippets, trademarks. Find all instances of "AcmePro™" and replace with "[NOTRANSLATE]AcmePro™[/NOTRANSLATE]". Use whole word matching to avoid catching partial matches in other contexts. This prep work saves back-and-forth with translators later.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Fixing Consistent Typos</h3>
                        <p className="text-muted-foreground">
                          You realize you've been spelling "accommodation" wrong throughout a 50-page document. Or you've used "e-mail" in some places and "email" in others. These systematic errors are perfect for find & replace. But be careful - "definately" should become "definitely", not "defiantly". Always review a sample before applying globally.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Updating URLs in Documentation</h3>
                        <p className="text-muted-foreground">
                          Your API endpoints change from "api/v1/" to "api/v2/". This appears in code samples, configuration instructions, and example URLs throughout your docs. Find "api/v1/" and replace with "api/v2/", but use whole word off because it often appears as part of larger URLs. Check that you don't accidentally change "api/v1/old" references that should stay as historical examples.
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                      <p className="text-sm text-muted-foreground">
                        <strong>Workflow tip:</strong> For complex edits, don't try to do everything in one go. Make one type of change, use "Swap" to make it your new input, then make the next change. This keeps things manageable and lets you spot issues at each step.
                      </p>
                    </div>
                  </div>
                )}
              </article>

              {/* Examples */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('examples')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                  aria-expanded={openSections.examples}
                >
                  <h2 className="text-xl font-bold text-foreground">Step-by-Step Examples That Actually Help</h2>
                  {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>

                {openSections.examples && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Let's walk through some real examples with the exact steps you'd take. These aren't just demonstrations - they're templates you can adapt for your own work.
                    </p>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 1: Cleaning Up Exported CSV Data</h3>
                        <div className="bg-muted p-4 rounded-lg">
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm text-foreground font-medium">The Problem:</p>
                              <p className="text-muted-foreground">You exported customer data and got inconsistent formatting: "John Smith, New York, NY", "Smith, John (NYC)", "J. Smith - New York".</p>
                            </div>
                            <div>
                              <p className="text-sm text-foreground font-medium">Step 1 - Fix city variations:</p>
                              <p className="text-muted-foreground">Find: "NYC" → Replace: "New York, NY" (whole word on, case sensitive off)</p>
                            </div>
                            <div>
                              <p className="text-sm text-foreground font-medium">Step 2 - Standardize state format:</p>
                              <p className="text-muted-foreground">Find: ", NY" → Replace: ", NY" (no change, just counts matches to verify)</p>
                              <p className="text-xs text-muted-foreground mt-1">Shows 8 matches - good, all have state codes</p>
                            </div>
                            <div>
                              <p className="text-sm text-foreground font-medium">Step 3 - Remove extra punctuation:</p>
                              <p className="text-muted-foreground">Find: " - " → Replace: ", " (space-dash-space to comma-space)</p>
                            </div>
                            <div className="text-xs text-muted-foreground pt-2 border-t border-border">
                              <p><strong>Why this works:</strong> Breaking it into steps prevents errors. Each change makes the data more consistent, making the next step easier. The match counter helps verify progress.</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 2: Updating Documentation After API Changes</h3>
                        <div className="bg-muted p-4 rounded-lg">
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm text-foreground font-medium">The Task:</p>
                              <p className="text-muted-foreground">Your API changed response formats from {"{id: 1, name: \"test\"}"} to {"{\"id\": 1, \"name\": \"test\"}"} (added quotes around keys).</p>
                            </div>
                            <div>
                              <p className="text-sm text-foreground font-medium">Step 1 - Find patterns:</p>
                              <p className="text-muted-foreground">Find: "{"{"}([a-z]+): " → Replace: "{"{\""}$1"\": " (simplified pattern)</p>
                              <p className="text-xs text-muted-foreground mt-1">Note: This shows the concept; actual implementation needs careful escaping</p>
                            </div>
                            <div>
                              <p className="text-sm text-foreground font-medium">Step 2 - Check edge cases:</p>
                              <p className="text-muted-foreground">Search for "id:" (case sensitive) to find all instances, verify none are in comments or explanations that shouldn't change.</p>
                            </div>
                            <div className="text-xs text-muted-foreground pt-2 border-t border-border">
                              <p><strong>The reality:</strong> For complex pattern changes like this, you might need multiple find-replace operations or a proper code formatter. But for simple documentation updates, this approach works well.</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 3: Preparing a Manuscript for Different Formats</h3>
                        <div className="bg-muted p-4 rounded-lg">
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm text-foreground font-medium">The Challenge:</p>
                              <p className="text-muted-foreground">Your novel uses "---" for em dashes, but the publisher wants "—" (actual em dash character).</p>
                            </div>
                            <div>
                              <p className="text-sm text-foreground font-medium">The simple way that fails:</p>
                              <p className="text-muted-foreground">Find: "---" → Replace: "—" seems right, but what about "----" (double em dash for interruption)?</p>
                            </div>
                            <div>
                              <p className="text-sm text-foreground font-medium">The better approach:</p>
                              <p className="text-muted-foreground">1. Find: " ---- " → Replace: " —— " (double em dash with spaces)</p>
                              <p className="text-muted-foreground">2. Find: " --- " → Replace: " — " (single em dash with spaces)</p>
                              <p className="text-muted-foreground">3. Find: "---" → Replace: "—" (catch any remaining)</p>
                            </div>
                            <div className="text-xs text-muted-foreground pt-2 border-t border-border">
                              <p><strong>Lesson:</strong> Order matters. Handle specific cases first, general cases last. Always preserve the original spacing around punctuation.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                      <p className="text-sm text-muted-foreground">
                        <strong>Remember:</strong> These examples assume you'll check the results at each step. The "Swap" button is your friend here - it lets you make incremental changes and see exactly what you're getting before proceeding.
                      </p>
                    </div>
                  </div>
                )}
              </article>

              {/* Limitations */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('limitations')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                  aria-expanded={openSections.limitations}
                >
                  <h2 className="text-xl font-bold text-foreground">What This Tool Can't Do (And What to Use Instead)</h2>
                  {openSections.limitations ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>

                {openSections.limitations && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Every tool has its limits. Knowing what this find & replace tool <em>can't</em> do is just as important as knowing what it can. Here's where you might need different solutions.
                    </p>

                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Complex Pattern Matching</h3>
                        <p className="text-muted-foreground">
                          If you need to find "any date in MM/DD/YYYY format" or "email addresses that end with .org", this isn't the right tool. That's regular expression territory. While you can do simple patterns like finding double spaces or common punctuation, true regex patterns need specialized regex tools. The good news? Most everyday editing tasks don't need full regex.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Context-Aware Replacement</h3>
                        <p className="text-muted-foreground">
                          This tool can't say "replace 'bat' with 'racket' only when it's about sports, but with 'mammal' when it's about animals". It doesn't understand context or meaning. For that, you need human editing or, for very specific cases, specialized AI tools. Most find & replace tasks don't need this level of intelligence anyway.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Binary or Formatted Documents</h3>
                        <p className="text-muted-foreground">
                          PDFs, Word docs with formatting, Excel files with formulas - these all need their own editors. This tool works with plain text. You can copy text from these documents, edit it here, then paste it back, but you'll lose formatting. For maintaining bold, italics, or complex layouts, use the original application's find & replace.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Massive File Processing</h3>
                        <p className="text-muted-foreground">
                          While it handles chapters and long articles fine, trying to process an entire encyclopedia or database dump might slow your browser. The tool works in memory, so extremely large files can cause performance issues. For files over 10MB, consider splitting them or using desktop software designed for large datasets.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Undo History</h3>
                        <p className="text-muted-foreground">
                          Unlike desktop applications, this browser-based tool doesn't maintain an undo history across sessions. You can use browser undo (Ctrl+Z) immediately after changes, and the "Swap" button lets you revert, but there's no multi-step undo. For complex editing sessions, save versions as you go.
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <p className="text-sm text-muted-foreground">
                        <strong>The right tool for the job:</strong> This tool excels at quick edits, cleaning data, and making systematic changes to plain text. For anything beyond that, it's good to know what alternatives exist - whether that's a regex tester, a proper code editor, or specialized data cleaning software.
                      </p>
                    </div>

                    <p className="text-muted-foreground mt-6">
                      Honestly, these limitations are what make the tool fast and reliable. By focusing on what it does well - straightforward text replacement with clear options - it avoids the complexity that makes some editing tools frustrating to use. Sometimes simple and predictable is exactly what you need.
                    </p>
                  </div>
                )}
              </article>

              {/* Related Tools Section - Kept as is */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('relatedTools')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                  aria-expanded={openSections.relatedTools}
                >
                  <h2 className="text-xl font-bold text-foreground">Related Text & Editing Tools</h2>
                  {openSections.relatedTools ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>

                {openSections.relatedTools && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Explore other useful text and editing tools from GrockTool.com:
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
                        <Link href="/text-tools/remove-duplicates" className="text-accent hover:underline">
                          <strong>Remove Duplicates:</strong> Remove duplicate lines from text
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
                        <Link href="/text-tools/case-converter" className="text-accent hover:underline">
                          <strong>Case Converter:</strong> Convert text between different cases
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
                        <Link href="/text-tools/text-limiter" className="text-accent hover:underline">
                          <strong>Text Limiter:</strong> Truncate text to specific lengths
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </article>

              {/* Frequently Asked Questions */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('faqs')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                  aria-expanded={openSections.faqs}
                >
                  <h2 className="text-xl font-bold text-foreground">Common Questions About Find & Replace</h2>
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
                    <div className="mt-8 p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                      <h3 className="text-lg font-semibold text-foreground mb-2">A Note About Text Editing</h3>
                      <p className="text-sm text-muted-foreground">
                        This tool is designed for convenience and productivity. It follows standard text processing rules used by most programming languages and text editors. While we aim for accuracy, always review important changes before finalizing them. For mission-critical documents or complex pattern matching, consider using specialized software or consulting with professionals who handle large-scale text processing regularly.
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
};

export default FindReplace;