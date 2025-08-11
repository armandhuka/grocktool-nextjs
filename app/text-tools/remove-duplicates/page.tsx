'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, Trash2, Filter } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Button } from '../../components/ui/button';
import { Textarea } from '../../components/ui/textarea';

const RemoveDuplicates = () => {
  const router = useRouter();
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);

  useEffect(() => {
    document.title = 'Remove Duplicate Lines - GrockTool';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Remove duplicate lines from your text instantly. Keep only unique lines with our free online duplicate remover tool.');
    }
  }, []);

  const removeDuplicates = () => {
    if (!inputText.trim()) {
      setOutputText('');
      return;
    }

    const lines = inputText.split('\n');
    const uniqueLines = [];
    const seen = new Set();

    lines.forEach(line => {
      const checkLine = caseSensitive ? line : line.toLowerCase();
      if (!seen.has(checkLine)) {
        seen.add(checkLine);
        uniqueLines.push(line);
      }
    });

    setOutputText(uniqueLines.join('\n'));
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

  return (
    <div className="min-h-screen bg-toolnest-bg font-inter">
      <Header />

      <section className="pt-32 pb-20 px-4">
        <div className="toolnest-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <button
              onClick={() => router.push('/tools')}
              className="inline-flex items-center gap-2 text-toolnest-text/70 hover:text-toolnest-text mb-8 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Tools
            </button>

            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-toolnest-text mb-4">
                Remove Duplicate Lines
              </h1>
              <p className="text-xl text-toolnest-text/80 max-w-2xl mx-auto">
                Remove duplicate lines from your text and keep only unique entries
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <label className="block text-toolnest-text font-medium mb-4">
                    Input Text:
                  </label>
                  <Textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Enter your text with duplicate lines..."
                    className="min-h-[300px] resize-none"
                  />
                </div>

                <div>
                  <label className="block text-toolnest-text font-medium mb-4">
                    Unique Lines:
                  </label>
                  <Textarea
                    value={outputText}
                    readOnly
                    placeholder="Unique lines will appear here..."
                    className="min-h-[300px] resize-none bg-gray-50"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 mt-6">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={caseSensitive}
                    onChange={(e) => setCaseSensitive(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-toolnest-text/70 text-sm">Case sensitive</span>
                </label>
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  onClick={removeDuplicates}
                  className="flex items-center gap-2"
                >
                  <Filter size={16} />
                  Remove Duplicates
                </Button>
                <Button
                  onClick={handleClear}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Trash2 size={16} />
                  Clear
                </Button>
                <Button
                  onClick={handleCopy}
                  variant="outline"
                  className="flex items-center gap-2"
                  disabled={!outputText}
                >
                  <Copy size={16} />
                  Copy Result
                </Button>
              </div>

              <div className="mt-8 p-6 bg-toolnest-bg/20 rounded-2xl">
                <h4 className="font-medium text-toolnest-text mb-2">How to use:</h4>
                <ul className="text-toolnest-text/70 text-sm space-y-1">
                  <li>• Paste your text with duplicate lines in the input area</li>
                  <li>• Check "Case sensitive" if you want to treat "Hello" and "hello" as different</li>
                  <li>• Click "Remove Duplicates" to process your text</li>
                  <li>• Copy the result or use it as needed</li>
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

export default RemoveDuplicates;
