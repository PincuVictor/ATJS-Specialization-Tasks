const { expect, assert } = require('chai');
const chai = require('chai');
chai.should();

describe('Practicesoftwaretesting.com - Core Scenarios', () => {

    it('Scenario 1: Existing user logs in with valid credentials', async () => {
        await browser.url('https://practicesoftwaretesting.com/auth/login');

        const emailInput = await $('[data-test="email"]');
        const passwordInput = await $('[data-test="password"]');
        const loginButton = await $('[data-test="login-submit"]');

        await emailInput.setValue('customer@practicesoftwaretesting.com');
        await passwordInput.setValue('welcome01');
        await loginButton.click();

        const navMenu = await $('[data-test="nav-menu"]');
        await navMenu.waitForDisplayed({ timeout: 10000 });

        const currentUrl = await browser.getUrl();
        const isMenuVisible = await navMenu.isDisplayed();

        expect(currentUrl).to.not.include('/auth/login');
        expect(isMenuVisible).to.be.true;
    });

    it('Scenario 2: Customer searches for an exact product', async () => {
        await browser.url('https://practicesoftwaretesting.com/');

        const searchInput = await $('[data-test="search-query"]');
        await searchInput.waitForDisplayed({ timeout: 10000 });

        await searchInput.clearValue();
        await searchInput.setValue('Thor Hammer');
        await browser.keys('Enter');

        await browser.waitUntil(
            async () => {
                const firstResultTitle = await $('[data-test="product-name"]');
                if (await firstResultTitle.isExisting()) {
                    const text = await firstResultTitle.getText();
                    return text.includes('Thor Hammer');
                }
                return false;
            },
            {
                timeout: 10000,
                timeoutMsg: 'Search failed: The grid never updated to show Thor Hammer.'
            }
        );

        const productName = await $('[data-test="product-name"]').getText();

        productName.should.include('Thor Hammer');
        productName.should.not.be.empty;
    });

    it('Scenario 3: Filtering products by specific category', async () => {

        await browser.url('https://practicesoftwaretesting.com/');

        const handToolsCheckbox = await $('//label[contains(text(), "Hand Tools")]/input');

        await handToolsCheckbox.waitForClickable({ timeout: 10000 });
        await handToolsCheckbox.click();

        await $('[data-test="filter_completed"]').waitForDisplayed({ timeout: 10000 });

        const firstResultTitle = await $('[data-test="product-name"]');

        const itemText = await firstResultTitle.getText();

        assert.isNotNull(itemText, 'Expected to find at least one product in the Hand Tools category');
        assert.isString(itemText, 'The product title should be returned as a string');
    });

    it('Scenario 4: Adding a product to the basket from the details page', async () => {
        await browser.url('https://practicesoftwaretesting.com/');

        const firstProduct = await $('[data-test^="product-"]');
        await firstProduct.waitForDisplayed({ timeout: 10000 });
        await firstProduct.click();

        const addToCartBtn = await $('[data-test="add-to-cart"]');
        await addToCartBtn.waitForDisplayed({ timeout: 10000 });
        await addToCartBtn.click();

        const cartQuantityBadge = await $('[data-test="cart-quantity"]');

        await browser.waitUntil(
            async () => {
                const text = await cartQuantityBadge.getText();
                return text === '1';
            },
            {
                timeout: 10000,
                timeoutMsg: 'Expected cart badge to update to 1'
            }
        );

        const finalQuantity = await cartQuantityBadge.getText();
        expect(finalQuantity).to.equal('1');
    });

    it('Scenario 5: Authenticated user adds an item to favorites', async () => {

        await browser.url('https://practicesoftwaretesting.com/auth/login');
        await $('[data-test="email"]').setValue('customer@practicesoftwaretesting.com');
        await $('[data-test="password"]').setValue('welcome01');
        await $('[data-test="login-submit"]').click();

        const navMenu = await $('[data-test="nav-menu"]');
        await navMenu.waitForDisplayed({ timeout: 10000 });

        await browser.url('https://practicesoftwaretesting.com/');
        const firstProduct = await $('[data-test^="product-"]');
        await firstProduct.waitForDisplayed({ timeout: 10000 });
        await firstProduct.click();

        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('/product/'),
            { timeout: 5000, timeoutMsg: 'Failed to navigate to product details' }
        );

        const favoriteBtn = await $('[data-test="add-to-favorites"]');
        await favoriteBtn.waitForDisplayed({ timeout: 10000 });
        await favoriteBtn.click();

        await navMenu.click();

        const myFavoritesLink = await $('[data-test="nav-my-favorites"]');
        await myFavoritesLink.waitForDisplayed({ timeout: 5000 });
        await myFavoritesLink.click();

        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('favorites'),
            { timeout: 5000, timeoutMsg: 'Failed to navigate to Favorites page' }
        );
        await browser.pause(2000);

        const favoriteItems = await $$('[data-test^="favorite-"]');

        expect(favoriteItems.length).to.be.greaterThan(0);
        expect(favoriteItems).to.be.an('array');
    });
});