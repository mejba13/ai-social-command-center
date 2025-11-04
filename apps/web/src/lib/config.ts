/**
 * Frontend configuration
 * Use environment variables to configure the app
 */

export const config = {
  // API Configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  },

  // Development Mode
  // Set to true to use mock data instead of real API calls
  dev: {
    useMockAI: process.env.NEXT_PUBLIC_USE_MOCK_AI === 'true',
    useMockData: process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true',
    enableDebugLogs: process.env.NEXT_PUBLIC_DEBUG === 'true',
  },

  // Feature Flags
  features: {
    aiCaptionGeneration: true,
    aiImageGeneration: true,
    brandVoiceProfiles: true,
    smartScheduling: false, // Coming in next sprint
    competitorAnalysis: false, // Coming in Phase 2
    advancedAnalytics: false, // Coming in Phase 2
  },
};

/**
 * Log configuration on startup (development only)
 */
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  console.log('🔧 App Configuration:', {
    apiBaseUrl: config.api.baseUrl,
    useMockAI: config.dev.useMockAI,
    useMockData: config.dev.useMockData,
  });
}
