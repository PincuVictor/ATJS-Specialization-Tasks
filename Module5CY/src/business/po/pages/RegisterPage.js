const BasePage = require('../../../core/BasePage');

class RegisterPage extends BasePage {
    get firstNameInput() {
        return cy.get('[data-test="first-name"]');
    }
    get lastNameInput() {
        return cy.get('[data-test="last-name"]');
    }
    get dobInput() {
        return cy.get('[data-test="dob"]');
    }
    get streetInput() {
        return cy.get('[data-test="street"]');
    }
    get cityInput() {
        return cy.get('[data-test="city"]');
    }
    get postalCodeInput() {
        return cy.get('[data-test="postal_code"]');
    }
    get stateInput() {
        return cy.get('[data-test="state"]');
    }
    get countryDropdown() {
        return cy.get('[data-test="country"]');
    }
    get phoneInput() {
        return cy.get('[data-test="phone"]');
    }
    get emailInput() {
        return cy.get('[data-test="email"]');
    }
    get passwordInput() {
        return cy.get('[data-test="password"]');
    }
    get registerButton() {
        return cy.get('[data-test="register-submit"]');
    }

    open() {
        this.navigate('/auth/register');
    }

    registerUser(userData) {
        this.enterText(this.firstNameInput, userData.firstName);
        this.enterText(this.lastNameInput, userData.lastName);
        this.enterText(this.dobInput, userData.dob);
        this.enterText(this.streetInput, userData.street);
        this.enterText(this.postalCodeInput, userData.postalCode);
        this.enterText(this.cityInput, userData.city);
        this.enterText(this.stateInput, userData.state);
        this.selectOption(this.countryDropdown, userData.country);
        this.enterText(this.phoneInput, userData.phone);
        this.enterText(this.emailInput, userData.email);
        this.enterText(this.passwordInput, userData.password);
        this.clickElement(this.registerButton);
    }
}

module.exports = new RegisterPage();