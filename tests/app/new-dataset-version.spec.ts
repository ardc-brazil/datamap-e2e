import { faker } from "@faker-js/faker";
import { expect, test } from '@playwright/test';
import { DatasetDetailsPage } from "./details-dataset.page";
import { DatasetVersionsHistoryModal } from "./list-dataset-versions-modal.page";
import { NewDatasetVersionDrawer } from "./new-dataset-version-drawer.page";
import { NewDatasetPage } from "./new-dataset.page";

test('new version drawer layout', async ({ page }) => {
    // given
    const expectedDatasetTitle = faker.company.name();
    const newDatasetPage = new NewDatasetPage(page);
    const datasetDetailsPage = new DatasetDetailsPage(page)
    const versionDrawer = new NewDatasetVersionDrawer(page)

    // When
    await newDatasetPage.goto()
    await newDatasetPage.createNewDataset(expectedDatasetTitle)
    await datasetDetailsPage.openNewVersionDrawer()

    // Then
    await expect(datasetDetailsPage.datasetTitle).toHaveText(expectedDatasetTitle)

    // Elements are visible
    await expect(versionDrawer.pageTitle).toBeVisible()
    await expect(versionDrawer.previouslyUploadedTitle).toBeVisible()
    await expect(versionDrawer.previouslyUploadedList).toBeVisible()
    await expect(versionDrawer.newUploadsTitle).toBeVisible()
    await expect(versionDrawer.buttonCloseWindow).toBeVisible()
    await expect(versionDrawer.buttonCreate).toBeVisible()
    await expect(versionDrawer.buttonClearAll).toBeVisible()
    await expect(versionDrawer.buttonBrowseFileUpload).toBeVisible()
    await expect(versionDrawer.buttonBrowseFolderUpload).toBeVisible()

    // Content is correct
    await expect(versionDrawer.buttonCloseWindow).toBeVisible()
    await expect(versionDrawer.pageTitle).toHaveText("Upload Data")
    await expect(versionDrawer.previouslyUploadedTitle).toHaveText("Previously uploaded")
    await expect(versionDrawer.previouslyUploadedList).toContainText("file1.txt")
    await expect(versionDrawer.newUploadsTitle).toHaveText("New uploads")
});

test('list versions for dataset', async ({ page }) => {
    // given
    const expectedDatasetTitle = faker.company.name();
    const newDatasetPage = new NewDatasetPage(page);
    const datasetDetailsPage = new DatasetDetailsPage(page)
    const versionDrawer = new NewDatasetVersionDrawer(page)

    await newDatasetPage.goto()
    await newDatasetPage.createNewDataset(expectedDatasetTitle)
    await expect(datasetDetailsPage.datasetTitle).toHaveText(expectedDatasetTitle)

    // When
    await datasetDetailsPage.openNewVersionDrawer()
    await versionDrawer.createNewVersion()
    await versionDrawer.makeSureThatUploadedWithSuccess()
    await versionDrawer.buttonCloseWindow.click()
    await datasetDetailsPage.buttonListDatasetVersion2.click()

    // Then
    const datasetVersionsHistoryModal = new DatasetVersionsHistoryModal(page)
    await expect(datasetVersionsHistoryModal.modalContent).toBeVisible()
    await expect(datasetVersionsHistoryModal.pageTitle).toHaveText("History")
    await expect(datasetVersionsHistoryModal.buttonNewVersion).toBeVisible()
    await expect(datasetVersionsHistoryModal.buttonNewVersion).toHaveText("addNew Version")
    await expect(datasetVersionsHistoryModal.buttonCloseWindow).toBeVisible()
    await expect(datasetVersionsHistoryModal.buttonCancel).toBeVisible()

    await expect(datasetVersionsHistoryModal.historyVersionsList).toContainText("Version 2 a few seconds ago")
    await expect(datasetVersionsHistoryModal.historyVersionsList).toContainText("Version 1 a few seconds ago")

});

test('create version 2 for the dataset', async ({ page }) => {
    // given
    const expectedDatasetTitle = faker.company.name();
    const newDatasetPage = new NewDatasetPage(page);
    const datasetDetailsPage = new DatasetDetailsPage(page)
    const versionDrawer = new NewDatasetVersionDrawer(page)

    await newDatasetPage.goto()
    await newDatasetPage.createNewDataset(expectedDatasetTitle)
    await expect(datasetDetailsPage.datasetTitle).toHaveText(expectedDatasetTitle)

    // When
    await datasetDetailsPage.openNewVersionDrawer()
    await versionDrawer.createNewVersion()

    // Then
    await expect(versionDrawer.messageSuccessfullyNewVersionCreated).toBeVisible({ timeout: 15000 })
    await expect(versionDrawer.messageSuccessfullyNewVersionCreated).toContainText("Success!")
    await expect(versionDrawer.messageSuccessfullyNewVersionCreated).toContainText("Your dataset version was created successfully.")

    // Check result
    await versionDrawer.buttonCloseWindow.click()
    await datasetDetailsPage.datasetTitle.isVisible()
    await expect(datasetDetailsPage.buttonListDatasetVersion2).toBeVisible()
});