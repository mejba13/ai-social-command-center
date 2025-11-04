import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
  };
  icon: LucideIcon;
  iconColor?: string;
  iconBgColor?: string;
}

export function StatCard({
  title,
  value,
  change,
  icon: Icon,
  iconColor = 'text-accent-600',
  iconBgColor = 'bg-accent-50',
}: StatCardProps) {
  return (
    <div className="card p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-body-small text-primary-600 font-medium mb-1">
            {title}
          </p>
          <p className="text-h2 font-bold text-primary-900 mb-2">{value}</p>
          {change && (
            <div className="flex items-center gap-1">
              <span
                className={cn(
                  'text-sm font-semibold',
                  change.type === 'increase'
                    ? 'text-success-600'
                    : 'text-error-600'
                )}
              >
                {change.type === 'increase' ? '+' : '-'}
                {Math.abs(change.value)}%
              </span>
              <span className="text-xs text-primary-500">vs last month</span>
            </div>
          )}
        </div>
        <div className={cn('p-3 rounded-xl', iconBgColor)}>
          <Icon className={cn('h-6 w-6', iconColor)} />
        </div>
      </div>
    </div>
  );
}
