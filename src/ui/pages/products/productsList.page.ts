import { MANUFACTURERS } from "data/salesPortal/products/manufactures";
import { SalesPortalPage } from "../salesPortal.page";
import { IProductInTable } from "data/types/product.types";

export class ProductsListPage extends SalesPortalPage {
  readonly productsPageTitle = this.page.locator("h2.fw-bold");
  readonly addNewProductButton = this.page.locator('[name="add-button"]');
  get allRows() {
    return this.page.locator("table tbody tr");
  }
  readonly tableRowByName = (productName: string) => this.page.locator("table tbody tr", { has: this.page.locator("td", { hasText: productName }) });
  readonly nameCell = (productName: string) => this.tableRowByName(productName).locator("td").nth(0);
  readonly priceCell = (productName: string) => this.tableRowByName(productName).locator("td").nth(1);
  readonly manufacturerCell = (productName: string) => this.tableRowByName(productName).locator("td").nth(2);
  readonly createdOnCell = (productName: string) => this.tableRowByName(productName).locator("td").nth(3);

  readonly uniqueElement = this.addNewProductButton;

  async clickAddNewProduct() {
    await this.addNewProductButton.click();
  }

  async getProductData(productName: string): Promise<IProductInTable> {
    const [name, price, manufacturer, createdOn] = await this.tableRowByName(productName).locator("td").allInnerTexts();

    return {
      name: name!,
      price: +price!.replace("$", ""),
      manufacturer: manufacturer as MANUFACTURERS,
      createdOn: createdOn!,
    };
  }
}
