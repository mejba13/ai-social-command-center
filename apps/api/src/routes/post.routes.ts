import { Router } from 'express';
import { PostController } from '../controllers/post.controller';

const router = Router();
const postController = new PostController();

// Get all posts for workspace
router.get('/', postController.getPosts);

// Get single post
router.get('/:id', postController.getPost);

// Create new post
router.post('/', postController.createPost);

// Update post
router.put('/:id', postController.updatePost);

// Delete post
router.delete('/:id', postController.deletePost);

// Publish post immediately
router.post('/:id/publish', postController.publishPost);

// Schedule post
router.post('/:id/schedule', postController.schedulePost);

export default router;
