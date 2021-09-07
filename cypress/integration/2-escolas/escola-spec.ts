import { isEndToEnd } from "../configuration";
import { accessLoginPage, accessSchollPage, clearIdentifier, closeSnackbar, createSchool, editSchool, fillSchoolFields, loginManager, save, saveButtonShouldDisabled } from "./escola-actions";


describe('CRUD de escolas', ()=>{
    beforeEach(()=>{
        cy.viewport(1366,768);

            cy.intercept('GET','/api/schools?*',{fixture: 'escola/escolas'})
            cy.intercept('GET','/api/schools/*',{fixture: 'escola/jose-marcelino'})
            cy.intercept('POST','/api/schools',{statusCode: 201})
            cy.intercept('PUT','/api/schools/*',{statusCode: 200})
        
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

   
        it('Ao clicar em escolas, deverá ser redirecionado para a tela de cadastros de escolas e cadastrar uma escola', () => {
                              
                accessSchollPage()

                createSchool()

                const school = {
                    "id":1,
                    "name":"Jose Marcelino",
                    "identifier":"JML",
                    "isActive":true
                };

                fillSchoolFields(school)

                cy.intercept({
                    method: 'POST',
                    url: '/api/schools',
                  }).as('registerSchool')

                save()

                cy.wait('@registerSchool').then((interception)=>{
                    assert.strictEqual(interception.response?.statusCode, 201)
                })

                closeSnackbar()

            })
       


        it('Deve ser possível editar uma escola', () => {
            editSchool(1)

            const school = {
                "id":1,
                "name":"Jose Marcelino",
                "identifier":"JML",
                "isActive":true
            };

            fillSchoolFields(school)

            cy.intercept({
                method: 'PUT',
                url: '/api/schools/1',
              }).as('updateSchool')

            save()

            cy.wait('@updateSchool').then((interception)=>{
                assert.strictEqual(interception.response?.statusCode, 200)
            })
        })
              

        
            it('Durante a edição ao apagar um dado obrigatório, o botao salvar deve ficar desabilitado', () =>{
                editSchool(1)

                clearIdentifier()

                saveButtonShouldDisabled()

            })


})  
            
     

     
