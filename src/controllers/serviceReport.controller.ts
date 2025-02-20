// src/controllers/user.controller.ts
import { Request, Response } from "express";
import { ServiceReportService } from "../services/serviceReport.service";

export class ServiceReportController {
  static async getServiceReports(req: Request, res: Response) {
    try {
      const options = {
        page: req.query.page ? Number(req.query.page) : undefined,
        pageSize: req.query.pageSize ? Number(req.query.pageSize) : undefined,
        sortBy: req.query.sortBy as string,
        sortOrder: req.query.sortOrder as "asc" | "desc",
        search: req.query.search as string,
        role: req.query.role as string,
      };

      const serviceReports = await ServiceReportService.getServiceReports(
        options
      );
      return res.status(200).json(serviceReports);
    } catch (error) {
      console.error("Error fetching serviceReports:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getServiceReportById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const serviceReports = await ServiceReportService.getServiceReportById(
        id
      );
      return res.status(200).json(serviceReports);
    } catch (error) {
      console.error("Error fetching serviceReports:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getRelateServiceReport(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const serviceReports = await ServiceReportService.getRelateServiceReports(
        id
      );
      return res.status(200).json(serviceReports);
    } catch (error) {
      console.error("Error fetching serviceReports:", error);
    }
  }
}
