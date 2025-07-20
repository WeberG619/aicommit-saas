'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { Code2, Calendar, ArrowRight, Clock, User, ArrowLeft } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'How AI is Revolutionizing Git Commit Messages',
    excerpt: 'Discover how artificial intelligence is transforming the way developers write commit messages, making them more meaningful and consistent.',
    date: '2025-01-15',
    author: 'Sarah Chen',
    readTime: '5 min read',
    category: 'AI',
    slug: 'ai-revolutionizing-git-commits'
  },
  {
    id: '2',
    title: 'The Complete Guide to Conventional Commits',
    excerpt: 'Learn everything you need to know about conventional commits and how they can improve your development workflow.',
    date: '2025-01-10',
    author: 'Marcus Johnson',
    readTime: '8 min read',
    category: 'Best Practices',
    slug: 'conventional-commits-guide'
  },
  {
    id: '3',
    title: 'Git Commit AI vs Manual Commits: A Developer Study',
    excerpt: 'We studied 1000 developers and found that AI-generated commits are 3x more descriptive and 5x more consistent.',
    date: '2025-01-05',
    author: 'Lisa Rodriguez',
    readTime: '6 min read',
    category: 'Research',
    slug: 'ai-vs-manual-commits-study'
  },
  {
    id: '4',
    title: '10 Git Best Practices Every Developer Should Know',
    excerpt: 'Essential Git practices that will make you a better developer and improve your team\'s productivity.',
    date: '2024-12-28',
    author: 'Alex Kumar',
    readTime: '7 min read',
    category: 'Best Practices',
    slug: 'git-best-practices'
  },
  {
    id: '5',
    title: 'How to Write Better Commit Messages (Without AI)',
    excerpt: 'Tips and tricks for writing clear, descriptive commit messages manually when AI isn\'t available.',
    date: '2024-12-20',
    author: 'Emily Watson',
    readTime: '4 min read',
    category: 'Tips',
    slug: 'better-commit-messages-manual'
  },
  {
    id: '6',
    title: 'Git Commit AI Enterprise: Team Collaboration Features',
    excerpt: 'Explore how Git Commit AI helps large teams maintain consistency and improve code review processes.',
    date: '2024-12-15',
    author: 'David Park',
    readTime: '5 min read',
    category: 'Product',
    slug: 'enterprise-team-features'
  }
];

const categories = ['All', 'AI', 'Best Practices', 'Research', 'Tips', 'Product'];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Filter blog posts based on selected category
  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Git Commit AI Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Tips, tutorials, and insights about Git, AI, and developer productivity
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                category === selectedCategory
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-md hover:shadow-lg'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Post - Only show if "All" category or if featured post matches selected category */}
        {(selectedCategory === 'All' || blogPosts[0].category === selectedCategory) && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 p-8 mb-12">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium px-2.5 py-0.5 rounded">
                Featured
              </span>
              <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs font-medium px-2.5 py-0.5 rounded">
                {blogPosts[0].category}
              </span>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {blogPosts[0].title}
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
              {blogPosts[0].excerpt}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {blogPosts[0].author}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(blogPosts[0].date).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {blogPosts[0].readTime}
                </div>
              </div>
              
              <Button 
                onClick={() => {
                  // For now, show an alert since we don't have individual blog pages
                  alert(`This would open the full article: "${blogPosts[0].title}"\n\nIn a real application, this would navigate to /blog/${blogPosts[0].slug}`);
                }}
                className="flex items-center gap-2"
              >
                Read More
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.slice(selectedCategory === 'All' ? 1 : 0).map((post) => (
            <article
              key={post.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500"
            >
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium px-2.5 py-0.5 rounded">
                    {post.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <span>{post.author}</span>
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{post.readTime}</span>
                  <button
                    onClick={() => {
                      // For now, show an alert since we don't have individual blog pages
                      alert(`This would open the full article: "${post.title}"\n\nIn a real application, this would navigate to /blog/${post.slug}`);
                    }}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-500 font-medium transition-colors"
                  >
                    Read More →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* No Results Message */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No blog posts found for the "{selectedCategory}" category.
            </p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="mt-4 text-blue-600 dark:text-blue-400 hover:text-blue-500 font-medium"
            >
              View all posts →
            </button>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8 mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Get the latest Git tips, AI insights, and product updates delivered to your inbox weekly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <Button>Subscribe</Button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </div>
  );
}