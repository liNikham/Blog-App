const express = require('express');
const router = express.Router();
const {updateUser} = require('../controllers/user.controller.js');
const {verifyUser} = require('../utils/verifyUser.js');
router.put('/update/:userId',verifyUser,updateUser);


module.exports=router;