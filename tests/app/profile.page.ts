import { type Locator, type Page } from '@playwright/test';

export class ProfilePage {
  readonly page: Page;
  readonly getNameText: Locator;
  readonly getEmailText: Locator;
  readonly getProviderText: Locator;

  constructor(page: Page) {
    this.page = page;

    this.getNameText = page.locator("#name")
    this.getEmailText = page.locator("#email")
    this.getProviderText = page.locator("#providers")
  }

  async goto() {
    await this.page.goto('/app/profile');
  }
}