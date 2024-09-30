const express = require('express');
const router = express.Router();
const {createComment,getPostComments,likeComment}= require('../controllers/comment.controller');
const {verifyUser}= require('../utils/verifyUser');

router.post('/create',verifyUser,createComment);
router.get('/getPostComments/:postId',getPostComments);
router.put('/likeComment/:commentId',verifyUser,likeComment);
module.exports = router;
