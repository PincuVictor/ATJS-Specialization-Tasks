const { test, expect } = require('@playwright/test');
const LoginPage = require('../business/po/pages/LoginPage');
const StorePage = require('../business/po/pages/StorePage');
const ProductDetailsPage = require('../business/po/pages/ProductPage');
const FavoritesPage = require('../business/po/pages/FavoritesPage');
const HeaderComponent = require('../business/po/components/HeaderComponent');

test.describe('Practice Software Testing - Playwright Scenarios', () => {
    test('Scenario 1: Existing user logs in with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const header = new HeaderComponent(page);

        await loginPage.open();
        await loginPage.login('customer@practicesoftwaretesting.com', 'welcome01');

        await expect(header.navMenu).toBeVisible();
        expect(page.url()).not.toContain('login');
    });

    test('Scenario 2: Customer searches for an exact product', async ({ page }) => {
        const storePage = new StorePage(page);

        await storePage.open();

        await storePage.Filter.search('Thor Hammer');

        const firstProduct = await storePage.getFirstProduct();
        await expect(firstProduct.titleElement).toContainText('Thor Hammer');
    });

    test('Scenario 3: Adding a product to the basket from the details page', async ({ page }) => {
        const storePage = new StorePage(page);
        const productDetailsPage = new ProductDetailsPage(page);
        const header = new HeaderComponent(page);

        await storePage.open();

        const firstProduct = await storePage.getFirstProduct();
        await firstProduct.rootElem.click();

        await expect(page).toHaveURL(/.*\/product\/.*/);

        await productDetailsPage.addToCart();

        await expect(header.cartQuantityBadge).toHaveText('1');
    });

    test('Scenario 4: Authenticated user adds an item to favorites', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const storePage = new StorePage(page);
        const productDetailsPage = new ProductDetailsPage(page);
        const favoritesPage = new FavoritesPage(page);
        const header = new HeaderComponent(page);

        await loginPage.open();
        await loginPage.login('customer@practicesoftwaretesting.com', 'welcome01');
        await expect(header.navMenu).toBeVisible();

        await storePage.open();
        const firstProduct = await storePage.getFirstProduct();
        await firstProduct.rootElem.click();

        await productDetailsPage.addToFavorites();

        await header.navigateToFavorites();
        await expect(page).toHaveURL(/.*favorites/);

        const count = await favoritesPage.getFavoriteItemsCount();
        expect(count).toBeGreaterThan(0);
    });
});
