const { expect, assert } = require('chai');
const chai = require('chai');
chai.should();

const LoginPage = require('../bussiness/po/pages/LoginPage');
const RegisterPage = require('../bussiness/po/pages/RegisterPage');
const AccountPage = require('../bussiness/po/pages/AccountPage');
const StorePage = require('../bussiness/po/pages/StorePage');
const ProductDetailsPage = require('../bussiness/po/pages/ProductPage');
const FavoritesPage = require('../bussiness/po/pages/FavoritesPage');
const Header = require('../bussiness/po/components/HeaderComponent');

describe('Practicesoftwaretesting.com - Core Scenarios', () => {

    it('Scenario 1: Existing user logs in with valid credentials', async () => {
        await LoginPage.open();
        await LoginPage.login('customer@practicesoftwaretesting.com', 'welcome01');

        // Note: Ideally, even this waitForDisplayed should be inside AccountPage
        await AccountPage.pageTitle.waitForDisplayed({ timeout: 10000 });
        const currentUrl = await browser.getUrl();
        expect(currentUrl).to.include('/account');
    });

    it('Scenario 2: Customer searches for an exact product', async () => {
        await StorePage.open();
        await StorePage.Filter.search('Thor Hammer');

        await browser.waitUntil(
            async () => {
                const product = await StorePage.getFirstProduct();
                if (!product) return false;

                const title = await product.titleElement.getText();
                return title.includes('Thor Hammer');
            },
            {
                timeout: 10000,
                timeoutMsg: 'The search grid never updated to show Thor Hammer'
            }
        );

        const finalProduct = await StorePage.getFirstProduct();
        const productName = await finalProduct.titleElement.getText();

        productName.should.include('Thor Hammer');
        productName.should.not.be.empty;
    });

    it('Scenario 3: Filtering products by specific category', async () => {
        await StorePage.open();

        // Let the Filter component handle the checkbox click and the wait for the grid to reload
        await StorePage.Filter.filterByCategory('Hand Tools');

        const firstProduct = await StorePage.getFirstProduct();
        const itemText = await firstProduct.titleElement.getText();

        assert.isNotNull(itemText, 'Expected to find at least one product in the Hand Tools category');
        assert.isString(itemText, 'The product title should be returned as a string');
    });

    it('Scenario 4: Adding a product to the basket from the details page', async () => {
        await StorePage.open();

        // Click the first product
        const firstProduct = await StorePage.getFirstProduct();
        await firstProduct.rootElement.click(); // Assuming you add click to the component, or just click root

        // Now we are on the Product Details Page
        await ProductDetailsPage.addToCart();

        // The Header component should encapsulate waiting for the badge to update
        await Header.waitForCartQuantity('1');
        const finalQuantity = await Header.getCartQuantity();

        expect(finalQuantity).to.equal('1');
    });

    it('Scenario 5: Authenticated user adds an item to favorites', async () => {
        // 1. Log in (Reusing Scenario 1's logic!)
        await LoginPage.open();
        await LoginPage.login('customer@practicesoftwaretesting.com', 'welcome01');

        // 2. Navigate to store and click the first product
        await StorePage.open();
        const firstProduct = await StorePage.getFirstProduct();
        await firstProduct.rootElement.click();

        // 3. Add to favorites
        await ProductDetailsPage.addToFavorites();

        // 4. Navigate to Favorites using the Header menu
        await Header.navigateToFavorites();

        // 5. Verify the items on the Favorites Page
        const favoriteItemsCount = await FavoritesPage.getFavoriteItemsCount();

        expect(favoriteItemsCount).to.be.greaterThan(0);
    });
});