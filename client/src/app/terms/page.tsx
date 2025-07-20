import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { Code2 } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Code2 className="h-8 w-8 text-blue-600" />
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Terms of Service</h1>
        
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            <strong>Effective Date: January 20, 2025</strong>
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">1. Agreement to Terms</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              By accessing or using Git Commit AI ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you do not have permission to access the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">2. Description of Service</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Git Commit AI provides AI-powered tools to generate professional Git commit messages. The Service includes:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>AI-generated commit messages based on code changes</li>
              <li>Command-line interface (CLI) tools</li>
              <li>IDE integrations</li>
              <li>Team collaboration features</li>
              <li>Analytics and reporting</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. Account Registration</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">To use our Service, you must:</p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Be at least 13 years old</li>
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Promptly update any changes to your information</li>
              <li>Accept responsibility for all activities under your account</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. Subscription and Payments</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Billing</h3>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Subscriptions are billed monthly or annually</li>
              <li>All fees are in USD unless otherwise stated</li>
              <li>Payments are processed securely through Stripe</li>
              <li>Prices are subject to change with 30 days notice</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Free Trial</h3>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>14-day free trial for new users</li>
              <li>No credit card required during trial</li>
              <li>Full access to features during trial period</li>
              <li>Automatic conversion to paid plan after trial (if payment method added)</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Refunds</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We offer a 30-day money-back guarantee for annual subscriptions. Monthly subscriptions can be cancelled at any time but are non-refundable.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. Acceptable Use</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">You agree NOT to:</p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Use the Service for any illegal purposes</li>
              <li>Attempt to reverse engineer or hack the Service</li>
              <li>Share your account with unauthorized users</li>
              <li>Use the Service to generate misleading or fraudulent content</li>
              <li>Violate any third-party rights</li>
              <li>Interfere with or disrupt the Service</li>
              <li>Exceed rate limits or usage quotas</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">6. Intellectual Property</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Our Property</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              The Service, including its original content, features, and functionality, is owned by Git Commit AI and is protected by international copyright, trademark, and other intellectual property laws.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Your Content</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              You retain all rights to your code and content. By using our Service, you grant us a limited license to process your git diffs solely for the purpose of generating commit messages.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">7. Privacy and Data Protection</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Your use of our Service is also governed by our Privacy Policy. We are committed to protecting your privacy and handling your data responsibly. Your source code never leaves your local machine.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">8. Disclaimers and Limitations</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">No Warranty</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              The Service is provided "AS IS" without warranty of any kind. We do not guarantee that the Service will be uninterrupted, secure, or error-free.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Limitation of Liability</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              To the maximum extent permitted by law, Git Commit AI shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">9. Indemnification</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              You agree to indemnify and hold harmless Git Commit AI from any claims, damages, or expenses arising from your violation of these Terms or your use of the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">10. Termination</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We may terminate or suspend your account immediately, without prior notice, for:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Breach of these Terms</li>
              <li>Non-payment of fees</li>
              <li>Suspected fraudulent or illegal activity</li>
              <li>Extended period of inactivity</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              You may cancel your subscription at any time through your account settings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">11. Changes to Terms</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We reserve the right to modify these Terms at any time. Material changes will be notified via email at least 30 days before taking effect. Continued use of the Service after changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">12. Governing Law</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              These Terms shall be governed by the laws of the State of California, United States, without regard to its conflict of law provisions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">13. Contact Information</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              For questions about these Terms, please contact us at:
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-gray-600 dark:text-gray-300">
              <p>Email: legal@aicommit.dev</p>
              <p>Address: Git Commit AI, Legal Department</p>
              <p>123 Tech Street, San Francisco, CA 94105</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}