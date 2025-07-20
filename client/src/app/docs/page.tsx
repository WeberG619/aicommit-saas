'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Code2, 
  Terminal, 
  Download, 
  Settings, 
  BookOpen,
  ChevronRight,
  Copy,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

export default function DocsPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const sections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: BookOpen,
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3 dark:text-white">Quick Start</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Get up and running with Git Commit AI in under 2 minutes.
            </p>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2 dark:text-white">1. Install the CLI</h4>
                <div className="bg-gray-900 rounded-lg p-4 relative">
                  <code className="text-green-400 text-sm">
                    npm install -g git-commit-ai
                  </code>
                  <button
                    onClick={() => copyToClipboard('npm install -g git-commit-ai', 'install')}
                    className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white"
                  >
                    {copiedCode === 'install' ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2 dark:text-white">2. Authenticate</h4>
                <div className="bg-gray-900 rounded-lg p-4 relative">
                  <code className="text-green-400 text-sm">
                    gca auth login
                  </code>
                  <button
                    onClick={() => copyToClipboard('gca auth login', 'auth')}
                    className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white"
                  >
                    {copiedCode === 'auth' ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2 dark:text-white">3. Generate your first commit</h4>
                <div className="bg-gray-900 rounded-lg p-4 relative">
                  <pre className="text-green-400 text-sm">
{`git add .
gca commit`}
                  </pre>
                  <button
                    onClick={() => copyToClipboard('git add .\ngca commit', 'commit')}
                    className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white"
                  >
                    {copiedCode === 'commit' ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'cli-usage',
      title: 'CLI Usage',
      icon: Terminal,
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3">Command Reference</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-2 dark:text-white">Basic Commands</h4>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-3">
                  <div>
                    <code className="bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white px-2 py-1 rounded text-sm">gca commit</code>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Generate and create a commit message</p>
                  </div>
                  <div>
                    <code className="bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white px-2 py-1 rounded text-sm">gca generate</code>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Generate a commit message without committing</p>
                  </div>
                  <div>
                    <code className="bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white px-2 py-1 rounded text-sm">gca status</code>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Show current authentication status</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2 dark:text-white">Options & Flags</h4>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-3">
                  <div>
                    <code className="bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white px-2 py-1 rounded text-sm">--style &lt;type&gt;</code>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Set commit message style (conventional, angular, semantic)</p>
                  </div>
                  <div>
                    <code className="bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white px-2 py-1 rounded text-sm">--no-verify</code>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Skip git hooks when committing</p>
                  </div>
                  <div>
                    <code className="bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white px-2 py-1 rounded text-sm">--dry-run</code>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Show what would be committed without committing</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2 dark:text-white">Examples</h4>
                <div className="space-y-3">
                  <div className="bg-gray-900 rounded-lg p-4">
                    <div className="text-gray-400 text-sm mb-2"># Generate conventional commit</div>
                    <code className="text-green-400">gca commit --style conventional</code>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <div className="text-gray-400 text-sm mb-2"># Preview without committing</div>
                    <code className="text-green-400">gca generate --dry-run</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'vscode',
      title: 'VS Code Extension',
      icon: Code2,
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3">VS Code Integration</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2 dark:text-white">Installation</h4>
                <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300">
                  <li>Open VS Code</li>
                  <li>Go to Extensions (Ctrl+Shift+X)</li>
                  <li>Search for "Git Commit AI"</li>
                  <li>Click Install</li>
                  <li>Reload VS Code</li>
                </ol>
              </div>

              <div>
                <h4 className="font-medium mb-2 dark:text-white">Usage</h4>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-3">
                  <div>
                    <strong>Source Control Panel:</strong>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Click the "✨ Generate AI Commit" button in the Source Control panel</p>
                  </div>
                  <div>
                    <strong>Command Palette:</strong>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Press Ctrl+Shift+P and search for "Git Commit AI"</p>
                  </div>
                  <div>
                    <strong>Keyboard Shortcut:</strong>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Use Ctrl+Alt+G (customizable)</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2 dark:text-white">Settings</h4>
                <div className="bg-gray-900 rounded-lg p-4">
                  <pre className="text-green-400 text-sm">
{`{
  "gitCommitAI.style": "conventional",
  "gitCommitAI.autoStage": true,
  "gitCommitAI.showPreview": true
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'configuration',
      title: 'Configuration',
      icon: Settings,
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3">Configuration Options</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-2 dark:text-white">Global Config</h4>
                <p className="text-gray-600 dark:text-gray-300 mb-3">Create a config file at <code className="bg-gray-200 px-2 py-1 rounded text-sm">~/.gca/config.json</code></p>
                <div className="bg-gray-900 rounded-lg p-4">
                  <pre className="text-green-400 text-sm">
{`{
  "style": "conventional",
  "maxLength": 72,
  "includeScope": true,
  "autoSign": false,
  "templates": {
    "feat": "feat({{scope}}): {{description}}",
    "fix": "fix({{scope}}): {{description}}"
  }
}`}
                  </pre>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2 dark:text-white">Project-Specific Config</h4>
                <p className="text-gray-600 dark:text-gray-300 mb-3">Create <code className="bg-gray-200 px-2 py-1 rounded text-sm">.gca.json</code> in your project root</p>
                <div className="bg-gray-900 rounded-lg p-4">
                  <pre className="text-green-400 text-sm">
{`{
  "style": "angular",
  "scopes": ["ui", "api", "docs", "test"],
  "excludeFiles": ["*.md", "package-lock.json"]
}`}
                  </pre>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2 dark:text-white">Environment Variables</h4>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div>
                    <code className="bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white px-2 py-1 rounded text-sm">GCA_API_KEY</code>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Your API key (auto-set after login)</p>
                  </div>
                  <div>
                    <code className="bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white px-2 py-1 rounded text-sm">GCA_STYLE</code>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Default commit style</p>
                  </div>
                  <div>
                    <code className="bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white px-2 py-1 rounded text-sm">GCA_MAX_LENGTH</code>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Maximum commit message length</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const [activeSection, setActiveSection] = useState('getting-started');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Code2 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="text-2xl font-bold dark:text-white">Git Commit AI</span>
            </Link>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sticky top-6">
              <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Documentation</h2>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                      activeSection === section.id
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <section.icon className="h-4 w-4" />
                    <span className="text-sm">{section.title}</span>
                  </button>
                ))}
              </nav>

              <div className="mt-8 pt-6 border-t">
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Quick Links</h3>
                <div className="space-y-2">
                  <Link 
                    href="/api-docs" 
                    className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    <ExternalLink className="h-3 w-3" />
                    <span>API Reference</span>
                  </Link>
                  <Link 
                    href="https://github.com/gitcommit-ai/examples" 
                    className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    <ExternalLink className="h-3 w-3" />
                    <span>Examples</span>
                  </Link>
                  <Link 
                    href="/contact" 
                    className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    <ExternalLink className="h-3 w-3" />
                    <span>Support</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
              {sections.find(s => s.id === activeSection)?.content}
            </div>

            {/* Additional Resources */}
            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">Need Help?</h3>
                <p className="text-blue-700 dark:text-blue-300 text-sm mb-4">
                  Our support team is here to help you get the most out of Git Commit AI.
                </p>
                <Link href="/contact">
                  <Button size="sm" variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-100">
                    Contact Support
                  </Button>
                </Link>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                <h3 className="font-semibold text-green-900 dark:text-green-300 mb-2">Join the Community</h3>
                <p className="text-green-700 dark:text-green-300 text-sm mb-4">
                  Connect with other developers and share your experiences.
                </p>
                <Link href="https://discord.gg/gitcommitai">
                  <Button size="sm" variant="outline" className="border-green-200 text-green-700 hover:bg-green-100">
                    Join Discord
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}