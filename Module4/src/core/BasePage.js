class BasePage {
    async navigate(path) {
        await browser.url(`https://practicesoftwaretesting.com/${path}`);
    }

    /**
     * @param element {WebdriverIO.Element | ChainablePromiseElement}
     * @returns {Promise<void>}
     */
    async clickElement(element) {
        await element.waitForDisplayed({ timeout: 10000 });
        await element.click();
    }

    /**
     * @param element {WebdriverIO.Element | ChainablePromiseElement}
     * @param text {string}
     * @returns {Promise<void>}
     */
    async enterText(element, text) {
        await element.waitForDisplayed({ timeout: 10000 });
        await element.setValue(text);
    }

    /**
     * @param element {WebdriverIO.Element | ChainablePromiseElement}
     * @returns {Promise<string>}
     */
    async getText(element) {
        await element.waitForDisplayed({ timeout: 10000 });
        return await element.getText();
    }
}

module.exports = BasePage;
