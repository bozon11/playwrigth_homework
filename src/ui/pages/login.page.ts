import { Page, Locator } from "@playwright/test";
import { SALES_PORTAL_URL } from "config/env";

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly spinner: Locator;
  readonly welcomeText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('input[id="emailinput"]');
    this.passwordInput = page.locator('input[id="passwordinput"]');
    this.loginButton = page.locator('button[type="submit"]');
    this.spinner = page.locator(".spinner-border");
    this.welcomeText = page.locator(".welcome-text");
  }

  async goto() {
    await this.page.goto(SALES_PORTAL_URL);
  }

  async login(username: string, password: string) {
    await this.emailInput.fill(username);
    await this.passwordInput.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }
}
