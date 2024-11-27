/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('signIn', (username, password) => {
  cy.visit('https://mir-conectando-huellas.vercel.app');
  cy.get('button:contains("Inicia Sesión")').click();
  cy.url().should('include', 'login');
  cy.get('input[placeholder="correo@email.com"]').type(username);
  cy.get('input[placeholder="Contraseña"]').type(password);
  cy.get('button[type="submit"]').click();
});
