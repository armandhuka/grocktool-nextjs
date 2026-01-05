import { MetadataRoute } from 'next'
import { toolsData } from '../app/data/toolsData'
import { getToolRoute } from '../app/utils/toolRoutes'

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

  const getToolPages = (categoryFilter?: string) => {
    return toolsData
      .filter(tool => tool.status === 'available' && 
        (!categoryFilter || tool.category === categoryFilter))
      .map(tool => {
        const routePath = getToolRoute(tool.name, tool.category)
        return {
          url: `${baseUrl}${routePath}`,
          lastModified: currentDate,
          changeFrequency: 'weekly' as const,
          priority: 0.8,
        }
      })
      .filter(tool => tool.url !== `${baseUrl}null`) 
  }

  // Unit Converter Tools
  const unitConverterTools = getToolPages('Unit Converter Tools')

  // Text Tools
  const textTools = getToolPages('Text Tools')

  // Date & Time Tools
  const dateTimeTools = getToolPages('Date & Time Tools')

  // Number Tools
  const numberTools = getToolPages('Number Tools')

  // Math Tools
  const mathTools = getToolPages('Math Tools')

  // Health Tools
  const healthTools = getToolPages('Health Tools')

  // QR & Barcode Tools
  const qrBarcodeTools = getToolPages('QR & Barcode Tools')

  // PDF Tools
  const pdfTools = getToolPages('PDF Tools')

    // PDF Tools
  const developerTools = getToolPages('Developer Tools')

  // Combine all URLs
  return [
    ...mainPages,
    ...unitConverterTools,
    ...textTools,
    ...dateTimeTools,
    ...numberTools,
    ...mathTools,
    ...healthTools,
    ...qrBarcodeTools,
    ...pdfTools,
    ...developerTools
  ]
}