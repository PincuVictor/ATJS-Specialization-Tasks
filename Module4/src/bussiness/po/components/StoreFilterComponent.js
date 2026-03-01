const BasePage = require('../../../core/BasePage');

class StoreFilterComponent extends BasePage {
    get dropdownSort() {
        return $('[data-test="sort"]');
    }
    get searchInput() {
        return $('[data-test="search-query"]');
    }
    get searchSubmit() {
        return $('[data-test="search-submit"]');
    }

    async search(query) {
        await this.enterText(this.searchInput, query);
        await this.clickElement(this.searchSubmit);
    }

    async filterByCategory(categoryName) {
        const genericCheckbox = await $('[data-test^="category-"]');
        await genericCheckbox.waitForExist({ timeout: 10000 });
        const checkboxes = await $$('[data-test^="category-"]');

        for (const checkbox of checkboxes) {
            const parentLabel = await checkbox.$('..');
            const labelText = await parentLabel.getText();

            if (labelText.includes(categoryName)) {
                await this.clickElement(checkbox);

                const completedFlag = await $('[data-test="filter_completed"]');
                await completedFlag.waitForDisplayed({ timeout: 10000 });

                return;
            }
        }
        throw new Error(`Could not find a filter label with the text: "${categoryName}"`);
    }
}

module.exports = StoreFilterComponent;
