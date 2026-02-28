const BasePage = require('../../../core/BasePage');

class ProductDetailsPage extends BasePage {
    get addToCartBtn() {
        return $('[data-test="add-to-cart"]');
    }
    get addToFavoritesBtn() {
        return $('[data-test="add-to-favorites"]');
    }

    async addToCart() {
        await this.clickElement(this.addToCartBtn);
    }

    async addToFavorites() {
        await this.clickElement(this.addToFavoritesBtn);

        const toastMessage = await $('.toast-body, *[role="alert"], .toast');
        await toastMessage.waitForDisplayed({ timeout: 5000 });

        await toastMessage.waitForDisplayed({ timeout: 10000, reverse: true });
    }
}

module.exports = new ProductDetailsPage();