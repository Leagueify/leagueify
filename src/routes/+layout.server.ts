import { redirect } from "@sveltejs/kit";
import { get } from "svelte/store";

import type { LayoutServerLoad } from "./$types";

import { leagueify } from "$lib/stores";

export const load: LayoutServerLoad = async ({ url }) => {
  // Check Leagueify Installation
  // && url.pathname !== "/register" is temporary until database is connected
  console.log(`Checking Leagueify Installation... ${installed()}`)
  if (!installed() && url.pathname !== "/register") {
    console.log(`${url.pathname}::Need to Install Leagueify.`);
    throw redirect(302, "/register");
  }

  // Install Leagueify
  // && url.pathname !== "/register" is temporary until database is connected
  if (url.pathname === "/register") {
    console.log("Installing Leagueify...");
    leagueify.install();
  }
};


function installed() {
  return get(leagueify)
}