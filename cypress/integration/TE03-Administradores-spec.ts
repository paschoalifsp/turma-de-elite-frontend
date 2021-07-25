describe('Cadastrar uma administrador', () => {

    beforeEach(() => {
      cy.viewport(1440, 900);
    });
  
    it('Cadastrar um administrador', () => {
      cy.intercept({
        method: 'POST',
        url: '/api/admin',
      }).as('saveAdmin')
  
      cy.visit('/login').then(currentSubject => {
        cy.get('#email-login').type('andre.montero702@gmail.com')
        cy.get('#password-login').type('123456')
        cy.get('#button-login').click()
        cy.location('pathname', { timeout: 60000 })
          .should('include', 'admin')
  
        cy.get('[ng-reflect-path="/admin/admins"] > .tile > p').click()
  
        cy.location('pathname', { timeout: 60000 })
          .should('include', 'admins')
        cy.get('[data-cy=createAdmin]').click()
        cy.get('[data-cy=email]').type('jcarlos@gmail.com')
        cy.get('[data-cy=name]').type('João Carlos')
        cy.get('[data-cy=isActive]').click()
        cy.get('[data-cy=save]').click()
        cy.wait('@saveAdmin').then((interception) => {
          assert.equal(interception.response?.statusCode, 201)
        })
  
  
      })
    })
  })
  
  describe('Alterar administrador', () => {
  
    beforeEach(() => {
      cy.viewport(1440, 900);
    });
  
    it('Na página de administradores, ao apagar um dado obrigatório o botao salvaar deverá ser desabilitado', () => {
  
      cy.get('#9').click()
      cy.get('[data-cy=name]').clear()

      cy.get('[data-cy="save"]').should('be.disabled')
  
    })
  
    it('Alterar um dado de uma administrador', () => {
  
      cy.intercept({
        method: 'PUT',
        url: '/api/admins/8',
      }).as('changeAdmin')
  
      cy.get('#8').click()
      cy.get('[data-cy=name]').clear()
      cy.get('[data-cy=name]').type('Maria Clara')

      cy.get('[data-cy=save]').click()
  
      cy.wait('@changeAdmin').then((interception) => {
        assert.equal(interception.response?.statusCode, 200)
      })
    })
  })
  
  
  describe('Inativar um Usuário', () => {
  
    beforeEach(() => {
      cy.viewport(1440, 900);
    });
  
    it('Ao inativar uma escola, o seu icone deve ser listado na cor cinza', () => {
  
      cy.get('#9').click()
      cy.get('[data-cy=isActive]').click()
      cy.get('[data-cy=save]').click()
  
     // cy.get('#11').find('icon').should('be.disablade')
  
  })
  
  })
  