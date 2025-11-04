import { PostPublisher } from './post-publisher.service';
import { postQueue } from '../lib/queue';
import { AppError } from '../middleware/error-handler';

// TODO: Replace with Prisma client
// import { prisma } from '../lib/prisma';

interface CreatePostData {
  content: string;
  platforms: string[];
  scheduledAt?: Date;
  authorId: string;
  workspaceId: string;
}

export class PostService {
  private publisher: PostPublisher;

  constructor() {
    this.publisher = new PostPublisher();
  }

  async getPosts(
    workspaceId: string,
    status?: string,
    limit: number = 20,
    offset: number = 0
  ) {
    // TODO: Implement with Prisma
    // const where: any = { workspaceId };
    // if (status) where.status = status.toUpperCase();

    // const posts = await prisma.post.findMany({
    //   where,
    //   take: limit,
    //   skip: offset,
    //   orderBy: { createdAt: 'desc' },
    // });

    // Mock data
    return [
      {
        id: '1',
        content: 'Sample post',
        status: 'DRAFT',
        createdAt: new Date(),
      },
    ];
  }

  async getPostById(postId: string) {
    // TODO: Implement with Prisma
    // const post = await prisma.post.findUnique({
    //   where: { id: postId },
    // });

    return {
      id: postId,
      content: 'Sample post',
      status: 'DRAFT',
    };
  }

  async createPost(data: CreatePostData) {
    // TODO: Implement with Prisma
    // const post = await prisma.post.create({
    //   data: {
    //     content: data.content,
    //     workspaceId: data.workspaceId,
    //     authorId: data.authorId,
    //     scheduledAt: data.scheduledAt,
    //     status: data.scheduledAt ? 'SCHEDULED' : 'DRAFT',
    //   },
    // });

    // Create post platform entries
    // for (const platform of data.platforms) {
    //   await prisma.postPlatform.create({
    //     data: {
    //       postId: post.id,
    //       socialAccountId: platform, // Should be actual account ID
    //       status: 'DRAFT',
    //     },
    //   });
    // }

    // If scheduled, add to queue
    if (data.scheduledAt) {
      const delay = data.scheduledAt.getTime() - Date.now();
      await postQueue.add(
        'publish-post',
        { postId: 'mock-id', platforms: data.platforms },
        { delay: delay > 0 ? delay : 0 }
      );
    }

    return {
      id: 'mock-id',
      content: data.content,
      status: data.scheduledAt ? 'SCHEDULED' : 'DRAFT',
    };
  }

  async updatePost(postId: string, data: any) {
    // TODO: Implement with Prisma
    // const post = await prisma.post.update({
    //   where: { id: postId },
    //   data,
    // });

    return {
      id: postId,
      ...data,
    };
  }

  async deletePost(postId: string) {
    // TODO: Implement with Prisma
    // await prisma.post.delete({
    //   where: { id: postId },
    // });

    console.log(`Deleted post: ${postId}`);
  }

  async publishPost(postId: string) {
    // TODO: Get post from database
    // const post = await prisma.post.findUnique({
    //   where: { id: postId },
    //   include: { platforms: true },
    // });

    // Add to queue for immediate processing
    await postQueue.add('publish-post', {
      postId,
      platforms: ['facebook', 'instagram'],
    });

    // Update post status
    // await prisma.post.update({
    //   where: { id: postId },
    //   data: { status: 'PUBLISHING' },
    // });

    console.log(`Publishing post: ${postId}`);
  }

  async schedulePost(postId: string, scheduledAt: Date) {
    const delay = scheduledAt.getTime() - Date.now();

    if (delay < 0) {
      throw new AppError('Scheduled time must be in the future', 400);
    }

    // Add to queue with delay
    await postQueue.add(
      'publish-post',
      {
        postId,
        platforms: ['facebook', 'instagram'],
      },
      { delay }
    );

    // Update post status
    // await prisma.post.update({
    //   where: { id: postId },
    //   data: {
    //     status: 'SCHEDULED',
    //     scheduledAt,
    //   },
    // });

    console.log(`Scheduled post ${postId} for ${scheduledAt}`);
  }
}
