const errorHandler = require('../utils/error');
const Comment = require('../models/Comment.model');
exports.createComment = async(req,res,next)=>{
    try{
        const { content , postId, userId} = req.body;
        if(userId !==req.user.id){
            return next(errorHandler(403,'You are not allowed to comment on this post'));
        }
        const newComment = new Comment({
            content,
            postId,
            userId,
        });
        await newComment.save();
        return res.status(201).json(newComment);
    } catch(error){
        next(error);
    }
}
exports.getPostComments = async(req,res,next)=>{
    try{
       const comments = await Comment.find({postId:req.params.postId}).sort({createdAt:-1});
         return res.status(200).json(comments);
    }
    catch(error){
        next(error);
    }
}