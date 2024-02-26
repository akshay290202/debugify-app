import express from 'express';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import userRoute from './routes/user.route.js';
import authRoute from './routes/auth.route.js';
import postRoute from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';


const app = express();
app.use(express.json());
app.use(cookieParser());
dotenv.config({ path: "./../config.env" });
const __dirname = path.resolve();

const mongourl = process.env.MONGODB;

mongoose.connect(mongourl).then(()=>{
    console.log("Mongodb connected");
}).catch((e) =>{
    console.log(e);
});


app.listen(3000,()=>{
    console.log("server is running on port no. 3000");
})


app.use('/api/user',userRoute);
app.use('/api/auth',authRoute);
app.use('/api/post',postRoute);
app.use('/api/comment',commentRoutes);

app.use(express.static(path.join(__dirname,'/client/dist')));

app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname,'client','dist','index.html'));
});


app.use((err, req, res , next) =>{
    const StatusCode = 500 || err.StatusCode;
    const message = err.message || 'Internal Server Error';
    res.status(StatusCode).json({
        success : false,
        StatusCode ,
        message,
    });
});
