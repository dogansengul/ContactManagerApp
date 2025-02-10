import express from 'express';
import { validateToken } from '../middleware/validateTokenHandler.js';
import {
    registerUser,
    loginUser,
    currentUser,
} from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/current', validateToken, currentUser);

export default router;
