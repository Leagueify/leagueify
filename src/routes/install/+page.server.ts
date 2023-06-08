// 3rd Party Imports
import { redirect } from "@sveltejs/kit";
import { get } from "svelte/store";
// Type Imports
import type { Actions, PageData, PageServerLoad } from "./types";
// Leagueify Imports
import database from "$lib/server/database";
import * as email from "$lib/server/email";
import { leagueStore, userStore } from "$lib/stores";
import * as auth from "$lib/utils/auth";

// Load Function
export const load: PageServerLoad = async ({ cookies, request, url }) => {
  const pageData: PageData = {};
  pageData.league = get(leagueStore);
  if (!pageData.league.installed) {
    pageData.supportedSports = await database.sport.findMany({
      orderBy: {
        name: "asc",
      },
    });
  }

  // Find and Validate User
  if (url.searchParams.has("token")) {
    const user = await database.user.findFirst({
      where: {
        token: url.searchParams.get("token"),
      },
    });
    if (user && Number(user.expiration) > new Date().valueOf()) {
      let userToken: string = auth.generateToken(64);
      await database.user.update({
        where: {
          id: user.id,
        },
        data: {
          token: userToken,
          expiration: auth.generateTokenExpiration(1440),
          isActive: true,
        },
      });
      // Set League as Active
      await database.league.update({
        where: {
          domain: request.headers.get("host"),
        },
        data: {
          isActive: true,
        },
      });
      // Set Cookie Token
      cookies.set("token", userToken, { path: "/" });
    }
    throw redirect(303, "/");
  }

  // Return Page Data
  return pageData;
};

// Install Page Actions
export const actions: Actions = {
  install: async ({ request }) => {
    const data = await request.formData();
    data.append("domain", request.headers.get("host"));

    // Add all database calls to transaction
    const user = await database.user.create({
      data: {
        name: data.get("userName"),
        email: data.get("userEmail"),
        phoneNumber: data.get("userPhone"),
        dateOfBirth: new Date(data.get("userDOB")).valueOf(),
        role: !get(leagueStore).installed ? "MASTER_ADMIN" : "USER",
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

    const divisions: Array<any> = JSON.parse(data.getAll("leagueDivisions"));
    divisions.forEach(async (division) => {
      division.league = league.id;
    });
    await database.division.createMany({
      data: divisions,
    });

    // Set Stores
    leagueStore.set({
      installed: false,
      name: league.name,
      domain: league.domain,
      leagueAdmin: user.id,
      emailConfig: emailConfig.id,
    });

    userStore.set({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    // Send League and User Creation Email
    email.leagueCreation();

    throw redirect(303, "/");
  },
};
