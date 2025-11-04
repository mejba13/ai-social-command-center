import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-accent-500 text-white shadow hover:bg-accent-600 hover:-translate-y-0.5 active:translate-y-0 shadow-accent focus-visible:ring-accent-500',
        secondary:
          'bg-white text-primary-700 border-2 border-primary-200 hover:bg-primary-50 hover:border-primary-300 focus-visible:ring-primary-500',
        outline:
          'border border-primary-200 bg-transparent hover:bg-primary-50 text-primary-700 focus-visible:ring-primary-500',
        ghost:
          'hover:bg-primary-100 hover:text-primary-900 text-primary-700 focus-visible:ring-primary-500',
        success:
          'bg-success-500 text-white hover:bg-success-600 shadow focus-visible:ring-success-500',
        warning:
          'bg-warning-500 text-white hover:bg-warning-600 shadow focus-visible:ring-warning-500',
        destructive:
          'bg-error-500 text-white hover:bg-error-600 shadow focus-visible:ring-error-500',
        link: 'text-accent-600 underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-12 px-6 py-3',
        sm: 'h-9 px-4 py-2 text-xs',
        lg: 'h-14 px-8 py-4 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
