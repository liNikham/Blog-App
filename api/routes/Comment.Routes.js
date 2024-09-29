const express = require('express');
const router = express.Router();
const {createComment,getPostComments}= require('../controllers/comment.controller');
const {verifyUser}= require('../utils/verifyUser');

router.post('/create',verifyUser,createComment);
router.get('/getPostComments/:postId',getPostComments);
module.exports = router;
