// 3rd Party Imports
import { redirect } from "@sveltejs/kit";
// Type Imports
import type { Handle } from "@sveltejs/kit";
// Leagueify Imports
import * as account from "$lib/server/account";
import * as auth from "$lib/utils/auth";
import * as league from "$lib/server/league";

// Handle Requests
export const handle = (async ({ event, resolve }) => {
  const route = event.url.pathname;

  // Handle Activation Routes
  if (route.includes("/activate")) {
    const activationToken: string = event.url.searchParams.get(
      "token"
    ) as string;
    const activationType: string = route.replace("/activate/", "");

    if (activationType === "league" && (await auth.verifyAuth(activationToken)))
      await league.activate(event);

    if (
      activationType === "account" &&
      (await auth.verifyAuth(activationToken))
    )
      await account.activate(event);

    throw redirect(303, "/");
  }

  await league.isInstalled(event, route);
  await account.isAuthenticated(event);

  // Handle all other requests
  const response = await resolve(event);
  return response;
}) satisfies Handle;
