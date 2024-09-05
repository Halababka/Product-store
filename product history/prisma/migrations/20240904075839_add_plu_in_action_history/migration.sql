/*
  Warnings:

  - Added the required column `plu` to the `ActionHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ActionHistory" ADD COLUMN     "plu" TEXT NOT NULL;
