-- CreateTable
CREATE TABLE "profiles" (
    "id" UUID NOT NULL,
    "bio" TEXT,
    "image" VARCHAR(255),
    "birthdate" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "studentId" UUID NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profiles_studentId_key" ON "profiles"("studentId");

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;
