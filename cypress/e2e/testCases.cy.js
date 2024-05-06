import * as selectors from "../support/selectors";

describe('Contact page', () => {
    it('Create Contact', () => {
        const randomName = Math.random().toString(36).substring(3)
        const randomID = Math.floor(Math.random() * 90000000) + 10000000;
        cy.loginViaFE()
        cy.goToContactsviaHeader()
        cy.createContact(randomName, randomID)
    });

    it('Edit Contact', () => {
        const randomName = Math.random().toString(36).substring(3)
        const randomID = Math.floor(Math.random() * 90000000) + 10000000;

        const newRandomName = Math.random().toString(36).substring(3)
        const newRandomID = Math.floor(Math.random() * 90000000) + 10000000;
        const randomEmail = Math.random().toString(36).substring(7) + '@test.cz';
        cy.loginViaFE()
        cy.goToContactsviaHeader()
        cy.createContact(randomName, randomID)
        //confirms that new contact is visible and contains correct data
        cy.assertValues(selectors.FIRST_ROW_FIRST_COLUMN, randomName);
        cy.assertValues(selectors.FIRST_ROW_SECOND_COLUMN, randomID);
        cy.get(selectors.ICON_EDIT).eq(1).click()
        cy.editContact(newRandomName, newRandomID, randomEmail)
        //confirms that  contact is edited successfully, visible and contains correct data
        cy.assertValues(selectors.FIRST_ROW_FIRST_COLUMN, newRandomName);
        cy.assertValues(selectors.FIRST_ROW_SECOND_COLUMN, newRandomID);
        cy.assertValues(selectors.FIRST_ROW_THIRD_COLUMN, randomEmail);
    });

    it('Sort Contact by Name', () => {
        cy.intercept('GET', '/api/contacts/?page=1&sort=name+ascending').as('sortByAsc')
        cy.intercept('GET', '/api/contacts/?page=1&sort=name+descending').as('sortByDesc')
        const randomName = Math.random().toString(36).substring(3)
        const randomID = Math.floor(Math.random() * 90000000) + 10000000;
        const secondContactName = Math.random().toString(36).substring(3)
        const secondId = Math.floor(Math.random() * 90000000) + 10000000;
        cy.loginViaFE()
        cy.goToContactsviaHeader()
        cy.createContact(randomName, randomID)
        cy.waitForInterceptedRequestAndAssertStatusCode('@sortByAsc', 200);
        cy.createContact(secondContactName, secondId)
        cy.waitForInterceptedRequestAndAssertStatusCode('@sortByAsc', 200);
        cy.get(selectors.CARET_WRAPPER).eq(0).find('i').eq(1).click();
        cy.waitForInterceptedRequestAndAssertStatusCode('@sortByDesc', 200);
    });
    it('Search by ID', () => {
        cy.intercept('GET', '/api/contacts/?page=1&sort=name+ascending').as('sortByAsc')
        cy.intercept('GET', '/api/contacts/?page=1&sort=name+descending').as('sortByDesc')
        cy.intercept('GET', '/api/contacts/search?**').as('search')
        const randomName = Math.random().toString(36).substring(3)
        const randomID = Math.floor(Math.random() * 90000000) + 10000000;
        const secondContactName = Math.random().toString(36).substring(3)
        const secondId = Math.floor(Math.random() * 90000000) + 10000000;
        cy.loginViaFE()
        cy.goToContactsviaHeader()
        cy.createContact(randomName, randomID)
        cy.waitForInterceptedRequestAndAssertStatusCode('@sortByAsc', 200);
        cy.createContact(secondContactName, secondId)
        cy.waitForInterceptedRequestAndAssertStatusCode('@sortByAsc', 200);
        cy.get(selectors.SEARCH_INPUT).clear().type(secondId);
        cy.waitForInterceptedRequestAndAssertStatusCode('@search', 200);
        cy.assertValues(selectors.FIRST_ROW_FIRST_COLUMN, secondContactName);
        cy.assertValues(selectors.FIRST_ROW_SECOND_COLUMN, secondId);
    });

    it.only('Create invoice via contact details, check invoice count and price', () => {

        const randomName = Math.random().toString(36).substring(3)
        const randomID = Math.floor(Math.random() * 90000000) + 10000000;
        const supplierName = Math.random().toString(36).substring(3)
        const unitPrice = Math.floor(Math.random() * 10001);
        cy.loginViaFE()
        cy.goToContactsviaHeader()
        cy.createContact(randomName, randomID)
        // 0 invoices
        cy.assertValues(selectors.FIRST_ROW_FIFTH_COLUMN, '0');
        cy.get(selectors.FIRST_ROW_FIRST_COLUMN).find('a').click()
        cy.get(selectors.CREATE_INVOICE_BUTTON).eq(1).click()
        cy.generateRandomRegistrationNumber().then(randomRegistrationNumber => {
            cy.get(selectors.REGISTRATION_NUMBER_INPUT).clear().type(randomRegistrationNumber)
            cy.get(selectors.REFERENCE_INPUT)
                .clear()
                .type(randomRegistrationNumber)
        });

        cy.get(selectors.INVOICE_SELLER_NAME_INPUT)
            .scrollIntoView().clear().type(supplierName)
        cy.get(selectors.LABEL_FOR_PRICE_INPUT)
            .next()
            .find('input')
            .clear()
            .type(unitPrice)

        cy.clickSaveButton();
        cy.checkAlertTitleExists();
        cy.clickContactsBreadcrumbs();
        //it shows 1 invoice in contacts page
        cy.assertValues(selectors.FIRST_ROW_FIFTH_COLUMN, '1');
        cy.goToInvoicesviaHeader()
        const environment = Cypress.env('environmentName');
        if (environment === 'com') cy.assertValues(selectors.FIRST_ROW_SIXTH_COLUMN, unitPrice.toLocaleString())
        else cy.assertValues(selectors.FIRST_ROW_SIXTH_COLUMN, unitPrice.toLocaleString('sk-SK'))
    });
});
