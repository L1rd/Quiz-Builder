-- CreateTable
CREATE TABLE "public"."Quiz" (
    "id" SERIAL NOT NULL,
    "quizTitle" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("id")
);
