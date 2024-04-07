import express from 'express'
import { protect } from '../middleware/auth.middleware.js';
import { allMessages, sendMessage } from '../controllers/message.contoller.js';

const router = express.Router();

router.get("/:chatId",protect, allMessages);
router.post("/",protect, sendMessage);
export default router