import { isEndToEnd } from "../configuration";

import { accessLoginPage, accessManagerPage, clearEmail, createManager, editManager, fillManagerFields, loginManager, save, saveButtonShouldDisabled, visitManagerPage, visitManagerPanel } from "./gestor-actions";

describe('CRUD de gestores', () => {
    beforeEach(() => {
        cy.viewport(1366, 768);
        cy.intercept('GET', '/api/managers?*', { fixture: 'gestor/gestores' })
        cy.intercept('GET', '/api/managers/*', { fixture: 'gestor/bianca' })
        cy.intercept('POST', '/api/managers', { statusCode: 201 })
        cy.intercept('PUT', '/api/managers/*', { statusCode: 200 })

    })

    it('Deve realizar login como administrador', () => {
        
        accessLoginPage()
        const login = {
            "email": "andre.montero702@gmail.com",
            "password": "123456"
        }

        loginManager(login)

        cy.location('pathname', { timeout: 60000 })
        .should('include', 'admin')
    })


    it('Ao clicar em gestor, deverá ser redirecionado para a tela de cadastros de gestores e cadastrar um gestor', () => {

        accessManagerPage();
        cy.location('pathname', { timeout: 60000 })
            .should('include', 'managers')

        visitManagerPage()

        createManager()

        const manager = {
            "id": 76,
            "email": "bianca@gmail.com",
            "name": "Bianca",
            school: {
                id: 1,
                name:'Jose Marcelino',
                identifier:'JML',
                isActive: true
            },
            "schoolId": 1,
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

    it('Deve ser possível editar um usuário Gestor', () => {

        editManager(76)

        const manager = {
            "id": 76,
            "email": "bianca@gmail.com",
            "name": "Bianca",
            school: {
                id: 1,
                name:'Jose Marcelino',
                identifier:'JML',
                isActive: true
            },
            "schoolId": 1,
            "isActive": true

        };

        fillManagerFields(manager);

        cy.intercept({
            method: 'PUT',
            url: '/api/managers/76',
        }).as('updateManager')

        save()

        cy.wait('@updateManager').then((interception) => {
            assert.strictEqual(interception.response?.statusCode, 200)
        })

    })

    it('Durante a edição ao apagar um dado obrigatório, o botao salvar deve ficar desabilitado', () => {
        editManager(76)

        clearEmail()

        saveButtonShouldDisabled()

    })


})

