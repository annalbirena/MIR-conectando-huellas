/* eslint-disable no-undef */
describe('Página de Inicio - HomePage', () => {
  const baseUrl = 'https://mir-conectando-huellas.vercel.app';

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it('Debe mostrar el título principal correctamente', () => {
    cy.get('h1').contains(
      '¡Busca a tu amigo perdido o encuentra a tu nuevo compañero!',
    );
  });

  it('Debe mostrar la imagen principal', () => {
    cy.get('img[src="/pet-and-dog.png"]').should('be.visible');
  });

  it('Debe contener el texto sobre la conexión con mascotas', () => {
    cy.get('p').contains('El amor de un animal no tiene límites');
    cy.get('p span').contains('Conectando huellas');
  });

  it('Debe tener un botón que redirige a "Publicar Mascota"', () => {
    cy.get('a[href="/mi-cuenta/publicar-mascota"]')
      .should('contain', '¡Registra tu mascota!')
      .click();
    // Verificar la redirección
    if (cy.get('button').contains('Inicia Sesión')) {
      cy.url().should('include', '/login');
    } else {
      cy.url().should('include', '/mi-cuenta/publicar-mascota');
    }
  });

  it('Debe cargar y mostrar datos dinámicos en las pestañas (PetTab)', () => {
    // Interceptar los datos para PetTab (ejemplo: mascotas perdidas y en adopción)
    cy.intercept('GET', '/api/lostpets', {
      fixture: 'homePage/lostPets.json',
    }).as('getLostPets');
    cy.intercept('GET', '/api/adoptionpets', {
      fixture: 'homePage/adoptPets.json',
    }).as('getAdoptPets');

    // Esperar la carga inicial
    cy.wait(['@getLostPets', '@getAdoptPets']);
    // cy.wait(['@getAdoptPets']);

    // Verificar que las pestañas cargan datos correctamente
    cy.contains('MASCOTAS PERDIDAS').click();
    cy.get(
      'div[class="_card_bn9uv_1 m_e615b15f mantine-Card-root m_1b7284a3 mantine-Paper-root"]',
    ).should('have.length.greaterThan', 0);

    cy.contains('MASCOTAS EN ADOPCIÓN').click();
    cy.get(
      'div[class="_card_bn9uv_1 m_e615b15f mantine-Card-root m_1b7284a3 mantine-Paper-root"]',
    ).should('have.length.greaterThan', 0);
  });

  it('Debe mantener el diseño y alineación correcta', () => {
    cy.viewport('macbook-15'); // Verificar en pantalla grande
    cy.get('h1').should('have.css', 'text-align', 'center');

    cy.viewport('iphone-6'); // Verificar en pantalla móvil
    cy.get('h1').should('have.css', 'text-align', 'center');
  });
});
