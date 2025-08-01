'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Code2, Copy, CheckCircle2, ChevronDown, ChevronRight, ArrowLeft } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

export default function APIDocsPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>('authentication');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Link href="/" className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm">Back</span>
              </Link>
              <Link href="/" className="flex items-center space-x-2">
                <Code2 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <span className="text-2xl font-bold dark:text-white">Git Commit AI</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth/login" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                Sign In
              </Link>
              <ThemeToggle />
              <Link href="/auth/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            API Documentation
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Integrate Git Commit AI into your workflows with our powerful REST API.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sticky top-6">
              <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h2>
              <nav className="space-y-2">
                <a href="#authentication" className="block text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Authentication</a>
                <a href="#generate-commit" className="block text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Generate Commit</a>
                <a href="#history" className="block text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Commit History</a>
                <a href="#rate-limits" className="block text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Rate Limits</a>
                <a href="#errors" className="block text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Error Handling</a>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Base URL */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 dark:text-white">Base URL</h2>
              <div className="bg-gray-900 rounded-lg p-4 relative">
                <code className="text-green-400 text-sm">https://api.aicommit.dev/v1</code>
                <button
                  onClick={() => copyToClipboard('https://api.aicommit.dev/v1', 'base-url')}
                  className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white"
                >
                  {copiedCode === 'base-url' ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Authentication */}
            <div id="authentication" className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleSection('authentication')}
              >
                <h2 className="text-xl font-semibold dark:text-white">Authentication</h2>
                {expandedSection === 'authentication' ? 
                  <ChevronDown className="h-5 w-5 text-gray-400" /> : 
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                }
              </div>
              
              {expandedSection === 'authentication' && (
                <div className="mt-4 space-y-4">
                  <p className="text-gray-600 dark:text-gray-400">
                    All API requests require authentication using an API key in the Authorization header.
                  </p>
                  
                  <div>
                    <h3 className="font-medium mb-2 dark:text-white">Getting your API Key</h3>
                    <ol className="list-decimal list-inside space-y-1 text-gray-600 dark:text-gray-400 text-sm">
                      <li>Log in to your dashboard</li>
                      <li>Navigate to Settings → API Keys</li>
                      <li>Click "Generate New Key"</li>
                      <li>Copy and store your key securely</li>
                    </ol>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2 dark:text-white">Request Headers</h3>
                    <div className="bg-gray-900 rounded-lg p-4 relative">
                      <pre className="text-green-400 text-sm">
{`Authorization: Bearer YOUR_API_KEY
Content-Type: application/json`}
                      </pre>
                      <button
                        onClick={() => copyToClipboard('Authorization: Bearer YOUR_API_KEY\nContent-Type: application/json', 'auth-headers')}
                        className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white"
                      >
                        {copiedCode === 'auth-headers' ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Generate Commit Message */}
            <div id="generate-commit" className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 dark:text-white">Generate Commit Message</h2>
              
              <div className="space-y-4">
                <div>
                  <span className="inline-block bg-green-100 text-green-800 text-sm px-2 py-1 rounded font-medium">POST</span>
                  <code className="ml-2 text-gray-700 dark:text-gray-300">/commits/generate</code>
                </div>

                <div>
                  <h3 className="font-medium mb-2 dark:text-white">Request Body</h3>
                  <div className="bg-gray-900 rounded-lg p-4 relative">
                    <pre className="text-green-400 text-sm">
{`{
  "diff": "string",          // Git diff output
  "style": "conventional",   // Style: conventional, angular, semantic
  "context": {              // Optional context
    "branch": "string",
    "files": ["string"],
    "language": "string"
  }
}`}
                    </pre>
                    <button
                      onClick={() => copyToClipboard(`{
  "diff": "string",
  "style": "conventional",
  "context": {
    "branch": "string",
    "files": ["string"],
    "language": "string"
  }
}`, 'generate-request')}
                      className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white"
                    >
                      {copiedCode === 'generate-request' ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2 dark:text-white">Response</h3>
                  <div className="bg-gray-900 rounded-lg p-4 relative">
                    <pre className="text-green-400 text-sm">
{`{
  "commit_message": "feat(auth): add password reset functionality",
  "type": "feat",
  "scope": "auth",
  "description": "add password reset functionality",
  "breaking_change": false,
  "confidence": 0.95
}`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2 dark:text-white">Example cURL</h3>
                  <div className="bg-gray-900 rounded-lg p-4 relative">
                    <pre className="text-green-400 text-sm">
{`curl -X POST https://api.aicommit.dev/v1/commits/generate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "diff": "diff --git a/auth.js...",
    "style": "conventional"
  }'`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Commit History */}
            <div id="history" className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 dark:text-white">Commit History</h2>
              
              <div className="space-y-4">
                <div>
                  <span className="inline-block bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded font-medium">GET</span>
                  <code className="ml-2 text-gray-700 dark:text-gray-300">/commits/history</code>
                </div>

                <div>
                  <h3 className="font-medium mb-2 dark:text-white">Query Parameters</h3>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <table className="text-sm">
                      <tbody>
                        <tr>
                          <td className="font-medium pr-4 text-gray-900 dark:text-white">limit</td>
                          <td className="text-gray-600 dark:text-gray-300">Number of results (default: 50, max: 100)</td>
                        </tr>
                        <tr>
                          <td className="font-medium pr-4 pt-2 text-gray-900 dark:text-white">offset</td>
                          <td className="text-gray-600 dark:text-gray-300 pt-2">Pagination offset</td>
                        </tr>
                        <tr>
                          <td className="font-medium pr-4 pt-2 text-gray-900 dark:text-white">from</td>
                          <td className="text-gray-600 dark:text-gray-300 pt-2">Start date (ISO 8601)</td>
                        </tr>
                        <tr>
                          <td className="font-medium pr-4 pt-2 text-gray-900 dark:text-white">to</td>
                          <td className="text-gray-600 dark:text-gray-300 pt-2">End date (ISO 8601)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Rate Limits */}
            <div id="rate-limits" className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Rate Limits</h2>
              
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300">
                  API requests are rate limited based on your subscription plan:
                </p>
                
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-600">
                        <th className="text-left pb-2 text-gray-900 dark:text-white">Plan</th>
                        <th className="text-left pb-2 text-gray-900 dark:text-white">Requests/Hour</th>
                        <th className="text-left pb-2 text-gray-900 dark:text-white">Requests/Day</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200 dark:border-gray-600">
                        <td className="py-2 text-gray-900 dark:text-white">Individual</td>
                        <td className="text-gray-900 dark:text-white">100</td>
                        <td className="text-gray-900 dark:text-white">1,000</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-600">
                        <td className="py-2 text-gray-900 dark:text-white">Team</td>
                        <td className="text-gray-900 dark:text-white">500</td>
                        <td className="text-gray-900 dark:text-white">5,000</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-gray-900 dark:text-white">Enterprise</td>
                        <td className="text-gray-900 dark:text-white">Unlimited</td>
                        <td className="text-gray-900 dark:text-white">Unlimited</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Rate Limit Headers</h3>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <pre className="text-green-400 text-sm">
{`X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642550400`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Error Handling */}
            <div id="errors" className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Error Handling</h2>
              
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300">
                  The API uses standard HTTP status codes and returns detailed error messages.
                </p>
                
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Error Response Format</h3>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <pre className="text-green-400 text-sm">
{`{
  "error": {
    "code": "invalid_api_key",
    "message": "The provided API key is invalid",
    "details": {}
  }
}`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Common Error Codes</h3>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-2 text-sm">
                    <div className="text-gray-900 dark:text-gray-200"><code className="font-mono bg-gray-200 dark:bg-gray-600 dark:text-gray-200 px-1">400</code> - Bad Request</div>
                    <div className="text-gray-900 dark:text-gray-200"><code className="font-mono bg-gray-200 dark:bg-gray-600 dark:text-gray-200 px-1">401</code> - Unauthorized</div>
                    <div className="text-gray-900 dark:text-gray-200"><code className="font-mono bg-gray-200 dark:bg-gray-600 dark:text-gray-200 px-1">403</code> - Forbidden</div>
                    <div className="text-gray-900 dark:text-gray-200"><code className="font-mono bg-gray-200 dark:bg-gray-600 dark:text-gray-200 px-1">404</code> - Not Found</div>
                    <div className="text-gray-900 dark:text-gray-200"><code className="font-mono bg-gray-200 dark:bg-gray-600 dark:text-gray-200 px-1">429</code> - Rate Limit Exceeded</div>
                    <div className="text-gray-900 dark:text-gray-200"><code className="font-mono bg-gray-200 dark:bg-gray-600 dark:text-gray-200 px-1">500</code> - Internal Server Error</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}