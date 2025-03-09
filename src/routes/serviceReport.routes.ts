import express from "express";
import { ServiceReportController } from "../controllers/serviceReport.controller";
import { authenticateUser } from "../middlewares/auth.middleware";


const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Service Reports
 *   description: API สำหรับจัดการ Service Reports
 */

/**
 * @swagger
 * /api/serviceReport:
 *   get:
 *     summary: Get all Service Reports
 *     tags: [Service Reports]
 *     responses:
 *       200:
 *         description: รายการของ Service Reports
 */
router.get("/", ServiceReportController.getServiceReports);

/**
 * @swagger
 * /api/serviceReport/{id}:
 *   get:
 *     summary: Get a Service Report by ID
 *     tags: [Service Reports]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID ของ Service Report
 *     responses:
 *       200:
 *         description: ข้อมูลของ Service Report
 *       404:
 *         description: ไม่พบ Service Report
 */
router.get("/:id", ServiceReportController.getServiceReportById);

/**
 * @swagger
 * /api/serviceReport/user/{id}:
 *   get:
 *     summary: Get Service Reports related to a user
 *     tags: [Service Reports]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID ของผู้ใช้
 *     responses:
 *       200:
 *         description: รายการของ Service Reports ที่เกี่ยวข้องกับผู้ใช้
 *       404:
 *         description: ไม่พบข้อมูล
 */
router.get("/user/:id", ServiceReportController.getRelateServiceReport);

/**
 * @swagger
 * /api/serviceReport/create:
 *   post:
 *     summary: Create a new Service Report
 *     tags: [Service Reports]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sr_title:
 *                 type: string
 *               sr_service_report_code:
 *                 type: string
 *               sr_status:
 *                 type: string
 *     responses:
 *       201:
 *         description: สร้างสำเร็จ
 *       400:
 *         description: ข้อมูลไม่ถูกต้อง
 */
router.post("/create", ServiceReportController.createServiceReport);

/**
 * @swagger
 * /api/serviceReport/{id}/update:
 *   put:
 *     summary: Update Service Report by ID
 *     tags: [Service Reports]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID ของ Service Report
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sr_title:
 *                 type: string
 *               sr_status:
 *                 type: string
 *     responses:
 *       200:
 *         description: อัปเดตสำเร็จ
 *       404:
 *         description: ไม่พบข้อมูล
 */
router.put("/:id/update", ServiceReportController.updateServiceReport);

/**
 * @swagger
 * /api/serviceReport/{id}/delete:
 *   delete:
 *     summary: Delete Service Report by ID
 *     tags: [Service Reports]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID ของ Service Report
 *     responses:
 *       200:
 *         description: ลบสำเร็จ
 *       404:
 *         description: ไม่พบข้อมูล
 */
router.delete("/:id/delete", ServiceReportController.deleteServiceReport);


export const serviceReportRouter = router;

