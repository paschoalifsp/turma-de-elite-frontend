import { doLogin } from "../1-login/user-actions-spec";
import { Turma, accessClassPage, accessLoginPage, createClass, loginClass, fillClassFields, save, editClass, clearName, saveButtonShouldDisabled, editClassDisable } from "./turma-actions";

describe('CRUD de turmas', () => {
    beforeEach(() => {
        cy.viewport(1366, 768);
        cy.intercept('GET', '/api/class?*', { fixture: 'turma/turmas' })
        cy.intercept('GET', '/api/class/*', { fixture: 'turma/literatura'})
        cy.intercept('POST', '/api/class', { statusCode: 201 })
        cy.intercept('PUT', '/api/class/*', { statusCode: 200 })
        
    })

    it('Deve realizar login como gestor', () => {
        
        doLogin("MANAGER")

        cy.location('pathname', { timeout: 60000 })
        .should('include', 'manager')
    })

 
    it('Ao clicar em turmas, deverá ser redirecionado para a tela de cadastros de turmas e cadastrar um turma', () => {


        accessClassPage();
        cy.location('pathname', { timeout: 60000 })
            .should('include', 'classes')

        createClass()

        const schoolClass: Turma ={
            id:2,
            professores: {id:4, email:'hleonardo@cpom.com' },
            alunos: {id:8, registry: "0001"},
            name: "Literatura 8 ano EF",
            isActive: true,
            isDone: false
        };

        fillClassFields(schoolClass);

        cy.intercept({
            method: 'POST',
            url: '/api/class',
        }).as('registerClass')

        save()

        cy.wait('@registerClass').then((interception) => {
            assert.strictEqual(interception.response?.statusCode, 201)
        })

    })


    it('Deve ser possível editar uma turma', () => {
        
        editClass(2, "Literatura 8 ano EF")
        
        cy.intercept({
            method: 'PUT',
            url: '/api/class/2',
        }).as('updateClass')

        save()

        cy.wait('@updateClass').then((interception) => {
            assert.strictEqual(interception.response?.statusCode, 200)
        })
  

    })

    it('Durante a edição ao apagar um dado obrigatório, o botao salvar deve ficar desabilitado', () => {
        editClassDisable(2)

        clearName()

        saveButtonShouldDisabled()

    })


})     
            
