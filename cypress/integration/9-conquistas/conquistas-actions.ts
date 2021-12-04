
export interface Conquistas{
    id: 1,
    name: string,
    description: string,
    iconName: string,
    beforeAt: Date
    earlierOf: number,
    bestOf: number,
    averageGradeGreaterOrEqualsThan: number,
    isActive: boolean,
    classId: number
    activityId: number
}



export interface Login{
    email: string,
    password: string
}

export function accessLoginPage(){
    cy.visit('/login')
}

export function loginActivity(login: Login){

    cy.get('[data-cy-input="email"]').clear().type(login.email);    
    cy.get('[data-cy-input="password"]').clear().type(login.password);    
    cy.get('[data-cy-button="login"]').click()
    
}

export function accessAchievementPage(){
    cy.get('[data-cy-activity="access"]').click()
}

export function createAchievement(){
    cy.get('[data-cy-activity="create"]').click();
}

export function editAchievement(id: number, description: string){
    
    cy.get(`[data-cy-edit-achievement=${id}]`).click();
    cy.get('[data-cy-input="description"]').clear().type(description); 
}



export function editAchievementDisable(id: number){
    cy.get(`[data-cy-edit-achievement=${id}]`).click();
}

export function fillActivityFields(conquista: Conquistas){
    cy.get('[data-cy-input="name"]').clear().type(atividade.name)
    cy.get('[data-cy-input="punctuation"]').clear().type(atividade.punctuation)
   // cy.get('[data-cy-select="class"]').click()
    //cy.get(`[data-cy-select=${atividade.classes.id}]'`).click()
    cy.get('[data-cy-input="maxDeliveryDate"]').clear().type(atividade.maxDeliveryDate)
    cy.get('[data-cy-input="isVisible"]').click()    
    cy.get('[data-cy-input="isActive"]').click()
    cy.get('[data-cy-input="isDeliverable"]').click()
    //cy.get('[data-cy-input="fileName"]').clear().type(atividade.filename)
    cy.get('[data-cy-input="description"]').clear().type(atividade.description);

   

}

export function clearName(){
    cy.get('[data-cy-input="name"]').clear()
}

export function save(){
 cy.get('[data-cy-activity-button="save"]').click()
}

export function saveButtonShouldDisabled(){
    cy.get('[data-cy-is-disabled="true"]')
}

export function closeSnackbar(){
    cy.contains('Fechar').click()
}