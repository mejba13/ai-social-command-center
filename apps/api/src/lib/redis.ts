import { createClient } from 'redis';
import { config } from '../config';

const redisClient = createClient({
  url: config.redis.url,
});

redisClient.on('error', (err) => {
  console.error('❌ Redis Client Error:', err);
});

redisClient.on('connect', () => {
  console.log('✅ Redis connected successfully');
});

// Connect to Redis
(async () => {
  try {
    await redisClient.connect();
  } catch (error) {
    console.error('Failed to connect to Redis:', error);
  }
})();

export { redisClient };

// Helper functions for common Redis operations
export const redis = {
  /**
   * Set a key-value pair with optional expiry (in seconds)
   */
  set: async (key: string, value: string | number | object, expirySeconds?: number) => {
    const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value);

    if (expirySeconds) {
      await redisClient.setEx(key, expirySeconds, stringValue);
    } else {
      await redisClient.set(key, stringValue);
    }
  },

  /**
   * Get a value by key
   */
  get: async (key: string) => {
    const value = await redisClient.get(key);
    return value;
  },

  /**
   * Get and parse JSON value
   */
  getJSON: async <T>(key: string): Promise<T | null> => {
    const value = await redisClient.get(key);
    if (!value) return null;

    try {
      return JSON.parse(value) as T;
    } catch {
      return value as T;
    }
  },

  /**
   * Delete a key
   */
  del: async (key: string) => {
    await redisClient.del(key);
  },

  /**
   * Check if key exists
   */
  exists: async (key: string): Promise<boolean> => {
    const result = await redisClient.exists(key);
    return result === 1;
  },

  /**
   * Set expiry on a key (in seconds)
   */
  expire: async (key: string, seconds: number) => {
    await redisClient.expire(key, seconds);
  },

  /**
   * Increment a numeric value
   */
  incr: async (key: string) => {
    return await redisClient.incr(key);
  },

  /**
   * Decrement a numeric value
   */
  decr: async (key: string) => {
    return await redisClient.decr(key);
  },
};
