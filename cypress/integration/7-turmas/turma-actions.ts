import { Professor } from "../5-professores/professor-actions"
import { Aluno } from "../6-aluno/aluno-actions"

export interface Turma{
    id?:number,
    professores: {id: number, email: string }
    alunos: {id: number, registry: string}
    name: string,
    isActive: boolean,
    isDone: boolean,
}


export interface Login{
    email: string,
    password: string
}

export function accessLoginPage(){
    cy.visit('/login')
}

export function loginClass(login: Login){

    cy.get('[data-cy-input="email"]').clear().type(login.email);    
    cy.get('[data-cy-input="password"]').clear().type(login.password);    
    cy.get('[data-cy-button="login"]').click()
    
}

export function accessClassPage(){
    cy.get('[data-cy-class="access"]').click()
}

export function createClass(){
    cy.get('[data-cy-class="create"]').click();
}

export function editClass(id: number, name: string){
    cy.get(`[data-cy-edit-class=${id}]`).click();
    cy.get('[data-cy-input="name"]').clear().type(name);  

}

export function editClassDisable(id: number){
    cy.get(`[data-cy-edit-class=${id}]`).click();
}

export function fillClassFields(turma: Turma){
    cy.get('[data-cy-input="teacher"]').clear().type(turma.professores.email)
    cy.get('[data-cy-button="addTeacher"]').click()
    cy.get('[data-cy-button="goToStep2"]').click()
    cy.get('[data-cy-input="student"]').clear().type(turma.alunos.registry)
    cy.get('[data-cy-button="addStudent"]').click()
    cy.get('[data-cy-button="goToStep3"]').click()
    cy.get('[data-cy-input="name"]').clear().type(turma.name);    
    cy.get('[data-cy-input*="isActive"]').click()
}

export function clearName(){
    cy.get('[data-cy-input="name"]').clear()
}

export function save(){
 cy.get('[data-cy-class-button="save"]').click()
}

export function saveButtonShouldDisabled(){
    cy.get('[data-cy-is-disabled="true"]')
}

export function closeSnackbar(){
    cy.contains('Fechar').click()
}


