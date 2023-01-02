import * as Sentry from "@sentry/svelte";
import { BrowserTracing } from "@sentry/tracing";

import type { HandleClientError } from "@sveltejs/kit";

import { PUBLIC_SENTRY_DSN, PUBLIC_SENTRY_ENV } from "$env/static/public";

if (PUBLIC_SENTRY_DSN) {
  Sentry.init({
    dsn: PUBLIC_SENTRY_DSN,
    environment: PUBLIC_SENTRY_ENV,
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0,
  });
}

export const handletError = (({ error, event }) => {
  if (PUBLIC_SENTRY_DSN) {
    const errorId = crypto.randomUUID()

    Sentry.setTag("Leagueify", "Frontend");
    Sentry.captureException(error, { event, errorId });

    return {
      message: "Whoops!",
      code: errorId,
    };
  }
}) satisfies HandleClientError;
