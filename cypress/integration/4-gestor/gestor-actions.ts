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

export function accessLoginPage(){
    cy.visit('/login')
}

export function loginManager(login: Login){

    cy.get('[data-cy-input="email"]').clear().type(login.email);    
    cy.get('[data-cy-input="password"]').clear().type(login.password);    
    cy.get('[data-cy-button="login"]').click()
    
}

export function accessManagerPage(){
    cy.get('[data-cy-manager="access"] ').click()
}

export function visitManagerPanel(){
    cy.get('[data-cy-return="dashboard"]').click()
}
export function visitManagerPage(){
    cy.visit('admin/managers')
}
export function createManager(){
    cy.get('[data-cy-manager="create"]').click();
}

export function editManager(id: number){
    cy.get(`[data-cy-edit-manager=${id}]`).click();
}


export function fillManagerFields(manager: Manager){
    if(manager?.email?.length > 0){
    cy.get('[data-cy-input="email"]').clear().type(manager.email);
    }
    if(manager?.name?.length > 0){
    cy.get('[data-cy-input="name"]').clear().type(manager.name);
    }
    if(manager?.school){
        cy.get('[data-cy-input="school"]').clear().type(manager.school?.name  || '')
    }

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


