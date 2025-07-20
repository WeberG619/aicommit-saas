'use client';

import { useState, useEffect } from 'react';
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
  ChevronDown
} from 'lucide-react';
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Code2 className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Git Commit AI</h1>
                <p className="text-sm text-gray-600">Welcome back, {user.name}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm">
                <span className="text-gray-500">Plan: </span>
                <span className="font-medium capitalize">{user.subscription?.plan || 'Free'}</span>
              </div>
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
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <GitCommit className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">
                  {usageStats?.current.commits_generated || 0}
                </p>
                <p className="text-xs text-gray-500">commits generated</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Sparkles className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Tokens Used</p>
                <p className="text-2xl font-bold text-gray-900">
                  {usageStats?.current.tokens_used || 0}
                </p>
                <p className="text-xs text-gray-500">AI processing</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg per Day</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round((usageStats?.current.commits_generated || 0) / new Date().getDate())}
                </p>
                <p className="text-xs text-gray-500">commits</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Commit Generator */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Generate Commit Message</h2>
              <p className="text-sm text-gray-600">Paste your git diff and get a professional commit message</p>
            </div>
            
            <div className="p-6 space-y-4">
              {/* Style Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Commit Style
                </label>
                <div className="relative">
                  <select
                    value={commitStyle}
                    onChange={(e) => setCommitStyle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 appearance-none"
                  >
                    <option value="conventional">Conventional Commits</option>
                    <option value="descriptive">Descriptive</option>
                    <option value="emoji">Emoji Style</option>
                    <option value="semantic">Semantic</option>
                    <option value="ticket">Ticket Reference</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Git Diff Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Git Diff
                </label>
                <textarea
                  value={gitDiff}
                  onChange={(e) => setGitDiff(e.target.value)}
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                  placeholder="Paste your git diff here..."
                />
              </div>

              {/* Custom Instructions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Instructions (Optional)
                </label>
                <input
                  type="text"
                  value={customInstructions}
                  onChange={(e) => setCustomInstructions(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sm font-medium text-gray-700">Generated Commit:</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(generatedCommit)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="font-mono text-sm bg-white p-3 rounded border">
                    {generatedCommit}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Recent History */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">Recent Commits</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={loadCommitHistory}
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="divide-y divide-gray-200">
              {commitHistory.length > 0 ? (
                commitHistory.map((commit) => (
                  <div key={commit.id} className="p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 min-w-0">
                        <p className="font-mono text-sm text-gray-900 break-words">
                          {commit.message}
                        </p>
                        <div className="flex items-center mt-2 space-x-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {commit.style}
                          </span>
                          <span className="text-xs text-gray-500">
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
                  <GitCommit className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No commits generated yet</p>
                  <p className="text-sm text-gray-400">Start by generating your first commit message!</p>
                </div>
              )}
            </div>

            {commitHistory.length > 0 && (
              <div className="p-4 border-t">
                <Button variant="outline" size="sm" className="w-full">
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