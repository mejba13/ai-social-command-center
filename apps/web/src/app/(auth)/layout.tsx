export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-accent-600 to-accent-700 p-12 flex-col justify-between">
        <div>
          <h1 className="text-display-2 text-white font-bold mb-4">
            AI Social Command Center
          </h1>
          <p className="text-xl text-accent-50">
            Manage all your social media accounts with AI-powered automation
          </p>
        </div>
        <div className="text-accent-100 text-sm">
          © 2024 AI Social Command Center. All rights reserved.
        </div>
      </div>

      {/* Right side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
