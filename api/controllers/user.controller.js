const User = require('../models/User.model.js');
const {errorHandler} = require('../utils/error.js');
const bcrypt = require('bcryptjs')
 exports.updateUser = async(req,res,next)=>{
   
      if(req.user.id !== req.params.userId) {
        return next(errorHandler(403," You are not allowed to Update this Uses"));
      }
      
      
      if(req.body.password){
     
        if(req.body.password.length < 6){
             return next(errorHandler(400,"Password must be at least 6 characters"));
        }
        const hashedPassword  = await bcrypt.hash(req.body.password,10);
        req.body.password=hashedPassword;
      }
      if(req.body.username){
        if(req.body.username.length < 6 && req.body.username.length>20){
             return next(errorHandler(400,"Username lenght must be greater than 6 and less than 20"));
        }
        if(req.body.username.includes(" ")){
            return next(errorHandler(400, "Username must not contain spaces"))
        }
        if(req.body.username != req.body.username.toLowerCase()){
            return next(errorHandler(400, "Username must be Lowercase"));
        }
        if(req.body.username.match(/[^a-zA-Z0-9]+$/)){
            return next(errorHandler(400, "Username must contain only letters and numbers"));
        }
      }
        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.userId,{
                 $set : {
                    password:req.body.password,
                    username:req.body.username,
                    email:req.body.email,
                    profilePicture:req.body.profilePicture,
                 }
            },
        {new:true})
        const {password,...others} = updatedUser._doc;
         return res.status(200).json(others);
        }
        catch(error){
            next(error)
        }
      }
 
exports.deleteUser = async(req,res,next)=>{
  
    if(req.user.id !== req.params.userId){
        return next(errorHandler(403,"You are not allowed to delete this user"));
    }
    try{
       await User.findByIdAndDelete(req.params.userId);
       return res.status(200).json("User has been deleted");
    }
    catch(error){
      next(error);
    }
}
exports.signoutUser = (req,res)=>{
  try{

    res.clearCookie('token');
    return res.status(200).json('User has been signed out');
  }
  catch(err){
    next(err);
  }
}

