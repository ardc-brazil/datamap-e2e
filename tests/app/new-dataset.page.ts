import { faker } from "@faker-js/faker";
import { expect, type Locator, type Page } from '@playwright/test';
import path from "path";

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
  readonly buttonGenerateDOIAutomatically: Locator;
  readonly buttonGenerateDOIAutomaticallyRegisterConfirmation: Locator;

  readonly buttonGenerateDOIManually: Locator;
  readonly buttonGenerateDOIManuallySave: Locator;
  readonly inputGenerateDOIManuallyIdentifier: Locator;

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
    this.buttonGenerateDOIAutomatically = page.getByRole('button', { name: "Generate DOI Automatically" })
    this.buttonGenerateDOIAutomaticallyRegisterConfirmation = page.getByRole('button', { name: "Register" })
    this.buttonGenerateDOIManually = page.getByRole('button', { name: 'Register Manual DOI' })
    this.inputGenerateDOIManuallyIdentifier = page.getByPlaceholder('10.1000/182')
    this.buttonGenerateDOIManuallySave = page.getByRole('button', { name: 'Save' })
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

  async createNewDataset(expectedDatasetTitle: string) {
    await this.inputDatasetTitle.fill(expectedDatasetTitle)
    await this.uploadFile(path.join(__dirname, '../fixtures/files-for-upload/file1.txt'))

    // Submit the form
    await expect(this.buttonCreateDataset).toBeEnabled({ timeout: 15000 })
    await this.buttonCreateDataset.click()
    await this.buttonViewDataset.click()
  }

  async registerDOIAutomatically() {
    await this.buttonGenerateDOIAutomatically.click()
    await this.buttonGenerateDOIAutomaticallyRegisterConfirmation.click()
  }

  async registerDOIManually() {
    await this.buttonGenerateDOIManually.click()
    await this.inputGenerateDOIManuallyIdentifier.fill(`10.1000/${faker.airline.flightNumber({ length: { min: 6, max: 10 } })}`)
    await this.buttonGenerateDOIManuallySave.click()
  }
}