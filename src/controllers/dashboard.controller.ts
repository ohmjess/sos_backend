// src/controllers/user.controller.ts
import { Request, Response } from "express";
import { DashboardService } from "../services/dashboard.service"
import { string } from "zod";

export class DashboardController {
  static async getDashboard(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const options = {
        id: id,
        month: req.query.month as string,
        year: req.query.year as string,
      };

      console.log();
      
      const users = await DashboardService.getDashboard(options);
      return res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
