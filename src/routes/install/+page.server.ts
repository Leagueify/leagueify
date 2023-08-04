// 3rd Party Imports
import { redirect } from "@sveltejs/kit";
// Type Imports
import type { Actions, PageData, PageServerLoad } from "./$types";
// Leagueify Imports
import * as auth from "$lib/utils/auth";
import database from "$lib/server/database";
import * as email from "$lib/server/email";

// Install Load Function
export const load: PageServerLoad = async ({ cookies }) => {
  const installationState: string | undefined = cookies.get(
    "Leagueify-Installed"
  );

  // Return Page Data
  return {
    installedState: installationState,
    supportedSports: await database.sport.findMany({
      orderBy: {
        name: "asc",
      },
    }),
  };
};

// Install Actions
export const actions: Actions = {
  install: async ({ cookies, locals, request }) => {
    const data: PageData = await request.formData();
    data.append("domain", request.headers.get("host"));

    // Add all database calls to transaction
    const user = await database.user.create({
      data: {
        name: data.get("userName"),
        email: data.get("userEmail"),
        phoneNumber: data.get("userPhone"),
        dateOfBirth: new Date(data.get("userDOB")).valueOf(),
        role: !data.installedState ? "MASTER_ADMIN" : "USER",
        password: auth.hashPassword(data.get("userPass")),
        token: auth.generateToken(),
        expiration: auth.generateTokenExpiration(),
      },
    });

    const emailConfig = await database.emailConfig.create({
      data: {
        outboundEmail: data.get("leagueOutboundEmail"),
        smtpHost: data.get("leagueSMTPHost"),
        smtpPort: Number.parseInt(data.get("leagueSMTPPort")),
        smtpUser: data.get("leagueSMTPUser"),
        smtpPass: data.get("leagueSMTPPass"),
      },
    });

    const league = await database.league.create({
      data: {
        name: data.get("leagueName"),
        domain: data.get("domain"),
        sport: Number.parseInt(data.get("leagueSport")),
        leagueAdmin: user.id,
        emailConfig: emailConfig.id,
      },
    });

    // Set Positions
    const positions: Array<any> = [];
    data
      .get("leaguePositions")
      .split(",")
      .forEach(async (position: string) => {
        positions.push({
          name: position,
          sport: Number.parseInt(data.get("leagueSport")),
        });
      });
    await database.position.createMany({
      data: positions,
    });

    // Set Divisions
    const divisions: Array<any> = JSON.parse(data.getAll("leagueDivisions"));
    divisions.forEach(async (division) => {
      division.league = league.id;
    });
    await database.division.createMany({
      data: divisions,
    });

    // Set Cookie to installed and set expiration to 1 day from now
    cookies.set("Leagueify-Installed", "installed", {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      path: "/",
    });

    // REFACTOR - Send League and User Creation Email
    email.leagueCreation(
      {
        outboundEmail: emailConfig.outboundEmail,
        smtpHost: emailConfig.smtpHost,
        smtpPort: emailConfig.smtpPort,
        smtpUser: emailConfig.smtpUser,
        smtpPass: emailConfig.smtpPass,
      },
      {
        name: league.name,
        domain: league.domain,
      },
      {
        email: user.email,
        token: user.token,
      }
    );

    throw redirect(303, "/");
  },
};
