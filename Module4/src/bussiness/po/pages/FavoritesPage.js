const BasePage = require('../../../core/BasePage');

class FavoritesPage extends BasePage {
    get favoriteItems() {
        return $$('[data-test^="favorite-"]');
    }

    async getFavoriteItemsCount() {
        await browser.waitUntil(async () => (await browser.getUrl()).includes('favorites'), {
            timeout: 5000,
            timeoutMsg: 'Never reached the favorites page'
        });

        try {
            await browser.waitUntil(async () => (await this.favoriteItems).length > 0, {
                timeout: 5000
            });
        } catch (e) {}

        const items = await this.favoriteItems;
        return items.length;
    }
}

module.exports = new FavoritesPage();
