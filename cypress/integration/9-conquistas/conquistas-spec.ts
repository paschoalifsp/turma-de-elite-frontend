import { accessAchievementPage, accessLoginPage, clearName, Conquista, createAchievement, editAchievementDisable, fillAchievementFields, loginAchievement, save, saveButtonShouldDisabled } from "./conquistas-actions";

describe('CRUD de conquistas', () => {
    beforeEach(() => {
        cy.viewport(1366, 768);
        cy.intercept('GET', '/api/achievements?*', { fixture: 'conquista/conquistas' })
        cy.intercept('GET', '/api/achievements/*', { fixture: 'conquista/desbravador'})
        cy.intercept('POST', '/api/achievements', { statusCode: 201 })
        cy.intercept('PUT', '/api/achievements/*', { statusCode: 200 })
        
    })

    it('Deve realizar login como professor', () => {
        
        accessLoginPage()
        
        const login = {
            "email": "jose@gmail.com",
            "password": "123456"
        }

        loginAchievement(login)

        cy.location('pathname', { timeout: 60000 })
        .should('include', 'teacher')
    })

 
    it('Ao clicar em conquista, deverá ser redirecionado para a tela de cadastros de conquista e cadastrar uma conquista', () => {


        accessAchievementPage();
        cy.location('pathname', { timeout: 60000 })
            .should('include', 'achievements')

            createAchievement()

        const conquista: Conquista ={
            id: 10,
            name: 'Desbravador',
            description:'Seja o primeiro a entregar a atividade',
            icon: '3d_rotation',
            earlierOf: '1',
            isActive: true,
            activityId: 7
        };


        fillAchievementFields(conquista);

        cy.intercept({
            method: 'POST',
            url: '/api/achievements',
        }).as('registerAchievements')

        save()

        cy.wait('@registerAchievements').then((interception) => {
            assert.strictEqual(interception.response?.statusCode, 201)
        })

    })


    it('Deve ser possível editar uma conquista', () => {

        cy.reload()

        editAchievementDisable(10)

        const conquista: Conquista ={
            id: 10,
            name: 'Desbravador',
            description:'Seja o primeiro a entregar a atividade',
            icon: '3d_rotation',
            earlierOf: '1',
            isActive: true,
            activityId: 7
        };


        fillAchievementFields(conquista);
        
        cy.intercept({
            method: 'PUT',
            url: '/api/achievements/10',
        }).as('updateAchievements')

        save()

        cy.wait('@updateAchievements').then((interception) => {
            assert.strictEqual(interception.response?.statusCode, 200)
        })
  

    })

    it('Durante a edição ao apagar um dado obrigatório, o botao salvar deve ficar desabilitado', () => {
        cy.reload()
        editAchievementDisable(10)

        clearName()

        saveButtonShouldDisabled()

    })


})     
            
