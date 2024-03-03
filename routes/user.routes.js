import express from 'express';
import { getUser, signIn, signUp } from '../controllers/user.controller.js';
import authCheck from '../middleware/authCheck.js';

const router = express.Router();

router.post('/signin', signIn);
router.post('/signup', signUp);
router.get('/getuser',authCheck,getUser)

export default router;
