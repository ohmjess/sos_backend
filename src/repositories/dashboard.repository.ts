import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class DashboardRepository {
  static async getDashboard(options: {
    id: number;
    month?: string;
    year?: string;
  }): Promise<any> {
    const format = {
      id: options.id,
      month: options.month ? Number(options.month) : new Date().getMonth() + 1,
      year: options.year ? Number(options.year) : new Date().getFullYear(),
    }

    const dashboardPerStatus = await prisma.sos_service_reports.groupBy({
      by: ["sr_status"],
      _count: {
        sr_status: true,
      },
      where: {
        sr_project: {
          in: format.id
            ? (
                await prisma.sos_users_has_projects.findMany({
                  where: { uhp_user: format.id },
                  select: { uhp_project: true },
                })
              ).map((p) => p.uhp_project)
            : undefined,
        },
        sr_date_report: {
          gte:
              new Date(format.year, format.month - 1, 1),
          lt:
              new Date(format.year, format.month, 1),
        },
      },
    });

    const totalDashboard = await prisma.sos_service_reports.count({
      select: {
        sr_status: true,
      },
    });

    return {
      dashboardPerStatus: dashboardPerStatus,
      totalStatus: totalDashboard,
    };
  }
}
