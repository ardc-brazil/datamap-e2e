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

test('register DOI automatically', async ({ page }) => {
    // given
    const datasetDetailsPage = new DatasetDetailsPage(page)
    const newDatasetPage = new NewDatasetPage(page);
    const expectedDatasetTitle = faker.commerce.productName()

    // when
    await newDatasetPage.goto()
    await newDatasetPage.createNewDataset(expectedDatasetTitle)
    await datasetDetailsPage.editInstituionName(faker.company.name())
    await newDatasetPage.registerDOIAutomatically()

    // then
    await expect(datasetDetailsPage.buttonListDatasetVersion1).toBeVisible()
    await expect(datasetDetailsPage.buttonAddDatasetVersion).toBeVisible()
    await expect(datasetDetailsPage.textDoiId).toContainText("https://doi.org/10.")
    await expect(datasetDetailsPage.cardItemDoiMode).toContainText("AUTO")
    await expect(datasetDetailsPage.cardItemDoiStatus).toContainText("DRAFT")
    await expect(datasetDetailsPage.buttonDoiStatusNavigator).toContainText("Registered")
});


test('register DOI manually', async ({ page }) => {
    // given
    const datasetDetailsPage = new DatasetDetailsPage(page)
    const newDatasetPage = new NewDatasetPage(page);
    const expectedDatasetTitle = faker.commerce.productName()

    // when
    await newDatasetPage.goto()
    await newDatasetPage.createNewDataset(expectedDatasetTitle)
    await datasetDetailsPage.editInstituionName(faker.company.name())
    await newDatasetPage.registerDOIManually()

    // then
    await expect(datasetDetailsPage.buttonListDatasetVersion1).toBeVisible()
    await expect(datasetDetailsPage.buttonAddDatasetVersion).toBeVisible()
    await expect(datasetDetailsPage.textDoiId).toContainText("https://doi.org/10.")
    await expect(datasetDetailsPage.cardItemDoiMode).toContainText("MANUAL")
    await expect(datasetDetailsPage.cardItemDoiStatus).toBeHidden()
    await expect(datasetDetailsPage.buttonDoiStatusNavigator).toBeHidden()
});