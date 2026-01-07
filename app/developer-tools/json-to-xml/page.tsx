'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, RefreshCw, Check, AlertCircle, ChevronDown, ChevronUp, Code, FileText, Database, FileCode,  Download } from 'lucide-react';
import Head from 'next/head';

export default function JsonToXmlPage() {
  const [jsonInput, setJsonInput] = useState('');
  const [xmlOutput, setXmlOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [rootName, setRootName] = useState('root');
  const [prettyPrint, setPrettyPrint] = useState(true);

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
    { name: 'Base64 Encoder / Decoder', path: '/developer-tools/base64-encoder-decoder', icon: Code },
    { name: 'JWT Decoder', path: '/developer-tools/jwt-decoder', icon: Database },
    { name: 'Regex Tester', path: '/developer-tools/regex-tester', icon: Code },
    { name: 'UUID Generator', path: '/developer-tools/uuid-generator', icon: Database },
    { name: 'Unix Timestamp Converter', path: '/developer-tools/unix-timestamp', icon: FileText },
    { name: 'JSON Formatter & Validator', path: '/developer-tools/json-formatter', icon: FileCode },
    { name: 'HTML Minifier', path: '/developer-tools/html-minifier', icon: FileText },
    { name: 'CSS Minifier', path: '/developer-tools/css-minifier', icon: FileText },
    { name: 'JavaScript Minifier', path: '/developer-tools/javascript-minifier', icon: Code },
    { name: 'URL Encoder / Decoder', path: '/developer-tools/url-encoder-decoder', icon: Code },
    { name: 'HTML Escape / Unescape', path: '/developer-tools/html-escape-unescape', icon: FileText },
    { name: 'Lorem Ipsum Generator', path: '/developer-tools/lorem-ipsum-generator', icon: FileText },
    { name: 'Color Code Converter', path: '/developer-tools/color-code-converter', icon: FileText },
  ];

  // FAQ Data
  const faqData = [
    {
      question: "What JSON format does this converter accept?",
      answer: "The converter accepts any valid JSON including objects, arrays, nested structures, and primitive values. It handles strings, numbers, booleans, null values, arrays, and nested objects. Invalid JSON syntax will trigger an error message with details about the parsing issue."
    },
    {
      question: "How are JSON arrays converted to XML?",
      answer: "JSON arrays are converted to repeated XML elements with the same name. For example, ['a','b','c'] becomes <item>a</item><item>b</item><item>c</item>. Array objects are handled similarly, with each array item becoming a separate XML element following the same conversion rules as regular objects."
    },
    {
      question: "Can I customize the root element name?",
      answer: "Yes, you can change the root element name from the default 'root' to any valid XML element name. This is useful when integrating with systems that expect specific root element names in their XML schemas or document type definitions."
    },
    {
      question: "How are special characters handled in XML conversion?",
      answer: "Special XML characters (<, >, &, ', \") are automatically escaped during conversion. For example, 'a & b' becomes 'a &amp; b'. This ensures the generated XML is well-formed and valid according to XML specifications."
    },
    {
      question: "What's the difference between pretty-printed and minified XML?",
      answer: "Pretty-printed XML includes indentation and line breaks for human readability, while minified XML removes all unnecessary whitespace to reduce file size. The converter offers both options - pretty-printed is better for debugging and readability, minified is better for production use and transmission efficiency."
    }
  ];

  const jsonToXml = (obj: any, nodeName: string, indent = ''): string => {
    if (obj === null || obj === undefined) {
      return `${indent}<${nodeName}/>`;
    }

    if (typeof obj !== 'object') {
      const escapedValue = String(obj)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
      return `${indent}<${nodeName}>${escapedValue}</${nodeName}>`;
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => jsonToXml(item, nodeName, indent)).join(prettyPrint ? '\n' : '');
    }

    const childIndent = prettyPrint ? indent + '  ' : '';
    const children = Object.keys(obj)
      .map(key => jsonToXml(obj[key], key, childIndent))
      .join(prettyPrint ? '\n' : '');

    if (children) {
      return `${indent}<${nodeName}>${prettyPrint ? '\n' : ''}${children}${prettyPrint ? `\n${indent}` : ''}</${nodeName}>`;
    } else {
      return `${indent}<${nodeName}/>`;
    }
  };

  const convertToXml = () => {
    setError(null);
    setXmlOutput('');
    setCopied(false);

    if (!jsonInput.trim()) {
      setError('Please enter JSON data to convert');
      return;
    }

    try {
      const parsedJson = JSON.parse(jsonInput);
      const xmlDeclaration = '<?xml version="1.0" encoding="UTF-8"?>';
      const xmlBody = jsonToXml(parsedJson, rootName, prettyPrint ? '\n' : '');
      const xml = prettyPrint ? `${xmlDeclaration}\n${xmlBody}` : `${xmlDeclaration}${xmlBody}`;
      
      setXmlOutput(xml);
    } catch (err: any) {
      setError(`Invalid JSON: ${err.message}`);
      setXmlOutput('');
    }
  };

  const copyToClipboard = async () => {
    if (!xmlOutput) return;
    
    try {
      await navigator.clipboard.writeText(xmlOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const downloadXml = () => {
    if (!xmlOutput) return;
    
    const blob = new Blob([xmlOutput], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'converted.xml';
    link.click();
    URL.revokeObjectURL(url);
  };

  const resetAll = () => {
    setJsonInput('');
    setXmlOutput('');
    setError(null);
    setCopied(false);
    setRootName('root');
  };

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonInput(e.target.value);
    setError(null);
  };

  const handleRootNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value.replace(/[^a-zA-Z0-9_:-]/g, '');
    setRootName(name || 'root');
  };

  const loadExample = () => {
    const exampleJson = {
      "catalog": {
        "book": [
          {
            "id": "bk101",
            "author": "Gambardella, Matthew",
            "title": "XML Developer's Guide",
            "genre": "Computer",
            "price": 44.95,
            "publish_date": "2000-10-01",
            "description": "An in-depth look at creating applications with XML."
          },
          {
            "id": "bk102",
            "author": "Ralls, Kim",
            "title": "Midnight Rain",
            "genre": "Fantasy",
            "price": 5.95,
            "publish_date": "2000-12-16",
            "description": "A former architect battles corporate zombies."
          }
        ]
      }
    };
    
    setJsonInput(JSON.stringify(exampleJson, null, 2));
    setRootName('catalog');
    setError(null);
    setXmlOutput('');
  };

  return (
    <>
      <Head>
        <title>JSON to XML Converter | Free Online Data Format Tool - GrockTool.com</title>
        <meta name="description" content="Convert JSON to XML format instantly with our free online converter. Perfect for developers working with data format conversion, APIs, and web services." />
        <meta name="keywords" content="JSON to XML, JSON converter, XML converter, data format conversion, JSON to XML online, XML generator, JSON parser, data interchange, API integration" />
        <meta property="og:title" content="JSON to XML Converter | Free Online Data Format Tool - GrockTool.com" />
        <meta property="og:description" content="Free online JSON to XML converter with customizable root elements, pretty printing, and automatic special character escaping. Perfect for data integration and API development." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="JSON to XML Converter - GrockTool.com" />
        <meta name="twitter:description" content="Convert JSON to XML format instantly with our free online tool." />
        <link rel="canonical" href="https://grocktool.com/developer-tools/json-to-xml" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "JSON to XML Converter",
            "applicationCategory": "DeveloperApplication",
            "operatingSystem": "Any",
            "description": "Free online tool to convert JSON data to XML format with customizable options and proper XML escaping",
            "url": "https://grocktool.com/developer-tools/json-to-xml",
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
              "JSON to XML conversion",
              "Customizable root element name",
              "Pretty print formatting",
              "Automatic special character escaping",
              "XML validation",
              "Download and copy functionality"
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
                  JSON to XML Converter
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Convert JSON data to XML format instantly
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
              {/* Controls */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">
                    Root Element Name
                  </label>
                  <input
                    type="text"
                    value={rootName}
                    onChange={handleRootNameChange}
                    placeholder="Enter root element name"
                    className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-ring focus:ring-opacity-50 text-foreground"
                  />
                  <div className="text-xs text-muted-foreground">
                    Default: "root". Use valid XML element name.
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">
                    Formatting Options
                  </label>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={prettyPrint}
                        onChange={(e) => setPrettyPrint(e.target.checked)}
                        className="w-4 h-4 rounded border-border"
                      />
                      <span className="text-sm">Pretty Print</span>
                    </label>
                    <button
                      onClick={loadExample}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      Load Example
                    </button>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Pretty print adds indentation for readability
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">
                    Quick Actions
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={convertToXml}
                      disabled={!jsonInput.trim()}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    >
                      Convert
                    </button>
                    <button
                      onClick={resetAll}
                      className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-sm"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* JSON Input Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-foreground">
                      JSON Input
                    </label>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <FileCode size={12} />
                      <span>JavaScript Object Notation</span>
                    </div>
                  </div>
                  <textarea
                    value={jsonInput}
                    onChange={handleJsonChange}
                    placeholder={`Enter your JSON data here...
Example:
{
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30,
    "active": true
  }
}`}
                    className="w-full min-h-[300px] p-4 bg-input border border-border rounded-lg sm:rounded-xl focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-ring focus:ring-opacity-50 resize-none text-foreground placeholder-muted-foreground font-mono text-sm"
                  />
                </div>

                {/* XML Output Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-foreground">
                      XML Output
                    </label>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <FileCode size={12} />
                      <span>eXtensible Markup Language</span>
                    </div>
                  </div>
                  <textarea
                    value={xmlOutput}
                    readOnly
                    placeholder="XML output will appear here after conversion"
                    className="w-full min-h-[300px] p-4 bg-input border border-border rounded-lg sm:rounded-xl focus:outline-none resize-none text-foreground placeholder-muted-foreground font-mono text-sm"
                  />
                </div>
              </div>

              {error && (
                <div className="mt-4 flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <AlertCircle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {xmlOutput && (
                <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-sm text-green-600">
                    ✓ Successfully converted JSON to XML format
                  </p>
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
                  onClick={convertToXml}
                  disabled={!jsonInput.trim()}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg sm:rounded-xl hover:bg-blue-700 transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Database size={16} className="sm:w-4 sm:h-4" />
                  Convert to XML
                </button>
                {xmlOutput && (
                  <>
                    <button
                      onClick={copyToClipboard}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent text-accent-foreground rounded-lg sm:rounded-xl hover:bg-accent/80 transition-colors text-sm sm:text-base"
                    >
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                      {copied ? 'Copied!' : 'Copy XML'}
                    </button>
                    <button
                      onClick={downloadXml}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg sm:rounded-xl hover:bg-green-700 transition-colors text-sm sm:text-base"
                    >
                      <Download size={16} className="sm:w-4 sm:h-4" />
                      Download XML
                    </button>
                  </>
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
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">How to Convert JSON to XML</h3>
              <div className="space-y-2 text-muted-foreground text-sm">
                <p>
                  This tool converts JSON data to XML format, maintaining data structure and automatically handling special characters.
                </p>
                <div className="text-xs sm:text-sm space-y-1 pt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Enter or paste your JSON data in the left text area</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Set the root element name (default is "root")</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Choose pretty print for readable formatting or uncheck for minified XML</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Click "Convert to XML" to generate the XML output</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Copy the XML to clipboard or download it as a file</span>
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
                  <h2 className="text-xl font-bold text-foreground">JSON to XML Converter - What It Does</h2>
                  {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.whatItDoes && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      This free online JSON to XML converter transforms JavaScript Object Notation (JSON) data into eXtensible Markup Language (XML) format—a crucial capability for data integration, API development, and system interoperability where different systems require different data formats. The tool handles complex JSON structures including nested objects, arrays, and various data types, converting them to properly formatted XML with correct element hierarchy, attribute handling, and automatic escaping of special characters.
                    </p>
                    <p className="text-muted-foreground">
                      Designed for developers working with web services, enterprise systems, and data exchange protocols, this converter ensures XML output follows W3C standards with proper XML declaration, valid element naming, and well-formed structure. It supports customization options like root element naming and formatting preferences, making it suitable for generating XML that matches specific DTDs or XML schemas required by legacy systems, SOAP services, or XML-based APIs.
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
                  <h2 className="text-xl font-bold text-foreground">Practical Use Cases for JSON to XML Conversion</h2>
                  {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.useCases && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Converting JSON to XML serves essential purposes across various development and system integration scenarios:
                    </p>
                    <ul className="space-y-3 text-muted-foreground pl-5">
                      <li className="pl-2">
                        <strong className="text-foreground">Legacy System Integration</strong>
                        <p className="mt-1">Modernize applications by converting JSON API responses to XML format required by older enterprise systems, mainframes, or SOAP-based web services.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">API Compatibility & Transformation</strong>
                        <p className="mt-1">Transform JSON data from REST APIs into XML format for systems that only accept XML input, enabling cross-format data exchange.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Data Publishing & Syndication</strong>
                        <p className="mt-1">Convert JSON datasets to RSS/Atom feeds, sitemaps, or other XML-based publication formats for content distribution and syndication.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Configuration & Data Files</strong>
                        <p className="mt-1">Generate XML configuration files, data export files, or transformation templates from JSON data for use in XML-powered applications.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Testing & Development</strong>
                        <p className="mt-1">Create XML test data, mock responses, or sample documents from JSON fixtures during development of XML-processing applications.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Document Generation</strong>
                        <p className="mt-1">Transform JSON data into XML documents for further processing with XSLT, XPath, or XML-based reporting and document generation systems.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Data Migration & Conversion</strong>
                        <p className="mt-1">Convert JSON data exports to XML format for import into systems, databases, or applications that require XML data structures.</p>
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
                  <h2 className="text-xl font-bold text-foreground">How to Use This JSON to XML Converter Effectively</h2>
                  {openSections.howToUse ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.howToUse && (
                  <div className="px-6 pb-6">
                    <ol className="space-y-4 text-muted-foreground pl-5">
                      <li className="pl-2">
                        <strong className="text-foreground">Prepare Your JSON Data</strong>
                        <p className="mt-1">Ensure your JSON is valid and properly formatted. The tool validates JSON syntax before conversion and provides detailed error messages for invalid input.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Customize Conversion Settings</strong>
                        <p className="mt-1">Set the root element name to match your target XML schema requirements. Choose between pretty-printed (human-readable) or minified (compact) XML output.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Execute Conversion</strong>
                        <p className="mt-1">Click "Convert to XML" to transform your JSON. The tool automatically handles special character escaping and generates well-formed XML with proper declaration.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Review XML Output</strong>
                        <p className="mt-1">Check the generated XML for correctness, structure, and formatting. Verify that arrays, nested objects, and special characters were converted appropriately.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Export Results</strong>
                        <p className="mt-1">Use "Copy XML" to copy to clipboard for immediate use, or "Download XML" to save as an .xml file for storage, sharing, or further processing.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Validate XML</strong>
                        <p className="mt-1">For critical applications, validate the generated XML against your target schema or DTD to ensure compatibility with receiving systems.</p>
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
                  <h2 className="text-xl font-bold text-foreground">JSON to XML Conversion Examples</h2>
                  {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.examples && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground text-sm mb-4">
                      Below are practical examples demonstrating JSON to XML conversion with different data structures:
                    </p>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 1: Simple Object Conversion</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                            <h4 className="text-sm font-semibold text-foreground mb-2">JSON Input:</h4>
                            <pre className="text-xs text-muted-foreground font-mono whitespace-pre">
{`{
  "user": {
    "name": "John Smith",
    "email": "john@example.com",
    "age": 30,
    "active": true
  }
}`}
                            </pre>
                          </div>
                          <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                            <h4 className="text-sm font-semibold text-foreground mb-2">XML Output:</h4>
                            <pre className="text-xs text-muted-foreground font-mono whitespace-pre">
{`<?xml version="1.0" encoding="UTF-8"?>
<root>
  <user>
    <name>John Smith</name>
    <email>john@example.com</email>
    <age>30</age>
    <active>true</active>
  </user>
</root>`}
                            </pre>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 2: Array and Nested Objects</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                            <h4 className="text-sm font-semibold text-foreground mb-2">JSON Input:</h4>
                            <pre className="text-xs text-muted-foreground font-mono whitespace-pre">
{`{
  "products": {
    "product": [
      {
        "id": 1,
        "name": "Laptop",
        "specs": {
          "cpu": "Intel i7",
          "ram": "16GB"
        }
      },
      {
        "id": 2,
        "name": "Mouse",
        "specs": {
          "type": "Wireless",
          "dpi": 1600
        }
      }
    ]
  }
}`}
                            </pre>
                          </div>
                          <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                            <h4 className="text-sm font-semibold text-foreground mb-2">XML Output:</h4>
                            <pre className="text-xs text-muted-foreground font-mono whitespace-pre">
{`<?xml version="1.0" encoding="UTF-8"?>
<root>
  <products>
    <product>
      <id>1</id>
      <name>Laptop</name>
      <specs>
        <cpu>Intel i7</cpu>
        <ram>16GB</ram>
      </specs>
    </product>
    <product>
      <id>2</id>
      <name>Mouse</name>
      <specs>
        <type>Wireless</type>
        <dpi>1600</dpi>
      </specs>
    </product>
  </products>
</root>`}
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
                  <h2 className="text-xl font-bold text-foreground">Frequently Asked Questions About JSON to XML Conversion</h2>
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
                    <div className="mt-8 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <h3 className="text-lg font-semibold text-foreground mb-2">JSON to XML Conversion Best Practices</h3>
                      <p className="text-sm text-muted-foreground">
                        For optimal conversion results: 1) Ensure JSON keys are valid XML element names (avoid spaces, special characters), 2) Handle null values appropriately in your source data, 3) Consider array handling requirements for your target XML schema, 4) Test with representative data samples before production use, 5) Validate generated XML against target schemas when integrating with strict XML systems, 6) Consider namespace requirements for complex XML schemas, and 7) Document mapping rules between JSON structures and XML elements for maintainability.
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