/*
  Warnings:

  - You are about to drop the column `studentId` on the `profiles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[student_id]` on the table `profiles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `student_id` to the `profiles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "profiles" DROP CONSTRAINT "profiles_studentId_fkey";

-- DropIndex
DROP INDEX "profiles_studentId_key";

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "studentId",
ADD COLUMN     "student_id" UUID NOT NULL;

-- CreateTable
CREATE TABLE "assessments" (
    "id" UUID NOT NULL,
    "discipline" VARCHAR(60) NOT NULL,
    "grade" DECIMAL(4,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "student_id" UUID,

    CONSTRAINT "assessments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profiles_student_id_key" ON "profiles"("student_id");

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assessments" ADD CONSTRAINT "assessments_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;
