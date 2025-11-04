import Queue from 'bull';
import { config } from '../config';

/**
 * Post Publishing Queue
 * Handles scheduled and immediate post publishing
 */
export const postQueue = new Queue('post-publishing', config.redis.url, {
  defaultJobOptions: {
    removeOnComplete: 100, // Keep last 100 completed jobs
    removeOnFail: 500, // Keep last 500 failed jobs
    attempts: 3, // Retry failed jobs up to 3 times
    backoff: {
      type: 'exponential',
      delay: 2000, // Start with 2 second delay
    },
  },
});

// Log queue events
postQueue.on('completed', (job) => {
  console.log(`✅ Job ${job.id} completed successfully`);
});

postQueue.on('failed', (job, err) => {
  console.error(`❌ Job ${job.id} failed:`, err.message);
});

postQueue.on('stalled', (job) => {
  console.warn(`⚠️  Job ${job.id} stalled`);
});

console.log('📬 Post publishing queue initialized');
