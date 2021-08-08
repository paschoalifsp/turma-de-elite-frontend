
import { accessClassPage, accessLoginPage, closeClass, editClass, loginClass } from "./fechar-turma-actions";

describe('Encerramento de turmas', () => {
    beforeEach(() => {
        cy.viewport(1366, 768);
        cy.intercept('GET', '/api/classes?*', { fixture: 'fechar-turma/turmas' })
        cy.intercept('GET', '/api/classes/*', { fixture: 'fechar-turma/geografia'})
        cy.intercept('POST', '/api/classes', { statusCode: 201 })
        cy.intercept('PUT', '/api/classes/*', { statusCode: 200 })
        
    })

    it('Deve realizar login como professor', () => {
        
        accessLoginPage()
        
        const login = {
            "email": "jose@gmail.com",
            "password": "123456"
        }

        loginClass(login)

        cy.location('pathname', { timeout: 60000 })
        .should('include', 'teacher')
    })

 
    it('Ao clicar em turma, deverá ser redirecionado para a tela de turmas e encerrar turma', () => {


        accessClassPage();

        cy.location('pathname', { timeout: 60000 })
            .should('include', 'classes')

            editClass(10)
          

        cy.intercept({
            method: 'PUT',
            url: '/api/class/10/close',
        }).as('closeClass')  

        closeClass()

    })
  
})     
            
