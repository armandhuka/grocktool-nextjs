
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, Trash2, CheckCircle, XCircle } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Button } from '../../components/ui/button';
import { Textarea } from '../../components/ui/textarea';

const PalindromeChecker = () => {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState<{
    isPalindrome: boolean;
    cleanedText: string;
    reversed: string;
  } | null>(null);
  const [ignoreSpaces, setIgnoreSpaces] = useState(true);
  const [ignorePunctuation, setIgnorePunctuation] = useState(true);
  const [ignoreCase, setIgnoreCase] = useState(true);

  useEffect(() => {
    document.title = 'Palindrome Checker - ToolNest';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Check if text reads the same forwards and backwards. Advanced palindrome checker with options for spaces, punctuation, and case.');
    }
  }, []);

  const checkPalindrome = () => {
    if (!inputText.trim()) {
      setResult(null);
      return;
    }

    let cleanedText = inputText;

    // Apply cleaning options
    if (ignoreCase) {
      cleanedText = cleanedText.toLowerCase();
    }
    
    if (ignoreSpaces) {
      cleanedText = cleanedText.replace(/\s/g, '');
    }
    
    if (ignorePunctuation) {
      cleanedText = cleanedText.replace(/[^\w\s]/g, '');
    }

    const reversed = cleanedText.split('').reverse().join('');
    const isPalindrome = cleanedText === reversed;

    setResult({
      isPalindrome,
      cleanedText,
      reversed
    });
  };

  const handleClear = () => {
    setInputText('');
    setResult(null);
  };

  const handleCopy = async () => {
    if (!result) return;
    
    const resultText = `Text: "${inputText}"\nIs Palindrome: ${result.isPalindrome ? 'Yes' : 'No'}\nCleaned Text: "${result.cleanedText}"\nReversed: "${result.reversed}"`;
    try {
      await navigator.clipboard.writeText(resultText);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Auto-check as user types
  useEffect(() => {
    if (inputText) {
      checkPalindrome();
    } else {
      setResult(null);
    }
  }, [inputText, ignoreSpaces, ignorePunctuation, ignoreCase]);

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
            <Link
              to="/tools"
              className="inline-flex items-center gap-2 text-toolnest-text/70 hover:text-toolnest-text mb-8 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Tools
            </Link>

            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-toolnest-text mb-4">
                Palindrome Checker
              </h1>
              <p className="text-xl text-toolnest-text/80 max-w-2xl mx-auto">
                Check if text reads the same forwards and backwards
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-toolnest-text font-medium mb-4">
                    Enter text to check:
                  </label>
                  <Textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Enter a word, phrase, or sentence..."
                    className="min-h-[120px] resize-none text-lg text-center"
                  />
                </div>

                <div>
                  <h4 className="font-medium text-toolnest-text mb-3">Checking Options:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={ignoreCase}
                        onChange={(e) => setIgnoreCase(e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-toolnest-text/70 text-sm">Ignore case</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={ignoreSpaces}
                        onChange={(e) => setIgnoreSpaces(e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-toolnest-text/70 text-sm">Ignore spaces</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={ignorePunctuation}
                        onChange={(e) => setIgnorePunctuation(e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-toolnest-text/70 text-sm">Ignore punctuation</span>
                    </label>
                  </div>
                </div>

                {result && (
                  <div className={`p-6 rounded-2xl ${
                    result.isPalindrome 
                      ? 'bg-green-50 border border-green-200' 
                      : 'bg-red-50 border border-red-200'
                  }`}>
                    <div className="flex items-center gap-3 mb-4">
                      {result.isPalindrome ? (
                        <CheckCircle className="text-green-600" size={24} />
                      ) : (
                        <XCircle className="text-red-600" size={24} />
                      )}
                      <h3 className={`text-xl font-bold ${
                        result.isPalindrome ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {result.isPalindrome ? 'Yes, it\'s a palindrome!' : 'No, it\'s not a palindrome.'}
                      </h3>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Cleaned text: </span>
                        <code className="bg-white px-2 py-1 rounded">{result.cleanedText}</code>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Reversed: </span>
                        <code className="bg-white px-2 py-1 rounded">{result.reversed}</code>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button
                    onClick={handleClear}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Trash2 size={16} />
                    Clear
                  </Button>
                  {result && (
                    <Button
                      onClick={handleCopy}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Copy size={16} />
                      Copy Result
                    </Button>
                  )}
                </div>

                <div className="p-6 bg-blue-50 rounded-2xl border border-blue-200">
                  <h4 className="font-medium text-blue-800 mb-2">Examples of palindromes:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-blue-700 text-sm">
                    <div>• racecar</div>
                    <div>• A man a plan a canal Panama</div>
                    <div>• madam</div>
                    <div>• Was it a car or a cat I saw?</div>
                    <div>• level</div>
                    <div>• No 'x' in Nixon</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-toolnest-bg/20 rounded-2xl">
                <h4 className="font-medium text-toolnest-text mb-2">How to use:</h4>
                <ul className="text-toolnest-text/70 text-sm space-y-1">
                  <li>• Enter any word, phrase, or sentence</li>
                  <li>• Choose which elements to ignore during checking</li>
                  <li>• The result will update automatically as you type</li>
                  <li>• Green result means it's a palindrome, red means it's not</li>
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

export default PalindromeChecker;
