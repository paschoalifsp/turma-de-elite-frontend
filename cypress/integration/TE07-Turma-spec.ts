describe('Realizar login na aplicação como gestor', () => {

    beforeEach(() => {
      cy.viewport(1440, 900);
    });
  
    it('Acessar a página de login, inserir e-mail e senha e entrar', () => {
      cy.visit('/login')
        .then(currentSubject => {
          cy.get('#email-login').type('bianca@gmail.com')
          cy.get('#password-login').type('123456')
          cy.get('#button-login').click()
          cy.location('pathname', { timeout: 60000 })
            .should('include', 'manager')
        })
    })
  })
  
  describe('Cadastrar uma turma e cadastrar uma turma', () => {
  
    beforeEach(() => {
      cy.viewport(1440, 900);
    });
  
    it('Acessar cadastro de Turmas', () => {
      cy.intercept({
        method: 'POST',
        url: '/api/class',
      }).as('saveClass')
  
      cy.visit('/login').then(currentSubject => {
        cy.get('#email-login').type('bianca@gmail.com')
        cy.get('#password-login').type('123456')
        cy.get('#button-login').click()
        cy.location('pathname', { timeout: 60000 })
          .should('include', 'manager')
  
        cy.get('[ng-reflect-path="/manager/classes"] > .tile > p').click()
  
        cy.location('pathname', { timeout: 60000 })
          .should('include', 'classes')

          cy.get('.toggled-tile > p').click()
          cy.get('#cdk-step-label-0-0 > .mat-step-label > .mat-step-text-label').click()
          cy.get('#mat-input-4').type('jpedro@gmil.com')
          cy.wait(2000)
          cy.get('#mat-input-4').type('{downarrow}{enter}')
          cy.get('app-teacher-table.ng-star-inserted > [fxlayoutalign="space-between"] > .mat-focus-indicator').click()
          cy.wait(2000)
         // cy.get('.mat-row > .cdk-column-name').should('have.', 'José Pedro')
          cy.get('#cdk-step-label-0-1 > .mat-step-label > .mat-step-text-label').click()


          cy.get('#mat-input-5').type('26105')
          cy.wait(2000)
          cy.get('#mat-input-5').type('{downarrow}{enter}')
          //cy.get('app-student-table.ng-star-inserted > .mat-table > tbody > .mat-row > .cdk-column-name').should('have.text', 'Serafina Arcanjo')
          cy.get('[style="flex-direction: row; box-sizing: border-box; display: flex;"] > .mat-focus-indicator > .mat-button-wrapper > .mat-icon').click();
          cy.wait(2000)
          cy.get('#cdk-step-label-0-2 > .mat-step-label > .mat-step-text-label').click();
          cy.get('#mat-input-3').type('Turminha do barulho')
          cy.get('[data-cy=isActive]').click()
          cy.get('.mat-vertical-content > .mat-flat-button').click()
          cy.wait('@saveClass').then((interception) => {
            assert.equal(interception.response?.statusCode, 201)
       })
    })
  })
  
 
  describe('Alterar turma', () => {
  
    beforeEach(() => {
      cy.viewport(1440, 900);
    });
  
    it('Na página de turmas, ao apagar um dado obrigatório o botao salvaar deverá ser desabilitado', () => {
  
      cy.get(':nth-child(3) > p').click()
      cy.get('#mat-input-3').clear()
      cy.get('.mat-vertical-content > .mat-flat-button').should('be.disabled')
  
    })
  
    it('Alterar um dado de uma turma', () => {
  
      cy.intercept({
        method: 'PUT',
        url: '/api/class/6',
      }).as('changeClass')
  
      cy.get('#mat-input-3').clear()
      cy.get('#mat-input-3').type('Turma do bairro')
      cy.get('.mat-vertical-content > .mat-flat-button').click()
  
      cy.wait('@changeClass').then((interception) => {
        assert.equal(interception.response?.statusCode, 200)
      })
    })
  })
  
  
  describe('Inativar uma turma', () => {
  
    beforeEach(() => {
      cy.viewport(1440, 900);
    });
  
    it('Ao inativar uma turma, o seu icone deve ser listado na cor cinza', () => {
  
      cy.get(':nth-child(3) > p').click()
      cy.get('[data-cy=isActive]').click()
      cy.get('.mat-vertical-content > .mat-flat-button').click()
      cy.get(':nth-child(3) > .mat-icon').should('have.class', 'disabled')
      cy.get('[data-cy=isActive]').click()
      cy.get('.mat-vertical-content > .mat-flat-button').click()
  })
  
  })

})