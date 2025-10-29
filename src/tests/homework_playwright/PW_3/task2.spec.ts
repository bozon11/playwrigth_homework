// Создать функцию getTableRow(page, email), которая возвращает строку в таблице по емейлу.
// Например getTableRow(page, 'jsmith@gmail.com') => { "Last Name": "Smith", "First Name": "John", Email: "jOpen a pull requestsmith@gmail.com", Due: "$50.00", "Web Site": "http://www.jsmith.com" }

// Создайте тест, проверяющий данную функцию, используя все емейлы из таблицы Example 2

// Сайт: https://the-internet.herokuapp.com/tables

import test, { expect, Page } from "@playwright/test";
import expectedUsers from "./test_data/table.data";

async function getTableRow(page: Page, email: string): Promise<Record<string, string>> {
  //Get allHeaders
  const table = page.locator("#table2");
  const headersLocators = await table.locator("th").all();
  headersLocators.pop();
  const headers = await Promise.all(headersLocators.map((el) => el.innerText()));
  //Find row by email
  const row = table.locator(`tbody tr:has(td:has-text("${email}"))`);
  //Take row's values
  const cells = await row.locator("td").allTextContents();
  //Result object as {header:cell}
  return headers.reduce<Record<string, string>>((obj, key, index) => {
    obj[key] = cells[index] ?? "";
    return obj;
  }, {});
}

test.describe("[Heroku App] Table", () => {
  expectedUsers.forEach((expectedUser) => {
    test(`Search row by ${expectedUser.Email}`, async ({ page }) => {
      await page.goto("https://the-internet.herokuapp.com/tables");
      const result = await getTableRow(page, expectedUser.Email);
      expect(result).toEqual(expectedUser);
      console.log(result);
    });
  });
});
