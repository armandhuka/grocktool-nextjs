'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, Trash2, Search, Replace } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Button } from '../../components/ui/button';
import { Textarea } from '../../components/ui/textarea';
import { Input } from '../../components/ui/input';

const FindReplace = () => {
  const router = useRouter();
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [replaceAll, setReplaceAll] = useState(true);
  const [matchCount, setMatchCount] = useState(0);

  useEffect(() => {
    document.title = 'Find & Replace Tool - GrockTool';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Find and replace text patterns in your content. Support for case-sensitive search and replace all occurrences.');
    }
  }, []);

  const performFindReplace = () => {
    if (!inputText || !findText) {
      setOutputText(inputText);
      setMatchCount(0);
      return;
    }

    const flags = caseSensitive ? 'g' : 'gi';
    const regex = new RegExp(findText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), replaceAll ? flags : flags.replace('g', ''));
    
    // Count matches
    const matches = inputText.match(new RegExp(findText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'));
    setMatchCount(matches ? matches.length : 0);

    const result = inputText.replace(regex, replaceText);
    setOutputText(result);
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setFindText('');
    setReplaceText('');
    setMatchCount(0);
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
                Find & Replace Tool
              </h1>
              <p className="text-xl text-toolnest-text/80 max-w-2xl mx-auto">
                Find and replace text patterns in your content with advanced options
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div>
                  <label className="block text-toolnest-text font-medium mb-4">
                    Input Text:
                  </label>
                  <Textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Enter your text here..."
                    className="min-h-[300px] resize-none"
                  />
                </div>

                <div>
                  <label className="block text-toolnest-text font-medium mb-4">
                    Result Text:
                  </label>
                  <Textarea
                    value={outputText}
                    readOnly
                    placeholder="Modified text will appear here..."
                    className="min-h-[300px] resize-none bg-gray-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-toolnest-text font-medium mb-2">
                    Find:
                  </label>
                  <Input
                    value={findText}
                    onChange={(e) => setFindText(e.target.value)}
                    placeholder="Text to find..."
                  />
                </div>

                <div>
                  <label className="block text-toolnest-text font-medium mb-2">
                    Replace with:
                  </label>
                  <Input
                    value={replaceText}
                    onChange={(e) => setReplaceText(e.target.value)}
                    placeholder="Replacement text..."
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={caseSensitive}
                    onChange={(e) => setCaseSensitive(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-toolnest-text/70 text-sm">Case sensitive</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={replaceAll}
                    onChange={(e) => setReplaceAll(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-toolnest-text/70 text-sm">Replace all occurrences</span>
                </label>
                {matchCount > 0 && (
                  <span className="text-toolnest-text/70 text-sm">
                    Found {matchCount} match{matchCount !== 1 ? 'es' : ''}
                  </span>
                )}
              </div>

              <div className="flex gap-3 mb-8">
                <Button
                  onClick={performFindReplace}
                  className="flex items-center gap-2"
                >
                  <Replace size={16} />
                  Find & Replace
                </Button>
                <Button
                  onClick={handleClear}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Trash2 size={16} />
                  Clear All
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

              <div className="p-6 bg-toolnest-bg/20 rounded-2xl">
                <h4 className="font-medium text-toolnest-text mb-2">How to use:</h4>
                <ul className="text-toolnest-text/70 text-sm space-y-1">
                  <li>• Enter your text in the input area</li>
                  <li>• Specify what text you want to find</li>
                  <li>• Enter the replacement text (leave empty to remove)</li>
                  <li>• Use options for case sensitivity and replace all</li>
                  <li>• Click "Find & Replace" to process your text</li>
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

export default FindReplace;
