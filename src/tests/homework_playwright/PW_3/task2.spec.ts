// Создать функцию getTableRow(page, email), которая возвращает строку в таблице по емейлу.
// Например getTableRow(page, 'jsmith@gmail.com') => { "Last Name": "Smith", "First Name": "John", Email: "jsmith@gmail.com", Due: "$50.00", "Web Site": "http://www.jsmith.com" }

// Создайте тест, проверяющий данную функцию, используя все емейлы из таблицы Example 2

// Сайт: https://the-internet.herokuapp.com/tables

import test, { expect } from "@playwright/test";

async function getTableRow(page, email) {
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
  return headers.reduce((obj, key, index) => {
    obj[key] = cells[index];
    return obj;
  }, {});
}
test.describe("[Heroku App] Table", () => {
  const expectedUsers = [
    {
      "Last Name": "Smith",
      "First Name": "John",
      Email: "jsmith@gmail.com",
      Due: "$50.00",
      "Web Site": "http://www.jsmith.com",
    },
    {
      "Last Name": "Bach",
      "First Name": "Frank",
      Email: "fbach@yahoo.com",
      Due: "$51.00",
      "Web Site": "http://www.frank.com",
    },
    {
      "Last Name": "Doe",
      "First Name": "Jason",
      Email: "jdoe@hotmail.com",
      Due: "$100.00",
      "Web Site": "http://www.jdoe.com",
    },
    {
      "Last Name": "Conway",
      "First Name": "Tim",
      Email: "tconway@earthlink.net",
      Due: "$50.00",
      "Web Site": "http://www.timconway.com",
    },
  ];
  expectedUsers.forEach((expectedUser) => {
    test(`Search row by ${expectedUser.Email}`, async ({ page }) => {
      await page.goto("https://the-internet.herokuapp.com/tables");
      const result = await getTableRow(page, expectedUser.Email);
      expect(result).toEqual(expectedUser);
    });
  });
});
