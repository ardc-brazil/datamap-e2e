import { expect, type Locator, type Page } from '@playwright/test';

export class DatasetDetailsPage {
  readonly page: Page;
  readonly datasetTitle: Locator;

  constructor(page: Page) {
    this.page = page;

    this.datasetTitle = page.locator("#dataset-title")
  }

  async goto(datasetId: string) {
    await this.page.goto(`/app/datasets/${datasetId}`);
    await expect(async () => { await this.datasetTitle.isVisible() }).toPass()
  }
}