import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Features Demo - AppGenerator',
  description: 'Showcasing CSV Import, Notifications, and Multi-language Support',
};

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-700 font-medium mb-4 inline-block"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Track A Features Demo
          </h1>
          <p className="text-lg text-gray-600">
            Showcasing 3 additional Track A features: CSV Import, Notifications, and Multi-language Support
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Feature 1: CSV Import */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="text-3xl mb-3">📤</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">CSV Import</h2>
            <p className="text-gray-600 text-sm mb-4">
              Bulk import records from CSV files with validation and error handling.
            </p>
            <ul className="text-sm text-gray-600 space-y-1 mb-4">
              <li>✓ Drag & drop upload</li>
              <li>✓ Row-by-row validation</li>
              <li>✓ Type conversion</li>
              <li>✓ Error reporting</li>
            </ul>
            <Link
              href="/demo/table"
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              Try it on Table Demo →
            </Link>
          </div>

          {/* Feature 2: Notifications */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <div className="text-3xl mb-3">🔔</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Notifications</h2>
            <p className="text-gray-600 text-sm mb-4">
              Real-time toast notifications for form submissions and actions.
            </p>
            <ul className="text-sm text-gray-600 space-y-1 mb-4">
              <li>✓ Success messages</li>
              <li>✓ Error alerts</li>
              <li>✓ Auto-dismiss</li>
              <li>✓ Customizable types</li>
            </ul>
            <Link
              href="/demo/form"
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              Try it on Form Demo →
            </Link>
          </div>

          {/* Feature 3: Multi-language */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
            <div className="text-3xl mb-3">🌐</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Multi-language</h2>
            <p className="text-gray-600 text-sm mb-4">
              Support for multiple languages with easy switching.
            </p>
            <ul className="text-sm text-gray-600 space-y-1 mb-4">
              <li>✓ English & Spanish</li>
              <li>✓ Language switcher</li>
              <li>✓ URL-based routing</li>
              <li>✓ Easy to extend</li>
            </ul>
            <Link
              href="/demo/form"
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              Switch language in navbar →
            </Link>
          </div>
        </div>

        {/* Implementation Details */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Implementation Details</h2>
          
          <div className="space-y-6">
            {/* CSV Import */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">📤</span>
                CSV Import Implementation
              </h3>
              <div className="bg-gray-50 p-4 rounded border border-gray-200 space-y-2 text-sm">
                <p><strong>API Endpoint:</strong> <code className="bg-gray-100 px-2 py-1 rounded">POST /api/import-csv</code></p>
                <p><strong>Features:</strong></p>
                <ul className="list-disc list-inside ml-4 text-gray-600 space-y-1">
                  <li>Accepts CSV file upload via FormData</li>
                  <li>Validates against config schema</li>
                  <li>Type conversion for numbers, dates, booleans</li>
                  <li>Returns success/failure counts and detailed errors</li>
                  <li>Bulk inserts validated records to database</li>
                </ul>
                <p><strong>Usage:</strong> Upload CSV to table demo with columns matching form fields</p>
              </div>
            </div>

            {/* Notifications */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">🔔</span>
                Toast Notifications Implementation
              </h3>
              <div className="bg-gray-50 p-4 rounded border border-gray-200 space-y-2 text-sm">
                <p><strong>Components:</strong> <code className="bg-gray-100 px-2 py-1 rounded">useNotification()</code> hook + <code className="bg-gray-100 px-2 py-1 rounded">ToastContainer</code></p>
                <p><strong>Features:</strong></p>
                <ul className="list-disc list-inside ml-4 text-gray-600 space-y-1">
                  <li>Context-based notification system</li>
                  <li>4 toast types: success, error, warning, info</li>
                  <li>Auto-dismiss after configurable duration</li>
                  <li>Stacked display with close buttons</li>
                  <li>Shows on form submissions and API errors</li>
                </ul>
                <p><strong>Usage:</strong> <code className="bg-gray-100 px-2 py-1 rounded">useNotification().addToast('message', 'success')</code></p>
              </div>
            </div>

            {/* Multi-language */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">🌐</span>
                Multi-language Implementation
              </h3>
              <div className="bg-gray-50 p-4 rounded border border-gray-200 space-y-2 text-sm">
                <p><strong>Framework:</strong> <code className="bg-gray-100 px-2 py-1 rounded">next-intl</code> for i18n</p>
                <p><strong>Supported Languages:</strong> English (en), Spanish (es)</p>
                <p><strong>Features:</strong></p>
                <ul className="list-disc list-inside ml-4 text-gray-600 space-y-1">
                  <li>Language switcher in navigation</li>
                  <li>URL-based locale routing (/en/demo/form, /es/demo/form)</li>
                  <li>Translation files in messages/ directory</li>
                  <li>Automatic language persistence</li>
                  <li>Easy to add more languages</li>
                </ul>
                <p><strong>Usage:</strong> Click language selector in navbar to switch</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 border border-blue-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Try the Features</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link
              href="/demo/form"
              className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow border border-blue-200 text-center"
            >
              <div className="text-3xl mb-2">📝</div>
              <h3 className="font-semibold text-gray-900">Form Demo</h3>
              <p className="text-sm text-gray-600 mt-2">See notifications in action</p>
            </Link>

            <Link
              href="/demo/table"
              className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow border border-green-200 text-center"
            >
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-semibold text-gray-900">Table Demo</h3>
              <p className="text-sm text-gray-600 mt-2">Try CSV import</p>
            </Link>

            <Link
              href="/demo/dashboard"
              className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow border border-purple-200 text-center"
            >
              <div className="text-3xl mb-2">📈</div>
              <h3 className="font-semibold text-gray-900">Dashboard Demo</h3>
              <p className="text-sm text-gray-600 mt-2">View analytics</p>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-600 text-sm">
          <p>Track A - AI App Generator | 3 Additional Features Implemented</p>
        </div>
      </div>
    </main>
  );
}
