import { AtividadeResumo } from "../8-atividades/atividades-actions";

export interface Conquistas{
    id?: number,
    name: string,
    description: string,
    iconName: string,
    bestOf?: number,
    isActive: boolean,
    activityId?: AtividadeResumo
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
    cy.get('[data-cy-achievement="access"]').click()
}

export function createAchievement(){
    cy.get('[data-cy-achievement="create"]').click();
}

export function editAchievement(id: number, description: string){
    
    cy.get(`[data-cy-edit-achievement=${id}]`).click();
    cy.get('[data-cy-input="description"]').clear().type(description);
    cy.get('[data-cy-button="next1"]').click();
    cy.get('[data-cy-button="next2"]').click();
    cy.get('[data-cy-button="next3"]').click();
    

}



export function editAchievementDisable(id: number){
    cy.get(`[data-cy-edit-achievement=${id}]`).click();
}

export function acessDashboard(){
    cy.go('back')
}


export function fillAchievementFields(conquista: Conquistas){
    cy.get('[data-cy-input="name"]').clear().type(conquista.name)
    cy.get('[data-cy-input="description"]').clear().type(conquista.description)
    cy.get('[data-cy-button="next1"]').click();
    cy.get(':nth-child(4) > .mat-focus-indicator > .mat-button-wrapper > .mat-icon').click();
    cy.get('[data-cy-button="next2"]').click();
    cy.get('[data-cy-modalidade="modalidade"]').click();
    cy.get('[data-cy-modalidade="activity"]').click();
    cy.get('[data-cy-activity="select"]').click();
    cy.get(`[data-cy-achievement=${conquista.activityId?.id}]`).click();
    cy.get('[data-cy-button="next3"]').click();
    cy.get('[data-cy-input="bestOf"]').click().type("1");
}

export function clearName(){
    cy.get('[data-cy-input="name"]').clear()
}

export function save(){
    cy.get('[data-cy-button="save"]').click()
}

export function nextButtonShouldDisabled(){
    cy.get('[data-cy-is-disabled="true"]')
}

export function closeSnackbar(){
    cy.contains('Fechar').click()
}