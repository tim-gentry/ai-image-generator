import express from 'express';
import { generateImage } from '../Controllers/image.controller';

const router = express.Router();

router.post('/', generateImage);

export default router;