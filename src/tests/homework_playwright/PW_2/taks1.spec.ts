// Разработать тест со следующими шагами:
//   - открыть https://the-internet.herokuapp.com/
//   - перейти на страницу Dynamic Controls
//   - Дождаться появления кнопки Remove
//   - Завалидировать текста в заголовке страницы
//   - Чекнуть чекбокс
//   - Кликнуть по кнопке Remove
//   - Дождаться исчезновения чекбокса
//   - Проверить наличие кнопки Add
//   - Завалидировать текст It's gone!
//   - Кликнуть на кнопку Add
//   - Дождаться появления чекбокса
//   - Завалидировать текст It's back!

import test, { expect } from "@playwright/test";

test.describe("[herokuapp.com][Dynamic Controls]", () => {
  const baseUrl = "https://the-internet.herokuapp.com/";

  test("Element Waiting check", async ({ page }) => {
    await page.goto(baseUrl);
    const linkDynamicControls = page.locator('//*[@href ="/dynamic_controls"]');
    await linkDynamicControls.click();
    const removeButton = page.getByRole("button", { name: "Remove" });
    await removeButton.waitFor({ state: "visible" });
    const header = page.getByRole("heading", { level: 4, name: "Dynamic Controls" });
    await expect(header).toHaveText("Dynamic Controls");
    const checkboxRemove = page.locator('//input[@type = "checkbox"]');
    await checkboxRemove.check();
    await expect(checkboxRemove).toBeChecked();
    await removeButton.click();
    await expect(removeButton).toBeHidden();
    const addButton = page.getByRole("button", { name: "Add" });
    await addButton.waitFor({ state: "visible" });
    const removeResultText = page.locator('//p[@id = "message"]');
    await expect(removeResultText).toHaveText("It's gone!");
    await addButton.click();
    await expect(addButton).toBeHidden();
    const addResultText = page.locator('//p[@id = "message"]');
    await expect(addResultText).toHaveText("It's back!");
  });
});
