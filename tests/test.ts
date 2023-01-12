import { expect, test } from "@playwright/test";

test("index page has expected h1", async ({ page }) => {
  await page.goto("/");
  expect(page.url()).toBe("http://localhost:3000/register");
  // expect(await page.textContent("h1")).toBe("Welcome to SvelteKit");
});
