import express from "express";
import { ProjectController } from "../controllers/project.controller";
import { authenticateUser } from "../middlewares/auth.middleware";

const router = express.Router();

/**
 * @route   GET /api/projects
 * @desc    Get all projects
 * @access  Public
 */
router.get("/", ProjectController.getProjects);

/**
 * @route   GET /api/projects/:id
 * @desc    Get project by id
 * @access  Public
 */
router.get("/:id" , ProjectController.getProjects);

/**
 * @route   GET /api/projects/:Userid
 * @desc    Get project by Userid
 * @access  Public
 */
router.get("/user/:id" , ProjectController.getRelativeProject);

export const projectRouter = router;