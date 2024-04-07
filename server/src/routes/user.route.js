import express from 'express'
import { allUsers, loginUser, registerUser } from '../controllers/user.controller.js';
import { protect } from '../middleware/auth.middleware.js';
const router = express.Router();

router.post("/",registerUser);
router.post('/login', loginUser);
router.get('/',protect,allUsers)
export default router;