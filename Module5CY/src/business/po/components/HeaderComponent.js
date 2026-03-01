const BasePage = require('../../../core/BasePage');

class HeaderComponent extends BasePage {
    get navHome() {
        return cy.get('[data-test="nav-home"]');
    }
    get navMenu() {
        return cy.get('[data-test="nav-menu"]');
    }
    get navCart() {
        return cy.get('[data-test="nav-cart"]');
    }

    get navMyProfile() {
        return cy.get('[data-test="nav-my-profile"]');
    }
    get cartBadge() {
        return cy.get('[data-test="cart-quantity"]');
    }

    goToProfile() {
        this.clickElement(this.navMenu);
        this.clickElement(this.navMyProfile);
    }

    goToCart() {
        this.clickElement(this.navCart);
    }
}

module.exports = new HeaderComponent();
