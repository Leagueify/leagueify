import { sentrySvelteKit } from "@sentry/sveltekit";
import { sveltekit } from "@sveltejs/kit/vite";
import { purgeCss } from "vite-plugin-tailwind-purgecss";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    sentrySvelteKit({
      sourceMapsUploadOptions: {
        org: "leagueify",
        project: "leagueify",
      },
    }),
    sveltekit(),
    purgeCss(),
  ],
  test: {
    include: ["src/**/*.{test,spec}.{js,ts}"],
  },
});
