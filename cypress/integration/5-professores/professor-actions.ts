import { School } from "../2-escolas/escola-actions";

export interface Professor{
    id?: number,
    email: string,
    name: string,
    school?: School;
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

export function accessTeacherPage(){
    cy.get('[data-cy-teacher="access"] ').click()
}

export function createTeacher(){
    cy.get('[data-cy-teacher="create"]').click();
}

export function editTeacher(id: number){
    cy.get(`[data-cy-edit-teacher=${id}]`).click();
}


export function fillTeacherFields(professor: Professor){
    cy.get('[data-cy-input="email"]').clear().type(professor.email);    
    cy.get('[data-cy-input="name"]').clear().type(professor.name);    
    cy.get('[data-cy-input*="isActive"]').click()
}

export function clearEmail(){
    cy.get('[data-cy-input="email"]').clear()
}

export function save(){
 cy.get('[data-cy-teacher-button="save"]').click()
}

export function saveButtonShouldDisabled(){
    cy.get('[data-cy-is-disabled="true"]')
}

export function closeSnackbar(){
    cy.contains('Fechar').click()
}


