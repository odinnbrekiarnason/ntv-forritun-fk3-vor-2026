import express from "express";
import { errorHandler } from "../middleware/APIErrorHandler";

const router = express.Router();

router.get("/profiles/:userId", )

router.use(errorHandler);

export default router;