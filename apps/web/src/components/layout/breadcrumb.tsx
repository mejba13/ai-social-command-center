'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  // Don't show breadcrumb on root dashboard
  if (segments.length <= 1) return null;

  const breadcrumbs = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    const label = segment
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return {
      href,
      label,
      isLast: index === segments.length - 1,
    };
  });

  return (
    <nav className="flex items-center space-x-2 text-sm mb-6">
      <Link
        href="/dashboard"
        className="flex items-center text-primary-500 hover:text-primary-700 transition-colors"
      >
        <Home className="h-4 w-4" />
      </Link>

      {breadcrumbs.map((crumb) => (
        <div key={crumb.href} className="flex items-center space-x-2">
          <ChevronRight className="h-4 w-4 text-primary-300" />
          {crumb.isLast ? (
            <span className="font-medium text-primary-900">{crumb.label}</span>
          ) : (
            <Link
              href={crumb.href}
              className="text-primary-500 hover:text-primary-700 transition-colors"
            >
              {crumb.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
