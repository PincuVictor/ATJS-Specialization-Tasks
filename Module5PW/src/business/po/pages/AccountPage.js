const BasePage = require('../../../core/BasePage');

class AccountPage extends BasePage {
    constructor(page) {
        super(page);
    }

    get pageTitle() {
        return this.page.locator('[data-test="page-title"]');
    }
    get navFavorites() {
        return this.page.locator('[data-test="nav-favorites"]');
    }
    get navProfile() {
        return this.page.locator('[data-test="nav-profile"]');
    }
    get navInvoices() {
        return this.page.locator('[data-test="nav-invoices"]');
    }
    get navMessages() {
        return this.page.locator('[data-test="nav-messages"]');
    }
}

module.exports = AccountPage;