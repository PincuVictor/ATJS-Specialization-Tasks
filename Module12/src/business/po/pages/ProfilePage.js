const { expect } = require('@playwright/test');

class ProfilePage {
    constructor(page) {
        this.page = page;
        this.phoneInput = page.locator('[data-test="phone"]');
        this.submitBtn = page.locator('[data-test="update-profile-submit"]');
        this.successAlert = page.locator('.alert-success');
    }

    async updatePhoneNumber() {
        const uniquePhone = '098' + Math.floor(1000000 + Math.random() * 9000000);

        await this.phoneInput.click();
        await this.phoneInput.clear();
        await this.phoneInput.pressSequentially(uniquePhone, { delay: 50 });
        await this.page.keyboard.press('Tab');

        await this.submitBtn.waitFor({ state: 'visible', timeout: 5000 });
        await this.submitBtn.click();
    }
}
module.exports = ProfilePage;
