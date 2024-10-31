import { faker } from "@faker-js/faker";
import { expect, test } from '@playwright/test';
import { DatasetDetailsPage } from "./details-dataset.page";
import { NewDatasetPage } from "./new-dataset.page";

test('new version dataset buttons available', async ({ page }) => {
    // given
    const datasetDetailsPage = new DatasetDetailsPage(page)
    const newDatasetPage = new NewDatasetPage(page);
    const expectedDatasetTitle = faker.commerce.productName()

    // when
    await newDatasetPage.goto()
    await newDatasetPage.createNewDataset(expectedDatasetTitle)

    // then
    await expect(datasetDetailsPage.buttonListDatasetVersion1).toBeVisible()
    await expect(datasetDetailsPage.buttonAddDatasetVersion).toBeVisible()
});