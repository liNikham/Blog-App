 const mongoose = require('mongoose');
 const postSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
        unique:true,
    },
    content:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        default:'https://www.google.com/imgres?q=blog%20post%20images&imgurl=http%3A%2F%2Fwww.salesforce.com%2Fcontent%2Fdam%2Fblogs%2Fca%2FBlog%2520Posts%2Fanatomy-of-a-blog-post-deconstructed-open-graph.jpg&imgrefurl=http%3A%2F%2Fanswers.salesforce.com%2Fca%2Fblog%2F2016%2F08%2Fanatomy-of-a-perfect-blog-post.html&docid=2fDPHQ3hKu8w4M&tbnid=dxDPDUzkN3zChM&vet=12ahUKEwiNjcGWvoiIAxXMxjgGHUUWOhwQM3oECHQQAA..i&w=1200&h=627&hcb=2&ved=2ahUKEwiNjcGWvoiIAxXMxjgGHUUWOhwQM3oECHQQAA'
    },
    category:{
        type:String,
        default:'uncategorized'
    },
    slug:{
       type:String,
       required:true,
       unique:true
    }

 },{timestamps:true})


 const Post = mongoose.model('Post',postSchema);
 module.exports=Post;
