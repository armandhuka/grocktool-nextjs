// app/QR-Barcode/qr-code-scanner/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'QR Code Scanner - Scan QR Codes Online | GrockTool',
  description: 'Free online QR code scanner. Scan QR codes instantly using your camera. No downloads required.',
};

export default function QRCodeScannerPage() {
  return (
    <div className="min-h-screen bg-toolnest-bg pt-32 pb-16 px-4">
      <div className="toolnest-container max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-toolnest-text mb-4">
            QR Code Scanner
          </h1>
          <p className="text-xl text-toolnest-text/80 max-w-2xl mx-auto">
            Scan QR codes instantly with your camera
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold text-toolnest-text mb-4">
              QR Scanner Coming Soon
            </h2>
            
            <p className="text-gray-600 mb-6">
              Our QR code scanner is currently under development and will be available soon. 
              This feature will allow you to scan QR codes directly from your camera.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Features Coming</h3>
                <ul className="text-sm text-blue-700 text-left space-y-1">
                  <li>• Camera-based scanning</li>
                  <li>• Instant QR code detection</li>
                  <li>• Multiple format support</li>
                  <li>• Mobile optimized</li>
                </ul>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Supported Types</h3>
                <ul className="text-sm text-green-700 text-left space-y-1">
                  <li>• URLs and websites</li>
                  <li>• Contact information</li>
                  <li>• WiFi credentials</li>
                  <li>• Text and messages</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800 text-sm">
                <strong>Note:</strong> Check back soon for the live QR code scanner functionality.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}