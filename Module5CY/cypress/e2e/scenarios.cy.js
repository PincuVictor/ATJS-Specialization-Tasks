describe('Remaining Scenarios', () => {

    it('Scenario 5: Visitor registers a new customer account', () => {
        cy.visit('/auth/register');

        cy.get('[data-test="first-name"]').type('John');
        cy.get('[data-test="last-name"]').type('Doe');
        cy.get('[data-test="dob"]').type('1990-01-01');
        cy.get('[data-test="street"]').type('123 Cypress Lane');
        cy.get('[data-test="postal_code"]').type('12345');
        cy.get('[data-test="city"]').type('Testville');
        cy.get('[data-test="state"]').type('Texas');
        cy.get('[data-test="country"]').select('US');
        cy.get('[data-test="phone"]').type('1234567890');

        const randomEmail = `johndoe${Date.now()}@example.com`;
        cy.get('[data-test="email"]').type(randomEmail);
        cy.get('[data-test="password"]').type('Sparga123!@');

        cy.get('[data-test="register-submit"]').click();

        cy.url().should('include', '/auth/login');
    });

    it('Scenario 6: Filtering by category and sorting by price', () => {
        cy.visit('/');

        cy.contains('label', 'Hand Tools').find('input').check();

        cy.get('[data-test="sort"]').select('price,desc');

        cy.get('.card').should('have.length.greaterThan', 0);
    });

    it('Scenario 7: User updates their profile contact number', () => {
        cy.visit('/auth/login');
        cy.get('[data-test="email"]').type('customer@practicesoftwaretesting.com');
        cy.get('[data-test="password"]').type('welcome01');
        cy.get('[data-test="login-submit"]').click();

        cy.get('[data-test="nav-menu"]').click();
        cy.get('[data-test="nav-my-profile"]').click();

        cy.get('[data-test="phone"]').clear().type('0987654321');
        cy.get('[data-test="update-profile-submit"]').click();

        cy.contains('successfully updated', { matchCase: false }).should('be.visible');
    });

    it('Scenario 8: Successful checkout process', () => {

        cy.visit('/auth/login');
        cy.get('[data-test="email"]').type('customer@practicesoftwaretesting.com');
        cy.get('[data-test="password"]').type('welcome01');
        cy.get('[data-test="login-submit"]').click();


        cy.get('[data-test="nav-menu"]').should('be.visible');

        cy.get('[data-test="nav-home"]').click();

        cy.get('[data-test^="product-"]').first().click();
        cy.get('[data-test="add-to-cart"]').click();

        cy.contains('Product added to shopping cart.').should('be.visible');
        cy.get('[data-test="cart-quantity"]').should('have.text', '1');

        cy.get('[data-test="nav-cart"]').click();
        cy.get('[data-test="proceed-1"]').click();

        cy.get('[data-test="proceed-2"]').click();

        cy.get('[data-test="state"]').type('Texas');
        cy.get('[data-test="postal_code"]').type('12345');
        cy.get('[data-test="proceed-3"]').click();

        cy.get('[data-test="payment-method"]').select('credit-card');
        cy.get('[data-test="credit_card_number"]').type('1234-5678-1234-5678');
        cy.get('[data-test="expiration_date"]').type('12/2090');
        cy.get('[data-test="cvv"]').type('123');
        cy.get('[data-test="card_holder_name"]').type('Lingu Dingu');
        cy.get('[data-test="finish"]').click();

        cy.contains('Payment was successful').should('be.visible');
    });

});