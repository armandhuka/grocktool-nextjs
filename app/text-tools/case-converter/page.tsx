'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, Trash2, RotateCcw } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Textarea } from '../../components/ui/textarea';

export default function CaseConverterPage() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const convertCase = (type: string) => {
    if (!inputText.trim()) return;

    let result = '';
    switch (type) {
      case 'uppercase':
        result = inputText.toUpperCase();
        break;
      case 'lowercase':
        result = inputText.toLowerCase();
        break;
      case 'titlecase':
        result = inputText.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
        break;
      case 'sentencecase':
        result = inputText.toLowerCase().replace(/(^\w|\.\s+\w)/g, (char) => char.toUpperCase());
        break;
      case 'camelcase':
        result = inputText.toLowerCase().replace(/\s+(.)/g, (match, char) => char.toUpperCase());
        break;
      case 'snakecase':
        result = inputText.toLowerCase().replace(/\s+/g, '_');
        break;
      case 'kebabcase':
        result = inputText.toLowerCase().replace(/\s+/g, '-');
        break;
      case 'alternating':
        result = inputText.split('').map((char, index) => 
          index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
        ).join('');
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

  const handleSwap = () => {
    setInputText(outputText);
    setOutputText('');
  };

  return (
    <div className="min-h-screen bg-toolnest-bg font-inter">
      <section className="pt-32 pb-20 px-4">
        <div className="toolnest-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            {/* Back Link */}
            <Link
              href="/tool"
              className="inline-flex items-center gap-2 text-toolnest-text/70 hover:text-toolnest-text mb-8 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Tools
            </Link>

            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-toolnest-text mb-4">
                Case Converter
              </h1>
              <p className="text-xl text-toolnest-text/80 max-w-2xl mx-auto">
                Convert text between different case formats instantly
              </p>
            </div>

            {/* Tool Interface */}
            <div className="bg-white rounded-3xl shadow-lg p-8">
              {/* Case Conversion Buttons */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                <Button
                  onClick={() => convertCase('uppercase')}
                  variant="outline"
                  className="h-12"
                >
                  UPPERCASE
                </Button>
                <Button
                  onClick={() => convertCase('lowercase')}
                  variant="outline"
                  className="h-12"
                >
                  lowercase
                </Button>
                <Button
                  onClick={() => convertCase('titlecase')}
                  variant="outline"
                  className="h-12"
                >
                  Title Case
                </Button>
                <Button
                  onClick={() => convertCase('sentencecase')}
                  variant="outline"
                  className="h-12"
                >
                  Sentence case
                </Button>
                <Button
                  onClick={() => convertCase('camelcase')}
                  variant="outline"
                  className="h-12"
                >
                  camelCase
                </Button>
                <Button
                  onClick={() => convertCase('snakecase')}
                  variant="outline"
                  className="h-12"
                >
                  snake_case
                </Button>
                <Button
                  onClick={() => convertCase('kebabcase')}
                  variant="outline"
                  className="h-12"
                >
                  kebab-case
                </Button>
                <Button
                  onClick={() => convertCase('alternating')}
                  variant="outline"
                  className="h-12"
                >
                  aLtErNaTiNg
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Section */}
                <div>
                  <label className="block text-toolnest-text font-medium mb-4">
                    Input Text:
                  </label>
                  <Textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Enter your text here..."
                    className="min-h-[300px] resize-none text-base"
                  />
                  
                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-4">
                    <Button
                      onClick={handleClear}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Trash2 size={16} />
                      Clear
                    </Button>
                  </div>
                </div>

                {/* Output Section */}
                <div>
                  <label className="block text-toolnest-text font-medium mb-4">
                    Result:
                  </label>
                  <Textarea
                    value={outputText}
                    readOnly
                    placeholder="Converted text will appear here..."
                    className="min-h-[300px] resize-none text-base bg-toolnest-bg/30"
                  />
                  
                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-4">
                    <Button
                      onClick={handleCopy}
                      variant="outline"
                      className="flex items-center gap-2"
                      disabled={!outputText}
                    >
                      <Copy size={16} />
                      Copy Result
                    </Button>
                    <Button
                      onClick={handleSwap}
                      variant="outline"
                      className="flex items-center gap-2"
                      disabled={!outputText}
                    >
                      <RotateCcw size={16} />
                      Use as Input
                    </Button>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="mt-8 p-6 bg-toolnest-bg/20 rounded-2xl">
                <h4 className="font-medium text-toolnest-text mb-2">How to use:</h4>
                <ul className="text-toolnest-text/70 text-sm space-y-1">
                  <li>• Enter your text in the input area</li>
                  <li>• Click any case conversion button</li>
                  <li>• View the converted text in the result area</li>
                  <li>• Copy the result or use it as new input</li>
                  <li>• Try different case formats for your needs</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
