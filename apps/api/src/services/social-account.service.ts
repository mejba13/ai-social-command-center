import { config } from '../config';
import { AppError } from '../middleware/error-handler';

// TODO: Replace with actual Prisma client when ready
// import { prisma } from '../lib/prisma';

interface SocialAccount {
  id: string;
  platform: string;
  username: string;
  followers?: string;
  status: 'connected' | 'error';
  lastSync: string;
}

export class SocialAccountService {
  // Get all connected accounts for a workspace
  async getConnectedAccounts(workspaceId: string): Promise<SocialAccount[]> {
    // TODO: Implement with Prisma
    // const accounts = await prisma.socialAccount.findMany({
    //   where: { workspaceId },
    //   select: {
    //     id: true,
    //     platform: true,
    //     username: true,
    //     isActive: true,
    //     updatedAt: true,
    //   },
    // });

    // Mock data for now
    return [
      {
        id: '1',
        platform: 'Facebook',
        username: '@brandname',
        followers: '12.5K',
        status: 'connected',
        lastSync: '2 minutes ago',
      },
    ];
  }

  // Disconnect/delete account
  async disconnectAccount(accountId: string): Promise<void> {
    // TODO: Implement with Prisma
    // await prisma.socialAccount.delete({
    //   where: { id: accountId },
    // });

    console.log(`Disconnected account: ${accountId}`);
  }

  // Facebook OAuth
  getFacebookAuthUrl(): string {
    const redirectUri = `${config.cors.origin}/api/v1/social/callback/facebook`;
    const scope = 'pages_show_list,pages_read_engagement,pages_manage_posts,instagram_basic,instagram_content_publish';

    return `https://www.facebook.com/v18.0/dialog/oauth?client_id=${config.socialMedia.facebook.appId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&response_type=code`;
  }

  async handleFacebookCallback(code: string, workspaceId: string): Promise<void> {
    // Exchange code for access token
    const redirectUri = `${config.cors.origin}/api/v1/social/callback/facebook`;

    try {
      const tokenResponse = await fetch(
        `https://graph.facebook.com/v18.0/oauth/access_token?client_id=${config.socialMedia.facebook.appId}&client_secret=${config.socialMedia.facebook.appSecret}&code=${code}&redirect_uri=${encodeURIComponent(redirectUri)}`
      );

      if (!tokenResponse.ok) {
        throw new AppError('Failed to exchange Facebook code for token', 400);
      }

      const tokenData = await tokenResponse.json();
      const { access_token } = tokenData;

      // Get user info
      const userResponse = await fetch(
        `https://graph.facebook.com/me?fields=id,name&access_token=${access_token}`
      );
      const userData = await userResponse.json();

      // TODO: Save to database
      // await prisma.socialAccount.create({
      //   data: {
      //     workspaceId,
      //     platform: 'FACEBOOK',
      //     platformUserId: userData.id,
      //     username: userData.name,
      //     accessToken: access_token,
      //   },
      // });

      console.log('Facebook account connected:', userData);
    } catch (error) {
      console.error('Facebook OAuth error:', error);
      throw new AppError('Failed to connect Facebook account', 500);
    }
  }

  // Twitter OAuth
  getTwitterAuthUrl(): string {
    const redirectUri = `${config.cors.origin}/api/v1/social/callback/twitter`;
    const scope = 'tweet.read tweet.write users.read offline.access';

    return `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${config.socialMedia.twitter.apiKey}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&state=random_state&code_challenge=challenge&code_challenge_method=plain`;
  }

  async handleTwitterCallback(code: string, workspaceId: string): Promise<void> {
    // TODO: Implement Twitter OAuth 2.0 flow
    console.log('Twitter callback:', { code, workspaceId });

    // Exchange code for access token
    // Get user info
    // Save to database
  }

  // LinkedIn OAuth
  getLinkedInAuthUrl(): string {
    const redirectUri = `${config.cors.origin}/api/v1/social/callback/linkedin`;
    const scope = 'r_liteprofile r_emailaddress w_member_social';

    return `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${config.socialMedia.linkedin.clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;
  }

  async handleLinkedInCallback(code: string, workspaceId: string): Promise<void> {
    const redirectUri = `${config.cors.origin}/api/v1/social/callback/linkedin`;

    try {
      // Exchange code for access token
      const tokenResponse = await fetch(
        'https://www.linkedin.com/oauth/v2/accessToken',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            redirect_uri: redirectUri,
            client_id: config.socialMedia.linkedin.clientId,
            client_secret: config.socialMedia.linkedin.clientSecret,
          }),
        }
      );

      const tokenData = await tokenResponse.json();
      const { access_token } = tokenData;

      // Get user info
      const userResponse = await fetch('https://api.linkedin.com/v2/me', {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      const userData = await userResponse.json();

      // TODO: Save to database
      console.log('LinkedIn account connected:', userData);
    } catch (error) {
      console.error('LinkedIn OAuth error:', error);
      throw new AppError('Failed to connect LinkedIn account', 500);
    }
  }

  // TikTok OAuth
  getTikTokAuthUrl(): string {
    const redirectUri = `${config.cors.origin}/api/v1/social/callback/tiktok`;
    const scope = 'user.info.basic,video.list';

    return `https://www.tiktok.com/auth/authorize?client_key=${config.socialMedia.twitter.apiKey}&scope=${scope}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}`;
  }

  async handleTikTokCallback(code: string, workspaceId: string): Promise<void> {
    // TODO: Implement TikTok OAuth flow
    console.log('TikTok callback:', { code, workspaceId });
  }

  // YouTube OAuth (via Google)
  getYouTubeAuthUrl(): string {
    const redirectUri = `${config.cors.origin}/api/v1/social/callback/youtube`;
    const scope = 'https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.upload';

    return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${config.oauth.google.clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scope)}&access_type=offline`;
  }

  async handleYouTubeCallback(code: string, workspaceId: string): Promise<void> {
    const redirectUri = `${config.cors.origin}/api/v1/social/callback/youtube`;

    try {
      // Exchange code for access token
      const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          code,
          client_id: config.oauth.google.clientId,
          client_secret: config.oauth.google.clientSecret,
          redirect_uri: redirectUri,
          grant_type: 'authorization_code',
        }),
      });

      const tokenData = await tokenResponse.json();
      const { access_token } = tokenData;

      // Get channel info
      const channelResponse = await fetch(
        'https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true',
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );
      const channelData = await channelResponse.json();

      // TODO: Save to database
      console.log('YouTube account connected:', channelData);
    } catch (error) {
      console.error('YouTube OAuth error:', error);
      throw new AppError('Failed to connect YouTube account', 500);
    }
  }
}
