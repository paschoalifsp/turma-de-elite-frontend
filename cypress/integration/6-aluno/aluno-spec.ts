import { doLogin } from "../1-login/user-actions-spec";
import { accessLoginPage, accessStudentPage, clearEmail, createStudent, editStudent, fillStudentFields, loginStudent, save, saveButtonShouldDisabled } from "./aluno-actions";

describe('CRUD de Aluno', () => {
    beforeEach(() => {
        cy.viewport(1366, 768);
        cy.intercept('GET', '/api/students?*', { fixture: 'aluno/alunos' })
        cy.intercept('GET', '/api/students/*', { fixture: 'aluno/karina-manoela'})
        cy.intercept('POST', '/api/students', { statusCode: 201 })
        cy.intercept('PUT', '/api/students/*', { statusCode: 200 })
        
    })

    it('Deve realizar login como gestor', () => {

        doLogin("MANAGER")

        cy.location('pathname', { timeout: 60000 })
        .should('include', 'manager')
    })

 
    it('Ao clicar em alunos, deverá ser redirecionado para a tela de cadastros de administradores e cadastrar um aluno', () => {


        accessStudentPage();
        cy.location('pathname', { timeout: 60000 })
            .should('include', 'students')

        createStudent()

        const student = {
            "id":8,
            "email":"kmanoela@gmail.com",
            "name":"Karina Manoela Pepe",
            "registry":"0001",
            "isActive":true

        };

        fillStudentFields(student);

        cy.intercept({
            method: 'POST',
            url: '/api/students',
        }).as('registerStudent')

        save()

        cy.wait('@registerStudent').then((interception) => {
            assert.strictEqual(interception.response?.statusCode, 201)
        })

        

    })


    it('Deve ser possível editar um aluno', () => {
        
        editStudent(8)


        const student = {
            "id":8,
            "email":"kmanoela@gmail.com",
            "name":"Karina Manoela Pepe",
            "registry":"0001",
            "isActive":true

        };

        fillStudentFields(student);

        cy.intercept({
            method: 'PUT',
            url: '/api/students/8',
        }).as('updateStudent')

        save()

        cy.wait('@updateStudent').then((interception) => {
            assert.strictEqual(interception.response?.statusCode, 200)
        })

    

    })

    it('Durante a edição ao apagar um dado obrigatório, o botao salvar deve ficar desabilitado', () => {
        editStudent(8)

        clearEmail()

        saveButtonShouldDisabled()

    })


})     
            
