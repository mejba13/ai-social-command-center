import { Request, Response, NextFunction } from 'express';
import { AIService } from '../services/ai.service';
import { AppError } from '../middleware/error-handler';

export class AIController {
  private aiService: AIService;

  constructor() {
    this.aiService = new AIService();
  }

  // Generate AI caption
  generateCaption = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        topic,
        tone,
        length,
        platform,
        includeHashtags,
        includeEmojis,
        brandVoice,
        targetAudience,
        provider = 'openai', // 'openai' or 'anthropic'
      } = req.body;

      if (!topic) {
        throw new AppError('Topic is required', 400);
      }

      let captions: string[];

      if (provider === 'anthropic') {
        captions = await this.aiService.generateCaptionWithClaude({
          topic,
          tone,
          length,
          platform,
          includeHashtags,
          includeEmojis,
        });
      } else {
        captions = await this.aiService.generateCaption({
          topic,
          tone,
          length,
          platform,
          includeHashtags,
          includeEmojis,
          brandVoice,
          targetAudience,
        });
      }

      res.status(200).json({
        status: 'success',
        data: { captions },
      });
    } catch (error) {
      next(error);
    }
  };

  // Generate hashtags
  generateHashtags = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { topic, platform } = req.body;

      if (!topic) {
        throw new AppError('Topic is required', 400);
      }

      const hashtags = await this.aiService.generateHashtags(topic, platform);

      res.status(200).json({
        status: 'success',
        data: { hashtags },
      });
    } catch (error) {
      next(error);
    }
  };

  // Generate image
  generateImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { prompt, style, aspectRatio, quality } = req.body;

      if (!prompt) {
        throw new AppError('Prompt is required', 400);
      }

      const imageUrl = await this.aiService.generateImage({
        prompt,
        style,
        aspectRatio,
        quality,
      });

      res.status(200).json({
        status: 'success',
        data: { imageUrl },
      });
    } catch (error) {
      next(error);
    }
  };

  // Repurpose content
  repurposeContent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { content, fromFormat, toFormat, platform } = req.body;

      if (!content || !fromFormat || !toFormat) {
        throw new AppError('Content, fromFormat, and toFormat are required', 400);
      }

      const repurposedContent = await this.aiService.repurposeContent({
        content,
        fromFormat,
        toFormat,
        platform,
      });

      res.status(200).json({
        status: 'success',
        data: { content: repurposedContent },
      });
    } catch (error) {
      next(error);
    }
  };

  // Analyze sentiment
  analyzeSentiment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { content } = req.body;

      if (!content) {
        throw new AppError('Content is required', 400);
      }

      const sentiment = await this.aiService.analyzeSentiment(content);

      res.status(200).json({
        status: 'success',
        data: { sentiment },
      });
    } catch (error) {
      next(error);
    }
  };
}
