// src/controllers/Type.controller.ts
import { Request, Response } from "express";
import { TypeService } from "../services/type.service";

export class TypeController {
  static async getTypes(req: Request, res: Response) {
    try {
      const options = {
        page: req.query.page ? Number(req.query.page) : undefined,
        pageSize: req.query.pageSize ? Number(req.query.pageSize) : undefined,
        sortBy: req.query.sortBy as string,
        sortOrder: req.query.sortOrder as "asc" | "desc",
        search: req.query.search as string,
        role: req.query.role as string,
      };

      const types = await TypeService.getTypes(options);
      return res.status(200).json(types);
    } catch (error) {
      console.error("Error fetching types:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  
  static async getTypeById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id); 

      const types = await TypeService.getTypeById(id);
      return res.status(200).json(types);
    } catch (error) {
      console.error("Error fetching types:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
