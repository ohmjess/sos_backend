import express from "express";
import { TypeController } from "../controllers/type.controller";
import { authenticateUser } from "../middlewares/auth.middleware";


const router = express.Router();


/**
 * @route   GET /api/types/:id
 * @desc    Get types by ID
 * @access  Public
 */
router.get("/", authenticateUser, TypeController.getTypes);

/**
 * @route   GET /api/types/:id
 * @desc    Get types by ID
 * @access  Public
 */
router.get("/:id", TypeController.getTypeById);

// /**
//  * @route   POST /api/types
//  * @desc    Create a new types
//  * @access  Public
//  */
// router.post("/", createtypes);

export const typeRouter = router;

