describe('The Home Page', () => {
  // (2)
  it('Successfully loads', () => {
    // (2)
    // NAVIGATION
    // cypress will load '<http://localhost:4200>'. (3)
    cy.visit('/');

    // ASSERTION
    cy.get('.highlight-card').children('span').should('have.text', 'testingApp app is running!');
  });
});
