const BasePage = require('../../../core/BasePage');

class ProductDetailsPage extends BasePage {
    constructor(page) {
        super(page);
    }

    get addToCartBtn() {
        return this.page.locator('[data-test="add-to-cart"]');
    }
    get addToFavoritesBtn() {
        return this.page.locator('[data-test="add-to-favorites"]');
    }

    async addToCart() {
        await this.clickElement(this.addToCartBtn);
    }

    async addToFavorites() {
        await this.clickElement(this.addToFavoritesBtn);

        const toastMessage = this.page.locator('.toast-body, *[role="alert"], .toast').first();
        await toastMessage.waitFor({ state: 'visible' });
        await toastMessage.waitFor({ state: 'hidden' });
    }
}

module.exports = ProductDetailsPage;
