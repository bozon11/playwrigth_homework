// Разработать тест со следующими шагами:
//   - открыть https://anatoly-karpovich.github.io/demo-login-form/
//   - Засунуть в localStorage браузера данные test@gmail.com / SecretPw123!@# для логина на сайт
//   - Залогиниться с данными что вы вставили в localStorage
//   - Завалидировать успешный логин

//   Рекоммендации:
//   - Для доступа к localStorage используйте https://playwright.dev/docs/evaluating

import test, { expect } from "@playwright/test";

test.describe("[AnatoyKarpovichApp][demo-login-form/]", () => {
  const url = "https://anatoly-karpovich.github.io/demo-login-form/";

  test("Should takes localStorage data and log in", async ({ page }) => {
    const user = {
      username: "test@gmail.com",
      password: "SecretPw123!@#",
    };

    await page.goto(url);

    await page.evaluate((user) => {
      localStorage.setItem(user.username, JSON.stringify({ name: user.username, password: user.password }));
    }, user);

    const storedData = await page.evaluate(() => {
      const username = localStorage.getItem("name");
      const password = localStorage.getItem("password");
      return JSON.stringify({ username, password });
    });

    const emailInput = page.locator("#userName");
    const passwordInput = page.locator("#password");

    await emailInput.fill(user.username);
    await passwordInput.fill(user.password);

    const loginButton = page.locator("#submit");
    await loginButton.click();

    await expect(page.locator("#successMessage")).toHaveText(`Hello, ${user.username}!`);
  });
});
