'use client';

import Link from 'next/link';
import { useAuth } from '@/providers/auth-provider';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { Code2, Zap, Users, BarChart3, CheckCircle2, ArrowRight, Github, GitBranch, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const { user } = useAuth();

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
            <Link href="#features" className="hidden md:block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
              Features
            </Link>
            <Link href="#pricing" className="hidden md:block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
              Pricing
            </Link>
            <ThemeToggle />
            {user ? (
              <Link href="/dashboard">
                <Button>Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link href="/auth/register">
                  <Button>Start Free Trial</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Transform Your Git Commits with AI
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Generate professional, consistent commit messages in seconds. Perfect for developers who value clean commit history.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/auth/register">
                <Button size="lg" className="group">
                  Start 14-Day Free Trial
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition" />
                </Button>
              </Link>
              <Link href="#demo">
                <Button size="lg" variant="outline">
                  See Demo
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600">
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
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600">50K+</div>
              <div className="text-gray-600">Commits Generated</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">1,000+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">99.9%</div>
              <div className="text-gray-600">Uptime</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">4.9/5</div>
              <div className="text-gray-600">User Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Everything You Need for Perfect Commits
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition"
            >
              <Zap className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">AI-Powered Generation</h3>
              <p className="text-gray-600">
                Advanced GPT-4 technology analyzes your code changes and generates meaningful commit messages instantly.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition"
            >
              <GitBranch className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Multiple Commit Styles</h3>
              <p className="text-gray-600">
                Choose from conventional, semantic, emoji, or custom styles to match your team's standards.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition"
            >
              <Users className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Team Collaboration</h3>
              <p className="text-gray-600">
                Share commit styles, enforce standards, and maintain consistency across your entire team.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition"
            >
              <BarChart3 className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Analytics & Insights</h3>
              <p className="text-gray-600">
                Track commit patterns, analyze team productivity, and improve your development workflow.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition"
            >
              <Github className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">IDE & CLI Integration</h3>
              <p className="text-gray-600">
                VS Code extension, CLI tool, and API access for seamless integration with your workflow.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition"
            >
              <Sparkles className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Smart Learning</h3>
              <p className="text-gray-600">
                AI learns from your commit history to generate increasingly personalized and accurate messages.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 bg-gray-50 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            See It In Action
          </h2>
          
          <div className="max-w-4xl mx-auto bg-gray-900 rounded-lg shadow-2xl p-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            
            <pre className="text-green-400 font-mono text-sm overflow-x-auto">
{`$ git diff
diff --git a/src/auth/login.tsx b/src/auth/login.tsx
index 1234567..abcdefg 100644
--- a/src/auth/login.tsx
+++ b/src/auth/login.tsx
@@ -15,6 +15,8 @@ export function Login() {
+    const [rememberMe, setRememberMe] = useState(false);
+    const [isLoading, setIsLoading] = useState(false);
     
     const handleSubmit = async (e) => {
       e.preventDefault();
+      setIsLoading(true);
       try {
         await login(email, password);
+        if (rememberMe) {
+          localStorage.setItem('email', email);
+        }
       } catch (error) {
         console.error('Login failed:', error);
+      } finally {
+        setIsLoading(false);
       }
     };`}
            </pre>
            
            <div className="border-t border-gray-700 my-4"></div>
            
            <div className="text-white">
              <p className="text-sm text-gray-400 mb-2">Generated commit message:</p>
              <p className="font-mono bg-gray-800 p-3 rounded">
                feat(auth): add remember me functionality and loading state to login form
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12">
            Choose the plan that fits your needs. All plans include a 14-day free trial.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Individual Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition"
            >
              <h3 className="text-2xl font-bold mb-4">Individual</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">$19</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  Unlimited commits
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  All commit styles
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  VS Code extension
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  CLI tool access
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  Basic analytics
                </li>
              </ul>
              <Link href="/auth/register?plan=individual" className="block">
                <Button className="w-full">Start Free Trial</Button>
              </Link>
            </motion.div>

            {/* Team Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-blue-600 text-white rounded-lg shadow-lg p-8 hover:shadow-xl transition relative"
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-4">Team</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">$47</span>
                <span className="text-blue-100">/month</span>
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
                  Shared commit styles
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-200" />
                  Team analytics
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-200" />
                  Priority support
                </li>
              </ul>
              <Link href="/auth/register?plan=team" className="block">
                <Button className="w-full bg-white text-blue-600 hover:bg-gray-100">
                  Start Free Trial
                </Button>
              </Link>
            </motion.div>

            {/* Enterprise Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition"
            >
              <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">$97</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  Everything in Team
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  Unlimited team members
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  Custom integrations
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  SSO authentication
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  Dedicated support
                </li>
              </ul>
              <Link href="/auth/register?plan=enterprise" className="block">
                <Button className="w-full">Start Free Trial</Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-white dark:bg-gray-800 px-4">
        <div className="container mx-auto">
          {/* Stats */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Trusted by Developers Worldwide
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
              Join thousands of developers who've already transformed their Git workflow
            </p>
            
            <div className="grid md:grid-cols-4 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">12,847+</div>
                <div className="text-gray-600 dark:text-gray-400">Developers</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">2.1M+</div>
                <div className="text-gray-600 dark:text-gray-400">Commits Generated</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">850+</div>
                <div className="text-gray-600 dark:text-gray-400">Companies</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">4.8★</div>
                <div className="text-gray-600 dark:text-gray-400">Average Rating</div>
              </motion.div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Sparkles key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                "Git Commit AI has completely transformed how our team writes commit messages. 
                We've gone from inconsistent, unclear commits to professional, meaningful descriptions."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                  S
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">Sarah Chen</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Senior Developer at Google</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Sparkles key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                "I was skeptical at first, but this tool saves me 10-15 minutes every day. 
                The AI actually understands what I changed and creates perfect conventional commits."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                  M
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">Marcus Johnson</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Tech Lead at Microsoft</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Sparkles key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                "Our code reviews became so much faster since everyone started using Git Commit AI. 
                No more guessing what a commit does from cryptic messages."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                  L
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">Lisa Rodriguez</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Engineering Manager at Meta</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Logo Wall */}
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-8">Trusted by developers at</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="text-2xl font-bold text-gray-700 dark:text-gray-300">Google</div>
              <div className="text-2xl font-bold text-gray-700 dark:text-gray-300">Microsoft</div>
              <div className="text-2xl font-bold text-gray-700 dark:text-gray-300">Meta</div>
              <div className="text-2xl font-bold text-gray-700 dark:text-gray-300">Netflix</div>
              <div className="text-2xl font-bold text-gray-700 dark:text-gray-300">Stripe</div>
              <div className="text-2xl font-bold text-gray-700 dark:text-gray-300">Spotify</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Commits?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of developers writing better commit messages with AI.
          </p>
          <Link href="/auth/register">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Start Your Free Trial Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Code2 className="h-6 w-6 text-blue-400" />
                <span className="text-white font-semibold">Git Commit AI</span>
              </div>
              <p className="text-sm">
                Professional commit messages powered by AI.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#features" className="hover:text-white transition">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-white transition">Pricing</Link></li>
                <li><Link href="/docs" className="hover:text-white transition">Documentation</Link></li>
                <li><Link href="/api-docs" className="hover:text-white transition">API</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-white transition">About</Link></li>
                <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition">Terms of Service</Link></li>
                <li><Link href="/security" className="hover:text-white transition">Security</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2024 Git Commit AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}