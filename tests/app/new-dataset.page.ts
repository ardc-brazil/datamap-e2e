import { expect, type Locator, type Page } from '@playwright/test';

export class NewDatasetPage {
  readonly page: Page;
  readonly titleHeader: Locator;
  readonly subtitleHeader: Locator;
  readonly instructionText: Locator;
  readonly inputDatasetTitle: Locator;
  readonly buttonBrowseFileUpload: Locator;
  readonly buttonBrowseFolderUpload: Locator;
  readonly buttonCreateDataset: Locator;
  readonly buttonViewDataset: Locator;

  constructor(page: Page) {
    this.page = page;

    this.titleHeader = page.getByRole('heading', { name: 'New Dataset' })
    this.subtitleHeader = page.getByText('Create a new dataset')
    this.instructionText = page.getByText('A dataset refers to a')
    this.inputDatasetTitle = page.getByPlaceholder('Enter dataset title');
    this.buttonBrowseFileUpload = page.getByRole('button', { name: 'browse files' })
    this.buttonBrowseFolderUpload = page.getByRole('button', { name: 'browse folders' })
    this.buttonCreateDataset = page.getByRole('button', { name: 'Create Dataset' })
    this.buttonViewDataset = page.getByRole('button', { name: "View Dataset" })
  }

  async goto() {
    await this.page.goto('/app/datasets/new');
    await expect(async () => { await this.titleHeader.isVisible() }).toPass()
  }

  async uploadFile(filePath: string) {
    // Start waiting for file chooser before clicking. Note no await.
    const fileChooserPromise = this.page.waitForEvent('filechooser', { timeout: 5000 });
    await this.buttonBrowseFileUpload.click()
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(filePath);
  }
}