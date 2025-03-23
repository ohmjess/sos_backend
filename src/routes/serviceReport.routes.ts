import express from "express";
import { ServiceReportController } from "../controllers/serviceReport.controller";
import { authenticateUser } from "../middlewares/auth.middleware";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     ServiceReport:
 *       type: object
 *       required:
 *         - sr_id
 *         - sr_title
 *         - sr_report_detail
 *         - sr_date_report
 *         - sr_date_create
 *         - sr_date_edit
 *         - sr_status
 *         - sr_service_report_code
 *         - sr_creator
 *         - sr_editor
 *         - sr_reporter
 *         - sr_type
 *         - sr_project
 *       properties:
 *         sr_id:
 *           type: integer
 *           description: The service report's unique ID
 *         sr_title:
 *           type: string
 *           description: The title of the service report
 *         sr_report_detail:
 *           type: string
 *           description: The details of the service report
 *         sr_date_report:
 *           type: string
 *           description: The date of the service report
 *         sr_date_create:
 *           type: string
 *           description: The date when the service report was created
 *         sr_date_edit:
 *           type: string
 *           description: The date when the service report was last edited
 *         sr_status:
 *           type: integer
 *           description: The status of the service report
 *         sr_service_report_code:
 *           type: string
 *           description: The code of the service report
 *         sr_creator:
 *           type: integer
 *           description: The ID of the user who created the service report
 *         sr_editor:
 *           type: integer
 *           description: The ID of the user who last edited the service report
 *         sr_reporter:
 *           type: integer
 *           description: The ID of the user who reported the issue
 *         sr_project:
 *           type: integer
 *           description: The ID of the project of the service report
 *         sr_type:
 *           type: integer
 *           description: The ID of the type of the service report
 *         sr_repairer:
 *           type: integer
 *           description: The ID of the repairer of the service report
 *         sr_report_receiver:
 *           type: integer
 *           description: The ID of the report receiver of the service report
 *         sr_root_cause:
 *           type: string
 *           description: The root cause of the service report
 *         sr_solution:
 *           type: string
 *           description: The solution of the service report
 *         sr_date_complete:
 *           type: string
 *           description: The date when the service report was completed
 *         sr_approver:
 *           type: integer
 *           description: The ID of the approver of the service report
 *         sr_menu:
 *           type: string
 *           description: The menu of the service report
 *         sr_protection:
 *           type: string
 *           description: The protection of the service report
 *         sr_date_approve:
 *           type: string
 *           description: The date when the service report was approved
 */

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
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: pageSize
 *         in: query
 *         description: Number of service report per page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *       - name: sortBy
 *         in: query
 *         description: Field to sort by
 *         required: false
 *         schema:
 *           type: string
 *           default: sr_id
 *       - name: sortOrder
 *         in: query
 *         description: Sorting order (asc or desc)
 *         required: false
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: asc
 *       - name: search
 *         in: query
 *         description: Search query for service report name or service report code
 *         required: false
 *         schema:
 *           type: string
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
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: หน้าของข้อมูลที่ต้องการ (pagination)
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           example: 10
 *         description: จำนวนรายการต่อหน้า
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           example: sr_title
 *         description: ชื่อ field ที่ต้องการใช้เรียงลำดับ
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           example: asc
 *         description: ทิศทางการเรียงลำดับ (asc หรือ desc)
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           example: printer
 *         description: คำค้นหาในชื่อหรือรหัสรายงาน
 *     responses:
 *       200:
 *         description: รายการของ Service Reports ที่เกี่ยวข้องกับผู้ใช้
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ServiceReport'
 *                 meta:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     pageSize:
 *                       type: integer
 *                     total:
 *                       type: integer
 *       400:
 *         description: Invalid user ID
 *       500:
 *         description: Internal server error
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
 *                 description: Title of the service report
 *               sr_service_report_code:
 *                 type: string
 *                 description: Service report code
 *               sr_report_detail:
 *                 type: string
 *                 description: Detailed description of the report
 *               sr_date_report:
 *                 type: string
 *                 format: date-time
 *                 description: Report date (ISO 8601 format)
 *               sr_date_create:
 *                 type: string
 *                 format: date-time
 *                 description: Creation date (ISO 8601 format)
 *               sr_date_edit:
 *                 type: string
 *                 format: date-time
 *                 nullable: true
 *                 description: Last edit date (ISO 8601 format, nullable)
 *               sr_status:
 *                 type: integer
 *                 description: Status of the report (e.g., 1 = active, 0 = inactive)
 *               sr_creator:
 *                 type: integer
 *                 description: ID of the user who created the report
 *               sr_editor:
 *                 type: integer
 *                 description: ID of the last user who edited the report
 *               sr_reporter:
 *                 type: integer
 *                 description: ID of the user who reported the issue
 *               sr_type:
 *                 type: integer
 *                 description: ID of the type of the report
 *               sr_project:
 *                 type: integer
 *                 description: ID of the project of the report
 *     responses:
 *       201:
 *         description: Service report created successfully
 *       400:
 *         description: Invalid request data
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
