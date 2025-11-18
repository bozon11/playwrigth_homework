import { SalesPortalPage } from "../salesPortal.page";

export class ProductConfirmationModal extends SalesPortalPage {
  readonly uniqueElement = this.page.locator(".modal-dialog");

  readonly title = this.uniqueElement.locator("h5");
  readonly closeButton = this.uniqueElement.locator("button.btn-close");
  readonly confirmButton = this.uniqueElement.locator("button.btn-danger");
  readonly cancelButton = this.uniqueElement.locator("button.btn-secondary");

  async clickClose() {
    await this.closeButton.click();
  }

  async clickCancel() {
    await this.cancelButton.click();
  }

  async clickConfirm() {
    await this.confirmButton.click();
  }
}
