
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, Trash2, ArrowUpDown } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Button } from '../../components/ui/button';
import { Textarea } from '../../components/ui/textarea';

const TextSorter = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [caseSensitive, setCaseSensitive] = useState(false);

  useEffect(() => {
    document.title = 'Text Sorter - ToolNest';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Sort lines of text alphabetically in ascending or descending order with our free online text sorting tool.');
    }
  }, []);

  const sortText = () => {
    if (!inputText.trim()) {
      setOutputText('');
      return;
    }

    const lines = inputText.split('\n').filter(line => line.trim() !== '');
    
    const sortedLines = lines.sort((a, b) => {
      const strA = caseSensitive ? a : a.toLowerCase();
      const strB = caseSensitive ? b : b.toLowerCase();
      
      if (sortOrder === 'asc') {
        return strA.localeCompare(strB);
      } else {
        return strB.localeCompare(strA);
      }
    });

    setOutputText(sortedLines.join('\n'));
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
            <Link
              to="/tools"
              className="inline-flex items-center gap-2 text-toolnest-text/70 hover:text-toolnest-text mb-8 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Tools
            </Link>

            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-toolnest-text mb-4">
                Text Sorter
              </h1>
              <p className="text-xl text-toolnest-text/80 max-w-2xl mx-auto">
                Sort lines of text alphabetically in ascending or descending order
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
                    placeholder="Enter lines of text to sort..."
                    className="min-h-[300px] resize-none"
                  />
                </div>

                <div>
                  <label className="block text-toolnest-text font-medium mb-4">
                    Sorted Text:
                  </label>
                  <Textarea
                    value={outputText}
                    readOnly
                    placeholder="Sorted lines will appear here..."
                    className="min-h-[300px] resize-none bg-gray-50"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 mt-6">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="sortOrder"
                    checked={sortOrder === 'asc'}
                    onChange={() => setSortOrder('asc')}
                  />
                  <span className="text-toolnest-text/70 text-sm">Ascending (A-Z)</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="sortOrder"
                    checked={sortOrder === 'desc'}
                    onChange={() => setSortOrder('desc')}
                  />
                  <span className="text-toolnest-text/70 text-sm">Descending (Z-A)</span>
                </label>
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
                  onClick={sortText}
                  className="flex items-center gap-2"
                >
                  <ArrowUpDown size={16} />
                  Sort Text
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
                  <li>• Enter each line of text on a separate line</li>
                  <li>• Choose ascending (A-Z) or descending (Z-A) sort order</li>
                  <li>• Enable case sensitive for precise sorting</li>
                  <li>• Click "Sort Text" to organize your lines alphabetically</li>
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

export default TextSorter;
