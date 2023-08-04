// Type Imports
import type { LayoutServerLoad } from "./$types";
// Leagueify Imports
import database from "$lib/server/database";

// Layout Load Function
export const load: LayoutServerLoad = async ({ cookies, locals, url }) => {
  const leagueData = await database.league.findFirst({
    where: {
      domain: url.host,
    },
  });

  // Return Layout Data
  return {
    installedState: locals.installationState,
    league: leagueData,
    user: locals.user,
  };
};
