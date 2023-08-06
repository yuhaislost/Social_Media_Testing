import express from 'express';
import userRoutes from './v1/userRoutes.js';

const router = express.Router();

router.use('/user', userRoutes);
router.use('/', (req,res)=>{
    res.status(200).json({
        name: "Hellow world!",
    });
})


export default router;