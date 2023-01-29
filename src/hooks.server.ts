import * as Sentry from "@sentry/node";
import "@sentry/tracing";
import { redirect } from "@sveltejs/kit";
import { get } from "svelte/store";

import type { Handle, HandleServerError } from "@sveltejs/kit";

import {
  PUBLIC_SENTRY,
  PUBLIC_SENTRY_DSN,
  PUBLIC_SENTRY_ENV,
} from "$env/static/public";
import * as database from "$lib/server/database";
import { League } from "$lib/server/models/league";
import { leagueData } from "$lib/stores";

const sentryDisabled = PUBLIC_SENTRY === "false" || false;

if (!sentryDisabled) {
  Sentry.init({
    dsn: PUBLIC_SENTRY_DSN,
    environment: PUBLIC_SENTRY_ENV,
    tracesSampleRate: 1.0,
  });
}

export const handle = (async ({ event, resolve }) => {
  // Ensure we don't redirect to /register if we're already on /register
  if (event.url.pathname === "/install") {
    const response = await resolve(event);
    return response;
  }

  // Redirect to /isntall if Leaugeify isn't installed
  if (!get(leagueData).installed) {
    const db = await database.connect();
    const league = await League.findOne({});
    await db.disconnect();

    if (!league) {
      throw redirect(307, "/install");
    }

    leagueData.set({ installed: true, name: league.name });
  }

  // Handle all other requests
  const response = await resolve(event);
  return response;
}) satisfies Handle;

export const handleError = (({ error, event }) => {
  if (!sentryDisabled) {
    Sentry.setTag("Leagueify", "Backend");
    Sentry.captureException(error, { event });

    return {
      message: "Whoops!",
      code: error ?? "UNKNOWN",
    };
  }
}) satisfies HandleServerError;
