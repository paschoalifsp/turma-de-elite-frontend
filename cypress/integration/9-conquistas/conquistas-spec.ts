import { doLogin } from "../1-login/user-actions-spec";
import { clearName } from "../7-turmas/turma-actions";
import { isEndToEnd } from "../configuration";
import { accessAchievementPage, acessDashboard, createAchievement, editAchievement, fillAchievementFields, save } from "./conquistas-actions";


describe('CRUD de Conquistas', ()=>{
    beforeEach(()=>{
        cy.viewport(1366,768);

            cy.intercept('GET','/api/achievements?*',{fixture: 'conquistas/conquistas'})
            cy.intercept('GET','/api/achievements/*',{fixture: 'conquistas/conquista'})
            cy.intercept('GET','/api/activities',{fixture: 'conquistas/atividades'})
            cy.intercept('GET','/api/class/teacher-himself?*',{fixture: 'conquistas/turmas'})
            cy.intercept('POST','/api/achievements',{statusCode: 201})
            cy.intercept('PUT','/api/achievements/*',{statusCode: 200})
          
        })

        it.skip('Ao clicar em conquistas, deverá ser redirecionado para a tela de cadastros de conquistas e cadastrar uma conquista', () => {
            doLogin('TEACHER')
        
                accessAchievementPage()

                createAchievement()


                const conquista = {
                    "id": 2,
                    "name": "conquista teste 2",
                    "description": "teste de conquista 2",
                    "iconName": "ac_unit",
                    "bestOf": 1,
                    "isActive": true,
                    "activityId":   {
                        "id": 2,
                        "name": "Atividade teste 2"
                    },
                };

                fillAchievementFields(conquista)

                cy.intercept({
                    method: 'POST',
                    url: '/api/achievements',
                  }).as('registerAchievement')

                save()

                cy.wait('@registerAchievement').then((interception)=>{
                    assert.strictEqual(interception.response?.statusCode, 201)
                })


            
        })


        it.skip('Deve ser possível editar uma conquista', () => {

            acessDashboard()
           
            accessAchievementPage()
        
            editAchievement(1, "conquista alterada")


            cy.intercept({
                method: 'PUT',
                url: '/api/achievements/1',
              }).as('updateAchievement')

            save()

            cy.wait('@updateAchievement').then((interception)=>{
                assert.strictEqual(interception.response?.statusCode, 200)
            })
        })

    })

   
