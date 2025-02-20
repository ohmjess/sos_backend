import express from "express";
import { ServiceReportController } from "../controllers/serviceReport.controller";
import { authenticateUser } from "../middlewares/auth.middleware";


const router = express.Router();


/**
 * @route   GET /api/serviceReport/:id
 * @desc    Get all user 
 * @access  Public
 */
router.get("/", ServiceReportController.getServiceReports);

/**
 * @route   GET /api/users/:id
 * @desc    Get user by ID
 * @access  Public
 */
router.get("/:id", ServiceReportController.getServiceReportById);

// /**
//  * @route   GET /api/serviceReport/user/:id
//  * @desc    Get reate service user 
//  * @access  Public
//  */
router.get("/user/:id", ServiceReportController.getRelateServiceReport);


export const serviceReportRouter = router;

