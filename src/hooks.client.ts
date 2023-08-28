import * as Sentry from "@sentry/sveltekit";
import { PUBLIC_SENTRY, PUBLIC_SENTRY_DSN } from "$env/static/public";

const sentryEnabled = PUBLIC_SENTRY === "true";

Sentry.init({
  dsn: PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [new Sentry.Replay()],
  environment: import.meta.env.PROD ? "production" : "development",
  enabled: sentryEnabled,
});

console.log("Hello from hooks.client.ts");
export const handleError = Sentry.handleErrorWithSentry();
