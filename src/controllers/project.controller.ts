// src/controllers/user.controller.ts
import { Request, Response } from "express";
import { ProjectService } from "../services/project.service";

export class ProjectController {
  static async getProjects(req: Request, res: Response) {
    try {
      const options = {
        page: req.query.page ? Number(req.query.page) : undefined,
        pageSize: req.query.pageSize ? Number(req.query.pageSize) : undefined,
        sortBy: req.query.sortBy as string,
        sortOrder: req.query.sortOrder as "asc" | "desc",
        search: req.query.search as string,
        role: req.query.role as string,
      };

      const projects = await ProjectService.getProjects(options);
      return res.status(200).json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getProjectById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const projects = await ProjectService.getProjectById(id);
      return res.status(200).json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getRelativeProject(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      console.log(id);
      const projects = await ProjectService.getRelatedProjects(id);
      return res.status(200).json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
