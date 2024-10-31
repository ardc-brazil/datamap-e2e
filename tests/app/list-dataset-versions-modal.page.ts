import { expect, type Locator, type Page } from '@playwright/test';

export class DatasetVersionsHistoryModal {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly modalContent: Locator;
  readonly historyVersionsList: Locator;
  readonly buttonNewVersion: Locator;
  readonly buttonCancel: Locator;
  readonly buttonCloseWindow: Locator;

  constructor(page: Page) {
    this.page = page;

    this.pageTitle = page.getByRole('heading', { name: 'History' })
    this.modalContent = page.getByTestId("dataset-version-history-modal-content")
    this.historyVersionsList = page.getByTestId("dataset-version-history-modal-list")

    this.buttonNewVersion = page.getByRole('button', { name: 'add New Version' }).first()
    this.buttonCloseWindow = page.getByRole('button', { name: '×' })
    this.buttonCancel = page.getByRole('button', { name: 'Cancel' })
  }

  async goto() {
    await this.page.goto('/app/datasets/new');
    await expect(async () => { await this.pageTitle.isVisible() }).toPass()
  }
}