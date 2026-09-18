-- AlterTable
ALTER TABLE "User" ADD COLUMN     "memberNumber" SERIAL NOT NULL,
ADD COLUMN     "passwordHash" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_memberNumber_key" ON "User"("memberNumber");

