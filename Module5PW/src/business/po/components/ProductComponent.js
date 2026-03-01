const BasePage = require('../../../core/BasePage');

class ProductComponent extends BasePage {
    /**
     * @param {import('@playwright/test').Page} page
     * @param {import('@playwright/test').Locator} rootLocator
     */
    constructor(page, rootLocator) {
        super(page);
        this.rootLocator = rootLocator;
    }

    get rootElem() {
        return this.rootLocator;
    }
    get titleElement() {
        return this.rootLocator.locator('[data-test="product-name"]');
    }
}

module.exports = ProductComponent;
