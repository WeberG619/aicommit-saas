'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { Code2, Zap, Users, BarChart3, CheckCircle2, ArrowRight, Github, GitBranch, Sparkles } from 'lucide-react';
import { PRICING_PLANS } from '@/lib/pricing';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Code2 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <span className="text-xl font-bold dark:text-white">Git Commit AI</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link href="/pricing" className="hidden md:block text-gray-700 dark:text-gray-300">Pricing</Link>
            <Link href="/enterprise" className="hidden md:block text-gray-700 dark:text-gray-300">Enterprise</Link>
            <Link href="/blog" className="hidden md:block text-gray-700 dark:text-gray-300">Blog</Link>
            <ThemeToggle />
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
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Transform Your Git Commits with AI
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Generate professional, consistent commit messages in seconds. Perfect for developers who value clean commit history.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/auth/register">
              <Button size="lg">Start 14-Day Free Trial</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Simple Pricing */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Simple Pricing</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4 dark:text-white">Individual</h3>
              <p className="text-3xl font-bold mb-4 dark:text-white">$9/month</p>
              <Link href="/auth/register">
                <Button className="w-full">Start Free Trial</Button>
              </Link>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow border-2 border-blue-600">
              <h3 className="text-xl font-bold mb-4 dark:text-white">Team</h3>
              <p className="text-3xl font-bold mb-4 dark:text-white">$29/user/month</p>
              <Link href="/auth/register">
                <Button className="w-full">Start Free Trial</Button>
              </Link>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4 dark:text-white">Enterprise</h3>
              <p className="text-3xl font-bold mb-4 dark:text-white">Custom</p>
              <Link href="/contact">
                <Button variant="outline" className="w-full">Contact Sales</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}