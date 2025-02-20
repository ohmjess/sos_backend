import express from "express";
import { UserController } from "../controllers/user.controller";
import { authenticateUser } from "../middlewares/auth.middleware";


const router = express.Router();


/**
 * @route   GET /api/users/:id
 * @desc    Get user by ID
 * @access  Public
 */
router.get("/", authenticateUser, UserController.getUsers);

/**
 * @route   GET /api/users/:id
 * @desc    Get user by ID
 * @access  Public
 */
router.get("/:id", UserController.getUserById);

// /**
//  * @route   POST /api/users
//  * @desc    Create a new user
//  * @access  Public
//  */
// router.post("/", createUser);

export const userRouter = router;

