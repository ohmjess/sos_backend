import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class DashboardRepository {
  static async getDashboard(options: {
    id: number;
    month: number;
    year: number;
  }): Promise<any> {
    const dashboardPerStatus = await prisma.sos_service_reports.groupBy({
      by: ["sr_status"],
      _count: {
        sr_status: true,
      },
      where: {
        sr_project: {
          in: options.id
            ? (
                await prisma.sos_users_has_projects.findMany({
                  where: { uhp_user: options.id },
                  select: { uhp_project: true },
                })
              ).map((p) => p.uhp_project)
            : undefined,
        },
        sr_date_report: {
          gte:
            options.month && options.year
              ? new Date(options.year, options.month - 1, 1)
              : undefined,
          lt:
            options.month && options.year
              ? new Date(options.year, options.month, 1)
              : undefined,
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
