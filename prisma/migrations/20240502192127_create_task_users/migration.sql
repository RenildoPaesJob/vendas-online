/*
  Warnings:

  - You are about to drop the `TaskUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TaskUser" DROP CONSTRAINT "TaskUser_taskId_fkey";

-- DropForeignKey
ALTER TABLE "TaskUser" DROP CONSTRAINT "TaskUser_userId_fkey";

-- DropTable
DROP TABLE "TaskUser";

-- CreateTable
CREATE TABLE "tasks_users" (
    "id" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tasks_users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tasks_users" ADD CONSTRAINT "tasks_users_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks_users" ADD CONSTRAINT "tasks_users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
