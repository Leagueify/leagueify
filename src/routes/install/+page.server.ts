// 3rd Party Imports
import { redirect } from "@sveltejs/kit";
// Type Imports
import type { Actions, PageServerLoad } from "./$types";
// Leagueify Imports
import * as account from "$lib/server/account";
import database from "$lib/server/database";
import * as email from "$lib/server/email";
import * as league from "$lib/server/league";
import { UserRoles } from "$lib/interfaces";

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
    const data: FormData = await request.formData();
    data.set("domain", request.headers.get("host") as string);

    // TODO: Move to Transaction
    const installUser = await account.create(data, UserRoles.MASTER_ADMIN);
    const installEmailConfig = await email.createConfig(data);
    const installLeague = await league.create(data, installEmailConfig.id);
    await league.createPositions(data, installLeague.id);
    await league.createDivisions(data, installLeague.id);

    // Set Cookie to installed and set expiration to 1 day from now
    cookies.set("Leagueify-Installed", "installed", {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      path: "/",
    });

    email.leagueCreation(installUser, installLeague);

    throw redirect(303, "/");
  },
};
