import { expect, test } from "@playwright/test";

test("League form is present when league is not installed", async ({
  page,
}) => {
  await page.goto("/register");

  expect(await page.isVisible("#leagueName")).toBe(true);
  expect(await page.isVisible("#leagueSport")).toBe(true);
  expect(await page.isVisible("#outboundEmail")).toBe(true);
});

test("League name error message is present when league form is submitted without name", async ({
  page,
}) => {
  await page.goto("/register");
  await page.selectOption("#leagueSport", "Hockey");
  await page.fill("#outboundEmail", "noreply@leagueify.org");
  await page.click("#registerButton");
  await page.waitForLoadState("networkidle");

  expect(await page.isVisible("#leagueNameRequirements")).toBe(true);
  expect(await page.isHidden("#leagueSportRequirements")).toBe(true);
  expect(await page.isHidden("#leagueOutboundEmail")).toBe(true);
});

test("League sport error message is present when league form is submitted without sport", async ({
  page,
}) => {
  await page.goto("/register");
  await page.fill("#leagueName", "Leagueify");
  await page.fill("#outboundEmail", "noreply@leagueify.org");
  await page.click("#registerButton");
  await page.waitForLoadState("networkidle");

  expect(await page.isHidden("#leagueNameRequirements")).toBe(true);
  expect(await page.isVisible("#leagueSportRequirements")).toBe(true);
  expect(await page.isHidden("#leagueOutboundEmail")).toBe(true);
});

test("League outbound email error message is present when league form is submitted without outbound email", async ({
  page,
}) => {
  await page.goto("/register");
  await page.fill("#leagueName", "Leagueify");
  await page.selectOption("#leagueSport", "Hockey");
  await page.click("#registerButton");
  await page.waitForLoadState("networkidle");

  expect(await page.isHidden("#leagueNameRequirements")).toBe(true);
  expect(await page.isHidden("#leagueSportRequirements")).toBe(true);
  expect(await page.isVisible("#leagueOutboundEmail")).toBe(true);
});
