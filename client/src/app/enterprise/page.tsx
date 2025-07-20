'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { 
  Code2, 
  Shield, 
  Lock, 
  Server, 
  Users, 
  BarChart3,
  CheckCircle2,
  ArrowLeft,
  Building2,
  Zap,
  Globe,
  Database,
  Eye,
  Settings,
  Award,
  FileKey,
  Headphones
} from 'lucide-react';

export default function EnterprisePage() {
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
              <Link href="/contact">
                <Button>Contact Sales</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-4">
              <Building2 className="h-12 w-12 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Enterprise-Grade AI Commit Solutions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Scale Git Commit AI across your entire organization with enterprise security, 
            compliance, and collaboration features designed for large teams.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/contact">
              <Button size="lg" className="px-8">
                Schedule Demo
              </Button>
            </Link>
            <Link href="#security">
              <Button size="lg" variant="outline">
                View Security Features
              </Button>
            </Link>
          </div>

          {/* Key Differentiators */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-4">
              Why Choose Git Commit AI Enterprise over Free CLI Tools?
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div className="flex items-start space-x-2">
                <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div>
                  <div className="font-medium text-blue-900 dark:text-blue-200">Private & Secure</div>
                  <div className="text-blue-700 dark:text-blue-300">Your code never leaves your infrastructure</div>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Users className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div>
                  <div className="font-medium text-blue-900 dark:text-blue-200">Team Collaboration</div>
                  <div className="text-blue-700 dark:text-blue-300">Analytics, insights, and shared standards</div>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Headphones className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div>
                  <div className="font-medium text-blue-900 dark:text-blue-200">Enterprise Support</div>
                  <div className="text-blue-700 dark:text-blue-300">24/7 support with SLA guarantees</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section id="security" className="py-20 bg-white dark:bg-gray-800 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Enterprise Security & Compliance
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Unlike free CLI tools that send your code to OpenAI, we provide secure, 
              compliant solutions that keep your intellectual property protected.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <Server className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">On-Premise Deployment</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Deploy Git Commit AI entirely within your infrastructure. 
                Air-gapped environments supported.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <Eye className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Zero Data Retention</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Your code and commit data is never stored or logged. 
                Process locally with complete privacy.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <FileKey className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Private LLM Support</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Use your own LLM models (Ollama, Azure OpenAI, AWS Bedrock) 
                for complete control.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <Award className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">SOC 2 Type II</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Annual third-party audits ensure our security controls 
                meet enterprise standards.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <Globe className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">GDPR & CCPA Compliant</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Full compliance with global data protection regulations 
                and privacy frameworks.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <Database className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">End-to-End Encryption</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                AES-256 encryption at rest, TLS 1.3 in transit, 
                with perfect forward secrecy.
              </p>
            </div>
          </div>

          {/* Compliance Certifications */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
              Compliance Certifications
            </h3>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-2">
                  <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto" />
                </div>
                <div className="font-medium text-gray-900 dark:text-white">SOC 2 Type II</div>
              </div>
              <div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-2">
                  <Lock className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto" />
                </div>
                <div className="font-medium text-gray-900 dark:text-white">ISO 27001</div>
              </div>
              <div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-2">
                  <Globe className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto" />
                </div>
                <div className="font-medium text-gray-900 dark:text-white">GDPR Ready</div>
              </div>
              <div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-2">
                  <Award className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto" />
                </div>
                <div className="font-medium text-gray-900 dark:text-white">HIPAA Eligible</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Advanced Enterprise Features
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Go beyond basic commit generation with features designed for large-scale development teams.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Team Collaboration</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Team Analytics Dashboard</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Track commit quality, consistency, and team productivity metrics</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Custom Style Guidelines</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Enforce organization-specific commit message standards</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Approval Workflows</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Review and approve commit messages before they're applied</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">JIRA/Linear Integration</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Automatic ticket linking and context extraction</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Advanced AI Features</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Context-Aware Generation</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">AI understands business context and impact, not just code changes</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Custom Model Training</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Train AI on your organization's commit history and patterns</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Quality Scoring</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Real-time commit message quality assessment and improvement suggestions</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Multi-Language Support</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Generate commit messages in your team's preferred language</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-white dark:bg-gray-800 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              How We Compare to Free CLI Tools
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              See why enterprises choose Git Commit AI over free alternatives
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100 dark:bg-gray-600">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Feature</th>
                  <th className="text-center p-4 font-medium text-gray-500 dark:text-gray-400">Free CLI Tools</th>
                  <th className="text-center p-4 font-medium text-blue-600 dark:text-blue-400">Git Commit AI Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                <tr>
                  <td className="p-4 font-medium text-gray-900 dark:text-white">Code Privacy</td>
                  <td className="p-4 text-center text-red-500">❌ Sent to OpenAI</td>
                  <td className="p-4 text-center text-green-500">✅ Stays on your infrastructure</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-gray-900 dark:text-white">Business Context Understanding</td>
                  <td className="p-4 text-center text-red-500">❌ Code changes only</td>
                  <td className="p-4 text-center text-green-500">✅ Why + What + Impact</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-gray-900 dark:text-white">Team Collaboration</td>
                  <td className="p-4 text-center text-red-500">❌ Individual use only</td>
                  <td className="p-4 text-center text-green-500">✅ Analytics, workflows, standards</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-gray-900 dark:text-white">Enterprise Support</td>
                  <td className="p-4 text-center text-red-500">❌ Community only</td>
                  <td className="p-4 text-center text-green-500">✅ 24/7 with SLA</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-gray-900 dark:text-white">Compliance (SOC 2, GDPR)</td>
                  <td className="p-4 text-center text-red-500">❌ Not available</td>
                  <td className="p-4 text-center text-green-500">✅ Fully compliant</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-gray-900 dark:text-white">Custom Model Training</td>
                  <td className="p-4 text-center text-red-500">❌ Generic only</td>
                  <td className="p-4 text-center text-green-500">✅ Train on your patterns</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Enterprise Pricing
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
            Flexible pricing designed to scale with your organization
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Team</h3>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                $29<span className="text-lg font-normal text-gray-600 dark:text-gray-400">/user/month</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">Perfect for growing development teams</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">Up to 50 team members</span>
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">Team analytics dashboard</span>
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">JIRA/Linear integration</span>
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">Email support</span>
                </li>
              </ul>
              <Button className="w-full">Start Team Trial</Button>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8 border-2 border-blue-200 dark:border-blue-700 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">Most Popular</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Enterprise</h3>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Custom<span className="text-lg font-normal text-gray-600 dark:text-gray-400"> pricing</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">For large organizations with advanced needs</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">Unlimited team members</span>
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">On-premise deployment</span>
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">Custom model training</span>
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">24/7 support with SLA</span>
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">Dedicated success manager</span>
                </li>
              </ul>
              <Link href="/contact">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Contact Sales</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 dark:bg-blue-800 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Team's Git Workflow?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join hundreds of enterprise teams who've already upgraded from free CLI tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="px-8">
                Schedule Demo
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button size="lg" variant="outline" className="px-8 text-white border-white hover:bg-white hover:text-blue-600">
                Start Free Trial
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}