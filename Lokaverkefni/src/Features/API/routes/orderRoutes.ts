import express from "express";
import { errorHandler } from "../middleware/APIErrorHandler";
import { createOrder, getOrdersByUserId } from "../controllers/orderCTRL/orderController";
import { validate } from "../middleware/validate";
import { OrderSchema } from "@/Features/API/schemas/OrderSchema";

const router = express.Router();

router.post("/", validate(OrderSchema), createOrder);
router.get("/:userId", getOrdersByUserId);

router.use(errorHandler);

export default router;