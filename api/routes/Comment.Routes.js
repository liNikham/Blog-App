const express = require('express');
const router = express.Router();
const {createComment,getPostComments,likeComment,editComment}= require('../controllers/comment.controller');
const {verifyUser}= require('../utils/verifyUser');
const { verify } = require('jsonwebtoken');

router.post('/create',verifyUser,createComment);
router.get('/getPostComments/:postId',getPostComments);
router.put('/likeComment/:commentId',verifyUser,likeComment);
router.put('/editComment/:commentId',verifyUser,editComment);
module.exports = router;
