import { test, expect, APIRequestContext, Page } from '@playwright/test';
import { DataMapHomePage as DatamapHomePage } from "./datamap-home.page";
import { SignInPage } from "../app/signin.page";

test.describe.serial('DatamapHomePage', () => {
    let page: Page;
    let pageObj: DatamapHomePage;
    let apiRequest: APIRequestContext;

    test.beforeAll(async ({ browser, request }) => {
        // Necessary to avoid share the cookies from other sessions
        // and navigate automatically to the logged area.
        page = await browser.newPage();
        page.context().clearCookies();

        apiRequest = request;

        pageObj = new DatamapHomePage(page);
    });

    test('has title', async () => {
        // when
        await pageObj.goto()

        // then
        await expect(page).toHaveTitle(/DataMap/);
    });

    test('has welcome text', async () => {
        // when
        await pageObj.goto()

        // then
        await expect(pageObj.titleHeader).toBeVisible();
        await expect(pageObj.SubtitleHeader).toBeVisible();
    });

    test('has main links', async () => {
        // when
        await pageObj.goto()

        // then
        await expect(pageObj.getAboutLink).toBeVisible()
        await expect(pageObj.getSupportLink).toBeVisible()
        await expect(pageObj.getDataPolicy).toBeVisible()
        await expect(pageObj.getResearchGroup).toBeVisible()
        await expect(pageObj.getPartnersAndSupporters).toBeVisible()
    });

    test('has sign buttons', async () => {
        // when
        await pageObj.goto()

        // then
        await expect(pageObj.getSignButton).toBeVisible()
        await expect(pageObj.getResearchGroup).toBeVisible()
    });

    test('navigate to signin', async () => {
        // when
        await pageObj.goto()
        await pageObj.getSignButton.click()

        // then
        const signinpage = new SignInPage(page, apiRequest)
        await expect(signinpage.getSignWithOrcidButton).toBeVisible()
    })

})