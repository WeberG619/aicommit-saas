'use client';

import { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Clock, 
  Target, 
  Award,
  Calendar,
  GitCommit,
  Zap
} from 'lucide-react';

interface AnalyticsData {
  totalCommits: number;
  qualityScore: number;
  timeSaved: number;
  teamMembers: number;
  weeklyData: Array<{
    week: string;
    commits: number;
    quality: number;
  }>;
  topPerformers: Array<{
    name: string;
    commits: number;
    quality: number;
  }>;
  commitTypes: Array<{
    type: string;
    count: number;
    percentage: number;
  }>;
}

// Mock data - in real app, this would come from your API
const mockAnalytics: AnalyticsData = {
  totalCommits: 1247,
  qualityScore: 87,
  timeSaved: 156, // hours
  teamMembers: 12,
  weeklyData: [
    { week: 'Week 1', commits: 89, quality: 82 },
    { week: 'Week 2', commits: 95, quality: 85 },
    { week: 'Week 3', commits: 112, quality: 89 },
    { week: 'Week 4', commits: 128, quality: 91 },
  ],
  topPerformers: [
    { name: 'Sarah Chen', commits: 145, quality: 94 },
    { name: 'Marcus Johnson', commits: 132, quality: 91 },
    { name: 'Lisa Rodriguez', commits: 118, quality: 89 },
  ],
  commitTypes: [
    { type: 'feat', count: 412, percentage: 33 },
    { type: 'fix', count: 298, percentage: 24 },
    { type: 'refactor', count: 187, percentage: 15 },
    { type: 'docs', count: 156, percentage: 12 },
    { type: 'test', count: 125, percentage: 10 },
    { type: 'style', count: 69, percentage: 6 },
  ]
};

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState('30d');
  const analytics = mockAnalytics;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Team Analytics</h2>
          <p className="text-gray-600 dark:text-gray-400">Track your team's commit quality and productivity</p>
        </div>
        <select 
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Commits</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{analytics.totalCommits.toLocaleString()}</p>
            </div>
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <GitCommit className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500">+12%</span>
            <span className="text-gray-600 dark:text-gray-400 ml-1">vs last month</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Quality Score</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{analytics.qualityScore}%</p>
            </div>
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Award className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500">+5%</span>
            <span className="text-gray-600 dark:text-gray-400 ml-1">vs last month</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Time Saved</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{analytics.timeSaved}h</p>
            </div>
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Clock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <Zap className="h-4 w-4 text-yellow-500 mr-1" />
            <span className="text-gray-600 dark:text-gray-400">~13h per developer</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Members</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{analytics.teamMembers}</p>
            </div>
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <Users className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <Target className="h-4 w-4 text-blue-500 mr-1" />
            <span className="text-gray-600 dark:text-gray-400">100% adoption rate</span>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weekly Trends */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Weekly Trends</h3>
          <div className="space-y-4">
            {analytics.weeklyData.map((week, index) => (
              <div key={week.week} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{week.week}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{week.commits} commits</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{week.quality}% quality</div>
                  </div>
                  <div className="w-20 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full transition-all duration-300"
                      style={{ width: `${(week.quality / 100) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Performers</h3>
          <div className="space-y-4">
            {analytics.topPerformers.map((performer, index) => (
              <div key={performer.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${ 
                    index === 0 ? 'bg-yellow-500' : 
                    index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                  }`}>
                    {index + 1}
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{performer.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{performer.commits} commits</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{performer.quality}% quality</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Commit Types Distribution */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Commit Types Distribution</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {analytics.commitTypes.map((type) => (
            <div key={type.type} className="text-center">
              <div className="relative w-16 h-16 mx-auto mb-2">
                <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-gray-200 dark:text-gray-600"
                    fill="none"
                    strokeWidth="3"
                    stroke="currentColor"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-blue-500"
                    fill="none"
                    strokeWidth="3"
                    stroke="currentColor"
                    strokeDasharray={`${type.percentage}, 100`}
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-900 dark:text-white">{type.percentage}%</span>
                </div>
              </div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{type.type}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{type.count}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Insights */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-4">🎯 Team Insights</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-blue-800/30 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 dark:text-blue-200 mb-2">Quality Improvement</h4>
            <p className="text-sm text-blue-800 dark:text-blue-300">
              Your team's commit quality has improved by 15% since adopting AI-generated messages. 
              Great work on providing business context!
            </p>
          </div>
          <div className="bg-white dark:bg-blue-800/30 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 dark:text-blue-200 mb-2">Productivity Boost</h4>
            <p className="text-sm text-blue-800 dark:text-blue-300">
              You've saved 156 hours this month - that's equivalent to nearly 4 full work weeks! 
              Time that can be spent on actual development.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}