import { expect, type Locator, type Page } from '@playwright/test';

export class DatasetDetailsPage {
  readonly page: Page;
  readonly datasetTitle: Locator;
  readonly buttonListDatasetVersion1: Locator;
  readonly buttonListDatasetVersion2: Locator;
  readonly buttonAddDatasetVersion: Locator;
  readonly buttonEditInstitution: Locator;
  readonly inputInstituitonName: Locator;
  readonly buttonSaveInstitution: Locator;
  readonly textDoiId: Locator;
  readonly cardItemDoiMode: Locator;
  readonly cardItemDoiStatus: Locator;
  readonly cardItemDoiStatusNavigator: Locator;
  readonly buttonDoiStatusNavigator: Locator;

  constructor(page: Page) {
    this.page = page;

    this.datasetTitle = page.locator("#dataset-title")
    this.buttonListDatasetVersion1 = page.getByRole('button', { name: 'Version 1' })
    this.buttonListDatasetVersion2 = page.getByRole('button', { name: 'Version 2' })
    this.buttonAddDatasetVersion = page.getByRole('button', { name: 'add New Version' })
    this.buttonEditInstitution = page.locator('p').filter({ hasText: 'Add a institution Edit' }).getByRole('button')
    this.inputInstituitonName = page.getByPlaceholder('What is the institution owner of this dataset?')
    this.buttonSaveInstitution = page.getByRole('button', { name: 'Save' })
    this.textDoiId = page.locator('#doi-digital-object-identifier')
    this.cardItemDoiMode = page.getByTestId("doi-register-mode")
    this.cardItemDoiStatus = page.getByTestId("doi-register-status")
    this.cardItemDoiStatusNavigator = page.getByTestId("doi-status-navigator")
    this.buttonDoiStatusNavigator = this.cardItemDoiStatusNavigator.getByRole('button')
  }

  async goto(datasetId: string) {
    await this.page.goto(`/app/datasets/${datasetId}`);
    await expect(async () => { await this.datasetTitle.isVisible() }).toPass()
  }

  async openNewVersionDrawer() {
    await this.buttonAddDatasetVersion.click()
  }

  async editInstituionName(expectedInstitutionName: string) {
    await this.buttonEditInstitution.click()
    await this.inputInstituitonName.fill(expectedInstitutionName)
    await this.buttonSaveInstitution.click()
  }
}