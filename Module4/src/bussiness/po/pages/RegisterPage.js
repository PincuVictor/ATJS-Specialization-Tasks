const BasePage = require('../../../core/BasePage');

class RegisterPage extends BasePage {
    get firstNameInput() {
        return $('[data-test="first-name"]');
    }
    get lastNameInput() {
        return $('[data-test="last-name"]');
    }
    get dobInput() {
        return $('[data-test="dob"]');
    }
    get streetInput() {
        return $('[data-test="street"]');
    }
    get cityInput() {
        return $('[data-test="city"]');
    }
    get postalCodeInput() {
        return $('[data-test="postal_code"]');
    }
    get stateInput() {
        return $('[data-test="state"]');
    }
    get countryInput() {
        return $('[data-test="country"]');
    }
    get PhoneInput() {
        return $('[data-test="phone"]');
    }
    get emailInput() {
        return $('[data-test="email"]');
    }
    get passwordInput() {
        return $('[data-test="password"]');
    }
    get registerButton() {
        return $('[data-test="register-submit"]');
    }

    async open() {
        await super.navigate('auth/register');
    }
    async register(
        firstName,
        lastName,
        dob,
        street,
        city,
        postalCode,
        state,
        country,
        phone,
        email,
        password
    ) {
        await this.enterText(this.firstNameInput, firstName);
        await this.enterText(this.lastNameInput, lastName);
        await this.enterText(this.dobInput, dob);
        await this.enterText(this.streetInput, street);
        await this.enterText(this.cityInput, city);
        await this.enterText(this.postalCodeInput, postalCode);
        await this.enterText(this.stateInput, state);
        await this.enterText(this.countryInput, country);
        await this.enterText(this.emailInput, email);
        await this.enterText(this.passwordInput, password);
        await this.clickElement(this.registerButton);
    }
}
