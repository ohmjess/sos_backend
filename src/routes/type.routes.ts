import express from "express";
import { TypeController } from "../controllers/type.controller";
import { authenticateUser } from "../middlewares/auth.middleware";


const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Type:
 *       type: object
 *       required:
 *         - typ_id
 *         - typ_name
 *         - typ_is_active
 *         - typ_order
 *       properties:
 *         typ_id:
 *           type: integer
 *           description: The type's unique ID
 *         typ_name:
 *           type: string
 *           description: The name of the type
 *         typ_is_active:
 *           type: boolean
 *           description: The status of the type
 *         typ_order:
 *           type: boolean
 *           description: The order of the type
 */

/**
 * @swagger
 * tags:
 *   name: Types
 *   description: API for managing types
 */

/**
 * @swagger
 * /api/types:
 *   get:
 *     summary: Get a list of types
 *     description: Retrieve a paginated list of types with optional filters.
 *     tags: [Types]
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
 *         description: Number of types per page
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
 *           default: typ_id
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
 *         description: Search query for type name
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: A list of types
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Type'
 *                 meta:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     pageSize:
 *                       type: integer
 *                     total:
 *                       type: integer
 */
router.get("/", TypeController.getTypes);

/**
 * @swagger
 * /api/types/{id}:
 *   get:
 *     summary: Get a type by ID
 *     description: Retrieve a type by its unique ID.
 *     tags: [Types]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Type ID
 *         schema:
 *           type: integer
 *     responses:
 *       "200":
 *         description: A type object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Type'
 *       "404":
 *         description: Type not found
 */
router.get("/:id", TypeController.getTypeById);

export const typeRouter = router;

