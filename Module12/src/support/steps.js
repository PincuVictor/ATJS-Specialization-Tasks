const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('I navigate to the home page', async function () {
    await this.storePage.open();
});

Given('I navigate to the login page', async function () {
    await this.loginPage.open();
});

Given('I navigate to the register page', async function () {
    await this.registerPage.open();
});

When('I login with {string} and {string}', async function (email, password) {
    await this.loginPage.login(email, password);
    await this.page.waitForLoadState('networkidle');
});

When('I search for {string}', async function (query) {
    await this.storePage.Filter.search(query);
});

When('I add the first product to my cart', async function () {
    const product = await this.storePage.getFirstProduct();
    await product.rootElem.click();
    await this.productPage.addToCart();
});

When('I click the first product', async function () {
    const product = await this.storePage.getFirstProduct();
    await product.rootElem.click();
});

When('I add it to favorites', async function () {
    await this.productPage.addToFavorites();
});

When('I fill out the registration form with valid data', async function () {
    const randomEmail = `testuser${Date.now()}@example.com`;
    await this.registerPage.register(
        'John',
        'Doe',
        '1990-01-01',
        '123 Main St',
        'Testville',
        '12345',
        'Texas',
        'US',
        '1234567890',
        randomEmail,
        'Sparga123!@'
    );
});

When('I filter by the {string} category', async function (category) {
    await this.storePage.Filter.filterByCategory(category);
});

When('I sort by price descending', async function () {
    await this.storePage.Filter.dropdownSort.selectOption('price,desc');
});

When('I navigate to my profile', async function () {
    await this.header.navMenu.click();
    await this.header.navProfile.click();
});

When('I update my contact number to {string}', async function (basePhone) {
    await this.profilePage.updatePhoneNumber();
});

When('I navigate to the cart and proceed through all checkout steps', async function () {
    await this.checkoutPage.proceedToPayment();
});

When('I enter my payment details and finish', async function () {
    await this.checkoutPage.submitPayment();
});

When('I click the contact menu', async function () {
    await this.header.navContact.click();
});

// --- THEN ---
Then('I should see the user menu', async function () {
    await expect(this.header.navMenu).toBeVisible();
});

Then('I should see the product in the results', async function () {
    await expect(this.storePage.productCardElements.first()).toBeVisible();
});

Then('the cart badge should display {string}', async function (quantity) {
    await expect(this.header.cartQuantityBadge).toHaveText(quantity);
});

Then('I should be redirected to the login page', async function () {
    await expect(this.page).toHaveURL(/.*\/auth\/login/);
});

Then('I should see products displayed', async function () {
    await expect(this.storePage.productCardElements.first()).toBeVisible();
});

Then('I should see the favorites toast notification', async function () {
    await expect(this.page.getByRole('alert')).toContainText(/favorites/i);
});

Then('I should see a profile updated success message', async function () {
    await expect(this.profilePage.successAlert).toBeVisible({ timeout: 15000 });
});

Then('I should see a successful payment message', async function () {
    await expect(
        this.page.locator('.help-block').getByText('Payment was successful')
    ).toBeVisible();
});

Then('the contact form should be visible', async function () {
    await expect(this.contactPage.submitBtn).toBeVisible();
});
