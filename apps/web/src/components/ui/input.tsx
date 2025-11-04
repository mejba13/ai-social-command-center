import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          type={type}
          className={cn(
            'flex h-12 w-full rounded-lg border bg-white px-4 py-3 text-sm text-primary-800 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-primary-400 disabled:cursor-not-allowed disabled:opacity-50',
            error
              ? 'border-error-500 focus:border-error-500 focus:ring-2 focus:ring-error-500/10'
              : 'border-primary-200 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/10',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-1 text-xs text-error-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
