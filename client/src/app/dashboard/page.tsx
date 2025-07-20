'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/providers/auth-provider';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { commitsAPI, usersAPI } from '@/lib/api';
import { 
  Code2, 
  GitCommit, 
  Clock, 
  BarChart3, 
  Settings, 
  Copy, 
  RefreshCw,
  Download,
  Sparkles,
  ChevronDown,
  Home
} from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import toast from 'react-hot-toast';
import { formatDate } from '@/lib/utils';

interface CommitHistory {
  id: string;
  message: string;
  style: string;
  created_at: string;
}

interface UsageStats {
  current: {
    commits_generated: number;
    tokens_used: number;
  };
  history: Array<{
    month: string;
    commits_generated: number;
    tokens_used: number;
  }>;
}

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('generate');
  const [gitDiff, setGitDiff] = useState('');
  const [commitStyle, setCommitStyle] = useState('conventional');
  const [customInstructions, setCustomInstructions] = useState('');
  const [generatedCommit, setGeneratedCommit] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [commitHistory, setCommitHistory] = useState<CommitHistory[]>([]);
  const [usageStats, setUsageStats] = useState<UsageStats | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
      return;
    }

    if (user) {
      loadCommitHistory();
      loadUsageStats();
    }
  }, [user, loading, router]);

  const loadCommitHistory = async () => {
    try {
      const response = await commitsAPI.getHistory({ limit: 10 });
      setCommitHistory(response.data.commits);
    } catch (error) {
      console.error('Failed to load commit history:', error);
    }
  };

  const loadUsageStats = async () => {
    try {
      const response = await usersAPI.getUsage();
      setUsageStats(response.data);
    } catch (error) {
      console.error('Failed to load usage stats:', error);
    }
  };

  const handleGenerateCommit = async () => {
    if (!gitDiff.trim()) {
      toast.error('Please enter a git diff');
      return;
    }

    setIsGenerating(true);
    try {
      const response = await commitsAPI.generate({
        diff: gitDiff,
        style: commitStyle,
        customInstructions
      });
      
      setGeneratedCommit(response.data.message);
      toast.success('Commit message generated!');
      loadCommitHistory(); // Refresh history
      loadUsageStats(); // Refresh stats
    } catch (error) {
      toast.error('Failed to generate commit message');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                <Home className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Back to Main</span>
              </Link>
              <Code2 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Git Commit AI</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Welcome back, {user.name}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm">
                <span className="text-gray-500 dark:text-gray-400">Plan: </span>
                <span className="font-medium capitalize dark:text-white">{user.subscription?.plan || 'Free'}</span>
              </div>
              <ThemeToggle />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveTab('settings')}
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <GitCommit className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">This Month</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {usageStats?.current.commits_generated || 0}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">commits generated</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <Sparkles className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tokens Used</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {usageStats?.current.tokens_used || 0}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">AI processing</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-green-600 dark:text-green-400" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg per Day</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {Math.round((usageStats?.current.commits_generated || 0) / new Date().getDate())}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">commits</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Commit Generator */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-6 border-b dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Generate Commit Message</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Paste your git diff and get a professional commit message</p>
            </div>
            
            <div className="p-6 space-y-4">
              {/* Style Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Commit Style
                </label>
                <div className="relative">
                  <select
                    value={commitStyle}
                    onChange={(e) => setCommitStyle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 appearance-none"
                  >
                    <option value="conventional">Conventional Commits</option>
                    <option value="descriptive">Descriptive</option>
                    <option value="emoji">Emoji Style</option>
                    <option value="semantic">Semantic</option>
                    <option value="ticket">Ticket Reference</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 dark:text-gray-500 pointer-events-none" />
                </div>
              </div>

              {/* Git Diff Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Git Diff
                </label>
                <textarea
                  value={gitDiff}
                  onChange={(e) => setGitDiff(e.target.value)}
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                  placeholder="Paste your git diff here..."
                />
              </div>

              {/* Custom Instructions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Custom Instructions (Optional)
                </label>
                <input
                  type="text"
                  value={customInstructions}
                  onChange={(e) => setCustomInstructions(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Include ticket number, use imperative mood..."
                />
              </div>

              {/* Generate Button */}
              <Button
                onClick={handleGenerateCommit}
                disabled={isGenerating || !gitDiff.trim()}
                className="w-full"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Commit Message
                  </>
                )}
              </Button>

              {/* Generated Result */}
              {generatedCommit && (
                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Generated Commit:</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(generatedCommit)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="font-mono text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-3 rounded border dark:border-gray-600">
                    {generatedCommit}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Recent History */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-6 border-b dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Commits</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={loadCommitHistory}
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {commitHistory.length > 0 ? (
                commitHistory.map((commit) => (
                  <div key={commit.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 min-w-0">
                        <p className="font-mono text-sm text-gray-900 dark:text-white break-words">
                          {commit.message}
                        </p>
                        <div className="flex items-center mt-2 space-x-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300">
                            {commit.style}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {formatDate(commit.created_at)}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(commit.message)}
                        className="ml-2 flex-shrink-0"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <GitCommit className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">No commits generated yet</p>
                  <p className="text-sm text-gray-400 dark:text-gray-500">Start by generating your first commit message!</p>
                </div>
              )}
            </div>

            {commitHistory.length > 0 && (
              <div className="p-4 border-t dark:border-gray-700">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => {
                    const csvContent = [
                      'ID,Message,Style,Created At',
                      ...commitHistory.map(commit => 
                        `"${commit.id}","${commit.message.replace(/"/g, '""')}","${commit.style}","${commit.created_at}"`
                      )
                    ].join('\n');
                    
                    const blob = new Blob([csvContent], { type: 'text/csv' });
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `git-commit-history-${new Date().toISOString().split('T')[0]}.csv`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(url);
                  }}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export History
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}