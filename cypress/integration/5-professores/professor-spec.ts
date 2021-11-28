import { doLogin } from "../1-login/user-actions-spec";
import { accessLoginPage, accessTeacherPage, clearEmail, createTeacher, editTeacher, fillTeacherFields, loginManager, save, saveButtonShouldDisabled } from "./professor-actions";

describe('CRUD de Professores', () => {
    beforeEach(() => {
        cy.viewport(1366, 768);

        cy.intercept('GET', '/api/teachers?*', { fixture: 'professor/professores' })
        cy.intercept('GET', '/api/teachers/*', { fixture: 'professor/henrique'})
        cy.intercept('POST', '/api/teachers', { statusCode: 201 })
        cy.intercept('PUT', '/api/teachers/*', { statusCode: 200 })
        
    })

    it('Deve realizar login como gestor', () => {

        doLogin("MANAGER")
        

        cy.location('pathname', { timeout: 60000 })
        .should('include', 'manager')
    })

 
    it('Ao clicar em professores, deverá ser redirecionado para a tela de cadastros de administradores e cadastrar um professor', () => {


        accessTeacherPage();
        cy.location('pathname', { timeout: 60000 })
            .should('include', 'teachers')

        createTeacher()

        const teacher = {
            "id":4,
            "email":"hleonardo@cpom.com",
            "name":"Henrique Leonardo",
            "school":{
               "id":1,
               "name":"Jose Marcelino",
               "identifier":"JML",             
               "isActive":true
            },
            "isActive":true

        };

        fillTeacherFields(teacher);

        cy.intercept({
            method: 'POST',
            url: '/api/teachers',
        }).as('registerTeacher')

        save()

        cy.wait('@registerTeacher').then((interception) => {
            assert.strictEqual(interception.response?.statusCode, 201)
        })

        

    })


    it('Deve ser possível editar um usuário administrador', () => {
        
        editTeacher(4)

        const teacher = {
            "id":4,
            "email":"hleonardo@cpom.com",
            "name":"Henrique Leonardo",
            "school":{
               "id":1,
               "name":"Jose Marcelino",
               "identifier":"JML",             
               "isActive":true
            },
            "isActive":true

        };

        fillTeacherFields(teacher);

        cy.intercept({
            method: 'PUT',
            url: '/api/teachers/4',
        }).as('updateTeacher')

        save()

        cy.wait('@updateTeacher').then((interception) => {
            assert.strictEqual(interception.response?.statusCode, 200)
        })

    

    })

    it('Durante a edição ao apagar um dado obrigatório, o botao salvar deve ficar desabilitado', () => {
        editTeacher(4)

        clearEmail()

        saveButtonShouldDisabled()

    })


})     
            
