// src/services/user.service.ts
import { DashboardRepository } from "../repositories/dashboard.repository";

export class DashboardService {
  static async getDashboard(options: { id: number; month: string; year: string }) {
    return await DashboardRepository.getDashboard(options);
  }
}
