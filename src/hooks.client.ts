import * as Sentry from "@sentry/svelte";
import { BrowserTracing } from "@sentry/tracing";
import type { HandleClientError } from "@sveltejs/kit";

import {
  PUBLIC_SENTRY,
  PUBLIC_SENTRY_DSN,
  PUBLIC_SENTRY_ENV,
} from "$env/static/public";

const sentryDisabled = PUBLIC_SENTRY === "false" || false;

if (!sentryDisabled) {
  Sentry.init({
    dsn: PUBLIC_SENTRY_DSN,
    environment: PUBLIC_SENTRY_ENV,
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0,
  });
}

export const handleError = (({ error, event }) => {
  if (!sentryDisabled) {
    const errorId = crypto.randomUUID();

    Sentry.setTag("Leagueify", "Frontend");
    Sentry.captureException(error, { event, errorId });

    return {
      message: "Whoops!",
      code: errorId,
    };
  }
}) satisfies HandleClientError;
