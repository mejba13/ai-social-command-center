/**
 * PostPublisher Service
 * Handles publishing posts to various social media platforms
 */

import { config } from '../config';
import { AppError } from '../middleware/error-handler';

export class PostPublisher {
  /**
   * Publish to Facebook
   */
  async publishToFacebook(
    content: string,
    accessToken: string,
    pageId?: string
  ): Promise<string> {
    try {
      const url = pageId
        ? `https://graph.facebook.com/v18.0/${pageId}/feed`
        : 'https://graph.facebook.com/v18.0/me/feed';

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: content,
          access_token: accessToken,
        }),
      });

      if (!response.ok) {
        throw new Error('Facebook publishing failed');
      }

      const data = await response.json();
      return data.id; // Return post ID
    } catch (error) {
      console.error('Facebook publish error:', error);
      throw new AppError('Failed to publish to Facebook', 500);
    }
  }

  /**
   * Publish to Instagram
   */
  async publishToInstagram(
    content: string,
    imageUrl: string,
    accessToken: string,
    instagramAccountId: string
  ): Promise<string> {
    try {
      // Step 1: Create media container
      const containerResponse = await fetch(
        `https://graph.facebook.com/v18.0/${instagramAccountId}/media`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            image_url: imageUrl,
            caption: content,
            access_token: accessToken,
          }),
        }
      );

      const containerData = await containerResponse.json();
      const creationId = containerData.id;

      // Step 2: Publish the container
      const publishResponse = await fetch(
        `https://graph.facebook.com/v18.0/${instagramAccountId}/media_publish`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            creation_id: creationId,
            access_token: accessToken,
          }),
        }
      );

      const publishData = await publishResponse.json();
      return publishData.id;
    } catch (error) {
      console.error('Instagram publish error:', error);
      throw new AppError('Failed to publish to Instagram', 500);
    }
  }

  /**
   * Publish to Twitter
   */
  async publishToTwitter(
    content: string,
    accessToken: string
  ): Promise<string> {
    try {
      const response = await fetch('https://api.twitter.com/2/tweets', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: content }),
      });

      if (!response.ok) {
        throw new Error('Twitter publishing failed');
      }

      const data = await response.json();
      return data.data.id;
    } catch (error) {
      console.error('Twitter publish error:', error);
      throw new AppError('Failed to publish to Twitter', 500);
    }
  }

  /**
   * Publish to LinkedIn
   */
  async publishToLinkedIn(
    content: string,
    accessToken: string,
    personUrn: string
  ): Promise<string> {
    try {
      const response = await fetch(
        'https://api.linkedin.com/v2/ugcPosts',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            author: personUrn,
            lifecycleState: 'PUBLISHED',
            specificContent: {
              'com.linkedin.ugc.ShareContent': {
                shareCommentary: {
                  text: content,
                },
                shareMediaCategory: 'NONE',
              },
            },
            visibility: {
              'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
            },
          }),
        }
      );

      const data = await response.json();
      return data.id;
    } catch (error) {
      console.error('LinkedIn publish error:', error);
      throw new AppError('Failed to publish to LinkedIn', 500);
    }
  }

  /**
   * Main publish method that routes to the appropriate platform
   */
  async publish(
    platform: string,
    content: string,
    accessToken: string,
    additionalData?: any
  ): Promise<string> {
    switch (platform.toLowerCase()) {
      case 'facebook':
        return await this.publishToFacebook(
          content,
          accessToken,
          additionalData?.pageId
        );

      case 'instagram':
        return await this.publishToInstagram(
          content,
          additionalData?.imageUrl,
          accessToken,
          additionalData?.instagramAccountId
        );

      case 'twitter':
        return await this.publishToTwitter(content, accessToken);

      case 'linkedin':
        return await this.publishToLinkedIn(
          content,
          accessToken,
          additionalData?.personUrn
        );

      default:
        throw new AppError(`Unsupported platform: ${platform}`, 400);
    }
  }
}
