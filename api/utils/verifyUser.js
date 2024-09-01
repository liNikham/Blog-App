const jwt = require('jsonwebtoken')
const {errorHandler} = require('../utils/error');
exports.verifyUser = (req,res,next)=>{
    const token = req.cookies.token;
    console.log(token);
    if(!token){
        return next(errorHandler(401,'Unauthorized'));
    }
    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err){
            return next(errorHandler(401,'Unauthorized'));
        }
        req.user = user;
        next();
    })
}