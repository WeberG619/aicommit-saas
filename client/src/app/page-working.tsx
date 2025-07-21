import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Code2, CheckCircle2, ArrowRight } from 'lucide-react';

export default function WorkingHomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Code2 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">Git Commit AI</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link href="/pricing" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">Pricing</Link>
            <Link href="/auth/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/auth/register">
              <Button>Start Free Trial</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Transform Your Git Commits with AI
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Generate professional, consistent commit messages in seconds. Perfect for developers who value clean commit history.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/auth/register">
              <Button size="lg" className="group">
                Start 14-Day Free Trial
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition" />
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              See Demo
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              Cancel anytime
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              All features included
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Everything You Need for Perfect Commits
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">AI-Powered Generation</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Advanced GPT-4 technology analyzes your code changes and generates meaningful commit messages instantly.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Multiple Commit Styles</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Choose from conventional, semantic, emoji, or custom styles to match your team's standards.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Team Collaboration</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Share commit styles, enforce standards, and maintain consistency across your entire team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Simple, Transparent Pricing
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Individual</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">$9</span>
                <span className="text-gray-600 dark:text-gray-400">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">Unlimited commits</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">All commit styles</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">VS Code extension</span>
                </li>
              </ul>
              <Link href="/auth/register?plan=individual">
                <Button className="w-full">Start Free Trial</Button>
              </Link>
            </div>

            <div className="bg-blue-600 text-white p-8 rounded-xl shadow-lg border-2 border-blue-500 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-4">Team</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">$29</span>
                <span className="text-blue-100">/user/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-200" />
                  Everything in Individual
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-200" />
                  Up to 10 team members
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-200" />
                  Team analytics
                </li>
              </ul>
              <Link href="/auth/register?plan=team">
                <Button className="w-full bg-white text-blue-600 hover:bg-gray-100">
                  Start Free Trial
                </Button>
              </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Enterprise</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">Custom</span>
                <span className="text-gray-600 dark:text-gray-400">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">Everything in Team</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">Unlimited team members</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">SSO authentication</span>
                </li>
              </ul>
              <Link href="/contact">
                <Button variant="outline" className="w-full">Contact Sales</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Code2 className="h-6 w-6 text-blue-400" />
            <span className="text-white font-semibold">Git Commit AI</span>
          </div>
          <p className="text-sm mb-8">Professional commit messages powered by AI.</p>
          <p className="text-sm">&copy; 2024 Git Commit AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}