/* eslint-disable no-undef */
describe('Página de Detalles de Mascota en Adopción - AdoptPetDetail', () => {
  const adoptPetUrl = 'https://mir-conectando-huellas.vercel.app/adopcion/';

  beforeEach(() => {
    cy.fixture('adoptionPetDetail/adoptPetDetail').then((data) => {
      cy.intercept('GET', `/api/adoptionpets/${data.id}`, {
        fixture: 'adoptionPetDetail/adoptPetDetail', // Usar datos simulados desde un archivo fixture
      }).as('getAdoptPet');
      cy.visit(adoptPetUrl + data.id);
    });
  });

  it('Debe mostrar los detalles de la mascota correctamente', () => {
    cy.wait('@getAdoptPet');
    cy.get('h1').contains('Garfield');
    cy.get('[alt="Foto de mascota"]').should('be.visible');

    // Verificar información de mascota
    cy.contains('Edad').parent().should('contain', '3 Meses');
    cy.contains('Especie').parent().should('contain', 'gato'); // Según la especie en tu sistema
    cy.contains('Sexo').parent().should('contain', 'Macho');
    cy.contains('Raza').parent().should('contain', ''); // Sin raza definida
    cy.contains('Tamaño').parent().should('contain', 'Pequeño');
    cy.contains('Estado').parent().should('contain', 'En Adopción');

    // Verificar información de contacto
    cy.contains('Nombre').parent().should('contain', 'Alex Puma Prado');
    cy.contains('Celular').parent().should('contain', '975565672');
    cy.contains('Dirección').parent().should('contain', 'Av Lima 154 SMP');

    // Verificar mapa
    cy.contains('Ubicación de mascota').should('exist');
    cy.get('div[class= "maplibregl-map"]').should('be.visible');
  });
});
