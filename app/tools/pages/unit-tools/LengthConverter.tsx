
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftRight, Copy, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const LengthConverter = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState('meter');
  const [toUnit, setToUnit] = useState('feet');
  const [result, setResult] = useState<string>('');
  const { toast } = useToast();

  const lengthUnits = {
    meter: { name: 'Meter (m)', factor: 1 },
    centimeter: { name: 'Centimeter (cm)', factor: 0.01 },
    kilometer: { name: 'Kilometer (km)', factor: 1000 },
    inch: { name: 'Inch (in)', factor: 0.0254 },
    feet: { name: 'Feet (ft)', factor: 0.3048 },
    yard: { name: 'Yard (yd)', factor: 0.9144 },
    mile: { name: 'Mile (mi)', factor: 1609.34 }
  };

  useEffect(() => {
    document.title = 'Length Converter - ToolNest';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Convert between different length units like meters, feet, inches, centimeters with this free online length converter tool.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Convert between different length units like meters, feet, inches, centimeters with this free online length converter tool.';
      document.head.appendChild(meta);
    }
  }, []);

  const convertLength = () => {
    if (!inputValue || isNaN(Number(inputValue))) {
      setResult('');
      return;
    }

    const value = Number(inputValue);
    const fromFactor = lengthUnits[fromUnit as keyof typeof lengthUnits].factor;
    const toFactor = lengthUnits[toUnit as keyof typeof lengthUnits].factor;
    
    const meters = value * fromFactor;
    const converted = meters / toFactor;
    
    setResult(converted.toFixed(6).replace(/\.?0+$/, ''));
  };

  useEffect(() => {
    convertLength();
  }, [inputValue, fromUnit, toUnit]);

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  const clearAll = () => {
    setInputValue('');
    setResult('');
  };

  const copyResult = async () => {
    if (result) {
      await navigator.clipboard.writeText(result);
      toast({
        title: "Copied!",
        description: "Result copied to clipboard",
      });
    }
  };

  return (
    <div className="min-h-screen bg-toolnest-bg font-inter">
      <Header />
      
      <div className="pt-32 pb-20 px-4">
        <div className="toolnest-container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-toolnest-text mb-4">
              Length Converter
            </h1>
            <p className="text-xl text-toolnest-text/70 max-w-2xl mx-auto">
              Convert between different length units including meters, feet, inches, centimeters and more
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl shadow-xl p-8 mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
              {/* From Section */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-toolnest-text">From</label>
                <select
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                  className="w-full p-3 border border-toolnest-accent/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-toolnest-text/20"
                >
                  {Object.entries(lengthUnits).map(([key, unit]) => (
                    <option key={key} value={key}>{unit.name}</option>
                  ))}
                </select>
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter value"
                  className="w-full p-4 text-xl border border-toolnest-accent/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-toolnest-text/20"
                />
              </div>

              {/* Swap Button */}
              <div className="flex justify-center md:justify-start">
                <button
                  onClick={swapUnits}
                  className="p-3 bg-toolnest-accent/20 hover:bg-toolnest-accent/30 rounded-xl transition-colors duration-200"
                >
                  <ArrowLeftRight className="w-6 h-6 text-toolnest-text" />
                </button>
              </div>

              {/* To Section */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-toolnest-text">To</label>
                <select
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                  className="w-full p-3 border border-toolnest-accent/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-toolnest-text/20"
                >
                  {Object.entries(lengthUnits).map(([key, unit]) => (
                    <option key={key} value={key}>{unit.name}</option>
                  ))}
                </select>
                <div className="relative">
                  <input
                    type="text"
                    value={result}
                    readOnly
                    placeholder="Result"
                    className="w-full p-4 text-xl bg-gray-50 border border-toolnest-accent/30 rounded-xl focus:outline-none"
                  />
                  {result && (
                    <button
                      onClick={copyResult}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                    >
                      <Copy className="w-5 h-5 text-toolnest-text" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={clearAll}
                className="flex items-center gap-2 px-6 py-3 bg-toolnest-accent/20 hover:bg-toolnest-accent/30 text-toolnest-text rounded-xl transition-colors duration-200"
              >
                <RotateCcw className="w-5 h-5" />
                Clear
              </button>
            </div>
          </motion.div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-3xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-toolnest-text mb-4">How This Tool Works</h2>
            <p className="text-toolnest-text/70 leading-relaxed">
              This length converter uses standard conversion factors to convert between different units of length. 
              All conversions are calculated through meters as the base unit for accuracy. The tool supports 
              common length units including metric (meters, centimeters, kilometers) and imperial (feet, inches, yards, miles) systems.
            </p>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LengthConverter;
