'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, RotateCcw } from 'lucide-react';

export default function WordCounterPage() {
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
    <div className="min-h-screen bg-background font-inter">
      <div className="pt-20 pb-8 px-4 sm:pt-24 sm:pb-12 sm:px-6 lg:pt-28">
        <div className="max-w-lg mx-auto lg:max-w-4xl">
          {/* Header */}
          <div className="mb-8 sm:mb-10">
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
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                Word & Character Counter
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Count words, characters, sentences, and paragraphs instantly
              </p>
            </motion.div>
          </div>

          {/* Main Tool Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 mb-6 shadow-sm"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Text Input Section */}
              <div className="lg:col-span-2 space-y-4">
                <label className="block text-sm font-medium text-foreground">
                  Enter your text:
                </label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Start typing or paste your text here..."
                  className="w-full min-h-[300px] p-4 bg-input border border-border rounded-lg sm:rounded-xl focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-ring focus:ring-opacity-50 resize-none text-foreground placeholder-muted-foreground"
                />
                
                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleClear}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg sm:rounded-xl hover:bg-secondary/80 transition-colors text-sm sm:text-base"
                  >
                    <RotateCcw size={16} className="sm:w-4 sm:h-4" />
                    Clear All
                  </button>
                  <button
                    onClick={handleCopy}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent text-accent-foreground rounded-lg sm:rounded-xl hover:bg-accent/80 transition-colors text-sm sm:text-base"
                  >
                    <Copy size={16} className="sm:w-4 sm:h-4" />
                    Copy Stats
                  </button>
                </div>
              </div>

              {/* Statistics Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-foreground">Statistics</h3>
                <div className="space-y-3">
                  <div className="bg-secondary rounded-lg p-4">
                    <div className="text-2xl font-bold text-foreground">{stats.characters}</div>
                    <div className="text-xs text-muted-foreground">Characters</div>
                  </div>
                  <div className="bg-secondary rounded-lg p-4">
                    <div className="text-2xl font-bold text-foreground">{stats.charactersNoSpaces}</div>
                    <div className="text-xs text-muted-foreground">Characters (no spaces)</div>
                  </div>
                  <div className="bg-secondary rounded-lg p-4">
                    <div className="text-2xl font-bold text-foreground">{stats.words}</div>
                    <div className="text-xs text-muted-foreground">Words</div>
                  </div>
                  <div className="bg-secondary rounded-lg p-4">
                    <div className="text-2xl font-bold text-foreground">{stats.sentences}</div>
                    <div className="text-xs text-muted-foreground">Sentences</div>
                  </div>
                  <div className="bg-secondary rounded-lg p-4">
                    <div className="text-2xl font-bold text-foreground">{stats.paragraphs}</div>
                    <div className="text-xs text-muted-foreground">Paragraphs</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
          >
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">How to Use</h3>
            <div className="space-y-2 text-muted-foreground text-sm">
              <p>
                This tool provides real-time text analysis with comprehensive statistics for your writing.
              </p>
              <div className="text-xs sm:text-sm space-y-1 pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Type or paste your text in the input area</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Statistics update automatically as you type</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Use Clear All to reset the text and statistics</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Copy Stats to save your analysis results</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}