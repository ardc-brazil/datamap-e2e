import { faker } from "@faker-js/faker";
import { expect, test } from '@playwright/test';
import { DatasetDetailsPage } from "./details-dataset.page";
import { NewDatasetPage } from "./new-dataset.page";

test('create new dataset content info', async ({ page }) => {
    // given
    const newDatasetPage = new NewDatasetPage(page);

    // when
    await newDatasetPage.goto()

    // then
    await expect(newDatasetPage.titleHeader).toBeVisible()
    await expect(newDatasetPage.titleHeader).toHaveText('New Dataset');
    await expect(newDatasetPage.subtitleHeader).toHaveText('Create a new dataset informing a title and remote data files.');
    await expect(newDatasetPage.instructionText).toHaveText('A dataset refers to a collection of data that is organized and structured for a specific purpose. It can consist of various types of information such as text, numbers, images, audio, or video.');
});

test('create new dataset', async ({ page }) => {
    // given
    const expectedDatasetTitle = faker.company.name();
    const newDatasetPage = new NewDatasetPage(page);

    // When
    await newDatasetPage.goto()
    await newDatasetPage.createNewDataset(expectedDatasetTitle)

    // Then
    const datasetDetailsPage = new DatasetDetailsPage(page)    
    await expect(datasetDetailsPage.datasetTitle).toHaveText(expectedDatasetTitle)
});