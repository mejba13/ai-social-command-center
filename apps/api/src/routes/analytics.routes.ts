import { Router } from 'express';
import { AnalyticsController } from '../controllers/analytics.controller';

const router = Router();
const analyticsController = new AnalyticsController();

// Get workspace analytics overview
router.get('/overview', analyticsController.getOverview);

// Get post analytics
router.get('/posts/:postId', analyticsController.getPostAnalytics);

// Get top performing posts
router.get('/top-posts', analyticsController.getTopPosts);

// Trigger analytics sync
router.post('/sync', analyticsController.syncAnalytics);

export default router;
