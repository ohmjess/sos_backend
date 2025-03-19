import express from "express";
import { UserController } from "../controllers/user.controller";
import { authenticateUser } from "../middlewares/auth.middleware";


const router = express.Router();


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - usr_id
 *         - usr_username
 *         - usr_email
 *         - usr_password
 *         - usr_role
 *       properties:
 *         usr_id:
 *           type: integer
 *           description: The user's unique ID
 *         usr_username:
 *           type: string
 *           description: The user's username
 *         usr_email:
 *           type: string
 *           description: The user's email address
 *         usr_password:
 *           type: string
 *           description: The user's password
 *         usr_role:
 *           type: string
 *           description: The user's role
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get a list of users
 *     description: Retrieve a paginated list of users with optional filters.
 *     tags: [Users]
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
 *         description: Number of users per page
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
 *           default: usr_id
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
 *         description: Search query for username or email
 *         required: false
 *         schema:
 *           type: string
 *       - name: role
 *         in: query
 *         description: Filter by user role
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
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

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve a user by their unique ID.
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: User ID
 *         schema:
 *           type: integer
 *     responses:
 *       "200":
 *         description: A user object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       "404":
 *         description: User not found
 */

router.get("/", UserController.getUsers); // Get all users
router.get("/:id", UserController.getUserById); // Get user by ID

export const userRouter = router;

