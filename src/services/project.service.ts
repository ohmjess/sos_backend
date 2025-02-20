// src/services/user.service.ts
import { ProjectRepository } from "../repositories/project.repository";

export class ProjectService {
  static async getProjects(options: {
    page?: number;
    pageSize?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    search?: string;
    role?: string;
  }) {
    return await ProjectRepository.getProjects(options);
  }
  static async getProjectById(id: number) {
    return await ProjectRepository.getProjectById(id);
  }
  
}
