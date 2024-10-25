import { test } from '@playwright/test';
import { NewDatasetPage } from "./new-dataset.page";

test('create new dataset', async ({ page }) => {
    const pageObj = new NewDatasetPage(page);
    await pageObj.goto()
    await pageObj.assertInstructionTexts();

    // TODO: Add more assertions and fill the form to create a new dataset.
});