

export function doLogin(role: 'ADMIN'|'STUDENT'|'TEACHER'|'MANAGER'){
    cy.viewport(1980,980);
    cy.intercept({
        method: 'GET',
        url: '/api/roles'
    },
    role
    ).as('getRole')
    cy.visit('/login')
    cy.get('#email-login').type('patricia@email.com')
        cy.get('#password-login').type('123456')
        cy.get('#button-login').click()
        cy.location('pathname', { timeout: 60000 })
          .should('include', role.toLowerCase())



        cy.wait('@getRole').then(interception => {
        })
}