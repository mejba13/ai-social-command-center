export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-primary-50 to-accent-50 p-8">
      <div className="text-center">
        <h1 className="mb-4 text-display-2 text-primary-900">
          AI Social Command Center
        </h1>
        <p className="mb-8 text-body-large text-primary-600">
          Your unified platform for AI-powered social media management
        </p>
        <div className="flex gap-4 justify-center">
          <button className="btn bg-accent-500 text-white hover:bg-accent-600 hover:-translate-y-0.5 shadow-accent">
            Get Started
          </button>
          <button className="btn border-2 border-primary-200 bg-white text-primary-700 hover:bg-primary-50">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
