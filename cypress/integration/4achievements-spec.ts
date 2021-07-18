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

describe('Cadastrar uma conquista', () => {

  beforeEach(() => {
    cy.viewport(1440, 900);
  });

  it('Acessar cadastro de conquistas', () => {
    cy.intercept({
      method: 'POST',
      url: '/api/achievements',
    }).as('saveAchievements')

    cy.visit('/login').then(currentSubject => {
      cy.get('#email-login').type('p.santospaschoal@hotmail.com')
      cy.get('#password-login').type('123456')
      cy.get('#button-login').click()
      cy.location('pathname', { timeout: 60000 })
        .should('include', 'manager')

      cy.get('[data-cy=achievements]').click()

      cy.location('pathname', { timeout: 60000 })
        .should('include', 'achievements')


    })
  })
})