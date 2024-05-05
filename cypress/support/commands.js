import * as selectors from './selectors';

Cypress.Commands.add('visitOnDomain', (args, domain = Cypress.env('currentDomain')) => {
  const customVisitCommand = `visit${domain.charAt(0).toUpperCase()}${domain.slice(1)}`;
  cy[customVisitCommand](args);
});

Cypress.Commands.add('visitCz', (args) => {
  cy.visit(`https://dev.fakturaonline.cz${args}`);
});

Cypress.Commands.add('visitCom', (args) => {
  cy.visit(`https://dev.invoiceonline.com${args}`);
});

Cypress.Commands.add('visitSk', (args) => {
  cy.visit(`https://dev.fakturaonline.sk${args}`);
});
Cypress.Commands.add('clickSaveButton', () => {
  cy.get(selectors.SAVE_BUTTON).scrollIntoView().click();
});

Cypress.Commands.add('checkAlertTitleExists', () => {
  cy.get(selectors.ALERT_TITLE).should('exist');
});

Cypress.Commands.add('clickContactsBreadcrumbs', () => {
  cy.get(selectors.CONTACTS_BREADCRUMBS).scrollIntoView().click();
});

Cypress.Commands.add('waitForInterceptedRequestAndAssertStatusCode', (alias, expectedStatusCode) => {
  cy.wait(alias).then(interception => {
    expect(interception.response.statusCode).to.equal(expectedStatusCode);
  });
});

Cypress.Commands.add('loginViaFE', () => {
  cy.visit('/')
  cy.intercept('POST', '/api/subscriptions').as('subscriptionsRequest');
  cy.get(selectors.LOGIN_HEADER_BUTTON).click()
  const randomEmail = Math.random().toString(36).substring(7) + '@test.cz';
  cy.get(selectors.LOGIN_EMAIL).type(randomEmail).should('have.value', randomEmail);
  cy.get(selectors.LOGIN_TRY_BUTTON).click()

  cy.waitForInterceptedRequestAndAssertStatusCode('@subscriptionsRequest', 201);
});

Cypress.Commands.add('goToContactsviaHeader', () => {
  cy.get(selectors.NAVBAR_NAVIGATION).eq(2).click()
});

Cypress.Commands.add('goToInvoicesviaHeader', () => {
  cy.get(selectors.NAVBAR_NAVIGATION).eq(1).click()
});

Cypress.Commands.add('createContact', (randomName, randomID) => {
  cy.intercept('GET', '/api/contacts/new').as('newContacts');
  cy.intercept('POST', '/api/contacts').as('contactCreated');
  cy.get(selectors.CONTACTS_TABLE_ADD_BUTTON).click()
  cy.waitForInterceptedRequestAndAssertStatusCode('@newContacts', 200);
  cy.get(selectors.CONTACTS_NAME_INPUT).type(randomName)
  cy.get(selectors.CONTACTS_COMPANY_NUMBER_INPUT).type(randomID)
  cy.get(selectors.CONTACTS_SAVE_BUTTON).click()
  cy.waitForInterceptedRequestAndAssertStatusCode('@contactCreated', 201);
});

Cypress.Commands.add('editContact', (randomName, randomID, email) => {
  cy.intercept('PUT', '/api/contacts/**').as('contactEdited');
  cy.get(selectors.CONTACTS_NAME_INPUT).clear().type(randomName)
  cy.get(selectors.CONTACTS_EMAIL).clear().type(email)
  cy.get(selectors.CONTACTS_COMPANY_NUMBER_INPUT).clear().type(randomID)
  cy.get(selectors.CONTACTS_SAVE_BUTTON).click()
  cy.waitForInterceptedRequestAndAssertStatusCode('@contactEdited', 200);
});

Cypress.Commands.add('assertValues', (selector, randomName) => {
  cy.get(selector)
      .invoke('text')
      .then(text => {
        expect(text).to.contain(randomName);
      });
});

Cypress.Commands.add('generateRandomRegistrationNumber', () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear().toString();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based, so add 1
  const randomDigits = Math.floor(Math.random() * 10000).toString().padStart(4, '0'); // Generate a 4-digit random number
  const registrationNumber = year + month + randomDigits;
  return registrationNumber;
});

Cypress.Commands.add('formatNumber', (number) => {
  const environment = Cypress.env('environmentName');
  if (environment === 'com') {
    return new Intl.NumberFormat('en-US').format(number);
  } else {
    return new Intl.NumberFormat('en-US').format(number).replace(',', ' ')
  }
});