import type { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  reporter: [
    [
      "junit",
      {
        embedAttachmentsAsProperty: "testrun_evidence",
        outputFile: "test-results/results.xml",
      },
    ],
  ],
  webServer: {
    command: "npm run build && npm run preview",
    port: 4173,
  },
  testDir: "tests",
};

export default config;
