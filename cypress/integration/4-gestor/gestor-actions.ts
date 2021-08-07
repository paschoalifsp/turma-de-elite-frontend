import { School } from "../2-escolas/escola-actions";

export interface Manager{
    id?: number,
    email: string,
    name: string,
    school?: School;
    schoolId: number;
    isActive: boolean
}

export interface Login{
    email: string,
    password: string
}

export function login(){

}

export function accessManagerPage(){
    cy.get('[data-cy-manager="access"] ').click()
}

export function visitManagerPanel(){
    cy.get('[data-cy-return ="dashboard"]').click()
}

export function createManager(){
    cy.get('[data-cy-manager="create"]').click();
}

export function editManager(id: number){
    cy.get(`[data-cy-edit-manager=${id}]`).click();
}


export function fillAdminFields(manager: Manager){
    cy.get('[data-cy-input="email"]').clear().type(manager.email);
    cy.get('[data-cy-input="name"]').clear().type(manager.name);
    cy.get(`[attr.data-cy-input-school-id]=${manager.schoolId}`)
    cy.get('[data-cy-input*="isActive"]').click()
}

export function clearEmail(){
    cy.get('[data-cy-input="email"]').clear()
}


export function save(){
 cy.get('[data-cy-manager-button="save"]').click()
}

export function saveButtonShouldDisabled(){
    cy.get('[data-cy-is-disabled="true"]')
}

export function closeSnackbar(){
    cy.contains('Fechar').click()
}


