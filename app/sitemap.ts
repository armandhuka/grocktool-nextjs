import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.grocktool.com'
  const currentDate = new Date()
  
  // Main pages
  const mainPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]

  // Text Tools
  const textTools = [
    'text-case-converter',
    'word-character-counter',
    'remove-duplicate-lines',
    'text-sorter',
    'text-reverser',
    'slug-generator',
    'find-replace',
    'palindrome-checker',
    'remove-special-characters',
    'text-length-limiter'
  ].map(tool => ({
    url: `${baseUrl}/tools/${tool}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Unit Converter Tools
  const converterTools = [
    'length-converter',
    'weight-converter',
    'temperature-converter',
    'time-converter',
    'speed-converter',
    'area-converter',
    'volume-converter',
    'data-size-converter',
    'all-in-one-converter'
  ].map(tool => ({
    url: `${baseUrl}/tools/${tool}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Date & Time Tools
  const dateTimeTools = [
    'age-calculator',
    'date-difference-calculator',
    'countdown-timer',
    'work-days-calculator',
    'birthday-countdown',
    'leap-year-checker',
    'week-number-checker'
  ].map(tool => ({
    url: `${baseUrl}/tools/${tool}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Number Tools
  const numberTools = [
    'percentage-calculator',
    'simple-interest',
    'emi-calculator',
    'roman-numeral-converter',
    'lcm-hcf-calculator',
    'number-to-words',
    'scientific-notation',
    'number-base-converter',
    'rounding-tool',
    'random-number-generator'
  ].map(tool => ({
    url: `${baseUrl}/tools/${tool}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Math Tools
  const mathTools = [
    'basic-calculator',
    'prime-checker',
    'factorial-calculator',
    'multiplication-table',
    'quadratic-equation-solver',
    'percentage-change',
    'triangle-area',
    'circle-calculator',
    'exponent-log',
    'average-median-mode'
  ].map(tool => ({
    url: `${baseUrl}/tools/${tool}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Health Tools
  const healthTools = [
    'bmi-calculator',
    'calorie-calculator',
    'water-intake-calculator',
    'body-fat-calculator',
    'ideal-weight',
    'bmr-calculator',
    'macro-calculator'
  ].map(tool => ({
    url: `${baseUrl}/tools/${tool}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Developer Tools
  const developerTools = [
    'json-formatter',
    'html-formatter',
    'css-formatter',
    'javascript-formatter',
    'xml-formatter',
    'sql-formatter',
    'base64-encoder',
    'base64-decoder',
    'url-encoder',
    'url-decoder',
    'hash-generator',
    'uuid-generator'
  ].map(tool => ({
    url: `${baseUrl}/tools/${tool}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Image Tools
  const imageTools = [
    'image-converter',
    'image-compressor',
    'image-resizer',
    'color-picker',
    'palette-generator',
    'qr-code-generator',
    'qr-code-reader'
  ].map(tool => ({
    url: `${baseUrl}/tools/${tool}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Combine all URLs
  return [
    ...mainPages,
    ...textTools,
    ...converterTools,
    ...dateTimeTools,
    ...numberTools,
    ...mathTools,
    ...healthTools,
    // ...developerTools,
    // ...imageTools,
  ]
}