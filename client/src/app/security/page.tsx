import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { 
  Code2, 
  Shield, 
  Lock, 
  Key, 
  Database, 
  CheckCircle2,
  FileKey,
  ServerCrash,
  Eye
} from 'lucide-react';

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Code2 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="text-2xl font-bold dark:text-white">Git Commit AI</span>
            </Link>
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-4">
              <Shield className="h-12 w-12 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Security at Git Commit AI
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Your code and data security is our top priority. We implement industry-leading 
            security measures to ensure your information remains private and protected.
          </p>
        </div>

        {/* Key Security Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <Lock className="h-8 w-8 text-green-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">End-to-End Encryption</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              All data transmitted between your device and our servers is encrypted using 
              TLS 1.3 with perfect forward secrecy.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <Eye className="h-8 w-8 text-green-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Code Privacy</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Your source code never leaves your machine. We only process git diff metadata 
              to generate commit messages.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <Database className="h-8 w-8 text-green-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Secure Infrastructure</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Our infrastructure is hosted on SOC 2 compliant data centers with 24/7 
              monitoring and automated threat detection.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <Key className="h-8 w-8 text-green-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Access Control</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Multi-factor authentication, role-based access control, and regular security 
              audits protect your account.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <FileKey className="h-8 w-8 text-green-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">API Security</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Secure API keys with rate limiting, IP whitelisting, and automatic key 
              rotation capabilities.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <ServerCrash className="h-8 w-8 text-green-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Disaster Recovery</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Automated backups, redundant systems, and comprehensive disaster recovery 
              plans ensure service continuity.
            </p>
          </div>
        </div>

        {/* Detailed Security Measures */}
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Data Protection</h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">What We Protect</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">Account credentials and personal information</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">Payment information (tokenized via Stripe)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">Git metadata and commit history</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">Team collaboration data</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">How We Protect It</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">AES-256 encryption at rest</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">TLS 1.3 encryption in transit</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">Regular security patches and updates</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">Strict access logging and monitoring</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Compliance & Certifications</h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-4 mb-4">
                    <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">SOC 2 Type II</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Annual audits ensure our security controls meet rigorous standards
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-4 mb-4">
                    <Lock className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">GDPR Compliant</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Full compliance with EU data protection regulations
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-4 mb-4">
                    <FileKey className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">ISO 27001</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Information security management system certification
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Security Best Practices</h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Recommendations for Users:</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3">1.</span>
                  <span className="text-gray-600 dark:text-gray-300">Enable two-factor authentication on your account</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3">2.</span>
                  <span className="text-gray-600 dark:text-gray-300">Use strong, unique passwords for your Git Commit AI account</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3">3.</span>
                  <span className="text-gray-600 dark:text-gray-300">Regularly rotate API keys and access tokens</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3">4.</span>
                  <span className="text-gray-600 dark:text-gray-300">Review team member access permissions periodically</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3">5.</span>
                  <span className="text-gray-600 dark:text-gray-300">Keep your CLI tools and integrations updated</span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Incident Response</h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                In the unlikely event of a security incident, we have comprehensive response procedures:
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-orange-100 dark:bg-orange-900/30 rounded-full p-2 mr-4">
                    <span className="text-orange-600 dark:text-orange-400 font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Immediate Containment</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Isolate affected systems within minutes</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-orange-100 dark:bg-orange-900/30 rounded-full p-2 mr-4">
                    <span className="text-orange-600 dark:text-orange-400 font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Investigation</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Thorough analysis by our security team</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-orange-100 dark:bg-orange-900/30 rounded-full p-2 mr-4">
                    <span className="text-orange-600 dark:text-orange-400 font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">User Notification</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Transparent communication within 72 hours</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-orange-100 dark:bg-orange-900/30 rounded-full p-2 mr-4">
                    <span className="text-orange-600 dark:text-orange-400 font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Remediation</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Swift action to prevent future incidents</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Contact Section */}
        <section className="mt-16 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Security Questions or Concerns?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Our security team is here to help. Contact us for security inquiries, 
            vulnerability reports, or compliance documentation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="px-6">
                Contact Security Team
              </Button>
            </Link>
            <a href="mailto:security@aicommit.dev">
              <Button variant="outline" className="px-6">
                security@aicommit.dev
              </Button>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}