const express = require('express')
const app = express();
const mongoose = require('mongoose')
const dotenv= require('dotenv')
const cookieParser = require('cookie-parser');
dotenv.config();
app.use(express.json());
app.use(cookieParser());






const userRoutes= require('./routes/User.Routes');
const authRoutes = require('./routes/Auth.Routes')
const postRoutes = require('./routes/Post.Routes');
const commentRoutes = require('./routes/Comment.Routes');
mongoose.connect(process.env.DB_Connection)
.then(()=> console.log('MongoDb connected'))
.catch((err)=>console.log(err))
app.use('/api/user',userRoutes)
app.use('/api/auth',authRoutes);
app.use('/api/post',postRoutes);
app.use('/api/comment',commentRoutes);
app.listen(3000,()=>{
    console.log('Server is running on port 3000!');
})

app.use((err,req,res,next)=>{
    const statusCode= err.statusCode || 500;
    const message = err.message || ' Internal Server Error ';
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})
