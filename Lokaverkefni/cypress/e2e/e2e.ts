describe('E2E-Project-CRUD-actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  }) 

  it('Visits the site', () => {
    cy.contains('Welcome to my online store!');
  });
});