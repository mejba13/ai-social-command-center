/**
 * AI Service
 * Handles interactions with AI providers (OpenAI, Anthropic)
 */

import { config } from '../config';
import { AppError } from '../middleware/error-handler';

// TODO: Replace with Prisma client
// import { prisma } from '../lib/prisma';

interface CaptionGenerationOptions {
  topic: string;
  tone?: 'professional' | 'casual' | 'funny' | 'inspirational' | 'educational';
  length?: 'short' | 'medium' | 'long';
  platform?: string;
  includeHashtags?: boolean;
  includeEmojis?: boolean;
  brandVoice?: string;
  targetAudience?: string;
}

interface ImageGenerationOptions {
  prompt: string;
  style?: 'realistic' | 'artistic' | 'minimalist' | 'vibrant' | 'professional';
  aspectRatio?: '1:1' | '16:9' | '9:16' | '4:5';
  quality?: 'standard' | 'hd';
}

interface ContentRepurposeOptions {
  content: string;
  fromFormat: 'long-form' | 'video' | 'article';
  toFormat: 'caption' | 'thread' | 'carousel' | 'short-form';
  platform?: string;
}

export class AIService {
  /**
   * Generate AI caption using OpenAI GPT-4
   */
  async generateCaption(options: CaptionGenerationOptions): Promise<string[]> {
    try {
      const {
        topic,
        tone = 'professional',
        length = 'medium',
        platform,
        includeHashtags = true,
        includeEmojis = true,
        brandVoice,
        targetAudience,
      } = options;

      // Build the prompt
      let prompt = `Write a ${tone} social media caption about: ${topic}\n\n`;
      prompt += `Length: ${length}\n`;

      if (platform) {
        prompt += `Platform: ${platform}\n`;
      }

      if (brandVoice) {
        prompt += `Brand voice: ${brandVoice}\n`;
      }

      if (targetAudience) {
        prompt += `Target audience: ${targetAudience}\n`;
      }

      prompt += `Include emojis: ${includeEmojis}\n`;
      prompt += `Include hashtags: ${includeHashtags}\n\n`;
      prompt += `Generate 3 different variations of this caption.`;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${config.ai.openai.apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4-turbo-preview',
          messages: [
            {
              role: 'system',
              content: 'You are a professional social media content creator who writes engaging, authentic captions that drive engagement.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.8,
          max_tokens: 500,
          n: 3, // Generate 3 variations
        }),
      });

      if (!response.ok) {
        throw new Error('OpenAI API request failed');
      }

      const data = await response.json();
      const captions = data.choices.map((choice: any) => choice.message.content.trim());

      // TODO: Track AI generation in database
      // await prisma.aIGeneration.create({
      //   data: {
      //     workspaceId,
      //     type: 'CAPTION',
      //     prompt,
      //     result: captions.join('\n---\n'),
      //     model: 'gpt-4-turbo-preview',
      //     tokens: data.usage.total_tokens,
      //     cost: calculateCost(data.usage.total_tokens),
      //   },
      // });

      return captions;
    } catch (error) {
      console.error('AI caption generation error:', error);
      throw new AppError('Failed to generate AI caption', 500);
    }
  }

  /**
   * Generate AI caption using Anthropic Claude (alternative)
   */
  async generateCaptionWithClaude(options: CaptionGenerationOptions): Promise<string[]> {
    try {
      const {
        topic,
        tone = 'professional',
        length = 'medium',
        includeHashtags = true,
        includeEmojis = true,
      } = options;

      const prompt = `Write a ${tone} social media caption about: ${topic}. Length should be ${length}. ${includeEmojis ? 'Include relevant emojis.' : ''} ${includeHashtags ? 'Include relevant hashtags.' : ''} Generate 3 different variations.`;

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': config.ai.anthropic.apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-3-sonnet-20240229',
          max_tokens: 1024,
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error('Anthropic API request failed');
      }

      const data = await response.json();
      const content = data.content[0].text;

      // Split the response into variations
      const captions = content.split('\n\n').filter((c: string) => c.trim());

      return captions.slice(0, 3); // Return up to 3 variations
    } catch (error) {
      console.error('Claude caption generation error:', error);
      throw new AppError('Failed to generate caption with Claude', 500);
    }
  }

  /**
   * Generate hashtag suggestions
   */
  async generateHashtags(topic: string, platform?: string): Promise<string[]> {
    try {
      const prompt = `Generate 15 relevant and trending hashtags for a social media post about: ${topic}${platform ? ` on ${platform}` : ''}. Mix popular and niche hashtags. Return only the hashtags, one per line, including the # symbol.`;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${config.ai.openai.apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4-turbo-preview',
          messages: [
            {
              role: 'system',
              content: 'You are a social media hashtag expert who suggests relevant, trending hashtags.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 200,
        }),
      });

      const data = await response.json();
      const hashtags = data.choices[0].message.content
        .split('\n')
        .map((h: string) => h.trim())
        .filter((h: string) => h.startsWith('#'));

      return hashtags;
    } catch (error) {
      console.error('Hashtag generation error:', error);
      throw new AppError('Failed to generate hashtags', 500);
    }
  }

  /**
   * Generate image with DALL-E 3
   */
  async generateImage(options: ImageGenerationOptions): Promise<string> {
    try {
      const { prompt, style = 'realistic', aspectRatio = '1:1', quality = 'standard' } = options;

      // Map aspect ratio to size
      const sizeMap: Record<string, string> = {
        '1:1': '1024x1024',
        '16:9': '1792x1024',
        '9:16': '1024x1792',
        '4:5': '1024x1280',
      };

      const size = sizeMap[aspectRatio] || '1024x1024';

      // Enhance prompt with style
      const stylePrompts: Record<string, string> = {
        realistic: 'photorealistic, high quality, detailed',
        artistic: 'artistic, creative, stylized',
        minimalist: 'minimalist, clean, simple design',
        vibrant: 'vibrant colors, energetic, bold',
        professional: 'professional, corporate, polished',
      };

      const enhancedPrompt = `${prompt}, ${stylePrompts[style]}`;

      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${config.ai.openai.apiKey}`,
        },
        body: JSON.stringify({
          model: 'dall-e-3',
          prompt: enhancedPrompt,
          n: 1,
          size,
          quality,
        }),
      });

      if (!response.ok) {
        throw new Error('DALL-E API request failed');
      }

      const data = await response.json();
      const imageUrl = data.data[0].url;

      // TODO: Download and save image to storage
      // TODO: Track AI generation in database

      return imageUrl;
    } catch (error) {
      console.error('Image generation error:', error);
      throw new AppError('Failed to generate image', 500);
    }
  }

  /**
   * Repurpose content from one format to another
   */
  async repurposeContent(options: ContentRepurposeOptions): Promise<string> {
    try {
      const { content, fromFormat, toFormat, platform } = options;

      const prompt = `Convert the following ${fromFormat} content into a ${toFormat} format${platform ? ` optimized for ${platform}` : ''}:\n\n${content}`;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${config.ai.openai.apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4-turbo-preview',
          messages: [
            {
              role: 'system',
              content: 'You are a content repurposing expert who adapts content for different formats and platforms while maintaining the core message.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 1000,
        }),
      });

      const data = await response.json();
      return data.choices[0].message.content.trim();
    } catch (error) {
      console.error('Content repurposing error:', error);
      throw new AppError('Failed to repurpose content', 500);
    }
  }

  /**
   * Analyze content sentiment
   */
  async analyzeSentiment(content: string): Promise<'POSITIVE' | 'NEUTRAL' | 'NEGATIVE'> {
    try {
      const prompt = `Analyze the sentiment of this social media content and respond with only one word: POSITIVE, NEUTRAL, or NEGATIVE.\n\nContent: ${content}`;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${config.ai.openai.apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.3,
          max_tokens: 10,
        }),
      });

      const data = await response.json();
      const sentiment = data.choices[0].message.content.trim().toUpperCase();

      if (['POSITIVE', 'NEUTRAL', 'NEGATIVE'].includes(sentiment)) {
        return sentiment as 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';
      }

      return 'NEUTRAL';
    } catch (error) {
      console.error('Sentiment analysis error:', error);
      return 'NEUTRAL';
    }
  }
}

/**
 * Calculate cost based on tokens (approximate)
 */
function calculateCost(tokens: number, model: string = 'gpt-4-turbo'): number {
  // Rough pricing estimates (update with actual pricing)
  const pricePerToken = {
    'gpt-4-turbo': 0.00003,
    'gpt-3.5-turbo': 0.000002,
    'dall-e-3': 0.04,
  };

  return tokens * (pricePerToken[model as keyof typeof pricePerToken] || 0.00003);
}
