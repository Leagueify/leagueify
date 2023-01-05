import { redirect } from "@sveltejs/kit";
import { get } from "svelte/store";

import type { LayoutServerLoad } from "./$types";

import * as database from "$lib/server/database";
import { League } from "$lib/server/models/league";
import { leagueify } from "$lib/stores";

export const load: LayoutServerLoad = async ({ url }) => {
  const activeLeague = await getLeague();
  const isInstalled = installed();

  // Redirect to register if not installed
  if (!isInstalled && !activeLeague && url.pathname !== "/register") {
    throw redirect(302, "/register");
  }

  // When a League is created mark as installed
  if (activeLeague) {
    // Install Leagueify
    leagueify.install();
  }
};

async function getLeague() {
  const db = await database.connect();
  const leagueData = await League.findOne({}).exec();

  await database.disconnect(db);

  if (leagueData) {
    return true;
  }

  return false;
}

function installed() {
  return get(leagueify);
}
