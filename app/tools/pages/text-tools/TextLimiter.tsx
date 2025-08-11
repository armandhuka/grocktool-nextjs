
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, Trash2, Scissors } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Button } from '../../components/ui/button';
import { Textarea } from '../../components/ui/textarea';
import { Input } from '../../components/ui/input';

const TextLimiter = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [limitType, setLimitType] = useState<'characters' | 'words'>('characters');
  const [limit, setLimit] = useState(100);
  const [addEllipsis, setAddEllipsis] = useState(true);

  useEffect(() => {
    document.title = 'Text Length Limiter - ToolNest';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Limit text to a specific number of characters or words. Perfect for social media posts, meta descriptions, and more.');
    }
  }, []);

  const limitText = () => {
    if (!inputText) {
      setOutputText('');
      return;
    }

    let result = inputText;
    let truncated = false;

    if (limitType === 'characters') {
      if (inputText.length > limit) {
        result = inputText.substring(0, limit);
        truncated = true;
      }
    } else {
      const words = inputText.split(' ');
      if (words.length > limit) {
        result = words.slice(0, limit).join(' ');
        truncated = true;
      }
    }

    if (truncated && addEllipsis) {
      result += '...';
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

  // Auto-limit as user types or changes settings
  useEffect(() => {
    if (inputText) {
      limitText();
    } else {
      setOutputText('');
    }
  }, [inputText, limitType, limit, addEllipsis]);

  const getStats = () => {
    const inputChars = inputText.length;
    const inputWords = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
    const outputChars = outputText.length;
    const outputWords = outputText.trim() ? outputText.trim().split(/\s+/).length : 0;

    return {
      input: { chars: inputChars, words: inputWords },
      output: { chars: outputChars, words: outputWords }
    };
  };

  const stats = getStats();
  const isLimited = limitType === 'characters' 
    ? stats.input.chars > limit 
    : stats.input.words > limit;

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
            <Link
              to="/tools"
              className="inline-flex items-center gap-2 text-toolnest-text/70 hover:text-toolnest-text mb-8 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Tools
            </Link>

            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-toolnest-text mb-4">
                Text Length Limiter
              </h1>
              <p className="text-xl text-toolnest-text/80 max-w-2xl mx-auto">
                Limit text to a specific number of characters or words
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
                    placeholder="Enter your text here..."
                    className="min-h-[300px] resize-none"
                  />
                  
                  {inputText && (
                    <div className="mt-2 text-sm text-toolnest-text/70">
                      {stats.input.chars} characters, {stats.input.words} words
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-toolnest-text font-medium mb-4">
                    Limited Text:
                  </label>
                  <Textarea
                    value={outputText}
                    readOnly
                    placeholder="Limited text will appear here..."
                    className="min-h-[300px] resize-none bg-gray-50"
                  />
                  
                  {outputText && (
                    <div className={`mt-2 text-sm ${isLimited ? 'text-orange-600' : 'text-toolnest-text/70'}`}>
                      {stats.output.chars} characters, {stats.output.words} words
                      {isLimited && ' (truncated)'}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-medium text-toolnest-text mb-4">Limit Settings:</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-toolnest-text/70 text-sm mb-2">
                        Limit by:
                      </label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="limitType"
                            value="characters"
                            checked={limitType === 'characters'}
                            onChange={(e) => setLimitType(e.target.value as 'characters' | 'words')}
                          />
                          <span className="text-toolnest-text/70 text-sm">Characters</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="limitType"
                            value="words"
                            checked={limitType === 'words'}
                            onChange={(e) => setLimitType(e.target.value as 'characters' | 'words')}
                          />
                          <span className="text-toolnest-text/70 text-sm">Words</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-toolnest-text/70 text-sm mb-2">
                        Maximum {limitType}:
                      </label>
                      <Input
                        type="number"
                        value={limit}
                        onChange={(e) => setLimit(Math.max(1, parseInt(e.target.value) || 1))}
                        min="1"
                        className="w-full"
                      />
                    </div>

                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={addEllipsis}
                        onChange={(e) => setAddEllipsis(e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-toolnest-text/70 text-sm">Add "..." when truncated</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-toolnest-text mb-4">Common Limits:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: 'Tweet', chars: 280, words: 50 },
                      { label: 'Meta Description', chars: 160, words: 25 },
                      { label: 'Instagram Caption', chars: 2200, words: 300 },
                      { label: 'SMS', chars: 160, words: 30 }
                    ].map((preset) => (
                      <Button
                        key={preset.label}
                        variant="outline"
                        size="sm"
                        className="text-xs"
                        onClick={() => {
                          setLimit(limitType === 'characters' ? preset.chars : preset.words);
                        }}
                      >
                        {preset.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
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
                  <li>• Enter your text in the input area</li>
                  <li>• Choose to limit by characters or words</li>
                  <li>• Set your desired limit number</li>
                  <li>• Use preset buttons for common platform limits</li>
                  <li>• The limited text updates automatically</li>
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

export default TextLimiter;
