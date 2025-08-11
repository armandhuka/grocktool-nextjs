
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, Trash2 } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Button } from '../../components/ui/button';
import { Textarea } from '../../components/ui/textarea';

const CaseConverter = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [activeCase, setActiveCase] = useState('');

  useEffect(() => {
    document.title = 'Text Case Converter - ToolNest';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Convert text to uppercase, lowercase, title case, or sentence case instantly with our free online text case converter.');
    }
  }, []);

  const convertCase = (caseType: string) => {
    if (!inputText.trim()) return;

    let result = '';
    switch (caseType) {
      case 'upper':
        result = inputText.toUpperCase();
        break;
      case 'lower':
        result = inputText.toLowerCase();
        break;
      case 'title':
        result = inputText.replace(/\w\S*/g, (txt) =>
          txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        );
        break;
      case 'sentence':
        result = inputText.toLowerCase().replace(/(^\w|\.\s+\w)/g, (txt) =>
          txt.toUpperCase()
        );
        break;
      case 'camel':
        result = inputText.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
          return index === 0 ? word.toLowerCase() : word.toUpperCase();
        }).replace(/\s+/g, '');
        break;
      case 'pascal':
        result = inputText.replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => {
          return word.toUpperCase();
        }).replace(/\s+/g, '');
        break;
      default:
        result = inputText;
    }

    setOutputText(result);
    setActiveCase(caseType);
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setActiveCase('');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const caseButtons = [
    { type: 'upper', label: 'UPPERCASE', example: 'HELLO WORLD' },
    { type: 'lower', label: 'lowercase', example: 'hello world' },
    { type: 'title', label: 'Title Case', example: 'Hello World' },
    { type: 'sentence', label: 'Sentence case', example: 'Hello world' },
    { type: 'camel', label: 'camelCase', example: 'helloWorld' },
    { type: 'pascal', label: 'PascalCase', example: 'HelloWorld' }
  ];

  return (
    <div className="min-h-screen bg-toolnest-bg font-inter">
      <Helmet>
        <title>EMI Calculator - GrockTool</title>
        <meta name="description" content="Calculate loan EMI, total interest, and payment schedules with GrockTool's free EMI calculator." />
        <link rel="canonical" href="https://grocktool.com/number-tools/emi" />
      </Helmet>
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
                Text Case Converter
              </h1>
              <p className="text-xl text-toolnest-text/80 max-w-2xl mx-auto">
                Convert your text to different cases: uppercase, lowercase, title case, and more
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
                    className="min-h-[200px] resize-none"
                  />
                </div>

                <div>
                  <label className="block text-toolnest-text font-medium mb-4">
                    Converted Text:
                  </label>
                  <Textarea
                    value={outputText}
                    readOnly
                    placeholder="Converted text will appear here..."
                    className="min-h-[200px] resize-none bg-gray-50"
                  />
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-medium text-toolnest-text mb-4">Choose conversion type:</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {caseButtons.map((button) => (
                    <Button
                      key={button.type}
                      onClick={() => convertCase(button.type)}
                      variant={activeCase === button.type ? "default" : "outline"}
                      className="flex-col h-auto p-4 text-left"
                      disabled={!inputText.trim()}
                    >
                      <span className="font-medium">{button.label}</span>
                      <span className="text-xs opacity-70 mt-1">{button.example}</span>
                    </Button>
                  ))}
                </div>
              </div>

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
                  <li>• Enter your text in the input area</li>
                  <li>• Click on any conversion type button</li>
                  <li>• The converted text will appear in the output area</li>
                  <li>• Copy the result or try different conversion types</li>
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

export default CaseConverter;
