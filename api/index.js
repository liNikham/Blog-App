const express = require('express')
const app = express();
const mongoose = require('mongoose')
const dotenv= require('dotenv')
dotenv.config();
app.use(express.json());





const userRoutes= require('./routes/User.Routes');
const authRoutes = require('./routes/Auth.Routes')
mongoose.connect(process.env.DB_Connection)
.then(()=> console.log('MongoDb connected'))
.catch((err)=>console.log(err))
app.use('/api/user',userRoutes)
app.use('/api/auth',authRoutes);
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