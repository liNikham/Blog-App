const express = require('express');
const router = express.Router();
const {updateUser} = require('../controllers/user.controller.js');
const {verifyUser} = require('../utils/verifyUser.js');
const {deleteUser,signoutUser} = require('../controllers/user.controller.js');
router.put('/update/:userId',verifyUser,updateUser);
router.delete('/delete/:userId',verifyUser,deleteUser);
router.post('/signout',signoutUser);
module.exports=router;