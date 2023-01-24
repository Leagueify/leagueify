import * as Sentry from "@sentry/node";
import "@sentry/tracing";
import { redirect } from "@sveltejs/kit";
import { get } from "svelte/store";

import type { Handle, HandleServerError } from "@sveltejs/kit";

import { PUBLIC_SENTRY_DSN, PUBLIC_SENTRY_ENV } from "$env/static/public";
import { leagueData } from "$lib/stores";

const sentryIntegration = process.env.SENTRY

if (!sentryIntegration) {
  Sentry.init({
    dsn: PUBLIC_SENTRY_DSN,
    environment: PUBLIC_SENTRY_ENV,
    tracesSampleRate: 1.0,
  });
}

export const handle = (async ({ event, resolve }) => {
  // Ensure we don't redirect to /register if we're already on /register
  if (event.url.pathname === "/register") {
    const response = await resolve(event);
    return response;
  }

  // Redirect to /register if Leaugeify isn't installed
  if (!get(leagueData).installed) {
    throw redirect(307, "/register");
  }

  // Handle all other requests
  const response = await resolve(event);
  return response;
}) satisfies Handle;

export const handleError = (({ error, event }) => {
  if (!sentryIntegration) {
    Sentry.setTag("Leagueify", "Backend");
    Sentry.captureException(error, { event });

    return {
      message: "Whoops!",
      code: error ?? "UNKNOWN",
    };
  }
}) satisfies HandleServerError;
