import { Request, Response, NextFunction } from 'express';
import { AnalyticsService } from '../services/analytics.service';

export class AnalyticsController {
  private analyticsService: AnalyticsService;

  constructor() {
    this.analyticsService = new AnalyticsService();
  }

  // Get workspace analytics overview
  getOverview = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // TODO: Get workspace ID from authenticated user
      const workspaceId = '1';

      const analytics = await this.analyticsService.getWorkspaceAnalytics(workspaceId);

      res.status(200).json({
        status: 'success',
        data: analytics,
      });
    } catch (error) {
      next(error);
    }
  };

  // Get post-level analytics
  getPostAnalytics = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { postId } = req.params;

      const analytics = await this.analyticsService.getPostAnalytics(postId);

      res.status(200).json({
        status: 'success',
        data: analytics,
      });
    } catch (error) {
      next(error);
    }
  };

  // Get top performing posts
  getTopPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const workspaceId = '1';
      const { limit = 10 } = req.query;

      const posts = await this.analyticsService.getTopPerformingPosts(
        workspaceId,
        Number(limit)
      );

      res.status(200).json({
        status: 'success',
        data: { posts },
      });
    } catch (error) {
      next(error);
    }
  };

  // Trigger analytics sync
  syncAnalytics = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const workspaceId = '1';

      await this.analyticsService.syncAllAnalytics(workspaceId);

      res.status(200).json({
        status: 'success',
        message: 'Analytics sync initiated',
      });
    } catch (error) {
      next(error);
    }
  };
}
