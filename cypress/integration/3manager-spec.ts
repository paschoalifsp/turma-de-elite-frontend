describe('Cadastrar um gestor', () => {

    beforeEach(() => {
      cy.viewport(1440, 900);
    });
  
    it('Cadastrar um gestor', () => {
      cy.intercept({
        method: 'POST',
        url: '/admin/managers',
      }).as('saveManager')
  
      cy.visit('/login').then(currentSubject => {
        cy.get('#email-login').type('patricia.paschoal@aluno.ifsp.edu.br')
        cy.get('#password-login').type('123456')
        cy.get('#button-login').click()
        cy.location('pathname', { timeout: 60000 })
        .should('include', 'admin')

        cy.get('[data-cy=manager]').click()
  
        cy.location('pathname', { timeout: 60000 })
          .should('include', 'managers')

        cy.get('[data-cy=createManager]').click()
        cy.get('[data-cy=email]').type('joana@gmail.com')
        cy.get('[data-cy=name]').type('Joana')
        cy.get('[data-cy=school]').type('Escola JS')
        cy.get('[data-cy=school]').type('{downarrow}{enter}')
        cy.get('[data-cy=isActive]').click()
        cy.get('[data-cy=save]').click()
        cy.wait('@saveManager').then((interception) => {
          assert.equal(interception.response?.statusCode, 201)
        })

      })
    })
  })
  
  describe('Alterar gestor', () => {
  
    beforeEach(() => {
      cy.viewport(1440, 900);
    });
  
    it('Na página de gestores, ao apagar um dado obrigatório o botao salvaar deverá ser desabilitado', () => {
  
      cy.get('#14').click()
      cy.get('[data-cy=name]').clear()
      cy.get('[data-cy=save]').should('be.disabled')
  
    })
  
    it('Alterar um dado de um gestor', () => {
  
      cy.intercept({
        method: 'PUT',
        url: '/api/managers/13',
      }).as('changeManager')
  
      cy.get('#13').click()
      cy.get('[data-cy=name]').clear()
      cy.get('[data-cy=name]').type('Rosangela')

      cy.get('[data-cy=save]').click()
  
      cy.wait('@changeManager').then((interception) => {
        assert.equal(interception.response?.statusCode, 200)
      })
    })
  })
  
  
  describe('Inativar um Gestor', () => {
  
    beforeEach(() => {
      cy.viewport(1440, 900);
    });
  
    it('Ao inativar uma escola, o seu icone deve ser listado na cor cinza', () => {
  
      cy.get('#14').click()
      cy.get('[data-cy=isActive]').click()
      cy.get('[data-cy=save]').click()
  
     // cy.get('#11').find('icon').should('be.disablade')
  
  })
  
  })
  