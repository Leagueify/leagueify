-- CreateTable
CREATE TABLE "League" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "sport" VARCHAR(255) NOT NULL,

    CONSTRAINT "League_pkey" PRIMARY KEY ("id")
);
