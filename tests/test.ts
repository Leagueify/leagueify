import { expect, test } from "@playwright/test";

test("Redirect to /register when league is not installed", async ({ page }) => {
  await page.goto("/");
  expect(page.url()).toContain("/register");
});

test("League form is present", async ({ page }) => {
  await page.goto("/");
  expect(await page.isVisible("#leagueName")).toBe(true);
  expect(await page.isVisible("#leagueSport")).toBe(true);
})
