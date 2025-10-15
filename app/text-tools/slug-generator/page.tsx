'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, Trash2, Link as LinkIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Button } from '../../components/ui/button';
import { Textarea } from '../../components/ui/textarea';

const SlugGenerator = () => {
  const router = useRouter();
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [separator, setSeparator] = useState('-');
  const [lowercase, setLowercase] = useState(true);

  useEffect(() => {
    document.title = 'Slug Generator - GrockTool';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Generate URL-friendly slugs from your text. Convert titles and phrases to clean, SEO-friendly URLs instantly.');
    }
  }, []);

  const generateSlug = () => {
    if (!inputText.trim()) {
      setOutputText('');
      return;
    }

    let result = inputText.trim();
    
    // Convert to lowercase if option is selected
    if (lowercase) {
      result = result.toLowerCase();
    }
    
    // Remove special characters and replace spaces
    result = result
      .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
      .replace(/\s+/g, separator) // Replace spaces with separator
      .replace(/-+/g, separator) // Replace multiple hyphens with single separator
      .replace(new RegExp(`^\\${separator}+|\\${separator}+$`, 'g'), ''); // Remove leading/trailing separators

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

  // Auto-generate slug as user types
  useEffect(() => {
    if (inputText) {
      generateSlug();
    } else {
      setOutputText('');
    }
  }, [inputText, separator, lowercase]);

  const separatorOptions = [
    { value: '-', label: 'Hyphen (-)', example: 'hello-world' },
    { value: '_', label: 'Underscore (_)', example: 'hello_world' },
    { value: '.', label: 'Dot (.)', example: 'hello.world' }
  ];

  return (
    <div className="min-h-screen bg-toolnest-bg font-inter">
      <Header />

      <section className="pt-32 pb-20 px-4">
        <div className="toolnest-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <button
              onClick={() => router.push('/tool')}
              className="inline-flex items-center gap-2 text-toolnest-text/70 hover:text-toolnest-text mb-8 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Tools
            </button>

            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-toolnest-text mb-4">
                Slug Generator
              </h1>
              <p className="text-xl text-toolnest-text/80 max-w-2xl mx-auto">
                Generate URL-friendly slugs from your text for SEO-optimized URLs
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-toolnest-text font-medium mb-4">
                    Input Text:
                  </label>
                  <Textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Enter your text or title here..."
                    className="min-h-[120px] resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-toolnest-text mb-3">Separator:</h4>
                    <div className="space-y-2">
                      {separatorOptions.map((option) => (
                        <label
                          key={option.value}
                          className="flex items-center gap-3 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="separator"
                            value={option.value}
                            checked={separator === option.value}
                            onChange={(e) => setSeparator(e.target.value)}
                          />
                          <div>
                            <span className="text-toolnest-text">{option.label}</span>
                            <span className="text-toolnest-text/50 text-sm ml-2">({option.example})</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-toolnest-text mb-3">Options:</h4>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={lowercase}
                        onChange={(e) => setLowercase(e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-toolnest-text/70">Convert to lowercase</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-toolnest-text font-medium mb-4">
                    Generated Slug:
                  </label>
                  <div className="relative">
                    <Textarea
                      value={outputText}
                      readOnly
                      placeholder="URL-friendly slug will appear here..."
                      className="min-h-[80px] resize-none bg-gray-50 font-mono"
                    />
                    {outputText && (
                      <div className="absolute top-2 right-2">
                        <Button
                          onClick={handleCopy}
                          size="sm"
                          variant="outline"
                          className="flex items-center gap-2"
                        >
                          <Copy size={14} />
                          Copy
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleClear}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Trash2 size={16} />
                    Clear
                  </Button>
                </div>

                {outputText && (
                  <div className="p-4 bg-green-50 rounded-2xl border border-green-200">
                    <h4 className="font-medium text-green-800 mb-2">Preview URL:</h4>
                    <code className="text-green-700 text-sm break-all">
                      https://yourwebsite.com/{outputText}
                    </code>
                  </div>
                )}
              </div>

              <div className="mt-8 p-6 bg-toolnest-bg/20 rounded-2xl">
                <h4 className="font-medium text-toolnest-text mb-2">How to use:</h4>
                <ul className="text-toolnest-text/70 text-sm space-y-1">
                  <li>• Enter your title or text that you want to convert to a slug</li>
                  <li>• Choose your preferred separator (hyphen is most common)</li>
                  <li>• The slug will be generated automatically as you type</li>
                  <li>• Use the generated slug in your URLs for better SEO</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SlugGenerator;
