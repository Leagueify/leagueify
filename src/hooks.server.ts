// 3rd Party Imports
import * as Sentry from "@sentry/sveltekit";
import { redirect } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
// Type Imports
import type { Handle } from "@sveltejs/kit";
// Leagueify Imports
import * as account from "$lib/server/account";
import * as auth from "$lib/utils/auth";
import * as league from "$lib/server/league";
import { PUBLIC_SENTRY, PUBLIC_SENTRY_DSN } from "$env/static/public";

const sentryEnabled = PUBLIC_SENTRY === "true";

// Initialize Sentry
Sentry.init({
  dsn: PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1,
  environment: import.meta.env.PROD ? "production" : "development",
  enabled: sentryEnabled,
});

// Handle Requests
export const handle = sequence(Sentry.sentryHandle(), (async ({
  event,
  resolve,
}) => {
  // Set Sentry Tags
  Sentry.configureScope(function (scope) {
    scope.setTag("leagueify.url", event.url.hostname);
  });

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
}) satisfies Handle);

export const handleError = Sentry.handleErrorWithSentry();
