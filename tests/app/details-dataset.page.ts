import { expect, type Locator, type Page } from '@playwright/test';

export class DatasetDetailsPage {
  readonly page: Page;
  readonly datasetTitle: Locator;
  readonly buttonListDatasetVersion1: Locator;
  readonly buttonListDatasetVersion2: Locator;
  readonly buttonAddDatasetVersion: Locator;

  constructor(page: Page) {
    this.page = page;

    this.datasetTitle = page.locator("#dataset-title")
    this.buttonListDatasetVersion1 = page.getByRole('button', { name: 'Version 1' })
    this.buttonListDatasetVersion2 = page.getByRole('button', { name: 'Version 2' })
    this.buttonAddDatasetVersion = page.getByRole('button', { name: 'add New Version' })
  }

  async goto(datasetId: string) {
    await this.page.goto(`/app/datasets/${datasetId}`);
    await expect(async () => { await this.datasetTitle.isVisible() }).toPass()
  }

  async openNewVersionDrawer() {
    await this.buttonAddDatasetVersion.click()
  }
}