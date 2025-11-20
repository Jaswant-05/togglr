/*
  Warnings:

  - A unique constraint covering the columns `[name,companyId]` on the table `Project` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Project_name_companyId_key" ON "Project"("name", "companyId");
