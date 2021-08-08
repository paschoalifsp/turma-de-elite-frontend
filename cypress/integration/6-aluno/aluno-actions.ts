
export interface Aluno{
    id?: number,
    email: string,
    registry: string
    name: string,
    isActive: boolean
}

export interface Login{
    email: string,
    password: string
}

export function accessLoginPage(){
    cy.visit('/login')
}

export function loginStudent(login: Login){

    cy.get('[data-cy-input="email"]').clear().type(login.email);    
    cy.get('[data-cy-input="password"]').clear().type(login.password);    
    cy.get('[data-cy-button="login"]').click()
    
}

export function accessStudentPage(){
    cy.get('[data-cy-student="access"] ').click()
}

export function createStudent(){
    cy.get('[data-cy-student="create"]').click();
}

export function editStudent(id: number){
    cy.get(`[data-cy-edit-student=${id}]`).click();
}


export function fillStudentFields(aluno: Aluno){
    cy.get('[data-cy-input="email"]').clear().type(aluno.email);  
    cy.get('[data-cy-input="registry"]').clear().type(aluno.registry) 
    cy.get('[data-cy-input="name"]').clear().type(aluno.name);    
    cy.get('[data-cy-input*="isActive"]').click()
}

export function clearEmail(){
    cy.get('[data-cy-input="email"]').clear()
}

export function save(){
 cy.get('[data-cy-student-button="save"]').click()
}

export function saveButtonShouldDisabled(){
    cy.get('[data-cy-is-disabled="true"]')
}

export function closeSnackbar(){
    cy.contains('Fechar').click()
}


