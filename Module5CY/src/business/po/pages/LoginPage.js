const BasePage = require('../../../core/BasePage');

class LoginPage extends BasePage {
    get emailInput() {
        return cy.get('[data-test="email"]');
    }
    get passwordInput() {
        return cy.get('[data-test="password"]');
    }
    get loginButton() {
        return cy.get('[data-test="login-submit"]');
    }

    open() {
        this.navigate('/auth/login');
    }

    login(email, password) {
        this.enterText(this.emailInput, email);
        this.enterText(this.passwordInput, password);
        this.clickElement(this.loginButton);
    }
}

module.exports = new LoginPage();