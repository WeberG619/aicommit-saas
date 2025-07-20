import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  Code2, 
  Zap, 
  Brain, 
  GitBranch, 
  Terminal, 
  Puzzle, 
  Shield, 
  BarChart3,
  Users,
  CheckCircle2,
  Sparkles,
  Clock,
  FileText,
  Settings,
  Globe,
  Webhook
} from 'lucide-react';

export default function FeaturesPage() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Generation",
      description: "Advanced GPT-4 technology analyzes your code changes and generates contextual, professional commit messages instantly.",
      benefits: [
        "Understands code context and intent",
        "Follows conventional commit standards",
        "Generates meaningful descriptions",
        "Learns from your coding patterns"
      ]
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Generate commit messages in under 2 seconds. Stop wasting time thinking about what to write.",
      benefits: [
        "Sub-2 second response times",
        "No interruption to your workflow",
        "Instant suggestions as you type",
        "Works with any repository size"
      ]
    },
    {
      icon: Terminal,
      title: "CLI & IDE Integration",
      description: "Use Git Commit AI directly in your terminal, VS Code, or any IDE with our comprehensive integrations.",
      benefits: [
        "Native VS Code extension",
        "Command line interface",
        "Git hooks integration",
        "Works with any Git workflow"
      ]
    },
    {
      icon: FileText,
      title: "Multiple Commit Styles",
      description: "Choose from conventional commits, Angular style, semantic commits, or create your own custom format.",
      benefits: [
        "Conventional Commits support",
        "Angular commit guidelines",
        "Semantic versioning integration",
        "Custom templates and formats"
      ]
    },
    {
      icon: BarChart3,
      title: "Analytics & Insights",
      description: "Track your commit patterns, team productivity, and code quality metrics with detailed analytics.",
      benefits: [
        "Commit frequency analysis",
        "Team productivity metrics",
        "Code quality tracking",
        "Custom reporting dashboards"
      ]
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share commit styles, approve messages, and maintain consistency across your entire development team.",
      benefits: [
        "Shared team templates",
        "Commit message approval workflows",
        "Team-wide style enforcement",
        "Collaborative editing features"
      ]
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security with SOC 2 compliance, SSO integration, and complete data privacy protection.",
      benefits: [
        "SOC 2 Type II compliant",
        "Single Sign-On (SSO)",
        "End-to-end encryption",
        "GDPR compliance"
      ]
    },
    {
      icon: Webhook,
      title: "API & Webhooks",
      description: "Integrate Git Commit AI into your existing tools and workflows with our comprehensive REST API.",
      benefits: [
        "RESTful API access",
        "Webhook notifications",
        "Third-party integrations",
        "Custom workflow automation"
      ]
    }
  ];

  const integrations = [
    { name: "VS Code", logo: "🆚", description: "Native extension with inline suggestions" },
    { name: "GitHub", logo: "🐙", description: "Seamless GitHub integration" },
    { name: "GitLab", logo: "🦊", description: "Full GitLab support" },
    { name: "Bitbucket", logo: "🪣", description: "Bitbucket repositories" },
    { name: "Terminal", logo: "💻", description: "Command line interface" },
    { name: "IntelliJ", logo: "💡", description: "JetBrains IDE plugin" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Code2 className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold">Git Commit AI</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/auth/login" className="text-gray-600 hover:text-gray-900">
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
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Powerful Features for Every Developer
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            From AI-powered generation to enterprise security, Git Commit AI has everything 
            you need to transform your development workflow.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/auth/register">
              <Button size="lg" className="px-8">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/#pricing">
              <Button size="lg" variant="outline" className="px-8">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need to Write Better Commits
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional features designed to make commit messages effortless and meaningful.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 rounded-lg p-3">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {feature.description}
                    </p>
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Works With Your Favorite Tools
            </h2>
            <p className="text-lg text-gray-600">
              Seamlessly integrate with the tools you already use every day.
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            {integrations.map((integration, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="text-4xl mb-3">{integration.logo}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{integration.name}</h3>
                <p className="text-sm text-gray-600">{integration.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Get professional commit messages in three simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Make Your Changes</h3>
              <p className="text-gray-600">
                Code as usual. Stage your changes with git add like you normally would.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-purple-600">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Generate Message</h3>
              <p className="text-gray-600">
                Run our CLI tool or use the VS Code extension to generate a commit message instantly.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Commit & Push</h3>
              <p className="text-gray-600">
                Review, edit if needed, and commit with confidence. Your git history will thank you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Experience the Future of Git Commits?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of developers who've already transformed their workflow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 border border-white">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/docs">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                View Documentation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Code2 className="h-6 w-6" />
                <span className="text-lg font-bold">Git Commit AI</span>
              </div>
              <p className="text-gray-400">
                Professional commit messages powered by AI.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/features" className="hover:text-white">Features</Link></li>
                <li><Link href="/#pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link href="/docs" className="hover:text-white">Documentation</Link></li>
                <li><Link href="/api" className="hover:text-white">API</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
                <li><Link href="/security" className="hover:text-white">Security</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
            <p>&copy; 2024 Git Commit AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}