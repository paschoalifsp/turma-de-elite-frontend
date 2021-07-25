

describe('Cadastrar uma escola', () => {

    beforeEach(() => {
      cy.viewport(1440, 900);
    });
  
    it('Cadastrar uma escola', () => {
      cy.intercept({
        method: 'POST',
        url: '/api/schools',
      }).as('saveSchool')
  
      cy.visit('/login').then(currentSubject => {
        cy.get('#email-login').type('andre.montero702@gmail.com')
        cy.get('#password-login').type('123456')
        cy.get('#button-login').click()
        cy.location('pathname', { timeout: 60000 })
          .should('include', 'admin')
  
        cy.get('[ng-reflect-path="/admin/schools"] > .tile > p').click()
  
        cy.location('pathname', { timeout: 60000 })
          .should('include', 'schools')
        cy.get(':nth-child(2) > p').click()
        cy.get('#mat-input-3').type('Escola SP')
        cy.get('#mat-input-4').type('ESC-SP')
        cy.get('.mat-slide-toggle-thumb').click()
        cy.get('.mat-raised-button').click()
        cy.wait('@saveSchool').then((interception) => {
          assert.equal(interception.response?.statusCode, 201)
        })
  
  
      })
    })
  })
  
  describe('Alterar escola', () => {
  
    beforeEach(() => {
      cy.viewport(1440, 900);
    });
  
    it('Na página de escolas, ao apagar um dado obrigatório o botao salvaar deverá ser desabilitado', () => {
  
      cy.get(':nth-child(4) > p').click()
      cy.get('#mat-input-4').clear()
      cy.get('.mat-raised-button').should('be.disabled')
    })
  
    it('Alterar um dado de uma escola', () => {
  
      cy.intercept({
        method: 'PUT',
        url: '/api/schools/2',
      }).as('changeSchool')
  
      cy.get('.toggled-tile > p').click()
      cy.get('#mat-input-4').clear()
      cy.get('#mat-input-4').type('NWS')
    
      cy.get('.mat-raised-button').click()
  
      cy.wait('@changeSchool').then((interception) => {
        assert.equal(interception.response?.statusCode, 200)
      })
    })
  })
  
  
  describe('Inativar uma escola', () => {
  
    beforeEach(() => {
      cy.viewport(1440, 900);
    });
  
    it('Ao inativar uma escola, o seu icone deve ser listado na cor cinza', () => {
  
      cy.get(':nth-child(5) > p').click()
      cy.get('.mat-slide-toggle-thumb').click()
      cy.get('.mat-raised-button').click()
  
     // cy.get('#11').find('icon').should('be.disablade')
  
  })
  
  })