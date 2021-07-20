const authUser = require('../fixtures/auth-user.json');

describe('Realizar login como administrador', () => {

    beforeEach(() => {
      cy.viewport(1440, 900);
    });
  
    it('Acessar a página de login, inserir e-mail e senha e entrar', () => {
        const { email, password} = authUser;
        cy.visit('/login')
 
          cy.get('#email-login').type('email')
          cy.get('#password-login').type('password')
          cy.get('#button-login').contains('Login').click()
          cy.location('pathname', { timeout: 60000 })
            .should('include', 'admin')

    })
  })

  describe('Realizar login na aplicação como gestor', () => {

    beforeEach(() => {
      cy.viewport(1440, 900);
    });
  
    it('Acessar a página de login, inserir e-mail e senha e entrar', () => {
      cy.visit('/login')
        .then(currentSubject => {
          cy.get('#email-login').type('p.santospaschoal@hotmail.com')
          cy.get('#password-login').type('123456')
          cy.get('#button-login').click()
          cy.location('pathname', { timeout: 60000 })
            .should('include', 'manager')
        })
    })
  })

  describe('Realizar login na aplicação como professor', () => {

    beforeEach(() => {
      cy.viewport(1440, 900);
    });
  
    it('Acessar a página de login, inserir e-mail e senha e entrar', () => {
      //cy.visit('/login')
       // .then(currentSubject => {
       //   cy.get('#email-login').type('p.santospaschoal@hotmail.com')
       //   cy.get('#password-login').type('123456')
       //   cy.get('#button-login').click()
       //   cy.location('pathname', { timeout: 60000 })
        //    .should('include', 'manager')
        //})
    })
  })
  
  describe('Realizar login na aplicação como professor', () => {

    beforeEach(() => {
      cy.viewport(1440, 900);
    });
 
    it('Acessar a página de login, inserir e-mail e senha e entrar', () => {
      //cy.visit('/login')
       // .then(currentSubject => {
       //   cy.get('#email-login').type('p.santospaschoal@hotmail.com')
       //   cy.get('#password-login').type('123456')
       //   cy.get('#button-login').click()
       //   cy.location('pathname', { timeout: 60000 })
        //    .should('include', 'manager')
        //})
    })
  })
  