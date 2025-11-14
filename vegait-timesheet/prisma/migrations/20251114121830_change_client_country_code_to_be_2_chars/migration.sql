/*
  Warnings:

  - You are about to alter the column `countryCode` on the `clients` table. The data in that column could be lost. The data in that column will be cast from `Char(3)` to `Char(2)`.

*/
-- AlterTable
ALTER TABLE "clients" ALTER COLUMN "countryCode" SET DATA TYPE CHAR(2);

-- CreateIndex
CREATE INDEX "clients_name_idx" ON "clients"("name");
