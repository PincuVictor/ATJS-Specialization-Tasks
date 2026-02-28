const BasePage = require('../../../core/BasePage');
const ProductComponent = require('../components/ProductComponent');
const StoreFilterComponent = require('../components/StoreFilterComponent');

class StorePage extends BasePage {
    constructor(page) {
        super(page);
        this.Filter = new StoreFilterComponent(page);
    }

    get productCardElements() {
        return this.page.locator('.card[data-test^="product-"]');
    }

    async open() {
        await super.navigate('/');
    }

    async getFirstProduct() {
        await this.productCardElements.first().waitFor({ state: 'visible' });
        return new ProductComponent(this.page, this.productCardElements.first());
    }
}

module.exports = StorePage;