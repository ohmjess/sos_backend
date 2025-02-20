// src/services/Types.service.ts
import { TypeRepository } from "../repositories/type.repository";

export class TypeService {
  static async getTypes(options: {
    page?: number;
    pageSize?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    search?: string;
    role?: string;
  }) {
    return await TypeRepository.getTypes(options);
  }
  static async getTypeById(id: number) {
    return await TypeRepository.getTypeById(id);
  }
}
