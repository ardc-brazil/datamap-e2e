import { test } from '@playwright/test';
import { InternalHomePage } from "./internal-home.page";
import { CurrentUserPage } from "./current-user.page";

// eslint-disable-next-line playwright/expect-expect
test('welcome phrase is loading after login', async ({ page }) => {
    const user = await new CurrentUserPage(page).getCurrentUser()
    const pageObj = new InternalHomePage(page);
    await pageObj.goto()
    await pageObj.assertWelcomeHeaderMessage(user.name);
});