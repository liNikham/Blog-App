const User = require('../models/User.model')
const bcryptjs = require('bcryptjs');
exports.signup= async(req,res,next)=>{
  const {username,email,password}= req.body;
  if(!username || !email || !password || username==='' || email === '' , password===''){
     next(errorHandler(400,'All fields are required'));
  }
  const hashedPassword = bcryptjs.hashSync(password,10);
  const newUser = new User({
    username,email,password:hashedPassword,
  });
  try{
      await newUser.save();
      return res.status(200).json({message:"SignUp Successfull"});
  }catch(err){
    next(err);
  }    
}