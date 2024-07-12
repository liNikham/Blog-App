const User = require('../models/User.model')
const bcryptjs = require('bcryptjs');
exports.signup= async(req,res)=>{
  const {username,email,password}= req.body;
  if(!username || !email || !password || username==='' || email === '' , password===''){
    return res.status(400).json({message:'All fields are required'});
  }
  const hashedPassword = bcryptjs.hashSync(password,10);
  const newUser = new User({
    username,email,password:hashedPassword,
  });
  try{
      await newUser.save();
      return res.status(200).json({message:"SignUp Successfull"});
  }catch(err){
      return res.status(500).json({message:err.message})
  }    
}