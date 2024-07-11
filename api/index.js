const express = require('express')
const app = express();
const mongoose = require('mongoose')
const dotenv= require('dotenv')
dotenv.config();
mongoose.connect(process.env.DB_Connection)
.then(()=> console.log('MongoDb connected'))
.catch((err)=>console.log(err))
app.listen(3000,()=>{
    console.log('Server is running on port 3000!');
})