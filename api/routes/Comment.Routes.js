const express = require('express');
const router = express.Router();
const {createComment}= require('../controllers/comment.controller');
const {verifyUser}= require('../utils/verifyUser');

router.post('/create',verifyUser,createComment);
module.exports = router;
