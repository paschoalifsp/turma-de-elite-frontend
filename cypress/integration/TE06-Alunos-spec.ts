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
  
  describe('Cadastrar um Aluno', () => {
  
    beforeEach(() => {
      cy.viewport(1440, 900);
    });
  
    it('Acessar cadastro de Alunos e cadastrar dois alunos', () => {
      cy.intercept({
        method: 'POST',
        url: '/api/students',
      }).as('saveStudent')
  
      cy.visit('/login').then(currentSubject => {
        cy.get('#email-login').type('bianca@gmail.com')
        cy.get('#password-login').type('123456')
        cy.get('#button-login').click()
        cy.location('pathname', { timeout: 60000 })
          .should('include', 'manager')
  
        cy.get('[ng-reflect-path="/manager/students"] > .tile > p').click()
  
        cy.location('pathname', { timeout: 60000 })
          .should('include', 'students')

          //cadastro do primeiro aluno

          cy.get('.toggled-tile > p').click()
          cy.get('#mat-input-3').type('serafina@gmil.com')
          cy.get('#mat-input-4').type('26105')
          cy.get('#mat-input-5').type('Serafina Arcanjo')
          cy.get('.mat-slide-toggle-thumb').click()
          cy.get('.mat-raised-button').click()
          cy.wait('@saveStudent').then((interception) => {
            assert.equal(interception.response?.statusCode, 201)
          })

          //cadastro do segundo aluno

          cy.get('.toggled-tile > p').click()
          cy.get('#mat-input-3').type('lukinhastop@email.com')
          cy.get('#mat-input-4').type('12445')
          cy.get('#mat-input-5').type('Lucas Mendes')
          cy.get('.mat-slide-toggle-thumb').click()
          cy.get('.mat-raised-button').click()
          cy.wait('@saveStudent').then((interception) => {
            assert.equal(interception.response?.statusCode, 201)
          })
      })
    })
  })
  
 
  describe('Alterar Aluno ', () => {
  
    beforeEach(() => {
      cy.viewport(1440, 900);
    });
  
    it('Na página de alunos, ao apagar um dado obrigatório o botao salvaar deverá ser desabilitado', () => {
  
      cy.get(':nth-child(3) > p').click()
      cy.get('#mat-input-4').clear()
      cy.get('.mat-raised-button').should('be.disabled')
  
    })
  
    it('Deve ser possivel alterar os dados de um aluno', () => {
  
      cy.intercept({
        method: 'PUT',
        url: '/api/students/42',
      }).as('changeStudent')
  
      cy.get(':nth-child(4) > p').click()
      cy.get('#mat-input-5').clear()
      cy.get('#mat-input-5').type('Antonia')
      cy.get('.mat-raised-button').click()
  
      cy.wait('@changeStudent').then((interception) => {
        assert.equal(interception.response?.statusCode, 200)
      })
    })
  })
  
  
  describe('Inativar um Aluno', () => {
  
    beforeEach(() => {
      cy.viewport(1440, 900);
    });
  
    it('Ao inativar uma Professor, o seu icone deve ser listado na cor cinza', () => {
  
      cy.get(':nth-child(5) > p').click()
      cy.get('.mat-slide-toggle-thumb').click()
      cy.get('.mat-raised-button').click()
      cy.get(':nth-child(4) > .mat-icon').should('have.class', 'disabled')

  })
  
  })