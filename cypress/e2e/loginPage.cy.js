/* eslint-disable no-undef */
describe('Pruebas E2E para LoginPage', () => {
  const baseUrl = 'https://mir-conectando-huellas.vercel.app'; // Cambia esto por la URL base de tu app
  const validEmail = 'email@email.com';
  const validPassword = 'contraseña';
  const invalidEmail = 'correo_invalido';
  const invalidPassword = 'contraseña_invalida';

  beforeEach(() => {
    cy.visit(`${baseUrl}/login`);
  });

  it('Debe mostrar errores de validación si los campos están vacíos', () => {
    cy.get('button[type="submit"]').click();

    cy.contains('Correo inválido').should('be.visible');
    cy.contains('Debe tener al menos 8 carácteres').should('be.visible');
  });

  it('Debe mostrar un error si el correo tiene un formato incorrecto', () => {
    cy.get('input[placeholder="correo@email.com"]').type(invalidEmail);
    cy.get('input[placeholder="Contraseña"]').type(validPassword);
    cy.get('button[type="submit"]').click();

    cy.contains('Correo inválido').should('be.visible');
  });

  it('Debe iniciar sesión exitosamente con credenciales válidas', () => {
    // Simular un backend con intercept para la autenticación exitosa
    cy.intercept('POST', '/api/users/login', {
      statusCode: 200,
      body: {
        user: { email: validEmail },
        token: 'fake-jwt-token',
      },
    }).as('authenticateUser');

    cy.get('input[placeholder="correo@email.com"]').type(validEmail);
    cy.get('input[placeholder="Contraseña"]').type(validPassword);
    cy.get('button[type="submit"]').click();

    cy.wait('@authenticateUser');
    cy.url().should('include', '/mi-cuenta/datos-personales');
    cy.contains('Inicio de sesión correcto.').should('be.visible');
  });

  it('Debe mostrar un mensaje de error con credenciales incorrectas', () => {
    // Simular un backend con credenciales incorrectas
    cy.intercept('POST', 'api/users/login', {
      statusCode: 400,
      body: { error: 'Contraseña inválida' },
    }).as('authenticateUserError');

    cy.get('input[placeholder="correo@email.com"]').type(validEmail);
    cy.get('input[placeholder="Contraseña"]').type(invalidPassword);
    cy.get('button[type="submit"]').click().wait('@authenticateUserError');

    // cy.wait('@authenticateUserError').its('response.statusCode').should('eq', 400);
    cy.contains('Hubo un error al iniciar sesión').should('be.visible');
  });
});
