import { faker } from "@faker-js/faker";
import { expect, test } from '@playwright/test';
import fs from 'fs';
import { DatasetDetailsPage } from "./details-dataset.page";
import { NewDatasetPage } from "./new-dataset.page";

test('page content layout', async ({ page }) => {
    // given
    const datasetDetailsPage = new DatasetDetailsPage(page)
    const newDatasetPage = new NewDatasetPage(page);
    const expectedDatasetTitle = faker.commerce.productName()

    // when
    await newDatasetPage.goto()
    await newDatasetPage.createNewDataset(expectedDatasetTitle)

    // then
    await expect(datasetDetailsPage.datasetTitle).toHaveText(expectedDatasetTitle)
    await expect(datasetDetailsPage.buttonListDatasetVersion1).toBeVisible()
    await expect(datasetDetailsPage.buttonEditInstitution).toBeVisible()
    await expect(datasetDetailsPage.buttonGenerateDOIAutomatically).toBeVisible()
    await expect(datasetDetailsPage.buttonGenerateDOIManually).toBeVisible()
});

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
    await datasetDetailsPage.registerDOIAutomatically()

    // then
    await expect(datasetDetailsPage.buttonListDatasetVersion1).toBeVisible()
    await expect(datasetDetailsPage.buttonAddDatasetVersion).toBeVisible()
    await expect(datasetDetailsPage.textDoiId).toBeVisible({ timeout: 30000 })
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
    await datasetDetailsPage.registerDOIManually()

    // then
    await expect(datasetDetailsPage.buttonListDatasetVersion1).toBeVisible()
    await expect(datasetDetailsPage.buttonAddDatasetVersion).toBeVisible()
    await expect(datasetDetailsPage.textDoiId).toContainText("https://doi.org/10.")
    await expect(datasetDetailsPage.cardItemDoiMode).toContainText("MANUAL")
    await expect(datasetDetailsPage.cardItemDoiStatus).toBeHidden()
    await expect(datasetDetailsPage.buttonDoiStatusNavigator).toBeHidden()
});


test('download individual file', async ({ page }) => {
    // given
    const datasetDetailsPage = new DatasetDetailsPage(page)
    const newDatasetPage = new NewDatasetPage(page);
    const expectedDatasetTitle = faker.commerce.productName()

    // when
    await newDatasetPage.goto()
    await newDatasetPage.createNewDataset(expectedDatasetTitle)
    const fileSaved = await datasetDetailsPage.downloadFirstFileAvailable()

    // then
    await expect(datasetDetailsPage.dataFileItem).toBeVisible()
    await expect(datasetDetailsPage.buttonDataFileItemDownload).toBeVisible()
    expect(fs.existsSync(fileSaved)).toBeTruthy()
});