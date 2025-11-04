'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  FileText,
  Share2,
  BarChart3,
  Settings,
  ChevronLeft,
  Calendar,
  Inbox,
} from 'lucide-react';

const navigation = [
  {
    name: 'Overview',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Posts',
    href: '/dashboard/posts',
    icon: FileText,
  },
  {
    name: 'Calendar',
    href: '/dashboard/calendar',
    icon: Calendar,
  },
  {
    name: 'Inbox',
    href: '/dashboard/inbox',
    icon: Inbox,
    badge: 12,
  },
  {
    name: 'Accounts',
    href: '/dashboard/accounts',
    icon: Share2,
  },
  {
    name: 'Analytics',
    href: '/dashboard/analytics',
    icon: BarChart3,
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      <div className="lg:hidden fixed inset-0 bg-primary-900/50 backdrop-blur-sm z-40 hidden" />

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 h-screen bg-primary-50 border-r border-primary-200 transition-all duration-300',
          collapsed ? 'w-20' : 'w-72',
          'hidden lg:block'
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-6 border-b border-primary-200">
          {!collapsed && (
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-accent-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">AI</span>
              </div>
              <span className="text-h6 font-bold text-primary-900">
                Social Command
              </span>
            </Link>
          )}
          {collapsed && (
            <div className="h-8 w-8 rounded-lg bg-accent-500 flex items-center justify-center mx-auto">
              <span className="text-white font-bold text-lg">AI</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-accent-50 text-accent-700 shadow-sm'
                    : 'text-primary-600 hover:bg-primary-100 hover:text-primary-900',
                  collapsed && 'justify-center px-2'
                )}
                title={collapsed ? item.name : undefined}
              >
                <Icon className={cn('h-5 w-5 flex-shrink-0')} />
                {!collapsed && (
                  <>
                    <span className="flex-1">{item.name}</span>
                    {item.badge && (
                      <span className="inline-flex items-center justify-center h-5 min-w-[20px] px-1.5 rounded-full bg-accent-500 text-white text-xs font-semibold">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Collapse Toggle */}
        <div className="p-4 border-t border-primary-200">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={cn(
              'flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-primary-600 hover:bg-primary-100 hover:text-primary-900 transition-all duration-200',
              collapsed && 'justify-center px-2'
            )}
          >
            <ChevronLeft
              className={cn(
                'h-5 w-5 transition-transform duration-300',
                collapsed && 'rotate-180'
              )}
            />
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>
      </aside>

      {/* Spacer for fixed sidebar */}
      <div
        className={cn(
          'hidden lg:block transition-all duration-300',
          collapsed ? 'w-20' : 'w-72'
        )}
      />
    </>
  );
}
