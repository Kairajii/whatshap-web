import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import userRoutes from './src/routes/user.route.js'
import chatRoutes from './src/routes/chat.route.js';
import messageRoutes from './src/routes/message.route.js'
import cors from 'cors'
dotenv.config();

const app = express();
app.use(express.json());

app.use(cors())
const PORT = 5000;
connectDB();
app.use('/v1/user',userRoutes)
app.use('/v1/chat',chatRoutes)
app.use('/v1/message',messageRoutes)
app.get('/',(req,res)=>{
    res.send("Hello World")
})

app.listen(PORT,()=>console.log(`Server is runnning on the port: ${PORT}`))
