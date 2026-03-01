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
    }
}

module.exports = ProductDetailsPage;
