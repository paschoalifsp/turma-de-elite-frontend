describe('Realizar login na aplicação', () => {

    beforeEach(() => {
      cy.viewport(1440, 900);
      cy.request('POST', '/login', { username: 'patricia.paschoal@aluno.ifsp.edu.br' })
      .its('body')
      .as('currentUser')
    });

  
    it('Acessar a página de login, inserir e-mail e senha e entrar', () => {
      
     // const { username, password } = this.currentUser
      cy.visit('/login')


         .then(currentSubject => {
         cy.get('#email-login').type('patricia.paschoal@aluno.ifsp.edu.br')
         cy.get('#password-login').type('123456')
         cy.get('#button-login').click()
         cy.location('pathname', {timeout: 60000})
           .should('include', 'admin')
       })
    })
  })


  it('sets auth cookie when logging in via form submission', function () {
    // destructuring assignment of the this.currentUser object
    const { username, password } = this.currentUser

    cy.visit('/login')

    cy.get('input[name=username]').type(username)

    // {enter} causes the form to submit
    cy.get('input[name=password]').type(`${password}{enter}`)

    // we should be redirected to /dashboard
    cy.url().should('include', '/dashboard')

    // our auth cookie should be present
    cy.getCookie('your-session-cookie').should('exist')

    // UI should reflect this user being logged in
    cy.get('h1').should('contain', 'jane.lane')
  })



