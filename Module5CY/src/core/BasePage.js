class BasePage {
    navigate(path) {
        cy.visit(path);
    }

    clickElement(element) {
        element.click();
    }

    enterText(element, text) {
        element.clear().type(text);
    }

    selectOption(element, value) {
        element.select(value);
    }
}

module.exports = BasePage;