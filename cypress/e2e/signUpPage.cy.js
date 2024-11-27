/* eslint-disable no-undef */
describe('Signup Page', () => {
  beforeEach(() => {
    // Accede a la página de registro
    cy.visit('https://mir-conectando-huellas.vercel.app/registrar-usuario');
  });

  it('Debe mostrar errores de validación en campos requeridos', () => {
    // Intenta enviar el formulario vacío
    cy.get('button[type="submit"]').click();

    // Verifica errores de validación en cada campo
    cy.contains('Debe tener al menos 3 carácteres').should('exist'); // Nombre
    cy.contains('Correo inválido').should('exist'); // Correo
    cy.contains('Debe tener al menos 8 carácteres').should('exist'); // Contraseña
    cy.contains('Celular inválido').should('exist'); // Celular
    cy.contains('Debe tener al menos 6 carácteres').should('exist'); // Dirección
  });

  it('Debe registrar un usuario con datos válidos', () => {
    // Llena el formulario con datos válidos
    cy.get('input[placeholder="Ingresa tu nombre"]').type('Juan Pérez');
    cy.get('input[placeholder="correo@email.com"]').type(
      'juan.perez@example.com',
    );
    cy.get('input[placeholder="Contraseña"]').type('Password123!');
    cy.get('input[placeholder="999111999"]').type('999999999');
    cy.get('input[placeholder="Ingresa tu dirección"]').type(
      'Av. Principal 123',
    );

    // Intercepta la llamada para verificar si el correo ya existe
    cy.intercept('GET', '/api/users/email/*', {
      statusCode: 200,
      body: null, // Indica que el correo no existe
    }).as('checkEmail');

    // Intercepta la llamada para crear un nuevo usuario
    cy.intercept('POST', '/api/users', {
      statusCode: 201,
      body: {
        id: 1,
        name: 'Juan Pérez',
        email: 'juan.perez@example.com',
      },
    }).as('createUser');

    // Envía el formulario
    cy.get('button[type="submit"]').click();

    // Verifica la notificación de éxito
    cy.contains('¡Usuario registrado!').should('exist');

    // Verifica que el formulario se haya reiniciado
    cy.get('input[placeholder="Ingresa tu nombre"]').should('have.value', '');
    cy.get('input[placeholder="correo@email.com"]').should('have.value', '');
  });

  it('Debe mostrar error si el correo ya existe', () => {
    // Llena el formulario con un correo existente
    cy.get('input[placeholder="Ingresa tu nombre"]').type('Juan Pérez');
    cy.get('input[placeholder="correo@email.com"]').type(
      'juan.perez@example.com',
    );
    cy.get('input[placeholder="Contraseña"]').type('Password123!');
    cy.get('input[placeholder="999111999"]').type('999999999');
    cy.get('input[placeholder="Ingresa tu dirección"]').type(
      'Av. Principal 123',
    );

    // Intercepta la llamada para verificar si el correo ya existe
    cy.intercept('GET', '/api/users/email/*', {
      statusCode: 200,
      body: {
        id: 1,
        email: 'ya.existe@example.com',
      },
    }).as('checkEmail');

    // Envía el formulario
    cy.get('button[type="submit"]').click();

    // Verifica la notificación de error
    cy.contains('¡Correo ya existe!').should('exist');
  });

  it('Debe manejar errores del servidor al crear un usuario', () => {
    // Llena el formulario con datos válidos
    cy.get('input[placeholder="Ingresa tu nombre"]').type('Juan Pérez');
    cy.get('input[placeholder="correo@email.com"]').type(
      'juan.perez@example.com',
    );
    cy.get('input[placeholder="Contraseña"]').type('Password123!');
    cy.get('input[placeholder="999111999"]').type('999999999');
    cy.get('input[placeholder="Ingresa tu dirección"]').type(
      'Av. Principal 123',
    );

    // Intercepta la llamada para verificar si el correo ya existe
    cy.intercept('GET', '/api/users/email/*', {
      statusCode: 200,
      body: null, // Indica que el correo no existe
    }).as('checkEmail');

    // Intercepta la llamada para crear un nuevo usuario, simulando un error del servidor
    cy.intercept('POST', '/api/users', {
      statusCode: 500,
      body: {
        message: 'Error al crear el usuario',
      },
    }).as('createUser');

    // Envía el formulario
    cy.get('button[type="submit"]').click();

    // Verifica la notificación de error
    cy.contains('No se pudo crear el usuario, intenta nuevamente.').should(
      'exist',
    );
  });
});
