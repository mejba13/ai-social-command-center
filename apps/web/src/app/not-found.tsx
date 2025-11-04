import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-8">
      <div className="text-center">
        <h1 className="mb-4 text-display-1 text-primary-900">404</h1>
        <h2 className="mb-4 text-h2 text-primary-700">Page Not Found</h2>
        <p className="mb-8 text-body text-primary-600">
          The page you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="btn bg-accent-500 text-white hover:bg-accent-600"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
