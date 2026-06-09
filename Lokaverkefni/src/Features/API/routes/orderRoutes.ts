import express from "express";
import { errorHandler } from "../middleware/APIErrorHandler";
import { createOrder } from "../controllers/orderCTRL/orderController";

const router = express.Router();

router.post("/", createOrder);

router.use(errorHandler);

export default router;