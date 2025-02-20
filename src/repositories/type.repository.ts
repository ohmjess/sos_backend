import { PrismaClient, sos_type } from "@prisma/client";

const prisma = new PrismaClient();

export class TypeRepository {
  static async getTypes(options: {
    page?: number;
    pageSize?: number;
    sortBy?: string;
    search?: string;
    sortOrder?: string;
  }): Promise<{ data: sos_type[], meta: { page: number, pageSize: number, total: number } }> {
    const {
      page = 1,
      pageSize = 10,
      sortBy = "typ_id",
      sortOrder = "asc",
      search = "",
    } = options;

    const skip = (page - 1) * pageSize;

    const filters: any = {};
    if (search) {
      filters.OR = [
        { proj_name: { contains: search, mode: "insensitive" } },
      ];
    }

    const types = await prisma.sos_type.findMany({
      where: filters,
      skip,
      take: pageSize,
      orderBy: sortBy? {[sortBy]: sortOrder}: undefined,
    });

    const totalTypes = await prisma.sos_type.count({
      where: filters,
    })

    return {
      data: types,
      meta: {
        page,
        pageSize,
        total: totalTypes,
      }
    }
  }

  static async getTypeById(id: number): Promise<sos_type | null> {
    const type = await prisma.sos_type.findUnique({
      where: {
        typ_id: id,
      },
    });
    if (!type) {
      throw new Error("type not found");
    }
    return type;
  }
}
