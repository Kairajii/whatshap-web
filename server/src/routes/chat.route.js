import express from 'express'
import { accessChat,fetchChats } from '../controllers/chat.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post("/",protect, accessChat);
router.get("/",protect, fetchChats);


export default router