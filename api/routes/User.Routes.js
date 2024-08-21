const express = require('express');
const router = express.Router();
const {updateUser} = require('../controllers/user.controller.js');
const {verifyUser} = require('../utils/verifyUser.js');
const {deleteUser} = require('../controllers/user.controller.js');
router.put('/update/:userId',verifyUser,updateUser);
router.delete('/delete/:userId',verifyUser,deleteUser);

module.exports=router;