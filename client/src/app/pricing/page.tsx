'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { 
  Code2, 
  CheckCircle2, 
  X, 
  ArrowLeft,
  Crown,
  Building2,
  Users,
  Zap,
  Shield,
  Headphones,
  Award,
  Star
} from 'lucide-react';

export default function PricingPage() {
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
              <ThemeToggle />
              <Link href="/auth/login" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                Sign In
              </Link>
              <Link href="/auth/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Choose Your Perfect Plan
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
            From individual developers to enterprise teams, we have the right solution 
            to transform your Git commit workflow with AI.
          </p>
          
          {/* Comparison vs Free Tools */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 max-w-4xl mx-auto mb-16">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-4">
              ⚡ Why Choose Git Commit AI over Free CLI Tools?
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span className="text-blue-800 dark:text-blue-200">Your code stays private (never sent to OpenAI)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span className="text-blue-800 dark:text-blue-200">Context-aware commits (why + what, not just what)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span className="text-blue-800 dark:text-blue-200">Team collaboration and analytics</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Individual Plan */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg mb-4">
                  <Code2 className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Individual</h3>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  $9<span className="text-base font-normal text-gray-600 dark:text-gray-400">/month</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">Perfect for solo developers</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">500 commits/month</span>
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">All commit styles</span>
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Context-aware generation</span>
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Quality scoring</span>
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Web dashboard</span>
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Email support</span>
                </li>
              </ul>
              
              <Link href="/auth/register">
                <Button className="w-full">Start Free Trial</Button>
              </Link>
            </div>

            {/* Team Plan */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">Most Popular</span>
              </div>
              
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg mb-4">
                  <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Team</h3>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  $29<span className="text-base font-normal text-gray-600 dark:text-gray-400">/user/month</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">Growing development teams</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Unlimited commits</span>
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">All Individual features</span>
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Team analytics dashboard</span>
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">JIRA/Linear integration</span>
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Custom style guidelines</span>
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Priority support</span>
                </li>
              </ul>
              
              <Link href="/auth/register">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Start Team Trial</Button>
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg mb-4">
                  <Building2 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Enterprise</h3>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  Custom<span className="text-base font-normal text-gray-600 dark:text-gray-400"> pricing</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">Large organizations</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">All Team features</span>
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">On-premise deployment</span>
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Custom model training</span>
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">SOC 2 compliance</span>
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">24/7 support with SLA</span>
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Dedicated success manager</span>
                </li>
              </ul>
              
              <Link href="/contact">
                <Button variant="outline" className="w-full">Contact Sales</Button>
              </Link>
            </div>

            {/* Free CLI Tools Comparison */}
            <div className="bg-gray-100 dark:bg-gray-700 rounded-xl shadow-lg border border-gray-300 dark:border-gray-600 p-8 relative opacity-75">
              <div className="absolute top-4 right-4">
                <span className="bg-gray-500 text-white px-2 py-1 rounded-full text-xs">Competitors</span>
              </div>
              
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-lg mb-4">
                  <Crown className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Free CLI Tools</h3>
                <div className="text-3xl font-bold text-gray-700 dark:text-gray-300">
                  $0<span className="text-base font-normal text-gray-500 dark:text-gray-400">/month</span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">aicommits, opencommit, etc.</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-400">Basic commit generation</span>
                </li>
                <li className="flex items-center text-sm">
                  <X className="h-4 w-4 text-red-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-400">Code sent to OpenAI</span>
                </li>
                <li className="flex items-center text-sm">
                  <X className="h-4 w-4 text-red-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-400">No business context</span>
                </li>
                <li className="flex items-center text-sm">
                  <X className="h-4 w-4 text-red-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-400">No team features</span>
                </li>
                <li className="flex items-center text-sm">
                  <X className="h-4 w-4 text-red-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-400">No support</span>
                </li>
                <li className="flex items-center text-sm">
                  <X className="h-4 w-4 text-red-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-400">Command line only</span>
                </li>
              </ul>
              
              <Button disabled className="w-full opacity-50">
                Limited Features
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-20 bg-white dark:bg-gray-800 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Detailed Feature Comparison
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              See exactly what you get with each plan
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden">
              <thead className="bg-gray-100 dark:bg-gray-600">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Feature</th>
                  <th className="text-center p-4 font-medium text-gray-500 dark:text-gray-400">Free CLI</th>
                  <th className="text-center p-4 font-medium text-gray-700 dark:text-gray-300">Individual</th>
                  <th className="text-center p-4 font-medium text-blue-600 dark:text-blue-400">Team</th>
                  <th className="text-center p-4 font-medium text-purple-600 dark:text-purple-400">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                <tr>
                  <td className="p-4 font-medium text-gray-900 dark:text-white">Monthly Commits</td>
                  <td className="p-4 text-center text-gray-600 dark:text-gray-400">Unlimited*</td>
                  <td className="p-4 text-center text-gray-900 dark:text-white">500</td>
                  <td className="p-4 text-center text-blue-600 dark:text-blue-400">Unlimited</td>
                  <td className="p-4 text-center text-purple-600 dark:text-purple-400">Unlimited</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-gray-900 dark:text-white">Code Privacy</td>
                  <td className="p-4 text-center text-red-500">❌</td>
                  <td className="p-4 text-center text-green-500">✅</td>
                  <td className="p-4 text-center text-green-500">✅</td>
                  <td className="p-4 text-center text-green-500">✅</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-gray-900 dark:text-white">Business Context</td>
                  <td className="p-4 text-center text-red-500">❌</td>
                  <td className="p-4 text-center text-green-500">✅</td>
                  <td className="p-4 text-center text-green-500">✅</td>
                  <td className="p-4 text-center text-green-500">✅</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-gray-900 dark:text-white">Quality Scoring</td>
                  <td className="p-4 text-center text-red-500">❌</td>
                  <td className="p-4 text-center text-green-500">✅</td>
                  <td className="p-4 text-center text-green-500">✅</td>
                  <td className="p-4 text-center text-green-500">✅</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-gray-900 dark:text-white">Team Analytics</td>
                  <td className="p-4 text-center text-red-500">❌</td>
                  <td className="p-4 text-center text-red-500">❌</td>
                  <td className="p-4 text-center text-green-500">✅</td>
                  <td className="p-4 text-center text-green-500">✅</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-gray-900 dark:text-white">JIRA/Linear Integration</td>
                  <td className="p-4 text-center text-red-500">❌</td>
                  <td className="p-4 text-center text-red-500">❌</td>
                  <td className="p-4 text-center text-green-500">✅</td>
                  <td className="p-4 text-center text-green-500">✅</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-gray-900 dark:text-white">On-Premise Deployment</td>
                  <td className="p-4 text-center text-red-500">❌</td>
                  <td className="p-4 text-center text-red-500">❌</td>
                  <td className="p-4 text-center text-red-500">❌</td>
                  <td className="p-4 text-center text-green-500">✅</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-gray-900 dark:text-white">24/7 Support</td>
                  <td className="p-4 text-center text-red-500">❌</td>
                  <td className="p-4 text-center text-yellow-500">Email</td>
                  <td className="p-4 text-center text-yellow-500">Priority</td>
                  <td className="p-4 text-center text-green-500">✅ with SLA</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
            * Free CLI tools unlimited but require your code to be sent to OpenAI
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                How is Git Commit AI different from free CLI tools like aicommits?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Free CLI tools send your code to OpenAI and only describe what changed. Git Commit AI keeps your code private, 
                understands business context (why you're making changes), provides team collaboration features, and offers enterprise security.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                What does "context-aware" commit generation mean?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Instead of just describing code changes, our AI understands the business reason for your changes, 
                ticket numbers, impact areas, and generates commits that explain both what and why—making your commit history truly useful.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Can I try before purchasing?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes! All plans come with a 14-day free trial. No credit card required. You can explore all features 
                and see how Git Commit AI transforms your workflow before making any commitment.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Is my code secure?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Absolutely. Unlike free tools that send your code to OpenAI, we process everything securely within our SOC 2 compliant infrastructure. 
                Enterprise customers can deploy on-premise for complete control.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                How does team billing work?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Team plans are billed per active user per month. You can add or remove team members anytime, 
                and you'll only be charged for active users. Annual plans include 2 months free.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 dark:bg-blue-800 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Git Workflow?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of developers who've upgraded from basic CLI tools to professional commit generation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" variant="default" className="px-8">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="px-8 text-white border-white hover:bg-white hover:text-blue-600">
                Talk to Sales
              </Button>
            </Link>
          </div>
          <p className="text-blue-200 text-sm mt-4">
            14-day free trial • No credit card required • Cancel anytime
          </p>
        </div>
      </section>
    </div>
  );
}