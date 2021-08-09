export interface School{
    id?: number,
    name: string,
    identifier: string,
    isActive :boolean;
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

export function visitAdminPanel(){
    cy.visit('admin')
}

export function visitSchoolPage(){
    cy.visit('schools')
}

export function accessSchollPage(){
    cy.get('[data-cy-school="access"]').click()
}


export function fillSchoolFields(school: School){
    cy.get('[data-cy-input="name"]').clear().type(school.name);
    cy.get('[data-cy-input="identifier"]').clear().type(school.identifier);
    cy.get('[data-cy-input*="isActive"]').click
}

export function clearIdentifier(){
    cy.get('[data-cy-input="identifier"]').clear()
}

export function editSchool(id: number){
    cy.get(`[data-cy-edit-school=${id}]`).click();
}

export function save(){
 cy.get('[data-cy-school-button="save"]').click()
}

export function saveButtonShouldDisabled(){
    cy.get('[data-cy-is-disabled="true"]')
}

export function closeSnackbar(){
    cy.contains('Fechar').click()
}

export function createSchool(){
    cy.get('[data-cy-school = "create"]').click();
}

