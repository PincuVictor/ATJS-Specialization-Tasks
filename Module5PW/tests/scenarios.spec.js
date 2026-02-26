const { test, expect } = require('@playwright/test');

test.describe('Practice Software Testing - Playwright Scenarios', () => {

    test('Scenario 1: Existing user logs in with valid credentials', async ({ page }) => {
        await page.goto('/auth/login');

        await page.locator('[data-test="email"]').fill('customer@practicesoftwaretesting.com');
        await page.locator('[data-test="password"]').fill('welcome01');
        await page.locator('[data-test="login-submit"]').click();

        await expect(page.locator('[data-test="nav-menu"]')).toBeVisible();
        expect(page.url()).not.toContain('login');
    });

    test('Scenario 2: Customer searches for an exact product', async ({ page }) => {
        await page.goto('/');

        const searchInput = page.locator('[data-test="search-query"]');
        await searchInput.fill('Thor Hammer');
        await page.keyboard.press('Enter');

        const firstProductName = page.locator('[data-test="product-name"]').first();
        await expect(firstProductName).toContainText('Thor Hammer');
    });

    test('Scenario 3: Adding a product to the basket from the details page', async ({ page }) => {
        await page.goto('/');

        await page.locator('[data-test^="product-"]').first().click();
        await expect(page).toHaveURL(/.*\/product\/.*/);

        await page.locator('[data-test="add-to-cart"]').click();

        await expect(page.locator('[data-test="cart-quantity"]')).toHaveText('1');
    });

    test('Scenario 4: Authenticated user adds an item to favorites', async ({ page }) => {

        await page.goto('/auth/login');
        await page.locator('[data-test="email"]').fill('customer@practicesoftwaretesting.com');
        await page.locator('[data-test="password"]').fill('welcome01');
        await page.locator('[data-test="login-submit"]').click();
        await expect(page.locator('[data-test="nav-menu"]')).toBeVisible();

        await page.goto('/');
        await page.locator('[data-test^="product-"]').first().click();
        await page.locator('[data-test="add-to-favorites"]').click();

        await page.locator('[data-test="nav-menu"]').click();
        await page.locator('[data-test="nav-my-favorites"]').click();
        await expect(page).toHaveURL(/.*favorites/);

        const favoriteCards = page.locator('.card');
        await expect(favoriteCards.first()).toBeVisible();
        expect(await favoriteCards.count()).toBeGreaterThan(0);
    });
});