class ContactPage {
    constructor(page) {
        this.page = page;
        this.submitBtn = page.locator('[data-test="contact-submit"]');
    }
}
module.exports = ContactPage;
