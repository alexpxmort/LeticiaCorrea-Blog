// cypress/integration/example.spec.js
describe('Page /', () => {
  it('should render home page', () => {
    cy.visit('/');
    cy.contains('Letícia Correa Receitas').should('exist');
    cy.contains('2023 DexTI').should('exist');
  });
});
