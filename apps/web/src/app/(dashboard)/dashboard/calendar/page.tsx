'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb } from '@/components/layout/breadcrumb';

// Mock scheduled posts
const scheduledPosts = [
  {
    id: '1',
    date: '2024-11-05',
    time: '15:00',
    content: 'Product Launch Announcement',
    platforms: ['Facebook', 'Instagram'],
  },
  {
    id: '2',
    date: '2024-11-06',
    time: '12:00',
    content: 'Behind the Scenes Video',
    platforms: ['Instagram', 'TikTok'],
  },
  {
    id: '3',
    date: '2024-11-08',
    time: '09:00',
    content: 'Weekly Newsletter Teaser',
    platforms: ['LinkedIn', 'Twitter'],
  },
];

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getPostsForDate = (day: number) => {
    const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return scheduledPosts.filter((post) => post.date === dateString);
  };

  const renderCalendarDays = () => {
    const days = [];
    const today = new Date();

    // Empty cells for days before the month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="min-h-[120px] bg-primary-25 border border-primary-100"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday =
        day === today.getDate() &&
        currentDate.getMonth() === today.getMonth() &&
        currentDate.getFullYear() === today.getFullYear();

      const postsForDay = getPostsForDate(day);

      days.push(
        <div
          key={day}
          className={`min-h-[120px] border border-primary-200 p-2 hover:bg-primary-50 transition-colors ${
            isToday ? 'bg-accent-50 border-accent-200' : 'bg-white'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span
              className={`text-sm font-semibold ${
                isToday ? 'text-accent-700' : 'text-primary-900'
              }`}
            >
              {day}
            </span>
            {postsForDay.length > 0 && (
              <Badge variant="info" className="text-xs">
                {postsForDay.length}
              </Badge>
            )}
          </div>

          <div className="space-y-1">
            {postsForDay.map((post) => (
              <Link
                key={post.id}
                href={`/dashboard/posts/${post.id}`}
                className="block p-2 bg-accent-50 border border-accent-200 rounded text-xs hover:bg-accent-100 transition-colors"
              >
                <p className="font-medium text-accent-900 truncate mb-1">
                  {post.time} - {post.content}
                </p>
                <p className="text-accent-600 truncate">
                  {post.platforms.join(', ')}
                </p>
              </Link>
            ))}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div>
      <Breadcrumb />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-h1 text-primary-900 mb-2">Content Calendar</h1>
          <p className="text-body text-primary-600">
            View and manage your scheduled posts
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/posts/new">
            <Plus className="h-4 w-4 mr-2" />
            Schedule Post
          </Link>
        </Button>
      </div>

      {/* Calendar Card */}
      <Card>
        <CardContent className="p-6">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-h3 text-primary-900">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={previousMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentDate(new Date())}
              >
                Today
              </Button>
              <Button variant="outline" size="sm" onClick={nextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-0 mb-0">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div
                key={day}
                className="p-2 text-center text-sm font-semibold text-primary-600 bg-primary-50 border border-primary-200"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-0">
            {renderCalendarDays()}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Posts Summary */}
      <Card className="mt-6">
        <CardContent className="p-6">
          <h3 className="text-h4 text-primary-900 mb-4">Upcoming Posts</h3>
          <div className="space-y-3">
            {scheduledPosts
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .slice(0, 5)
              .map((post) => (
                <div
                  key={post.id}
                  className="flex items-center gap-4 p-3 bg-primary-50 rounded-lg"
                >
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-lg bg-white border border-primary-200 flex flex-col items-center justify-center">
                      <span className="text-xs font-semibold text-primary-500">
                        {new Date(post.date).toLocaleDateString('en', { month: 'short' }).toUpperCase()}
                      </span>
                      <span className="text-lg font-bold text-primary-900">
                        {new Date(post.date).getDate()}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-primary-900">
                      {post.content}
                    </h4>
                    <p className="text-xs text-primary-600 mt-1">
                      {post.platforms.join(', ')} • {post.time}
                    </p>
                  </div>
                  <Badge variant="warning">Scheduled</Badge>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
