@e2e
Feature: All scenarios gathered from previous modules

  @smoke @login
  Scenario: 1. Existing user logs in with valid credentials
    Given I navigate to the login page
    When I login with "customer@practicesoftwaretesting.com" and "welcome01"
    Then I should see the user menu

  @regression @search
  Scenario: 2. Customer searches for an exact product
    Given I navigate to the home page
    When I search for "Pliers"
    Then I should see the product in the results

  @smoke @cart
  Scenario: 3. Adding a product to the basket
    Given I navigate to the home page
    When I add the first product to my cart
    Then the cart badge should display "1"

  @regression @favorites
  Scenario: 4. Authenticated user adds an item to favorites
    Given I navigate to the login page
    And I login with "customer@practicesoftwaretesting.com" and "welcome01"
    When I navigate to the home page
    And I click the first product
    And I add it to favorites
    Then I should see the favorites toast notification

  @smoke @register
  Scenario: 5. Visitor registers a new customer account
    Given I navigate to the register page
    When I fill out the registration form with valid data
    Then I should be redirected to the login page

  @regression @filter
  Scenario: 6. Filtering by category and sorting by price
    Given I navigate to the home page
    When I filter by the "Hand Tools" category
    And I sort by price descending
    Then I should see products displayed

  @regression @profile
  Scenario: 7. User updates their profile contact number
    Given I navigate to the login page
    And I login with "customer@practicesoftwaretesting.com" and "welcome01"
    When I navigate to my profile
    And I update my contact number to "0987654321"
    Then I should see a profile updated success message

  @e2e @checkout
  Scenario: 8. Successful checkout process
    Given I navigate to the login page
    And I login with "customer@practicesoftwaretesting.com" and "welcome01"
    And I navigate to the home page
    And I add the first product to my cart
    When I navigate to the cart and proceed through all checkout steps
    And I enter my payment details and finish
    Then I should see a successful payment message

  @regression @contact
  Scenario: 9. Visitor submits a contact message
    Given I navigate to the home page
    When I click the contact menu
    Then the contact form should be visible