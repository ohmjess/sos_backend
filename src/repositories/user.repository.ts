import { PrismaClient, sos_users } from "@prisma/client";

const prisma = new PrismaClient();

export class UserRepository {
  static async getUsers(options: {
    page?: number;
    pageSize?: number;
    sortBy?: string;
    search?: string;
    sortOrder?: string;
    role?: string;
  }): Promise<{ data: sos_users[], meta: { page: number, pageSize: number, total: number } }> {
    const {
      page = 1,
      pageSize = 10,
      sortBy = "usr_id",
      sortOrder = "asc",
      search = "",
      role = "",
    } = options;

    const skip = (page - 1) * pageSize;

    const filters: any = {};
    if (search) {
      filters.OR = [
        { usr_username: { contains: search, mode: "insensitive" } },
        { usr_email: { contains: search, mode: "insensitive" } },
      ];
    }
    if (role) {
      filters.usr_role = role;
    }

    const users = await prisma.sos_users.findMany({
      where: filters,
      skip,
      take: pageSize,
      orderBy: sortBy? {[sortBy]: sortOrder}: undefined,
    });

    const totalUsers = await prisma.sos_users.count({
      where: filters,
    })

    return {
      data: users,
      meta: {
        page,
        pageSize,
        total: totalUsers,
      }
    }
  }

  static async getUserById(id: number): Promise<sos_users | null> {
    const user = await prisma.sos_users.findUnique({
      where: {
        usr_id: id,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  static async getUserByName(username: string): Promise<sos_users | null> {
    return await prisma.sos_users.findUnique({
      where: {
        usr_username: username,
    }});
  }
}
