const RegisterPage = require('../../src/business/po/pages/RegisterPage');
const StorePage = require('../../src/business/po/pages/StorePage');
const ProfilePage = require('../../src/business/po/pages/ProfilePage');
const CheckoutPage = require('../../src/business/po/pages/CheckoutPage');
const LoginPage = require('../../src/business/po/pages/LoginPage');
const HeaderComponent = require('../../src/business/po/components/HeaderComponent');
const ProductDetailsPage = require('../../src/business/po/pages/ProductPage');

describe('Cypress - Remaining Scenarios POM', () => {

    it('Scenario 5: Visitor registers a new customer account', () => {
        RegisterPage.open();

        const randomEmail = `johndoe${Date.now()}@example.com`;

        RegisterPage.registerUser({
            firstName: 'John',
            lastName: 'Doe',
            dob: '1990-01-01',
            street: '123 Cypress Lane',
            postalCode: '12345',
            city: 'Testville',
            state: 'Texas',
            country: 'US',
            phone: '1234567890',
            email: randomEmail,
            password: 'Sparga123!@'
        });

        cy.url().should('include', '/auth/login');
    });

    it('Scenario 6: Filtering by category and sorting by price', () => {
        StorePage.open();

        StorePage.filterByCategory('Hand Tools');
        StorePage.sortBy('price,desc');

        StorePage.productCards.should('have.length.greaterThan', 0);
    });

    it('Scenario 7: User updates their profile contact number', () => {
        LoginPage.open();
        LoginPage.login('customer@practicesoftwaretesting.com', 'welcome01');

        HeaderComponent.goToProfile();

        ProfilePage.updateContactNumber('0987654321');

        ProfilePage.successToast.should('be.visible');
    });

    it('Scenario 8: Successful checkout process', () => {
        LoginPage.open();
        LoginPage.login('customer@practicesoftwaretesting.com', 'welcome01');
        HeaderComponent.navMenu.should('be.visible');

        HeaderComponent.navHome.click();
        StorePage.firstProduct.click();
        ProductDetailsPage.addToCartBtn.click();
        cy.contains('Product added to shopping cart.').should('be.visible');
        ProductDetailsPage.cartBadge.should('have.text', '1');

        HeaderComponent.goToCart();
        CheckoutPage.proceedToAddress();
        CheckoutPage.fillAddressAndProceed('Texas', '12345');

        CheckoutPage.fillPaymentAndFinish({
            method: 'credit-card',
            cardNumber: '1234-5678-1234-5678',
            expiration: '12/2090',
            cvv: '123',
            cardHolder: 'Lingu Dingu'
        });

        CheckoutPage.paymentSuccessMessage.should('be.visible');
    });
});