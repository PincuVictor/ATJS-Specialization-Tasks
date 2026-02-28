const BasePage = require('../../../core/BasePage');

class LoginPage extends BasePage {
    constructor(page) {
        super(page);
    }

    get emailInput() {
        return this.page.locator('[data-test="email"]');
    }
    get passwordInput() {
        return this.page.locator('[data-test="password"]');
    }
    get loginButton() {
        return this.page.locator('[data-test="login-submit"]');
    }

    async open() {
        await super.navigate('/auth/login');
    }

    async login(email, password) {
        await this.enterText(this.emailInput, email);
        await this.enterText(this.passwordInput, password);
        await this.clickElement(this.loginButton);
    }
}

module.exports = LoginPage;