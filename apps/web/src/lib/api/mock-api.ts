/**
 * Mock API Service
 * Simulates API responses for development without real API credentials
 */

import {
  generateMockCaption,
  generateMockHashtags,
  generateMockImageUrl,
  generateMockRepurposedContent,
  simulateDelay,
} from '../mock/ai-responses';

export class MockAPI {
  /**
   * Generate AI caption (mock)
   */
  static async generateCaption(data: {
    topic: string;
    tone?: string;
    length?: string;
    platform?: string;
    includeHashtags?: boolean;
    includeEmojis?: boolean;
    brandVoice?: string;
    targetAudience?: string;
    provider?: string;
  }): Promise<{ status: string; data: { captions: string[] } }> {
    await simulateDelay(2000); // Simulate API call delay

    const captions = generateMockCaption({
      topic: data.topic,
      tone: data.tone,
      length: data.length,
      includeHashtags: data.includeHashtags,
      includeEmojis: data.includeEmojis,
    });

    return {
      status: 'success',
      data: { captions },
    };
  }

  /**
   * Generate hashtags (mock)
   */
  static async generateHashtags(data: {
    topic: string;
    platform?: string;
  }): Promise<{ status: string; data: { hashtags: string[] } }> {
    await simulateDelay(1500);

    const hashtags = generateMockHashtags();

    return {
      status: 'success',
      data: { hashtags },
    };
  }

  /**
   * Generate image (mock)
   */
  static async generateImage(data: {
    prompt: string;
    style?: string;
    aspectRatio?: string;
    quality?: string;
  }): Promise<{ status: string; data: { imageUrl: string } }> {
    await simulateDelay(3000); // Image generation takes longer

    const imageUrl = generateMockImageUrl({
      style: data.style,
      aspectRatio: data.aspectRatio,
    });

    return {
      status: 'success',
      data: { imageUrl },
    };
  }

  /**
   * Repurpose content (mock)
   */
  static async repurposeContent(data: {
    content: string;
    fromFormat: string;
    toFormat: string;
    platform?: string;
  }): Promise<{ status: string; data: { content: string } }> {
    await simulateDelay(2000);

    const content = generateMockRepurposedContent({
      content: data.content,
      fromFormat: data.fromFormat,
      toFormat: data.toFormat,
    });

    return {
      status: 'success',
      data: { content },
    };
  }

  /**
   * Analyze sentiment (mock)
   */
  static async analyzeSentiment(data: {
    content: string;
  }): Promise<{ status: string; data: { sentiment: string } }> {
    await simulateDelay(1000);

    // Simple mock sentiment analysis
    const content = data.content.toLowerCase();
    let sentiment = 'NEUTRAL';

    const positiveWords = ['great', 'amazing', 'excellent', 'love', 'wonderful', 'fantastic'];
    const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'horrible', 'worst'];

    const hasPositive = positiveWords.some((word) => content.includes(word));
    const hasNegative = negativeWords.some((word) => content.includes(word));

    if (hasPositive && !hasNegative) sentiment = 'POSITIVE';
    if (hasNegative && !hasPositive) sentiment = 'NEGATIVE';

    return {
      status: 'success',
      data: { sentiment },
    };
  }
}

/**
 * Wrapper function to use either real API or mock API
 */
export async function apiCall<T>(
  url: string,
  options: RequestInit,
  useMock: boolean = false
): Promise<T> {
  if (useMock) {
    console.log('🔧 Using mock API for:', url);

    // Parse the endpoint and method
    const endpoint = url.split('/api/v1/')[1];
    const method = options.method || 'GET';

    if (method === 'POST' && options.body) {
      const data = JSON.parse(options.body as string);

      // Route to appropriate mock method
      if (endpoint === 'ai/generate-caption') {
        return MockAPI.generateCaption(data) as Promise<T>;
      }
      if (endpoint === 'ai/generate-hashtags') {
        return MockAPI.generateHashtags(data) as Promise<T>;
      }
      if (endpoint === 'ai/generate-image') {
        return MockAPI.generateImage(data) as Promise<T>;
      }
      if (endpoint === 'ai/repurpose-content') {
        return MockAPI.repurposeContent(data) as Promise<T>;
      }
      if (endpoint === 'ai/analyze-sentiment') {
        return MockAPI.analyzeSentiment(data) as Promise<T>;
      }
    }

    throw new Error('Mock endpoint not implemented: ' + endpoint);
  }

  // Real API call
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }
  return response.json();
}
