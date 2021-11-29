import { doLogin } from "../1-login/user-actions-spec";
import { accessActivityPage, accessLoginPage, Atividade, clearName, createActivity, editActivity, editActivityDisable, fillActivityFields, loginActivity, save, saveButtonShouldDisabled } from "./atividades-actions";


describe('CRUD de atividades', () => {
    beforeEach(() => {
        cy.viewport(1366, 768);
        cy.intercept('GET', '/api/activities?*', { fixture: 'atividades/atividades' })
        cy.intercept('GET', '/api/activities/*', { fixture: 'atividades/astronomia'})
        cy.intercept('POST', '/api/activities', { statusCode: 201 })
        cy.intercept('PUT', '/api/activities/*', { statusCode: 200 })
        
    })

    it('Deve realizar login como professor', () => {
        
        doLogin("TEACHER")

        cy.location('pathname', { timeout: 60000 })
        .should('include', 'teacher')
    })

 
    it.skip('Ao clicar em atividade, deverá ser redirecionado para a tela de cadastros de atividades e cadastrar uma atividade', () => {


        accessActivityPage();
        cy.location('pathname', { timeout: 60000 })
            .should('include', 'activities')

        createActivity()

        const atividade: Atividade ={
            id: 7,
            name: 'Astronomina',
            description: 'Responda o questionario',
            punctuation: '10.0',
            isVisible: true,
            isActive: true,
            isDeliverable: true,
            maxDeliveryDate: '2021-12-25 10:23:54',
            filename: 'file_download_black_24dp (3) (1).svg',
            classes: {id:2, name:'"Literatura 8 ano EF'}
        };

        fillActivityFields(atividade);

        cy.intercept({
            method: 'POST',
            url: '/api/activities',
        }).as('registerActivities')

        save()

        cy.wait('@registerActivities').then((interception) => {
            assert.strictEqual(interception.response?.statusCode, 201)
        })

    })


    it.skip('Deve ser possível editar uma atividade', () => {

        
        accessActivityPage();
        cy.location('pathname', { timeout: 60000 })
            .should('include', 'activities')
        
        editActivity(7, "Astronomina")
        
        cy.intercept({
            method: 'PUT',
            url: '/api/activities/7',
        }).as('updateActivities')

        save()

        cy.wait('@updateActivities').then((interception) => {
            assert.strictEqual(interception.response?.statusCode, 200)
        })
  

    })

    it.skip('Durante a edição ao apagar um dado obrigatório, o botao salvar deve ficar desabilitado', () => {
        editActivityDisable(2)

        clearName()

        saveButtonShouldDisabled()

    })


})     
            
