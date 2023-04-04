import { redirect } from "@sveltejs/kit";
import { get } from "svelte/store";
import type { Actions, PageServerLoad } from "./types";

import database from "$lib/server/database";
import { leagueStore } from "$lib/stores";

const leagueInstalled = get(leagueStore).installed;

const data: object = {};

export const load = (async () => {
  if (!leagueInstalled) {
    data.supportedSports = await database.sport.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return data;
  }
}) satisfies PageServerLoad;

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    data.append("domain", request.headers.get("host"));

    console.log(data);

    throw redirect(303, "/");
  },
} satisfies Actions;
