/* eslint-disable no-undef */
describe('Página de Detalles de Mascota en Adopción - AdoptPetDetail', () => {
  const adoptPetUrl = 'https://mir-conectando-huellas.vercel.app/perdidos/';

  beforeEach(() => {
    cy.fixture('lostPetDetail/lostPetDetail').then((data) => {
      cy.intercept('GET', `/api/lostpets/${data.id}`, {
        fixture: 'lostPetDetail/lostPetDetail', // Usar datos simulados desde un archivo fixture
      }).as('getLostPet');
      cy.visit(adoptPetUrl + data.id);
    });
  });

  it('Debe mostrar los detalles de la mascota correctamente', () => {
    cy.wait('@getLostPet');
    cy.get('h1').contains('YUKI');
    cy.get('[alt="Foto de mascota"]').should('be.visible');

    // Verificar información de mascota
    cy.contains('Edad').parent().should('contain', '5 Años');
    cy.contains('Especie').parent().should('contain', 'perro');
    cy.contains('Sexo').parent().should('contain', 'Hembra');
    cy.contains('Raza').parent().should('contain', 'Bulldog');
    cy.contains('Tamaño').parent().should('contain', 'Mediano');
    cy.contains('Fecha de Perdida').parent().should('contain', '2024-11-24');
    cy.contains('Estado').parent().should('contain', 'Perdido');

    // Verificar información de contacto
    cy.contains('Nombre').parent().should('contain', 'antony antezana cavero');
    cy.contains('Celular').parent().should('contain', '980559058');
    cy.contains('Dirección').parent().should('contain', 'CARABAYLLO');

    // Verificar mapa
    cy.contains('Ubicación de lugar de perdida').should('exist');
    cy.get('div[class= "maplibregl-map"]').should('be.visible');
  });
});
