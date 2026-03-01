class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.navCart = page.locator('[data-test="nav-cart"]');
    }

    async proceedToPayment() {
        await this.navCart.click();
        await this.page.locator('[data-test="proceed-1"]').click();
        await this.page.locator('[data-test="proceed-2"]').click();
        await this.page.locator('[data-test="state"]').fill('Texas');
        await this.page.locator('[data-test="postal_code"]').fill('12345');
        await this.page.locator('[data-test="proceed-3"]').click();
    }

    async submitPayment() {
        await this.page.locator('[data-test="payment-method"]').selectOption('credit-card');
        await this.page.locator('[data-test="credit_card_number"]').fill('1234-5678-1234-5678');
        await this.page.locator('[data-test="expiration_date"]').fill('12/2090');
        await this.page.locator('[data-test="cvv"]').fill('123');
        await this.page.locator('[data-test="card_holder_name"]').fill('John Doe');
        await this.page.locator('[data-test="finish"]').click();
    }
}
module.exports = CheckoutPage;