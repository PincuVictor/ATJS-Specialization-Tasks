const BasePage = require('../../../core/BasePage');

class ProductDetailsPage extends BasePage {
    get addToCartBtn() {
        return cy.get('[data-test="add-to-cart"]');
    }
    get cartBadge() {
        return cy.get('[data-test="cart-quantity"]');
    }

    addToCart() {
        this.clickElement(this.addToCartBtn);
    }
}

module.exports = new ProductDetailsPage();
