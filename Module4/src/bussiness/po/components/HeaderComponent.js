const BasePage = require('../../../core/BasePage');

class Header extends BasePage {
    get cartQuantityBadge() {
        return $('[data-test="cart-quantity"]');
    }
    get navUserMenu() {
        return $('[data-test="nav-menu"]');
    }
    get navMyFavorites() {
        return $('[data-test="nav-my-favorites"]');
    }

    async waitForCartQuantity(expectedQuantity) {
        await browser.waitUntil(
            async () => {
                const text = await this.getText(this.cartQuantityBadge);
                return text === expectedQuantity;
            },
            {
                timeout: 10000,
                timeoutMsg: `Cart badge never updated to ${expectedQuantity}`
            }
        );
    }

    async getCartQuantity() {
        return await this.getText(this.cartQuantityBadge);
    }

    async navigateToFavorites() {
        await this.clickElement(this.navUserMenu);
        await this.clickElement(this.navMyFavorites);
    }
    
}

module.exports = new Header();