import { Request, Response, NextFunction } from 'express';
import { PostService } from '../services/post.service';
import { AppError } from '../middleware/error-handler';

export class PostController {
  private postService: PostService;

  constructor() {
    this.postService = new PostService();
  }

  // Get all posts
  getPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // TODO: Get workspace ID from authenticated user
      const workspaceId = '1';
      const { status, limit = 20, offset = 0 } = req.query;

      const posts = await this.postService.getPosts(
        workspaceId,
        status as string,
        Number(limit),
        Number(offset)
      );

      res.status(200).json({
        status: 'success',
        data: { posts },
      });
    } catch (error) {
      next(error);
    }
  };

  // Get single post
  getPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const post = await this.postService.getPostById(id);

      res.status(200).json({
        status: 'success',
        data: { post },
      });
    } catch (error) {
      next(error);
    }
  };

  // Create post
  createPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { content, platforms, scheduledAt } = req.body;

      if (!content || !platforms || platforms.length === 0) {
        throw new AppError('Content and platforms are required', 400);
      }

      // TODO: Get user ID from authenticated session
      const authorId = '1';
      const workspaceId = '1';

      const post = await this.postService.createPost({
        content,
        platforms,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : undefined,
        authorId,
        workspaceId,
      });

      res.status(201).json({
        status: 'success',
        data: { post },
      });
    } catch (error) {
      next(error);
    }
  };

  // Update post
  updatePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const post = await this.postService.updatePost(id, updateData);

      res.status(200).json({
        status: 'success',
        data: { post },
      });
    } catch (error) {
      next(error);
    }
  };

  // Delete post
  deletePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.postService.deletePost(id);

      res.status(200).json({
        status: 'success',
        message: 'Post deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  // Publish post immediately
  publishPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.postService.publishPost(id);

      res.status(200).json({
        status: 'success',
        message: 'Post published successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  // Schedule post
  schedulePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { scheduledAt } = req.body;

      if (!scheduledAt) {
        throw new AppError('Scheduled date is required', 400);
      }

      await this.postService.schedulePost(id, new Date(scheduledAt));

      res.status(200).json({
        status: 'success',
        message: 'Post scheduled successfully',
      });
    } catch (error) {
      next(error);
    }
  };
}
