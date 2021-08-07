import { isEndToEnd } from "../configuration";

import { accessManagerPage, clearEmail, closeSnackbar, createManager, editManager, save, saveButtonShouldDisabled, visitManagerPanel } from "./gestor-actions";

describe('CRUD de Administradores', () => {
    beforeEach(() => {
        cy.viewport(1366, 768);

        cy.intercept('GET', '/api/managers?*', { fixture: 'gestor/gestores' })
        cy.intercept('GET', '/api/managers/*', { fixture: 'gestor/bianca'})
        cy.intercept('POST', '/api/managers', { statusCode: 201 })
        cy.intercept('PUT', '/api/managers/*', { statusCode: 200 })
    })

    it('Ao clicar em gestor, deverá ser redirecionado para a tela de cadastros de gestores e cadastrar um gestor', () => {

        visitManagerPanel();
        accessManagerPage();
        cy.location('pathname', { timeout: 60000 })
            .should('include', 'managers')

        createManager()

        const manager = {
            "id":42,
            "email":"bianca@gmail.com",
            "name":"Bianca",
            school: {
                id: 3,
                description:'Colegio Pe Otavio'
              },
            "isActive": true

        };

        fillManagerFields(manager);

        cy.intercept({
            method: 'POST',
            url: '/api/managers',
        }).as('registerManager')

        save()

        cy.wait('@registerManager').then((interception) => {
            assert.strictEqual(interception.response?.statusCode, 201)
        })

 
    })


    it('Deve ser possível editar um usuário administrador', () => {
        
        editManager(42)

        const manager = {
            "id":42,
            "email":"bianca@gmail.com",
            "name":"Bianca",
            school: {
                id: 3,
                description:'Colegio Pe Otavio'
              },
            "isActive": true

        };

        fillManagerFields(manager);

        cy.intercept({
            method: 'PUT',
            url: '/api/managers/42',
        }).as('updateManager')

        save()

        cy.wait('@updateManager').then((interception) => {
            assert.strictEqual(interception.response?.statusCode, 200)
        })

    })

    it('Durante a edição ao apagar um dado obrigatório, o botao salvar deve ficar desabilitado', () => {
        editManager(42)

        clearEmail()

        saveButtonShouldDisabled()

    })


})     
            

function fillManagerFields(manager: { id: number; email: string; name: string; school: { id: number; description: string; }; isActive: boolean; }) {
    throw new Error("Function not implemented.");
}

