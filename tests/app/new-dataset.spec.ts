import { faker } from "@faker-js/faker";
import { expect, test } from '@playwright/test';
import path from "path";
import { DatasetDetailsPage } from "./details-dataset.page";
import { NewDatasetPage } from "./new-dataset.page";

test('create new dataset', async ({ page }) => {
    const newDatasetPage = new NewDatasetPage(page);
    await newDatasetPage.goto()

    // Assert page elements
    await expect(newDatasetPage.titleHeader).toBeVisible()
    await expect(newDatasetPage.titleHeader).toHaveText('New Dataset');
    await expect(newDatasetPage.subtitleHeader).toHaveText('Create a new dataset informing a title and remote data files.');
    await expect(newDatasetPage.instructionText).toHaveText('A dataset refers to a collection of data that is organized and structured for a specific purpose. It can consist of various types of information such as text, numbers, images, audio, or video.');

    // Fill the form
    const expectedDatasetTitle = faker.company.name();
    await newDatasetPage.inputDatasetTitle.fill(expectedDatasetTitle)
    await newDatasetPage.uploadFile(path.join(__dirname, '../fixtures/files-for-upload/file1.txt'))

    // Submit the form
    await expect(newDatasetPage.buttonCreateDataset).toBeEnabled({ timeout: 3000 })
    await newDatasetPage.buttonCreateDataset.click()
    await newDatasetPage.buttonViewDataset.click()

    // Check details page
    const datasetDetailsPage = new DatasetDetailsPage(page)
    await expect(datasetDetailsPage.datasetTitle).toHaveText(expectedDatasetTitle)
});