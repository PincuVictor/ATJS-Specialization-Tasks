const BasePage = require('../../../core/BasePage');
const ProductComponent = require('../../po/components/ProductComponent');
const StoreFilterComponent = require('../../po/components/StoreFilterComponent');

class StorePage extends BasePage {
    constructor() {
        super();
        this.Filter = new StoreFilterComponent;
    }
    get productCardElements() {
        return $$('.card[data-test^="product-"]');
    }

    async open() {
        await super.navigate('/');
    }

    async getAllProducts() {
        await browser.waitUntil(
            async () => {
                const elements = await this.productCardElements;
                return elements.length > 0;
            },
            {
                timeout: 10000,
                timeoutMsg: 'Product cards never rendered on the screen'
            }
        );

        const elements = await this.productCardElements;
        return elements.map(element => new ProductComponent(element));
    }

    async getFirstProduct() {
        const products = await this.getAllProducts();
        return products[0];
    }
}

module.exports = new StorePage();