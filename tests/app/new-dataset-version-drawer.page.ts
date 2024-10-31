import { expect, type Locator, type Page } from '@playwright/test';
import path from "path";

export class NewDatasetVersionDrawer {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly previouslyUploadedTitle: Locator;
  readonly previouslyUploadedList: Locator;
  readonly newUploadsTitle: Locator;

  readonly buttonCloseWindow: Locator;
  readonly buttonClearAll: Locator;
  readonly buttonCreate: Locator;

  readonly buttonBrowseFileUpload: Locator;
  readonly buttonBrowseFolderUpload: Locator;

  readonly messageCreatingNewVersion: Locator;
  readonly messageSuccessfullyNewVersionCreated: Locator;

  constructor(page: Page) {
    this.page = page;

    this.pageTitle = page.getByRole('heading', { name: 'Upload Data' })
    this.previouslyUploadedTitle = page.getByRole('heading', { name: 'Previously uploaded' })
    this.previouslyUploadedList = page.getByLabel('Upload Data').getByRole('list')
    this.newUploadsTitle = page.getByRole('heading', { name: 'New uploads' })

    this.buttonCloseWindow = page.getByRole('button', { name: 'close' }).first()
    this.buttonCreate = page.getByLabel('Upload Data').getByRole('button', { name: 'Create' })
    this.buttonClearAll = page.getByRole('button', { name: 'Clear all' })

    this.buttonBrowseFileUpload = page.getByRole('button', { name: 'browse files' })
    this.buttonBrowseFolderUpload = page.getByRole('button', { name: 'browse folders' })

    this.messageCreatingNewVersion = page.getByTestId("new-version-creating-message")
    this.messageSuccessfullyNewVersionCreated = page.getByTestId("new-version-success-message")
  }

  async goto() {
    await this.page.goto('/app/datasets/new');
    await expect(async () => { await this.pageTitle.isVisible() }).toPass()
  }

  async uploadFile(filePath: string) {
    // Start waiting for file chooser before clicking. Note no await.
    const fileChooserPromise = this.page.waitForEvent('filechooser', { timeout: 5000 });
    await this.buttonBrowseFileUpload.click()
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(filePath);
  }

  async createNewVersion() {
    await this.uploadFile(path.join(__dirname, '../fixtures/files-for-upload/file2.txt'))
    await this.buttonCreate.click()
  }

  async makeSureThatUploadedWithSuccess() {
    await expect(this.messageSuccessfullyNewVersionCreated).toBeVisible({ timeout: 15000 })
    await expect(this.messageSuccessfullyNewVersionCreated).toContainText("Success!")
    await expect(this.messageSuccessfullyNewVersionCreated).toContainText("Your dataset version was created successfully.")
  }
}