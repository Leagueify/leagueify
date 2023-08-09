// 3rd Party Imports
import { redirect } from "@sveltejs/kit";
// Type Imports
import type { Handle, RequestEvent } from "@sveltejs/kit";
// Leagueify Imports
import database from "$lib/server/database";
import * as auth from "$lib/utils/auth";

// Handle Requests
export const handle = (async ({ event, resolve }) => {
  const route = event.url.pathname;

  await userAuthentication(event, route);

  // Handle Activation Routes
  if (route.includes("/activate")) {
    await activate(event);
  }

  // Handle Installation
  await checkInstallation(event, route);

  // Handle all other requests
  const response = await resolve(event);
  // console.log(response)
  return response;
}) satisfies Handle;

async function activate(event: RequestEvent) {
  const activationType: string = event.url.pathname.replace("/activate/", "");
  const activationToken: string = event.url.searchParams.get("token") || "";

  const validToken = await auth.verifyAuth(activationToken);

  if (validToken) {
    const authToken = auth.generateToken(64);
    // Activate User
    const user = await database.user.update({
      where: {
        token: activationToken,
      },
      data: {
        token: authToken,
        expiration: auth.generateTokenExpiration(1440),
        isActive: true,
      },
    });
    // If activation type is league, activate league
    if (activationType === "league") {
      await database.league.update({
        where: {
          domain: event.url.hostname,
        },
        data: {
          isActive: true,
        },
      });
    }
    // Set Cookies
    event.cookies.set("Leagueify-Token", authToken, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      path: "/",
    });

    event.locals = {
      user: user,
      ...event.locals,
    };
  }

  throw redirect(303, "/");
}

async function checkInstallation(event: RequestEvent, route: string) {
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

async function userAuthentication(event: RequestEvent, route: string) {
  const token = event.cookies.get("Leagueify-Token");

  if (token && await auth.verifyAuth(token, true)) {
    const user = await database.user.findFirst({
      where: {
        token: token,
      },
    });

    event.locals = {
      user: user,
      ...event.locals,
    };
  }
}
