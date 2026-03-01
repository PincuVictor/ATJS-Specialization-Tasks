const BasePage = require('../../../core/BasePage');

class StoreFilterComponent extends BasePage {
    constructor(page) {
        super(page);
    }

    get dropdownSort() {
        return this.page.locator('[data-test="sort"]');
    }
    get searchInput() {
        return this.page.locator('[data-test="search-query"]');
    }
    get searchSubmit() {
        return this.page.locator('[data-test="search-submit"]');
    }

    async search(query) {
        await this.enterText(this.searchInput, query);
        await this.clickElement(this.searchSubmit);
    }

    async filterByCategory(categoryName) {
        const label = this.page.locator(`//label[contains(., "${categoryName}")]`);
        await label.waitFor({ state: 'visible' });

        const checkbox = label.locator('input');
        await this.clickElement(checkbox);

        const completedFlag = this.page.locator('[data-test="filter_completed"]');
        await completedFlag.waitFor({ state: 'visible' });
    }
}

module.exports = StoreFilterComponent;
