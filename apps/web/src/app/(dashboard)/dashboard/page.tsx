'use client';

import Link from 'next/link';
import {
  TrendingUp,
  Users,
  Heart,
  MessageCircle,
  Plus,
  Calendar,
  Zap,
  BarChart3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StatCard } from '@/components/features/stat-card';
import { Breadcrumb } from '@/components/layout/breadcrumb';

export default function DashboardPage() {
  return (
    <div>
      <Breadcrumb />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-h1 text-primary-900 mb-2">Dashboard</h1>
          <p className="text-body text-primary-600">
            Welcome back! Here's what's happening with your social media.
          </p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <Button variant="outline" asChild>
            <Link href="/dashboard/calendar">
              <Calendar className="h-4 w-4 mr-2" />
              View Calendar
            </Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/posts/new">
              <Plus className="h-4 w-4 mr-2" />
              Create Post
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Followers"
          value="24,563"
          change={{ value: 12.5, type: 'increase' }}
          icon={Users}
          iconColor="text-accent-600"
          iconBgColor="bg-accent-50"
        />
        <StatCard
          title="Engagement Rate"
          value="8.4%"
          change={{ value: 3.2, type: 'increase' }}
          icon={Heart}
          iconColor="text-error-600"
          iconBgColor="bg-error-50"
        />
        <StatCard
          title="Total Posts"
          value="156"
          change={{ value: 18.0, type: 'increase' }}
          icon={TrendingUp}
          iconColor="text-success-600"
          iconBgColor="bg-success-50"
        />
        <StatCard
          title="Comments"
          value="1,249"
          change={{ value: 5.4, type: 'decrease' }}
          icon={MessageCircle}
          iconColor="text-warning-600"
          iconBgColor="bg-warning-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Quick Actions */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link
              href="/dashboard/posts/new"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary-50 transition-colors group"
            >
              <div className="h-10 w-10 rounded-lg bg-accent-50 flex items-center justify-center group-hover:bg-accent-100 transition-colors">
                <Plus className="h-5 w-5 text-accent-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-primary-900">
                  Create New Post
                </p>
                <p className="text-xs text-primary-500">
                  Schedule content for your social media
                </p>
              </div>
            </Link>

            <Link
              href="/dashboard/posts?filter=ai-generate"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary-50 transition-colors group"
            >
              <div className="h-10 w-10 rounded-lg bg-success-50 flex items-center justify-center group-hover:bg-success-100 transition-colors">
                <Zap className="h-5 w-5 text-success-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-primary-900">
                  AI Content Generator
                </p>
                <p className="text-xs text-primary-500">
                  Create posts with AI assistance
                </p>
              </div>
            </Link>

            <Link
              href="/dashboard/analytics"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary-50 transition-colors group"
            >
              <div className="h-10 w-10 rounded-lg bg-warning-50 flex items-center justify-center group-hover:bg-warning-100 transition-colors">
                <BarChart3 className="h-5 w-5 text-warning-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-primary-900">
                  View Analytics
                </p>
                <p className="text-xs text-primary-500">
                  Track performance and insights
                </p>
              </div>
            </Link>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4 pb-4 border-b border-primary-100">
                <div className="h-10 w-10 rounded-full bg-success-50 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-5 w-5 text-success-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-primary-900">
                    Post published successfully
                  </p>
                  <p className="text-xs text-primary-600 mt-1">
                    Your post "Summer Sale Campaign" has been published to Facebook
                    and Instagram
                  </p>
                  <p className="text-xs text-primary-400 mt-1">2 hours ago</p>
                </div>
                <Badge variant="success">Published</Badge>
              </div>

              <div className="flex items-start gap-4 pb-4 border-b border-primary-100">
                <div className="h-10 w-10 rounded-full bg-accent-50 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="h-5 w-5 text-accent-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-primary-900">
                    New comments received
                  </p>
                  <p className="text-xs text-primary-600 mt-1">
                    5 new comments on your latest Instagram post
                  </p>
                  <p className="text-xs text-primary-400 mt-1">5 hours ago</p>
                </div>
                <Badge variant="info">New</Badge>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-warning-50 flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-5 w-5 text-warning-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-primary-900">
                    Upcoming scheduled post
                  </p>
                  <p className="text-xs text-primary-600 mt-1">
                    "Product Launch Teaser" is scheduled for tomorrow at 3:00 PM
                  </p>
                  <p className="text-xs text-primary-400 mt-1">1 day ago</p>
                </div>
                <Badge variant="warning">Scheduled</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Posts */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Upcoming Posts</CardTitle>
              <CardDescription>
                Posts scheduled for the next 7 days
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/calendar">View All</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-4 p-4 bg-primary-50 rounded-lg">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-lg bg-white border border-primary-200 flex flex-col items-center justify-center">
                  <span className="text-xs font-semibold text-primary-500">
                    NOV
                  </span>
                  <span className="text-lg font-bold text-primary-900">05</span>
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-primary-900">
                  Product Launch Announcement
                </h4>
                <p className="text-xs text-primary-600 mt-1">
                  Platforms: Facebook, Instagram, Twitter • 3:00 PM
                </p>
              </div>
              <div className="flex gap-2">
                <Badge>Draft</Badge>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-primary-50 rounded-lg">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-lg bg-white border border-primary-200 flex flex-col items-center justify-center">
                  <span className="text-xs font-semibold text-primary-500">
                    NOV
                  </span>
                  <span className="text-lg font-bold text-primary-900">06</span>
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-primary-900">
                  Behind the Scenes Video
                </h4>
                <p className="text-xs text-primary-600 mt-1">
                  Platforms: Instagram, TikTok • 12:00 PM
                </p>
              </div>
              <div className="flex gap-2">
                <Badge variant="warning">Scheduled</Badge>
              </div>
            </div>

            <div className="text-center py-4">
              <Link
                href="/dashboard/posts/new"
                className="text-sm text-accent-600 hover:text-accent-700 font-medium"
              >
                Schedule a new post →
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
