import { redirect } from "@sveltejs/kit";
import { get } from "svelte/store";

import type { Handle } from "@sveltejs/kit";

import database from "$lib/server/database";
import { leagueStore } from "$lib/stores";

export const handle = (async ({ event, resolve }) => {
  if (event.url.pathname === "/register") {
    const response = await resolve(event);
    return response;
  }

  if (!get(leagueStore).installed) {
    // This request will be changed in the 1.0.0 release
    // Currently, this is for testing purposes
    // This validation will be updated with new validation method
    const league = await database.league.findUnique({
      where: {
        domain: event.url.hostname,
      },
    });

    if (!league) {
      throw redirect(307, "/register");
    }

    leagueStore.set({ installed: true });
  }

  const response = await resolve(event);
  return response;
}) satisfies Handle;
