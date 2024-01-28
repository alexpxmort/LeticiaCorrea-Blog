/* eslint-disable testing-library/await-async-utils */
describe('Page /', () => {
  it('should render home page', () => {
    cy.visit('/');
    cy.contains('Letícia Correa Receitas').should('exist');
    cy.contains('2023 DexTI').should('exist');

    cy.wait(1000);

    const card = cy.get('[data-testid="frango no leite de coco  e pimenta rosa"]');
    card.should('exist');

    card.should('have.attr', 'href').then(title => expect(title).to.match(/receitas/));
  });
});

describe('Page /receitas/{receitaId}', () => {
  it('should render home page', () => {
    cy.visit('/');

    cy.wait(1000);

    const card = cy.get('[data-testid="frango no leite de coco  e pimenta rosa"]');
    card.should('exist');

    card.click();

    cy.wait(200);

    cy.get('[id="loading"]').should('exist');
  });
});
