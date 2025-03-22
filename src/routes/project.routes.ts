import express from "express";
import { ProjectController } from "../controllers/project.controller";
import { authenticateUser } from "../middlewares/auth.middleware";

const router = express.Router();

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Get all projects
 *     description: Retrieve a list of all projects.
 *     responses:
 *       200:
 *         description: A list of projects.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 */

/**
 * @swagger
 * /api/projects/{id}:
 *   get:
 *     summary: Get project by ID
 *     description: Retrieve a single project by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the project to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single project.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       404:
 *         description: Project not found.
 */

/**
 * @swagger
 * /api/projects/user/{id}:
 *   get:
 *     summary: Get projects by User ID
 *     description: Retrieve projects associated with a specific user ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user whose projects to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of projects associated with the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *       404:
 *         description: User or projects not found.
 */
router.get("/", ProjectController.getProjects);
router.get("/:id", ProjectController.getProjectById);
router.get("/user/:id", ProjectController.getRelativeProject);

export const projectRouter = router;