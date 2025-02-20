// src/services/user.service.ts
import { sos_service_reports } from "@prisma/client";
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

  static async createServiceReport(data: sos_service_reports) {
    return await ServiceReportRepository.createServiceReport(data);
  }

  static async updateServiceReport(id: number, data: sos_service_reports) {
    return await ServiceReportRepository.upServiceReport(id,data);
  }

  static async deleteServiceReport(id: number) {
    return await ServiceReportRepository.deleteServiceReport(id);
  }
}
