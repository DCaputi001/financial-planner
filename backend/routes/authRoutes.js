import express from 'express';
import { registerUser, loginUser, verifyCode } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/verify', verifyCode);

export default router;