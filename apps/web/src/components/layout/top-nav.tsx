'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import {
  Bell,
  Search,
  Menu,
  ChevronDown,
  LogOut,
  User,
  Settings,
  HelpCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function TopNav() {
  const { data: session } = useSession();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleSignOut = () => {
    signOut({ callbackUrl: '/signin' });
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-primary-200 shadow-sm">
      <div className="flex h-full items-center justify-between px-6">
        {/* Left Side - Mobile Menu & Search */}
        <div className="flex items-center gap-4 flex-1">
          {/* Mobile Menu Button */}
          <button className="lg:hidden p-2 hover:bg-primary-50 rounded-lg">
            <Menu className="h-6 w-6 text-primary-600" />
          </button>

          {/* Search */}
          <div className="hidden md:flex items-center gap-2 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-400" />
              <input
                type="text"
                placeholder="Search posts, accounts..."
                className="w-full h-10 pl-10 pr-4 rounded-lg border border-primary-200 bg-primary-50 text-sm text-primary-900 placeholder:text-primary-400 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/10 focus:bg-white transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Right Side - Notifications & User Menu */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 hover:bg-primary-50 rounded-lg transition-colors"
            >
              <Bell className="h-6 w-6 text-primary-600" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-accent-500 rounded-full" />
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowNotifications(false)}
                />
                <div className="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-lg border border-primary-200 z-50 animate-slide-in-right">
                  <div className="p-4 border-b border-primary-200">
                    <h3 className="text-h6 font-semibold text-primary-900">
                      Notifications
                    </h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    <div className="p-4 hover:bg-primary-50 border-b border-primary-100 cursor-pointer transition-colors">
                      <p className="text-sm font-medium text-primary-900">
                        Post published successfully
                      </p>
                      <p className="text-xs text-primary-600 mt-1">
                        Your post to Facebook has been published
                      </p>
                      <p className="text-xs text-primary-400 mt-1">2 min ago</p>
                    </div>
                    <div className="p-4 hover:bg-primary-50 border-b border-primary-100 cursor-pointer transition-colors">
                      <p className="text-sm font-medium text-primary-900">
                        New comment received
                      </p>
                      <p className="text-xs text-primary-600 mt-1">
                        Someone commented on your Instagram post
                      </p>
                      <p className="text-xs text-primary-400 mt-1">1 hour ago</p>
                    </div>
                    <div className="p-4 hover:bg-primary-50 cursor-pointer transition-colors">
                      <p className="text-sm font-medium text-primary-900">
                        Scheduled post ready
                      </p>
                      <p className="text-xs text-primary-600 mt-1">
                        Your post is scheduled for 3:00 PM today
                      </p>
                      <p className="text-xs text-primary-400 mt-1">3 hours ago</p>
                    </div>
                  </div>
                  <div className="p-3 border-t border-primary-200">
                    <Link
                      href="/dashboard/notifications"
                      className="text-sm text-accent-600 hover:text-accent-700 font-medium"
                    >
                      View all notifications
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 p-2 hover:bg-primary-50 rounded-lg transition-colors"
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {session?.user?.name?.[0]?.toUpperCase() || 'U'}
                </span>
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-primary-900">
                  {session?.user?.name || 'User'}
                </p>
                <p className="text-xs text-primary-500">
                  {session?.user?.email || 'user@example.com'}
                </p>
              </div>
              <ChevronDown className="h-4 w-4 text-primary-400" />
            </button>

            {/* User Dropdown */}
            {showUserMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowUserMenu(false)}
                />
                <div className="absolute right-0 top-12 w-56 bg-white rounded-lg shadow-lg border border-primary-200 z-50 animate-slide-in-right">
                  <div className="p-3 border-b border-primary-200">
                    <p className="text-sm font-medium text-primary-900">
                      {session?.user?.name || 'User'}
                    </p>
                    <p className="text-xs text-primary-500 truncate">
                      {session?.user?.email || 'user@example.com'}
                    </p>
                  </div>
                  <div className="py-2">
                    <Link
                      href="/dashboard/profile"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-primary-700 hover:bg-primary-50 transition-colors"
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </Link>
                    <Link
                      href="/dashboard/settings"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-primary-700 hover:bg-primary-50 transition-colors"
                    >
                      <Settings className="h-4 w-4" />
                      Settings
                    </Link>
                    <Link
                      href="/help"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-primary-700 hover:bg-primary-50 transition-colors"
                    >
                      <HelpCircle className="h-4 w-4" />
                      Help & Support
                    </Link>
                  </div>
                  <div className="border-t border-primary-200 py-2">
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-3 w-full px-4 py-2 text-sm text-error-600 hover:bg-error-50 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
