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
  
  describe('Cadastrar um Professor', () => {
  
    beforeEach(() => {
      cy.viewport(1440, 900);
    });
  
    it('Acessar cadastro de Professores', () => {
      cy.intercept({
        method: 'POST',
        url: '/api/teachers',
      }).as('saveTeacher')
  
      cy.visit('/login').then(currentSubject => {
        cy.get('#email-login').type('p.santospaschoal@hotmail.com')
        cy.get('#password-login').type('123456')
        cy.get('#button-login').click()
        cy.location('pathname', { timeout: 60000 })
          .should('include', 'manager')
  
        cy.get('[data-cy=teacher]').click()
  
        cy.location('pathname', { timeout: 60000 })
          .should('include', 'teachers')

          cy.get('[data-cy=create]').click()
          cy.get('[data-cy=email]').type('jpedro@gmil.com')
          cy.get('[data-cy=name]').type('José Pedro')
          cy.get('[data-cy=school]').type('Escola JS')
          cy.wait(4000)
          cy.get('[data-cy=school]').type('{downarrow}{enter}')
          cy.get('[data-cy=isActive]').click()
          cy.get('[data-cy=save]').click()
          cy.wait('@saveTeacher').then((interception) => {
            assert.equal(interception.response?.statusCode, 201)
          })
  
  
      })
    })
  })
  
 
  describe('Alterar Professor', () => {
  
    beforeEach(() => {
      cy.viewport(1440, 900);
    });
  
    it('Na página de professores, ao apagar um dado obrigatório o botao salvaar deverá ser desabilitado', () => {
  
      cy.get('#25').click()
      cy.get('[data-cy=name]').clear()
      cy.get('[data-cy=save]').should('be.disabled')
  
    })
  
    it('Alterar um dado de um Professor', () => {
  
      cy.intercept({
        method: 'PUT',
        url: '/api/teachers/18',
      }).as('changeTeacher')
  
      cy.get('#18').click()
      cy.get('[data-cy=name]').clear()
      cy.get('[data-cy=name]').type('Professor')
      cy.get('[data-cy=save]').click()
  
      cy.wait('@changeTeacher').then((interception) => {
        assert.equal(interception.response?.statusCode, 200)
      })
    })
  })
  
  
  describe('Inativar uma Professor', () => {
  
    beforeEach(() => {
      cy.viewport(1440, 900);
    });
  
    it('Ao inativar uma Professor, o seu icone deve ser listado na cor cinza', () => {
  
      cy.get('#25').click()
      cy.get('[data-cy=isActive]').click()
      cy.get('[data-cy=save]').click()
  
     // cy.get('#11').find('icon').should('be.disablade')
  
  })
  
  })
  