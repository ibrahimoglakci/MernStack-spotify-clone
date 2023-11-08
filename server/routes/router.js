// routes/router.js
import express from 'express';
import authRouter from './api/v1/auth.js';
import songRouter from './api/v1/songs.js';

const router = express.Router();

router.use("/api/v1", authRouter)
router.use("/api/v1", songRouter)


export default router;
