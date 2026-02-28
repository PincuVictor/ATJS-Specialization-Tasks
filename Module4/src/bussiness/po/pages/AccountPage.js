const BasePage = require('../../../core/BasePage');

class AccountPage extends BasePage {
    get pageTitle() {
        return $('[data-test="page-title"]');
    }
    get navFavorites() {
        return $('[data-test="nav-favorites"]');
    }
    get navProfile() {
        return $('[data-test="nav-profile"]');
    }
    get navInvoices() {
        return $('[data-test="nav-invoices"]');
    }
    get navMessages() {
        return $('[data-test="nav-messages"]');
    }

}

module.exports = new AccountPage;