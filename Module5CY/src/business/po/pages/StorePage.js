const BasePage = require('../../../core/BasePage');

class StorePage extends BasePage {
    get sortDropdown() {
        return cy.get('[data-test="sort"]');
    }
    get productCards() {
        return cy.get('.card');
    }
    get firstProduct() {
        return cy.get('[data-test^="product-"]').first();
    }

    open() {
        this.navigate('/');
    }

    filterByCategory(categoryName) {
        cy.contains('label', categoryName).find('input').check();
    }

    sortBy(sortValue) {
        this.selectOption(this.sortDropdown, sortValue);
    }
}

module.exports = new StorePage();
