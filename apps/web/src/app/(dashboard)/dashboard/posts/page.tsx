'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Filter, Search, MoreVertical, Edit, Trash2, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb } from '@/components/layout/breadcrumb';

// Mock data
const posts = [
  {
    id: '1',
    content: 'Excited to announce our new product launch! 🚀',
    platforms: ['Facebook', 'Instagram', 'Twitter'],
    status: 'published',
    publishedAt: '2024-11-03 10:30 AM',
    engagement: { likes: 234, comments: 45, shares: 12 },
  },
  {
    id: '2',
    content: 'Behind the scenes of our latest campaign...',
    platforms: ['Instagram', 'TikTok'],
    status: 'scheduled',
    scheduledFor: '2024-11-05 3:00 PM',
  },
  {
    id: '3',
    content: 'Check out our summer collection!',
    platforms: ['Facebook', 'LinkedIn'],
    status: 'draft',
    updatedAt: '2024-11-02 4:20 PM',
  },
];

export default function PostsPage() {
  const [filter, setFilter] = useState('all');

  const filteredPosts =
    filter === 'all' ? posts : posts.filter((p) => p.status === filter);

  return (
    <div>
      <Breadcrumb />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-h1 text-primary-900 mb-2">Posts</h1>
          <p className="text-body text-primary-600">
            Manage your social media posts and schedules
          </p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button asChild>
            <Link href="/dashboard/posts/new">
              <Plus className="h-4 w-4 mr-2" />
              Create Post
            </Link>
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'all'
              ? 'bg-accent-500 text-white'
              : 'bg-white border border-primary-200 text-primary-700 hover:bg-primary-50'
          }`}
        >
          All Posts
        </button>
        <button
          onClick={() => setFilter('published')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'published'
              ? 'bg-accent-500 text-white'
              : 'bg-white border border-primary-200 text-primary-700 hover:bg-primary-50'
          }`}
        >
          Published
        </button>
        <button
          onClick={() => setFilter('scheduled')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'scheduled'
              ? 'bg-accent-500 text-white'
              : 'bg-white border border-primary-200 text-primary-700 hover:bg-primary-50'
          }`}
        >
          Scheduled
        </button>
        <button
          onClick={() => setFilter('draft')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'draft'
              ? 'bg-accent-500 text-white'
              : 'bg-white border border-primary-200 text-primary-700 hover:bg-primary-50'
          }`}
        >
          Drafts
        </button>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <Card key={post.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {post.status === 'published' && (
                      <Badge variant="success">Published</Badge>
                    )}
                    {post.status === 'scheduled' && (
                      <Badge variant="warning">Scheduled</Badge>
                    )}
                    {post.status === 'draft' && <Badge>Draft</Badge>}
                    <span className="text-xs text-primary-400">•</span>
                    <div className="flex gap-1">
                      {post.platforms.map((platform) => (
                        <span
                          key={platform}
                          className="text-xs px-2 py-0.5 bg-primary-100 text-primary-700 rounded"
                        >
                          {platform}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-primary-900 mb-3">{post.content}</p>

                  <div className="flex items-center gap-4 text-sm text-primary-500">
                    {post.publishedAt && (
                      <span>Published: {post.publishedAt}</span>
                    )}
                    {post.scheduledFor && (
                      <span>Scheduled for: {post.scheduledFor}</span>
                    )}
                    {post.updatedAt && <span>Updated: {post.updatedAt}</span>}
                  </div>

                  {post.engagement && (
                    <div className="flex items-center gap-4 mt-3 pt-3 border-t border-primary-100">
                      <span className="text-sm text-primary-600">
                        ❤️ {post.engagement.likes}
                      </span>
                      <span className="text-sm text-primary-600">
                        💬 {post.engagement.comments}
                      </span>
                      <span className="text-sm text-primary-600">
                        🔄 {post.engagement.shares}
                      </span>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-primary-600 mb-4">No posts found</p>
            <Button asChild>
              <Link href="/dashboard/posts/new">
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Post
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
