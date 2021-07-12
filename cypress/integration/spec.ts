describe('Realizar login na aplicação', () => {

  beforeEach(() => {
    cy.viewport(1440, 900);
  });

  it('Acessar a página de login, inserir e-mail e senha e entrar', () => {
    cy.visit('/login')
    //   .then(currentSubject => {
    //   cy.get('#email-login').type('andre.montero702@gmail.com')
    //   cy.get('#password-login').type('123456')
    //   cy.get('#button-login').click()
    //   cy.location('pathname', {timeout: 60000})
    //     .should('include', 'admin')
    // })
  })
})
