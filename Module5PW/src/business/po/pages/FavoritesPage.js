const BasePage = require('../../../core/BasePage');

class FavoritesPage extends BasePage {
    constructor(page) {
        super(page);
    }

    get favoriteItems() {
        return this.page.locator('[data-test^="favorite-"]');
    }

    async getFavoriteItemsCount() {
        await this.page.waitForURL(/.*favorites/);
        try {
            await this.favoriteItems.first().waitFor({ state: 'visible', timeout: 5000 });
        } catch (e) {}

        return await this.favoriteItems.count();
    }
}

module.exports = FavoritesPage;
