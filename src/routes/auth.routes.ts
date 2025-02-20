import express from "express"

import { AuthController } from "../controllers/auth.controller";
import { validateRequest } from "../middlewares/validate.middleware";
import { userSchema } from "../utils/validators/auth.validator";

const router = express.Router();

/**
 * @route   GET /api/auth/
 * @desc    login user by username and password
 * @access  Public
 */
router.post("/login", validateRequest(userSchema) , AuthController.login);

export const authRouter = router;   