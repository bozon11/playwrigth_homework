// Написать Page Object класс для страницы Sign In:
//   - email input
//   - password input
//   - login button
//   - fillCredentials method
//   - click on login button method

import { test, expect } from "fixtures/pages.fixture";
import { credentials } from "config/env";
import { HomePage } from "ui/pages/home.page";

test.describe("Sales portal", () => {

  test("Should successfuly login", async ({ loginPage, homePage }) => {
    await loginPage.open();

    await expect(loginPage.emailInput).toBeVisible();
    await loginPage.login(credentials.username, credentials.password);
    await loginPage.clickLoginButton();
    await homePage.waitForOpened();
  });
});
