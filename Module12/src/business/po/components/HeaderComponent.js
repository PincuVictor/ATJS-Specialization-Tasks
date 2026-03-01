const BasePage = require('../../../core/BasePage');

class HeaderComponent extends BasePage {
    constructor(page) {
        super(page);
    }

    get navHome() {
        return this.page.locator('[data-test="nav-home"]');
    }
    get navCategories() {
        return this.page.locator('[data-test="nav-categories"]');
    }
    get navContact() {
        return this.page.locator('[data-test="nav-contact"]');
    }
    get navSignin() {
        return this.page.locator('[data-test="nav-sign-in"]');
    }
    get navProfile() {
        return this.page.locator('[data-test="nav-profile"]');
    }
    get navMenu() {
        return this.page.locator('[data-test="nav-menu"]');
    }
    get navMyFavorites() {
        return this.page.locator('[data-test="nav-my-favorites"]');
    }
    get cartQuantityBadge() {
        return this.page.locator('[data-test="cart-quantity"]');
    }

    async navigateToFavorites() {
        await this.clickElement(this.navMenu);
        await this.clickElement(this.navMyFavorites);
    }
}

module.exports = HeaderComponent;
