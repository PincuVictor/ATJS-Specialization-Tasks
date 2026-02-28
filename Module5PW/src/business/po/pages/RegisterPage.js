const BasePage = require('../../../core/BasePage');

class RegisterPage extends BasePage {
    constructor(page) {
        super(page);
    }

    get firstNameInput() {
        return this.page.locator('[data-test="first-name"]');
    }
    get lastNameInput() {
        return this.page.locator('[data-test="last-name"]');
    }
    get dobInput() {
        return this.page.locator('[data-test="dob"]');
    }
    get streetInput() {
        return this.page.locator('[data-test="street"]');
    }
    get cityInput() {
        return this.page.locator('[data-test="city"]');
    }
    get postalCodeInput() {
        return this.page.locator('[data-test="postal_code"]');
    }
    get stateInput() {
        return this.page.locator('[data-test="state"]');
    }
    get countryInput() {
        return this.page.locator('[data-test="country"]');
    }
    get phoneInput() {
        return this.page.locator('[data-test="phone"]');
    }
    get emailInput() {
        return this.page.locator('[data-test="email"]');
    }
    get passwordInput() {
        return this.page.locator('[data-test="password"]');
    }
    get registerButton() {
        return this.page.locator('[data-test="register-submit"]');
    }

    async open() {
        await super.navigate('/auth/register');
    }

    async register(firstName, lastName, dob, street, city, postalCode, state, country, phone, email, password) {
        await this.enterText(this.firstNameInput, firstName);
        await this.enterText(this.lastNameInput, lastName);
        await this.enterText(this.dobInput, dob);
        await this.enterText(this.streetInput, street);
        await this.enterText(this.cityInput, city);
        await this.enterText(this.postalCodeInput, postalCode);
        await this.enterText(this.stateInput, state);
        await this.enterText(this.countryInput, country);
        await this.enterText(this.phoneInput, phone);
        await this.enterText(this.emailInput, email);
        await this.enterText(this.passwordInput, password);
        await this.clickElement(this.registerButton);
    }
}

module.exports = RegisterPage;