import * as Sentry from "@sentry/node";
import "@sentry/tracing";
import { get } from "svelte/store";

import type { Handle, HandleServerError } from "@sveltejs/kit";

import { PUBLIC_SENTRY_DSN, PUBLIC_SENTRY_ENV } from "$env/static/public";
import { leagueData } from "$lib/stores";

if (PUBLIC_SENTRY_DSN) {
  Sentry.init({
    dsn: PUBLIC_SENTRY_DSN,
    environment: PUBLIC_SENTRY_ENV,
    tracesSampleRate: 1.0,
  });
}

export const handle = (async ({ event, resolve }) => {
  if (!get(leagueData).name) {
    console.log("No Data")
  }

  console.log(get(leagueData).name)

  leagueData.update((data) => {
    return {
      ...data,
      name: "League Name",
    };
  });


  if (event.url.pathname.startsWith('/custom')) {
    return new Response('custom response');
  }

  const response = await resolve(event);
  return response;
}) satisfies Handle;

export const handleError = (({ error, event }) => {
  if (PUBLIC_SENTRY_DSN) {
    Sentry.setTag("Leagueify", "Backend");
    Sentry.captureException(error, { event });

    return {
      message: "Whoops!",
      code: error ?? "UNKNOWN",
    };
  }
}) satisfies HandleServerError;
