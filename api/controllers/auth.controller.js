const User = require('../models/User.model')
const bcryptjs = require('bcryptjs');
const { errorHandler } = require('../utils/error');
const jwt= require('jsonwebtoken')
exports.signup= async(req,res,next)=>{
  const {username,email,password}= req.body;
  if(!username || !email || !password || username==='' || email === '' , password===''){
    return next(errorHandler(400,'All fields are required'));
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

exports.signin = async( req,res,next)=>{
    const {email,password}= req.body;
    if(!email || !password || email==='' || password===''){
             return next(errorHandler(400,'All fields are required'));
    }
    try{
        const validUser = await User.findOne({email})
        if(!validUser){
           return  next(errorHandler(404,'Credentials Invalid'));
        }
        const validPassword = bcryptjs.compareSync(password,validUser.password);
        if(!validPassword){
           return next(errorHandler(404,'Credentials Invalid'))
        }
        const { password:pass,...rest} = validUser._doc;
     const token = jwt.sign({
        id:validUser._id,
        
     }, process.env.JWT_SECRET);
     res.status(200).cookie('token',token,{
        httpOnly:true
     }).json(rest)
    }catch(error){
            next(error);
    }
}