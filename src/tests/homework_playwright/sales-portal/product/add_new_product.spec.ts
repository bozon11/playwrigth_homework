// Разработать е2е теста со следующими шагами:
//  - Открыть Sales Portal локально поднятый в докере
//  - Войти в приложения используя учетные данные указанные в readme к проекту
//  - Создать продукт (модуль Products)
//  - Верифицировать появившуюся нотификацию
//  - Верифицировать созданный продукт в таблице (сравнить все имеющиеся поля, продукт должен быть самым верхним)

import { test, expect } from "fixtures/pages.fixture";
import { credentials } from "config/env";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import _ from "lodash";

test.describe("Sales portal", () => {
  test("Add new product", async ({ loginPage, homePage, productsListPage, addNewProductPage }) => {
    await loginPage.goto();
    await expect(loginPage.emailInput).toBeVisible();
    await loginPage.login(credentials.username, credentials.password);
    await loginPage.clickLoginButton();
    await expect(loginPage.welcomeText).toBeVisible();
    await expect(loginPage.spinner).toHaveCount(0);

    await homePage.open();

    await homePage.waitForOpened();
    await homePage.clickOnViewModule("Products");
    await productsListPage.waitForOpened();
    await productsListPage.clickAddNewProduct();
    await addNewProductPage.waitForOpened();
    const productData = generateProductData();
    await addNewProductPage.fillForm(productData);
    await addNewProductPage.clickSave();
    await productsListPage.waitForOpened();
    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);

    await expect.soft(productsListPage.tableRowByName(productData.name)).toBeVisible();
    await expect.soft((await productsListPage.allRows).first()).toContainText(productData.name);

    // await expect.soft(productsListPage.nameCell(productData.name)).toHaveText(productData.name);
    // await expect.soft(productsListPage.priceCell(productData.name)).toHaveText(`$${productData.price.toString()}`);
    // await expect.soft(productsListPage.manufacturerCell(productData.name)).toHaveText(productData.manufacturer);
    // await expect.soft(productsListPage.createdOnCell(productData.name)).toHaveText("");

    const productFromTable = await productsListPage.getProductData(productData.name);
    const epxectedProduct = _.omit(productData, ["notes", "amount"]);
    const actualProduct = _.omit(productFromTable, ["createdOn"]);
    expect(actualProduct).toMatchObject(epxectedProduct);
  });
});
