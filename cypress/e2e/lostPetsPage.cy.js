/* eslint-disable no-undef */
describe('Página de Perdidos - Conectando Huellas', () => {
  const baseUrl = 'https://mir-conectando-huellas.vercel.app';

  beforeEach(() => {
    cy.visit(`${baseUrl}/perdidos`); // Navegar directamente a la página de adopción
  });

  it('Debe cargar correctamente la página de perdidos', () => {
    // Verificar elementos principales
    cy.contains('Especie').should('exist');
    cy.get('h1').should('contain.text', 'Mascotas'); // Título principal
    cy.get('div[class="m_4081bf90 mantine-Group-root"]').should('exist'); // Verificar que se cargan tarjetas de mascotas
    cy.get('span').should('contain.text', 'Especie'); // Campo de filtro por especie
  });

  it('Debe filtrar mascotas por especie (ejemplo: Perro)', () => {
    // Seleccionar una especie en el filtro
    cy.intercept(
      'GET',
      '/api/lostpets/filters/filter?specieId=cm2m9vp6d00002ur3m326cq9u',
      { fixture: 'lostPetsPage/filteredPets.json' },
    ).as('filterPets');
    cy.contains('Especie').click(); // seleccionar el filtro de especie
    cy.get('input[value="cm2m9vp6d00002ur3m326cq9u"]').click(); // Hacer click en la opción 'Perro';
    cy.get('button').contains('Filtrar').click();
    cy.wait('@filterPets'); // hacer click en filtrar
    cy.get('div[class="m_4081bf90 mantine-Group-root"]').should('exist'); // Verificar que hay resultados
  });

  it('Debe filtrar mascotas por sexo ', () => {
    // Seleccionar una especie en el filtro
    cy.intercept('GET', '/api/lostpets/filters/filter?sex=male', {
      fixture: 'lostPetsPage/filteredPets.json',
    }).as('filterPets');
    cy.contains('Sexo').click(); // seleccionar el filtro de especie
    cy.get('input[value="male"]').click(); // Hacer click en la opción 'Perro';
    cy.get('button').contains('Filtrar').click();
    cy.wait('@filterPets'); // hacer click en filtrar
    cy.get('div[class="m_4081bf90 mantine-Group-root"]').should('exist'); // Verificar que hay resultados
  });

  it('Debe filtrar mascotas por tamaño ', () => {
    // Seleccionar una especie en el filtro
    cy.intercept('GET', '/api/lostpets/filters/filter?size=small', {
      fixture: 'lostPetsPage/filteredPets.json',
    }).as('filterPets');
    cy.contains('Tamaño').click(); // seleccionar el filtro de especie
    cy.get('input[value="small"]').click(); // Hacer click en la opción 'Perro';
    cy.get('button').contains('Filtrar').click();
    cy.wait('@filterPets'); // hacer click en filtrar
    cy.get('div[class="m_4081bf90 mantine-Group-root"]').should('exist');
  });
  it('Debe filtrar mascotas por fecha de perdida ', () => {
    // Seleccionar una especie en el filtro
    cy.intercept(
      'GET',
      '/api/lostpets/filters/filter?lostDateMin=2024-11-05T05%3A00%3A00.000Z&lostDateMax=2024-11-21T05%3A00%3A00.000Z',
      {
        fixture: 'lostPetsPage/filteredPets.json',
      },
    ).as('filterPets');
    cy.contains('Fecha de perdida').click();
    cy.contains('Seleccione rango de fecha').click();
    cy.get('button').contains('5').click();
    cy.get('button').contains('21').click();
    cy.get('button').contains('Filtrar').click();
    cy.wait('@filterPets');
    cy.get('div[class="m_4081bf90 mantine-Group-root"]').should('exist');
  });

  it('Debe filtrar mascotas por mas de un filtro (tamaño y sexo) ', () => {
    // Seleccionar una especie en el filtro
    cy.intercept('GET', '/api/lostpets/filters/filter?size=small&sex=female', {
      fixture: 'lostPetsPage/filteredPets.json',
    }).as('filterPets');
    cy.contains('Tamaño').click(); // seleccionar el filtro de especie
    cy.get('input[value="small"]').click(); // Hacer click en la opción 'Perro';
    cy.contains('Sexo').click(); // seleccionar el filtro de especie
    cy.get('input[value="female"]').click();
    cy.get('button').contains('Filtrar').click();
    cy.wait('@filterPets'); // hacer click en filtrar
    cy.get('div[class="m_4081bf90 mantine-Group-root"]').should('exist'); // Verificar que hay resultados
  });

  it('Debe mostrar un mensaje si no hay mascotas disponibles para un filtro', () => {
    // Aplicar un filtro que probablemente no tenga resultados
    cy.intercept(
      'GET',
      '/api/lostpets/filters/filter?specieId=cm2m9vvys00022ur30iu6wrw7',
      { body: [] },
    ).as('filterNoResults');
    cy.contains('Especie').click();
    cy.get('input[value="cm2m9vvys00022ur30iu6wrw7"]').click(); // Verificar que se muestra la opció 'Perro').click();
    cy.get('button').contains('Filtrar').click();
    cy.wait('@filterNoResults');
    cy.contains('No existen mascotas').should('exist'); // Mensaje esperado
  });

  it('Debe navegar a los detalles de una mascota', () => {
    cy.intercept('GET', '/api/lostpets/cm3vzq8d00004lv2y64s6ucku', {
      fixture: 'lostPetsPage/petDetail.json',
    }).as('getPetDetails');

    // Hacer clic en la primera tarjeta
    cy.get('div[class="m_4081bf90 mantine-Group-root"]')
      .contains('Más información')
      .click();
    cy.wait('@getPetDetails');
    cy.url().should('include', '/perdidos/'); // Confirmar redirección a detalles
    cy.get('h1').should('exist'); // Verificar que se muestra el título
    cy.contains('Especie').should('exist'); // Verificar que los detalles son visibles
  });

  it('Debe regresar a la página de adopción desde los detalles', () => {
    // Navegar a detalles y luego regresar
    cy.get('div[class="m_4081bf90 mantine-Group-root"]')
      .contains('Más información')
      .click();
    cy.get('a[class="m_f678d540 mantine-Breadcrumbs-breadcrumb"]').click(); // Botón para regresar
    cy.url().should('include', '/perdidos'); // Confirmar que regresa a adopción
  });
});
