// src/controllers/user.controller.ts
import { Request, Response } from "express";
import { ServiceReportService } from "../services/serviceReport.service";
import { sos_service_reports } from "@prisma/client";

export class ServiceReportController {
  static async getServiceReports(req: Request, res: Response) {
    try {
      console.log("Log from controller");

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
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }

      const page = req.query.page ? Number(req.query.page) : undefined;
      const pageSize = req.query.pageSize
        ? Number(req.query.pageSize)
        : undefined;
      const sortBy = req.query.sortBy?.toString();
      const sortOrder = req.query.sortOrder?.toString();
      const search = req.query.search?.toString();

      const serviceReports = await ServiceReportService.getRelateServiceReports(
        {
          id,
          page,
          pageSize,
          sortBy,
          sortOrder,
          search,
        }
      );

      return res.status(200).json(serviceReports);
    } catch (error) {
      console.error("Error fetching serviceReports:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async createServiceReport(req: Request, res: Response) {
    try {
      const serviceReport = await ServiceReportService.createServiceReport(
        req.body as sos_service_reports
      );
      return res.status(201).json(serviceReport);
    } catch (error) {
      console.error("Error creating serviceReport:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async updateServiceReport(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const serviceReport = await ServiceReportService.updateServiceReport(
        id,
        req.body as sos_service_reports
      );
      return res.status(200).json(serviceReport);
    } catch (error) {
      console.error("Error updating serviceReport:", error);
    }
  }

  static async deleteServiceReport(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await ServiceReportService.deleteServiceReport(id);
      return res
        .status(200)
        .json({ message: "ServiceReport deleted successfully" });
    } catch (error) {
      console.error("Error deleting serviceReport:", error);
    }
  }
}
