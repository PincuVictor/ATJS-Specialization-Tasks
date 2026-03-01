const { BeforeAll, AfterAll, Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
// 1. Import firefox and webkit along with chromium
const { chromium, firefox, webkit } = require('@playwright/test');
// Import all your pages at the top of hooks.js
const StorePage = require('../business/po/pages/StorePage'); // adjust path as needed
const LoginPage = require('../business/po/pages/LoginPage');
const RegisterPage = require('../business/po/pages/RegisterPage');
const ProductDetailsPage = require('../business/po/pages/ProductPage');
const HeaderComponent = require('../business/po/components/HeaderComponent');
const ProfilePage = require('../business/po/pages/ProfilePage');
const CheckoutPage = require('../business/po/pages/CheckoutPage');
const ContactPage = require('../business/po/pages/ContactPage');

setDefaultTimeout(30 * 1000);

let browser;

BeforeAll(async function () {
    // 2. Read the BROWSER environment variable (defaults to chromium if not set)
    const browserName = process.env.BROWSER || 'chromium';

    console.log(`Launching ${browserName}...`);

    // 3. Launch the correct browser engine
    switch (browserName) {
        case 'firefox':
            browser = await firefox.launch({ headless: true });
            break;
        case 'webkit':
            browser = await webkit.launch({ headless: true });
            break;
        default:
            browser = await chromium.launch({ headless: true });
    }
});

Before(async function () {
    this.context = await browser.newContext({ baseURL: 'https://practicesoftwaretesting.com' });
    this.page = await this.context.newPage();

    this.storePage = new StorePage(this.page);
    this.loginPage = new LoginPage(this.page);
    this.registerPage = new RegisterPage(this.page);
    this.productPage = new ProductDetailsPage(this.page);
    this.header = new HeaderComponent(this.page);
    this.profilePage = new ProfilePage(this.page);
    this.checkoutPage = new CheckoutPage(this.page);
    this.contactPage = new ContactPage(this.page);

});

After(async function () {
    await this.page.close();
    await this.context.close();
});

AfterAll(async function () {
    await browser.close();
});