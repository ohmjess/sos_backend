import express from "express";
import { DashboardController } from "../controllers/dashboard.controller";


const router = express.Router();

/**
 * @route   GET /api/users/:id
 * @desc    Get user by ID
 * @access  Public
 */
router.get("/:id", DashboardController.getDashboard);

export const dashboardRouter = router;

