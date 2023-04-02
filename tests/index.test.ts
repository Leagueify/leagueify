import { expect, test } from "@playwright/test";

test("Redirect to /register when league is not installed", async ({ page }) => {
  await page.goto("/");
  expect(page.url()).toContain("/register");
});
