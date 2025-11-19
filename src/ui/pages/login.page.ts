import { Page } from "@playwright/test";
import { SalesPortalPage } from "./salesPortal.page";

export class LoginPage extends SalesPortalPage {
  readonly loginForm = this.page.locator("//form");
  readonly pageTitle = this.page.getByText("Sign in with");
  readonly emailInput = this.page.locator("#emailinput");
  readonly passwordInput = this.page.locator("#passwordinput");
  readonly loginButton = this.page.locator("button[type='submit']");
  readonly welcomeText = this.page.locator(".welcome-text");

  readonly uniqueElement = this.loginForm;

  constructor(page: Page) {
    super(page);
  }

  async login(username: string, password: string) {
    await this.emailInput.fill(username);
    await this.passwordInput.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }
}
