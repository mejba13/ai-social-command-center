import { Request, Response, NextFunction } from 'express';
import { SocialAccountService } from '../services/social-account.service';
import { AppError } from '../middleware/error-handler';

export class SocialAccountController {
  private socialService: SocialAccountService;

  constructor() {
    this.socialService = new SocialAccountService();
  }

  // Get all connected accounts
  getAccounts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // TODO: Get workspace ID from authenticated user
      const workspaceId = '1'; // Placeholder

      const accounts = await this.socialService.getConnectedAccounts(workspaceId);

      res.status(200).json({
        status: 'success',
        data: { accounts },
      });
    } catch (error) {
      next(error);
    }
  };

  // Disconnect account
  disconnectAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      await this.socialService.disconnectAccount(id);

      res.status(200).json({
        status: 'success',
        message: 'Account disconnected successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  // Facebook OAuth
  connectFacebook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authUrl = await this.socialService.getFacebookAuthUrl();
      res.redirect(authUrl);
    } catch (error) {
      next(error);
    }
  };

  facebookCallback = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { code } = req.query;

      if (!code || typeof code !== 'string') {
        throw new AppError('Authorization code not provided', 400);
      }

      // TODO: Get workspace ID from session
      const workspaceId = '1';

      await this.socialService.handleFacebookCallback(code, workspaceId);

      // Redirect back to frontend with success
      res.redirect(`${process.env.CORS_ORIGIN}/dashboard/accounts?connected=facebook`);
    } catch (error) {
      next(error);
    }
  };

  // Twitter OAuth
  connectTwitter = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authUrl = await this.socialService.getTwitterAuthUrl();
      res.redirect(authUrl);
    } catch (error) {
      next(error);
    }
  };

  twitterCallback = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { code } = req.query;

      if (!code || typeof code !== 'string') {
        throw new AppError('Authorization code not provided', 400);
      }

      const workspaceId = '1';
      await this.socialService.handleTwitterCallback(code, workspaceId);

      res.redirect(`${process.env.CORS_ORIGIN}/dashboard/accounts?connected=twitter`);
    } catch (error) {
      next(error);
    }
  };

  // LinkedIn OAuth
  connectLinkedIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authUrl = await this.socialService.getLinkedInAuthUrl();
      res.redirect(authUrl);
    } catch (error) {
      next(error);
    }
  };

  linkedInCallback = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { code } = req.query;

      if (!code || typeof code !== 'string') {
        throw new AppError('Authorization code not provided', 400);
      }

      const workspaceId = '1';
      await this.socialService.handleLinkedInCallback(code, workspaceId);

      res.redirect(`${process.env.CORS_ORIGIN}/dashboard/accounts?connected=linkedin`);
    } catch (error) {
      next(error);
    }
  };

  // TikTok OAuth
  connectTikTok = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authUrl = await this.socialService.getTikTokAuthUrl();
      res.redirect(authUrl);
    } catch (error) {
      next(error);
    }
  };

  tikTokCallback = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { code } = req.query;

      if (!code || typeof code !== 'string') {
        throw new AppError('Authorization code not provided', 400);
      }

      const workspaceId = '1';
      await this.socialService.handleTikTokCallback(code, workspaceId);

      res.redirect(`${process.env.CORS_ORIGIN}/dashboard/accounts?connected=tiktok`);
    } catch (error) {
      next(error);
    }
  };

  // YouTube OAuth
  connectYouTube = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authUrl = await this.socialService.getYouTubeAuthUrl();
      res.redirect(authUrl);
    } catch (error) {
      next(error);
    }
  };

  youtubeCallback = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { code } = req.query;

      if (!code || typeof code !== 'string') {
        throw new AppError('Authorization code not provided', 400);
      }

      const workspaceId = '1';
      await this.socialService.handleYouTubeCallback(code, workspaceId);

      res.redirect(`${process.env.CORS_ORIGIN}/dashboard/accounts?connected=youtube`);
    } catch (error) {
      next(error);
    }
  };
}
