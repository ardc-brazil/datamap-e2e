import { test, expect } from '@playwright/test';
import ListDatasetPage from "./list-dataset.page";

test('list all datasets', async ({ page }) => {
    const listDatasetPage = new ListDatasetPage(page);
    await listDatasetPage.goto()

    // Assert header text
    await expect(listDatasetPage.titleHeader).toBeVisible({})
    await expect(listDatasetPage.titleHeader).toHaveText('Datasets');
    await expect(listDatasetPage.subtitleHeader).toHaveText('Explore, analyze, and share quality data. Learn more about data types, creating, and collaborating.');

    // Assert number of elements
    const count = parseInt(await listDatasetPage.datasetListResultsCountItems.innerText())
    await expect(listDatasetPage.datasetListResultsItems).toHaveCount(count)
    expect(count).toBeGreaterThanOrEqual(1)
});