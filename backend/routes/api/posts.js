import express from 'express'

const router = express.Router();

import Auth from "../../middleware/auth.js"
import {getPosts, createPost, deletePost, updatePost, likePost} from '../../controllers/postsController.js'

router.get('/', getPosts)
router.post('/',Auth, createPost)
router.route('/:id').patch(Auth, updatePost).delete(Auth, deletePost)
router.patch('/:id/likePost', Auth, likePost)
export default router;