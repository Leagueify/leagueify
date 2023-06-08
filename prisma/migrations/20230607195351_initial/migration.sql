-- CreateEnum
CREATE TYPE "Role" AS ENUM ('MASTER_ADMIN', 'ADMIN', 'USER');

-- CreateTable
CREATE TABLE "Division" (
    "id" SERIAL NOT NULL,
    "league" INTEGER NOT NULL,
    "name" VARCHAR(24) NOT NULL,
    "minAge" INTEGER NOT NULL,
    "maxAge" INTEGER NOT NULL,

    CONSTRAINT "Division_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailConfig" (
    "id" SERIAL NOT NULL,
    "outboundEmail" VARCHAR(64) NOT NULL,
    "smtpHost" VARCHAR(255) NOT NULL,
    "smtpPort" INTEGER NOT NULL,
    "smtpUser" VARCHAR(255) NOT NULL,
    "smtpPass" VARCHAR(255) NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "EmailConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "League" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "domain" VARCHAR(255) NOT NULL,
    "sport" INTEGER NOT NULL,
    "leagueAdmin" INTEGER NOT NULL,
    "emailConfig" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "League_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Player" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(32) NOT NULL,
    "dateOfBirth" BIGINT NOT NULL,
    "yearsPlayed" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,
    "division" INTEGER NOT NULL,
    "signedWaiver" BOOLEAN NOT NULL DEFAULT false,
    "isRegistered" BOOLEAN NOT NULL DEFAULT false,
    "parent" INTEGER NOT NULL,
    "league" INTEGER NOT NULL,
    "roster" INTEGER,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Position" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(32) NOT NULL,
    "sport" INTEGER NOT NULL,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Roster" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(32) NOT NULL,
    "division" INTEGER NOT NULL,
    "coach" INTEGER NOT NULL,

    CONSTRAINT "Roster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sport" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(32) NOT NULL,

    CONSTRAINT "Sport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(32) NOT NULL,
    "email" VARCHAR(64) NOT NULL,
    "phoneNumber" VARCHAR(25) NOT NULL,
    "dateOfBirth" BIGINT NOT NULL,
    "coach" BOOLEAN NOT NULL DEFAULT false,
    "volunteer" BOOLEAN NOT NULL DEFAULT false,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "password" VARCHAR(255) NOT NULL,
    "token" VARCHAR(255),
    "expiration" BIGINT,
    "isActive" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "League_domain_key" ON "League"("domain");

-- CreateIndex
CREATE UNIQUE INDEX "League_emailConfig_key" ON "League"("emailConfig");

-- CreateIndex
CREATE UNIQUE INDEX "Sport_name_key" ON "Sport"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_token_key" ON "User"("token");

-- AddForeignKey
ALTER TABLE "Division" ADD CONSTRAINT "Division_league_fkey" FOREIGN KEY ("league") REFERENCES "League"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "League" ADD CONSTRAINT "League_sport_fkey" FOREIGN KEY ("sport") REFERENCES "Sport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "League" ADD CONSTRAINT "League_leagueAdmin_fkey" FOREIGN KEY ("leagueAdmin") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "League" ADD CONSTRAINT "League_emailConfig_fkey" FOREIGN KEY ("emailConfig") REFERENCES "EmailConfig"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_position_fkey" FOREIGN KEY ("position") REFERENCES "Position"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_division_fkey" FOREIGN KEY ("division") REFERENCES "Division"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_parent_fkey" FOREIGN KEY ("parent") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_league_fkey" FOREIGN KEY ("league") REFERENCES "League"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_roster_fkey" FOREIGN KEY ("roster") REFERENCES "Roster"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Position" ADD CONSTRAINT "Position_sport_fkey" FOREIGN KEY ("sport") REFERENCES "Sport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Roster" ADD CONSTRAINT "Roster_division_fkey" FOREIGN KEY ("division") REFERENCES "Division"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Roster" ADD CONSTRAINT "Roster_coach_fkey" FOREIGN KEY ("coach") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
