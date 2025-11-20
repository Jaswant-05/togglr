/*
  Warnings:

  - A unique constraint covering the columns `[key,projectId]` on the table `FeatureFlag` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "FeatureFlag_key_key";

-- CreateIndex
CREATE INDEX "FeatureFlag_key_projectId_idx" ON "FeatureFlag"("key", "projectId");

-- CreateIndex
CREATE UNIQUE INDEX "FeatureFlag_key_projectId_key" ON "FeatureFlag"("key", "projectId");

-- CreateIndex
CREATE INDEX "Project_name_companyId_idx" ON "Project"("name", "companyId");
