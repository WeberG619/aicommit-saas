'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  Code2, 
  Mail, 
  MessageSquare, 
  HelpCircle, 
  Send,
  CheckCircle2
} from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="max-w-md w-full text-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Message Sent!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Thank you for contacting us. We'll get back to you within 24 hours.
            </p>
            <Link href="/">
              <Button>Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have a question, suggestion, or need help? We're here to assist you.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Methods */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 dark:text-white">Contact Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-medium dark:text-white">Email Support</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">support@aicommit.dev</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Response within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MessageSquare className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-medium dark:text-white">Live Chat</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Available 9 AM - 5 PM PST</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Monday through Friday</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <HelpCircle className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-medium dark:text-white">Documentation</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Check our comprehensive docs</p>
                    <Link href="/docs" className="text-xs text-blue-600 hover:text-blue-500">
                      View Documentation →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                Enterprise Support
              </h3>
              <p className="text-blue-700 dark:text-blue-300 text-sm mb-4">
                Need dedicated support or custom integration? Contact our enterprise team.
              </p>
              <Button size="sm" variant="outline" className="border-blue-200 dark:border-blue-600 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800">
                Enterprise Sales
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
              <h2 className="text-xl font-semibold mb-6 dark:text-white">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="billing">Billing Question</option>
                    <option value="feature">Feature Request</option>
                    <option value="bug">Bug Report</option>
                    <option value="enterprise">Enterprise Sales</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Brief description of your inquiry"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 resize-none"
                    placeholder="Please provide as much detail as possible..."
                  />
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    * Required fields
                  </p>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="flex items-center space-x-2"
                  >
                    <Send className="h-4 w-4" />
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Quick answers to common questions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h3 className="font-semibold mb-2 dark:text-white">How does the free trial work?</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                You get 14 days of full access to all features. No credit card required. 
                Cancel anytime during the trial with no charges.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h3 className="font-semibold mb-2 dark:text-white">Can I use Git Commit AI offline?</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                The CLI tool requires an internet connection to generate commit messages, 
                but you can cache recent suggestions for offline use.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h3 className="font-semibold mb-2 dark:text-white">Do you support private repositories?</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Yes! Git Commit AI works with any Git repository, including private ones. 
                Your code never leaves your machine.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h3 className="font-semibold mb-2 dark:text-white">What programming languages are supported?</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Git Commit AI supports all programming languages. It analyzes diff patterns 
                rather than specific language syntax.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}