const Mongoose = require('mongoose');
const commentSchema = new Mongoose.Schema({
    content:{
        type:String,
        required:true,
    },
    postId:{
        type:String,
        required:true,
    },
    userId:{
        type:String,
        required:true,
    },
    likes:{
        type:Array,
        default:[],
    },
    numberOfLikes:{
        type:Number,
        default:0,
    },
    
}, {timestamps:true});

const Comment = Mongoose.model('Comment',commentSchema);
module.exports = Comment;
