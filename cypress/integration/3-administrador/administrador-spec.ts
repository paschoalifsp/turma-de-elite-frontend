import { doLogin } from "../1-login/user-actions-spec";
import { isEndToEnd } from "../configuration";
import { accessAdminPage, clearEmail, closeSnackbar, createAdmin, editAdmin, fillAdminFields, save, saveButtonShouldDisabled, visitAdminPage, visitAdminPanel } from "./admistrador-actions";

describe('CRUD de Administradores', () => {
    beforeEach(() => {
        cy.viewport(1366, 768);
    
        cy.intercept('GET', '/api/admin?*', { fixture: 'administrador/administradores' })
        cy.intercept('GET', '/api/admin/*', { fixture: 'administrador/andre'})
        cy.intercept('POST', '/api/admin', { statusCode: 201 })
        cy.intercept('PUT', '/api/admin/*', { statusCode: 200 })
        
    })


    it('Ao clicar em administrador, deverá ser redirecionado para a tela de cadastros de administradores e cadastrar um administrador', () => {

        doLogin('ADMIN');
        accessAdminPage();
        cy.location('pathname', { timeout: 60000 })
            .should('include', 'admins')

        createAdmin()

        const admin = {
            "id": 1,
            "email": "andre.montero702@gmail.com",
            "name": "André Monteiro",
            "isActive": true

        };

        fillAdminFields(admin);

        cy.intercept({
            method: 'POST',
            url: '/api/admin',
        }).as('registerAdmin')

        save()

        cy.wait('@registerAdmin').then((interception) => {
            assert.strictEqual(interception.response?.statusCode, 201)
        })

        

    })


    it('Deve ser possível editar um usuário administrador', () => {
        
        editAdmin(1)

        const admin = {
            "id": 1,
            "name": "André Monteiro",
            "email": "andre.montero702@gmail.com",
            "isActive": true
        };

        fillAdminFields(admin)

        cy.intercept({
            method: 'PUT',
            url: '/api/admin/1',
        }).as('updateAdmin')

        save()

        cy.wait('@updateAdmin').then((interception) => {
            assert.strictEqual(interception.response?.statusCode, 200)
        })

    

    })

    it('Durante a edição ao apagar um dado obrigatório, o botao salvar deve ficar desabilitado', () => {
        editAdmin(1)

        clearEmail()

        saveButtonShouldDisabled()

    })


})     
            
