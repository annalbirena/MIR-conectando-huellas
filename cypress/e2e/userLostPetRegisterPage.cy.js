/* eslint-disable no-undef */
import 'cypress-file-upload';
describe('UserPetRegisterPage', () => {
  const baseUrl = 'https://mir-conectando-huellas.vercel.app'; // Cambia esto por la URL base de tu app
  beforeEach(() => {
    cy.signIn('aantezana25@gmail.com', 'aaeacM25051993#');
    cy.wait(2000);
    cy.visit(`${baseUrl}/mi-cuenta/publicar-mascota`); // Ruta de la página de registro
  });
  it('Debe cargar la lista de especies correctamente', () => {
    // Simula una respuesta de la API con especies
    cy.intercept('GET', '/api/species', {
      fixture: 'species/species.json',
    }).as('getSpecies');

    // Espera a que se haga la llamada a la API
    cy.wait('@getSpecies');

    // Verifica que las especies aparezcan en el formulario
  });

  it('Debe cambiar entre los tabs correctamente', () => {
    // Verifica que el tab inicial sea "Mascota Perdida"
    cy.contains('MASCOTA PERDIDA').should('exist');
    cy.contains('Datos de Pérdida').should('exist');

    // Cambia al tab de "Mascota en Adopción"
    cy.contains('MASCOTA EN ADOPCIÓN').click();

    // Verifica que el formulario cambie al de adopción
    cy.contains('Fecha de pérdida').should('not.visible');
  });

  it('should submit the form successfully', () => {
    cy.intercept('POST', '/api/images/upload', (req) => {
      req.reply({
        statusCode: 200,
        body: {
          secure_url: 'https://example.com/garfield.jpg',
          public_id: 'pets/garfield',
        },
      });
    }).as('uploadImage');

    // Interceptar POST de creación de mascota perdida
    cy.intercept('POST', '/api/lostpets', (req) => {
      req.reply({
        statusCode: 201,
        body: {
          message: 'Mascota registrada exitosamente',
        },
      });
    }).as('createLostPet');
    // Completar los campos del formulario
    cy.contains('Nombre de mascota').parent().type('Garfield');
    cy.contains('Tipo').parent().click();
    cy.contains('gato').click();
    cy.get('input')
      .filter('[type="number"]')
      .first()
      .type('2', { force: true });
    cy.get('select').first().select('Meses');
    cy.contains('Sexo').click();
    cy.contains('Macho').click();
    cy.contains('Raza').type('Desconocida');
    cy.contains('Tamaño').click();
    cy.contains('Pequeño').click();
    cy.contains('Fecha de pérdida').type('2024-11-01');
    cy.contains('Descripción adicional').type(
      'Pequeño gato, busca una familia que lo adopte.',
    );
    cy.get('input')
      .filter('[type="file"]')
      .first()
      .selectFile('cypress/fixtures/garfield.jpg', { force: true });
    // Configurar ubicación simulada
    cy.get('canvas')
      .filter('[class="maplibregl-canvas"]')
      .first()
      .click(300, 300, { force: true });

    // Llenar datos de contacto
    cy.get('input').filter('[type="checkbox"]').first().click();

    // Enviar formulario
    cy.get('button[type="submit"]').first().click();

    // Verificar que se haya enviado correctamente
    cy.wait('@uploadImage').its('response.statusCode').should('eq', 200);
    cy.wait('@createLostPet').its('response.statusCode').should('eq', 201);

    // Verificar notificación de éxito
    cy.contains('Se registró tu mascota perdida').should('be.visible');
  });

  it('Debe simular un error en el servidor al cargar la imagen', () => {
    // Interceptar error en la carga de imagen
    cy.intercept('POST', '/api/images/upload', (req) => {
      req.reply({
        statusCode: 500,
        body: {
          message: 'Error al cargar la imagen',
        },
      });
    }).as('uploadImageError');

    cy.contains('Nombre de mascota').parent().type('Garfield');
    cy.contains('Tipo').parent().click();
    cy.contains('gato').click();
    cy.get('input')
      .filter('[type="number"]')
      .first()
      .type('2', { force: true });
    cy.get('select').first().select('Meses');
    cy.contains('Sexo').click();
    cy.contains('Macho').click();
    cy.contains('Raza').type('Desconocida');
    cy.contains('Tamaño').click();
    cy.contains('Pequeño').click();
    cy.contains('Fecha de pérdida').type('2024-11-01');
    cy.contains('Descripción adicional').type(
      'Pequeño gato, busca una familia que lo adopte.',
    );
    cy.get('input')
      .filter('[type="file"]')
      .first()
      .selectFile('cypress/fixtures/garfield.jpg', { force: true });
    // Configurar ubicación simulada
    cy.get('canvas')
      .filter('[class="maplibregl-canvas"]')
      .first()
      .click(300, 300, { force: true });

    // Llenar datos de contacto
    cy.get('input').filter('[type="checkbox"]').first().click();

    // Enviar formulario
    cy.get('button[type="submit"]').first().click();
    // Verificar que se muestra el mensaje de error
    cy.wait('@uploadImageError');

    cy.contains(
      'Hubo un error al cargar la imagen, intenta nuevamente.',
    ).should('exist');
  });

  it('Debe simular un error al registrar la mascota', () => {
    // Interceptar solicitud con error en el registro
    cy.intercept('POST', '/api/lostpets', (req) => {
      req.reply({
        statusCode: 400,
        body: {
          message: 'Error al registrar la mascota',
        },
      });
    }).as('createLostPetError');

    cy.contains('Nombre de mascota').parent().type('Garfield');
    cy.contains('Tipo').parent().click();
    cy.contains('gato').click();
    cy.get('input')
      .filter('[type="number"]')
      .first()
      .type('2', { force: true });
    cy.get('select').first().select('Meses');
    cy.contains('Sexo').click();
    cy.contains('Macho').click();
    cy.contains('Raza').type('Desconocida');
    cy.contains('Tamaño').click();
    cy.contains('Pequeño').click();
    cy.contains('Fecha de pérdida').type('2024-11-01');
    cy.contains('Descripción adicional').type(
      'Pequeño gato, busca una familia que lo adopte.',
    );
    cy.get('input')
      .filter('[type="file"]')
      .first()
      .selectFile('cypress/fixtures/garfield.jpg', { force: true });
    // Configurar ubicación simulada
    cy.get('canvas')
      .filter('[class="maplibregl-canvas"]')
      .first()
      .click(300, 300, { force: true });

    // Llenar datos de contacto
    cy.get('input').filter('[type="checkbox"]').first().click();

    // Enviar formulario
    cy.get('button[type="submit"]').first().click();
    cy.wait('@createLostPetError');
    cy.contains(
      'Hubo un error al crear la mascota, intenta nuevamente.',
    ).should('exist');
  });
});
