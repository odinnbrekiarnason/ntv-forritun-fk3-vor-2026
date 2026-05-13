

describe('E2E-Project-CRUD-actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  }) 

  it('Visits the site and adds a new project', () => {
    cy.contains('Add project').click();

    cy.get('input[name="name"]').type('New Project');
    cy.get('input[name="description"]').type('This is a new project.');
    cy.get('button[type="submit"]').click();

    cy.contains('New Project').should('exist');
    cy.contains('New Project').click();
    cy.contains('Add task').click();

    cy.get('input[name="title"]').type('New Task');
    cy.get('input[name="description"]').type('This is a new task.');
    cy.get('button[type="submit"]').click();

    cy.contains('New Task').should('exist');

    cy.get('button[title="Edit task"]').click();
    cy.get('input[name="title"]').clear().type('Updated Task');
    cy.get('input[name="description"]').clear().type('This is an updated task.');
    cy.get('button[type="submit"]').click();

    cy.contains('Updated Task').should('exist');
    cy.contains('New Task').should('not.exist');
  });
});