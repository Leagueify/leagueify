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
    command: "npm run dev",
    port: 3000,
  },
  testDir: "tests",
};

export default config;
