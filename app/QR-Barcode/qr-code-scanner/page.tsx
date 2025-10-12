// app/QR-Barcode/barcode-generator/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Barcode Generator - Create Custom Barcodes Online | GrockTool',
  description: 'Free online barcode generator. Create custom barcodes in multiple formats including CODE128, CODE39, EAN-13, UPC-A, and more.',
};

export default function qrScannerPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Barcode Generator</h1>
      
      <div className="max-w-4xl mx-auto">
        {/* Coming Soon Message */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">Coming Soon</h2>
          <p className="text-blue-700">
            Our barcode generator tool is currently under development and will be available soon.
          </p>
        </div>

        {/* Features Preview */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">Supported Barcode Types</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• CODE128</li>
              <li>• CODE39</li>
              <li>• EAN-13</li>
              <li>• UPC-A</li>
              <li>• QR Codes</li>
              <li>• Data Matrix</li>
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">Features</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Custom text encoding</li>
              <li>• Multiple output formats</li>
              <li>• High resolution download</li>
              <li>• Customizable sizes</li>
              <li>• Free to use</li>
              <li>• No registration required</li>
            </ul>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center text-gray-500">
          <p>Check back soon for our powerful barcode generation tools!</p>
        </div>
      </div>
    </div>
  );
}