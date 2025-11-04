export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary-200 border-t-accent-500" />
        <p className="text-body text-primary-600">Loading...</p>
      </div>
    </div>
  );
}
