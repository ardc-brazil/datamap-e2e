import { test, expect } from '@playwright/test';
import SearchDatasetPage from "./search-dataset.page";

test('list all datasets', async ({ page }) => {
    const searchDatasetPage = new SearchDatasetPage(page);
    await searchDatasetPage.goto()

    // Assert header text
    await expect(searchDatasetPage.titleHeader).toBeVisible({})
    await expect(searchDatasetPage.titleHeader).toHaveText('Datasets');
    await expect(searchDatasetPage.subtitleHeader).toHaveText('Explore, analyze, and share quality data. Learn more about data types, creating, and collaborating.');

    // Assert number of elements
    const count = parseInt(await searchDatasetPage.datasetListResultsCountItems.innerText())
    await expect(searchDatasetPage.datasetListResultsItems).toHaveCount(count)
    expect(count).toBeGreaterThanOrEqual(1)
});