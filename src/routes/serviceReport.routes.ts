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

/**
 * @route   GET /api/serviceReport/user/:id
 * @desc    Get reate service user 
 * @access  Public
 */
router.get("/user/:id", ServiceReportController.getRelateServiceReport);

/**
 * @route   GET /api/serviceReport/:id/create
 * @desc    Create service report
 * @access  Public
 */
router.post("/create", ServiceReportController.createServiceReport);

/**
 * @route   PUT /api/serviceReport/:id
 * @desc    Update service report
 * @access  Public
 */
router.put("/:id/update", ServiceReportController.updateServiceReport);

/** 
 * @route   DELETE /api/serviceReport/:id
 * @desc    Delete service report
 * @access  Public
*/
router.delete("/:id/delete", ServiceReportController.deleteServiceReport);


export const serviceReportRouter = router;

