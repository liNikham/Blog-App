const express = require('express');
const router = express.Router();
const {createPost}= require('../controllers/post.controller');
const {verifyUser}= require('../utils/verifyUser');
router.post('/create',verifyUser,createPost);







module.exports = router;