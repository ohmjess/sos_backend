// src/controllers/user.controller.ts
import { Request, Response } from "express";
import { DashboardRepository } from "../repositories/dashboard.repository";

export class DashboardController {
  static async getDashboard(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const options = {
        id: id,
        month: Number(req.query.month),
        year: Number(req.query.year),
      };

      const users = await DashboardRepository.getDashboard(options);
      return res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

}
