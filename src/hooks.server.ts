import * as Sentry from "@sentry/node";
import "@sentry/tracing";

import type { HandleServerError } from "@sveltejs/kit";

import { PUBLIC_SENTRY_DSN, PUBLIC_SENTRY_ENV } from "$env/static/public";

if (PUBLIC_SENTRY_DSN) {
  Sentry.init({
    dsn: PUBLIC_SENTRY_DSN,
    environment: PUBLIC_SENTRY_ENV,
    tracesSampleRate: 1.0,
  });
}

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
