describe('Realizar login na aplicação', () => {

  beforeEach(() => {
    cy.viewport(1440, 900);
  });

  it('Acessar a página de login, inserir e-mail e senha e entrar', () => {
    cy.visit('/login')
      .then(currentSubject => {
        cy.get('#email-login').type('patricia.paschoal@aluno.ifsp.edu.br')
        cy.get('#password-login').type('123456')
        cy.get('#button-login').click()
        cy.location('pathname', { timeout: 60000 })
          .should('include', 'admin')
      })
  })
})

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
      cy.get('#email-login').type('patricia.paschoal@aluno.ifsp.edu.br')
      cy.get('#password-login').type('123456')
      cy.get('#button-login').click()
      cy.location('pathname', { timeout: 60000 })
        .should('include', 'admin')

      cy.get('[data-cy=school]').click()

      cy.location('pathname', { timeout: 60000 })
        .should('include', 'schools')
      cy.get('[data-cy=create]').click()
      cy.get('[data-cy=name]').type('Escola PSP')
      cy.get('[data-cy=identifier]').type('ESC-PSP')
      cy.get('[data-cy=isActive]').click()
      cy.get('[data-cy="save"]').click()
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

    cy.get('#newschool').click()
    cy.get('[data-cy=name]').clear()
    cy.get('[data-cy=identifier]').clear()
    cy.get('[data-cy="save"]').should('be.disabled')

  })

  it('Alterar um dado de uma escola', () => {

    cy.intercept({
      method: 'PUT',
      url: '/api/schools/6',
    }).as('changeSchool')

    cy.get('#newschool').click()
    cy.get('[data-cy=identifier]').clear()
    cy.get('[data-cy=name]').clear()
    cy.get('[data-cy=name]').type('newschool')
    cy.get('[data-cy=identifier]').type('NWS')
    cy.get('[data-cy="save"]').click()

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

    cy.get('#EscolaTeste').click()
    cy.get('[data-cy=isActive]').click()
    cy.get('[data-cy="save"]').click()

   // cy.get('#11').find('icon').should('be.disablade')

})

})
