export interface ServiceReport {
    sr_id: number;
    sr_title: string;
    sr_report_detail: string | null;
    sr_date_report: Date;
    sr_date_create: Date;
    sr_status: number;
    sr_service_report_code: string | null;
    sr_type: number | null;
    sr_project: number | null;
    sr_reporter: number | null;
    sr_repairer: number | null;
    sr_report_receiver: number | null;
    sr_editor: number | null;
    sr_date_edit: Date | null;
    sr_root_cause: string | null;
    sr_solution: string | null;
    sr_date_complete: Date | null;
    sr_approver: number | null;
    sr_menu: string | null;
    sr_protection: string | null;
    sr_date_approve: Date | null;
    sr_creator: number;
}
