const BasePage = require('../../../core/BasePage');

class ProductComponent extends BasePage {
    /**
     * @param {WebdriverIO.Element} rootElement
     */
    constructor(rootElement) {
        super();
        this.rootElement = rootElement;
    }

    get rootElem() {
        return this.rootElement;
    }
    get titleElement() {
        return this.rootElement.$('[data-test="product-name"]');
    }
}

module.exports = ProductComponent;
