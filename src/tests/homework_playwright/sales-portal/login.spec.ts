// Написать Page Object класс для страницы Sign In:
//   - email input
//   - password input
//   - login button
//   - fillCredentials method
//   - click on login button method

import { test, expect } from "fixtures/pages.fixture";
import { credentials } from "config/env";

test.describe("Sales portal", () => {
  test("Should successfuly login", async ({ loginPage }) => {
    await loginPage.goto();
    await expect(loginPage.emailInput).toBeVisible();
    await loginPage.login(credentials.username, credentials.password);
    await loginPage.clickLoginButton();
    await expect(loginPage.welcomeText).toBeVisible();
    await expect(loginPage.spinner).toHaveCount(0);
  });
});
