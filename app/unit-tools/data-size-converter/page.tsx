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
    digitalStorageUnits: false,
    binaryVsDecimal: false,
    itCloudUsage: false,
    conversionStandards: false,
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
      question: "Why does my 1TB hard drive show up as only 931GB on my computer?",
      answer: "Hard drive manufacturers use decimal units (1TB = 1,000,000,000,000 bytes) while your computer uses binary (1TB = 1,099,511,627,776 bytes). When the drive's 1 trillion bytes get divided by 1,099.5 billion bytes per binary terabyte, you get about 0.909 terabytes, which equals roughly 931 gigabytes. That 'missing' 69GB isn't really missing - it's just different measurement systems."
    },
    {
      question: "How long will it take to download a 50GB game with my 100Mbps internet?",
      answer: "First, convert 100 megabits per second to megabytes: 100 ÷ 8 = 12.5 MB/s. A 50GB file is 50 × 1024 = 51,200 MB. Divide that by 12.5 MB/s = 4,096 seconds, or about 68 minutes. But real-world speeds are usually 80-90% of advertised, so plan for 75-85 minutes. Also, your internet provider probably measures in megabits (small 'b'), while downloads show megabytes (capital 'B')."
    },
    {
      question: "What's the difference between RAM in GB and SSD storage in GB?",
      answer: "Technically, they're the same unit - 1 gigabyte equals 1,073,741,824 bytes. But in practice, RAM manufacturers are more precise because memory chips work in exact binary multiples. Storage devices often use decimal approximations for marketing. Both should be the same, but you might see slight variations in how different manufacturers report capacities."
    },
    {
      question: "How much storage do I really need for 10,000 photos?",
      answer: "It depends on the photo quality. Smartphone photos average 2-4MB each, so 10,000 would be 20-40GB. DSLR raw files can be 25-50MB each, totaling 250-500GB. Compressed JPEGs might be 1MB each, so 10GB. A good rule: estimate 3MB per photo for modern smartphone pictures, then add 20% for apps, videos, and other files. So 10,000 photos ≈ 36GB plus overhead."
    },
    {
      question: "Why do some cloud services charge per GB while others offer unlimited storage?",
      answer: "Services charging per GB (like AWS, Google Cloud) are infrastructure providers selling exact resources. 'Unlimited' services (like some personal cloud plans) use statistical models - they know most users store under 100GB, and the few heavy users balance out. Unlimited isn't truly infinite; there's always fair usage policies. For businesses, per-GB pricing is more transparent and scalable."
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
            {/* Digital Storage Units */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('digitalStorageUnits')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500/10 p-2 rounded-lg">
                    <Database size={20} className="text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Digital Storage Units - What They Really Mean</h2>
                </div>
                {openSections.digitalStorageUnits ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.digitalStorageUnits && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-muted-foreground mb-4">
                        Understanding data sizes isn't just about memorizing conversion factors. It's about knowing what each unit represents in practical terms. Let's break down what these measurements actually mean in everyday use, from the tiny bit to the massive petabyte.
                      </p>
                      
                      <div className="space-y-4">
                        <div className="bg-blue-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">Bits & Bytes - The Foundation</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            A <strong>bit</strong> is the smallest possible piece of digital information - it's either a 0 or a 1. Think of it like a light switch: either on or off. Eight of these switches together make a <strong>byte</strong>, which can represent a single character like the letter 'A' or the number '7'.
                          </p>
                          <p className="text-sm text-muted-foreground">
                            What's confusing is that we measure internet speed in <strong>bits per second</strong> (Mbps) but file sizes in <strong>bytes</strong>. When your ISP says you have 100 Mbps internet, divide by 8 to get your actual download speed in megabytes per second: about 12.5 MB/s. That's why a 100 MB file doesn't download in 1 second with 100 Mbps internet.
                          </p>
                        </div>
                        
                        <div className="bg-green-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">Kilobytes to Megabytes - Everyday Files</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            A <strong>kilobyte</strong> (1024 bytes) holds about half a page of plain text. A typical Word document without images might be 50-100 KB. An average webpage with basic images loads about 1-2 MB of data.
                          </p>
                          <p className="text-sm text-muted-foreground">
                            <strong>Megabytes</strong> are where things get interesting. A 3-minute MP3 song is about 3-5 MB. A smartphone photo taken today is 2-4 MB. A 10-page PDF with images might be 2 MB. Back in the 90s, a 1.44 MB floppy disk felt huge - now that's barely one decent photo.
                          </p>
                        </div>
                        
                        <div className="bg-purple-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">Gigabytes - The Modern Standard</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            <strong>Gigabytes</strong> (1024 MB) are what we deal with daily. Your smartphone probably has 64-256 GB. A typical laptop comes with 256 GB to 1 TB. A high-definition movie is 1-3 GB. Windows 10 installation needs about 20 GB. A AAA video game these days? 50-100 GB easily.
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Here's a practical comparison: 1 GB can hold about:
                            <ul className="mt-2 space-y-1 pl-4">
                              <li>• 250 songs (at 4 MB each)</li>
                              <li>• 500 photos (at 2 MB each)</li>
                              <li>• 1 hour of HD video</li>
                              <li>• 1000 Word documents</li>
                            </ul>
                          </p>
                        </div>
                        
                        <div className="bg-amber-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">Terabytes and Beyond - Big Data Era</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            <strong>Terabytes</strong> (1024 GB) used to be enterprise-only, but now 1-2 TB external drives are common. A 4TB drive can hold about 1 million photos or 1000 movies. YouTube uploads over 500 hours of video every minute - that's petabytes daily.
                          </p>
                          <p className="text-sm text-muted-foreground">
                            <strong>Petabytes</strong> (1024 TB) are mind-boggling. One petabyte could store 13.3 years of HD video. All the data in the US Library of Congress (excluding audio/video) is estimated at 10 TB - so 100 Libraries of Congress would fit in 1 PB. Yet companies like Google process exabytes (1000 PB) daily.
                          </p>
                        </div>
                        
                        <div className="bg-secondary/20 p-4 rounded-lg">
                          <h4 className="font-medium text-foreground mb-2">Quick Size Reference for Common Files</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                            <div className="space-y-2">
                              <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                                <span className="font-medium">Email (text only)</span>
                                <span className="font-mono">10-50 KB</span>
                              </div>
                              <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                                <span className="font-medium">Excel spreadsheet</span>
                                <span className="font-mono">100-500 KB</span>
                              </div>
                              <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                                <span className="font-medium">PowerPoint (with images)</span>
                                <span className="font-mono">2-10 MB</span>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                                <span className="font-medium">Mobile app</span>
                                <span className="font-mono">50-200 MB</span>
                              </div>
                              <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                                <span className="font-medium">Software suite (Office)</span>
                                <span className="font-mono">3-5 GB</span>
                              </div>
                              <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                                <span className="font-medium">4K movie</span>
                                <span className="font-mono">15-30 GB</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </article>

            {/* Binary vs Decimal System */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('binaryVsDecimal')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-green-500/10 p-2 rounded-lg">
                    <HardDrive size={20} className="text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Binary vs Decimal - The Storage Measurement Confusion</h2>
                </div>
                {openSections.binaryVsDecimal ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.binaryVsDecimal && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-muted-foreground mb-4">
                        The confusion between binary (1024) and decimal (1000) systems causes more frustration than almost any other tech issue. You buy a "1TB" hard drive, but your computer shows "931GB." Who's right? Actually, both are - they're just using different measurement systems.
                      </p>
                      
                      <div className="space-y-4">
                        <div className="bg-blue-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">Why Computers Use Binary (1024)</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            Computers think in binary - ones and zeros. Memory chips are built in powers of two: 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024. That last number, 1024 (which is 2¹⁰), became the natural breaking point between units.
                          </p>
                          <div className="bg-secondary/30 p-3 rounded mb-3">
                            <div className="text-sm font-medium mb-1">How binary progression works:</div>
                            <div className="text-xs grid grid-cols-2 gap-2">
                              <div>2 bytes = 16 bits</div>
                              <div>4 bytes = 32 bits</div>
                              <div>8 bytes = 64 bits</div>
                              <div>16 bytes = 128 bits</div>
                              <div>32 bytes = 256 bits</div>
                              <div>64 bytes = 512 bits</div>
                              <div>128 bytes = 1024 bits</div>
                              <div>256 bytes = 2048 bits</div>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            This binary alignment makes memory addressing and data retrieval more efficient. When your operating system reports file sizes, it uses these binary multiples because that's how the computer actually stores and accesses data.
                          </p>
                        </div>
                        
                        <div className="bg-green-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">Why Storage Companies Use Decimal (1000)</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            Hard drive manufacturers switched to decimal units in the late 1990s. Their reasoning? Consistency with other metric measurements (kilometer = 1000 meters, kilogram = 1000 grams) and bigger marketing numbers.
                          </p>
                          <div className="grid grid-cols-2 gap-3 mb-3">
                            <div className="text-center p-3 bg-red-500/10 rounded">
                              <div className="font-medium">Binary 1GB</div>
                              <div className="text-xs font-mono">1,073,741,824 bytes</div>
                              <div className="text-xs mt-1">(What your computer shows)</div>
                            </div>
                            <div className="text-center p-3 bg-blue-500/10 rounded">
                              <div className="font-medium">Decimal 1GB</div>
                              <div className="text-xs font-mono">1,000,000,000 bytes</div>
                              <div className="text-xs mt-1">(What drive box says)</div>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            That 7.3% difference adds up. A "1TB" (decimal) drive has 1 trillion bytes. Divide by binary gigabytes (1.074 billion bytes each) and you get 931GB. The drive isn't defective - it's exactly 1 trillion bytes as advertised.
                          </p>
                        </div>
                        
                        <div className="bg-purple-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">The Standards Battle: KiB vs KB</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            To solve the confusion, the International Electrotechnical Commission created new names in 1998:
                          </p>
                          <div className="overflow-x-auto">
                            <div className="min-w-full inline-block align-middle">
                              <div className="overflow-hidden border border-border rounded-lg">
                                <table className="min-w-full divide-y divide-border">
                                  <thead className="bg-secondary/20">
                                    <tr>
                                      <th className="px-4 py-2 text-left text-xs font-medium text-foreground">Binary (1024)</th>
                                      <th className="px-4 py-2 text-left text-xs font-medium text-foreground">Decimal (1000)</th>
                                      <th className="px-4 py-2 text-left text-xs font-medium text-foreground">Adoption</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-border">
                                    <tr>
                                      <td className="px-4 py-2 text-xs font-mono">KiB (Kibibyte)</td>
                                      <td className="px-4 py-2 text-xs font-mono">KB (Kilobyte)</td>
                                      <td className="px-4 py-2 text-xs">Tech-savvy users, Linux</td>
                                    </tr>
                                    <tr>
                                      <td className="px-4 py-2 text-xs font-mono">MiB (Mebibyte)</td>
                                      <td className="px-4 py-2 text-xs font-mono">MB (Megabyte)</td>
                                      <td className="px-4 py-2 text-xs">Technical documentation</td>
                                    </tr>
                                    <tr>
                                      <td className="px-4 py-2 text-xs font-mono">GiB (Gibibyte)</td>
                                      <td className="px-4 py-2 text-xs font-mono">GB (Gigabyte)</td>
                                      <td className="px-4 py-2 text-xs">Some operating systems</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-3">
                            Despite these official standards, most consumer software still uses KB/MB/GB for both systems, relying on context to tell which is which. Windows uses binary for file sizes but sometimes shows decimal for drive capacities. macOS switched to decimal entirely in recent versions.
                          </p>
                        </div>
                        
                        <div className="bg-amber-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">Practical Implications for You</h3>
                          <div className="space-y-3 text-sm">
                            <div className="flex items-start gap-2">
                              <div className="w-4 h-4 bg-red-500/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                                <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                              </div>
                              <span><strong>Buying storage:</strong> That 4TB external drive will show as about 3.64TB on your computer. It's not a scam - it's math. Plan your purchase accordingly.</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-4 h-4 bg-yellow-500/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                              </div>
                              <span><strong>Download estimates:</strong> If your internet is 100 Mbps (megabits), divide by 8.388608 (not 8) for exact binary MB/s: 11.92 MB/s, not 12.5 MB/s.</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-4 h-4 bg-green-500/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                              </div>
                              <span><strong>Backup planning:</strong> If you have 500GB of files, you need at least 500GB of binary space, which means buying a 550GB+ decimal drive.</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-4 h-4 bg-blue-500/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                              </div>
                              <span><strong>Cloud storage:</strong> Most cloud services use decimal (1000) for their plans. Your 1TB Google Drive is 1 trillion bytes, showing as 931GB on Windows.</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </article>

            {/* IT & Cloud Usage */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('itCloudUsage')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-purple-500/10 p-2 rounded-lg">
                    <Cloud size={20} className="text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">IT & Cloud Storage - Professional Data Management</h2>
                </div>
                {openSections.itCloudUsage ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.itCloudUsage && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-muted-foreground mb-4">
                        In professional IT and cloud environments, data size conversions aren't academic exercises - they're critical for budgeting, planning, and operations. Getting these calculations wrong can mean overspending by thousands or underestimating project timelines by weeks.
                      </p>
                      
                      <div className="space-y-4">
                        <div className="bg-blue-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">Cloud Cost Calculations - The Real Math</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            Cloud providers charge by the gigabyte-month. AWS S3 Standard storage costs about $0.023 per GB per month. That seems cheap until you do the math:
                          </p>
                          <div className="bg-secondary/30 p-3 rounded mb-3">
                            <div className="text-sm font-medium mb-1">Example: 50TB corporate data migration to cloud</div>
                            <div className="text-xs space-y-1">
                              <div>50 TB = 50,000 GB (using decimal for cloud pricing)</div>
                              <div>Monthly storage: 50,000 × $0.023 = $1,150</div>
                              <div>Annual cost: $1,150 × 12 = $13,800</div>
                              <div>Data transfer out (to users): 10% monthly = 5TB × $0.09/GB = $450/month</div>
                              <div><strong>Total first year: ~$19,000</strong></div>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            But here's the catch: your on-premises 50TB (binary) is actually 45.5TB in cloud decimal terms. Yet you'll likely need to upload all 50TB binary, which the cloud sees as 55TB decimal. That discrepancy affects both migration planning and ongoing costs.
                          </p>
                        </div>
                        
                        <div className="bg-green-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">Backup Window Planning</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            IT teams need to backup data within specific "backup windows" - typically overnight when systems are less busy. Calculating whether 500GB will fit in an 8-hour window involves careful conversions:
                          </p>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between border-b border-border/50 pb-2">
                              <div>Backup size: 500 GB (binary)</div>
                              <div className="font-mono">= 512,000 MB</div>
                            </div>
                            <div className="flex items-center justify-between border-b border-border/50 pb-2">
                              <div>Network throughput: 1 Gbps (gigabit)</div>
                              <div className="font-mono">= 125 MB/s (maximum)</div>
                            </div>
                            <div className="flex items-center justify-between border-b border-border/50 pb-2">
                              <div>Real speed (70% efficiency):</div>
                              <div className="font-mono">87.5 MB/s</div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div>Time required:</div>
                              <div className="font-mono">512,000 ÷ 87.5 = 5,851s = 1.63 hours</div>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-3">
                            This calculation shows the backup fits easily in an 8-hour window. But if you mistakenly used 500,000 MB (decimal) instead of 512,000 MB (binary), you'd underestimate by 12,000 MB - about 2.3 minutes at this speed. Small errors compound in large-scale operations.
                          </p>
                        </div>
                        
                        <div className="bg-purple-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">Virtual Machine Storage Allocation</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            When provisioning VMs in VMware or Hyper-V, you need to understand thin vs thick provisioning and how storage is actually allocated:
                          </p>
                          <div className="grid grid-cols-2 gap-3 mb-3">
                            <div className="p-3 bg-blue-500/10 rounded">
                              <div className="font-medium text-sm mb-1">Thin Provisioning</div>
                              <div className="text-xs">VM thinks it has 100GB, but only uses actual space needed. 20GB file = 20GB allocated. Efficient but can overcommit.</div>
                            </div>
                            <div className="p-3 bg-green-500/10 rounded">
                              <div className="font-medium text-sm mb-1">Thick Provisioning</div>
                              <div className="text-xs">100GB VM reserves 100GB immediately. Wastes space but guarantees availability. 20GB file still uses 100GB.</div>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            The conversion challenge comes when monitoring actual vs allocated space. A 2TB datastore showing 80% used might actually have 500GB free if VMs are thinly provisioned. But if all VMs suddenly write data, you could run out of physical space despite the dashboard showing 20% free.
                          </p>
                        </div>
                        
                        <div className="bg-amber-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">Database Sizing and Growth Projections</h3>
                          <div className="space-y-3 text-sm">
                            <div className="border-l-4 border-blue-500 pl-3 py-1">
                              <div className="font-medium text-foreground">SQL Server database</div>
                              <div className="text-muted-foreground">Starting size: 50GB. Monthly growth: 5GB. Annual projection: 50 + (5×12) = 110GB. But with indexes and logs, actual needed: 110 × 1.3 = 143GB.</div>
                            </div>
                            <div className="border-l-4 border-green-500 pl-3 py-1">
                              <div className="font-medium text-foreground">Backup retention policy</div>
                              <div className="text-muted-foreground">Daily full backups (143GB) kept for 30 days = 4.29TB. Plus transaction log backups every hour (2GB each × 24 × 30) = 1.44TB. Total: 5.73TB needed.</div>
                            </div>
                            <div className="border-l-4 border-purple-500 pl-3 py-1">
                              <div className="font-medium text-foreground">Cloud migration planning</div>
                              <div className="text-muted-foreground">5.73TB binary = 6.3TB decimal. At $0.023/GB-month = $145/month just for backup storage. Plus compute, transfer, and management costs.</div>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-3">
                            These calculations demonstrate why IT professionals need precise conversions. A 10% error in estimating database growth could mean running out of storage mid-quarter or overspending on cloud resources by thousands annually.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </article>

            {/* Conversion Standards */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('conversionStandards')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-red-500/10 p-2 rounded-lg">
                    <Database size={20} className="text-red-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Data Conversion Standards - Industry Practices</h2>
                </div>
                {openSections.conversionStandards ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.conversionStandards && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-muted-foreground mb-4">
                        Different industries and technologies have settled on different standards for data measurement. Knowing which standard applies to your situation prevents costly mistakes and ensures accurate planning.
                      </p>
                      
                      <div className="space-y-4">
                        <div className="bg-blue-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">Operating System Standards</h3>
                          <div className="overflow-x-auto">
                            <div className="min-w-full inline-block align-middle">
                              <div className="overflow-hidden border border-border rounded-lg">
                                <table className="min-w-full divide-y divide-border">
                                  <thead className="bg-secondary/20">
                                    <tr>
                                      <th className="px-4 py-2 text-left text-xs font-medium text-foreground">OS</th>
                                      <th className="px-4 py-2 text-left text-xs font-medium text-foreground">Standard Used</th>
                                      <th className="px-4 py-2 text-left text-xs font-medium text-foreground">File Size Display</th>
                                      <th className="px-4 py-2 text-left text-xs font-medium text-foreground">Drive Capacity Display</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-border">
                                    <tr>
                                      <td className="px-4 py-2 text-xs font-medium text-foreground">Windows 10/11</td>
                                      <td className="px-4 py-2 text-xs">Binary for files, Decimal for drives</td>
                                      <td className="px-4 py-2 text-xs">KB = 1024 bytes</td>
                                      <td className="px-4 py-2 text-xs">GB = 1 billion bytes</td>
                                    </tr>
                                    <tr>
                                      <td className="px-4 py-2 text-xs font-medium text-foreground">macOS (Recent)</td>
                                      <td className="px-4 py-2 text-xs">Decimal for everything</td>
                                      <td className="px-4 py-2 text-xs">KB = 1000 bytes</td>
                                      <td className="px-4 py-2 text-xs">GB = 1 billion bytes</td>
                                    </tr>
                                    <tr>
                                      <td className="px-4 py-2 text-xs font-medium text-foreground">Linux (most distros)</td>
                                      <td className="px-4 py-2 text-xs">Binary with KiB option</td>
                                      <td className="px-4 py-2 text-xs">KB = 1024 bytes (KiB available)</td>
                                      <td className="px-4 py-2 text-xs">GB = 1.074 billion bytes</td>
                                    </tr>
                                    <tr>
                                      <td className="px-4 py-2 text-xs font-medium text-foreground">Android</td>
                                      <td className="px-4 py-2 text-xs">Varies by manufacturer</td>
                                      <td className="px-4 py-2 text-xs">Usually decimal</td>
                                      <td className="px-4 py-2 text-xs">Usually decimal</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-3">
                            This inconsistency explains why the same file might show as 105MB on Windows but 100MB on macOS. Neither is wrong - they're just using different standards. Windows shows binary megabytes (105×1024×1024 bytes) while macOS shows decimal (100×1000×1000 bytes).
                          </p>
                        </div>
                        
                        <div className="bg-green-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">Network and Bandwidth Standards</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            Network equipment manufacturers and ISPs almost universally use decimal (1000-based) measurements for speeds, but with a twist:
                          </p>
                          <div className="space-y-3 text-sm">
                            <div className="flex items-start gap-2">
                              <div className="w-4 h-4 bg-blue-500/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Wifi size={12} className="text-blue-500" />
                              </div>
                              <span><strong>Internet speeds:</strong> Always advertised in megabits per second (Mbps) using decimal. 100 Mbps = 100,000,000 bits per second.</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-4 h-4 bg-green-500/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Server size={12} className="text-green-500" />
                              </div>
                              <span><strong>Network interfaces:</strong> Gigabit Ethernet = 1,000,000,000 bits per second (decimal). Not 1,073,741,824 (binary).</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-4 h-4 bg-purple-500/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Download size={12} className="text-purple-500" />
                              </div>
                              <span><strong>Download calculations:</strong> To get MB/s from Mbps: Divide by 8 for approximate, or divide by 8.388608 for exact binary conversion.</span>
                            </div>
                          </div>
                          <div className="mt-3 p-3 bg-secondary/30 rounded">
                            <div className="font-medium text-foreground text-sm mb-1">Example: 500 Mbps internet plan</div>
                            <div className="text-xs space-y-1">
                              <div>Approximate download: 500 ÷ 8 = 62.5 MB/s</div>
                              <div>Exact binary: 500 ÷ 8.388608 = 59.6 MiB/s</div>
                              <div>Difference: 2.9 MB/s (about 5% slower than expected)</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-purple-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">Storage Manufacturer Standards</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            Hard drive and SSD manufacturers have their own conventions that have evolved over time:
                          </p>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between border-b border-border/50 pb-2">
                              <div>Hard Disk Drives (HDD)</div>
                              <div className="font-mono text-xs bg-blue-500/10 px-2 py-1 rounded">Decimal (1000) since ~1998</div>
                            </div>
                            <div className="flex items-center justify-between border-b border-border/50 pb-2">
                              <div>Solid State Drives (SSD)</div>
                              <div className="font-mono text-xs bg-green-500/10 px-2 py-1 rounded">Decimal, with over-provisioning</div>
                            </div>
                            <div className="flex items-center justify-between border-b border-border/50 pb-2">
                              <div>USB Flash Drives</div>
                              <div className="font-mono text-xs bg-purple-500/10 px-2 py-1 rounded">Varies, often decimal</div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div>Optical Media (DVD/Blu-ray)</div>
                              <div className="font-mono text-xs bg-amber-500/10 px-2 py-1 rounded">Binary for capacity (4.7GB = 4.7×1024³)</div>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-3">
                            The over-provisioning in SSDs adds another layer. A "1TB" SSD might have 1,024GB of physical NAND chips, with 24GB reserved for wear leveling and bad block management. So even the manufacturer's "decimal" TB might not match what's physically on the chips.
                          </p>
                        </div>
                        
                        <div className="bg-amber-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">Best Practices for Professionals</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-start gap-2">
                              <div className="w-4 h-4 bg-red-500/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                                <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                              </div>
                              <span><strong>Document your standard:</strong> In technical specifications, explicitly state "GB (binary)" or "GB (decimal)" to prevent misunderstandings.</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-4 h-4 bg-yellow-500/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                              </div>
                              <span><strong>Use exact conversions in code:</strong> When programming, use 1024 for memory allocation, 1000 for network code, unless the API specifies otherwise.</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-4 h-4 bg-green-500/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                              </div>
                              <span><strong>Add buffer capacity:</strong> When planning storage, add 20-30% to account for formatting, file system overhead, and measurement discrepancies.</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-4 h-4 bg-blue-500/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                              </div>
                              <span><strong>Verify with tools:</strong> Use calculators like this one to double-check conversions before making purchasing or architecture decisions.</span>
                            </div>
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
                <div className="flex items-center gap-3">
                  <div className="bg-purple-500/10 p-2 rounded-lg">
                    <Database size={20} className="text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Real-World Data Conversion Examples</h2>
                </div>
                {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.examples && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-muted-foreground mb-4">
                        Let's walk through some practical scenarios where getting data conversions right matters. These examples show how precise calculations prevent problems in everything from personal computing to enterprise IT.
                      </p>
                      
                      <div className="space-y-4">
                        <div className="bg-blue-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">Example 1: Personal Photo Backup Planning</h3>
                          <div className="space-y-3 text-sm">
                            <p><strong>Situation:</strong> You want to backup 5 years of smartphone photos to cloud storage.</p>
                            
                            <div className="pl-4 border-l-2 border-blue-500">
                              <div className="font-medium text-foreground">Step 1: Estimate current storage</div>
                              <div className="mt-1 text-muted-foreground">
                                • Photos per month: 150 (5 per day average)<br/>
                                • Average photo size: 3 MB<br/>
                                • Monthly total: 150 × 3 = 450 MB<br/>
                                • 5 years (60 months): 450 × 60 = 27,000 MB
                              </div>
                            </div>
                            
                            <div className="pl-4 border-l-2 border-green-500">
                              <div className="font-medium text-foreground">Step 2: Convert to appropriate units</div>
                              <div className="mt-1 text-muted-foreground">
                                27,000 MB = 27,000 ÷ 1024 = 26.37 GB (binary)<br/>
                                But cloud services use decimal: 27,000 ÷ 1000 = 27 GB
                              </div>
                            </div>
                            
                            <div className="pl-4 border-l-2 border-purple-500">
                              <div className="font-medium text-foreground">Step 3: Plan for growth</div>
                              <div className="mt-1 text-muted-foreground">
                                Camera quality improves → photos get larger<br/>
                                Assume 20% annual increase in average size<br/>
                                Next year: 27 GB × 1.2 = 32.4 GB<br/>
                                Year after: 32.4 × 1.2 = 38.9 GB<br/>
                                <strong>Recommendation: Buy 100GB cloud plan</strong>
                              </div>
                            </div>
                            
                            <div className="bg-secondary/30 p-3 rounded">
                              <div className="font-medium text-foreground">The insight:</div>
                              <div className="text-xs mt-1 text-muted-foreground">Without conversion awareness, you might buy a 50GB plan thinking it's enough for "about 27GB." But 27GB binary is 29GB decimal, plus growth puts you at risk of running out within a year.</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-green-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">Example 2: Small Business Server Upgrade</h3>
                          <div className="space-y-3 text-sm">
                            <p><strong>Situation:</strong> A 20-person company needs to replace their aging file server.</p>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <div className="font-medium text-foreground mb-1">Current usage:</div>
                                <ul className="space-y-1 text-muted-foreground">
                                  <li>• Shared files: 120 GB</li>
                                  <li>• Email database: 80 GB</li>
                                  <li>• Accounting software: 15 GB</li>
                                  <li>• Backup overhead: 30%</li>
                                </ul>
                              </div>
                              <div>
                                <div className="font-medium text-foreground mb-1">Calculations:</div>
                                <div className="space-y-1 text-muted-foreground">
                                  <div>Current total: 215 GB</div>
                                  <div>With backup: 215 × 1.3 = 279.5 GB</div>
                                  <div>Annual growth: 25%</div>
                                  <div>3-year projection: 279.5 × 1.25³ = 546 GB</div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="pl-4 border-l-2 border-blue-500">
                              <div className="font-medium text-foreground">Storage purchase decision:</div>
                              <div className="mt-1 text-muted-foreground">
                                546 GB binary needed<br/>
                                Drive sizes: 500GB, 1TB, 2TB (all decimal)<br/>
                                500GB decimal = 465GB binary → too small<br/>
                                1TB decimal = 931GB binary → fits with room<br/>
                                2TB decimal = 1.82TB binary → overkill but future-proof
                              </div>
                            </div>
                            
                            <p className="text-sm text-muted-foreground">
                              <strong>The decision:</strong> Buy 1TB drives in RAID 1 (mirrored) configuration. Total usable: 931GB binary, minus RAID overhead = ~900GB. Plenty for 546GB needs with growth room. Cost: ~$150 per drive × 2 = $300 vs $500 for 2TB setup.
                            </p>
                          </div>
                        </div>
                        
                        <div className="bg-purple-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">Example 3: Video Production Workflow</h3>
                          <div className="space-y-3 text-sm">
                            <p><strong>Situation:</strong> Editing 4K video for a 30-minute corporate film.</p>
                            
                            <div className="overflow-x-auto">
                              <div className="min-w-full inline-block align-middle">
                                <div className="overflow-hidden border border-border rounded-lg">
                                  <table className="min-w-full divide-y divide-border">
                                    <thead className="bg-secondary/20">
                                      <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-foreground">Video Type</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-foreground">Bitrate</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-foreground">Per Minute</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-foreground">30 Minutes</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-foreground">Storage Needed</th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                      <tr>
                                        <td className="px-4 py-2 text-xs">4K ProRes 422</td>
                                        <td className="px-4 py-2 text-xs font-mono">147 Mbps</td>
                                        <td className="px-4 py-2 text-xs font-mono">1.1 GB</td>
                                        <td className="px-4 py-2 text-xs font-mono">33 GB</td>
                                        <td className="px-4 py-2 text-xs">At least 100 GB</td>
                                      </tr>
                                      <tr>
                                        <td className="px-4 py-2 text-xs">4K H.264</td>
                                        <td className="px-4 py-2 text-xs font-mono">45 Mbps</td>
                                        <td className="px-4 py-2 text-xs font-mono">337 MB</td>
                                        <td className="px-4 py-2 text-xs font-mono">10.1 GB</td>
                                        <td className="px-4 py-2 text-xs">At least 30 GB</td>
                                      </tr>
                                      <tr>
                                        <td className="px-4 py-2 text-xs">1080p H.264</td>
                                        <td className="px-4 py-2 text-xs font-mono">15 Mbps</td>
                                        <td className="px-4 py-2 text-xs font-mono">112 MB</td>
                                        <td className="px-4 py-2 text-xs font-mono">3.4 GB</td>
                                        <td className="px-4 py-2 text-xs">At least 10 GB</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                            
                            <div className="pl-4 border-l-2 border-green-500">
                              <div className="font-medium text-foreground">Workflow calculation:</div>
                              <div className="mt-1 text-muted-foreground">
                                Shooting ratio: 10:1 (10 minutes shot per 1 minute used)<br/>
                                For 30-minute film: 300 minutes of raw footage<br/>
                                4K ProRes: 300 × 1.1 = 330 GB raw footage<br/>
                                Plus project files, audio, graphics: +50%<br/>
                                <strong>Total: ~500 GB per project</strong>
                              </div>
                            </div>
                            
                            <p className="text-sm text-muted-foreground">
                              <strong>The solution:</strong> Need at least 1TB (decimal) = 931GB binary drive per project. Buy 2TB drives to accommodate multiple projects. External SSD for active editing (fast), HDD for archive (cheap). Total: 2TB SSD ($200) + 4TB HDD ($100) = $300 storage per editor.
                            </p>
                          </div>
                        </div>
                        
                        <div className="bg-amber-500/5 p-4 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">Example 4: Website Hosting Bandwidth</h3>
                          <div className="space-y-3 text-sm">
                            <p><strong>Situation:</strong> Estimating monthly bandwidth for a growing blog.</p>
                            
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div>Average page size: 2.5 MB</div>
                                <div className="font-mono text-xs bg-blue-500/10 px-2 py-1 rounded">Includes images, CSS, JS</div>
                              </div>
                              <div className="flex items-center justify-between">
                                <div>Monthly visitors: 50,000</div>
                                <div className="font-mono text-xs bg-green-500/10 px-2 py-1 rounded">Growing 10% monthly</div>
                              </div>
                              <div className="flex items-center justify-between">
                                <div>Pages per visitor: 2.8</div>
                                <div className="font-mono text-xs bg-purple-500/10 px-2 py-1 rounded">Industry average</div>
                              </div>
                            </div>
                            
                            <div className="pl-4 border-l-2 border-blue-500">
                              <div className="font-medium text-foreground">Bandwidth calculation:</div>
                              <div className="mt-1 text-muted-foreground">
                                Monthly pageviews: 50,000 × 2.8 = 140,000<br/>
                                Data per month: 140,000 × 2.5 = 350,000 MB<br/>
                                Convert to GB: 350,000 ÷ 1024 = 341.8 GB binary<br/>
                                Hosting plans use decimal: 350,000 ÷ 1000 = 350 GB
                              </div>
                            </div>
                            
                            <div className="pl-4 border-l-2 border-red-500">
                              <div className="font-medium text-foreground">Hosting plan selection:</div>
                              <div className="mt-1 text-muted-foreground">
                                Option A: 500GB plan @ $20/month<br/>
                                Option B: Unlimited plan @ $30/month<br/>
                                <strong>Decision:</strong> Choose 500GB plan. At 10% growth, you'll hit 500GB in 4 months. Then upgrade to unlimited.<br/>
                                Cost first year: (4×$20) + (8×$30) = $320<br/>
                                vs unlimited all year: 12×$30 = $360<br/>
                                <em>Savings: $40 first year</em>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 p-4 bg-secondary/20 rounded-lg">
                        <h4 className="font-medium text-foreground mb-2">Key Lessons from These Examples</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span><strong>Always convert between systems:</strong> Don't assume your GB matches their GB - explicitly convert between binary and decimal.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span><strong>Plan for growth:</strong> Storage needs rarely stay static. Build in 20-50% buffer for unexpected growth.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-1 h-1 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span><strong>Consider total cost:</strong> Cheaper storage upfront might cost more in upgrades later. Calculate 3-5 year total cost.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span><strong>Use the right tool:</strong> Calculators like this one help avoid mental math errors that compound in large projects.</span>
                          </li>
                        </ul>
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
                    
                    <div className="pt-4">
                      <h3 className="text-lg font-semibold text-foreground mb-2">How can I check if my storage device is using binary or decimal measurements?</h3>
                      <p className="text-muted-foreground mb-3">
                        Check the exact byte count. On Windows: Right-click drive → Properties. The "Capacity" shows bytes in parentheses. Divide that by the advertised size. If a 1TB drive shows 1,000,204,886,016 bytes, it's decimal-based (1 trillion-ish). If it shows 1,099,511,627,776 bytes, it's binary-based. Most consumer drives will be decimal. Your OS then converts this to show you GB.
                      </p>
                      
                      <h3 className="text-lg font-semibold text-foreground mb-2">What's a simple rule for estimating download times?</h3>
                      <p className="text-muted-foreground">
                        Divide your internet speed (in Mbps) by 10 to get approximate MB/s. So 100 Mbps ≈ 10 MB/s. A 1GB file (1000 MB) would take about 100 seconds. For more accuracy: Divide Mbps by 8.4 instead of 10. For exact: Use our converter - enter file size in GB, convert to MB, then divide by (Mbps ÷ 8.388608). But honestly, the divide-by-10 rule works for most planning.
                      </p>
                    </div>
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