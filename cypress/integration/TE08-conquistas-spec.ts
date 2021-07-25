
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
        cy.get('#email-login').type('joaquim@gmail.com')
        cy.get('#password-login').type('123456')
        cy.get('#button-login').click()
        cy.location('pathname', { timeout: 60000 })
          .should('include', 'teacher')
  
        cy.get('[ng-reflect-path="/teacher/achievements"] > .tile > p').click()
  
        cy.location('pathname', { timeout: 60000 })
          .should('include', 'achievements')
  
  
      })
    })
    it('Acessar cadastro de conquistas', () => {
      
    })
  })