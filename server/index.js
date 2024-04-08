import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import userRoutes from './src/routes/user.route.js'

import { Server } from "socket.io";
import { createServer } from "http";
import User from './src/models/user.model.js';
import cookieParser from "cookie-parser";
import cors from 'cors'
dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST","DELETE","PUT"],
    credentials: true,
  },
});
app.use(express.json());


app.use(cors())
const PORT = 5000;
connectDB();
app.use('/v1/user',userRoutes)


app.get('/',(req,res)=>{
    res.send("Hello World")
})


const messages = [];
const users = {};

io.on('connection', (socket) => {
    console.log('A user connected');
  
    socket.on('join', async (userId) => {
      const user = await User.findById(userId);
      if (user) {
        users[userId] = socket.id;
        socket.join(userId.toString());
      }
    });
  
    socket.on('message', async (data) => {
      const { from, to, message } = data;
  
      io.to(from).to(to).emit('message', { from, message });
    });
  
    socket.on('disconnect', () => {
      for (let userId in users) {
        if (users[userId] === socket.id) {
          delete users[userId];
        }
      }
    });
  });
  

  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
