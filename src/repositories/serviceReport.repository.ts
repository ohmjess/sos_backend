import { PrismaClient, sos_service_reports } from "@prisma/client";

const prisma = new PrismaClient();

export class ServiceReportRepository {
  static async getServiceReports(options: {
    page?: number;
    pageSize?: number;
    sortBy?: string;
    search?: string;
    sortOrder?: string;
    role?: string;
  }): Promise<{
    data: sos_service_reports[];
    meta: { page: number; pageSize: number; total: number };
  }> {
    const {
      page = 1,
      pageSize = 10,
      sortBy = "sr_id",
      sortOrder = "asc",
      search = "",
    } = options;

    const skip = (page - 1) * pageSize;

    const filters: any = {};
    if (search) {
      filters.OR = [
        { sr_title: { contains: search, mode: "insensitive" } },
        { sr_service_report_code: { contains: search, mode: "insensitive" } },
      ];
    }

    const serviceReports = await prisma.sos_service_reports.findMany({
      where: filters,
      skip,
      take: pageSize,
      orderBy: sortBy ? { [sortBy]: sortOrder } : undefined,
    });

    const totalServiceReports = await prisma.sos_service_reports.count({
      where: filters,
    });

    return {
      data: serviceReports,
      meta: {
        page,
        pageSize,
        total: totalServiceReports,
      },
    };
  }

  static async getServiceReportById(
    id: number
  ): Promise<sos_service_reports | null> {
    const serviceReport = await prisma.sos_service_reports.findUnique({
      where: {
        sr_id: id,
      },
    });
    if (!serviceReport) {
      throw new Error("serviceReport not found");
    }
    return serviceReport;
  }

  static async getRelateServiceReports(
    id: number
  ): Promise<sos_service_reports[] | null> {
    const serviceReports = await prisma.sos_service_reports.findMany({
      select: {
        sr_id: true,
        sr_approver: true,
        sr_creator: true,
        sr_project: true,
        sr_status: true,
        sr_title: true,
        sr_type: true,
        sr_date_approve: true,
        sr_date_create: true,
        sr_date_complete: true,
        sr_date_edit: true,
        sr_date_report: true,
        sr_editor: true,
        sr_menu: true,
        sr_protection: true,
        sr_repairer: true,
        sr_report_detail: true,
        sr_reporter: true,
        sr_report_receiver: true,
        sr_root_cause: true,
        sr_solution: true,
        sr_service_report_code: true,
        type: {
          select: {
            typ_id: true,
            typ_name: true,
            typ_is_active: true,
          }
        },
        project: {
          select:{
            proj_id: true,
            proj_name: true,
            proj_is_active: true,
            proj_code: true,
          } 
        }
      },
      where: {
        project: {
          users: {
            some: {
              uhp_user: id,
            },
          },
        },
      },
    });
    if (!serviceReports) {
      throw new Error("serviceReports not found");
    }
    return serviceReports;
  }
}
