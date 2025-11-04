/**
 * Post Publisher Worker
 * Processes queued posts and publishes them to social media platforms
 */

import { postQueue } from '../lib/queue';
import { PostPublisher } from '../services/post-publisher.service';

// TODO: Import Prisma client when ready
// import { prisma } from '../lib/prisma';

const publisher = new PostPublisher();

/**
 * Process post publishing job
 */
postQueue.process('publish-post', async (job) => {
  const { postId, platforms } = job.data;

  console.log(`📝 Processing post ${postId} for platforms:`, platforms);

  try {
    // TODO: Get post from database
    // const post = await prisma.post.findUnique({
    //   where: { id: postId },
    //   include: {
    //     platforms: {
    //       include: { socialAccount: true },
    //     },
    //   },
    // });

    // Mock post data for now
    const post = {
      id: postId,
      content: 'Sample post content',
      platforms: platforms || [],
    };

    // Update post status to PUBLISHING
    // await prisma.post.update({
    //   where: { id: postId },
    //   data: { status: 'PUBLISHING' },
    // });

    const results: any[] = [];

    // Publish to each platform
    for (const platform of post.platforms) {
      try {
        // TODO: Get actual access token from social account
        const accessToken = 'mock-token';

        const platformPostId = await publisher.publish(
          platform,
          post.content,
          accessToken
        );

        results.push({
          platform,
          success: true,
          platformPostId,
        });

        // Update platform status
        // await prisma.postPlatform.update({
        //   where: {
        //     postId_socialAccountId: {
        //       postId,
        //       socialAccountId: platform.socialAccountId,
        //     },
        //   },
        //   data: {
        //     status: 'PUBLISHED',
        //     platformPostId,
        //     publishedAt: new Date(),
        //   },
        // });

        console.log(`✅ Published to ${platform}: ${platformPostId}`);
      } catch (error: any) {
        console.error(`❌ Failed to publish to ${platform}:`, error.message);

        results.push({
          platform,
          success: false,
          error: error.message,
        });

        // Update platform status to failed
        // await prisma.postPlatform.update({
        //   where: {
        //     postId_socialAccountId: {
        //       postId,
        //       socialAccountId: platform.socialAccountId,
        //     },
        //   },
        //   data: {
        //     status: 'FAILED',
        //     errorMessage: error.message,
        //     failedAt: new Date(),
        //   },
        // });
      }
    }

    // Determine overall post status
    const allSucceeded = results.every((r) => r.success);
    const allFailed = results.every((r) => !r.success);

    const finalStatus = allSucceeded
      ? 'PUBLISHED'
      : allFailed
      ? 'FAILED'
      : 'PUBLISHED'; // Partial success still counts as published

    // Update final post status
    // await prisma.post.update({
    //   where: { id: postId },
    //   data: {
    //     status: finalStatus,
    //     publishedAt: allSucceeded ? new Date() : undefined,
    //     failedAt: allFailed ? new Date() : undefined,
    //   },
    // });

    console.log(`🎉 Post ${postId} processing complete. Status: ${finalStatus}`);

    return {
      postId,
      status: finalStatus,
      results,
    };
  } catch (error: any) {
    console.error(`❌ Post ${postId} processing failed:`, error);

    // Update post status to failed
    // await prisma.post.update({
    //   where: { id: postId },
    //   data: {
    //     status: 'FAILED',
    //     errorMessage: error.message,
    //     failedAt: new Date(),
    //   },
    // });

    throw error; // Re-throw to trigger retry
  }
});

console.log('🔧 Post publisher worker started');

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  console.log('Shutting down worker...');
  await postQueue.close();
  process.exit(0);
});
