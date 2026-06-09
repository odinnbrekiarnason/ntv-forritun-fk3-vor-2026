import express from 'express'
import { errorHandler } from '../middleware/APIErrorHandler';
import { inputToCart } from '../controllers/cartCTRL/inputToCart';

const router = express.Router();

router.post("/", inputToCart)

router.use(errorHandler)
export default router;