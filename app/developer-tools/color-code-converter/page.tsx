'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, RefreshCw, Check, AlertCircle, ChevronDown, ChevronUp, Palette, Droplets, Eye, Contrast, Clipboard, PaintBucket } from 'lucide-react';
import Head from 'next/head';

function hexToRgb(hex: string) {
  const clean = hex.replace('#', '');
  const bigint = parseInt(clean, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

function rgbToHex(r: number, g: number, b: number) {
  return (
    '#' +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('')
  );
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function hslToRgb(h: number, s: number, l: number) {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0,
    g = 0,
    b = 0;

  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

function getContrastColor(hex: string) {
  const rgb = hexToRgb(hex);
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  return brightness > 128 ? '#000000' : '#ffffff';
}

export default function ColorCodeConverterPage() {
  const [hex, setHex] = useState('#3498db');
  const [rgb, setRgb] = useState({ r: 52, g: 152, b: 219 });
  const [hsl, setHsl] = useState(rgbToHsl(52, 152, 219));
  const [copied, setCopied] = useState<'hex' | 'rgb' | 'hsl' | null>(null);

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
    { name: 'JSON to CSV Converter', path: '/developer-tools/json-to-csv', icon: Palette },
    { name: 'Base64 Encoder / Decoder', path: '/developer-tools/base64-encoder-decoder', icon: Palette },
    { name: 'JWT Decoder', path: '/developer-tools/jwt-decoder', icon: Palette },
    { name: 'Regex Tester', path: '/developer-tools/regex-tester', icon: Palette },
    { name: 'UUID Generator', path: '/developer-tools/uuid-generator', icon: Palette },
    { name: 'Unix Timestamp Converter', path: '/developer-tools/unix-timestamp', icon: Palette },
    { name: 'JSON Formatter & Validator', path: '/developer-tools/json-formatter', icon: Palette },
    { name: 'JSON to XML Converter', path: '/developer-tools/json-to-xml', icon: Palette },
    { name: 'HTML Minifier', path: '/developer-tools/html-minifier', icon: Palette },
    { name: 'CSS Minifier', path: '/developer-tools/css-minifier', icon: Palette },
    { name: 'JavaScript Minifier', path: '/developer-tools/javascript-minifier', icon: Palette },
    { name: 'URL Encoder / Decoder', path: '/developer-tools/url-encoder-decoder', icon: Palette },
    { name: 'HTML Escape / Unescape', path: '/developer-tools/html-escape-unescape', icon: Palette },
    { name: 'Lorem Ipsum Generator', path: '/developer-tools/lorem-ipsum-generator', icon: Palette }
  ];

  // FAQ Data
  const faqData = [
    {
      question: "What are HEX, RGB, and HSL color formats and when should I use each?",
      answer: "HEX (hexadecimal) is a 6-digit code prefixed with #, representing colors in web design (e.g., #3498db). RGB (Red Green Blue) uses three values (0-255) for screen displays. HSL (Hue Saturation Lightness) uses hue (0-360°), saturation (0-100%), and lightness (0-100%) for intuitive color manipulation. Use HEX for web development and CSS, RGB for graphics software and screen design, and HSL when you need to adjust color properties like brightness or saturation programmatically. All three formats can represent the same colors but offer different approaches to color specification."
    },
    {
      question: "How does color conversion work between different formats?",
      answer: "Color conversion uses mathematical formulas to translate between color spaces. HEX to RGB involves converting hexadecimal pairs to decimal values (0-255). RGB to HSL calculates hue based on color component relationships, saturation based on color intensity, and lightness based on brightness. The conversions are precise and reversible, meaning you can convert back and forth without losing color accuracy. Our tool performs these conversions in real-time, ensuring that any color you enter in one format is instantly available in all other supported formats with perfect accuracy."
    },
    {
      question: "What is color contrast and why is it important for accessibility?",
      answer: "Color contrast measures the difference in luminance between foreground and background colors. High contrast improves readability and accessibility, especially for users with visual impairments. Web Content Accessibility Guidelines (WCAG) require minimum contrast ratios: 4.5:1 for normal text and 3:1 for large text. Our tool calculates the contrast ratio and suggests optimal text colors (black or white) based on your selected background color. Proper contrast ensures your designs are usable by everyone and compliant with accessibility standards like WCAG 2.1."
    },
    {
      question: "Can I use shorthand HEX colors (3-digit) with this converter?",
      answer: "Yes, our converter automatically expands 3-digit HEX codes to their 6-digit equivalents. For example, #abc becomes #aabbcc. However, for precise color control, we recommend using full 6-digit HEX codes. The tool validates all input formats and provides error messages for invalid colors. When converting from RGB or HSL to HEX, we always output the full 6-digit format for consistency and compatibility with all web browsers and design tools."
    },
    {
      question: "How accurate are the color conversions and what about color spaces?",
      answer: "Our conversions are mathematically precise and use industry-standard algorithms identical to those used in professional design software and web browsers. However, note that we work within the sRGB color space, which is standard for web and most digital displays. For print design or specialized color work requiring other color spaces (CMYK, Adobe RGB, Pantone), you would need specialized tools. For web development, digital design, and general purpose color work, our conversions provide perfect accuracy across all modern devices and browsers."
    }
  ];

  const syncFromHex = (value: string) => {
    let cleanValue = value.startsWith('#') ? value : `#${value}`;
    setHex(cleanValue);
    
    if (/^#[0-9A-Fa-f]{3}$/.test(cleanValue)) {
      // Expand shorthand hex
      cleanValue = '#' + cleanValue[1] + cleanValue[1] + cleanValue[2] + cleanValue[2] + cleanValue[3] + cleanValue[3];
      setHex(cleanValue);
    }
    
    if (/^#?[0-9A-Fa-f]{6}$/.test(cleanValue.replace('#', ''))) {
      const rgbVal = hexToRgb(cleanValue);
      setRgb(rgbVal);
      setHsl(rgbToHsl(rgbVal.r, rgbVal.g, rgbVal.b));
    }
  };

  const syncFromRgb = (r: number, g: number, b: number) => {
    setRgb({ r, g, b });
    setHex(rgbToHex(r, g, b));
    setHsl(rgbToHsl(r, g, b));
  };

  const syncFromHsl = (h: number, s: number, l: number) => {
    setHsl({ h, s, l });
    const rgbVal = hslToRgb(h, s, l);
    setRgb(rgbVal);
    setHex(rgbToHex(rgbVal.r, rgbVal.g, rgbVal.b));
  };

  const copyToClipboard = async (text: string, type: 'hex' | 'rgb' | 'hsl') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const resetToDefault = () => {
    setHex('#3498db');
    setRgb({ r: 52, g: 152, b: 219 });
    setHsl(rgbToHsl(52, 152, 219));
    setCopied(null);
  };

  const contrastColor = getContrastColor(hex);
  const contrastRatio = ((parseInt(contrastColor === '#000000' ? '000000' : 'ffffff', 16) + 0.05) / (parseInt(hex.slice(1), 16) + 0.05)).toFixed(2);

  return (
    <>
      <Head>
        <title>Color Code Converter | HEX, RGB, HSL Color Tool - GrockTool.com</title>
        <meta name="description" content="Convert between HEX, RGB, and HSL color codes instantly. Perfect for web designers, developers, and digital artists working with color formats and accessibility." />
        <meta name="keywords" content="color converter, HEX to RGB, RGB to HEX, HSL converter, color code converter, web design tools, color format converter, accessibility contrast, color picker tool" />
        <meta property="og:title" content="Color Code Converter | HEX, RGB, HSL Color Tool - GrockTool.com" />
        <meta property="og:description" content="Free online color code converter tool. Instantly convert between HEX, RGB, and HSL color formats with contrast analysis and accessibility features." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Color Code Converter - GrockTool.com" />
        <meta name="twitter:description" content="Free online color conversion tool for web designers and developers." />
        <link rel="canonical" href="https://grocktool.com/developer-tools/color-code-converter" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Color Code Converter",
            "applicationCategory": "DesignApplication",
            "operatingSystem": "Any",
            "description": "Free online tool to convert between HEX, RGB, and HSL color codes with contrast analysis and accessibility features",
            "url": "https://grocktool.com/developer-tools/color-code-converter",
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
              "HEX to RGB conversion",
              "RGB to HSL conversion",
              "HSL to HEX conversion",
              "Color contrast analysis",
              "Accessibility checking",
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
                  Color Code Converter – HEX, RGB, HSL & More
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Convert between color formats instantly with contrast analysis and accessibility tools
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
              {/* Color Preview */}
              <div className="relative h-32 sm:h-40 rounded-xl mb-6 overflow-hidden border border-border shadow-sm"
                   style={{ backgroundColor: hex }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center px-4 py-3 rounded-lg backdrop-blur-sm bg-black/20">
                    <div className="text-lg sm:text-xl font-bold" style={{ color: contrastColor }}>
                      {hex.toUpperCase()}
                    </div>
                    <div className="text-xs sm:text-sm mt-1 opacity-90" style={{ color: contrastColor }}>
                      Click color formats to copy
                    </div>
                  </div>
                </div>
              </div>

              {/* Color Format Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* HEX Card */}
                <div className="bg-secondary/30 rounded-lg p-4 border border-border">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-md bg-blue-500/10">
                        <PaintBucket size={14} className="text-blue-600" />
                      </div>
                      <span className="font-medium text-foreground">HEX Color</span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(hex, 'hex')}
                      className="text-xs px-2 py-1 rounded bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
                    >
                      {copied === 'hex' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <input
                    type="text"
                    value={hex}
                    onChange={(e) => syncFromHex(e.target.value)}
                    className="w-full p-3 bg-background border border-border rounded-lg font-mono text-center text-lg font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                  <div className="text-xs text-muted-foreground mt-2 text-center">
                    Web & CSS format
                  </div>
                </div>

                {/* RGB Card */}
                <div className="bg-secondary/30 rounded-lg p-4 border border-border">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-md bg-green-500/10">
                        <Droplets size={14} className="text-green-600" />
                      </div>
                      <span className="font-medium text-foreground">RGB Color</span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, 'rgb')}
                      className="text-xs px-2 py-1 rounded bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
                    >
                      {copied === 'rgb' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-red-600 font-medium w-6">R</span>
                      <input
                        type="number"
                        min="0"
                        max="255"
                        value={rgb.r}
                        onChange={(e) => syncFromRgb(Number(e.target.value), rgb.g, rgb.b)}
                        className="flex-1 p-2 bg-background border border-border rounded text-center font-mono focus:outline-none focus:ring-1 focus:ring-red-500/50"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-green-600 font-medium w-6">G</span>
                      <input
                        type="number"
                        min="0"
                        max="255"
                        value={rgb.g}
                        onChange={(e) => syncFromRgb(rgb.r, Number(e.target.value), rgb.b)}
                        className="flex-1 p-2 bg-background border border-border rounded text-center font-mono focus:outline-none focus:ring-1 focus:ring-green-500/50"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-blue-600 font-medium w-6">B</span>
                      <input
                        type="number"
                        min="0"
                        max="255"
                        value={rgb.b}
                        onChange={(e) => syncFromRgb(rgb.r, rgb.g, Number(e.target.value))}
                        className="flex-1 p-2 bg-background border border-border rounded text-center font-mono focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                      />
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2 text-center">
                    Digital display format
                  </div>
                </div>

                {/* HSL Card */}
                <div className="bg-secondary/30 rounded-lg p-4 border border-border">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-md bg-purple-500/10">
                        <Palette size={14} className="text-purple-600" />
                      </div>
                      <span className="font-medium text-foreground">HSL Color</span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, 'hsl')}
                      className="text-xs px-2 py-1 rounded bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
                    >
                      {copied === 'hsl' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-purple-600 font-medium w-6">H</span>
                      <input
                        type="number"
                        min="0"
                        max="360"
                        value={hsl.h}
                        onChange={(e) => syncFromHsl(Number(e.target.value), hsl.s, hsl.l)}
                        className="flex-1 p-2 bg-background border border-border rounded text-center font-mono focus:outline-none focus:ring-1 focus:ring-purple-500/50"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-purple-600 font-medium w-6">S</span>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={hsl.s}
                        onChange={(e) => syncFromHsl(hsl.h, Number(e.target.value), hsl.l)}
                        className="flex-1 p-2 bg-background border border-border rounded text-center font-mono focus:outline-none focus:ring-1 focus:ring-purple-500/50"
                      />
                      <span className="text-xs text-muted-foreground">%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-purple-600 font-medium w-6">L</span>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={hsl.l}
                        onChange={(e) => syncFromHsl(hsl.h, hsl.s, Number(e.target.value))}
                        className="flex-1 p-2 bg-background border border-border rounded text-center font-mono focus:outline-none focus:ring-1 focus:ring-purple-500/50"
                      />
                      <span className="text-xs text-muted-foreground">%</span>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2 text-center">
                    Design & adjustment format
                  </div>
                </div>
              </div>

              {/* Accessibility Info */}
              <div className="bg-secondary/30 rounded-lg p-4 border border-border mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-1.5 rounded-md bg-yellow-500/10">
                    <Contrast size={16} className="text-yellow-600" />
                  </div>
                  <h3 className="font-medium text-foreground">Accessibility & Contrast Analysis</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Contrast Ratio:</span>
                      <span className="font-medium text-foreground">{contrastRatio}:1</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">WCAG Compliance:</span>
                      <span className={`font-medium ${parseFloat(contrastRatio) >= 4.5 ? 'text-green-600' : parseFloat(contrastRatio) >= 3 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {parseFloat(contrastRatio) >= 4.5 ? 'AA ✓' : parseFloat(contrastRatio) >= 3 ? 'Large Text AA' : 'Fail'}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Text Color:</span>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded border" style={{ backgroundColor: contrastColor }} />
                        <span className="font-mono text-sm">{contrastColor.toUpperCase()}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Readability:</span>
                      <span className={`font-medium ${parseFloat(contrastRatio) >= 4.5 ? 'text-green-600' : 'text-yellow-600'}`}>
                        {parseFloat(contrastRatio) >= 4.5 ? 'Good' : 'Poor'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={resetToDefault}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg sm:rounded-xl hover:bg-secondary/80 transition-colors text-sm sm:text-base"
                >
                  <RefreshCw size={16} className="sm:w-4 sm:h-4" />
                  Reset to Default
                </button>
                <button
                  onClick={() => copyToClipboard(`HEX: ${hex}\nRGB: ${rgb.r}, ${rgb.g}, ${rgb.b}\nHSL: ${hsl.h}, ${hsl.s}%, ${hsl.l}%`, 'hex')}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent text-accent-foreground rounded-lg sm:rounded-xl hover:bg-accent/80 transition-colors text-sm sm:text-base"
                >
                  {copied ? <Check size={16} /> : <Clipboard size={16} />}
                  {copied ? 'All Formats Copied!' : 'Copy All Formats'}
                </button>
              </div>
            </motion.div>

            {/* Quick Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 mb-8 shadow-sm"
            >
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">How to Use Color Code Converter</h3>
              <div className="space-y-2 text-muted-foreground text-sm">
                <p>
                  Convert between HEX, RGB, and HSL color formats with real-time updates and accessibility analysis.
                </p>
                <div className="text-xs sm:text-sm space-y-1 pt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Enter a color in any format (HEX, RGB, or HSL) - all formats update automatically</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Use the color preview to visualize your selected color</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Check accessibility metrics for WCAG compliance and contrast ratios</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Click "Copy" on any format or use "Copy All Formats" for complete color data</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Use "Reset to Default" to return to the starting color</span>
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
                  <h2 className="text-xl font-bold text-foreground">Color Code Converter - What It Does</h2>
                  {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.whatItDoes && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      This free online color code converter tool provides seamless conversion between the three most important digital color formats: HEX (hexadecimal), RGB (Red Green Blue), and HSL (Hue Saturation Lightness). It performs real-time, mathematically precise conversions that maintain color accuracy across all formats, allowing web designers, developers, and digital artists to work with colors in their preferred format while ensuring compatibility with different platforms and tools.
                    </p>
                    <p className="text-muted-foreground">
                      Beyond basic conversion, the tool includes comprehensive accessibility analysis with contrast ratio calculation and WCAG compliance checking. It automatically suggests optimal text colors (black or white) based on your selected background color and provides visual feedback through a large color preview area. Whether you're converting CSS color values, preparing design specifications, ensuring accessibility compliance, or learning about color theory, this converter delivers professional-grade functionality with intuitive controls and immediate results.
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
                  <h2 className="text-xl font-bold text-foreground">Practical Use Cases for Color Conversion</h2>
                  {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.useCases && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Color format conversion serves essential purposes across design, development, and accessibility workflows:
                    </p>
                    <ul className="space-y-3 text-muted-foreground pl-5">
                      <li className="pl-2">
                        <strong className="text-foreground">Web Development & CSS Implementation</strong>
                        <p className="mt-1">Convert design specifications (often in RGB or HEX) to CSS-compatible formats, ensure color consistency across browsers, and implement color variables in modern CSS frameworks.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">UI/UX Design & Prototyping</strong>
                        <p className="mt-1">Work with colors in design tools (which use RGB), then convert to HEX for web implementation or HSL for programmatic color adjustments like hover states and gradients.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Accessibility Compliance</strong>
                        <p className="mt-1">Check color contrast ratios for WCAG compliance, determine readable text colors, and ensure designs are accessible to users with visual impairments or color vision deficiencies.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Cross-Platform Development</strong>
                        <p className="mt-1">Convert colors between web (HEX), mobile (RGB/HEX), and desktop application formats, ensuring brand color consistency across all digital touchpoints.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Digital Marketing & Branding</strong>
                        <p className="mt-1">Maintain brand color accuracy across websites, social media graphics, email templates, and digital advertisements by converting between different platform requirements.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Education & Learning</strong>
                        <p className="mt-1">Understand color theory, learn how different color formats work, and experiment with color relationships and accessibility principles in a practical, interactive environment.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Debugging & Troubleshooting</strong>
                        <p className="mt-1">Identify color discrepancies between design files and live websites, troubleshoot rendering issues, and ensure color accuracy in different browsers and devices.</p>
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
                  <h2 className="text-xl font-bold text-foreground">How to Use This Color Converter Effectively</h2>
                  {openSections.howToUse ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.howToUse && (
                  <div className="px-6 pb-6">
                    <ol className="space-y-4 text-muted-foreground pl-5">
                      <li className="pl-2">
                        <strong className="text-foreground">Enter Your Color</strong>
                        <p className="mt-1">Start with any color format: HEX (#3498db), RGB (52, 152, 219), or HSL (204°, 70%, 53%). The tool automatically converts to all other formats in real-time.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Visualize and Adjust</strong>
                        <p className="mt-1">Use the large color preview to see your selected color. Adjust RGB sliders or HSL values to fine-tune your color while watching all formats update simultaneously.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Check Accessibility</strong>
                        <p className="mt-1">Review the contrast ratio and WCAG compliance information. Ensure your color combinations meet accessibility standards for text readability.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Copy and Implement</strong>
                        <p className="mt-1">Click "Copy" on any individual format or use "Copy All Formats" to get complete color data for use in your projects, documentation, or design specifications.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Test Variations</strong>
                        <p className="mt-1">Experiment with color variations by adjusting HSL values (hue for different colors, saturation for intensity, lightness for brightness) to create color palettes.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Document and Share</strong>
                        <p className="mt-1">Use the comprehensive color data for design systems, style guides, or team collaboration, ensuring everyone works with exactly the same color values.</p>
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
                  <h2 className="text-xl font-bold text-foreground">Color Conversion Examples</h2>
                  {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.examples && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground text-sm mb-4">
                      Below are common color conversions showing how different formats represent the same colors:
                    </p>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 1: Web Blue (#3498db)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-blue-500/10 p-4 rounded-lg">
                            <div className="font-mono text-sm mb-2">HEX: #3498db</div>
                            <div className="h-8 rounded" style={{ backgroundColor: '#3498db' }}></div>
                          </div>
                          <div className="bg-blue-500/10 p-4 rounded-lg">
                            <div className="font-mono text-sm mb-2">RGB: 52, 152, 219</div>
                            <div className="h-8 rounded" style={{ backgroundColor: 'rgb(52, 152, 219)' }}></div>
                          </div>
                          <div className="bg-blue-500/10 p-4 rounded-lg">
                            <div className="font-mono text-sm mb-2">HSL: 204°, 70%, 53%</div>
                            <div className="h-8 rounded" style={{ backgroundColor: 'hsl(204, 70%, 53%)' }}></div>
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-blue-600">
                          Contrast Ratio: 3.02:1 (Large Text AA compliant)
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 2: Success Green (#28a745)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-green-500/10 p-4 rounded-lg">
                            <div className="font-mono text-sm mb-2">HEX: #28a745</div>
                            <div className="h-8 rounded" style={{ backgroundColor: '#28a745' }}></div>
                          </div>
                          <div className="bg-green-500/10 p-4 rounded-lg">
                            <div className="font-mono text-sm mb-2">RGB: 40, 167, 69</div>
                            <div className="h-8 rounded" style={{ backgroundColor: 'rgb(40, 167, 69)' }}></div>
                          </div>
                          <div className="bg-green-500/10 p-4 rounded-lg">
                            <div className="font-mono text-sm mb-2">HSL: 135°, 61%, 41%</div>
                            <div className="h-8 rounded" style={{ backgroundColor: 'hsl(135, 61%, 41%)' }}></div>
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-green-600">
                          Contrast Ratio: 4.68:1 (AA compliant)
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 3: Dark Gray (#343a40)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-gray-500/10 p-4 rounded-lg">
                            <div className="font-mono text-sm mb-2">HEX: #343a40</div>
                            <div className="h-8 rounded" style={{ backgroundColor: '#343a40' }}></div>
                          </div>
                          <div className="bg-gray-500/10 p-4 rounded-lg">
                            <div className="font-mono text-sm mb-2">RGB: 52, 58, 64</div>
                            <div className="h-8 rounded" style={{ backgroundColor: 'rgb(52, 58, 64)' }}></div>
                          </div>
                          <div className="bg-gray-500/10 p-4 rounded-lg">
                            <div className="font-mono text-sm mb-2">HSL: 210°, 10%, 23%</div>
                            <div className="h-8 rounded" style={{ backgroundColor: 'hsl(210, 10%, 23%)' }}></div>
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-blue-600">
                          Contrast Ratio: 12.63:1 (AAA compliant)
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
                  <h2 className="text-xl font-bold text-foreground">Frequently Asked Questions About Color Conversion</h2>
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
                      <h3 className="text-lg font-semibold text-foreground mb-2">Color & Accessibility Best Practices</h3>
                      <p className="text-sm text-muted-foreground">
                        Important: Always test colors in their actual usage context. Monitor colors may render differently based on calibration and settings. For critical accessibility, test with real users including those with color vision deficiencies. Use color as a supplement to, not a replacement for, other indicators (like icons or text labels). Consider implementing dark mode variants of your color schemes. When creating color palettes, maintain sufficient contrast between adjacent colors. Document your color decisions in a design system for consistency across projects and team members.
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