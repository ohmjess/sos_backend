// src/services/user.service.ts
import { UserRepository } from "../repositories/user.repository";

export class UserService {
  static async getUsers(options: {
    page?: number;
    pageSize?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    search?: string;
    role?: string;
  }) {
    return await UserRepository.getUsers(options);
  }
  static async getUserById(id: number) {
    return await UserRepository.getUserById(id);
  }
}
