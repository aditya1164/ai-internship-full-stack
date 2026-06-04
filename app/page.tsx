'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              AppGenerator
            </h1>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Build Apps from <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Metadata</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            A production-grade metadata-driven application runtime that dynamically generates forms, tables, dashboards, and workflows from JSON configuration. Handles edge cases gracefully without breaking.
          </p>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Dynamic Rendering</h3>
            <p className="text-gray-600">
              Automatically render forms, tables, and dashboards from configuration without hardcoding UI components.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">🛡️</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Error Resilience</h3>
            <p className="text-gray-600">
              Gracefully handles missing fields, invalid values, unknown components, and inconsistent schemas.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">⚙️</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Full Stack</h3>
            <p className="text-gray-600">
              Complete solution with frontend renderers, backend APIs, database schema generation, and authentication.
            </p>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Technology Stack</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Frontend</h4>
              <ul className="text-gray-600 space-y-2">
                <li>✓ Next.js 15</li>
                <li>✓ React 19</li>
                <li>✓ TypeScript</li>
                <li>✓ TailwindCSS</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Backend</h4>
              <ul className="text-gray-600 space-y-2">
                <li>✓ Next.js API Routes</li>
                <li>✓ TypeScript</li>
                <li>✓ RESTful APIs</li>
                <li>✓ Validation System</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Database</h4>
              <ul className="text-gray-600 space-y-2">
                <li>✓ PostgreSQL</li>
                <li>✓ Prisma ORM</li>
                <li>✓ Dynamic Schema</li>
                <li>✓ Migration Support</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Demo Section */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200 p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🎁</span>
              <h3 className="text-2xl font-bold text-gray-900">Track A Additional Features</h3>
            </div>
            <p className="text-gray-700 mb-6">
              Three powerful features implemented for Track A requirements:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 border border-amber-100">
                <div className="text-2xl mb-2">📤</div>
                <h4 className="font-semibold text-gray-900 mb-1">CSV Import</h4>
                <p className="text-sm text-gray-600">Bulk upload records from CSV with validation</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-amber-100">
                <div className="text-2xl mb-2">🔔</div>
                <h4 className="font-semibold text-gray-900 mb-1">Notifications</h4>
                <p className="text-sm text-gray-600">Toast alerts for form submissions and actions</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-amber-100">
                <div className="text-2xl mb-2">🌐</div>
                <h4 className="font-semibold text-gray-900 mb-1">Multi-language</h4>
                <p className="text-sm text-gray-600">English & Spanish support with language switcher</p>
              </div>
            </div>
            <div className="mt-6">
              <Link
                href="/demo/features"
                className="inline-flex items-center gap-2 bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
              >
                📚 View Features Demo →
              </Link>
            </div>
          </div>

          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Live Demos</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/demo/form"
              className="group bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="text-5xl mb-4">📝</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600">Form Demo</h3>
              <p className="text-gray-700 mb-4">
                See dynamic form rendering with validation, error handling, and responsive layouts.
              </p>
              <span className="inline-flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
                Try it →
              </span>
            </Link>

            <Link
              href="/demo/table"
              className="group bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-green-600">Table Demo</h3>
              <p className="text-gray-700 mb-4">
                Explore sortable, filterable tables with search, pagination, and CRUD actions.
              </p>
              <span className="inline-flex items-center text-green-600 font-semibold group-hover:translate-x-2 transition-transform">
                Try it →
              </span>
            </Link>

            <Link
              href="/demo/dashboard"
              className="group bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-xl p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="text-5xl mb-4">📈</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-purple-600">Dashboard Demo</h3>
              <p className="text-gray-700 mb-4">
                Beautiful dashboards with stats cards, charts, and data visualization.
              </p>
              <span className="inline-flex items-center text-purple-600 font-semibold group-hover:translate-x-2 transition-transform">
                Try it →
              </span>
            </Link>
          </div>
        </div>

        {/* Core Capabilities */}
        <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Core Capabilities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <span className="text-2xl">✓</span>
              <div>
                <h4 className="font-semibold text-gray-900">Config Validation</h4>
                <p className="text-gray-600">Sanitizes and validates configurations with smart fallbacks</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-2xl">✓</span>
              <div>
                <h4 className="font-semibold text-gray-900">Form Rendering</h4>
                <p className="text-gray-600">Responsive forms with 8+ field types and custom validation</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-2xl">✓</span>
              <div>
                <h4 className="font-semibold text-gray-900">Data Tables</h4>
                <p className="text-gray-600">Sortable, filterable tables with search and pagination</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-2xl">✓</span>
              <div>
                <h4 className="font-semibold text-gray-900">Dashboard Views</h4>
                <p className="text-gray-600">Analytics dashboards with stats and data visualization</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-2xl">✓</span>
              <div>
                <h4 className="font-semibold text-gray-900">API Routes</h4>
                <p className="text-gray-600">RESTful APIs for config management and data submission</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-2xl">✓</span>
              <div>
                <h4 className="font-semibold text-gray-900">Error Handling</h4>
                <p className="text-gray-600">Graceful degradation and user-friendly error messages</p>
              </div>
            </div>
          </div>
        </div>

        {/* Architecture Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-md p-8 border border-gray-100 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">System Architecture</h3>
          <div className="space-y-4 text-gray-700">
            <p>
              <strong>Config Validation Layer:</strong> Sanitizes JSON configurations, handles missing fields, invalid values, and unknown components with intelligent fallbacks.
            </p>
            <p>
              <strong>Dynamic Rendering Engine:</strong> Converts validated configs into React components (forms, tables, dashboards) without custom code per view.
            </p>
            <p>
              <strong>API Runtime:</strong> Auto-generates CRUD endpoints and handles data submission, validation, and persistence.
            </p>
            <p>
              <strong>Database Integration:</strong> Prisma ORM with dynamic schema generation from config metadata.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to Explore?</h3>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Check out the live demos to see the dynamic rendering system in action.
          </p>
          <div className="flex justify-center gap-4 flex-col sm:flex-row">
            <Link
              href="/demo/form"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
            >
              View Form Demo
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border-2 border-gray-300 text-gray-900 rounded-lg font-semibold hover:border-gray-400 transition-colors"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-20">
        <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 text-center text-gray-600">
          <p>AI Software Engineer Internship • Track A - AI App Generator</p>
          <p className="text-sm mt-2">Built with Next.js, React, TypeScript, and TailwindCSS</p>
        </div>
      </footer>
    </div>
  );
}
