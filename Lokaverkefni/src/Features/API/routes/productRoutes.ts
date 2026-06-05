import express from "express";
import { errorHandler } from "../middleware/APIErrorHandler";
import { getAllProducts } from "../controllers/allProducts";
import { getProductById } from "../controllers/oneProduct";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);


router.use(errorHandler);

export default router;