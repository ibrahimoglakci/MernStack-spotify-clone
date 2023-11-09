// routes/router.js
import express from 'express';
import authRouter from './api/v1/auth.js';
import songRouter from './api/v1/songs.js';
import albumRouter from './api/v1/albums.js';
import artistRouter from './api/v1/artist.js';

const router = express.Router();

router.use("/api/v1", authRouter)
router.use("/api/v1", songRouter)
router.use("/api/v1", albumRouter)
router.use("/api/v1", artistRouter)


export default router;
