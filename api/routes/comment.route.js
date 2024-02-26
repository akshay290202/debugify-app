import express from 'express';
import { verifyToken } from '../utils/verifyUser.js'
import { createComment, deleteComment, editComment, getComments, getPostComments, likeComment } from '../controllers/comment.controller.js';


const router = express.Router();

router.post('/create', verifyToken , createComment);
router.get('/getpostcomments/:postId',getPostComments);
router.get('/getcomments', verifyToken, getComments);
router.put('/likecomment/:commentId' , verifyToken , likeComment);
router.put('/editcomment/:commentId' , verifyToken , editComment);
router.delete('/deletecomment/:commentId' , verifyToken , deleteComment);
export default router;