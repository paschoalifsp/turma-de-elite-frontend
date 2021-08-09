
export interface Conquista{
    id: number,
    name: string,
    description:string,
    icon: string
    earlierOf: string,
    isActive: boolean,
    activityId: number
}

export interface Login{
    email: string,
    password: string
}

export function accessLoginPage(){
    cy.visit('/login')
}

export function loginAchievement(login: Login){

    cy.get('[data-cy-input="email"]').clear().type(login.email);    
    cy.get('[data-cy-input="password"]').clear().type(login.password);    
    cy.get('[data-cy-button="login"]').click()
    
}

export function accessAchievementPage(){
    cy.get('[data-cy-achievement="access"]').click()
}

export function createAchievement(){
    cy.get('[data-cy-achievement="create"]').click();
}

export function editAchievement(id: number, name: string){
    cy.get(`[data-cy-edit-activity=${id}]`).click();
    cy.get('[data-cy-input="name"]').clear().type(name); 
}

export function editAchievementDisable(id: number){
    cy.reload()
    cy.get(`[data-cy-edit-achievement=${id}]`).click();
}

export function fillAchievementFields(conquista: Conquista){
    cy.get('[data-cy-input="name"]').clear().type(conquista.name)
    cy.get('[data-cy-input="description"]').clear().type(conquista.description)
    cy.get('[data-cy-button="goToStep2"]').click()
    cy.get('.icon-picker > :nth-child(1) > .mat-focus-indicator > .mat-button-wrapper > .mat-icon').click()
    cy.get('[data-cy-button="goToStep3"]').click()
    cy.get('[data-cy-input="modalidade"]').click()
    cy.get('[data-cy-option="activity"]').click()
    cy.get('[data-cy-activity="activity"]').click()
    cy.get('#mat-option-6 > .mat-option-text').click()
    cy.get('[data-cy-button="goToStep4"]').click()
    cy.get('[data-cy-input="earlierOf"]').clear().type(conquista.earlierOf)
}

export function clearName(){
    cy.get('[data-cy-input="name"]').clear()
}

export function save(){
 cy.get('[data-cy-achievement-button="save"]').click()
}

export function saveButtonShouldDisabled(){
    cy.get('[data-cy-is-disabled="true"]')
}

export function closeSnackbar(){
    cy.contains('Fechar').click()
}


