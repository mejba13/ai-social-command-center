'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-8">
      <div className="text-center">
        <h2 className="mb-4 text-h2 text-error-500">Something went wrong!</h2>
        <p className="mb-8 text-body text-primary-600">
          {error.message || 'An unexpected error occurred.'}
        </p>
        <button
          onClick={reset}
          className="btn bg-accent-500 text-white hover:bg-accent-600"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
