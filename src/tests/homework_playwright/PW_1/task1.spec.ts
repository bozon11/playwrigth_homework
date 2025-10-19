//   Разработайте смоук тест-сьют с тестами на REGISTER на странице https://anatoly-karpovich.github.io/demo-login-form/

//   Требования:
//     Страница регистрации:
//       Username: обязательное, от 3 до 40 символов включительно, запрещены префиксные/постфиксные пробелы, как и имя состоящее из одних пробелов
//       Password: обязательное, от 8 до 20 символов включительно, необходима хотя бы одна буква в верхнем и нижнем регистрах, пароль из одних пробелов запрещен
//     Страница логина:
//       Username: обязательное
//       Password: обязательное

import test, { expect } from "@playwright/test";

interface ICredentials {
  username: string;
  password: string;
}

enum NOTIFICATION {
  REGISTRATION_SUCCESS = "Successfully registered! Please, click Back to return on login page",
}

test.describe("[AnatoyKarpovichApp][demo-login-form]", () => {
  const validCredentials = {
    username: "Testusername",
    password: "Testuserpassword",
  };

  test.beforeEach(async ({ page }) => {
    const url = "https://anatoly-karpovich.github.io/demo-login-form/";
    await page.goto(url);
  });

  test("User can register and login with valid credentials", async ({ page }) => {
    const registerOnLoginButton = page.locator("#registerOnLogin");
    const usernameRegistration = page.locator("#userNameOnRegister");
    const passwordRegistration = page.locator("#passwordOnRegister");
    const registerOnRegistrationButton = page.locator("#register");
    const notificationSuccess = page.locator("#errorMessageOnRegister");
    const backRegstrButton = page.locator("#backOnRegister");
    const returnCheck = page.locator('//h2[@id="loginForm"]');
    const submitButton = page.locator("#submit");
    const usernameLogin = page.locator("#userName");
    const passwordLogin = page.locator("#password");
    const successMessage = page.locator("#successMessage");

    await registerOnLoginButton.click();
    await usernameRegistration.fill(validCredentials.username);
    await passwordRegistration.fill(validCredentials.password);
    await registerOnRegistrationButton.click();
    await expect(notificationSuccess).toHaveText(NOTIFICATION.REGISTRATION_SUCCESS);

    await backRegstrButton.click();
    await expect(returnCheck).toHaveText("Login");
    await usernameLogin.fill(validCredentials.username);
    await passwordLogin.fill(validCredentials.password);
    await submitButton.click();
    await expect(successMessage).toHaveText(`Hello, ${validCredentials.username}!`);
  });
});
