import * as Sentry from "@sentry/node";
import "@sentry/tracing";

import type { HandleServerError } from "@sveltejs/kit";

const SENTRY_DSN = process.env.SENTRY_DSN ?? null;
const ENVIRONMENT = process.env.ENVIRONMENT;

export const handleError = (({ error, event }) => {
  if (SENTRY_DSN) {
    Sentry.init({
      dsn: SENTRY_DSN,
      environment: ENVIRONMENT,
      tracesSampleRate: 1.0,
    });

    Sentry.setTag("Leagueify", "Backend");
    Sentry.captureException(error, { event });

    return {
      message: "Whoops!",
      code: error ?? "UNKNOWN",
    };
  }
}) satisfies HandleServerError;
