import { Router } from 'express';
import { SocialAccountController } from '../controllers/social-account.controller';

const router = Router();
const socialController = new SocialAccountController();

// Get all connected accounts for workspace
router.get('/accounts', socialController.getAccounts);

// Delete/disconnect account
router.delete('/accounts/:id', socialController.disconnectAccount);

// OAuth Routes - Facebook/Instagram
router.get('/connect/facebook', socialController.connectFacebook);
router.get('/callback/facebook', socialController.facebookCallback);

// OAuth Routes - Twitter
router.get('/connect/twitter', socialController.connectTwitter);
router.get('/callback/twitter', socialController.twitterCallback);

// OAuth Routes - LinkedIn
router.get('/connect/linkedin', socialController.connectLinkedIn);
router.get('/callback/linkedin', socialController.linkedInCallback);

// OAuth Routes - TikTok
router.get('/connect/tiktok', socialController.connectTikTok);
router.get('/callback/tiktok', socialController.tikTokCallback);

// OAuth Routes - YouTube
router.get('/connect/youtube', socialController.connectYouTube);
router.get('/callback/youtube', socialController.youtubeCallback);

export default router;
