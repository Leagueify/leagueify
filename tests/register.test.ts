import { expect, test } from "@playwright/test";

test("League form is present when league is not installed", async ({
  page,
}) => {
  await page.goto("/register");
  expect(await page.isVisible("#leagueName")).toBe(true);
  expect(await page.isVisible("#leagueSport")).toBe(true);
  expect(await page.isVisible("#outboundEmail")).toBe(true);
});
