/*
  Warnings:

  - Made the column `shopId` on table `ActionHistory` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ActionHistory" ALTER COLUMN "shopId" SET NOT NULL;
