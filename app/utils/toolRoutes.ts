export const getToolRoute = (toolName: string, category: string) => {
  const routes: Record<string, Record<string, string>> = {
    'Text Tools': {
      'Word Counter': '/text-tools/word-counter',
      'Remove Duplicates': '/text-tools/remove-duplicates',
      'Case Converter': '/text-tools/case-converter',
      'Text Sorter': '/text-tools/text-sorter',
      'Text Reverser': '/text-tools/text-reverser',
      'Slug Generator': '/text-tools/slug-generator',
      'Find & Replace': '/text-tools/find-replace',
      'Palindrome Checker': '/text-tools/palindrome-checker',
      'Remove Special Characters': '/text-tools/remove-special-chars',
      'Text Limiter': '/text-tools/text-limiter'
    },
    'Unit Converter Tools': {
      'Length Converter': '/unit-tools/length-converter',
      'Weight Converter': '/unit-tools/weight-converter',
      'Temperature Converter': '/unit-tools/temperature-converter',
      'Time Converter': '/unit-tools/time-converter',
      'Speed Converter': '/unit-tools/speed-converter',
      'Area Converter': '/unit-tools/area-converter',
      'Volume Converter': '/unit-tools/volume-converter',
      'Data Size Converter': '/unit-tools/data-size-converter'
    },
    'Date & Time Tools': {
      'Age Calculator': '/date-tools/age-calculator',
      'Date Difference': '/date-tools/date-difference',
      'Countdown Timer': '/date-tools/countdown',
      'Work Days Calculator': '/date-tools/WorkDays',
      'Next Birthday Countdown': '/date-tools/birthday-countdown',
      'Leap Year Checker': '/date-tools/leap-year',
      'Current Week Number Checker': '/date-tools/week-number'
    },
    'Number Tools': {
      'Percentage Calculator': '/number-tools/percentage-calculator',
      'Interest Calculator': '/number-tools/simple-interest',
      'EMI Calculator': '/number-tools/EMI-Calculator',
      'Roman Number Converter': '/number-tools/roman-converter',
      'LCM/HCF Calculator': '/number-tools/lcm-hcf-calculator',
      'Number to Words': '/number-tools/number-to-words',
      'Scientific Notation': '/number-tools/scientific-notation',
      'Base Converter': '/number-tools/number-base-converter',
      'Number Rounding': '/number-tools/rounding',
      'Random Generator': '/number-tools/random-generator'
    },
    'Math Tools': {
      'Advanced Calculator': '/math-tools/basic-calculator',
      'Prime Number Checker': '/math-tools/prime-checker',
      'Factorial Calculator': '/math-tools/factorial',
      'Multiplication Tables': '/math-tools/multiplication-table',
      'Quadratic Equation Solver': '/math-tools/quadratic-solver',
      'Percentage Increase/Decrease Calculator': '/math-tools/percentage-change',
      'Triangle Area Calculator': '/math-tools/triangle-area',
      'Circle Area Calculator': '/math-tools/circle-calculator',
      'Logarithm Calculator': '/math-tools/exponent-log',
      'Statistics Calculator': '/math-tools/statistics-calculator'
    },
    'Health Tools': {
      'BMI Calculator': '/health-tools/bmi-calculator',
      'Calorie Calculator': '/health-tools/calorie-calculator',
      'Water Intake Calculator': '/health-tools/water-intake',
      'Body Fat Percentage': '/health-tools/body-fat',
      'Ideal Weight Calculator': '/health-tools/ideal-weight',
      'BMR Calculator': '/health-tools/bmr-calculator',
      'Macro Split Calculator': '/health-tools/macro-splitter'
    },
    'QR & Barcode Tools': {
      'QR Code Generator': '/QR-Barcode/qr-code-generator',
      'QR Code Scanner': '/QR-Barcode/qr-code-scanner',
      'Barcode Generator': '/QR-Barcode/barcode-generator',
      'Barcode Scanner': '/QR-Barcode/barcode-scanner',
      'vCard QR Generator': '/QR-Barcode/vcard-qr-generator',
      'WiFi QR Code Generator': '/QR-Barcode/wifi-qr-generator',
      'Event QR Generator': '/QR-Barcode/event-qr-generator',
    },
    'PDF Tools': {
      'PDF Merge': '/PDF-Tools/pdf-merge',
      'PDF Split': '/PDF-Tools/pdf-split',
      'PDF Compressor': '/PDF-Tools/pdf-compressor',
      'PDF Rotate': '/PDF-Tools/pdf-rotate',
      'PDF Watermark': '/PDF-Tools/pdf-watermark',
      'PDF Page Reorder': '/PDF-Tools/pdf-reorder',
    },
  };
  return routes[category]?.[toolName] || null;
};