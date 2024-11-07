import { test, expect } from '@playwright/test';
import { MainMenuPage } from "../app/main-manu.page";
import { ProfilePage } from "../app/profile.page";
import { SignInPage } from "./signin.page";


test('signing with orcid available', async ({ page, request }) => {
    const pageObj = new SignInPage(page, request);
    await pageObj.goto()

    // then 
    await expect(pageObj.getSignWithOrcidButton).toBeVisible()
});

test('signing with github available', async ({ page, request }) => {
    const pageObj = new SignInPage(page, request);
    await pageObj.goto()

    // then
    await expect(pageObj.getSignWithOrcidButton).toBeVisible()
});

test('signing with credentials', async ({ page, request }) => {
    const pageObj = new SignInPage(page, request);
    await pageObj.goto()
    const result = await pageObj.signWithLocalCredentialRandonUser()

    const mainMenu = new MainMenuPage(page);
    await mainMenu.getProfileMenuItem.click();

    const profilePage = new ProfilePage(page);

    // then
    await expect(profilePage.getNameText).toContainText(result.name);
    await expect(profilePage.getEmailText).toContainText(result.email);
    await expect(profilePage.getProviderText).toContainText(`credentials - ${result.email}`);
});
