import { faker } from '@faker-js/faker';
import { expect, test } from '@playwright/test';
import { NewDatasetPage } from "./new-dataset.page";
import SearchDatasetPage from "./search-dataset.page";

test('list all datasets', async ({ page }) => {
    // given
    const searchDatasetPage = new SearchDatasetPage(page);

    // when
    await searchDatasetPage.goto()

    // then
    // Assert header text
    await expect(searchDatasetPage.titleHeader).toBeVisible({})
    await expect(searchDatasetPage.titleHeader).toHaveText('Datasets');
    await expect(searchDatasetPage.subtitleHeader).toHaveText('Explore, analyze, and share quality data. Learn more about data types, creating, and collaborating.');

    // Assert number of elements
    const count = parseInt(await searchDatasetPage.datasetListResultsCountItems.innerText())
    expect(count).toBeGreaterThanOrEqual(1)
    await expect(searchDatasetPage.datasetListResultsItems).toHaveCount(count)
});

test('search a dataset', async ({ page }) => {
    // given
    const newDatasetPage = new NewDatasetPage(page);
    const searchDatasetPage = new SearchDatasetPage(page);
    const expectedDatasetTitle = `test-search-${faker.company.name()}-${crypto.randomUUID()}`

    // when
    await newDatasetPage.goto()
    await newDatasetPage.createNewDataset(expectedDatasetTitle)
    await searchDatasetPage.goto()
    await searchDatasetPage.searchFor(expectedDatasetTitle)

    // then
    const count = await searchDatasetPage.countDatasetListResultItems()
    await expect(searchDatasetPage.datasetListResultsItems).toHaveCount(count)
    await expect(searchDatasetPage.datasetListResultsItems.nth(0)).toContainText(expectedDatasetTitle)
});