import express from "express";
import { errorHandler } from "../middleware/APIErrorHandler";
import { getUserById, inputUserInDB } from "../controllers/userCTRL/userController";
import { validate } from "../middleware/validate";
import { UserPostSchema } from "../schemas/UserSchema";

const router = express.Router();

router.post("/", validate(UserPostSchema), inputUserInDB);
router.get("/:userId", getUserById);

router.use(errorHandler);

export default router;