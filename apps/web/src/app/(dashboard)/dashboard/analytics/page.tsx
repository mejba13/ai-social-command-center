'use client';

import { useState } from 'react';
import {
  TrendingUp,
  Users,
  Heart,
  Eye,
  Download,
  Calendar,
  RefreshCw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { StatCard } from '@/components/features/stat-card';
import { Breadcrumb } from '@/components/layout/breadcrumb';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Mock data
const trendData = [
  { date: 'Oct 1', followers: 48200, engagement: 11200 },
  { date: 'Oct 8', followers: 49100, engagement: 11500 },
  { date: 'Oct 15', followers: 49800, engagement: 11800 },
  { date: 'Oct 22', followers: 50500, engagement: 12100 },
  { date: 'Oct 29', followers: 51500, engagement: 12450 },
];

const platformData = [
  { name: 'Instagram', value: 28300, color: '#E1306C' },
  { name: 'Facebook', value: 12500, color: '#1877F2' },
  { name: 'Twitter', value: 8900, color: '#1DA1F2' },
  { name: 'LinkedIn', value: 1800, color: '#0A66C2' },
];

const engagementByPlatform = [
  { platform: 'Instagram', likes: 4200, comments: 850, shares: 420 },
  { platform: 'Facebook', likes: 2100, comments: 520, shares: 280 },
  { platform: 'Twitter', likes: 1800, comments: 340, shares: 190 },
  { platform: 'LinkedIn', likes: 520, comments: 180, shares: 95 },
];

const topPosts = [
  {
    id: '1',
    content: 'Excited to announce our new product launch! 🚀',
    date: 'Oct 28',
    likes: 342,
    comments: 67,
    shares: 23,
    engagement: 12.4,
  },
  {
    id: '2',
    content: 'Behind the scenes of our latest campaign...',
    date: 'Oct 25',
    likes: 298,
    comments: 54,
    shares: 19,
    engagement: 10.8,
  },
  {
    id: '3',
    content: 'Customer success story: How we helped...',
    date: 'Oct 22',
    likes: 276,
    comments: 48,
    shares: 15,
    engagement: 9.9,
  },
];

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('30d');
  const [syncing, setSyncing] = useState(false);

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => setSyncing(false), 2000);
  };

  return (
    <div>
      <Breadcrumb />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-h1 text-primary-900 mb-2">Analytics</h1>
          <p className="text-body text-primary-600">
            Track your social media performance and insights
          </p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <Button variant="outline" onClick={handleSync} disabled={syncing}>
            <RefreshCw
              className={`h-4 w-4 mr-2 ${syncing ? 'animate-spin' : ''}`}
            />
            Sync Data
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Date Range Selector */}
      <div className="flex gap-2 mb-6">
        <Button
          variant={dateRange === '7d' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setDateRange('7d')}
        >
          Last 7 Days
        </Button>
        <Button
          variant={dateRange === '30d' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setDateRange('30d')}
        >
          Last 30 Days
        </Button>
        <Button
          variant={dateRange === '90d' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setDateRange('90d')}
        >
          Last 90 Days
        </Button>
        <Button variant={dateRange === 'custom' ? 'default' : 'outline'} size="sm">
          <Calendar className="h-4 w-4 mr-2" />
          Custom Range
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Followers"
          value="51,500"
          change={{ value: 12.5, type: 'increase' }}
          icon={Users}
          iconColor="text-accent-600"
          iconBgColor="bg-accent-50"
        />
        <StatCard
          title="Total Engagement"
          value="12,450"
          change={{ value: 8.2, type: 'increase' }}
          icon={Heart}
          iconColor="text-error-600"
          iconBgColor="bg-error-50"
        />
        <StatCard
          title="Total Reach"
          value="173,500"
          change={{ value: 15.3, type: 'increase' }}
          icon={Eye}
          iconColor="text-success-600"
          iconBgColor="bg-success-50"
        />
        <StatCard
          title="Engagement Rate"
          value="8.4%"
          change={{ value: 2.1, type: 'increase' }}
          icon={TrendingUp}
          iconColor="text-warning-600"
          iconBgColor="bg-warning-50"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Growth Trends */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Growth Trends</CardTitle>
            <CardDescription>Followers and engagement over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis
                  dataKey="date"
                  stroke="#64748B"
                  style={{ fontSize: '12px' }}
                />
                <YAxis stroke="#64748B" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="followers"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6', r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="engagement"
                  stroke="#EF4444"
                  strokeWidth={2}
                  dot={{ fill: '#EF4444', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Platform Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Platform Distribution</CardTitle>
            <CardDescription>Followers by platform</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={platformData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {platformData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Engagement by Platform */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Engagement by Platform</CardTitle>
          <CardDescription>
            Likes, comments, and shares across platforms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={engagementByPlatform}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis
                dataKey="platform"
                stroke="#64748B"
                style={{ fontSize: '12px' }}
              />
              <YAxis stroke="#64748B" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar dataKey="likes" fill="#EF4444" radius={[4, 4, 0, 0]} />
              <Bar dataKey="comments" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="shares" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Performing Posts */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Posts</CardTitle>
          <CardDescription>Your best content this period</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topPosts.map((post, index) => (
              <div
                key={post.id}
                className="flex items-start gap-4 p-4 bg-primary-50 rounded-lg"
              >
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">
                      #{index + 1}
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-primary-900 mb-2">
                    {post.content}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-primary-600">
                    <span>❤️ {post.likes}</span>
                    <span>💬 {post.comments}</span>
                    <span>🔄 {post.shares}</span>
                    <span>• {post.date}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-primary-500">Engagement Rate</p>
                  <p className="text-lg font-bold text-success-600">
                    {post.engagement}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
