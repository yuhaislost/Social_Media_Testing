import express from 'express';
import { signUp, login } from '../../controllers/v1/authController.js';

const router = express.Router();

router.route('/').get()

export default router;