

describe('Add Project', () => {
  it('Visits the site', () => {
    cy.visit('http://localhost:5173/');

    cy.contains('Add Project').click();

    cy.get('input[name="projectName"]').type('New Project');
    cy.get('textarea[name="projectDescription"]').type('This is a new project.');
    cy.contains('Submit').click();
  });
});
