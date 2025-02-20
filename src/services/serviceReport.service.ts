// src/services/user.service.ts
import { ServiceReportRepository } from "../repositories/serviceReport.repository";

export class ServiceReportService {
  static async getServiceReports(options: {
    page?: number;
    pageSize?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    search?: string;
    role?: string;
  }) {
    return await ServiceReportRepository.getServiceReports(options);
  }
  static async getServiceReportById(id: number) {
    return await ServiceReportRepository.getServiceReportById(id);
  }

  static async getRelateServiceReports(id: number) {
    return await ServiceReportRepository.getRelateServiceReports(id);
  }
}
