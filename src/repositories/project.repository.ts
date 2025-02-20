import { PrismaClient, sos_projects } from "@prisma/client";

const prisma = new PrismaClient();

export class ProjectRepository {
  static async getProjects(options: {
    page?: number;
    pageSize?: number;
    sortBy?: string;
    search?: string;
    sortOrder?: string;
  }): Promise<{ data: sos_projects[], meta: { page: number, pageSize: number, total: number } }> {
    const {
      page = 1,
      pageSize = 10,
      sortBy = "proj_id",
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

    const projects = await prisma.sos_projects.findMany({
      where: filters,
      skip,
      take: pageSize,
      orderBy: sortBy? {[sortBy]: sortOrder}: undefined,
    });

    const totalprojects = await prisma.sos_type.count({
      where: filters,
    })

    return {
      data: projects,
      meta: {
        page,
        pageSize,
        total: totalprojects,
      }
    }
  }

  static async getProjectById(id: number): Promise<sos_projects | null> {
    const project = await prisma.sos_projects.findUnique({
      where: {
        proj_id: id,
      },
    });
    if (!project) {
      throw new Error("Project not found");
    }
    return project;
  }

  static async getRelativeProjects(id: number): Promise<sos_projects[]> {
    const projects = await prisma.sos_projects.findMany({
      where: {
        users:{
          some:{
            uhp_user: id
          }
        }
      },
    });

    console.log(projects);
    
    return projects;
  }

//   static async getProjectByName(username: string): Promise<sos_projects | null> {
//     return await prisma.sos_projects.findUnique({
//       where: {
//         usr_username: username,
//     }});
//   }
}
