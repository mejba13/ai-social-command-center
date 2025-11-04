import { Router } from 'express';
import { AIController } from '../controllers/ai.controller';

const router = Router();
const aiController = new AIController();

// Generate AI caption
router.post('/generate-caption', aiController.generateCaption);

// Generate hashtags
router.post('/generate-hashtags', aiController.generateHashtags);

// Generate image
router.post('/generate-image', aiController.generateImage);

// Repurpose content
router.post('/repurpose-content', aiController.repurposeContent);

// Analyze sentiment
router.post('/analyze-sentiment', aiController.analyzeSentiment);

export default router;
