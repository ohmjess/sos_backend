/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('employee', 'user');

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "sos_users" (
    "usr_id" SERIAL NOT NULL,
    "usr_username" TEXT NOT NULL,
    "usr_password" TEXT NOT NULL,
    "usr_email" TEXT NOT NULL,
    "usr_role" "Role" NOT NULL,

    CONSTRAINT "sos_users_pkey" PRIMARY KEY ("usr_id")
);

-- CreateTable
CREATE TABLE "sos_projects" (
    "proj_id" SERIAL NOT NULL,
    "proj_name" TEXT NOT NULL,
    "proj_code" TEXT NOT NULL,
    "proj_is_active" BOOLEAN NOT NULL,

    CONSTRAINT "sos_projects_pkey" PRIMARY KEY ("proj_id")
);

-- CreateTable
CREATE TABLE "sos_users_has_projects" (
    "uhp_user" INTEGER NOT NULL,
    "uhp_project" INTEGER NOT NULL,

    CONSTRAINT "sos_users_has_projects_pkey" PRIMARY KEY ("uhp_user","uhp_project")
);

-- CreateTable
CREATE TABLE "sos_type" (
    "typ_id" SERIAL NOT NULL,
    "typ_name" TEXT NOT NULL,
    "typ_is_active" BOOLEAN NOT NULL,
    "typ_order" INTEGER NOT NULL,

    CONSTRAINT "sos_type_pkey" PRIMARY KEY ("typ_id")
);

-- CreateTable
CREATE TABLE "sos_service_reports" (
    "sr_id" SERIAL NOT NULL,
    "sr_title" TEXT NOT NULL DEFAULT 'ไม่ระบุ',
    "sr_report_detail" TEXT,
    "sr_date_report" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sr_date_create" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sr_status" INTEGER NOT NULL,
    "sr_service_report_code" TEXT,
    "sr_type" INTEGER,
    "sr_project" INTEGER,
    "sr_reporter" INTEGER,
    "sr_repairer" INTEGER,
    "sr_report_receiver" INTEGER,
    "sr_editor" INTEGER,
    "sr_date_edit" TIMESTAMP(3),
    "sr_root_cause" TEXT,
    "sr_solution" TEXT,
    "sr_date_complete" TIMESTAMP(3),
    "sr_approver" INTEGER,
    "sr_menu" TEXT,
    "sr_protection" TEXT,
    "sr_date_approve" TIMESTAMP(3),
    "sr_creator" INTEGER NOT NULL,

    CONSTRAINT "sos_service_reports_pkey" PRIMARY KEY ("sr_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sos_users_usr_username_key" ON "sos_users"("usr_username");

-- CreateIndex
CREATE UNIQUE INDEX "sos_users_usr_email_key" ON "sos_users"("usr_email");

-- CreateIndex
CREATE UNIQUE INDEX "sos_projects_proj_name_key" ON "sos_projects"("proj_name");

-- CreateIndex
CREATE UNIQUE INDEX "sos_projects_proj_code_key" ON "sos_projects"("proj_code");

-- CreateIndex
CREATE UNIQUE INDEX "sos_type_typ_name_key" ON "sos_type"("typ_name");

-- CreateIndex
CREATE UNIQUE INDEX "sos_service_reports_sr_service_report_code_key" ON "sos_service_reports"("sr_service_report_code");

-- AddForeignKey
ALTER TABLE "sos_users_has_projects" ADD CONSTRAINT "sos_users_has_projects_uhp_user_fkey" FOREIGN KEY ("uhp_user") REFERENCES "sos_users"("usr_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sos_users_has_projects" ADD CONSTRAINT "sos_users_has_projects_uhp_project_fkey" FOREIGN KEY ("uhp_project") REFERENCES "sos_projects"("proj_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sos_service_reports" ADD CONSTRAINT "sos_service_reports_sr_type_fkey" FOREIGN KEY ("sr_type") REFERENCES "sos_type"("typ_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sos_service_reports" ADD CONSTRAINT "sos_service_reports_sr_project_fkey" FOREIGN KEY ("sr_project") REFERENCES "sos_projects"("proj_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sos_service_reports" ADD CONSTRAINT "sos_service_reports_sr_reporter_fkey" FOREIGN KEY ("sr_reporter") REFERENCES "sos_users"("usr_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sos_service_reports" ADD CONSTRAINT "sos_service_reports_sr_repairer_fkey" FOREIGN KEY ("sr_repairer") REFERENCES "sos_users"("usr_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sos_service_reports" ADD CONSTRAINT "sos_service_reports_sr_report_receiver_fkey" FOREIGN KEY ("sr_report_receiver") REFERENCES "sos_users"("usr_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sos_service_reports" ADD CONSTRAINT "sos_service_reports_sr_editor_fkey" FOREIGN KEY ("sr_editor") REFERENCES "sos_users"("usr_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sos_service_reports" ADD CONSTRAINT "sos_service_reports_sr_approver_fkey" FOREIGN KEY ("sr_approver") REFERENCES "sos_users"("usr_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sos_service_reports" ADD CONSTRAINT "sos_service_reports_sr_creator_fkey" FOREIGN KEY ("sr_creator") REFERENCES "sos_users"("usr_id") ON DELETE RESTRICT ON UPDATE CASCADE;
