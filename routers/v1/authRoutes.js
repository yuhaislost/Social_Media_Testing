import express from 'express';
import { signUp, login } from '../../controllers/v1/authController';

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);
router.post('refresh', );
router.get('/logout', );


export default router;