import { redirect } from "@sveltejs/kit";
import { get } from "svelte/store";

import type { Handle } from "@sveltejs/kit";

import database from "$lib/server/database";
import { leagueStore } from "$lib/stores";

export const handle = (async ({ event, resolve }) => {
  // If League is not installed, redirect to install page
  if (!get(leagueStore).installed) {
    if (event.url.pathname === "/install") {
      return await resolve(event);
    }

    // Need to update validation method
    // Based on User?
    const league = await database.league.findUnique({
      where: {
        domain: event.url.hostname,
      },
    });

    if (!league?.isActive) {
      throw redirect(307, "/install");
    }

    // Set League as Installed
    leagueStore.set({ installed: true });
  }

  // If user attempts to access install page, redirect to home page
  if (event.url.pathname === "/install") {
    throw redirect(307, "/");
  }

  // Handle all other requests
  const response = await resolve(event);
  return response;
}) satisfies Handle;
