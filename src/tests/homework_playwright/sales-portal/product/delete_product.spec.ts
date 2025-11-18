// Создайте e2e тест со следующими шагами:
// 1. Зайти на сайт Sales Portal
// 2. Залогиниться с вашими кредами
// 3. Перейти на страницу Products List
// 4. Перейти на станицу Add New Product
// 5. Создать продукта
// 6. Проверить наличие продукта в таблице
// 7. Кликнуть на кнопку "Delete" в таблице для созданного продукта
// 8. В модалке удаления кликнуть кнопку Yes, Delete
// 9. Дождаться исчезновения модалки и загрузки страницы
// 10. Проверить, что продукт отсутствует в таблице

// Вам понадобится:

// - PageObject модалки удаления продукта
// - Подключить модалку в PageObject страницы Products
// - Использовать фикстуры

import { test, expect } from "fixtures/pages.fixture";
import { credentials } from "config/env";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import _ from "lodash";

test.describe("Sales portal", () => {
  test("Add and delete product", async ({ loginPage, homePage, productsListPage, addNewProductPage }) => {
    await loginPage.goto();
    await loginPage.login(credentials.username, credentials.password);
    await loginPage.clickLoginButton();
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

    await expect(productsListPage.tableRowByName(productData.name)).toBeVisible();
    await expect(productsListPage.allRows.first()).toContainText(productData.name);

    const productFromTable = await productsListPage.getProductData(productData.name);
    const expected = _.omit(productData, ["notes", "amount"]);
    const actual = _.omit(productFromTable, ["createdOn"]);
    expect(actual).toMatchObject(expected);

    await productsListPage.clickDeleteProduct(productData.name);

    const { deleteModal } = productsListPage;
    await expect(deleteModal.uniqueElement).toBeVisible();
    await deleteModal.clickConfirm();

    await productsListPage.waitForOpened();
    await expect(productsListPage.toastMessage.last()).toContainText(NOTIFICATIONS.PRODUCT_DELETED);

    await expect(deleteModal.uniqueElement).toHaveCount(0);
    await productsListPage.waitForOpened();

    await expect(productsListPage.tableRowByName(productData.name)).toHaveCount(0);
  });
});
