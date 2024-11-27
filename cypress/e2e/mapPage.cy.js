/* eslint-disable no-undef */
describe('Mapa de Mascotas', () => {
  const baseUrl = 'https://mir-conectando-huellas.vercel.app';
  beforeEach(() => {
    cy.intercept('GET', '**/api/lostpets', { fixture: 'map/lostPets.json' }).as(
      'getMapLostPets',
    );
    cy.intercept('GET', '**/api/adoptionpets', {
      fixture: 'map/adoptPets.json',
    }).as('getMapAdoptPets');
    cy.visit(`${baseUrl}/mapa`);
    cy.wait('@getMapLostPets');
    cy.wait('@getMapAdoptPets');
  });

  it('should load the map page and display the map', () => {
    cy.get('canvas').should('be.visible'); // Verifica que el mapa esté presente
  });

  it('should display markers on the map for lost pets', () => {
    cy.get('svg').filter('[fill="#ff0000"]').should('be.visible');
  });

  it('should show pet details on marker click', () => {
    cy.get('svg').filter('[fill="#ff0000"]').first().click({ force: true }); // Haz clic en el primer marcador

    cy.get('img').should('be.visible'); // Verifica que se muestre la imagen de las mascotas ;
  });
});
