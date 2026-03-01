const BasePage = require('../../../core/BasePage');

class LoginPage extends BasePage {
    get emailInput() {
        return $('[data-test="email"]');
    }
    get passwordInput() {
        return $('[data-test="password"]');
    }
    get loginButton() {
        return $('[data-test="login-submit"]');
    }

    async open() {
        await super.navigate('auth/login');
    }
    async login(email, password) {
        await this.enterText(this.emailInput, email);
        await this.enterText(this.passwordInput, password);
        await this.clickElement(this.loginButton);
    }
}

module.exports = new LoginPage();
