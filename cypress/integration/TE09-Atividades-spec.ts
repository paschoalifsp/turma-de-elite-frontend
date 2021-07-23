describe('Realizar login na aplicação como professor', () => {

    beforeEach(() => {
      cy.viewport(1440, 900);
    });
  
    it('Acessar a página de login, inserir e-mail e senha e entrar', () => {
      cy.visit('/login')
        .then(currentSubject => {
          cy.get('#email-login').type('jpedro@gmil.com')
          cy.get('#password-login').type('123456')
          cy.get('#button-login').click()
          cy.location('pathname', { timeout: 60000 })
            .should('include', 'teacher')
        })
    })
  })
  
  describe('Cadastrar uma Atividade', () => {
  
    beforeEach(() => {
      cy.viewport(1440, 900);
    });
  
    it('Acessar cadastro de atividades e cadastrar uma atividade', () => {
      cy.intercept({
        method: 'POST',
        url: '/api/activities',
      }).as('saveActivity')
  
      cy.visit('/login').then(currentSubject => {
        cy.get('#email-login').type('jpedro@gmil.com')
        cy.get('#password-login').type('123456')
        cy.get('#button-login').click()
        cy.location('pathname', { timeout: 60000 })
          .should('include', 'teacher')
  
        cy.get('[ng-reflect-path="/teacher/activities"] > .tile > p').click()
  
        cy.location('pathname', { timeout: 60000 })
          .should('include', 'activities')



         // cy.get('.toggled-tile > p').click()
          cy.get('#mat-input-2').type('Biomas Brasileiros')
          cy.get('#mat-input-3').type('10')
         // cy.get('.mat-select-placeholder').click()
         // cy.get('#mat-option-4 > .mat-option-text').click()
         // cy.get('#mat-option-5 > .mat-option-text').click()
         // cy.get('.title').click({force: true})
          cy.get('.mat-datepicker-toggle-default-icon > path').click({force: true})
          cy.get(':nth-child(5) > [data-mat-col="2"]').click({force: true})
          cy.get('.actions > .mat-focus-indicator').click({force: true})
          cy.get('.mat-form-field-suffix > .mat-focus-indicator > .mat-button-wrapper > .mat-icon').click({force: true});
          cy.get('.mat-form-field-suffix > .mat-focus-indicator > .mat-button-wrapper > .mat-icon').attachFile('example.json', {force: true} )
          //cy.get('#mat-input-5').attachFile('iiu.pdf');
          cy.get('#mat-input-6').type('Responda as questoes', {force: true})
          cy.get('#mat-checkbox-1 > .mat-checkbox-layout > .mat-checkbox-inner-container').click({force: true})
          cy.get('#mat-checkbox-2 > .mat-checkbox-layout > .mat-checkbox-inner-container').click({force: true})
          cy.get('.mat-raised-button').click({force: true})
          cy.get('.mat-raised-button').click({force: true})
          cy.wait('@saveActivity').then((interception) => {
            assert.equal(interception.response?.statusCode, 201)
          })   
      })
    })
  })
  
 
  describe('Alterar atividade ', () => {
  
    beforeEach(() => {
      cy.viewport(1440, 900);
    });
  
    it('Na página de atividades, ao apagar um dado obrigatório o botao salvaar deverá ser desabilitado', () => {
  
      cy.get(':nth-child(2) > p').click({force: true})
      cy.get('#mat-input-6').clear()
      cy.get('.mat-raised-button').should('be.disabled')
  
    })
  
    it('Deve ser possivel alterar os dados de um aluno', () => {
  
      cy.intercept({
        method: 'PUT',
        url: '/api/activities/1',
      }).as('changeActivity')
  
     
      cy.get('#mat-input-6').type('Mudando a descrição')
      cy.get('.mat-raised-button').click()
  
      cy.wait('@changeActivity').then((interception) => {
        assert.equal(interception.response?.statusCode, 200)
      })
    })
  })
  
  
  describe('Inativar um Aluno', () => {
  
    beforeEach(() => {
      cy.viewport(1440, 900);
    });
  
    it('Ao inativar uma Professor, o seu icone deve ser listado na cor cinza', () => {
  
      cy.get(':nth-child(3) > p').click()
      cy.get('.mat-slide-toggle-thumb').click()
      cy.get('#mat-checkbox-1 > .mat-checkbox-layout > .mat-checkbox-inner-container').click()
      cy.get('.mat-raised-button').click()
      cy.get(':nth-child(3) > .mat-icon').should('have.class', 'disabled')

  })
  
  })