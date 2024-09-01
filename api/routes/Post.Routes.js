const express = require('express');
const router = express.Router();
const {createPost}= require('../controllers/post.controller');
const {getPosts}= require('../controllers/post.controller');
const {verifyUser}= require('../utils/verifyUser');
const {deletePost}= require('../controllers/post.controller');
const {updatePost}= require('../controllers/post.controller');
router.post('/create',verifyUser,createPost);
router.get('/getPosts',getPosts);
router.delete('/deletePost/:postId/:userId',verifyUser,deletePost);
router.put('/updatePost/:postId/:userId',verifyUser,updatePost);






module.exports = router;