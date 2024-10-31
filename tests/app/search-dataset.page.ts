import { expect, type Locator, type Page } from '@playwright/test';

export default class SearchDatasetPage {
  readonly page: Page;
  readonly titleHeader: Locator;
  readonly subtitleHeader: Locator;
  readonly instructionText: Locator;
  readonly datasetListResults: Locator;
  readonly datasetListResultsItems: Locator;
  readonly datasetListResultsCountItems: Locator;

  constructor(page: Page) {
    this.page = page;

    this.titleHeader = page.locator('h2', { hasText: 'Datasets' })
    this.subtitleHeader = page.locator('p', { hasText: 'Explore, analyze, and share quality data. Learn more about' })
    this.datasetListResults = page.locator('#listDataset');
    this.datasetListResultsCountItems = page.getByTestId("dataset-count-items");
    this.datasetListResultsItems = page.getByTestId('listDataset-items').getByRole("link");
  }

  async goto() {
    await this.page.goto('/app/datasets');
    await expect(async () => { await this.titleHeader.isVisible() }).toPass()
  }
}