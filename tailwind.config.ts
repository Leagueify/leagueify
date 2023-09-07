// 3rd Party Imports
import { skeleton } from "@skeletonlabs/tw-plugin";
import { join } from "path";
// Type Imports
import type { Config } from "tailwindcss";

const config = {
  darkMode: "class",
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    join(
      require.resolve("@skeletonlabs/skeleton"),
      "../**/*.{html,js,svelte,ts}"
    ),
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
    skeleton({
      themes: {
        preset: [
          { name: "skeleton", enhancements: true },
        ]
      }
    }),
  ],
} satisfies Config;

export default config;
