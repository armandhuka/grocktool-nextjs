
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftRight, Copy, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const TemperatureConverter = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState('celsius');
  const [toUnit, setToUnit] = useState('fahrenheit');
  const [result, setResult] = useState<string>('');
  const { toast } = useToast();

  const temperatureUnits = {
    celsius: { name: 'Celsius (°C)' },
    fahrenheit: { name: 'Fahrenheit (°F)' },
    kelvin: { name: 'Kelvin (K)' },
    rankine: { name: 'Rankine (°R)' }
  };

  useEffect(() => {
    document.title = 'Temperature Converter - ToolNest';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Convert between different temperature units like Celsius, Fahrenheit, Kelvin with this free online temperature converter tool.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Convert between different temperature units like Celsius, Fahrenheit, Kelvin with this free online temperature converter tool.';
      document.head.appendChild(meta);
    }
  }, []);

  const convertTemperature = () => {
    if (!inputValue || isNaN(Number(inputValue))) {
      setResult('');
      return;
    }

    const value = Number(inputValue);
    let celsius: number;

    // Convert input to Celsius first
    switch (fromUnit) {
      case 'celsius':
        celsius = value;
        break;
      case 'fahrenheit':
        celsius = (value - 32) * 5/9;
        break;
      case 'kelvin':
        celsius = value - 273.15;
        break;
      case 'rankine':
        celsius = (value - 491.67) * 5/9;
        break;
      default:
        celsius = value;
    }

    // Convert from Celsius to target unit
    let converted: number;
    switch (toUnit) {
      case 'celsius':
        converted = celsius;
        break;
      case 'fahrenheit':
        converted = (celsius * 9/5) + 32;
        break;
      case 'kelvin':
        converted = celsius + 273.15;
        break;
      case 'rankine':
        converted = (celsius + 273.15) * 9/5;
        break;
      default:
        converted = celsius;
    }
    
    setResult(converted.toFixed(2).replace(/\.?0+$/, ''));
  };

  useEffect(() => {
    convertTemperature();
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
              Temperature Converter
            </h1>
            <p className="text-xl text-toolnest-text/70 max-w-2xl mx-auto">
              Convert between different temperature units including Celsius, Fahrenheit, Kelvin and Rankine
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
                  {Object.entries(temperatureUnits).map(([key, unit]) => (
                    <option key={key} value={key}>{unit.name}</option>
                  ))}
                </select>
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter temperature"
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
                  {Object.entries(temperatureUnits).map(([key, unit]) => (
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
              This temperature converter uses standard temperature conversion formulas to convert between different temperature scales. 
              Celsius is used as the intermediate unit for all conversions. The tool supports Celsius, Fahrenheit, Kelvin, and Rankine scales 
              commonly used in science, engineering, and daily life.
            </p>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TemperatureConverter;
