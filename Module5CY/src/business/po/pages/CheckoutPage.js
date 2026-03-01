const BasePage = require('../../../core/BasePage');

class CheckoutPage extends BasePage {
    get proceedStep1Btn() {
        return cy.get('[data-test="proceed-1"]');
    }
    get proceedStep2Btn() {
        return cy.get('[data-test="proceed-2"]');
    }
    get proceedStep3Btn() {
        return cy.get('[data-test="proceed-3"]');
    }

    get stateInput() {
        return cy.get('[data-test="state"]');
    }
    get postalCodeInput() {
        return cy.get('[data-test="postal_code"]');
    }

    get paymentMethodDropdown() {
        return cy.get('[data-test="payment-method"]');
    }
    get creditCardInput() {
        return cy.get('[data-test="credit_card_number"]');
    }
    get expirationInput() {
        return cy.get('[data-test="expiration_date"]');
    }
    get cvvInput() {
        return cy.get('[data-test="cvv"]');
    }
    get cardHolderInput() {
        return cy.get('[data-test="card_holder_name"]');
    }
    get finishButton() {
        return cy.get('[data-test="finish"]');
    }

    get paymentSuccessMessage() {
        return cy.contains('Payment was successful');
    }

    proceedToAddress() {
        this.clickElement(this.proceedStep1Btn);
        this.clickElement(this.proceedStep2Btn);
    }

    fillAddressAndProceed(state, postalCode) {
        this.enterText(this.stateInput, state);
        this.enterText(this.postalCodeInput, postalCode);
        this.clickElement(this.proceedStep3Btn);
    }

    fillPaymentAndFinish(paymentData) {
        this.selectOption(this.paymentMethodDropdown, paymentData.method);
        this.enterText(this.creditCardInput, paymentData.cardNumber);
        this.enterText(this.expirationInput, paymentData.expiration);
        this.enterText(this.cvvInput, paymentData.cvv);
        this.enterText(this.cardHolderInput, paymentData.cardHolder);
        this.clickElement(this.finishButton);
    }
}

module.exports = new CheckoutPage();
