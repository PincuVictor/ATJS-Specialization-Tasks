const BasePage = require('../../../core/BasePage');

class ProfilePage extends BasePage {
    get phoneInput() {
        return cy.get('[data-test="phone"]');
    }
    get updateButton() {
        return cy.get('[data-test="update-profile-submit"]');
    }
    get successToast() {
        return cy.contains('successfully updated', { matchCase: false });
    }

    updateContactNumber(newNumber) {
        this.enterText(this.phoneInput, newNumber);
        this.clickElement(this.updateButton);
    }
}

module.exports = new ProfilePage();