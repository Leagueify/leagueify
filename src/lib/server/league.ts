// 3rd Party Imports
import { redirect } from "@sveltejs/kit";
// Type Imports
import type { LeagueData } from "$lib/interfaces";
import type { RequestEvent } from "@sveltejs/kit";
// Leagueify Imports
import * as account from "$lib/server/account";
import database from "$lib/server/database";

export async function activate(event: RequestEvent) {
  await database.league.update({
    where: {
      domain: event.url.hostname,
    },
    data: {
      isActive: true,
    },
  });

  // Set Installation Cookie
  event.cookies.set("Leagueify-Installed", "active", {
    expires: new Date(Date.now() + 100 * 60 * 50 * 24),
    path: "/",
  });

  await account.activate(event);
}

export async function create(data: FormData, emailConfig: number) {
  // Parse Form Data
  const submittedLeagueData: LeagueData = {
    name: data.get("leagueName") as string,
    domain: data.get("domain") as string,
    sport: Number.parseInt(data.get("leagueSport") as string),
    emailConfig: emailConfig,
  };

  return database.league.create({
    data: submittedLeagueData,
  });
}

export async function createDivisions(data: FormData, leagueId: number) {
  // Parse Form Data
  const divisionData: string = data.get("leagueDivisions") as string;
  const submittedDivisions: Array<any> = JSON.parse(divisionData);

  submittedDivisions.forEach(async (division) => {
    division.league = leagueId;
  });

  return database.division.createMany({
    data: submittedDivisions,
  });
}

export async function createPositions(data: FormData, leagueId: number) {
  // Parse Form Data
  const positionData: string = data.get("leaguePositions") as string;
  const submittedPositions: Array<any> = [];
  positionData.split(",").forEach(async (position: string) => {
    submittedPositions.push({
      name: position,
      league: leagueId,
    });
  });
  return database.position.createMany({
    data: submittedPositions,
  });
}

export async function isInstalled(event: RequestEvent, route: string) {
  const installationState = event.cookies.get("Leagueify-Installed");

  event.locals = {
    installationState: installationState,
    ...event.locals,
  };

  // If installation cookie is not set
  if (installationState !== "active") {
    // Check database for an active league with the current domain
    const league = await database.league.findFirst({
      where: {
        domain: event.url.hostname,
      },
    });

    event.locals = {
      league: league,
      ...event.locals,
    };

    // If no league is found, redirect to installation route
    if (!league?.isActive && route !== "/install") {
      throw redirect(307, "/install");
    } else if (!league?.isActive && route === "/install") {
      return;
    }

    // Update Installation Cookie
    event.cookies.set("Leagueify-Installed", "active", {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      path: "/",
    });
  }

  // If on installation route, redirect to index
  if (route === "/install") {
    throw redirect(307, "/");
  }
}
