'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowLeftRight, Copy, RotateCcw, ChevronDown, ChevronUp, Database, HardDrive, Cpu, Server, Wifi, Cloud, Download, Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '../../hooks/use-toast';
import Link from 'next/link';

const DataSizeConverter = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState('byte');
  const [toUnit, setToUnit] = useState('kilobyte');
  const [result, setResult] = useState<string>('');
  const { toast } = useToast();
  const [openSections, setOpenSections] = useState({
    whatItDoes: false,
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

  // Related tools for Unit Converter category
  const relatedTools = [
    { name: 'Length Converter', path: '/unit-tools/length-converter', icon: Database },
    { name: 'Weight Converter', path: '/unit-tools/weight-converter', icon: Database },
    { name: 'Temperature Converter', path: '/unit-tools/temperature-converter', icon: Cpu },
    { name: 'Time Converter', path: '/unit-tools/time-converter', icon: Database },
    { name: 'Speed Converter', path: '/unit-tools/speed-converter', icon: Wifi },
    { name: 'Area Converter', path: '/unit-tools/area-converter', icon: Database },
    { name: 'Volume Converter', path: '/unit-tools/volume-converter', icon: Database }
  ];

  // FAQ Data
  const faqData = [
    {
      question: "What's the difference between binary (1024) and decimal (1000) data size units?",
      answer: "Binary units (KiB, MiB, GiB) use base-2 calculations (1024), while decimal units (KB, MB, GB) use base-10 (1000). Operating systems typically report using binary units, while storage manufacturers often use decimal units. This calculator uses binary (1024-based) conversion for accurate computer science calculations."
    },
    {
      question: "Why does 1 GB sometimes show as less than 1000 MB on my computer?",
      answer: "This happens because computers use binary calculations (1 GB = 1024 MB) while some storage manufacturers use decimal calculations (1 GB = 1000 MB). When a drive is advertised as 1 TB (1,000,000,000,000 bytes), your computer shows it as about 931 GB because it divides by 1024³ instead of 1000³."
    },
    {
      question: "How accurate is this data size conversion calculator?",
      answer: "The calculator provides precise conversions using exact binary factors (powers of 1024) with results accurate to 10 decimal places. It handles conversions from bits to petabytes and accounts for the precise mathematical relationships between all data size units, making it suitable for technical, educational, and professional applications."
    },
    {
      question: "What's the difference between bits and bytes?",
      answer: "A bit (b) is the smallest unit of digital data (0 or 1). A byte (B) consists of 8 bits. Bytes are used for file sizes and storage capacity, while bits are used for data transmission speeds (Mbps, Gbps). This is crucial when comparing internet speeds (bits) with file sizes (bytes)."
    },
    {
      question: "When should I use petabytes or terabytes in real-world scenarios?",
      answer: "Terabytes (TB) are used for personal computer storage, external drives, and moderate server storage. Petabytes (PB) are used for enterprise data centers, cloud storage platforms, big data analytics, and scientific research datasets. As data grows exponentially, petabytes are becoming more common in large-scale applications."
    }
  ];

  const dataSizeUnits = {
    bit: { name: 'Bit', abbreviation: 'b', factor: 0.125 },
    byte: { name: 'Byte', abbreviation: 'B', factor: 1 },
    kilobyte: { name: 'Kilobyte', abbreviation: 'KB', factor: 1024 },
    megabyte: { name: 'Megabyte', abbreviation: 'MB', factor: 1048576 },
    gigabyte: { name: 'Gigabyte', abbreviation: 'GB', factor: 1073741824 },
    terabyte: { name: 'Terabyte', abbreviation: 'TB', factor: 1099511627776 },
    petabyte: { name: 'Petabyte', abbreviation: 'PB', factor: 1125899906842624 }
  };

  const convertDataSize = () => {
    if (!inputValue || isNaN(Number(inputValue))) {
      setResult('');
      return;
    }

    const value = Number(inputValue);
    const fromFactor = dataSizeUnits[fromUnit as keyof typeof dataSizeUnits].factor;
    const toFactor = dataSizeUnits[toUnit as keyof typeof dataSizeUnits].factor;
    
    const bytes = value * fromFactor;
    const converted = bytes / toFactor;
    
    setResult(converted.toFixed(10).replace(/\.?0+$/, ''));
  };

  useEffect(() => {
    convertDataSize();
  }, [inputValue, fromUnit, toUnit]);

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const clearAll = () => {
    setInputValue('');
    setResult('');
  };

  const copyResult = async () => {
    if (result) {
      await navigator.clipboard.writeText(result);
      toast({
        title: "Copied!",
        description: "Result copied to clipboard",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background font-inter">
      <title>Data Size Converter | Bytes to MB, GB, TB, PB, Bits Conversion | GrockTool.com</title>
      <meta name="description" content="Free online data size converter. Convert between bytes, kilobytes, megabytes, gigabytes, terabytes, petabytes, and bits instantly. Perfect for IT professionals, students, and digital storage calculations." />
      <meta name="keywords" content="data size converter, byte to megabyte, gigabyte to terabyte, mb to gb, tb to pb, bit to byte, data storage conversion, digital storage calculator, computer storage units, file size converter" />
      <meta property="og:title" content="Data Size Converter | Bytes to MB, GB, TB, PB, Bits Conversion" />
      <meta property="og:description" content="Free online data size converter. Convert between bytes, kilobytes, megabytes, gigabytes, terabytes, petabytes, and bits instantly." />
      <link rel="canonical" href="https://grocktool.com/unit-tools/data-size-converter" />
      
      <div className="pt-20 pb-8 px-4 sm:pt-24 sm:pb-12 sm:px-6 lg:pt-28">
        <div className="max-w-lg mx-auto lg:max-w-6xl">
          {/* Enhanced Header */}
          <div className="mb-8 sm:mb-12">
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
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 px-4 py-2 rounded-full mb-4 border border-blue-500/20">
                <Database size={16} className="text-blue-600" />
                <span className="text-sm font-medium text-blue-600">Digital Storage • IT • Computer Science • Data Analytics</span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                Data Size Converter
                <span className="block text-lg sm:text-xl lg:text-2xl font-normal text-muted-foreground mt-2">
                  Convert Bytes • Megabytes • Gigabytes • Terabytes • Petabytes • Bits • Digital Storage
                </span>
              </h1>
              
              <div className="flex flex-wrap justify-center gap-4 mt-6 mb-8">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 rounded-lg">
                  <Database size={14} className="text-blue-600" />
                  <span className="text-xs sm:text-sm text-foreground">Bytes to MB/GB</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-lg">
                  <HardDrive size={14} className="text-green-600" />
                  <span className="text-xs sm:text-sm text-foreground">Storage Capacity</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 rounded-lg">
                  <Cpu size={14} className="text-purple-600" />
                  <span className="text-xs sm:text-sm text-foreground">Computer Science</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 rounded-lg">
                  <Cloud size={14} className="text-amber-600" />
                  <span className="text-xs sm:text-sm text-foreground">Cloud Storage</span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Converter & Results */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Examples Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <div className="space-y-3">
                  <div className="text-xs text-muted-foreground">Common Data Conversions:</div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                    <button
                      onClick={() => {
                        setFromUnit('megabyte');
                        setToUnit('gigabyte');
                        setInputValue('1024');
                      }}
                      className="px-3 py-2 bg-blue-500/10 text-blue-600 rounded-lg hover:bg-blue-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Database size={12} />
                      1024 MB to GB
                    </button>
                    <button
                      onClick={() => {
                        setFromUnit('gigabyte');
                        setToUnit('terabyte');
                        setInputValue('1');
                      }}
                      className="px-3 py-2 bg-green-500/10 text-green-600 rounded-lg hover:bg-green-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <HardDrive size={12} />
                      1 GB to TB
                    </button>
                    <button
                      onClick={() => {
                        setFromUnit('byte');
                        setToUnit('kilobyte');
                        setInputValue('1048576');
                      }}
                      className="px-3 py-2 bg-purple-500/10 text-purple-600 rounded-lg hover:bg-purple-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Cpu size={12} />
                      1 MB in KB
                    </button>
                    <button
                      onClick={() => {
                        setFromUnit('byte');
                        setToUnit('bit');
                        setInputValue('1');
                      }}
                      className="px-3 py-2 bg-amber-500/10 text-amber-600 rounded-lg hover:bg-amber-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Wifi size={12} />
                      1 Byte to Bits
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Main Converter Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Database size={20} className="text-foreground" />
                      <label className="block text-sm font-medium text-foreground">
                        Data Size Converter
                      </label>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-blue-600">
                      <Database size={12} />
                      <span>Binary (1024-based) conversion</span>
                    </div>
                  </div>

                  {/* Input Section */}
                  <div className="space-y-4">
                    {/* From Unit */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">From</label>
                      <div className="flex gap-2 sm:gap-3">
                        <input
                          type="number"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          placeholder="Enter data size"
                          className="flex-1 p-3 sm:p-4 text-base bg-input border border-border rounded-lg sm:rounded-xl focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-ring focus:ring-opacity-50"
                        />
                        <select
                          value={fromUnit}
                          onChange={(e) => setFromUnit(e.target.value)}
                          className="w-24 sm:w-28 p-3 sm:p-4 bg-input border border-border rounded-lg sm:rounded-xl focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-ring focus:ring-opacity-50 text-sm sm:text-base"
                        >
                          {Object.entries(dataSizeUnits).map(([key, unit]) => (
                            <option key={key} value={key}>{unit.name} ({unit.abbreviation})</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Swap Button */}
                    <div className="flex justify-center">
                      <button
                        onClick={swapUnits}
                        className="p-2 sm:p-3 bg-accent text-accent-foreground rounded-lg sm:rounded-xl hover:bg-accent/80 transition-all duration-200 transform hover:scale-105"
                        aria-label="Swap units"
                      >
                        <ArrowLeftRight size={18} className="sm:w-5 sm:h-5" />
                      </button>
                    </div>

                    {/* To Unit */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">To</label>
                      <div className="flex gap-2 sm:gap-3">
                        <div className="flex-1 relative">
                          <input
                            type="text"
                            value={result}
                            readOnly
                            placeholder="Result"
                            className="w-full p-3 sm:p-4 text-base bg-muted border border-border rounded-lg sm:rounded-xl focus:outline-none"
                          />
                          {result && (
                            <button
                              onClick={copyResult}
                              className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 p-1 sm:p-2 hover:bg-secondary rounded transition-colors"
                              aria-label="Copy result"
                            >
                              <Copy size={16} className="sm:w-4 sm:h-4 text-muted-foreground" />
                            </button>
                          )}
                        </div>
                        <select
                          value={toUnit}
                          onChange={(e) => setToUnit(e.target.value)}
                          className="w-24 sm:w-28 p-3 sm:p-4 bg-input border border-border rounded-lg sm:rounded-xl focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-ring focus:ring-opacity-50 text-sm sm:text-base"
                        >
                          {Object.entries(dataSizeUnits).map(([key, unit]) => (
                            <option key={key} value={key}>{unit.name} ({unit.abbreviation})</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Data Size Tips */}
                  <div className="p-3 bg-gradient-to-r from-secondary/20 to-secondary/10 rounded-lg border border-border">
                    <div className="text-xs font-medium text-foreground mb-1">Data Size Conversion Tips:</div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>• 1 Byte = 8 Bits (fundamental digital unit conversion)</div>
                      <div>• 1 Kilobyte (KB) = 1024 Bytes (binary system)</div>
                      <div>• 1 Megabyte (MB) = 1024 Kilobytes (not 1000)</div>
                      <div>• 1 Gigabyte (GB) = 1024 Megabytes (computer memory)</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={convertDataSize}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all text-sm sm:text-base font-medium shadow-md hover:shadow-lg"
                    >
                      <Database size={16} className="sm:w-4 sm:h-4" />
                      Convert Data Size
                    </button>
                    <button
                      onClick={clearAll}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg sm:rounded-xl hover:bg-secondary/80 transition-colors text-sm sm:text-base font-medium"
                    >
                      <RotateCcw size={16} className="sm:w-4 sm:h-4" />
                      Clear All
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Data Size Guide Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Database size={18} className="text-blue-600" />
                  Data Size Conversion Complete Guide
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  {/* Basic Units */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-blue-500/10 p-2 rounded-lg">
                        <Database size={16} className="text-blue-600" />
                      </div>
                      <h4 className="text-sm font-medium text-foreground">Fundamental Data Units</h4>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Bit (b):</strong> Smallest unit, represents 0 or 1, used for data transmission</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Byte (B):</strong> 8 bits, basic unit for storage and file sizes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Kilobyte (KB):</strong> 1024 bytes, used for small documents and images</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Megabyte (MB):</strong> 1024 KB, used for songs, photos, documents</span>
                      </div>
                    </div>
                  </div>

                  {/* Large Units */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-green-500/10 p-2 rounded-lg">
                        <HardDrive size={16} className="text-green-600" />
                      </div>
                      <h4 className="text-sm font-medium text-foreground">Large Storage Units</h4>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Gigabyte (GB):</strong> 1024 MB, used for movies, software, games</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Terabyte (TB):</strong> 1024 GB, used for hard drives, backup storage</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Petabyte (PB):</strong> 1024 TB, used for data centers, big data</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Exabyte (EB):</strong> 1024 PB, global data traffic, internet</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-lg border border-blue-500/20">
                  <h4 className="text-sm font-medium text-foreground mb-2">Real-World Data Size Examples</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-muted-foreground">
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-foreground">Text Document</span>
                      <span className="font-mono">10-100 KB</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-foreground">High-Quality Photo</span>
                      <span className="font-mono">2-5 MB</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-foreground">MP3 Song</span>
                      <span className="font-mono">3-5 MB</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-foreground">HD Movie</span>
                      <span className="font-mono">1-3 GB</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Info Section */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">Data Size Systems Explained</h3>
                <div className="space-y-2 text-muted-foreground text-sm">
                  <p>
                    Digital data uses binary (base-2) numbering system where each higher unit equals 1024 
                    (2¹⁰) of the previous unit. This differs from metric decimal system (base-10) used 
                    for other measurements.
                  </p>
                  <div className="text-xs sm:text-sm space-y-1 pt-2">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                      <span>Enter the data size value you want to convert</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                      <span>Select the unit you're converting from</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                      <span>Select the unit you're converting to</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                      <span>View instant conversion results with binary precision</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                      <span>Use swap button to reverse the conversion direction</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm space-y-2 pt-3">
                    <div className="font-medium text-foreground">Binary (1024) System:</div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span><strong>1 KB = 1024 B:</strong> Kilobyte, used by operating systems</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span><strong>1 MB = 1024 KB:</strong> Megabyte, accurate for RAM and file systems</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span><strong>1 GB = 1024 MB:</strong> Gigabyte, computer memory measurement</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm space-y-2 pt-3">
                    <div className="font-medium text-foreground">Decimal (1000) System:</div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span><strong>1 KB = 1000 B:</strong> Sometimes used by storage manufacturers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span><strong>1 MB = 1000 KB:</strong> Network bandwidth and some storage devices</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span><strong>1 GB = 1000 MB:</strong> Marketing for hard drives and SSDs</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm space-y-2 pt-3">
                    <div className="font-medium text-foreground">Bits vs Bytes:</div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                      <span><strong>Internet Speeds:</strong> Measured in bits per second (Mbps, Gbps)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                      <span><strong>File Sizes:</strong> Measured in bytes (KB, MB, GB download sizes)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                      <span><strong>Conversion:</strong> Divide Mbps by 8 to get MB/s download speed</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm space-y-2 pt-3">
                    <div className="font-medium text-foreground">Practical Applications:</div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-amber-500 rounded-full"></div>
                      <span><strong>Storage Planning:</strong> Calculate actual usable space on drives</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-amber-500 rounded-full"></div>
                      <span><strong>Download Time:</strong> Convert between internet speed and file size</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-amber-500 rounded-full"></div>
                      <span><strong>Data Transfer:</strong> Calculate backup times and transfer durations</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* SEO Content Section with Dropdowns */}
          <section className="space-y-4 mt-12">
            {/* What This Tool Does - Dropdown */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('whatItDoes')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500/10 p-2 rounded-lg">
                    <Database size={20} className="text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Data Size Converter - Features & Digital Storage Systems</h2>
                </div>
                {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.whatItDoes && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground mb-4">
                    This Data Size Converter is an essential tool for accurately converting between different digital storage units using the binary system (base-2, 1024-based conversions). It handles conversions from the smallest unit (bits) to the largest practical units (petabytes), including bytes, kilobytes, megabytes, gigabytes, and terabytes. The calculator provides precise conversions crucial for IT professionals, computer science students, system administrators, and anyone working with digital storage, file sizes, or data transfer calculations. With real-time computation and accuracy to ten decimal places, this tool eliminates confusion between binary and decimal systems, ensuring correct calculations for storage planning, bandwidth estimation, and data management.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Database size={18} className="text-blue-600" />
                        <h3 className="font-semibold text-foreground">Binary System Conversions</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Convert using accurate binary factors (1024-based) as used by operating systems and computer memory. Essential for IT professionals and accurate storage calculations.</p>
                    </div>
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <HardDrive size={18} className="text-green-600" />
                        <h3 className="font-semibold text-foreground">Storage Capacity Planning</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Calculate actual usable storage space, plan backup strategies, and understand the real capacity of hard drives, SSDs, and cloud storage solutions.</p>
                    </div>
                    <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Wifi size={18} className="text-purple-600" />
                        <h3 className="font-semibold text-foreground">Bandwidth & Transfer Calculations</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Convert between bits (network speeds) and bytes (file sizes) to estimate download times, upload durations, and data transfer requirements accurately.</p>
                    </div>
                    <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Cloud size={18} className="text-amber-600" />
                        <h3 className="font-semibold text-foreground">Cloud & Enterprise Data</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Handle large-scale data conversions for enterprise storage, data centers, cloud computing, and big data analytics involving terabytes and petabytes.</p>
                    </div>
                  </div>
                </div>
              )}
            </article>

            {/* Use Cases Section - Dropdown */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('useCases')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-green-500/10 p-2 rounded-lg">
                    <Database size={20} className="text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Data Size Conversion Applications</h2>
                </div>
                {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.useCases && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">💻 IT & System Administration</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Storage Capacity Planning:</strong> Convert between bytes, megabytes, gigabytes, and terabytes to accurately plan server storage, allocate disk space, and manage data center capacity for enterprise IT infrastructure</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Backup Strategy Calculation:</strong> Convert backup sizes to estimate storage requirements, calculate backup windows, and plan disaster recovery storage needs for business continuity planning</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Network Bandwidth Planning:</strong> Convert between bits (network speeds) and bytes (file sizes) to design network infrastructure, estimate data transfer times, and optimize bandwidth allocation for organizational needs</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Virtual Machine Allocation:</strong> Convert storage requirements for virtual machines, allocate appropriate disk space, and manage hypervisor storage resources in virtualized environments</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">🎓 Education & Computer Science</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Computer Science Instruction:</strong> Teach binary number system, data representation, and storage hierarchy concepts with practical conversion examples for computer science and IT education programs</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Programming & Development:</strong> Convert data sizes for memory allocation, buffer sizing, and file handling in software development, ensuring efficient memory management and optimal performance</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Database Management:</strong> Calculate database storage requirements, index sizes, and backup needs for database administration, data warehousing, and business intelligence applications</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Academic Research Data:</strong> Convert research dataset sizes, calculate storage needs for experimental data, and plan data management strategies for scientific computing and academic projects</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">📊 Business & Personal Use</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Cloud Storage Management:</strong> Convert between storage units to understand cloud pricing, estimate monthly costs, and optimize cloud storage plans for personal and business cloud services</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Digital Media Production:</strong> Convert video file sizes, calculate storage needs for photography projects, and plan storage for multimedia production workflows in creative industries</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Home Network Planning:</strong> Convert internet speeds (Mbps) to download times for movies, games, and software updates to optimize home network setup and streaming services</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Device Storage Comparison:</strong> Compare actual storage capacity of smartphones, tablets, laptops, and external drives by converting advertised capacities to usable space calculations</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </article>

            {/* How to Use - Dropdown */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('howToUse')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-amber-500/10 p-2 rounded-lg">
                    <Database size={20} className="text-amber-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">How to Use Data Size Converter - Complete Guide</h2>
                </div>
                {openSections.howToUse ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.howToUse && (
                <div className="px-6 pb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Step-by-Step Instructions</h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                          <div>
                            <div className="font-medium text-foreground">Enter Data Size Value</div>
                            <div className="text-sm text-muted-foreground">Input the numerical data size you want to convert. Use decimal numbers for precise measurements like 1.5 GB or 250.75 MB.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                          <div>
                            <div className="font-medium text-foreground">Select Source Unit</div>
                            <div className="text-sm text-muted-foreground">Choose the unit of the data size you entered from the dropdown menu (e.g., bytes, megabytes, gigabytes, bits).</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                          <div>
                            <div className="font-medium text-foreground">Select Target Unit</div>
                            <div className="text-sm text-muted-foreground">Choose the unit you want to convert to from the second dropdown menu, ranging from bits to petabytes.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">4</div>
                          <div>
                            <div className="font-medium text-foreground">View & Apply Results</div>
                            <div className="text-sm text-muted-foreground">The converted data size appears instantly. Use the copy button to save results for documentation, planning, or calculations.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Pro Data Conversion Tips</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <div className="bg-blue-500/20 p-1 rounded mt-0.5">
                            <Database size={12} className="text-blue-500" />
                          </div>
                          <span><strong>Quick Common Conversions:</strong> Use the quick buttons for standard conversions like 1024 MB to GB or 1 Byte to 8 Bits for common calculations</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-green-500/20 p-1 rounded mt-0.5">
                            <ArrowLeftRight size={12} className="text-green-500" />
                          </div>
                          <span><strong>Reverse Calculations:</strong> Click the swap button to instantly reverse your conversion without re-entering values for bidirectional calculations</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-purple-500/20 p-1 rounded mt-0.5">
                            <Wifi size={12} className="text-purple-500" />
                          </div>
                          <span><strong>Internet Speed Conversion:</strong> Remember 8 bits = 1 byte when converting Mbps (network speed) to MB/s (download speed) for accurate time estimates</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-amber-500/20 p-1 rounded mt-0.5">
                            <HardDrive size={12} className="text-amber-500" />
                          </div>
                          <span><strong>Storage Reality Check:</strong> Account for formatting overhead (typically 5-10%) when converting advertised storage to actual usable space</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-red-500/20 p-1 rounded mt-0.5">
                            <Copy size={12} className="text-red-500" />
                          </div>
                          <span><strong>Documentation & Reporting:</strong> Use the copy function to save conversion results for IT documentation, project plans, or technical reports</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </article>

            {/* Example Input and Output Section */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('examples')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-purple-500/10 p-2 rounded-lg">
                    <Database size={20} className="text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Data Size Conversion Examples</h2>
                </div>
                {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.examples && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">Common Data Size Conversion Examples</h3>
                      <div className="overflow-x-auto">
                        <div className="min-w-full inline-block align-middle">
                          <div className="overflow-hidden border border-border rounded-lg">
                            <table className="min-w-full divide-y divide-border">
                              <thead className="bg-secondary/20">
                                <tr>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">From</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">To</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Conversion Factor</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Example</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Binary Result</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-border">
                                <tr>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">1 Megabyte</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">Kilobytes</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">× 1024</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">5 MB</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">5120 KB</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">1 Gigabyte</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">Megabytes</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">× 1024</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">2.5 GB</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">2560 MB</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">1 Terabyte</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">Gigabytes</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">× 1024</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">1 TB</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">1024 GB</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">1 Byte</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">Bits</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">× 8</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">100 B</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">800 b</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">1 Petabyte</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">Terabytes</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">× 1024</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">0.5 PB</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">512 TB</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Detailed Example: Cloud Storage Planning</h3>
                      <div className="bg-secondary/20 p-4 rounded-lg border border-border overflow-x-auto">
                        <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
{`Example: Planning enterprise cloud storage migration

Scenario: Company needs to migrate 50 TB of data to cloud storage
with 100 Mbps internet connection. Calculate migration time and costs.

Step 1: Convert Total Data Size
50 Terabytes to various units:
• 50 TB × 1024 = 51,200 GB
• 50 TB × 1024² = 52,428,800 MB
• 50 TB × 1024³ = 53,687,091,200 KB
• 50 TB × 1024⁴ = 54,975,581,388,800 Bytes

Step 2: Calculate Actual Transfer Size
Accounting for overhead (compression, encryption, metadata):
Assume 10% overhead for realistic planning:
• Actual transfer size = 50 TB × 1.10 = 55 TB
• 55 TB = 55 × 1024 = 56,320 GB
• 55 TB = 56,320 × 1024 = 57,671,680 MB

Step 3: Convert Internet Speed
100 Mbps (Megabits per second) to Megabytes per second:
• 100 Mbps ÷ 8 = 12.5 MB/s (Megabytes per second)
This is the maximum theoretical transfer speed.

Step 4: Calculate Realistic Transfer Speed
Account for network overhead (typically 80-90% efficiency):
• Realistic speed = 12.5 MB/s × 0.85 = 10.625 MB/s
• Or in other units: 10.625 MB/s × 8 = 85 Mbps

Step 5: Calculate Transfer Time
Total data in MB: 57,671,680 MB
Transfer speed: 10.625 MB/s
• Time = 57,671,680 MB ÷ 10.625 MB/s = 5,427,922 seconds
• Convert to hours: 5,427,922 ÷ 3600 = 1,507.76 hours
• Convert to days: 1,507.76 ÷ 24 = 62.82 days

Step 6: Consider Parallel Transfer
Using 4 parallel connections (if supported):
• Effective speed = 10.625 MB/s × 4 = 42.5 MB/s
• Time = 57,671,680 MB ÷ 42.5 MB/s = 1,356,863 seconds
• In hours: 1,356,863 ÷ 3600 = 376.91 hours
• In days: 376.91 ÷ 24 = 15.70 days

Step 7: Calculate Cloud Storage Costs
Assuming cloud storage costs $0.02 per GB per month:
• 50 TB = 51,200 GB
• Monthly cost = 51,200 GB × $0.02 = $1,024
• Annual cost = $1,024 × 12 = $12,288

Step 8: Calculate Data Transfer Costs
Assuming $0.05 per GB transferred out:
• 50 TB = 51,200 GB
• Transfer cost = 51,200 × $0.05 = $2,560

Step 9: Total First-Year Cost
• Storage: $12,288
• Data transfer: $2,560
• Total: $14,848

Step 10: Break Down by Business Units
For departmental allocation:
• Marketing: 15 TB = 15,360 GB = $307.20/month
• Sales: 10 TB = 10,240 GB = $204.80/month
• Engineering: 20 TB = 20,480 GB = $409.60/month
• Finance: 5 TB = 5,120 GB = $102.40/month

Step 11: Optimize Strategy
Based on calculations:
• Migration will take 15.7 days with 4 parallel connections
• First-year cost: $14,848
• Monthly ongoing: $1,024
• Consider data tiering: Move rarely accessed data to cheaper storage

Step 12: Practical Considerations
• Bandwidth throttling during business hours
• Data verification and integrity checks
• Incremental migration vs. big bang approach
• Backup and rollback planning

Final Planning Summary:
Data Migration Project - 50 TB to Cloud
• Technical: 15.7 days migration time (4 parallel connections)
• Financial: $14,848 first year, $1,024/month ongoing
• Strategic: Departmental allocation prepared
• Risk: 10% overhead accounted for, backup plan needed

Recommendations:
1. Schedule migration over 3 weeks (15 business days)
2. Allocate $15,000 budget for first year
3. Implement data lifecycle management from start
4. Monitor actual vs. estimated performance weekly`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </article>

            {/* Frequently Asked Questions (FAQs) */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('faqs')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500/10 p-2 rounded-lg">
                    <Database size={20} className="text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Frequently Asked Questions</h2>
                </div>
                {openSections.faqs ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.faqs && (
                <div className="px-6 pb-6">
                  <div className="space-y-6">
                    {faqData.map((faq, index) => (
                      <div key={index} className="pb-4 border-b border-border/50 last:border-0">
                        <h3 className="text-lg font-semibold text-foreground mb-2">{faq.question}</h3>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </div>
                    ))}
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
                <h2 className="text-xl font-bold text-foreground">More Unit Converter Tools</h2>
                {openSections.relatedTools ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.relatedTools && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground mb-4">
                    Explore other useful unit conversion tools from our Unit Converter category:
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
  );
};

export default DataSizeConverter;