export interface Admin{
    id?: number,
    email: string,
    name: string,
    isActive: boolean
}

export interface Login{
    email: string,
    password: string
}

export function login(){

}

export function visitAdminPanel(){
    cy.get('[data-cy-return ="dashboard"]').click()
}

export function visitAdminPage(){
    cy.visit('admins')
}

export function accessAdminPage(){
    cy.get('[data-cy-admin="access"] ').click()
}



export function fillAdminFields(admin: Admin){
    cy.get('[data-cy-input="email"]').clear().type(admin.email);
    cy.get('[data-cy-input="name"]').clear().type(admin.name);
    cy.get('[data-cy-input*="isActive"]').click();
}

export function clearEmail(){
    cy.get('[data-cy-input="email"]').clear()
}

export function editAdmin(id: number){
    cy.get(`[data-cy-edit-admin=${id}]`).click();
}

export function save(){
 cy.get('[data-cy-admin-button="save"]').click()
}

export function saveButtonShouldDisabled(){
    cy.get('[data-cy-is-disabled="true"]')
}

export function closeSnackbar(){
    cy.contains('Fechar').click()
}

export function createAdmin(){
    cy.get('[data-cy-admin="create"]').click();
}

