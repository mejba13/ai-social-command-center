import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <textarea
          className={cn(
            'flex min-h-[120px] w-full rounded-lg border bg-white px-4 py-3 text-sm text-primary-800 transition-colors placeholder:text-primary-400 disabled:cursor-not-allowed disabled:opacity-50 resize-y',
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

Textarea.displayName = 'Textarea';

export { Textarea };
