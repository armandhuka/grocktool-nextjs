'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, Trash2, RotateCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Button } from '../../components/ui/button';
import { Textarea } from '../../components/ui/textarea';

const TextReverser = () => {
  const router = useRouter();
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [reverseType, setReverseType] = useState<'text' | 'words' | 'lines'>('text');

  useEffect(() => {
    document.title = 'Text Reverser - GrockTool';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Reverse text, words, or lines instantly. Choose how you want to reverse your content with our free text reverser tool.');
    }
  }, []);

  const reverseText = () => {
    if (!inputText.trim()) {
      setOutputText('');
      return;
    }

    let result = '';
    switch (reverseType) {
      case 'text':
        result = inputText.split('').reverse().join('');
        break;
      case 'words':
        result = inputText.split(' ').reverse().join(' ');
        break;
      case 'lines':
        result = inputText.split('\n').reverse().join('\n');
        break;
      default:
        result = inputText;
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

  const reverseOptions = [
    { type: 'text', label: 'Reverse Text', description: 'Reverse character by character' },
    { type: 'words', label: 'Reverse Words', description: 'Reverse word order' },
    { type: 'lines', label: 'Reverse Lines', description: 'Reverse line order' }
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
            className="max-w-6xl mx-auto"
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
                Text Reverser
              </h1>
              <p className="text-xl text-toolnest-text/80 max-w-2xl mx-auto">
                Reverse text, words, or lines based on your preference
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
                </div>

                <div>
                  <label className="block text-toolnest-text font-medium mb-4">
                    Reversed Text:
                  </label>
                  <Textarea
                    value={outputText}
                    readOnly
                    placeholder="Reversed text will appear here..."
                    className="min-h-[300px] resize-none bg-gray-50"
                  />
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-medium text-toolnest-text mb-4">Choose reverse type:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {reverseOptions.map((option) => (
                    <label
                      key={option.type}
                      className={`flex items-start gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-colors ${
                        reverseType === option.type
                          ? 'border-toolnest-text bg-toolnest-bg/10'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="reverseType"
                        value={option.type}
                        checked={reverseType === option.type}
                        onChange={(e) => setReverseType(e.target.value as 'text' | 'words' | 'lines')}
                        className="mt-1"
                      />
                      <div>
                        <div className="font-medium text-toolnest-text">{option.label}</div>
                        <div className="text-sm text-toolnest-text/70">{option.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  onClick={reverseText}
                  className="flex items-center gap-2"
                >
                  <RotateCcw size={16} />
                  Reverse Text
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
                  <li>• Enter your text in the input area</li>
                  <li>• Choose the type of reversal you want</li>
                  <li>• Click "Reverse Text" to process your content</li>
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

export default TextReverser;
