import express from "express"

import { AuthController } from "../controllers/auth.controller";
import { validateRequest } from "../middlewares/validate.middleware";
import { userSchema } from "../utils/validators/auth.validator";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Auth:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: The user's username
 *         password:
 *           type: string
 *           description: The user's password
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     description: Log in with username and password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Invalid username or password
 */
router.post("/login", validateRequest(userSchema), AuthController.login);

export const authRouter = router;   