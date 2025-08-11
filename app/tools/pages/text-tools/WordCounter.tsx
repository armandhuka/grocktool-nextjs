
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const WordCounter = () => {
  const [text, setText] = useState('');
  const [stats, setStats] = useState({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0
  });



  useEffect(() => {
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    const sentences = text.trim() === '' ? 0 : text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const paragraphs = text.trim() === '' ? 0 : text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;

    setStats({
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs
    });
  }, [text]);

  const handleClear = () => {
    setText('');
  };

  const handleCopy = async () => {
    const statsText = `Characters: ${stats.characters}\nCharacters (no spaces): ${stats.charactersNoSpaces}\nWords: ${stats.words}\nSentences: ${stats.sentences}\nParagraphs: ${stats.paragraphs}`;
    try {
      await navigator.clipboard.writeText(statsText);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen bg-toolnest-bg font-inter">
      <section className="pt-32 pb-20 px-4">
        <div className="toolnest-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            {/* Back Link */}
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 text-toolnest-text/70 hover:text-toolnest-text mb-8 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Tools
            </Link>

            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-toolnest-text mb-4">
                Word & Character Counter
              </h1>
              <p className="text-xl text-toolnest-text/80 max-w-2xl mx-auto">
                Count words, characters, sentences, and paragraphs in your text instantly
              </p>
            </div>

            {/* Tool Interface */}
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Input Section */}
                <div className="lg:col-span-2">
                  <label className="block text-toolnest-text font-medium mb-4">
                    Enter your text:
                  </label>
                  <Textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Start typing or paste your text here..."
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
                    <Button
                      onClick={handleCopy}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Copy size={16} />
                      Copy Stats
                    </Button>
                  </div>
                </div>

                {/* Stats Section */}
                <div>
                  <h3 className="text-toolnest-text font-medium mb-4">Statistics:</h3>
                  <div className="space-y-4">
                    <div className="bg-toolnest-bg/30 rounded-2xl p-4">
                      <div className="text-2xl font-bold text-toolnest-text">{stats.characters}</div>
                      <div className="text-sm text-toolnest-text/70">Characters</div>
                    </div>
                    <div className="bg-toolnest-bg/30 rounded-2xl p-4">
                      <div className="text-2xl font-bold text-toolnest-text">{stats.charactersNoSpaces}</div>
                      <div className="text-sm text-toolnest-text/70">Characters (no spaces)</div>
                    </div>
                    <div className="bg-toolnest-bg/30 rounded-2xl p-4">
                      <div className="text-2xl font-bold text-toolnest-text">{stats.words}</div>
                      <div className="text-sm text-toolnest-text/70">Words</div>
                    </div>
                    <div className="bg-toolnest-bg/30 rounded-2xl p-4">
                      <div className="text-2xl font-bold text-toolnest-text">{stats.sentences}</div>
                      <div className="text-sm text-toolnest-text/70">Sentences</div>
                    </div>
                    <div className="bg-toolnest-bg/30 rounded-2xl p-4">
                      <div className="text-2xl font-bold text-toolnest-text">{stats.paragraphs}</div>
                      <div className="text-sm text-toolnest-text/70">Paragraphs</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="mt-8 p-6 bg-toolnest-bg/20 rounded-2xl">
                <h4 className="font-medium text-toolnest-text mb-2">How to use:</h4>
                <ul className="text-toolnest-text/70 text-sm space-y-1">
                  <li>• Type or paste your text in the input area</li>
                  <li>• Statistics will update automatically as you type</li>
                  <li>• Use "Clear" to reset the text and stats</li>
                  <li>• Use "Copy Stats" to copy the statistics to clipboard</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default WordCounter;
