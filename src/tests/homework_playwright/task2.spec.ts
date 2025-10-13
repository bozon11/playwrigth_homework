// Создайте ОДИН смоук тест со следующими шагами:

// 1. Переход на страницу https://anatoly-karpovich.github.io/demo-registration-form/
// 2. Заполните форму регистрации
// 3. Проверьте, что пользователь успешно зарегистрирован

import test, { expect } from "@playwright/test";

test.describe("[AnatoyKarpovichApp][demo-registration-form]", () => {
  const userData = {
    firstName: "Irma",
    lastName: "Barrera",
    address: "P.O. Box 473, 6095 Nec, Street",
    phone: "1-444-647-3643",
    country: "USA",
    email: "parturient.montes@protonmail.org",
    gender: "female",
    hobbies: ["Travelling", "Movies"],
    language: "English",
    skills: ["JavaScript", "Python"],
    dateOfBirth: { year: "1990", month: "December", day: "5" },
    password: "QWEqwerty",
  };

  test("Successful user registration", async ({ page }) => {
    const url = "https://anatoly-karpovich.github.io/demo-registration-form/";
    const pageTitle = "Registration Details";
    const firstName = page.locator("#firstName");
    const lastName = page.locator("#lastName");
    const address = page.locator("#address");
    const emailAddress = page.locator("#email");
    const phone = page.locator("#phone");
    const countryDropdown = page.locator("#country");
    const genderRadio = page.locator(`//input[@value='${userData.gender}']`);
    const hobbies = page.locator('input.hobby[value="Travelling"]');
    const language = page.locator("#language");
    const skills = page.locator("#skills");
    const yearSelect = page.locator("#year");
    const monthSelect = page.locator("#month");
    const daySelect = page.locator("#day");
    const password = page.locator("#password");
    const confirmPassword = page.locator("#password-confirm");
    const submitButtn = page.locator('//button[@type="submit"]');
    const successMessage = page.locator('//h2[contains(text(),"Registration Details")]');

    await page.goto(url);
    await firstName.fill(userData.firstName);
    await lastName.fill(userData.lastName);
    await address.fill(userData.address);
    await emailAddress.fill(userData.email);
    await phone.fill(userData.phone);
    await countryDropdown.selectOption(userData.country);
    await expect(countryDropdown).toHaveValue(userData.country);
    await genderRadio.check();
    await expect(genderRadio).toBeChecked();
    await hobbies.check();
    await expect(hobbies).toBeChecked();
    await language.fill(userData.language);
    await skills.selectOption(userData.skills);
    await expect(skills).toHaveValues(userData.skills);
    await yearSelect.selectOption(userData.dateOfBirth.year);
    await monthSelect.selectOption(userData.dateOfBirth.month);
    await daySelect.selectOption(userData.dateOfBirth.day);
    await expect(yearSelect).toHaveValue(userData.dateOfBirth.year);
    await expect(monthSelect).toHaveValue(userData.dateOfBirth.month);
    await expect(daySelect).toHaveValue(userData.dateOfBirth.day);
    await password.fill(userData.password);
    await confirmPassword.fill(userData.password);
    await submitButtn.click();
    await expect(successMessage).toHaveText(pageTitle);
  });
});
