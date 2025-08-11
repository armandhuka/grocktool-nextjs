import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, Trash2, Filter } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Button } from '../../components/ui/button';
import { Textarea } from '../../components/ui/textarea';

const RemoveSpecialChars = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [keepSpaces, setKeepSpaces] = useState(true);
  const [keepNumbers, setKeepNumbers] = useState(true);
  const [keepNewlines, setKeepNewlines] = useState(true);
  const [customChars, setCustomChars] = useState('');

  useEffect(() => {
    document.title = 'Remove Special Characters - ToolNest';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Remove or filter special characters from text. Keep only letters, numbers, and spaces with customizable options.');
    }
  }, []);

  const removeSpecialChars = () => {
    if (!inputText) {
      setOutputText('');
      return;
    }

    let result = inputText;
    
    // Build regex pattern based on options
    let pattern = '[^a-zA-Z';
    
    if (keepNumbers) {
      pattern += '0-9';
    }
    
    if (keepSpaces) {
      pattern += ' ';
    }
    
    if (keepNewlines) {
      pattern += '\\n\\r';
    }
    
    // Add custom characters to keep
    if (customChars) {
      // Escape special regex characters
      const escapedCustom = customChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      pattern += escapedCustom;
    }
    
    pattern += ']';
    
    const regex = new RegExp(pattern, 'g');
    result = result.replace(regex, '');
    
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

  // Auto-process as user types or changes options
  useEffect(() => {
    if (inputText) {
      removeSpecialChars();
    } else {
      setOutputText('');
    }
  }, [inputText, keepSpaces, keepNumbers, keepNewlines, customChars]);

  const getPreview = () => {
    const removedChars = inputText.length - outputText.length;
    return {
      originalLength: inputText.length,
      cleanedLength: outputText.length,
      removedCount: removedChars
    };
  };

  const preview = getPreview();

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
                Remove Special Characters
              </h1>
              <p className="text-xl text-toolnest-text/80 max-w-2xl mx-auto">
                Remove or filter special characters and keep only the content you need
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
                    placeholder="Enter text with special characters..."
                    className="min-h-[300px] resize-none"
                  />
                </div>

                <div>
                  <label className="block text-toolnest-text font-medium mb-4">
                    Cleaned Text:
                  </label>
                  <Textarea
                    value={outputText}
                    readOnly
                    placeholder="Text without special characters will appear here..."
                    className="min-h-[300px] resize-none bg-gray-50"
                  />
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-medium text-toolnest-text mb-4">Keep these characters:</h4>
                  <div className="space-y-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={keepSpaces}
                        onChange={(e) => setKeepSpaces(e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-toolnest-text/70 text-sm">Spaces</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={keepNumbers}
                        onChange={(e) => setKeepNumbers(e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-toolnest-text/70 text-sm">Numbers (0-9)</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={keepNewlines}
                        onChange={(e) => setKeepNewlines(e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-toolnest-text/70 text-sm">New lines</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-toolnest-text mb-4">Custom characters to keep:</h4>
                  <input
                    type="text"
                    value={customChars}
                    onChange={(e) => setCustomChars(e.target.value)}
                    placeholder="e.g., !@#$%"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-toolnest-text/20"
                  />
                  <p className="text-toolnest-text/50 text-xs mt-1">
                    Enter specific characters you want to preserve
                  </p>
                </div>
              </div>

              {inputText && (
                <div className="mt-6 p-4 bg-toolnest-bg/20 rounded-2xl">
                  <h4 className="font-medium text-toolnest-text mb-2">Statistics:</h4>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-toolnest-text">{preview.originalLength}</div>
                      <div className="text-sm text-toolnest-text/70">Original chars</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-toolnest-text">{preview.cleanedLength}</div>
                      <div className="text-sm text-toolnest-text/70">Cleaned chars</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-red-600">{preview.removedCount}</div>
                      <div className="text-sm text-toolnest-text/70">Removed chars</div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3 mt-6">
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
                  <li>• Paste your text containing special characters</li>
                  <li>• Choose which types of characters to keep</li>
                  <li>• Add specific characters to preserve in the custom field</li>
                  <li>• The cleaned text updates automatically</li>
                  <li>• Copy the result when you're satisfied</li>
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

export default RemoveSpecialChars;
